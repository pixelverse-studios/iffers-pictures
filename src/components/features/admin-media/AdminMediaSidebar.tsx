"use client";

import Link from "next/link";
import Image from "next/image";
import { Archive, FileImage, Grid2X2, LogOut } from "lucide-react";
import type {
  MediaAdminSession,
  MediaService,
  MediaSubCategory,
} from "@/lib/media/types";
import { CATEGORY_OPTIONS } from "./constants";
import type { StatusFilter } from "./types";
import { formatDate } from "./utils";

interface AdminMediaSidebarProps {
  session: MediaAdminSession | null;
  serviceFilter: "all" | MediaService;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  onLogout: () => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
}

export function AdminMediaSidebar({
  session,
  serviceFilter,
  statusFilter,
  subCategoryFilter,
  onLogout,
  onServiceFilterChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
}: AdminMediaSidebarProps) {
  return (
    <aside className="border-b border-[var(--border)] bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-5 lg:block">
        <Link
          href="/"
          className="block w-fit"
          aria-label="Iffer's Pictures home"
        >
          <Image
            src="/logo-black.png"
            alt="Iffer's Pictures"
            width={150}
            height={80}
            priority
            className="h-16 w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] lg:hidden"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Logout
        </button>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-5 pb-4 lg:block lg:max-h-[calc(100vh-14rem)] lg:space-y-1 lg:overflow-y-auto lg:overflow-x-hidden">
        <button
          type="button"
          onClick={() => {
            onServiceFilterChange("all");
            onSubCategoryFilterChange("all");
          }}
          className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
            serviceFilter === "all"
              ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
          }`}
        >
          <Grid2X2 className="h-4 w-4" aria-hidden />
          All Media
        </button>
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={`${option.service}-${option.subCategory}`}
            type="button"
            onClick={() => {
              onServiceFilterChange(option.service);
              onSubCategoryFilterChange(option.subCategory);
            }}
            className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
              subCategoryFilter === option.subCategory
                ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
            }`}
          >
            <FileImage className="h-4 w-4" aria-hidden />
            {option.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onStatusFilterChange("archived")}
          className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
            statusFilter === "archived"
              ? "bg-red-50 text-red-700"
              : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
          }`}
        >
          <Archive className="h-4 w-4" aria-hidden />
          Archive
        </button>
      </nav>

      <div className="hidden border-t border-[var(--border)] p-5 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:block lg:bg-white">
        <p className="text-sm font-bold text-[var(--foreground)]">
          {session?.email ?? "Administrator"}
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Session active until {session ? formatDate(session.expiresAt) : "later"}
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Logout
        </button>
      </div>
    </aside>
  );
}
