import { cn } from "@/lib/utils";

interface BoardQuoteBandProps {
  quote: React.ReactNode;
  attribution?: React.ReactNode;
  className?: string;
  tone?: "blue" | "light";
}

export function BoardQuoteBand({
  quote,
  attribution,
  className,
  tone = "blue",
}: BoardQuoteBandProps) {
  const isBlue = tone === "blue";

  return (
    <figure
      className={cn(
        "px-6 py-10 text-center md:px-12 md:py-14",
        isBlue
          ? "bg-[var(--brand-strong)] text-white"
          : "bg-[var(--background-warm)] text-[var(--foreground)]",
        className
      )}
    >
      <blockquote className="mx-auto max-w-3xl font-heading text-2xl italic leading-relaxed md:text-3xl">
        {quote}
      </blockquote>
      {attribution && (
        <figcaption
          className={cn(
            "mt-6 text-sm",
            isBlue ? "text-white/72" : "text-[var(--text-secondary)]"
          )}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
