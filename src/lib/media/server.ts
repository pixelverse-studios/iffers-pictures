import "server-only";

import { parseMediaApiResponse } from "./errors";
import { STATIC_PUBLIC_MEDIA_CATALOG } from "./fallback";
import {
  IFFERS_MEDIA_WEBSITE_SLUG,
  type MediaCatalog,
  type PublicMediaItem,
} from "./types";

const PUBLIC_CATALOG_REVALIDATE_SECONDS = 60;

export function getMediaApiBaseUrl(): string | null {
  const rawBaseUrl =
    process.env.PVS_MEDIA_API_URL ??
    process.env.PVS_API_URL ??
    process.env.PVS_CONTACT_API_URL;

  if (!rawBaseUrl) return null;
  return rawBaseUrl.replace(/\/$/, "");
}

export function buildMediaApiUrl(path: string): string {
  const baseUrl = getMediaApiBaseUrl();

  if (!baseUrl) {
    throw new Error("PVS_MEDIA_API_URL is not configured.");
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getPublicMediaCatalogWithFallback(): Promise<
  MediaCatalog<PublicMediaItem>
> {
  const baseUrl = getMediaApiBaseUrl();

  if (!baseUrl) {
    return STATIC_PUBLIC_MEDIA_CATALOG;
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/media/${IFFERS_MEDIA_WEBSITE_SLUG}/catalog`,
      {
        next: { revalidate: PUBLIC_CATALOG_REVALIDATE_SECONDS },
      }
    );

    return await parseMediaApiResponse<MediaCatalog<PublicMediaItem>>(response);
  } catch {
    return STATIC_PUBLIC_MEDIA_CATALOG;
  }
}
