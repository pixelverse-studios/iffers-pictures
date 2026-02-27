"use client";

import { useState } from "react";
import { LayoutDashboard, LayoutPanelLeft, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { Masonry } from "./portfolio-layouts/Masonry";
import { FeaturedGrid } from "./portfolio-layouts/FeaturedGrid";
import { Filmstrip } from "./portfolio-layouts/Filmstrip";

type Layout = "masonry" | "featured" | "filmstrip";

const LAYOUTS: { key: Layout; label: string; icon: React.ElementType }[] = [
  { key: "masonry",   label: "Masonry",  icon: LayoutDashboard  },
  { key: "featured",  label: "Featured", icon: LayoutPanelLeft  },
  { key: "filmstrip", label: "Film",     icon: Film             },
];

export function PortfolioLayoutSwitcher() {
  const [activeLayout, setActiveLayout] = useState<Layout>("masonry");

  return (
    <section className="bg-[var(--background-warm)] py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--teal)] font-medium mb-2">
              Our Work
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
              Recent Celebrations
            </h2>
          </div>

          {/* Layout toggle — segmented control */}
          <div
            className="flex rounded-lg border border-[var(--border)] overflow-hidden shrink-0 self-start sm:self-auto bg-white"
            role="group"
            aria-label="Portfolio layout"
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
        {activeLayout === "masonry"   && <Masonry />}
        {activeLayout === "featured"  && <FeaturedGrid />}
        {activeLayout === "filmstrip" && <Filmstrip />}
      </div>
    </section>
  );
}
