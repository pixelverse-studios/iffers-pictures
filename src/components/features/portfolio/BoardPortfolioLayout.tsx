"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PORTFOLIO_ITEMS,
  SERVICES,
  type PortfolioItem,
  type ServiceFilter,
} from "./portfolioData";
import { Lightbox } from "./Lightbox";
import { PORTFOLIO_PAGE_COPY } from "@/data/page-copy";

type PortfolioBoardFilter = "All" | ServiceFilter;

const tabLabels: PortfolioBoardFilter[] = ["All", ...SERVICES];

function getBoardItems(filter: PortfolioBoardFilter): PortfolioItem[] {
  return filter === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.service === filter);
}

export function BoardPortfolioLayout() {
  const [activeFilter, setActiveFilter] = useState<PortfolioBoardFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = useMemo(() => getBoardItems(activeFilter), [activeFilter]);

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="mx-auto max-w-[1180px] px-5 pb-10 pt-14 md:px-8 md:pb-12 md:pt-20">
        <div className="max-w-[920px]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[var(--brand-strong)]">
            {PORTFOLIO_PAGE_COPY.hero.eyebrow}
          </p>
          <h1 className="max-w-[820px] font-heading text-5xl font-semibold leading-[1.05] text-[var(--foreground)] sm:text-6xl md:text-7xl">
            Stories
            <br />
            <span className="block md:inline">I&apos;ve had the honor to tell</span>
          </h1>
          <div
            className="mt-7 h-5 w-44 bg-[var(--brand-strong)] opacity-70"
            style={{
              clipPath:
                "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
            }}
            aria-hidden
          />
          <p className="mt-7 max-w-[520px] text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
            {PORTFOLIO_PAGE_COPY.hero.description}
          </p>
        </div>

      </section>

      <section className="mx-auto max-w-[1180px] bg-white">
        <div
          className="sticky top-16 z-20 flex gap-8 overflow-x-auto bg-[var(--background)] px-5 pb-5 pt-2 shadow-[0_12px_24px_rgba(250,251,253,0.92)] md:top-[72px] md:px-8"
          role="tablist"
          aria-label="Portfolio categories"
          style={{ scrollbarWidth: "none" }}
        >
          {tabLabels.map((label) => {
            const isActive = activeFilter === label;

            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(label)}
                className={[
                  "shrink-0 border-b-2 px-0 pb-4 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4",
                  isActive
                    ? "border-[var(--brand-strong)] text-[var(--brand-strong)]"
                    : "border-transparent text-[var(--text-muted)] hover:border-[var(--brand-soft)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div
          key={activeFilter}
          className="grid grid-cols-2 gap-px border-y border-white bg-white md:border-[var(--border)] sm:grid-cols-3"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={[
                "group relative min-h-0 overflow-hidden bg-[var(--background-warm)] text-left",
                "aspect-[4/5] sm:aspect-[1/1]",
                index % 13 === 4 ? "sm:row-span-2 sm:aspect-auto" : "",
              ].join(" ")}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 bg-[var(--foreground)]/0 transition-colors duration-300 group-hover:bg-[var(--foreground)]/12" />
              <span className="absolute bottom-3 left-3 rounded-sm bg-white/82 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand-strong)] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                {item.subCategory}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-start justify-between gap-7 bg-[var(--background-warm)] px-7 py-8 md:flex-row md:items-center md:px-12">
          <div className="max-w-[560px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
              {PORTFOLIO_PAGE_COPY.cta.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-[var(--brand-strong)] md:text-3xl">
              {PORTFOLIO_PAGE_COPY.cta.titleLead}
              <br />
              {PORTFOLIO_PAGE_COPY.cta.titleSecondLine}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] md:text-base">
              {PORTFOLIO_PAGE_COPY.cta.description}
            </p>
          </div>
          <Link
            href={PORTFOLIO_PAGE_COPY.cta.href}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[var(--brand)] active:scale-[0.98]"
          >
            {PORTFOLIO_PAGE_COPY.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
