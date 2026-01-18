"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, Phone, Clock } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="section bg-gradient-to-br from-[var(--background-warm)] to-white">
      <div className="container">
        <div className="bg-[var(--foreground)] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Content */}
            <div className="p-10 md:p-16">
              <span className="text-[var(--teal-light)] font-medium tracking-wide uppercase text-sm mb-4 block">
                Get In Touch
              </span>

              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                Ready to Book?
              </h2>

              <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                Let&apos;s discuss your upcoming event. I typically respond within
                24 hours and offer complimentary consultations.
              </p>

              {/* Contact info */}
              <div className="space-y-4 mb-10">
                <a
                  href={BUSINESS_INFO.email}
                  className="flex items-center gap-4 text-white hover:text-[var(--teal-light)] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{BUSINESS_INFO.email}</span>
                </a>

                <a
                  href="tel:+12015551234"
                  className="flex items-center gap-4 text-white hover:text-[var(--teal-light)] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium">(201) 555-1234</span>
                </a>

                <div className="flex items-center gap-4 text-neutral-400">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span>Response within 24 hours</span>
                </div>
              </div>

              {/* CTA button */}
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-3 font-medium",
                  "rounded-full transition-all duration-300",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-light)] hover:text-[var(--foreground)]",
                  "shadow-lg shadow-[var(--teal)]/30 hover:shadow-xl",
                  "px-8 py-4 text-lg"
                )}
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Form preview / visual */}
            <div className="relative bg-white/5 p-10 md:p-16 hidden lg:flex items-center justify-center">
              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Simplified form preview */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-white/10">
                <h3 className="text-white font-heading font-semibold text-xl mb-6">
                  Quick Inquiry
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Name</label>
                    <div className="h-12 rounded-lg bg-white/10 border border-white/10" />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email</label>
                    <div className="h-12 rounded-lg bg-white/10 border border-white/10" />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Event Type</label>
                    <div className="h-12 rounded-lg bg-white/10 border border-white/10" />
                  </div>

                  <div className="h-12 rounded-full bg-[var(--teal)] flex items-center justify-center text-white font-medium mt-6">
                    Submit Inquiry
                  </div>
                </div>

                <p className="text-white/40 text-xs text-center mt-4">
                  Full form available on contact page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
