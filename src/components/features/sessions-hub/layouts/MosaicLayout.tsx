import Image from "next/image";
import Link from "next/link";
import { SESSIONS, getSessionImage } from "../data";

/**
 * Mosaic — asymmetric grid with fixed row heights.
 *
 * Desktop (3 cols, 3 rows of 200px each = 600px total):
 * ┌──────────┬──────────┬──────────┐
 * │          │          │   [3]    │
 * │   [1]    │   [2]    ├──────────┤
 * │          │          │   [4]    │
 * │          │          ├──────────┤
 * │          │          │   [5]    │
 * └──────────┴──────────┴──────────┘
 *
 * Mobile: stacked with explicit heights.
 */
export function MosaicLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
          {SESSIONS.map((session, i) => {
            const imageSrc = getSessionImage(session.slug);
            const isLarge = i < 2;

            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className={`group relative rounded-2xl overflow-hidden block ${
                  isLarge ? "md:row-span-3 h-[300px] md:h-auto" : "h-[200px] md:h-auto"
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
