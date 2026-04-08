import Link from "next/link";
import { SESSIONS } from "@/lib/constants";

/** Original bordered card grid */
export function CardsLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {SESSIONS.map((session) => (
        <Link
          key={session.slug}
          href={`/services/${session.slug}`}
          className="group text-center p-6 rounded-xl border border-[var(--border)] hover:border-[var(--brand-soft)] hover:shadow-md transition-all duration-200"
        >
          <h3 className="text-base font-heading font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--brand)] transition-colors">
            {session.name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {session.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
