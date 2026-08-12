"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Images, LogOut, PanelsTopLeft, X } from "lucide-react";
import {
  MEDIA_SERVICES,
  MEDIA_SUB_CATEGORIES,
  type MediaLibrary,
  type MediaAdminSession,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
import type {
  AdminMediaViewMode,
  LibraryFilter,
  PlacementPageFilter,
  StatusFilter,
} from "./types";
import { formatDate } from "./utils";

interface AdminMediaSidebarProps {
  isMobileOpen?: boolean;
  libraryFilter: LibraryFilter;
  placementPageFilter: PlacementPageFilter;
  placementPageOptions: string[];
  session: MediaAdminSession | null;
  serviceFilter: "all" | MediaService;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  viewMode: AdminMediaViewMode;
  onCloseMobile?: () => void;
  onLogout: () => void;
  onLibraryFilterChange: (value: LibraryFilter) => void;
  onPlacementPageFilterChange: (value: PlacementPageFilter) => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
  onViewModeChange: (value: AdminMediaViewMode) => boolean;
}

const ADMIN_WORKSPACES = [
  {
    mode: "library",
    label: "Library",
    accessibleLabel: "Image Library",
    icon: Images,
  },
  {
    mode: "placements",
    label: "Pages",
    accessibleLabel: "Page Images",
    icon: PanelsTopLeft,
  },
  {
    mode: "campaigns",
    label: "Minis",
    accessibleLabel: "Mini Sessions",
    icon: CalendarDays,
  },
] satisfies ReadonlyArray<{
  mode: AdminMediaViewMode;
  label: string;
  accessibleLabel: string;
  icon: typeof Images;
}>;

export function AdminMediaSidebar({
  isMobileOpen = false,
  libraryFilter,
  placementPageFilter,
  placementPageOptions,
  session,
  serviceFilter,
  statusFilter,
  subCategoryFilter,
  viewMode,
  onCloseMobile,
  onLogout,
  onLibraryFilterChange,
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
    onLibraryFilterChange("all");
    onServiceFilterChange("all");
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleLibraryClick(library: MediaLibrary) {
    onViewModeChange("library");
    onLibraryFilterChange(library);
    onServiceFilterChange("all");
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleServiceClick(service: MediaService) {
    onViewModeChange("library");
    onLibraryFilterChange("portfolio");
    onServiceFilterChange(service);
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleSubCategoryClick(
    service: MediaService,
    subCategory: MediaSubCategory,
  ) {
    onViewModeChange("library");
    onLibraryFilterChange("portfolio");
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
    if (mode === viewMode) return true;

    if (!onViewModeChange(mode)) return false;
    if (mode === "placements") {
      onPlacementPageFilterChange("all");
    }
    return true;
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
      ? "min-h-0 flex-1 overflow-y-auto px-5 pb-5"
      : "min-h-0 flex-1 overflow-y-auto px-5 pb-4";
    const parentButtonClassName =
      "group/nav-item grid min-h-9 w-full grid-cols-[0.625rem_minmax(0,1fr)] items-center gap-3 rounded-sm px-3 text-left text-sm font-semibold transition active:translate-y-[1px]";
    const childListClassName =
      "relative ml-4 mt-1 space-y-1 border-l border-[var(--border)] pl-4";
    const childButtonClassName =
      "group/nav-child relative inline-flex min-h-8 w-full items-center rounded-sm px-3 text-left text-xs font-bold transition active:translate-y-[1px]";
    const groupLabelClassName =
      "px-3 pb-1 pt-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]";
    const sectionPanelMotion = {
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -4 },
      initial: { opacity: 0, x: 4 },
      transition: { duration: 0.18, ease: "easeOut" as const },
    };

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

        <nav
          className={`mx-4 grid shrink-0 grid-cols-3 gap-1 rounded-md bg-[var(--background-warm)] p-1 ${
            isDrawer ? "mt-4" : ""
          }`}
          aria-label="Admin sections"
        >
          {ADMIN_WORKSPACES.map((workspace) => {
            const Icon = workspace.icon;
            const isActive = viewMode === workspace.mode;

            return (
              <button
                key={workspace.mode}
                type="button"
                onClick={() => {
                  const didChangeWorkspace = handleViewModeClick(workspace.mode);
                  if (didChangeWorkspace && workspace.mode === "campaigns") {
                    requestMobileClose();
                  }
                }}
                className={`group flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-sm border px-1 py-2 text-[11px] font-bold transition duration-200 active:translate-y-[1px] ${
                  isActive
                    ? "border-[var(--border)] bg-white text-[var(--brand-strong)] shadow-[0_1px_2px_rgba(46,67,88,0.08)]"
                    : "border-transparent text-[var(--text-secondary)] hover:bg-white/70 hover:text-[var(--foreground)]"
                }`}
                aria-label={`Open ${workspace.accessibleLabel}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-transform duration-200 group-active:scale-95 ${
                    isActive ? "text-[var(--brand-strong)]" : "text-[var(--text-muted)]"
                  }`}
                  aria-hidden
                />
                <span className="truncate">{workspace.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 px-5 pb-3 pt-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {viewMode === "library"
              ? "Browse library"
              : viewMode === "placements"
                ? "Choose a page"
                : "Seasonal campaigns"}
          </p>
        </div>

        <nav className={navClassName}>
          <section>
            <AnimatePresence initial={false}>
              {viewMode === "library" && (
                <motion.div
                  key="library-navigation"
                  className="overflow-hidden"
                  {...sectionPanelMotion}
                >
                  <div className="mt-3 space-y-1">
                    <button
                      type="button"
                      onClick={handleAllMediaClick}
                      className={`${parentButtonClassName} ${
                        libraryFilter === "all" &&
                        serviceFilter === "all"
                          ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          libraryFilter === "all" && serviceFilter === "all"
                            ? "bg-[var(--brand-strong)]"
                            : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">All Images</span>
                    </button>
                    <div className={groupLabelClassName}>Portfolio</div>
                    <button
                      type="button"
                      onClick={() => handleLibraryClick("portfolio")}
                      className={`${parentButtonClassName} ${
                        libraryFilter === "portfolio" &&
                        serviceFilter === "all" &&
                        subCategoryFilter === "all"
                          ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          libraryFilter === "portfolio" &&
                          serviceFilter === "all" &&
                          subCategoryFilter === "all"
                            ? "bg-[var(--brand-strong)]"
                            : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">All portfolio</span>
                    </button>
                    {serviceNavItems.map(({ service, subCategories }) => {
                      const hasNestedItems = subCategories.length > 1;
                      const serviceIsActive =
                        libraryFilter === "portfolio" &&
                        serviceFilter === service &&
                        subCategoryFilter === "all";
                      const serviceHasActiveChild =
                        libraryFilter === "portfolio" &&
                        serviceFilter === service &&
                        subCategoryFilter !== "all";

                      if (!hasNestedItems) {
                        const [subCategory] = subCategories;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() =>
                              handleSubCategoryClick(service, subCategory)
                            }
                            className={`${parentButtonClassName} ${
                              libraryFilter === "portfolio" &&
                              serviceFilter === service
                                ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                libraryFilter === "portfolio" &&
                                serviceFilter === service
                                  ? "bg-[var(--brand-strong)]"
                                  : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                              }`}
                              aria-hidden
                            />
                            <span className="min-w-0 leading-snug">{service}</span>
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
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                serviceIsActive || serviceHasActiveChild
                                  ? "bg-[var(--brand-strong)]"
                                  : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                              }`}
                              aria-hidden
                            />
                            <span className="min-w-0 leading-snug">{service}</span>
                          </button>
                          <div className={childListClassName}>
                            {subCategories.map((subCategory) => {
                              const childIsActive =
                                serviceFilter === service &&
                                libraryFilter === "portfolio" &&
                                subCategoryFilter === subCategory;

                              return (
                                <button
                                  key={`${service}-${subCategory}`}
                                  type="button"
                                  onClick={() =>
                                    handleSubCategoryClick(service, subCategory)
                                  }
                                  className={`${childButtonClassName} ${
                                    childIsActive
                                      ? "bg-[var(--background-warm)] text-[var(--brand-strong)]"
                                      : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                                  }`}
                                >
                                  <span
                                    className={`absolute -left-[1.0625rem] top-1/2 h-px w-3 -translate-y-1/2 transition-colors ${
                                      childIsActive
                                        ? "bg-[var(--brand-strong)]"
                                        : "bg-[var(--border)] group-hover/nav-child:bg-[var(--text-muted)]"
                                    }`}
                                    aria-hidden
                                  />
                                  <span className="min-w-0 leading-snug">
                                    {subCategory}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    <div className={groupLabelClassName}>Site Images</div>
                    <button
                      type="button"
                      onClick={() => handleLibraryClick("site")}
                      className={`${parentButtonClassName} ${
                        libraryFilter === "site"
                          ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          libraryFilter === "site"
                            ? "bg-[var(--brand-strong)]"
                            : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">Site Images</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleArchiveClick}
                      className={`${parentButtonClassName} ${
                        statusFilter === "archived"
                          ? "bg-red-50 text-red-700"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          statusFilter === "archived"
                            ? "bg-red-700"
                            : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">Archive</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section>
            <AnimatePresence initial={false}>
              {viewMode === "placements" && (
                <motion.div
                  key="placement-navigation"
                  className="overflow-hidden"
                  {...sectionPanelMotion}
                >
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
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          placementPageFilter === "all"
                            ? "bg-[var(--brand-strong)]"
                            : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">All pages</span>
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
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            placementPageFilter === pageLabel
                              ? "bg-[var(--brand-strong)]"
                              : "bg-[var(--text-muted)] group-hover/nav-item:bg-[var(--text-secondary)]"
                          }`}
                          aria-hidden
                        />
                        <span className="min-w-0 leading-snug">{pageLabel}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
            className={`absolute bottom-0 left-0 top-0 flex w-[min(22rem,88vw)] flex-col overflow-hidden border-r border-[var(--border)] bg-white shadow-xl transition-transform duration-200 ease-out motion-safe:animate-[admin-drawer-in_200ms_ease-out] ${
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
