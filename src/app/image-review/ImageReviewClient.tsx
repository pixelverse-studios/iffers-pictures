"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ClipboardList,
  Copy,
  Mail,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "iffers-image-review-selections";
const RECIPIENT = "phil@pixelversestudios.io";
const MAILTO_SAFE_LIMIT = 1800;
const ALL_GROUPS_KEY = "all";

export interface ReviewItem {
  id: number;
  src: string;
  alt: string;
  service: string;
  subCategory: string;
  key: string;
  filename: string;
}

interface Props {
  items: ReviewItem[];
}

type Grouped = Record<string, Record<string, ReviewItem[]>>;

function groupItems(items: ReviewItem[]): Grouped {
  const grouped: Grouped = {};
  for (const item of items) {
    if (!grouped[item.service]) grouped[item.service] = {};
    if (!grouped[item.service][item.subCategory])
      grouped[item.service][item.subCategory] = [];
    grouped[item.service][item.subCategory].push(item);
  }
  return grouped;
}

function getGroupId(service: string, subCategory: string): string {
  return `image-review-${service}-${subCategory}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildEmailBody(selected: ReviewItem[]): string {
  const grouped = groupItems(selected);
  const lines: string[] = [];
  lines.push("Hi Phil,");
  lines.push("");
  lines.push(`${selected.length} image${selected.length === 1 ? "" : "s"} to replace:`);
  lines.push("");

  for (const service of Object.keys(grouped)) {
    for (const sub of Object.keys(grouped[service])) {
      const group = grouped[service][sub];
      lines.push(`${service.toUpperCase()} > ${sub.toUpperCase()} (${group.length})`);
      for (const item of group) {
        lines.push(`  ${item.key}`);
      }
      lines.push("");
    }
  }

  lines.push("— Iffer");
  return lines.join("\n");
}

export function ImageReviewClient({ items }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const mobileControlsRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Restore selection from localStorage
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const ids = JSON.parse(raw) as number[];
          setSelected(new Set(ids));
        }
      } catch {
        // ignore
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Persist selection
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selected)));
    } catch {
      // ignore
    }
  }, [selected, hydrated]);

  useEffect(() => {
    if (!isMobileControlsOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    function getFocusable() {
      const panel = mobileControlsRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    const focusFrame = window.requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileControlsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
      previouslyFocused.current = null;
    };
  }, [isMobileControlsOpen]);

  const grouped = useMemo(() => groupItems(items), [items]);
  const services = useMemo(() => Object.keys(grouped), [grouped]);
  const groupSummaries = useMemo(
    () =>
      services.flatMap((service) =>
        Object.keys(grouped[service]).map((subCategory) => {
          const groupItemsList = grouped[service][subCategory];
          return {
            id: getGroupId(service, subCategory),
            service,
            subCategory,
            total: groupItemsList.length,
            selected: groupItemsList.filter((item) => selected.has(item.id))
              .length,
          };
        })
      ),
    [grouped, selected, services]
  );

  const selectedItems = useMemo(
    () => items.filter((i) => selected.has(i.id)),
    [items, selected]
  );

  const emailBody = useMemo(
    () => (selectedItems.length > 0 ? buildEmailBody(selectedItems) : ""),
    [selectedItems]
  );

  const subject = `Images to replace — Iffer's Pictures (${selectedItems.length})`;
  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(emailBody)}`;
  const mailtoTooLong = mailto.length > MAILTO_SAFE_LIMIT;
  const selectedPercent =
    items.length === 0 ? 0 : Math.round((selectedItems.length / items.length) * 100);
  const selectedGroups = groupSummaries.filter((group) => group.selected > 0);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleGroup(groupItems: ReviewItem[], allSelected: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        groupItems.forEach((i) => next.delete(i.id));
      } else {
        groupItems.forEach((i) => next.add(i.id));
      }
      return next;
    });
  }

  function clearAll() {
    setSelected(new Set());
  }

  function jumpToGroup(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMobileControlsOpen(false);
  }

  function toggleCollapsed(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (key === ALL_GROUPS_KEY) {
        return next.size === groupSummaries.length
          ? new Set()
          : new Set(groupSummaries.map((group) => group.id));
      }
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      alert("Couldn't copy to clipboard. Please select the text manually.");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="board-shell board-gutter grid gap-9 py-12 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.45fr)] md:py-16">
        <div className="max-w-[780px]">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">
            Internal image review
          </p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-6xl md:text-7xl">
            Review your sites images
          </h1>
          <p className="mt-6 max-w-[600px] text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
            Select any site image, then send the generated list to Phil. Your
            selections stay saved on this device until you clear them.
          </p>
        </div>

        <aside className="self-end border-l border-[var(--border)] bg-[var(--background-warm)] p-6 md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Current list
              </p>
              <p className="mt-3 font-heading text-5xl font-semibold leading-none text-[var(--brand-strong)]">
                {selectedItems.length}
              </p>
            </div>
            <ClipboardList className="h-7 w-7 text-[var(--brand-strong)]" />
          </div>
          <div className="mt-6 h-2 bg-white">
            <div
              className="h-full bg-[var(--brand-strong)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${selectedPercent}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
            {selectedItems.length} of {items.length} images selected across{" "}
            {selectedGroups.length} review group
            {selectedGroups.length === 1 ? "" : "s"}.
          </p>
        </aside>
      </section>

      <div className="sticky top-16 z-30 border-y border-[var(--border)] bg-white/94 backdrop-blur-md md:top-[72px]">
        <div className="board-shell board-gutter flex items-center justify-between gap-2 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileControlsOpen(true)}
            aria-expanded={isMobileControlsOpen}
            className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-between rounded-sm border border-[var(--border)] bg-white px-4 text-left transition-all duration-200 active:scale-[0.98]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-[var(--brand-strong)]" />
              <span className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--foreground)]">
                Groups
              </span>
            </span>
            <span className="shrink-0 font-mono text-[11px] font-bold text-[var(--brand-strong)]">
              {selectedItems.length}/{items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={copyList}
            disabled={selectedItems.length === 0}
            aria-label={copyFeedback ? "Copied selected image list" : "Copy selected image list"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--foreground)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.96]"
          >
            {copyFeedback ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>

          {mailtoTooLong ? (
            <button
              type="button"
              disabled
              aria-label="Email list is too long; copy instead"
              className="inline-flex h-11 w-11 shrink-0 cursor-not-allowed items-center justify-center rounded-sm bg-[var(--text-muted)] text-white opacity-70"
            >
              <Mail className="h-4 w-4" />
            </button>
          ) : (
            <a
              href={selectedItems.length > 0 ? mailto : undefined}
              aria-disabled={selectedItems.length === 0}
              aria-label="Send selected image list to Phil"
              className={[
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white transition-all duration-200 active:scale-[0.96]",
                selectedItems.length === 0
                  ? "pointer-events-none cursor-not-allowed bg-[var(--text-muted)] opacity-55"
                  : "bg-[var(--brand-strong)]",
              ].join(" ")}
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="board-shell board-gutter hidden flex-col gap-4 py-4 md:flex lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {groupSummaries.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => jumpToGroup(group.id)}
                className={[
                  "inline-flex min-h-9 items-center gap-2 rounded-sm border px-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.98]",
                  group.selected > 0
                    ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--brand-soft)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                {group.subCategory}
                <span className="font-mono text-[10px]">
                  {group.selected}/{group.total}
                </span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleCollapsed(ALL_GROUPS_KEY)}
              className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--background-warm)] active:scale-[0.98]"
            >
              <ChevronDown className="h-4 w-4" />
              Collapse
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={selectedItems.length === 0}
              className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--background-warm)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
            <button
              type="button"
              onClick={copyList}
              disabled={selectedItems.length === 0}
              className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--background-warm)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
            >
              {copyFeedback ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy list
                </>
              )}
            </button>
            {mailtoTooLong ? (
              <button
                type="button"
                disabled
                title="Too many selected for email. Use Copy list instead and paste into a new email."
                className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-sm bg-[var(--text-muted)] px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white opacity-70"
              >
                <Mail className="h-4 w-4" />
                Copy instead
              </button>
            ) : (
              <a
                href={selectedItems.length > 0 ? mailto : undefined}
                aria-disabled={selectedItems.length === 0}
                className={[
                  "inline-flex min-h-10 items-center gap-2 rounded-sm px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 active:scale-[0.98]",
                  selectedItems.length === 0
                    ? "pointer-events-none cursor-not-allowed bg-[var(--text-muted)] opacity-55"
                    : "bg-[var(--brand-strong)] hover:bg-[var(--brand)]",
                ].join(" ")}
              >
                <Mail className="h-4 w-4" />
                Send to Phil
              </a>
            )}
          </div>

          {mailtoTooLong && (
            <p className="basis-full text-xs font-semibold text-amber-700">
              This selection is too long for a reliable email link. Use Copy
              list and paste it into a new email to <code>{RECIPIENT}</code>.
            </p>
          )}
        </div>
      </div>

      {isMobileControlsOpen && (
        <div
          ref={mobileControlsRef}
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Image review groups"
        >
          <button
            type="button"
            aria-label="Close image review controls"
            onClick={() => setIsMobileControlsOpen(false)}
            className="absolute inset-0 bg-[var(--foreground)]/34"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] shadow-[0_-24px_60px_rgba(26,32,48,0.20)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Image groups
                </p>
                <p className="mt-1 text-sm font-bold text-[var(--foreground)]">
                  {selectedItems.length} selected
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileControlsOpen(false)}
                aria-label="Close image review controls"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border)] text-[var(--foreground)] active:scale-[0.96]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(82dvh-9.5rem)] overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-1 gap-2">
                {groupSummaries.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => jumpToGroup(group.id)}
                    className={[
                      "flex min-h-12 items-center justify-between rounded-sm border px-4 text-left transition-all duration-200 active:scale-[0.98]",
                      group.selected > 0
                        ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    <span className="min-w-0 truncate text-[12px] font-bold uppercase tracking-[0.14em]">
                      {group.subCategory}
                    </span>
                    <span className="ml-3 shrink-0 font-mono text-[11px] font-bold opacity-80">
                      {group.selected}/{group.total}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-[var(--border)] bg-[var(--background-warm)] p-4">
              <button
                type="button"
                onClick={() => toggleCollapsed(ALL_GROUPS_KEY)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--foreground)] active:scale-[0.98]"
              >
                <ChevronDown className="h-4 w-4" />
                Collapse
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={selectedItems.length === 0}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="board-shell space-y-10 pb-16 pt-8 md:pb-24 md:pt-12">
        {services.map((service) => {
          const subCats = Object.keys(grouped[service]);
          return (
            <section key={service}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Review category
                  </p>
                  <h2 className="font-heading text-4xl font-semibold leading-none text-[var(--foreground)] md:text-5xl">
                    {service}
                  </h2>
                </div>
                <p className="hidden text-sm font-semibold text-[var(--text-secondary)] sm:block">
                  {subCats.reduce(
                    (total, sub) => total + grouped[service][sub].length,
                    0
                  )}{" "}
                  images
                </p>
              </div>

              <div className="space-y-6">
                {subCats.map((sub) => {
                  const groupItemsList = grouped[service][sub];
                  const groupKey = getGroupId(service, sub);
                  const isCollapsed = collapsed.has(groupKey);
                  const selectedCount = groupItemsList.filter((i) =>
                    selected.has(i.id)
                  ).length;
                  const allSelected = selectedCount === groupItemsList.length;

                  return (
                    <div
                      key={sub}
                      id={groupKey}
                      className="scroll-mt-40 bg-white"
                    >
                      <div className="flex flex-col gap-3 border border-[var(--border)] border-b-0 bg-[var(--background-warm)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                        <button
                          type="button"
                          onClick={() => toggleCollapsed(groupKey)}
                          className="flex items-center gap-3 text-left font-heading text-2xl font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand-strong)]"
                        >
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                              isCollapsed ? "-rotate-90" : ""
                            }`}
                          />
                          {sub}
                          <span className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            {selectedCount}/{groupItemsList.length}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleGroup(groupItemsList, allSelected)}
                          className="inline-flex min-h-9 items-center justify-center rounded-sm border border-[var(--brand-strong)] px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)] transition-all duration-200 hover:bg-[var(--brand-strong)] hover:text-white active:scale-[0.98]"
                        >
                          {allSelected ? "Deselect all" : "Select all"}
                        </button>
                      </div>

                      {!isCollapsed && (
                        <div className="grid grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {groupItemsList.map((item) => {
                            const isSelected = selected.has(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggle(item.id)}
                                className={`group relative min-h-0 overflow-hidden bg-white text-left transition-all duration-300 active:scale-[0.99] ${
                                  isSelected
                                    ? "ring-2 ring-inset ring-[var(--brand-strong)]"
                                    : "hover:ring-2 hover:ring-inset hover:ring-[var(--brand-soft)]"
                                }`}
                              >
                                <div className="relative aspect-[4/5] bg-[var(--background-warm)]">
                                  <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                                    loading="lazy"
                                  />
                                  <span className="absolute inset-0 bg-[var(--foreground)]/0 transition-colors duration-300 group-hover:bg-[var(--foreground)]/10" />
                                  {isSelected && (
                                    <div className="absolute inset-0 flex items-start justify-end bg-[var(--brand-strong)]/18 p-2">
                                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-strong)] shadow-sm">
                                        <Check className="h-4 w-4 text-white" />
                                      </span>
                                    </div>
                                  )}
                                  {!isSelected && (
                                    <span className="absolute right-2 top-2 h-7 w-7 rounded-full border border-white bg-white/82 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100" />
                                  )}
                                </div>
                                <div className="min-h-16 p-3">
                                  <p className="truncate text-xs font-bold text-[var(--foreground)]">
                                    {item.filename}
                                  </p>
                                  <p className="mt-1 truncate font-mono text-[10px] text-[var(--text-muted)]">
                                    {item.key}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
