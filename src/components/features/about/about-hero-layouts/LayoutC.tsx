import { Instagram, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";

/**
 * Layout C — Dramatic Split Card
 * Dark image panel left / warm text panel right.
 * Completely different mood from A and B — high contrast, editorial drama.
 * The dark panel frames the photo like a gallery wall.
 */
export function LayoutC() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg grid lg:grid-cols-[40%_60%] min-h-[28rem]">
      {/* Left: Dark image panel */}
      <div className="relative bg-[var(--foreground)] flex items-center justify-center p-8 order-2 lg:order-1 min-h-56">
        {/* Portrait inside the dark panel */}
        <div className="w-full max-w-[18rem] mx-auto">
          <Image
            src="/headshot.jpg"
            alt="Jennifer Matone — Bergen County Event Photographer"
            width={176}
            height={264}
            className="rounded-2xl object-cover w-full h-auto"
            priority
          />
        </div>
        {/* Subtle top-left teal accent */}
        <div className="absolute top-5 left-5 w-6 h-6 border-l-2 border-t-2 border-[var(--teal)]/40 rounded-tl-sm" />
        {/* Subtle bottom-right teal accent */}
        <div className="absolute bottom-5 right-5 w-6 h-6 border-r-2 border-b-2 border-[var(--teal)]/40 rounded-br-sm" />
      </div>

      {/* Right: Warm text panel */}
      <div className="bg-[var(--background-warm)] p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
        {/* Location with leading rule */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-6 bg-[var(--teal)]" />
          <p className="text-[var(--teal)] font-medium tracking-[0.25em] uppercase text-xs">
            Bergen County, NJ
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-[var(--foreground)] leading-[1.0] mb-4">
          Jennifer
          <br />
          <span className="text-[var(--teal)]">Matone</span>
        </h1>

        <p className="text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase font-medium mb-5">
          Bergen County Event Photographer
        </p>

        <p className="text-base text-[var(--text-secondary)] italic font-body leading-relaxed mb-8 max-w-xs">
          Drawn to light, laughter, and the quiet moments in between.
        </p>

        <div className="flex items-center gap-3 mb-8">
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

        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <div className="h-px w-8 bg-[var(--teal)]/30" />
          <span className="text-xs tracking-[0.2em] uppercase">My story</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
