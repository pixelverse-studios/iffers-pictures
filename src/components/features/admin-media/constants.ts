import {
  MEDIA_SERVICES,
  MEDIA_SUB_CATEGORIES,
  type MediaService,
  type MediaStatus,
  type MediaSubCategory,
} from "@/lib/media/types";

export const STATUS_COPY: Record<MediaStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export const STATUS_CLASSES: Record<MediaStatus, string> = {
  draft: "bg-amber-50 text-amber-800 ring-amber-200",
  published:
    "bg-[var(--brand-soft)] text-[var(--brand-strong)] ring-[var(--brand-soft)]",
  archived: "bg-red-50 text-red-700 ring-red-100",
};

export const FRIENDLY_ERRORS: Record<string, string> = {
  "media.destination_collision":
    "That destination already has a catalog item or R2 object.",
  "media.duplicate_key": "That media key is already in the catalog.",
  "media.published_location_locked": "Published media cannot be moved or renamed.",
  "media.archived_locked": "Restore this item before editing its details.",
  "media.missing_alt_text": "Add alt text before publishing.",
  "media.missing_service": "Choose a service before publishing.",
  "media.missing_sub_category": "Choose a sub-category before publishing.",
  "media.missing_aspect_ratio": "Choose an aspect ratio before publishing.",
  "media.invalid_service": "Choose a supported service.",
  "media.invalid_sub_category": "Choose a sub-category that belongs to the selected service.",
  "media.invalid_content_type": "Upload JPEG, PNG, or WebP files only.",
  "media.file_too_large": "This image is too large for upload.",
  "media.destination_key_required": "Enter a destination key before moving this draft.",
  "media.invalid_status_transition": "That status change is not allowed.",
  "media.not_found": "That media item could not be found. Refresh the catalog and try again.",
  "media.r2_not_configured": "Media storage is not configured on the server.",
};

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export function getFolderForCategory(
  service: MediaService,
  subCategory: MediaSubCategory,
) {
  if (service === "Family") return "family";
  if (service === "Maternity") return "maternity";
  if (service === "Portrait") return "portraits";
  if (service === "Couples" && subCategory === "Engagement") {
    return "events/engagement";
  }
  if (service === "Couples" && subCategory === "Proposal") {
    return "events/proposal";
  }
  if (service === "Events" && subCategory === "Baby Shower") {
    return "events/baby-shower";
  }
  if (service === "Events" && subCategory === "Bridal Shower") {
    return "events/bridal-shower";
  }
  if (service === "Events" && subCategory === "Gender Reveal") {
    return "events/milestones/gender-reveal";
  }
  if (service === "Events" && subCategory === "Birthday") {
    return "events/parties/birthdays";
  }
  if (service === "Events" && subCategory === "Baptism") {
    return "events/religious-ceremonies/baptism";
  }

  return service.toLowerCase();
}

export const CATEGORY_OPTIONS = MEDIA_SERVICES.flatMap((service) =>
  MEDIA_SUB_CATEGORIES[service].map((subCategory) => ({
    label: subCategory,
    service,
    subCategory,
    folder: getFolderForCategory(service, subCategory),
  })),
);
