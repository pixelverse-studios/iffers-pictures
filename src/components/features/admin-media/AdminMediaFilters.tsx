"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import {
  MEDIA_SERVICES,
  MEDIA_STATUSES,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
import { STATUS_COPY } from "./constants";
import type { SortMode, StatusFilter } from "./types";

interface AdminMediaFiltersProps {
  query: string;
  serviceFilter: "all" | MediaService;
  serviceSubCategories: readonly MediaSubCategory[];
  sortMode: SortMode;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  onSearchChange: (value: string) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onSortModeChange: (value: SortMode) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
}

export function AdminMediaFilters({
  query,
  serviceFilter,
  serviceSubCategories,
  sortMode,
  statusFilter,
  subCategoryFilter,
  onSearchChange,
  onServiceFilterChange,
  onSortModeChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
}: AdminMediaFiltersProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <label className="flex min-h-11 items-center gap-2 border border-[var(--border)] bg-white px-3">
          <Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search media..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <label className="relative">
          <select
            value={serviceFilter}
            onChange={(event) => {
              onServiceFilterChange(event.target.value as "all" | MediaService);
              onSubCategoryFilterChange("all");
            }}
            className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none"
          >
            <option value="all">All services</option>
            {MEDIA_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
        </label>
        <label className="relative">
          <select
            value={subCategoryFilter}
            onChange={(event) =>
              onSubCategoryFilterChange(event.target.value as "all" | MediaSubCategory)
            }
            disabled={serviceFilter === "all"}
            className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none disabled:bg-[var(--background-warm)]"
          >
            <option value="all">All sub-categories</option>
            {serviceSubCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
        </label>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {(["all", ...MEDIA_STATUSES] as StatusFilter[]).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusFilterChange(status)}
            className={`min-h-11 shrink-0 rounded-sm border px-4 text-sm font-bold ${
              statusFilter === status
                ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                : "border-[var(--border)] bg-white text-[var(--text-secondary)]"
            }`}
          >
            {status === "all" ? "All" : STATUS_COPY[status]}
          </button>
        ))}
        <label className="relative min-w-36">
          <select
            value={sortMode}
            onChange={(event) => onSortModeChange(event.target.value as SortMode)}
            className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="sortOrder">Sort order</option>
            <option value="filename">Filename</option>
          </select>
          <SlidersHorizontal className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
        </label>
      </div>
    </section>
  );
}
