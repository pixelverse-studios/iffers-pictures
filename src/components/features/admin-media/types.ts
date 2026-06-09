import type {
  AdminMediaItem,
  MediaAspectRatio,
  MediaLibrary,
  MediaCropPosition,
  MediaPlacementSlotKey,
  MediaService,
  MediaSiteCategory,
  MediaStatus,
  MediaSubCategory,
} from "@/lib/media/types";

export type AuthState = "checking" | "signed-out" | "signed-in";
export type StatusFilter = "all" | MediaStatus;
export type LibraryFilter = "all" | MediaLibrary;
export type SortMode = "newest" | "oldest" | "sortOrder" | "filename";
export type UploadStatus = "queued" | "uploading" | "created" | "error";
export type AdminMediaViewMode = "library" | "placements";
export type PlacementPageFilter = "all" | string;

export interface EditorState {
  alt: string;
  library: MediaLibrary;
  siteCategory: MediaSiteCategory | "";
  service: MediaService | "";
  subCategory: MediaSubCategory | "";
  aspectRatio: MediaAspectRatio | "";
  cropPosition: MediaCropPosition;
  status: MediaStatus;
  sortOrder: string;
}

export interface UploadQueueItem {
  id: string;
  file: File;
  library: MediaLibrary;
  siteCategory: MediaSiteCategory | "";
  service: MediaService | "";
  subCategory: MediaSubCategory | "";
  status: UploadStatus;
  progress: number;
  message: string;
  createdItem?: AdminMediaItem;
}

export interface BatchArchiveFailure {
  id: number;
  filename: string;
  message: string;
}

export interface BatchArchiveFeedback {
  tone: "warning" | "error";
  message: string;
  failures: BatchArchiveFailure[];
}

export interface MediaPlacementUsage {
  slotKey: MediaPlacementSlotKey;
  pageLabel: string;
  sectionLabel: string;
  affectedPaths: readonly string[];
}
