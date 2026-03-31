import Image from "next/image";
import Link from "next/link";
import { SESSIONS } from "@/lib/constants";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";

/** Image thumbnail cards with overlay text */
export function GalleryLayout() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
      {SESSIONS.map((session) => {
        const thumb = getServiceThumbnail(session.slug);
        return (
          <Link
            key={session.slug}
            href={`/services/${session.slug}`}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden"
          >
            {thumb && (
              <Image
                src={thumb.src}
                alt={thumb.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-sm font-heading font-semibold text-white mb-0.5">
                {session.shortName}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                {session.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
