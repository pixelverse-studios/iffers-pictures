import type { StaticImageData } from "next/image";
import type { MediaCropPosition } from "@/lib/media/types";

export type BoardImageSource = string | StaticImageData;

export interface BoardImageAsset {
  src: BoardImageSource;
  alt: string;
  cropPosition?: MediaCropPosition | string;
}

export interface BoardAction {
  label: string;
  href: string;
}

export interface BoardEyebrow {
  label: string;
  className?: string;
}
