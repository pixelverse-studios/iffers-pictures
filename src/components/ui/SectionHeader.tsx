import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--foreground)] leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={cn(
          "accent-line mt-6",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
