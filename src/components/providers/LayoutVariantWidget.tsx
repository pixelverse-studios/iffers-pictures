"use client";

import { useRef, type KeyboardEvent } from "react";
import { Check, Columns2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LAYOUT_VARIANT_ORDER,
  LAYOUT_VARIANTS,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { useLayoutVariant } from "@/context/LayoutVariantContext";

/**
 * Temporary client presentation widget for DEV-798.
 *
 * Lets reviewers compare the current site and design-board direction in
 * real time. Remove this when the client chooses the final layout.
 */
export function LayoutVariantWidget() {
  const optionRefs = useRef<Record<LayoutVariantId, HTMLButtonElement | null>>({
    current: null,
    board: null,
  });
  const {
    layoutVariantId,
    layoutVariant,
    setLayoutVariantId,
    mounted,
  } = useLayoutVariant();

  if (!mounted) return null;

  const selectAndFocus = (id: LayoutVariantId) => {
    setLayoutVariantId(id);
    requestAnimationFrame(() => {
      optionRefs.current[id]?.focus();
    });
  };

  const handleOptionKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    id: LayoutVariantId
  ) => {
    const currentIndex = LAYOUT_VARIANT_ORDER.indexOf(id);
    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (currentIndex + 1) % LAYOUT_VARIANT_ORDER.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex =
          (currentIndex - 1 + LAYOUT_VARIANT_ORDER.length) %
          LAYOUT_VARIANT_ORDER.length;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = LAYOUT_VARIANT_ORDER.length - 1;
        break;
      default:
        return;
    }

    selectAndFocus(LAYOUT_VARIANT_ORDER[nextIndex]);
  };

  return (
    <aside
      aria-label="Layout comparison"
      className="fixed bottom-4 right-4 z-[60] max-w-[calc(100vw-2rem)] print:hidden"
    >
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-2 shadow-xl backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
            <Columns2 className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Layout preview
            </p>
            <p className="truncate text-xs font-medium text-[var(--foreground)]">
              {layoutVariant.label}
            </p>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Choose layout preview"
          className="grid grid-cols-2 gap-1"
        >
          {LAYOUT_VARIANT_ORDER.map((id) => (
            <LayoutVariantOption
              key={id}
              ref={(el) => {
                optionRefs.current[id] = el;
              }}
              id={id}
              active={layoutVariantId === id}
              onSelect={setLayoutVariantId}
              onKeyDown={handleOptionKeyDown}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

interface LayoutVariantOptionProps {
  id: LayoutVariantId;
  active: boolean;
  onSelect: (id: LayoutVariantId) => void;
  onKeyDown: (
    e: KeyboardEvent<HTMLButtonElement>,
    id: LayoutVariantId
  ) => void;
}

function LayoutVariantOption({
  ref,
  id,
  active,
  onSelect,
  onKeyDown,
}: LayoutVariantOptionProps & {
  ref: (el: HTMLButtonElement | null) => void;
}) {
  const variant = LAYOUT_VARIANTS[id];

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={active}
      tabIndex={active ? 0 : -1}
      title={variant.description}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => onKeyDown(e, id)}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl px-3 py-2",
        "text-xs font-semibold transition-all duration-200 motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        active
          ? "bg-[var(--brand)] text-white shadow-sm"
          : "bg-[var(--background-warm)] text-[var(--text-secondary)] hover:text-[var(--foreground)]"
      )}
    >
      {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      <span>{variant.shortLabel}</span>
    </button>
  );
}
