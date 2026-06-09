import {
  PORTFOLIO_ITEMS,
  type PortfolioItem,
  type ServiceFilter,
  type SubCategory,
} from "@/components/features/portfolio/portfolioData";
import type {
  MediaPlacementSlotKey,
  PublicMediaItem,
  PublicMediaPlacement,
  PublicPlacementMedia,
} from "./types";

export type PublicGalleryItem = PortfolioItem;

export const DEFAULT_PUBLIC_GALLERY_ITEMS: PublicGalleryItem[] =
  PORTFOLIO_ITEMS;

const SERVICE_SLUG_MAP: Record<
  string,
  { service: ServiceFilter; subCategory?: SubCategory }
> = {
  events: { service: "Events" },
  "baby-shower": { service: "Events", subCategory: "Baby Shower" },
  "bridal-shower": { service: "Events", subCategory: "Bridal Shower" },
  engagement: { service: "Couples", subCategory: "Engagement" },
  "gender-reveal": { service: "Events", subCategory: "Gender Reveal" },
  parties: { service: "Events", subCategory: "Birthday" },
  proposal: { service: "Couples", subCategory: "Proposal" },
  "religious-ceremonies": { service: "Events", subCategory: "Baptism" },
  milestones: { service: "Events" },
  family: { service: "Family" },
  maternity: { service: "Maternity" },
  "couples-engagement": { service: "Couples" },
  portrait: { service: "Portrait" },
};

const THUMBNAIL_SLUG_MAP: Record<
  string,
  { service: ServiceFilter; subCategory: SubCategory }
> = {
  events: { service: "Events", subCategory: "Bridal Shower" },
  parties: { service: "Events", subCategory: "Birthday" },
  milestones: { service: "Events", subCategory: "Gender Reveal" },
  portrait: { service: "Portrait", subCategory: "Portrait" },
};

const SERVICE_HERO_PLACEMENT_SLOT_MAP: Partial<
  Record<string, MediaPlacementSlotKey>
> = {
  events: "services.events.hero",
  family: "services.family.hero",
  maternity: "services.maternity.hero",
  "couples-engagement": "services.couples-engagement.hero",
  portrait: "services.portrait.hero",
};

const SERVICE_CARD_PLACEMENT_SLOT_MAP: Partial<
  Record<string, MediaPlacementSlotKey>
> = {
  events: "services.card.events",
  family: "services.card.family",
  maternity: "services.card.maternity",
  "couples-engagement": "services.card.couples-engagement",
  portrait: "services.card.portrait",
};

export interface PinnedMediaFallback {
  id?: number;
  key?: string;
  service?: ServiceFilter;
  subCategory?: SubCategory;
}

export function toPublicGalleryItems(
  items: PublicMediaItem[]
): PublicGalleryItem[] {
  return [...items]
    .filter(
      (item) =>
        item.library !== "site" &&
        Boolean(item.service) &&
        Boolean(item.subCategory) &&
        Boolean(item.aspectRatio)
    )
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
    .map(({ id, src, alt, service, subCategory, aspectRatio }) => ({
      id,
      src,
      alt,
      service,
      subCategory,
      aspectRatio,
    }));
}

export function placementMediaToPublicGalleryItem(
  media: PublicPlacementMedia
): PublicGalleryItem {
  const { id, src, alt, service, subCategory, aspectRatio } = media;

  return {
    id,
    src,
    alt,
    service,
    subCategory,
    aspectRatio,
  };
}

export function findPlacementBySlotKey(
  placements: PublicMediaPlacement[],
  slotKey: MediaPlacementSlotKey
): PublicMediaPlacement | undefined {
  return placements.find((placement) => placement.slotKey === slotKey);
}

export function getPlacementGalleryItem(
  placements: PublicMediaPlacement[],
  slotKey: MediaPlacementSlotKey
): PublicGalleryItem | undefined {
  const placement = findPlacementBySlotKey(placements, slotKey);

  return placement
    ? placementMediaToPublicGalleryItem(placement.media)
    : undefined;
}

export function getServiceHeroPlacementSlotKey(
  serviceSlug: string
): MediaPlacementSlotKey | undefined {
  return SERVICE_HERO_PLACEMENT_SLOT_MAP[serviceSlug];
}

export function getServiceCardPlacementSlotKey(
  serviceSlug: string
): MediaPlacementSlotKey | undefined {
  return SERVICE_CARD_PLACEMENT_SLOT_MAP[serviceSlug];
}

export function getPortfolioForServiceFromItems(
  items: PublicGalleryItem[],
  serviceSlug: string
): PublicGalleryItem[] {
  const mapping = SERVICE_SLUG_MAP[serviceSlug];

  if (!mapping) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[mediaGallery] Unknown service slug: "${serviceSlug}"`);
    }
    return [];
  }

  return items.filter(
    (item) =>
      item.service === mapping.service &&
      (!mapping.subCategory || item.subCategory === mapping.subCategory)
  );
}

export function getServiceThumbnailFromItems(
  items: PublicGalleryItem[],
  serviceSlug: string
): Pick<PublicGalleryItem, "src" | "alt"> | undefined {
  const thumbMapping = THUMBNAIL_SLUG_MAP[serviceSlug];

  if (thumbMapping) {
    const item = items.find(
      (candidate) =>
        candidate.service === thumbMapping.service &&
        candidate.subCategory === thumbMapping.subCategory
    );

    if (item) return { src: item.src, alt: item.alt };
  }

  const serviceItems = getPortfolioForServiceFromItems(items, serviceSlug);

  return serviceItems[0]
    ? { src: serviceItems[0].src, alt: serviceItems[0].alt }
    : undefined;
}

export function findPinnedGalleryItem(
  items: PublicGalleryItem[],
  fallback: PinnedMediaFallback
): PublicGalleryItem | undefined {
  // Pinned public images fall back by category so archived/moved media cannot break pages.
  const pinnedById =
    fallback.id === undefined
      ? undefined
      : items.find((item) => item.id === fallback.id);

  if (pinnedById) return pinnedById;

  const pinnedByKey =
    fallback.key === undefined
      ? undefined
      : items.find((item) => item.src.endsWith(`/${fallback.key}`));

  if (pinnedByKey) return pinnedByKey;

  const categoryFallback = items.find(
    (item) =>
      (!fallback.service || item.service === fallback.service) &&
      (!fallback.subCategory || item.subCategory === fallback.subCategory)
  );

  return categoryFallback ?? items[0];
}
