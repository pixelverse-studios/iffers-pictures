"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "./faqData";

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-[var(--border)] last:border-b-0"
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="w-full py-5 flex items-center justify-between text-left group"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-lg font-medium text-[var(--foreground)] pr-4 group-hover:text-[var(--teal)] transition-colors">
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-300",
                openIndex === index && "rotate-180 text-[var(--teal)]"
              )}
            />
          </button>

          <div
            id={`faq-answer-${index}`}
            role="region"
            className={cn(
              "overflow-hidden transition-[max-height] duration-300 ease-out",
              openIndex === index ? "max-h-[500px] pb-5" : "max-h-0"
            )}
          >
            <p className="text-[var(--text-secondary)] leading-relaxed pr-10">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
