"use client";

import type { RefObject } from "react";
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
import type { EditorState, SortMode, StatusFilter, UploadQueueItem } from "./types";

interface AdminMediaLibraryProps {
  affectedPages: string[];
  canMove: boolean;
  catalogError: string;
  counts: Record<MediaStatus, number>;
  editor: EditorState | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  filteredItems: AdminMediaItem[];
  isCheckingMove: boolean;
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
  onCheckDestination: () => void;
  onClearNotice: () => void;
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
  isCheckingMove,
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
  onCheckDestination,
  onClearNotice,
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
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid min-h-screen lg:grid-cols-[220px_1fr]">
        <AdminMediaSidebar
          session={session}
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          subCategoryFilter={subCategoryFilter}
          onLogout={onLogout}
          onServiceFilterChange={onServiceFilterChange}
          onStatusFilterChange={onStatusFilterChange}
          onSubCategoryFilterChange={onSubCategoryFilterChange}
        />

        <section className="grid min-w-0 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0">
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
                items={filteredItems}
                isLoading={isLoadingCatalog}
                selectedId={selectedId}
                onSelect={onSelectedIdChange}
              />
            </div>
          </div>

          <AdminMediaInspector
            affectedPages={affectedPages}
            canMove={canMove}
            editor={editor}
            isCheckingMove={isCheckingMove}
            isMoving={isMoving}
            isSaving={isSaving}
            item={selectedItem}
            moveDestinationAvailable={moveDestinationAvailable}
            moveKey={moveKey}
            moveMessage={moveMessage}
            publishBlocked={publishBlocked}
            onArchive={onArchive}
            onCheckDestination={onCheckDestination}
            onClose={() => onSelectedIdChange(null)}
            onMove={onMove}
            onMoveKeyChange={onMoveKeyChange}
            onRestore={onRestore}
            onSave={onSave}
            onUpdateEditor={onUpdateEditor}
          />
        </section>
      </div>
    </main>
  );
}
