import {
  DEFAULT_MEDIA_CROP_POSITION,
  MEDIA_CROP_POSITIONS,
  type MediaCropPosition,
} from "./types";

type MediaCropPositionSource = {
  cropPosition?: string | null;
  crop_position?: string | null;
};

export function getMediaCropPosition(
  item: MediaCropPositionSource | null | undefined
): MediaCropPosition {
  const value = item?.cropPosition ?? item?.crop_position;

  return MEDIA_CROP_POSITIONS.includes(value as MediaCropPosition)
    ? (value as MediaCropPosition)
    : DEFAULT_MEDIA_CROP_POSITION;
}
