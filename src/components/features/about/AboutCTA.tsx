import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ABOUT_PAGE_COPY } from "@/data/page-copy";

export function AboutCTA() {
  return (
    <section className="py-10 md:py-14 bg-[var(--background-warm)]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-10 leading-relaxed">
            {ABOUT_PAGE_COPY.cta.title}
          </p>
          <Link
            href={ABOUT_PAGE_COPY.cta.href}
            className={cn(
              "inline-flex items-center justify-center gap-3 font-medium",
              "rounded-full transition-all duration-300",
              "bg-[var(--brand-vivid)] text-white",
              "hover:bg-[var(--brand-strong)] hover:gap-4",
              "shadow-lg shadow-[var(--brand-vivid)]/25 hover:shadow-xl hover:shadow-[var(--brand-vivid)]/30",
              "px-10 py-5 text-lg"
            )}
          >
            {ABOUT_PAGE_COPY.cta.label}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
