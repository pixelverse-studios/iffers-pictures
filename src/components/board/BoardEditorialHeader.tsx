import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BoardEditorialHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function BoardEditorialHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: BoardEditorialHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-5 flex items-center gap-4",
            centered && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-[var(--brand)]/45" aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-strong)]">
            {eyebrow}
          </p>
          <span
            className={cn("h-px w-10 bg-[var(--brand)]/45", !centered && "hidden")}
            aria-hidden
          />
        </div>
      )}

      <h1 className="font-heading text-4xl font-semibold leading-[1.02] text-[var(--foreground)] md:text-5xl lg:text-6xl">
        {title}
      </h1>

      {description && (
        <div className="mt-5 text-base leading-8 text-[var(--text-secondary)] md:text-lg">
          {description}
        </div>
      )}
    </header>
  );
}
