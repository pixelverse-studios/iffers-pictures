import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BoardImageAsset } from "./types";

export interface BoardMosaicItem extends BoardImageAsset {
  label?: string;
  href?: string;
}

interface BoardImageMosaicProps {
  items: BoardMosaicItem[];
  className?: string;
}

export function BoardImageMosaic({ items, className }: BoardImageMosaicProps) {
  const visibleItems = items.slice(0, 5);

  return (
    <div className={cn("grid gap-2 md:grid-cols-12", className)}>
      {visibleItems.map((item, index) => {
        const large = index === 0;
        const content = (
          <>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
            {item.label && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                  {item.label}
                </p>
              </div>
            )}
          </>
        );

        const classes = cn(
          "group relative block overflow-hidden bg-[var(--background-warm)]",
          large
            ? "min-h-[360px] md:col-span-6 md:row-span-2"
            : "min-h-[176px] md:col-span-3"
        );

        return item.href ? (
          <Link key={`${item.alt}-${index}`} href={item.href} className={classes}>
            {content}
          </Link>
        ) : (
          <div key={`${item.alt}-${index}`} className={classes}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
