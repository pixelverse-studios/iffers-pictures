import { Instagram, Mail, ChevronDown } from "lucide-react";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { BUSINESS_INFO } from "@/lib/constants";

export function AboutHero() {
  return (
    <section className="pt-hero pb-16 md:pb-20 bg-[var(--background-warm)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Headshot placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <ImagePlaceholder
                aspectRatio="portrait"
                variant="teal"
                showIcon={true}
                iconSize="lg"
                label="Photo coming soon"
                className="shadow-2xl"
              />
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--teal)]/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Intro content */}
          <div className="order-1 lg:order-2">
            <p className="text-[var(--teal)] font-medium tracking-[0.25em] uppercase text-xs mb-6">
              Bergen County, New Jersey
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading text-[var(--foreground)] leading-[1.0] mb-5">
              Jennifer
              <br />
              <span className="text-[var(--teal)]">Matone</span>
            </h1>

            <p className="text-base text-[var(--text-muted)] tracking-[0.15em] uppercase mb-8 font-medium">
              Photographer &nbsp;&middot;&nbsp; Math Teacher
            </p>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-md font-body italic">
              Drawn to light, laughter, and the quiet moments in between.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
                aria-label="Follow Jennifer on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-11 h-11 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
                aria-label="Email Jennifer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Scroll cue — leads eye into the story */}
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              <div className="h-px w-8 bg-[var(--teal)]/30" />
              <span className="text-xs tracking-[0.2em] uppercase">My story</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
