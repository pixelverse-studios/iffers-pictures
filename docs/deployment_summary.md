# Deployment Summary

## Latest deploy summary

- Homepage now uses the Rockstar layout with updated headline: "Heartfelt Moments, Beautifully Captured"
- Homepage navigation features a frosted glass floating pill that smoothly transitions to a solid bar on scroll
- Redesigned photographer intro section with editorial portrait and overlapping name card
- Sessions page simplified to a single gallery layout with a custom request option and image overlays
- Investment page simplified to editorial layout with "Get Started" buttons that pre-fill the contact form
- Service pages "Book Your Session" and "View Investments" buttons now pre-populate the contact form and scroll to the relevant investment section
- Testimonials page redesigned with an asymmetric editorial grid layout and teal hero background
- Removed generic "Happy Client" testimonial
- Improved button hover effects and cursor pointers across all CTAs
- Removed all layout selector widgets (sessions, investment, testimonials, design mode, nav style)

## Notes for internal team

- Contact form reads `?session=` query param to pre-select session type dropdown
- Investment page reads `?focus=` query param to scroll to a session section, then cleans the URL via `history.replaceState`
- Header frosted glass uses an absolutely-positioned pill with CSS-transitioned inline styles for smooth animation
- Unused layout files (CardsLayout, ListLayout, ShowcaseLayout, HybridLayout, MosaicLayout, ClassicLayout) still on disk but no longer imported

## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/services
- https://ifferspictures.com/investment
- https://ifferspictures.com/testimonials
- https://ifferspictures.com/contact
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
