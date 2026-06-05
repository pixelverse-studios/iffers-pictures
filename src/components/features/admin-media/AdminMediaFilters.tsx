"use client";

import { Select, TextInput } from "@mantine/core";
import { Search } from "lucide-react";
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
  const serviceOptions = [
    { value: "all", label: "All services" },
    ...MEDIA_SERVICES.map((service) => ({ value: service, label: service })),
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

  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <TextInput
          type="search"
          value={query}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          placeholder="Search media..."
          leftSection={<Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />}
          radius="sm"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem" },
          }}
        />
        <Select
          value={serviceFilter}
          onChange={(value) => {
            onServiceFilterChange((value ?? "all") as "all" | MediaService);
            onSubCategoryFilterChange("all");
          }}
          data={serviceOptions}
          allowDeselect={false}
          radius="sm"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem", fontWeight: 600 },
          }}
        />
        <Select
          value={subCategoryFilter}
          onChange={(value) =>
            onSubCategoryFilterChange((value ?? "all") as "all" | MediaSubCategory)
          }
          data={subCategoryOptions}
          disabled={serviceFilter === "all"}
          allowDeselect={false}
          radius="sm"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem", fontWeight: 600 },
          }}
        />
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
        <Select
          value={sortMode}
          onChange={(value) => onSortModeChange((value ?? "newest") as SortMode)}
          data={sortOptions}
          allowDeselect={false}
          radius="sm"
          className="min-w-36"
          styles={{
            input: { minHeight: "2.75rem", backgroundColor: "#ffffff", fontSize: "0.875rem", fontWeight: 600 },
          }}
        />
      </div>
    </section>
  );
}
