import { LayoutA } from "./about-hero-layouts/LayoutA";

export function AboutHero() {
  return (
    <section
      className="relative pb-16 md:pb-20 bg-[var(--background-warm)]"
      style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
    >
      <div className="container">
        <LayoutA />
      </div>
    </section>
  );
}
