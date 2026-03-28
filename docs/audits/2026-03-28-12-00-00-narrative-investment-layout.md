# Audit Log - Narrative Investment Layout (DEV-617) - 2026-03-28

## Prompt Summary

Add an "inspired" design mode variant for the investment/pricing page that replaces the existing layout selector with a narrative storytelling approach -- alternating image/text rows where each session type gets a mini-story before revealing a starting price. "Current" mode must render unchanged.

## Actions Taken

1. Read all existing investment page files (page.tsx, InvestmentContent.tsx, LayoutSelector.tsx, data.ts, all layout files)
2. Studied EditorialLayout.tsx as the closest existing pattern (alternating image/text rows)
3. Studied DesignModeContext.tsx for the hook API
4. Created NarrativeLayout.tsx in the layouts directory
5. Updated InvestmentContent.tsx to integrate useDesignMode() and conditionally render NarrativeLayout or the existing layout selector
6. Verified build passes with zero errors

## Files Changed

- `src/components/features/investment/layouts/NarrativeLayout.tsx` - New narrative pricing layout component
- `src/components/features/investment/InvestmentContent.tsx` - Added design mode integration, conditionally renders NarrativeLayout or existing layouts

## Components/Features Affected

- InvestmentContent (modified to read design mode)
- NarrativeLayout (new component)
- LayoutSelector (hidden when in "inspired" mode)

## Testing Considerations

- Verify "current" mode renders investment page identically to before (layout selector visible, all 4 layouts work)
- Verify "inspired" mode shows narrative layout with alternating rows
- Verify all 5 session types render with correct images, narratives, prices, and features
- Test mobile responsiveness (single-column stacking)
- Test design mode toggle switches between layouts without page reload
- Verify CTA section appears in both modes

## Performance Impact

- Minimal bundle size increase (one new component)
- Images use Next.js Image with proper sizes attribute for responsive loading
- No new dependencies added

## Next Steps

- Review narrative copy with client for tone/accuracy
- Adjust starting prices if needed based on client feedback
- Consider adding Framer Motion entrance animations to narrative rows

## Notes

- Starting prices are hardcoded in NarrativeLayout -- may want to move to data.ts if they need to be shared
- Narrative descriptions are session-specific copy written for storytelling tone
- The component follows the same image-mapping pattern as EditorialLayout (SESSION_IMAGE_MAP using portfolio data)

## Timestamp

Created: 2026-03-28 12:00:00
Page Section: Investment
