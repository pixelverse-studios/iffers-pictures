import { z } from "zod";

export const IFFERS_MINI_SESSIONS_WEBSITE_SLUG = "iffers-pictures" as const;

export const MINI_SESSION_CAMPAIGN_STATUSES = [
  "draft",
  "live",
  "sold_out",
  "closed",
  "archived",
] as const;

export const MINI_SESSION_BOOKING_OPTION_STATUSES = [
  "open",
  "sold_out",
  "hidden",
] as const;

export const miniSessionBookingOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  dateTimeLabel: z.string(),
  locationLabel: z.string(),
  calBookingUrl: z.string(),
  status: z.enum(MINI_SESSION_BOOKING_OPTION_STATUSES),
  sortOrder: z.number().int(),
  updatedAt: z.string(),
});

export const miniSessionFaqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answerHtml: z.string(),
  sortOrder: z.number().int(),
});

export const miniSessionHeroMediaSchema = z.object({
  id: z.number().int().positive(),
  key: z.string(),
  src: z.string(),
  alt: z.string(),
  aspectRatio: z.string().nullable(),
  cropPosition: z.string().nullable(),
});

const campaignFields = {
  id: z.string(),
  status: z.enum(MINI_SESSION_CAMPAIGN_STATUSES),
  publicLabel: z.string(),
  headline: z.string(),
  summary: z.string(),
  description: z.string(),
  experienceHeadline: z.string(),
  inclusionsHeadline: z.string().default("Session Details"),
  vibeHeadline: z.string(),
  vibeContent: z.string(),
  durationMinutes: z.number().int(),
  totalPriceCents: z.number().int(),
  depositCents: z.number().int(),
  balanceDueText: z.string(),
  dateSummary: z.string(),
  locationSummary: z.string(),
  inclusions: z.array(z.string()),
  cancellationPolicy: z.string(),
  weatherPolicy: z.string(),
  latenessPolicy: z.string(),
  termsNote: z.string(),
  heroMedia: miniSessionHeroMediaSchema.nullable(),
  ctaLabel: z.string(),
  homepageFeatured: z.boolean(),
  promoLabel: z.string(),
  promoHeadline: z.string(),
  promoCopy: z.string(),
  promoCtaLabel: z.string(),
  homepageHeroCtaLabel: z.string(),
  faqEyebrow: z.string(),
  faqHeadline: z.string(),
  faqIntro: z.string(),
  bookingEyebrow: z.string(),
  bookingHeadline: z.string(),
  faqs: z.array(miniSessionFaqSchema),
  metaTitle: z.string(),
  metaDescription: z.string(),
  bookingOptions: z.array(miniSessionBookingOptionSchema),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

export const miniSessionPublicCampaignSchema = z.object(campaignFields);

export const miniSessionAdminCampaignSchema = z.object({
  ...campaignFields,
  internalName: z.string(),
  heroMediaId: z.number().int().positive().nullable(),
});

const bookingOptionInputSchema = z
  .object({
    id: z.string().optional(),
    label: z.string(),
    description: z.string(),
    dateTimeLabel: z.string(),
    locationLabel: z.string(),
    calBookingUrl: z.string(),
    status: z.enum(MINI_SESSION_BOOKING_OPTION_STATUSES),
    sortOrder: z.number().int(),
  })
  .strict();

export const miniSessionCampaignInputSchema = z
  .object({
    internalName: z.string(),
    publicLabel: z.string(),
    headline: z.string(),
    summary: z.string(),
    description: z.string(),
    experienceHeadline: z.string(),
    inclusionsHeadline: z.string(),
    vibeHeadline: z.string(),
    vibeContent: z.string(),
    durationMinutes: z.number().int(),
    totalPriceCents: z.number().int(),
    depositCents: z.number().int(),
    balanceDueText: z.string(),
    dateSummary: z.string(),
    locationSummary: z.string(),
    inclusions: z.array(z.string()),
    cancellationPolicy: z.string(),
    weatherPolicy: z.string(),
    latenessPolicy: z.string(),
    termsNote: z.string(),
    heroMediaId: z.number().int().positive().nullable(),
    ctaLabel: z.string(),
    homepageFeatured: z.boolean(),
    promoLabel: z.string(),
    promoHeadline: z.string(),
    promoCopy: z.string(),
    promoCtaLabel: z.string(),
    homepageHeroCtaLabel: z.string(),
    faqEyebrow: z.string(),
    faqHeadline: z.string(),
    faqIntro: z.string(),
    bookingEyebrow: z.string(),
    bookingHeadline: z.string(),
    faqs: z.array(miniSessionFaqSchema),
    metaTitle: z.string(),
    metaDescription: z.string(),
    bookingOptions: z.array(bookingOptionInputSchema),
  })
  .strict();

export const miniSessionsApiErrorPayloadSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
    retryable: z.boolean().optional(),
  }),
});

export const miniSessionRevalidationSchema = z
  .object({
    configured: z.boolean(),
    triggered: z.boolean(),
    skipped: z.boolean(),
    error: z
      .object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
      })
      .optional(),
  })
  .passthrough();

export const publicCampaignResponseSchema = z.object({
  campaign: miniSessionPublicCampaignSchema,
});

export const adminCampaignResponseSchema = z.object({
  campaign: miniSessionAdminCampaignSchema,
  revalidation: miniSessionRevalidationSchema.optional(),
});

export const adminCampaignListResponseSchema = z.object({
  campaigns: z.array(miniSessionAdminCampaignSchema),
});

export type MiniSessionCampaignStatus =
  (typeof MINI_SESSION_CAMPAIGN_STATUSES)[number];
export type MiniSessionBookingOptionStatus =
  (typeof MINI_SESSION_BOOKING_OPTION_STATUSES)[number];
export type MiniSessionBookingOption = z.infer<
  typeof miniSessionBookingOptionSchema
>;
export type MiniSessionHeroMedia = z.infer<typeof miniSessionHeroMediaSchema>;
export type MiniSessionPublicCampaign = z.infer<
  typeof miniSessionPublicCampaignSchema
>;
export type MiniSessionAdminCampaign = z.infer<
  typeof miniSessionAdminCampaignSchema
>;
export type MiniSessionCampaignInput = z.infer<
  typeof miniSessionCampaignInputSchema
>;
export type MiniSessionRevalidation = z.infer<
  typeof miniSessionRevalidationSchema
>;
export type PublicCampaignResponse = z.infer<typeof publicCampaignResponseSchema>;
export type AdminCampaignResponse = z.infer<typeof adminCampaignResponseSchema>;
export type AdminCampaignListResponse = z.infer<
  typeof adminCampaignListResponseSchema
>;

export type ActiveMiniSessionCampaignResult =
  | { status: "available"; campaign: MiniSessionPublicCampaign }
  | { status: "not_found" }
  | { status: "not_configured" }
  | { status: "upstream_failure"; error: Error };
