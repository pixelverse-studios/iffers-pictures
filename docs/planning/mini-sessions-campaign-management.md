# Mini Sessions Campaign Management Plan

## Summary

Build a reusable mini-session campaign system for limited seasonal and popup photography offerings such as Fall Mini Sessions, Christmas Popup Sessions, and Mother's Day Minis.

Jenn will manage the client-facing campaign from the existing authenticated `/admin/media` dashboard. Cal.com remains the source of truth for bookable time slots and the required deposit. Stripe remains the payment processor and financial system of record.

The feature must add no fixed monthly software cost. Normal Stripe transaction fees remain unavoidable. Cal.com SMS credits, paid Cal.com API access, and other optional paid services are outside the initial scope.

## Operational Model

The system has three distinct concepts:

1. **Campaign** — the seasonal website promotion, copy, imagery, pricing explanation, and public lifecycle.
2. **Booking option** — one bookable Cal.com event link shown within a campaign. A campaign may have one or several options for different dates or locations.
3. **Cal.com event type** — the external scheduling configuration that owns actual availability, duration, calendar conflict checks, and required deposit.

Example:

```text
Campaign: Christmas Popup Sessions 2026
  Booking option: Saturday, November 21 — Cliffside Park
    Cal.com event: /iffers-pictures/christmas-popup-nov-21
  Booking option: Sunday, November 22 — Fort Lee
    Cal.com event: /iffers-pictures/christmas-popup-nov-22
```

The CMS controls whether a booking option is presented and how it is labeled. It does not edit or infer Cal.com availability.

## Users

### Jenn / site administrator

- Creates and edits seasonal campaigns.
- Selects a hero image from the published media library.
- Adds one or more Cal.com booking options.
- Controls public labels, copy, pricing explanation, policies, and campaign state.
- Publishes, marks sold out, closes, duplicates, and archives campaigns.
- Uses Cal.com separately to configure slots and the deposit.

### Prospective client

- Discovers a live campaign on the website.
- Reads the offer, pricing, deliverables, location, and policies.
- Selects a date/location option when more than one is available.
- Chooses a slot and pays the deposit within the embedded Cal.com flow.
- Receives Cal.com/Stripe confirmation.

## Success Criteria

- Jenn can launch or remove a seasonal campaign without a code deployment.
- Jenn can reuse a prior campaign through duplication rather than rewriting it.
- Only one campaign can be publicly active for the website at a time.
- A live campaign can contain multiple ordered booking options.
- A slot is not represented as booked by this CMS; Cal.com owns slot locking and payment gating.
- The public page never exposes draft, archived, internal, audit, or administrator data.
- Publishing or closing a campaign updates the homepage and `/mini-sessions` within a predictable cache window, with explicit revalidation attempted immediately.
- Failed CMS/API requests do not leave the editor showing a false saved or published state.
- No card details or Stripe secrets pass through the website or Pixelverse server.
- The feature remains usable on mobile and meets the site's existing accessibility standards.

## Explicit Non-Goals

- Creating, editing, or deleting Cal.com event types from the CMS.
- Reading Cal.com availability through its API.
- Automatically detecting when all Cal.com slots are sold out.
- Automatically charging the remaining session balance.
- Reconciling the remaining balance inside Cal.com or the CMS.
- Processing refunds, disputes, taxes, or chargebacks.
- Replacing Cal.com with a custom scheduling engine.
- Storing card data, Stripe access tokens, or bank details.
- Sending paid SMS reminders from this application.
- A general-purpose WYSIWYG page builder.
- Adding Mini Sessions as a sixth evergreen service in `SESSIONS`.
- Supporting multiple simultaneously published campaigns in the first release.
- A public waitlist database in the first release; sold-out campaigns link to the existing inquiry path.

## Product Decisions and Defaults

These defaults make the scope ticket-ready. They can be changed before ticket creation.

### Public route

- Use one evergreen route: `/mini-sessions`.
- Return a real `404` when no campaign is `live` or `sold_out`.
- Exclude the route from the sitemap while unavailable.
- Keep a sold-out campaign public so interested clients can inquire.

### Campaign lifecycle

Use the following states:

| State | Public page | Booking embed | Purpose |
| --- | --- | --- | --- |
| `draft` | Hidden | Hidden | Work in progress |
| `live` | Visible | Available options shown | Accepting bookings |
| `sold_out` | Visible | Hidden | Preserve campaign context and show inquiry CTA |
| `closed` | Hidden | Hidden | Temporarily or permanently turned off |
| `archived` | Hidden | Hidden | Historical campaign removed from normal editing |

Only `live` and `sold_out` count as publicly active. A partial unique database constraint must prevent more than one public campaign per website.

### Booking-option lifecycle

Each booking option uses:

- `open` — selectable and embeddable.
- `sold_out` — displayed as unavailable.
- `hidden` — not returned publicly.

A `live` campaign must have at least one `open` booking option. Cal.com can still show no available times if its real slots are exhausted; Jenn then marks the option or campaign sold out manually.

### Promotion surfaces

When a campaign is public:

- Add a compact seasonal promotion to the homepage after the hero/image strip and before the evergreen story content.
- Add a conditional `Minis` navigation link on desktop and mobile.
- Do not add a global announcement bar in the first release because the fixed header and page offsets would require broader layout changes.
- Do not add a permanent footer link while the feature is inactive.

### Copy editing

Use structured plain-text fields instead of arbitrary HTML or Markdown. This avoids XSS, broken layouts, and a full rich-text editor.

The editor supports:

- Short single-line fields.
- Multi-line paragraphs rendered with preserved line breaks.
- Reorderable inclusion bullets.
- Dedicated policy fields.

### Payment wording

- Store total price and deposit as integer cents.
- Display both values, but treat them as explanatory website content only.
- Cal.com/Stripe remains authoritative for the amount actually charged.
- Publishing requires the administrator to confirm that the Cal.com deposit and availability were checked.
- The CMS does not claim that the remaining balance has been collected.

## Administrator Experience

Add a third primary view to the existing `/admin/media` application:

```text
Media Library
Page Images
Mini Sessions
```

The first release keeps the existing route and authentication flow. A broader rename from “Media” to “Site Admin” can happen later without blocking this feature.

### Campaign list

The Mini Sessions view shows:

- Campaign internal name.
- Public headline.
- Status badge.
- Last updated timestamp.
- Public date/location summary.
- Number of booking options.
- Actions: Edit, Duplicate, Preview, Publish, Mark sold out, Close, Archive.

Archived campaigns are hidden behind a filter. Destructive deletion is not exposed in the initial UI.

### Campaign editor sections

#### Internal setup

- Internal campaign name.
- Campaign status, displayed but changed through explicit lifecycle actions.

#### Public identity

- Eyebrow/public label.
- Main headline.
- Short summary.
- Full description.
- CTA label, defaulting to `Choose your time`.

#### Offer details

- Session duration in minutes, defaulting to `20`.
- Total price.
- Required deposit.
- Balance-due explanation.
- General date summary.
- General location summary.
- Reorderable “what is included” bullets.

#### Policies

- Cancellation/rescheduling policy.
- Weather policy.
- Lateness/no-show policy.
- Optional general terms note.

#### Media

- Hero image selected from published site or portfolio media.
- Image preview and existing alt text shown in the editor.
- Publishing is blocked if the selected media item is not published.
- Public rendering uses a safe static fallback if the selected media later becomes unavailable.

#### Booking options

Each option has:

- Public label.
- Optional supporting description.
- Display date/time.
- Display location.
- Cal.com HTTPS booking URL.
- Status: open, sold out, or hidden.
- Sort order controlled with move up/down actions.

The form accepts only supported Cal.com hosts unless a future ticket deliberately broadens providers. Suggested initial allowlist:

- `cal.com`
- `www.cal.com`

#### Homepage promotion

- Promotion label.
- Promotion headline.
- Short promotional copy.
- CTA label.
- Toggle to feature on the homepage while public.

#### SEO

- Optional meta title.
- Optional meta description.
- Generated defaults previewed when fields are empty.

### Saving and publishing

- `Save draft` persists content without changing public state.
- Dirty-form navigation produces an unsaved-changes warning.
- `Preview` renders the reusable public campaign component inside an authenticated admin modal/drawer; drafts never need a public preview token.
- `Publish` runs server validation and asks for confirmation.
- The publish dialog includes a required acknowledgment: “I verified the Cal.com event names, availability, duration, location, and deposit.”
- Publishing a new campaign atomically closes the currently public campaign.
- `Mark sold out` keeps the page visible but removes booking embeds.
- `Close` removes the page and all conditional promotion links.
- `Duplicate` creates a new draft with copied content and booking options, but clears publication timestamps and changes the internal name to indicate a copy.
- The UI only reports success after the API returns the persisted resource.

## Public Experience

### Page composition

`/mini-sessions` contains:

1. Campaign hero with selected image, label, headline, and summary.
2. Key facts: date summary, location summary, duration, total price, and deposit.
3. Description and inclusions.
4. Booking-option selector when multiple open options exist.
5. Inline Cal.com embed for the selected option.
6. Deposit/balance explanation immediately before booking.
7. Policies and common questions.
8. Final contact CTA.

When there is one open booking option, render its embed without an unnecessary selection step.

When the campaign is sold out:

- Preserve the hero, details, and offer content.
- Replace the booking area with a sold-out message.
- Link to `/contact?session=family` by default, with campaign context included through a safe query parameter if the contact form is extended to accept it.

### Cal.com embed behavior

- Use Cal.com's standard embed script or supported React embed package, not Cal.com Atoms or a custom API.
- Load the embed only when it approaches the viewport to protect initial page performance.
- Show a branded loading skeleton.
- Show a fallback external booking link if the embed fails.
- Reinitialize the embed when a client selects another booking option.
- Preserve UTM parameters where supported.
- Listen for Cal.com's documented booking completion event for analytics only.
- Never treat a client-side embed event as authoritative payment reconciliation.

### Accessibility

- Booking-option controls use real buttons or radios with an accessible selected state.
- Status is not conveyed by color alone.
- Focus moves to the booking area after selecting an option when appropriate.
- The external-booking fallback is keyboard accessible.
- CMS fields have labels, validation messages, and descriptive help text.
- Motion honors reduced-motion settings.

## Data Model

Add two tenant-scoped tables in the Pixelverse server Supabase migrations.

### `mini_session_campaigns`

Suggested columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key, generated |
| `website_id` | `uuid` | Required website tenant |
| `client_id` | `uuid` | Required client tenant |
| `internal_name` | `text` | Admin-only label |
| `status` | `text` | Checked lifecycle value |
| `public_label` | `text` | Eyebrow/seasonal label |
| `headline` | `text` | Main public title |
| `summary` | `text` | Short public summary |
| `description` | `text` | Main body copy |
| `duration_minutes` | `integer` | Positive, default 20 |
| `total_price_cents` | `integer` | Non-negative |
| `deposit_cents` | `integer` | Non-negative and not above total |
| `balance_due_text` | `text` | Public explanation |
| `date_summary` | `text` | Display-only date copy |
| `location_summary` | `text` | Display-only location copy |
| `inclusions` | `jsonb` | Validated array of bounded strings |
| `cancellation_policy` | `text` | Public policy |
| `weather_policy` | `text` | Public policy |
| `lateness_policy` | `text` | Public policy |
| `terms_note` | `text` | Optional public terms |
| `hero_media_id` | `bigint` | Optional media catalog reference |
| `cta_label` | `text` | Booking CTA |
| `homepage_featured` | `boolean` | Conditional homepage module |
| `promo_label` | `text` | Homepage promotion |
| `promo_headline` | `text` | Homepage promotion |
| `promo_copy` | `text` | Homepage promotion |
| `promo_cta_label` | `text` | Homepage promotion |
| `meta_title` | `text` | Optional SEO override |
| `meta_description` | `text` | Optional SEO override |
| `published_at` | `timestamptz` | Set on publish |
| `published_by` | `text` | Admin email |
| `created_by` | `text` | Admin email |
| `updated_by` | `text` | Admin email |
| `created_at` | `timestamptz` | UTC |
| `updated_at` | `timestamptz` | UTC trigger |

Database constraints:

- Composite website/client foreign key, matching the media tables.
- Status check constraint.
- Positive duration and bounded copy lengths.
- Deposit cannot exceed total price.
- Partial unique index allowing only one `live` or `sold_out` campaign per website.
- RLS enabled; the API continues using the server-side service role.

### `mini_session_booking_options`

Suggested columns:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key |
| `campaign_id` | `uuid` | Parent campaign, cascade delete |
| `website_id` | `uuid` | Tenant enforcement |
| `client_id` | `uuid` | Tenant enforcement |
| `label` | `text` | Public option name |
| `description` | `text` | Optional public detail |
| `date_time_label` | `text` | Display-only text |
| `location_label` | `text` | Display-only text |
| `cal_booking_url` | `text` | Validated HTTPS Cal.com URL |
| `status` | `text` | `open`, `sold_out`, `hidden` |
| `sort_order` | `integer` | Stable display ordering |
| `created_at` | `timestamptz` | UTC |
| `updated_at` | `timestamptz` | UTC trigger |

Use a composite parent/tenant foreign key so booking options cannot cross website boundaries.

### Audit trail

Create a focused `mini_session_campaign_audit_logs` table or extend a future generic site-admin audit table. Record:

- Campaign id and website/client ids.
- Action.
- Actor email.
- Old and new values for mutations.
- Timestamp.

Required actions:

- `created`
- `draft_saved`
- `duplicated`
- `published`
- `marked_sold_out`
- `closed`
- `archived`
- `booking_options_changed`

Audit failure should be logged but should not roll back an already successful campaign mutation, matching current media-audit behavior.

## API Contract

Introduce a dedicated domain rather than using the unauthenticated legacy `/api/cms` mutation routes.

Suggested upstream routes:

```text
GET    /api/mini-session-campaigns/:websiteSlug/active
GET    /api/mini-session-campaigns/:websiteSlug/admin
GET    /api/mini-session-campaigns/:websiteSlug/admin/:campaignId
POST   /api/mini-session-campaigns/:websiteSlug/admin
PATCH  /api/mini-session-campaigns/:websiteSlug/admin/:campaignId
POST   /api/mini-session-campaigns/:websiteSlug/admin/:campaignId/duplicate
POST   /api/mini-session-campaigns/:websiteSlug/admin/:campaignId/publish
POST   /api/mini-session-campaigns/:websiteSlug/admin/:campaignId/mark-sold-out
POST   /api/mini-session-campaigns/:websiteSlug/admin/:campaignId/close
POST   /api/mini-session-campaigns/:websiteSlug/admin/:campaignId/archive
```

All `/admin` routes use the existing `requireMediaAdminSession` middleware until authentication is generalized. The website slug must resolve to a valid website/client pair for every operation.

### Public response

Return one sanitized object or `404` when no campaign is public. Include only:

- Public campaign fields.
- Public hero media projection.
- Non-hidden booking options in stable order.
- Public status.
- Updated/published timestamps needed for caching or metadata.

Do not return:

- Internal name.
- Actor emails.
- Audit values.
- Draft/closed/archived campaigns.
- Hidden booking options.
- Database tenant identifiers unless required by the frontend.

### Admin writes

- Validate request bodies with `express-validator` and domain-level validation.
- Reject unsupported status changes through the generic PATCH endpoint; lifecycle changes use explicit action endpoints.
- Reject protocol-relative, non-HTTPS, credential-bearing, or non-Cal.com booking URLs.
- Bound list lengths and text sizes.
- Validate that referenced media belongs to the same website/client.
- Validate that referenced media is published before campaign publication.
- Require at least one open booking option before publishing live.
- Publish/replace the active campaign atomically and retain a database uniqueness constraint as the final guard.
- Return structured error codes for field validation, stale state, media problems, and lifecycle conflicts.

### Concurrency

Use `updated_at` as an optimistic concurrency token on PATCH and lifecycle mutations. The admin sends the version it loaded. If it no longer matches, return `409` and require a refresh rather than silently overwriting a newer edit.

## Frontend Data Flow

### Public server access

Add a server-only campaign client parallel to `src/lib/media/server.ts`:

- Fetch the active campaign from the Pixelverse server.
- Use a short revalidation window, initially 60 seconds.
- Return `null` on a true `404`.
- Distinguish `not configured`, `not found`, and upstream failure.
- Do not silently render stale campaign content forever on an upstream failure.

Recommended failure policy:

- `/mini-sessions`: return a controlled unavailable state or `notFound()` when no cached campaign exists.
- Homepage/header: fail closed and omit promotion when campaign state cannot be established.
- Admin: show the error and keep unsaved local edits intact.

### Browser/admin access

Add typed client functions parallel to `src/lib/media/client.ts` and route through a same-origin Next.js proxy so the existing HTTP-only admin session cookie continues to work.

### Revalidation

Generalize the existing media revalidation mechanism into a site-content revalidation contract, or add a campaign-specific equivalent with the same security model.

Campaign mutations should revalidate:

- `/`
- `/mini-sessions`
- Root layout/site chrome when the conditional navigation item changes.
- `/sitemap.xml` if the route is included conditionally.

The database mutation remains successful if the revalidation webhook fails. The API returns or logs revalidation status, and the public cache expires naturally within the bounded TTL.

## Likely Website Files

Existing files likely to change:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/api/media/revalidate/route.ts` or its generalized replacement
- `src/components/layout/SiteChrome.tsx`
- `src/components/layout/Header.tsx`
- `src/components/features/homepage/HomePageContent.tsx`
- `src/components/features/homepage/BoardHomeLayout.tsx`
- `src/components/features/admin-media/AdminMediaManager.tsx`
- `src/components/features/admin-media/AdminMediaLibrary.tsx`
- `src/components/features/admin-media/AdminMediaSidebar.tsx`
- `src/components/features/admin-media/types.ts`
- `src/lib/analytics.ts`
- `src/lib/media/client.ts` only if the existing proxy/client is deliberately extended
- `src/lib/media/types.ts` only for shared media projection types or a new placement slot

Likely new files:

- `src/app/mini-sessions/page.tsx`
- `src/app/api/mini-session-campaigns/[...path]/route.ts`
- `src/components/features/mini-sessions/MiniSessionCampaignPage.tsx`
- `src/components/features/mini-sessions/MiniSessionBookingEmbed.tsx`
- `src/components/features/mini-sessions/MiniSessionBookingOptions.tsx`
- `src/components/features/mini-sessions/MiniSessionSchema.tsx`
- `src/components/features/homepage/MiniSessionPromotion.tsx`
- `src/components/features/admin-media/AdminMiniSessions.tsx`
- `src/components/features/admin-media/AdminMiniSessionEditor.tsx`
- `src/components/features/admin-media/AdminMiniSessionPreview.tsx`
- `src/lib/mini-sessions/types.ts`
- `src/lib/mini-sessions/client.ts`
- `src/lib/mini-sessions/server.ts`
- `src/lib/mini-sessions/validation.ts`

Final paths may be adjusted during implementation to avoid making `AdminMediaManager.tsx`, already a large component, own additional campaign state.

## Likely Pixelverse Server Files

Existing files likely to change:

- `src/server.ts`
- `src/lib/db.ts`
- `src/routes/middleware.ts` only if a semantic `requireSiteAdminSession` alias is introduced
- `src/services/media-revalidation.ts` or its generalized replacement
- `AGENTS.md` for the new API surface and table documentation

Likely new files:

- `src/routes/mini-session-campaigns.ts`
- `src/controllers/mini-session-campaigns.ts`
- `src/services/mini-session-campaigns.ts`
- `src/lib/mini-session-campaigns.ts`
- `src/services/mini-session-campaign-audit.ts`
- `supabase/migrations/<timestamp>_create_mini_session_campaigns.sql`
- `test/mini-session-campaigns-routes.test.ts`
- `test/mini-session-campaigns-service.test.ts`
- `test/mini-session-campaigns-revalidation.test.ts`

## Analytics

Add first-party GA events without customer PII:

- `mini_sessions_campaign_view`
- `mini_sessions_promo_click`
- `mini_sessions_booking_option_select`
- `mini_sessions_booking_embed_loaded`
- `mini_sessions_booking_embed_error`
- `mini_sessions_booking_complete`
- `mini_sessions_sold_out_inquiry_click`

Suggested parameters:

- Campaign public id or non-sensitive slug-like identifier.
- Booking option id.
- CTA location.
- Campaign status.
- Booking provider (`cal_com`).

Do not send attendee name, email, phone, freeform notes, payment identifiers, or Stripe information to GA.

## SEO and Structured Data

- Generate page metadata from the active campaign with safe fallbacks.
- Use a canonical URL of `https://ifferspictures.com/mini-sessions`.
- Include BreadcrumbList schema.
- Use Service/Offer structured data only for values actually represented on the page.
- Do not claim live availability in schema because the CMS does not read Cal.com availability.
- Add the route to the sitemap only while `live` or `sold_out`, consistent with the chosen true-off behavior.
- Use the campaign hero for social sharing only if it can provide an appropriate crop; otherwise retain the site-wide OG image.

## Security and Privacy Review

- Reuse the existing HTTP-only media-admin session and approved-email check for every admin endpoint.
- Do not reuse the legacy unprotected CMS mutation endpoints.
- Enforce website/client ownership on campaigns, booking options, and hero media.
- Store prices as integer cents, never floating-point values.
- Sanitize and length-limit all administrator-authored text before persistence and render it as text, not raw HTML.
- Validate Cal.com URLs server-side and client-side; server validation is authoritative.
- Do not accept arbitrary embed HTML or JavaScript from the CMS.
- Use optimistic concurrency to prevent accidental overwrite from two browser tabs.
- Keep drafts out of all public endpoints and caches.
- Rate-limit or at minimum monitor admin mutations using existing session identity and audit logs.
- Never store Stripe or Cal.com OAuth credentials for this feature.
- Do not include booking/customer PII in analytics or campaign audit logs.

## Performance and Reliability Review

- Lazy-load Cal.com only near the booking section.
- Keep homepage campaign fetching parallel with existing media fetching.
- Return a compact public projection rather than full admin records.
- Bound campaign inclusions and booking option counts; suggested maximums are 12 inclusions and 6 booking options.
- Cache the public active campaign for no more than 60 seconds, with explicit revalidation on lifecycle changes.
- Use static image dimensions and `sizes` with Next.js `Image`.
- Ensure a Cal.com failure does not break the rest of the page.
- Provide an external booking-link fallback.
- Treat Cal.com and CMS date/deposit text as potentially divergent; reinforce the publish checklist and operational documentation.

## Test Strategy

### Database and service tests

- Campaign and booking-option tenant constraints.
- Deposit cannot exceed total price.
- Invalid lifecycle/status combinations are rejected.
- Only one public campaign per website.
- Duplicate creates a draft with copied options.
- Publishing closes the previous active campaign atomically.
- Publishing rejects missing/unpublished/cross-tenant hero media.
- Publishing rejects campaigns without an open booking option.
- Unsupported or unsafe Cal.com URLs are rejected.
- Optimistic concurrency returns `409` on stale writes.
- Public projection omits private fields and hidden options.

### Route/auth tests

- Public active route needs no admin session.
- Every admin read and mutation rejects missing, expired, and unapproved sessions.
- Validation errors use consistent error codes.
- Cross-website campaign ids cannot be read or mutated.
- Lifecycle action routes enforce valid transitions.

### Website unit/component tests

- Draft/closed absence returns the intended off behavior.
- Live campaign renders the correct offer and booking options.
- One option skips the selector.
- Multiple options update the embed.
- Sold-out state hides embeds and shows inquiry CTA.
- Embed failure shows the external-link fallback.
- Admin form reports field errors and retains input after failure.
- Publish controls are disabled until required conditions are satisfied.
- Preview uses unsaved editor data without exposing a public draft.

### Integration/manual QA

- Create Stripe and Cal.com accounts under Jenn's ownership.
- Connect Jenn's real calendar and verify conflict calendars.
- Configure a low-risk test Cal.com event and deposit.
- Complete a real booking using a low amount, verify Stripe receipt/payout state, then refund it.
- Confirm the Cal.com calendar event, confirmation email, and slot removal.
- Confirm the CMS page displays total/deposit language accurately.
- Verify changing between two booking options on mobile.
- Verify publish, sold-out, close, duplicate, and archive flows.
- Verify homepage and navigation appear/disappear after revalidation.
- Run `npm run lint` and `npm run build` in the website repository.
- Run `npm test` and `npm run build` in the Pixelverse server repository.

## Rollout and Operational Setup

### Phase 1 — Backend foundation

- Add migrations, constraints, audit model, service, routes, authentication, validation, and tests.
- Add public and admin campaign contracts.
- Add bounded cache headers and revalidation support.

### Phase 2 — Admin campaign management

- Add Mini Sessions navigation and campaign list.
- Add structured editor, media selection, booking options, preview, duplication, and lifecycle actions.
- Add error, conflict, unsaved, loading, and empty states.

### Phase 3 — Public campaign experience

- Build `/mini-sessions`.
- Add multi-option Cal.com embed behavior and fallbacks.
- Add sold-out handling, metadata, schema, and analytics.
- Add conditional homepage and navigation promotion.

### Phase 4 — Account setup and launch QA

- Jenn creates/owns Stripe and Cal.com accounts.
- Connect bank, Stripe, and calendar.
- Configure the first Cal.com event type(s).
- Populate the first campaign through the CMS.
- Complete a controlled live payment/refund test.
- Document the repeatable campaign-launch checklist.

## Proposed Ticket Breakdown

The final Linear tickets should use team `DEV`, project `Iffers Pics Site - 2026`, milestone `Launch`, assignee `me`, and priority Medium.

### 1. Server: campaign schema and domain service

Scope:

- Supabase migrations for campaigns, booking options, constraints, indexes, and audit logs.
- Tenant resolution and domain service.
- Public/admin resource mapping.
- Unit tests for lifecycle, tenant integrity, duplication, and publication rules.

Dependencies: none.

### 2. Server: authenticated campaign API and revalidation

Scope:

- Public active endpoint.
- Authenticated list/detail/create/update/action endpoints.
- Input validation, optimistic concurrency, structured errors.
- Campaign audit writes.
- Site revalidation integration.
- Route/auth/revalidation tests.

Dependencies: Ticket 1.

### 3. Frontend: typed campaign data layer and proxy

Scope:

- Shared public/admin TypeScript contracts.
- Same-origin API proxy.
- Browser admin client.
- Server-only public fetcher, cache, and failure semantics.
- Focused parsing/client tests if test infrastructure supports them.

Dependencies: Ticket 2 contract stable.

### 4. Admin: campaign list, editor, and media selection

Scope:

- Mini Sessions dashboard navigation.
- Campaign list and status filters.
- Structured campaign editor.
- Published-media hero picker.
- Reorderable booking-option editor.
- Save, validation, conflict, loading, and unsaved states.

Dependencies: Ticket 3.

### 5. Admin: preview and campaign lifecycle actions

Scope:

- In-dashboard preview using unsaved editor state.
- Duplicate, publish, sold-out, close, and archive actions.
- Cal.com verification checklist.
- Revalidation feedback and QA.

Dependencies: Ticket 4.

### 6. Public UI: mini-session campaign page and Cal.com booking

Scope:

- `/mini-sessions` route and dynamic metadata.
- Public campaign layout.
- One/multiple booking-option behavior.
- Lazy Cal.com embed and external-link fallback.
- Sold-out state, policies, schema, analytics, responsive/accessibility QA.

Dependencies: Ticket 3; can run in parallel with Tickets 4–5 after the contract is stable.

### 7. Public UI: conditional promotion surfaces

Scope:

- Homepage seasonal promotion.
- Conditional desktop/mobile navigation item.
- Sitemap behavior.
- Cache/revalidation verification.
- Promotion analytics.

Dependencies: Tickets 3 and 6.

### 8. Operations: Cal.com, Stripe, launch configuration, and runbook

Scope:

- Jenn-owned account setup.
- Calendar, event type, deposit, and booking policy setup.
- First campaign content entry.
- Controlled payment/refund test.
- Repeatable launch/close/duplicate runbook in `docs/`.

Dependencies: Tickets 4–7.

## Estimate

Estimated implementation effort for the full scoped release:

| Workstream | Estimate |
| --- | ---: |
| Database, domain service, audit | 10–16 hours |
| API, auth, validation, concurrency, revalidation | 12–18 hours |
| Frontend data/proxy/cache layer | 6–10 hours |
| Admin list/editor/media/options | 18–26 hours |
| Admin preview and lifecycle actions | 8–12 hours |
| Public page and Cal.com integration | 14–20 hours |
| Homepage/nav/SEO/analytics | 8–12 hours |
| Cross-repo tests and live operational QA | 10–16 hours |
| **Total** | **86–130 hours** |

Expected elapsed delivery is approximately **2–3 working weeks**, depending on review speed, account verification, content readiness, and whether backend/frontend tickets are worked in parallel.

This estimate is intentionally larger than a one-campaign CMS toggle because the full scope includes multiple booking options, campaign history/duplication, lifecycle safety, protected server APIs, audit records, optimistic concurrency, responsive admin editing, public promotion surfaces, and cross-repository verification.

## Risks and Mitigations

### CMS and Cal.com can drift

Risk: Jenn updates a date or deposit in one system but not the other.

Mitigation: Cal.com is explicitly authoritative for booking/payment; publishing requires a verification checklist; operational runbook lists both update locations.

### Cal.com free-plan behavior changes

Risk: Payment or embed availability changes in the future.

Mitigation: Store a provider URL rather than internal Cal.com ids, isolate the embed in one component, and preserve an external-link fallback.

### Publishing could expose incomplete content

Risk: Missing policies, image, booking option, or pricing creates an unclear offer.

Mitigation: Separate draft-save validation from stricter publish validation and show a publish-readiness checklist.

### Caching delays the off switch

Risk: A closed campaign remains visible briefly.

Mitigation: Explicit path/layout revalidation plus a maximum 60-second public cache. Document that the switch is near-immediate, not an emergency revocation mechanism.

### Existing admin component is large

Risk: Adding state directly to `AdminMediaManager.tsx` makes it harder to maintain.

Mitigation: Build the campaign view as a self-contained feature module and limit changes in the existing manager/sidebar to routing and shared session/media data.

### Media is later archived

Risk: A live campaign references a no-longer-published hero.

Mitigation: Require published media at launch, omit unavailable media from the public projection, and render a static fallback without breaking the campaign.

### Duplicate or stale edits

Risk: Two tabs overwrite campaign changes or two campaigns become active.

Mitigation: Optimistic concurrency, explicit lifecycle endpoints, atomic publish behavior, and a partial unique database index.

## Decisions Required Before Ticket Creation

The plan uses recommended defaults, but these product details should be confirmed when converting it into tickets:

1. Confirm that “off” should return a true 404 rather than a closed/waitlist page.
2. Confirm whether the first release needs multiple booking options per campaign; this plan includes them.
3. Confirm the homepage promotion placement and whether the conditional navigation label should always be `Minis` or be CMS-controlled.
4. Confirm whether sold-out campaigns should use the existing inquiry form or require a dedicated waitlist in a later phase.
5. Confirm whether Jenn will collect the remaining balance through Stripe, offline, or either; the CMS only explains the policy.
6. Confirm whether 20 minutes means the complete booking block or 20 minutes of photography plus turnover time.
7. Supply or approve the initial cancellation, weather, lateness, refund, and remaining-balance language.
8. Confirm the account owner email and calendar that Jenn will connect to Cal.com.

## Definition of Ready for Ticketing

The feature is ready to become Linear tickets when:

- The eight product decisions above are answered or accepted as defaults.
- The first campaign's total price, deposit, dates, location, inclusions, and policies are available.
- Jenn confirms she will own the Cal.com and Stripe accounts.
- The team accepts the two-system operational boundary.
- The proposed ticket split and full-release estimate are accepted.

