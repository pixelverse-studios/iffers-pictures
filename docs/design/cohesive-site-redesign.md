# Cohesive Site Redesign Mockup

## Goal

Create one unified visual and narrative system for Iffer's Pictures so every public page feels like part of the same editorial photography experience.

This is a mockup and planning artifact, not a production replacement. The companion visual storyboard lives at `/design-mockup`.

## Research Notes

- Photography buyers are responding to documentary, candid, emotion-first storytelling rather than stiff posed presentation. Sources: Shoreline Weddings, Reworfidan, The Lumen Media, Eternal Lens Media.
- Editorial and fashion-inspired framing is a recurring photography trend: cleaner compositions, stronger lighting, magazine-style pacing, and more intentional image hierarchy. Sources: The Lumen Media, Tower Studios, Vogue.
- Creative service websites are leaning into editorial aesthetics: oversized serif typography, neutral palettes, whitespace, modular grids, high-quality images, and longer narrative homepages. Source: Fjora Avenue.
- Wedding and celebration design is also moving toward quiet luxury, personalization, natural materials, and immersive guest experience. Sources: Brides, Who What Wear, Business Insider.

Useful references:

- https://www.shorelineweddings.co/wedding-guide/wedding-photography-trends-2025
- https://reworfidan.media/blog/wedding-photography-trends-2025.html
- https://www.thelumenmedia.com/post/wedding-photography-trends-for-2025-styles-editing-and-must-have-shots
- https://www.eternallensmedia.com/blog/top-5-wedding-photography-and-videography-trends-for-2025/
- https://www.vogue.com/article/wedding-photography-styles
- https://fjoravenue.com/blogs/showit-website-templates-for-coaches-photographers-and-designers/the-top-web-design-trends-in-2025-what-creative-entrepreneurs-need-to-know
- https://www.brides.com/wedding-decor-trends-2025-8751330
- https://www.whowhatwear.com/living/wedding/wedding-planning-trends-2025
- https://www.businessinsider.com/popular-wedding-trends-colors-dresses-2026-3
- https://www.awwwards.com/favsto/collections/photography-portfolio/

## Current Page Audit

### Home

Current content: cinematic hero, Meet Jenn, image mosaic, featured testimonial, sessions, stats, CTA.

Issue: strong sections, but the rhythm shifts from cinematic to compact quickly. The homepage should become the master narrative for the entire site: feeling, Jenn, sessions, proof, inquiry.

Mockup direction: one first-viewport editorial composition, then a chaptered scroll that previews every major site destination.

### About

Current content: Jenn's long-form bio, stats, approach quote, CTA.

Issue: the approved bio is strong, but it reads as one long text field rather than a designed profile.

Mockup direction: split the story into editorial chapters with inline imagery: origin, teacher/patience, personal details, photography philosophy.

### Sessions Hub

Current content: short header and session cards/grid.

Issue: the page does not yet help users choose. It lists options, but the decision journey is underdesigned.

Mockup direction: create a session chooser with five strong panels, each with imagery, use cases, and "best for" cues.

### Session Detail Pages

Current content: hero, benefits, what to expect, bright gallery, testimonials, pricing, FAQ, CTA.

Issue: structurally complete, but sections feel like separate blocks. The story should move from promise to process to proof to action.

Mockup direction: reusable detail template with sticky service promise, timeline cards, luminous gallery, proof quote, FAQ, and final inquiry.

### Portfolio

Current content: hero, category split gallery, CTA.

Issue: the gallery is useful, but the page should feel curated before it feels filterable.

Mockup direction: lead with a category rail and editorial image wall, then allow filtering deeper in the page.

### Testimonials

Current content: hero, editorial testimonials layout, CTA.

Issue: testimonials are visually separate from the rest of the site's image-led storytelling.

Mockup direction: reading-room layout with one oversized featured quote, smaller session-grouped proof, and a carousel-like review strip.

### Investment

Current content: short header and investment content component.

Issue: "custom pricing" needs confidence. Visitors should understand what affects the quote and what every session includes.

Mockup direction: calm pricing explainer with custom investment promise, inclusions, quote factors, and process.

### FAQ

Current content: general FAQ, service-specific FAQ groups, CTA.

Issue: complete but long. It needs better hierarchy for scanning.

Mockup direction: top concerns first, then grouped accordions by booking journey: booking, session, delivery, service-specific.

### Inquire

Current content: warm hero, form, contact info, service areas, closing note.

Issue: good functional content, but the form can feel more conversational and less like a generic contact layout.

Mockup direction: split inquiry page with "what happens next" alongside the form, plus a Jenn sign-off.

### Image Review

Current content: internal review utility.

Issue: not part of the public marketing journey.

Mockup direction: keep operational and quiet. Do not apply the full editorial marketing system unless this tool becomes client-facing.

## Proposed Visual System

Name: Warm Editorial Documentary

Principles:

- Feeling before service taxonomy.
- Jenn's voice before studio abstraction.
- Real image planes instead of decorative cards.
- Long-form pages with clear chapter rhythm.
- Warm paper background, charcoal typography, muted blue-green brand accents, soft sand highlight.
- Galleries should feel luminous, not moody.

Palette proposal:

- Paper: `#f7f1e8`
- Warm white: `#fffaf2`
- Charcoal: `#241c17`
- Umber text: `#5f5147`
- Sand highlight: `#d7b48c`
- Muted brand blue-green: retain current brand tokens, but use them more sparingly

Typography:

- Keep Playfair Display for expressive headings unless we explicitly add a new display font.
- Keep DM Sans/Nunito for form and UI readability.
- Use headings wider and fewer lines. Avoid narrow centered blocks for every page.

Motion:

- Page load: subtle image reveal and text rise.
- Scroll: image scale/fade and scrubbed text reveal on long storytelling sections.
- Hover: image cards scale inside clipped frames.
- Use Framer Motion already in the repo. Add GSAP only if production implementation requires pinned/scrubbed sequences beyond Framer's scope.

## Proposed Site Flow

1. Home: emotional proof and pathfinding.
2. About: why Jenn is the right person to trust.
3. Sessions: choose the kind of memory.
4. Session detail: understand what happens and what you get.
5. Portfolio: confirm visual taste.
6. Testimonials: confirm trust.
7. Investment: reduce pricing uncertainty.
8. FAQ: answer final objections.
9. Inquire: start the conversation.

## Mockup Route

Open `/design-mockup` locally to review:

- hero direction
- global narrative flow
- page-by-page mockups
- proposed design system

This route should be removed before production unless we decide to keep it behind a non-public review flag.

## Implementation Recommendation

Do this as a phased redesign:

1. Build shared page primitives: `EditorialHero`, `ChapterSection`, `ImageChapter`, `ProofQuote`, `StoryCTA`, `SessionRail`.
2. Apply to Home, About, and Contact first because they define voice and conversion.
3. Apply to Sessions hub and Session detail template.
4. Apply to Portfolio and Testimonials.
5. Apply to Investment and FAQ.
6. Remove the `/design-mockup` route before launch or keep it unpublished.
