# SEO Changelog: Iffer's Pictures

> Track all SEO changes and their impact

## How to Use

Record every SEO change with: Date, Category, Change, Rationale, Impact. Update "Actual Impact" after 2-4 weeks using Search Console data.

---

## 2026 Changes

### 2026-03-14 — Full SEO Audit (First Audit)

**Type:** Full
**Overall Score:** 52/100 (Grade: F)

**Scores by Category:**

| Category | Score | Notes |
|----------|-------|-------|
| Technical SEO | 68/100 | Strong crawling/indexing; missing WebSite schema, canonicals, sitemap 404s |
| On-Page SEO | 48/100 | Title/description length issues on 8/11 pages; location keyword gaps |
| Content | 30/100 | No blog, no location pages; strong FAQ coverage (89 items) |
| Local SEO | 45/100 | Good NAP consistency; no location pages, no GBP, missing street address |

**Key Findings:**
- 7/11 meta descriptions exceed 160 chars (SERP truncation)
- 6 service page titles exceed 60 chars; FAQ (24 chars) and Contact (30 chars) too short
- WebSite schema missing entirely from global layout
- 14 location pages in sitemap but routes return 404
- No blog infrastructure
- 3 service pages have metadata/copy location disconnect (Headshots, Maternity, Milestones)
- Missing BreadcrumbSchema on /about, /portfolio, /contact
- Street address empty in LocalBusiness schema
- ServiceSchema areaServed only includes 6 towns vs 14 in LocalBusiness

**Checklist Progress:** 29% complete (18/62)

**Priority Actions:**
- [ ] Fix meta description lengths (trim to ≤155 chars)
- [ ] Fix title tag lengths (target 50-60 chars)
- [ ] Add WebSite schema to global layout
- [ ] Add street address to LocalBusiness schema
- [ ] Fix ServiceSchema areaServed to match LocalBusiness
- [ ] Add BreadcrumbSchema to /about, /portfolio, /contact
- [ ] Remove location pages from sitemap until routes exist
- [ ] Add location keywords to body copy on Headshots, Maternity, Milestones pages
- [ ] Build location pages for 6 primary towns
- [ ] Build blog infrastructure

---

### 2026-03-14
**Category:** Foundation
**Change:** SEO scope initialized — created /docs/seo/ documentation suite
**Rationale:** Establish baseline SEO strategy before launch. Identified key gaps: 14 location pages missing (404s from sitemap), no blog, schema inconsistencies, missing WebSite schema, metadata gaps.
**Files Affected:** docs/seo/SEO-SCOPE.md, SEO-KEYWORDS.md, SEO-COMPETITORS.md, SEO-CHECKLIST.md, SEO-CHANGELOG.md
**Expected Impact:** Provides strategic foundation for all SEO work. No direct ranking impact yet.
**Actual Impact:** —

### 2026-03-14
**Category:** Foundation
**Change:** Created Linear epic DEV-491 for SEO gap audit and remediation
**Rationale:** Track all SEO implementation work under a single epic in the Launch milestone
**Files Affected:** N/A (Linear ticket)
**Expected Impact:** Organized execution of SEO improvements
**Actual Impact:** —

---

## Pre-Launch SEO Baseline

| Metric | Value | Date |
|--------|-------|------|
| Overall SEO Score | 52/100 (F) | 2026-03-14 |
| Technical SEO Score | 68/100 | 2026-03-14 |
| On-Page SEO Score | 48/100 | 2026-03-14 |
| Content Score | 30/100 | 2026-03-14 |
| Local SEO Score | 45/100 | 2026-03-14 |
| Organic sessions/month | 0 (not launched) | 2026-03-14 |
| Keywords ranking top 10 | 0 | 2026-03-14 |
| Pages indexed | 0 | 2026-03-14 |
| Location pages live | 0/14 | 2026-03-14 |
| Blog posts published | 0 | 2026-03-14 |
| Schema types implemented | 6 (LocalBusiness, Person, Service, FAQ, Breadcrumb, ServicesHub) | 2026-03-14 |
| Checklist completion | 29% (18/62) | 2026-03-14 |
| Lighthouse SEO score | TBD | — |

## Milestones

| Date | Milestone | Metrics Before | Metrics After |
|------|-----------|----------------|---------------|
| 2026-03-14 | SEO Scope Initialized | N/A | Baseline |
| 2026-03-14 | First Full SEO Audit | N/A | 52/100 overall |
| | Location pages launched (6 primary) | | |
| | Blog infrastructure live | | |
| | Google Business Profile verified | | |
| | First page 1 ranking | | |
| | 50+ keywords ranking top 20 | | |
