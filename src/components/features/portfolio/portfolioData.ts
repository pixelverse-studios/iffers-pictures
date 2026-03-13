/**
 * Portfolio data backed by Cloudflare R2 images.
 * Bucket: iffers-pictures (public)
 * URL: https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev
 */

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export type PortfolioAspect = "portrait" | "landscape" | "square" | "video";

export type EventCategory = Exclude<EventType, "All">;

export interface PortfolioItem {
  id: number;
  src: string;
  alt: string;
  eventType: EventCategory;
  aspectRatio: PortfolioAspect;
}

export const EVENT_TYPES = [
  "All",
  "Engagement",
  "Gender Reveal",
  "Maternity",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ── Engagement (15 images) ──────────────────────────────────
  {
    id: 1,
    src: `${R2_BASE}/engagement/engagement-01.jpg`,
    alt: "Teddy bear balloon centerpiece with blue and beige balloons at celebration",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    src: `${R2_BASE}/engagement/engagement-02.jpg`,
    alt: "Decorated peacock chair with elegant balloon arch",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    src: `${R2_BASE}/engagement/engagement-03.jpg`,
    alt: "We Can Bearly Wait backdrop with peacock chair and balloon garland",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    src: `${R2_BASE}/engagement/engagement-04.jpg`,
    alt: "BABY block letters display with blue beige and gold balloons",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    src: `${R2_BASE}/engagement/engagement-05.jpg`,
    alt: "Memorial table with photo display and remembrance items",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    src: `${R2_BASE}/engagement/engagement-06.jpg`,
    alt: "Bride-to-be from behind wearing sash walking away",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    src: `${R2_BASE}/engagement/engagement-07.jpg`,
    alt: "Bride smiling wearing pearl-studded Mrs Foley denim jacket",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 8,
    src: `${R2_BASE}/engagement/engagement-08.jpg`,
    alt: "Couple kissing holding bouquet with pink and gold balloon backdrop",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 9,
    src: `${R2_BASE}/engagement/engagement-09.jpg`,
    alt: "Couple playing shoe game sitting back-to-back at bridal shower",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 10,
    src: `${R2_BASE}/engagement/engagement-10.jpg`,
    alt: "Groom laughing holding shoes up during shoe game",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    src: `${R2_BASE}/engagement/engagement-11.jpg`,
    alt: "Couple both raising shoes and laughing during shoe game",
    eventType: "Engagement",
    aspectRatio: "landscape",
  },
  {
    id: 12,
    src: `${R2_BASE}/engagement/engagement-12.jpg`,
    alt: "Bride posing by diamond ring Bride sign with pink and gold balloon arch",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 13,
    src: `${R2_BASE}/engagement/engagement-13.jpg`,
    alt: "Couple holding hands showing pearl-studded Mrs Foley jacket detail",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 14,
    src: `${R2_BASE}/engagement/engagement-14.jpg`,
    alt: "Couple portrait in front of pink and gold balloon arch with pearl denim jacket",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },
  {
    id: 15,
    src: `${R2_BASE}/engagement/engagement-15.jpg`,
    alt: "Couple gazing at each other in front of Bride diamond sign with balloon arch",
    eventType: "Engagement",
    aspectRatio: "portrait",
  },

  // ── Gender Reveal (12 images) ───────────────────────────────
  {
    id: 16,
    src: `${R2_BASE}/gender-reveal/gender-reveal-01.jpg`,
    alt: "Pink and blue cupcakes on gold tiered stand with Girl and Boy toppers",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 17,
    src: `${R2_BASE}/gender-reveal/gender-reveal-02.jpg`,
    alt: "Elegant table setting with gold accents hydrangea centerpiece and pink blue tulle",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 18,
    src: `${R2_BASE}/gender-reveal/gender-reveal-03.jpg`,
    alt: "Boy or Girl cake with pink drip and blue frosting on dessert table with balloon backdrop",
    eventType: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 19,
    src: `${R2_BASE}/gender-reveal/gender-reveal-04.jpg`,
    alt: "Full dessert spread with Boy or Girl cake cupcakes and treats by fireplace with balloon arch",
    eventType: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 20,
    src: `${R2_BASE}/gender-reveal/gender-reveal-05.jpg`,
    alt: "Expecting couple portrait with mom in white dress surrounded by pink and blue balloons",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 21,
    src: `${R2_BASE}/gender-reveal/gender-reveal-06.jpg`,
    alt: "Mom-to-be in white dress posing with Its A sign and pastel balloon arch",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 22,
    src: `${R2_BASE}/gender-reveal/gender-reveal-07.jpg`,
    alt: "Mom-to-be with friend wearing Keeper of the Gender shirt by balloon arch",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 23,
    src: `${R2_BASE}/gender-reveal/gender-reveal-08.jpg`,
    alt: "Mom-to-be sharing tender moment with her mother by pastel balloon display",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 24,
    src: `${R2_BASE}/gender-reveal/gender-reveal-09.jpg`,
    alt: "Couple reacting with joy as blue confetti explodes during gender reveal",
    eventType: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 25,
    src: `${R2_BASE}/gender-reveal/gender-reveal-10.jpg`,
    alt: "Couple kissing surrounded by blue confetti after gender reveal",
    eventType: "Gender Reveal",
    aspectRatio: "landscape",
  },
  {
    id: 26,
    src: `${R2_BASE}/gender-reveal/gender-reveal-11.jpg`,
    alt: "Couple celebrating excitedly in blue confetti shower at gender reveal party",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },
  {
    id: 27,
    src: `${R2_BASE}/gender-reveal/gender-reveal-12.jpg`,
    alt: "Couple laughing together as blue confetti falls around them",
    eventType: "Gender Reveal",
    aspectRatio: "portrait",
  },

  // ── Maternity (12 images) ───────────────────────────────────
  {
    id: 28,
    src: `${R2_BASE}/maternity/maternity-01.jpg`,
    alt: "Studio maternity portrait with white roses and baby breath against bare bump",
    eventType: "Maternity",
    aspectRatio: "square",
  },
  {
    id: 29,
    src: `${R2_BASE}/maternity/maternity-02.jpg`,
    alt: "Full-length studio maternity portrait with roses baby breath and ripped jeans",
    eventType: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 30,
    src: `${R2_BASE}/maternity/maternity-03.jpg`,
    alt: "Mom-to-be showing ultrasound photos to family dog on couch",
    eventType: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 31,
    src: `${R2_BASE}/maternity/maternity-04.jpg`,
    alt: "Expecting couple in garden at golden hour with pink lace dress and blue suit",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 32,
    src: `${R2_BASE}/maternity/maternity-05.jpg`,
    alt: "Black and white portrait of couple lying together looking at ultrasound photos",
    eventType: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 33,
    src: `${R2_BASE}/maternity/maternity-06.jpg`,
    alt: "Couple holding ultrasound polaroid together in matching black outfits",
    eventType: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 34,
    src: `${R2_BASE}/maternity/maternity-07.jpg`,
    alt: "Couple kissing from behind in tree-lined park at golden hour",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 35,
    src: `${R2_BASE}/maternity/maternity-08.jpg`,
    alt: "Mom-to-be standing in tree-lined avenue wearing pink flowing dress at golden hour",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 36,
    src: `${R2_BASE}/maternity/maternity-09.jpg`,
    alt: "Expecting couple on stone garden path surrounded by lush greenery",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 37,
    src: `${R2_BASE}/maternity/maternity-10.jpg`,
    alt: "Mom-to-be seated studio portrait with dog in black dress",
    eventType: "Maternity",
    aspectRatio: "portrait",
  },
  {
    id: 38,
    src: `${R2_BASE}/maternity/maternity-11.jpg`,
    alt: "Couple on tree-lined park path with autumn colors in casual style",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
  {
    id: 39,
    src: `${R2_BASE}/maternity/maternity-12.jpg`,
    alt: "Couple kissing in colorful autumn garden holding ultrasound photo strip",
    eventType: "Maternity",
    aspectRatio: "landscape",
  },
];
