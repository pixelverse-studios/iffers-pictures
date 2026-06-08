"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Archive,
  ChevronDown,
  FileImage,
  Grid2X2,
  ImagePlus,
  Layers3,
  LogOut,
  X,
} from "lucide-react";
import {
  MEDIA_SERVICES,
  MEDIA_SUB_CATEGORIES,
  type MediaAdminSession,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
import type {
  AdminMediaViewMode,
  PlacementPageFilter,
  StatusFilter,
} from "./types";
import { formatDate } from "./utils";

interface AdminMediaSidebarProps {
  isMobileOpen?: boolean;
  placementPageFilter: PlacementPageFilter;
  placementPageOptions: string[];
  session: MediaAdminSession | null;
  serviceFilter: "all" | MediaService;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  viewMode: AdminMediaViewMode;
  onCloseMobile?: () => void;
  onLogout: () => void;
  onPlacementPageFilterChange: (value: PlacementPageFilter) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
  onViewModeChange: (value: AdminMediaViewMode) => void;
}

export function AdminMediaSidebar({
  isMobileOpen = false,
  placementPageFilter,
  placementPageOptions,
  session,
  serviceFilter,
  statusFilter,
  subCategoryFilter,
  viewMode,
  onCloseMobile,
  onLogout,
  onPlacementPageFilterChange,
  onServiceFilterChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
  onViewModeChange,
}: AdminMediaSidebarProps) {
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const serviceNavItems = MEDIA_SERVICES.map((service) => ({
    service,
    subCategories: MEDIA_SUB_CATEGORIES[service],
  }));

  const requestMobileClose = useCallback(() => {
    if (!onCloseMobile || isDrawerClosing) return;

    setIsDrawerClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      onCloseMobile();
      setIsDrawerClosing(false);
      closeTimerRef.current = null;
    }, 220);
  }, [isDrawerClosing, onCloseMobile]);

  useEffect(() => {
    if (!isMobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") requestMobileClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, requestMobileClose]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  function handleAllMediaClick() {
    onViewModeChange("library");
    onServiceFilterChange("all");
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleServiceClick(service: MediaService) {
    onViewModeChange("library");
    onServiceFilterChange(service);
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleSubCategoryClick(
    service: MediaService,
    subCategory: MediaSubCategory,
  ) {
    onViewModeChange("library");
    onServiceFilterChange(service);
    onSubCategoryFilterChange(subCategory);
    requestMobileClose();
  }

  function handleArchiveClick() {
    onViewModeChange("library");
    onStatusFilterChange("archived");
    requestMobileClose();
  }

  function handleViewModeClick(mode: AdminMediaViewMode) {
    if (mode === viewMode) return;

    onViewModeChange(mode);
    if (mode === "placements") {
      onPlacementPageFilterChange("all");
    }
  }

  function handlePlacementPageClick(page: PlacementPageFilter) {
    onViewModeChange("placements");
    onPlacementPageFilterChange(page);
    requestMobileClose();
  }

  function handleLogoutClick() {
    onLogout();
    requestMobileClose();
  }

  function renderSidebarContent(isDrawer = false) {
    const navClassName = isDrawer
      ? "space-y-5 px-5 pb-5"
      : "min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pb-4";
    const parentButtonClassName =
      "inline-flex min-h-10 w-full items-center gap-3 rounded-sm px-3 text-sm font-semibold transition active:translate-y-[1px]";
    const sectionHeaderClassName =
      "group block w-full rounded-sm px-3 pt-2 text-left transition active:translate-y-[1px]";
    const sectionTitleClassName =
      "flex min-h-9 items-center justify-between gap-3 text-[13px] font-bold uppercase tracking-[0.14em]";
    const childListClassName = "mt-1 space-y-1 pl-6";
    const childButtonClassName =
      "inline-flex min-h-9 w-full items-center rounded-sm px-3 text-xs font-bold";

    return (
      <>
        {!isDrawer && (
          <div className="flex shrink-0 items-center justify-between px-5 py-5">
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
          </div>
        )}

        <nav className={navClassName}>
          <section>
            <button
              type="button"
              onClick={() => handleViewModeClick("library")}
              className={`${sectionHeaderClassName} ${
                viewMode === "library"
                  ? "text-[var(--brand-strong)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
              }`}
              aria-expanded={viewMode === "library"}
            >
              <span className={sectionTitleClassName}>
                <span className="inline-flex items-center gap-2">
                  <Layers3 className="h-4 w-4" aria-hidden />
                  Library
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    viewMode === "library" ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </span>
              <span
                className={`mt-2 block h-px w-full transition-colors ${
                  viewMode === "library"
                    ? "bg-[var(--brand-strong)]"
                    : "bg-[var(--border)] group-hover:bg-[var(--text-muted)]"
                }`}
              />
            </button>

            {viewMode === "library" && (
              <div className="mt-3 space-y-1">
                <button
                  type="button"
                  onClick={handleAllMediaClick}
                  className={`${parentButtonClassName} ${
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
                        onClick={() => handleSubCategoryClick(service, subCategory)}
                        className={`${parentButtonClassName} ${
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
                    <div key={service}>
                      <button
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className={`${parentButtonClassName} ${
                          serviceIsActive || serviceHasActiveChild
                            ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                        }`}
                      >
                        <FileImage className="h-4 w-4" aria-hidden />
                        {service}
                      </button>
                      <div className={childListClassName}>
                        {subCategories.map((subCategory) => (
                          <button
                            key={`${service}-${subCategory}`}
                            type="button"
                            onClick={() => handleSubCategoryClick(service, subCategory)}
                            className={`${childButtonClassName} ${
                              serviceFilter === service &&
                              subCategoryFilter === subCategory
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
                  onClick={handleArchiveClick}
                  className={`${parentButtonClassName} ${
                    statusFilter === "archived"
                      ? "bg-red-50 text-red-700"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                  }`}
                >
                  <Archive className="h-4 w-4" aria-hidden />
                  Archive
                </button>
              </div>
            )}
          </section>

          <section>
            <button
              type="button"
              onClick={() => handleViewModeClick("placements")}
              className={`${sectionHeaderClassName} ${
                viewMode === "placements"
                  ? "text-[var(--brand-strong)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
              }`}
              aria-expanded={viewMode === "placements"}
            >
              <span className={sectionTitleClassName}>
                <span className="inline-flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" aria-hidden />
                  Placements
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    viewMode === "placements" ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </span>
              <span
                className={`mt-2 block h-px w-full transition-colors ${
                  viewMode === "placements"
                    ? "bg-[var(--brand-strong)]"
                    : "bg-[var(--border)] group-hover:bg-[var(--text-muted)]"
                }`}
              />
            </button>

            {viewMode === "placements" && (
              <div className="mt-3 space-y-1">
                <button
                  type="button"
                  onClick={() => handlePlacementPageClick("all")}
                  className={`${parentButtonClassName} ${
                    placementPageFilter === "all"
                      ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                  }`}
                >
                  <Grid2X2 className="h-4 w-4" aria-hidden />
                  All pages
                </button>
                {placementPageOptions.map((pageLabel) => (
                  <button
                    key={pageLabel}
                    type="button"
                    onClick={() => handlePlacementPageClick(pageLabel)}
                    className={`${parentButtonClassName} ${
                      placementPageFilter === pageLabel
                        ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                    }`}
                  >
                    <FileImage className="h-4 w-4" aria-hidden />
                    {pageLabel}
                  </button>
                ))}
              </div>
            )}
          </section>
        </nav>

        {isDrawer && (
          <div className="border-t border-[var(--border)] p-5">
            <button
              type="button"
              onClick={handleLogoutClick}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Logout
            </button>
          </div>
        )}

        <div className="hidden border-t border-[var(--border)] p-5 lg:mt-auto lg:block lg:shrink-0 lg:bg-white">
          <p className="text-sm font-bold text-[var(--foreground)]">
            {session?.email ?? "Administrator"}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Session active until {session ? formatDate(session.expiresAt) : "later"}
          </p>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Logout
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="hidden border-b border-[var(--border)] bg-white lg:flex lg:h-[100dvh] lg:flex-col lg:border-b-0 lg:border-r">
        {renderSidebarContent()}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className={`absolute inset-0 bg-[rgba(26,32,48,0.48)] transition-opacity duration-200 ease-out motion-safe:animate-[admin-fade-in_200ms_ease-out] ${
              isDrawerClosing ? "opacity-0" : "opacity-100"
            }`}
            aria-label="Close media navigation"
            onClick={requestMobileClose}
          />
          <aside
            className={`absolute bottom-0 left-0 top-0 w-[min(22rem,88vw)] overflow-y-auto border-r border-[var(--border)] bg-white shadow-xl transition-transform duration-200 ease-out motion-safe:animate-[admin-drawer-in_200ms_ease-out] ${
              isDrawerClosing ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <p className="text-sm font-bold text-[var(--foreground)]">Media menu</p>
              <button
                type="button"
                onClick={requestMobileClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border)] text-[var(--text-secondary)]"
                aria-label="Close media navigation"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
