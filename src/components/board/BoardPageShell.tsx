import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BoardPageShellProps {
  children: ReactNode;
  className?: string;
  container?: "none" | "default" | "wide" | "narrow";
  padding?: "none" | "page" | "section";
  as?: "div" | "section" | "main";
}

const containerClass = {
  none: "",
  default: "board-shell",
  wide: "board-shell",
  narrow: "board-shell-narrow",
};

const paddingClass = {
  none: "",
  page: "pt-hero pb-16 md:pb-24",
  section: "py-16 md:py-24",
};

/**
 * Temporary design-board shell for the client comparison phase.
 * Gives board layouts a consistent soft editorial background and spacing.
 */
export function BoardPageShell({
  children,
  className,
  container = "default",
  padding = "section",
  as: Comp = "section",
}: BoardPageShellProps) {
  return (
    <Comp
      className={cn(
        "bg-[var(--background)] text-[var(--foreground)]",
        paddingClass[padding],
        className
      )}
    >
      {container === "none" ? (
        children
      ) : (
        <div className={containerClass[container]}>{children}</div>
      )}
    </Comp>
  );
}
