"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { EditorialLayout } from "./layouts/EditorialLayout";
import { BoardInvestmentLayout } from "./BoardInvestmentLayout";
import { INVESTMENT_PAGE_COPY } from "@/data/page-copy";

interface InvestmentContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

function CurrentInvestmentContent() {
  return (
    <>
      <EditorialLayout />

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-4 leading-relaxed">
            {INVESTMENT_PAGE_COPY.cta.title}
          </p>
          <p className="text-[var(--text-secondary)] mb-10">
            {INVESTMENT_PAGE_COPY.cta.description}
          </p>
          <Link
            href={INVESTMENT_PAGE_COPY.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-base hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-md shadow-[var(--brand-vivid)]/20 hover:shadow-lg"
          >
            {INVESTMENT_PAGE_COPY.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}

export function InvestmentContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: InvestmentContentProps) {
  const searchParams = useSearchParams();
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  useEffect(() => {
    const focus = searchParams.get("focus");
    if (!focus) return;

    // Wait for page to fully render/images to load, then scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(`session-${focus}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Clean the URL after scrolling starts
        window.history.replaceState(null, "", "/investment");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return shouldRenderBoard ? <BoardInvestmentLayout /> : <CurrentInvestmentContent />;
}
