"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronDown } from "lucide-react";

interface ServicesHubFAQProps {
  className?: string;
}

const faqs = [
  {
    question: "How far in advance should I book my photography session?",
    answer:
      "We recommend booking 4-8 weeks in advance for most sessions, and 2-3 months for larger events like baby showers or bridal showers. Weekends fill up quickly, especially during spring and fall, so earlier is always better to secure your preferred date.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in Cliffside Park, NJ and serve all of Bergen County including Fort Lee, Edgewater, Palisades Park, North Bergen, Englewood, Tenafly, and surrounding areas. We're happy to travel throughout Northern New Jersey for your event.",
  },
  {
    question: "How long until I receive my photos?",
    answer:
      "Most sessions are delivered within 2-3 weeks via a private online gallery. Larger events may take 3-4 weeks. Rush delivery is available for an additional fee if you need photos sooner.",
  },
  {
    question: "Can I print the photos myself?",
    answer:
      "Yes! All packages include a print release, so you can print your photos anywhere you'd like. We also offer professional printing services through our studio if you want gallery-quality prints, canvases, or albums.",
  },
  {
    question: "What should I wear for my session?",
    answer:
      "We'll send you a detailed style guide after booking with recommendations tailored to your session type. Generally, solid colors in soft, complementary tones photograph beautifully. Avoid busy patterns and logos.",
  },
  {
    question: "What happens if it rains on my outdoor session day?",
    answer:
      "We monitor the weather closely and will reach out if conditions look unfavorable. We can reschedule to another day at no extra charge, or move to an indoor location if you prefer. Light overcast skies actually create beautiful, even lighting!",
  },
];

export function ServicesHubFAQ({ className }: ServicesHubFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with us"
        />

        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 flex items-center justify-between text-left group"
                aria-expanded={openIndex === index}
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
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p className="text-[var(--text-secondary)] leading-relaxed pr-10">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
