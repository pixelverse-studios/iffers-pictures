# Deployment Summary

## Latest deploy summary

-
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

## Notes for internal team

-
- DEV-1040: Added a 1200 × 630 JPEG social asset and a build-time validation check for the configured Open Graph and Twitter image.
- DEV-1041: Added explicit LCP fetch priority, quality-65 photo delivery, responsive logo sizing, and shared remote-image placeholders across the homepage, portfolio, and service detail layouts.
- DEV-1041: The media API now applies one-year immutable caching to versioned uploads and a shorter revalidating policy to replaceable legacy image paths; existing R2 objects were backfilled safely.
- DEV-1041 baseline and post-change measurements are recorded in `docs/technical/dev-1041-cold-load-image-performance.md`.
- DEV-1102: Added the focused admin Mini Sessions feature module, campaign filters, cents-safe currency editing, published-media selection, bounded/reorderable booking options, and stale-write recovery while preserving the existing library and page-image workflows.
- DEV-1104: Added the server-rendered `/mini-sessions` campaign route, campaign-driven metadata and schema, allowlisted UTM forwarding, lazy Cal.com initialization, and fail-closed availability handling.
- DEV-1103: Added shared-component draft preview, server-authoritative lifecycle confirmations, dirty-state protection, revalidation warnings distinct from mutation success, stale-state recovery, and accessible dialog focus restoration.

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
- https://ifferspictures.com/admin/media
- https://ifferspictures.com/mini-sessions
