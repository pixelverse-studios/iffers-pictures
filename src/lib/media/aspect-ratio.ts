import { MEDIA_ASPECT_RATIOS, type MediaAspectRatio } from "./types";

type MediaAspectRatioSource = {
  aspectRatio?: string | null;
  aspect_ratio?: string | null;
};

export function getMediaAspectRatio(
  item: MediaAspectRatioSource | null | undefined
): MediaAspectRatio | null {
  const value = item?.aspectRatio ?? item?.aspect_ratio;

  return MEDIA_ASPECT_RATIOS.includes(value as MediaAspectRatio)
    ? (value as MediaAspectRatio)
    : null;
}

export function getMediaPreviewAspectClass(
  aspectRatio: string | null | undefined
) {
  const normalized = getMediaAspectRatio({ aspectRatio });

  if (normalized === "portrait") return "aspect-[4/5] max-w-[336px]";
  if (normalized === "square") return "aspect-square max-w-[380px]";
  if (normalized === "video") return "aspect-video";
  return "aspect-[4/3]";
}
