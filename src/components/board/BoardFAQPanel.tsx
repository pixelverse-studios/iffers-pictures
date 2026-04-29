"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BoardFAQItem {
  question: string;
  answer: string;
}

interface BoardFAQPanelProps {
  items: BoardFAQItem[];
  idPrefix?: string;
  className?: string;
}

export function BoardFAQPanel({
  items,
  idPrefix = "board-faq",
  className,
}: BoardFAQPanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("border border-[var(--border)] bg-[var(--surface)]", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `${idPrefix}-answer-${index}`;

        return (
          <div
            key={`${item.question}-${index}`}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left transition-colors duration-200 hover:bg-[var(--background-warm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]"
            >
              <span className="text-sm font-semibold text-[var(--foreground)] md:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--brand)] transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              id={answerId}
              role="region"
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-[var(--text-secondary)]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
