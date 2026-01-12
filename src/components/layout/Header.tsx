"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, NAV_LINKS_LEFT, NAV_LINKS_RIGHT, BUSINESS_INFO } from "@/lib/constants";
import { formatPhoneNumber, formatPhoneLink } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    "relative pb-1",
    "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]",
    "after:transition-all after:duration-300",
    "hover:after:w-full"
  );

  // Strong text shadow for readability on any colorful background
  // Multiple shadow layers create a "halo" effect around text
  const heroTextShadow = [
    "0 1px 3px rgba(0,0,0,0.8)",   // Close, dark shadow
    "0 2px 6px rgba(0,0,0,0.6)",   // Medium spread
    "0 0 20px rgba(0,0,0,0.4)",    // Soft glow for extra contrast
  ].join(", ");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        )}
      >
        <div className="container">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-24" : "h-28"
            )}
          >
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-9 flex-1">
              {NAV_LINKS_LEFT.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    linkStyles,
                    isScrolled
                      ? "text-[var(--text-secondary)] hover:text-[var(--teal)] after:bg-[var(--teal)]"
                      : "after:bg-white"
                  )}
                  style={
                    isScrolled
                      ? undefined
                      : { color: "#ffffff", textShadow: heroTextShadow }
                  }
                >
                  {link.label}
                </Link>
              ))}
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
                    isScrolled ? "text-[var(--foreground)]" : "text-white"
                  )}
                  style={!isScrolled ? { filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.8))" } : undefined}
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
                src="/logo.png"
                alt="Iffer's Pictures"
                width={149}
                height={80}
                className="transition-all duration-300 h-20 w-auto"
                style={
                  !isScrolled
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
            <div className="hidden lg:flex items-center justify-end gap-9 flex-1">
              {NAV_LINKS_RIGHT.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    linkStyles,
                    isScrolled
                      ? "text-[var(--text-secondary)] hover:text-[var(--teal)] after:bg-[var(--teal)]"
                      : "after:bg-white"
                  )}
                  style={
                    isScrolled
                      ? undefined
                      : { color: "#ffffff", textShadow: heroTextShadow }
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "uppercase text-[13px] tracking-wider",
                  "px-5 py-2.5",
                  isScrolled
                    ? "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)] focus-visible:ring-[var(--teal)] shadow-sm hover:shadow-md"
                    : "bg-white text-[var(--teal-dark)] hover:bg-white/90 focus-visible:ring-white shadow-lg"
                )}
              >
                Book Now
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
            "absolute inset-0 bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)]",
            "transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8">
          <nav className="space-y-6">
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

          {/* Mobile Contact Info */}
          <div
            className={cn(
              "mt-12 pt-8 border-t border-white/20",
              "opacity-0 translate-y-4 transition-all duration-500",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "450ms" : "0ms",
            }}
          >
            <a
              href={formatPhoneLink(BUSINESS_INFO.phone)}
              className="flex items-center gap-3 text-white/90 text-lg mb-4"
            >
              <Phone className="w-5 h-5" />
              {formatPhoneNumber(BUSINESS_INFO.phone)}
            </a>
            <p className="text-white/70">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
            </p>
          </div>

          {/* Mobile CTA */}
          <div
            className={cn(
              "mt-8 opacity-0 translate-y-4 transition-all duration-500",
              isMobileMenuOpen && "opacity-100 translate-y-0"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "500ms" : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center justify-center gap-2 font-medium w-full",
                "rounded-full transition-all duration-200",
                "bg-[var(--background-warm)] text-[var(--foreground)]",
                "hover:bg-neutral-200",
                "px-8 py-4 text-lg"
              )}
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
