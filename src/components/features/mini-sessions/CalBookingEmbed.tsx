"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  appendMiniSessionsUtmParams,
  type MiniSessionsUtmParams,
} from "@/lib/mini-sessions/utm";
import {
  trackMiniSessionBookingComplete,
  trackMiniSessionEmbedError,
  trackMiniSessionEmbedLoad,
} from "@/lib/analytics";

type CalFunction = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalFunction>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalFunction;
  }
}

interface CalBookingEmbedProps {
  bookingUrl: string;
  campaignId: string;
  campaignStatus: "live" | "sold_out";
  optionId: string;
  optionLabel: string;
  utmParams: MiniSessionsUtmParams;
}

function installCalLoader(): CalFunction {
  if (window.Cal) return window.Cal;

  const enqueue = (api: CalFunction, args: unknown[]) => {
    api.q = api.q ?? [];
    api.q.push(args);
  };

  const cal = ((...args: unknown[]) => {
    if (!cal.loaded) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        cal.ns = cal.ns ?? {};
        const namespacedApi =
          cal.ns[namespace] ??
          (((...namespaceArgs: unknown[]) => {
            enqueue(namespacedApi, namespaceArgs);
          }) as CalFunction);
        cal.ns[namespace] = namespacedApi;
        enqueue(namespacedApi, args);
        enqueue(cal, ["initNamespace", namespace]);
        return;
      }
    }

    enqueue(cal, args);
  }) as CalFunction;

  cal.q = [];
  window.Cal = cal;
  return cal;
}

function getCalLink(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const isCalHost = url.hostname === "cal.com" || url.hostname.endsWith(".cal.com");
    if (url.protocol !== "https:" || !isCalHost) return null;
    return `${url.pathname.replace(/^\//, "")}${url.search}`;
  } catch {
    return null;
  }
}

function safeNamespace(campaignId: string, optionId: string) {
  return `mini-${campaignId}-${optionId}`.replace(/[^a-zA-Z0-9-]/g, "-");
}

export function CalBookingEmbed({
  bookingUrl,
  campaignId,
  campaignStatus,
  optionId,
  optionLabel,
  utmParams,
}: CalBookingEmbedProps) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const reportedBookingRef = useRef(false);
  const reportedFailureRef = useRef(false);
  const reportedLoadRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const calLink = useMemo(() => getCalLink(bookingUrl), [bookingUrl]);
  const [embedState, setEmbedState] = useState<"loading" | "ready" | "failed">(
    calLink ? "loading" : "failed"
  );
  const externalUrl = useMemo(
    () => appendMiniSessionsUtmParams(bookingUrl, utmParams),
    [bookingUrl, utmParams]
  );

  useEffect(() => {
    const element = boundaryRef.current;
    if (!element || shouldLoad) return;

    if (typeof window.IntersectionObserver !== "function") {
      const timeoutId = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !calLink || !embedRef.current) return;

    const embedElement = embedRef.current;
    embedElement.replaceChildren();
    const namespace = safeNamespace(campaignId, optionId);
    const cal = installCalLoader();
    let active = true;
    cal("init", namespace, { origin: "https://cal.com" });
    const api = cal.ns?.[namespace];
    const analyticsParams = {
      campaign_id: campaignId,
      campaign_status: campaignStatus,
      option_id: optionId,
      provider: "cal.com" as const,
    };
    const reportFailure = () => {
      if (!active || reportedFailureRef.current) return;
      reportedFailureRef.current = true;
      trackMiniSessionEmbedError(analyticsParams);
    };

    if (!api) {
      const failureTimeoutId = window.setTimeout(
        () => {
          reportFailure();
          setEmbedState("failed");
        },
        0
      );
      return () => window.clearTimeout(failureTimeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      reportFailure();
      setEmbedState("failed");
    }, 15000);
    api("on", {
      action: "linkReady",
      callback: () => {
        if (!active) return;
        window.clearTimeout(timeoutId);
        if (!reportedLoadRef.current) {
          reportedLoadRef.current = true;
          trackMiniSessionEmbedLoad(analyticsParams);
        }
        setEmbedState("ready");
      },
    });
    api("on", {
      action: "linkFailed",
      callback: () => {
        if (!active) return;
        window.clearTimeout(timeoutId);
        reportFailure();
        setEmbedState("failed");
      },
    });
    api("on", {
      action: "bookingSuccessfulV2",
      callback: () => {
        if (!active || reportedBookingRef.current) return;
        reportedBookingRef.current = true;
        trackMiniSessionBookingComplete(analyticsParams);
      },
    });
    api("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      styles: { branding: { brandColor: "#5a7898" } },
    });
    api("inline", {
      elementOrSelector: embedElement,
      calLink,
      config: { ...utmParams, layout: "month_view" },
    });

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      embedElement.replaceChildren();
    };
  }, [calLink, campaignId, campaignStatus, optionId, shouldLoad, utmParams]);

  return (
    <div ref={boundaryRef} className="relative min-h-[680px]" aria-live="polite">
      {embedState !== "ready" && embedState !== "failed" && (
        <div className="absolute inset-0 z-10 flex min-h-[680px] flex-col items-center justify-center border border-[var(--border)] bg-white px-6 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--brand-soft)] motion-reduce:animate-none" />
          <p className="mt-5 font-heading text-2xl text-[var(--foreground)]">
            Loading available times…
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            The secure booking calendar for {optionLabel} will appear here.
          </p>
        </div>
      )}

      {embedState === "failed" && (
        <div className="absolute inset-0 z-10 flex min-h-[680px] flex-col items-center justify-center border border-[var(--border)] bg-[var(--background-warm)] px-6 text-center">
          <p className="font-heading text-3xl text-[var(--foreground)]">
            The calendar is taking a little longer.
          </p>
          <p className="mt-3 max-w-md leading-7 text-[var(--text-secondary)]">
            Open the secure Cal.com booking page to see live availability and reserve your session.
          </p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--brand-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            Open booking calendar
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      )}

      <div
        ref={embedRef}
        className="min-h-[680px] overflow-hidden bg-white"
        aria-label={`Booking calendar for ${optionLabel}`}
      />
    </div>
  );
}
