"use client";

import { useMemo, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type {
  AdminMediaPlacementSlot,
  AdminMediaItem,
  MediaLibrary,
  MediaAdminSession,
  MediaPlacementSlotKey,
  MediaService,
  MediaStatus,
  MediaSubCategory,
} from "@/lib/media/types";
import { AdminMediaFilters } from "./AdminMediaFilters";
import { AdminMediaGrid } from "./AdminMediaGrid";
import { AdminMediaHeader } from "./AdminMediaHeader";
import { AdminMediaInspector } from "./AdminMediaInspector";
import { AdminMediaNotice } from "./AdminMediaNotice";
import { AdminMediaPlacements } from "./AdminMediaPlacements";
import { AdminMediaSidebar } from "./AdminMediaSidebar";
import { AdminMediaUploadPanel } from "./AdminMediaUploadPanel";
import { AdminMediaUploadQueue } from "./AdminMediaUploadQueue";
import type {
  BatchArchiveFeedback,
  EditorState,
  AdminMediaViewMode,
  LibraryFilter,
  MediaPlacementUsage,
  PlacementPageFilter,
  SortMode,
  StatusFilter,
  UploadQueueItem,
} from "./types";

interface AdminMediaLibraryProps {
  activePlacementPickerSlotKey: MediaPlacementSlotKey | null;
  affectedPages: string[];
  canMove: boolean;
  catalogError: string;
  counts: Record<MediaStatus, number>;
  editor: EditorState | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  items: AdminMediaItem[];
  filteredItems: AdminMediaItem[];
  archiveSelectionIds: readonly number[];
  batchArchiveFeedback: BatchArchiveFeedback | null;
  selectedBatchItems: readonly AdminMediaItem[];
  isCheckingMove: boolean;
  isBatchArchiving: boolean;
  isLoadingCatalog: boolean;
  isLoadingPlacements: boolean;
  isMoving: boolean;
  isMutatingPlacement: MediaPlacementSlotKey | null;
  isRevalidating: boolean;
  isSaving: boolean;
  isUploading: boolean;
  moveDestinationAvailable: boolean | null;
  moveKey: string;
  moveMessage: string;
  notice: string;
  placementError: string;
  placementSlots: AdminMediaPlacementSlot[];
  publishBlocked: boolean;
  query: string;
  selectedId: number | null;
  selectedItem: AdminMediaItem | null;
  selectedPlacementUsages: MediaPlacementUsage[];
  libraryFilter: LibraryFilter;
  serviceFilter: "all" | MediaService;
  serviceSubCategories: readonly MediaSubCategory[];
  session: MediaAdminSession | null;
  sortMode: SortMode;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  uploadQueue: UploadQueueItem[];
  uploadLibrary: MediaLibrary;
  uploadReadyCount: number;
  uploadService: MediaService;
  uploadSubCategory: MediaSubCategory;
  onArchive: () => void;
  onArchiveSelected: () => void;
  onArchiveSelectionToggle: (id: number) => void;
  onAssignPlacement: (slotKey: MediaPlacementSlotKey, mediaId: number) => void;
  onCheckDestination: () => void;
  onClearPlacement: (slotKey: MediaPlacementSlotKey) => void;
  onClearNotice: () => void;
  onClearArchiveSelection: () => void;
  onEditSelectedArchiveItem: (id: number) => void;
  onFilesSelected: (files: File[]) => void;
  onLogout: () => void;
  onMove: () => void;
  onMoveKeyChange: (value: string) => void;
  onRemoveUpload: (id: string) => void;
  onRetryUpload: (id: string) => void;
  onRestore: () => void;
  onSave: () => void;
  onLibraryFilterChange: (value: LibraryFilter) => void;
  onSearchChange: (value: string) => void;
  onSelectedIdChange: (id: number | null) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onSortModeChange: (value: SortMode) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
  onPlacementPickerSlotChange: (slotKey: MediaPlacementSlotKey | null) => void;
  onTriggerRevalidate: () => void;
  onUpdateEditor: <Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) => void;
  onUploadDrafts: () => void;
  onUpdateUploadItemTarget: (
    id: string,
    target:
      | {
          library: "portfolio";
          service: MediaService;
          subCategory: MediaSubCategory;
        }
      | {
          library: "site";
        },
  ) => void;
  onUploadTargetChange: (
    target:
      | {
          library: "portfolio";
          service: MediaService;
          subCategory: MediaSubCategory;
        }
      | {
          library: "site";
        },
  ) => void;
}

export function AdminMediaLibrary({
  activePlacementPickerSlotKey,
  affectedPages,
  canMove,
  catalogError,
  counts,
  editor,
  fileInputRef,
  items,
  filteredItems,
  archiveSelectionIds,
  batchArchiveFeedback,
  selectedBatchItems,
  isCheckingMove,
  isBatchArchiving,
  isLoadingCatalog,
  isLoadingPlacements,
  isMoving,
  isMutatingPlacement,
  isRevalidating,
  isSaving,
  isUploading,
  moveDestinationAvailable,
  moveKey,
  moveMessage,
  notice,
  placementError,
  placementSlots,
  publishBlocked,
  query,
  selectedId,
  selectedItem,
  selectedPlacementUsages,
  libraryFilter,
  serviceFilter,
  serviceSubCategories,
  session,
  sortMode,
  statusFilter,
  subCategoryFilter,
  uploadQueue,
  uploadLibrary,
  uploadReadyCount,
  uploadService,
  uploadSubCategory,
  onArchive,
  onArchiveSelected,
  onArchiveSelectionToggle,
  onAssignPlacement,
  onCheckDestination,
  onClearPlacement,
  onClearNotice,
  onClearArchiveSelection,
  onEditSelectedArchiveItem,
  onFilesSelected,
  onLogout,
  onMove,
  onMoveKeyChange,
  onRemoveUpload,
  onRetryUpload,
  onRestore,
  onSave,
  onLibraryFilterChange,
  onSearchChange,
  onSelectedIdChange,
  onServiceFilterChange,
  onSortModeChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
  onPlacementPickerSlotChange,
  onTriggerRevalidate,
  onUpdateEditor,
  onUploadDrafts,
  onUpdateUploadItemTarget,
  onUploadTargetChange,
}: AdminMediaLibraryProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [viewMode, setViewMode] = useState<AdminMediaViewMode>("library");
  const [placementPageFilter, setPlacementPageFilter] =
    useState<PlacementPageFilter>("all");
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const placementPageOptions = useMemo(
    () =>
      Array.from(
        new Set(placementSlots.map((slot) => slot.pageLabel).filter(Boolean)),
      ),
    [placementSlots],
  );
  const activeMobileFilter =
    viewMode === "placements"
      ? placementPageFilter === "all"
        ? "Page images"
        : placementPageFilter
      : libraryFilter === "site"
        ? "Site Images"
        : subCategoryFilter !== "all"
          ? subCategoryFilter
          : serviceFilter !== "all"
            ? serviceFilter
            : libraryFilter === "portfolio"
              ? "Portfolio"
              : "All Images";
  const hasInspector =
    uploadPanelOpen ||
    Boolean(selectedItem) ||
    selectedBatchItems.length > 1 ||
    Boolean(batchArchiveFeedback);
  const inspectorWidth = "clamp(540px, 42vw, 680px)";
  const inspectorTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        width: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.18, ease: "easeOut" },
      };

  function handleViewModeChange(mode: AdminMediaViewMode) {
    setViewMode(mode);
    setUploadPanelOpen(false);
    if (mode === "library") {
      onPlacementPickerSlotChange(null);
    }
  }

  function handlePlacementPageFilterChange(value: PlacementPageFilter) {
    setPlacementPageFilter(value);
    setUploadPanelOpen(false);
    onPlacementPickerSlotChange(null);
  }

  function openUploadPanel() {
    onClearArchiveSelection();
    onSelectedIdChange(null);
    setUploadPanelOpen(true);
  }

  function handleFilesSelected(files: File[]) {
    setUploadPanelOpen(true);
    onFilesSelected(files);
  }

  function handleMediaSelect(id: number) {
    setUploadPanelOpen(false);
    onSelectedIdChange(id);
  }

  function handleArchiveSelectionToggle(id: number) {
    setUploadPanelOpen(false);
    onArchiveSelectionToggle(id);
  }

  return (
    <main className="admin-media-shell min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] lg:h-[100dvh] lg:overflow-hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-white/96 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" aria-label="Iffer's Pictures home" className="block">
          <Image
            src="/logo-black.png"
            alt="Iffer's Pictures"
            width={112}
            height={60}
            priority
            className="h-11 w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-3 text-sm font-bold text-[var(--foreground)]"
          aria-label="Open media navigation"
          aria-expanded={mobileNavOpen}
        >
          <Menu className="h-4 w-4" aria-hidden />
          {activeMobileFilter}
        </button>
      </header>
      <div className="grid min-h-screen lg:h-[100dvh] lg:min-h-0 lg:grid-cols-[220px_1fr] lg:overflow-hidden">
        <AdminMediaSidebar
          isMobileOpen={mobileNavOpen}
          placementPageFilter={placementPageFilter}
          placementPageOptions={placementPageOptions}
          session={session}
          libraryFilter={libraryFilter}
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          subCategoryFilter={subCategoryFilter}
          viewMode={viewMode}
          onCloseMobile={() => setMobileNavOpen(false)}
          onLogout={onLogout}
          onLibraryFilterChange={onLibraryFilterChange}
          onPlacementPageFilterChange={handlePlacementPageFilterChange}
          onServiceFilterChange={onServiceFilterChange}
          onStatusFilterChange={onStatusFilterChange}
          onSubCategoryFilterChange={onSubCategoryFilterChange}
          onViewModeChange={handleViewModeChange}
        />

        <section className="grid min-w-0 lg:min-h-0 lg:overflow-hidden xl:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 lg:min-h-0 lg:overflow-y-auto">
            <AdminMediaHeader
              counts={counts}
              fileInputRef={fileInputRef}
              isRevalidating={isRevalidating}
              onFilesSelected={handleFilesSelected}
              onOpenUpload={openUploadPanel}
              onTriggerRevalidate={onTriggerRevalidate}
            />

            <div className="space-y-5 px-5 py-5 md:px-7">
              {(notice || catalogError) && (
                <AdminMediaNotice
                  catalogError={catalogError}
                  notice={notice}
                  onClear={onClearNotice}
                />
              )}

              {viewMode === "library" ? (
                <>
                  <AdminMediaFilters
                    libraryFilter={libraryFilter}
                    query={query}
                    serviceFilter={serviceFilter}
                    serviceSubCategories={serviceSubCategories}
                    sortMode={sortMode}
                    statusFilter={statusFilter}
                    subCategoryFilter={subCategoryFilter}
                    onLibraryFilterChange={onLibraryFilterChange}
                    onSearchChange={onSearchChange}
                    onServiceFilterChange={onServiceFilterChange}
                    onSortModeChange={onSortModeChange}
                    onStatusFilterChange={onStatusFilterChange}
                    onSubCategoryFilterChange={onSubCategoryFilterChange}
                  />

                  <AdminMediaGrid
                    archiveSelectionIds={archiveSelectionIds}
                    items={filteredItems}
                    isLoading={isLoadingCatalog}
                    selectedId={selectedId}
                    onArchiveSelectionToggle={handleArchiveSelectionToggle}
                    onSelect={handleMediaSelect}
                  />
                </>
              ) : (
                <AdminMediaPlacements
                  activePickerSlotKey={activePlacementPickerSlotKey}
                  error={placementError}
                  isLoading={isLoadingPlacements}
                  isMutatingSlotKey={isMutatingPlacement}
                  items={items}
                  pageFilter={placementPageFilter}
                  slots={placementSlots}
                  onAssign={onAssignPlacement}
                  onClear={onClearPlacement}
                  onPickerSlotChange={onPlacementPickerSlotChange}
                  onSelectMedia={handleMediaSelect}
                />
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {hasInspector && (
              <motion.div
                key="admin-media-inspector"
                className="min-w-0 overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: inspectorWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={inspectorTransition}
              >
                <div style={{ width: inspectorWidth }}>
                  {uploadPanelOpen ? (
                    <aside className="fixed inset-0 z-50 overflow-y-auto bg-white xl:static xl:z-auto xl:h-[100dvh] xl:border-l xl:border-[var(--border)]">
                      <div className="mx-auto w-full max-w-5xl space-y-5 p-5 md:p-7 xl:max-w-none xl:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
                              Selected media
                            </p>
                            <h2 className="mt-1 font-heading text-2xl font-semibold">
                              Upload media
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadPanelOpen(false)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
                            aria-label="Close upload panel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <AdminMediaUploadPanel
                          fileInputRef={fileInputRef}
                          isUploading={isUploading}
                          uploadLibrary={uploadLibrary}
                          uploadReadyCount={uploadReadyCount}
                          uploadService={uploadService}
                          uploadSubCategory={uploadSubCategory}
                          onFilesSelected={handleFilesSelected}
                          onUploadDrafts={onUploadDrafts}
                          onUploadTargetChange={onUploadTargetChange}
                        />

                        {uploadQueue.length > 0 && (
                          <AdminMediaUploadQueue
                            isUploading={isUploading}
                            items={uploadQueue}
                            onRemoveUpload={onRemoveUpload}
                            onRetryUpload={onRetryUpload}
                            onUpdateUploadItemTarget={onUpdateUploadItemTarget}
                          />
                        )}
                      </div>
                    </aside>
                  ) : (
                    <AdminMediaInspector
                    affectedPages={affectedPages}
                    canMove={canMove}
                    editor={editor}
                    isCheckingMove={isCheckingMove}
                    isBatchArchiving={isBatchArchiving}
                    isMoving={isMoving}
                    isSaving={isSaving}
                    item={selectedItem}
                    moveDestinationAvailable={moveDestinationAvailable}
                    moveKey={moveKey}
                    moveMessage={moveMessage}
                    publishBlocked={publishBlocked}
                    selectedBatchItems={selectedBatchItems}
                    batchArchiveFeedback={batchArchiveFeedback}
                    placementUsages={selectedPlacementUsages}
                    onArchive={onArchive}
                    onArchiveSelected={onArchiveSelected}
                    onCheckDestination={onCheckDestination}
                    onClose={() => {
                      if (archiveSelectionIds.length > 0) {
                        onClearArchiveSelection();
                        return;
                      }
                      onSelectedIdChange(null);
                    }}
                    onClearArchiveSelection={onClearArchiveSelection}
                    onEditSelectedItem={onEditSelectedArchiveItem}
                    onMove={onMove}
                    onMoveKeyChange={onMoveKeyChange}
                    onRemoveArchiveSelectionItem={onArchiveSelectionToggle}
                    onRestore={onRestore}
                    onSave={onSave}
                    onUpdateEditor={onUpdateEditor}
                  />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
