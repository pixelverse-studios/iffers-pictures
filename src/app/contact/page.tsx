import { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { CONTACT_PAGE_COPY } from "@/data/page-copy";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Inquire | Iffer's Pictures | Bergen County NJ",
  description: `Get in touch with ${SITE_CONFIG.name} for photography sessions in ${BUSINESS_INFO.address.city}, NJ. Event, family, maternity, couples, and portrait sessions.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-hero pb-10 md:pb-12 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
              {CONTACT_PAGE_COPY.hero.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {CONTACT_PAGE_COPY.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--background-warm)] rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-heading font-semibold text-[var(--foreground)] mb-2">
                  {CONTACT_PAGE_COPY.form.title}
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  {CONTACT_PAGE_COPY.form.description}
                </p>
                <Suspense fallback={<div className="h-96" aria-hidden />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                {/* Contact Details */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-6">
                    {CONTACT_PAGE_COPY.sidebar.contactTitle}
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center group-hover:bg-[var(--brand)] transition-colors duration-200">
                          <Mail className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.emailLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors duration-200">
                            {BUSINESS_INFO.email}
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[var(--brand)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.locationLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {CONTACT_PAGE_COPY.sidebar.serviceArea}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[var(--brand)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            {CONTACT_PAGE_COPY.sidebar.availabilityLabel}
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {CONTACT_PAGE_COPY.sidebar.availability}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {CONTACT_PAGE_COPY.sidebar.availabilityDetail}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-4">
                    {CONTACT_PAGE_COPY.sidebar.followTitle}
                  </h3>
                  <div className="flex gap-3">
                    {BUSINESS_INFO.social.instagram && (
                      <a
                        href={BUSINESS_INFO.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center hover:bg-[var(--brand)] transition-colors duration-200 group"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                    {BUSINESS_INFO.social.facebook && (
                      <a
                        href={BUSINESS_INFO.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center hover:bg-[var(--brand)] transition-colors duration-200 group"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="p-6 rounded-xl bg-[var(--background-warm)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                    {CONTACT_PAGE_COPY.sidebar.serviceAreasTitle}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {CONTACT_PAGE_COPY.sidebar.serviceAreasDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] leading-relaxed">
              {CONTACT_PAGE_COPY.closing.title}
            </p>
            <p className="text-[var(--text-secondary)] mt-4">
              {CONTACT_PAGE_COPY.closing.signature}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
