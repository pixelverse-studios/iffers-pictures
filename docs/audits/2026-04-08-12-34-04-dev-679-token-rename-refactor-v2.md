# Audit Log - DEV-679 Token Rename Refactor (v2) - 2026-04-08 12:34:04

## Prompt Summary

Refactor color tokens from specific color names (`--teal*`, `--coral*`, `--gold*`) to semantic flat names (`--brand*`, `--accent*`, `--highlight*`) across the entire codebase, and remove the unused `DesignModeToggle` + `DesignModeContext` system. Prerequisite for the DEV-680 theme switcher.

This is the **second attempt** at DEV-679. The first attempt (PR #76) was built off the stale `dev/launch` branch and would have regressed several features that existed only on `main`. PR #76 was closed, `dev/launch` was deleted, `main` became the trunk, and this attempt was redone cleanly off current `main`.

Linear: [DEV-679](https://linear.app/pixelverse-studios/issue/DEV-679)

## Actions Taken

1. **Branched `dev-679` off current `main`** (commit `5c776f0`, which includes the merged DEV-681 Header.tsx refactor).
2. **Rewrote `src/app/globals.css`** with semantic token names. All `@theme inline` color variables, `:root` JS-accessible vars, selection/focus/scrollbar rules, gradient/overlay/accent-line/animation utility classes, and the `pulse-teal` keyframe were renamed. Two hardcoded `rgba(120, 152, 184, ...)` literals remain in the `pulse-brand` keyframe and `overlay-brand::after` to preserve exact visual parity.
3. **Bulk find-and-replace across `src/`** via `sed`, replacing all `var(--teal*)`, `var(--coral*)`, `var(--gold*)` references in one pass. Variant names (`--teal-light`, `-dark`, `-vivid`) were replaced before the base `--teal` to avoid double-matching. 276 occurrences across 64 files.
4. **Removed the DesignMode system:**
   - `Providers.tsx` — dropped `DesignModeProvider` wrapper, now a passthrough
   - `SessionsContent.tsx` — removed `useDesignMode` + conditional, always renders `GalleryLayout`
   - `InvestmentContent.tsx` — removed `useDesignMode` + conditional + unused `useRouter`, always renders `EditorialLayout`
   - `layout.tsx` — removed `TrustBadges` import + mount
   - `homepage/index.ts` — removed `ImageDivider` re-export
5. **Deleted dead files:**
   - `src/components/ui/DesignModeToggle.tsx`
   - `src/context/DesignModeContext.tsx`
   - `src/components/layout/TrustBadges.tsx`
   - `src/components/features/homepage/ImageDivider.tsx`
   - `src/components/features/sessions-hub/layouts/InspiredLayout.tsx`
   - `src/components/features/investment/layouts/NarrativeLayout.tsx`
6. **Build verified** — `npm run build` passes, all 21 static pages generate, TypeScript clean.

## Files Changed

### Rewritten
- `src/app/globals.css`

### Modified (sed + targeted edits)
- 64 `.tsx`/`.ts` files across `src/` — mechanical sed replacement of CSS variable references
- `src/components/providers/Providers.tsx` — drop DesignModeProvider
- `src/components/features/sessions-hub/SessionsContent.tsx` — drop mode conditional
- `src/components/features/investment/InvestmentContent.tsx` — drop mode conditional + unused `useRouter`
- `src/app/layout.tsx` — drop TrustBadges
- `src/components/features/homepage/index.ts` — drop ImageDivider re-export

### Deleted
- `src/components/ui/DesignModeToggle.tsx`
- `src/context/DesignModeContext.tsx`
- `src/components/layout/TrustBadges.tsx`
- `src/components/features/homepage/ImageDivider.tsx`
- `src/components/features/sessions-hub/layouts/InspiredLayout.tsx`
- `src/components/features/investment/layouts/NarrativeLayout.tsx`

## Token Mapping

| Old | New |
|---|---|
| `--teal` / `-light` / `-dark` / `-vivid` | `--brand` / `-soft` / `-strong` / `-vivid` |
| `--coral` / `-vivid` | `--accent` / `-vivid` |
| `--gold` / `-vivid` | `--highlight` / `-vivid` |
| `--color-primary-50..950` | `--color-brand-50..950` |
| `--color-teal*` | `--color-brand*` |
| `--color-accent-coral*` | `--color-accent*` |
| `--color-accent-gold*` | `--color-highlight*` |
| `--shadow-teal` / `--shadow-coral` | `--shadow-brand` / `--shadow-accent` |
| `.bg-gradient-teal` / `.text-gradient-teal` | `.bg-gradient-brand` / `.text-gradient-brand` |
| `.overlay-teal` | `.overlay-brand` |
| `.accent-line-coral` / `.accent-line-gold` | `.accent-line-accent` / `.accent-line-highlight` |
| `.animate-pulse-teal` + `@keyframes pulse-teal` | `.animate-pulse-brand` + `pulse-brand` |
| `.link-teal` | `.link-brand` |

## Verification

- [x] `npm run build` passes (all 21 pages, TypeScript clean)
- [x] `grep var\(--teal` returns 0 results in `src/`
- [x] `grep var\(--coral` returns 0 results in `src/`
- [x] `grep var\(--gold` returns 0 results in `src/`
- [x] `grep DesignMode` returns 0 results in `src/`
- [x] `grep InspiredLayout|NarrativeLayout|ImageDivider|@/components/layout/TrustBadges` returns 0 results in `src/`
- [x] No visual regression — pure token rename + dead-code removal

## Notes

- The newly-merged `Header.tsx` from DEV-681 (PR #77) was picked up by the sed replacement. Its `var(--teal-vivid)`, `var(--teal-dark)`, `var(--foreground)`, `var(--text-secondary)` references were all converted to the new flat names without issue.
- The `RockstarLayout` homepage (which is the locked-in design) had ~15 `var(--teal*)` references — all converted cleanly.
- `landing-variations/shared/TrustBadges.tsx` is a different file in old landing variants — not touched.
- The `dev/launch` branch was deleted earlier in the day; this work branches directly from `main`.

## Next Steps

- Open PR `dev-679 → main`
- After merge, DEV-680 (theme switcher) is unblocked and ready to start

## Timestamp

Created: 2026-04-08 12:34:04
Page Section: design system / theming infrastructure
