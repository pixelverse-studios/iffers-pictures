/**
 * Portfolio data backed by Cloudflare R2 images.
 * Bucket: iffers-pictures (public)
 * URL: https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev
 *
 * Two-tier categorization: Service > Sub-category
 * R2 folder structure mirrors the service architecture.
 */

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export type PortfolioAspect = "portrait" | "landscape" | "square" | "video";

// ── Tier 1: Services ────────────────────────────────────────────
export const SERVICES = [
  "Events",
  "Family",
  "Maternity",
] as const;

export type ServiceFilter = (typeof SERVICES)[number];

// ── Tier 2: Sub-categories per service ──────────────────────────
export const SUB_CATEGORIES = {
  "Events": ["Baby Shower", "Bridal Shower", "Engagement", "Gender Reveal", "Birthday", "Proposal", "Baptism"] as const,
  "Family": ["Family"] as const,
  "Maternity": ["Maternity"] as const,
} satisfies Record<ServiceFilter, readonly string[]>;

export type SubCategory = (typeof SUB_CATEGORIES)[ServiceFilter][number];

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
  // ── Events > Baby Shower (5) ──────────────────────────────────
  { id: 1, src: `${R2_BASE}/events/baby-shower/baby-shower-01.jpg`, alt: "Teddy bear balloon centerpiece with blue and beige balloons at baby shower", service: "Events", subCategory: "Baby Shower", aspectRatio: "portrait" },
  { id: 2, src: `${R2_BASE}/events/baby-shower/baby-shower-02.jpg`, alt: "Mommy to be chair sign with tulle bow and blue balloon garland at venue", service: "Events", subCategory: "Baby Shower", aspectRatio: "portrait" },
  { id: 3, src: `${R2_BASE}/events/baby-shower/baby-shower-03.jpg`, alt: "We Can Bearly Wait backdrop with peacock chair teddy bears and balloon arch", service: "Events", subCategory: "Baby Shower", aspectRatio: "landscape" },
  { id: 4, src: `${R2_BASE}/events/baby-shower/baby-shower-04.jpg`, alt: "BABY block letters display with gift table and blue accents at venue", service: "Events", subCategory: "Baby Shower", aspectRatio: "landscape" },
  { id: 5, src: `${R2_BASE}/events/baby-shower/baby-shower-05.jpg`, alt: "Memorial table with remembrance items and baby onesie at baby shower", service: "Events", subCategory: "Baby Shower", aspectRatio: "portrait" },

  // ── Events > Bridal Shower (22) ───────────────────────────────
  { id: 6, src: `${R2_BASE}/events/bridal-shower/bridal-shower-01.jpg`, alt: "Couple entering bridal shower with flowers and smiles", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 7, src: `${R2_BASE}/events/bridal-shower/bridal-shower-02.jpg`, alt: "Black and white portrait of couple by navy and silver balloon garland", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 8, src: `${R2_BASE}/events/bridal-shower/bridal-shower-03.jpg`, alt: "Bride-to-be posing with mom by nautical bridal shower sign", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 9, src: `${R2_BASE}/events/bridal-shower/bridal-shower-04.jpg`, alt: "Bride-to-be in blue floral dress by nautical bridal shower sign and balloon arch", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 10, src: `${R2_BASE}/events/bridal-shower/bridal-shower-05.jpg`, alt: "Couple holding hands and smiling by navy and silver balloon backdrop", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 11, src: `${R2_BASE}/events/bridal-shower/bridal-shower-06.jpg`, alt: "Couple gazing at each other with navy and white balloons behind", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 12, src: `${R2_BASE}/events/bridal-shower/bridal-shower-07.jpg`, alt: "Bride-to-be seated with pearl Bride sign on gold chiavari chair", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 13, src: `${R2_BASE}/events/bridal-shower/bridal-shower-08.jpg`, alt: "Bride laughing in front of Let's Par-Tea sign with pastel balloon arch and flowers", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 14, src: `${R2_BASE}/events/bridal-shower/bridal-shower-09.jpg`, alt: "Couple showing engagement ring with pastel balloon backdrop soft focus", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 15, src: `${R2_BASE}/events/bridal-shower/bridal-shower-10.jpg`, alt: "Couple kissing in front of tea party bridal shower backdrop with flowers", service: "Events", subCategory: "Bridal Shower", aspectRatio: "square" },
  { id: 16, src: `${R2_BASE}/events/bridal-shower/bridal-shower-11.jpg`, alt: "Couple portrait at tea party bridal shower with pastel balloons and floral arrangements", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 17, src: `${R2_BASE}/events/bridal-shower/bridal-shower-12.jpg`, alt: "Couple seated back-to-back holding hands at bridal shower venue", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 18, src: `${R2_BASE}/events/bridal-shower/bridal-shower-13.jpg`, alt: "Bride-to-be from behind wearing sash walking away", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 19, src: `${R2_BASE}/events/bridal-shower/bridal-shower-14.jpg`, alt: "Bride smiling wearing pearl-studded Mrs Foley denim jacket", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 20, src: `${R2_BASE}/events/bridal-shower/bridal-shower-15.jpg`, alt: "Couple kissing holding bouquet with pink and gold balloon backdrop", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 21, src: `${R2_BASE}/events/bridal-shower/bridal-shower-16.jpg`, alt: "Couple playing shoe game sitting back-to-back at bridal shower", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 22, src: `${R2_BASE}/events/bridal-shower/bridal-shower-17.jpg`, alt: "Groom laughing holding shoes up during shoe game", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 23, src: `${R2_BASE}/events/bridal-shower/bridal-shower-18.jpg`, alt: "Couple both raising shoes and laughing during shoe game", service: "Events", subCategory: "Bridal Shower", aspectRatio: "landscape" },
  { id: 24, src: `${R2_BASE}/events/bridal-shower/bridal-shower-19.jpg`, alt: "Bride posing by diamond ring Bride sign with pink and gold balloon arch", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 25, src: `${R2_BASE}/events/bridal-shower/bridal-shower-20.jpg`, alt: "Couple holding hands showing pearl-studded Mrs Foley jacket detail", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 26, src: `${R2_BASE}/events/bridal-shower/bridal-shower-21.jpg`, alt: "Couple portrait in front of pink and gold balloon arch", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },
  { id: 27, src: `${R2_BASE}/events/bridal-shower/bridal-shower-22.jpg`, alt: "Couple gazing at each other in front of Bride diamond sign with balloon arch", service: "Events", subCategory: "Bridal Shower", aspectRatio: "portrait" },

  // ── Events > Engagement (15) ──────────────────────────────────
  { id: 28, src: `${R2_BASE}/events/engagement/engagement-01.jpg`, alt: "Three-tier white wedding cake with pink roses and custom name topper in glass conservatory", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 29, src: `${R2_BASE}/events/engagement/engagement-02.jpg`, alt: "Custom gold dog illustration napkin with roses and gold frame detail", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 30, src: `${R2_BASE}/events/engagement/engagement-03.jpg`, alt: "Save the Date newspaper-style announcement on Christmas tree with ornaments", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 31, src: `${R2_BASE}/events/engagement/engagement-04.jpg`, alt: "Tall floral centerpiece with pink roses and candles by holiday-decorated conservatory", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 32, src: `${R2_BASE}/events/engagement/engagement-05.jpg`, alt: "Custom dog napkin on ornate gold charger plate with pink place setting", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 33, src: `${R2_BASE}/events/engagement/engagement-06.jpg`, alt: "Custom latte art with dog portraits on engagement party cup", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 34, src: `${R2_BASE}/events/engagement/engagement-07.jpg`, alt: "Couple dancing by fireplace with holiday greenery garland", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 35, src: `${R2_BASE}/events/engagement/engagement-08.jpg`, alt: "Wedding cake with name topper and couple seated at sweetheart table with floral arch", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 36, src: `${R2_BASE}/events/engagement/engagement-09.jpg`, alt: "Couple posing together behind wedding cake with pink roses in sunlit conservatory", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 37, src: `${R2_BASE}/events/engagement/engagement-10.jpg`, alt: "Couple gazing at each other behind cake with floral arch and golden light", service: "Events", subCategory: "Engagement", aspectRatio: "portrait" },
  { id: 38, src: `${R2_BASE}/events/engagement/engagement-11.jpg`, alt: "Couple cutting three-tier cake together in glass conservatory", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 39, src: `${R2_BASE}/events/engagement/engagement-12.jpg`, alt: "Couple toasting champagne by cake with rose petals in golden hour light", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 40, src: `${R2_BASE}/events/engagement/engagement-13.jpg`, alt: "Bride-to-be with friend posing at sweetheart table with floral arrangements", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 41, src: `${R2_BASE}/events/engagement/engagement-14.jpg`, alt: "Close-up of engagement ring held in hand with Christmas tree bokeh lights", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },
  { id: 42, src: `${R2_BASE}/events/engagement/engagement-15.jpg`, alt: "Couple reaching for each other by Christmas tree with warm vintage tone", service: "Events", subCategory: "Engagement", aspectRatio: "landscape" },

  // ── Events > Gender Reveal (12) ───────────────────────────────
  { id: 43, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-01.jpg`, alt: "Pink and blue cupcakes on gold tiered stand with Girl and Boy toppers", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 44, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-02.jpg`, alt: "Elegant table setting with gold accents hydrangea centerpiece and pink blue tulle", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 45, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-03.jpg`, alt: "Boy or Girl cake with pink drip and blue frosting on dessert table", service: "Events", subCategory: "Gender Reveal", aspectRatio: "landscape" },
  { id: 46, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-04.jpg`, alt: "Full dessert spread with Boy or Girl cake and treats by fireplace with balloon arch", service: "Events", subCategory: "Gender Reveal", aspectRatio: "landscape" },
  { id: 47, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-05.jpg`, alt: "Expecting couple portrait with mom in white dress surrounded by pink and blue balloons", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 48, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-06.jpg`, alt: "Mom-to-be in white dress posing with Its A sign and pastel balloon arch", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 49, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-07.jpg`, alt: "Mom-to-be with friend wearing Keeper of the Gender shirt by balloon arch", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 50, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-08.jpg`, alt: "Mom-to-be sharing tender moment with her mother by pastel balloon display", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 51, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-09.jpg`, alt: "Couple reacting with joy as blue confetti explodes during gender reveal", service: "Events", subCategory: "Gender Reveal", aspectRatio: "landscape" },
  { id: 52, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-10.jpg`, alt: "Couple kissing surrounded by blue confetti after gender reveal", service: "Events", subCategory: "Gender Reveal", aspectRatio: "landscape" },
  { id: 53, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-11.jpg`, alt: "Couple celebrating excitedly in blue confetti shower at gender reveal party", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },
  { id: 54, src: `${R2_BASE}/events/milestones/gender-reveal/gender-reveal-12.jpg`, alt: "Couple laughing together as blue confetti falls around them", service: "Events", subCategory: "Gender Reveal", aspectRatio: "portrait" },

  // ── Events > Birthday (6) ─────────────────────────────────────
  { id: 55, src: `${R2_BASE}/events/parties/birthdays/birthday-01.jpg`, alt: "Toddler in brown dress standing on green lawn with autumn foliage backdrop", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },
  { id: 56, src: `${R2_BASE}/events/parties/birthdays/birthday-02.jpg`, alt: "Baby girl in party hat sitting on blanket with pumpkins for first birthday", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },
  { id: 57, src: `${R2_BASE}/events/parties/birthdays/birthday-03.jpg`, alt: "Toddler clapping in party hat standing on blanket with pumpkins and purple flowers", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },
  { id: 58, src: `${R2_BASE}/events/parties/birthdays/birthday-04.jpg`, alt: "Birthday girl in party hat clapping on blanket with pumpkins and autumn garden", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },
  { id: 59, src: `${R2_BASE}/events/parties/birthdays/birthday-05.jpg`, alt: "First birthday smash cake with sprinkles and pumpkins on white blanket", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },
  { id: 60, src: `${R2_BASE}/events/parties/birthdays/birthday-06.jpg`, alt: "Toddler sitting with smashed birthday cake and pumpkins in autumn garden", service: "Events", subCategory: "Birthday", aspectRatio: "landscape" },

  // ── Events > Proposal (6) ─────────────────────────────────────
  { id: 61, src: `${R2_BASE}/events/proposal/proposal-01.jpg`, alt: "Man down on one knee proposing at tiki-themed restaurant with string lights", service: "Events", subCategory: "Proposal", aspectRatio: "landscape" },
  { id: 62, src: `${R2_BASE}/events/proposal/proposal-02.jpg`, alt: "Black and white photo of couple kissing after proposal at restaurant with string lights", service: "Events", subCategory: "Proposal", aspectRatio: "landscape" },
  { id: 63, src: `${R2_BASE}/events/proposal/proposal-03.jpg`, alt: "Black and white portrait of newly engaged couple laughing against stone wall", service: "Events", subCategory: "Proposal", aspectRatio: "landscape" },
  { id: 64, src: `${R2_BASE}/events/proposal/proposal-04.jpg`, alt: "Engagement ring detail shot with hands clasped behind neck against green-lit stone wall", service: "Events", subCategory: "Proposal", aspectRatio: "landscape" },
  { id: 65, src: `${R2_BASE}/events/proposal/proposal-05.jpg`, alt: "Newly engaged couple embracing full-length by dramatic green-lit stone wall", service: "Events", subCategory: "Proposal", aspectRatio: "portrait" },
  { id: 66, src: `${R2_BASE}/events/proposal/proposal-06.jpg`, alt: "Engaged couple smiling at each other in close portrait by stone wall", service: "Events", subCategory: "Proposal", aspectRatio: "landscape" },

  // ── Events > Baptism (6) ──────────────────────────────────────
  { id: 67, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-01.jpg`, alt: "Baby girl in white christening gown sitting by church altar with red flowers", service: "Events", subCategory: "Baptism", aspectRatio: "landscape" },
  { id: 68, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-02.jpg`, alt: "Black and white portrait of baby in christening gown by altar with crucifix", service: "Events", subCategory: "Baptism", aspectRatio: "portrait" },
  { id: 69, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-03.jpg`, alt: "Parents holding baby in christening gown inside church with stained glass windows", service: "Events", subCategory: "Baptism", aspectRatio: "portrait" },
  { id: 70, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-04.jpg`, alt: "Family and godparents gathered around baptismal font during ceremony", service: "Events", subCategory: "Baptism", aspectRatio: "landscape" },
  { id: 71, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-05.jpg`, alt: "Baby in white lace christening bonnet and gown with cross necklace close-up", service: "Events", subCategory: "Baptism", aspectRatio: "portrait" },
  { id: 72, src: `${R2_BASE}/events/religious-ceremonies/baptism/baptism-06.jpg`, alt: "Baby in christening bonnet with gold cross necklace sweet close-up", service: "Events", subCategory: "Baptism", aspectRatio: "portrait" },

  // ── Family (27) ───────────────────────────────────────────────
  { id: 73, src: `${R2_BASE}/family/family-01.jpg`, alt: "Family of three with dog posing on white wooden bridge in autumn park", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 74, src: `${R2_BASE}/family/family-02.jpg`, alt: "Parents with young son holding family dog on park bridge surrounded by fall foliage", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 75, src: `${R2_BASE}/family/family-03.jpg`, alt: "Couple embracing on white bridge in autumn park with golden leaves", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 76, src: `${R2_BASE}/family/family-04.jpg`, alt: "Young boy peeking over railing of white bridge in wooded autumn park", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 77, src: `${R2_BASE}/family/family-05.jpg`, alt: "Family portrait on white bridge with dog surrounded by autumn trees and fallen leaves", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 78, src: `${R2_BASE}/family/family-06.jpg`, alt: "Boy with dog framed between parents holding hands under large tree in autumn", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 79, src: `${R2_BASE}/family/family-07.jpg`, alt: "Boy sitting with dog in grass framed by parents holding hands overhead", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 80, src: `${R2_BASE}/family/family-08.jpg`, alt: "Siblings playing with gold ornaments against pink backdrop during holiday session", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 81, src: `${R2_BASE}/family/family-09.jpg`, alt: "Brother and sister smiling together in matching cream outfits with holiday ornament", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 82, src: `${R2_BASE}/family/family-10.jpg`, alt: "Girl lying on white backdrop smiling up at hanging holiday ornaments", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 83, src: `${R2_BASE}/family/family-11.jpg`, alt: "Girl reading holiday book in front of decorated Christmas tree with warm glow", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 84, src: `${R2_BASE}/family/family-12.jpg`, alt: "Three siblings in matching green plaid outfits by fireplace with Christmas wreath", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 85, src: `${R2_BASE}/family/family-13.jpg`, alt: "Brother and sister in coordinated green plaid by decorated holiday mantel", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 86, src: `${R2_BASE}/family/family-14.jpg`, alt: "Family of five in matching green outfits gathered by fireplace for holiday portrait", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 87, src: `${R2_BASE}/family/family-15.jpg`, alt: "Toddler in plaid dress sitting by wrapped presents and glowing lights", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 88, src: `${R2_BASE}/family/family-16.jpg`, alt: "Sister and brother hugging in matching green plaid outfits by holiday fireplace", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 89, src: `${R2_BASE}/family/family-17.jpg`, alt: "Three siblings in matching red outfits with baby by Christmas tree", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 90, src: `${R2_BASE}/family/family-18.jpg`, alt: "Brother and sister in red sweaters posing by decorated Christmas tree", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 91, src: `${R2_BASE}/family/family-19.jpg`, alt: "Siblings wrapped in Christmas lights back-to-back laughing by tree", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 92, src: `${R2_BASE}/family/family-20.jpg`, alt: "Brother kissing baby sister while big sister holds her by Christmas tree", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 93, src: `${R2_BASE}/family/family-21.jpg`, alt: "Three siblings in red matching outfits formal portrait by Christmas tree", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 94, src: `${R2_BASE}/family/family-22.jpg`, alt: "Newborn baby in red velvet outfit lying in wicker basket by Christmas tree", service: "Family", subCategory: "Family", aspectRatio: "square" },
  { id: 95, src: `${R2_BASE}/family/family-23.jpg`, alt: "Close-up of baby feet in basket with dreamy Christmas tree bokeh lights", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 96, src: `${R2_BASE}/family/family-24.jpg`, alt: "Family of three walking together on green lawn with autumn colors at golden hour", service: "Family", subCategory: "Family", aspectRatio: "landscape" },
  { id: 97, src: `${R2_BASE}/family/family-25.jpg`, alt: "Toddler on dad's shoulders laughing with mom reaching up in autumn park", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 98, src: `${R2_BASE}/family/family-26.jpg`, alt: "Family of three portrait with toddler in coordinated fall outfits on green lawn", service: "Family", subCategory: "Family", aspectRatio: "portrait" },
  { id: 99, src: `${R2_BASE}/family/family-27.jpg`, alt: "Parents laughing while swinging toddler between them in autumn park", service: "Family", subCategory: "Family", aspectRatio: "landscape" },

  // ── Maternity (17) ────────────────────────────────────────────
  { id: 100, src: `${R2_BASE}/maternity/maternity-01.jpg`, alt: "Studio maternity portrait with white roses and baby breath against bare bump", service: "Maternity", subCategory: "Maternity", aspectRatio: "square" },
  { id: 101, src: `${R2_BASE}/maternity/maternity-02.jpg`, alt: "Full-length studio maternity portrait with roses baby breath and ripped jeans", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 102, src: `${R2_BASE}/maternity/maternity-03.jpg`, alt: "Mom-to-be showing ultrasound photos to family dog on couch", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 103, src: `${R2_BASE}/maternity/maternity-04.jpg`, alt: "Expecting couple in garden at golden hour with pink lace dress and blue suit", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 104, src: `${R2_BASE}/maternity/maternity-05.jpg`, alt: "Black and white portrait of couple lying together looking at ultrasound photos", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 105, src: `${R2_BASE}/maternity/maternity-06.jpg`, alt: "Couple holding ultrasound polaroid together in matching black outfits", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 106, src: `${R2_BASE}/maternity/maternity-07.jpg`, alt: "Couple kissing from behind in tree-lined park at golden hour", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 107, src: `${R2_BASE}/maternity/maternity-08.jpg`, alt: "Mom-to-be standing in tree-lined avenue wearing pink flowing dress at golden hour", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 108, src: `${R2_BASE}/maternity/maternity-09.jpg`, alt: "Expecting couple on stone garden path surrounded by lush greenery", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 109, src: `${R2_BASE}/maternity/maternity-10.jpg`, alt: "Mom-to-be seated studio portrait with dog in black dress", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 110, src: `${R2_BASE}/maternity/maternity-11.jpg`, alt: "Couple on tree-lined park path with autumn colors in casual style", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 111, src: `${R2_BASE}/maternity/maternity-12.jpg`, alt: "Couple kissing in colorful autumn garden holding ultrasound photo strip", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 112, src: `${R2_BASE}/maternity/maternity-13.jpg`, alt: "Toddler holding ultrasound photos standing by pumpkins with purple flower backdrop", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 113, src: `${R2_BASE}/maternity/maternity-14.jpg`, alt: "Toddler smiling after dropping ultrasound strip by pumpkins in autumn garden", service: "Maternity", subCategory: "Maternity", aspectRatio: "landscape" },
  { id: 114, src: `${R2_BASE}/maternity/maternity-15.jpg`, alt: "Expecting couple holding ultrasound photo strip in autumn park portrait", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 115, src: `${R2_BASE}/maternity/maternity-16.jpg`, alt: "Couple kissing while holding ultrasound strip in autumn park", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
  { id: 116, src: `${R2_BASE}/maternity/maternity-17.jpg`, alt: "Toddler crawling on grass with parents blurred in background holding ultrasound", service: "Maternity", subCategory: "Maternity", aspectRatio: "portrait" },
];

// ── Helpers ─────────────────────────────────────────────────────

/**
 * Maps service page slugs to portfolio service + sub-category.
 * Supports both top-level service slugs and event sub-page slugs.
 */
const SERVICE_SLUG_MAP: Record<string, { service: ServiceFilter; subCategory?: SubCategory }> = {
  // Events hub — all event sub-categories
  events: { service: "Events" },
  // Event sub-pages
  "baby-shower": { service: "Events", subCategory: "Baby Shower" },
  "bridal-shower": { service: "Events", subCategory: "Bridal Shower" },
  engagement: { service: "Events", subCategory: "Engagement" },
  "gender-reveal": { service: "Events", subCategory: "Gender Reveal" },
  parties: { service: "Events", subCategory: "Birthday" },
  proposal: { service: "Events", subCategory: "Proposal" },
  "religious-ceremonies": { service: "Events", subCategory: "Baptism" },
  milestones: { service: "Events" },
  // Top-level services
  family: { service: "Family" },
  maternity: { service: "Maternity" },
};

/** Thumbnail overrides — when a service card needs a specific sub-category image. */
const THUMBNAIL_SLUG_MAP: Record<string, { service: ServiceFilter; subCategory: SubCategory }> = {
  events: { service: "Events", subCategory: "Bridal Shower" },
  parties: { service: "Events", subCategory: "Birthday" },
  milestones: { service: "Events", subCategory: "Gender Reveal" },
};

/** Get all portfolio items for a given service slug. */
export function getPortfolioForService(serviceSlug: string): PortfolioItem[] {
  const mapping = SERVICE_SLUG_MAP[serviceSlug];
  if (!mapping) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[portfolioData] Unknown service slug: "${serviceSlug}"`);
    }
    return [];
  }
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
  const thumbMapping = THUMBNAIL_SLUG_MAP[serviceSlug];
  if (thumbMapping) {
    const item = PORTFOLIO_ITEMS.find(
      (i) => i.service === thumbMapping.service && i.subCategory === thumbMapping.subCategory
    );
    if (item) return { src: item.src, alt: item.alt };
  }
  const items = getPortfolioForService(serviceSlug);
  if (items.length === 0) return undefined;
  return { src: items[0].src, alt: items[0].alt };
}
