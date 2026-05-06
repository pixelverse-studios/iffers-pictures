import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  Clock,
  FileText,
  MapPin,
} from "lucide-react";
import { INVESTMENT_PAGE_COPY } from "@/data/page-copy";
import { SESSION_INCLUSIONS, WHATS_INCLUDED } from "./data";
import {
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from "@/components/features/portfolio/portfolioData";

const heroImage =
  PORTFOLIO_ITEMS.find((item) => item.id === 99) ?? PORTFOLIO_ITEMS[0];
const detailImage =
  PORTFOLIO_ITEMS.find((item) => item.id === 34) ?? PORTFOLIO_ITEMS[0];

const investmentFactors = [
  {
    title: "Session type",
    description: "The kind of session you choose",
    Icon: Camera,
  },
  {
    title: "Coverage",
    description: "The amount of time we spend together",
    Icon: Clock,
  },
  {
    title: "Location",
    description: "Travel and permit needs",
    Icon: MapPin,
  },
  {
    title: "Details",
    description: "Add-ons and album options",
    Icon: FileText,
  },
] as const;

function getPreviewImage(slug: string): PortfolioItem {
  const subCategory =
    slug === "events"
      ? "Bridal Shower"
      : slug === "family"
        ? "Family"
        : slug === "maternity"
          ? "Maternity"
          : slug === "couples-engagement"
            ? "Engagement"
            : "Portrait";

  return (
    PORTFOLIO_ITEMS.find((item) => item.subCategory === subCategory) ??
    heroImage
  );
}

export function BoardInvestmentLayout() {
  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="mx-auto grid max-w-[1180px] overflow-hidden bg-[var(--background)] md:min-h-[660px] md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 md:px-10 lg:px-16">
          <h1 className="max-w-[620px] font-heading text-5xl font-semibold leading-[1.04] text-[var(--foreground)] md:text-6xl">
            Custom investment for what matters most
          </h1>
          <p className="mt-7 max-w-[560px] text-lg font-semibold leading-8 text-[var(--text-secondary)]">
            {INVESTMENT_PAGE_COPY.hero.description}
          </p>

          <div className="mt-10 max-w-[560px]">
            <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-4">
              {WHATS_INCLUDED.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 text-base font-semibold leading-7 text-[var(--text-secondary)]"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-strong)]"
                    strokeWidth={2.4}
                    aria-hidden
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Link
              href={INVESTMENT_PAGE_COPY.cta.href}
              className="inline-flex min-h-13 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:bg-[var(--brand)] active:scale-[0.98]"
            >
              {INVESTMENT_PAGE_COPY.cta.label}
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-13 items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
            >
              View sample galleries
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden md:min-h-full">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-transparent md:from-[var(--background)] md:via-[var(--background)]/42" />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] border-y border-[var(--border)] bg-[var(--background-warm)] px-6 py-9 md:px-10">
        <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
          What affects your investment
        </h2>
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {investmentFactors.map(({ title, description, Icon }) => (
            <div key={title} className="text-center">
              <Icon
                className="mx-auto h-10 w-10 stroke-[1.45] text-[var(--brand-strong)]/72"
                aria-hidden
              />
              <h3 className="mt-5 font-heading text-xl font-semibold text-[var(--brand-strong)]">
                {title}
              </h3>
              <p className="mx-auto mt-2 max-w-[190px] text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] bg-[var(--background)]">
        <div className="grid md:grid-cols-[1fr_0.72fr]">
          <div className="px-6 py-12 md:px-10 lg:px-14">
            <p className="font-heading text-2xl font-semibold italic text-[var(--brand-strong)] md:text-3xl">
              {INVESTMENT_PAGE_COPY.cta.title}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              {INVESTMENT_PAGE_COPY.cta.description}
            </p>
            <Link
              href={INVESTMENT_PAGE_COPY.cta.href}
              className="mt-8 inline-flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
            >
              Get a custom quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {SESSION_INCLUSIONS.map((session) => {
                const image = getPreviewImage(session.slug);
                return (
                  <Link
                    key={session.slug}
                    href={`/services/${session.slug}`}
                    className="group grid grid-cols-[82px_1fr] gap-4 border border-[var(--border)] bg-white p-3 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden bg-[var(--background-warm)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="82px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                        {session.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[var(--text-secondary)]">
                        {session.tagline}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden md:min-h-full">
            <Image
              src={detailImage.src}
              alt={detailImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
