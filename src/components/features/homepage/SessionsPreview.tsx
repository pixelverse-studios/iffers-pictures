import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS } from "@/lib/constants";

export function SessionsPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)]">
            Sessions
          </h2>
        </div>

        {/* Session Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {SESSIONS.map((session) => (
            <Link
              key={session.slug}
              href={`/services/${session.slug}`}
              className="group text-center p-6 rounded-xl border border-[var(--border)] hover:border-[var(--teal-light)] hover:shadow-md transition-all duration-200"
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

        {/* Link */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-200"
          >
            Explore Sessions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
