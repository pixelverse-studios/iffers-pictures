"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";
import { trackCtaClick } from "@/lib/analytics";
import { getMediaAdminSession } from "@/lib/media/client";

// ─── Constants ────────────────────────────────────────────────────────
const MOBILE_MENU_ID = "header-mobile-menu";
const STAGGER_BASE_MS = 150;
const STAGGER_STEP_MS = 50;
const BODY_SCROLL_LOCK_CLASS = "overflow-hidden";
const BOARD_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Sessions", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Investment", href: "/investment" },
  { label: "FAQ", href: "/faq" },
] as const;
const MOBILE_BOARD_NAV_LINKS = [
  { label: "Home", href: "/" },
  ...BOARD_NAV_LINKS,
] as const;

// ─── Header ───────────────────────────────────────────────────────────
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMediaAdminSession, setHasMediaAdminSession] = useState(false);
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  const desktopNavLinks = hasMediaAdminSession
    ? [...BOARD_NAV_LINKS, { label: "Media", href: "/admin/media" }]
    : BOARD_NAV_LINKS;
  const mobileNavLinks = hasMediaAdminSession
    ? [...MOBILE_BOARD_NAV_LINKS, { label: "Media", href: "/admin/media" }]
    : MOBILE_BOARD_NAV_LINKS;

  useEffect(() => {
    let canceled = false;

    getMediaAdminSession()
      .then(() => {
        if (!canceled) setHasMediaAdminSession(true);
      })
      .catch(() => {
        if (!canceled) setHasMediaAdminSession(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  // Body scroll lock while mobile menu is open. Uses a class rather than
  // inline style so it composes safely with anything else that touches
  // body overflow.
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add(BODY_SCROLL_LOCK_CLASS);
    } else {
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    }
    return () => {
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    };
  }, [isMobileMenuOpen]);

  // Mobile menu a11y: focus management, focus trap, Escape-to-close.
  // On open: remember previously focused element, move focus to first
  // focusable inside the overlay, install keydown handler for Escape + Tab trap.
  // On close: restore focus to the previously focused element.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
        previouslyFocused.current = null;
      }
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const getFocusable = () => {
      const overlay = overlayRef.current;
      if (!overlay) return [];
      return Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    // Delay focus until after paint so the element is actually focusable
    const focusTimer = requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="board-layout-header fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-white/95 shadow-[0_8px_28px_rgba(42,68,92,0.10)] backdrop-blur-md">
        <div className="board-shell board-gutter flex h-16 items-center justify-between md:h-[72px]">
          <Link
            href="/"
            aria-label="Iffer's Pictures — Home"
            className="flex shrink-0 items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/logo-blue.png"
              alt="Iffer's Pictures"
              width={149}
              height={80}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          <button
            className="rounded-sm border border-[var(--border)] p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-[var(--foreground)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--foreground)]" />
            )}
          </button>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--brand-strong)] lg:text-[11px] lg:tracking-[0.2em]",
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[var(--brand-strong)] after:transition-all after:duration-200 hover:after:w-full",
                  isLinkActive(link.href) &&
                    "text-[var(--brand-strong)] after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() =>
                trackCtaClick({
                  cta_label: "Inquire",
                  cta_location: "header_desktop",
                  destination: "/contact",
                })
              }
              className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition-colors duration-200 hover:bg-[var(--brand)]"
            >
              Inquire
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        id={MOBILE_MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 motion-reduce:transition-none",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Brand-gradient Background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-[var(--mobile-menu-overlay-from)] to-[var(--mobile-menu-overlay-to)]",
            "transition-transform duration-500 ease-out motion-reduce:transition-none",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8 overflow-y-auto py-24">
          <nav className="space-y-4">
            {/*
              Stagger intentionally fires only on open (positive delays), not
              on close (delay=0 → links fade out together). The opening stagger
              feels premium; a reverse stagger on close makes the dismissal
              feel sluggish.
            */}
            {mobileNavLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block text-3xl font-heading font-medium text-[var(--mobile-menu-text)]",
                  "opacity-0 translate-x-8 transition-all duration-500 motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100",
                  isMobileMenuOpen && "opacity-100 translate-x-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${STAGGER_BASE_MS + index * STAGGER_STEP_MS}ms`
                    : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Inquire CTA */}
          <div
            className={cn(
              "mt-8 opacity-0 translate-y-4 transition-all duration-500 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${STAGGER_BASE_MS + mobileNavLinks.length * STAGGER_STEP_MS}ms`
                : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() => {
                trackCtaClick({
                  cta_label: "Inquire",
                  cta_location: "header_mobile",
                  destination: "/contact",
                });
                setIsMobileMenuOpen(false);
              }}
              className="inline-block px-8 py-3 rounded-full bg-[var(--mobile-menu-cta-bg)] text-[var(--mobile-menu-cta-text)] font-medium text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 motion-reduce:transition-none"
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Contact Info */}
          <div
            className={cn(
              "mt-12 pt-8 border-t border-[var(--mobile-menu-border)]",
              "opacity-0 translate-y-4 transition-all duration-500 motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${STAGGER_BASE_MS + (mobileNavLinks.length + 1) * STAGGER_STEP_MS}ms`
                : "0ms",
            }}
          >
            <p className="text-[var(--mobile-menu-muted)]">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
