# Variation 4: Hybrid (V1 + V3 Blend) - Implementation Plan

## Overview

Creating a new landing page variation that blends the best elements of Variation 1 (Emotional Storyteller) and Variation 3 (Scroll Journey) based on user preferences.

---

## User Preferences

| Section | Source | Modifications |
|---------|--------|---------------|
| Hero | V3 Minimal | Keep dramatic minimal style |
| Services | V3 Staggered | Make more compact, reduce vertical spacing |
| Portfolio | V1 Masonry | Keep as-is |
| Testimonials | Blend | V1 carousel with V3's larger quotes |
| Service Areas | V1 Display | Dark themed map-style |
| CTA | V3 Booking | Split layout with benefits |

---

## Section Breakdown

### 1. HeroMinimalEnhanced
**Source**: V3's HeroMinimal with enhancements

**Keep from V3:**
- Minimal aesthetic with ambient gradient background
- Single powerful statement headline
- Dramatic fade-in entrance animation
- Scroll indicator

**Add from V1:**
- Location badge (subtle)
- Trust badges (fade in after headline)
- Quick CTA button below location

**Design:**
```
[Ambient gradient background]

     [Camera icon with ping animation]

     Moments.
     Preserved.

     Event Photography in Cliffside Park, NJ

     [Book Your Session] CTA

     [Trust badges - fade in delay]

     [Scroll to Explore]
```

---

### 2. ServicesCompact
**Source**: V3's MomentsReveal, made more compact

**Changes:**
- Reduce `space-y-32` to `space-y-16` (halve vertical spacing)
- Reduce gap between image/content from `gap-20` to `gap-12`
- Keep staggered left/right pattern
- Keep floating accent images
- Use V1's SectionHeader pattern at top

**Design:**
```
[Section header centered]

[Service 1: Image LEFT | Content RIGHT]
       ↓ (16 spacing instead of 32)
[Service 2: Content LEFT | Image RIGHT]
       ↓
[Service 3: Image LEFT | Content RIGHT]
       ↓
[Service 4: Content LEFT | Image RIGHT]
```

---

### 3. PortfolioMasonry
**Source**: V1's PortfolioPreview (reuse as-is)

**Keep:**
- Masonry grid layout
- Hover overlays with category
- "View Full Portfolio" CTA
- Warm background

---

### 4. TestimonialsBlend
**Source**: Blend V1 carousel + V3 large quotes

**Approach:**
- V3's large quote typography and layout
- V1's carousel navigation with dots
- Centered single testimonial at a time
- Slightly larger quote text than V1
- Stars rating prominent

---

### 5. ServiceAreasMap
**Source**: V1's ServiceAreasDisplay (reuse as-is)

**Keep:**
- Dark themed section
- Primary/secondary area split
- Home base highlight
- Map-like dot pattern background

---

### 6. BookingCTAEnhanced
**Source**: V3's BookingCTA with V1 elements

**Keep from V3:**
- Split layout (content left, visual right)
- Benefits checklist
- "Now Booking 2025" badge

**Add from V1:**
- Gradient CTA section feel
- Phone number quick contact

---

## Component List

| Component | Source | Action |
|-----------|--------|--------|
| HeroMinimalEnhanced | New | Build enhanced minimal hero |
| ServicesCompact | New | Build compact staggered services |
| PortfolioMasonry | V1 | Import from V1 (PortfolioPreview) |
| TestimonialsBlend | New | Build blended testimonials |
| ServiceAreasMap | V1 | Import from V1 (ServiceAreasDisplay) |
| BookingCTAEnhanced | New | Build enhanced CTA |

**New components to build: 4**
**Reused components: 2**

---

## File Structure

```
/src/components/landing-variations/
  variation-4/
    HeroMinimalEnhanced.tsx
    ServicesCompact.tsx
    TestimonialsBlend.tsx
    BookingCTAEnhanced.tsx
    index.tsx
```

---

## Implementation Notes

### Spacing Changes for ServicesCompact
```tsx
// V3 original
<div className="space-y-32">

// V4 compact
<div className="space-y-16 md:space-y-20">

// V3 original gap
gap-12 md:gap-20

// V4 compact gap
gap-8 md:gap-12
```

### Hero CTA Addition
Add a subtle CTA button below the location text that matches the minimal aesthetic:
- Ghost/outline style initially
- Teal fill on hover
- Keeps the clean minimal feel but adds conversion opportunity

---

## Success Criteria

- [ ] Hero maintains minimal aesthetic but includes CTA
- [ ] Services section feels more compact, less scroll
- [ ] Portfolio uses V1's proven masonry pattern
- [ ] Testimonials feel impactful with large quotes
- [ ] Overall page feels cohesive (best of both worlds)
- [ ] Build passes without errors
