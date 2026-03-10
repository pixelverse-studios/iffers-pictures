import type { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { FAQContent } from "./FAQContent";
import { generalFaqs } from "./faqData";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${SITE_CONFIG.name} photography services in ${BUSINESS_INFO.address.city}, NJ. Learn about booking, pricing, photo delivery, and more.`,
  openGraph: {
    title: `FAQ | ${SITE_CONFIG.name}`,
    description: `Common questions about booking a photography session with ${SITE_CONFIG.name} in Bergen County, NJ.`,
    url: `${SITE_CONFIG.url}/faq`,
  },
};

function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq) => ({
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

export default function FAQPage() {
  return (
    <>
      <FAQPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ" },
        ]}
      />
      <FAQContent />
    </>
  );
}
