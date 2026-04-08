"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, NAV_LINKS_LEFT, NAV_LINKS_RIGHT, BUSINESS_INFO } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isPill = isHomePage && !isScrolled;

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const linkStyles = cn(
    "text-[13px] font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap",
    "relative pb-1 mt-1",
    "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]",
    "after:transition-all after:duration-300",
    "hover:after:w-full"
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/*
          Single morphing wrapper. When isPill (homepage hero, not scrolled),
          it caps at min(1200px, 92vw) and renders as a frosted rounded pill.
          Otherwise, it's a full-bleed solid bar (white when scrolled / on
          non-homepage). Width and visual styles animate via CSS transitions.
        */}
        <div
          className={cn(
            "mx-auto flex items-center pointer-events-auto",
            "transition-all duration-500 ease-out",
            "h-20 lg:h-24 xl:h-28",
            "px-5 lg:px-6 xl:px-8",
            isPill
              ? "mt-3 rounded-2xl"
              : "mt-0 rounded-none shadow-sm"
          )}
          style={{
            maxWidth: isPill ? "min(1200px, 92vw)" : "100%",
            backgroundColor: isPill
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transitionProperty:
              "max-width, margin-top, border-radius, background-color, box-shadow, height, padding",
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
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--foreground)]" />
                )}
              </button>

              {/* Desktop left links */}
              <div className="hidden lg:flex items-center lg:gap-5 xl:gap-7 2xl:gap-9 min-w-0">
                {NAV_LINKS_LEFT.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        linkStyles,
                        isPill
                          ? "text-[var(--foreground)] hover:text-[var(--teal-dark)] after:bg-[var(--foreground)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--teal)] after:bg-[var(--teal)]",
                        isActive && (isPill ? "after:w-full" : "text-[var(--teal)] after:w-full")
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* === CENTER ZONE: logo === */}
            <Link
              href="/"
              className="flex items-center justify-center justify-self-center shrink-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo-blue.png"
                alt="Iffer's Pictures"
                width={149}
                height={80}
                className={cn(
                  "transition-all duration-300 w-auto",
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
                {NAV_LINKS_RIGHT.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        linkStyles,
                        isPill
                          ? "text-[var(--foreground)] hover:text-[var(--teal-dark)] after:bg-[var(--foreground)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--teal)] after:bg-[var(--teal)]",
                        isActive && (isPill ? "after:w-full" : "text-[var(--teal)] after:w-full")
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "rounded-full font-medium tracking-wide uppercase whitespace-nowrap",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 hover:shadow-lg active:scale-[0.98]",
                    "bg-[var(--teal-vivid)] text-white hover:bg-[var(--teal-dark)] shadow-sm hover:shadow-[var(--teal-vivid)]/30",
                    "lg:ml-1 lg:px-4 lg:py-2 lg:text-xs",
                    "xl:ml-2 xl:px-5 xl:py-2 xl:text-sm"
                  )}
                >
                  Inquire
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Teal Background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-[var(--teal-vivid)] to-[var(--teal-dark)]",
            "transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8 overflow-y-auto py-24">
          <nav className="space-y-4">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block text-3xl font-heading font-medium text-white",
                  "opacity-0 translate-x-8 transition-all duration-500",
                  isMobileMenuOpen && "opacity-100 translate-x-0"
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + index * 50}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Inquire CTA */}
          <div
            className={cn(
              "mt-8 opacity-0 translate-y-4 transition-all duration-500",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${150 + NAV_LINKS.length * 50}ms`
                : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block px-8 py-3 rounded-full bg-white text-[var(--teal-dark)] font-medium text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Contact Info */}
          <div
            className={cn(
              "mt-12 pt-8 border-t border-white/20",
              "opacity-0 translate-y-4 transition-all duration-500",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${150 + NAV_LINKS.length * 50 + 50}ms`
                : "0ms",
            }}
          >
            <p className="text-white/70">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
