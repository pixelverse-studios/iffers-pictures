import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-warm)]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-10 leading-relaxed">
            It would be an honor to capture your story.
          </p>
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center gap-3 font-medium",
              "rounded-full transition-all duration-300",
              "bg-[var(--teal)] text-white",
              "hover:bg-[var(--teal-dark)] hover:gap-4",
              "shadow-lg shadow-[var(--teal)]/25 hover:shadow-xl hover:shadow-[var(--teal)]/30",
              "px-10 py-5 text-lg"
            )}
          >
            Inquire Here
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
