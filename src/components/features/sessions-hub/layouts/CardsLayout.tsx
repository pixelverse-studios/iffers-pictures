import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS } from "../data";

export function CardsLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SESSIONS.map((session) => (
            <Link
              key={session.slug}
              href={`/services/${session.slug}`}
              className="group p-8 rounded-2xl border border-[var(--border)] bg-white hover:border-[var(--brand-soft)] hover:shadow-lg transition-all duration-300"
            >
              <div className="h-1 w-10 bg-[var(--brand)] rounded-full mb-6 group-hover:w-16 transition-all duration-300" />
              <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                {session.name}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {session.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-[var(--brand)] font-medium group-hover:gap-3 transition-all duration-200">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
