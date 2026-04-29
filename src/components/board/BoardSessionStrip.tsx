import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BoardImageAsset } from "./types";

export interface BoardSessionStripItem {
  title: string;
  description?: string;
  href: string;
  image: BoardImageAsset;
}

interface BoardSessionStripProps {
  items: BoardSessionStripItem[];
  className?: string;
}

export function BoardSessionStrip({ items, className }: BoardSessionStripProps) {
  return (
    <div className={cn("divide-y divide-white/25 overflow-hidden", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative flex min-h-[150px] items-center overflow-hidden px-6 py-8 text-center md:min-h-[170px]"
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-black/42 transition-colors duration-300 group-hover:bg-black/34" />
          <div className="relative z-10 mx-auto max-w-xl text-white">
            <h2 className="font-heading text-3xl font-semibold leading-tight md:text-4xl">
              {item.title}
            </h2>
            {item.description && (
              <p className="mt-2 text-sm leading-6 text-white/82 md:text-base">
                {item.description}
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
