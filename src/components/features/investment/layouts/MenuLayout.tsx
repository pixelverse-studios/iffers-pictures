import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSION_INCLUSIONS, WHATS_INCLUDED } from "../data";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

const SESSION_IMAGE_MAP: Record<string, string> = {
  events: "Baby Shower",
  family: "Family",
  maternity: "Maternity",
  "couples-engagement": "Engagement",
  portrait: "Family",
};

function getSessionImage(slug: string): string | undefined {
  const sub = SESSION_IMAGE_MAP[slug];
  return PORTFOLIO_ITEMS.find((p) => p.subCategory === sub)?.src;
}

export function MenuLayout() {
  return (
    <>
      {/* Session Grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SESSION_INCLUSIONS.map((session) => {
              const imageSrc = getSessionImage(session.slug);
              return (
                <Link
                  key={session.slug}
                  href={`/services/${session.slug}`}
                  className="group relative rounded-xl overflow-hidden bg-white border border-[var(--border)] hover:border-[var(--teal-light)] hover:shadow-lg transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={session.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <h2 className="absolute bottom-3 left-4 text-base font-heading font-semibold text-white">
                      {session.name}
                    </h2>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-xs text-[var(--text-muted)] italic mb-3">{session.tagline}</p>
                    <ul className="space-y-1.5 mb-4">
                      {session.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                          <div className="w-1 h-1 rounded-full bg-[var(--teal)] mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--teal)] font-medium group-hover:gap-2 transition-all duration-200">
                      View details
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inclusions — horizontal */}
      <section className="py-12 md:py-16 bg-[var(--background-warm)]">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2 className="text-lg font-heading font-semibold text-[var(--foreground)] text-center mb-8">
            Every Session Includes
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {WHATS_INCLUDED.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <item.icon className="w-4 h-4 text-[var(--teal)]" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
