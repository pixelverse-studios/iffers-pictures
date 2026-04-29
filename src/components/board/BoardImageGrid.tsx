import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BoardImageAsset } from "./types";

export interface BoardImageGridItem extends BoardImageAsset {
  label?: string;
  sublabel?: string;
}

interface BoardImageGridProps {
  items: BoardImageGridItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const columnClass = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const imageSizes = {
  2: "(max-width: 768px) 100vw, 50vw",
  3: "(max-width: 768px) 100vw, 33vw",
  4: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
};

export function BoardImageGrid({
  items,
  className,
  columns = 3,
}: BoardImageGridProps) {
  return (
    <div className={cn("grid gap-2", columnClass[columns], className)}>
      {items.map((item, index) => (
        <figure
          key={`${item.alt}-${index}`}
          className="group overflow-hidden bg-[var(--background-warm)]"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={imageSizes[columns]}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
          {(item.label || item.sublabel) && (
            <figcaption className="border-x border-b border-[var(--border)] bg-[var(--surface)] p-4">
              {item.label && (
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {item.label}
                </p>
              )}
              {item.sublabel && (
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {item.sublabel}
                </p>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
