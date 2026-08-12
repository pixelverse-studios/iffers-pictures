import type {
  MiniSessionAdminCampaign,
  MiniSessionCampaignInput,
  MiniSessionPublicCampaign,
} from "@/lib/mini-sessions/types";
import type { AdminMediaItem } from "@/lib/media/types";
import type {
  BookingOptionDraft,
  CampaignDraft,
  CampaignEditorState,
  CampaignFilter,
  CampaignValidationResult,
} from "./types";

export const MAX_INCLUSIONS = 12;
export const MINI_SESSIONS_CAL_URL =
  "https://cal.com/ifferspictures/mini-sessions";
export const CAL_AVAILABILITY_NOTE =
  "Live dates and times are shown in the booking calendar.";
export const DEFAULT_LOCATION_SUMMARY = "Bergen County, NJ";
export const DEFAULT_BALANCE_DUE_TEXT =
  "Final payment is due 48 hours prior to event";

export interface PublishReadinessItem {
  key: string;
  label: string;
  ready: boolean;
  blocker: string;
  targetId: string;
}

export function createEmptyCampaignDraft(): CampaignDraft {
  return {
    internalName: "",
    publicLabel: "",
    headline: "",
    summary: "",
    description: "",
    durationMinutes: "20",
    totalPrice: "225.00",
    deposit: "100.00",
    balanceDueText: DEFAULT_BALANCE_DUE_TEXT,
    dateSummary: CAL_AVAILABILITY_NOTE,
    locationSummary: DEFAULT_LOCATION_SUMMARY,
    inclusions: [],
    cancellationPolicy: "",
    weatherPolicy: "",
    latenessPolicy: "",
    termsNote: "",
    heroMediaId: null,
    ctaLabel: "Choose your time",
    homepageFeatured: false,
    promoLabel: "",
    promoHeadline: "",
    promoCopy: "",
    promoCtaLabel: "",
    metaTitle: "",
    metaDescription: "",
    bookingOptions: [createEmptyBookingOption(0)],
  };
}

export function campaignToDraft(campaign: MiniSessionAdminCampaign): CampaignDraft {
  const bookingOption = campaign.bookingOptions[0];
  return {
    internalName: campaign.internalName,
    publicLabel: campaign.publicLabel,
    headline: campaign.headline,
    summary: campaign.summary,
    description: campaign.description,
    durationMinutes: String(campaign.durationMinutes),
    totalPrice: centsToCurrency(campaign.totalPriceCents),
    deposit: centsToCurrency(campaign.depositCents),
    balanceDueText: campaign.balanceDueText || DEFAULT_BALANCE_DUE_TEXT,
    dateSummary: CAL_AVAILABILITY_NOTE,
    locationSummary: campaign.locationSummary || DEFAULT_LOCATION_SUMMARY,
    inclusions: [...campaign.inclusions],
    cancellationPolicy: campaign.cancellationPolicy,
    weatherPolicy: campaign.weatherPolicy,
    latenessPolicy: campaign.latenessPolicy,
    termsNote: campaign.termsNote,
    heroMediaId: campaign.heroMediaId,
    ctaLabel: campaign.ctaLabel,
    homepageFeatured: campaign.homepageFeatured,
    promoLabel: campaign.promoLabel,
    promoHeadline: campaign.promoHeadline,
    promoCopy: campaign.promoCopy,
    promoCtaLabel: campaign.promoCtaLabel,
    metaTitle: campaign.metaTitle,
    metaDescription: campaign.metaDescription,
    bookingOptions: bookingOption
      ? [
          {
            id: bookingOption.id,
            clientKey: bookingOption.id,
            label: bookingOption.label,
            description: bookingOption.description,
            dateTimeLabel: bookingOption.dateTimeLabel,
            locationLabel: bookingOption.locationLabel,
            calBookingUrl: bookingOption.calBookingUrl,
            status: bookingOption.status,
            sortOrder: 0,
          },
        ]
      : [createEmptyBookingOption(0)],
  };
}

export function createEmptyBookingOption(sortOrder: number): BookingOptionDraft {
  return {
    clientKey: crypto.randomUUID(),
    label: "",
    description: "",
    dateTimeLabel: CAL_AVAILABILITY_NOTE,
    locationLabel: "",
    calBookingUrl: MINI_SESSIONS_CAL_URL,
    status: "open",
    sortOrder,
  };
}

export function validateCampaignDraft(
  draft: CampaignDraft
): CampaignValidationResult {
  const errors: Record<string, string> = {};
  const totalPriceCents = currencyToCents(draft.totalPrice);
  const depositCents = currencyToCents(draft.deposit);
  const headline = draft.headline.trim();
  const bookingOption = draft.bookingOptions[0] ?? createEmptyBookingOption(0);

  if (!headline) errors.headline = "Add a headline for this Mini Session.";
  if (totalPriceCents === null) errors.totalPrice = "Use dollars and up to two decimals.";
  if (depositCents === null) errors.deposit = "Use dollars and up to two decimals.";
  if (
    totalPriceCents !== null &&
    depositCents !== null &&
    depositCents > totalPriceCents
  ) {
    errors.deposit = "Deposit cannot exceed the total price.";
  }
  if (draft.inclusions.length > MAX_INCLUSIONS) {
    errors.inclusions = `Use no more than ${MAX_INCLUSIONS} inclusions.`;
  }
  if (!isSafeCalUrl(bookingOption.calBookingUrl)) {
    errors.bookingUrl = "Use an HTTPS booking link from cal.com.";
  }

  if (Object.keys(errors).length > 0 || totalPriceCents === null || depositCents === null) {
    return { input: null, errors };
  }

  const bookingOptions = [
    {
      ...(bookingOption.id ? { id: bookingOption.id } : {}),
      label: headline,
      description: draft.summary.trim(),
      dateTimeLabel: CAL_AVAILABILITY_NOTE,
      locationLabel: draft.locationSummary.trim(),
      calBookingUrl: bookingOption.calBookingUrl.trim(),
      status: "open" as const,
      sortOrder: 0,
    },
  ];

  const {
    durationMinutes: _durationMinutes,
    totalPrice: _totalPrice,
    deposit: _deposit,
    bookingOptions: _bookingOptions,
    ...campaignFields
  } = draft;
  void _durationMinutes;
  void _totalPrice;
  void _deposit;
  void _bookingOptions;

  const input: MiniSessionCampaignInput = {
    ...campaignFields,
    internalName: slugifyCampaignName(headline),
    publicLabel: headline,
    headline,
    ctaLabel: "Choose your time",
    dateSummary: CAL_AVAILABILITY_NOTE,
    durationMinutes: 20,
    totalPriceCents,
    depositCents,
    inclusions: draft.inclusions.map((item) => item.trim()).filter(Boolean),
    metaTitle: headline,
    metaDescription: draft.summary.trim(),
    bookingOptions,
  };

  return { input, errors };
}

export function getPublishReadiness(
  draft: CampaignDraft,
  publishedMedia: AdminMediaItem[]
): PublishReadinessItem[] {
  const totalPriceCents = currencyToCents(draft.totalPrice) ?? 0;
  const depositCents = currencyToCents(draft.deposit) ?? 0;
  const hasPublishedHero = publishedMedia.some(
    (item) => item.id === draft.heroMediaId && item.status === "published"
  );
  const hasBookingLink = isSafeCalUrl(
    draft.bookingOptions[0]?.calBookingUrl ?? ""
  );
  const sessionCopy = [draft.headline, draft.summary, draft.description];
  const offerDetails = [draft.balanceDueText, draft.locationSummary];
  const policies = [draft.cancellationPolicy, draft.latenessPolicy];

  return [
    {
      key: "content",
      label: "Session details",
      ready: sessionCopy.every((value) => value.trim().length > 0),
      blocker: "Add the headline, summary, and full description.",
      targetId: "mini-session-details",
    },
    {
      key: "offer",
      label: "Location and payment note",
      ready: offerDetails.every((value) => value.trim().length > 0),
      blocker: "Add the location and final-payment note.",
      targetId: "mini-session-offer",
    },
    {
      key: "pricing",
      label: "Price and deposit",
      ready:
        totalPriceCents > 0 &&
        depositCents > 0 &&
        depositCents <= totalPriceCents,
      blocker:
        "Add a positive total and deposit, with the deposit no greater than the total.",
      targetId: "mini-session-offer",
    },
    {
      key: "hero",
      label: "Main photo",
      ready: hasPublishedHero,
      blocker: "Select a published image from this website.",
      targetId: "mini-session-photo",
    },
    {
      key: "inclusions",
      label: "What's included",
      ready: draft.inclusions.some((item) => item.trim().length > 0),
      blocker: "Add at least one client-facing inclusion.",
      targetId: "mini-session-inclusions",
    },
    {
      key: "policies",
      label: "Policies",
      ready: policies.every((value) => value.trim().length > 0),
      blocker: "Add the cancellation and lateness policies.",
      targetId: "mini-session-policies",
    },
    {
      key: "booking",
      label: "Cal.com booking link",
      ready: hasBookingLink,
      blocker: "Add the reusable Cal.com booking link.",
      targetId: "mini-session-booking",
    },
  ];
}

export function draftToPreviewCampaign(
  editor: CampaignEditorState,
  publishedMedia: AdminMediaItem[]
): MiniSessionPublicCampaign {
  const { draft } = editor;
  const now = new Date().toISOString();
  const selectedMedia = publishedMedia.find(
    (item) => item.id === draft.heroMediaId
  );

  return {
    id: editor.campaignId ?? "unsaved-preview",
    status: editor.sourceStatus === "sold_out" ? "sold_out" : "live",
    publicLabel: draft.headline || "Mini Sessions preview",
    headline: draft.headline || "Add your campaign headline",
    summary: draft.summary || "Add a short campaign summary in the editor.",
    description:
      draft.description ||
      "Add the full campaign description to preview the client experience.",
    durationMinutes: 20,
    totalPriceCents: currencyToCents(draft.totalPrice) ?? 0,
    depositCents: currencyToCents(draft.deposit) ?? 0,
    balanceDueText:
      draft.balanceDueText || "Add the remaining-balance terms in the editor.",
    dateSummary: CAL_AVAILABILITY_NOTE,
    locationSummary: draft.locationSummary || "Add the session location",
    inclusions:
      draft.inclusions.length > 0
        ? draft.inclusions
        : ["Add at least one session inclusion"],
    cancellationPolicy:
      draft.cancellationPolicy || "Add the cancellation policy.",
    weatherPolicy: draft.weatherPolicy,
    latenessPolicy: draft.latenessPolicy || "Add the lateness policy.",
    termsNote: draft.termsNote,
    heroMedia: selectedMedia
      ? {
          id: selectedMedia.id,
          key: selectedMedia.key,
          src: selectedMedia.src,
          alt: selectedMedia.alt || selectedMedia.filename,
          aspectRatio: selectedMedia.aspectRatio,
          cropPosition:
            selectedMedia.cropPosition ?? selectedMedia.crop_position ?? null,
        }
      : null,
    ctaLabel: "Choose your time",
    homepageFeatured: draft.homepageFeatured,
    promoLabel: draft.promoLabel,
    promoHeadline: draft.promoHeadline,
    promoCopy: draft.promoCopy,
    promoCtaLabel: draft.promoCtaLabel,
    metaTitle: draft.headline,
    metaDescription: draft.summary,
    bookingOptions: [
      {
        id:
          draft.bookingOptions[0]?.id ??
          draft.bookingOptions[0]?.clientKey ??
          "preview-booking-link",
        label: draft.headline || "Mini Sessions",
        description: draft.summary,
        dateTimeLabel: CAL_AVAILABILITY_NOTE,
        locationLabel: draft.locationSummary || "Add the session location",
        calBookingUrl:
          draft.bookingOptions[0]?.calBookingUrl ?? MINI_SESSIONS_CAL_URL,
        status: "open",
        sortOrder: 0,
        updatedAt: editor.sourceUpdatedAt ?? now,
      },
    ],
    publishedAt: null,
    createdAt: now,
    updatedAt: editor.sourceUpdatedAt ?? now,
  };
}

export function campaignMatchesFilter(
  campaign: MiniSessionAdminCampaign,
  filter: CampaignFilter
): boolean {
  if (filter === "active") return campaign.status === "live" || campaign.status === "sold_out";
  if (filter === "closed") return campaign.status === "closed";
  return campaign.status === filter;
}

export function formatCampaignTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function centsToCurrency(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function currencyToCents(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+(?:\.\d{0,2})?$/.test(trimmed)) return null;
  const cents = Math.round(Number(trimmed) * 100);
  return Number.isSafeInteger(cents) && cents >= 0 ? cents : null;
}

function isSafeCalUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (url.hostname === "cal.com" || url.hostname === "www.cal.com")
    );
  } catch {
    return false;
  }
}

export function slugifyCampaignName(value: string): string {
  return (
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "mini-session"
  );
}
