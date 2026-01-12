"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants";
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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Iffer's Pictures"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
              <span
                className={cn(
                  "text-2xl md:text-3xl font-heading font-semibold transition-colors duration-300",
                  isScrolled ? "text-[var(--foreground)]" : "text-[var(--foreground)]"
                )}
              >
                <span className="text-[var(--teal)]">Iffer&apos;s</span> Pictures
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    "hover:text-[var(--teal)]",
                    isScrolled
                      ? "text-[var(--text-secondary)]"
                      : "text-[var(--foreground)]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={formatPhoneLink(BUSINESS_INFO.phone)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
                  "hover:text-[var(--teal)]",
                  isScrolled
                    ? "text-[var(--text-secondary)]"
                    : "text-[var(--foreground)]"
                )}
              >
                <Phone className="w-4 h-4" />
                {formatPhoneNumber(BUSINESS_INFO.phone)}
              </a>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-dark)]",
                  "focus-visible:ring-[var(--teal)]",
                  "shadow-sm hover:shadow-md",
                  "px-4 py-2 text-sm"
                )}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 -mr-2"
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
                    isScrolled ? "text-[var(--foreground)]" : "text-[var(--foreground)]"
                  )}
                />
              )}
            </button>
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
