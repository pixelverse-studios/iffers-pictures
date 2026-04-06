"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useDesignMode } from "@/context/DesignModeContext";
import { EditorialLayout } from "./layouts/EditorialLayout";
import { NarrativeLayout } from "./layouts/NarrativeLayout";

export function InvestmentContent() {
  const { mode } = useDesignMode();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isInspired = mode === "inspired";

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
      {isInspired ? <NarrativeLayout /> : <EditorialLayout />}

      {/* CTA — shared across all layouts */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-4 leading-relaxed">
            Custom quotes based on your vision.
          </p>
          <p className="text-[var(--text-secondary)] mb-10">
            Every celebration and session is unique. Tell me about yours and I&apos;ll create a package just for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal-vivid)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-md shadow-[var(--teal-vivid)]/20 hover:shadow-lg"
          >
            Inquire Here
          </Link>
        </div>
      </section>
    </>
  );
}
