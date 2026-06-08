"use client";

import Image from "next/image";
import { Archive, Loader2, X } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import type { BatchArchiveFeedback } from "./types";

interface AdminMediaBulkArchiveBarProps {
  feedback: BatchArchiveFeedback | null;
  isArchiving: boolean;
  maxSelection: number;
  selectedItems: readonly AdminMediaItem[];
  onArchiveSelected: () => void;
  onClearSelection: () => void;
}

export function AdminMediaBulkArchiveBar({
  feedback,
  isArchiving,
  maxSelection,
  selectedItems,
  onArchiveSelected,
  onClearSelection,
}: AdminMediaBulkArchiveBarProps) {
  const selectedCount = selectedItems.length;
  const overLimit = selectedCount > maxSelection;
  const archiveDisabled = isArchiving || selectedCount === 0 || overLimit;

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
            Selected media
          </p>
          <h2 className="mt-1 font-heading text-2xl font-semibold">
            {selectedCount} images selected
          </h2>
        </div>
        <button
          type="button"
          onClick={onClearSelection}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
          aria-label="Clear selected media"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="border border-[var(--border)] bg-[var(--background-warm)] p-3">
        <p className="text-sm font-semibold leading-6 text-[var(--text-secondary)]">
          These published images are valid for batch archive. Archiving removes them
          from public rendering, but files stay in R2 and can be restored from Archive.
        </p>
        {overLimit && (
          <p className="mt-2 text-sm font-semibold text-red-700">
            Select {maxSelection} images or fewer before archiving.
          </p>
        )}
      </div>

      <div className="space-y-2">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[4rem_1fr] gap-3 border border-[var(--border)] bg-white p-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-warm)]">
              <Image
                src={item.src}
                alt={item.alt || item.filename}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 self-center">
              <p className="truncate text-sm font-bold text-[var(--foreground)]">
                {item.filename}
              </p>
              <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                {item.service ?? "No service"} ·{" "}
                {item.subCategory ?? "No sub-category"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onArchiveSelected}
        disabled={archiveDisabled}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-red-700 px-4 text-sm font-bold text-white transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isArchiving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Archive className="h-4 w-4" aria-hidden />
        )}
        Archive selected
      </button>

      {feedback && (
        <div
          className={`border p-3 text-sm ${
            feedback.tone === "error"
              ? "border-red-100 bg-red-50 text-red-800"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <p className="font-bold">{feedback.message}</p>
          {feedback.failures.length > 0 && (
            <ul className="mt-2 space-y-1">
              {feedback.failures.map((failure) => (
                <li key={`${failure.id}-${failure.message}`}>
                  <span className="font-semibold">{failure.filename}</span>:{" "}
                  {failure.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
