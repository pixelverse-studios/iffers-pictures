import Image from "next/image";
import Link from "next/link";
import { SESSIONS, getSessionImage } from "../data";

export function GalleryLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SESSIONS.map((session) => {
            const imageSrc = getSessionImage(session.slug);
            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
                    {session.name}
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
