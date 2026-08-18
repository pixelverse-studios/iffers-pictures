import "server-only";

import { MiniSessionsApiError, parseMiniSessionsApiResponse } from "./errors";
import {
  IFFERS_MINI_SESSIONS_WEBSITE_SLUG,
  publicCampaignResponseSchema,
  type ActiveMiniSessionCampaignResult,
  type MiniSessionPublicCampaign,
} from "./types";

export const PUBLIC_MINI_SESSIONS_REVALIDATE_SECONDS = 60;
export const PUBLIC_MINI_SESSIONS_TIMEOUT_MS = 5_000;

export function getMiniSessionsApiBaseUrl(): string | null {
  const rawBaseUrl = process.env.PVS_API_URL;
  return rawBaseUrl ? rawBaseUrl.replace(/\/$/, "") : null;
}

export function buildMiniSessionsApiUrl(path: string): string {
  const baseUrl = getMiniSessionsApiBaseUrl();
  if (!baseUrl) throw new Error("PVS_API_URL is not configured.");
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getActiveMiniSessionCampaignResult(): Promise<ActiveMiniSessionCampaignResult> {
  const baseUrl = getMiniSessionsApiBaseUrl();
  if (!baseUrl) return { status: "not_configured" };

  try {
    const response = await fetch(
      `${baseUrl}/api/mini-session-campaigns/${IFFERS_MINI_SESSIONS_WEBSITE_SLUG}/active`,
      {
        next: { revalidate: PUBLIC_MINI_SESSIONS_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(PUBLIC_MINI_SESSIONS_TIMEOUT_MS),
      }
    );
    const { campaign } = await parseMiniSessionsApiResponse(
      response,
      publicCampaignResponseSchema
    );
    if (campaign.status !== "live" && campaign.status !== "sold_out") {
      return { status: "not_found" };
    }
    return { status: "available", campaign };
  } catch (error) {
    if (error instanceof MiniSessionsApiError && error.kind === "not_found") {
      return { status: "not_found" };
    }
    return {
      status: "upstream_failure",
      error: error instanceof Error ? error : new Error("Mini Sessions request failed."),
    };
  }
}

/** Fail-closed convenience for public promotion surfaces. */
export async function getActiveMiniSessionCampaign(): Promise<MiniSessionPublicCampaign | null> {
  const result = await getActiveMiniSessionCampaignResult();
  return result.status === "available" ? result.campaign : null;
}
