"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { trackMiniSessionPromotionClick } from "@/lib/analytics";
import { getMediaCropPosition } from "@/lib/media/crop-position";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";

export function MiniSessionsPromotion({
  campaign,
}: {
  campaign: MiniSessionPublicCampaign;
}) {
  if (
    !campaign.homepageFeatured ||
    (campaign.status !== "live" && campaign.status !== "sold_out")
  ) {
    return null;
  }

  const status = campaign.status;
  const ctaLabel =
    campaign.promoCtaLabel ||
    (status === "sold_out" ? "View sold-out release" : "View mini sessions");

  return (
    <section className="bg-[var(--background-warm)] py-10 md:py-14">
      <div className="board-shell board-gutter">
        <div className="grid overflow-hidden border border-[var(--border)] bg-white md:grid-cols-[0.44fr_0.56fr]">
          {campaign.heroMedia && (
            <div className="relative min-h-72 bg-[var(--background-warm)] md:min-h-[380px]">
              <Image
                src={campaign.heroMedia.src}
                alt={campaign.heroMedia.alt}
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 44vw"
                className="object-cover"
                style={{ objectPosition: getMediaCropPosition(campaign.heroMedia) }}
              />
            </div>
          )}
          <div
            className={`flex flex-col justify-center px-6 py-9 md:px-10 md:py-12 ${
              campaign.heroMedia ? "" : "md:col-span-2"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                {campaign.promoLabel || campaign.publicLabel}
              </p>
              {status === "sold_out" && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-900">
                  Sold out
                </span>
              )}
            </div>
            <h2 className="mt-4 max-w-[15ch] font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              {campaign.promoHeadline || campaign.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              {campaign.promoCopy || campaign.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {campaign.dateSummary}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden />
                {campaign.durationMinutes} minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                {campaign.locationSummary}
              </span>
            </div>
            <Link
              href="/mini-sessions"
              onClick={() =>
                trackMiniSessionPromotionClick({
                  campaign_id: campaign.id,
                  campaign_status: status,
                  cta_location: "homepage_campaign_promotion",
                })
              }
              className="mt-7 inline-flex min-h-11 w-fit items-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)]"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
