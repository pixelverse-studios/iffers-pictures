"use client";

import Image from "next/image";
import { useState } from "react";
import { Archive, Loader2, ShieldAlert, X } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import type { BatchArchiveFeedback } from "./types";

interface AdminMediaBulkArchiveBarProps {
  feedback: BatchArchiveFeedback | null;
  isArchiving: boolean;
  maxSelection: number;
  selectedItems: readonly AdminMediaItem[];
  onArchiveSelected: () => void;
  onClearSelection: () => void;
  onRemoveItem: (id: number) => void;
}

export function AdminMediaBulkArchiveBar({
  feedback,
  isArchiving,
  maxSelection,
  selectedItems,
  onArchiveSelected,
  onClearSelection,
  onRemoveItem,
}: AdminMediaBulkArchiveBarProps) {
  const [confirmingArchive, setConfirmingArchive] = useState(false);
  const selectedCount = selectedItems.length;
  const overLimit = selectedCount > maxSelection;
  const archiveDisabled = isArchiving || selectedCount === 0 || overLimit;
  const showArchiveConfirm = confirmingArchive && selectedCount > 0 && !overLimit;

  function confirmArchive() {
    setConfirmingArchive(false);
    onArchiveSelected();
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-5">
      <div className="shrink-0">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
            Selected media
          </p>
          <h2 className="mt-1 font-heading text-2xl font-semibold">
            {selectedCount} images selected
          </h2>
        </div>
        {overLimit && (
          <p className="mt-3 text-sm font-semibold text-red-700">
            Select {maxSelection} images or fewer before archiving.
          </p>
        )}
      </div>

      {feedback && (
        <div
          className={`max-h-36 shrink-0 overflow-y-auto border p-3 text-sm ${
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

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[4rem_1fr_auto] gap-3 border border-[var(--border)] bg-white p-2"
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
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="self-center rounded-sm border border-[var(--border)] p-2 text-[var(--text-secondary)] transition hover:border-red-200 hover:text-red-700 active:translate-y-[1px]"
              aria-label={`Remove ${item.filename} from selection`}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-[var(--border)] bg-white pt-4">
        {showArchiveConfirm && (
          <div className="mb-3 border border-red-200 bg-red-50 p-3 text-sm text-red-900">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <div>
                <p className="font-bold">
                  Archive {selectedCount} selected image
                  {selectedCount === 1 ? "" : "s"}?
                </p>
                <p className="mt-1 leading-5">
                  Archived images are removed from public rendering, but files are
                  not deleted from R2.
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-[1.25fr_1fr] gap-2">
              <button
                type="button"
                onClick={confirmArchive}
                disabled={archiveDisabled}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-red-700 px-4 text-sm font-bold text-white transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isArchiving ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Archive className="h-4 w-4" aria-hidden />
                )}
                Archive
              </button>
              <button
                type="button"
                onClick={() => setConfirmingArchive(false)}
                disabled={isArchiving}
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-red-200 bg-white px-4 text-sm font-bold text-red-900 transition hover:border-red-300 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!showArchiveConfirm && (
          <div className="grid grid-cols-[1.25fr_1fr] gap-2">
            <button
              type="button"
              onClick={() => setConfirmingArchive(true)}
              disabled={archiveDisabled}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-red-700 px-4 text-sm font-bold text-white transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isArchiving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Archive className="h-4 w-4" aria-hidden />
              )}
              Archive
            </button>
            <button
              type="button"
              onClick={onClearSelection}
              disabled={isArchiving || selectedCount === 0}
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--text-secondary)] transition hover:border-[var(--brand-strong)] hover:text-[var(--foreground)] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
