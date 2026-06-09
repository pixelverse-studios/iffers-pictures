"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  ImagePlus,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import {
  MEDIA_LIBRARIES,
  MEDIA_SERVICES,
  type AdminMediaItem,
  type AdminMediaPlacementSlot,
  type MediaLibrary,
  type MediaPlacementSlotKey,
  type MediaService,
  type MediaSiteCategory,
} from "@/lib/media/types";
import { StatusPill } from "./StatusPill";
import type { PlacementPageFilter } from "./types";
import { getMediaCategoryLabel, getMediaLibrary } from "./utils";

interface AdminMediaPlacementsProps {
  activePickerSlotKey: MediaPlacementSlotKey | null;
  error: string;
  isLoading: boolean;
  isMutatingSlotKey: MediaPlacementSlotKey | null;
  items: AdminMediaItem[];
  pageFilter: PlacementPageFilter;
  slots: AdminMediaPlacementSlot[];
  onAssign: (slotKey: MediaPlacementSlotKey, mediaId: number) => void;
  onClear: (slotKey: MediaPlacementSlotKey) => void;
  onPickerSlotChange: (slotKey: MediaPlacementSlotKey | null) => void;
  onSelectMedia: (id: number) => void;
}

function groupSlotsByPage(slots: AdminMediaPlacementSlot[]) {
  return slots.reduce<Record<string, AdminMediaPlacementSlot[]>>((groups, slot) => {
    groups[slot.pageLabel] = [...(groups[slot.pageLabel] ?? []), slot];
    return groups;
  }, {});
}

function getPreferredSiteCategory(pageLabel: string): MediaSiteCategory | null {
  if (pageLabel === "Home") return "Home";
  if (pageLabel === "About") return "About";
  return null;
}

export function AdminMediaPlacements({
  activePickerSlotKey,
  error,
  isLoading,
  isMutatingSlotKey,
  items,
  pageFilter,
  slots,
  onAssign,
  onClear,
  onPickerSlotChange,
  onSelectMedia,
}: AdminMediaPlacementsProps) {
  const [query, setQuery] = useState("");
  const [libraryFilter, setLibraryFilter] = useState<"all" | MediaLibrary>("all");
  const [serviceFilter, setServiceFilter] = useState<"all" | MediaService>("all");
  const activeSlot = slots.find((slot) => slot.slotKey === activePickerSlotKey);
  const activeSlotPageLabel = activeSlot?.pageLabel ?? "";
  const preferredSiteCategory = getPreferredSiteCategory(activeSlotPageLabel);
  const normalizedQuery = query.trim().toLowerCase();
  const publishedItems = items
    .filter((item) => {
      if (item.status !== "published") return false;
      const itemLibrary = getMediaLibrary(item);
      if (libraryFilter !== "all" && itemLibrary !== libraryFilter) return false;
      if (
        itemLibrary === "portfolio" &&
        serviceFilter !== "all" &&
        item.service !== serviceFilter
      ) {
        return false;
      }
      if (!normalizedQuery) return true;
      return [
        item.filename,
        item.key,
        item.alt,
        itemLibrary,
        item.siteCategory,
        item.service,
        item.subCategory,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    })
    .sort((a, b) => {
      if (!preferredSiteCategory) return a.sortOrder - b.sortOrder || a.id - b.id;
      const aPreferred =
        getMediaLibrary(a) === "site" && a.siteCategory === preferredSiteCategory;
      const bPreferred =
        getMediaLibrary(b) === "site" && b.siteCategory === preferredSiteCategory;
      if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
      if (getMediaLibrary(a) !== getMediaLibrary(b)) {
        return getMediaLibrary(a) === "site" ? -1 : 1;
      }
      return a.sortOrder - b.sortOrder || a.id - b.id;
    });
  const visibleSlots = useMemo(
    () =>
      pageFilter === "all"
        ? slots
        : slots.filter((slot) => slot.pageLabel === pageFilter),
    [pageFilter, slots],
  );
  const slotsByPage = groupSlotsByPage(visibleSlots);
  const heading =
    pageFilter === "all" ? "Page placements" : `${pageFilter} placements`;

  if (isLoading) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-56 animate-pulse border border-[var(--border)] bg-white" />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="border border-red-100 bg-red-50 p-6 text-sm font-semibold text-red-700">
        {error}
      </section>
    );
  }

  if (slots.length === 0) {
    return (
      <section className="border border-[var(--border)] bg-white p-10 text-center">
        <ImagePlus className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          No placement slots available
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Refresh after the placement API slot registry is available.
        </p>
      </section>
    );
  }

  if (visibleSlots.length === 0) {
    return (
      <section className="border border-[var(--border)] bg-white p-10 text-center">
        <ImagePlus className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h2 className="mt-4 font-heading text-2xl font-semibold">
          No placements for this page
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Pick another placement page from the media navigation.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="border border-[var(--border)] bg-white p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
              {heading}
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-[var(--text-secondary)]">
              Assign published catalog images to named frontend slots. Draft and
              archived media stay unavailable until they are published.
            </p>
          </div>
          <span className="w-fit rounded-sm bg-[var(--background-warm)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-strong)]">
            {visibleSlots.length} slots
          </span>
        </div>
      </div>

      {Object.entries(slotsByPage).map(([pageLabel, pageSlots]) => (
        <div key={pageLabel} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
            {pageLabel}
          </h3>
          <div className="grid gap-3 xl:grid-cols-2">
            {pageSlots.map((slot) => {
              const assignment = slot.assignment;
              const media = assignment?.media;
              const isPickerOpen = activePickerSlotKey === slot.slotKey;
              const isMutating = isMutatingSlotKey === slot.slotKey;

              return (
                <article
                  key={slot.slotKey}
                  className="overflow-hidden border border-[var(--border)] bg-white"
                >
                  <div className="grid min-h-52 md:grid-cols-[170px_1fr]">
                    <button
                      type="button"
                      onClick={() => media && onSelectMedia(media.id)}
                      disabled={!media}
                      className="relative min-h-44 bg-[var(--background-warm)] text-left disabled:cursor-default"
                    >
                      {media ? (
                        <Image
                          src={media.src}
                          alt={media.alt || media.filename}
                          fill
                          sizes="170px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="grid h-full place-items-center p-5 text-center text-[var(--text-muted)]">
                          <div>
                            <ImagePlus className="mx-auto h-9 w-9" aria-hidden />
                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em]">
                              Unassigned
                            </p>
                          </div>
                        </div>
                      )}
                    </button>

                    <div className="flex min-w-0 flex-col justify-between gap-4 p-4">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h4 className="font-heading text-xl font-semibold text-[var(--foreground)]">
                              {slot.sectionLabel}
                            </h4>
                            <p className="mt-1 break-all text-xs font-bold text-[var(--text-muted)]">
                              {slot.slotKey}
                            </p>
                          </div>
                          {media ? (
                            <span className="inline-flex items-center gap-1 rounded-sm bg-[var(--brand-soft)] px-2 py-1 text-[11px] font-bold text-[var(--brand-strong)]">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                              Assigned
                            </span>
                          ) : (
                            <span className="rounded-sm bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800">
                              Empty
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                          {slot.description}
                        </p>
                        {media && (
                          <button
                            type="button"
                            onClick={() => onSelectMedia(media.id)}
                            className="mt-3 text-left text-xs font-semibold text-[var(--brand-strong)]"
                          >
                            {media.filename}
                          </button>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {slot.expectedAspectRatios?.map((ratio) => (
                            <span
                              key={ratio}
                              className="rounded-sm border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)]"
                            >
                              {ratio}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {slot.affectedPaths.map((path) => (
                            <Link
                              key={path}
                              href={path}
                              className="inline-flex items-center gap-1 rounded-sm bg-[var(--background-warm)] px-2 py-1 text-xs font-bold text-[var(--brand-strong)]"
                            >
                              {path}
                              <ExternalLink className="h-3 w-3" aria-hidden />
                            </Link>
                          ))}
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              onPickerSlotChange(isPickerOpen ? null : slot.slotKey)
                            }
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white"
                          >
                            <ImagePlus className="h-4 w-4" aria-hidden />
                            {media ? "Replace" : "Assign"}
                          </button>
                          <button
                            type="button"
                            onClick={() => onClear(slot.slotKey)}
                            disabled={!media || isMutating}
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-red-200 px-4 text-sm font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isMutating ? (
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            ) : (
                              <Trash2 className="h-4 w-4" aria-hidden />
                            )}
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}

      {activeSlot && (
        <section className="sticky bottom-4 z-10 border border-[var(--brand-soft)] bg-white p-4 shadow-[0_18px_60px_-36px_rgba(26,32,48,0.55)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-heading text-xl font-semibold text-[var(--foreground)]">
                Assign image to {activeSlot.pageLabel} · {activeSlot.sectionLabel}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                Published images only. One image can be used in multiple placements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onPickerSlotChange(null)}
              className="w-fit rounded-sm border border-[var(--border)] px-3 py-2 text-xs font-bold"
            >
              Close picker
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_160px_180px]">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search published media..."
                className="min-h-11 w-full rounded-sm border border-[var(--border)] bg-white pl-10 pr-3 text-sm font-semibold outline-none focus:border-[var(--brand-strong)]"
              />
            </label>
            <select
              value={libraryFilter}
              onChange={(event) =>
                setLibraryFilter(event.currentTarget.value as "all" | MediaLibrary)
              }
              className="min-h-11 rounded-sm border border-[var(--border)] bg-white px-3 text-sm font-bold outline-none focus:border-[var(--brand-strong)]"
              aria-label="Filter assignment media by library"
            >
              <option value="all">All media</option>
              {MEDIA_LIBRARIES.map((library) => (
                <option key={library} value={library}>
                  {library === "site" ? "Site Images" : "Portfolio"}
                </option>
              ))}
            </select>
            <select
              value={serviceFilter}
              onChange={(event) =>
                setServiceFilter(event.currentTarget.value as "all" | MediaService)
              }
              disabled={libraryFilter === "site"}
              className="min-h-11 rounded-sm border border-[var(--border)] bg-white px-3 text-sm font-bold outline-none focus:border-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Filter assignment media by portfolio service"
            >
              <option value="all">All services</option>
              {MEDIA_SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {publishedItems.length === 0 ? (
            <div className="mt-4 border border-[var(--border)] bg-[var(--background-warm)] p-5 text-center text-sm font-semibold text-[var(--text-secondary)]">
              No published media matches this picker.
            </div>
          ) : (
            <div className="mt-4 grid max-h-[45dvh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {publishedItems.map((item) => {
                const isMutating = isMutatingSlotKey === activeSlot.slotKey;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onAssign(activeSlot.slotKey, item.id)}
                    disabled={isMutating}
                    className="group overflow-hidden border border-[var(--border)] bg-white text-left transition hover:border-[var(--brand-strong)] disabled:cursor-wait disabled:opacity-60"
                  >
                    <div className="relative aspect-[4/3] bg-[var(--background-warm)]">
                      <Image
                        src={item.src}
                        alt={item.alt || item.filename}
                        fill
                        sizes="(max-width: 768px) 50vw, 220px"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="space-y-2 p-3">
                      <p className="truncate text-sm font-bold">{item.filename}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill status={item.status} />
                        <span className="text-xs text-[var(--text-muted)]">
                          {item.aspectRatio ?? "unset"}
                        </span>
                      </div>
                      <p className="truncate text-xs text-[var(--text-secondary)]">
                        {getMediaCategoryLabel(item)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}
    </section>
  );
}
