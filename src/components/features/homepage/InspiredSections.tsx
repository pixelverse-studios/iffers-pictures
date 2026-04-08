"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { SESSIONS } from "@/lib/constants";
import { ALL_TESTIMONIALS } from "@/data/testimonials";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";

const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

const FEATURED_TESTIMONIAL = [...ALL_TESTIMONIALS].sort(
  (a, b) => b.quote.length - a.quote.length
)[0];

/* ── INSPIRED INTRO ────────────────────────────────────────── */

export function InspiredIntro() {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Left — statement */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-[var(--accent-vivid)]" />
              <p className="text-[var(--brand-vivid)] font-medium tracking-[0.2em] uppercase text-xs">
                Bergen County Photographer
              </p>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-[var(--foreground)] leading-snug">
              Hi, I&apos;m Jennifer — capturing life&apos;s most meaningful
              moments with{" "}
              <span className="text-[var(--brand-vivid)] italic">
                warmth and intention
              </span>
              .
            </p>
          </div>

          {/* Right — link */}
          <div className="md:col-span-5 md:text-right">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--brand-vivid)] font-medium hover:gap-3 transition-all duration-200"
            >
              Meet Jenn
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── INSPIRED SESSIONS ─────────────────────────────────────── */

export function InspiredSessions() {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header row */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-8 bg-[var(--brand-vivid)]" />
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
            Sessions
          </h2>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <Link
            href="/services"
            className="text-sm text-[var(--brand-vivid)] font-medium whitespace-nowrap hover:underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {/* Image tile grid — editorial style */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {SESSIONS.map((session) => {
            const thumb = getServiceThumbnail(session.slug);
            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden"
              >
                {thumb && (
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {/* Teal accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--brand-vivid)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-vivid)] mb-1 font-medium">
                    {session.shortName}
                  </p>
                  <h3 className="text-sm font-heading font-semibold text-white leading-snug">
                    {session.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── INSPIRED TESTIMONIAL ──────────────────────────────────── */

export function InspiredTestimonial() {
  return (
    <section className="bg-[var(--brand-strong)] py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Quote */}
          <div className="md:col-span-9">
            <span className="block text-6xl md:text-8xl font-heading text-white/10 leading-none select-none -mb-6 md:-mb-10">
              &ldquo;
            </span>
            <blockquote className="text-lg md:text-xl lg:text-2xl font-heading text-white/90 leading-relaxed">
              {FEATURED_TESTIMONIAL.quote}
            </blockquote>
          </div>

          {/* Author + stars */}
          <div className="md:col-span-3 md:text-right">
            <div className="flex gap-0.5 md:justify-end mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-[var(--highlight-vivid)] fill-[var(--highlight-vivid)]"
                />
              ))}
            </div>
            <p className="text-white/70 text-sm font-medium">
              {FEATURED_TESTIMONIAL.author}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {SESSION_LABELS[FEATURED_TESTIMONIAL.sessionType] ??
                FEATURED_TESTIMONIAL.sessionType}
            </p>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-[var(--brand-soft)] text-xs font-medium mt-3 hover:gap-2.5 transition-all duration-200"
            >
              More reviews
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── INSPIRED CTA ──────────────────────────────────────────── */

export function InspiredCTA() {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left — text */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-[var(--highlight-vivid)]" />
              <p className="text-[var(--brand-vivid)] font-medium tracking-[0.2em] uppercase text-xs">
                Let&apos;s Work Together
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
              Your story deserves to be
              <br />
              <span className="text-[var(--brand-vivid)] italic">
                beautifully told.
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-base hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-md shadow-[var(--brand-vivid)]/20 hover:shadow-lg"
            >
              Inquire Here
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — stats */}
          <div className="md:col-span-5 md:border-l md:border-[var(--border)] md:pl-10">
            <div className="space-y-6">
              {[
                { value: "200+", label: "Events Captured" },
                { value: "5+", label: "Years Experience" },
                { value: "100%", label: "Facebook Rating" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-4">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-[var(--brand-vivid)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
