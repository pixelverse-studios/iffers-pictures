import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { EventsHubHero, EventsHubSchema } from "@/components/features/events-hub";
import { EventsHubContent } from "@/components/features/events-hub/EventsHubContent";
import { BreadcrumbSchema } from "@/components/features/services";

export const metadata: Metadata = {
  title: "Event Photography | Iffer's Pictures | Bergen County NJ",
  description:
    "Professional event photography in Bergen County, NJ. Baby showers, bridal showers, engagements, proposals, parties, religious ceremonies, and milestone celebrations. Candid, documentary-style coverage.",
  keywords: [
    "event photographer Bergen County NJ",
    "baby shower photographer NJ",
    "bridal shower photographer Bergen County",
    "engagement photographer Northern NJ",
    "party photographer Cliffside Park NJ",
    "baptism photographer Bergen County NJ",
    "milestone event photographer NJ",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/services/events`,
  },
  openGraph: {
    title: "Event Photography | Iffer's Pictures",
    description:
      "Professional event photography for every celebration in Bergen County, NJ. Candid, documentary-style coverage with fast turnaround.",
    type: "website",
    url: `${SITE_CONFIG.url}/services/events`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Event Photography Services | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Photography | Iffer's Pictures",
    description:
      "Professional event photography for every celebration in Bergen County, NJ.",
  },
};

export default function EventsHubPage() {
  return (
    <>
      <EventsHubSchema />
      <BreadcrumbSchema items={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Events" },
      ]} />
      <EventsHubHero />
      <EventsHubContent />
    </>
  );
}
