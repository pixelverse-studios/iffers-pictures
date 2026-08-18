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
  "https://cal.com/ifferspictures/minis";
export const CAL_AVAILABILITY_NOTE =
  "Live dates and times are shown in the booking calendar.";
export const DEFAULT_LOCATION_SUMMARY = "Bergen County, NJ";
export const DEFAULT_BALANCE_DUE_TEXT =
  "Final payment is due 48 hours prior to event";
export const DEFAULT_EXPERIENCE_HEADLINE =
  "A small session with room for real connection.";
export const DEFAULT_VIBE_HEADLINE = "Relax and Enjoy the Moment";
export const DEFAULT_VIBE_CONTENT =
  "<p>There is zero pressure for your kids (or adults!) to act perfectly. Real laughter, cozy hugs, and playful moments always make for the best photos. My goal is to capture your family naturally, not force stiff poses.</p><p>Feel free to bring a favorite small toy, comfort item, or non-messy snack to help keep little ones happy. I will gently guide you through a mix of easy prompts and candid moments so you never have to worry about how to stand or what to do with your hands. Even in just 15 to 20 minutes, we'll capture a full gallery of genuine, heartwarming memories.</p>";

function createApprovedFaqs() {
  return [
    ["How many photos do we get in an Autumn Keepsake Session?", "<p><strong>10 edited digital images</strong>, with the option to purchase additional images or the full gallery.</p>"],
    ["How much are Autumn Keepsake Sessions?", "<p>The total rate for an Autumn Keepsake Session is <strong>$225</strong>. A nonrefundable <strong>$100 booking fee</strong> is required to secure your date and time. Final payment is due 48 hours prior to event.</p>"],
    ["Where will the session take place?", "<p>Autumn Keepsake Sessions will take place in <strong>Bergen County, NJ</strong>. The final location will be announced as the session gets closer so we can choose a park with the most beautiful fall foliage.</p>"],
    ["When will we receive our photos?", "<p>Your gallery will be ready within <strong>10–14 days</strong>.</p>"],
    ["Do you provide print rights?", "<p>Yes! Every completed gallery includes high-resolution digital downloads along with full personal print rights, so you are free to print your images anywhere you choose.</p><p>For your convenience, your online gallery is also connected to a professional print lab. You can easily order high-quality prints, canvas wraps, framed wall art, and custom photo cards directly through your gallery and have them delivered straight to your door.</p>"],
    ["Can we bring our dog or family pet?", "<p>Absolutely, I love dogs! Please let me know in advance if you plan on bringing your furry family member so I can double-check that our location is pet-friendly. I'll even be sure to pack some extra treats!</p><p><strong>Tip:</strong> Since these sessions move quickly, it’s super helpful to bring a leash, a few poop bags, and—if possible—a helper who can hold the leash when we take a few photos without your pup.</p>"],
    ["Can we bring grandparents or extended family members?", "<p>Grandparents are always welcome to join in on the fun. Please keep in mind that Autumn Keepsake Sessions are 20 minutes long. Because our time together is quick, bringing a larger group means we will focus primarily on group poses and key combinations.</p><p>If you are hoping for an extensive variety of individual portraits, subgroup combinations, and solo shots, we recommend booking two back-to-back time slots so everyone gets plenty of camera time.</p>"],
    ["What if we’re late?", "<p>Mini sessions are booked back-to-back, therefore I’m not able to extend your session time if you arrive late. Please plan to arrive at least <strong>5–10 minutes early</strong>.</p>"],
    ["What if it rains?", "<p>I monitor the forecast closely in the days leading up to your session. If heavy rain, high winds, or extreme cold are expected, I will reach out in advance to discuss moving our date. For light drizzle or overcast skies, we usually still head out! Cloudy days actually act as a natural softbox, producing beautiful, even light that makes skin tones look amazing.</p><p>If severe weather forces us to reschedule, your session fee transfers directly to our rain date.</p>"],
    ["Do you offer prints, wall art, albums, or gift cards?", "<p>Absolutely! When you receive your gallery, you can order professional-quality prints, wall art, and heirloom albums directly through your online gallery.</p><p>Every product is made with archival materials designed to last for generations—a beautiful way to display your favorite images beyond the screen.</p>"],
  ].map(([question, answerHtml], sortOrder) => ({
    id: crypto.randomUUID(),
    question,
    answerHtml,
    sortOrder,
  }));
}

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
    publicLabel: "Mini Sessions",
    headline: "",
    summary: "",
    description: "",
    experienceHeadline: DEFAULT_EXPERIENCE_HEADLINE,
    vibeHeadline: DEFAULT_VIBE_HEADLINE,
    vibeContent: DEFAULT_VIBE_CONTENT,
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
    homepageHeroCtaLabel: "Mini Sessions now booking",
    faqs: createApprovedFaqs(),
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
    experienceHeadline: campaign.experienceHeadline,
    vibeHeadline: campaign.vibeHeadline,
    vibeContent: campaign.vibeContent,
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
    homepageHeroCtaLabel: campaign.homepageHeroCtaLabel,
    faqs: campaign.faqs.map((faq) => ({ ...faq })),
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
  if (
    draft.faqs.some(
      (faq) =>
        !faq.question.trim() ||
        !faq.answerHtml.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim()
    )
  ) {
    errors.faqs = "Complete or remove each FAQ before saving.";
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
    publicLabel: draft.publicLabel.trim() || "Mini Sessions",
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
  const richTextHasContent = (value: string) =>
    value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim().length > 0;
  const sessionCopy = [draft.headline, draft.summary, draft.experienceHeadline];
  const offerDetails = [draft.balanceDueText, draft.locationSummary];
  const policies = [draft.cancellationPolicy, draft.latenessPolicy];

  return [
    {
      key: "content",
      label: "Session details",
      ready:
        sessionCopy.every((value) => value.trim().length > 0) &&
        richTextHasContent(draft.description) &&
        draft.vibeHeadline.trim().length > 0 &&
        richTextHasContent(draft.vibeContent),
      blocker: "Add the session headline, summary, Experience, and Vibe content.",
      targetId: "mini-session-details",
    },
    {
      key: "faqs",
      label: "Mini Sessions FAQs",
      ready:
        draft.faqs.length > 0 &&
        draft.faqs.every(
          (faq) => faq.question.trim().length > 0 && richTextHasContent(faq.answerHtml)
        ),
      blocker: "Add at least one complete question and answer.",
      targetId: "mini-session-faqs",
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
    publicLabel: draft.publicLabel || "Mini Sessions",
    headline: draft.headline || "Add your campaign headline",
    summary: draft.summary || "Add a short campaign summary in the editor.",
    description: sanitizePreviewRichText(
      draft.description ||
        "Add the full campaign description to preview the client experience."
    ),
    experienceHeadline:
      draft.experienceHeadline || DEFAULT_EXPERIENCE_HEADLINE,
    vibeHeadline: draft.vibeHeadline || DEFAULT_VIBE_HEADLINE,
    vibeContent: sanitizePreviewRichText(
      draft.vibeContent || DEFAULT_VIBE_CONTENT
    ),
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
    homepageHeroCtaLabel: draft.homepageHeroCtaLabel,
    faqs: draft.faqs.map((faq) => ({
      ...faq,
      answerHtml: sanitizePreviewRichText(faq.answerHtml),
    })),
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

function sanitizePreviewRichText(value: string): string {
  if (typeof DOMParser === "undefined") {
    return value
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s(?:srcdoc|formaction)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(?:javascript|data):/gi, "");
  }

  const allowedTags = new Set([
    "P", "BR", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI", "A", "BLOCKQUOTE",
  ]);
  const document = new DOMParser().parseFromString(value, "text/html");

  for (const element of Array.from(document.body.querySelectorAll("*"))) {
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }

    for (const attribute of Array.from(element.attributes)) {
      if (element.tagName !== "A" || !["href", "title"].includes(attribute.name)) {
        element.removeAttribute(attribute.name);
      }
    }

    if (element.tagName === "A") {
      const href = element.getAttribute("href") ?? "";
      if (!/^(https?:|mailto:)/i.test(href)) element.removeAttribute("href");
      element.setAttribute("rel", "noreferrer");
    }
  }

  return document.body.innerHTML;
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
