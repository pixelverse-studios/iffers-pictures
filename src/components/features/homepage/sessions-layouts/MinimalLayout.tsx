import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SESSIONS } from "@/lib/constants";

/** Clean text-only list with brand accent dots */
export function MinimalLayout() {
  return (
    <div className="max-w-2xl mx-auto divide-y divide-[var(--border)]">
      {SESSIONS.map((session) => (
        <Link
          key={session.slug}
          href={`/services/${session.slug}`}
          className="group flex items-center justify-between py-5 first:pt-0 last:pb-0"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[var(--brand)] shrink-0" />
            <div>
              <h3 className="text-base font-heading font-semibold text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors">
                {session.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-0.5">
                {session.description}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-4" />
        </Link>
      ))}
    </div>
  );
}
