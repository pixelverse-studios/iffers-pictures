import Image from "next/image";
import Link from "next/link";
import { SESSIONS, getSessionImage } from "../data";

/**
 * Mosaic — asymmetric grid where the first two sessions are large (spanning rows)
 * and the remaining three fill smaller tiles. Creates visual hierarchy through size.
 *
 * Desktop grid:
 * ┌──────────┬──────────┬──────────┐
 * │          │          │   [3]    │
 * │   [1]    │   [2]    ├──────────┤
 * │          │          │   [4]    │
 * │          │          ├──────────┤
 * │          │          │   [5]    │
 * └──────────┴──────────┴──────────┘
 */
export function MosaicLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:auto-rows-[200px]">
          {SESSIONS.map((session, i) => {
            const imageSrc = getSessionImage(session.slug);
            const isLarge = i < 2;

            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className={`group relative rounded-2xl overflow-hidden block ${
                  isLarge ? "md:row-span-3 aspect-[3/4] md:aspect-auto" : "aspect-[16/9] md:aspect-auto"
                }`}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={isLarge ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 33vw"}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent group-hover:from-black/70 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h2
                    className={`font-heading font-semibold text-white mb-1 ${
                      isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"
                    }`}
                  >
                    {session.name}
                  </h2>
                  {isLarge && (
                    <p className="text-sm text-white/60 leading-relaxed">
                      {session.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
