# Deployment Summary

## Latest deploy summary

- Updated site fonts to Italiana (headings) and Lora (body text) — the client's chosen typography
- Updated homepage hero heading to "Your Story, Beautifully Remembered" with the client's tagline
- Added About page with Jennifer's full bio, stats, philosophy quote, and booking CTA
- Updated homepage "Meet Jenn" section with Jennifer's real bio copy
- Updated site tagline to "Your Story, Beautifully Remembered" across footer and metadata
- Added Person schema (structured data) to About page for Google rich results
- Refined the About page with an editorial magazine layout for the bio section and cleaner hero presentation
- Removed Pricing and Blog pages from navigation, footer, and all site components
- Updated homepage hero heading to "Heartfelt moments thoughtfully captured" and made the subtitle text larger for better readability
- Moved trust stats (5-star reviews, Bergen County, 500+ events) from inside the hero to a clean anchor strip directly below it
- Consolidated services from 8 categories down to 5: Events, Family, Milestones, Headshots, and Maternity — cleaner, more focused offering
- Added a new Events service page covering engagement parties, bridal showers, baby showers, birthday parties, holiday gatherings, corporate events, and anniversaries
- Added a new Milestones service page covering baby showers, baptisms, first birthdays, quinceañeras, graduations, anniversary parties, and gender reveals
- Updated Family service page URL to /services/family (was /services/family-photography)
- Updated Maternity service page URL to /services/maternity (was /services/maternity-photography)
- Replaced the homepage services section with a compact, switchable layout — toggle between Grid, Cards, and List views
- Updated the site description and services page metadata to reflect the new 5-service offering
- Added a portfolio section to the homepage with 3 switchable layouts: Masonry (varied-height columns), Featured Grid (large hero image + 5 editorial satellites), and Filmstrip (full-bleed horizontal snap-scroll)
- Moved the portfolio section above the services section on the homepage — work-first presentation to draw visitors in before listing offerings
- Tightened the "Where We Work" section — reduced outer padding, card padding, grid gaps, and header spacing so it feels proportional alongside other sections
- Added a theme switcher widget (bottom-left corner) for previewing 5 color palettes centered on the brand's signature green — Sage & Champagne, Sea Glass & Rose, Mint & Peach, Jade & Sand, Celery & Blush — plus font switching; available on every page
- Removed "Math Teacher" from the About page hero tagline — now reads "Bergen County Event Photographer"
- Removed the math teacher bio paragraph from the About page — the page now focuses entirely on Jennifer's photography identity
- Removed the large italic opening line ("I have loved photography for as long as I can remember") from the About bio — the story now begins directly with the body paragraphs

## Notes for internal team

- DEV-317: Swapped Playfair Display + DM Sans → Italiana + Lora in layout.tsx and globals.css
- DEV-318: Updated hero heading across all 4 landing variations
- DEV-319: Created /about page — AboutHero, AboutBio (5 paragraphs + stats + approach), AboutCTA components
- DEV-320: Updated MeetIffer section — heading "Meet Iffer" → "Meet Jenn", replaced placeholder bio with real Jennifer content
- DEV-321: Updated SITE_CONFIG.tagline → "Your Story, Beautifully Remembered"; description updated to cover all 8 services
- DEV-322: Added PersonSchema component to /about page; added canonical URL to metadata
- About page bio + hero: Editorial magazine redesign (two-column layout, Italiana lede, pull quote); hero redesigned to remove content overlap
- Pricing/Blog removal: Removed from constants.ts (NAV_LINKS, NAV_LINKS_RIGHT, FOOTER_LINKS), sitemap.ts, CTASection.tsx, BookingCTA.tsx, BookingCTAEnhanced.tsx, ServicesHubCTA.tsx, contact/page.tsx
- DEV-354: Updated H1 in HeroMinimalEnhanced.tsx; subtitle bumped text-xl → text-2xl
- DEV-355: Removed TrustBadges from HeroMinimalEnhanced; created TrustBar.tsx; inserted after hero in variation-4/index.tsx
- Created src/data/services/events.ts with full ServicePageData (hero, benefits, whatToExpect, gallery, testimonials, pricing, faq, cta, seo); registered in index.ts under slug "events"
- Created src/data/services/milestones.ts with full ServicePageData for the Milestones service (slug: "milestones"); registered in index.ts; packages: Essentials $449 / Celebration $749 (popular) / Legacy $1,099
- Services pruning: Updated constants.ts SERVICES array from 8 → 5 entries (events, family, milestones, headshots, maternity); updated serviceDataMap in index.ts; updated all layout component icon/variant maps (variation-2 ServicesScroll, variation-3 MomentsReveal, variation-4 IconGrid/HorizontalScroll/TwoColumnList); family slug: family-photography → family; maternity slug: maternity-photography → maternity
- DEV-356: Created ServicesLayoutSwitcher with IconGrid, BentoCards, TwoColumnList sub-layouts; updated variation-4/index.tsx
- DEV-357: Created PortfolioLayoutSwitcher with Masonry, FeaturedGrid, Filmstrip sub-layouts; replaced PortfolioPreview in variation-4/index.tsx
- DEV-358: Swapped ServicesLayoutSwitcher and PortfolioLayoutSwitcher render order in variation-4/index.tsx
- DEV-359: ServiceAreasDisplay — section py-10/md:py-14 (was clamp 4–6rem), mb-8 header (was mb-16), p-5 cards (was p-8), gap-4 grid (was gap-8), mb-4 card headers (was mb-6), mt-6 footer link (was mt-10)
- DEV-360: Created ThemeSwitcher.tsx — 5 palettes (Original, Soft Sage, Sea Glass, Warm Sand, Clean Slate), 3 heading + 9 body fonts, two-tab panel (Colors/Fonts), localStorage persistence; moved from page.tsx → layout.tsx for site-wide availability; FontSwitcher removed
- DEV-362: AboutHero.tsx — tagline "Photographer · Math Teacher" → "Bergen County Event Photographer"; AboutBio.tsx — removed math teacher paragraph from right column
- DEV-363: AboutBio.tsx — removed lede paragraph and accent divider; tightened section header spacing (mb-12/md:mb-16 → mb-10)

## Changed URLs

- https://ifferspictures.com
- https://ifferspictures.com/about
- https://ifferspictures.com/services
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/milestones
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/headshots
