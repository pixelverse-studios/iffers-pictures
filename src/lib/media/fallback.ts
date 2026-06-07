import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";
import {
  IFFERS_MEDIA_WEBSITE_SLUG,
  type MediaCatalog,
  type PublicMediaPlacementsResponse,
  type PublicMediaItem,
} from "./types";

const STATIC_R2_PUBLIC_BASE_URL =
  "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export const STATIC_PUBLIC_MEDIA_CATALOG: MediaCatalog<PublicMediaItem> = {
  version: 1,
  publicBaseUrl: STATIC_R2_PUBLIC_BASE_URL,
  bucket: IFFERS_MEDIA_WEBSITE_SLUG,
  items: PORTFOLIO_ITEMS.map((item, index) => {
    const urlPrefix = `${STATIC_R2_PUBLIC_BASE_URL.replace(/\/$/, "")}/`;
    const key = item.src.startsWith(urlPrefix)
      ? item.src.slice(urlPrefix.length)
      : item.src;
    const filename = key.split("/").pop() ?? key;

    return {
      ...item,
      key,
      filename,
      status: "published",
      sortOrder: index,
    };
  }),
};

export const STATIC_PUBLIC_MEDIA_PLACEMENTS: PublicMediaPlacementsResponse = {
  version: 1,
  publicBaseUrl: STATIC_R2_PUBLIC_BASE_URL,
  placements: [],
};
