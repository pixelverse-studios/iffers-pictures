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
  const useHeroStyling = isHomePage && !isScrolled;

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
    "text-[13px] font-medium uppercase tracking-wider transition-all duration-200",
    "relative pb-1 mt-1",
    "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]",
    "after:transition-all after:duration-300",
    "hover:after:w-full"
  );

  const isFrosted = useHeroStyling;
  const isFrostedMode = isHomePage;
  const heroLinkColor = isFrosted ? "#1f2937" : "#ffffff";
  const heroLinkShadow = "none";
  const heroUnderlineClass = isFrosted ? "after:bg-[var(--foreground)]" : "after:bg-white";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isFrostedMode ? "bg-transparent" : useHeroStyling ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm"
        )}
      >
        {/*
          Frosted pill: absolutely-positioned behind all content.
          Uses left-0/right-0 + mx-auto + max-width to center and constrain.
          When isFrosted: max-w-4xl, rounded, frosted glass, slight vertical inset.
          When scrolled: max-w-none (full width), no rounding, solid white + shadow.
          All properties animate via CSS transitions — no layout jumps.
        */}
        {isFrostedMode && (
          <div
            className="absolute z-0 transition-all duration-500 ease-out"
            style={{
              top: isFrosted ? "0.5rem" : "0",
              bottom: isFrosted ? "0.25rem" : "0",
              left: isFrosted ? "18%" : "0",
              right: isFrosted ? "18%" : "0",
              backgroundColor: isFrosted
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: isFrosted ? "1rem" : "0",
              boxShadow: isFrosted
                ? "none"
                : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transitionProperty: "max-width, top, bottom, left, right, background-color, border-radius, box-shadow",
            }}
          />
        )}

        <div className="container relative z-10">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              useHeroStyling ? "h-28" : "h-24",
            )}
          >
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-9 flex-1">
              {NAV_LINKS_LEFT.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      linkStyles,
                      useHeroStyling
                        ? heroUnderlineClass
                        : "text-[var(--text-secondary)] hover:text-[var(--brand)] after:bg-[var(--brand)]",
                      isActive && "after:w-full",
                      isActive && !useHeroStyling && "text-[var(--brand)]"
                    )}
                    style={
                      useHeroStyling
                        ? { color: heroLinkColor, textShadow: heroLinkShadow }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button - Left */}
            <button
              className="lg:hidden relative z-10 p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu
                  className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    useHeroStyling && !isFrosted ? "text-white" : "text-[var(--foreground)]"
                  )}
                  style={useHeroStyling && !isFrosted ? { filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.8))" } : undefined}
                />
              )}
            </button>

            {/* Centered Logo */}
            <Link
              href="/"
              className={cn(
                "relative z-10 flex items-center justify-center",
                "transition-all duration-300",
                "lg:absolute lg:left-1/2 lg:-translate-x-1/2"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo-blue.png"
                alt="Iffer's Pictures"
                width={149}
                height={80}
                className="transition-all duration-300 h-20 w-auto"
                style={
                  useHeroStyling && !isFrosted
                    ? {
                        filter: [
                          "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
                          "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                          "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        ].join(" "),
                      }
                    : undefined
                }
                priority
              />
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-9 justify-end flex-1">
              {NAV_LINKS_RIGHT.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      linkStyles,
                      useHeroStyling
                        ? heroUnderlineClass
                        : "text-[var(--text-secondary)] hover:text-[var(--brand)] after:bg-[var(--brand)]",
                      isActive && "after:w-full",
                      isActive && !useHeroStyling && "text-[var(--brand)]"
                    )}
                    style={
                      useHeroStyling
                        ? { color: heroLinkColor, textShadow: heroLinkShadow }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "ml-2 px-5 py-2 rounded-full text-sm font-medium tracking-wide uppercase",
                  "transition-all duration-300 ease-out",
                  "hover:scale-105 hover:shadow-lg active:scale-[0.98]",
                  useHeroStyling
                    ? isFrosted
                      ? "bg-[var(--brand-vivid)] text-white hover:bg-[var(--brand-strong)] shadow-sm hover:shadow-[var(--brand-vivid)]/30"
                      : "bg-white/90 text-[var(--brand-strong)] hover:bg-white shadow-md hover:shadow-white/25"
                    : "bg-[var(--brand-vivid)] text-white hover:bg-[var(--brand-strong)] shadow-sm hover:shadow-[var(--brand-vivid)]/30"
                )}
              >
                Inquire
              </Link>
            </div>

            {/* Mobile - Empty right spacer for balance */}
            <div className="lg:hidden w-10" />
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
            "absolute inset-0 bg-gradient-to-br from-[var(--brand-vivid)] to-[var(--brand-strong)]",
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
              className="inline-block px-8 py-3 rounded-full bg-white text-[var(--brand-strong)] font-medium text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
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
