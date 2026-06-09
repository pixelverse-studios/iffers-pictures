import type { MediaErrorPayload } from "./types";

export class MediaApiError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;
  payload?: unknown;

  constructor({
    status,
    code,
    message,
    details,
    payload,
  }: {
    status: number;
    code: string;
    message: string;
    details?: Record<string, unknown>;
    payload?: unknown;
  }) {
    super(message);
    this.name = "MediaApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.payload = payload;
  }
}

export function isMediaErrorPayload(value: unknown): value is MediaErrorPayload {
  if (!value || typeof value !== "object") return false;

  const error = (value as { error?: unknown }).error;
  if (!error || typeof error !== "object") return false;

  const { code, message } = error as Record<string, unknown>;
  return typeof code === "string" && typeof message === "string";
}

function getPlainErrorMessage(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;

  const error = (value as { error?: unknown }).error;
  return typeof error === "string" && error.length > 0 ? error : null;
}

export async function parseMediaApiResponse<T>(
  response: Response
): Promise<T> {
  const payload = await readJsonPayload(response);

  if (!response.ok) {
    if (isMediaErrorPayload(payload)) {
      throw new MediaApiError({
        status: response.status,
        code: payload.error.code,
        message: payload.error.message,
        details: payload.error.details,
        payload,
      });
    }

    const plainErrorMessage = getPlainErrorMessage(payload);
    if (plainErrorMessage) {
      throw new MediaApiError({
        status: response.status,
        code: "media.request_failed",
        message: plainErrorMessage,
        payload,
      });
    }

    const fallbackError = getFallbackResponseError(response, payload);

    throw new MediaApiError({
      status: response.status,
      code: fallbackError.code,
      message: fallbackError.message,
      payload,
    });
  }

  return payload as T;
}

function getFallbackResponseError(
  response: Response,
  payload: unknown
): { code: string; message: string } {
  if (response.status === 504) {
    return {
      code: "media.gateway_timeout",
      message:
        "The media request timed out before the server responded. Try again with fewer images.",
    };
  }

  if (response.status === 502 || response.status === 503) {
    return {
      code: "media.gateway_unavailable",
      message: "The media server is temporarily unavailable. Try again in a moment.",
    };
  }

  if (typeof payload === "string" && payload.trim().length > 0) {
    const contentType = response.headers.get("content-type") ?? "";
    const trimmedPayload = payload.trim();

    if (!contentType.includes("text/html") && !looksLikeHtml(trimmedPayload)) {
      return {
        code: "media.request_failed",
        message:
          trimmedPayload.length > 300
            ? `${trimmedPayload.slice(0, 300)}...`
            : trimmedPayload,
      };
    }
  }

  return {
    code: "media.request_failed",
    message: `Media request failed with status ${response.status}.`,
  };
}

function looksLikeHtml(value: string): boolean {
  const lowerValue = value.toLowerCase();
  return (
    lowerValue.startsWith("<!doctype html") ||
    lowerValue.startsWith("<html") ||
    lowerValue.includes("<body") ||
    lowerValue.includes("</html>")
  );
}

async function readJsonPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return response.text();
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
