# Deployment Summary

## Latest deploy summary

- Added smooth scroll-activated motion to the homepage, about page, and sessions page, with individual elements revealing as they enter view.
- Extended the same smooth reveal motion across session detail pages, portfolio, testimonials, investment, FAQ, and inquire pages.
- Updated Jenn's homepage and about page hero portrait to use the new R2 portrait image.
- Removed the extra "I’d love to hear what you’re envisioning" line from the inquire page hero.
- Prepared the site for the managed media catalog by adding the frontend media API/proxy foundation.

## Notes for internal team

- Added a reusable IntersectionObserver scroll reveal helper plus CSS reveal, image zoom, and action hover utilities with reduced-motion fallbacks; applied it to the homepage, about page, and sessions page.
- Reused the same helper across the remaining public layouts, including shared service detail and FAQ components, so repeated tiles stagger consistently without page-specific animation logic.
- Swapped `/headshot.jpg` usages in the homepage Meet Jenn section and about hero to `portraits/portrait_02.jpg` from R2.
- Removed the contact hero description paragraph and copy value.
- DEV-941: Added typed media API client helpers, public catalog fallback support, and same-origin proxy routes for Pixelverse media/admin endpoints.

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
