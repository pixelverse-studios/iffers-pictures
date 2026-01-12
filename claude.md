# Iffer's Pictures - 2025

## ⚠️ CRITICAL: Git Workflow Rules

**NEVER commit or push changes without explicit user approval.**

- Always ask before running `git commit`
- Always ask before running `git push`
- User must explicitly say "commit these changes" or "push to remote"
- After making code changes, STOP and wait for user review
- Only create commits when user explicitly requests it
- Do not batch commits - wait for approval after each set of changes
- **NEVER push to main remote** unless user explicitly says "push main" or "push to main remote"
- Merging PRs into local main is fine, but pushing main to origin triggers deployment

---

## ⚠️ CRITICAL: Development Server Management

**The user has a local server running at all times. NEVER leave dev servers running in the background.**

- **DO NOT** start `npm run dev` unless absolutely necessary for validation
- **ALWAYS** kill any dev servers you start immediately after validation
- Use `run_in_background: true` when starting servers for testing
- Store the shell ID and kill it with `KillShell` when done
- If you need to verify compilation, use a quick check and immediately close
- Prefer static analysis over running servers when possible

**Example Pattern:**

```bash
# Start server for validation
npm run dev (run_in_background: true, store shell_id)
# Wait for compilation (sleep 5-10s)
# Check BashOutput for success/errors
# IMMEDIATELY kill the shell: KillShell(shell_id)
```

---

## ⚠️ CRITICAL: Deployment Summary Updates (CLIENT COMMUNICATION)

**This is NON-NEGOTIABLE. The deployment summary powers automated client email notifications.**

### THE RULE:

**IMMEDIATELY after completing ANY work, APPEND to `docs/deployment_summary.md` BEFORE doing anything else.**

This is not optional. This is not an afterthought. This is the FIRST action after finishing work.

### Accumulation Workflow:

- **ADD** new bullet points below existing ones (don't replace previous entries)
- The summary accumulates across multiple PRs until `main` is pushed
- Think of it as a changelog for "everything since last deployment"
- The hook **only fires on pushes to `main`** (feature branches don't trigger it)
- After pushing to `main`: hook sends accumulated summary → file auto-resets

### Why This Matters:

- A Git pre-push hook reads this file and sends email notifications to stakeholders
- If the summary is empty, the notification is skipped silently
- The user trusts this automation to keep stakeholders informed
- **Skipping this step breaks that trust and leaves clients uninformed**

### Required Actions After EVERY Task:

1. **STOP** - Do not proceed to audit files or wait for commit approval
2. **APPEND** to `docs/deployment_summary.md` (add below existing entries):
   - `## Latest deploy summary` - Plain-language bullet points (what changed, not how)
   - `## Notes for internal team` - Technical details, ticket IDs (optional)
   - `## Changed URLs` - Full URLs affected (for Google re-indexing)
3. **THEN** create the audit file in `docs/audits/`
4. **THEN** wait for user commit approval

### Quick Reference (Accumulated Example):

```markdown
## Latest deploy summary

- Added new engagement photography gallery with 12 sample images
- Created location page for Fort Lee, NJ photographers
- Fixed mobile navigation menu alignment on contact page

## Notes for internal team

- IP-12, IP-15 completed
- Files: data/locations.ts, components/features/PortfolioGallery.tsx

## Changed URLs

- https://ifferspictures.com/portfolio/engagements
- https://ifferspictures.com/locations/fort-lee-nj
- https://ifferspictures.com/contact
```

**See "Documentation Requirements" section below for full formatting details.**

---

## Project Overview

Iffer's Pictures is a professional photography business based in Cliffside Park, NJ, specializing in event photography (engagements, baby showers, bridal showers, parties). This Next.js website is designed with a hyper-local SEO strategy to capture event photography searches across Bergen County and surrounding areas in Northern New Jersey.

**Primary Goal:** Generate leads through organic local search traffic by ranking for "[service] photographer [location]" queries across 14+ target towns.

**Production Domain:** https://ifferspictures.com

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Playfair Display (headings), DM Sans (body)
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Vercel (recommended)

---

## Design System

**Goal:** Centralized visual language for all pages and components.

**Structure:**

```
/src/app/globals.css   # Theme variables + Tailwind v4 @theme
/components/ui/        # Shared UI primitives
```

**CSS Variables (globals.css):**

```css
:root {
  /* Brand Colors - Teal Palette */
  --teal: #1a9b8e;
  --teal-light: #2dd4bf;
  --teal-dark: #0f766e;

  /* Accent Colors */
  --coral: #ff8559;
  --gold: #d4af37;

  /* Backgrounds */
  --background: #ffffff;
  --background-warm: #f8f6f3;
  --surface: #ffffff;

  /* Text */
  --foreground: #1f2937;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;

  /* Borders */
  --border: #e5e7eb;
}
```

**Core Components:**

- `Button` (primary, secondary, outline, ghost, coral variants)
- `Card` (default, elevated, bordered, warm variants)
- `SectionHeader` (eyebrow, title, description, accent line)
- `Input`, `Textarea` (with labels, errors, helper text)

---

## Page Architecture

Each major page has its own component directory under `/components/` and a route under `/app/`.

### Pages:

1. **Homepage** - Hero, services overview, portfolio preview, testimonials, service areas, CTA
2. **About** - Photographer bio, story, approach
3. **Services** - Overview of all photography services
4. **Service Detail Pages** - Individual pages for engagement, baby shower, bridal shower, party photography
5. **Portfolio** - Filterable gallery by category
6. **Pricing** - Packages and pricing information
7. **Locations Hub** - Service area overview with links to all location pages
8. **Location Pages** - 14+ individual town pages for local SEO
9. **Blog** - SEO content about local venues, tips, seasonal content
10. **Contact** - Booking/inquiry form

---

## Service Area (Local SEO Targets)

### Primary Towns (Highest Priority)

- Cliffside Park, NJ (home base)
- Fort Lee, NJ
- Edgewater, NJ
- Fairview, NJ
- Palisades Park, NJ
- North Bergen, NJ

### Secondary Towns

- Englewood, NJ
- Englewood Cliffs, NJ
- Tenafly, NJ
- Leonia, NJ
- Ridgefield, NJ
- Ridgefield Park, NJ
- Hackensack, NJ
- Teaneck, NJ

---

## Implementation Standards

- Sections: consistent spacing `py-16 md:py-24`
- Containers: `max-w-7xl mx-auto px-6 md:px-8`
- Typography: use `font-heading`, `font-body`
- Dark mode: toggle via `class="dark"` (optional for this project)
- Lighthouse >= 90, WCAG AA contrast
- Blog/article headers must include `pt-hero` so fixed navigation never overlaps content
- All location pages must include LocalBusiness + Service schema markup
- All images must use Next.js Image component with proper alt text

---

## Project Organization

```
/src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── about/
│   ├── services/[service]/
│   ├── portfolio/[category]/
│   ├── pricing/
│   ├── locations/[location]/
│   ├── blog/[slug]/
│   ├── contact/
│   └── api/
├── components/
│   ├── layout/          # Header, Footer
│   ├── ui/              # Button, Card, Input, etc.
│   ├── features/        # Service-specific components
│   ├── seo/             # Schema markup components
│   └── forms/           # Form components
├── lib/
│   ├── constants.ts     # Site config, services, locations
│   └── utils.ts         # Helper functions
├── data/                # Service, location, testimonial data
├── types/               # TypeScript definitions
└── hooks/               # Custom React hooks
/public/
├── images/
│   ├── portfolio/
│   └── logo/
```

---

## Team

- **Phil** - Developer (implementation, technical decisions)
- **Iffer** - Client/Photographer (content, photos, business details)

---

## Deployment Targets

- **Environment:** Production build optimized for speed
- **Platform:** Vercel
- **Domain:** ifferspictures.com
- **Analytics:** Google Analytics 4, Google Search Console

---

## Documentation Requirements

**IMPORTANT: ALL documentation and audit files MUST be created in the `docs/` directory**

### Directory Structure:

```
docs/
├── audits/             # Change audit files
├── features/           # Feature documentation
├── technical/          # Technical documentation
├── references/         # Reference guides (SEO, blog, implementation plan)
└── planning/           # Planning and strategy documents
```

### Deployment Summary Workflow

> ⚠️ **SEE CRITICAL SECTION AT TOP OF FILE** - Appending to the deployment summary is the FIRST action after completing any work. Do not skip this step.

This file is automatically processed by a Git pre-push hook that sends deployment data to the API and triggers an email notification. Keep summaries concise and non-technical.

#### Accumulation Model:

- The deployment summary **accumulates changes** across multiple PRs/tasks
- Each completed task **adds** bullet points (don't replace existing entries)
- The file represents "everything changed since the last push to `main`"
- **Feature branch pushes do NOT trigger the hook** - only `main` does
- When `main` is pushed: hook fires → sends full summary → file auto-resets

#### Format:

The file has **three required sections**:

1. **Latest deploy summary** - Client-facing changes (sent in email)
   - Use markdown formatting (bullet points, **bold**, _italic_)
   - Write in plain language (non-technical summaries)
   - Focus on WHAT changed, not HOW it was implemented
   - Each bullet should be one clear, concise sentence
   - **APPEND new bullets below existing ones**

2. **Notes for internal team** - Technical details (NOT sent in email)
   - Use markdown formatting
   - Include environment variables, technical notes, ticket IDs
   - This section is stored but NOT sent to clients
   - **APPEND new notes below existing ones**

3. **Changed URLs** - List all affected page URLs
   - Use bullet points (- https://ifferspictures.com/page)
   - Include full URLs with protocol
   - **URLs must be plain and valid** - no extra text, parentheses, or comments after the URL
   - These URLs are tracked for Google Search Console re-indexing
   - **APPEND new URLs below existing ones** (duplicates are OK, hook dedupes)

#### URL Formatting Examples:

```markdown
## Changed URLs

- https://ifferspictures.com/
- https://ifferspictures.com/services/engagement-photography
- https://ifferspictures.com/locations/fort-lee-nj
```

**Do NOT add notes after URLs:**

```markdown
## Changed URLs

- https://ifferspictures.com/ (all pages)     ❌ WRONG
- https://ifferspictures.com/pricing          ✅ CORRECT
```

#### Example Good Entries:

- "Added new engagement photography gallery with 12 sample images"
- "Created location page for Fort Lee, NJ photographers"
- "Updated pricing packages with new bridal shower options"

#### Example Bad Entries:

- "Implemented dynamic route with generateStaticParams for ISR"
- "Refactored PortfolioGallery to use React.memo for performance"

#### Process:

1. Complete your work on a feature/task
2. **IMMEDIATELY APPEND** to `docs/deployment_summary.md` (add below existing entries)
3. Create the detailed audit log in `docs/audits/`
4. Wait for user to review and request commit
5. Commit and push to feature branch (hook skips - file stays populated)
6. When PR is merged and `main` is pushed, the pre-push hook will:
   - Read the accumulated deployment_summary.md
   - Send all changes to API
   - Trigger email notification with full summary
   - Automatically reset the file to template

#### Reset Template (automatically applied after pushing to main):

```markdown
# Deployment Summary

## Latest deploy summary

-

## Notes for internal team

-

## Changed URLs

-
```

**IMPORTANT:**

- The deployment summary **accumulates until `main` is pushed** (true deployment)
- Feature branch pushes do NOT trigger the hook or reset the file
- The pre-push Git hook only fires on `main` branch
- All three sections (deploy summary, internal notes, changed URLs) are required
- Use markdown formatting for the summary and notes sections
- If summary or URLs are empty when pushing `main`, the hook will skip deployment tracking

#### Pre-Push Hook Setup:

Run this once after cloning the repository:

```bash
node scripts/install-hooks.js
```

This installs a Git hook that automatically tracks deployments on `git push` to `main`.

---

### Audit File Requirements

After completing any task, create an audit file:

#### File Naming Convention:

```
docs/audits/YYYY-MM-DD-HH-MM-SS-[brief-description].md
```

Example: `docs/audits/2025-01-15-14-30-45-location-pages.md`

#### Audit File Template:

```markdown
# Audit Log - [Feature/Task] - [Date Time]

## Prompt Summary

[Summarize what the user asked for]

## Actions Taken

1. [List each action performed]
2. [Include files created/modified]
3. [Note any decisions made]

## Files Changed

- `path/to/file1.tsx` - [Brief description of changes]
- `path/to/file2.ts` - [Brief description of changes]

## Components/Features Affected

- [Component/Feature name]
- [Related dependencies]

## Testing Considerations

- [What should be tested]
- [Potential edge cases]
- [Device/browser testing needs]

## Performance Impact

- [Bundle size changes]
- [Loading time considerations]
- [SEO implications]

## Next Steps

- [Suggested follow-up tasks]

## Notes

[Any additional context, warnings, or important information]

## Timestamp

Created: YYYY-MM-DD HH:MM:SS
Page Section: [section name]
```

---

## Linear Ticket Creation

When creating Linear tickets for this project:

| Field    | Value                    |
| -------- | ------------------------ |
| Team     | Jennifer Matone          |
| Assignee | `me`                     |
| Project  | Launching Iffers Pics    |
| Priority | Medium (3)               |

**Labels:** Apply relevant labels from these categories:

- **Environment:** `Front End`, `Fullstack`, `Server`
- **Scope:** `Ticket`, `Epic`
- **Task:** `Feature`, `Bug`, `Improvement`, `Refactor`, `Maintenance`, `Research`

**Description format:**

- `## Summary` - what and why
- `## Current State` / `## Target State` - when applicable
- `## Implementation` - files to modify, code snippets
- `## Acceptance Criteria` - checkbox list

---

## Core Principles

1. **Conversion First**: Every element should drive toward booking inquiries
2. **Local SEO Focus**: Every page optimized for "[service] photographer [location]" searches
3. **Social Proof**: Testimonials, portfolio samples throughout
4. **Speed Matters**: Sub-2 second load times, Core Web Vitals green
5. **Mobile Optimized**: 60%+ traffic is mobile
6. **Schema Markup**: LocalBusiness, Service, FAQ, Breadcrumb on all relevant pages
7. **Test Everything**: Data drives decisions
8. **Accessibility**: WCAG 2.1 AA compliance minimum
9. **Audit Everything**: Document all changes for history
10. **Documentation in /docs**: ALL documentation must be in the docs/ directory

**Content Rule:** Don't change any immediately provided context in work scope. You can add extra where you see fit, but any direct copy given to you needs to remain untouched.

---

## Hyper-Local SEO Strategy

**IMPORTANT: Reference `docs/references/implementation-plan.md` for the full implementation plan.**

### Strategy Overview

We are executing a **hyper-local, city-focused SEO strategy** to capture event photography searches. The goal is to dominate primary service areas first, then expand.

### Target Keywords Pattern

- "[service] photographer [town] NJ"
- "affordable [service] photography [town]"
- "best [service] photographer near [town]"
- "[service] photography packages [town] NJ"

### Services to Target

| Service              | Slug                        |
| -------------------- | --------------------------- |
| Engagement           | engagement-photography      |
| Baby Shower          | baby-shower-photography     |
| Bridal Shower        | bridal-shower-photography   |
| Party/Event          | party-photography           |

### Key Implementation Requirements

When working on SEO tasks:

1. **Focus resources on primary 6 towns first** - Do not spread effort across all 14 location pages
2. **Per-location LocalBusiness schema required** - Each priority town needs its own schema
3. **GBP is 32% of local ranking** - Always consider Google Business Profile optimization
4. **Content depth over breadth** - Location pages need 1,000+ words, local landmarks, venue mentions
5. **NAP consistency** - Name, Address, Phone must be identical across all pages and listings

### Technical SEO Status

**Implemented:**

- [x] LocalBusiness schema (site-wide)
- [x] Sitemap with location pages
- [x] robots.txt configuration
- [x] OpenGraph and Twitter cards
- [x] Metadata structure

**Pending:**

- [ ] Per-location LocalBusiness schema
- [ ] Service schema per service page
- [ ] BreadcrumbList schema on all pages
- [ ] FAQPage schema on service/location pages
- [ ] Location page content (14+ pages)
- [ ] Blog content strategy execution

### SEO Workflow

- Reference full strategy at `docs/references/implementation-plan.md`
- After each SEO task, log progress and create an audit entry in `docs/audits/`
- Every SEO change must include patch notes in `docs/audits/` (timestamped)

---

## Pre-Compact Session Recap

**BEFORE any auto-compact or context limit warning occurs**, proactively create/update a session recap file at `.claude/session-recap.md` when you notice the conversation is getting long (roughly 60-70% through available context).

### Recap File Format

```markdown
# Session Recap - [Date/Time]

## Current Objective

[What we're actively working on right now]

## Completed Work (Sequential)

1. [First thing done]
2. [Second thing done]
3. [Continue chronologically...]

## Current State

- **Last file touched:** [path]
- **Last action taken:** [what you just did]
- **Next immediate step:** [what was about to happen]

## Open Issues / Blockers

- [Any problems encountered that aren't resolved]

## Key Decisions Made

- [Important choices that affect future work]

## Files Modified This Session

- [list of files with brief note on what changed]
```

### Instructions

- Update this file incrementally as work progresses, don't wait until the last moment
- After a compact, **immediately read `.claude/session-recap.md`** to restore context
- Keep entries concise but specific enough to resume without confusion
- Delete or archive old recaps when starting genuinely new work

---

## Reference Documents

For specialized tasks, read the appropriate reference file:

- **Implementation Plan:** Read `docs/references/implementation-plan.md` for full site architecture, component structure, SEO strategy, and phased implementation approach
- **Blog Content:** Read `docs/references/blog-guidelines.md` for content writing standards
- **Location Pages:** Refer to implementation plan for location data structure and target towns
