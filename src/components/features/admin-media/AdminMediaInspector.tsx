"use client";

import { NumberInput, Select, Textarea, TextInput } from "@mantine/core";
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
        <div className="sticky top-[var(--header-height)] max-h-[calc(100vh-var(--header-height))] overflow-y-auto p-5">
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
  const serviceOptions = [
    { value: "", label: "Unset" },
    ...MEDIA_SERVICES.map((service) => ({ value: service, label: service })),
  ];
  const subCategoryOptions = [
    { value: "", label: "Unset" },
    ...(editor.service
      ? MEDIA_SUB_CATEGORIES[editor.service].map((subCategory) => ({
          value: subCategory,
          label: subCategory,
        }))
      : []),
  ];
  const aspectRatioOptions = [
    { value: "", label: "Unset" },
    ...MEDIA_ASPECT_RATIOS.map((ratio) => ({ value: ratio, label: ratio })),
  ];
  const statusOptions = MEDIA_STATUSES.map((status) => ({
    value: status,
    label: STATUS_COPY[status],
  }));

  return (
    <aside className="border-t border-[var(--border)] bg-white xl:border-l xl:border-t-0">
      <div className="sticky top-[var(--header-height)] max-h-[calc(100vh-var(--header-height))] overflow-y-auto p-5">
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

          <Textarea
            label="Alt text"
            value={editor.alt}
            onChange={(event) => onUpdateEditor("alt", event.currentTarget.value)}
            disabled={archivedLocked}
            rows={3}
            placeholder="Describe what someone should understand from the image."
            radius="sm"
            styles={{
              label: { fontWeight: 700 },
              input: { minHeight: "5.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem" },
            }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Service"
              value={editor.service}
              onChange={(value) =>
                onUpdateEditor("service", (value ?? "") as MediaService | "")
              }
              data={serviceOptions}
              disabled={archivedLocked}
              allowDeselect={false}
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
              }}
            />
            <Select
              label="Sub-category"
              value={editor.subCategory}
              onChange={(value) =>
                onUpdateEditor("subCategory", (value ?? "") as MediaSubCategory | "")
              }
              data={subCategoryOptions}
              disabled={archivedLocked || !editor.service}
              allowDeselect={false}
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Aspect ratio"
              value={editor.aspectRatio}
              onChange={(value) =>
                onUpdateEditor("aspectRatio", (value ?? "") as MediaAspectRatio | "")
              }
              data={aspectRatioOptions}
              disabled={archivedLocked}
              allowDeselect={false}
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
              }}
            />
            <NumberInput
              label="Sort order"
              value={editor.sortOrder}
              onChange={(value) => onUpdateEditor("sortOrder", String(value))}
              disabled={archivedLocked}
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
              }}
            />
          </div>

          <div>
            <Select
              label="Status"
              value={editor.status}
              onChange={(value) =>
                onUpdateEditor("status", (value ?? editor.status) as MediaStatus)
              }
              data={statusOptions}
              allowDeselect={false}
              radius="sm"
              styles={{
                label: { fontWeight: 700 },
                input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
              }}
            />
            {publishBlocked && (
              <span className="mt-2 block text-xs font-semibold text-red-700">
                Add alt text, service, sub-category, and aspect ratio before publishing.
              </span>
            )}
          </div>

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
            <TextInput
              value={moveKey}
              onChange={(event) => onMoveKeyChange(event.currentTarget.value)}
              disabled={!canMove}
              aria-label="Draft destination key"
              className="mt-3"
              radius="sm"
              styles={{
                input: { minHeight: "2.5rem", backgroundColor: "#ffffff", fontSize: "0.75rem" },
              }}
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
