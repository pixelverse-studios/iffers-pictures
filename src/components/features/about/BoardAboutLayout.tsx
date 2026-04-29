import Image from "next/image";
import {
  BoardCTA,
  BoardEditorialHeader,
  BoardHeroSplit,
  BoardQuoteBand,
} from "@/components/board";
import { ABOUT_PAGE_COPY } from "@/data/page-copy";

function AboutStats() {
  return (
    <div className="grid gap-px bg-[var(--border)] sm:grid-cols-3">
      {ABOUT_PAGE_COPY.stats.map((stat) => (
        <div key={stat.label} className="bg-[var(--surface)] p-6 text-center">
          <p className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
            {stat.value}
            {stat.suffix}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function BoardAboutLayout() {
  return (
    <>
      <section className="bg-[var(--background)] pt-hero">
        <div className="container pb-8 md:pb-12">
          <BoardHeroSplit
            eyebrow={ABOUT_PAGE_COPY.hero.location}
            title={ABOUT_PAGE_COPY.hero.boardTitle}
            description={ABOUT_PAGE_COPY.hero.intro}
            image={{
              src: "/headshot.jpg",
              alt: ABOUT_PAGE_COPY.hero.imageAlt,
            }}
            primaryAction={{
              label: ABOUT_PAGE_COPY.cta.label,
              href: ABOUT_PAGE_COPY.cta.href,
            }}
            imagePriority
          />
        </div>
      </section>

      <section className="bg-[var(--background)] py-10 md:py-14">
        <div className="container">
          <AboutStats />
        </div>
      </section>

      <section className="bg-[var(--background-warm)] py-14 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="relative min-h-[520px] overflow-hidden bg-[var(--surface)]">
              <Image
                src="/headshot.jpg"
                alt={ABOUT_PAGE_COPY.hero.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>

            <div className="bg-[var(--surface)] p-6 md:p-10">
              <BoardEditorialHeader
                eyebrow={ABOUT_PAGE_COPY.hero.storyLabel}
                titleAs="h2"
                title={`${ABOUT_PAGE_COPY.hero.firstName} ${ABOUT_PAGE_COPY.hero.lastName}`}
                description={
                  <div className="space-y-5">
                    {ABOUT_PAGE_COPY.bio.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <div className="space-y-2 pt-2">
                      {ABOUT_PAGE_COPY.bio.signoff.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-10 md:py-14">
        <div className="container">
          <BoardQuoteBand
            quote={ABOUT_PAGE_COPY.approach.quote}
            attribution={ABOUT_PAGE_COPY.approach.attribution}
          />
        </div>
      </section>

      <section className="bg-[var(--background)] pb-16 md:pb-24">
        <div className="container">
          <BoardCTA
            title={ABOUT_PAGE_COPY.cta.title}
            action={{
              label: ABOUT_PAGE_COPY.cta.label,
              href: ABOUT_PAGE_COPY.cta.href,
            }}
          />
        </div>
      </section>
    </>
  );
}
