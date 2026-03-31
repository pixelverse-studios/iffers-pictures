import Link from "next/link";
import { SESSIONS } from "@/lib/constants";

/** Borderless floating cards — no outlines, soft shadow on hover */
export function FloatingLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {SESSIONS.map((session) => (
        <Link
          key={session.slug}
          href={`/services/${session.slug}`}
          className="group text-center p-6 rounded-xl bg-transparent hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <h3 className="text-base font-heading font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--teal)] transition-colors">
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
