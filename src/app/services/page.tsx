import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { ServicesHubSchema } from "@/components/features/services-hub";
import { BreadcrumbSchema } from "@/components/features/services";
import { SessionsPageContent } from "@/components/features/sessions-hub";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

export const metadata: Metadata = {
  title: "Sessions | Iffer's Pictures | Bergen County NJ",
  description:
    "Photography sessions in Bergen County, NJ. Event photography, family portraits, maternity, couples & engagement, and professional portraits. Serving Cliffside Park, Fort Lee & Northern NJ.",
  keywords: [
    "event photographer Bergen County NJ",
    "family photographer Northern NJ",
    "maternity photography Bergen County",
    "couples photographer NJ",
    "portrait photographer Cliffside Park NJ",
    "photographer Fort Lee NJ",
    "Bergen County NJ photographer",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/services`,
  },
  openGraph: {
    title: "Sessions | Iffer's Pictures",
    description:
      "Thoughtfully capturing life's most meaningful moments. Event, family, maternity, couples, and portrait sessions in Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/services`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Photography Sessions | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sessions | Iffer's Pictures",
    description:
      "Thoughtfully capturing life's most meaningful moments. Event, family, maternity, couples, and portrait sessions in Bergen County, NJ.",
  },
};

interface SessionsPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function SessionsPage({ searchParams }: SessionsPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return (
    <>
      <ServicesHubSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Sessions" },
        ]}
      />

      <SessionsPageContent initialLayoutVariantId={initialLayoutVariantId} />
    </>
  );
}
