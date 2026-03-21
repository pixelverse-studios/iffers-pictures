import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface EventsHubCTAProps {
  className?: string;
}

export function EventsHubCTA({ className }: EventsHubCTAProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        "bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)]",
        className
      )}
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white leading-tight mb-6">
            Let&apos;s Capture Your Celebration
          </h2>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
            Every gathering is worth remembering. Reach out today and let&apos;s talk about how to cover your event&mdash;big or small, formal or completely chaotic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[var(--teal-dark)] hover:bg-white/90 shadow-lg"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
