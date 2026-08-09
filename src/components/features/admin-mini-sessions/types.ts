import type {
  MiniSessionAdminCampaign,
  MiniSessionBookingOptionStatus,
  MiniSessionCampaignInput,
} from "@/lib/mini-sessions/types";

export type CampaignFilter = "active" | "draft" | "closed" | "archived";

export interface BookingOptionDraft {
  clientKey: string;
  id?: string;
  label: string;
  description: string;
  dateTimeLabel: string;
  locationLabel: string;
  calBookingUrl: string;
  status: MiniSessionBookingOptionStatus;
  sortOrder: number;
}

export interface CampaignDraft
  extends Omit<
    MiniSessionCampaignInput,
    | "durationMinutes"
    | "totalPriceCents"
    | "depositCents"
    | "bookingOptions"
  > {
  durationMinutes: string;
  totalPrice: string;
  deposit: string;
  bookingOptions: BookingOptionDraft[];
}

export interface CampaignEditorState {
  campaignId: string | null;
  sourceUpdatedAt: string | null;
  draft: CampaignDraft;
}

export interface CampaignValidationResult {
  input: MiniSessionCampaignInput | null;
  errors: Record<string, string>;
}

export interface StaleCampaignState {
  latest: MiniSessionAdminCampaign | null;
  message: string;
}
