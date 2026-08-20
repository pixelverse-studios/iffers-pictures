# Deployment Summary

## Latest deploy summary

- Made the heading above the Mini Sessions "What's Included" list editable from the campaign dashboard, with "Session Details" as the default for existing and new campaigns.

- Fixed the Mini Sessions campaign list so publishing a new campaign immediately moves the previous public campaign to Closed instead of temporarily showing two Live cards.

- Made individual image editing one click from the media library while preserving every existing image field and action.
- Added a dedicated image-selection mode for bulk archiving and portfolio reordering.
- Added drag-and-drop portfolio ordering with automatic, duplicate-free position updates.
- Added a warning before unsaved image edits are discarded.

- Pre-populated the approved Mini Sessions FAQs in every existing campaign while keeping each campaign’s questions fully editable, reorderable, addable, and removable.
- Upgraded What’s Included reordering with a lifted drag preview, animated movement, a visible drop target, and keyboard-accessible controls.

- Redesigned the Mini Sessions page with a full-width hero, a more compact Experience and What’s Included layout, an editable Vibe section, and booking details that stay close to the calendar.
- Made the Mini Sessions hero label, Experience heading and formatted story, Vibe content, inclusions order, and page-only FAQs fully manageable from the dashboard.
- Added separate dashboard controls for the Mini Sessions button in the homepage hero and the larger seasonal promotion button so each displays Jen’s chosen wording.
- Fixed homepage photography that could disappear after the initial load and restored the main FAQ page to its original general and session questions.

- Updated the reusable Mini Sessions booking connection to Jen's new permanent Cal.com `/minis` link.

- Combined Mini Sessions payment details and the booking calendar so clients can see the deposit, total price, payment timing, location, and policies while choosing a time.

- Removed the unfinished Service Areas link so visitors are no longer sent to a missing page; the towns served remain visible in the footer.
- Added a branded social sharing image so Facebook and other link previews display Iffer's Pictures branding instead of a blank thumbnail.
- Reduced first-visit photography download sizes and prioritized the main page image so galleries appear sooner on mobile and desktop.
- Added lightweight image placeholders so new visitors see an intentional visual treatment while photos finish loading.
- Added a Mini Sessions workspace to the media dashboard so seasonal campaign copy, pricing, published imagery, inclusions, policies, promotion details, SEO, and Cal.com booking options can be managed without developer edits.
- Added mobile-friendly draft editing with clear save status, validation feedback, unsaved-change protection, and safe conflict recovery.
- Added a dedicated Mini Sessions page with campaign details, transparent deposit and balance information, policies, and an accessible session-option picker.
- Added a secure, near-viewport Cal.com booking calendar with a direct booking fallback when the embedded calendar cannot load.
- Sold-out Mini Sessions campaigns now replace booking controls with a clear inquiry path.
- Added an authenticated, unsaved campaign preview plus guided controls to duplicate, publish, mark sold out, close, and archive Mini Sessions campaigns.
- Campaign launches now include a readiness checklist and explicit Cal.com verification, while archived campaigns remain available as read-only history.
- Live and sold-out Mini Sessions can now be featured on the homepage and in site navigation, then disappear automatically when the campaign closes.
- Mini Sessions visibility now stays aligned across search engines and the website when campaign availability changes.
- Added a repeatable launch and operations checklist for seasonal Mini Sessions, including booking, sold-out, close, and refund handling.
- Added Jen's Autumn Keepsake Sessions FAQs to the Mini Sessions page with accessible question-and-answer controls and search-friendly structured data.
- Simplified the Mini Sessions editor with plain-language guidance, automatic internal and search details, and a clearer publishing workflow.
- Replaced duplicate scheduling controls with Jen's reusable Cal.com booking link and clarified which settings stay in Cal.com.
- Combined saving, previewing, validation guidance, and publishing into one responsive action bar that remains available while editing.
- Improved selected Mini Session campaign contrast so draft titles, summaries, and timestamps remain easy to read.
- Kept Image Library, Page Images, and Mini Sessions visible at the top of the admin menu so Jen can move between them without scrolling through portfolio categories.
- Removed duplicate campaign date entry from the Mini Sessions editor; Cal.com now remains the single place where Jen manages dates and available times.
- New and previously blank Mini Sessions campaigns now default to Bergen County, NJ as the broad website location, while Cal.com remains responsible for the exact booking location.
- Moved campaign copy and archive controls into the always-available action bar, removing the unnecessary More menu from the editor header.
- New Mini Sessions campaigns now start with Jen's expected $225 total and $100 deposit, while keeping both prices editable.
- Added a homepage-hero Mini Sessions callout that jumps directly to the seasonal promotion when a featured campaign is available.
- Tightened the embedded booking section, removed its repeated event-details panel, and reduced Cal.com spacing so the calendar uses the page more efficiently.
- Improved Mini Sessions editor typing responsiveness by preventing the full published-photo picker from rebuilding after every keystroke.
- Added a short timeout to Mini Sessions availability checks so a slow campaign service cannot hold up the rest of the website or dashboard.
- Kept the approved 48-hour final-payment wording compatible with the Autumn Keepsake FAQs.
- Removed duplicated session-length callouts from general website surfaces while preserving Jen's finalized FAQ wording.
- Extended unsaved-change protection to the dashboard home and logout actions.
- Prevented unsaved image edits from being lost when switching between Library, Page Images, and Mini Sessions.
- Portfolio position edits now immediately refresh every shifted image, so the dashboard always shows the saved sequence.
- Added Weddings under Events throughout the media dashboard and public portfolio so Jen can upload, edit, filter, and publish wedding photography in its own category.
- Updated every session page with its approved starting investment and a clearer Let’s Plan It! action, including the corrected $550 Event Sessions starting price.
- Fixed cursor jumps throughout the Mini Sessions editor so regular fields, FAQ questions, and formatted Experience, Vibe, and FAQ content keep the cursor where Jen is typing.
- Made the Mini Sessions FAQ label, heading, and introductory sentence editable for each campaign, with the existing live wording preserved as the default.
- Fixed the media dashboard so photos can be moved into the Events → Weddings folder without a database validation error.
- Updated the Autumn Keepsake Sessions homepage button from “Choose Your Time” to “Reserve Your Session.”

## Notes for internal team

- DEV-1116: Added `inclusionsHeadline` across the Mini Sessions database, API, dashboard editor, preview, duplication flow, and public page. Apply the database migration and deploy the server before or alongside the frontend.

- Pre-merge environment audit: removed the obsolete `AUTUMN_KEEPSAKE_CAMPAIGN_ID` setup from the active runbook; Mini Sessions FAQs are campaign-managed, and production revalidation uses the shared server `SITE_REVALIDATION_SECRET` / website `MEDIA_REVALIDATION_SECRET` value.

- DEV-1083 lifecycle follow-up: reconcile mutually exclusive public statuses locally and refetch the authoritative campaign list after publish; the existing database partial unique index remains the final invariant.

- DEV-1083 feedback follow-up: applied migration `20260813143436` to backfill only legacy campaigns with empty FAQ arrays; added `@dnd-kit` sortable behavior for campaign inclusions.

- DEV-1083 client feedback pass: added sanitized rich-content fields and campaign-owned FAQs across the API, database, dashboard, public page, and FAQ schema; applied migrations `20260813011847`, `20260813013345`, and `20260813014656` to the linked Supabase project.
- DEV-1083 layout pass: moved Mini Sessions FAQs out of the centralized FAQ page, combined Experience and inclusions, added the campaign Vibe section, separated homepage CTA ownership, and removed reveal behavior that could leave homepage and FAQ content invisible.

- DEV-1083: Changed the CMS booking-link default and operating guide from `/mini-sessions` to `/minis`.

- DEV-1083: Refined the public Mini Sessions booking layout with a sticky desktop payment summary and an expandable mobile booking summary.

- Release hotfix: Removed unpublished `/locations` routes from navigation and the sitemap until the planned local SEO work is implemented.
- DEV-1040: Added a 1200 × 630 JPEG social asset and a build-time validation check for the configured Open Graph and Twitter image.
- DEV-1041: Added explicit LCP fetch priority, quality-65 photo delivery, responsive logo sizing, and shared remote-image placeholders across the homepage, portfolio, and service detail layouts.
- DEV-1041: The media API now applies one-year immutable caching to versioned uploads and a shorter revalidating policy to replaceable legacy image paths; existing R2 objects were backfilled safely.
- DEV-1041 baseline and post-change measurements are recorded in `docs/technical/dev-1041-cold-load-image-performance.md`.
- DEV-1102: Added the focused admin Mini Sessions feature module, campaign filters, cents-safe currency editing, published-media selection, bounded/reorderable booking options, and stale-write recovery while preserving the existing library and page-image workflows.
- DEV-1104: Added the server-rendered `/mini-sessions` campaign route, campaign-driven metadata and schema, allowlisted UTM forwarding, lazy Cal.com initialization, and fail-closed availability handling.
- DEV-1103: Added shared-component draft preview, server-authoritative lifecycle confirmations, dirty-state protection, revalidation warnings distinct from mutation success, stale-state recovery, and accessible dialog focus restoration.
- DEV-1105: Added campaign-aware homepage and navigation promotion, conditional sitemap output, layout/path revalidation, and non-PII GA4 funnel events for Mini Sessions discovery and booking.
- DEV-1106: Added Jenn-facing and internal Mini Sessions runbooks covering Cal.com/Stripe setup, 20-minute sessions with a 10-minute turnover buffer, release order, migration safety, QA evidence, payments, refunds, and troubleshooting.
- DEV-1106 rollout note: The linked Supabase project did not yet contain migration `20260809143427` and has pre-existing migration-history drift; reconcile and apply only in an approved release window.
- DEV-1107: Added ten code-managed Autumn Keepsake FAQs, campaign-value substitution, fail-closed seasonal gating, and matching FAQPage schema without expanding CMS or API scope.
- DEV-1107 review: FAQ ownership now uses the stable campaign ID from `AUTUMN_KEEPSAKE_CAMPAIGN_ID`; finalized venue copy no longer says the location is still pending, and focused tests run through the repository's Node 20-compatible npm script.
- DEV-1107 policy review: Jen's final refund, rain-date, and late-arrival terms are now enforced as approved campaign policy summaries; contradictory CMS wording suppresses the FAQs instead of publishing conflicting guidance.
- DEV-1107 payment review: The FAQ now verifies that the displayed remaining balance equals the campaign total minus its deposit and fails closed when payment copy conflicts.
- Mini Sessions usability pass: internal naming, public labels, session length, CTA text, and SEO metadata are derived automatically; validation links jump to the relevant form section.
- Admin navigation usability pass: replaced the long stacked section menu with a pinned three-workspace switcher and contextual navigation that scrolls independently on desktop and mobile.
- Mini Sessions availability pass: retained the legacy date fields internally for API compatibility, populated them with neutral availability guidance, and removed copied dates from the editor and public promotional surfaces until a Cal.com API integration is added.
- Mini Sessions location ownership: the website stores only the broad Bergen County service area; exact addresses stay in Cal.com for booking and confirmation use.
- Mini Sessions action-bar pass: duplicate and archive now share the persistent responsive toolbar with preview, save, and publishing controls.
- Editor performance pass: moved media search and rendering into a memoized component and stabilized draft mutation callbacks so unrelated text updates avoid rerendering the image collection.
- Cal.com embed pass: uses supported UI variables for tighter spacing; Cal.com branding remains visible because official white-label removal requires a paid Teams plan.
- DEV-1083 frontend review fixes: bounded the public campaign request, aligned FAQ payment validation with approved copy, removed redundant duration callouts outside the finalized FAQ, and guarded dashboard exits with unsaved edits.
- Media ordering now saves through one authenticated, atomic server operation and normalizes published portfolio positions.
- DEV-1114: Added the shared `Events → Weddings` taxonomy, stable `events/weddings` upload path, server validation, and database constraints.
- DEV-1115: Replaced generic service-page Investment copy with the approved per-session pricing matrix while preserving contact destinations, FAQs, and bottom CTAs.
- DEV-1117: Stopped controlled rich-text updates from replacing the active editor DOM, added composition-safe synchronization, and changed FAQ edits and reordering to use persistent IDs with functional state updates.
- DEV-1118: Added `faqEyebrow`, `faqHeadline`, and `faqIntro` across the database migration, server projections and RPCs, dashboard editor, preview, public page, duplication flow, accessibility labeling, and regression coverage. Deploy the database migration and server before or alongside the frontend.
- DEV-1118 follow-up: Added campaign-controlled booking eyebrow and heading copy across the dashboard, preview, public booking section, and validation. Existing campaigns retain “Reserve your session” and “Choose your time.” as defaults.
- DEV-1118 follow-up: Made the small label above the Vibe section campaign-controlled while preserving “The vibe” as the default and retaining the existing editable heading and rich-content body.
- DEV-1114 production hotfix: Applied the missing `add_weddings_media_subcategory` Supabase migration and verified `Events → Weddings` with a rolled-back catalog update.
- Mini Sessions homepage patch: normalize the legacy promotion CTA value “Choose your time” to “Reserve Your Session” while preserving all other campaign-managed button text.

## Changed URLs

- https://ifferspictures.com/sitemap.xml
- https://ifferspictures.com/
- https://ifferspictures.com/og-image.jpg
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
- https://ifferspictures.com/admin/media
- https://ifferspictures.com/mini-sessions
