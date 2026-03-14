"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { GalleryData } from "@/data/services/types";
import {
  getPortfolioForService,
  type PortfolioItem,
} from "@/components/features/portfolio/portfolioData";
import { Lightbox } from "@/components/features/portfolio/Lightbox";

interface ServiceGalleryProps {
  data: GalleryData;
  serviceSlug?: string;
}

export function ServiceGallery({ data, serviceSlug }: ServiceGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const portfolioItems = useMemo(
    () => (serviceSlug ? getPortfolioForService(serviceSlug) : []),
    [serviceSlug]
  );
  const hasRealImages = portfolioItems.length > 0;

  // Derive unique sub-categories — only show filter when there are multiple
  const subCategories = useMemo(() => {
    const subs = [...new Set(portfolioItems.map((i) => i.subCategory))];
    return subs.length > 1 ? subs : [];
  }, [portfolioItems]);

  const filtered = activeSub
    ? portfolioItems.filter((i) => i.subCategory === activeSub)
    : portfolioItems;

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="mt-16">
          {hasRealImages ? (
            <>
              {subCategories.length > 0 && (
                <SubCategoryFilter
                  categories={subCategories}
                  active={activeSub}
                  onSelect={setActiveSub}
                />
              )}
              <RealGallery
                items={filtered}
                onImageClick={setLightboxIndex}
              />
            </>
          ) : (
            <PlaceholderGallery data={data} />
          )}
        </div>
      </div>

      {hasRealImages && lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

function SubCategoryFilter({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string | null;
  onSelect: (sub: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-body transition-colors duration-200 cursor-pointer border",
          active === null
            ? "border-[var(--teal)] bg-[var(--teal)]/10 text-[var(--teal)] font-medium"
            : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--teal-light)]"
        )}
      >
        All
      </button>
      {categories.map((sub) => (
        <button
          key={sub}
          onClick={() => onSelect(sub)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-body transition-colors duration-200 cursor-pointer border",
            active === sub
              ? "border-[var(--teal)] bg-[var(--teal)]/10 text-[var(--teal)] font-medium"
              : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--teal-light)]"
          )}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}

function RealGallery({
  items,
  onImageClick,
}: {
  items: PortfolioItem[];
  onImageClick: (index: number) => void;
}) {
  return (
    <div className="columns-2 md:columns-3 gap-3 [column-gap:0.75rem]">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="break-inside-avoid mb-3 group cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src={item.src}
              alt={item.alt}
              width={800}
              height={
                item.aspectRatio === "portrait"
                  ? 1067
                  : item.aspectRatio === "square"
                    ? 800
                    : 600
              }
              sizes="(max-width: 768px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaceholderGallery({ data }: { data: GalleryData }) {
  const getVariant = (
    index: number
  ): "teal" | "coral" | "warm" | "neutral" | "gradient" => {
    const variants: ("teal" | "coral" | "warm" | "neutral" | "gradient")[] = [
      "gradient",
      "teal",
      "coral",
      "warm",
      "neutral",
      "gradient",
    ];
    return variants[index % variants.length];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {data.images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            "animate-fade-in-up",
            index === 0 && "md:row-span-2",
            index === 3 && "md:row-span-2",
            index === 1 && "delay-100",
            index === 2 && "delay-200",
            index === 3 && "delay-100",
            index === 4 && "delay-200",
            index === 5 && "delay-300"
          )}
        >
          <ImagePlaceholder
            aspectRatio={
              index === 0 || index === 3 ? "portrait" : image.aspectRatio
            }
            variant={getVariant(index)}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            label={image.alt}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
