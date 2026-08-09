import { parseMiniSessionsApiResponse } from "./errors";
import {
  adminCampaignListResponseSchema,
  adminCampaignResponseSchema,
  IFFERS_MINI_SESSIONS_WEBSITE_SLUG,
  miniSessionCampaignInputSchema,
  type AdminCampaignListResponse,
  type AdminCampaignResponse,
  type MiniSessionCampaignInput,
} from "./types";

const MINI_SESSIONS_ROOT = `/api/mini-sessions/${IFFERS_MINI_SESSIONS_WEBSITE_SLUG}`;

interface JsonRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function requestAdminJson<T>(
  path: string,
  schema: Parameters<typeof parseMiniSessionsApiResponse<T>>[1],
  { body, headers, ...init }: JsonRequestOptions = {}
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    cache: "no-store",
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseMiniSessionsApiResponse(response, schema);
}

export function listMiniSessionCampaigns(
  includeArchived = false
): Promise<AdminCampaignListResponse> {
  const query = includeArchived ? "?includeArchived=true" : "";
  return requestAdminJson(
    `${MINI_SESSIONS_ROOT}/admin${query}`,
    adminCampaignListResponseSchema,
    { method: "GET" }
  );
}

export function getMiniSessionCampaign(
  campaignId: string
): Promise<AdminCampaignResponse> {
  return requestAdminJson(
    `${MINI_SESSIONS_ROOT}/admin/${encodeURIComponent(campaignId)}`,
    adminCampaignResponseSchema,
    { method: "GET" }
  );
}

export function createMiniSessionCampaign(
  campaign: MiniSessionCampaignInput
): Promise<AdminCampaignResponse> {
  return requestAdminJson(MINI_SESSIONS_ROOT + "/admin", adminCampaignResponseSchema, {
    method: "POST",
    body: { campaign: miniSessionCampaignInputSchema.parse(campaign) },
  });
}

export function updateMiniSessionCampaign(
  campaignId: string,
  expectedUpdatedAt: string,
  campaign: MiniSessionCampaignInput
): Promise<AdminCampaignResponse> {
  return requestAdminJson(
    `${MINI_SESSIONS_ROOT}/admin/${encodeURIComponent(campaignId)}`,
    adminCampaignResponseSchema,
    {
      method: "PATCH",
      body: {
        expectedUpdatedAt,
        campaign: miniSessionCampaignInputSchema.parse(campaign),
      },
    }
  );
}

type LifecycleAction =
  | "duplicate"
  | "publish"
  | "mark-sold-out"
  | "close"
  | "archive";

function mutateMiniSessionCampaign(
  campaignId: string,
  action: LifecycleAction,
  expectedUpdatedAt: string,
  extra: Record<string, unknown> = {}
): Promise<AdminCampaignResponse> {
  return requestAdminJson(
    `${MINI_SESSIONS_ROOT}/admin/${encodeURIComponent(campaignId)}/${action}`,
    adminCampaignResponseSchema,
    { method: "POST", body: { expectedUpdatedAt, ...extra } }
  );
}

export const duplicateMiniSessionCampaign = (
  campaignId: string,
  expectedUpdatedAt: string
) => mutateMiniSessionCampaign(campaignId, "duplicate", expectedUpdatedAt);

export const publishMiniSessionCampaign = (
  campaignId: string,
  expectedUpdatedAt: string
) =>
  mutateMiniSessionCampaign(campaignId, "publish", expectedUpdatedAt, {
    calComVerified: true,
  });

export const markMiniSessionCampaignSoldOut = (
  campaignId: string,
  expectedUpdatedAt: string
) => mutateMiniSessionCampaign(campaignId, "mark-sold-out", expectedUpdatedAt);

export const closeMiniSessionCampaign = (
  campaignId: string,
  expectedUpdatedAt: string
) => mutateMiniSessionCampaign(campaignId, "close", expectedUpdatedAt);

export const archiveMiniSessionCampaign = (
  campaignId: string,
  expectedUpdatedAt: string
) => mutateMiniSessionCampaign(campaignId, "archive", expectedUpdatedAt);
