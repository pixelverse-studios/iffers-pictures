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
comparable to Netlify's edge-served production timing. Re-run Lighthouse on the
deploy preview before merge to measure CDN behavior.

## Cache policy

- Next.js keeps a 30-day minimum cache TTL for optimized variants when its
  optimizer controls caching.
- Production uses Netlify Image CDN, which uniquely caches each transformation
  at the edge. The current transformed browser response was observed with a
  four-hour TTL; Netlify owns that deployed response policy.
- Source photos use stable R2 object URLs. The R2 custom domain currently sends
  no browser `Cache-Control` header. This does not prevent Netlify edge reuse,
  but setting immutable source metadata must be handled in the separate media
  upload service or Cloudflare configuration, not in this frontend repository.

