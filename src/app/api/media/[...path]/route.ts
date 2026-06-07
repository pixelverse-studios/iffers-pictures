import { proxyMediaApiRequest } from "@/lib/media/proxy";
import type { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export function GET(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media");
}

export function POST(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media");
}

export function PATCH(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media");
}

export function PUT(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media");
}

export function DELETE(request: NextRequest, { params }: RouteContext) {
  return proxyMediaApiRequest(request, params, "/api/media");
}
