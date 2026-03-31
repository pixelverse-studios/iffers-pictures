export function EmotionalDivider() {
  return (
    <section className="bg-[var(--background-warm)] py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="h-px w-16 bg-[var(--coral-vivid)]/40" />
        </div>
        <p className="text-2xl md:text-3xl font-heading font-medium text-[var(--foreground)] italic leading-relaxed">
          Because the moments may pass, but the{" "}
          <span className="text-[var(--teal-vivid)]">memories</span> deserve to
          last.
        </p>
        <div className="flex justify-center mt-5">
          <div className="h-px w-16 bg-[var(--coral-vivid)]/40" />
        </div>
      </div>
    </section>
  );
}
