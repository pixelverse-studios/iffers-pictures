"use client";

import Image from "next/image";
import Link from "next/link";
import { Archive, Copy, ExternalLink, FileImage, Loader2, RotateCcw, X } from "lucide-react";
import {
  MEDIA_ASPECT_RATIOS,
  MEDIA_SERVICES,
  MEDIA_STATUSES,
  MEDIA_SUB_CATEGORIES,
  type AdminMediaItem,
  type MediaAspectRatio,
  type MediaService,
  type MediaStatus,
  type MediaSubCategory,
} from "@/lib/media/types";
import { STATUS_COPY } from "./constants";
import { StatusPill } from "./StatusPill";
import type { EditorState } from "./types";
import { formatDate } from "./utils";

interface AdminMediaInspectorProps {
  affectedPages: string[];
  canMove: boolean;
  editor: EditorState | null;
  isCheckingMove: boolean;
  isMoving: boolean;
  isSaving: boolean;
  item: AdminMediaItem | null;
  moveKey: string;
  moveMessage: string;
  publishBlocked: boolean;
  onArchive: () => void;
  onCheckDestination: () => void;
  onClose: () => void;
  onMove: () => void;
  onMoveKeyChange: (value: string) => void;
  onRestore: () => void;
  onSave: () => void;
  onUpdateEditor: <Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) => void;
}

export function AdminMediaInspector({
  affectedPages,
  canMove,
  editor,
  isCheckingMove,
  isMoving,
  isSaving,
  item,
  moveKey,
  moveMessage,
  publishBlocked,
  onArchive,
  onCheckDestination,
  onClose,
  onMove,
  onMoveKeyChange,
  onRestore,
  onSave,
  onUpdateEditor,
}: AdminMediaInspectorProps) {
  if (!item || !editor) {
    return (
      <aside className="border-t border-[var(--border)] bg-white xl:border-l xl:border-t-0">
        <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
          <div className="grid min-h-96 place-items-center text-center">
            <div>
              <FileImage className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
              <p className="mt-3 font-heading text-xl font-semibold">Select media</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Choose an image to edit details.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const archivedLocked = item.status === "archived";

  return (
    <aside className="border-t border-[var(--border)] bg-white xl:border-l xl:border-t-0">
      <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
                Selected media
              </p>
              <h2 className="mt-1 truncate font-heading text-2xl font-semibold">
                {item.filename}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
              aria-label="Close inspector"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-warm)]">
            <Image
              src={item.src}
              alt={item.alt || item.filename}
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={item.status} />
            <span className="text-xs text-[var(--text-muted)]">
              Updated {formatDate(item.updatedAt)}
            </span>
          </div>

          {archivedLocked && (
            <div className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Archived media must be restored before normal metadata edits.
            </div>
          )}

          <label className="block">
            <span className="text-sm font-bold">Alt text</span>
            <textarea
              value={editor.alt}
              onChange={(event) => onUpdateEditor("alt", event.target.value)}
              disabled={archivedLocked}
              rows={3}
              className="mt-2 w-full resize-none border border-[var(--border)] px-3 py-2 text-sm outline-none disabled:bg-[var(--background-warm)]"
              placeholder="Describe what someone should understand from the image."
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-bold">Service</span>
              <select
                value={editor.service}
                onChange={(event) =>
                  onUpdateEditor("service", event.target.value as MediaService | "")
                }
                disabled={archivedLocked}
                className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
              >
                <option value="">Unset</option>
                {MEDIA_SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold">Sub-category</span>
              <select
                value={editor.subCategory}
                onChange={(event) =>
                  onUpdateEditor(
                    "subCategory",
                    event.target.value as MediaSubCategory | "",
                  )
                }
                disabled={archivedLocked || !editor.service}
                className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
              >
                <option value="">Unset</option>
                {editor.service &&
                  MEDIA_SUB_CATEGORIES[editor.service].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-bold">Aspect ratio</span>
              <select
                value={editor.aspectRatio}
                onChange={(event) =>
                  onUpdateEditor("aspectRatio", event.target.value as MediaAspectRatio | "")
                }
                disabled={archivedLocked}
                className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
              >
                <option value="">Unset</option>
                {MEDIA_ASPECT_RATIOS.map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {ratio}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold">Sort order</span>
              <input
                type="number"
                value={editor.sortOrder}
                onChange={(event) => onUpdateEditor("sortOrder", event.target.value)}
                disabled={archivedLocked}
                className="mt-2 h-11 w-full border border-[var(--border)] px-3 text-sm disabled:bg-[var(--background-warm)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold">Status</span>
            <select
              value={editor.status}
              onChange={(event) =>
                onUpdateEditor("status", event.target.value as MediaStatus)
              }
              className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm"
            >
              {MEDIA_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_COPY[status]}
                </option>
              ))}
            </select>
            {publishBlocked && (
              <span className="mt-2 block text-xs font-semibold text-red-700">
                Add alt text, service, sub-category, and aspect ratio before publishing.
              </span>
            )}
          </label>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || publishBlocked}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save changes
            </button>
            {item.status === "archived" ? (
              <button
                type="button"
                onClick={onRestore}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-5 text-sm font-bold text-[var(--brand-strong)]"
              >
                <RotateCcw className="h-4 w-4" />
                Restore image
              </button>
            ) : (
              <button
                type="button"
                onClick={onArchive}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-red-200 px-5 text-sm font-bold text-red-700"
              >
                <Archive className="h-4 w-4" />
                Archive image
              </button>
            )}
          </div>

          <details className="border border-[var(--border)]">
            <summary className="cursor-pointer px-3 py-3 text-sm font-bold">
              R2 details
            </summary>
            <div className="space-y-2 border-t border-[var(--border)] p-3 text-xs text-[var(--text-secondary)]">
              <p className="break-all">
                <strong>Key:</strong> {item.key}
              </p>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(item.key)}
                className="inline-flex items-center gap-2 text-[var(--brand-strong)]"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy key
              </button>
            </div>
          </details>

          <section className="border border-[var(--border)] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold">Move / rename draft</p>
              {!canMove && (
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Draft only
                </span>
              )}
            </div>
            <input
              type="text"
              value={moveKey}
              onChange={(event) => onMoveKeyChange(event.target.value)}
              disabled={!canMove}
              className="mt-3 h-10 w-full border border-[var(--border)] px-3 text-xs disabled:bg-[var(--background-warm)]"
            />
            {moveMessage && (
              <p className="mt-2 text-xs font-semibold text-[var(--text-secondary)]">
                {moveMessage}
              </p>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onCheckDestination}
                disabled={!canMove || isCheckingMove || !moveKey.trim()}
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-[var(--border)] text-xs font-bold disabled:opacity-50"
              >
                {isCheckingMove ? "Checking..." : "Check"}
              </button>
              <button
                type="button"
                onClick={onMove}
                disabled={!canMove || isMoving || !moveKey.trim() || moveKey === item.key}
                className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--brand-strong)] text-xs font-bold text-white disabled:opacity-50"
              >
                {isMoving ? "Moving..." : "Move"}
              </button>
            </div>
          </section>

          <section className="border border-[var(--border)] p-3">
            <p className="text-sm font-bold">Public visibility</p>
            <div className="mt-3 space-y-2">
              {affectedPages.map((page) => (
                <Link
                  key={page}
                  href={page}
                  className="flex items-center justify-between rounded-sm bg-[var(--background-warm)] px-3 py-2 text-sm font-semibold text-[var(--brand-strong)]"
                >
                  {page}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
