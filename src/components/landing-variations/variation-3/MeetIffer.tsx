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
              Meet Jenn
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              <p>
                I&apos;ve loved photography for as long as I can remember — always the one
                holding the camera, drawn to the quiet in-between moments that somehow
                become the most meaningful memories.
              </p>
              <p>
                In addition to photography, I&apos;m a middle school math teacher in Bergen
                County. That experience has shaped my patience, my attention to detail,
                and my ability to connect naturally with families and children.
              </p>
              <p>
                My goal: to create timeless images that bring you back not just to how
                it looked — but to how it felt.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href={BUSINESS_INFO.social.instagram}
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
