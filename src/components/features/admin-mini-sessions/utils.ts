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

export const MAX_BOOKING_OPTIONS = 6;
export const MAX_INCLUSIONS = 12;

export interface PublishReadinessItem {
  key: string;
  label: string;
  ready: boolean;
  blocker: string;
}

export function createEmptyCampaignDraft(): CampaignDraft {
  return {
    internalName: "",
    publicLabel: "",
    headline: "",
    summary: "",
    description: "",
    durationMinutes: "20",
    totalPrice: "0.00",
    deposit: "0.00",
    balanceDueText: "",
    dateSummary: "",
    locationSummary: "",
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
    bookingOptions: [],
  };
}

export function campaignToDraft(campaign: MiniSessionAdminCampaign): CampaignDraft {
  return {
    internalName: campaign.internalName,
    publicLabel: campaign.publicLabel,
    headline: campaign.headline,
    summary: campaign.summary,
    description: campaign.description,
    durationMinutes: String(campaign.durationMinutes),
    totalPrice: centsToCurrency(campaign.totalPriceCents),
    deposit: centsToCurrency(campaign.depositCents),
    balanceDueText: campaign.balanceDueText,
    dateSummary: campaign.dateSummary,
    locationSummary: campaign.locationSummary,
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
    bookingOptions: campaign.bookingOptions.map((option) => ({
      id: option.id,
      clientKey: option.id,
      label: option.label,
      description: option.description,
      dateTimeLabel: option.dateTimeLabel,
      locationLabel: option.locationLabel,
      calBookingUrl: option.calBookingUrl,
      status: option.status,
      sortOrder: option.sortOrder,
    })),
  };
}

export function createEmptyBookingOption(sortOrder: number): BookingOptionDraft {
  return {
    clientKey: crypto.randomUUID(),
    label: "",
    description: "",
    dateTimeLabel: "",
    locationLabel: "",
    calBookingUrl: "",
    status: "open",
    sortOrder,
  };
}

export function validateCampaignDraft(
  draft: CampaignDraft
): CampaignValidationResult {
  const errors: Record<string, string> = {};
  const durationMinutes = Number(draft.durationMinutes);
  const totalPriceCents = currencyToCents(draft.totalPrice);
  const depositCents = currencyToCents(draft.deposit);

  if (!draft.internalName.trim()) errors.internalName = "Add an internal name.";
  if (!draft.ctaLabel.trim()) errors.ctaLabel = "Add a booking button label.";
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 480) {
    errors.durationMinutes = "Use a whole number from 1 to 480.";
  }
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
  if (draft.bookingOptions.length > MAX_BOOKING_OPTIONS) {
    errors.bookingOptions = `Use no more than ${MAX_BOOKING_OPTIONS} booking options.`;
  }

  draft.bookingOptions.forEach((option, index) => {
    if (!option.label.trim()) errors[`bookingOptions.${index}.label`] = "Add a label.";
    if (!isSafeCalUrl(option.calBookingUrl)) {
      errors[`bookingOptions.${index}.calBookingUrl`] =
        "Use an HTTPS booking link from cal.com.";
    }
  });

  if (Object.keys(errors).length > 0 || totalPriceCents === null || depositCents === null) {
    return { input: null, errors };
  }

  const bookingOptions = draft.bookingOptions.map((option, index) => ({
      ...(option.id ? { id: option.id } : {}),
      label: option.label.trim(),
      description: option.description,
      dateTimeLabel: option.dateTimeLabel,
      locationLabel: option.locationLabel,
      calBookingUrl: option.calBookingUrl.trim(),
      status: option.status,
      sortOrder: index,
    }));

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
    internalName: draft.internalName.trim(),
    ctaLabel: draft.ctaLabel.trim(),
    durationMinutes,
    totalPriceCents,
    depositCents,
    inclusions: draft.inclusions.map((item) => item.trim()).filter(Boolean),
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
  const hasOpenOption = draft.bookingOptions.some(
    (option) => option.status === "open"
  );
  const requiredText = [
    draft.headline,
    draft.summary,
    draft.description,
    draft.balanceDueText,
    draft.dateSummary,
    draft.locationSummary,
    draft.cancellationPolicy,
    draft.latenessPolicy,
    draft.ctaLabel,
  ];

  return [
    {
      key: "content",
      label: "Public campaign copy",
      ready: requiredText.every((value) => value.trim().length > 0),
      blocker:
        "Complete the headline, summary, description, date, location, balance note, cancellation and lateness policies, and booking button label.",
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
    },
    {
      key: "hero",
      label: "Published hero image",
      ready: hasPublishedHero,
      blocker: "Select a published image from this website.",
    },
    {
      key: "inclusions",
      label: "Session inclusions",
      ready: draft.inclusions.some((item) => item.trim().length > 0),
      blocker: "Add at least one client-facing inclusion.",
    },
    {
      key: "booking",
      label: "Open Cal.com booking option",
      ready: hasOpenOption,
      blocker: "Add or reopen at least one Cal.com booking option.",
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
    publicLabel: draft.publicLabel || "Mini Sessions preview",
    headline: draft.headline || "Add your campaign headline",
    summary: draft.summary || "Add a short campaign summary in the editor.",
    description:
      draft.description ||
      "Add the full campaign description to preview the client experience.",
    durationMinutes: Number(draft.durationMinutes) || 0,
    totalPriceCents: currencyToCents(draft.totalPrice) ?? 0,
    depositCents: currencyToCents(draft.deposit) ?? 0,
    balanceDueText:
      draft.balanceDueText || "Add the remaining-balance terms in the editor.",
    dateSummary: draft.dateSummary || "Add campaign dates",
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
    ctaLabel: draft.ctaLabel || "Choose your time",
    homepageFeatured: draft.homepageFeatured,
    promoLabel: draft.promoLabel,
    promoHeadline: draft.promoHeadline,
    promoCopy: draft.promoCopy,
    promoCtaLabel: draft.promoCtaLabel,
    metaTitle: draft.metaTitle,
    metaDescription: draft.metaDescription,
    bookingOptions: draft.bookingOptions
      .filter((option) => option.status !== "hidden")
      .map((option, index) => ({
        id: option.id ?? option.clientKey,
        label: option.label || `Booking option ${index + 1}`,
        description: option.description,
        dateTimeLabel: option.dateTimeLabel || "Add a date and time",
        locationLabel: option.locationLabel || "Add a location",
        calBookingUrl: option.calBookingUrl,
        status: option.status,
        sortOrder: option.sortOrder,
        updatedAt: editor.sourceUpdatedAt ?? now,
      })),
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
