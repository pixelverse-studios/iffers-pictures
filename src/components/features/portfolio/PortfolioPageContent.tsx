"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { PORTFOLIO_PAGE_COPY } from "@/data/page-copy";
import { CategorySplit } from "./portfolio-layouts/CategorySplit";
import { BoardPortfolioLayout } from "./BoardPortfolioLayout";

function PortfolioCurrentLayout() {
  return (
    <>
      <section
        className="bg-[var(--background-warm)] pb-12 md:pb-16"
        style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
      >
        <div className="container">
          <div className="mb-8 flex items-center gap-4">
            <p className="shrink-0 text-xs font-medium uppercase tracking-[0.3em] text-[var(--brand)]">
              {PORTFOLIO_PAGE_COPY.hero.eyebrow}
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--brand)]/30 to-transparent" />
          </div>

          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <h1 className="font-heading text-5xl leading-[1.0] text-[var(--foreground)] sm:text-6xl">
                {PORTFOLIO_PAGE_COPY.hero.titleLead}
                <br />
                <span className="text-[var(--brand)]">
                  {PORTFOLIO_PAGE_COPY.hero.titleAccent}
                </span>
              </h1>
            </div>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-[var(--text-secondary)]">
                {PORTFOLIO_PAGE_COPY.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-12 md:py-16">
        <div className="container">
          <CategorySplit />
        </div>
      </section>

      <section className="bg-[var(--background-warm)] py-10 md:py-14">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand)]">
              {PORTFOLIO_PAGE_COPY.cta.eyebrow}
            </p>
            <h2 className="mb-4 font-heading text-3xl text-[var(--foreground)] md:text-4xl">
              {PORTFOLIO_PAGE_COPY.cta.titleLead}
              <br />
              {PORTFOLIO_PAGE_COPY.cta.titleSecondLine}
            </h2>
            <p className="mx-auto mb-10 max-w-md text-lg text-[var(--text-secondary)]">
              {PORTFOLIO_PAGE_COPY.cta.description}
            </p>
            <Link
              href={PORTFOLIO_PAGE_COPY.cta.href}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--brand-vivid)] px-10 py-5 text-lg font-medium text-white shadow-lg shadow-[var(--brand-vivid)]/25 transition-all duration-300 hover:gap-4 hover:bg-[var(--brand-strong)] hover:shadow-xl hover:shadow-[var(--brand-vivid)]/30"
            >
              {PORTFOLIO_PAGE_COPY.cta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface PortfolioPageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function PortfolioPageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: PortfolioPageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? <BoardPortfolioLayout /> : <PortfolioCurrentLayout />;
}
