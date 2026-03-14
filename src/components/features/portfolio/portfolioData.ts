/**
 * Portfolio data backed by Cloudflare R2 images.
 * Bucket: iffers-pictures (public)
 * URL: https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev
 *
 * Two-tier categorization: Service > Sub-category
 */

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export type PortfolioAspect = "portrait" | "landscape" | "square" | "video";

// ── Tier 1: Services ────────────────────────────────────────────
export const SERVICES = [
  "Milestone Celebrations",
  "Maternity",
] as const;

export type ServiceFilter = (typeof SERVICES)[number];

// ── Tier 2: Sub-categories per service ──────────────────────────
export const SUB_CATEGORIES: Record<ServiceFilter, readonly string[]> = {
  "Milestone Celebrations": ["Engagement", "Gender Reveal"],
  "Maternity": ["Maternity"],
};

export type SubCategory = "Engagement" | "Gender Reveal" | "Maternity";

// ── Portfolio item ──────────────────────────────────────────────
export interface PortfolioItem {
  id: number;
  src: string;
  alt: string;
  service: ServiceFilter;
  subCategory: SubCategory;
  aspectRatio: PortfolioAspect;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ── Milestone Celebrations > Engagement (15 images) ───────────
  {
    id: 1,
    src: `${R2_BASE}/engagement/engagement-01.jpg`,
    alt: "Teddy bear balloon centerpiece with blue and beige balloons at celebration",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: `${R2_BASE}/engagement/engagement-02.jpg`,
    alt: "Decorated peacock chair with elegant balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    src: `${R2_BASE}/engagement/engagement-03.jpg`,
    alt: "We Can Bearly Wait backdrop with peacock chair and balloon garland",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: `${R2_BASE}/engagement/engagement-04.jpg`,
    alt: "BABY block letters display with blue beige and gold balloons",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    src: `${R2_BASE}/engagement/engagement-05.jpg`,
    alt: "Memorial table with photo display and remembrance items",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    src: `${R2_BASE}/engagement/engagement-06.jpg`,
    alt: "Bride-to-be from behind wearing sash walking away",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    src: `${R2_BASE}/engagement/engagement-07.jpg`,
    alt: "Bride smiling wearing pearl-studded Mrs Foley denim jacket",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 8,
    src: `${R2_BASE}/engagement/engagement-08.jpg`,
    alt: "Couple kissing holding bouquet with pink and gold balloon backdrop",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 9,
    src: `${R2_BASE}/engagement/engagement-09.jpg`,
    alt: "Couple playing shoe game sitting back-to-back at bridal shower",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: `${R2_BASE}/engagement/engagement-10.jpg`,
    alt: "Groom laughing holding shoes up during shoe game",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    src: `${R2_BASE}/engagement/engagement-11.jpg`,
    alt: "Couple both raising shoes and laughing during shoe game",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 12,
    src: `${R2_BASE}/engagement/engagement-12.jpg`,
    alt: "Bride posing by diamond ring Bride sign with pink and gold balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 13,
    src: `${R2_BASE}/engagement/engagement-13.jpg`,
    alt: "Couple holding hands showing pearl-studded Mrs Foley jacket detail",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 14,
    src: `${R2_BASE}/engagement/engagement-14.jpg`,
    alt: "Couple portrait in front of pink and gold balloon arch with pearl denim jacket",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 15,
    src: `${R2_BASE}/engagement/engagement-15.jpg`,
    alt: "Couple gazing at each other in front of Bride diamond sign with balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Engagement",
    aspectRatio: "portrait",
  },

  // ── Milestone Celebrations > Gender Reveal (12 images) ────────
  {
    id: 16,
    src: `${R2_BASE}/gender-reveal/gender-reveal-01.jpg`,
    alt: "Pink and blue cupcakes on gold tiered stand with Girl and Boy toppers",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 17,
    src: `${R2_BASE}/gender-reveal/gender-reveal-02.jpg`,
    alt: "Elegant table setting with gold accents hydrangea centerpiece and pink blue tulle",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 18,
    src: `${R2_BASE}/gender-reveal/gender-reveal-03.jpg`,
    alt: "Boy or Girl cake with pink drip and blue frosting on dessert table with balloon backdrop",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 19,
    src: `${R2_BASE}/gender-reveal/gender-reveal-04.jpg`,
    alt: "Full dessert spread with Boy or Girl cake cupcakes and treats by fireplace with balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 20,
    src: `${R2_BASE}/gender-reveal/gender-reveal-05.jpg`,
    alt: "Expecting couple portrait with mom in white dress surrounded by pink and blue balloons",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 21,
    src: `${R2_BASE}/gender-reveal/gender-reveal-06.jpg`,
    alt: "Mom-to-be in white dress posing with Its A sign and pastel balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 22,
    src: `${R2_BASE}/gender-reveal/gender-reveal-07.jpg`,
    alt: "Mom-to-be with friend wearing Keeper of the Gender shirt by balloon arch",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 23,
    src: `${R2_BASE}/gender-reveal/gender-reveal-08.jpg`,
    alt: "Mom-to-be sharing tender moment with her mother by pastel balloon display",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 24,
    src: `${R2_BASE}/gender-reveal/gender-reveal-09.jpg`,
    alt: "Couple reacting with joy as blue confetti explodes during gender reveal",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 25,
    src: `${R2_BASE}/gender-reveal/gender-reveal-10.jpg`,
    alt: "Couple kissing surrounded by blue confetti after gender reveal",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 26,
    src: `${R2_BASE}/gender-reveal/gender-reveal-11.jpg`,
    alt: "Couple celebrating excitedly in blue confetti shower at gender reveal party",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 27,
    src: `${R2_BASE}/gender-reveal/gender-reveal-12.jpg`,
    alt: "Couple laughing together as blue confetti falls around them",
    service: "Milestone Celebrations",
    subCategory: "Gender Reveal",
    aspectRatio: "portrait",
  },

  // ── Maternity > Maternity (12 images) ─────────────────────────
  {
    id: 28,
    src: `${R2_BASE}/maternity/maternity-01.jpg`,
    alt: "Studio maternity portrait with white roses and baby breath against bare bump",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "square",
  },
  {
    id: 29,
    src: `${R2_BASE}/maternity/maternity-02.jpg`,
    alt: "Full-length studio maternity portrait with roses baby breath and ripped jeans",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 30,
    src: `${R2_BASE}/maternity/maternity-03.jpg`,
    alt: "Mom-to-be showing ultrasound photos to family dog on couch",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 31,
    src: `${R2_BASE}/maternity/maternity-04.jpg`,
    alt: "Expecting couple in garden at golden hour with pink lace dress and blue suit",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 32,
    src: `${R2_BASE}/maternity/maternity-05.jpg`,
    alt: "Black and white portrait of couple lying together looking at ultrasound photos",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 33,
    src: `${R2_BASE}/maternity/maternity-06.jpg`,
    alt: "Couple holding ultrasound polaroid together in matching black outfits",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 34,
    src: `${R2_BASE}/maternity/maternity-07.jpg`,
    alt: "Couple kissing from behind in tree-lined park at golden hour",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 35,
    src: `${R2_BASE}/maternity/maternity-08.jpg`,
    alt: "Mom-to-be standing in tree-lined avenue wearing pink flowing dress at golden hour",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 36,
    src: `${R2_BASE}/maternity/maternity-09.jpg`,
    alt: "Expecting couple on stone garden path surrounded by lush greenery",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 37,
    src: `${R2_BASE}/maternity/maternity-10.jpg`,
    alt: "Mom-to-be seated studio portrait with dog in black dress",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 38,
    src: `${R2_BASE}/maternity/maternity-11.jpg`,
    alt: "Couple on tree-lined park path with autumn colors in casual style",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 39,
    src: `${R2_BASE}/maternity/maternity-12.jpg`,
    alt: "Couple kissing in colorful autumn garden holding ultrasound photo strip",
    service: "Maternity",
    subCategory: "Maternity",
    aspectRatio: "landscape",
  },
];

// ── Helpers ─────────────────────────────────────────────────────

/**
 * Maps service page slugs to portfolio service + sub-category.
 * Used to pull real portfolio images onto service cards and detail pages.
 */
const SERVICE_SLUG_MAP: Record<string, { service: ServiceFilter; subCategory?: SubCategory }> = {
  // Milestone Celebrations service — all sub-categories
  events: { service: "Milestone Celebrations" },
  milestones: { service: "Milestone Celebrations" },
  "engagement-photography": { service: "Milestone Celebrations", subCategory: "Engagement" },
  // Maternity service
  maternity: { service: "Maternity" },
};

/** Thumbnail overrides — when a service card needs a specific sub-category image. */
const THUMBNAIL_SLUG_MAP: Record<string, { service: ServiceFilter; subCategory: SubCategory }> = {
  events: { service: "Milestone Celebrations", subCategory: "Gender Reveal" },
  milestones: { service: "Milestone Celebrations", subCategory: "Engagement" },
};

/** Get all portfolio items for a given service slug. */
export function getPortfolioForService(serviceSlug: string): PortfolioItem[] {
  const mapping = SERVICE_SLUG_MAP[serviceSlug];
  if (!mapping) return [];
  return PORTFOLIO_ITEMS.filter(
    (i) =>
      i.service === mapping.service &&
      (!mapping.subCategory || i.subCategory === mapping.subCategory)
  );
}

/** Get the first portfolio image for a service slug (for card thumbnails). */
export function getServiceThumbnail(
  serviceSlug: string
): { src: string; alt: string } | undefined {
  // Use thumbnail-specific mapping first (for distinct card images)
  const thumbMapping = THUMBNAIL_SLUG_MAP[serviceSlug];
  if (thumbMapping) {
    const item = PORTFOLIO_ITEMS.find(
      (i) => i.service === thumbMapping.service && i.subCategory === thumbMapping.subCategory
    );
    if (item) return { src: item.src, alt: item.alt };
  }
  // Fall back to general mapping
  const items = getPortfolioForService(serviceSlug);
  if (items.length === 0) return undefined;
  return { src: items[0].src, alt: items[0].alt };
}
