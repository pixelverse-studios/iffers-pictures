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
  title: "Event & Portrait Photography Services | Iffer's Pictures | Bergen County NJ",
  description:
    "Professional photography services in Bergen County, NJ. Specializing in engagements, baby showers, bridal showers, family portraits, maternity, headshots & events. Serving Cliffside Park, Fort Lee & Northern NJ.",
  keywords: [
    "event photographer Bergen County NJ",
    "portrait photography Northern NJ",
    "engagement photographer Fort Lee NJ",
    "baby shower photographer Cliffside Park",
    "bridal shower photography Bergen County",
    "family photographer Northern NJ",
    "professional headshots NJ",
    "maternity photography Bergen County",
  ],
  openGraph: {
    title: "Event & Portrait Photography Services | Iffer's Pictures",
    description:
      "Professional photography for engagements, baby showers, bridal showers, family portraits & more in Bergen County, NJ.",
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
    title: "Event & Portrait Photography Services | Iffer's Pictures",
    description:
      "Professional photography for engagements, baby showers, bridal showers, family portraits & more in Bergen County, NJ.",
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
