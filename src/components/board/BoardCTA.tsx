import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BoardAction } from "./types";

interface BoardCTAProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action: BoardAction;
  secondaryAction?: BoardAction;
  className?: string;
  tone?: "blue" | "light";
}

export function BoardCTA({
  title,
  description,
  action,
  secondaryAction,
  className,
  tone = "light",
}: BoardCTAProps) {
  const isBlue = tone === "blue";

  return (
    <section
      className={cn(
        "flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10",
        isBlue
          ? "bg-[var(--brand-strong)] text-white"
          : "bg-[var(--background-warm)] text-[var(--foreground)]",
        className
      )}
    >
      <div className="max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold leading-tight md:text-3xl">
          {title}
        </h2>
        {description && (
          <div
            className={cn(
              "mt-3 text-sm leading-7 md:text-base",
              isBlue ? "text-white/74" : "text-[var(--text-secondary)]"
            )}
          >
            {description}
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <Link
          href={action.href}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200",
            isBlue
              ? "bg-white text-[var(--brand-strong)] hover:bg-white/90"
              : "bg-[var(--brand-strong)] text-white hover:bg-[var(--brand)]"
          )}
        >
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition-all duration-200",
              isBlue
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]"
            )}
          >
            {secondaryAction.label}
          </Link>
        )}
      </div>
    </section>
  );
}
