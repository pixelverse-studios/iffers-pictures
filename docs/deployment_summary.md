# Deployment Summary

## Latest deploy summary

- Updated event photography service description with new copy emphasizing natural, unobtrusive approach and focus on genuine moments
- Updated family photography service description with new copy focusing on connection, comfort, and preserving authentic family moments
- Updated milestone celebrations service description with new copy highlighting pride, joy, and preserving life's meaningful milestones
- Updated professional headshots service description with new copy emphasizing authenticity, comfort, and creating timeless portraits
- Updated maternity photography service description with new copy focusing on quiet anticipation, softness, and the beauty of motherhood
- Added real headshot photo to the About page across all three hero layout options
- Added a friendly message below services for custom photography inquiries
- Added 7 new font options to the theme picker (4 heading, 3 body) with a light, airy aesthetic
- Finalized site theme to **Morning Dew** color palette — soft periwinkle blue, warm sand tones, and cool morning white
- Set typography to **Josefin Slab** for headings and **Nunito** for body text
- Removed the theme/font preview widget from the bottom of the page
- Added a new **FAQ page** with 8 general questions and links to service-specific FAQs
- Added FAQ link to the main navigation (desktop and mobile)
- Added Resources section to the website footer with FAQ and Service Areas links
- Improved FAQ page accessibility with proper screen reader support on accordion
- Service FAQ links now scroll directly to the FAQ section on each service page
- Promoted footer Resources links (FAQ, Service Areas) to their own column alongside Services and Company
- Contact form now sends inquiries directly — submissions trigger an email notification to Iffer
- Replaced all sample testimonials with real client reviews from Facebook recommendations
- Testimonial sections removed from service pages without real reviews (baby shower, baptism, headshots, maternity, milestones, events)
- Homepage testimonial carousel updated with real client quotes
- Removed all pricing amounts and package tiers from service pages — visitors are now directed to contact for a custom quote tailored to their needs
- Portfolio page now displays real client photography from 39 professional images across engagement, gender reveal, and maternity sessions
- Portfolio images hosted on Cloudflare R2 for fast delivery with no file size restrictions
- All four gallery layout options (Masonry, Editorial, Filmstrip, By Category) now show real photos instead of placeholder boxes
- Event-type filtering added to the portfolio — visitors can browse by Engagement, Gender Reveal, or Maternity
- Locked in final layout choices across the site based on client review
- About page now shows the Two-Column layout permanently
- Portfolio page now shows the Category Filter layout permanently with sidebar navigation
- Homepage now shows the Filmstrip portfolio and Icon Grid services layouts permanently
- Removed all layout switcher widgets from the site for a cleaner, controlled experience

## Notes for internal team

- Updated description in 3 files: src/data/services/events.ts (hero), src/data/services/party.ts (hero), src/lib/constants.ts (SERVICES array short description)
- Constants file uses a condensed version of the full copy to fit the short description format
- Updated family photography description in 2 files: src/data/services/family.ts (hero), src/lib/constants.ts (SERVICES array short description)
- Constants file uses a condensed version capturing the essence of the full copy
- Updated milestone photography description in 2 files: src/data/services/milestones.ts (hero), src/lib/constants.ts (SERVICES array short description)
- Updated headshots description in 2 files: src/data/services/headshots.ts (hero + CTA), src/lib/constants.ts (SERVICES array short description)
- Updated maternity description in 2 files: src/data/services/maternity.ts (hero), src/lib/constants.ts (SERVICES array short description)
- Replaced ImagePlaceholder with Next.js Image in LayoutA/B/C.tsx pointing to /headshot.jpg
- Added custom inquiry CTA to ServicesGrid.tsx below service cards
- New heading fonts: Gilda Display, Josefin Slab, Tenor Sans, Marcellus
- New body fonts: Nunito, Karla, Josefin Sans
- Deleted ThemeSwitcher.tsx and FontSwitcher.tsx components entirely
- Morning Dew palette values baked into globals.css :root and @theme
- Font override mechanism removed — fonts now loaded directly via next/font/google
- All 15 palette options and 19 font options removed (no longer needed)
- DEV-461: Created /faq route with FAQPage schema, BreadcrumbList schema, SEO metadata
- FAQ added to NAV_LINKS, NAV_LINKS_RIGHT, FOOTER_LINKS.resources rendered in Footer
- /faq added to sitemap.ts
- PR review fixes: split FAQ page into server + client components for performance, added id="faq" anchor to ServiceFAQ, replaced inline CTA with Button component, added ARIA attrs, typed schema, updated CLAUDE.md design system docs, removed unused Josefin Slab weight 700
- DEV-462: Extracted Resources from Company column sub-section into standalone footer column, updated grid from 4-col to 5-col layout
- DEV-463: Created /api/contact route proxying to PVS central server contact-form API. ContactForm.tsx now POSTs to local API route which forwards to https://api.pixelversestudios.io/api/v1/contact-forms/iffers-pictures. Added PVS_CONTACT_API_URL and PVS_WEBSITE_SLUG env vars.
- DEV-464: Replaced fake testimonials with 5 real Facebook reviews. Made testimonials optional in ServicePageData type. Removed testimonials from 6 services without real content. Updated ServiceTestimonials grid to handle 1-2 items. Updated homepage TestimonialsBlend carousel.
- DEV-465: Removed all pricing packages (30 packages across 10 services), dollar amounts from FAQ answers, and OfferCatalog from schema. ServicePricing component replaced with simple CTA section. PricingData type simplified (no packages). All service pricing sections now show title, description, and "Get a Custom Quote" button.
- DEV-489: Integrated Cloudflare R2 portfolio images. Added R2 remote pattern to next.config.ts. Rewrote portfolioData.ts with 39 real image entries (15 engagement, 12 gender reveal, 12 maternity) including alt text and aspect ratios. Replaced ImagePlaceholder with next/image in all 4 portfolio layout components (Masonry, FeaturedGrid, Filmstrip, CategorySplit). Updated category system from generic types to event-based types (EVENT_TYPES replaces CATEGORIES).
- DEV-490: Locked in client layout choices. About → LayoutA (Two-Column), Portfolio → CategorySplit, Homepage → Variation4 with Filmstrip + IconGrid. Deleted AboutHeroSwitcher, PortfolioSwitcher, VariationSwitcher, PortfolioLayoutSwitcher, ServicesLayoutSwitcher. Deleted unused layouts: LayoutB, LayoutC, Masonry, FeaturedGrid, Filmstrip (portfolio), BentoCards, TwoColumnList (services), Variation1/2/3. Moved ServiceAreasDisplay to shared/. Homepage converted from client to server component.

## Changed URLs

- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/party-photography
- https://ifferspictures.com/services
- https://ifferspictures.com/services/family-photography
- https://ifferspictures.com/services/milestones
- https://ifferspictures.com/services/headshots
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/about
- https://ifferspictures.com/
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/contact
- https://ifferspictures.com/faq
- https://ifferspictures.com/services/engagement-photography
- https://ifferspictures.com/services/bridal-shower-photography
- https://ifferspictures.com/services/baby-shower-photography
- https://ifferspictures.com/services/baptism-christening-photography
