"use client";

import { Select } from "@mantine/core";
import type { RefObject } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import type {
  MediaLibrary,
  MediaService,
  MediaSubCategory,
} from "@/lib/media/types";
import { CATEGORY_OPTIONS } from "./constants";

interface AdminMediaUploadPanelProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  uploadLibrary: MediaLibrary;
  uploadReadyCount: number;
  uploadService: MediaService;
  uploadSubCategory: MediaSubCategory;
  onFilesSelected: (files: File[]) => void;
  onUploadDrafts: () => void;
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

export function AdminMediaUploadPanel({
  fileInputRef,
  isUploading,
  uploadLibrary,
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
  const uploadTargetLabel =
    uploadLibrary === "site" ? "Site Images" : uploadSubCategory;

  return (
    <section className="space-y-4 border border-[var(--border)] bg-white p-4">
      <div
        className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[var(--border)] bg-[var(--background-warm)] p-6 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          onFilesSelected(Array.from(event.dataTransfer.files));
        }}
      >
        <ImagePlus className="h-10 w-10 text-[var(--brand-strong)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          Upload to {uploadTargetLabel}
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
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "portfolio", label: "Portfolio" },
            { value: "site", label: "Site Images" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (option.value === "site") {
                  onUploadTargetChange({
                    library: "site",
                  });
                  return;
                }

                onUploadTargetChange({
                  library: "portfolio",
                  service: uploadService,
                  subCategory: uploadSubCategory,
                });
              }}
              className={`min-h-10 rounded-sm border px-3 text-sm font-bold transition duration-200 ease-out active:translate-y-px ${
                uploadLibrary === option.value
                  ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--brand-strong)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {uploadLibrary === "portfolio" ? (
          <Select
            label="Save under"
            value={`${uploadService}|${uploadSubCategory}`}
            onChange={(value) => {
              if (!value) return;
              const [service, subCategory] = value.split("|") as [
                MediaService,
                MediaSubCategory,
              ];
              onUploadTargetChange({
                library: "portfolio",
                service,
                subCategory,
              });
            }}
            data={categoryOptions}
            allowDeselect={false}
            radius="sm"
            styles={{
              label: { fontWeight: 700 },
              input: { backgroundColor: "#ffffff", fontSize: "0.875rem" },
            }}
          />
        ) : (
          <div className="border border-[var(--border)] bg-[var(--background-warm)] p-3 text-sm font-semibold text-[var(--text-secondary)]">
            Site image uploads are saved with general website images.
          </div>
        )}
        <div className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-bold">Image description required after upload</p>
          <p className="mt-1 leading-6">
            Uploads are drafts. Add an image description before publishing.
          </p>
        </div>
        <button
          type="button"
          onClick={onUploadDrafts}
          disabled={isUploading || uploadReadyCount === 0}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          Upload images ({uploadReadyCount})
        </button>
      </div>
    </section>
  );
}
