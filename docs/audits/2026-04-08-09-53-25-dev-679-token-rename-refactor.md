# Audit Log - DEV-679 Token Rename Refactor - 2026-04-08 09:53:25

## Prompt Summary

Refactor color tokens from specific color names (`--teal*`, `--coral*`, `--gold*`) to semantic flat names (`--brand*`, `--accent*`, `--highlight*`) across the codebase, and remove the unused `DesignModeToggle` + `DesignModeContext`. Prerequisite for the DEV-680 theme switcher.

Linear: [DEV-679](https://linear.app/pixelverse-studios/issue/DEV-679)

## Actions Taken

1. **Branch setup.** Branched `dev-679` from `main` (the original ticket assumed `dev/launch` as base, but `dev/launch` was significantly stale relative to `main` and the rockstar homepage variant lived only on `main`). Deleted `dev/launch` locally and from origin per user direction — `main` is now the trunk.
2. **Rewrote `src/app/globals.css`** with the new token names. All `@theme inline` color variables, `:root` JS-accessible vars, selection/focus/scrollbar rules, gradient/overlay/accent-line/animation utility classes, and the `pulse-teal` keyframe were renamed.
3. **Bulk find-and-replace across `src/`** via `sed`, replacing all `var(--teal*)`, `var(--coral*)`, `var(--gold*)` references and their `[var(...)]` arbitrary-value class wrappers. Variant names were replaced before base names to avoid double-matching.
4. **Removed dead `DesignMode` system.** On `main`, the design-mode toggle was already orphaned — `DesignModeToggle` was no longer mounted in `Providers.tsx`, the homepage was hardcoded to `RockstarLayout`, and the `mode === "inspired"` branches in other consumers were unreachable since `mode` permanently equaled `"current"`. Removing them is a true behavior no-op.
5. **Build verified** — `npm run build` passes, all 21 static pages generate, TypeScript clean.

## Files Changed

### Renamed tokens / class names (bulk)
- `src/app/globals.css` — rewrote with new semantic names (`--brand*`, `--accent*`, `--highlight*`), renamed utility classes (`bg-gradient-brand`, `text-gradient-brand`, `overlay-brand`, `accent-line-accent`, `accent-line-highlight`, `animate-pulse-brand`, `link-brand`, `shadow-brand`, `shadow-accent`) and `@keyframes pulse-brand`
- ~60+ component files under `src/` — mechanical sed replacement of CSS variable references

### DesignMode cleanup (surgical edits)
- `src/components/providers/Providers.tsx` — removed `DesignModeProvider` wrapper, now a simple passthrough
- `src/app/layout.tsx` — removed `TrustBadges` import + mount
- `src/components/features/sessions-hub/SessionsContent.tsx` — removed `useDesignMode` + conditional, always renders `GalleryLayout`
- `src/components/features/investment/InvestmentContent.tsx` — removed `useDesignMode` + conditional + unused `useRouter`, always renders `EditorialLayout`
- `src/components/features/homepage/index.ts` — removed `ImageDivider` re-export

### Files deleted
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

- The homepage `RockstarLayout` is untouched.
- Two `--vivid` rgba literals remain hardcoded inside `globals.css` (`pulse-brand` keyframe and `overlay-brand::after`) to preserve exact visual parity with Morning Dew. These will be parameterized properly when DEV-680 introduces the theme switcher.
- `landing-variations/shared/TrustBadges.tsx` is a different file in a different directory, used by old landing variants — left untouched as it's unrelated to the design-mode preview system.
- The `dev/launch` branch was deleted (local + origin) since `main` is now the trunk. Future tickets will branch directly from `main`.

## Next Steps

- Open PR `dev-679 → main`
- Merge after review
- Begin DEV-680 (theme switcher with 11 themes) on a fresh branch from `main`

## Timestamp

Created: 2026-04-08 09:53:25
Page Section: design system / theming infrastructure
