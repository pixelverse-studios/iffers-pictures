"use client";

import Image from "next/image";
import { ArrowUpDown, FileImage } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import { StatusPill } from "./StatusPill";

interface AdminMediaGridProps {
  items: AdminMediaItem[];
  isLoading: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function AdminMediaGrid({
  items,
  isLoading,
  selectedId,
  onSelect,
}: AdminMediaGridProps) {
  if (isLoading) {
    return (
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-64 animate-pulse bg-white" />
        ))}
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="border border-[var(--border)] bg-white p-10 text-center">
        <FileImage className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          No media matches this view
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Try a different filter or upload drafts.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`group overflow-hidden border bg-white text-left transition ${
            selectedId === item.id
              ? "border-[var(--brand-strong)] ring-2 ring-[var(--brand-soft)]"
              : "border-[var(--border)] hover:border-[var(--brand-soft)]"
          }`}
        >
          <div className="relative aspect-[4/3] bg-[var(--background-warm)]">
            <Image
              src={item.src}
              alt={item.alt || item.filename}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 truncate text-sm font-bold">{item.filename}</p>
              <ArrowUpDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={item.status} />
              <span className="text-xs text-[var(--text-muted)]">
                {item.aspectRatio ?? "unset"}
              </span>
            </div>
            <p className="truncate text-xs text-[var(--text-secondary)]">
              {item.service ?? "No service"} · {item.subCategory ?? "No sub-category"}
            </p>
          </div>
        </button>
      ))}
    </section>
  );
}
