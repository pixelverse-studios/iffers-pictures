import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { BoardSessionStrip } from "@/components/board";
import { SESSIONS_PAGE_COPY } from "@/data/page-copy";
import { SESSIONS, getSessionImage } from "./data";

const sessionItems = SESSIONS.map((session) => {
  const imageSrc = getSessionImage(session.slug);

  return {
    title: session.shortName,
    description: session.description,
    href: `/services/${session.slug}`,
    image: {
      src: imageSrc ?? "/selfie.jpg",
      alt: session.name,
    },
  };
});

function BoardSessionsDivider() {
  return (
    <svg
      className="mx-auto mt-8 h-9 w-44 text-[var(--brand-strong)]/68"
      viewBox="0 0 176 36"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 18h39"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M121 18h39"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M63 18c8.5-9.4 18.2-9.4 25 0 6.8-9.4 16.5-9.4 25 0"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 18c-3.8 2.3-7.5 5.4-10.5 9.7M88 18c3.8 2.3 7.5 5.4 10.5 9.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M75.8 10.9c-4.4-1.7-8.1-.7-11.2 3 4.6 1.7 8.3.7 11.2-3ZM100.2 10.9c4.4-1.7 8.1-.7 11.2 3-4.6 1.7-8.3.7-11.2-3Z"
        fill="currentColor"
        fillOpacity="0.34"
      />
      <circle cx="88" cy="18" r="2.6" fill="currentColor" fillOpacity="0.72" />
      <circle cx="61" cy="18" r="1.8" fill="currentColor" fillOpacity="0.54" />
      <circle cx="115" cy="18" r="1.8" fill="currentColor" fillOpacity="0.54" />
    </svg>
  );
}

export function BoardSessionsHubLayout() {
  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="mx-auto max-w-[1180px] px-6 py-14 text-center md:px-8 md:py-20">
        <h1 className="mx-auto max-w-4xl whitespace-pre-line font-heading text-5xl font-semibold leading-[1.02] text-[var(--foreground)] md:text-7xl">
          {SESSIONS_PAGE_COPY.boardHero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
          {SESSIONS_PAGE_COPY.boardHero.description}
        </p>
        <BoardSessionsDivider />
      </section>

      <section className="mx-auto max-w-[1180px]">
        <BoardSessionStrip items={sessionItems} />
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-10 md:px-8 md:py-14">
        <div className="bg-[var(--background-warm)] px-7 py-9 text-center md:px-10 md:py-11">
          <div className="mx-auto max-w-2xl">
            <Heart
              className="mx-auto h-9 w-9 stroke-[1.5] text-[var(--brand-strong)]"
              aria-hidden
            />
            <h2 className="mt-5 font-heading text-2xl font-semibold text-[var(--brand-strong)] md:text-3xl">
              {SESSIONS_PAGE_COPY.cta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--text-secondary)] md:text-base">
              Not sure which session is right for you? I&apos;m here to help you choose.
            </p>
            <Link
              href={SESSIONS_PAGE_COPY.cta.href}
              className="mx-auto mt-7 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand)] active:translate-y-0"
            >
              {SESSIONS_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
