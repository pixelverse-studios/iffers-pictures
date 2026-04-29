"use client";

import { Quote } from "lucide-react";
import { AnimatedCounter } from "@/components/landing-variations/shared/AnimatedCounter";
import { ABOUT_PAGE_COPY } from "@/data/page-copy";

export function AboutBio() {
  return (
    <>
      {/* Bio section — editorial feature layout */}
      <section className="py-12 md:py-16 bg-[var(--background-warm)]">
        <div className="container">

          {/* Single-column body — centered */}
          <div className="max-w-4xl mx-auto space-y-8">
            {ABOUT_PAGE_COPY.bio.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0 || index === ABOUT_PAGE_COPY.bio.paragraphs.length - 1
                    ? "text-[var(--foreground)] text-xl md:text-2xl font-semibold leading-[1.55]"
                    : "text-[var(--foreground)] text-lg md:text-xl leading-[1.75]"
                }
              >
                {paragraph}
              </p>
            ))}
            <div className="space-y-3 pt-1">
              {ABOUT_PAGE_COPY.bio.signoff.map((line) => (
                <p
                  key={line}
                  className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="pt-0 pb-12 md:pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
            {ABOUT_PAGE_COPY.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--brand)] mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[var(--text-secondary)] text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / Philosophy */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--brand)] font-medium tracking-wide uppercase text-sm mb-8">
              {ABOUT_PAGE_COPY.approach.eyebrow}
            </p>

            <div className="relative">
              <Quote className="w-10 h-10 text-[var(--brand)]/15 mx-auto mb-4" />
              <blockquote className="text-2xl md:text-3xl font-heading text-[var(--foreground)] leading-snug italic">
                {ABOUT_PAGE_COPY.approach.quote}
              </blockquote>
              <div className="mt-8 flex justify-center">
                <div className="h-0.5 w-12 bg-[var(--brand)] rounded-full" />
              </div>
              <p className="mt-4 text-[var(--text-muted)] text-sm">
                {ABOUT_PAGE_COPY.approach.attribution}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
