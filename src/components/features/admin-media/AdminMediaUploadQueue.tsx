"use client";

import { Select } from "@mantine/core";
import { CheckCircle2, RotateCcw, TriangleAlert, X } from "lucide-react";
import type {
  MediaLibrary,
  MediaService,
  MediaSubCategory,
} from "@/lib/media/types";
import { CATEGORY_OPTIONS } from "./constants";
import type { UploadQueueItem } from "./types";
import { formatBytes, getUploadValidationMessage } from "./utils";

interface AdminMediaUploadQueueProps {
  isUploading: boolean;
  items: UploadQueueItem[];
  onRemoveUpload: (id: string) => void;
  onRetryUpload: (id: string) => void;
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
}

export function AdminMediaUploadQueue({
  isUploading,
  items,
  onRemoveUpload,
  onRetryUpload,
  onUpdateUploadItemTarget,
}: AdminMediaUploadQueueProps) {
  const categoryOptions = CATEGORY_OPTIONS.map((option) => ({
    value: `${option.service}|${option.subCategory}`,
    label: option.subCategory,
  }));
  const libraryOptions: { value: MediaLibrary; label: string }[] = [
    { value: "portfolio", label: "Portfolio" },
    { value: "site", label: "Site Images" },
  ];
  const statusCopy = {
    queued: "Ready",
    uploading: "Uploading",
    created: "Uploaded",
    error: "Needs attention",
  } satisfies Record<UploadQueueItem["status"], string>;

  return (
    <section className="border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h2 className="font-heading text-xl font-semibold">Images ready to upload</h2>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => {
          const validationMessage = getUploadValidationMessage(item.file);
          const canRetry = item.status === "error" && !validationMessage && !isUploading;

          return (
            <div
              key={item.id}
              className="grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_140px_200px_minmax(160px,0.8fr)_auto] md:items-center"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{item.file.name}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {formatBytes(item.file.size)} · {item.file.type || "unknown"}
                </p>
              </div>
              <Select
                aria-label={`Image group for ${item.file.name}`}
                value={item.library}
                onChange={(value) => {
                  const library = (value ?? "portfolio") as MediaLibrary;
                  if (library === "site") {
                    onUpdateUploadItemTarget(item.id, {
                      library: "site",
                    });
                    return;
                  }

                  onUpdateUploadItemTarget(item.id, {
                    library: "portfolio",
                    service: item.service || "Events",
                    subCategory: item.subCategory || "Baby Shower",
                  });
                }}
                data={libraryOptions}
                disabled={item.status === "uploading" || item.status === "created"}
                allowDeselect={false}
                radius="sm"
                styles={{
                  input: { backgroundColor: "#ffffff", fontSize: "0.75rem" },
                }}
              />
              {item.library === "site" ? (
                <div className="min-h-9 rounded-sm border border-[var(--border)] bg-[var(--background-warm)] px-3 py-2 text-xs font-bold text-[var(--text-secondary)]">
                  Website images
                </div>
              ) : (
                <Select
                  aria-label={`Save under category for ${item.file.name}`}
                  value={`${item.service}|${item.subCategory}`}
                  onChange={(value) => {
                    if (!value) return;
                    const [service, subCategory] = value.split("|") as [
                      MediaService,
                      MediaSubCategory,
                    ];
                    onUpdateUploadItemTarget(item.id, {
                      library: "portfolio",
                      service,
                      subCategory,
                    });
                  }}
                  data={categoryOptions}
                  disabled={item.status === "uploading" || item.status === "created"}
                  allowDeselect={false}
                  radius="sm"
                  styles={{
                    input: { backgroundColor: "#ffffff", fontSize: "0.75rem" },
                  }}
                />
              )}
              <div aria-live={item.status === "uploading" ? "polite" : undefined}>
                <p
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    item.status === "error"
                      ? "text-red-700"
                      : item.status === "created"
                        ? "text-[var(--brand-strong)]"
                        : "text-[var(--foreground)]"
                  }`}
                >
                  {item.status === "error" && (
                    <TriangleAlert className="h-3.5 w-3.5" aria-hidden />
                  )}
                  {item.status === "created" && (
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  )}
                  {statusCopy[item.status]}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {item.message}
                </p>
                {item.status === "uploading" && (
                  <div className="mt-2 h-1.5 bg-[var(--background-warm)]">
                    <div
                      className="h-full bg-[var(--brand-strong)]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                {canRetry && (
                  <button
                    type="button"
                    onClick={() => onRetryUpload(item.id)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[var(--border)] px-3 text-xs font-bold text-[var(--brand-strong)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Retry
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onRemoveUpload(item.id)}
                  disabled={item.status === "uploading"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
