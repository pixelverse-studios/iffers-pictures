import { Filmstrip } from "./portfolio-layouts/Filmstrip";

export function PortfolioSection() {
  return (
    <section className="bg-[var(--background-warm)] py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--teal)] font-medium mb-2">
            Our Work
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
            Recent Celebrations
          </h2>
        </div>

        <Filmstrip />
      </div>
    </section>
  );
}
