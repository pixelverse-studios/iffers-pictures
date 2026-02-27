import Link from "next/link";
import { LucideIcon, Heart, Baby, Sparkles, PartyPopper, Users, User, Church, HeartHandshake } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  User,
  Church,
  HeartHandshake,
};

// One-liners keyed by slug
const ONE_LINERS: Record<string, string> = {
  "engagement-photography": "Love stories, beautifully told",
  "baby-shower-photography": "Welcome your little one in style",
  "bridal-shower-photography": "Celebrate the bride-to-be",
  "party-photography": "Birthdays, anniversaries & more",
  "family-photography": "Real moments, real connections",
  headshots: "LinkedIn, corporate & performer",
  "maternity-photography": "Timeless pregnancy portraits",
  "baptism-christening-photography": "Sacred milestones, documented",
};

export function IconGrid() {
  const services = [...SERVICES];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Heart;
        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col items-center text-center gap-2.5 p-4 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--teal)]/40 hover:bg-[var(--background-warm)] transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center group-hover:bg-[var(--teal)]/20 transition-colors">
              <Icon className="w-5 h-5 text-[var(--teal)]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] leading-tight">
                {service.shortName}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                {ONE_LINERS[service.slug]}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
