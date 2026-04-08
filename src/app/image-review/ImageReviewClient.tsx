"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, Copy, Mail, Trash2, ChevronDown } from "lucide-react";

const STORAGE_KEY = "iffers-image-review-selections";
const RECIPIENT = "phil@pixelversestudios.io";
const MAILTO_SAFE_LIMIT = 1800;

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

  // Restore selection from localStorage
  useEffect(() => {
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

  const grouped = useMemo(() => groupItems(items), [items]);
  const services = useMemo(() => Object.keys(grouped), [grouped]);

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

  function toggleCollapsed(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
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
    <div className="min-h-screen bg-[var(--background-warm)] pt-24 pb-24">
      {/* Sticky action bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
        <div className="container max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading font-semibold text-[var(--foreground)]">
                Image Review
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                <span className="font-semibold text-[var(--brand)]">
                  {selectedItems.length}
                </span>{" "}
                of {items.length} selected
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={clearAll}
                disabled={selectedItems.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--border)] rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>

              <button
                onClick={copyList}
                disabled={selectedItems.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-white border border-[var(--border)] rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {copyFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy list
                  </>
                )}
              </button>

              {mailtoTooLong ? (
                <button
                  disabled
                  title="Too many selected for email — use Copy list instead and paste into a new email"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg cursor-not-allowed"
                >
                  <Mail className="w-4 h-4" />
                  Too long — copy instead
                </button>
              ) : (
                <a
                  href={selectedItems.length > 0 ? mailto : undefined}
                  aria-disabled={selectedItems.length === 0}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    selectedItems.length === 0
                      ? "bg-gray-300 cursor-not-allowed pointer-events-none"
                      : "bg-[var(--brand)] hover:bg-[var(--brand-strong)]"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Send to Phil
                </a>
              )}
            </div>
          </div>

          {mailtoTooLong && (
            <p className="text-xs text-amber-700 mt-2">
              You&apos;ve selected enough images that the email link is too long for some
              mail clients. Use <strong>Copy list</strong> and paste into a new email to{" "}
              <code>{RECIPIENT}</code>.
            </p>
          )}
        </div>
      </div>

      {/* Image groups */}
      <div className="container max-w-7xl mx-auto px-6 md:px-8 mt-8 space-y-12">
        {services.map((service) => {
          const subCats = Object.keys(grouped[service]);
          return (
            <section key={service}>
              <h2 className="text-3xl font-heading font-semibold text-[var(--foreground)] mb-6 pb-2 border-b-2 border-[var(--brand)]">
                {service}
              </h2>

              <div className="space-y-8">
                {subCats.map((sub) => {
                  const groupItemsList = grouped[service][sub];
                  const groupKey = `${service}::${sub}`;
                  const isCollapsed = collapsed.has(groupKey);
                  const selectedCount = groupItemsList.filter((i) =>
                    selected.has(i.id)
                  ).length;
                  const allSelected = selectedCount === groupItemsList.length;

                  return (
                    <div key={sub}>
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => toggleCollapsed(groupKey)}
                          className="flex items-center gap-2 text-xl font-heading font-medium text-[var(--foreground)] hover:text-[var(--brand)] transition-colors"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              isCollapsed ? "-rotate-90" : ""
                            }`}
                          />
                          {sub}
                          <span className="text-sm font-body font-normal text-[var(--text-secondary)]">
                            ({selectedCount}/{groupItemsList.length})
                          </span>
                        </button>
                        <button
                          onClick={() => toggleGroup(groupItemsList, allSelected)}
                          className="text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors"
                        >
                          {allSelected ? "Deselect all" : "Select all"}
                        </button>
                      </div>

                      {!isCollapsed && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {groupItemsList.map((item) => {
                            const isSelected = selected.has(item.id);
                            return (
                              <button
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                className={`group relative rounded-lg overflow-hidden bg-white border-2 transition-all text-left ${
                                  isSelected
                                    ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30 shadow-lg"
                                    : "border-[var(--border)] hover:border-[var(--brand)]/50"
                                }`}
                              >
                                <div className="relative aspect-square bg-gray-100">
                                  <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    className="object-cover"
                                    loading="lazy"
                                  />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-[var(--brand)]/20 flex items-start justify-end p-2">
                                      <div className="w-7 h-7 rounded-full bg-[var(--brand)] flex items-center justify-center shadow-md">
                                        <Check className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  )}
                                  {!isSelected && (
                                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border-2 border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                  )}
                                </div>
                                <div className="p-2">
                                  <p className="text-xs font-medium text-[var(--foreground)] truncate">
                                    {item.filename}
                                  </p>
                                  <p className="text-[10px] text-[var(--text-muted)] truncate font-mono">
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
