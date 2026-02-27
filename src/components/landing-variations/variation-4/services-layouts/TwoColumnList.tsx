import Link from "next/link";
import { LucideIcon, Heart, Sparkles, PartyPopper, Users, User, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Sparkles,
  PartyPopper,
  Users,
  User,
};

export function TwoColumnList() {
  const services = [...SERVICES];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] ?? Heart;
        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex items-start gap-3.5 p-3.5 rounded-lg hover:bg-[var(--background-warm)] transition-colors duration-150"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--teal)]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[var(--teal)]/20 transition-colors">
              <Icon className="w-4 h-4 text-[var(--teal)]" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {service.name}
                </p>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--teal)] opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
