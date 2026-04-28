# Deployment Summary

## Latest deploy summary

- Removed 25 portfolio images per client request across Bridal Shower, Gender Reveal, Birthday, Baptism, Engagement, Proposal, Family, and Maternity categories
- Fixed responsive bug in the homepage frosted glass navigation — links no longer overflow the pill on smaller screens
- Internal cleanup: renamed color tokens to support upcoming theme switcher and removed unused design-mode preview widget
- Added a theme preview tool: Jen can now click a floating palette pill in the bottom-left corner of any page to preview the site across 12 curated color themes (9 light + 3 soft-dark), including a new "Cove" vibrant-teal theme. Her choice is remembered per-device.
- Added project agent instructions so future AI-assisted work follows the site workflow, documentation process, and SEO standards.
- Updated the Portfolio page intro to use the new "Memories, Beautifully Captured" messaging.
- Refreshed the Testimonials page hero with the aligned blue treatment and new "Kind Words" copy.
- Updated session pages so breadcrumbs say "Sessions" and removed the extra trust badges from the bottom call-to-action.
- Tightened session benefits and testimonial cards for a lighter, more compact presentation.
- Updated session delivery timing copy across Events, Family, Maternity, Couples & Engagement, and Portrait pages.
- Tightened the Inquire page header spacing so the page intro feels more compact.
- Expanded the Inquire form to collect first and last name, event details, social handle, and referral source.
- Updated the Inquire page sidebar, closing copy, and confirmation message to better match Jenn's intake process.
- Replaced the About page bio with Jenn's new long-form personal narrative and removed the facts-card section.
- Removed a duplicate quote from the About page so Jenn's approach statement appears only once.

## Notes for internal team

- Images also removed from R2 bucket by client; only portfolioData.ts referenced them
- Updated section count comments to reflect new totals
- Portfolio item IDs left with gaps (used only as React keys)
- DEV-681: Refactored Header.tsx to a single morphing wrapper that grows/shrinks with content. Pill width now uses `max-width: min(1200px, 92vw)` instead of a fixed 64% viewport rule. Inner layout switched to a 3-zone grid (`[1fr_auto_1fr]` desktop, `[auto_1fr_auto]` mobile) for guaranteed centered logo. Added compact desktop tier (1024–1280px) with tighter gaps.
- DEV-679: Renamed color tokens `--teal*` → `--brand*`, `--coral*` → `--accent*`, `--gold*` → `--highlight*` across globals.css and 64 component files (~276 touchpoints). Removed orphaned DesignModeToggle, DesignModeContext, ImageDivider, layout TrustBadges, sessions InspiredLayout, investment NarrativeLayout — all dead code paths since rockstar homepage was locked in. No visual regression.
- DEV-680: Added floating theme switcher with 12 curated themes (9 light + 3 soft-dark with warm charcoal backgrounds). Added "Cove" vibrant-teal theme (Tailwind teal-600 primary with warm coral accent). Single source of truth in `src/lib/themes.ts`. Runtime theme switching via `document.documentElement.style.setProperty` on 19 tokens per theme. FOUC-prevention inline script in layout.tsx head runs pre-hydration, bakes both `data-theme` and `data-theme-mode` for CSS selectors. 200ms body color transition gated by `prefers-reduced-motion`. Full a11y (radiogroup, arrow-key nav, focus restore, motion-reduce). Header pill uses `rgb(from var(--surface) r g b / 0.3)` relative color syntax with rgba fallback. Feature doc in `docs/features/theme-switcher.md`. Strip or lock to client's choice before go-live.
- Created `AGENTS.md` from the existing `claude.md` guidance and translated Claude-specific tool notes into Codex-compatible instructions.
- Completed DEV-762 and DEV-767. Targeted ESLint passed for `src/app/portfolio/page.tsx` and `src/app/testimonials/page.tsx`; production build passed after allowing network access for Google Fonts. Full repo lint is still blocked by existing unrelated lint errors.
- Completed DEV-763, DEV-765, and DEV-766. Event FAQ copy stays as-is beyond the approved delivery timing fix, and the Family gallery headline remains unchanged for now.
- Completed DEV-768 and DEV-769. Contact API payload now maps split names into `fullname` and passes new inquiry fields through in `data`.
- Completed DEV-761. Updated `AboutBio.tsx` with the approved narrative and removed the `A Few Things About Me` block.
- Follow-up to DEV-761: removed the duplicate approach quote introduced during the About narrative update.

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
- https://ifferspictures.com/testimonials
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/family
- https://ifferspictures.com/services/maternity
- https://ifferspictures.com/services/couples-engagement
- https://ifferspictures.com/services/portrait
- https://ifferspictures.com/contact
- https://ifferspictures.com/about
