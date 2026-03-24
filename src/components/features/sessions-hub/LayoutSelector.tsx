import { GalleryHorizontalEnd, LayoutGrid, Rows3, Star, Grid2X2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type SessionsVariant = "gallery" | "cards" | "showcase" | "list" | "mosaic";

const VARIANTS: { id: SessionsVariant; label: string; icon: typeof LayoutGrid }[] = [
  { id: "gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "showcase", label: "Showcase", icon: Star },
  { id: "list", label: "List", icon: Rows3 },
  { id: "mosaic", label: "Mosaic", icon: Grid2X2 },
];

interface LayoutSelectorProps {
  current: SessionsVariant;
  onChange: (variant: SessionsVariant) => void;
}

export function LayoutSelector({ current, onChange }: LayoutSelectorProps) {
  return (
    <div className="flex justify-center mb-12">
      <div
        className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--background-warm)] border border-[var(--border)]"
        role="tablist"
        aria-label="Layout options"
      >
        {VARIANTS.map((variant) => {
          const isActive = current === variant.id;
          return (
            <button
              key={variant.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(variant.id)}
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
  );
}
