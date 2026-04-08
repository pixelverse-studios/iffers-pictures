# Audit Log - Remove 25 Portfolio Images - 2026-04-08 09:01:12

## Prompt Summary

Client removed 25 images from the R2 bucket and asked us to remove the same images from the site.

## Actions Taken

1. Searched the codebase for references to the 25 image filenames — only `src/components/features/portfolio/portfolioData.ts` contained live references (docs/session files excluded).
2. Verified portfolio item `id` is only used as a React key (`Lightbox.tsx:96`), so gaps in IDs are safe.
3. Removed 25 `PortfolioItem` entries from `PORTFOLIO_ITEMS`.
4. Updated section count comments to reflect new totals.
5. Confirmed final count: 91 items (was 116).

## Files Changed

- `src/components/features/portfolio/portfolioData.ts` — removed 25 entries and updated category count comments
- `docs/deployment_summary.md` — appended client-facing change summary

## Removed Items (by R2 path)

**Bridal Shower (9):** bridal-shower-01..06, 11, 12, 21
**Gender Reveal (2):** gender-reveal-10, 12
**Birthday (1):** birthday-03
**Baptism (2):** baptism-02, 06
**Engagement (3):** engagement-10, 13, 15
**Proposal (2):** proposal-02, 03
**Family (5):** family-06, 12, 15, 17, 20
**Maternity (1):** maternity-15

## Updated Category Counts

| Category | Before | After |
|---|---|---|
| Bridal Shower | 22 | 13 |
| Gender Reveal | 12 | 10 |
| Birthday | 6 | 5 |
| Baptism | 6 | 4 |
| Engagement | 15 | 12 |
| Proposal | 6 | 4 |
| Family | 27 | 22 |
| Maternity | 17 | 16 |

## Components/Features Affected

- Portfolio gallery (`/portfolio`)
- Session sub-pages that use `getPortfolioForService` (bridal-shower, engagement, proposal, family, maternity, gender-reveal via milestones, religious-ceremonies, parties)
- Service card thumbnails via `getServiceThumbnail` — none of the removed images were thumbnail candidates (first item in each category preserved)

## Testing Considerations

- Verify no 404s on portfolio page and affected session sub-pages
- Spot-check gallery grid layouts still render cleanly with new counts
- Confirm service card thumbnails still resolve (first-item lookup still valid)

## Performance Impact

- Slightly smaller bundle (25 fewer data rows)
- No SEO schema impact — image data is client-rendered

## Next Steps

- Commit and push once user approves

## Notes

IDs in `PORTFOLIO_ITEMS` now have gaps (e.g. 6–11, 16–17, 26, 37, 40, 42, 52, 54, 57, 62–63, 68, 72, 78, 84, 87, 89, 92, 114 removed). Safe because IDs are only used as React keys, never as lookup indices.

## Timestamp

Created: 2026-04-08 09:01:12
Page Section: portfolio data
