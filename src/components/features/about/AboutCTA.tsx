import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-warm)]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-4">
            Ready to work together?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Let&apos;s create something beautiful. Reach out and let me know
            what you&apos;re celebrating.
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
            Book Your Session
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
