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
- DEV-356: Created ServicesLayoutSwitcher with IconGrid, HorizontalScroll, TwoColumnList sub-layouts; updated variation-4/index.tsx

## Changed URLs

- https://ifferspictures.com
- https://ifferspictures.com/about
- https://ifferspictures.com/services
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/milestones
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/headshots
