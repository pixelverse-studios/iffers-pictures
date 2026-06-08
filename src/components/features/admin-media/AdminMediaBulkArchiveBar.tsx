"use client";

import { Archive, CheckSquare, Loader2, X } from "lucide-react";
import type { BatchArchiveFeedback } from "./types";

interface AdminMediaBulkArchiveBarProps {
  feedback: BatchArchiveFeedback | null;
  isArchiving: boolean;
  isSelectionMode: boolean;
  maxSelection: number;
  selectedCount: number;
  onArchiveSelected: () => void;
  onClearSelection: () => void;
  onToggleSelectionMode: () => void;
}

export function AdminMediaBulkArchiveBar({
  feedback,
  isArchiving,
  isSelectionMode,
  maxSelection,
  selectedCount,
  onArchiveSelected,
  onClearSelection,
  onToggleSelectionMode,
}: AdminMediaBulkArchiveBarProps) {
  if (!isSelectionMode && selectedCount === 0 && !feedback) {
    return (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onToggleSelectionMode}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold text-[var(--brand-strong)] transition active:translate-y-[1px]"
        >
          <CheckSquare className="h-4 w-4" aria-hidden />
          Select images
        </button>
      </div>
    );
  }

  const overLimit = selectedCount > maxSelection;
  const archiveDisabled = isArchiving || selectedCount === 0 || overLimit;

  return (
    <section className="border border-[var(--border)] bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--foreground)]">
            {selectedCount} selected for archive
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            Archive selected published images to remove them from public rendering.
            Files stay in R2 and can be restored from Archive.
          </p>
          {overLimit && (
            <p className="mt-2 text-sm font-semibold text-red-700">
              Select {maxSelection} images or fewer before archiving.
            </p>
          )}
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[22rem]">
          <button
            type="button"
            onClick={onClearSelection}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--text-secondary)] transition active:translate-y-[1px]"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear selection
          </button>
          <button
            type="button"
            onClick={onArchiveSelected}
            disabled={archiveDisabled}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-red-700 px-4 text-sm font-bold text-white transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isArchiving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Archive className="h-4 w-4" aria-hidden />
            )}
            Archive selected
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`mt-4 border p-3 text-sm ${
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
