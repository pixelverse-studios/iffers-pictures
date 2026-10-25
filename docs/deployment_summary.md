# Deployment Summary

## Latest deploy summary

- Told Google which address is the official one for the homepage and FAQ page, so search results point to the right URL

## Notes for internal team

- Added `alternates.canonical` to `src/app/page.tsx` (homepage) and `src/app/faq/page.tsx`; both were missing a canonical tag in production. Found during early SEO-43 spot check on 2026-10-25.
- Homepage title is still inherited from the root layout (verified locally).

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/faq
