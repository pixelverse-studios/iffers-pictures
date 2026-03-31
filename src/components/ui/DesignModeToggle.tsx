"use client";

import { Eye, Sparkles, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesignMode, type DesignMode } from "@/context/DesignModeContext";

const MODES: { id: DesignMode; label: string; icon: typeof Eye }[] = [
  { id: "current", label: "Current", icon: Eye },
  { id: "inspired", label: "Inspired", icon: Sparkles },
  { id: "rockstar", label: "Rockstar", icon: Flame },
];

export function DesignModeToggle() {
  const { mode, setMode } = useDesignMode();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="inline-flex items-center gap-1 p-1 rounded-full bg-white/95 backdrop-blur-sm border border-[var(--border)] shadow-lg"
        role="radiogroup"
        aria-label="Design mode"
      >
        {MODES.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              role="radio"
              aria-checked={isActive}
              title={`${m.label} design`}
              onClick={() => setMode(m.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[var(--teal)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-warm)]"
              )}
            >
              <m.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
