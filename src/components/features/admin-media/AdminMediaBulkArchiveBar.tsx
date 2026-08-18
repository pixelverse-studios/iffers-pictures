"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  GripVertical,
  Loader2,
  Save,
  ShieldAlert,
  X,
} from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import type { BatchArchiveFeedback } from "./types";
import { getMediaLibrary } from "./utils";

interface AdminMediaBulkArchiveBarProps {
  feedback: BatchArchiveFeedback | null;
  isArchiving: boolean;
  isReordering: boolean;
  maxSelection: number;
  selectedItems: readonly AdminMediaItem[];
  onArchiveSelected: () => void;
  onClearSelection: () => void;
  onRemoveItem: (id: number) => void;
  onReorderSelected: (orderedIds: number[]) => void;
}

export function AdminMediaBulkArchiveBar({
  feedback,
  isArchiving,
  isReordering,
  maxSelection,
  selectedItems,
  onArchiveSelected,
  onClearSelection,
  onRemoveItem,
  onReorderSelected,
}: AdminMediaBulkArchiveBarProps) {
  const [confirmingArchive, setConfirmingArchive] = useState(false);
  const [orderedIds, setOrderedIds] = useState<number[]>(() =>
    selectedItems.map((item) => item.id),
  );
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dropTargetId, setDropTargetId] = useState<number | null>(null);
  const selectedCount = selectedItems.length;
  const overLimit = selectedCount > maxSelection;
  const archiveDisabled = isArchiving || selectedCount === 0 || overLimit;
  const showArchiveConfirm = confirmingArchive && selectedCount > 0 && !overLimit;
  const itemsById = useMemo(
    () => new Map(selectedItems.map((item) => [item.id, item])),
    [selectedItems],
  );
  const orderedItems = orderedIds
    .map((id) => itemsById.get(id))
    .filter((item): item is AdminMediaItem => Boolean(item));
  const canReorder =
    orderedItems.length > 1 &&
    orderedItems.every(
      (item) =>
        item.status === "published" && getMediaLibrary(item) === "portfolio",
    );

  function moveItem(id: number, targetIndex: number) {
    setOrderedIds((current) => {
      const sourceIndex = current.indexOf(id);
      if (sourceIndex < 0) return current;
      const next = [...current];
      next.splice(sourceIndex, 1);
      next.splice(Math.max(0, Math.min(targetIndex, next.length)), 0, id);
      return next;
    });
  }

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

      {selectedCount > 0 && !canReorder && (
        <p className="shrink-0 border-l-2 border-[var(--brand-strong)] bg-[var(--brand-soft)] p-3 text-sm text-[var(--text-secondary)]">
          Select at least two published portfolio images to change their order.
        </p>
      )}

      {canReorder && (
        <div className="shrink-0 border-l-2 border-[var(--brand-strong)] bg-[var(--brand-soft)] p-3 text-sm text-[var(--text-secondary)]">
          Drag the selected images into the order you want. Their existing
          portfolio slots will be reassigned, and every other image will remain
          in sequence.
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {orderedItems.map((item, index) => (
          <div
            key={item.id}
            draggable={canReorder && !isReordering}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", String(item.id));
              setDraggedId(item.id);
            }}
            onDragEnd={() => {
              setDraggedId(null);
              setDropTargetId(null);
            }}
            onDragOver={(event) => {
              if (!canReorder) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              if (dropTargetId !== item.id) setDropTargetId(item.id);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setDropTargetId((current) =>
                  current === item.id ? null : current,
                );
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              const transferredId = Number(
                event.dataTransfer.getData("text/plain"),
              );
              const sourceId = Number.isInteger(transferredId)
                ? transferredId
                : draggedId;
              if (sourceId !== null && sourceId !== item.id) {
                moveItem(sourceId, index);
              }
              setDraggedId(null);
              setDropTargetId(null);
            }}
            className={`grid grid-cols-[auto_4rem_1fr_auto] gap-2 border bg-white p-2 transition ${
              canReorder
                ? draggedId === item.id
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : ""
            } ${
              draggedId === item.id
                ? "border-[var(--brand-strong)] opacity-65 shadow-lg"
                : dropTargetId === item.id
                  ? "border-[var(--brand-strong)] ring-2 ring-[var(--brand-soft)]"
                : "border-[var(--border)]"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1 text-[var(--text-muted)]">
              <GripVertical className="h-4 w-4" aria-hidden />
              <span className="text-[10px] font-bold">{index + 1}</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-warm)]">
              <Image
                src={item.src}
                alt={item.alt || item.filename}
                fill
                draggable={false}
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
                {item.subCategory ?? "No photo type"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {canReorder && (
                <div className="grid gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(item.id, index - 1)}
                    disabled={index === 0 || isReordering}
                    className="rounded-sm border border-[var(--border)] p-1.5 text-[var(--text-secondary)] disabled:opacity-30"
                    aria-label={`Move ${item.filename} up`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(item.id, index + 1)}
                    disabled={index === orderedItems.length - 1 || isReordering}
                    className="rounded-sm border border-[var(--border)] p-1.5 text-[var(--text-secondary)] disabled:opacity-30"
                    aria-label={`Move ${item.filename} down`}
                  >
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                className="self-center rounded-sm border border-[var(--border)] p-2 text-[var(--text-secondary)] transition hover:border-red-200 hover:text-red-700 active:translate-y-[1px]"
                aria-label={`Remove ${item.filename} from selection`}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
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
                  Archived images are removed from the website, but the original
                  files are kept.
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
          <div className="grid grid-cols-2 gap-2">
            {canReorder && (
              <button
                type="button"
                onClick={() => onReorderSelected(orderedIds)}
                disabled={isReordering}
                className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isReordering ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Save className="h-4 w-4" aria-hidden />
                )}
                {isReordering ? "Saving order..." : "Save new order"}
              </button>
            )}
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
