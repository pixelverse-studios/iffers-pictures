/**
 * Temporary site-wide layout comparison model for DEV-798.
 *
 * This exists only for the client presentation phase. After the client
 * chooses a final layout, remove this file with the losing layout branch.
 */
export type LayoutVariantId = "current" | "board";

export interface LayoutVariant {
  id: LayoutVariantId;
  label: string;
  shortLabel: string;
  description: string;
}

export const DEFAULT_LAYOUT_VARIANT_ID: LayoutVariantId = "current";
export const LAYOUT_VARIANT_STORAGE_KEY = "iffers-layout-variant";
export const LAYOUT_VARIANT_QUERY_KEY = "layout";

export const LAYOUT_VARIANTS: Record<LayoutVariantId, LayoutVariant> = {
  current: {
    id: "current",
    label: "Current Layout",
    shortLabel: "Current",
    description: "Existing approved site direction",
  },
  board: {
    id: "board",
    label: "New Design",
    shortLabel: "New",
    description: "Design board presentation direction",
  },
};

export const LAYOUT_VARIANT_ORDER: LayoutVariantId[] = ["current", "board"];

export type LayoutVariantSearchParams = Record<
  string,
  string | string[] | undefined
>;

export function isLayoutVariantId(value: unknown): value is LayoutVariantId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(LAYOUT_VARIANTS, value)
  );
}

export function getLayoutVariantFromSearchParams(
  searchParams?: LayoutVariantSearchParams
): LayoutVariantId {
  const value = searchParams?.[LAYOUT_VARIANT_QUERY_KEY];
  const candidate = Array.isArray(value) ? value[0] : value;

  return isLayoutVariantId(candidate) ? candidate : DEFAULT_LAYOUT_VARIANT_ID;
}
