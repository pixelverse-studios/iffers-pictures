"use client";

import Image from "next/image";
import { ArrowUpDown, Check, FileImage } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import { StatusPill } from "./StatusPill";

interface AdminMediaGridProps {
  archiveSelectionIds: readonly number[];
  items: AdminMediaItem[];
  isLoading: boolean;
  isArchiveSelectionMode: boolean;
  selectedId: number | null;
  onArchiveSelectionToggle: (id: number) => void;
  onSelect: (id: number) => void;
}

export function AdminMediaGrid({
  archiveSelectionIds,
  items,
  isLoading,
  isArchiveSelectionMode,
  selectedId,
  onArchiveSelectionToggle,
  onSelect,
}: AdminMediaGridProps) {
  if (isLoading) {
    return (
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-64 animate-pulse bg-white" />
        ))}
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="border border-[var(--border)] bg-white p-10 text-center">
        <FileImage className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          No media matches this view
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Try a different filter or upload drafts.
        </p>
      </section>
    );
  }

  const archiveSelectionSet = new Set(archiveSelectionIds);

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => {
        const canBatchArchive = item.status === "published";
        const isArchiveSelected = archiveSelectionSet.has(item.id);

        return (
          <article
            key={item.id}
            className={`group relative overflow-hidden border bg-white text-left transition ${
              isArchiveSelected
                ? "border-red-300 ring-2 ring-red-100"
                : selectedId === item.id
                  ? "border-[var(--brand-strong)] ring-2 ring-[var(--brand-soft)]"
                  : "border-[var(--border)] hover:border-[var(--brand-soft)]"
            }`}
          >
            {isArchiveSelectionMode && canBatchArchive && (
              <label className="absolute left-2 top-2 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-white/80 bg-white/95 shadow-sm">
                <input
                  type="checkbox"
                  checked={isArchiveSelected}
                  onChange={() => onArchiveSelectionToggle(item.id)}
                  className="sr-only"
                  aria-label={`Select ${item.filename} for batch archive`}
                />
                <span
                  className={`grid h-5 w-5 place-items-center rounded-[3px] border ${
                    isArchiveSelected
                      ? "border-red-700 bg-red-700 text-white"
                      : "border-[var(--text-muted)] text-transparent"
                  }`}
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </label>
            )}
            <button
              type="button"
              onClick={() =>
                isArchiveSelectionMode && canBatchArchive
                  ? onArchiveSelectionToggle(item.id)
                  : onSelect(item.id)
              }
              className="block w-full text-left"
            >
              <div className="relative aspect-[4/3] bg-[var(--background-warm)]">
                <Image
                  src={item.src}
                  alt={item.alt || item.filename}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate text-sm font-bold">{item.filename}</p>
                  <ArrowUpDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={item.status} />
                  <span className="text-xs text-[var(--text-muted)]">
                    {item.aspectRatio ?? "unset"}
                  </span>
                </div>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  {item.service ?? "No service"} ·{" "}
                  {item.subCategory ?? "No sub-category"}
                </p>
              </div>
            </button>
          </article>
        );
      })}
    </section>
  );
}
