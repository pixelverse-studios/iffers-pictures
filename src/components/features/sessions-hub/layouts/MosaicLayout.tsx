import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { SESSIONS, getSessionImage } from "../data";

/**
 * Mosaic — 3-column asymmetric grid.
 *
 * Desktop:
 * ┌──────────┬──────────┬──────────┐
 * │          │  Family  │Maternity │
 * │  Events  ├──────────┼──────────┤
 * │          │ Couples  │Portraits │
 * │          │          ├──────────┤
 * │          │          │ Custom   │
 * └──────────┴──────────┴──────────┘
 *
 * Mobile: stacked single column.
 */
export function MosaicLayout() {
  const events = SESSIONS.find((s) => s.slug === "events")!;
  const family = SESSIONS.find((s) => s.slug === "family")!;
  const couples = SESSIONS.find((s) => s.slug === "couples-engagement")!;
  const maternity = SESSIONS.find((s) => s.slug === "maternity")!;
  const portrait = SESSIONS.find((s) => s.slug === "portrait")!;

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[620px]">
          {/* Column 1: Events — full height */}
          <SessionCard session={events} className="h-[300px] md:h-full" />

          {/* Column 2: Family + Couples — 50/50 */}
          <div className="flex flex-col gap-4 md:h-full">
            <SessionCard session={family} className="h-[250px] md:flex-1" />
            <SessionCard session={couples} className="h-[250px] md:flex-1" />
          </div>

          {/* Column 3: Maternity + Portraits + Custom — 1/3 each */}
          <div className="flex flex-col gap-4 md:h-full">
            <SessionCard session={maternity} className="h-[200px] md:flex-1" />
            <SessionCard session={portrait} className="h-[200px] md:flex-1" />
            <Link
              href="/contact"
              className="group relative rounded-2xl overflow-hidden block h-[200px] md:flex-1 bg-[var(--background-warm)] border border-[var(--border)]/60"
            >
              <div className="absolute inset-0 flex items-center justify-center gap-4 p-5">
                <div className="w-11 h-11 rounded-full bg-[var(--teal)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--teal)]/20 transition-colors duration-300">
                  <Camera className="w-5 h-5 text-[var(--teal)]" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-[var(--foreground)] mb-0.5">
                    Custom Request
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Something else in mind?
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SessionCard({
  session,
  className = "",
}: {
  session: (typeof SESSIONS)[number];
  className?: string;
}) {
  const imageSrc = getSessionImage(session.slug);

  return (
    <Link
      href={`/services/${session.slug}`}
      className={`group relative rounded-2xl overflow-hidden block ${className}`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={session.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
          {session.name}
        </h2>
      </div>
    </Link>
  );
}
