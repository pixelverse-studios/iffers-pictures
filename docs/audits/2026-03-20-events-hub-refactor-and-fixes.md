# Audit Log - Events Hub Refactor & Fixes - 2026-03-20

## Prompt Summary

Five code quality tasks for the events hub components: extract shared constants, fix CSS variable, remove unnecessary "use client" directives, add ARIA attributes to LayoutSelector, and fix Gallery mobile hover accessibility.

## Actions Taken

1. Created `shared.ts` with `EVENT_DESCRIPTIONS`, `iconMap`, and `SECTION_HEADER` constants
2. Updated MagazineLayout.tsx, ShowcaseLayout.tsx, GalleryLayout.tsx to import from shared.ts and remove inline duplicates
3. Replaced `var(--border-light)` with `var(--border)` in LayoutSelector.tsx
4. Removed `"use client"` from EventsHubHero.tsx and EventsHubCTA.tsx
5. Added `role="tablist"` to LayoutSelector container, `role="tab"` and `aria-selected` to buttons
6. Updated GalleryLayout description and CTA classes to show by default on mobile (sm: breakpoint for hover effects)
7. Ran `npx tsc --noEmit` - clean compilation

## Files Changed

- `src/components/features/events-hub/layouts/shared.ts` - New file with shared constants
- `src/components/features/events-hub/layouts/MagazineLayout.tsx` - Import from shared, remove duplicates, use SECTION_HEADER
- `src/components/features/events-hub/layouts/ShowcaseLayout.tsx` - Import from shared, remove duplicates, use SECTION_HEADER
- `src/components/features/events-hub/layouts/GalleryLayout.tsx` - Import from shared, remove duplicates, use SECTION_HEADER, mobile hover fix
- `src/components/features/events-hub/LayoutSelector.tsx` - Fix --border-light, add ARIA tab pattern
- `src/components/features/events-hub/EventsHubHero.tsx` - Remove "use client"
- `src/components/features/events-hub/EventsHubCTA.tsx` - Remove "use client"

## Components/Features Affected

- Events hub page layout system
- LayoutSelector widget
- All 3 layout variants (Magazine, Showcase, Gallery)

## Testing Considerations

- Verify LayoutSelector still switches layouts correctly
- Test Gallery layout on mobile devices - descriptions and CTAs should be visible without hover
- Confirm screen readers announce tab pattern correctly on LayoutSelector
- Verify no visual regression on border styling (--border vs --border-light)

## Performance Impact

- Slightly smaller bundle per layout file due to shared imports (tree-shaking handles unused icons)
- EventsHubHero and EventsHubCTA can now be server-rendered (no "use client")

## Next Steps

- None required

## Timestamp

Created: 2026-03-20
Page Section: Events Hub
