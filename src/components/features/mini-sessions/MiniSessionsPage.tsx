import Image from "next/image";
import { CalendarDays, Camera, Check, Clock3, MapPin } from "lucide-react";
import { getMediaCropPosition } from "@/lib/media/crop-position";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";
import { getMiniSessionFaqs } from "@/lib/mini-sessions/faqs";
import type { MiniSessionsUtmParams } from "@/lib/mini-sessions/utm";
import { MiniSessionsBooking } from "./MiniSessionsBooking";
import { MiniSessionsAnalytics } from "./MiniSessionsAnalytics";
import { MiniSessionsFaqs } from "./MiniSessionsFaqs";

interface MiniSessionsPageProps {
  campaign: MiniSessionPublicCampaign;
  previewMode?: boolean;
  utmParams: MiniSessionsUtmParams;
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

function splitParagraphs(value: string) {
  return value.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

export function MiniSessionsPage({
  campaign,
  previewMode = false,
  utmParams,
}: MiniSessionsPageProps) {
  const faqs = getMiniSessionFaqs(campaign);
  const policyItems = [
    ["Cancellation", campaign.cancellationPolicy],
    ["Weather", campaign.weatherPolicy],
    ["Lateness", campaign.latenessPolicy],
  ].filter(([, copy]) => copy);

  return (
    <div
      className={`bg-[var(--background)] ${previewMode ? "" : "pt-hero"}`}
    >
      {!previewMode && <MiniSessionsAnalytics campaign={campaign} />}
      <section className="mx-auto grid min-h-[680px] max-w-[1600px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-center bg-[var(--brand-strong)] px-6 py-14 text-white md:px-12 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/70">
            {campaign.publicLabel}
          </p>
          <h1 className="mt-6 max-w-[11ch] font-heading text-5xl font-semibold leading-[0.96] md:text-7xl">
            {campaign.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/82">
            {campaign.summary}
          </p>
          <a
            href="#booking"
            className="mt-9 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[0.13em] text-[var(--brand-strong)] transition-colors hover:bg-[var(--background-warm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-strong)]"
          >
            {campaign.status === "sold_out" ? "Ask about the next release" : campaign.ctaLabel}
          </a>
        </div>
        <div className="relative min-h-[480px] bg-[var(--background-warm)] lg:min-h-full">
          {campaign.heroMedia ? (
            <Image
              src={campaign.heroMedia.src}
              alt={campaign.heroMedia.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={75}
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover"
              style={{ objectPosition: getMediaCropPosition(campaign.heroMedia) }}
            />
          ) : (
            <div className="flex h-full min-h-[480px] items-center justify-center text-[var(--brand-strong)]">
              <Camera aria-hidden="true" className="h-16 w-16" />
            </div>
          )}
        </div>
      </section>

      <section aria-label="Session details" className="border-b border-[var(--border)]">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4 md:px-8">
          {[
            { Icon: Clock3, label: "Duration", value: `${campaign.durationMinutes} minutes` },
            { Icon: CalendarDays, label: "Dates", value: campaign.dateSummary },
            { Icon: MapPin, label: "Location", value: campaign.locationSummary },
            { Icon: Camera, label: "Session price", value: formatCurrency(campaign.totalPriceCents) },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="border-[var(--border)] px-3 py-7 odd:border-r md:border-r md:px-6 md:last:border-r-0">
              <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </dt>
              <dd className="mt-3 font-heading text-xl text-[var(--foreground)]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">The experience</p>
          <h2 className="mt-4 max-w-[12ch] font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
            A small session with room for real connection.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-[var(--text-secondary)]">
          {splitParagraphs(campaign.description).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="bg-[var(--background-warm)] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">What’s included</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">Everything you need.</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {campaign.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex gap-3 border-t border-[var(--border)] py-4 text-[var(--foreground)]">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-strong)]" />
                <span className="leading-7">{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">Before you reserve</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">A clear, simple booking.</h2>
            {policyItems.length > 0 && (
              <dl className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {policyItems.map(([label, copy]) => (
                  <div key={label} className="grid gap-2 py-5 sm:grid-cols-[130px_1fr]">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-strong)]">{label}</dt>
                    <dd className="leading-7 text-[var(--text-secondary)]">{copy}</dd>
                  </div>
                ))}
              </dl>
            )}
            {campaign.termsNote && <p className="mt-5 text-sm leading-6 text-[var(--text-muted)]">{campaign.termsNote}</p>}
          </div>
          <aside className="border border-[var(--border)] bg-[var(--background-warm)] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">Payment</p>
            <p className="mt-5 font-heading text-4xl text-[var(--foreground)]">
              {formatCurrency(campaign.depositCents)} deposit
            </p>
            <p className="mt-3 leading-7 text-[var(--text-secondary)]">{campaign.balanceDueText}</p>
            <p className="mt-7 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-secondary)]">
              Total session price: <strong className="text-[var(--foreground)]">{formatCurrency(campaign.totalPriceCents)}</strong>
            </p>
          </aside>
        </div>
      </section>

      <MiniSessionsBooking
        campaign={campaign}
        previewMode={previewMode}
        utmParams={utmParams}
      />

      <MiniSessionsFaqs faqs={faqs} />

      <section className="bg-[var(--foreground)] px-6 py-16 text-center text-white md:px-8 md:py-20">
        <h2 className="font-heading text-4xl font-semibold md:text-5xl">Still have a question?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/72">Tell us what you’re planning and we’ll help you decide whether this mini session is the right fit.</p>
        <a href="/contact?session=mini-sessions" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-7 text-sm font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-white hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foreground)]">Send an inquiry</a>
      </section>
    </div>
  );
}
