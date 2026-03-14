# SEO Implementation Checklist: Iffer's Pictures

> Progress: 18/62 Complete | Last Updated: 2026-03-14 (Post-Audit)

## Technical SEO

- [x] SSL configured (Vercel default)
- [x] Mobile-friendly (responsive design)
- [x] sitemap.xml present and generated — `src/app/sitemap.ts`
- [x] robots.txt configured — `src/app/robots.ts`
- [ ] Core Web Vitals passing (Lighthouse ≥ 90)
- [ ] Sitemap/route mismatch resolved — 14 location pages in sitemap but routes don't exist (404s)
- [ ] All sitemap URLs return 200 status
- [ ] Google Search Console setup and verified
- [ ] Google Analytics 4 configured
- [ ] Page speed optimization (sub-2s load times)
- [ ] Canonical URLs explicit on all pages — only /about and /portfolio have explicit canonicals

## Structured Data / Schema

- [x] LocalBusiness schema present (Photographer type, in Footer) — `src/components/seo/LocalBusinessSchema.tsx`
- [x] Phone format correct in schema (+15514866059) — consistent across components
- [ ] ~LocalBusiness streetAddress missing~ — `constants.ts:21` has `street: ""` (empty string)
- [ ] WebSite schema present in global layout (with @id, url, name, publisher) — **MISSING entirely**
- [x] ServiceSchema on service detail pages — `src/components/features/services/ServiceSchema.tsx`
- [ ] ~ServiceSchema areaServed inconsistent~ — only includes 6 primary towns, LocalBusiness has all 14
- [x] FAQPage schema on FAQ page and service pages — both `/faq` and `/services/[slug]` covered (48+ FAQs)
- [x] BreadcrumbList schema on service and FAQ pages — `src/components/features/services/BreadcrumbSchema.tsx`
- [ ] BreadcrumbList schema on ALL inner pages — missing on /about, /portfolio, /contact
- [x] PersonSchema on about page — `src/components/seo/PersonSchema.tsx`
- [x] ServicesHubSchema on /services page — `src/components/features/services-hub/ServicesHubSchema.tsx`
- [ ] Per-location LocalBusiness schema on each location page — location pages don't exist yet
- [ ] ImageGallery/ImageObject schema on portfolio page
- [ ] Service schemas on homepage for core service offerings — homepage has services UI but no Service JSON-LD
- [ ] AggregateRating added to LocalBusiness schema (when reviews are collected)
- [ ] All pages pass Google Rich Results Test

## On-Page SEO

- [x] Title tags on all pages
- [ ] Title tag length optimization — 6 service pages over 60 chars (65-82), FAQ=24 chars, Contact=30 chars
- [x] Meta descriptions on all pages
- [ ] Meta description length optimization — 7/11 pages exceed 160 chars (worst: Events=276, Milestones=262)
- [x] H1 tags present on all pages
- [ ] Keywords in H1/H2 tags reinforced — service page H1s are generic/emotional, no location keywords
- [x] OpenGraph tags on most pages
- [ ] Service-specific OG images — all 11 pages fall back to root /og-image.jpg
- [x] Twitter card tags on pages — most have explicit cards, FAQ/Contact fall back to OG
- [ ] og:url present on all pages
- [ ] Image alt text consistency audit — mostly good, some gaps

## Location Keyword Reinforcement

- [ ] H1 on homepage includes target city, state, or region — H1 is "Heartfelt moments thoughtfully captured" (no location)
- [ ] At least one H2 across key pages includes a location keyword — present in subheadings but not H2 tags
- [x] Body copy mentions target location a minimum of 3 times — homepage, services, about, contact all mention Bergen County/Cliffside Park
- [ ] Testimonial attributions include client city/state where possible — some real testimonials present but not all have locations
- [x] At least one CTA references the service area explicitly — "Serving Bergen County" appears in footer and service pages
- [x] "Serving [area]" statement present in homepage body copy — visible in hero and service areas section
- [ ] No metadata/copy location disconnect on any page — **FAIL on 3 pages**: Headshots, Maternity, Milestones have location in meta but generic body copy

## Content SEO

- [ ] Blog infrastructure built (/blog route, listing page, post template) — NOT IMPLEMENTED
- [ ] BlogPosting schema implemented
- [ ] Content calendar created (1-2 posts/month)
- [ ] First blog post published
- [ ] 3 blog posts published
- [ ] Venue guide posts for primary towns

## Local SEO

- [ ] Google Business Profile claimed and verified
- [x] NAP consistency across all pages and schema — centralized in constants.ts, propagated consistently (except missing street address)
- [ ] Local citations built (Google, Yelp, local directories)
- [ ] 6 primary location pages created (/locations/[town]) — NOT IMPLEMENTED
- [ ] 8 secondary location pages created
- [ ] Location pages include local venue mentions and landmarks
- [ ] Location pages have 1,000+ words of unique content
- [ ] Per-location FAQ sections with FAQPage schema
- [ ] Internal links from homepage to location pages — ServiceAreasDisplay links to non-existent routes
- [ ] Google Maps embed on contact/location pages

## Internal Linking

- [ ] Service pages link to related services
- [ ] Location pages link to relevant service pages
- [ ] Service pages link to relevant location pages
- [ ] Blog posts link to service and location pages
- [x] Footer includes links to priority location pages — 6 primary towns displayed (routes pending)
- [ ] Breadcrumb navigation on all inner pages — only on services and FAQ

## Off-Page SEO

- [ ] Google Business Profile optimized
- [ ] Yelp business listing
- [ ] WeddingWire/The Knot listing (for engagement photography)
- [ ] Thumbtack profile
- [ ] Local photography directory listings
- [ ] Vendor directory listings (NJ wedding/event vendors)
