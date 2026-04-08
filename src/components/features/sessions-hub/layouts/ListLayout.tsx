import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS, getSessionImage } from "../data";

export function ListLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="divide-y divide-[var(--border)]">
          {SESSIONS.map((session) => {
            const imageSrc = getSessionImage(session.slug);
            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className="group flex flex-col sm:flex-row items-start gap-6 py-8 first:pt-0 last:pb-0"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-40 md:w-48 aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={session.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-1 group-hover:text-[var(--brand)] transition-colors">
                    {session.name}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {session.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--brand)] font-medium group-hover:gap-3 transition-all duration-200">
                    View session
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
