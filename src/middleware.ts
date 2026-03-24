import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  "/services/headshots": "/services/portrait",
  "/services/events/baby-shower": "/services/events",
  "/services/events/bridal-shower": "/services/events",
  "/services/events/engagement": "/services/couples-engagement",
  "/services/events/proposal": "/services/couples-engagement",
  "/services/events/parties": "/services/events",
  "/services/events/religious-ceremonies": "/services/events",
  "/services/events/milestones": "/services/events",
  "/services/milestones": "/services/events",
  "/pricing": "/investment",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const destination = REDIRECTS[pathname];

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/services/headshots",
    "/services/events/:path*",
    "/services/milestones",
    "/pricing",
  ],
};
