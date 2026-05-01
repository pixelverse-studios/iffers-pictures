"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, NAV_LINKS_LEFT, NAV_LINKS_RIGHT, BUSINESS_INFO } from "@/lib/constants";
import { useLayoutVariant } from "@/context/LayoutVariantContext";

// ─── Constants ────────────────────────────────────────────────────────
const MOBILE_MENU_ID = "header-mobile-menu";
const PILL_MAX_WIDTH = "min(1200px, 92vw)";
const SCROLL_THRESHOLD = 20;
const STAGGER_BASE_MS = 150;
const STAGGER_STEP_MS = 50;
const BODY_SCROLL_LOCK_CLASS = "overflow-hidden";
const BOARD_NAV_LINKS = [
  { label: "Sessions", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Investment", href: "/investment" },
  { label: "FAQ", href: "/faq" },
] as const;

const linkStyles = cn(
  "text-[13px] font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap motion-reduce:transition-none",
  "relative pb-1 mt-1",
  "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]",
  "after:transition-all after:duration-300 motion-reduce:after:transition-none",
  "hover:after:w-full"
);

// ─── NavLink subcomponent ─────────────────────────────────────────────
interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  isPill: boolean;
}

function NavLink({ href, label, isActive, isPill }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        linkStyles,
        isPill
          ? "text-[var(--foreground)] hover:text-[var(--brand-strong)] after:bg-[var(--foreground)]"
          : "text-[var(--text-secondary)] hover:text-[var(--brand)] after:bg-[var(--brand)]",
        isActive && (isPill ? "after:w-full" : "text-[var(--brand)] after:w-full")
      )}
    >
      {label}
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isBoardLayout, mounted } = useLayoutVariant();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Collapse the pill to solid-bar state when the mobile menu is open, so
  // the frosted-white pill doesn't visually fight the brand-colored menu overlay.
  const isPill = isHomePage && !isScrolled && !isMobileMenuOpen;

  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
          <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:h-[72px] md:px-8">
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
              {BOARD_NAV_LINKS.map((link) => (
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
                className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition-colors duration-200 hover:bg-[var(--brand)]"
              >
                Inquire
              </Link>
            </nav>
          </div>
        </header>
      {(!mounted || !isBoardLayout) && (
      <header className="current-layout-header fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/*
          Single morphing wrapper. When isPill (homepage hero, not scrolled,
          mobile menu closed), it caps at PILL_MAX_WIDTH and renders as a
          frosted rounded pill. Otherwise it's a full-bleed solid bar (white
          when scrolled / on non-homepage). backdrop-filter is scoped to pill
          mode only — it's expensive to composite on a full-width fixed bar
          during scroll, and the scrolled state is 95% opaque white anyway.
        */}
        <div
          className={cn(
            "mx-auto flex items-center pointer-events-auto",
            "duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0",
            "h-20 lg:h-24 xl:h-28",
            "px-5 lg:px-6 xl:px-8",
            isPill
              ? "mt-3 rounded-2xl"
              : "mt-0 rounded-none shadow-sm"
          )}
          style={{
            maxWidth: isPill ? PILL_MAX_WIDTH : "100%",
            // --pill-bg-frosted and --pill-bg-solid are theme-aware, defined
            // in globals.css. Modern browsers get rgb(from var(--surface)...)
            // which tracks the active theme; older browsers fall back to
            // hardcoded white rgba via the base :root block.
            backgroundColor: isPill
              ? "var(--pill-bg-frosted)"
              : "var(--pill-bg-solid)",
            backdropFilter: isPill ? "blur(12px)" : "none",
            WebkitBackdropFilter: isPill ? "blur(12px)" : "none",
            transitionProperty:
              "max-width, margin-top, border-radius, background-color, box-shadow",
          }}
        >
          <nav
            className={cn(
              "w-full grid items-center",
              "grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr]",
              "gap-3 lg:gap-5 xl:gap-8 2xl:gap-12"
            )}
          >
            {/* === LEFT ZONE: hamburger (mobile) / nav links (desktop) === */}
            <div className="flex items-center justify-start min-w-0">
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls={MOBILE_MENU_ID}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[var(--foreground)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--foreground)]" />
                )}
              </button>

              {/* Desktop left links */}
              <div className="hidden lg:flex items-center lg:gap-5 xl:gap-7 2xl:gap-9 min-w-0">
                {NAV_LINKS_LEFT.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isLinkActive(link.href)}
                    isPill={isPill}
                  />
                ))}
              </div>
            </div>

            {/* === CENTER ZONE: logo === */}
            <Link
              href="/"
              aria-label="Iffer's Pictures — Home"
              className="flex items-center justify-center justify-self-center shrink-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo-blue.png"
                alt="Iffer's Pictures"
                width={149}
                height={80}
                className={cn(
                  "w-auto transition-all duration-300 motion-reduce:transition-none",
                  "h-14 lg:h-16 xl:h-20"
                )}
                priority
              />
            </Link>

            {/* === RIGHT ZONE: spacer (mobile) / links + CTA (desktop) === */}
            <div className="flex items-center justify-end min-w-0">
              {/* Mobile spacer (matches hamburger button width for visual balance) */}
              <div className="lg:hidden w-10" />

              {/* Desktop right links + CTA */}
              <div className="hidden lg:flex items-center lg:gap-5 xl:gap-7 2xl:gap-9 min-w-0">
                {NAV_LINKS_RIGHT.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isLinkActive(link.href)}
                    isPill={isPill}
                  />
                ))}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-1 xl:ml-2 px-4 xl:px-5 py-2 rounded-full text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg active:scale-[0.98] bg-[var(--brand-vivid)] text-[var(--background)] hover:bg-[var(--brand-strong)] shadow-sm hover:shadow-[var(--brand-vivid)]/30 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      )}

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        id={MOBILE_MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500 motion-reduce:transition-none",
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
            {NAV_LINKS.map((link, index) => (
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
                ? `${STAGGER_BASE_MS + NAV_LINKS.length * STAGGER_STEP_MS}ms`
                : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
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
                ? `${STAGGER_BASE_MS + (NAV_LINKS.length + 1) * STAGGER_STEP_MS}ms`
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
