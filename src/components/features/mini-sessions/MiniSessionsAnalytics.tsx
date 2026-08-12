"use client";

import { useEffect } from "react";
import { trackMiniSessionCampaignView } from "@/lib/analytics";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";

export function MiniSessionsAnalytics({
  campaign,
}: {
  campaign: Pick<MiniSessionPublicCampaign, "id" | "status">;
}) {
  useEffect(() => {
    if (campaign.status !== "live" && campaign.status !== "sold_out") return;
    trackMiniSessionCampaignView({
      campaign_id: campaign.id,
      campaign_status: campaign.status,
    });
  }, [campaign.id, campaign.status]);

  return null;
}
