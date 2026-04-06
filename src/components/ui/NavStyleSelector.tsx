"use client";

import { cn } from "@/lib/utils";

export type NavStyle =
  | "default"
  | "frosted"
  | "gradient"
  | "text-shadow"
  | "scroll-solid"
  | "border";

const STYLES: { id: NavStyle; label: string }[] = [
  { id: "default", label: "Current" },
  { id: "frosted", label: "Frosted Glass" },
  { id: "gradient", label: "Top Gradient" },
  { id: "text-shadow", label: "Text Shadow" },
  { id: "scroll-solid", label: "Scroll Solid" },
  { id: "border", label: "Bottom Border" },
];

interface NavStyleSelectorProps {
  current: NavStyle;
  onChange: (style: NavStyle) => void;
}

export function NavStyleSelector({ current, onChange }: NavStyleSelectorProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <div className="bg-white/95 backdrop-blur-sm border border-[var(--border)] rounded-2xl shadow-xl p-3 max-w-xs">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-2 px-1">
          Nav Style
        </p>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
                current === style.id
                  ? "bg-[var(--teal)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-warm)]"
              )}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
