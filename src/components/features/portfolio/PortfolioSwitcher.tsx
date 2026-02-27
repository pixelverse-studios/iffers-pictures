"use client";

import { useState, useEffect } from "react";
import { Masonry } from "./portfolio-layouts/Masonry";
import { FeaturedGrid } from "./portfolio-layouts/FeaturedGrid";
import { Filmstrip } from "./portfolio-layouts/Filmstrip";
import { CategorySplit } from "./portfolio-layouts/CategorySplit";

const STORAGE_KEY = "iffers-portfolio-layout";

type LayoutId = "masonry" | "featured" | "filmstrip" | "category";

const LAYOUTS: { id: LayoutId; label: string; hint: string }[] = [
  { id: "masonry",   label: "Masonry",   hint: "Organic varying-height columns" },
  { id: "featured",  label: "Editorial", hint: "Hero image + satellite grid"    },
  { id: "filmstrip", label: "Filmstrip", hint: "Scrolling rows by category"     },
  { id: "category",  label: "By Category", hint: "Filter sidebar + reactive grid" },
];

/** Tiny CSS diagram representing each layout structure */
function LayoutDiagram({ id, active }: { id: LayoutId; active: boolean }) {
  const imgBlock = active ? "bg-white/70" : "bg-[var(--teal)]/40";
  const line     = active ? "bg-white/50" : "bg-[var(--foreground)]/20";
  const lineShort = active ? "bg-white/35" : "bg-[var(--foreground)]/12";

  if (id === "masonry") {
    // Three uneven columns of stacked blocks
    return (
      <div className="flex gap-0.5 items-end w-8 h-5">
        <div className="flex flex-col gap-0.5 flex-1">
          <div className={`h-2.5 rounded-[2px] ${imgBlock}`} />
          <div className={`h-1.5 rounded-[2px] ${lineShort}`} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <div className={`h-1.5 rounded-[2px] ${lineShort}`} />
          <div className={`h-3 rounded-[2px] ${imgBlock}`} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <div className={`h-2 rounded-[2px] ${imgBlock}`} />
          <div className={`h-2 rounded-[2px] ${lineShort}`} />
        </div>
      </div>
    );
  }

  if (id === "featured") {
    // Large left + 2x2 right
    return (
      <div className="flex gap-0.5 items-stretch w-8 h-5">
        <div className={`flex-1 rounded-[2px] ${imgBlock}`} />
        <div className="flex flex-col gap-0.5" style={{ width: "40%" }}>
          <div className="flex gap-0.5 flex-1">
            <div className={`flex-1 rounded-[2px] ${lineShort}`} />
            <div className={`flex-1 rounded-[2px] ${lineShort}`} />
          </div>
          <div className="flex gap-0.5 flex-1">
            <div className={`flex-1 rounded-[2px] ${lineShort}`} />
            <div className={`flex-1 rounded-[2px] ${lineShort}`} />
          </div>
        </div>
      </div>
    );
  }

  if (id === "filmstrip") {
    // Three horizontal strips
    return (
      <div className="flex flex-col gap-1 w-8 h-5 justify-center">
        <div className="flex gap-0.5">
          <div className={`h-1.5 flex-1 rounded-[2px] ${imgBlock}`} />
          <div className={`h-1.5 flex-1 rounded-[2px] ${line}`} />
          <div className={`h-1.5 w-1.5 rounded-[2px] ${lineShort}`} />
        </div>
        <div className="flex gap-0.5">
          <div className={`h-1.5 flex-1 rounded-[2px] ${line}`} />
          <div className={`h-1.5 flex-1 rounded-[2px] ${imgBlock}`} />
          <div className={`h-1.5 w-1.5 rounded-[2px] ${lineShort}`} />
        </div>
        <div className="flex gap-0.5">
          <div className={`h-1.5 w-1.5 rounded-[2px] ${lineShort}`} />
          <div className={`h-1.5 flex-1 rounded-[2px] ${line}`} />
          <div className={`h-1.5 flex-1 rounded-[2px] ${imgBlock}`} />
        </div>
      </div>
    );
  }

  // category — thin sidebar + grid
  return (
    <div className="flex gap-1 items-stretch w-8 h-5">
      <div className="flex flex-col gap-0.5 justify-center" style={{ width: "22%" }}>
        <div className={`h-[2px] rounded-full ${line}`} />
        <div className={`h-[2px] rounded-full ${line}`} />
        <div className={`h-[2px] rounded-full ${line}`} />
        <div className={`h-[2px] w-2/3 rounded-full ${lineShort}`} />
      </div>
      <div className={`w-px ${active ? "bg-white/20" : "bg-[var(--border)]"}`} />
      <div className="grid grid-cols-2 gap-0.5 flex-1">
        <div className={`rounded-[2px] ${imgBlock}`} />
        <div className={`rounded-[2px] ${lineShort}`} />
        <div className={`rounded-[2px] ${lineShort}`} />
        <div className={`rounded-[2px] ${imgBlock}`} />
      </div>
    </div>
  );
}

function renderLayout(id: LayoutId) {
  switch (id) {
    case "masonry":   return <Masonry />;
    case "featured":  return <FeaturedGrid />;
    case "filmstrip": return <Filmstrip />;
    case "category":  return <CategorySplit />;
  }
}

export function PortfolioSwitcher() {
  const [activeLayout, setActiveLayout] = useState<LayoutId>("masonry");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LayoutId | null;
    const valid: LayoutId[] = ["masonry", "featured", "filmstrip", "category"];
    if (saved && valid.includes(saved)) {
      setActiveLayout(saved);
    }
    setMounted(true);
  }, []);

  function selectLayout(id: LayoutId) {
    setActiveLayout(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  const activeHint = LAYOUTS.find((l) => l.id === activeLayout)?.hint ?? "";

  return (
    <div className="relative">
      {/* Floating switcher — top-right of section */}
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-white border border-[var(--border)]/60 rounded-xl shadow-md overflow-hidden w-[10.5rem]">
          {/* Header */}
          <div className="px-3 py-1.5 bg-[var(--background-warm)]/80 border-b border-[var(--border)]/40">
            <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)]">
              Gallery Layout
            </span>
          </div>

          {/* Buttons */}
          <div className="p-1.5 flex flex-col gap-0.5">
            {LAYOUTS.map((layout) => {
              const isActive = activeLayout === layout.id;
              return (
                <button
                  key={layout.id}
                  onClick={() => selectLayout(layout.id)}
                  className={[
                    "flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-left transition-all duration-150",
                    isActive
                      ? "bg-[var(--teal)] text-white"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                  aria-pressed={isActive}
                  title={layout.hint}
                >
                  <LayoutDiagram id={layout.id} active={isActive} />
                  <span className="text-[11px] font-medium leading-none">{layout.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active hint */}
          {mounted && (
            <div className="px-3 py-1.5 border-t border-[var(--border)]/30 bg-[var(--background-warm)]/40">
              <p className="text-[9px] text-[var(--text-muted)] leading-tight">{activeHint}</p>
            </div>
          )}
        </div>
      </div>

      {/* Gallery content — right-padded to avoid overlap with widget */}
      <div className="pr-0 lg:pr-48">
        {mounted ? renderLayout(activeLayout) : <Masonry />}
      </div>
    </div>
  );
}
