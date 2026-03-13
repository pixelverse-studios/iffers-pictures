"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_ITEMS, EVENT_TYPES, type EventType } from "../portfolioData";
import { CategoryBadge, HoverOverlay, aspectClasses } from "./shared";

/**
 * Category Split — sidebar category filter + reactive image grid.
 * Luxury curation aesthetic: left bookmark-style nav, right responds instantly.
 */
export function CategorySplit() {
  const [active, setActive] = useState<EventType>("All");

  const filtered =
    active === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((i) => i.eventType === active);

  return (
    <div className="flex gap-8 lg:gap-12">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-44 shrink-0 pt-1">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-5 font-semibold">
          Browse by
        </p>

        <nav className="flex flex-col gap-0">
          {EVENT_TYPES.map((cat) => {
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
          {EVENT_TYPES.map((cat) => {
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
          {filtered.map((item, index) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm">
                <div className={`relative ${aspectClasses[item.aspectRatio]} w-full`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <CategoryBadge label={item.eventType} size="sm" />
                <HoverOverlay label={item.eventType} />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
