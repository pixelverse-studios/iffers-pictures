import { MediaApiError } from "@/lib/media/errors";
import {
  MEDIA_STATUSES,
  MEDIA_SUB_CATEGORIES,
  MEDIA_UPLOAD_CONTENT_TYPES,
  type AdminMediaItem,
  type MediaAspectRatio,
  type MediaLibrary,
  type MediaStatus,
  type MediaUploadContentType,
} from "@/lib/media/types";
import { FRIENDLY_ERRORS, MAX_UPLOAD_BYTES } from "./constants";
import type { EditorState, SortMode, StatusFilter } from "./types";

export function getFriendlyError(error: unknown) {
  if (error instanceof MediaApiError) {
    return FRIENDLY_ERRORS[error.code] ?? error.message;
  }

  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

export function getErrorCode(error: unknown) {
  return error instanceof MediaApiError ? error.code : null;
}

export function getInitialEditorState(item: AdminMediaItem): EditorState {
  const library = getMediaLibrary(item);

  return {
    alt: item.alt ?? "",
    library,
    siteCategory: library === "site" ? item.siteCategory ?? "Misc" : "",
    service: library === "portfolio" ? item.service ?? "" : "",
    subCategory: library === "portfolio" ? item.subCategory ?? "" : "",
    aspectRatio: item.aspectRatio ?? "",
    status: item.status,
    sortOrder: String(item.sortOrder ?? 0),
  };
}

export function getMediaLibrary(item: Pick<AdminMediaItem, "library">): MediaLibrary {
  return item.library ?? "portfolio";
}

export function getMediaCategoryLabel(
  item: Pick<AdminMediaItem, "library" | "siteCategory" | "service" | "subCategory">,
) {
  if (getMediaLibrary(item) === "site") {
    return "Site Images";
  }

  return `${item.service ?? "No service"} · ${item.subCategory ?? "No sub-category"}`;
}

export function isValidUploadType(type: string): type is MediaUploadContentType {
  return MEDIA_UPLOAD_CONTENT_TYPES.includes(type as MediaUploadContentType);
}

export function getUploadValidationMessage(file: File) {
  if (!isValidUploadType(file.type)) return "JPEG, PNG, or WebP only";
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Image must be ${formatBytes(MAX_UPLOAD_BYTES)} or smaller`;
  }
  return "";
}

export function getSafeUploadFilename(file: File) {
  const extensionFromType =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";
  const lastDotIndex = file.name.lastIndexOf(".");
  const rawBaseName =
    lastDotIndex > 0 ? file.name.slice(0, lastDotIndex) : file.name;
  const rawExtension =
    lastDotIndex > 0 ? file.name.slice(lastDotIndex + 1) : extensionFromType;
  const safeBaseName = rawBaseName
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const safeExtension = rawExtension
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return `${safeBaseName || "image"}.${safeExtension || extensionFromType}`;
}

export function canPublish(state: EditorState) {
  if (state.library === "site") {
    return Boolean(state.alt.trim() && state.siteCategory && state.aspectRatio);
  }

  return Boolean(
    state.alt.trim() &&
      state.service &&
      state.subCategory &&
      state.aspectRatio &&
      MEDIA_SUB_CATEGORIES[state.service].includes(state.subCategory as never),
  );
}

export function getAffectedPages(item: AdminMediaItem | null) {
  if (item && getMediaLibrary(item) === "site") {
    if (item.siteCategory === "Home") return ["/"];
    if (item.siteCategory === "About") return ["/about"];
    if (item.siteCategory === "Brand") return ["/", "/about"];
    return ["/"];
  }

  if (!item?.service) return ["/portfolio"];

  const pages = ["/portfolio"];
  if (item.service === "Events") pages.push("/services/events");
  if (item.service === "Family") pages.push("/services/family");
  if (item.service === "Maternity") pages.push("/services/maternity");
  if (item.service === "Couples") pages.push("/services/couples-engagement");
  if (item.service === "Portrait") pages.push("/services/portrait");
  return pages;
}

export function sortItems(items: AdminMediaItem[], sort: SortMode) {
  return [...items].sort((a, b) => {
    if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
    if (sort === "sortOrder") return a.sortOrder - b.sortOrder || a.id - b.id;
    if (sort === "filename") return a.filename.localeCompare(b.filename);
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function filterItems({
  items,
  library,
  status,
  service,
  subCategory,
  query,
  sort,
}: {
  items: AdminMediaItem[];
  library: "all" | MediaLibrary;
  status: StatusFilter;
  service: "all" | AdminMediaItem["service"];
  subCategory: "all" | AdminMediaItem["subCategory"];
  query: string;
  sort: SortMode;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return sortItems(
    items.filter((item) => {
      const itemLibrary = getMediaLibrary(item);
      if (library !== "all" && itemLibrary !== library) return false;
      if (status !== "all" && item.status !== status) return false;
      if (service !== "all" && item.service !== service) return false;
      if (subCategory !== "all" && item.subCategory !== subCategory) return false;
      if (!normalizedQuery) return true;

      return [
        item.filename,
        item.key,
        item.alt,
        itemLibrary,
        item.siteCategory,
        item.service,
        item.subCategory,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    }),
    sort,
  );
}

export function getStatusCounts(items: AdminMediaItem[]) {
  return MEDIA_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: items.filter((item) => item.status === status).length,
    }),
    {} as Record<MediaStatus, number>,
  );
}

export async function getImageAspectRatio(
  file: File,
): Promise<MediaAspectRatio | null> {
  const url = URL.createObjectURL(file);
  try {
    const image = document.createElement("img");
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not read image dimensions."));
    });
    image.src = url;
    const loadedImage = await loaded;
    const ratio = loadedImage.naturalWidth / loadedImage.naturalHeight;
    if (ratio > 1.2) return "landscape";
    if (ratio < 0.85) return "portrait";
    return "square";
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatBytes(size: number) {
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(size / 1024)} KB`;
}
