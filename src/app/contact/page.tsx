import { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { getPublicMediaPlacementsWithFallback } from "@/lib/media/server";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Inquire | Iffer's Pictures | Bergen County NJ",
  description: `Get in touch with ${SITE_CONFIG.name} for photography sessions in ${BUSINESS_INFO.address.city}, NJ. Event, family, maternity, couples, and portrait sessions.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default async function ContactPage() {
  const placementsResponse = await getPublicMediaPlacementsWithFallback();

  return <ContactPageContent placements={placementsResponse.placements} />;
}
