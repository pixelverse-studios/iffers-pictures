"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import type {
  MiniSessionBookingOption,
  MiniSessionPublicCampaign,
} from "@/lib/mini-sessions/types";
import type { MiniSessionsUtmParams } from "@/lib/mini-sessions/utm";
import { CalBookingEmbed } from "./CalBookingEmbed";

interface MiniSessionsBookingProps {
  campaign: MiniSessionPublicCampaign;
  previewMode?: boolean;
  utmParams: MiniSessionsUtmParams;
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
          <CalendarDays aria-hidden="true" className="h-4 w-4" />
          {option.dateTimeLabel}
        </span>
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
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
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

        {options.length === 1 ? (
          <div className="mx-auto mt-10 max-w-3xl border border-[var(--border)] bg-white p-6 md:p-8">
            <OptionDetails option={options[0]} />
          </div>
        ) : (
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
                      onChange={() => setSelectedId(option.id)}
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

        {selectedOption && previewMode && (
          <div className="mt-8 grid min-h-80 place-items-center border border-dashed border-[var(--brand)] bg-white px-6 text-center">
            <div className="max-w-md">
              <CalendarDays
                aria-hidden="true"
                className="mx-auto h-9 w-9 text-[var(--brand-strong)]"
              />
              <p className="mt-4 font-heading text-3xl text-[var(--foreground)]">
                Cal.com calendar preview
              </p>
              <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                The live calendar for {selectedOption.label} loads only on the
                public page. This dashboard preview never creates a public URL
                or contacts Cal.com.
              </p>
            </div>
          </div>
        )}

        {selectedOption && !previewMode && (
          <div className="mt-8 shadow-sm">
            <CalBookingEmbed
              key={selectedOption.id}
              bookingUrl={selectedOption.calBookingUrl}
              campaignId={campaign.id}
              optionId={selectedOption.id}
              optionLabel={selectedOption.label}
              utmParams={utmParams}
            />
          </div>
        )}
      </div>
    </section>
  );
}
