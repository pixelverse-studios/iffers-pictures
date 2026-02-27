import Link from "next/link";
import { LucideIcon, Heart, Sparkles, PartyPopper, Users, User } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Sparkles,
  PartyPopper,
  Users,
  User,
};

const ONE_LINERS: Record<string, string> = {
  events: "Every celebration, beautifully documented",
  family: "Real connections, genuine moments",
  milestones: "Life's chapters, preserved forever",
  headshots: "First impressions that open doors",
  maternity: "The beauty of new beginnings",
};

export function IconGrid() {
  const services = [...SERVICES];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Heart;
        const tagline = ONE_LINERS[service.slug] ?? service.description;

        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col items-center text-center gap-2.5 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--teal)]/40 hover:bg-[var(--background-warm)] transition-all duration-150"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center group-hover:bg-[var(--teal)]/20 transition-colors">
              <Icon className="w-5 h-5 text-[var(--teal)]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)] leading-tight">
                {service.shortName}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed hidden sm:block">
                {tagline}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
