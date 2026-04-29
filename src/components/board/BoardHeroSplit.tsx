import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BoardAction, BoardImageAsset } from "./types";

interface BoardHeroSplitProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image: BoardImageAsset;
  primaryAction?: BoardAction;
  secondaryAction?: BoardAction;
  note?: React.ReactNode;
  imagePriority?: boolean;
  reverse?: boolean;
  className?: string;
}

export function BoardHeroSplit({
  eyebrow,
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
  note,
  imagePriority = false,
  reverse = false,
  className,
}: BoardHeroSplitProps) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch",
        reverse && "lg:grid-cols-[1.05fr_0.95fr]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-h-[420px] flex-col justify-center bg-[var(--brand-strong)] p-8 text-white md:p-12",
          reverse && "lg:order-2"
        )}
      >
        {eyebrow && (
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <div className="mt-6 max-w-xl text-base leading-8 text-white/78">
            {description}
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-strong)] transition-all duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {primaryAction.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}

        {note && <div className="mt-8 text-sm leading-7 text-white/65">{note}</div>}
      </div>

      <div className={cn("relative min-h-[420px] overflow-hidden", reverse && "lg:order-1")}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={imagePriority}
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
