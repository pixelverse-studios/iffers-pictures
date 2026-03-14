"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_ITEMS, EVENT_TYPES, type EventType } from "../portfolioData";
import { CategoryBadge } from "./shared";
import { Lightbox } from "../Lightbox";

/**
 * Category Split — sidebar category filter + reactive masonry grid.
 * Luxury curation aesthetic: left bookmark-style nav, right responds instantly.
 * Click any image to open a full-viewport lightbox carousel.
 */
export function CategorySplit() {
  const [active, setActive] = useState<EventType>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
                  "py-2.5 pl-3 text-left text-sm font-body transition-colors duration-200 border-l-2 cursor-pointer",
                  isActive
                    ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                    : "border-transparent hover:border-[var(--teal-light)] text-[var(--text-secondary)] hover:text-[var(--foreground)]",
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

      {/* Masonry grid — reacts to category selection */}
      <div className="flex-1 min-w-0">
        <div
          key={active}
          className="columns-2 md:columns-3 gap-3 [column-gap:0.75rem] animate-[fadeIn_0.25s_ease-out]"
        >
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-3 group cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={item.aspectRatio === "portrait" ? 1067 : item.aspectRatio === "square" ? 800 : 600}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <CategoryBadge label={item.eventType} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox carousel */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
