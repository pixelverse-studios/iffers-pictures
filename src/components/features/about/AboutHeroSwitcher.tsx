"use client";

import { useState, useEffect } from "react";
import { LayoutA } from "./about-hero-layouts/LayoutA";
import { LayoutB } from "./about-hero-layouts/LayoutB";
import { LayoutC } from "./about-hero-layouts/LayoutC";

const STORAGE_KEY = "iffers-about-layout";

type LayoutId = "A" | "B" | "C";

const LAYOUTS: { id: LayoutId; label: string; hint: string }[] = [
  { id: "A", label: "Two-Column", hint: "Portrait left, text right" },
  { id: "B", label: "Centered", hint: "Portrait above, text below" },
  { id: "C", label: "Split Card", hint: "Dark panel + warm panel" },
];

/** Tiny CSS diagram representing each layout's structure */
function LayoutDiagram({ id, active }: { id: LayoutId; active: boolean }) {
  const img = active ? "bg-white/70" : "bg-[var(--teal)]/40";
  const line = active ? "bg-white/50" : "bg-[var(--foreground)]/20";
  const lineShort = active ? "bg-white/35" : "bg-[var(--foreground)]/12";

  if (id === "A") {
    // [img] [=== ]
    //       [== ]
    //       [=== ]
    return (
      <div className="flex items-center gap-1 w-8 h-5">
        <div className={`w-2.5 h-full rounded-[3px] shrink-0 ${img}`} />
        <div className="flex flex-col gap-[3px] flex-1 justify-center">
          <div className={`h-[2px] rounded-full ${line}`} style={{ width: "100%" }} />
          <div className={`h-[2px] rounded-full ${lineShort}`} style={{ width: "75%" }} />
          <div className={`h-[2px] rounded-full ${line}`} style={{ width: "90%" }} />
        </div>
      </div>
    );
  }

  if (id === "B") {
    // [  img  ]
    // [=======]
    // [======]
    return (
      <div className="flex flex-col items-center gap-[3px] w-8 h-5">
        <div className={`w-3 h-2.5 rounded-[3px] ${img}`} />
        <div className="flex flex-col gap-[2px] items-center w-full">
          <div className={`h-[2px] rounded-full ${line}`} style={{ width: "100%" }} />
          <div className={`h-[2px] rounded-full ${lineShort}`} style={{ width: "70%" }} />
        </div>
      </div>
    );
  }

  // id === "C" — [dark|text]
  //              [dark|=== ]
  //              [dark|== ]
  return (
    <div className="flex items-stretch w-8 h-5 rounded-[3px] overflow-hidden gap-px">
      <div
        className={`w-3 shrink-0 ${active ? "bg-white/60" : "bg-[var(--foreground)]/50"}`}
      />
      <div className="flex flex-col gap-[3px] flex-1 justify-center pl-0.5">
        <div className={`h-[2px] rounded-full ${line}`} style={{ width: "100%" }} />
        <div className={`h-[2px] rounded-full ${lineShort}`} style={{ width: "80%" }} />
        <div className={`h-[2px] rounded-full ${line}`} style={{ width: "90%" }} />
      </div>
    </div>
  );
}

function renderLayout(id: LayoutId) {
  switch (id) {
    case "A":
      return <LayoutA />;
    case "B":
      return <LayoutB />;
    case "C":
      return <LayoutC />;
  }
}

export function AboutHeroSwitcher() {
  const [activeLayout, setActiveLayout] = useState<LayoutId>("A");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LayoutId | null;
    if (saved && ["A", "B", "C"].includes(saved)) {
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
    <section
      className="relative pb-16 md:pb-20 bg-[var(--background-warm)]"
      style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
    >
      {/* Floating layout picker — top-right of section */}
      <div
        className="absolute z-20 right-4 sm:right-6"
        style={{ top: "calc(var(--header-height) + 1.25rem)" }}
      >
        <div className="bg-white border border-[var(--border)]/60 rounded-xl shadow-md overflow-hidden w-[9.5rem]">
          {/* Header */}
          <div className="px-3 py-1.5 bg-[var(--background-warm)]/80 border-b border-[var(--border)]/40 flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)]">
              Hero Layout
            </span>
          </div>

          {/* Layout buttons */}
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
                  <span className="text-[11px] font-medium leading-none">
                    {layout.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active hint */}
          {mounted && (
            <div className="px-3 py-1.5 border-t border-[var(--border)]/30 bg-[var(--background-warm)]/40">
              <p className="text-[9px] text-[var(--text-muted)] leading-tight">
                {activeHint}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Layout content */}
      <div className="container">
        {mounted ? renderLayout(activeLayout) : <LayoutA />}
      </div>
    </section>
  );
}
