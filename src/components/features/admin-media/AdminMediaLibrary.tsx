"use client";

import { useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import type {
  AdminMediaItem,
  MediaAdminSession,
  MediaService,
  MediaStatus,
  MediaSubCategory,
} from "@/lib/media/types";
import { AdminMediaFilters } from "./AdminMediaFilters";
import { AdminMediaGrid } from "./AdminMediaGrid";
import { AdminMediaHeader } from "./AdminMediaHeader";
import { AdminMediaInspector } from "./AdminMediaInspector";
import { AdminMediaNotice } from "./AdminMediaNotice";
import { AdminMediaSidebar } from "./AdminMediaSidebar";
import { AdminMediaUploadPanel } from "./AdminMediaUploadPanel";
import { AdminMediaUploadQueue } from "./AdminMediaUploadQueue";
import type {
  BatchArchiveFeedback,
  EditorState,
  SortMode,
  StatusFilter,
  UploadQueueItem,
} from "./types";

interface AdminMediaLibraryProps {
  affectedPages: string[];
  canMove: boolean;
  catalogError: string;
  counts: Record<MediaStatus, number>;
  editor: EditorState | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  filteredItems: AdminMediaItem[];
  archiveSelectionIds: readonly number[];
  batchArchiveFeedback: BatchArchiveFeedback | null;
  selectedBatchItems: readonly AdminMediaItem[];
  isCheckingMove: boolean;
  isBatchArchiving: boolean;
  isLoadingCatalog: boolean;
  isMoving: boolean;
  isRevalidating: boolean;
  isSaving: boolean;
  isUploading: boolean;
  moveDestinationAvailable: boolean | null;
  moveKey: string;
  moveMessage: string;
  notice: string;
  publishBlocked: boolean;
  query: string;
  selectedId: number | null;
  selectedItem: AdminMediaItem | null;
  serviceFilter: "all" | MediaService;
  serviceSubCategories: readonly MediaSubCategory[];
  session: MediaAdminSession | null;
  sortMode: SortMode;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  uploadQueue: UploadQueueItem[];
  uploadReadyCount: number;
  uploadService: MediaService;
  uploadSubCategory: MediaSubCategory;
  onArchive: () => void;
  onArchiveSelected: () => void;
  onArchiveSelectionToggle: (id: number) => void;
  onCheckDestination: () => void;
  onClearNotice: () => void;
  onClearArchiveSelection: () => void;
  onFilesSelected: (files: File[]) => void;
  onLogout: () => void;
  onMove: () => void;
  onMoveKeyChange: (value: string) => void;
  onRemoveUpload: (id: string) => void;
  onRestore: () => void;
  onSave: () => void;
  onSearchChange: (value: string) => void;
  onSelectedIdChange: (id: number | null) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onSortModeChange: (value: SortMode) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
  onTriggerRevalidate: () => void;
  onUpdateEditor: <Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) => void;
  onUploadDrafts: () => void;
  onUpdateUploadItemTarget: (
    id: string,
    service: MediaService,
    subCategory: MediaSubCategory,
  ) => void;
  onUploadTargetChange: (service: MediaService, subCategory: MediaSubCategory) => void;
}

export function AdminMediaLibrary({
  affectedPages,
  canMove,
  catalogError,
  counts,
  editor,
  fileInputRef,
  filteredItems,
  archiveSelectionIds,
  batchArchiveFeedback,
  selectedBatchItems,
  isCheckingMove,
  isBatchArchiving,
  isLoadingCatalog,
  isMoving,
  isRevalidating,
  isSaving,
  isUploading,
  moveDestinationAvailable,
  moveKey,
  moveMessage,
  notice,
  publishBlocked,
  query,
  selectedId,
  selectedItem,
  serviceFilter,
  serviceSubCategories,
  session,
  sortMode,
  statusFilter,
  subCategoryFilter,
  uploadQueue,
  uploadReadyCount,
  uploadService,
  uploadSubCategory,
  onArchive,
  onArchiveSelected,
  onArchiveSelectionToggle,
  onCheckDestination,
  onClearNotice,
  onClearArchiveSelection,
  onFilesSelected,
  onLogout,
  onMove,
  onMoveKeyChange,
  onRemoveUpload,
  onRestore,
  onSave,
  onSearchChange,
  onSelectedIdChange,
  onServiceFilterChange,
  onSortModeChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
  onTriggerRevalidate,
  onUpdateEditor,
  onUploadDrafts,
  onUpdateUploadItemTarget,
  onUploadTargetChange,
}: AdminMediaLibraryProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeMobileFilter =
    subCategoryFilter !== "all"
      ? subCategoryFilter
      : serviceFilter !== "all"
        ? serviceFilter
        : "All Media";

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
          session={session}
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          subCategoryFilter={subCategoryFilter}
          onCloseMobile={() => setMobileNavOpen(false)}
          onLogout={onLogout}
          onServiceFilterChange={onServiceFilterChange}
          onStatusFilterChange={onStatusFilterChange}
          onSubCategoryFilterChange={onSubCategoryFilterChange}
        />

        <section className="grid min-w-0 lg:min-h-0 lg:overflow-hidden xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 lg:min-h-0 lg:overflow-y-auto">
            <AdminMediaHeader
              counts={counts}
              fileInputRef={fileInputRef}
              isRevalidating={isRevalidating}
              onFilesSelected={onFilesSelected}
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

              <AdminMediaFilters
                query={query}
                serviceFilter={serviceFilter}
                serviceSubCategories={serviceSubCategories}
                sortMode={sortMode}
                statusFilter={statusFilter}
                subCategoryFilter={subCategoryFilter}
                onSearchChange={onSearchChange}
                onServiceFilterChange={onServiceFilterChange}
                onSortModeChange={onSortModeChange}
                onStatusFilterChange={onStatusFilterChange}
                onSubCategoryFilterChange={onSubCategoryFilterChange}
              />

              <AdminMediaUploadPanel
                fileInputRef={fileInputRef}
                isUploading={isUploading}
                uploadReadyCount={uploadReadyCount}
                uploadService={uploadService}
                uploadSubCategory={uploadSubCategory}
                onFilesSelected={onFilesSelected}
                onUploadDrafts={onUploadDrafts}
                onUploadTargetChange={onUploadTargetChange}
              />

              {uploadQueue.length > 0 && (
                <AdminMediaUploadQueue
                  items={uploadQueue}
                  onRemoveUpload={onRemoveUpload}
                  onUpdateUploadItemTarget={onUpdateUploadItemTarget}
                />
              )}

              <AdminMediaGrid
                archiveSelectionIds={archiveSelectionIds}
                items={filteredItems}
                isLoading={isLoadingCatalog}
                selectedId={selectedId}
                onArchiveSelectionToggle={onArchiveSelectionToggle}
                onSelect={onSelectedIdChange}
              />
            </div>
          </div>

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
            onArchive={onArchive}
            onArchiveSelected={onArchiveSelected}
            onCheckDestination={onCheckDestination}
            onClose={() => onSelectedIdChange(null)}
            onClearArchiveSelection={onClearArchiveSelection}
            onMove={onMove}
            onMoveKeyChange={onMoveKeyChange}
            onRemoveArchiveSelectionItem={onArchiveSelectionToggle}
            onRestore={onRestore}
            onSave={onSave}
            onUpdateEditor={onUpdateEditor}
          />
        </section>
      </div>
    </main>
  );
}
