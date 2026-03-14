"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PORTFOLIO_ITEMS,
  SERVICES,
  SUB_CATEGORIES,
  type ServiceFilter,
  type PortfolioItem,
} from "../portfolioData";
import { CategoryBadge } from "./shared";
import { Lightbox } from "../Lightbox";

/**
 * Category Split — two-tier sidebar filter + reactive masonry grid.
 * Tier 1: Service (e.g. Milestone Celebrations, Maternity)
 * Tier 2: Sub-category (e.g. Engagement, Gender Reveal) — shown when service has multiple
 */
export function CategorySplit() {
  const [activeService, setActiveService] = useState<ServiceFilter | "All">("All");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filterItems(activeService, activeSub);

  function selectService(service: ServiceFilter | "All") {
    setActiveService(service);
    setActiveSub(null);
  }

  function selectSub(svc: ServiceFilter, sub: string) {
    if (activeService === svc && activeSub === sub) {
      // Clicking active sub deselects it, showing all of the parent service
      setActiveSub(null);
    } else {
      setActiveService(svc);
      setActiveSub(sub);
    }
  }

  return (
    <div className="flex gap-8 lg:gap-12">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-44 shrink-0 pt-1">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-5 font-semibold">
          Browse by
        </p>

        <nav className="flex flex-col gap-0">
          {/* All */}
          <button
            onClick={() => selectService("All")}
            className={[
              "py-2.5 pl-3 text-left text-sm font-body transition-colors duration-200 border-l-2 cursor-pointer",
              activeService === "All"
                ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                : "border-transparent hover:border-[var(--teal-light)] text-[var(--text-secondary)] hover:text-[var(--foreground)]",
            ].join(" ")}
          >
            All
          </button>

          {/* Services */}
          {SERVICES.map((svc) => {
            const isActive = activeService === svc;
            const subs = SUB_CATEGORIES[svc];
            const hasMultipleSubs = subs.length > 1;

            return (
              <div key={svc}>
                <button
                  onClick={() => selectService(svc)}
                  className={[
                    "py-2.5 pl-3 text-left text-sm font-body transition-colors duration-200 border-l-2 cursor-pointer w-full",
                    isActive
                      ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                      : "border-transparent hover:border-[var(--teal-light)] text-[var(--text-secondary)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {svc}
                </button>

                {/* Sub-categories — always visible when service has multiple */}
                {hasMultipleSubs && (
                  <div className="flex flex-col">
                    {subs.map((sub) => {
                      const isSubActive = activeSub === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => selectSub(svc, sub)}
                          className={[
                            "py-1.5 pl-7 text-left text-xs font-body transition-colors duration-200 cursor-pointer",
                            activeService === svc && isSubActive
                              ? "text-[var(--teal)] font-medium"
                              : "text-[var(--text-muted)] hover:text-[var(--foreground)]",
                          ].join(" ")}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
        {/* Tier 1 — services */}
        <div
          className="flex gap-4 overflow-x-auto pb-3 border-b border-[var(--border)]"
          style={{ scrollbarWidth: "none" }}
        >
          <button
            onClick={() => selectService("All")}
            className={[
              "flex-shrink-0 text-sm py-1.5 transition-colors duration-200 font-body border-b-2",
              activeService === "All"
                ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                : "border-transparent text-[var(--text-secondary)]",
            ].join(" ")}
          >
            All
          </button>
          {SERVICES.map((svc) => (
            <button
              key={svc}
              onClick={() => selectService(svc)}
              className={[
                "flex-shrink-0 text-sm py-1.5 transition-colors duration-200 font-body border-b-2",
                activeService === svc
                  ? "border-[var(--teal)] text-[var(--teal)] font-medium"
                  : "border-transparent text-[var(--text-secondary)]",
              ].join(" ")}
            >
              {svc}
            </button>
          ))}
        </div>

        {/* Tier 2 — sub-categories (mobile pill bar, always visible) */}
        <div
          className="flex gap-2 overflow-x-auto pt-2 pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES.flatMap((svc) =>
            SUB_CATEGORIES[svc].length > 1
              ? SUB_CATEGORIES[svc].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => selectSub(svc, sub)}
                    className={[
                      "flex-shrink-0 text-xs px-3 py-1 rounded-full border transition-colors duration-200",
                      activeService === svc && activeSub === sub
                        ? "border-[var(--teal)] bg-[var(--teal)]/10 text-[var(--teal)] font-medium"
                        : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    {sub}
                  </button>
                ))
              : []
          )}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="flex-1 min-w-0">
        <div
          key={`${activeService}-${activeSub}`}
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
                <CategoryBadge label={item.subCategory} size="sm" />
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

function filterItems(
  service: ServiceFilter | "All",
  sub: string | null
): PortfolioItem[] {
  if (service === "All") return PORTFOLIO_ITEMS;
  let items = PORTFOLIO_ITEMS.filter((i) => i.service === service);
  if (sub) items = items.filter((i) => i.subCategory === sub);
  return items;
}
