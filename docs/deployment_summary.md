# Deployment Summary

## Latest deploy summary

- Added smooth scroll-activated motion to the homepage, about page, and sessions page, with individual elements revealing as they enter view.
- Extended the same smooth reveal motion across session detail pages, portfolio, testimonials, investment, FAQ, and inquire pages.
- Updated Jenn's homepage and about page hero portrait to use the new R2 portrait image.
- Removed the extra "I’d love to hear what you’re envisioning" line from the inquire page hero.
- Prepared the site for the managed media catalog by adding the frontend media API/proxy foundation.
- Added the media revalidation webhook needed to refresh public image pages after catalog changes.
- Hardened managed media image loading so future approved R2 or media-domain URLs can render through Next.js image optimization.
- Wired public portfolio, session, investment, FAQ, and homepage imagery to the managed media catalog with static fallback behavior.
- Added the admin media manager interface for protected catalog browsing, uploads, metadata edits, publishing, archiving, restore, draft rename/move, and manual revalidation.
- Standardized the admin media manager's visible form fields on the site's Mantine field components.
- Fixed admin media manager spacing so the fixed site navigation no longer overlaps the admin content.
- Simplified the admin media sign-in screen by removing the decorative image rail.
- Updated media API calls to use the shared `PVS_API_URL` configuration.
- Fixed admin media restore so archived images can be restored before editing metadata.
- Added safer admin media uploads with per-image queued category selection, early file validation, and clearer server error messages.
- Added a destination availability guard so draft media can only be moved after the latest target path passes a collision check.
- Removed the public website navigation from admin media screens and moved the home link into the admin sidebar logo.
- Fixed the admin media screen crash caused by unsupported nested Mantine style selectors.
- Allowed the production media domain to render through Next.js image optimization in admin media views.
- Kept the admin media sidebar visible while scrolling through large image grids.
- Organized admin media sidebar filters into nested service and sub-category navigation.
- Replaced the mobile admin media sidebar with a compact top bar and slide-in media menu.
- Added smooth open and close animation to the mobile admin media menu.
- Standardized pointer cursors across clickable admin media controls.
- Restored fixed desktop admin media side columns while the image workspace scrolls independently.
- Redirected the legacy image review page to the admin media manager so there is one clear media-management entry point.
- Prepared the frontend media layer for explicit image placement assignments across homepage, service, portfolio, investment, FAQ, and admin media workflows.
- Kept the admin media session and logout details contained at the bottom of the side navigation instead of appearing as a page-wide bottom bar.
- Added a regular site navigation link to the admin media manager for authenticated media admin sessions.
- Adjusted the regular site navigation breakpoint so authenticated media admin links do not crowd the tablet-width header.

## Notes for internal team

- Added a reusable IntersectionObserver scroll reveal helper plus CSS reveal, image zoom, and action hover utilities with reduced-motion fallbacks; applied it to the homepage, about page, and sessions page.
- Reused the same helper across the remaining public layouts, including shared service detail and FAQ components, so repeated tiles stagger consistently without page-specific animation logic.
- Swapped `/headshot.jpg` usages in the homepage Meet Jenn section and about hero to `portraits/portrait_02.jpg` from R2.
- Removed the contact hero description paragraph and copy value.
- DEV-941: Added typed media API client helpers, public catalog fallback support, and same-origin proxy routes for Pixelverse media/admin endpoints.
- DEV-942: Added `/api/media/revalidate` with optional bearer-secret validation, site-local path validation, and Next.js `revalidatePath` calls for media catalog updates.
- DEV-944: Added constrained env-backed media image remote patterns using `MEDIA_PUBLIC_BASE_URL` or `MEDIA_PUBLIC_BASE_URLS`; documented the hosting environment setting.
- DEV-919: Public media-heavy pages now fetch the published catalog through `GET /api/media/iffers-pictures/catalog` with local static fallbacks and pinned-image category fallback rules.
- DEV-918: Added `/admin/media` plus the magic-link callback UI backed by the completed Pixelverse media admin auth, admin catalog, upload, lifecycle, move, and revalidation endpoints.
- DEV-918: Replaced native visible admin media form controls with Mantine TextInput, Textarea, Select, and NumberInput components.
- DEV-918: Added fixed-header offsets to admin media login, callback, loading, library, and sticky inspector/header states.
- DEV-918: Removed the decorative image column from the admin media login panel.
- DEV-918: Removed the media-specific API base URL fallback so media proxy requests resolve through `PVS_API_URL`.
- DEV-918: Changed archived media restore to use a status-only patch, matching the Pixelverse media API restore contract.
- DEV-920: Queued uploads now snapshot their service/sub-category and support per-item category edits before upload.
- DEV-920: Added frontend upload type/size checks, expanded media API error copy, and gated draft move execution on a successful destination check.
- DEV-920: Added route-aware site chrome so `/admin/*` omits public header/footer, then removed admin fixed-header offsets.
- DEV-920: Moved Mantine pseudo-selector styling from theme style objects into global CSS classes for React 19 compatibility.
- DEV-920: Added `https://media.ifferspictures.com` to default Next image remote patterns.
- DEV-920: Made the desktop admin media sidebar sticky with an internal category scroll region.
- DEV-920: Replaced the flat media category sidebar with service parent filters and nested child filters for multi-category services.
- DEV-920: Added a mobile-only media navigation drawer to prevent horizontal overflow on small screens.
- DEV-920: Kept the mobile drawer mounted during close so overlay opacity and panel transform can animate out.
- DEV-920: Added admin media shell cursor rules for active and disabled interactive controls.
- DEV-920: Changed the desktop admin media shell to viewport-height column scrolling so the sidebar and inspector remain visible.
- DEV-943: Replaced the `/image-review` implementation with a redirect to `/admin/media` and updated internal mockup/planning references to the media manager.
- DEV-954: Added typed media placement slot registry, public/admin placement API clients, server-side public placement fallback fetching, gallery conversion helpers, proxy `PUT` forwarding, and placement-specific admin error copy.
- Admin media sidebar: Changed the desktop sidebar to a full-height flex column so session/logout details stay inside the side navigation and the stray bottom border is removed.
- Public header: Checks for an active media admin session and shows a `Media` link to `/admin/media` only when authenticated.
- Public header: Keeps the compact mobile menu active through tablet widths so the authenticated `Media` link does not overflow the desktop nav.

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/about
- https://ifferspictures.com/services
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/testimonials
- https://ifferspictures.com/investment
- https://ifferspictures.com/faq
- https://ifferspictures.com/contact
- https://ifferspictures.com/admin/media
- https://ifferspictures.com/image-review
- https://ifferspictures.com/api/media/iffers-pictures/placements
- https://ifferspictures.com/api/media/iffers-pictures/admin/placements
