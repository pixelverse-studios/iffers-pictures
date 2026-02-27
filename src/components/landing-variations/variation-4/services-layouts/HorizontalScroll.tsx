import Link from "next/link";
import { LucideIcon, Heart, Baby, Sparkles, PartyPopper, Users, User, Church, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  User,
  Church,
};

const CARD_ACCENTS: Record<string, string> = {
  "engagement-photography": "from-[var(--teal)]/10 to-[var(--teal)]/5",
  "baby-shower-photography": "from-[var(--coral)]/10 to-[var(--coral)]/5",
  "bridal-shower-photography": "from-[var(--gold)]/10 to-[var(--gold)]/5",
  "party-photography": "from-[var(--coral)]/10 to-transparent",
  "family-photography": "from-[var(--teal)]/10 to-transparent",
  headshots: "from-[var(--text-muted)]/10 to-transparent",
  "maternity-photography": "from-[var(--coral)]/8 to-transparent",
  "baptism-christening-photography": "from-[var(--teal)]/8 to-transparent",
};

export function HorizontalScroll() {
  const services = [...SERVICES];

  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6 md:-mx-8 md:px-8"
      style={{ scrollbarWidth: "none" }}
    >
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Heart;
        const accent = CARD_ACCENTS[service.slug] ?? "from-[var(--teal)]/10 to-transparent";

        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group snap-start shrink-0 w-56 flex flex-col justify-between p-5 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--teal)]/40 hover:shadow-md transition-all duration-200 overflow-hidden relative"
          >
            {/* Subtle gradient accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`} />

            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[var(--teal)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--teal)]/20 transition-colors">
                <Icon className="w-4.5 h-4.5 text-[var(--teal)]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1.5">
                {service.shortName}
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="relative mt-4 flex items-center gap-1 text-xs font-medium text-[var(--teal)] opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
