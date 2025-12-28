# Landing Page Variations - Implementation Plan

## Overview

Creating 3 distinct landing page variations for Iffer's Pictures with a component switcher to allow real-time comparison. Each variation blends **Warm & Approachable** with **Elegant & Editorial** aesthetics while optimizing for local SEO and lead conversion.

---

## Research Synthesis

### Key Design Patterns from Research

1. **Full-bleed hero images** outperform minimal designs for emotional impact (50% of top sites)
2. **Single clear CTA** can convert 13.5% better than multiple competing CTAs
3. **Event-type categorization** helps visitors self-identify needs quickly
4. **Masonry/grid layouts** work best for portfolio showcasing (40% of examples)
5. **Mobile-first** is non-negotiable (60%+ traffic is mobile)

### Local SEO Requirements (Above the Fold)

- Location mention in hero (Bergen County, NJ)
- Service keywords naturally integrated
- Trust signals (reviews, event count)
- Clear service area indication
- LocalBusiness schema (already implemented)

### Conversion Benchmarks

- Lead generation forms: aim for 8-15% conversion
- Well-optimized landing page can boost rates by 300%

---

## Three Variations

### Variation 1: "Emotional Storyteller"
**Theme:** Hero-centric with cinematic feel

**Hero Section:**
- Full-viewport gradient background with decorative photography frames
- Large emotional headline with animated accent underline
- Location badge prominently displayed
- Single primary CTA ("Book Your Session")
- Floating testimonial quote
- Soft, warm color palette with teal accents

**Key Sections:**
1. Hero with emotional headline
2. Services as elegant icon cards
3. Portfolio masonry grid preview
4. Testimonial carousel
5. Service areas map-style display
6. CTA section

**Design Notes:**
- Playfair Display for headlines (elegant serif)
- DM Sans for body (clean, readable)
- Generous whitespace
- Subtle fade-in animations
- Warm background (#f8f6f3) with teal accents

---

### Variation 2: "Portfolio Forward"
**Theme:** Let the work speak first

**Hero Section:**
- Split layout: large portfolio image left, copy right
- Compact, punchy headline
- Location integrated into subheadline
- Two CTAs: primary "View Portfolio" + secondary "Book Now"
- Trust indicators below CTAs

**Key Sections:**
1. Split hero (image + copy)
2. Full-width portfolio grid (larger images)
3. About teaser with photographer quote
4. Services as horizontal scroll cards
5. Locations as styled pill tags
6. Contact-focused CTA

**Design Notes:**
- More editorial feel
- Bolder typography hierarchy
- Portfolio images take 60% of visual space
- Clean grid system
- Black/white with teal accent pops

---

### Variation 3: "Scroll Journey"
**Theme:** Story-driven vertical experience

**Hero Section:**
- Minimal text, ambient gradient background
- Animated camera icon
- Single powerful statement
- Scroll indicator prominent
- Location fades in on scroll

**Key Sections:**
1. Minimal hero with scroll prompt
2. "The Moments We Capture" - staggered service reveals
3. Full-width portfolio showcase with parallax
4. "Meet Iffer" split section
5. Testimonials with large quotes
6. Interactive service area list
7. Booking CTA with form preview

**Design Notes:**
- Scroll-triggered animations (Framer Motion)
- Each section reveals on scroll
- More vertical rhythm
- Elegant transitions between sections
- Immersive, magazine-like feel

---

## Component Architecture

```
/src/app/
  page.tsx                    # Main page with variation switcher

/src/components/
  landing-variations/
    VariationSwitcher.tsx     # Floating UI to switch between variations

    variation-1/
      HeroEmotional.tsx       # Full emotional hero
      ServicesGrid.tsx        # Icon card services
      PortfolioPreview.tsx    # Masonry grid
      TestimonialCarousel.tsx # Rotating testimonials
      ServiceAreasDisplay.tsx # Map-style areas
      CTASection.tsx          # Final CTA
      index.tsx               # Exports Variation1

    variation-2/
      HeroSplit.tsx           # Split layout hero
      PortfolioGrid.tsx       # Large portfolio grid
      AboutTeaser.tsx         # Quote/bio section
      ServicesScroll.tsx      # Horizontal scroll cards
      LocationPills.tsx       # Tag-style locations
      ContactCTA.tsx          # Contact-focused
      index.tsx               # Exports Variation2

    variation-3/
      HeroMinimal.tsx         # Ambient minimal hero
      MomentsReveal.tsx       # Staggered services
      PortfolioParallax.tsx   # Parallax portfolio
      MeetIffer.tsx           # Split about section
      TestimonialsLarge.tsx   # Big quote testimonials
      ServiceAreasList.tsx    # Interactive list
      BookingCTA.tsx          # Form preview CTA
      index.tsx               # Exports Variation3

    shared/
      ImagePlaceholder.tsx    # Elegant gradient placeholders
      AnimatedCounter.tsx     # For stats
      TrustBadges.tsx         # 5-star, location, event count
```

---

## Shared Components

### ImagePlaceholder
Elegant gradient backgrounds with subtle pattern overlays that clearly indicate "photo goes here" while looking polished:
- Soft teal-to-coral gradient variants
- Optional camera icon
- Aspect ratio maintained
- Smooth transition when real image loads

### TrustBadges
Consistent display of:
- 5-star rating with gold stars
- Bergen County, NJ location pin
- "500+ Events Captured" camera icon

---

## Technical Implementation

### State Management
```tsx
// Simple useState for variation switching
const [activeVariation, setActiveVariation] = useState<1 | 2 | 3>(1);
```

### Animation Library
Use Framer Motion for:
- Fade-in-up entrance animations
- Scroll-triggered reveals (useInView)
- Carousel/slider transitions
- Parallax effects in Variation 3

### Responsive Strategy
- Mobile-first breakpoints
- Stack layouts on small screens
- Touch-friendly interactions
- Reduced motion for accessibility

### SEO Considerations
- All variations render same semantic HTML structure
- h1 always contains target keywords
- Location mentioned in first paragraph
- Service keywords naturally distributed
- Schema markup unchanged

---

## Implementation Order

### Phase 1: Foundation
1. Create `/components/landing-variations/` directory structure
2. Build `VariationSwitcher.tsx` component
3. Build shared components (`ImagePlaceholder`, `TrustBadges`)
4. Update `page.tsx` to import switcher

### Phase 2: Variation 1 (Emotional Storyteller)
1. HeroEmotional component
2. ServicesGrid component
3. PortfolioPreview component
4. Remaining sections
5. Assemble and test

### Phase 3: Variation 2 (Portfolio Forward)
1. HeroSplit component
2. PortfolioGrid component
3. Remaining sections
4. Assemble and test

### Phase 4: Variation 3 (Scroll Journey)
1. HeroMinimal component
2. Scroll animations setup
3. Parallax effects
4. Remaining sections
5. Assemble and test

### Phase 5: Polish
1. Cross-browser testing
2. Mobile optimization
3. Performance audit
4. Accessibility check

---

## Success Criteria

- [ ] All 3 variations render correctly
- [ ] Switcher allows seamless toggling
- [ ] Mobile-responsive on all breakpoints
- [ ] Page load time < 2 seconds
- [ ] Lighthouse score > 90
- [ ] All local SEO elements present in each variation
- [ ] Framer Motion animations smooth (60fps)
- [ ] Placeholder images ready for photo swap

---

## Files to Create

1. `src/components/landing-variations/VariationSwitcher.tsx`
2. `src/components/landing-variations/shared/ImagePlaceholder.tsx`
3. `src/components/landing-variations/shared/TrustBadges.tsx`
4. `src/components/landing-variations/shared/AnimatedCounter.tsx`
5. `src/components/landing-variations/variation-1/index.tsx` (+ sections)
6. `src/components/landing-variations/variation-2/index.tsx` (+ sections)
7. `src/components/landing-variations/variation-3/index.tsx` (+ sections)
8. Updated `src/app/page.tsx`

---

## Estimated Component Count

- Shared components: 4
- Variation 1 components: 7
- Variation 2 components: 7
- Variation 3 components: 8
- Total new components: ~26

---

## Design Tokens to Use

From existing `globals.css`:
```css
--teal: #1a9b8e;
--teal-light: #2dd4bf;
--teal-dark: #0f766e;
--coral: #ff8559;
--gold: #d4af37;
--background: #ffffff;
--background-warm: #f8f6f3;
--foreground: #1f2937;
--text-secondary: #64748b;
```

Typography:
- `font-heading` (Playfair Display)
- `font-body` (DM Sans)

---

## Notes

- Each variation should feel like a complete, polished landing page
- The switcher should be subtle but accessible (floating bottom-right)
- Variations should share the same footer from existing layout
- Focus on the blend of "warm & approachable" + "elegant & editorial"
- Placeholders should be obviously temporary but beautiful
