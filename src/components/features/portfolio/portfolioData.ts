/**
 * Portfolio data backed by the managed media catalog.
 *
 * The CMS-facing catalog lives in `src/data/media/portfolio-catalog.json`.
 * This module keeps the original portfolio exports stable for existing pages.
 */

export {
  PORTFOLIO_CATALOG,
  PORTFOLIO_ITEMS,
  PUBLISHED_PORTFOLIO_CATALOG_ITEMS,
  DEFAULT_UPLOAD_STATUS,
  MEDIA_STATUSES,
  PUBLIC_MEDIA_STATUS,
  R2_PUBLIC_BASE_URL,
  SERVICES,
  SUB_CATEGORIES,
  getFilenameFromKey,
  getPublicUrl,
  normalizePortfolioCatalog,
  normalizePortfolioCatalogItem,
  type MediaStatus,
  type PortfolioAspect,
  type PortfolioCatalog,
  type PortfolioCatalogItem,
  type PortfolioItem,
  type RestorableMediaStatus,
  type ServiceFilter,
  type SubCategory,
} from "@/data/media/portfolioCatalog";

import {
  PORTFOLIO_ITEMS,
  type ServiceFilter,
  type SubCategory,
} from "@/data/media/portfolioCatalog";

/**
 * Maps service page slugs to portfolio service + sub-category.
 * Supports both top-level service slugs and event sub-page slugs.
 */
const SERVICE_SLUG_MAP: Record<
  string,
  { service: ServiceFilter; subCategory?: SubCategory }
> = {
  // Events hub: all event sub-categories
  events: { service: "Events" },
  // Event sub-pages
  "baby-shower": { service: "Events", subCategory: "Baby Shower" },
  "bridal-shower": { service: "Events", subCategory: "Bridal Shower" },
  engagement: { service: "Couples", subCategory: "Engagement" },
  "gender-reveal": { service: "Events", subCategory: "Gender Reveal" },
  parties: { service: "Events", subCategory: "Birthday" },
  proposal: { service: "Couples", subCategory: "Proposal" },
  "religious-ceremonies": { service: "Events", subCategory: "Baptism" },
  milestones: { service: "Events" },
  // Top-level services
  family: { service: "Family" },
  maternity: { service: "Maternity" },
  "couples-engagement": { service: "Couples" },
  portrait: { service: "Portrait" },
};

/** Thumbnail overrides: when a service card needs a specific sub-category image. */
const THUMBNAIL_SLUG_MAP: Record<
  string,
  { service: ServiceFilter; subCategory: SubCategory }
> = {
  events: { service: "Events", subCategory: "Bridal Shower" },
  parties: { service: "Events", subCategory: "Birthday" },
  milestones: { service: "Events", subCategory: "Gender Reveal" },
  portrait: { service: "Portrait", subCategory: "Portrait" },
};

/** Get all published portfolio items for a given service slug. */
export function getPortfolioForService(serviceSlug: string) {
  const mapping = SERVICE_SLUG_MAP[serviceSlug];
  if (!mapping) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[portfolioData] Unknown service slug: "${serviceSlug}"`);
    }
    return [];
  }

  return PORTFOLIO_ITEMS.filter(
    (item) =>
      item.service === mapping.service &&
      (!mapping.subCategory || item.subCategory === mapping.subCategory)
  );
}

/** Get the first published portfolio image for a service slug. */
export function getServiceThumbnail(
  serviceSlug: string
): { src: string; alt: string } | undefined {
  const thumbMapping = THUMBNAIL_SLUG_MAP[serviceSlug];
  if (thumbMapping) {
    const item = PORTFOLIO_ITEMS.find(
      (candidate) =>
        candidate.service === thumbMapping.service &&
        candidate.subCategory === thumbMapping.subCategory
    );
    if (item) return { src: item.src, alt: item.alt };
  }

  const items = getPortfolioForService(serviceSlug);
  if (items.length === 0) return undefined;
  return { src: items[0].src, alt: items[0].alt };
}
