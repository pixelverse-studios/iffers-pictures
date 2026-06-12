import {
  MEDIA_SERVICES,
  MEDIA_SUB_CATEGORIES,
  type MediaService,
  type MediaSiteCategory,
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
    "That file path is already in use.",
  "media.duplicate_key": "That image file path is already in use.",
  "media.published_location_locked": "Published media cannot be moved or renamed.",
  "media.archived_locked": "Restore this item before editing its details.",
  "media.missing_alt_text": "Add an image description before publishing.",
  "media.missing_service": "Choose a service before publishing.",
  "media.missing_sub_category": "Choose a photo type before publishing.",
  "media.missing_site_category": "Choose a site image category before publishing.",
  "media.missing_aspect_ratio": "Choose an aspect ratio before publishing.",
  "media.invalid_library": "Choose Portfolio or Site Images.",
  "media.invalid_site_category": "Choose a supported site image category.",
  "media.invalid_service": "Choose a supported service.",
  "media.invalid_sub_category": "Choose a photo type that belongs to the selected service.",
  "media.invalid_content_type": "Upload JPEG, PNG, or WebP files only.",
  "media.file_too_large": "This image is too large for upload.",
  "media.destination_key_required": "Enter a new file path before moving this draft.",
  "media.invalid_status_transition": "That status change is not allowed.",
  "media.invalid_placement_slot": "Choose a supported page image spot.",
  "media.archived_assignment_forbidden":
    "Archived images cannot be assigned to a page.",
  "media.placement_media_archived":
    "Archived images cannot be assigned to a page.",
  "media.unpublished_assignment_forbidden":
    "Publish this image before assigning it to a page.",
  "media.placement_media_not_published":
    "Publish this image before assigning it to a page.",
  "media.not_found": "That image could not be found. Refresh the image library and try again.",
  "media.website_not_found": "That media website could not be found.",
  "media.r2_not_configured": "Image storage is not set up. Contact support.",
  "media.gateway_timeout":
    "The image request timed out. Try again in a moment.",
  "media.gateway_unavailable":
    "The image service is temporarily unavailable. Try again in a moment.",
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

export function getFolderForSiteCategory(siteCategory: MediaSiteCategory) {
  return `site/${siteCategory.toLowerCase()}`;
}

export const CATEGORY_OPTIONS = MEDIA_SERVICES.flatMap((service) =>
  MEDIA_SUB_CATEGORIES[service].map((subCategory) => ({
    label: subCategory,
    service,
    subCategory,
    folder: getFolderForCategory(service, subCategory),
  })),
);
