"use client";

import { Select, TextInput } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MEDIA_LIBRARIES,
  MEDIA_SERVICES,
  MEDIA_STATUSES,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
import { STATUS_COPY } from "./constants";
import type { LibraryFilter, SortMode, StatusFilter } from "./types";

interface AdminMediaFiltersProps {
  libraryFilter: LibraryFilter;
  query: string;
  serviceFilter: "all" | MediaService;
  serviceSubCategories: readonly MediaSubCategory[];
  sortMode: SortMode;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  onLibraryFilterChange: (value: LibraryFilter) => void;
  onSearchChange: (value: string) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onSortModeChange: (value: SortMode) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
}

export function AdminMediaFilters({
  libraryFilter,
  query,
  serviceFilter,
  serviceSubCategories,
  sortMode,
  statusFilter,
  subCategoryFilter,
  onLibraryFilterChange,
  onSearchChange,
  onServiceFilterChange,
  onSortModeChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
}: AdminMediaFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterPanelRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  const serviceOptions = [
    { value: "all", label: "All services" },
    ...MEDIA_SERVICES.map((service) => ({ value: service, label: service })),
  ];
  const libraryOptions = [
    { value: "all", label: "All Images" },
    ...MEDIA_LIBRARIES.map((library) => ({
      value: library,
      label: library === "site" ? "Site Images" : "Portfolio",
    })),
  ];
  const subCategoryOptions = [
    { value: "all", label: "All sub-categories" },
    ...serviceSubCategories.map((subCategory) => ({
      value: subCategory,
      label: subCategory,
    })),
  ];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "sortOrder", label: "Sort order" },
    { value: "filename", label: "Filename" },
  ];

  const activeFilters = useMemo(
    () =>
      [
        serviceFilter !== "all"
          ? { key: "service", label: `Service: ${serviceFilter}` }
          : null,
        libraryFilter !== "all"
          ? {
              key: "library",
              label: libraryFilter === "site" ? "Group: Site Images" : "Group: Portfolio",
            }
          : null,
        subCategoryFilter !== "all"
          ? { key: "subCategory", label: `Photo type: ${subCategoryFilter}` }
          : null,
        statusFilter !== "all"
          ? { key: "status", label: `Status: ${STATUS_COPY[statusFilter]}` }
          : null,
      ].filter((filter): filter is { key: string; label: string } => Boolean(filter)),
    [libraryFilter, serviceFilter, statusFilter, subCategoryFilter],
  );
  const activeFilterCount = activeFilters.length;

  useEffect(() => {
    if (!filtersOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        filterPanelRef.current?.contains(target) ||
        filterButtonRef.current?.contains(target)
      ) {
        return;
      }

      setFiltersOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFiltersOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filtersOpen]);

  function clearFilter(key: string) {
    if (key === "service") {
      onServiceFilterChange("all");
      onSubCategoryFilterChange("all");
      return;
    }

    if (key === "library") {
      onLibraryFilterChange("all");
      onServiceFilterChange("all");
      onSubCategoryFilterChange("all");
      return;
    }

    if (key === "subCategory") {
      onSubCategoryFilterChange("all");
      return;
    }

    if (key === "status") {
      onStatusFilterChange("all");
    }
  }

  function clearAllFilters() {
    onLibraryFilterChange("all");
    onServiceFilterChange("all");
    onSubCategoryFilterChange("all");
    onStatusFilterChange("all");
  }

  return (
    <section className="relative space-y-3">
      <div className="grid gap-3 md:grid-cols-[minmax(240px,1fr)_auto_auto]">
        <TextInput
          type="search"
          className="min-w-0 md:col-span-2 xl:col-span-1"
          value={query}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          placeholder="Search media..."
          leftSection={<Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />}
          radius="sm"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem" },
          }}
        />
        <button
          ref={filterButtonRef}
          type="button"
          onClick={() => setFiltersOpen((current) => !current)}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-4 text-sm font-bold transition duration-200 ease-out active:translate-y-px ${
            filtersOpen || activeFilterCount > 0
              ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
              : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--brand-strong)]"
          }`}
          aria-expanded={filtersOpen}
          aria-controls="admin-media-filter-panel"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {activeFilterCount > 0 && (
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs ${
                filtersOpen || activeFilterCount > 0
                  ? "bg-white/20 text-white"
                  : "bg-[var(--background-warm)] text-[var(--foreground)]"
              }`}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
        <Select
          value={sortMode}
          onChange={(value) => onSortModeChange((value ?? "newest") as SortMode)}
          data={sortOptions}
          allowDeselect={false}
          radius="sm"
          className="md:w-44"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem", fontWeight: 600 },
          }}
        />
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => clearFilter(filter.key)}
              className="inline-flex min-h-8 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-3 text-xs font-bold text-[var(--text-secondary)] transition duration-200 ease-out hover:border-[var(--brand-strong)] hover:text-[var(--foreground)] active:translate-y-px"
            >
              {filter.label}
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="min-h-8 rounded-sm px-2 text-xs font-bold text-[var(--brand-strong)] transition duration-200 ease-out hover:bg-white active:translate-y-px"
          >
            Clear all
          </button>
        </div>
      )}

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={filterPanelRef}
              id="admin-media-filter-panel"
              role="dialog"
              aria-label="Media filters"
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-lg border border-[var(--border)] bg-white p-5 shadow-[0_-18px_48px_-28px_rgba(30,41,59,0.45)] md:absolute md:left-auto md:right-0 md:top-[calc(100%+0.75rem)] md:bottom-auto md:w-[420px] md:rounded-md md:p-4 md:shadow-[0_18px_48px_-28px_rgba(30,41,59,0.45)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.85 }}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-extrabold text-[var(--foreground)]">
                    Filter media
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    Narrow images by category and status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-[var(--border)] text-[var(--text-secondary)] transition duration-200 ease-out hover:border-[var(--brand-strong)] hover:text-[var(--foreground)] active:translate-y-px"
                  aria-label="Close media filters"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Image group
                  </span>
                  <Select
                    value={libraryFilter}
                    onChange={(value) => {
                      const nextLibrary = (value ?? "all") as LibraryFilter;
                      onLibraryFilterChange(nextLibrary);
                      if (nextLibrary === "site") {
                        onServiceFilterChange("all");
                        onSubCategoryFilterChange("all");
                      }
                    }}
                    data={libraryOptions}
                    allowDeselect={false}
                    radius="sm"
                    comboboxProps={{ withinPortal: false, zIndex: 80 }}
                    styles={{
                      input: {
                        minHeight: "2.75rem",
                        backgroundColor: "#ffffff",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      },
                    }}
                  />
                </label>

                {libraryFilter !== "site" && (
                  <>
                    <label className="grid gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        Service
                      </span>
                      <Select
                        value={serviceFilter}
                        onChange={(value) => {
                          onServiceFilterChange(
                            (value ?? "all") as "all" | MediaService,
                          );
                          onSubCategoryFilterChange("all");
                        }}
                        data={serviceOptions}
                        allowDeselect={false}
                        radius="sm"
                        comboboxProps={{ withinPortal: false, zIndex: 80 }}
                        styles={{
                          input: {
                            minHeight: "2.75rem",
                            backgroundColor: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          },
                        }}
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        Photo type
                      </span>
                      <Select
                        value={subCategoryFilter}
                        onChange={(value) =>
                          onSubCategoryFilterChange(
                            (value ?? "all") as "all" | MediaSubCategory,
                          )
                        }
                        data={subCategoryOptions}
                        disabled={serviceFilter === "all"}
                        allowDeselect={false}
                        radius="sm"
                        comboboxProps={{ withinPortal: false, zIndex: 80 }}
                        styles={{
                          input: {
                            minHeight: "2.75rem",
                            backgroundColor: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          },
                        }}
                      />
                    </label>
                  </>
                )}

                <div className="grid gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Status
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(["all", ...MEDIA_STATUSES] as StatusFilter[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => onStatusFilterChange(status)}
                        className={`min-h-10 rounded-sm border px-3 text-sm font-bold transition duration-200 ease-out active:translate-y-px ${
                          statusFilter === status
                            ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                            : "border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--brand-strong)]"
                        }`}
                      >
                        {status === "all" ? "All" : STATUS_COPY[status]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    disabled={activeFilterCount === 0}
                    className="min-h-10 rounded-sm px-2 text-sm font-bold text-[var(--brand-strong)] transition duration-200 ease-out hover:bg-[var(--background-warm)] disabled:cursor-not-allowed disabled:text-[var(--text-muted)] active:translate-y-px"
                  >
                    Clear filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="min-h-10 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white transition duration-200 ease-out hover:bg-[var(--brand)] active:translate-y-px"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
