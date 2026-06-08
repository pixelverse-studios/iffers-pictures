import type {
  AdminMediaItem,
  MediaAspectRatio,
  MediaPlacementSlotKey,
  MediaService,
  MediaStatus,
  MediaSubCategory,
} from "@/lib/media/types";

export type AuthState = "checking" | "signed-out" | "signed-in";
export type StatusFilter = "all" | MediaStatus;
export type SortMode = "newest" | "oldest" | "sortOrder" | "filename";
export type UploadStatus = "queued" | "uploading" | "created" | "error";
export type AdminMediaViewMode = "library" | "placements";
export type PlacementPageFilter = "all" | string;

export interface EditorState {
  alt: string;
  service: MediaService | "";
  subCategory: MediaSubCategory | "";
  aspectRatio: MediaAspectRatio | "";
  status: MediaStatus;
  sortOrder: string;
}

export interface UploadQueueItem {
  id: string;
  file: File;
  service: MediaService;
  subCategory: MediaSubCategory;
  status: UploadStatus;
  progress: number;
  message: string;
  createdItem?: AdminMediaItem;
}

export interface MediaPlacementUsage {
  slotKey: MediaPlacementSlotKey;
  pageLabel: string;
  sectionLabel: string;
  affectedPaths: readonly string[];
}
