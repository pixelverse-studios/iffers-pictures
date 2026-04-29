"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EditorialLayout } from "./layouts/EditorialLayout";
import { INVESTMENT_PAGE_COPY } from "@/data/page-copy";

export function InvestmentContent() {
  const searchParams = useSearchParams();

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

  return (
    <>
      <EditorialLayout />

      {/* CTA — shared across all layouts */}
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
