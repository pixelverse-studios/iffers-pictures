"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { FAQ_PAGE_COPY } from "@/data/page-copy";
import { serviceDataMap } from "@/data/services";
import type { FAQItem } from "@/data/services/types";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";
import { trackCtaClick, trackEvent } from "@/lib/analytics";
import { generalFaqs } from "./faqData";

interface FAQSection {
  name: string;
  slug: string;
  faqs: FAQItem[];
}

function getServiceFAQSections(): FAQSection[] {
  return SERVICES.map((svc) => {
    const data = serviceDataMap[svc.slug];
    return {
      name: svc.name,
      slug: svc.slug,
      faqs: data?.faq.items ?? [],
    };
  }).filter((section) => section.faqs.length > 0);
}

function BoardFAQItem({
  faq,
  index,
  active,
  onToggle,
  idPrefix,
}: {
  faq: FAQItem;
  index: number;
  active: boolean;
  onToggle: () => void;
  idPrefix: string;
}) {
  return (
    <article className="border border-[var(--border)] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        aria-controls={`${idPrefix}-answer-${index}`}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left md:px-7"
      >
        <span
          className={cn(
            "font-heading text-xl font-semibold leading-snug transition-colors duration-200",
            active
              ? "text-[var(--brand-strong)]"
              : "text-[var(--foreground)] group-hover:text-[var(--brand-strong)]"
          )}
        >
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[var(--brand-strong)] transition-transform duration-300",
            active && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      <div
        id={`${idPrefix}-answer-${index}`}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-base font-semibold leading-8 text-[var(--text-secondary)] md:px-7">
            {faq.answer}
          </div>
        </div>
      </div>
    </article>
  );
}

function BoardFAQContent({ serviceSections }: { serviceSections: FAQSection[] }) {
  const sections = [
    { name: FAQ_PAGE_COPY.general.eyebrow, slug: "general", faqs: generalFaqs },
    ...serviceSections.map((section) => ({
      ...section,
      name: section.name.replace(" Sessions", ""),
    })),
  ];
  const [activeSectionSlug, setActiveSectionSlug] = useState(sections[0].slug);
  const [openIndex, setOpenIndex] = useState(0);
  const activeSection =
    sections.find((section) => section.slug === activeSectionSlug) ??
    sections[0];
  const ctaImage =
    PORTFOLIO_ITEMS.find((item) => item.id === 99) ?? PORTFOLIO_ITEMS[0];

  function selectSection(slug: string) {
    trackEvent("faq_category_select", { category: slug });
    setActiveSectionSlug(slug);
    setOpenIndex(0);
  }

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="board-shell board-gutter pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="max-w-[780px]">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
            {FAQ_PAGE_COPY.hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] text-[var(--foreground)] sm:text-6xl md:text-7xl">
            {FAQ_PAGE_COPY.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            {FAQ_PAGE_COPY.hero.introLead} {SITE_CONFIG.name}.{" "}
            {FAQ_PAGE_COPY.hero.contactPrompt}{" "}
            <Link
              href={FAQ_PAGE_COPY.hero.contactHref}
              className="font-semibold text-[var(--brand-strong)] underline underline-offset-4"
            >
              {FAQ_PAGE_COPY.hero.contactLabel}
            </Link>
            .
          </p>
          <div
            className="mt-7 h-5 w-44 bg-[var(--brand-strong)] opacity-70"
            style={{
              clipPath:
                "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
            }}
            aria-hidden
          />
        </div>

        <div
          className="mt-12 flex gap-10 overflow-x-auto border-b border-[var(--border)]"
          role="tablist"
          aria-label="FAQ categories"
          style={{ scrollbarWidth: "none" }}
        >
          {sections.map((section) => {
            const isActive = activeSection.slug === section.slug;
            return (
              <button
                key={section.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectSection(section.slug)}
                className={cn(
                  "shrink-0 cursor-pointer border-b-2 px-0 pb-5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300",
                  isActive
                    ? "border-[var(--brand-strong)] text-[var(--brand-strong)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--foreground)]"
                )}
              >
                {section.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="board-shell board-gutter pb-12 md:pb-16">
        <div className="space-y-px">
          {activeSection.faqs.map((faq, index) => (
            <BoardFAQItem
              key={`${activeSection.slug}-${faq.question}`}
              faq={faq}
              index={index}
              idPrefix={`board-${activeSection.slug}`}
              active={openIndex === index}
              onToggle={() => {
                trackEvent("faq_toggle", {
                  faq_category: activeSection.slug,
                  faq_index: index,
                  action: openIndex === index ? "close" : "open",
                });
                setOpenIndex((current) => (current === index ? -1 : index));
              }}
            />
          ))}
        </div>
      </section>

      <section className="board-band bg-[var(--background-warm)]">
        <div className="board-shell board-gutter grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-[300px] flex-col justify-center py-12 md:pr-12">
            <p className="font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl">
              {FAQ_PAGE_COPY.cta.title}
            </p>
            <p className="mt-4 font-heading text-2xl italic leading-snug text-[var(--brand-strong)]/82 md:text-3xl">
              {FAQ_PAGE_COPY.cta.description}
            </p>
            <Link
              href={FAQ_PAGE_COPY.cta.href}
              onClick={() =>
                trackCtaClick({
                  cta_label: FAQ_PAGE_COPY.cta.label,
                  cta_location: "faq_bottom_cta",
                  destination: FAQ_PAGE_COPY.cta.href,
                })
              }
              className="mt-9 inline-flex w-fit items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
            >
              {FAQ_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-[300px] overflow-hidden">
            <Image
              src={ctaImage.src}
              alt={ctaImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export function FAQPageContent() {
  const serviceSections = getServiceFAQSections();
  return <BoardFAQContent serviceSections={serviceSections} />;
}
