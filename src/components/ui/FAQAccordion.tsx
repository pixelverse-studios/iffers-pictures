"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/data/services/types";

interface FAQAccordionProps {
  faqs: FAQItem[];
  /** Unique prefix for aria IDs when multiple accordions on one page */
  idPrefix?: string;
}

export function FAQAccordion({ faqs, idPrefix = "faq" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={cn(
              "rounded-xl border transition-all duration-300 ease-out",
              isOpen
                ? "border-[var(--teal)]/30 bg-[var(--teal)]/[0.03] shadow-sm"
                : "border-[var(--border)] bg-transparent hover:border-[var(--teal)]/20"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left group cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-answer-${index}`}
            >
              <span
                className={cn(
                  "text-[1.05rem] leading-snug font-medium pr-6 transition-colors duration-200",
                  isOpen
                    ? "text-[var(--teal-dark)]"
                    : "text-[var(--foreground)] group-hover:text-[var(--teal)]"
                )}
              >
                {faq.question}
              </span>

              <span
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isOpen
                    ? "rotate-180"
                    : ""
                )}
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    isOpen ? "text-[var(--teal)]" : "text-[var(--text-muted)]"
                  )}
                />
              </span>
            </button>

            {/* Smooth height animation via CSS grid trick */}
            <div
              id={`${idPrefix}-answer-${index}`}
              role="region"
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 pt-0">
                  <div className="w-8 h-px bg-[var(--teal)]/20 mb-4" />
                  <p className="text-[var(--text-secondary)] leading-relaxed text-[0.95rem]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
