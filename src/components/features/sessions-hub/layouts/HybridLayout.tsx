import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS, getSessionImage } from "../data";

/**
 * Hybrid — merges Showcase's featured hero with Mosaic's asymmetric grid.
 *
 * Desktop:
 * ┌──────────────────────────────────┐
 * │          Featured (21:9)         │
 * └──────────────────────────────────┘
 * ┌───────────────┬─────────────────┐
 * │               │      [3]        │
 * │     [2]       ├─────────────────┤
 * │               │      [4]        │
 * ├───────────────┴─────────────────┤
 * │            [5] wide             │
 * └─────────────────────────────────┘
 *
 * Mobile: stacked single column.
 */
export function HybridLayout() {
  const [featured, ...rest] = SESSIONS;
  const featuredImage = getSessionImage(featured.slug);

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Featured Session — cinematic hero */}
        <Link
          href={`/services/${featured.slug}`}
          className="group relative block rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-4"
        >
          {featuredImage && (
            <Image
              src={featuredImage}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-lg">
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-2">Featured</p>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-3 leading-tight">
              {featured.name}
            </h2>
            <p className="text-white/70 mb-4 hidden md:block">{featured.description}</p>
            <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all duration-200">
              Explore
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Asymmetric grid — remaining sessions */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ gridTemplateRows: "repeat(2, 180px) auto" }}
        >
          {rest.map((session, i) => {
            const imageSrc = getSessionImage(session.slug);

            /* First item spans 2 rows (tall); items 2-3 are single-row each;
               last item spans full width. */
            const isTall = i === 0;
            const isWide = i === rest.length - 1;

            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className={[
                  "group relative rounded-2xl overflow-hidden block",
                  isTall ? "md:row-span-2 h-[300px] md:h-auto" : "h-[220px] md:h-auto",
                  isWide ? "md:col-span-2 h-[220px] md:h-[200px]" : "",
                ].join(" ")}
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={isWide ? "100vw" : isTall ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent group-hover:from-black/70 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h2
                    className={`font-heading font-semibold text-white mb-1 ${
                      isTall ? "text-xl md:text-2xl" : "text-base md:text-lg"
                    }`}
                  >
                    {session.name}
                  </h2>
                  {(isTall || isWide) && (
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
