# Mini Sessions technical operations

This runbook covers deployment, verification, incident response, and evidence
for the Mini Sessions feature across `iffers-pictures`,
`pixelverse-studios-server`, Supabase, Cal.com, and Stripe.

## Architecture and source of truth

| Concern | Source of truth | Notes |
| --- | --- | --- |
| Campaign content and lifecycle | Pixelverse server + Supabase | Admin API is session-authenticated; public API returns only `live` or `sold_out`. |
| Public presentation | Iffer's Pictures Next.js app | Server-rendered, fail-closed, cached for at most 60 seconds. |
| Slot inventory and booking | Cal.com | CMS stores only validated public booking URLs. |
| Deposit and refund | Stripe connected through Cal.com | No Stripe secret or payment identifier is stored in the campaign domain. |
| Cache invalidation | Signed server-to-site webhook | Revalidates `/`, `/mini-sessions`, `/sitemap.xml`, and root layout state. |
| Analytics | GA4 in the website | Allowlisted campaign/option/status/location/provider fields only. |

The public website does not read Supabase directly. The Pixelverse service-role
client is the only application path to the three Mini Sessions tables.

## Required release order

1. Merge and deploy the server schema/domain PR.
2. Apply the reviewed Supabase migration in an approved release window.
3. Configure the server deployment environment.
4. Merge and deploy the server lifecycle/revalidation PR.
5. Merge and deploy the frontend data, admin, public page, lifecycle, and
   promotion PRs in dependency order.
6. Configure the website deployment environment with the same revalidation
   secret.
7. Complete Jenn-owned Cal.com, Stripe, bank, and calendar setup.
8. Create the first draft campaign, complete controlled booking/refund QA, then
   publish only after the acceptance matrix passes.

Do not deploy the frontend campaign UI before the API and database contract are
available. Do not apply migrations, change production environment variables,
publish a campaign, create a real charge, or issue a refund without explicit
release approval.

## Environment contract

Pixelverse server:

```text
SITE_REVALIDATION_WEBHOOK_URL=https://ifferspictures.com/api/media/revalidate
SITE_REVALIDATION_SECRET=<shared random secret>
SITE_REVALIDATION_TIMEOUT_MS=5000
MINI_SESSION_PUBLIC_MAX_AGE_SECONDS=60
```

Iffer's Pictures website:

```text
PVS_API_URL=<deployed Pixelverse API origin>
MEDIA_REVALIDATION_SECRET=<same shared random secret>
NEXT_PUBLIC_GA_MEASUREMENT_ID=<public GA4 measurement ID>
AUTUMN_KEEPSAKE_CAMPAIGN_ID=<stable ID of the Autumn Keepsake campaign>
```

The Autumn Keepsake FAQ section fails closed unless
`AUTUMN_KEEPSAKE_CAMPAIGN_ID` exactly matches the active campaign ID. Set this
after the final campaign is created and before publishing it; do not use its
editable public label as the identifier.

Enter these approved policy summaries exactly on the Autumn Keepsake campaign.
The frontend normalizes capitalization and repeated whitespace, but suppresses
the entire FAQ section when the policy meaning or wording differs:

```text
Cancellation: A nonrefundable <formatted deposit> booking fee is required to secure your date and time.
Balance: The remaining <formatted total minus deposit> is due before your session.
Weather: If severe weather forces us to reschedule, your session fee transfers directly to our rain date.
Lateness: Mini sessions are booked back-to-back, therefore I’m not able to extend your session time if you arrive late. Please plan to arrive at least 5–10 minutes early.
```

For the planned $100 deposit, the cancellation value is
`A nonrefundable $100 booking fee is required to secure your date and time.` The
planned $225 total also requires the balance value
`The remaining $125 is due before your session.` A full-price deposit suppresses
the Autumn FAQ set because Jen's final answer specifies a remaining balance.

The frontend currently authenticates both media and site-content revalidation
through `MEDIA_REVALIDATION_SECRET`. The server supports the older media webhook
variables as rollout fallbacks, but new Mini Sessions deployments should use the
`SITE_REVALIDATION_*` names. Store all values in the deployment provider, never
in Git or Linear.

Generate the shared secret in an approved terminal and paste it directly into
the two deployment providers. Do not echo it into logs or ticket comments.

## Database rollout

Migration:

```text
supabase/migrations/20260809143427_create_mini_session_campaigns.sql
```

Before applying it:

1. Compare local and remote migration history with `npx supabase migration list --linked`.
2. Resolve every pre-existing local/remote mismatch deliberately. Do not use
   migration repair merely to make the list look aligned.
3. Review the target project and backup/recovery posture.
4. Review the migration's RLS, grants, foreign keys, partial unique index,
   check constraints, functions, and triggers.
5. Confirm `anon` and `authenticated` retain no table or function access and
   only `service_role` receives the required privileges. This explicit grant
   model also avoids relying on changing Data API exposure defaults.
6. Apply only during an approved release operation.
7. Re-run the migration list and query catalog metadata to verify the tables,
   constraints, functions, triggers, RLS flags, and grants.

As of 2026-08-10, the linked remote migration list did **not** include
`20260809143427`, and it showed unrelated history drift (`20260609130000` local
only and `20260609185719` remote only, plus later local-only migrations). This is
a release blocker that must be resolved before applying Mini Sessions to that
project; no migration was applied as part of DEV-1106.

## Deployment smoke tests

### Server

```bash
npm test
npm run build
```

Use a current supported Node runtime. In the 2026-08-10 verification, Node
20.11 failed before test discovery because the installed Rolldown build imports
`node:util.styleText`; the workspace Node runtime completed all 212 tests.

Verify:

- public active endpoint returns only a sanitized `live` or `sold_out` campaign;
- missing/closed/archived campaigns return a true 404 with the bounded cache header;
- admin routes reject unauthenticated requests;
- save/publish/lifecycle calls enforce optimistic concurrency;
- publish requires explicit Cal.com verification and an open booking option;
- tenant boundaries, pricing constraints, hero state, and one-public-campaign
  invariant remain enforced;
- mutation success is separate from revalidation warning state.

### Website

```bash
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build
```

Verify at desktop and mobile widths:

- no campaign/API failure: no promo, no Minis navigation, no sitemap entry,
  and `/mini-sessions` returns 404;
- live: public page, enabled homepage promo, desktop/mobile navigation, sitemap,
  schema, metadata, option switching, lazy embed, and external fallback;
- sold out: public content remains, booking controls are absent, and inquiry is
  prominent;
- close/archive: promotion and sitemap state disappear after revalidation or
  within the 60-second cache window;
- keyboard focus, radio labels, dialogs, focus restoration, reduced motion,
  and mobile layout remain usable;
- preview never creates a public URL or loads Cal.com;
- analytics events contain no attendee, email, phone, notes, payment, Stripe,
  or free-form CMS content.

## Signed revalidation verification

The server payload must include:

```json
{
  "content_type": "mini_session_campaign",
  "website_slug": "iffers-pictures",
  "campaign_id": "<non-sensitive campaign UUID>",
  "affected_paths": ["/", "/mini-sessions", "/sitemap.xml"],
  "revalidate_layout": true,
  "reason": "campaign_published",
  "triggered_at": "<ISO-8601 timestamp>"
}
```

Allowed campaign reasons are `campaign_updated`, `campaign_published`,
`campaign_marked_sold_out`, `campaign_closed`, and `campaign_archived`.
Verify a valid signature returns `200`, an invalid signature returns `401`, an
invalid payload returns `400`, and a different website slug is ignored. Also
re-run one legacy media payload to protect backward compatibility.

## Controlled payment evidence

Record only pass/fail, timestamp, amount, environment, and the responsible
reviewer in a private release record. Do not record attendee contact details,
card details, bank details, Stripe payment IDs, Cal.com booking IDs, or secrets.

Evidence must cover:

- successful checkout and booking-completion callback;
- one confirmed Cal.com booking;
- one correctly timed destination-calendar event;
- removal of the booked slot;
- one successful Stripe payment for the configured deposit;
- booking and payment emails;
- refund initiated and resulting Stripe status;
- Cal.com cancellation/calendar cleanup handled separately when needed;
- no PII in GA4 event parameters.

Stripe refunds return to the original payment method and can remain pending or
rarely fail, so record the displayed status rather than assuming immediate bank
settlement. See [Stripe's refund documentation](https://docs.stripe.com/refunds).

## Analytics contract

Events:

- `mini_session_campaign_view`
- `mini_session_promotion_click`
- `mini_session_option_select`
- `mini_session_embed_load`
- `mini_session_embed_error`
- `mini_session_booking_complete`
- `mini_session_sold_out_inquiry_click`

Allowed parameters are `campaign_id`, `campaign_status`, `option_id`,
`cta_location`, and `provider`. `provider` is currently `cal.com`. Do not add
free-form labels, URLs with query strings, attendee data, booking/payment IDs,
or Stripe fields.

## Incident response

- **Database/API unavailable:** public site fails closed. Check server health,
  deployment environment, migration state, and API logs. Do not bypass the API
  by exposing Supabase credentials to the website.
- **Campaign persisted but refresh failed:** preserve the successful mutation,
  inspect the structured revalidation result and server logs, verify URL/secret
  pairing, then wait for the bounded cache before retrying.
- **Incorrect public booking details:** close the campaign first, correct Cal.com
  and CMS together, run the comparison checklist, then reopen.
- **Incorrect deposit:** disable the affected Cal.com event immediately, close
  the campaign, identify affected bookings inside owner systems, and follow the
  approved refund process.
- **Unexpected availability:** inspect conflict calendars, event busy/free
  state, date overrides, buffers, slot interval, minimum notice, limits, and
  destination calendar.
- **Analytics includes sensitive data:** stop the offending event, remove the
  parameter, deploy the fix, and follow the organization's analytics data
  remediation process.
- **Concurrent admin edit:** keep the unsaved editor intact; load latest only
  after comparing the server version and intended edits.

## 2026-08-10 verification record

Completed locally:

- Pixelverse server TypeScript build passed.
- Pixelverse server test suite passed: 19 files, 212 tests.
- Iffer's Pictures lint, TypeScript, and production build passed on DEV-1105.
- Live fixture verified homepage promotion, desktop navigation, public campaign
  rendering, booking-option switching, and sitemap inclusion.
- Closed fixture verified promotion/navigation removal, sitemap removal, and
  public 404.
- Campaign and legacy media revalidation payloads both returned successful,
  correctly scoped responses.
- Code review found and fixed a non-public-status fail-closed edge case.

Pending owner/approved release work:

- reconcile linked Supabase migration history and apply the Mini Sessions migration;
- configure production revalidation environment values on both deployments;
- confirm Jenn-owned Cal.com, Stripe, bank, and conflict-calendar connections;
- confirm the 20-minute session plus 10-minute turnover decision;
- create the production Cal.com event type(s) and first CMS campaign;
- complete and refund a controlled real booking;
- verify mobile production behavior, real Cal.com embed callbacks, email delivery,
  calendar records, slot removal, GA4 receipt, and refund/cancellation behavior;
- deploy only after separate authorization.
