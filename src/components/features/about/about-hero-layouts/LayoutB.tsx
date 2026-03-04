import { Instagram, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";

/**
 * Layout B — Centered Personal
 * Portrait-first, everything centered.
 * Feels like a personal portfolio homepage — intimate, direct.
 * Structurally opposite to A (single centered column vs. horizontal split).
 */
export function LayoutB() {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      {/* Portrait — centered at top, medium size */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-44 h-56 rounded-2xl overflow-hidden ring-4 ring-white ring-offset-4 ring-offset-[var(--background-warm)] shadow-lg">
          <Image
            src="/headshot.jpg"
            alt="Jennifer Matone — Bergen County Event Photographer"
            width={176}
            height={224}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* Three dot accent below portrait */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
          <div className="w-1 h-1 rounded-full bg-[var(--teal)]/50" />
          <div className="w-0.5 h-0.5 rounded-full bg-[var(--teal)]/25" />
        </div>
      </div>

      {/* Location */}
      <p className="text-[var(--teal)] font-medium tracking-[0.25em] uppercase text-xs mb-4">
        Bergen County, New Jersey
      </p>

      {/* Name */}
      <h1 className="text-5xl sm:text-6xl font-heading text-[var(--foreground)] leading-[1.0] mb-5">
        Jennifer
        <br />
        <span className="text-[var(--teal)]">Matone</span>
      </h1>

      {/* Ornamental rule */}
      <div className="flex items-center gap-3 my-4 w-full max-w-[12rem]">
        <div className="h-px flex-1 bg-[var(--teal)]/20" />
        <div className="w-1 h-1 rounded-full bg-[var(--teal)]/50" />
        <div className="h-px flex-1 bg-[var(--teal)]/20" />
      </div>

      {/* Role */}
      <p className="text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase font-medium mb-4">
        Bergen County Event Photographer
      </p>

      {/* Tagline */}
      <p className="text-lg text-[var(--text-secondary)] italic font-body leading-relaxed mb-8">
        Drawn to light, laughter, and the quiet moments in between.
      </p>

      {/* Social */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <a
          href={BUSINESS_INFO.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
          aria-label="Follow Jennifer on Instagram"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${BUSINESS_INFO.email}`}
          className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
          aria-label="Email Jennifer"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>

      {/* Scroll cue */}
      <div className="flex items-center gap-3 text-[var(--text-muted)]">
        <div className="h-px w-8 bg-[var(--teal)]/30" />
        <span className="text-xs tracking-[0.2em] uppercase">My story</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </div>
  );
}
