"use client";

import Link from "next/link";
import Image from "next/image";
import { Archive, FileImage, Grid2X2, LogOut } from "lucide-react";
import {
  MEDIA_SERVICES,
  MEDIA_SUB_CATEGORIES,
  type MediaAdminSession,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
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
  const serviceNavItems = MEDIA_SERVICES.map((service) => ({
    service,
    subCategories: MEDIA_SUB_CATEGORIES[service],
  }));

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
        {serviceNavItems.map(({ service, subCategories }) => {
          const hasNestedItems = subCategories.length > 1;
          const serviceIsActive =
            serviceFilter === service && subCategoryFilter === "all";
          const serviceHasActiveChild =
            serviceFilter === service && subCategoryFilter !== "all";

          if (!hasNestedItems) {
            const [subCategory] = subCategories;
            return (
              <button
                key={service}
                type="button"
                onClick={() => {
                  onServiceFilterChange(service);
                  onSubCategoryFilterChange(subCategory);
                }}
                className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
                  serviceFilter === service
                    ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                }`}
              >
                <FileImage className="h-4 w-4" aria-hidden />
                {service}
              </button>
            );
          }

          return (
            <div key={service} className="shrink-0 lg:w-full">
              <button
                type="button"
                onClick={() => {
                  onServiceFilterChange(service);
                  onSubCategoryFilterChange("all");
                }}
                className={`inline-flex min-h-11 w-full items-center gap-3 rounded-sm px-3 text-sm font-semibold ${
                  serviceIsActive || serviceHasActiveChild
                    ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                }`}
              >
                <FileImage className="h-4 w-4" aria-hidden />
                {service}
              </button>
              <div className="mt-1 flex gap-2 lg:block lg:space-y-1 lg:pl-6">
                {subCategories.map((subCategory) => (
                  <button
                    key={`${service}-${subCategory}`}
                    type="button"
                    onClick={() => {
                      onServiceFilterChange(service);
                      onSubCategoryFilterChange(subCategory);
                    }}
                    className={`inline-flex min-h-9 shrink-0 items-center rounded-sm px-3 text-xs font-bold lg:w-full ${
                      serviceFilter === service && subCategoryFilter === subCategory
                        ? "bg-[var(--background-warm)] text-[var(--brand-strong)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                    }`}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
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
