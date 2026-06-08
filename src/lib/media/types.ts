export const IFFERS_MEDIA_WEBSITE_SLUG = "iffers-pictures" as const;

export const MEDIA_SERVICES = [
  "Events",
  "Family",
  "Maternity",
  "Couples",
  "Portrait",
] as const;

export const MEDIA_SUB_CATEGORIES = {
  Events: [
    "Baby Shower",
    "Bridal Shower",
    "Gender Reveal",
    "Birthday",
    "Baptism",
  ],
  Family: ["Family"],
  Maternity: ["Maternity"],
  Couples: ["Engagement", "Proposal"],
  Portrait: ["Portrait"],
} as const satisfies Record<MediaService, readonly string[]>;

export const MEDIA_ASPECT_RATIOS = [
  "portrait",
  "landscape",
  "square",
  "video",
] as const;

export const MEDIA_STATUSES = ["draft", "published", "archived"] as const;

export const MEDIA_PLACEMENT_SLOT_KEYS = [
  "home.hero",
  "home.strip.1",
  "home.strip.2",
  "home.meet_jenn",
  "home.quote_image",
  "about.hero",
  "services.hero",
  "services.events.hero",
  "services.family.hero",
  "services.maternity.hero",
  "services.couples-engagement.hero",
  "services.portrait.hero",
  "portfolio.hero",
  "investment.hero",
  "investment.detail",
  "faq.hero",
] as const;

export const IFFERS_MEDIA_PLACEMENT_SLOTS = [
  {
    slotKey: "home.hero",
    pageLabel: "Home",
    sectionLabel: "Hero",
    description: "Primary homepage hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/"],
  },
  {
    slotKey: "home.strip.1",
    pageLabel: "Home",
    sectionLabel: "Image Strip 1",
    description: "First supporting image in the homepage image strip.",
    expectedAspectRatios: ["portrait", "landscape"],
    affectedPaths: ["/"],
  },
  {
    slotKey: "home.strip.2",
    pageLabel: "Home",
    sectionLabel: "Image Strip 2",
    description: "Second supporting image in the homepage image strip.",
    expectedAspectRatios: ["portrait", "landscape"],
    affectedPaths: ["/"],
  },
  {
    slotKey: "home.meet_jenn",
    pageLabel: "Home",
    sectionLabel: "Meet Jenn",
    description: "Image used beside the homepage introduction to Jenn.",
    expectedAspectRatios: ["portrait"],
    affectedPaths: ["/"],
  },
  {
    slotKey: "home.quote_image",
    pageLabel: "Home",
    sectionLabel: "Quote Image",
    description: "Image paired with the homepage quote/testimonial section.",
    expectedAspectRatios: ["portrait", "landscape"],
    affectedPaths: ["/"],
  },
  {
    slotKey: "about.hero",
    pageLabel: "About",
    sectionLabel: "Hero",
    description: "Primary about page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/about"],
  },
  {
    slotKey: "services.hero",
    pageLabel: "Services",
    sectionLabel: "Hero",
    description: "Primary services overview hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services"],
  },
  {
    slotKey: "services.events.hero",
    pageLabel: "Events",
    sectionLabel: "Hero",
    description: "Primary events service page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services/events"],
  },
  {
    slotKey: "services.family.hero",
    pageLabel: "Family",
    sectionLabel: "Hero",
    description: "Primary family service page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services/family"],
  },
  {
    slotKey: "services.maternity.hero",
    pageLabel: "Maternity",
    sectionLabel: "Hero",
    description: "Primary maternity service page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services/maternity"],
  },
  {
    slotKey: "services.couples-engagement.hero",
    pageLabel: "Couples & Engagement",
    sectionLabel: "Hero",
    description: "Primary couples and engagement service page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services/couples-engagement"],
  },
  {
    slotKey: "services.portrait.hero",
    pageLabel: "Portrait",
    sectionLabel: "Hero",
    description: "Primary portrait service page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/services/portrait"],
  },
  {
    slotKey: "portfolio.hero",
    pageLabel: "Portfolio",
    sectionLabel: "Hero",
    description: "Primary portfolio page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/portfolio"],
  },
  {
    slotKey: "investment.hero",
    pageLabel: "Investment",
    sectionLabel: "Hero",
    description: "Primary investment page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/investment"],
  },
  {
    slotKey: "investment.detail",
    pageLabel: "Investment",
    sectionLabel: "Detail",
    description: "Supporting investment page detail image.",
    expectedAspectRatios: ["portrait", "landscape"],
    affectedPaths: ["/investment"],
  },
  {
    slotKey: "faq.hero",
    pageLabel: "FAQ",
    sectionLabel: "Hero",
    description: "Primary FAQ page hero image.",
    expectedAspectRatios: ["landscape", "portrait"],
    affectedPaths: ["/faq"],
  },
] as const satisfies readonly MediaPlacementSlot[];

export const MEDIA_REVALIDATION_REASONS = [
  "manual",
  "published",
  "archived",
  "restored",
  "metadata_edited",
  "reorder_changed",
  "renamed_moved",
] as const;

export const MEDIA_UPLOAD_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type MediaService = (typeof MEDIA_SERVICES)[number];
export type MediaAspectRatio = (typeof MEDIA_ASPECT_RATIOS)[number];
export type MediaStatus = (typeof MEDIA_STATUSES)[number];
export type RestorableMediaStatus = Exclude<MediaStatus, "archived">;
export type MediaPlacementSlotKey = (typeof MEDIA_PLACEMENT_SLOT_KEYS)[number];
export type MediaRevalidationReason =
  (typeof MEDIA_REVALIDATION_REASONS)[number];
export type MediaUploadContentType =
  (typeof MEDIA_UPLOAD_CONTENT_TYPES)[number];

export type MediaSubCategory = {
  [Service in MediaService]: (typeof MEDIA_SUB_CATEGORIES)[Service][number];
}[MediaService];

export interface MediaErrorPayload {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PublicMediaItem {
  id: number;
  key: string;
  filename: string;
  src: string;
  alt: string;
  service: MediaService;
  subCategory: MediaSubCategory;
  aspectRatio: MediaAspectRatio;
  status: "published";
  sortOrder: number;
}

export interface AdminMediaItem {
  id: number;
  key: string;
  filename: string;
  src: string;
  alt: string;
  service: MediaService | null;
  subCategory: MediaSubCategory | null;
  aspectRatio: MediaAspectRatio | null;
  status: MediaStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  archivedBy: string | null;
  archivedFromStatus: RestorableMediaStatus | null;
}

export type MediaCatalogItem = PublicMediaItem | AdminMediaItem;

export interface MediaCatalog<TItem extends MediaCatalogItem = PublicMediaItem> {
  version: 1;
  publicBaseUrl: string;
  bucket: string;
  items: TItem[];
}

export interface MediaPlacementSlot {
  slotKey: MediaPlacementSlotKey;
  pageLabel: string;
  sectionLabel: string;
  description: string;
  expectedAspectRatios?: readonly MediaAspectRatio[];
  affectedPaths: readonly string[];
}

export type PublicPlacementMedia = Omit<PublicMediaItem, "sortOrder">;

export interface AdminPlacementMedia {
  id: number;
  key: string;
  filename: string;
  src: string;
  alt: string;
  service: MediaService | null;
  subCategory: MediaSubCategory | null;
  aspectRatio: MediaAspectRatio | null;
  status: MediaStatus;
}

export interface PublicMediaPlacement {
  slotKey: MediaPlacementSlotKey;
  media: PublicPlacementMedia;
}

export interface PublicMediaPlacementsResponse {
  version: 1;
  publicBaseUrl: string;
  placements: PublicMediaPlacement[];
}

export interface AdminMediaPlacementAssignment {
  id: number;
  media: AdminPlacementMedia;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminMediaPlacementSlot extends MediaPlacementSlot {
  assignment: AdminMediaPlacementAssignment | null;
}

export interface AdminMediaPlacementsResponse {
  version: 1;
  publicBaseUrl: string;
  slots: AdminMediaPlacementSlot[];
}

export interface AssignMediaPlacementRequest {
  media_id: number;
}

export type AssignMediaPlacementResponse = AdminMediaPlacementSlot;

export interface ClearMediaPlacementResponse {
  cleared: boolean;
  slotKey: MediaPlacementSlotKey;
}

export interface MediaAdminSession {
  email: string;
  expiresAt: string;
}

export interface MagicLinkResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface PresignUploadRequest {
  filename: string;
  content_type: MediaUploadContentType;
  folder: string;
  size: number;
}

export interface PresignUploadResponse {
  presigned_url: string;
  public_url: string;
  r2_key: string;
  expires_at: string;
}

export interface CreateDraftMediaItemRequest {
  key: string;
  filename?: string;
  src?: string;
  alt?: string;
  service?: MediaService | null;
  subCategory?: MediaSubCategory | null;
  aspectRatio?: MediaAspectRatio | null;
  sortOrder?: number;
}

export interface PatchMediaItemRequest {
  alt?: string;
  service?: MediaService | null;
  subCategory?: MediaSubCategory | null;
  aspectRatio?: MediaAspectRatio | null;
  sortOrder?: number;
  status?: MediaStatus;
}

export interface DestinationCheckRequest {
  destination_key: string;
  exclude_media_id?: number;
}

export interface DestinationCheckResponse {
  destination_key: string;
  catalog_exists: boolean;
  r2_exists: boolean;
  available: boolean;
}

export interface MoveMediaItemRequest {
  destination_key: string;
}

export interface MoveMediaItemResponse {
  item: AdminMediaItem;
  source_key: string;
  destination_key: string;
  source_deleted: boolean;
}

export interface RevalidateMediaRequest {
  reason?: MediaRevalidationReason;
  media_id?: number;
  media_key?: string;
}

export interface RevalidateMediaResponse {
  configured: boolean;
  triggered: boolean;
  skipped: boolean;
  reason: MediaRevalidationReason;
  website_slug: typeof IFFERS_MEDIA_WEBSITE_SLUG;
  affected_paths: string[];
  triggered_at: string;
  status?: number;
}

export interface MediaRevalidationWebhookPayload {
  website_slug: string;
  reason: MediaRevalidationReason;
  affected_paths: string[];
  media_id?: number;
  media_key?: string;
  actor?: string;
  triggered_at: string;
}

export interface MediaRevalidationWebhookResponse {
  revalidated: boolean;
  ignored: boolean;
  website_slug?: string;
  reason?: MediaRevalidationReason;
  affected_paths: string[];
  revalidated_paths: string[];
  ignored_paths: string[];
}

export interface R2ObjectItem {
  key: string;
  public_url: string;
  size: number;
  last_modified: string;
  etag: string;
}

export interface R2ObjectListResponse {
  bucket: string;
  prefix: string;
  objects: R2ObjectItem[];
}

export function isMediaService(value: unknown): value is MediaService {
  return MEDIA_SERVICES.includes(value as MediaService);
}

export function isMediaAspectRatio(value: unknown): value is MediaAspectRatio {
  return MEDIA_ASPECT_RATIOS.includes(value as MediaAspectRatio);
}

export function isMediaStatus(value: unknown): value is MediaStatus {
  return MEDIA_STATUSES.includes(value as MediaStatus);
}

export function isMediaPlacementSlotKey(
  value: unknown
): value is MediaPlacementSlotKey {
  return MEDIA_PLACEMENT_SLOT_KEYS.includes(value as MediaPlacementSlotKey);
}

export function isMediaSubCategory(
  service: MediaService,
  value: unknown
): value is MediaSubCategory {
  return MEDIA_SUB_CATEGORIES[service].includes(value as never);
}
