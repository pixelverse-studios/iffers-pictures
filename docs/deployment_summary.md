# Deployment Summary

## Latest deploy summary

- Added 16 new family photography images to the portfolio gallery from Cloudflare R2
- Fixed fonts not rendering correctly (Josefin Slab headings, Nunito body text)
- Updated site logo to new blue version across header and schema
- Redesigned testimonials section on homepage with multiple layout options showing all 5 client reviews
- Removed phone number from website per client request
- Updated booking section year to display dynamically (now shows 2026)
- Replaced placeholder testimonial with real client review from Jolee
- Compacted the "Where We Work" service areas section for a cleaner look
- Redesigned About page: centered hero layout, single-column bio, tighter spacing
- Updated About page stats to 100+ Events, 5+ Years, 100% Facebook Rating
- Added "Leave a Review" link in footer pointing to Facebook reviews page
- Created SEO scope documentation and completed first full SEO audit (score: 52/100)
- Capitalized homepage hero headline words per client feedback
- Added 4 new client testimonials (Heather Harris, Jessica Uribe, Happy Client, Debby)
- Homepage testimonials now rotate randomly from a pool of 9 reviews on each page load
- Added new testimonials to Event, Party, and Engagement service pages
- Expanded portfolio from 55 to 116 images across 9 categories
- Added new galleries: baby shower, bridal shower, engagement party, birthday, proposal, and baptism photography
- Added 11 new family photos and 5 new maternity photos
- Restructured portfolio image organization to match new service architecture

## Notes for internal team

- SEO docs created at docs/seo/ — scope, keywords, competitors, checklist, changelog
- SEO epic DEV-491 created with 6 child tickets (DEV-508 through DEV-513)
- Family images compressed from 3-34MB down to 255KB-1.2MB before R2 upload
- Font fix: Tailwind v4 @theme block can't resolve Next.js runtime CSS variables — referenced font vars directly in CSS rules
- Testimonials component has layout switcher (Mixed, Uniform, Teal, Alternating) for client review before locking in
- Next.js image cache at .next/cache/images may need clearing after logo/image changes
- DEV-518: 9 total testimonials in pool, Fisher-Yates shuffle picks 5 per page load via useMemo
- DEV-519: Portfolio restructured from 3 to 9 sub-categories, 116 total images. R2 folders now use nested paths (events/baby-shower/, etc.)
- R2 image workflow documented at docs/references/r2-image-workflow.md

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/about
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/contact
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/events
