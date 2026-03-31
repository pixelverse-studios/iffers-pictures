import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSION_INCLUSIONS, WHATS_INCLUDED } from "../data";

export function CardsLayout() {
  return (
    <>
      {/* Session Cards */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SESSION_INCLUSIONS.map((session) => (
              <div
                key={session.slug}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-white hover:border-[var(--teal-light)] hover:shadow-lg transition-all duration-300"
              >
                <div className="h-1 w-8 bg-[var(--teal)] rounded-full mb-5" />
                <h2 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-1">
                  {session.name}
                </h2>
                <p className="text-sm text-[var(--text-muted)] italic mb-4">{session.tagline}</p>
                <ul className="space-y-3 mb-6">
                  {session.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${session.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--teal)] font-medium hover:gap-2.5 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Every Session Includes */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] text-center mb-12">
            Every Session Includes
          </h2>
          <div className="space-y-6">
            {WHATS_INCLUDED.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--teal)]" />
                </div>
                <p className="text-[var(--text-secondary)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
