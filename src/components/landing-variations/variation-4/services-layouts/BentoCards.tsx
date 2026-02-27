import Link from "next/link";
import { LucideIcon, Heart, Sparkles, PartyPopper, Users, User, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Sparkles,
  PartyPopper,
  Users,
  User,
};

// Per-service tints: a warm background wash + a distinct accent color for the icon badge
const CARD_STYLES: Record<string, { bg: string; badge: string; accent: string }> = {
  events:     { bg: "bg-[#fff9f6]",  badge: "bg-[var(--coral)]/15",      accent: "text-[var(--coral)]" },
  family:     { bg: "bg-[#f4fbfa]",  badge: "bg-[var(--teal)]/15",       accent: "text-[var(--teal)]" },
  milestones: { bg: "bg-[#fdf9ee]",  badge: "bg-[var(--gold)]/20",       accent: "text-[var(--gold)]" },
  headshots:  { bg: "bg-[#f7f7f7]",  badge: "bg-[var(--text-muted)]/15", accent: "text-[var(--text-secondary)]" },
  maternity:  { bg: "bg-[#fff5f5]",  badge: "bg-[var(--coral)]/10",      accent: "text-[var(--coral)]" },
};

interface BentoCardProps {
  service: (typeof SERVICES)[number];
  featured?: boolean;
}

function BentoCard({ service, featured = false }: BentoCardProps) {
  const Icon = ICON_MAP[service.icon] ?? Heart;
  const styles = CARD_STYLES[service.slug] ?? {
    bg: "bg-[var(--background-warm)]",
    badge: "bg-[var(--teal)]/15",
    accent: "text-[var(--teal)]",
  };

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] p-6 md:p-7 overflow-hidden",
        "hover:border-[var(--teal)]/30 hover:shadow-lg transition-all duration-300",
        styles.bg,
        featured ? "min-h-[180px] md:min-h-[200px]" : "min-h-[160px]"
      )}
    >
      {/* Decorative corner accent — subtle radial glow */}
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 pointer-events-none",
          "bg-radial-[ellipse_at_top_right]",
          featured ? "w-48 h-48 opacity-40" : ""
        )}
        style={{
          background: service.slug === "events"
            ? "radial-gradient(ellipse at top right, rgba(255,133,89,0.2) 0%, transparent 70%)"
            : service.slug === "family"
            ? "radial-gradient(ellipse at top right, rgba(26,155,142,0.18) 0%, transparent 70%)"
            : service.slug === "milestones"
            ? "radial-gradient(ellipse at top right, rgba(212,175,55,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse at top right, rgba(26,155,142,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Top: icon badge */}
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mb-4",
          "group-hover:scale-110 transition-transform duration-200",
          styles.badge
        )}
      >
        <Icon className={cn("w-4.5 h-4.5", styles.accent)} strokeWidth={1.5} />
      </div>

      {/* Middle: service name */}
      <div className="flex-1">
        <h3
          className={cn(
            "font-heading font-semibold text-[var(--foreground)] leading-tight",
            featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          )}
        >
          {service.name}
        </h3>
        <p
          className={cn(
            "text-[var(--text-secondary)] mt-2 leading-relaxed",
            featured ? "text-sm" : "text-xs",
            "line-clamp-2"
          )}
        >
          {service.description}
        </p>
      </div>

      {/* Bottom: link arrow */}
      <div
        className={cn(
          "mt-4 flex items-center gap-1 text-xs font-medium transition-all duration-200",
          "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
          styles.accent
        )}
      >
        Explore
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

export function BentoCards() {
  const services = [...SERVICES];
  const [featured, ...rest] = services;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Featured card — spans 2 cols on lg */}
      <div className="sm:col-span-2 lg:col-span-2">
        <BentoCard service={featured} featured />
      </div>

      {/* Second card — fills the third col on lg, wraps on sm */}
      <div>
        <BentoCard service={rest[0]} />
      </div>

      {/* Remaining three cards — one each */}
      {rest.slice(1).map((service) => (
        <div key={service.id}>
          <BentoCard service={service} />
        </div>
      ))}
    </div>
  );
}
