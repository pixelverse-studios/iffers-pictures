import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BoardSidebarNavItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

interface BoardSidebarNavProps {
  items: BoardSidebarNavItem[];
  title?: React.ReactNode;
  className?: string;
}

export function BoardSidebarNav({
  items,
  title,
  className,
}: BoardSidebarNavProps) {
  return (
    <aside
      className={cn(
        "bg-[var(--foreground)] p-5 text-[var(--background)]",
        className
      )}
    >
      {title && (
        <div className="mb-6 border-b border-white/15 pb-4 font-heading text-xl">
          {title}
        </div>
      )}
      <nav aria-label="Board sidebar navigation" className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200",
              item.active
                ? "bg-[var(--brand)] text-white"
                : "text-[var(--background)]/76 hover:bg-white/10 hover:text-white"
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
