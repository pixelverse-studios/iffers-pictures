"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { PORTFOLIO_ITEMS, CATEGORIES, type Category } from "../portfolioData";

function CategoryBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
      <span className="text-[9px] font-medium text-white/80 uppercase tracking-[0.1em]">
        {label}
      </span>
    </div>
  );
}

function HoverOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
      <div className="translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/55 mb-0.5">
          {label}
        </p>
        <p className="text-xs font-heading font-semibold text-white leading-tight">
          View Gallery
        </p>
      </div>
    </div>
  );
}

/**
 * Category Split — sidebar category filter + reactive image grid.
 * Luxury curation aesthetic: left bookmark-style nav, right responds instantly.
 */
export function CategorySplit() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((i) => i.category === active);

  return (
    <div className="flex gap-8 lg:gap-12">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-44 shrink-0 pt-1">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-5 font-semibold">
          Browse by
        </p>

        <nav className="flex flex-col gap-0">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "py-2.5 text-left text-sm font-body transition-colors duration-200 border-l-2",
                  isActive
                    ? "border-[var(--teal)] text-[var(--teal)] font-medium pl-3"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)] pl-[14px]",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Count */}
        <p className="mt-6 text-[10px] text-[var(--text-muted)] tracking-wide">
          {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
        </p>
      </aside>

      {/* Mobile: horizontal scroll tab bar */}
      <div className="md:hidden w-full mb-6">
        <div
          className="flex gap-4 overflow-x-auto pb-3 border-b border-[var(--border)]"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "flex-shrink-0 text-sm py-1.5 transition-colors duration-200 font-body border-b-2",
                  isActive
                    ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                    : "border-transparent text-[var(--text-secondary)]",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid — reacts to category selection */}
      <div className="flex-1 min-w-0">
        <div
          key={active}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-[fadeIn_0.25s_ease-out]"
          style={{ opacity: 1 }}
        >
          {filtered.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm">
                <ImagePlaceholder
                  aspectRatio={item.aspectRatio}
                  variant={item.variant}
                  showIcon={true}
                  iconSize="sm"
                  className="w-full"
                />
                <CategoryBadge label={item.category} />
                <HoverOverlay label={item.category} />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
