"use client";

import { Select } from "@mantine/core";
import type { RefObject } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import type { MediaService, MediaSubCategory } from "@/lib/media/types";
import { CATEGORY_OPTIONS } from "./constants";

interface AdminMediaUploadPanelProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  uploadReadyCount: number;
  uploadService: MediaService;
  uploadSubCategory: MediaSubCategory;
  onFilesSelected: (files: File[]) => void;
  onUploadDrafts: () => void;
  onUploadTargetChange: (service: MediaService, subCategory: MediaSubCategory) => void;
}

export function AdminMediaUploadPanel({
  fileInputRef,
  isUploading,
  uploadReadyCount,
  uploadService,
  uploadSubCategory,
  onFilesSelected,
  onUploadDrafts,
  onUploadTargetChange,
}: AdminMediaUploadPanelProps) {
  const categoryOptions = CATEGORY_OPTIONS.map((option) => ({
    value: `${option.service}|${option.subCategory}`,
    label: option.subCategory,
  }));

  return (
    <section className="grid gap-4 border border-[var(--border)] bg-white p-4 lg:grid-cols-[1fr_280px]">
      <div
        className="flex min-h-52 flex-col items-center justify-center border border-dashed border-[var(--border)] bg-[var(--background-warm)] p-6 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          onFilesSelected(Array.from(event.dataTransfer.files));
        }}
      >
        <ImagePlus className="h-10 w-10 text-[var(--brand-strong)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          Upload to {uploadSubCategory}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          New images start as drafts until you publish them.
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-6 text-sm font-bold text-white"
        >
          Choose files
        </button>
      </div>
      <div className="space-y-4">
        <Select
          label="Target category"
          value={`${uploadService}|${uploadSubCategory}`}
          onChange={(value) => {
            if (!value) return;
            const [service, subCategory] = value.split("|") as [
              MediaService,
              MediaSubCategory,
            ];
            onUploadTargetChange(service, subCategory);
          }}
          data={categoryOptions}
          allowDeselect={false}
          radius="sm"
          styles={{
            label: { fontWeight: 700 },
            input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
          }}
        />
        <div className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-bold">Alt text required after upload</p>
          <p className="mt-1 leading-6">
            Uploads are drafts. Complete alt text before publishing.
          </p>
        </div>
        <button
          type="button"
          onClick={onUploadDrafts}
          disabled={isUploading || uploadReadyCount === 0}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          Upload drafts ({uploadReadyCount})
        </button>
      </div>
    </section>
  );
}
