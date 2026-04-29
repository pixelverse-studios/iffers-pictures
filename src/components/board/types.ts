import type { StaticImageData } from "next/image";

export type BoardImageSource = string | StaticImageData;

export interface BoardImageAsset {
  src: BoardImageSource;
  alt: string;
}

export interface BoardAction {
  label: string;
  href: string;
}

export interface BoardEyebrow {
  label: string;
  className?: string;
}
