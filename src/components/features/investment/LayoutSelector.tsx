import { LayoutGrid, BookOpen, Grid3X3, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type InvestmentVariant = "cards" | "editorial" | "menu" | "minimal";

const VARIANTS: { id: InvestmentVariant; label: string; icon: typeof LayoutGrid }[] = [
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "editorial", label: "Editorial", icon: BookOpen },
  { id: "menu", label: "Menu", icon: Grid3X3 },
  { id: "minimal", label: "Minimal", icon: Minimize2 },
];

interface LayoutSelectorProps {
  current: InvestmentVariant;
  onChange: (variant: InvestmentVariant) => void;
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
                  ? "bg-[var(--brand)] text-white shadow-sm"
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
