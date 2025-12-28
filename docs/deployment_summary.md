# Deployment Summary

## Latest deploy summary

- Added 3 landing page design variations for A/B testing and comparison
- Created interactive variation switcher allowing real-time switching between designs
- Variation 1 "Emotional Storyteller": Hero-centric design with floating photo frames and emotional testimonials
- Variation 2 "Portfolio Forward": Split-layout hero emphasizing portfolio work first
- Variation 3 "Scroll Journey": Minimal hero with story-driven scrolling experience and parallax effects
- All variations include local SEO elements (Bergen County, NJ mentions, service areas, trust indicators)
- Added elegant placeholder components designed to be swapped with real photography later
- Added Variation 4 "Hybrid": Blends V1 + V3 with minimal hero, compact staggered services, and masonry portfolio
- Variation 4 now set as default when loading homepage

## Notes for internal team

- Component switcher floating in bottom-right corner for easy comparison
- All variations share the same footer from existing layout
- Built with existing design system (teal/coral palette, Playfair Display + DM Sans)
- New shared components: ImagePlaceholder, TrustBadges, AnimatedCounter, VariationSwitcher
- 30 new components total across 4 variations
- Implementation plans documented in docs/planning/
- Variation 4 reuses PortfolioPreview and ServiceAreasDisplay from V1

## Changed URLs

- https://ifferspictures.com/
