import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { generalFaqs } from "@/app/faq/faqData";

interface ServicesHubFAQProps {
  className?: string;
}

export function ServicesHubFAQ({ className }: ServicesHubFAQProps) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with us"
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <FAQAccordion faqs={generalFaqs} idPrefix="hub-faq" />
        </div>
      </div>
    </section>
  );
}
