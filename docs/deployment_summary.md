# Deployment Summary

## Latest deploy summary

- Added an internal image review page so Jenn can browse every photo on the site, check the ones she'd like replaced, and send the list to Phil in one click
- Fixed a build error that was preventing the site from deploying (related to the contact and investment pages)

## Notes for internal team

- New hidden page at `/image-review` (noindex, not linked in nav). Uses the existing `PORTFOLIO_ITEMS` manifest as the source of truth. Sticky top bar with Select All / Copy List / Send to Phil (mailto) / Clear. Selections persist in localStorage. Grouped 2-level by Service → Sub-category.
- Suspense fix: wrapped `<ContactForm />` and `<InvestmentContent />` in `<Suspense>` boundaries on their respective pages — both components use `useSearchParams()` which Next.js requires be inside a Suspense boundary during static prerender. This was blocking the Netlify build.
- Files: `src/app/image-review/page.tsx` (new), `src/app/image-review/ImageReviewClient.tsx` (new), `src/app/contact/page.tsx`, `src/app/investment/page.tsx`

## Changed URLs

- https://ifferspictures.com/image-review
- https://ifferspictures.com/contact
- https://ifferspictures.com/investment
