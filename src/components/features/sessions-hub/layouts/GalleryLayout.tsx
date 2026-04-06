import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
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
                className="group relative rounded-2xl overflow-hidden aspect-[3/3.5] block"
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
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-2">
                    {session.name}
                  </h2>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </Link>
            );
          })}

          {/* Custom Request card */}
          <Link
            href="/contact"
            className="group relative rounded-2xl overflow-hidden aspect-[3/3.5] block bg-[var(--background-warm)] border border-[var(--border)]/60"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--teal)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--teal)]/20 transition-colors duration-300">
                <Camera className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] mb-2">
                Custom Request
              </h2>
              <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                Have something else in mind? Let&apos;s create a session tailored to you.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
