# Deployment Summary

## Latest deploy summary

- Removed 25 portfolio images per client request across Bridal Shower, Gender Reveal, Birthday, Baptism, Engagement, Proposal, Family, and Maternity categories
- Internal cleanup: renamed color tokens to support upcoming theme switcher and removed unused design-mode preview widget

## Notes for internal team

- Images also removed from R2 bucket by client; only portfolioData.ts referenced them
- Updated section count comments to reflect new totals
- Portfolio item IDs left with gaps (used only as React keys)
- DEV-679: token rename refactor — `--teal*` → `--brand*`, `--coral*` → `--accent*`, `--gold*` → `--highlight*` across globals.css and ~250 component touchpoints. No visual change.
- DEV-679: removed orphaned DesignModeToggle, DesignModeContext, ImageDivider, layout TrustBadges, sessions InspiredLayout, investment NarrativeLayout — all dead code paths since the rockstar homepage was locked in

## Changed URLs

- https://ifferspictures.com/portfolio
- https://ifferspictures.com/sessions/bridal-shower
- https://ifferspictures.com/sessions/gender-reveal
- https://ifferspictures.com/sessions/parties
- https://ifferspictures.com/sessions/religious-ceremonies
- https://ifferspictures.com/sessions/engagement
- https://ifferspictures.com/sessions/proposal
- https://ifferspictures.com/sessions/family
- https://ifferspictures.com/sessions/maternity
