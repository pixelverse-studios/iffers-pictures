# Iffer's Pictures - 2025

## ⚠️ CRITICAL: Git Workflow Rules

**NEVER commit or push changes without explicit user approval.**

- Always ask before running `git commit`
- Always ask before running `git push`
- User must explicitly say "commit these changes" or "push to remote"
- After making code changes, STOP and wait for user review
- Only create commits when user explicitly requests it
- Do not batch commits - wait for approval after each set of changes

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
**IMMEDIATELY after completing ANY work, update `docs/deployment_summary.md` BEFORE doing anything else.**

This is not optional. This is not an afterthought. This is the FIRST action after finishing work.

### Why This Matters:
- A Git pre-push hook reads this file and sends email notifications to stakeholders
- If the summary is empty, the notification is skipped silently
- The user trusts this automation to keep stakeholders informed
- **Skipping this step breaks that trust and leaves clients uninformed**

### Required Actions After EVERY Task:
1. **STOP** - Do not proceed to audit files or wait for commit approval
2. **UPDATE** `docs/deployment_summary.md` with:
   - `## Latest deploy summary` - Plain-language bullet points (what changed, not how)
   - `## Notes for internal team` - Technical details (optional)
   - `## Changed URLs` - Full URLs affected (for Google re-indexing)
3. **THEN** create the audit file in `docs/audits/`
4. **THEN** wait for user commit approval

### Quick Reference:
```markdown
## Latest deploy summary
- Redesigned the pricing page layout for better clarity
- Fixed mobile navigation menu alignment

## Notes for internal team
- Updated PricingCard component props

## Changed URLs
- https://ifferspictures.com/pricing
```

**See "Documentation Requirements" section below for full formatting details.**

---

## Project Overview

Iffer's Pictures is a professional photography business based in Cliffside Park, NJ, specializing in event photography (engagements, baby showers, bridal showers, parties) with secondary nature/scenic photography services. This Next.js website is designed with a hyper-local SEO strategy to capture event photography searches across Bergen County and surrounding areas in Northern New Jersey.

**Primary Goal:** Generate leads through organic local search traffic by ranking for "[service] photographer [location]" queries across 14+ target towns.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Playfair Display (headings), DM Sans (body)
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Deployment:** TBD (Vercel recommended)

---

## Design System

**Goal:** Centralized visual language for all pages and components.

**Structure:**
```
/styles/globals.css    # Theme variables
/tailwind.config.ts    # Theme extensions + utility mapping
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
- `Button` (primary, secondary, ghost variants)
- `Card` (bordered, rounded, surface-aware)
- `SectionHeader`
- `Input`, `Select`, `Textarea`
- `Modal`, `ImageLightbox`

---

## Page Architecture

Each major page has its own component directory under `/components/` and a route under `/app/`.

### Pages:
1. **Homepage** - Hero, services overview, portfolio preview, testimonials, CTA
2. **About** - Photographer bio, story, approach
3. **Services** - Overview of all photography services
4. **Service Detail Pages** - Individual pages for engagement, baby shower, bridal shower, party, nature photography
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
/app/
  layout.tsx
  page.tsx
  about/
  services/[service]/
  portfolio/[category]/
  pricing/
  locations/[location]/
  blog/[slug]/
  contact/
  api/
/components/
  layout/
  ui/
  features/
  seo/
  forms/
/lib/
  constants.ts
  utils.ts
  seo.ts
  schema.ts
  validations.ts
/data/
  services.ts
  locations.ts
  testimonials.ts
  faq.ts
/types/
/hooks/
/styles/
/public/
  images/
    portfolio/
    logo/
```

---

## Team

- **Phil** - Developer (implementation, technical decisions)
- **Iffer** - Client/Photographer (content, photos, business details)

---

## Deployment Targets

- **Environment:** Production build optimized for speed
- **Platform:** TBD (Vercel recommended for Next.js)
- **Domain:** TBD (ifferspictures.com suggested)
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

> ⚠️ **SEE CRITICAL SECTION AT TOP OF FILE** - Updating the deployment summary is the FIRST action after completing any work. Do not skip this step.

This file is automatically processed by a Git pre-push hook that sends deployment data to the API and triggers an email notification. Keep summaries concise and non-technical.

#### Format:
The file has **three required sections**:

1. **Latest deploy summary** - Client-facing changes (sent in email)
   - Use markdown formatting (bullet points, **bold**, *italic*)
   - Write in plain language (non-technical summaries)
   - Focus on WHAT changed, not HOW it was implemented
   - Each bullet should be one clear, concise sentence

2. **Notes for internal team** - Technical details (NOT sent in email)
   - Use markdown formatting
   - Include environment variables, technical notes, internal tasks
   - This section is stored but NOT sent to clients

3. **Changed URLs** - List all affected page URLs
   - Use bullet points (- https://ifferspictures.com/page)
   - Include full URLs with protocol
   - **URLs must be plain and valid** - no extra text, parentheses, or comments after the URL
   - These URLs are tracked for Google Search Console re-indexing

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
2. **IMMEDIATELY** update `docs/deployment_summary.md` (see critical section at top)
3. Create the detailed audit log in `docs/audits/`
4. Wait for user to review and request commit
5. When user runs `git push`, the pre-push hook will:
   - Read deployment_summary.md
   - Send data to API
   - Trigger email notification
   - Automatically reset the file to template

#### Reset Template (automatically applied after git push):
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
- The deployment summary is a staging area for the CURRENT deployment only
- The pre-push Git hook automatically processes and resets this file
- All three sections (deploy summary, internal notes, changed URLs) are required
- Use markdown formatting for the summary and notes sections
- If summary or URLs are empty, the hook will skip deployment tracking

#### Pre-Push Hook Setup:
Run this once after cloning the repository:
```bash
node scripts/install-hooks.js
```

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
- **SEO Work:** Read `docs/references/seo-checklist.md` for comprehensive SEO standards (when created)
- **Blog Content:** Read `docs/references/blog-guidelines.md` for content writing standards
- **Location Pages:** Refer to implementation plan for location data structure and target towns
