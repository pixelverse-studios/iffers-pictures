import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { PortfolioPageContent } from "@/components/features/portfolio/PortfolioPageContent";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

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

interface PortfolioPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return <PortfolioPageContent initialLayoutVariantId={initialLayoutVariantId} />;
}
