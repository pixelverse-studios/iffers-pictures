import portfolioCatalogJson from "./portfolio-catalog.json";

export const R2_PUBLIC_BASE_URL =
  "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export type PortfolioAspect = "portrait" | "landscape" | "square" | "video";
export type MediaStatus = "draft" | "published" | "archived";
export type RestorableMediaStatus = Exclude<MediaStatus, "archived">;

export const SERVICES = [
  "Events",
  "Family",
  "Maternity",
  "Couples",
  "Portrait",
] as const;

export type ServiceFilter = (typeof SERVICES)[number];

export const SUB_CATEGORIES = {
  Events: [
    "Baby Shower",
    "Bridal Shower",
    "Gender Reveal",
    "Birthday",
    "Baptism",
  ] as const,
  Family: ["Family"] as const,
  Maternity: ["Maternity"] as const,
  Couples: ["Engagement", "Proposal"] as const,
  Portrait: ["Portrait"] as const,
} satisfies Record<ServiceFilter, readonly string[]>;

export type SubCategory = (typeof SUB_CATEGORIES)[ServiceFilter][number];

export interface PortfolioItem {
  id: number;
  src: string;
  alt: string;
  service: ServiceFilter;
  subCategory: SubCategory;
  aspectRatio: PortfolioAspect;
}

export interface PortfolioCatalogItem extends PortfolioItem {
  key: string;
  filename: string;
  status: MediaStatus;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  archivedBy?: string;
  archivedFromStatus?: RestorableMediaStatus;
}

export interface PortfolioCatalog {
  version: 1;
  publicBaseUrl: string;
  bucket: string;
  generatedFrom?: string;
  items: PortfolioCatalogItem[];
}

const ASPECTS = ["portrait", "landscape", "square", "video"] as const;
export const MEDIA_STATUSES = ["draft", "published", "archived"] as const;
export const PUBLIC_MEDIA_STATUS: MediaStatus = "published";
export const DEFAULT_UPLOAD_STATUS: MediaStatus = "draft";

const LEGACY_STATUS_MAP: Record<string, MediaStatus> = {
  hidden: "draft",
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isService(value: unknown): value is ServiceFilter {
  return SERVICES.includes(value as ServiceFilter);
}

function isSubCategory(
  service: ServiceFilter,
  value: unknown
): value is SubCategory {
  return SUB_CATEGORIES[service].includes(value as never);
}

function isAspect(value: unknown): value is PortfolioAspect {
  return ASPECTS.includes(value as PortfolioAspect);
}

function normalizeStatus(value: unknown): MediaStatus | null {
  if (!isString(value)) return null;
  if (MEDIA_STATUSES.includes(value as MediaStatus)) return value as MediaStatus;
  return LEGACY_STATUS_MAP[value] ?? null;
}

function isRestorableStatus(value: unknown): value is RestorableMediaStatus {
  return value === "draft" || value === "published";
}

export function getPublicUrl(publicBaseUrl: string, key: string) {
  return `${publicBaseUrl.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
}

export function getFilenameFromKey(key: string) {
  return key.split("/").pop() ?? key;
}

export function normalizePortfolioCatalogItem(
  item: unknown,
  publicBaseUrl = R2_PUBLIC_BASE_URL
): PortfolioCatalogItem | null {
  if (!item || typeof item !== "object") return null;

  const value = item as Record<string, unknown>;
  if (typeof value.id !== "number") return null;
  if (!isString(value.key)) return null;
  if (!isString(value.alt)) return null;
  if (!isService(value.service)) return null;
  if (!isSubCategory(value.service, value.subCategory)) return null;
  if (!isAspect(value.aspectRatio)) return null;
  const status = normalizeStatus(value.status);
  if (!status) return null;
  if (typeof value.sortOrder !== "number") return null;

  const src = isString(value.src)
    ? value.src
    : getPublicUrl(publicBaseUrl, value.key);
  const archivedFromStatus = isRestorableStatus(value.archivedFromStatus)
    ? value.archivedFromStatus
    : undefined;

  return {
    id: value.id,
    key: value.key,
    filename: getFilenameFromKey(value.key),
    src,
    alt: value.alt,
    service: value.service,
    subCategory: value.subCategory,
    aspectRatio: value.aspectRatio,
    status,
    sortOrder: value.sortOrder,
    createdAt: isString(value.createdAt) ? value.createdAt : undefined,
    updatedAt: isString(value.updatedAt) ? value.updatedAt : undefined,
    archivedAt: isString(value.archivedAt) ? value.archivedAt : undefined,
    archivedBy: isString(value.archivedBy) ? value.archivedBy : undefined,
    archivedFromStatus,
  };
}

export function normalizePortfolioCatalog(
  catalog: unknown,
  fallbackCatalog = portfolioCatalogJson
): PortfolioCatalog {
  const source =
    catalog && typeof catalog === "object"
      ? (catalog as Record<string, unknown>)
      : (fallbackCatalog as Record<string, unknown>);

  const publicBaseUrl = isString(source.publicBaseUrl)
    ? source.publicBaseUrl
    : R2_PUBLIC_BASE_URL;
  const bucket = isString(source.bucket) ? source.bucket : "iffers-pictures";
  const rawItems = Array.isArray(source.items) ? source.items : [];
  const items = rawItems
    .map((item) => normalizePortfolioCatalogItem(item, publicBaseUrl))
    .filter((item): item is PortfolioCatalogItem => item !== null);

  if (items.length === 0 && source !== fallbackCatalog) {
    return normalizePortfolioCatalog(fallbackCatalog, fallbackCatalog);
  }

  return {
    version: 1,
    publicBaseUrl,
    bucket,
    generatedFrom: isString(source.generatedFrom)
      ? source.generatedFrom
      : undefined,
    items,
  };
}

export const PORTFOLIO_CATALOG =
  normalizePortfolioCatalog(portfolioCatalogJson);

export const PUBLISHED_PORTFOLIO_CATALOG_ITEMS: PortfolioCatalogItem[] =
  PORTFOLIO_CATALOG.items
    .filter((item) => item.status === PUBLIC_MEDIA_STATUS)
    .sort((a, b) => a.sortOrder - b.sortOrder);

export const PORTFOLIO_ITEMS: PortfolioItem[] =
  PUBLISHED_PORTFOLIO_CATALOG_ITEMS;
