import { HomePageContent } from "@/components/features/homepage";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

interface HomePageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return <HomePageContent initialLayoutVariantId={initialLayoutVariantId} />;
}
