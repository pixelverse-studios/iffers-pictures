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

export function isMediaSubCategory(
  service: MediaService,
  value: unknown
): value is MediaSubCategory {
  return MEDIA_SUB_CATEGORIES[service].includes(value as never);
}
