export const MINI_SESSIONS_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type MiniSessionsUtmParams = Partial<
  Record<(typeof MINI_SESSIONS_UTM_KEYS)[number], string>
>;

type SearchParamValue = string | string[] | undefined;

export function sanitizeMiniSessionsUtmParams(
  searchParams: Record<string, SearchParamValue>
): MiniSessionsUtmParams {
  const sanitized: MiniSessionsUtmParams = {};

  for (const key of MINI_SESSIONS_UTM_KEYS) {
    const value = searchParams[key];
    if (typeof value !== "string") continue;

    const trimmed = value.trim();
    if (!trimmed || trimmed.length > 100 || /[\u0000-\u001f\u007f]/.test(trimmed)) {
      continue;
    }

    sanitized[key] = trimmed;
  }

  return sanitized;
}

export function appendMiniSessionsUtmParams(
  rawUrl: string,
  utmParams: MiniSessionsUtmParams
): string {
  try {
    const url = new URL(rawUrl);
    for (const key of MINI_SESSIONS_UTM_KEYS) {
      const value = utmParams[key];
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}
