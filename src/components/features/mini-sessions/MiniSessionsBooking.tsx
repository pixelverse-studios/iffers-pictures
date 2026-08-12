"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, LockKeyhole, MapPin } from "lucide-react";
import type {
  MiniSessionBookingOption,
  MiniSessionPublicCampaign,
} from "@/lib/mini-sessions/types";
import type { MiniSessionsUtmParams } from "@/lib/mini-sessions/utm";
import {
  trackMiniSessionOptionSelect,
  trackMiniSessionSoldOutInquiryClick,
} from "@/lib/analytics";
import { CalBookingEmbed } from "./CalBookingEmbed";

interface MiniSessionsBookingProps {
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

function PolicyDetails({ campaign }: { campaign: MiniSessionPublicCampaign }) {
  const policies = [
    ["Cancellation", campaign.cancellationPolicy],
    ["Weather", campaign.weatherPolicy],
    ["Lateness", campaign.latenessPolicy],
  ].filter((policy): policy is [string, string] => Boolean(policy[1]));

  return (
    <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {policies.map(([label, copy]) => (
        <div key={label} className="py-4">
          <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)]">
            {label}
          </dt>
          <dd className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {copy}
          </dd>
        </div>
      ))}
      {campaign.termsNote && (
        <div className="py-4">
          <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)]">
            Additional details
          </dt>
          <dd className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {campaign.termsNote}
          </dd>
        </div>
      )}
    </dl>
  );
}

function DesktopBookingSummary({
  campaign,
  option,
}: {
  campaign: MiniSessionPublicCampaign;
  option: MiniSessionBookingOption;
}) {
  return (
    <aside className="hidden lg:block lg:self-start">
      <div className="sticky top-28 border border-[var(--border)] bg-white p-7 xl:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
          Your booking
        </p>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-[var(--foreground)]">
          {option.label}
        </h3>
        <p className="mt-3 inline-flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {option.locationLabel || campaign.locationSummary}
        </p>

        <div className="mt-7 border-y border-[var(--border)] py-6">
          <p className="font-heading text-4xl text-[var(--foreground)]">
            {formatCurrency(campaign.depositCents)}
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
            Deposit due today
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {campaign.balanceDueText}
          </p>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4 text-sm">
            <span className="text-[var(--text-secondary)]">Total session price</span>
            <strong className="text-[var(--foreground)]">
              {formatCurrency(campaign.totalPriceCents)}
            </strong>
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[var(--text-muted)]">
          <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          Secure checkout and live availability are handled by Cal.com.
        </p>

        <details className="group mt-5 border-t border-[var(--border)] pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] [&::-webkit-details-marker]:hidden">
            Policies &amp; details
            <ChevronDown
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="mt-4">
            <PolicyDetails campaign={campaign} />
          </div>
        </details>
      </div>
    </aside>
  );
}

function MobileBookingSummary({
  campaign,
  option,
}: {
  campaign: MiniSessionPublicCampaign;
  option: MiniSessionBookingOption;
}) {
  return (
    <details className="group mb-4 border border-[var(--border)] bg-white lg:hidden">
      <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto_1fr_auto] items-center gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)] [&::-webkit-details-marker]:hidden">
        <span>
          <strong className="block font-heading text-2xl font-semibold text-[var(--foreground)]">
            {formatCurrency(campaign.depositCents)}
          </strong>
          <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            Due today
          </span>
        </span>
        <span aria-hidden="true" className="h-10 w-px bg-[var(--border)]" />
        <span>
          <strong className="block font-heading text-2xl font-semibold text-[var(--foreground)]">
            {formatCurrency(campaign.totalPriceCents)}
          </strong>
          <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            Total
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 text-[var(--brand-strong)] transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
        <p className="font-heading text-xl font-semibold text-[var(--foreground)]">
          {option.label}
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {option.locationLabel || campaign.locationSummary}
        </p>
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
          {campaign.balanceDueText}
        </p>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[var(--text-muted)]">
          <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          Secure checkout and live availability are handled by Cal.com.
        </p>
        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
            Policies &amp; details
          </p>
          <PolicyDetails campaign={campaign} />
        </div>
      </div>
    </details>
  );
}

function OptionDetails({ option }: { option: MiniSessionBookingOption }) {
  return (
    <>
      <span className="block font-heading text-xl font-semibold text-[var(--foreground)]">
        {option.label}
      </span>
      {option.description && (
        <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
          {option.description}
        </span>
      )}
      <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
        <span className="inline-flex items-center gap-2">
          <MapPin aria-hidden="true" className="h-4 w-4" />
          {option.locationLabel}
        </span>
      </span>
    </>
  );
}

export function MiniSessionsBooking({
  campaign,
  previewMode = false,
  utmParams,
}: MiniSessionsBookingProps) {
  const options = useMemo(
    () => [...campaign.bookingOptions].sort((a, b) => a.sortOrder - b.sortOrder),
    [campaign.bookingOptions]
  );
  const openOptions = options.filter((option) => option.status === "open");
  const [selectedId, setSelectedId] = useState(openOptions[0]?.id ?? "");
  const selectedOption =
    openOptions.find((option) => option.id === selectedId) ?? openOptions[0];
  const soldOut = campaign.status === "sold_out" || openOptions.length === 0;

  if (soldOut) {
    return (
      <section id="booking" className="bg-[var(--brand-strong)] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-8 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
            Currently sold out
          </p>
          <h2 className="mt-5 font-heading text-4xl font-semibold md:text-5xl">
            Join the next mini session release.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/80">
            These sessions have been claimed. Send an inquiry and we’ll help with another session or let you know about the next release.
          </p>
          <a
            href="/contact?session=mini-sessions"
            onClick={() =>
              trackMiniSessionSoldOutInquiryClick({
                campaign_id: campaign.id,
                campaign_status: "sold_out",
                cta_location: "mini_sessions_sold_out",
              })
            }
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-strong)] transition-colors hover:bg-[var(--background-warm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-strong)]"
          >
            Inquire about a session
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="bg-[var(--background-warm)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-strong)]">
            Reserve your session
          </p>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
            Choose your time.
          </h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)]">
            Live availability and secure checkout are handled by Cal.com.
          </p>
        </div>

        {options.length > 1 && (
          <fieldset className="mt-10">
            <legend className="sr-only">Choose a mini session option</legend>
            <div className="grid gap-4 md:grid-cols-2">
              {options.map((option) => {
                const isOpen = option.status === "open";
                const isSelected = option.id === selectedOption?.id;
                return (
                  <label
                    key={option.id}
                    className={`relative block border p-6 transition-colors ${
                      isOpen
                        ? "cursor-pointer bg-white hover:border-[var(--brand)]"
                        : "cursor-not-allowed bg-white/55 opacity-70"
                    } ${isSelected ? "border-[var(--brand-strong)] ring-2 ring-[var(--brand)]/25" : "border-[var(--border)]"}`}
                  >
                    <input
                      type="radio"
                      name="mini-session-option"
                      value={option.id}
                      checked={isSelected}
                      disabled={!isOpen}
                      onChange={() => {
                        setSelectedId(option.id);
                        trackMiniSessionOptionSelect({
                          campaign_id: campaign.id,
                          campaign_status: "live",
                          option_id: option.id,
                          provider: "cal.com",
                        });
                      }}
                      className="absolute right-5 top-5 h-5 w-5 accent-[var(--brand-strong)]"
                    />
                    <span className="pr-8">
                      <OptionDetails option={option} />
                    </span>
                    {!isOpen && (
                      <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                        Sold out
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {selectedOption && (
          <div className="mt-10 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_21rem] xl:gap-10">
            <div className="min-w-0">
              <MobileBookingSummary campaign={campaign} option={selectedOption} />

              {previewMode ? (
                <div className="grid min-h-80 place-items-center border border-dashed border-[var(--brand)] bg-white px-6 text-center">
                  <div className="max-w-md">
                    <CalendarDays
                      aria-hidden="true"
                      className="mx-auto h-9 w-9 text-[var(--brand-strong)]"
                    />
                    <p className="mt-4 font-heading text-3xl text-[var(--foreground)]">
                      Cal.com calendar preview
                    </p>
                    <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                      The live calendar for {selectedOption.label} loads only on
                      the public page. This dashboard preview never creates a
                      public URL or contacts Cal.com.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden border border-[var(--border)] bg-white shadow-sm">
                  <CalBookingEmbed
                    key={selectedOption.id}
                    bookingUrl={selectedOption.calBookingUrl}
                    campaignId={campaign.id}
                    campaignStatus="live"
                    optionId={selectedOption.id}
                    optionLabel={selectedOption.label}
                    utmParams={utmParams}
                  />
                </div>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-[var(--text-muted)] lg:hidden">
                Your deposit is collected securely when you confirm your time.
              </p>
            </div>
            <DesktopBookingSummary campaign={campaign} option={selectedOption} />
          </div>
        )}
      </div>
    </section>
  );
}
