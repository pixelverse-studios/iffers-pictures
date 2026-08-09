import { z, type ZodType } from "zod";
import { miniSessionsApiErrorPayloadSchema } from "./types";

export type MiniSessionsErrorKind =
  | "not_found"
  | "not_configured"
  | "upstream_failure"
  | "authentication"
  | "validation"
  | "stale_conflict"
  | "conflict"
  | "request_failed";

export class MiniSessionsApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly kind: MiniSessionsErrorKind,
    public readonly retryable: boolean,
    public readonly details?: unknown,
    public readonly payload?: unknown
  ) {
    super(message);
    this.name = "MiniSessionsApiError";
  }
}

export async function parseMiniSessionsApiResponse<T>(
  response: Response,
  schema: ZodType<T>
): Promise<T> {
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    const parsedError = miniSessionsApiErrorPayloadSchema.safeParse(payload);
    if (parsedError.success) {
      const { error } = parsedError.data;
      throw new MiniSessionsApiError(
        response.status,
        error.code,
        error.message,
        classifyError(response.status, error.code),
        error.retryable ?? response.status >= 500,
        error.details,
        payload
      );
    }

    throw new MiniSessionsApiError(
      response.status,
      "mini_sessions.upstream_failure",
      `Mini Sessions request failed with status ${response.status}.`,
      classifyError(response.status),
      response.status >= 500,
      undefined,
      payload
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new MiniSessionsApiError(
      502,
      "mini_sessions.invalid_upstream_response",
      "The Mini Sessions service returned an invalid response.",
      "upstream_failure",
      true,
      z.flattenError(parsed.error),
      payload
    );
  }

  return parsed.data;
}

function classifyError(status: number, code?: string): MiniSessionsErrorKind {
  if (code === "mini_sessions.frontend_proxy_not_configured") {
    return "not_configured";
  }
  if (
    code === "mini_sessions.not_found" ||
    code === "mini_sessions.campaign_not_found" ||
    code === "mini_sessions.website_not_found"
  ) {
    return "not_found";
  }
  if (code === "mini_sessions.stale_write") return "stale_conflict";
  if (code === "mini_sessions.invalid_payload" || status === 400 || status === 422) {
    return "validation";
  }
  if (status === 401 || status === 403) return "authentication";
  if (status === 409) return "conflict";
  if (status >= 500) return "upstream_failure";
  return "request_failed";
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response.text();

  try {
    return await response.json();
  } catch {
    return null;
  }
}
