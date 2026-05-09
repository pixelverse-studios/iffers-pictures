import { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Inquire | Iffer's Pictures | Bergen County NJ",
  description: `Get in touch with ${SITE_CONFIG.name} for photography sessions in ${BUSINESS_INFO.address.city}, NJ. Event, family, maternity, couples, and portrait sessions.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
