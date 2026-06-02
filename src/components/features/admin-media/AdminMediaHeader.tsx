"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, RefreshCcw, Upload } from "lucide-react";
import {
  MEDIA_UPLOAD_CONTENT_TYPES,
  type MediaStatus,
} from "@/lib/media/types";

interface AdminMediaHeaderProps {
  counts: Record<MediaStatus, number>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isRevalidating: boolean;
  onFilesSelected: (files: File[]) => void;
  onTriggerRevalidate: () => void;
}

export function AdminMediaHeader({
  counts,
  fileInputRef,
  isRevalidating,
  onFilesSelected,
  onTriggerRevalidate,
}: AdminMediaHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/96 px-5 py-4 backdrop-blur md:px-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold">Media</h1>
            <p className="hidden text-sm text-[var(--text-secondary)] md:block">
              {counts.published} published · {counts.draft} draft · {counts.archived}{" "}
              archived
            </p>
          </div>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Uploads start as drafts and stay hidden until published.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={MEDIA_UPLOAD_CONTENT_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(event) => onFilesSelected(Array.from(event.target.files ?? []))}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white"
          >
            <Upload className="h-4 w-4" aria-hidden />
            Upload
          </button>
          <button
            type="button"
            onClick={onTriggerRevalidate}
            disabled={isRevalidating}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--brand-strong)] disabled:opacity-60"
          >
            {isRevalidating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            Revalidate
          </button>
          <Link
            href="/portfolio"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--foreground)]"
          >
            Portfolio
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
