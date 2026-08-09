import { proxyMiniSessionsApiRequest } from "@/lib/mini-sessions/proxy";
import type { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ path?: string[] }> };

export const GET = (request: NextRequest, { params }: RouteContext) =>
  proxyMiniSessionsApiRequest(request, params);
export const POST = (request: NextRequest, { params }: RouteContext) =>
  proxyMiniSessionsApiRequest(request, params);
export const PATCH = (request: NextRequest, { params }: RouteContext) =>
  proxyMiniSessionsApiRequest(request, params);
