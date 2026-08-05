import type { ImageProps } from "next/image";

/**
 * The source files are large, high-resolution photography exports. Quality 65
 * keeps fine detail while materially reducing cold-load transfer size.
 */
export const PUBLIC_PHOTO_QUALITY = 65;

/** A tiny neutral preview avoids an empty flash during a first remote fetch. */
export const PUBLIC_PHOTO_PLACEHOLDER = {
  placeholder: "blur",
  blurDataURL:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Crect width='8' height='5' fill='%23eef3f6'/%3E%3C/svg%3E",
} satisfies Pick<ImageProps, "placeholder" | "blurDataURL">;
