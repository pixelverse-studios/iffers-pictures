import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  ServicesHubHero,
  ServicesGrid,
  WhyChooseUs,
  ServiceAreasSection,
  ServicesHubFAQ,
  ServicesHubCTA,
  ServicesHubSchema,
} from "@/components/features/services-hub";

export const metadata: Metadata = {
  title: "Photography Services | Iffer's Pictures | Bergen County NJ",
  description:
    "Professional photography services in Bergen County, NJ. Event photography, family portraits, milestone celebrations, professional headshots & maternity. Serving Cliffside Park, Fort Lee & Northern NJ.",
  keywords: [
    "event photographer Bergen County NJ",
    "family photographer Northern NJ",
    "milestone photography Bergen County NJ",
    "professional headshots NJ",
    "maternity photography Bergen County",
    "portrait photography Cliffside Park NJ",
    "photographer Fort Lee NJ",
    "Bergen County NJ photographer",
  ],
  openGraph: {
    title: "Photography Services | Iffer's Pictures",
    description:
      "Professional event photography, family portraits, milestone celebrations, headshots & maternity in Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/services`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Event & Portrait Photography Services | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photography Services | Iffer's Pictures",
    description:
      "Professional event photography, family portraits, milestone celebrations, headshots & maternity in Bergen County, NJ.",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Schema markup */}
      <ServicesHubSchema />

      {/* Page sections */}
      <ServicesHubHero />
      <ServicesGrid />
      <WhyChooseUs />
      <ServiceAreasSection />
      <ServicesHubFAQ />
      <ServicesHubCTA />
    </>
  );
}
