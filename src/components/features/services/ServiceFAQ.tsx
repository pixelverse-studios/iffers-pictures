"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FAQData } from "@/data/services/types";

interface ServiceFAQProps {
  data: FAQData;
}

export function ServiceFAQ({ data }: ServiceFAQProps) {
  return (
    <section id="faq" className="section bg-white">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
        />

        <div className="mt-16 max-w-3xl mx-auto">
          <FAQAccordion faqs={data.items} idPrefix="service-faq" />
        </div>
      </div>
    </section>
  );
}
