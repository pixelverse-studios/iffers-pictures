import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SESSIONS, getSessionImage } from "../data";

export function InspiredLayout() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SESSIONS.map((session, index) => {
            const imageSrc = getSessionImage(session.slug);
            const isHero = index === 0;

            return (
              <Link
                key={session.slug}
                href={`/services/${session.slug}`}
                className={cn(
                  "group relative block overflow-hidden rounded-xl",
                  "h-[250px] md:h-[340px]",
                  isHero && "md:col-span-2 md:h-[480px]"
                )}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes={
                      isHero
                        ? "(max-width: 768px) 100vw, 100vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--background-warm)]" />
                )}

                {/* Gradient overlay — lightens slightly on hover */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    "bg-gradient-to-t from-black/65 via-black/25 to-black/5",
                    "group-hover:from-black/50 group-hover:via-black/15 group-hover:to-transparent"
                  )}
                />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2
                    className={cn(
                      "font-heading font-semibold text-white mb-1",
                      isHero
                        ? "text-2xl md:text-4xl"
                        : "text-xl md:text-2xl"
                    )}
                  >
                    {session.name}
                  </h2>
                  <p
                    className={cn(
                      "text-white/75 leading-relaxed line-clamp-1",
                      isHero ? "text-base md:text-lg" : "text-sm"
                    )}
                  >
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
