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

## Notes for internal team

- DEV-317: Swapped Playfair Display + DM Sans → Italiana + Lora in layout.tsx and globals.css
- DEV-318: Updated hero heading across all 4 landing variations
- DEV-319: Created /about page — AboutHero, AboutBio (5 paragraphs + stats + approach), AboutCTA components
- DEV-320: Updated MeetIffer section — heading "Meet Iffer" → "Meet Jenn", replaced placeholder bio with real Jennifer content
- DEV-321: Updated SITE_CONFIG.tagline → "Your Story, Beautifully Remembered"; description updated to cover all 8 services
- DEV-322: Added PersonSchema component to /about page; added canonical URL to metadata
- About page bio + hero: Editorial magazine redesign (two-column layout, Italiana lede, pull quote); hero redesigned to remove content overlap
- Pricing/Blog removal: Removed from constants.ts (NAV_LINKS, NAV_LINKS_RIGHT, FOOTER_LINKS), sitemap.ts, CTASection.tsx, BookingCTA.tsx, BookingCTAEnhanced.tsx, ServicesHubCTA.tsx, contact/page.tsx

## Changed URLs

- https://ifferspictures.com
- https://ifferspictures.com/about
