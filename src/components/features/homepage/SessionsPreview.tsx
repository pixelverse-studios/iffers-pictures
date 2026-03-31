"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Wind, List, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardsLayout } from "./sessions-layouts/CardsLayout";
import { FloatingLayout } from "./sessions-layouts/FloatingLayout";
import { MinimalLayout } from "./sessions-layouts/MinimalLayout";
import { GalleryLayout } from "./sessions-layouts/GalleryLayout";

type SessionsVariant = "cards" | "floating" | "minimal" | "gallery";

const VARIANTS: { id: SessionsVariant; label: string; icon: typeof LayoutGrid }[] = [
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "floating", label: "Floating", icon: Wind },
  { id: "minimal", label: "Minimal", icon: List },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
];

export function SessionsPreview() {
  const [layout, setLayout] = useState<SessionsVariant>("cards");

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)]">
            Sessions
          </h2>
        </div>

        {/* Layout selector */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--background-warm)] border border-[var(--border)]"
            role="tablist"
            aria-label="Session layout options"
          >
            {VARIANTS.map((variant) => {
              const isActive = layout === variant.id;
              return (
                <button
                  key={variant.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setLayout(variant.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[var(--teal)] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-white/50"
                  )}
                >
                  <variant.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{variant.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active layout */}
        <div className="mb-10">
          {layout === "cards" && <CardsLayout />}
          {layout === "floating" && <FloatingLayout />}
          {layout === "minimal" && <MinimalLayout />}
          {layout === "gallery" && <GalleryLayout />}
        </div>

        {/* Link */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-200"
          >
            Explore Sessions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
