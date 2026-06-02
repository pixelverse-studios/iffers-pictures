"use client";

import { X } from "lucide-react";
import type { MediaSubCategory } from "@/lib/media/types";
import type { UploadQueueItem } from "./types";
import { formatBytes } from "./utils";

interface AdminMediaUploadQueueProps {
  items: UploadQueueItem[];
  uploadSubCategory: MediaSubCategory;
  onRemoveUpload: (id: string) => void;
}

export function AdminMediaUploadQueue({
  items,
  uploadSubCategory,
  onRemoveUpload,
}: AdminMediaUploadQueueProps) {
  return (
    <section className="border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h2 className="font-heading text-xl font-semibold">Upload queue</h2>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_160px_120px_auto] md:items-center"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{item.file.name}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {formatBytes(item.file.size)} · {item.file.type || "unknown"}
              </p>
            </div>
            <span className="w-fit rounded-sm bg-[var(--brand-soft)] px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">
              {uploadSubCategory}
            </span>
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
