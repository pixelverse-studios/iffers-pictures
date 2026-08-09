import { NextResponse, type NextRequest } from "next/server";
import { buildMiniSessionsApiUrl } from "./server";

type RouteParams = Promise<{ path?: string[] }>;

const REQUEST_HEADERS = new Set([
  "accept",
  "accept-language",
  "content-type",
  "cookie",
  "user-agent",
  "x-request-id",
]);
const RESPONSE_HEADERS = new Set([
  "cache-control",
  "content-language",
  "content-type",
  "etag",
  "location",
  "retry-after",
  "vary",
  "x-request-id",
]);

export async function proxyMiniSessionsApiRequest(
  request: NextRequest,
  params: RouteParams
): Promise<Response> {
  try {
    const { path = [] } = await params;
    const upstreamUrl = new URL(
      buildMiniSessionsApiUrl(
        ["/api/mini-session-campaigns", ...path.map(encodeURIComponent)].join("/")
      )
    );
    upstreamUrl.search = request.nextUrl.search;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: selectHeaders(request.headers, REQUEST_HEADERS),
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : request.body,
      redirect: "manual",
      cache: "no-store",
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const headers = selectHeaders(upstreamResponse.headers, RESPONSE_HEADERS);
    for (const cookie of getSetCookieHeaders(upstreamResponse.headers)) {
      headers.append("Set-Cookie", cookie);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  } catch (error) {
    const notConfigured =
      error instanceof Error && error.message.includes("PVS_API_URL");
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: notConfigured
            ? "mini_sessions.frontend_proxy_not_configured"
            : "mini_sessions.frontend_proxy_failed",
          message: notConfigured
            ? "Mini Sessions API proxy is not configured."
            : "Mini Sessions API proxy request failed.",
          retryable: !notConfigured,
        },
      },
      { status: notConfigured ? 500 : 502 }
    );
  }
}

function selectHeaders(source: Headers, allowed: Set<string>): Headers {
  const selected = new Headers();
  source.forEach((value, key) => {
    if (allowed.has(key.toLowerCase())) selected.append(key, value);
  });
  return selected;
}

function getSetCookieHeaders(headers: Headers): string[] {
  const withGetSetCookie = headers as Headers & { getSetCookie?: () => string[] };
  return withGetSetCookie.getSetCookie?.() ??
    (headers.get("set-cookie") ? [headers.get("set-cookie") as string] : []);
}
