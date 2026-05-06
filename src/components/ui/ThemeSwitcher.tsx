"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, Palette, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  LAYOUT_VARIANT_ORDER,
  LAYOUT_VARIANTS,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { THEME_ORDER, THEMES, type ThemeId } from "@/lib/themes";

const POPOVER_ID = "preview-switcher-popover";

/**
 * Floating bottom-left preview switcher. Client-preview tool for DEV-680/DEV-798.
 *
 * Closed state: small pill with the current theme and layout.
 * Open state: popover above the pill with layout and theme controls.
 *
 * Interaction: click to apply instantly. No hover preview (confusing when
 * users scroll away mid-hover, per the UX research). Arrow keys navigate
 * chips while the popover is open, Enter/Space applies, Escape closes.
 */
export function ThemeSwitcher() {
  const { themeId, theme, setThemeId, mounted } = useTheme();
  const {
    layoutVariantId,
    layoutVariant,
    setLayoutVariantId,
    mounted: layoutMounted,
  } = useLayoutVariant();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const layoutRefs = useRef<Record<LayoutVariantId, HTMLButtonElement | null>>({
    current: null,
    board: null,
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape, restore focus to trigger
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // When the popover opens, focus the currently-active chip
  useEffect(() => {
    if (!open) return;
    const activeIndex = THEME_ORDER.indexOf(themeId);
    requestAnimationFrame(() => {
      chipRefs.current[activeIndex]?.focus();
    });
  }, [open, themeId]);

  // Arrow-key navigation between chips while popover is open
  const handleChipKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = THEME_ORDER.length;
    let next = index;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        next = (index - 1 + count) % count;
        break;
      case "Home":
        e.preventDefault();
        next = 0;
        break;
      case "End":
        e.preventDefault();
        next = count - 1;
        break;
      default:
        return;
    }
    chipRefs.current[next]?.focus();
  };

  const handleSelect = (id: ThemeId) => {
    setThemeId(id);
    // Keep the popover open so users can audition multiple themes quickly
  };

  const selectLayoutAndFocus = (id: LayoutVariantId) => {
    setLayoutVariantId(id);
    requestAnimationFrame(() => {
      layoutRefs.current[id]?.focus();
    });
  };

  const handleLayoutKeyDown = (
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

    selectLayoutAndFocus(LAYOUT_VARIANT_ORDER[nextIndex]);
  };

  // Hydration guard — don't render until we know the persisted theme,
  // prevents a flash of "Morning Dew" label when a different theme is stored.
  if (!mounted || !layoutMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 left-4 z-[60] print:hidden"
    >
      {/* Expanded popover */}
      {open && (
        <div
          id={POPOVER_ID}
          aria-label="Preview controls"
          className={cn(
            "absolute bottom-full left-0 mb-2",
            "w-[min(360px,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto",
            "rounded-2xl border shadow-2xl",
            "bg-[var(--surface)] border-[var(--border)]",
            "p-3"
          )}
        >
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[var(--border)]">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--text-muted)]">
              Preview controls
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close theme switcher"
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-warm)] transition-colors motion-reduce:transition-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-3 rounded-xl border border-[var(--border)] bg-[var(--background-warm)] p-2">
            <div className="mb-2 px-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Layout preview
              </p>
              <p className="text-xs font-medium text-[var(--foreground)]">
                {layoutVariant.label}
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Choose layout preview"
              className="grid grid-cols-2 gap-1"
            >
              {LAYOUT_VARIANT_ORDER.map((id) => {
                const variant = LAYOUT_VARIANTS[id];
                const isActive = layoutVariantId === id;

                return (
                  <button
                    key={id}
                    ref={(el) => {
                      layoutRefs.current[id] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    tabIndex={isActive ? 0 : -1}
                    title={variant.description}
                    onClick={() => setLayoutVariantId(id)}
                    onKeyDown={(e) => handleLayoutKeyDown(e, id)}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 py-2",
                      "text-xs font-semibold transition-all duration-200 motion-reduce:transition-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background-warm)]",
                      isActive
                        ? "bg-[var(--brand)] text-white shadow-sm"
                        : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {isActive && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    <span>{variant.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Choose a theme"
            className="grid grid-cols-2 gap-2"
          >
            {THEME_ORDER.map((id, index) => {
              const t = THEMES[id];
              const isActive = id === themeId;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    chipRefs.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelect(id)}
                  onKeyDown={(e) => handleChipKeyDown(e, index)}
                  className={cn(
                    "relative flex flex-col items-start gap-2 p-3 rounded-xl",
                    "border text-left transition-all duration-150",
                    "motion-reduce:transition-none",
                    "hover:border-[var(--brand)]/60 hover:bg-[var(--background-warm)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
                    isActive
                      ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30 bg-[var(--background-warm)]"
                      : "border-[var(--border)] bg-[var(--surface)]"
                  )}
                >
                  {/* 4-dot color preview */}
                  <div className="flex items-center">
                    {t.preview.map((hex, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-5 h-5 rounded-full border border-black/5",
                          i > 0 && "-ml-1.5"
                        )}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>

                  <div className="w-full">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-[var(--foreground)] truncate">
                        {t.name}
                      </span>
                      {t.mode === "soft-dark" && (
                        <span className="text-[9px] font-semibold tracking-wider uppercase text-[var(--text-muted)] bg-[var(--background-warm)] px-1 py-px rounded">
                          Dark
                        </span>
                      )}
                    </div>
                  </div>

                  {isActive && (
                    <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand)] text-white shadow-sm">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed pill trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={POPOVER_ID}
        aria-label={`Preview controls — current theme: ${theme.name}; current layout: ${layoutVariant.shortLabel}`}
        className={cn(
          "flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full",
          "bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-lg",
          "text-[12px] font-medium text-[var(--foreground)]",
          "transition-all duration-200 motion-reduce:transition-none",
          "hover:shadow-xl hover:border-[var(--brand)]/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        )}
      >
        <Palette className="w-3.5 h-3.5 text-[var(--brand)]" />
        <div className="flex items-center">
          {theme.preview.map((hex, i) => (
            <span
              key={i}
              className={cn(
                "w-3.5 h-3.5 rounded-full border border-black/10",
                i > 0 && "-ml-1"
              )}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <span className="max-w-[170px] truncate">
          {theme.name} / {layoutVariant.shortLabel}
        </span>
      </button>
    </div>
  );
}
