# Deployment Summary

## Latest deploy summary

- Improved the mobile image review page controls so Jenn can browse images without the filters taking over the screen.
- Updated homepage wording, experience stat, footer tagline, and session preview images based on Jenn's feedback.
- Updated the inquire page wording, next steps, and location/travel details based on Jenn's feedback.
- Updated event, maternity, couples, portrait, and session FAQ wording based on Jenn's feedback.
- Updated the sessions page image strips so they use a soft blur by default, smoothly unblur and zoom on hover, and keep text readable without dimming the full image.
- Updated the investment page copy, session details, included items, and starting investment amounts based on Jenn's feedback.
- Replaced testimonials with Jenn's refreshed Facebook review set and standardized reviewer names to first name plus last initial.
- Removed the stats band from the about page.
- Refined the about page story section so the two images feel more cohesive after the stats removal.
- Moved Custom Request into the sessions strip layout and updated portrait imagery to use the new R2 portrait asset.
- Removed the floating theme selector now that Morning Dew is the final site theme.

## Notes for internal team

- Updated `/image-review` mobile controls with a compact sticky bar and bottom-sheet group selector; desktop controls remain expanded.
- DEV-923: Added homepage-specific session image overrides, including the expected R2 key `portrait/portrait-01.jpg` for the portrait session holder.
- DEV-924: Removed the contact page availability block and kept the travel wording scoped to the location block.
- DEV-925: Removed the event fast-share benefit, updated session duration copy, and removed style-guide promises from targeted FAQs.
- Updated `BoardSessionStrip` hover styling for the sessions hub.
- DEV-926: Reworked investment page data and layout copy while preserving existing imagery and session links.
- DEV-927: Replaced central testimonial data and refreshed service-page testimonial snippets.
- DEV-927: Updated the testimonials hero layout to keep the full review grid readable while using a concise featured preview above.
- Removed the about page stats section from `BoardAboutLayout`.
- Reworked the about page story block with a warm band, framed image, and separated text column.
- Added the R2 `portraits/portrait_01.jpg` asset to portfolio data and used it for portrait thumbnails/hero imagery.
- Converted the sessions hub Custom Request CTA from a standalone card into a `BoardSessionStrip` item with a temporary image placeholder.
- Removed the theme switcher UI, runtime theme context, stored-theme boot script, and theme catalog.

## Changed URLs

- https://ifferspictures.com/image-review
