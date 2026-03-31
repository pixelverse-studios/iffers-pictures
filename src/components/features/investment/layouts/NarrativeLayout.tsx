import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SESSION_INCLUSIONS } from "../data";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

/** Map each session slug to a portfolio sub-category for its hero image. */
const SESSION_IMAGE_MAP: Record<string, string> = {
  events: "Baby Shower",
  family: "Family",
  maternity: "Maternity",
  "couples-engagement": "Engagement",
  portrait: "Portrait",
};

/** Brief narrative descriptions that tell each session's story. */
const SESSION_NARRATIVES: Record<string, string> = {
  events:
    "Every celebration deserves to be remembered — the candid laughter, the carefully chosen details, the joy on everyone's faces. I'll move through your event quietly, capturing the genuine moments that make your celebration yours.",
  family:
    "Families are beautifully chaotic, and that's exactly what makes them worth photographing. Whether it's tickle fights on a blanket or a quiet walk together, I'll capture the connection that makes your family, your family.",
  maternity:
    "This fleeting season of anticipation and wonder deserves to be held onto. In a location that feels like you, we'll create images that celebrate the beauty of becoming — images your little one will treasure someday.",
  "couples-engagement":
    "Your love story doesn't need a script. We'll explore a place that means something to you, and I'll photograph the way you naturally are together — the stolen glances, the inside jokes, the quiet comfort of being side by side.",
  portrait:
    "Whether it's a professional headshot or a personal portrait, this session is about showing up as you. Relaxed, confident, and real — we'll capture an image that feels like the best version of yourself.",
};

/** Starting-at prices for each session type. */
const SESSION_STARTING_PRICES: Record<string, number> = {
  events: 350,
  family: 275,
  maternity: 275,
  "couples-engagement": 300,
  portrait: 200,
};

function getSessionImage(slug: string): string | undefined {
  const sub = SESSION_IMAGE_MAP[slug];
  return PORTFOLIO_ITEMS.find((p) => p.subCategory === sub)?.src;
}

export function NarrativeLayout() {
  return (
    <section>
      {SESSION_INCLUSIONS.map((session, i) => {
        const imageSrc = getSessionImage(session.slug);
        const isEven = i % 2 !== 0;
        const price = SESSION_STARTING_PRICES[session.slug];

        return (
          <div
            key={session.slug}
            className={cn(
              "border-b border-[var(--border)] last:border-b-0",
              isEven ? "bg-[var(--background)]" : "bg-[var(--background-warm)]"
            )}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2",
                  "min-h-[500px] md:min-h-[600px]"
                )}
              >
                {/* Image side */}
                <div
                  className={cn(
                    "relative aspect-[4/5] md:aspect-auto",
                    isEven ? "md:order-2" : ""
                  )}
                >
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={`${session.name} photography by Iffer's Pictures`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>

                {/* Text side */}
                <div
                  className={cn(
                    "flex flex-col justify-center px-8 md:px-16 lg:px-20 py-10 md:py-14",
                    isEven ? "md:order-1" : ""
                  )}
                >
                  {/* Eyebrow */}
                  <p className="text-[var(--teal)] font-medium tracking-[0.2em] uppercase text-xs mb-6">
                    {session.tagline}
                  </p>

                  {/* Session name */}
                  <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-6 leading-tight">
                    {session.name}
                  </h2>

                  {/* Narrative paragraph */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base md:text-lg">
                    {SESSION_NARRATIVES[session.slug]}
                  </p>

                  {/* Starting price */}
                  {price && (
                    <p className="text-sm tracking-wide text-[var(--text-muted)] uppercase mb-8">
                      Starting at{" "}
                      <span className="text-[var(--foreground)] font-heading text-lg normal-case">
                        ${price}
                      </span>
                    </p>
                  )}

                  {/* Included features */}
                  <ul className="space-y-3 mb-10">
                    {session.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[var(--text-secondary)] text-sm"
                      >
                        <div className="w-1 h-1 rounded-full bg-[var(--teal)] mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-200 text-sm"
                  >
                    Book This Session
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
