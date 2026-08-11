"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { MiniSessionCampaignStatus } from "@/lib/mini-sessions/types";

interface SiteChromeProps {
  children: React.ReactNode;
  miniSessionsCampaign: {
    id: string;
    status: MiniSessionCampaignStatus;
  } | null;
}

export function SiteChrome({ children, miniSessionsCampaign }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <>
      <Header miniSessionsCampaign={miniSessionsCampaign} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
