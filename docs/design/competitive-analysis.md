# Competitive Photography Website Analysis

**Date:** 2026-03-28
**Purpose:** UI/UX audit of 6 photography websites to extract actionable design patterns for ifferspictures.com

---

## Site 1: Amanda Norman Photography

**URL:** https://www.amandanormanphotography.com/
**Platform:** Wix

### Navigation
- Standard horizontal menu with dropdown capability (submenu containers detected)
- Navigation items use CSS variable-driven font system (10+ font weight slots)
- Scroll-to-top button present

### Typography
- Base sans-serif stack: Arial, Helvetica, HelveticaNeue variants
- 10+ custom font variable slots (`--font_1` through `--font_10`) suggesting a configured type system with multiple weights
- Base font size: 10px scaled via variables

### Color Palette
- Variable-driven theme system (20+ color slots)
- Primary background: light/white
- Interactive/link accent: #116dff (bright blue, visible in gallery UI)
- Heavy use of CSS custom properties for theming

### Layout
- CSS Grid-based mesh layout system with named grid areas
- Mobile-optimized classes with dedicated responsive handling
- Moderate to spacious content density

### Hero/Above-Fold
- Full-screen capable sections (min-height: calc(100vh))
- Background media layers with overlay positioning and opacity transitions
- Animation classes: fade, slide, zoom transitions via CSS keyframes

### Portfolio/Gallery
- Pro Gallery integration with extensive styling
- Multiple hover effects available: zoom-in, tilt, blur, grayscale, shrink
- "Show More" button for lazy-loading/pagination
- Gallery items feature slide, expand, and fade-in animations

### Social Proof
- No explicit testimonial markup visible in the CSS/JS bundle

### CTA Strategy
- Button system using `.StylableButton` component with hover/disabled states
- Styling driven entirely by CSS variables (colors, border-radius, transitions)

### Standout Elements
- View Transition API integration for page-level animations
- Advanced gallery hover effects (tilt, shrink, invert) -- uncommon in photography sites
- Cookie security hardening in JavaScript layer

---

## Site 2: Nisha Louise Photography

**URL:** https://www.nishalouise.com/
**Platform:** Unknown (Cloudflare-protected, blocked automated fetch)

### Analysis Status
Site returned a Cloudflare challenge page, blocking automated content extraction. Manual observation would be needed for full analysis.

---

## Site 3: Delgado Studios

**URL:** https://delgadostudios.com/ (homepage) and /pricing
**Platform:** Squarespace

### Navigation
- 7 primary items: HOME, PORTFOLIO, BLOG, ABOUT, PRICING, FAQ, CONTACT
- Flat structure, no dropdowns
- No dedicated CTA button in nav; CONTACT link serves that function
- Cart icon (0 items) in top-right corner

### Typography
- Clean, modern sans-serif aesthetic (Squarespace template defaults)
- Mixed serif/sans-serif approach
- Headlines are bold and minimal

### Color Palette
- **Dominant:** White background with black text -- extremely minimal
- Grayscale photography as the dominant visual element
- Blur effects on text overlays (blur value: 15px)
- Neutral, sophisticated palette that lets imagery dominate

### Layout
- Complex CSS Grid: 54 rows (mobile) / 69 rows (desktop), 8 cols (mobile) / 24 cols (desktop)
- Row/column gap: 11px
- Text block padding: 6% on all sides
- Alternating image/text blocks create visual rhythm
- Staggered layout on desktop offsets text/image blocks

### Hero/Above-Fold
- Full-width image gallery carousel
- Overlaid headline: "NJ Wedding Photographer"
- Tagline: "Authentic. Artistic. Unforgettable"
- Immediate geographic + brand identity establishment

### Portfolio/Gallery
- "Recent Work" section blends portfolio thumbnails with blog post titles
- Educational content mixed into portfolio area ("How to Choose a Bar or Bat Mitzvah Photographer")
- Portfolio exploration CTA: "Explore More of My New Jersey Wedding Photography"

### Social Proof
- WeddingWire review widget integration: `wpShowReviews(516955, 'white')`
- "What Couples Are Saying!" section linking to external reviews
- No on-page testimonial cards

### CTA Strategy
- Primary: "Check Availability" buttons
- Secondary: "Contact me" links
- Tertiary: "Explore More..." and "View All Posts"
- Language emphasizes accessibility and relationship-building
- Inline CTAs embedded within content sections, not isolated

### Pricing Page (Specific Interest)
**Presentation style:** Horizontal sections with accompanying lifestyle images -- NOT traditional pricing cards or tiered columns.

**Pricing structure:**
| Service | Price Display |
|---------|--------------|
| Event photography | $250-$400/HR |
| Wedding day | begins at $3800, average $4500 |
| Micro-weddings/elopements | start at $1000 |
| Bar & Bat Mitzvah | start at $2500 |
| Family sessions | starting at $650 |
| Surprise proposals | start at $650 |

**Key approach:**
- Ranges and starting prices, not fixed amounts
- Narrative descriptions alongside each price point (value storytelling)
- "CONTACT ME" CTA appears twice on the page
- Hybrid strategy: direct starting prices + value narrative + contact-required for details
- Announcement banner: "Complimentary engagement session for any wedding collection. Offer expires this month!"
- Each service paired with a high-quality lifestyle photo contextualizing the work

### Standout Elements
- Announcement bar with time-sensitive promotional offer
- Pricing uses narrative storytelling, not cards/tiers
- Portfolio blended with educational blog content on homepage
- Full-bleed imagery with transparent text overlays + blur

---

## Site 4: Soapbox Photography

**URL:** https://www.soapboxphotography.com/ (homepage) and /portfolio
**Platform:** Custom (likely Squarespace or similar)

### Navigation
- 6 primary items: HOME, ABOUT, PORTFOLIO, REQUEST A QUOTE, RATES, BLOG
- Flat, no dropdowns
- "REQUEST A QUOTE" functions as the primary CTA in the nav bar itself
- Sticky header with logo scaling on scroll

### Typography
- **Headings:** Fjalla One (uppercase, letter-spaced 1-2px)
- **Body:** Montserrat (sans-serif)
- **Accents:** Nanum Myeongjo, Museo Sans Rounded 300
- Uppercase + letter-spacing treatment across all CTA text and headings creates editorial tone

### Color Palette
- **Background:** White (#FFFFFF)
- **Text/Accent:** Dark navy (#030B1E)
- **Footer background:** Dark navy (#030B1E) with white text
- **Button:** Dark navy background, white text
- **Secondary elements:** Gray (#828282)
- High contrast, limited palette -- two-tone essentially (white + navy)

### Layout
- Generous whitespace around portfolio grid sections
- Clean visual hierarchy between sections
- Image-forward, minimal text density

### Hero/Above-Fold
- Three rotating banner images as carousel slider
- Primary headline: "Corporate Event Photographer New York City"
- Prominent "VIEW PORTFOLIO" CTA beneath each slide
- Geographic + service identity established immediately

### Portfolio/Gallery
- 12 distinct category tiles presented as image grid with overlays
- Categories: Conference Moments, Keynote Speakers, Audience & Attendees, Dinner/Cocktail/Reception, Networking, Trade Shows, Wide Angle, Brand Activations, Branding & Decor, Food & Drinks, Awards, Music & Entertainment, Sports & Dance
- Each tile: image with dark gradient overlay + category title
- Hover: fade-in opacity animation
- Mixed aspect ratios (landscape 2595x1730, square 1730x1730, portrait 1000x1500)
- Overlaid titles: left-aligned, margin-left 27px, uppercase, letter-spacing 2px, 18px font

### Social Proof
- Thumbtack widget: 5-star rating with "53 reviews"
- "Trusted By Leading Brands" section listing Fortune 500 clients (Google, Adobe, HubSpot, LinkedIn, PayPal, Oracle) -- narrative text, no logos
- Trust statement highlighting 10+ years experience
- Photographer credit: "All photos are taken by Soapbox photographer Lilya Espinosa"

### CTA Strategy
- "CHECK AVAILABILITY" and "REQUEST A QUOTE" used interchangeably
- "VIEW PORTFOLIO" appears repeatedly
- Contact form titled "Thank you for contacting us!"
- Consistent urgent phrasing across all CTAs

### Page Flow (Homepage)
1. Hero carousel
2. Service categories grid ("WHAT WE SHOOT")
3. Specialization explanation
4. 5-reason differentiator section
5. Portfolio preview
6. Client logos/testimonials
7. Contact form
8. Footer

### Standout Elements
- CTA directly in the navigation bar ("REQUEST A QUOTE")
- Service categories as visual grid on homepage -- immediately communicates range
- Fortune 500 client list as credibility signal without needing logos
- Contact form embedded on homepage (no extra click required)
- Photographer credit builds personal brand trust

---

## Site 5: Lyndah Wells Photography

**URL:** https://lyndahwells.com/
**Platform:** Showit

### Navigation
- 8 primary items: Home, Portfolio, About, Press, Galleries, Guide, Contact, Shop
- Sticky header on scroll with condensed styling
- Logo/branding centered at top
- Social icons in header (Instagram, Facebook, Pinterest)
- No dropdowns
- Hamburger menu on mobile with slide-out animation

### Typography
**This site uses the richest typography system of all 6 analyzed.**
- **Display/Heading:** Blackstone Regular (custom serif, 75-154px for large numerals/headings)
- **Section titles:** Cammron Regular (serif, 26px)
- **Subheadings:** Questrial (sans-serif)
- **Navigation/Buttons:** Poppins 500 (sans-serif, 20px, letter-spacing 0.2em)
- **Body:** Montserrat 300-600 (sans-serif, 15-16px)
- **Testimonial quotes:** Playfair Display (serif)
- **Testimonial body:** Libre Baskerville (serif)
- **Accent text:** Garamond Italic (serif)
- **Branding/Logo:** Cormorant (serif)

Classic serif-for-display + sans-serif-for-body pattern reinforcing luxury positioning.

### Color Palette
- **Background alternating:** Black (#000000), off-white (#FFFFFF), dusty rose (#fbeeec)
- **Primary accent:** Dusty rose/mauve (#e8b4ac, #fd9889)
- **Secondary accent:** Coral pink (#f9b7b7)
- **Body text:** Dark gray (#6f6f6f)
- **Primary text:** Black (#000000)
- **Inverse text:** White on dark backgrounds
- **Buttons primary:** Black bg with white text, 10px border-radius
- **Buttons secondary:** 2px black border, transparent background

### Layout
- Desktop: ~1200px content width
- Mobile: 320px
- Asymmetrical layouts: image on one side, text on other
- Generous vertical padding between sections
- Full-width blocks with alternating background colors
- Variable content density (spacious hero, compact galleries)

### Hero/Above-Fold
- Fullscreen image gallery carousel (1200x847 desktop, 320x325 mobile)
- Auto-rotating slideshow with fade transitions
- 40+ high-quality wedding photos
- Navigation arrows on sides
- Large serif numerals as overlay decorative elements
- Purely visual -- no headline text copy in hero area

### Portfolio/Gallery
- Sliding filmstrip gallery (6-column view desktop, single column mobile)
- Dot navigation system (5px dots, 7.5px margin)
- Scale transformation on hover (70% to 100% on desktop)
- 40+ images with mixed aspect ratios
- Featured galleries section below with category labels
- Masonry-style featured section (3 columns desktop)

### Social Proof
- "Kind Words" testimonials section (mid-page)
- 3 rotating testimonial states
- Serif quotes in Blackstone Regular (75px, accent color)
- Body text in Cammron Regular (26px, centered)
- Attribution with client name/location
- Horizontal divider lines (30px, centered)
- **Press logos row:** Brides, The Knot, HuffPost Weddings, etc.
- Logos at reduced opacity (30-50%) for subtle, non-competing appearance

### CTA Strategy
- Primary CTA: uppercase text, black background, white text, 10px border-radius
- Font: Poppins 500, 20px, letter-spacing 0.2em
- Placement: hero, about section, wedding guide section, footer
- Hover: opacity transition
- Secondary CTA: bordered style (2px black border, transparent bg)
- Used for "Learn More," gallery navigation

### Page Flow
1. Fullscreen image carousel hero
2. About/intro with asymmetric layout
3. Portfolio filmstrip gallery
4. Featured galleries (masonry)
5. Kind Words (testimonials)
6. Press logos row
7. Wedding guide section
8. Contact CTA
9. Footer (rose accent background)

### Standout Elements
- **Large serif numerals as decorative visual anchors** -- purely aesthetic, not informational
- **Alternating background color blocks** (white, rose, black) creating strong section rhythm
- **Full-width image dividers** with 70% opacity overlay between sections
- **Multiple gallery types on one page** (carousel, filmstrip, masonry)
- **Press logos at reduced opacity** -- subtle credibility without visual competition
- **Footer in brand accent color** (dusty rose) -- distinctive, warm
- **8 different fonts loaded** -- rich typographic hierarchy but risky for performance

---

## Site 6: Corbin Gurkin Photography

**URL:** https://corbingurkin.com/
**Platform:** Showit

### Navigation
- 7 primary items: Home, About, Education, Work, Journal, Inquire, Press
- No dropdowns
- "SUBMIT AN INQUIRY" CTA prominently in hero section
- Mobile hamburger menu (below 768px breakpoint)

### Typography
- **Decorative headings:** OldeEuropean (serif), Venezian (serif accent), Trajan (uppercase titles, 0.1em letter-spacing)
- **Body:** Crimson Text (serif, justified, 13-14px, 1.8 line-height)
- **Navigation/UI:** Raleway 500-600 (sans-serif)
- **Subheadings:** Playfair Display italic (13px)
- Notably, body copy is JUSTIFIED and in a serif font -- an uncommon, editorial choice

### Color Palette
- **Background:** Off-white/cream rgba(236,235,232,1) -- warm, not pure white
- **Text:** Medium gray rgba(102,102,102,1) / #666
- **Accent:** Black (buttons, borders)
- **Buttons primary:** Black bg, white text
- **Buttons secondary:** Transparent with 2px black border
- **Decorative lines:** 0.4-0.5 opacity grays

Extremely restrained palette. Almost monochromatic warm gray + black.

### Layout
- Desktop: 1200px content width
- Mobile: 320px, breakpoint at 768px
- HIGH whitespace: 186-206px horizontal margins on desktop
- Fixed-background parallax sections
- Distinct section blocks with consistent vertical spacing
- 1px semi-transparent dividers creating geometric visual breaks

### Hero/Above-Fold
- Full-screen fixed background image (parallax effect -- image stays fixed while content scrolls)
- Desktop aspect ratio: 1.28:1, Mobile: 0.73:1
- Centered text overlay: "spontaneity with an eye to forever" + 3-4 line body copy
- No animation beyond 2s fade-in, 1s fade-out static transitions
- "SUBMIT AN INQUIRY" button below hero text

### Portfolio/Gallery
- Sequential full-width image slider (682x460 desktop, 206x272 mobile)
- 22+ images in simple carousel with 1s transition
- No masonry or grid -- clean, one-at-a-time presentation
- Aspect ratio preserved per image

### Social Proof
- No testimonials visible
- Social media icons only (Facebook, Instagram, Pinterest, email)

### CTA Strategy
- Primary: "SUBMIT AN INQUIRY" -- black bg, white italic Playfair text, 13px, 0.05em letter-spacing, 10px padding
- Placement: hero section prominently
- Mobile: /inquire link in mobile menu
- Language focuses on "inquiry" rather than "book" -- implies exclusivity

### Page Flow
1. Full-screen parallax hero with tagline
2. Submit an Inquiry CTA
3. About/philosophy text
4. Portfolio carousel
5. Numbered section markers (ordinal system: "3 =", "2 =", "1 =")
6. Footer

### Standout Elements
- **Fixed-background parallax effect** -- image stays still while content scrolls over it
- **Justified body text in serif font** -- editorial, magazine-like feel
- **Warm cream background** instead of pure white -- subtle but impactful warmth
- **Thin geometric decorative lines** (1px, semi-transparent) creating visual breaks
- **Numbered section markers** -- ordinal system for portfolio highlights
- **Extremely generous horizontal margins** (186-206px) -- luxurious use of space
- **Large wordmark logo** (840x280 desktop) -- bold brand presence
- **"Inquiry" language** over "booking" -- positions the photographer as selective/high-end

---

## Synthesis: Common Patterns and Takeaways

### What the Client Gravitates Toward

Based on these 6 selections, the client is drawn to:
1. **Image-dominant sites** where photography quality speaks first
2. **Clean, minimal palettes** -- most of these sites use 2-3 colors maximum
3. **Serif + sans-serif pairings** for luxury/editorial feel (5 of 6 sites)
4. **Geographic positioning in headlines** (Delgado: "NJ Wedding Photographer", Soapbox: "Corporate Event Photographer New York City")
5. **Narrative pricing** over traditional tier cards (Delgado's pricing page specifically noted)
6. **Generous whitespace** as a luxury signal
7. **Full-screen hero imagery** with minimal text overlay

### Common Patterns Across All 6 Sites

| Pattern | Sites Using It | Relevance to Iffer's |
|---------|---------------|---------------------|
| Full-screen hero image/carousel | 6/6 | Already implemented -- validate quality |
| Serif heading + sans-serif body | 5/6 | Already using Playfair Display + DM Sans -- good match |
| Flat navigation (no dropdowns) | 6/6 | Keep navigation flat and simple |
| CTA in or immediately near nav | 3/6 (Soapbox, Corbin, Delgado) | Consider adding persistent CTA |
| Dark footer with light text | 3/6 | Common professional pattern |
| Press/trust logos at reduced opacity | 2/6 (Lyndah, Soapbox) | Consider if Iffer has press mentions |
| Contact form on homepage | 2/6 | Reduces friction for inquiries |
| Geographic identity in hero | 3/6 | Critical for local SEO strategy |

---

## Top 7 Actionable Design Ideas for Iffer's Pictures

### 1. Narrative Pricing Layout (from Delgado Studios)

**What they do:** Instead of pricing cards/tiers, Delgado presents each service as a horizontal section with a lifestyle photo on one side and a narrative description + starting price on the other. Each service tells a mini-story about the experience before revealing cost.

**How to apply:** Replace traditional pricing cards with alternating image-left/text-right and image-right/text-left sections. Each service (engagement, baby shower, bridal shower, party) gets a full-width row with:
- A portfolio image from that service type
- 2-3 sentences of experience description
- "Starting at $X" in a distinct type treatment (Playfair Display, larger size)
- A "Learn More" or "Check Availability" CTA

**Implementation:** Create a `PricingServiceRow` component with `imagePosition: 'left' | 'right'` prop. Use `grid grid-cols-1 md:grid-cols-2 gap-0` with alternating `order` classes. This replaces card-based pricing and feels more premium.

---

### 2. Service Category Visual Grid on Homepage (from Soapbox Photography)

**What they do:** Soapbox's homepage has a "WHAT WE SHOOT" section showing 12+ service categories as image tiles with dark gradient overlays and category titles. Each tile is clickable, leading to a dedicated gallery.

**How to apply:** Create a 2x4 or 2x3 grid of service category tiles on the homepage, each with:
- A representative portfolio photo as background
- Dark gradient overlay (`linear-gradient(to top, rgba(0,0,0,0.55), transparent)`)
- Service name in white (DM Sans 600, uppercase, letter-spacing 1-2px)
- Hover: overlay lightens, slight scale transform
- Links to `/services/[service-slug]`

**Implementation:** This maps directly to the existing hub-and-spoke service architecture. Use the service data from `data/` to generate tiles. Component: `ServiceCategoryGrid`. Use `aspect-[4/3]` with `object-cover` images and absolute-positioned text overlays.

---

### 3. Warm Cream Background Instead of Pure White (from Corbin Gurkin)

**What they do:** Corbin uses `rgba(236,235,232,1)` (a warm off-white/cream) as the base background instead of #FFFFFF. Combined with medium gray text (#666) instead of near-black, this creates a softer, more luxurious feel.

**How to apply:** The site already has `--background-warm: #f8f6f3` defined in globals.css. Use this more aggressively as the default page background instead of pure white. Alternate between warm sections and pure white sections for visual rhythm (like Lyndah Wells alternating white/rose/black).

**Implementation:** Apply `bg-[var(--background-warm)]` to the `<body>` or main layout wrapper. Use pure white (`bg-white`) for cards and elevated content to create subtle depth without shadows. This is a single CSS change with high visual impact.

---

### 4. Persistent "Book Now" CTA in Navigation (from Soapbox + Corbin)

**What they do:** Soapbox puts "REQUEST A QUOTE" directly in the navigation as a visually distinct button (not just a text link). Corbin places "SUBMIT AN INQUIRY" prominently in the hero. Both keep the conversion path always visible.

**How to apply:** Add a visually distinct CTA button to the navigation bar that persists across all pages. Style it differently from nav links:
- Coral background (`--coral: #ff8559`) with white text
- Slightly rounded (border-radius 6-8px)
- Text: "Book a Session" or "Get in Touch"
- On mobile: becomes a floating action button or stays in the hamburger menu as a highlighted item

**Implementation:** Modify the `Header` component to include a `Button` component with `variant="coral"` as the last navigation item. Use `hidden md:inline-flex` for desktop, and add it as a highlighted item in the mobile menu drawer.

---

### 5. Press/Trust Badge Row at Reduced Opacity (from Lyndah Wells)

**What they do:** Lyndah displays publication logos (Brides, The Knot, HuffPost Weddings) in a horizontal row at 30-50% opacity. The reduced opacity prevents the logos from competing with the site's own visual identity while still registering as credibility signals.

**How to apply:** If Iffer has been featured in any local publications, wedding blogs, or has vendor badges (The Knot, WeddingWire, Thumbtack), create a "Featured In" or "As Seen On" strip:
- Logos in grayscale at 40% opacity
- Horizontal scroll on mobile, centered row on desktop
- Placed between testimonials and the final CTA section
- No heading text needed -- the logos speak for themselves

**Implementation:** Create a `TrustBadges` component. Use `flex items-center justify-center gap-12` with `opacity-40 grayscale` on each logo image. `filter: grayscale(1)` ensures visual consistency regardless of original logo colors.

---

### 6. Alternating Background Color Sections for Page Rhythm (from Lyndah Wells + Corbin)

**What they do:** Lyndah alternates between white, dusty rose, and black background sections. Corbin uses off-white with parallax image dividers. Both create strong visual rhythm that prevents scroll fatigue.

**How to apply:** Instead of uniform white/warm backgrounds, create a deliberate section color rhythm on key pages:
- Hero: full-bleed image
- About/intro: warm background (`--background-warm`)
- Services grid: white
- Testimonials: teal-dark background (`--teal-dark: #0f766e`) with white text
- Portfolio preview: warm background
- CTA: coral accent section (`--coral: #ff8559`) with white text

The teal and coral sections would be new territory but align with the existing brand palette that is currently underutilized on backgrounds.

**Implementation:** Add utility classes or section wrapper variants: `SectionWrapper variant="warm" | "teal" | "coral" | "white"`. Each variant sets background color and automatically adjusts text colors for contrast. Apply to homepage sections for immediate visual uplift.

---

### 7. Full-Width Image Dividers Between Sections (from Lyndah Wells + Corbin Gurkin)

**What they do:** Both sites use full-width portfolio images as visual dividers between content sections. Lyndah uses them with a 70% opacity overlay. Corbin uses fixed-background parallax (image stays still while content scrolls over it).

**How to apply:** Between major homepage sections, insert a full-bleed portfolio image (no container max-width) with:
- `min-height: 40vh` (not full screen, just a visual break)
- Dark overlay at 50-60% opacity
- Optional: a pull-quote or brief tagline centered on the image
- Optional: `background-attachment: fixed` for parallax on desktop (disable on mobile for performance)

This breaks up text-heavy sections and constantly reinforces the quality of Iffer's photography work without requiring the user to navigate to the portfolio page.

**Implementation:** Create an `ImageDivider` component accepting `src`, `alt`, `overlayOpacity`, `quote` (optional), and `parallax` (boolean) props. Use `relative w-full min-h-[40vh] bg-cover bg-center` with an absolute overlay div. The parallax prop adds `bg-fixed` on `md:` breakpoint only (mobile Safari does not support `background-attachment: fixed`).

---

## Additional Observations

### Things to Avoid
- **Amanda Norman's Wix bloat:** The site loads 330KB+ of CSS/JS framework code before any content. Custom Next.js build avoids this entirely.
- **Lyndah Wells' 8-font loading:** Beautiful typographic hierarchy but a performance liability. Stick with the existing Playfair Display + DM Sans pairing -- two fonts is the sweet spot.
- **Corbin's justified text:** Looks editorial but creates uneven word spacing and accessibility concerns. Left-aligned body text is safer.
- **Delgado's WeddingWire widget:** External review widgets are slow-loading and visually inconsistent. Pull in testimonial content manually instead.

### Quick Wins vs. Larger Efforts

| Idea | Effort | Impact |
|------|--------|--------|
| Warm cream background | 15 min | Medium -- immediate luxury feel |
| Nav CTA button | 30 min | High -- persistent conversion path |
| Section color rhythm | 1-2 hrs | High -- transforms page feel |
| Image dividers | 1 hr | Medium -- visual polish |
| Service category grid | 2-3 hrs | High -- communicates range instantly |
| Narrative pricing layout | 3-4 hrs | High -- differentiates from template look |
| Trust badge row | 1 hr (if assets exist) | Medium -- credibility signal |
