# DEV-1030 CMS Image Delivery Audit

## Scope

Verified public delivery behavior for CMS-managed media on the image-heavy public pages:

- Homepage
- Services hub and service detail pages
- Portfolio
- Investment
- FAQ
- About

## Findings

- Public CMS media enters the site through the typed media catalog and placement helpers in `src/lib/media/server.ts` and `src/lib/media/gallery.ts`.
- Public pages pass CMS media into React components as `PublicGalleryItem` or `PublicMediaPlacement` values.
- Public renderers use Next.js `Image` for the CMS-driven image surfaces found in homepage, services, portfolio, investment, FAQ, and about layouts.
- `next.config.ts` allows the current R2 public bucket host and `https://media.ifferspictures.com` as optimized remote image sources.
- `next.config.ts` enables AVIF/WebP output and constrains generated responsive widths through `deviceSizes` and `imageSizes`.
- This branch adds `minimumCacheTTL` for optimized image derivatives so repeated public views do not repeatedly re-optimize the same remote originals.

## Responsive Delivery Notes

- Homepage hero uses `sizes="100vw"` because it is full-bleed.
- Homepage strip, session cards, portfolio tiles, service galleries, investment cards, FAQ images, and about images all use `sizes` values that correspond to their rendered layout width.
- Mobile gallery and grid images generally request half-width or full-width responsive variants instead of full desktop widths.
- Priority is limited to hero-style images where above-the-fold rendering is expected.

## Server And CDN Notes

- The browser-facing public pages should receive Next/Image optimized variants rather than direct 25 MB originals when rendered through these components.
- The Next.js image optimizer still needs to fetch the uploaded source image to generate a derivative on cache miss.
- If origin bandwidth, first-view latency, or optimizer memory becomes a problem with 25 MB originals, the next mitigation should be server-side derivative generation in `pixelverse-studios-server` or an image-transforming media CDN.
- Server-side derivative work should preserve the existing public catalog/placement contract or add explicit derivative URLs without removing the current `src` field until the frontend is migrated.

## Verification

- Static audit of all public CMS media render paths found `next/image` usage rather than raw `<img>` usage.
- `next.config.ts` remote patterns include both R2 and the custom media domain.
- Production build should be run after this change to validate the image config.
