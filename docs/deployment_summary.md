# Deployment Summary

## Latest deploy summary

- Added company logo to navigation header
- Created interactive font switcher widget for client to preview 6 different heading fonts
- Font options include: Playfair Display, Cormorant Garamond, Lora, Libre Baskerville, Crimson Pro, Spectral
- Added 3 landing page design variations for A/B testing and comparison
- Created interactive variation switcher allowing real-time switching between designs
- Variation 1 "Emotional Storyteller": Hero-centric design with floating photo frames and emotional testimonials
- Variation 2 "Portfolio Forward": Split-layout hero emphasizing portfolio work first
- Variation 3 "Scroll Journey": Minimal hero with story-driven scrolling experience and parallax effects
- All variations include local SEO elements (Bergen County, NJ mentions, service areas, trust indicators)
- Added elegant placeholder components designed to be swapped with real photography later
- Added Variation 4 "Hybrid": Blends V1 + V3 with minimal hero, compact staggered services, and masonry portfolio
- Variation 4 now set as default when loading homepage
- Redesigned navigation with centered logo layout and links split on either side
- Improved navigation text readability on dark/colorful hero backgrounds with white text and text shadows
- Enhanced logo visibility with soft white glow effect when on transparent nav
- Updated font switcher with separate tabs for Headings and Body fonts
- Heading font options: Italiana, Cormorant Garamond, Aboreto
- Body font options: Raleway, Questrial, Lato, plus original serif fonts
- Hidden layout variation switcher (available for later use)
- Removed Nature & Scenic Photography from services list (not part of client's service offerings)
- Created all 4 service pages with full content sections:
  - Engagement Photography
  - Baby Shower Photography
  - Bridal Shower Photography
  - Party & Event Photography
- Each page includes hero, benefits, what to expect, gallery, testimonials, pricing packages, and FAQ
- All content uses placeholder images ready to be swapped with real photography
- Added services dropdown menu to navigation for easy access to all service pages
- Created Family Photography service page with authentic, candid-focused approach
- Created Professional Headshots service page serving corporate professionals and performers
- Created Maternity Photography service page with empowering, goddess-inspired approach
- Created Baptism & Christening Photography service page supporting multiple religious traditions
- Added BreadcrumbList schema to all service pages for improved SEO
- Fixed navigation header styling to only use transparent/hero mode on homepage (other pages always show white nav)
- Created Services hub page at /services as central pillar for all photography services
- Hub page features 8 service cards with hover effects and internal links to individual service pages
- Added "Why Choose Us" section highlighting genuine moments, stress-free experience, professional quality, and local expertise
- Added Service Areas section with primary and secondary town listings for local SEO
- Added FAQ section with 6 common questions about booking, delivery, and process
- Implemented LocalBusiness and Service schema markup for SEO
- Fixed phone number format in services hub schema to use E.164 international format
- Updated business phone number to (551) 486-6059

## Notes for internal team

- Logo added to Header.tsx using Next.js Image component
- Font switcher loads Google Fonts dynamically and applies via CSS variable override
- Font switcher appears in bottom-left corner (coral button), variation switcher in bottom-right (teal button)
- Component switcher floating in bottom-right corner for easy comparison
- All variations share the same footer from existing layout
- Built with existing design system (teal/coral palette, Playfair Display + DM Sans)
- New shared components: ImagePlaceholder, TrustBadges, AnimatedCounter, VariationSwitcher
- 30 new components total across 4 variations
- Implementation plans documented in docs/planning/
- Variation 4 reuses PortfolioPreview and ServiceAreasDisplay from V1
- Header.tsx redesigned with centered logo, NAV_LINKS_LEFT/RIGHT in constants.ts
- Nav text uses inline styles for color to overcome CSS specificity issues
- Multi-layer text shadow for nav readability on any hero background
- Logo uses multi-layer drop-shadow filter for white glow effect
- Nav height increased to h-28 (transparent) / h-24 (scrolled) to accommodate larger logo
- VariationSwitcher commented out in page.tsx, preserved for future use
- IFFER-9: Removed nature-photography from SERVICES array in constants.ts
- Updated CLAUDE.md and implementation-plan.md to reflect current service offerings
- LocalBusinessSchema dynamically pulls from SERVICES, no code changes needed there
- IFFER-1: Created dynamic service page route at /services/[slug]
- New components: ServiceHero, ServiceBenefits, ServiceGallery, ServiceTestimonials, ServicePricing, ServiceFAQ, ServiceCTA
- Service data files: engagement.ts, baby-shower.ts, bridal-shower.ts, party.ts
- Service data structure in /src/data/services/ with TypeScript types
- Service schema and FAQPage schema for SEO
- Page statically generated with generateStaticParams
- Header.tsx updated with services dropdown (hover on desktop, tap-to-expand on mobile)
- IFFER-2, 3, 5, 7: Created service data files for family, headshots, maternity, baptism
- BreadcrumbSchema component added at /components/features/services/BreadcrumbSchema.tsx
- IFFER-4, 6, 8 already existed from IFFER-1 implementation
- Nav styling fix: Added usePathname() to detect homepage, created useHeroStyling variable
- Hero styling (transparent bg, white text, shadows) only applies on homepage when not scrolled
- Service pages and other routes always use white nav with dark text
- Services hub page: New components in /components/features/services-hub/
- Components: ServicesHubHero, ServicesGrid, ServiceCard, WhyChooseUs, ServiceAreasSection, ServicesHubFAQ, ServicesHubCTA, ServicesHubSchema
- ServiceCard uses icon mapping for type-safe Lucide icons
- Hub-and-spoke SEO architecture: /services links to all /services/[slug] pages
- IFFER-11: Updated ServicesHubSchema.tsx telephone field to use +1 prefix for E.164 format
- IFFER-11: Updated BUSINESS_INFO.phone in constants.ts from placeholder to real number (5514866059)

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/services/engagement-photography
- https://ifferspictures.com/services/baby-shower-photography
- https://ifferspictures.com/services/bridal-shower-photography
- https://ifferspictures.com/services/party-photography
- https://ifferspictures.com/services/family-photography
- https://ifferspictures.com/services/headshots
- https://ifferspictures.com/services/maternity-photography
- https://ifferspictures.com/services/baptism-christening-photography
- https://ifferspictures.com/services
