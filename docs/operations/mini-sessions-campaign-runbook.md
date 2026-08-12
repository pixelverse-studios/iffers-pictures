# Mini Sessions campaign runbook

This is the day-to-day checklist for launching and managing a seasonal Mini
Sessions release. Jenn owns the Cal.com, Stripe, payout-bank, and connected
calendar accounts. Never paste passwords, API keys, bank details, identity
documents, payment IDs, or attendee details into the CMS, GitHub, Linear, or
this document.

## What each system controls

- **Cal.com** controls dates, real availability, conflict checking, bookings,
  confirmation messages, and the deposit checkout.
- **Stripe** receives the deposit and handles refunds and payouts.
- **Iffer's Pictures CMS** controls the public campaign copy, image, displayed
  price/deposit, broad public location, booking links, homepage promotion, and
  campaign status.

The CMS does not create Cal.com slots or charge cards. Changing CMS text does
not change Cal.com or Stripe, so the two systems must be compared before every
publish.

## One-time owner setup

Complete these steps while signed in to Jenn-owned accounts:

1. Finish Cal.com onboarding with the correct display name and Eastern Time.
2. Connect the calendar that should receive bookings.
3. Enable conflict checking for every personal or business calendar that can
   make Jenn unavailable, and select the correct destination calendar.
4. Install Stripe from the Cal.com app store and connect Jenn's Stripe account.
5. In Stripe, finish business verification, connect the payout bank, and confirm
   that payments and payouts are enabled.
6. Turn on Stripe customer emails for successful payments and refunds if those
   messages are desired.

Cal.com's current setup guidance is available in [account onboarding](https://cal.com/help/quick-start/complete-onboarding), [calendar connection guidance](https://cal.com/help/enterprise/members-onboarding), and [Stripe payment setup](https://cal.com/help/event-types/how-to-receive-payments).

## Standard event configuration

Use the reusable Mini Sessions Cal.com event type. Campaign dates and available
times are managed only in Cal.com; do not duplicate them in the CMS.

- Event name: match the customer-facing CMS option label.
- Duration: **20 minutes of photographed session time**.
- Turnover: **not included in the 20 minutes**. Add a **10-minute buffer after**
  each event so a normal sequence starts every 30 minutes. Cal.com treats the
  buffer as unavailable time; do not also add a before-buffer unless the wider
  spacing is intentional. See [Cal.com event buffers](https://cal.com/help/event-types/event-buffer).
- Time zone: `America/New_York` / Eastern Time.
- Availability: use the exact campaign date and bookable window. Check date
  overrides, slot interval, minimum notice, future-booking limit, and booking
  frequency before launch.
- Location: the CMS defaults to the broad public area, `Bergen County, NJ`.
  Cal.com owns the exact event location used during booking and in booking
  communications. Use only details Jenn is comfortable showing before booking.
- Payment: charge only the booking deposit. The remaining balance is collected
  manually; this release does not auto-charge it.
- Questions: keep to information needed to prepare for the session. Do not ask
  for sensitive medical, financial, or identity information.
- Policies: make cancellation, weather, lateness, deposit, and balance wording
  agree with the CMS.
- Communication: keep the normal booking confirmation enabled. Add an attendee
  email reminder 24 hours before and, if useful, another 2 hours before. Custom
  workflow availability depends on the Cal.com plan; see [Cal.com Workflows](https://cal.com/help/workflows/workflowsoverview).

Before using a booking link, open it in a private window and confirm the event
name, date, time zone, duration, location, deposit, remaining slots, questions,
and policies.

## Create and publish a campaign

1. In `/admin/media`, publish the hero image first.
2. Open **Mini Sessions** and select **New campaign**.
3. Enter the public copy, total price, deposit, balance wording, general
   location, inclusions, and policies.
4. Confirm the reusable `https://cal.com/ifferspictures/mini-sessions` booking
   URL is present. Set the campaign dates and available times in Cal.com.
5. Add the homepage promotion copy only if this release should be featured.
6. Select **Save draft**, then **Preview**. The preview is private, does not
   create a public URL, and does not load Cal.com.
7. Complete every item under **Publish readiness**.
8. Compare the CMS and Cal.com values using the table below.
9. Select **Publish campaign** and confirm the Cal.com verification checkbox.
10. Check the public page, homepage promotion, desktop and mobile **Minis**
    navigation, booking option picker, and live Cal.com availability.

| Compare before publish | CMS | Cal.com / Stripe |
| --- | --- | --- |
| Customer-facing name | Headline and option label | Event name |
| Session length | Duration | Event duration: 20 minutes |
| Turnover | Not part of customer duration | 10-minute after-buffer |
| Dates and times | Shown through the embedded booking calendar | Availability/date overrides |
| Location | Broad public area (`Bergen County, NJ`) | Exact event location |
| Total price | Total price | Internal reference only |
| Deposit | Deposit and balance text | Stripe amount charged by Cal.com |
| Policies | Campaign policy fields | Event description/questions/messages |

## Update a live campaign

1. Change availability, payment, or customer questions in Cal.com first.
2. Update the matching CMS text or option URL.
3. Save the campaign and re-check the public page within 60 seconds.
4. If the CMS reports that the campaign saved but live-site refresh failed,
   wait 60 seconds and refresh again. Escalate using the troubleshooting section
   if the old state remains.

Never change the displayed deposit or location without checking the matching
Cal.com setup. Date and time changes belong in Cal.com only.

## Sell out, close, duplicate, and archive

### Sold out

1. Confirm Cal.com has no unintended open slots.
2. Select **Mark sold out** in the CMS.
3. Verify the public page remains visible but booking controls are replaced by
   the inquiry action. Homepage and navigation promotion remain visible.

### Close

1. Select **Close campaign** when the release should no longer be public.
2. Within 60 seconds, verify the homepage promotion and **Minis** navigation
   disappear, `/mini-sessions` returns not found, and the URL is absent from the
   sitemap.
3. Hiding or closing the CMS campaign does not cancel existing Cal.com bookings.

### Duplicate

1. Select **Duplicate as draft** on the previous campaign.
2. Update every location, price, deposit, policy, image, and promotion field,
   then set the new dates and availability in Cal.com.
3. Save, preview, and run the full pre-publish comparison again.

### Archive

Archive only drafts or closed campaigns that should become read-only history.
Archived campaigns are not deleted; duplicate one to reuse its content.

## Booking and refund procedure

### Controlled launch test

Run this only in an agreed launch window using team-controlled contact and
payment details. Do not record those details in project tools.

1. Book through the public `/mini-sessions` page at the approved low-value test
   amount or the real deposit amount.
2. Confirm the browser reaches Cal.com's success state.
3. Confirm Cal.com shows one confirmed booking.
4. Confirm the destination calendar contains the correctly timed event and the
   slot is no longer available.
5. Confirm Stripe shows one successful payment for the exact deposit.
6. Confirm the attendee received booking and payment emails.
7. Confirm analytics recorded booking completion without attendee, card,
   payment, or notes data.

### Refund the controlled payment

1. Open the matching payment in Jenn's Stripe Dashboard.
2. Verify the amount and customer before selecting **Refund**.
3. Refund the controlled payment and record only the date, amount, outcome, and
   test-case result in the private launch checklist—never copy the payment ID.
4. Verify Stripe reports the refund as successful or pending. A refund returns
   to the original payment method and can take several business days to appear;
   see [Stripe refund behavior](https://docs.stripe.com/refunds).
5. Check Cal.com separately. If the test booking remains confirmed, cancel it
   there and verify the calendar event and slot state. Do not assume a Stripe
   refund cancels a Cal.com booking.

## Troubleshooting

- **No slots:** check the connected conflict calendars, busy/free state, date
  overrides, slot interval, buffers, minimum notice, booking limits, and future
  booking window. Cal.com maintains a focused [slot display guide](https://cal.com/help/event-types/display-issues).
- **Wrong charge:** disable the event type, correct its payment amount, compare
  the CMS deposit text, and complete another controlled test before reopening.
- **Embed does not load:** use the visible **Open booking calendar** fallback.
  Confirm the CMS option URL begins with `https://cal.com/`.
- **Public state looks old:** wait 60 seconds, hard refresh, and check the CMS
  revalidation warning. If it persists, send the campaign name, action, time,
  and affected public URL to the internal team—no customer or payment data.
- **Concurrent edit warning:** do not overwrite automatically. Load the latest
  saved version, compare it with the unsaved edits, and apply the intended
  changes again.
- **Refund is pending or failed:** follow the payment status in Stripe. Do not
  promise a completion date beyond Stripe's displayed status.
