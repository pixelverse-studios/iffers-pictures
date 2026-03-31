import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-1 rounded-full bg-[var(--gold-vivid)]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-6">
          Let&apos;s capture your story.
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal-vivid)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-md shadow-[var(--teal-vivid)]/20 hover:shadow-lg"
        >
          Inquire Here
        </Link>
      </div>
    </section>
  );
}
