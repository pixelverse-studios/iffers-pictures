import Image from "next/image";
import Link from "next/link";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={`${R2_BASE}/events/baby-shower/baby-shower-01.jpg`}
        alt="Heartfelt family moment captured in soft natural light"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white leading-tight mb-6">
          Heartfelt Moments,{" "}
          <span className="italic">Beautifully Captured</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-body mb-10">
          because every special moment deserves to last forever.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[var(--foreground)] font-medium text-base hover:bg-white/90 transition-all duration-200 shadow-lg"
        >
          Inquire Here
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
