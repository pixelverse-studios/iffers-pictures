import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS, getSessionImage } from "../data";

export function ShowcaseLayout() {
  const [featured, ...rest] = SESSIONS;
  const featuredImage = getSessionImage(featured.slug);

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Featured Session — large hero */}
        <Link
          href={`/services/${featured.slug}`}
          className="group relative block rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-8"
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

        {/* Remaining Sessions — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((session) => {
            const imageSrc = getSessionImage(session.slug);
            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] block"
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                    {session.name}
                  </h2>
                  <p className="text-xs text-white/60">{session.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
