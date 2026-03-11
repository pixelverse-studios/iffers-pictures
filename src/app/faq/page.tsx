import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, BUSINESS_INFO, SERVICES } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQAccordion } from "./FAQAccordion";
import { generalFaqs } from "./faqData";
import type { FAQItem } from "./faqData";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${SITE_CONFIG.name} photography services in ${BUSINESS_INFO.address.city}, NJ. Learn about booking, pricing, photo delivery, and more.`,
  openGraph: {
    title: `FAQ | ${SITE_CONFIG.name}`,
    description: `Common questions about booking a photography session with ${SITE_CONFIG.name} in Bergen County, NJ.`,
    url: `${SITE_CONFIG.url}/faq`,
  },
};

interface FAQPageSchemaData {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
}

function FAQPageSchema() {
  const schema: FAQPageSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq: FAQItem) => ({
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

      {/* Hero */}
      <section className="pt-hero pb-12 md:pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--teal)] mb-4">
              Questions & Answers
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Everything you need to know about working with {SITE_CONFIG.name}.
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link
                href="/contact"
                className="text-[var(--teal)] hover:text-[var(--teal-dark)] underline underline-offset-4"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="General"
            title="About Our Photography Sessions"
            description="Common questions about booking, pricing, and what to expect"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion faqs={generalFaqs} />
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="container">
          <SectionHeader
            eyebrow="By Service"
            title="Service-Specific Questions"
            description="Each of our services has its own detailed FAQ section"
          />

          <div className="mt-12 max-w-3xl mx-auto grid gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}#faq`}
                className={cn(
                  "flex items-center justify-between p-5 rounded-xl",
                  "bg-[var(--surface)] border border-[var(--border)]",
                  "hover:border-[var(--teal)] hover:shadow-md",
                  "transition-all duration-200 group"
                )}
              >
                <div>
                  <h3 className="font-heading font-semibold text-[var(--foreground)] group-hover:text-[var(--teal)] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Common questions about {service.shortName.toLowerCase()}{" "}
                    sessions
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--teal)] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-semibold text-[var(--foreground)] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              We&apos;re happy to help! Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
            <Link href="/contact">
              <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
