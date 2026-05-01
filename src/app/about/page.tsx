import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { AboutPageContent } from "@/components/features/about";
import { PersonSchema } from "@/components/seo/PersonSchema";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

export const metadata: Metadata = {
  title: "About Jennifer | Iffer's Pictures | Bergen County Photographer",
  description:
    "Meet Jennifer, the photographer behind Iffer's Pictures. Based in Cliffside Park, NJ, she specializes in event and family photography across Bergen County and Northern New Jersey.",
  keywords: [
    "Jennifer Matone photographer",
    "Iffer's Pictures about",
    "Bergen County photographer",
    "Cliffside Park NJ photographer",
    "event photographer NJ",
    "family photographer Bergen County",
  ],
  openGraph: {
    title: "About Jennifer | Iffer's Pictures",
    description:
      "Meet Jennifer, the photographer behind Iffer's Pictures. Specializing in event and family photography across Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/about`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "About Jennifer | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jennifer | Iffer's Pictures",
    description:
      "Meet Jennifer, the photographer behind Iffer's Pictures. Specializing in event and family photography across Bergen County, NJ.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

interface AboutPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return (
    <>
      <PersonSchema />
      <AboutPageContent initialLayoutVariantId={initialLayoutVariantId} />
    </>
  );
}
