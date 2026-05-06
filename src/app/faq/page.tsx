import type { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO, SERVICES } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { generalFaqs } from "./faqData";
import { serviceDataMap } from "@/data/services";
import type { FAQItem } from "@/data/services/types";
import { FAQPageContent } from "./FAQPageContent";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${SITE_CONFIG.name} photography services in ${BUSINESS_INFO.address.city}, NJ. Learn about booking, pricing, photo delivery, and more.`,
  openGraph: {
    title: `FAQ | ${SITE_CONFIG.name}`,
    description: `Common questions about booking a photography session with ${SITE_CONFIG.name} in Bergen County, NJ.`,
    url: `${SITE_CONFIG.url}/faq`,
  },
};

/** Collect service FAQs paired with their display name and slug. */
function getServiceFAQSections() {
  return SERVICES.map((svc) => {
    const data = serviceDataMap[svc.slug];
    return {
      name: svc.name,
      slug: svc.slug,
      faqs: data?.faq.items ?? [],
    };
  }).filter((s) => s.faqs.length > 0);
}

/** Build all FAQ items for schema markup (general + all service-specific). */
function getAllFAQItems(): FAQItem[] {
  const serviceSections = getServiceFAQSections();
  return [
    ...generalFaqs,
    ...serviceSections.flatMap((s) => s.faqs),
  ];
}

function FAQPageSchema() {
  const allFaqs = getAllFAQItems();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return (
    <>
      <FAQPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ" },
        ]}
      />

      <FAQPageContent initialLayoutVariantId={initialLayoutVariantId} />
    </>
  );
}
