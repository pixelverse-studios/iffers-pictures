export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

export interface LeadFormAnalyticsParams {
  service?: string;
  referral_source?: string;
  event_date_provided?: boolean;
  event_location_provided?: boolean;
  status_code?: number;
  error_type?: string;
}

export interface CtaClickAnalyticsParams {
  cta_label: string;
  cta_location: string;
  destination: string;
  service?: string;
}

export interface PortfolioAnalyticsParams {
  source: string;
  image_id?: number;
  image_category?: string;
  image_subcategory?: string;
  service?: string;
  direction?: "previous" | "next";
}

export interface MiniSessionAnalyticsParams {
  campaign_id: string;
  campaign_status: "live" | "sold_out";
  option_id?: string;
  cta_location?: string;
  provider?: "cal.com";
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ga4Configured?: boolean;
    __ga4MeasurementId?: string;
  }
}

function cleanParams(params: AnalyticsParams = {}) {
  const cleaned: Record<string, string | number> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    cleaned[key] = typeof value === "boolean" ? (value ? "true" : "false") : value;
  });

  return cleaned;
}

function getGtag() {
  if (typeof window === "undefined") return null;

  const measurementId = GA_MEASUREMENT_ID || window.__ga4MeasurementId;
  if (!measurementId) return null;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }

  if (!window.__ga4Configured) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    window.__ga4Configured = true;
  }

  return window.gtag;
}

export function trackEvent(name: string, params?: AnalyticsParams) {
  const gtag = getGtag();
  if (!gtag) return;

  gtag("event", name, cleanParams(params));
}

export function trackPageView(path: string) {
  const gtag = getGtag();
  if (!gtag || typeof window === "undefined") return;

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackScrollDepth(params: { percent: 50 | 90; path: string }) {
  trackEvent("scroll_depth", {
    percent_scrolled: params.percent,
    page_path: params.path,
  });
}

export function trackCtaClick(params: CtaClickAnalyticsParams) {
  trackEvent("cta_click", { ...params });
}

export function trackOutboundClick(params: {
  link_url: string;
  link_location: string;
  link_text?: string;
  link_type?: string;
}) {
  let linkDomain = "";

  try {
    linkDomain = new URL(params.link_url).hostname;
  } catch {
    linkDomain = params.link_url.split(":")[0] || "";
  }

  trackEvent("outbound_click", {
    ...params,
    link_domain: linkDomain,
  });
}

export function trackFormStart(params: LeadFormAnalyticsParams = {}) {
  trackEvent("form_start", {
    form_name: "inquiry_form",
    ...params,
  });
}

export function trackFormSubmitAttempt(params: LeadFormAnalyticsParams = {}) {
  trackEvent("form_submit_attempt", {
    form_name: "inquiry_form",
    ...params,
  });
}

export function trackLeadGenerated(params: LeadFormAnalyticsParams = {}) {
  const eventParams = {
    form_name: "inquiry_form",
    lead_source: "website_inquiry_form",
    ...params,
  };

  trackEvent("form_submit_success", eventParams);
  trackEvent("generate_lead", eventParams);
}

export function trackFormSubmitError(params: LeadFormAnalyticsParams = {}) {
  trackEvent("form_submit_error", {
    form_name: "inquiry_form",
    ...params,
  });
}

export function trackPortfolioFilter(params: {
  filter: string;
  subcategory?: string;
}) {
  trackEvent("portfolio_filter_click", params);
}

export function trackPortfolioLightboxOpen(params: PortfolioAnalyticsParams) {
  trackEvent("portfolio_lightbox_open", { ...params });
}

export function trackPortfolioLightboxNavigate(params: PortfolioAnalyticsParams) {
  trackEvent("portfolio_lightbox_navigate", { ...params });
}

export function trackServicePageView(params: {
  service_slug: string;
  service_name: string;
}) {
  trackEvent("service_page_view", params);
}

export function trackMiniSessionCampaignView(
  params: MiniSessionAnalyticsParams
) {
  trackEvent("mini_session_campaign_view", { ...params });
}

export function trackMiniSessionPromotionClick(
  params: MiniSessionAnalyticsParams
) {
  trackEvent("mini_session_promotion_click", { ...params });
}

export function trackMiniSessionOptionSelect(
  params: MiniSessionAnalyticsParams
) {
  trackEvent("mini_session_option_select", { ...params });
}

export function trackMiniSessionEmbedLoad(params: MiniSessionAnalyticsParams) {
  trackEvent("mini_session_embed_load", { ...params });
}

export function trackMiniSessionEmbedError(params: MiniSessionAnalyticsParams) {
  trackEvent("mini_session_embed_error", { ...params });
}

export function trackMiniSessionBookingComplete(
  params: MiniSessionAnalyticsParams
) {
  trackEvent("mini_session_booking_complete", { ...params });
}

export function trackMiniSessionSoldOutInquiryClick(
  params: MiniSessionAnalyticsParams
) {
  trackEvent("mini_session_sold_out_inquiry_click", { ...params });
}
