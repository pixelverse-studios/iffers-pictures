# DEV-1619: Bridal shower priority on the events page

## Approved scope and evidence

On October 20, 2026, Phil supplied Jen’s email choosing bridal showers and identifying DSC-6699 from Season’s Catering in Township of Washington. Her confirmed details were delicious food, attention to detail, and fun events throughout the shower. The public catalog identifies the published photograph as media ID 138. Visual inspection confirms the bride-to-be holding flowers at a flower stand.

Phil approved the proposed feature and metadata, with a bridal-shower-focused introduction, a separate sentence preserving the other event offerings, and the inclusive CTA “Tell Me About Your Event”. No client names, specific games, dates, or additional venue experience were inferred.

Baseline observed on October 20: `/services/events` used the title “Event Sessions | Iffer's Pictures | Bergen County NJ”; its intro led with baby showers and baptisms, and it had no venue-specific event feature. PR #157 is merged into main, and its absolute events title was visible in production. Search and conversion baselines were not collected in this implementation task.

Hypothesis: a clear bridal shower introduction and a verified real-event example will better serve visitors considering that service while retaining the broader events offering. This is a content/relevance hypothesis, not a claim of ranking or lead improvement.

## Implementation

- Only the events data enables the optional `FeaturedEvent` component. It renders before the general gallery, using the existing board palette and a stacked/mobile, two-column/desktop layout.
- Resolve media ID 138 from the public Events catalog. If absent, hide the feature rather than substituting an unrelated photo or bypassing CMS publication controls. The original portrait is shown without cropping. No CMS metadata was mutated.
- Preserve the existing H1, broader gallery, testimonial, pricing, FAQ, canonical, sitemap, robots, and inquiry workflow.
- Update title and description, which also feed the existing Open Graph, Twitter, and Service schema output.
- Feature and bottom CTAs use the broad approved wording and `/contact?session=events`. The feature uses the existing `TrackedLink` and `cta_click` path with location `service_featured_event`. Existing event identifiers, form behavior, and source handling are unchanged.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and prerendering with the public catalog.
- `npm run test:contact`: all eight tests passed; includes Event Sessions preselection and mocked form/API submissions. No real inquiry was sent.
- Local production HTTP/rendered HTML: events and inquiry pages returned successfully; verified approved copy, DSC-6699, descriptive alt, broad CTA/destination, title, canonical, absence of noindex, and matching Service description plus FAQ/Breadcrumb schemas. Family page does not render the feature.
- Mobile and desktop visual QA: pending. Browser discovery returned no available browsers; no screenshot-based layout or keyboard check was possible. The temporary preview server was stopped.
- Existing baseline-browser-mapping age and Next.js middleware deprecation warnings are unrelated to this change.

## Release and measurement handoff

Production deployment: **pending**. Record the actual deployment date when main is pushed; do not treat PR creation as a release. Validate the public page, image, inquiry link, and CTA analytics after deployment. Existing inquiry tracking was confirmed by Phil on October 18; this task does not claim a new end-to-end production analytics verification.

DEV-1620 remains dependent on release: schedule it 2–3 weeks after the latest relevant deployment, with at least 14 complete days of post-release data. Compare equal pre/post GSC windows for events-page/non-brand bridal-shower visibility and organic qualified inquiries where attribution is available. Low-volume data, reporting lag, and other recent changes limit causal conclusions. Keep if technically sound and useful; correct factual/conversion regressions immediately; defer outcome decisions if the observation window or sample is insufficient.

Rollback: revert the DEV-1619 commit, preserving later unrelated changes. No route, database, CMS, or tracking migration is involved.
