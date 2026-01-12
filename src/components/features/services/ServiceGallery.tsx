"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { GalleryData } from "@/data/services/types";

interface ServiceGalleryProps {
  data: GalleryData;
}

export function ServiceGallery({ data }: ServiceGalleryProps) {
  // Create a masonry-like layout
  const getVariant = (index: number): "teal" | "coral" | "warm" | "neutral" | "gradient" => {
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
    <section className="section bg-white">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="mt-16">
          {/* Masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {data.images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  "animate-fade-in-up",
                  // Make some images span 2 rows for visual interest
                  index === 0 && "md:row-span-2",
                  index === 3 && "md:row-span-2",
                  // Stagger animations
                  index === 1 && "delay-100",
                  index === 2 && "delay-200",
                  index === 3 && "delay-100",
                  index === 4 && "delay-200",
                  index === 5 && "delay-300"
                )}
              >
                <ImagePlaceholder
                  aspectRatio={index === 0 || index === 3 ? "portrait" : image.aspectRatio}
                  variant={getVariant(index)}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  label={image.alt}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
