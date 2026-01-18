"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { BUSINESS_INFO } from "@/lib/constants";

export function MeetIffer() {
  return (
    <section className="section bg-[var(--background-warm)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative">
              {/* Main photo */}
              <ImagePlaceholder
                aspectRatio="portrait"
                variant="teal"
                showIcon={true}
                iconSize="lg"
                className="shadow-2xl"
              />

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--teal)]/20 rounded-2xl -z-10" />

              {/* Stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-[var(--teal)]">
                      <AnimatedCounter value={500} suffix="+" />
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Events</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-[var(--teal)]">
                      <AnimatedCounter value={5} suffix="+" />
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-4 block">
              The Photographer
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
              Meet Iffer
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              <p>
                Based in the heart of Cliffside Park, I&apos;ve spent the last five years
                turning fleeting moments into lasting memories for families throughout
                Bergen County.
              </p>
              <p>
                My approach is simple: I believe the best photographs come from genuine
                connections. When you&apos;re comfortable, your true emotions shine through,
                and that&apos;s when the magic happens.
              </p>
              <p>
                Whether it&apos;s the tears of joy at an engagement or the laughter at a
                baby shower, I&apos;m there to capture the moments you&apos;ll treasure forever.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://instagram.com/ifferspictures"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-12 h-12 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-300"
            >
              Read My Full Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
