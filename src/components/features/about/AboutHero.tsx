import { Instagram, Mail } from "lucide-react";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { BUSINESS_INFO } from "@/lib/constants";

export function AboutHero() {
  return (
    <section className="pt-hero pb-16 md:pb-24 bg-[var(--background-warm)]">
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
            <p className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-4">
              About Jennifer
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-[1.05] mb-3">
              Hi, I&apos;m Jennifer
            </h1>
            <p className="text-2xl text-[var(--text-muted)] font-body italic mb-6">
              (but my friends call me Jenn)
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Photographer, middle school math teacher, and someone who believes
              the best moments in life deserve to be beautifully remembered.
            </p>

            <div className="flex items-center gap-4">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
                aria-label="Follow Jennifer on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-12 h-12 rounded-full bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition-all duration-300"
                aria-label="Email Jennifer"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
