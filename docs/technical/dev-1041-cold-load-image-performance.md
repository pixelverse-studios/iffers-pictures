# DEV-1041 Cold-load image performance

## Scope

Measured the production homepage with an empty browser cache, then verified the
updated production build locally across the homepage, portfolio, and service
detail image paths.

## Baseline

Production Lighthouse on 2026-08-05:

| Profile | Performance | FCP | LCP | Image transfer | Image delivery opportunity |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 67 | 3.5 s | 5.5 s | 857 KiB | 440 KiB |
| Desktop | 93 | 0.7 s | 1.5 s | 916 KiB | 552 KiB |

The homepage hero was the LCP element. It was discoverable in the initial HTML
and was not lazy-loaded, but it did not have `fetchpriority="high"`. The mobile
hero response alone was 147 KiB at the default quality of 75. The header logo
also requested a 384 px variant for an approximately 95 px rendered width.

## Changes

- Public photography on the homepage, portfolio, and service detail layouts now
  requests quality 65 from the image optimizer.
- Each route's hero is eagerly loaded with an explicit high fetch priority.
- Below-the-fold photos remain lazy by default and receive a tiny neutral blur
  placeholder while their first remote request completes.
- The header logo no longer competes with the hero as a priority image, and its
  intrinsic dimensions now match its maximum rendered size more closely.
- Responsive `sizes` declarations remain tied to the actual layout widths.

## Verification

The local production build passed lint and `next build`. A cold local Lighthouse
run confirmed the intended delivery behavior:

| Profile | Performance | FCP | Speed Index | Image transfer | Image delivery opportunity |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 78 | 1.4 s | 2.1 s | 229 KiB | 17 KiB |
| Desktop | 95 | 0.3 s | 0.4 s | 243 KiB | 35 KiB |

The updated mobile hero response was 23 KiB and the desktop hero response was
54 KiB. Lighthouse also confirmed that the hero is discoverable, eager, and
high priority. The local mobile LCP was 5.9 s because the run included a cold
remote-origin fetch and local image transformation; it is not directly
comparable to Netlify's edge-served production timing. The local build also used
the checked-in fallback catalog because the CMS API was unavailable, so its
transfer totals are directional rather than a production comparison.

Netlify deploy preview 137 was then measured with the production CMS catalog and
the deployed Image CDN:

| Profile | Performance | FCP | LCP | Image transfer | Image delivery opportunity |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 93 | 1.6 s | 3.1 s | 781 KiB | 371 KiB |
| Desktop | 96 | 0.4 s | 1.4 s | 838 KiB | 479 KiB |

Compared with the production baseline, the preview improved mobile performance
from 67 to 93 and mobile LCP from 5.5 s to 3.1 s. Desktop improved from 93 to 96
while retaining a sub-1.5-second LCP. The remaining mobile gap to the 2.5-second
target is concentrated in Netlify's WebP transformation of the current CMS hero
and the cold R2 source fetch, rather than image discovery or eager-loading.

The 3.1-second cold-cache lab result is a reasonable interim result for this
photography-heavy page and a material improvement over the baseline, but it is
still above the 2.5-second "good" LCP threshold. Production field data at the
75th percentile should determine whether another image-delivery pass is needed.

## Cache policy

- Next.js keeps a 30-day minimum cache TTL for optimized variants when its
  optimizer controls caching.
- Production uses Netlify Image CDN, which uniquely caches each transformation
  at the edge. After the source-policy rollout, the transformed response for the
  current legacy hero was observed with `max-age=86400` and
  `stale-while-revalidate=604800`, matching its R2 source policy, while Netlify
  reported the transformed variant as edge-stored.
- The media service applies cache metadata server-side when an uploaded object is
  registered, avoiding a new browser upload header or CORS dependency. Generated
  timestamp-and-suffix keys use `public, max-age=31536000, immutable`;
  replaceable legacy keys use `public, max-age=86400,
  stale-while-revalidate=604800`. The server implementation was merged through
  [pixelverse-studios-server PR #154](https://github.com/pixelverse-studios/pixelverse-studios-server/pull/154).
- A one-time R2 metadata backfill completed on 2026-08-05. It updated 22
  generated/versioned objects with the immutable policy and 99 replaceable
  objects with the revalidating policy. A second dry run reported all 121 objects
  unchanged, and the public custom-domain response was verified with the expected
  revalidating `Cache-Control` header.
