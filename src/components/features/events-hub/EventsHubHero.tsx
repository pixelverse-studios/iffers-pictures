import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Camera, Sparkles } from "lucide-react";

interface EventsHubHeroProps {
  className?: string;
}

export function EventsHubHero({ className }: EventsHubHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[55vh] flex items-center overflow-hidden",
        "bg-gradient-to-br from-[var(--background-warm)] via-white to-[var(--teal)]/5",
        className
      )}
    >
      {/* Decorative blurs */}
      <div className="absolute top-16 right-16 w-80 h-80 bg-[var(--teal)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-8 left-8 w-64 h-64 bg-[var(--coral)]/5 rounded-full blur-3xl" />

      {/* Floating icons */}
      <div className="absolute top-1/4 right-1/3 hidden lg:block opacity-15 animate-float">
        <Camera className="w-10 h-10 text-[var(--teal)]" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 hidden lg:block opacity-15 animate-float delay-300">
        <Sparkles className="w-8 h-8 text-[var(--coral)]" />
      </div>

      <div className="container relative pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
            <Link href="/" className="hover:text-[var(--teal)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-[var(--teal)] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--foreground)] font-medium">Events</span>
          </nav>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
            Event{" "}
            <span className="text-[var(--teal)]">Photography</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl mx-auto">
            Candid, documentary-style coverage for life&apos;s biggest celebrations in Bergen County, NJ
          </p>

          {/* Description */}
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl mx-auto">
            From baby showers and bridal celebrations to proposals and milestone events&mdash;every gathering deserves to be remembered exactly as it felt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Book Your Event</Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
