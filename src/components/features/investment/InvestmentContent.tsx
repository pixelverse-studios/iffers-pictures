"use client";

import { useState } from "react";
import Link from "next/link";
import { useDesignMode } from "@/context/DesignModeContext";
import { LayoutSelector, type InvestmentVariant } from "./LayoutSelector";
import { CardsLayout } from "./layouts/CardsLayout";
import { EditorialLayout } from "./layouts/EditorialLayout";
import { MenuLayout } from "./layouts/MenuLayout";
import { MinimalLayout } from "./layouts/MinimalLayout";
import { NarrativeLayout } from "./layouts/NarrativeLayout";

export function InvestmentContent() {
  const [layout, setLayout] = useState<InvestmentVariant>("cards");
  const { mode } = useDesignMode();

  const isInspired = mode === "inspired";

  return (
    <>
      {/* Layout selector — only visible in "current" mode */}
      {!isInspired && <LayoutSelector current={layout} onChange={setLayout} />}

      {isInspired ? (
        <NarrativeLayout />
      ) : (
        <>
          {layout === "cards" && <CardsLayout />}
          {layout === "editorial" && <EditorialLayout />}
          {layout === "menu" && <MenuLayout />}
          {layout === "minimal" && <MinimalLayout />}
        </>
      )}

      {/* CTA — shared across all layouts */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-4 leading-relaxed">
            Custom quotes based on your vision.
          </p>
          <p className="text-[var(--text-secondary)] mb-10">
            Every celebration and session is unique. Tell me about yours and I&apos;ll create a package just for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Inquire Here
          </Link>
        </div>
      </section>
    </>
  );
}
