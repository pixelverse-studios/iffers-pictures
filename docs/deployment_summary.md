# Deployment Summary

## Latest deploy summary

-
- Added a branded social sharing image so Facebook and other link previews display Iffer's Pictures branding instead of a blank thumbnail.
- Reduced first-visit photography download sizes and prioritized the main page image so galleries appear sooner on mobile and desktop.
- Added lightweight image placeholders so new visitors see an intentional visual treatment while photos finish loading.
- Added a dedicated Mini Sessions page with campaign details, transparent deposit and balance information, policies, and an accessible session-option picker.
- Added a secure, near-viewport Cal.com booking calendar with a direct booking fallback when the embedded calendar cannot load.
- Sold-out Mini Sessions campaigns now replace booking controls with a clear inquiry path.
- Live and sold-out Mini Sessions can now be featured on the homepage and in site navigation, then disappear automatically when the campaign closes.
- Mini Sessions visibility now stays aligned across search engines and the website when campaign availability changes.

## Notes for internal team

-
- DEV-1040: Added a 1200 × 630 JPEG social asset and a build-time validation check for the configured Open Graph and Twitter image.
- DEV-1041: Added explicit LCP fetch priority, quality-65 photo delivery, responsive logo sizing, and shared remote-image placeholders across the homepage, portfolio, and service detail layouts.
- DEV-1041: The media API now applies one-year immutable caching to versioned uploads and a shorter revalidating policy to replaceable legacy image paths; existing R2 objects were backfilled safely.
- DEV-1041 baseline and post-change measurements are recorded in `docs/technical/dev-1041-cold-load-image-performance.md`.
- DEV-1104: Added the server-rendered `/mini-sessions` campaign route, campaign-driven metadata and schema, allowlisted UTM forwarding, lazy Cal.com initialization, and fail-closed availability handling.
- DEV-1105: Added campaign-aware homepage and navigation promotion, conditional sitemap output, layout/path revalidation, and non-PII GA4 funnel events for Mini Sessions discovery and booking.

## Changed URLs

-
- https://ifferspictures.com/
- https://ifferspictures.com/og-image.jpg
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
- https://ifferspictures.com/mini-sessions
