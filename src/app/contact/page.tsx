import { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { ContactPageContent } from "./ContactPageContent";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

export const metadata: Metadata = {
  title: "Inquire | Iffer's Pictures | Bergen County NJ",
  description: `Get in touch with ${SITE_CONFIG.name} for photography sessions in ${BUSINESS_INFO.address.city}, NJ. Event, family, maternity, couples, and portrait sessions.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

interface ContactPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return <ContactPageContent initialLayoutVariantId={initialLayoutVariantId} />;
}
