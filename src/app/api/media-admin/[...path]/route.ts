import { proxyMediaApiRequest } from "@/lib/media/proxy";
import type { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export function GET(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media-admin");
}

export function POST(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media-admin");
}
