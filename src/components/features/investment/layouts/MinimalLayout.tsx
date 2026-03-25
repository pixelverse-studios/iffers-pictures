import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSION_INCLUSIONS, WHATS_INCLUDED } from "../data";

export function MinimalLayout() {
  return (
    <>
      {/* Value Proposition */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-center mb-16">
            Photography is an investment in moments that matter. My sessions are
            designed to be comfortable, intentional, and uniquely yours — because
            no two stories are the same.
          </p>

          {/* Inclusions */}
          <div className="space-y-8 mb-16">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[var(--teal)] font-semibold text-center">
              What You Receive
            </h2>
            <div className="space-y-5">
              {WHATS_INCLUDED.map((item) => (
                <div key={item.label} className="flex items-center gap-4 justify-center">
                  <item.icon className="w-5 h-5 text-[var(--teal)]" />
                  <p className="text-[var(--foreground)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-semibold shrink-0">
              Sessions
            </p>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          {/* Sessions — stacked */}
          <div className="space-y-10">
            {SESSION_INCLUSIONS.map((session) => (
              <div key={session.slug} className="text-center">
                <h3 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-1">
                  {session.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] italic mb-4">{session.tagline}</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
                  {session.items.map((item) => (
                    <span key={item} className="text-sm text-[var(--text-secondary)]">
                      {item}
                    </span>
                  ))}
                </div>
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
    </>
  );
}
