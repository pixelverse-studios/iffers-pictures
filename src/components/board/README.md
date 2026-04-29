# Design Board Primitives

Temporary component set for DEV-799 and the site-wide layout comparison epic.

These components express the approved board direction: restrained editorial
spacing, soft blue surfaces, thin rules, image-led compositions, compact CTAs,
and serif-led hierarchy. They are intentionally prop-driven so future board
layouts can reuse existing page copy and data instead of duplicating content.

Remove this folder, or fold the chosen pieces into the permanent component
system, after the client makes the final layout decision.

## Usage Rules

- Pass copy through props from existing data/page sources.
- Use `next/image` assets with useful alt text.
- Keep these as presentation primitives, not a permanent CMS/layout-builder.
- Do not put cards inside cards; compose sections as full-width bands or simple
  framed repeated items.
