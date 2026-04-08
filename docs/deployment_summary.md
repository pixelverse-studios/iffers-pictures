# Deployment Summary

## Latest deploy summary

- Removed 25 portfolio images per client request across Bridal Shower, Gender Reveal, Birthday, Baptism, Engagement, Proposal, Family, and Maternity categories
- Fixed responsive bug in the homepage frosted glass navigation — links no longer overflow the pill on smaller screens
- Internal cleanup: renamed color tokens to support upcoming theme switcher and removed unused design-mode preview widget
- Added a theme preview tool: Jen can now click a floating palette pill in the bottom-left corner of any page to preview the site across 11 curated color themes (8 light + 3 soft-dark). Her choice is remembered per-device.

## Notes for internal team

- Images also removed from R2 bucket by client; only portfolioData.ts referenced them
- Updated section count comments to reflect new totals
- Portfolio item IDs left with gaps (used only as React keys)
- DEV-681: Refactored Header.tsx to a single morphing wrapper that grows/shrinks with content. Pill width now uses `max-width: min(1200px, 92vw)` instead of a fixed 64% viewport rule. Inner layout switched to a 3-zone grid (`[1fr_auto_1fr]` desktop, `[auto_1fr_auto]` mobile) for guaranteed centered logo. Added compact desktop tier (1024–1280px) with tighter gaps.
- DEV-679: Renamed color tokens `--teal*` → `--brand*`, `--coral*` → `--accent*`, `--gold*` → `--highlight*` across globals.css and 64 component files (~276 touchpoints). Removed orphaned DesignModeToggle, DesignModeContext, ImageDivider, layout TrustBadges, sessions InspiredLayout, investment NarrativeLayout — all dead code paths since rockstar homepage was locked in. No visual regression.
- DEV-680: Added floating theme switcher with 11 curated themes (8 light + 3 soft-dark with warm charcoal backgrounds). Single source of truth in `src/lib/themes.ts`. Runtime theme switching via `document.documentElement.style.setProperty` on 19 tokens per theme. FOUC-prevention inline script in layout.tsx head runs pre-hydration. 200ms body color transition gated by `prefers-reduced-motion`. Full a11y (radiogroup, arrow-key nav, focus restore, motion-reduce). Feature doc in `docs/features/theme-switcher.md`. Strip or lock to client's choice before go-live.

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
