import { NextResponse, type NextRequest } from "next/server";
import { buildMediaApiUrl } from "./server";

type RouteParams = Promise<{ path?: string[] }>;

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

export async function proxyMediaApiRequest(
  request: NextRequest,
  params: RouteParams,
  upstreamPrefix: "/api/media" | "/api/media-admin"
): Promise<Response> {
  try {
    const { path = [] } = await params;
    const upstreamPath = [upstreamPrefix, ...path].join("/");
    const upstreamUrl = new URL(buildMediaApiUrl(upstreamPath));
    upstreamUrl.search = request.nextUrl.search;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: getForwardHeaders(request),
      body: request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
      redirect: "manual",
      cache: "no-store",
      // Required by Node fetch when forwarding a streamed request body.
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    return buildProxyResponse(upstreamResponse);
  } catch (error) {
    if (error instanceof Error && error.message.includes("PVS_MEDIA_API_URL")) {
      return NextResponse.json(
        {
          error: {
            code: "media.frontend_proxy_not_configured",
            message: "Media API proxy is not configured.",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: {
          code: "media.frontend_proxy_failed",
          message: "Media API proxy request failed.",
        },
      },
      { status: 502 }
    );
  }
}

function getForwardHeaders(request: NextRequest): Headers {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(normalizedKey)) return;
    headers.set(key, value);
  });

  return headers;
}

function buildProxyResponse(upstreamResponse: Response): Response {
  const headers = new Headers();

  upstreamResponse.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(normalizedKey)) return;
    if (normalizedKey === "set-cookie") return;
    headers.set(key, value);
  });

  const setCookieHeaders = getSetCookieHeaders(upstreamResponse.headers);
  for (const setCookie of setCookieHeaders) {
    headers.append("Set-Cookie", setCookie);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

function getSetCookieHeaders(headers: Headers): string[] {
  const withGetSetCookie = headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookieHeaders = withGetSetCookie.getSetCookie?.();

  if (setCookieHeaders && setCookieHeaders.length > 0) {
    return setCookieHeaders;
  }

  const singleHeader = headers.get("set-cookie");
  return singleHeader ? [singleHeader] : [];
}
