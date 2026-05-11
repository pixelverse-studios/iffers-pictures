import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ABOUT_PAGE_COPY } from "@/data/page-copy";

export function BoardAboutLayout() {
  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <div className="board-shell flex min-h-[calc(100svh-4rem)] flex-col md:min-h-[calc(100svh-72px)]">
        <section className="flex flex-1 px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-16">
          <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="flex flex-col justify-center py-4 lg:py-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-strong)]">
                {ABOUT_PAGE_COPY.hero.location}
              </p>
              <h1 className="font-heading text-[4.15rem] font-semibold leading-[0.95] text-[var(--foreground)] sm:text-[5.2rem] lg:text-[5.8rem]">
                {ABOUT_PAGE_COPY.hero.firstName}
                <br />
                <span className="text-[var(--brand-strong)]">
                  {ABOUT_PAGE_COPY.hero.lastName}
                </span>
              </h1>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {ABOUT_PAGE_COPY.hero.role}
              </p>
              <p className="mt-6 max-w-md text-lg italic leading-8 text-[var(--text-secondary)]">
                {ABOUT_PAGE_COPY.hero.intro}
              </p>
              <div className="mt-8 max-w-[470px] space-y-6 text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
                <p>{ABOUT_PAGE_COPY.bio.paragraphs[0]}</p>
                <p>{ABOUT_PAGE_COPY.bio.paragraphs[1]}</p>
              </div>
              <Link
                href="#board-about-story"
                className="mt-9 inline-flex w-fit items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
              >
                {ABOUT_PAGE_COPY.hero.storyLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-md bg-[var(--background)] shadow-sm md:min-h-[520px] lg:min-h-full">
              <Image
                src="/headshot.jpg"
                alt={ABOUT_PAGE_COPY.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--background)] px-5 py-8 md:px-8 md:py-9">
          <div className="grid gap-8 md:grid-cols-3 md:gap-px">
            {ABOUT_PAGE_COPY.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center md:border-r md:border-[var(--border)] md:px-8 md:last:border-r-0"
              >
                <h2 className="font-heading text-4xl font-semibold text-[var(--brand-strong)]">
                  {stat.value}
                  {stat.suffix}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                  {stat.label}
                </p>
                {index < ABOUT_PAGE_COPY.stats.length - 1 && (
                  <span className="mt-8 h-px w-24 bg-[var(--border)] md:hidden" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        id="board-about-story"
        className="board-shell grid scroll-mt-16 bg-[var(--background)] md:scroll-mt-[72px] md:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative min-h-[380px] overflow-hidden bg-[var(--background)] md:min-h-[520px]">
          <Image
            src="/selfie.jpg"
            alt="Jenn holding a camera"
            fill
            sizes="(max-width: 768px) 100vw, 52vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center px-7 py-12 md:px-14 lg:px-20">
          <div className="space-y-6 text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
            <p>{ABOUT_PAGE_COPY.bio.paragraphs[3]}</p>
            <p>{ABOUT_PAGE_COPY.bio.paragraphs[4]}</p>
          </div>
        </div>
      </section>

      <section className="board-band bg-[var(--brand-strong)] text-center text-white">
        <div className="board-shell px-8 py-16 md:px-16 md:py-20">
          <figure className="mx-auto max-w-4xl">
            <div
              className="flex items-center justify-between font-heading text-7xl leading-none text-white/72"
              aria-hidden
            >
              <span>“</span>
              <span>”</span>
            </div>
            <blockquote className="-mt-5 font-heading text-3xl italic leading-snug md:text-5xl">
              {ABOUT_PAGE_COPY.approach.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              {ABOUT_PAGE_COPY.approach.eyebrow} {ABOUT_PAGE_COPY.approach.attribution}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="board-shell bg-[var(--background)] px-7 py-12 md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6 text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            <p>{ABOUT_PAGE_COPY.bio.paragraphs[2]}</p>
            <p>{ABOUT_PAGE_COPY.bio.paragraphs[5]}</p>
            <p className="font-semibold text-[var(--foreground)]">
              {ABOUT_PAGE_COPY.bio.paragraphs[6]}
            </p>
            <div className="space-y-2 pt-2">
              {ABOUT_PAGE_COPY.bio.signoff.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-l border-[var(--border)] p-8 md:p-10">
            <p className="font-heading text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              {ABOUT_PAGE_COPY.cta.title}
            </p>
            <Link
              href={ABOUT_PAGE_COPY.cta.href}
              className="mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
            >
              {ABOUT_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
