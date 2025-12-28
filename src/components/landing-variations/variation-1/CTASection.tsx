"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-[var(--teal)] via-[var(--teal)] to-[var(--teal-dark)] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-6">
            Ready to Capture Your
            <br />
            <span className="text-white/90">Special Moments?</span>
          </h2>

          {/* Description */}
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            Let&apos;s create beautiful memories together. Whether it&apos;s an
            engagement, baby shower, or celebration, I&apos;d love to hear about
            your upcoming event.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-3 font-medium",
                "rounded-full transition-all duration-300",
                "bg-white text-[var(--teal)]",
                "hover:bg-neutral-100 hover:gap-4",
                "shadow-xl hover:shadow-2xl",
                "px-8 py-4 text-lg w-full sm:w-auto"
              )}
            >
              <Calendar className="w-5 h-5" />
              Book a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/pricing"
              className={cn(
                "inline-flex items-center justify-center gap-2 font-medium",
                "rounded-full transition-all duration-300",
                "border-2 border-white/40 text-white",
                "hover:border-white hover:bg-white/10",
                "px-8 py-4 text-lg w-full sm:w-auto"
              )}
            >
              View Pricing
            </Link>
          </div>

          {/* Quick contact */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
            <span className="text-sm">Or reach out directly:</span>
            <a
              href="tel:+12015551234"
              className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(201) 555-1234</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
