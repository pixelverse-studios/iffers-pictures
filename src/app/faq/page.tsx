import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, BUSINESS_INFO, SERVICES } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { generalFaqs } from "./faqData";
import { serviceDataMap } from "@/data/services";
import type { FAQItem } from "@/data/services/types";
import { FAQ_PAGE_COPY } from "@/data/page-copy";

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

export default function FAQPage() {
  const serviceSections = getServiceFAQSections();

  return (
    <>
      <FAQPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ" },
        ]}
      />

      {/* Hero */}
      <section className="pt-hero pb-12 md:pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--brand)] mb-4">
              {FAQ_PAGE_COPY.hero.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-4">
              {FAQ_PAGE_COPY.hero.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {FAQ_PAGE_COPY.hero.introLead} {SITE_CONFIG.name}.{" "}
              {FAQ_PAGE_COPY.hero.contactPrompt}{" "}
              <Link
                href={FAQ_PAGE_COPY.hero.contactHref}
                className="text-[var(--brand)] hover:text-[var(--brand-strong)] underline underline-offset-4"
              >
                {FAQ_PAGE_COPY.hero.contactLabel}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-10 md:py-14">
        <div className="container">
          <SectionHeader
            eyebrow={FAQ_PAGE_COPY.general.eyebrow}
            title={FAQ_PAGE_COPY.general.title}
            description={FAQ_PAGE_COPY.general.description}
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion faqs={generalFaqs} idPrefix="general" />
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs — inline accordions */}
      {serviceSections.map((section) => (
        <section
          key={section.slug}
          className="py-10 md:py-14 odd:bg-[var(--background-warm)]"
        >
          <div className="container">
            <SectionHeader
              eyebrow={section.name}
              title={`${section.name} Questions`}
            />

            <div className="mt-12 max-w-3xl mx-auto">
              <FAQAccordion
                faqs={section.faqs}
                idPrefix={`svc-${section.slug}`}
              />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-semibold text-[var(--foreground)] mb-4">
              {FAQ_PAGE_COPY.cta.title}
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              {FAQ_PAGE_COPY.cta.description}
            </p>
            <Link href={FAQ_PAGE_COPY.cta.href}>
              <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                {FAQ_PAGE_COPY.cta.label}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
