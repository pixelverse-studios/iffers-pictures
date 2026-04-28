# Iffer's Pictures - Agent Instructions

## Critical Workflow Rules

### Git

- Never commit or push changes without explicit user approval.
- Ask before running `git commit`.
- Ask before running `git push`.
- Only commit when the user explicitly says to commit the changes.
- Do not batch unrelated commits.
- Never push `main` to the remote unless the user explicitly says "push main" or "push to main remote".
- Merging PRs into local `main` is fine, but pushing `main` to origin triggers deployment.

### Development Server Management

The user usually has a local server running. Do not leave dev servers running in the background.

- Do not start `npm run dev` unless it is needed for validation.
- Prefer static checks such as `npm run lint` and `npm run build`.
- If you start a server, keep the session id and stop it immediately after validation.
- Do not end a turn while a server you started is still running.

### Deployment Summary

Immediately after completing client-visible or release-relevant work, append to [docs/deployment_summary.md](/Users/phil/PVS-local/Projects/clients/iffers-pictures/docs/deployment_summary.md) before waiting for commit approval.

The deployment summary accumulates across tasks and feature branches until `main` is pushed. A pre-push hook reads it and sends client deployment notifications.

Required sections:

- `## Latest deploy summary` - Client-facing, plain-language bullets describing what changed.
- `## Notes for internal team` - Technical notes, ticket IDs, or implementation details.
- `## Changed URLs` - Full production URLs only, one per bullet. Do not add comments after URLs.

Append new bullets below existing entries. Do not replace prior entries unless the user asks.

## Project Overview

Iffer's Pictures is a professional photography business based in Cliffside Park, NJ, specializing in event photography, including engagements, baby showers, bridal showers, parties, family sessions, headshots, maternity, and baptism/christening photography.

Primary goal: generate leads through organic local search traffic by ranking for `[service] photographer [location]` queries across Bergen County and nearby Northern New Jersey towns.

Production domain: `https://ifferspictures.com`

## Tech Stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- Typography: Playfair Display for headings, DM Sans for body text
- Icons: Lucide React
- Animation: Framer Motion
- Forms: React Hook Form and Zod
- Deployment: Vercel

## Common Commands

```bash
npm run dev
npm run build
npm run lint
node scripts/install-hooks.js
```

Use `npm run lint` and `npm run build` for validation when practical.

## Design System

Core locations:

- `src/app/globals.css` - Theme variables and Tailwind v4 theme setup.
- `src/components/ui/` - Shared primitives.

Brand variables include:

- Teal: `--teal`, `--teal-light`, `--teal-dark`
- Accents: `--coral`, `--gold`
- Backgrounds: `--background`, `--background-warm`, `--surface`
- Text: `--foreground`, `--text-secondary`, `--text-muted`
- Borders: `--border`

Core UI components:

- `Button` with primary, secondary, outline, ghost, and coral variants.
- `Card` with default, elevated, bordered, and warm variants.
- `SectionHeader` with eyebrow, title, description, and accent line.
- `Input` and `Textarea` with labels, errors, and helper text.

## Implementation Standards

- Use section spacing of `py-16 md:py-24`.
- Use containers with `max-w-7xl mx-auto px-6 md:px-8`.
- Use `font-heading` and `font-body`.
- Blog and article headers must include `pt-hero` so fixed navigation does not overlap content.
- All location pages must include LocalBusiness and Service schema markup.
- All relevant pages should include schema such as LocalBusiness, Service, FAQ, and BreadcrumbList where appropriate.
- All images must use Next.js `Image` with useful alt text.
- Maintain Lighthouse scores of 90 or higher where practical.
- Maintain WCAG AA contrast.
- Mobile is a primary surface.
- Do not change direct copy provided by the user unless explicitly asked. Add supporting copy only where it fits the scope.

## Project Organization

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    robots.ts
    sitemap.ts
    about/
    services/[service]/
    portfolio/[category]/
    pricing/
    locations/[location]/
    blog/[slug]/
    contact/
    api/
  components/
    layout/
    ui/
    features/
    seo/
    forms/
  lib/
    constants.ts
    utils.ts
  data/
  types/
  hooks/
public/
  images/
    portfolio/
    logo/
docs/
  audits/
  features/
  technical/
  references/
  planning/
```

All project documentation belongs in `docs/`.

## Pages

- Homepage: hero, services overview, portfolio preview, testimonials, service areas, CTA.
- About: photographer bio, story, approach.
- Services hub: overview of photography services.
- Service detail pages: engagement, baby shower, bridal shower, party/event, family, headshots, maternity, baptism/christening.
- Portfolio: filterable gallery by category.
- Pricing: packages and pricing information.
- Locations hub: service area overview.
- Location pages: town-specific local SEO pages.
- Blog: local venues, tips, seasonal content.
- Contact: booking and inquiry form.

## Local SEO Targets

Primary towns:

- Cliffside Park, NJ
- Fort Lee, NJ
- Edgewater, NJ
- Fairview, NJ
- Palisades Park, NJ
- North Bergen, NJ

Secondary towns:

- Englewood, NJ
- Englewood Cliffs, NJ
- Tenafly, NJ
- Leonia, NJ
- Ridgefield, NJ
- Ridgefield Park, NJ
- Hackensack, NJ
- Teaneck, NJ

## Hyper-Local SEO Strategy

Reference [docs/references/implementation-plan.md](/Users/phil/PVS-local/Projects/clients/iffers-pictures/docs/references/implementation-plan.md) for the full strategy.

Keyword patterns:

- `[service] photographer [town] NJ`
- `affordable [service] photography [town]`
- `best [service] photographer near [town]`
- `[service] photography packages [town] NJ`

SEO task requirements:

- Focus resources on the primary 6 towns first.
- Each priority town needs per-location LocalBusiness schema.
- Consider Google Business Profile optimization for local ranking work.
- Prefer content depth over breadth. Location pages should include local landmarks and venue mentions.
- Keep NAP data consistent across pages and listings.

Technical SEO implemented:

- Site-wide LocalBusiness schema.
- Sitemap with location pages.
- Robots configuration.
- OpenGraph and Twitter cards.
- Metadata structure.

Technical SEO still pending:

- Per-location LocalBusiness schema.
- Service schema per service page.
- BreadcrumbList schema on all pages.
- FAQPage schema on service and location pages.
- Full location page content.
- Blog content strategy execution.

## Core Principles

1. Conversion first: every element should support booking inquiries.
2. Local SEO focus: optimize pages for service and location searches.
3. Social proof: use testimonials and portfolio samples throughout.
4. Speed matters: target sub-2 second loads and green Core Web Vitals.
5. Mobile optimized: most traffic is mobile.
6. Schema markup: add structured data on relevant pages.
7. Test everything: use data and validation.
8. Accessibility: WCAG 2.1 AA minimum.
9. Document durable decisions or release-relevant notes when they will help future work.
10. Documentation belongs in `docs/`.

## Linear Tickets

When creating Linear tickets for this project:

- Team: Development (`DEV`)
- Assignee: `me`
- Project: `Iffers Pics Site - 2026`
- Milestone: `Launch`
- Priority: Medium (`3`)

Relevant labels:

- Environment: `Front End`, `Fullstack`, `Server`
- Scope: `Ticket`, `Epic`
- Task: `Feature`, `Bug`, `Improvement`, `Refactor`, `Maintenance`, `Research`

Ticket description format:

- `## Summary`
- `## Current State` and `## Target State`, when applicable
- `## Implementation`
- `## Acceptance Criteria`

## Reference Documents

- [docs/references/implementation-plan.md](/Users/phil/PVS-local/Projects/clients/iffers-pictures/docs/references/implementation-plan.md) - Site architecture, component structure, SEO strategy, and phased implementation.
- [docs/references/blog-guidelines.md](/Users/phil/PVS-local/Projects/clients/iffers-pictures/docs/references/blog-guidelines.md) - Blog content standards.
- [docs/references/r2-image-workflow.md](/Users/phil/PVS-local/Projects/clients/iffers-pictures/docs/references/r2-image-workflow.md) - Image workflow reference.
