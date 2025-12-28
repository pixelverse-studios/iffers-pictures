"use client";

import { cn } from "@/lib/utils";
import { Layers, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export type VariationType = 1 | 2 | 3 | 4;

interface VariationSwitcherProps {
  activeVariation: VariationType;
  onVariationChange: (variation: VariationType) => void;
}

const variations = [
  {
    id: 1 as VariationType,
    name: "Emotional Storyteller",
    description: "Hero-centric with cinematic feel",
  },
  {
    id: 2 as VariationType,
    name: "Portfolio Forward",
    description: "Let the work speak first",
  },
  {
    id: 3 as VariationType,
    name: "Scroll Journey",
    description: "Story-driven vertical experience",
  },
  {
    id: 4 as VariationType,
    name: "Hybrid (V1 + V3)",
    description: "Minimal hero with compact storytelling",
  },
];

export function VariationSwitcher({
  activeVariation,
  onVariationChange,
}: VariationSwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentVariation = variations.find((v) => v.id === activeVariation);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded panel */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 w-72",
          "bg-white rounded-xl shadow-2xl border border-[var(--border)]",
          "transition-all duration-300 origin-bottom-right",
          isExpanded
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="font-heading font-semibold text-[var(--foreground)]">
            Landing Page Variations
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Switch between different designs
          </p>
        </div>

        <div className="p-2">
          {variations.map((variation) => (
            <button
              key={variation.id}
              onClick={() => {
                onVariationChange(variation.id);
                setIsExpanded(false);
              }}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-all duration-200",
                activeVariation === variation.id
                  ? "bg-[var(--teal)]/10 border-l-2 border-[var(--teal)]"
                  : "hover:bg-[var(--background-warm)]"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    activeVariation === variation.id
                      ? "bg-[var(--teal)] text-white"
                      : "bg-neutral-100 text-[var(--text-secondary)]"
                  )}
                >
                  {variation.id}
                </div>
                <div>
                  <div
                    className={cn(
                      "font-medium text-sm",
                      activeVariation === variation.id
                        ? "text-[var(--teal)]"
                        : "text-[var(--foreground)]"
                    )}
                  >
                    {variation.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {variation.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-full",
          "bg-[var(--teal)] text-white",
          "shadow-lg shadow-[var(--teal)]/25",
          "hover:bg-[var(--teal-dark)] transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:ring-offset-2"
        )}
      >
        <Layers className="w-5 h-5" />
        <span className="text-sm font-medium">
          V{activeVariation}: {currentVariation?.name}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
