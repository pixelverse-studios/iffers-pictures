"use client";

import { Select } from "@mantine/core";
import { X } from "lucide-react";
import type {
  MediaLibrary,
  MediaService,
  MediaSubCategory,
} from "@/lib/media/types";
import { CATEGORY_OPTIONS } from "./constants";
import type { UploadQueueItem } from "./types";
import { formatBytes } from "./utils";

interface AdminMediaUploadQueueProps {
  items: UploadQueueItem[];
  onRemoveUpload: (id: string) => void;
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
  items,
  onRemoveUpload,
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

  return (
    <section className="border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h2 className="font-heading text-xl font-semibold">Images ready to upload</h2>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_140px_200px_120px_auto] md:items-center"
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
            <div>
              <p className="text-xs font-bold capitalize">{item.status}</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.message}</p>
              {item.status === "uploading" && (
                <div className="mt-2 h-1.5 bg-[var(--background-warm)]">
                  <div
                    className="h-full bg-[var(--brand-strong)]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemoveUpload(item.id)}
              disabled={item.status === "uploading"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
              aria-label={`Remove ${item.file.name}`}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
