import { HomePageContent } from "@/components/features/homepage";
import {
  getPublicMediaCatalogWithFallback,
  getPublicMediaPlacementsWithFallback,
} from "@/lib/media/server";
import { toPublicGalleryItems } from "@/lib/media/gallery";
import { getActiveMiniSessionCampaign } from "@/lib/mini-sessions/server";

export default async function HomePage() {
  const [catalog, placementsResponse, miniSessionCampaign] = await Promise.all([
    getPublicMediaCatalogWithFallback(),
    getPublicMediaPlacementsWithFallback(),
    getActiveMiniSessionCampaign(),
  ]);
  const mediaItems = toPublicGalleryItems(catalog.items);

  return (
    <HomePageContent
      mediaItems={mediaItems}
      placements={placementsResponse.placements}
      miniSessionCampaign={miniSessionCampaign}
    />
  );
}
