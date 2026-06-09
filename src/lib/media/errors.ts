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

    throw new MediaApiError({
      status: response.status,
      code: "media.request_failed",
      message:
        typeof payload === "string" && payload.length > 0
          ? payload
          : `Media request failed with status ${response.status}.`,
      payload,
    });
  }

  return payload as T;
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
