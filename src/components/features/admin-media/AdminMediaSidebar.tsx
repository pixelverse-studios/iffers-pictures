"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Archive, FileImage, Grid2X2, LogOut, X } from "lucide-react";
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
  isMobileOpen?: boolean;
  session: MediaAdminSession | null;
  serviceFilter: "all" | MediaService;
  statusFilter: StatusFilter;
  subCategoryFilter: "all" | MediaSubCategory;
  onCloseMobile?: () => void;
  onLogout: () => void;
  onServiceFilterChange: (value: "all" | MediaService) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSubCategoryFilterChange: (value: "all" | MediaSubCategory) => void;
}

export function AdminMediaSidebar({
  isMobileOpen = false,
  session,
  serviceFilter,
  statusFilter,
  subCategoryFilter,
  onCloseMobile,
  onLogout,
  onServiceFilterChange,
  onStatusFilterChange,
  onSubCategoryFilterChange,
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
    onServiceFilterChange("all");
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleServiceClick(service: MediaService) {
    onServiceFilterChange(service);
    onSubCategoryFilterChange("all");
    requestMobileClose();
  }

  function handleSubCategoryClick(
    service: MediaService,
    subCategory: MediaSubCategory,
  ) {
    onServiceFilterChange(service);
    onSubCategoryFilterChange(subCategory);
    requestMobileClose();
  }

  function handleArchiveClick() {
    onStatusFilterChange("archived");
    requestMobileClose();
  }

  function handleLogoutClick() {
    onLogout();
    requestMobileClose();
  }

  function renderSidebarContent(isDrawer = false) {
    const navClassName = isDrawer
      ? "space-y-1 px-5 pb-5"
      : "flex gap-2 overflow-x-auto px-5 pb-4 lg:block lg:max-h-[calc(100vh-14rem)] lg:space-y-1 lg:overflow-y-auto lg:overflow-x-hidden";
    const parentButtonClassName = "inline-flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-semibold";
    const parentWidthClassName = isDrawer ? "w-full" : "shrink-0 lg:w-full";
    const childListClassName = isDrawer
      ? "mt-1 space-y-1 pl-6"
      : "mt-1 flex gap-2 lg:block lg:space-y-1 lg:pl-6";
    const childButtonClassName = isDrawer
      ? "inline-flex min-h-9 w-full items-center rounded-sm px-3 text-xs font-bold"
      : "inline-flex min-h-9 shrink-0 items-center rounded-sm px-3 text-xs font-bold lg:w-full";

    return (
      <>
      {!isDrawer && (
        <div className="flex items-center justify-between px-5 py-5">
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
        <button
          type="button"
          onClick={handleAllMediaClick}
          className={`${parentButtonClassName} ${parentWidthClassName} ${
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
                className={`${parentButtonClassName} ${parentWidthClassName} ${
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
            <div key={service} className={parentWidthClassName}>
              <button
                type="button"
                onClick={() => handleServiceClick(service)}
                className={`${parentButtonClassName} w-full ${
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
          onClick={handleArchiveClick}
          className={`${parentButtonClassName} ${parentWidthClassName} ${
            statusFilter === "archived"
              ? "bg-red-50 text-red-700"
              : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
          }`}
        >
          <Archive className="h-4 w-4" aria-hidden />
          Archive
        </button>
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

      <div className="hidden border-t border-[var(--border)] p-5 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:block lg:bg-white">
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
      <aside className="hidden border-b border-[var(--border)] bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:border-b-0 lg:border-r">
        {renderSidebarContent()}
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
        >
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
