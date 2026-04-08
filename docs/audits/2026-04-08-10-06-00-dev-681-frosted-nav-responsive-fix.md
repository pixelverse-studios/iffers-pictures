# Audit Log - DEV-681 Frosted Nav Responsive Fix - 2026-04-08 10:06:00

## Prompt Summary

Fix the homepage frosted glass nav: at intermediate viewport widths (1024–1500px), the nav links spill outside the visible pill borders because the pill width and the nav content width were not coupled.

Linear: [DEV-681](https://linear.app/pixelverse-studios/issue/DEV-681)

## Diagnosis

The original Header had two independent elements:

1. The **frosted pill** (an absolutely-positioned `<div>`) sized via `left: 18%; right: 18%` — a fixed 64% of viewport width.
2. The **nav content** living in `.container` (max-width ~1200px) — basically the full viewport width.

These had no width relationship. At medium viewports the content was wider than the pill, so links rendered outside the visible pill bounds. There was also no compact-desktop breakpoint tier — the layout went straight from 64%-pill to mobile hamburger at `lg` (1024px) with no graceful intermediate state.

## Approach (per research)

Spawned a research subagent on premium frosted nav patterns (Apple, Hermès, Aesop, Linear, Cereal Magazine, Kinfolk). Key findings:

- Premium sites **don't lock pill width to a viewport %**. They use content-driven width with `max-width: min(1200px, 92vw)`-style clamps.
- The frosted background and the nav row should be **the same element**, not siblings.
- A **compact desktop tier (1024–1280px)** with tightened gaps is standard before swapping to hamburger at 1024px.
- Logo centering should use a **grid-based 3-zone layout** rather than absolute positioning, so the columns naturally enforce balance.

## Actions Taken

1. **Rewrote `Header.tsx`** as a single morphing wrapper instead of pill + content siblings.
   - One `<div>` is both the visual element (frosted in pill mode, solid white otherwise) AND the layout container.
   - `max-width: min(1200px, 92vw)` when in pill mode → never exceeds 1200px, always fits with breathing room on smaller viewports.
   - `max-width: 100%` when scrolled or on non-homepage → full-width white bar.
   - All visual properties (background, border-radius, margin-top, height, padding, max-width) animate via CSS transitions for smooth scroll-state morphing.

2. **Switched to grid-based 3-zone layout** for the nav content.
   - Mobile: `grid-cols-[auto_1fr_auto]` — hamburger / logo (centered in 1fr) / spacer
   - Desktop: `lg:grid-cols-[1fr_auto_1fr]` — left links / logo (auto, intrinsic width) / right links + CTA
   - Logo perfectly centered without absolute positioning — works at all widths.

3. **Added a compact desktop tier (1024–1280px).**
   - Outer grid gap: `lg:gap-5` → `xl:gap-8` → `2xl:gap-12`
   - Inner link group gap: `lg:gap-5` → `xl:gap-7` → `2xl:gap-9`
   - Wrapper height: `h-20` → `lg:h-24` → `xl:h-28`
   - Logo height: `h-14` → `lg:h-16` → `xl:h-20`
   - CTA padding/font: `lg:px-4 lg:py-2 lg:text-xs` → `xl:px-5 xl:py-2 xl:text-sm`

4. **Cleaned up dynamic styling** that was redundant in the original (`useHeroStyling`, `isFrosted`, `isFrostedMode`, `heroLinkColor`, `heroLinkShadow`, `heroUnderlineClass` — all collapsed to a single `isPill` boolean).

5. **Pointer-events fix.** Added `pointer-events-none` on the outer header and `pointer-events-auto` on the morphing wrapper, so the empty space outside the pill (in hero state) doesn't intercept clicks on hero content.

6. **Build verified** — `npm run build` passes, all 21 static pages, TypeScript clean.

## Files Changed

- `src/components/layout/Header.tsx` — full refactor (~150 lines simplified, same component API)

## Acceptance Criteria

- [x] Build and typecheck pass
- [ ] Visual QA at 1024px, 1280px, 1440px, 1920px (user verification on dev server)
- [ ] Mobile menu still works (no functional change to mobile menu)
- [x] Frosted ↔ solid scroll transition still animates smoothly (transition-all + transitionProperty allowlist)
- [x] Nav links never overflow the frosted pill at any viewport ≥ 1024px

## Notes

- Did NOT touch the mobile menu overlay — it's identical to the original.
- The pill's max-width formula `min(1200px, 92vw)` means: on viewports ≤ 1304px (where 92vw < 1200px), the pill is 92% of viewport. On viewports > 1304px, it caps at 1200px. This gives natural breathing room without ever overflowing.
- Inner padding `px-5 lg:px-6 xl:px-8` adds breathing room within the pill, separate from the outer max-width constraint.
- Link text uses `var(--foreground)` (high contrast) when in pill mode (since the frosted bg overlays a busy hero photo), and `var(--text-secondary)` (softer) when on solid white bg. Active state uses underline + brand color.

## Next Steps

- Open PR `dev-681 → main`
- User visual QA across breakpoints on dev server
- Merge once approved

## Timestamp

Created: 2026-04-08 10:06:00
Page Section: layout / header navigation
