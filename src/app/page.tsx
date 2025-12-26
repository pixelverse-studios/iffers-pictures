import Link from "next/link";
import {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Mountain,
  ArrowRight,
  Camera,
  Star,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { SERVICES, SERVICE_AREAS, BUSINESS_INFO } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Mountain,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-[var(--background-warm)]">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--teal)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--coral)]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--teal)]/3 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="animate-fade-in-down">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--teal)]/10 text-[var(--teal)] text-sm font-medium mb-8">
                <Camera className="w-4 h-4" />
                Event Photography in {BUSINESS_INFO.address.city}, NJ
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-[var(--foreground)] leading-[1.1] mb-6 animate-fade-in-up">
              Capturing Your{" "}
              <span className="relative">
                <span className="text-gradient-teal">Unforgettable</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="var(--coral)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-[draw_1s_ease-out_0.5s_forwards]"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: 200,
                    }}
                  />
                </svg>
              </span>{" "}
              Moments
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
              Professional event photography for engagements, baby showers, bridal
              showers, and celebrations. Serving Bergen County and Northern New Jersey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-dark)]",
                  "shadow-lg hover:shadow-xl hover:shadow-[var(--teal)]/20",
                  "px-8 py-4 text-lg"
                )}
              >
                Book Your Session
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "border-2 border-[var(--foreground)]/20 text-[var(--foreground)]",
                  "hover:border-[var(--teal)] hover:text-[var(--teal)]",
                  "px-8 py-4 text-lg"
                )}
              >
                View Portfolio
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in-up delay-500">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]"
                    />
                  ))}
                </div>
                <span className="text-sm">5-Star Reviews</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <MapPin className="w-5 h-5 text-[var(--teal)]" />
                <span className="text-sm">Bergen County, NJ</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Camera className="w-5 h-5 text-[var(--teal)]" />
                <span className="text-sm">500+ Events Captured</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[var(--teal)]" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Our Services"
            title="Photography for Every Celebration"
            description="From intimate gatherings to grand celebrations, we capture the moments that matter most."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {SERVICES.filter((s) => s.featured).map((service) => {
              const Icon = iconMap[service.icon] || Camera;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <Card
                    variant="bordered"
                    hover
                    className="h-full text-center group-hover:border-[var(--teal)]/30"
                  >
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--teal)]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--teal)] transition-colors duration-300">
                        <Icon className="w-8 h-8 text-[var(--teal)] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
                        {service.shortName}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-2 text-[var(--teal)] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview / Story Section */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 relative">
                {/* Placeholder for photographer image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--teal)]/20 to-[var(--coral)]/20 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-[var(--teal)]/30" />
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[var(--teal)] rounded-2xl -z-10" />
              {/* Stats card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6">
                <div className="text-4xl font-heading font-bold text-[var(--teal)]">
                  500+
                </div>
                <div className="text-[var(--text-secondary)] text-sm">
                  Happy Clients
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-3 block">
                About Iffer&apos;s Pictures
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
                Telling Your Story Through{" "}
                <span className="text-gradient-teal">Timeless Images</span>
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Every celebration tells a unique story. As a professional event
                  photographer based in Cliffside Park, I specialize in capturing
                  the authentic moments, genuine emotions, and precious details
                  that make your events unforgettable.
                </p>
                <p>
                  From the tears of joy at an engagement announcement to the laughter
                  at a baby shower game, I believe in documenting not just events,
                  but the feelings and connections that make them meaningful.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mt-8">
                <div>
                  <div className="text-2xl font-heading font-bold text-[var(--foreground)]">
                    5+ Years
                  </div>
                  <div className="text-[var(--text-muted)] text-sm">Experience</div>
                </div>
                <div className="w-px h-12 bg-[var(--border)]" />
                <div>
                  <div className="text-2xl font-heading font-bold text-[var(--foreground)]">
                    Bergen County
                  </div>
                  <div className="text-[var(--text-muted)] text-sm">Based In</div>
                </div>
                <div className="w-px h-12 bg-[var(--border)]" />
                <div>
                  <div className="text-2xl font-heading font-bold text-[var(--foreground)]">
                    100%
                  </div>
                  <div className="text-[var(--text-muted)] text-sm">Satisfaction</div>
                </div>
              </div>

              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium mt-10",
                  "rounded-full transition-all duration-200",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-dark)]",
                  "shadow-sm hover:shadow-md",
                  "px-6 py-3 text-base"
                )}
              >
                Learn More About Me
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Portfolio"
            title="Recent Work"
            description="Browse through some of our favorite moments from recent events."
          />

          {/* Portfolio Grid Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-xl overflow-hidden bg-neutral-100 group cursor-pointer",
                  i === 0 && "md:col-span-2 md:row-span-2",
                  i === 3 && "md:col-span-2"
                )}
              >
                <div
                  className={cn(
                    "aspect-square bg-gradient-to-br from-[var(--teal)]/10 to-[var(--coral)]/10",
                    "flex items-center justify-center",
                    i === 0 && "aspect-auto md:h-full"
                  )}
                >
                  <Camera className="w-12 h-12 text-[var(--teal)]/20" />
                </div>
                <div className="absolute inset-0 bg-[var(--teal)]/0 group-hover:bg-[var(--teal)]/80 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className={cn(
                "inline-flex items-center justify-center gap-2 font-medium",
                "rounded-full transition-all duration-200",
                "border-2 border-[var(--teal)] text-[var(--teal)]",
                "hover:bg-[var(--teal)] hover:text-white",
                "px-8 py-4 text-lg"
              )}
            >
              View Full Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="section bg-[var(--foreground)] text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[var(--teal-light)] font-medium tracking-wide uppercase text-sm mb-3 block">
              Service Areas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-4">
              Proudly Serving Northern New Jersey
            </h2>
            <p className="text-neutral-400">
              Based in Cliffside Park, I provide professional event photography
              throughout Bergen County and surrounding areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Areas */}
            <div className="bg-white/5 rounded-2xl p-8">
              <h3 className="text-[var(--teal-light)] font-medium mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Primary Service Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                {SERVICE_AREAS.primary.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}`}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-200",
                      area.isHomeBase
                        ? "bg-[var(--teal)] text-white"
                        : "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    {area.name}, {area.state}
                    {area.isHomeBase && " (Home Base)"}
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary Areas */}
            <div className="bg-white/5 rounded-2xl p-8">
              <h3 className="text-neutral-400 font-medium mb-6">
                Also Serving
              </h3>
              <div className="flex flex-wrap gap-3">
                {SERVICE_AREAS.secondary.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}`}
                    className="px-4 py-2 rounded-full bg-white/5 text-neutral-400 text-sm hover:bg-white/10 hover:text-neutral-300 transition-all duration-200"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-6">
              Ready to Capture Your Special Moments?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Let&apos;s discuss your upcoming event and create beautiful memories
              together. I&apos;d love to hear your story.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-200",
                  "bg-white text-[var(--teal)]",
                  "hover:bg-neutral-100",
                  "shadow-lg hover:shadow-xl",
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
                  "rounded-full transition-all duration-200",
                  "border-2 border-white/30 text-white",
                  "hover:border-white hover:bg-white/10",
                  "px-8 py-4 text-lg"
                )}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
