import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, BUSINESS_INFO, SERVICE_AREAS } from "@/lib/constants";
import { formatPhoneNumber, formatPhoneLink } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_CONFIG.name} for professional event photography in ${BUSINESS_INFO.address.city}, NJ. Book your engagement, baby shower, or event photoshoot today.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-hero pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-3 block">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
              Let&apos;s Capture Your{" "}
              <span className="text-gradient-teal">Special Moments</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Ready to book your photoshoot? Have questions about my services? I&apos;d
              love to hear from you. Fill out the form below and I&apos;ll get back to
              you within 24 hours.
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
                  Send a Message
                </h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  Tell me about your event and let&apos;s create something beautiful
                  together.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                {/* Contact Details */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-6">
                    Contact Information
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href={formatPhoneLink(BUSINESS_INFO.phone)}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center group-hover:bg-[var(--teal)] transition-colors duration-200">
                          <Phone className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">Phone</p>
                          <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--teal)] transition-colors duration-200">
                            {formatPhoneNumber(BUSINESS_INFO.phone)}
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center group-hover:bg-[var(--teal)] transition-colors duration-200">
                          <Mail className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">Email</p>
                          <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--teal)] transition-colors duration-200">
                            {BUSINESS_INFO.email}
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[var(--teal)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">Location</p>
                          <p className="font-medium text-[var(--foreground)]">
                            {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            Serving Bergen County & Northern NJ
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[var(--teal)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--text-muted)] mb-1">
                            Availability
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            By Appointment
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            Weekdays & Weekends
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-4">
                    Follow Along
                  </h3>
                  <div className="flex gap-3">
                    {BUSINESS_INFO.social.instagram && (
                      <a
                        href={BUSINESS_INFO.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors duration-200 group"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                    {BUSINESS_INFO.social.facebook && (
                      <a
                        href={BUSINESS_INFO.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center hover:bg-[var(--teal)] transition-colors duration-200 group"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="p-6 rounded-xl bg-[var(--background-warm)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                    Service Areas
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {SERVICE_AREAS.primary.map((a) => a.name).join(", ")}, and
                    surrounding areas in Bergen County, NJ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] mb-4">
              Have Questions?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Check out my frequently asked questions or feel free to reach out
              directly. I&apos;m happy to help you plan your perfect photoshoot.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/pricing"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-dark)]",
                  "px-6 py-3 text-base"
                )}
              >
                View Pricing
              </a>
              <a
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "border-2 border-[var(--foreground)]/20 text-[var(--foreground)]",
                  "hover:border-[var(--teal)] hover:text-[var(--teal)]",
                  "px-6 py-3 text-base"
                )}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
