# Audit Log - Events Hub Performance Optimizations - 2026-03-20

## Prompt Summary

Fix performance issues on the events hub page: add priority to LCP images, use next/dynamic for non-default layouts, and add breadcrumb schema markup.

## Actions Taken

1. Added `priority` prop to the featured image in MagazineLayout (LCP candidate)
2. Added `priority` prop to the active carousel image in ShowcaseLayout (LCP candidate)
3. Replaced static imports of ShowcaseLayout and GalleryLayout with `next/dynamic` imports in EventsHubContent
4. Kept MagazineLayout as static import since it's the default layout
5. Added BreadcrumbSchema component to the events hub page with Home > Services > Events breadcrumb trail
6. Ran `npx tsc --noEmit` to verify clean compilation

## Files Changed

- `src/components/features/events-hub/layouts/MagazineLayout.tsx` - Added priority prop to featured image
- `src/components/features/events-hub/layouts/ShowcaseLayout.tsx` - Added priority prop to active carousel image
- `src/components/features/events-hub/EventsHubContent.tsx` - Replaced static imports with next/dynamic for ShowcaseLayout and GalleryLayout
- `src/app/services/events/page.tsx` - Added BreadcrumbSchema import and component
- `docs/deployment_summary.md` - Appended performance improvement entries

## Components/Features Affected

- EventsHubContent (dynamic imports)
- MagazineLayout (priority image)
- ShowcaseLayout (priority image)
- Events hub page (breadcrumb schema)

## Testing Considerations

- Verify MagazineLayout featured image loads without lazy loading delay
- Verify ShowcaseLayout carousel image loads eagerly on first render
- Verify layout switching still works correctly with dynamically loaded components
- Check that breadcrumb schema appears in page source / structured data testing tool
- Run Lighthouse to confirm LCP improvement

## Performance Impact

- LCP images now preloaded (should reduce LCP metric)
- ShowcaseLayout and GalleryLayout code-split from initial bundle (reduces initial JS payload)
- BreadcrumbSchema adds minimal JSON-LD script tag (negligible size)

## Next Steps

- Monitor Core Web Vitals after deployment
- Consider adding loading skeleton for dynamically imported layouts

## Timestamp

Created: 2026-03-20
Page Section: Events Hub
