"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQData } from "@/data/services/types";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface ServiceFAQProps {
  data: FAQData;
}

export function ServiceFAQ({ data }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
        />

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="space-y-4">
            {data.items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "border border-[var(--border)] rounded-xl overflow-hidden",
                  "transition-all duration-300",
                  openIndex === index && "shadow-md"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 text-left",
                    "hover:bg-[var(--background-warm)] transition-colors",
                    openIndex === index && "bg-[var(--background-warm)]"
                  )}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-[var(--foreground)] pr-4">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[var(--teal)]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[var(--text-secondary)]" />
                    )}
                  </span>
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
