import { HomePageContent } from "@/components/features/homepage";
import { getPublicMediaCatalogWithFallback } from "@/lib/media/server";
import { toPublicGalleryItems } from "@/lib/media/gallery";

export default async function HomePage() {
  const catalog = await getPublicMediaCatalogWithFallback();
  const mediaItems = toPublicGalleryItems(catalog.items);

  return <HomePageContent mediaItems={mediaItems} />;
}
