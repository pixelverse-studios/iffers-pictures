"use client";

import { NumberInput, Select, Textarea, TextInput, Tooltip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Archive, ExternalLink, Info, Loader2, RotateCcw, X } from "lucide-react";
import {
  MEDIA_ASPECT_RATIOS,
  MEDIA_CROP_POSITIONS,
  MEDIA_LIBRARIES,
  MEDIA_SERVICES,
  MEDIA_STATUSES,
  MEDIA_SUB_CATEGORIES,
  type AdminMediaItem,
  type MediaAspectRatio,
  type MediaCropPosition,
  type MediaLibrary,
  type MediaService,
  type MediaStatus,
  type MediaSubCategory,
} from "@/lib/media/types";
import { getMediaPreviewAspectClass } from "@/lib/media/aspect-ratio";
import { AdminMediaBulkArchiveBar } from "./AdminMediaBulkArchiveBar";
import { STATUS_COPY } from "./constants";
import { StatusPill } from "./StatusPill";
import type {
  BatchArchiveFeedback,
  EditorState,
  MediaMutationOperation,
  MediaPlacementUsage,
} from "./types";
import { formatDate, getMediaLibrary } from "./utils";

interface AdminMediaInspectorProps {
  affectedPages: string[];
  canMove: boolean;
  editor: EditorState | null;
  isCheckingMove: boolean;
  isMoving: boolean;
  mediaMutationOperation: MediaMutationOperation | null;
  isBatchArchiving: boolean;
  item: AdminMediaItem | null;
  moveDestinationAvailable: boolean | null;
  moveKey: string;
  moveMessage: string;
  placementUsages: MediaPlacementUsage[];
  publishBlocked: boolean;
  selectedBatchItems: readonly AdminMediaItem[];
  batchArchiveFeedback: BatchArchiveFeedback | null;
  onArchive: () => void;
  onArchiveSelected: () => void;
  onCheckDestination: () => void;
  onCheckStatus: () => void;
  onClose: () => void;
  onClearArchiveSelection: () => void;
  onEditSelectedItem: (id: number) => void;
  onMove: () => void;
  onMoveKeyChange: (value: string) => void;
  onRemoveArchiveSelectionItem: (id: number) => void;
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
  mediaMutationOperation,
  isBatchArchiving,
  item,
  moveDestinationAvailable,
  moveKey,
  moveMessage,
  placementUsages,
  publishBlocked,
  selectedBatchItems,
  batchArchiveFeedback,
  onArchive,
  onArchiveSelected,
  onCheckDestination,
  onCheckStatus,
  onClose,
  onClearArchiveSelection,
  onEditSelectedItem,
  onMove,
  onMoveKeyChange,
  onRemoveArchiveSelectionItem,
  onRestore,
  onSave,
  onUpdateEditor,
}: AdminMediaInspectorProps) {
  const activeTrayClass =
    "fixed inset-0 z-50 overflow-y-auto bg-white xl:static xl:z-auto xl:h-[100dvh] xl:border-l xl:border-[var(--border)]";
  const trayInnerClass = "mx-auto w-full max-w-5xl p-5 md:p-7 xl:max-w-none xl:p-5";
  const batchTrayClass =
    "fixed inset-0 z-50 overflow-hidden bg-white xl:static xl:z-auto xl:h-[100dvh] xl:border-l xl:border-[var(--border)]";
  const batchTrayInnerClass =
    "mx-auto flex h-[100dvh] w-full max-w-5xl flex-col p-5 md:p-7 xl:max-w-none xl:p-5";

  if (selectedBatchItems.length > 1 || batchArchiveFeedback) {
    return (
      <aside className={batchTrayClass}>
        <div className={batchTrayInnerClass}>
          <AdminMediaBulkArchiveBar
            feedback={batchArchiveFeedback}
            isArchiving={isBatchArchiving}
            maxSelection={50}
            selectedItems={selectedBatchItems}
            onArchiveSelected={onArchiveSelected}
            onClearSelection={onClearArchiveSelection}
            onEditSelectedItem={onEditSelectedItem}
            onRemoveItem={onRemoveArchiveSelectionItem}
          />
        </div>
      </aside>
    );
  }

  if (!item || !editor) {
    return null;
  }

  const archivedLocked = item.status === "archived";
  const isMutatingMedia = mediaMutationOperation !== null;
  const savePending = mediaMutationOperation === "save";
  const publishPending = mediaMutationOperation === "publish";
  const archivePending = mediaMutationOperation === "archive";
  const restorePending = mediaMutationOperation === "restore";
  const checkStatusPending = mediaMutationOperation === "check-status";
  const saveWillPublish = item.status !== "published" && editor.status === "published";
  const saveWillArchive = item.status !== "archived" && editor.status === "archived";
  const saveButtonLabel = publishPending
    ? "Publishing..."
    : archivePending && saveWillArchive
      ? "Archiving..."
      : savePending
      ? "Saving..."
      : saveWillPublish
        ? "Publish image"
        : saveWillArchive
          ? "Archive image"
          : "Save changes";
  const archiveButtonLabel = archivePending ? "Archiving..." : "Archive image";
  const restoreButtonLabel = restorePending ? "Restoring..." : "Restore image";
  const trimmedMoveKey = moveKey.trim();
  const canSubmitMove =
    canMove &&
    !isMoving &&
    Boolean(trimmedMoveKey) &&
    trimmedMoveKey !== item.key &&
    moveDestinationAvailable === true;
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
  const cropPositionOptions = MEDIA_CROP_POSITIONS.map((position) => ({
    value: position,
    label:
      position === "left center"
        ? "Left"
        : position === "center top"
        ? "Top"
        : position === "center bottom"
          ? "Bottom"
          : position === "right center"
            ? "Right"
          : "Center",
  }));
  const statusOptions = MEDIA_STATUSES.map((status) => ({
    value: status,
    label: STATUS_COPY[status],
  }));
  const libraryOptions = MEDIA_LIBRARIES.map((library) => ({
    value: library,
    label: library === "site" ? "Site Images" : "Portfolio",
  }));
  const previewAspectClass = getMediaPreviewAspectClass(editor.aspectRatio);
  const publishBlockedMessage =
    editor.library === "site"
      ? "Add an image description, site category, and aspect ratio before publishing."
      : "Add an image description, service, photo type, and aspect ratio before publishing.";

  return (
    <aside className={activeTrayClass}>
      <div className={trayInnerClass}>
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

          <div className="space-y-5">
            <section className="overflow-hidden border border-[var(--border)] bg-white">
              <div className="grid">
                <div
                  className={`relative mx-auto min-h-[260px] w-full overflow-hidden bg-[var(--background-warm)] transition-[aspect-ratio] duration-300 ease-out ${previewAspectClass}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt || item.filename}
                    fill
                    sizes="(min-width: 1536px) 680px, (min-width: 1280px) 540px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: editor.cropPosition }}
                  />
                </div>

                <div className="grid divide-y divide-[var(--border)] border-t border-[var(--border)] lg:grid-cols-[0.74fr_1fr_1fr] lg:divide-x lg:divide-y-0">
                  <div className="space-y-3 p-4 lg:min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill status={item.status} />
                      <span className="rounded-sm bg-[var(--background-warm)] px-2 py-1 text-xs font-bold text-[var(--text-secondary)]">
                        {getMediaLibrary(item) === "site" ? "Site Images" : "Portfolio"}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">
                      Updated {formatDate(item.updatedAt)}
                    </p>
                  </div>

                  <section className="p-4 lg:min-w-0">
                    <p className="text-sm font-bold">Used on pages</p>
                    {placementUsages.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {placementUsages.map((usage) => (
                          <div
                            key={usage.slotKey}
                            className="rounded-sm bg-[var(--background-warm)] px-3 py-2"
                          >
                            <p className="text-sm font-bold text-[var(--brand-strong)]">
                              {usage.pageLabel} · {usage.sectionLabel}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        This image is not assigned to a named page placement.
                      </p>
                    )}
                  </section>

                  <section className="p-4 lg:min-w-0">
                    <p className="text-sm font-bold">Public visibility</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {affectedPages.map((page) => (
                        <Link
                          key={page}
                          href={page}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-9 items-center gap-2 rounded-sm bg-[var(--background-warm)] px-3 text-sm font-semibold text-[var(--brand-strong)] transition hover:bg-[var(--brand-soft)] active:translate-y-px"
                        >
                          {page}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </section>

            {archivedLocked && (
              <div className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                Archived images must be restored before normal edits.
              </div>
            )}

            <section className="space-y-4 border-t border-[var(--border)] pt-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
                  Edit details
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Update how this image appears across the site.
                </p>
              </div>

              <Textarea
                label="Image description"
                value={editor.alt}
                onChange={(event) => onUpdateEditor("alt", event.currentTarget.value)}
                disabled={archivedLocked || isMutatingMedia}
                rows={3}
                placeholder="Describe what someone should understand from the image."
                radius="sm"
                styles={{
                  label: { fontWeight: 700 },
                  input: { minHeight: "5.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem" },
                }}
              />

              <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
                <Select
                  label="Image group"
                  value={editor.library}
                  onChange={(value) =>
                    onUpdateEditor("library", (value ?? editor.library) as MediaLibrary)
                  }
                  data={libraryOptions}
                  disabled={archivedLocked || isMutatingMedia}
                  allowDeselect={false}
                  radius="sm"
                  styles={{
                    label: { fontWeight: 700 },
                    input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                  }}
                />
                <Select
                  label="Status"
                  value={editor.status}
                  onChange={(value) =>
                    onUpdateEditor("status", (value ?? editor.status) as MediaStatus)
                  }
                  data={statusOptions}
                  allowDeselect={false}
                  disabled={isMutatingMedia}
                  radius="sm"
                  styles={{
                    label: { fontWeight: 700 },
                    input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                  }}
                />
              </div>
              {publishBlocked && (
                <span className="-mt-2 block text-xs font-semibold text-red-700">
                  {publishBlockedMessage}
                </span>
              )}

              {editor.library === "portfolio" && (
                <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
                  <Select
                    label="Service"
                    value={editor.service}
                    onChange={(value) =>
                      onUpdateEditor("service", (value ?? "") as MediaService | "")
                    }
                    data={serviceOptions}
                    disabled={archivedLocked || isMutatingMedia}
                    allowDeselect={false}
                    radius="sm"
                    styles={{
                      label: { fontWeight: 700 },
                      input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                    }}
                  />
                  <Select
                    label="Photo type"
                    value={editor.subCategory}
                    onChange={(value) =>
                      onUpdateEditor("subCategory", (value ?? "") as MediaSubCategory | "")
                    }
                    data={subCategoryOptions}
                    disabled={archivedLocked || isMutatingMedia || !editor.service}
                    allowDeselect={false}
                    radius="sm"
                    styles={{
                      label: { fontWeight: 700 },
                      input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 2xl:grid-cols-3">
                <Select
                  label="Aspect ratio"
                  value={editor.aspectRatio}
                  onChange={(value) =>
                    onUpdateEditor("aspectRatio", (value ?? "") as MediaAspectRatio | "")
                  }
                  data={aspectRatioOptions}
                  disabled={archivedLocked || isMutatingMedia}
                  allowDeselect={false}
                  radius="sm"
                  styles={{
                    label: { fontWeight: 700 },
                    input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                  }}
                />
                <Select
                  label={
                    <span className="inline-flex items-center gap-1.5">
                      Image focus
                      <Tooltip
                        label="Controls which part of the image stays visible when it is cropped into cards or banners."
                        position="top"
                        withArrow
                        multiline
                        w={240}
                      >
                        <span
                          className="inline-flex rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--brand-strong)]"
                          tabIndex={0}
                          aria-label="Image focus help"
                        >
                          <Info className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </Tooltip>
                    </span>
                  }
                  value={editor.cropPosition}
                  onChange={(value) =>
                    onUpdateEditor(
                      "cropPosition",
                      (value ?? "center center") as MediaCropPosition,
                    )
                  }
                  data={cropPositionOptions}
                  disabled={archivedLocked || isMutatingMedia}
                  allowDeselect={false}
                  radius="sm"
                  styles={{
                    label: { fontWeight: 700 },
                    input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                  }}
                />
                <NumberInput
                  label={
                    <span className="inline-flex items-center gap-1.5">
                      Gallery position
                      <Tooltip
                        label="Controls where this image appears in galleries. Lower numbers show earlier; higher numbers show later."
                        position="top"
                        withArrow
                        multiline
                        w={240}
                      >
                        <span
                          className="inline-flex rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--brand-strong)]"
                          tabIndex={0}
                          aria-label="Gallery position help"
                        >
                          <Info className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </Tooltip>
                    </span>
                  }
                  value={editor.sortOrder}
                  onChange={(value) => onUpdateEditor("sortOrder", String(value))}
                  disabled={archivedLocked || isMutatingMedia}
                  radius="sm"
                  styles={{
                    label: { fontWeight: 700 },
                    input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
                  }}
                />
              </div>

              <div className="grid gap-2 2xl:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={isMutatingMedia || publishBlocked}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {(savePending || publishPending) && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  {saveButtonLabel}
                </button>
                {item.status === "archived" ? (
                  <button
                    type="button"
                    onClick={onRestore}
                    disabled={isMutatingMedia}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-5 text-sm font-bold text-[var(--brand-strong)]"
                  >
                    {restorePending ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <RotateCcw className="h-4 w-4" aria-hidden />
                    )}
                    {restoreButtonLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onArchive}
                    disabled={isMutatingMedia}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-red-200 px-5 text-sm font-bold text-red-700"
                  >
                    {archivePending ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Archive className="h-4 w-4" aria-hidden />
                    )}
                    {archiveButtonLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCheckStatus}
                  disabled={isMutatingMedia}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-5 text-sm font-bold text-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {checkStatusPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <RotateCcw className="h-4 w-4" aria-hidden />
                  )}
                  {checkStatusPending ? "Checking status..." : "Check status"}
                </button>
              </div>
            </section>

            <section className="border-t border-[var(--border)] pt-5">
              <div className="border border-[var(--border)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold">Rename draft image</p>
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
                  aria-label="New file path"
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
                    disabled={!canMove || isCheckingMove || !trimmedMoveKey}
                    className="inline-flex min-h-10 items-center justify-center rounded-sm border border-[var(--border)] text-xs font-bold disabled:opacity-50"
                  >
                    {isCheckingMove ? "Checking..." : "Check path"}
                  </button>
                  <button
                    type="button"
                    onClick={onMove}
                    disabled={!canSubmitMove}
                    className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--brand-strong)] text-xs font-bold text-white disabled:opacity-50"
                  >
                    {isMoving ? "Moving..." : "Move"}
                  </button>
                </div>
              </div>

            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}
