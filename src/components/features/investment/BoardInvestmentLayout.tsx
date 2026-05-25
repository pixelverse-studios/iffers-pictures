import Image from "next/image";
import { ArrowRight, Camera, Check, Clock, FileText, MapPin } from "lucide-react";
import { INVESTMENT_PAGE_COPY } from "@/data/page-copy";
import {
  SESSION_INCLUSIONS,
  STARTING_INVESTMENTS,
  WHATS_INCLUDED,
} from "./data";
import {
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from "@/components/features/portfolio/portfolioData";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const heroImage =
  PORTFOLIO_ITEMS.find((item) => item.id === 99) ?? PORTFOLIO_ITEMS[0];
const detailImage =
  PORTFOLIO_ITEMS.find((item) => item.id === 34) ?? PORTFOLIO_ITEMS[0];

const investmentFactors = [
  {
    title: "Session Type",
    description: "The type of session you’re looking for",
    Icon: Camera,
  },
  {
    title: "Coverage",
    description: "The amount of time needed to capture your moments naturally",
    Icon: Clock,
  },
  {
    title: "Location",
    description: "Travel, venue access, or permit requirements",
    Icon: MapPin,
  },
  {
    title: "Custom Details",
    description: "Albums, additional coverage, and personalized add-ons",
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
      <section className="board-shell grid overflow-hidden bg-[var(--background)] md:min-h-[660px] md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 md:px-10 lg:px-16">
          <h1 className="max-w-[620px] font-heading text-5xl font-semibold leading-[1.04] text-[var(--foreground)] md:text-6xl">
            {INVESTMENT_PAGE_COPY.hero.title}
          </h1>
          <p className="mt-7 max-w-[560px] text-lg font-semibold leading-8 text-[var(--text-secondary)]">
            {INVESTMENT_PAGE_COPY.hero.description}
          </p>

          <div className="mt-10 max-w-[560px]">
            <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
              What&apos;s Included in Every Session
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
            <TrackedLink
              href={INVESTMENT_PAGE_COPY.cta.href}
              tracking={{
                cta_label: INVESTMENT_PAGE_COPY.cta.label,
                cta_location: "investment_hero_primary",
                destination: INVESTMENT_PAGE_COPY.cta.href,
              }}
              className="inline-flex min-h-13 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:bg-[var(--brand)] active:scale-[0.98]"
            >
              {INVESTMENT_PAGE_COPY.cta.label}
            </TrackedLink>
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

      <section className="board-band border-y border-[var(--border)] bg-[var(--background-warm)]">
        <div className="board-shell px-6 py-9 md:px-10">
          <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
            Session Details
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[var(--text-secondary)]">
            Pricing varies depending on session type, coverage time, location, and any custom details or add-ons. Every session is tailored to best fit your vision and what matters most to you.
          </p>
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
        </div>
      </section>

      <section className="board-band bg-[var(--background)]">
        <div className="board-shell grid md:grid-cols-[1fr_0.78fr]">
          <div className="px-6 py-12 md:px-10 lg:px-14">
            <p className="font-heading text-2xl font-semibold italic text-[var(--brand-strong)] md:text-3xl">
              {INVESTMENT_PAGE_COPY.cta.title}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              {INVESTMENT_PAGE_COPY.cta.description}
            </p>

            <div className="mt-10 max-w-xl border-y border-[var(--border)] py-8">
              <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
                Starting Investment
              </h2>
              <dl className="mt-6 divide-y divide-[var(--border)]">
                {STARTING_INVESTMENTS.map((session) => (
                  <div
                    key={session.name}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <dt className="font-heading text-lg font-semibold text-[var(--foreground)]">
                      {session.name}
                    </dt>
                    <dd className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-strong)]">
                      {session.price}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                Full pricing and custom package details are shared after inquiry.
              </p>
            </div>
            <TrackedLink
              href={INVESTMENT_PAGE_COPY.cta.href}
              tracking={{
                cta_label: INVESTMENT_PAGE_COPY.cta.label,
                cta_location: "investment_quote_section",
                destination: INVESTMENT_PAGE_COPY.cta.href,
              }}
              className="mt-8 inline-flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
            >
              {INVESTMENT_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {SESSION_INCLUSIONS.map((session) => {
                const image = getPreviewImage(session.slug);
                return (
                  <TrackedLink
                    key={session.slug}
                    id={`session-${session.slug}`}
                    href={`/services/${session.slug}`}
                    tracking={{
                      cta_label: session.name,
                      cta_location: "investment_session_card",
                      destination: `/services/${session.slug}`,
                      service: session.slug,
                    }}
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
                  </TrackedLink>
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
