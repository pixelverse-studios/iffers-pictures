# Theme Switcher

Client-preview tool for evaluating color palettes on the staging site.
Delivered as part of **DEV-680**.

## Overview

A floating pill in the bottom-left corner of every page. Click to expand a
popover grid of 11 curated themes; click any chip to apply it instantly.
The selected theme persists per-device via `localStorage` and is re-applied
on every page load synchronously (no flash of the default palette).

This is a **staging-only tool**. The site isn't live yet — this lets Jen
audition palettes across the entire site before committing to one. Before
go-live, either strip the switcher entirely or hard-code her winning theme.

## Architecture

```
┌──────────────────────────────────────────────────┐
│  src/lib/themes.ts                               │
│  — 11 theme catalog, single source of truth      │
│  — THEMES, THEME_ORDER, THEME_STORAGE_KEY        │
└──────────────────────────────────────────────────┘
        ▲                ▲                ▲
        │                │                │
        │ imports        │ imports        │ imports
        │                │                │
┌───────┴───────┐ ┌──────┴───────┐ ┌──────┴─────────┐
│ layout.tsx    │ │ ThemeContext │ │ ThemeSwitcher  │
│ — FOUC script │ │ — provider   │ │ — floating UI  │
│   in <head>,  │ │ — applies    │ │ — popover grid │
│   baked at    │ │   tokens to  │ │ — keyboard nav │
│   build time  │ │   :root      │ │                │
└───────────────┘ └──────────────┘ └────────────────┘
```

The catalog in `src/lib/themes.ts` is the single source of truth. Everything
else — the FOUC init script, the React provider, the switcher UI — reads
from it. Adding a new theme is a one-file change.

## How it works

### First paint (FOUC prevention)

`src/app/layout.tsx` contains a small inline `<script>` in `<head>` that:

1. Reads `localStorage['iffer-theme']`
2. Looks up the theme's token map in a build-time-baked JSON blob
3. Applies every token to `document.documentElement` via `style.setProperty`
4. Sets `document.documentElement.dataset.theme` for debug / targeting

All of this happens synchronously before React hydrates, so there's no
flash of the default Morning Dew palette on a page where Jen has a
different theme stored.

### Runtime theme changes

`ThemeContext` exposes `{ themeId, theme, setThemeId, mounted }`. When
`setThemeId` is called:

1. React state updates (triggers re-render of consumers)
2. `localStorage['iffer-theme']` is written
3. The new theme's tokens are applied to `document.documentElement` via
   `style.setProperty` (same mechanism as the FOUC script)

A 200ms `background-color` + `color` transition on `body` (in `globals.css`,
gated by `prefers-reduced-motion: no-preference`) gives the palette swap a
smooth cross-fade feel without touching layout-triggering properties.

### Switcher UI

`src/components/ui/ThemeSwitcher.tsx` is a floating bottom-left pill that
expands into a popover grid of theme chips. Each chip shows:

- A 4-dot color preview (background, surface, brand, accent)
- The theme name
- A "Dark" badge for soft-dark themes
- A checkmark overlay when active

Behavior:

- **Click** to apply instantly (no hover preview — UX research shows hover
  previews confuse users who scroll away mid-hover)
- **Keyboard:** Tab to focus the trigger, Enter/Space to open, arrow keys
  to navigate chips, Enter/Space to apply, Escape to close
- **A11y:** `role="radiogroup"` on the grid, `role="radio"` + `aria-checked`
  on each chip, `aria-expanded` + `aria-controls` on the trigger, focus
  restored to the trigger on close
- **Motion:** `motion-reduce:` variants on every transition

The popover stays open after a chip is clicked so users can audition
multiple themes quickly.

## Theme catalog

| # | Name | Mode | Brand hex | Mood |
|---|---|---|---|---|
| 1 | Morning Dew *(default)* | light | `#7898b8` | Muted blue-teal, soft seaside morning |
| 2 | Coastal Fog | light | `#6b8e8a` | Dusty film-grain teal, hushed and romantic |
| 3 | Verdigris | light | `#2a7f7a` | Patinated copper, Parisian rooftop elegance |
| 4 | Midnight Harbor | light | `#1e3a52` | Vogue masthead at dusk, quietly luxurious |
| 5 | Sage Atelier | light | `#8a9a7b` | Linen-draped studio, Magnolia meets Kinfolk |
| 6 | Aurora Mist | light | `#8a98c7` | Soft periwinkle frost morning, cool but tender |
| 7 | Tuscan Linen | light | `#a67c52` | Sun-warmed stone, olive groves, unhurried luxury |
| 8 | Blush & Charcoal | light | `#3a3a3c` | Matte magazine spread, powder blush against graphite |
| 9 | Dusk Harbor | soft-dark | `#7ba5c7` | Warm midnight navy, cream text |
| 10 | Forest Twilight | soft-dark | `#7ab5a3` | Muted emerald on warm forest, after-hours gallery |
| 11 | Velvet Sand | soft-dark | `#c9a880` | Warm sand on espresso, velvet-walled reading room |

Soft-dark themes use **warm charcoal** backgrounds (e.g. `#1c2230`,
`#1d2420`, `#241f1a`), not OLED black — easy on the eyes and still
visually rich.

## Tokens

Every theme defines 19 tokens. They map 1:1 to the CSS custom properties
in `globals.css`:

| Token | Purpose |
|---|---|
| `brand`, `brand-soft`, `brand-strong`, `brand-vivid` | Primary brand color + soft/strong shades + punchy variant |
| `accent`, `accent-vivid` | Secondary accent color |
| `highlight`, `highlight-vivid` | Tertiary highlight color |
| `background`, `background-warm`, `surface` | Page backgrounds (surface is the elevated layer) |
| `foreground`, `text-secondary`, `text-muted` | Text color hierarchy |
| `border` | Default border color |
| `footer-bg` | Footer background (typically deeper than page bg) |
| `hero-from`, `hero-via`, `hero-to` | Hero gradient stops |

## Adding a new theme

1. Pick a `ThemeId` slug (kebab-case, e.g. `"emerald-dusk"`)
2. Add it to the `ThemeId` union type in `src/lib/themes.ts`
3. Add an entry to the `THEMES` object with all 19 tokens filled in
4. Add the id to the `THEME_ORDER` array to control switcher display order
5. Fill in the `preview` tuple: `[background, surface, brand, accent]` hex
6. Verify body text contrast against background meets WCAG AA (4.5:1 for
   normal text, 3:1 for large text)
7. Build and preview — the switcher picks up the new theme automatically

## Known limitations

- **Two rgba literals are still hardcoded** in `globals.css` (`pulse-brand`
  keyframe and `.overlay-brand::after`). They use the Morning Dew brand
  color at reduced opacity. When swapping themes, these won't track. To
  fix, we'd need either:
  - Native `rgb(from var(--brand) r g b / 0.4)` relative color syntax
    (supported in all modern browsers but not yet adopted across this
    project), or
  - A parallel `--brand-rgb: "120 152 184"` token per theme so
    `rgba(var(--brand-rgb), 0.4)` works
  - Not a blocker for client review, flagged for follow-up

- **No SSR-aware default per user locale.** Everyone starts on Morning Dew
  unless they've previously set a theme. Fine for a client-preview tool.

## Files

- `src/lib/themes.ts` — catalog
- `src/context/ThemeContext.tsx` — provider + hook
- `src/components/ui/ThemeSwitcher.tsx` — UI
- `src/components/providers/Providers.tsx` — mounts the provider and the switcher
- `src/app/layout.tsx` — FOUC-prevention inline script + baked token map
- `src/app/globals.css` — 200ms body color transition
