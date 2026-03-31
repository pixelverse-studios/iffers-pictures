import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuickIntro() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
        <p className="text-lg md:text-xl text-[var(--foreground)] leading-relaxed font-body mb-8">
          Hi, I&apos;m Jennifer — a Bergen County photographer capturing
          life&apos;s most meaningful moments with warmth and intention.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-200"
        >
          Meet Jenn
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
