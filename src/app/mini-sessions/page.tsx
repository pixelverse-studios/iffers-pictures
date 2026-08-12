import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MiniSessionsPage,
  MiniSessionsSchema,
} from "@/components/features/mini-sessions";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveMiniSessionCampaignResult } from "@/lib/mini-sessions/server";
import { sanitizeMiniSessionsUtmParams } from "@/lib/mini-sessions/utm";

const PAGE_URL = `${SITE_CONFIG.url}/mini-sessions`;

interface MiniSessionsRouteProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getActiveMiniSessionCampaignResult();

  if (result.status !== "available") {
    return {
      title: "Mini Sessions",
      description: "Limited-release photography mini sessions from Iffer's Pictures.",
      robots: { index: false, follow: true },
      alternates: { canonical: PAGE_URL },
    };
  }

  const { campaign } = result;
  const title = campaign.metaTitle || `${campaign.publicLabel} | ${SITE_CONFIG.name}`;
  const description = campaign.metaDescription || campaign.summary;
  const image = campaign.heroMedia?.src ?? `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title,
      description,
      type: "website",
      url: PAGE_URL,
      images: [{ url: image, alt: campaign.heroMedia?.alt ?? title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function MiniSessionsRoute({
  searchParams,
}: MiniSessionsRouteProps) {
  const [result, rawSearchParams] = await Promise.all([
    getActiveMiniSessionCampaignResult(),
    searchParams,
  ]);

  if (result.status !== "available") notFound();

  const utmParams = sanitizeMiniSessionsUtmParams(rawSearchParams);

  return (
    <>
      <MiniSessionsSchema campaign={result.campaign} />
      <MiniSessionsPage campaign={result.campaign} utmParams={utmParams} />
    </>
  );
}
