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
            className="scale-100 transform-gpu object-cover blur-[3px] transition-all duration-700 ease-in-out will-change-[filter,transform] group-hover:scale-[1.035] group-hover:blur-none"
          />
          <div className="relative z-10 mx-auto max-w-xl text-white before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-32 before:w-[min(90vw,44rem)] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-black/38 before:blur-3xl before:content-['']">
            <h2 className="font-heading text-3xl font-semibold leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.72)] md:text-4xl">
              {item.title}
            </h2>
            {item.description && (
              <p className="mt-2 text-sm leading-6 text-white/90 drop-shadow-[0_1px_9px_rgba(0,0,0,0.68)] md:text-base">
                {item.description}
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 drop-shadow-[0_1px_7px_rgba(0,0,0,0.65)]">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
