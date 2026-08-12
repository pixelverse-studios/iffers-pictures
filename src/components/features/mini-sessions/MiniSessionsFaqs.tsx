import { ChevronDown } from "lucide-react";
import type { MiniSessionFaqItem } from "@/lib/mini-sessions/faqs";

interface MiniSessionsFaqsProps {
  faqs: MiniSessionFaqItem[];
}

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function MiniSessionsFaqs({ faqs }: MiniSessionsFaqsProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="mini-sessions-faq-heading"
      className="border-t border-[var(--border)] bg-[var(--background-warm)] py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">
            Good to know
          </p>
          <h2
            id="mini-sessions-faq-heading"
            className="mt-4 max-w-[10ch] font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl"
          >
            Autumn session questions.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-[var(--text-secondary)]">
            Everything you need to arrive prepared and enjoy a relaxed,
            beautiful session.
          </p>
        </div>

        <div className="border-t border-[var(--border)]">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border-b border-[var(--border)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background-warm)] [&::-webkit-details-marker]:hidden">
                <span className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-xs font-bold tabular-nums tracking-[0.12em] text-[var(--brand-strong)]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-xl font-semibold leading-snug text-[var(--foreground)] md:text-2xl">
                    {faq.question}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-strong)] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="space-y-4 pb-7 pl-10 pr-10 text-base leading-8 text-[var(--text-secondary)] md:pr-16">
                {splitParagraphs(faq.answer).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
