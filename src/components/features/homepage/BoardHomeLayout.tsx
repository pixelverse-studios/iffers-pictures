import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS } from "@/lib/constants";
import { HOME_PAGE_COPY } from "@/data/page-copy";
import { ALL_TESTIMONIALS } from "@/data/testimonials";
import {
  PORTFOLIO_ITEMS,
  getServiceThumbnail,
  type PortfolioItem,
} from "@/components/features/portfolio/portfolioData";

const heroImage =
  PORTFOLIO_ITEMS.find((item) => item.id === 99) ?? PORTFOLIO_ITEMS[0];

const stripImages = [34, 96, 100]
  .map((id) => PORTFOLIO_ITEMS.find((item) => item.id === id))
  .filter((item): item is PortfolioItem => Boolean(item));

const sessionItems = SESSIONS.map((session) => {
  const image = getServiceThumbnail(session.slug) ?? heroImage;

  return {
    title: session.shortName,
    description: HOME_PAGE_COPY.sessions.boardSubtitles[session.slug],
    href: `/services/${session.slug}`,
    image,
  };
});

const quote = ALL_TESTIMONIALS.find((item) => item.sessionType === "family") ??
  ALL_TESTIMONIALS[0];

function BoardHomeHero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[var(--background-warm)] pt-16 md:min-h-[760px] md:pt-[72px]">
      <Image
        src={heroImage.src}
        alt={HOME_PAGE_COPY.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/72 to-white/8" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/18" />

      <div className="container relative z-10 flex min-h-[calc(720px-4rem)] items-center md:min-h-[calc(760px-72px)]">
        <div className="max-w-[560px] pb-12 pt-14 md:pb-20 md:pt-20">
          <h1 className="whitespace-pre-line font-heading text-[4rem] font-semibold leading-[0.94] text-[var(--brand-strong)] drop-shadow-sm sm:text-[5.4rem] lg:text-[6.6rem]">
            {HOME_PAGE_COPY.boardHero.title}
          </h1>
          <p className="mt-7 whitespace-pre-line text-lg font-semibold leading-7 text-[var(--text-secondary)] md:text-xl">
            {HOME_PAGE_COPY.boardHero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={HOME_PAGE_COPY.boardHero.primaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-colors duration-200 hover:bg-[var(--brand)]"
            >
              {HOME_PAGE_COPY.boardHero.primaryLabel}
            </Link>
            <Link
              href={HOME_PAGE_COPY.boardHero.secondaryHref}
              className="inline-flex min-h-12 items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
            >
              {HOME_PAGE_COPY.boardHero.secondaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BoardImageStrip() {
  return (
    <section className="grid border-y border-white bg-white md:grid-cols-3">
      {stripImages.map((image) => (
        <div
          key={image.id}
          className="relative min-h-[230px] overflow-hidden border-b border-white last:border-b-0 md:min-h-[320px] md:border-b-0 md:border-r md:last:border-r-0"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </section>
  );
}

function BoardSessionsPreview() {
  return (
    <section className="bg-white px-5 py-8 md:px-8 md:py-10">
      <h2 className="text-center font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl">
        {HOME_PAGE_COPY.sessions.heading === "Sessions"
          ? "Explore sessions"
          : HOME_PAGE_COPY.sessions.heading}
      </h2>
      <div className="mx-auto mt-7 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {sessionItems.map((item) => (
          <Link key={item.href} href={item.href} className="group text-center">
            <div className="relative aspect-[1.18/1] overflow-hidden bg-[var(--background-warm)]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)]">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BoardQuotePreview() {
  return (
    <section className="grid bg-[var(--background-warm)] md:grid-cols-[1.16fr_0.84fr]">
      <figure className="flex min-h-[230px] flex-col justify-center px-8 py-10 text-[var(--brand-strong)] md:px-16">
        <span className="font-heading text-5xl leading-none" aria-hidden>
          “
        </span>
        <blockquote className="max-w-xl font-heading text-2xl italic leading-snug md:text-3xl">
          {quote.quote}
        </blockquote>
        <figcaption className="mt-5 text-sm text-[var(--text-secondary)]">
          — {quote.author}
        </figcaption>
      </figure>
      <div className="relative min-h-[230px] overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function BoardHomeLayout() {
  return (
    <>
      <BoardHomeHero />
      <BoardImageStrip />
      <BoardSessionsPreview />
      <BoardQuotePreview />
    </>
  );
}
