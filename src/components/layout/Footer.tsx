import Link from "next/link";
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import {
  SITE_CONFIG,
  BUSINESS_INFO,
  FOOTER_LINKS,
  SERVICE_AREAS,
} from "@/lib/constants";
import { formatPhoneNumber, formatPhoneLink } from "@/lib/utils";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--sand)] text-white">
      {/* Main Footer Content */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-semibold">
                <span className="text-[var(--teal-light)]">Iffer&apos;s</span> Pictures
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {SITE_CONFIG.tagline}. Professional event photography serving{" "}
              {BUSINESS_INFO.address.city} and Bergen County, NJ.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {BUSINESS_INFO.social.instagram && (
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {BUSINESS_INFO.social.facebook && (
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--teal-light)] mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--teal-light)] mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--teal-light)] mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={formatPhoneLink(BUSINESS_INFO.phone)}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  <Phone className="w-4 h-4 text-[var(--teal-light)]" />
                  {formatPhoneNumber(BUSINESS_INFO.phone)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4 text-[var(--teal-light)]" />
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4 text-[var(--teal-light)] mt-0.5" />
                  <span>
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                  </span>
                </div>
              </li>
            </ul>

            {/* Service Areas */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Service Areas
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                {SERVICE_AREAS.primary.map((area) => area.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[var(--coral)]" /> in{" "}
              {BUSINESS_INFO.address.city}, NJ
            </p>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <LocalBusinessSchema />
    </footer>
  );
}
