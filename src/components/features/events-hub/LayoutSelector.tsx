"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, GalleryHorizontalEnd, Layers } from "lucide-react";

export type LayoutVariant = "magazine" | "showcase" | "gallery";

interface LayoutSelectorProps {
  current: LayoutVariant;
  onChange: (variant: LayoutVariant) => void;
  className?: string;
}

const layouts: { id: LayoutVariant; label: string; icon: React.ElementType }[] = [
  { id: "magazine", label: "Magazine", icon: LayoutGrid },
  { id: "showcase", label: "Showcase", icon: GalleryHorizontalEnd },
  { id: "gallery", label: "Gallery", icon: Layers },
];

export function LayoutSelector({ current, onChange, className }: LayoutSelectorProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <span className="text-sm text-[var(--text-muted)] mr-2 hidden sm:inline">Layout:</span>
      <div className="inline-flex rounded-full bg-[var(--background-warm)] p-1 shadow-sm border border-[var(--border)]" role="tablist">
        {layouts.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            role="tab"
            aria-selected={current === id}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              current === id
                ? "bg-[var(--teal)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-white/60"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
