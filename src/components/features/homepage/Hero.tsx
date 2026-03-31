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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal-vivid)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-lg shadow-[var(--teal-vivid)]/30"
        >
          Inquire Here
        </Link>
      </div>

      {/* Transition arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
