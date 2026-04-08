import { Columns2, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialsVariant = "classic" | "editorial";

const VARIANTS: { id: TestimonialsVariant; label: string; icon: typeof Columns2 }[] = [
  { id: "classic", label: "Classic", icon: Columns2 },
  { id: "editorial", label: "Editorial", icon: Newspaper },
];

interface TestimonialsLayoutSelectorProps {
  current: TestimonialsVariant;
  onChange: (variant: TestimonialsVariant) => void;
}

export function TestimonialsLayoutSelector({ current, onChange }: TestimonialsLayoutSelectorProps) {
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
