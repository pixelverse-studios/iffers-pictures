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

## Changed URLs

- https://ifferspictures.com/
