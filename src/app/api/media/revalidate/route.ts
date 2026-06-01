import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  IFFERS_MEDIA_WEBSITE_SLUG,
  MEDIA_REVALIDATION_REASONS,
  type MediaRevalidationReason,
  type MediaRevalidationWebhookPayload,
  type MediaRevalidationWebhookResponse,
} from "@/lib/media/types";

export const runtime = "nodejs";

const MAX_REVALIDATION_PATHS = 50;
const MAX_REVALIDATION_PATH_LENGTH = 300;

export async function POST(request: Request) {
  const authError = validateAuthorization(request);
  if (authError) return authError;

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return invalidPayloadResponse("Payload must be valid JSON.");
  }

  let websiteSlug: string;
  try {
    websiteSlug = requirePayloadObjectString(rawPayload, "website_slug");
  } catch (error) {
    return invalidPayloadResponse(
      error instanceof Error
        ? error.message
        : "Invalid media revalidation payload."
    );
  }

  if (websiteSlug !== IFFERS_MEDIA_WEBSITE_SLUG) {
    const ignoredPaths = getIgnoredAffectedPaths(rawPayload);

    return NextResponse.json<MediaRevalidationWebhookResponse>({
      revalidated: false,
      ignored: true,
      website_slug: websiteSlug,
      reason: getOptionalReason(rawPayload),
      affected_paths: ignoredPaths,
      revalidated_paths: [],
      ignored_paths: ignoredPaths,
    });
  }

  let payload: MediaRevalidationWebhookPayload;
  try {
    payload = parseWebhookPayload(rawPayload);
  } catch (error) {
    return invalidPayloadResponse(
      error instanceof Error ? error.message : "Invalid media revalidation payload."
    );
  }

  const uniquePaths = [...new Set(payload.affected_paths)];
  for (const path of uniquePaths) {
    revalidatePath(path);
  }

  return NextResponse.json<MediaRevalidationWebhookResponse>({
    revalidated: true,
    ignored: false,
    website_slug: payload.website_slug,
    reason: payload.reason,
    affected_paths: payload.affected_paths,
    revalidated_paths: uniquePaths,
    ignored_paths: [],
  });
}

function invalidPayloadResponse(message: string): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: "media.invalid_revalidation_payload",
        message,
      },
    },
    { status: 400 }
  );
}

function validateAuthorization(request: Request): NextResponse | null {
  const secret = process.env.MEDIA_REVALIDATION_SECRET?.trim();
  if (!secret) return null;

  const authorization = request.headers.get("authorization");
  if (authorization === `Bearer ${secret}`) return null;

  return NextResponse.json(
    {
      error: {
        code: "media.revalidation_unauthorized",
        message: "Invalid media revalidation secret.",
      },
    },
    { status: 401 }
  );
}

function requirePayloadObjectString(value: unknown, field: string): string {
  if (!value || typeof value !== "object") {
    throw new Error("Payload must be an object.");
  }

  return requireString((value as Record<string, unknown>)[field], field);
}

function getOptionalReason(value: unknown): MediaRevalidationReason | undefined {
  if (!value || typeof value !== "object") return undefined;

  const reason = (value as Record<string, unknown>).reason;
  return typeof reason === "string" &&
    MEDIA_REVALIDATION_REASONS.includes(reason as MediaRevalidationReason)
    ? (reason as MediaRevalidationReason)
    : undefined;
}

function getIgnoredAffectedPaths(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];

  const affectedPaths = (value as Record<string, unknown>).affected_paths;
  return Array.isArray(affectedPaths)
    ? affectedPaths.filter((path): path is string => typeof path === "string")
    : [];
}

function parseWebhookPayload(value: unknown): MediaRevalidationWebhookPayload {
  if (!value || typeof value !== "object") {
    throw new Error("Payload must be an object.");
  }

  const payload = value as Record<string, unknown>;
  const websiteSlug = requireString(payload.website_slug, "website_slug");
  const reason = parseReason(payload.reason);
  const affectedPaths = parseAffectedPaths(payload.affected_paths);
  const mediaId =
    payload.media_id === undefined
      ? undefined
      : requirePositiveInteger(payload.media_id, "media_id");
  const mediaKey =
    payload.media_key === undefined
      ? undefined
      : requireString(payload.media_key, "media_key");
  const actor =
    payload.actor === undefined ? undefined : requireString(payload.actor, "actor");
  const triggeredAt = requireString(payload.triggered_at, "triggered_at");

  return {
    website_slug: websiteSlug,
    reason,
    affected_paths: affectedPaths,
    ...(mediaId !== undefined && { media_id: mediaId }),
    ...(mediaKey !== undefined && { media_key: mediaKey }),
    ...(actor !== undefined && { actor }),
    triggered_at: triggeredAt,
  };
}

function parseReason(value: unknown): MediaRevalidationReason {
  if (
    typeof value === "string" &&
    MEDIA_REVALIDATION_REASONS.includes(value as MediaRevalidationReason)
  ) {
    return value as MediaRevalidationReason;
  }

  throw new Error("reason must be a valid media revalidation reason.");
}

function parseAffectedPaths(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new Error("affected_paths must be an array.");
  }

  if (value.length === 0) {
    throw new Error("affected_paths must include at least one path.");
  }

  if (value.length > MAX_REVALIDATION_PATHS) {
    throw new Error(
      `affected_paths cannot include more than ${MAX_REVALIDATION_PATHS} paths.`
    );
  }

  return value.map((path, index) => {
    if (!isValidSitePath(path)) {
      throw new Error(`affected_paths[${index}] must be a site-local path.`);
    }

    return path;
  });
}

function isValidSitePath(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length === 0 || value.length > MAX_REVALIDATION_PATH_LENGTH) {
    return false;
  }

  return (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !value.includes("?") &&
    !value.includes("#") &&
    !value.includes("://")
  );
}

function requireString(value: unknown, field: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  throw new Error(`${field} must be a non-empty string.`);
}

function requirePositiveInteger(value: unknown, field: string): number {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  throw new Error(`${field} must be a positive integer.`);
}
