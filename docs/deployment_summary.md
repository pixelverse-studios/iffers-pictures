# Deployment Summary

## Latest deploy summary

- Hero gradient now changes to match each color theme instead of staying the same across all palettes
- Added 5 new color themes designed for event photography: Golden Hour, Rosewater & Fern, Dusty Plum, Coastal Dusk, and Petal & Stone (15 total themes now available)
- Footer background now adapts to each theme with proper contrast for readability
- Fixed "Get in Touch" button in the booking section that was showing invisible white text on white background
- Footer text colors now properly respond to theme changes

## Notes for internal team

- Added CSS custom properties --hero-from, --hero-via, --hero-to for per-palette hero gradients
- Added --footer-bg custom property for per-palette footer backgrounds
- Fixed Tailwind v4 CSS cascade issue: moved `a { color: inherit }` into @layer base so utility classes properly override it
- Replaced hardcoded text-neutral-400/500 in Footer with theme-aware text-white/60 and text-white/40

## Changed URLs

- https://ifferspictures.com/
