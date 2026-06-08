import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { PortfolioPageContent } from "@/components/features/portfolio/PortfolioPageContent";
import {
  getPublicMediaCatalogWithFallback,
  getPublicMediaPlacementsWithFallback,
} from "@/lib/media/server";
import { toPublicGalleryItems } from "@/lib/media/gallery";

export const metadata: Metadata = {
  title: "Portfolio | Iffer's Pictures | Bergen County Photographer",
  description:
    "Browse the portfolio of Iffer's Pictures — event photography, family portraits, milestone celebrations, maternity, and professional headshots across Bergen County, NJ.",
  keywords: [
    "photographer portfolio Bergen County",
    "event photography NJ portfolio",
    "family photography samples",
    "maternity photography Bergen County",
    "Cliffside Park photographer portfolio",
  ],
  openGraph: {
    title: "Portfolio | Iffer's Pictures",
    description:
      "Browse Jennifer's photography portfolio — events, family, milestones, maternity, and headshots across Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/portfolio`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Portfolio | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Iffer's Pictures",
    description:
      "Browse Jennifer's photography portfolio — events, family, milestones, maternity, and headshots across Bergen County, NJ.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/portfolio`,
  },
};

export default async function PortfolioPage() {
  const [catalog, placementsResponse] = await Promise.all([
    getPublicMediaCatalogWithFallback(),
    getPublicMediaPlacementsWithFallback(),
  ]);
  const mediaItems = toPublicGalleryItems(catalog.items);

  return (
    <PortfolioPageContent
      mediaItems={mediaItems}
      placements={placementsResponse.placements}
    />
  );
}
