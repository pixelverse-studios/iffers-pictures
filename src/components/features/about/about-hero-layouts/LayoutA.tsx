import { Instagram, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";

/**
 * Layout A — Centered Two-Column
 * Portrait left, text right, centered on the page.
 */
export function LayoutA() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
      {/* Portrait column */}
      <div className="relative flex justify-center">
        {/* Warm backing card — slight offset for depth */}
        <div className="absolute top-4 left-4 w-[13rem] h-full bg-[var(--brand)]/8 rounded-2xl -z-10" />
        {/* Image */}
        <div className="relative w-[13rem]">
          <Image
            src="/headshot.jpg"
            alt="Jennifer Matone — Bergen County Event Photographer"
            width={208}
            height={312}
            className="rounded-2xl object-cover w-full h-auto shadow-md"
            priority
          />
          {/* Corner accent frame */}
          <div className="absolute -bottom-3 -right-3 w-14 h-14 border-2 border-[var(--brand)]/25 rounded-xl -z-10" />
        </div>
      </div>

      {/* Text column */}
      <div className="max-w-md text-center lg:text-left">
        {/* Location with leading rule */}
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="h-px w-7 bg-[var(--brand)]" />
          <p className="text-[var(--brand)] font-medium tracking-[0.25em] uppercase text-xs">
            Bergen County, New Jersey
          </p>
        </div>

        <h1 className="text-5xl sm:text-6xl font-heading text-[var(--foreground)] leading-[1.0] mb-4">
          Jennifer
          <br />
          <span className="text-[var(--brand)]">Matone</span>
        </h1>

        <p className="text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-6 font-medium">
          Bergen County Event Photographer
        </p>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 font-body italic">
          Drawn to light, laughter, and the quiet moments in between.
        </p>

        <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
          <a
            href={BUSINESS_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition-all duration-300"
            aria-label="Follow Jennifer on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="w-10 h-10 rounded-full bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition-all duration-300"
            aria-label="Email Jennifer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-3 text-[var(--text-muted)]">
          <div className="h-px w-8 bg-[var(--brand)]/30" />
          <span className="text-xs tracking-[0.2em] uppercase">My story</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
