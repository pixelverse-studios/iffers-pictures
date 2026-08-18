import Image from "next/image";
import { Camera, Check, MapPin } from "lucide-react";
import { getMediaCropPosition } from "@/lib/media/crop-position";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";
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

export function MiniSessionsPage({
  campaign,
  previewMode = false,
  utmParams,
}: MiniSessionsPageProps) {
  return (
    <div
      className={`bg-[var(--background)] ${previewMode ? "" : "pt-16 md:pt-[72px]"}`}
    >
      {!previewMode && <MiniSessionsAnalytics campaign={campaign} />}
      <section className="grid min-h-[600px] w-full overflow-hidden lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="min-w-0 bg-[var(--brand-strong)] px-6 py-12 text-white md:flex md:flex-col md:justify-center md:px-12 lg:px-16">
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
        <div className="relative min-h-[480px] min-w-0 bg-[var(--background-warm)] lg:min-h-full">
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
        <dl className="mx-auto grid max-w-5xl px-6 sm:grid-cols-2 md:px-8">
          {[
            { Icon: MapPin, label: "Location", value: campaign.locationSummary },
            { Icon: Camera, label: "Session price", value: formatCurrency(campaign.totalPriceCents) },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="border-b border-[var(--border)] px-3 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0">
              <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </dt>
              <dd className="mt-3 font-heading text-xl text-[var(--foreground)]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">The experience</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
            {campaign.experienceHeadline}
          </h2>
          <div className="mini-rich-content mt-6 text-base leading-8 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: campaign.description }} />
        </div>
        <div className="min-w-0 border-t border-[var(--border)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">What’s included</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">{campaign.inclusionsHeadline}</h2>
          <ul className="mt-6">
            {campaign.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex gap-3 border-t border-[var(--border)] py-3.5 text-[var(--foreground)]">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-strong)]" />
                <span className="leading-7">{inclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="mini-sessions-vibe-heading"
        className="bg-[var(--background-warm)] py-12 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">{campaign.vibeEyebrow}</p>
            <h2 id="mini-sessions-vibe-heading" className="mt-4 font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">{campaign.vibeHeadline}</h2>
          </div>
          <div className="mini-rich-content text-base leading-8 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: campaign.vibeContent }} />
        </div>
      </section>

      <MiniSessionsBooking
        campaign={campaign}
        previewMode={previewMode}
        utmParams={utmParams}
      />

      <MiniSessionsFaqs
        eyebrow={campaign.faqEyebrow}
        headline={campaign.faqHeadline}
        intro={campaign.faqIntro}
        faqs={campaign.faqs}
      />

      <section className="bg-[var(--foreground)] px-6 py-12 text-center text-white md:px-8 md:py-16">
        <h2 className="font-heading text-4xl font-semibold md:text-5xl">Still have a question?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/72">Tell us what you’re planning and we’ll help you decide whether this mini session is the right fit.</p>
        <a href="/contact?session=mini-sessions" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-7 text-sm font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-white hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foreground)]">Send an inquiry</a>
      </section>
    </div>
  );
}
