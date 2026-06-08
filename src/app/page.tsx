import { HomePageContent } from "@/components/features/homepage";
import {
  getPublicMediaCatalogWithFallback,
  getPublicMediaPlacementsWithFallback,
} from "@/lib/media/server";
import { toPublicGalleryItems } from "@/lib/media/gallery";

export default async function HomePage() {
  const [catalog, placementsResponse] = await Promise.all([
    getPublicMediaCatalogWithFallback(),
    getPublicMediaPlacementsWithFallback(),
  ]);
  const mediaItems = toPublicGalleryItems(catalog.items);

  return (
    <HomePageContent
      mediaItems={mediaItems}
      placements={placementsResponse.placements}
    />
  );
}
