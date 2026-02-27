"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ArrowRight, AlignJustify, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconGrid } from "./services-layouts/IconGrid";
import { BentoCards } from "./services-layouts/BentoCards";
import { TwoColumnList } from "./services-layouts/TwoColumnList";

type Layout = "grid" | "cards" | "list";

const LAYOUTS: { key: Layout; label: string; icon: React.ElementType }[] = [
  { key: "grid", label: "Grid", icon: LayoutGrid },
  { key: "cards", label: "Cards", icon: LayoutTemplate },
  { key: "list", label: "List", icon: AlignJustify },
];

export function ServicesLayoutSwitcher() {
  const [activeLayout, setActiveLayout] = useState<Layout>("grid");

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--teal)] font-medium mb-2">
              What We Capture
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
              Every Celebration Has a Story
            </h2>
          </div>

          {/* Layout toggle — segmented control */}
          <div
            className="flex rounded-lg border border-[var(--border)] overflow-hidden shrink-0 self-start sm:self-auto"
            role="group"
            aria-label="Services layout"
          >
            {LAYOUTS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveLayout(key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors duration-150 border-r last:border-r-0 border-[var(--border)]",
                  activeLayout === key
                    ? "bg-[var(--teal)] text-white"
                    : "bg-white text-[var(--text-secondary)] hover:bg-[var(--background-warm)] hover:text-[var(--foreground)]"
                )}
                aria-pressed={activeLayout === key}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active layout */}
        {activeLayout === "grid" && <IconGrid />}
        {activeLayout === "cards" && <BentoCards />}
        {activeLayout === "list" && <TwoColumnList />}

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--teal)] hover:text-[var(--teal-dark)] transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
