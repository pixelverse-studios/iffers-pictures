"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { generalFaqs } from "./faqData";

// ─── Component ───────────────────────────────────────────────────────────────

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
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
            {generalFaqs.map((faq, index) => (
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
                  "bg-white border border-[var(--border)]",
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
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-[var(--teal)] text-white",
                "rounded-full px-8 py-3 font-medium",
                "hover:bg-[var(--teal-dark)] transition-colors duration-200",
                "shadow-sm hover:shadow-md"
              )}
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
