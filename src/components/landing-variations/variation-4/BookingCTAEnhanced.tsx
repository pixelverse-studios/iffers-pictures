"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, CheckCircle, Phone } from "lucide-react";

const benefits = [
  "Free consultation call",
  "No hidden fees",
  "Digital gallery included",
  "Fast turnaround",
];

export function BookingCTAEnhanced() {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--teal)] via-[var(--teal)] to-[var(--teal-dark)] text-white relative overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Now Booking 2025
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-6">
              Ready to Capture Your
              <br />
              Special Moments?
            </h2>

            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Every event is unique, and so is every quote. Let&apos;s chat about
              your vision and create a custom package that fits your celebration.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white/70" />
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-3 font-medium",
                  "rounded-full transition-all duration-300",
                  "bg-white text-[var(--teal)]",
                  "hover:bg-neutral-100 hover:gap-4",
                  "shadow-xl hover:shadow-2xl",
                  "px-8 py-4 text-lg"
                )}
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/pricing"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-300",
                  "border-2 border-white/40 text-white",
                  "hover:border-white hover:bg-white/10",
                  "px-8 py-4 text-lg"
                )}
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Right - Quick contact + testimonial */}
          <div className="space-y-8">
            {/* Quick contact card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-heading font-semibold mb-4">
                Prefer to Call?
              </h3>
              <a
                href="tel:+12015551234"
                className="flex items-center gap-4 text-white hover:text-white/90 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-semibold">(201) 555-1234</p>
                  <p className="text-white/60 text-sm">Response within 24 hours</p>
                </div>
              </a>
            </div>

            {/* Mini testimonial */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-4xl font-heading font-bold mb-4 opacity-50">
                &ldquo;
              </div>
              <p className="text-lg leading-relaxed mb-6 opacity-90">
                The photos from our celebration exceeded every expectation.
                Iffer truly captured the heart of our special day.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20" />
                <div>
                  <p className="font-medium">The Martinez Family</p>
                  <p className="text-white/60 text-sm">Anniversary Party</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
