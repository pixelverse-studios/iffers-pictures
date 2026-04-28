import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { SESSIONS } from "@/lib/constants";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

const heroImage =
  "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev/events/bridal-shower/bridal-shower-08.jpg";

const imageSet = [
  PORTFOLIO_ITEMS.find((item) => item.subCategory === "Family"),
  PORTFOLIO_ITEMS.find((item) => item.subCategory === "Maternity"),
  PORTFOLIO_ITEMS.find((item) => item.subCategory === "Engagement"),
  PORTFOLIO_ITEMS.find((item) => item.subCategory === "Baby Shower"),
].filter(Boolean);

const pageMocks = [
  {
    route: "/",
    title: "Home",
    role: "Emotional entry point",
    headline: "A cinematic opening that makes Jenn feel personal first, services second.",
    flow: ["Full-bleed feeling hero", "Meet Jenn story card", "Session pathways", "Proof quote", "Inquiry handoff"],
  },
  {
    route: "/about",
    title: "About",
    role: "Trust and voice",
    headline: "A magazine profile for Jenn, grounded in the long-form narrative already approved.",
    flow: ["Portrait-led intro", "Chaptered bio", "Teacher patience proof", "Approach quote", "Soft CTA"],
  },
  {
    route: "/services",
    title: "Sessions",
    role: "Decision hub",
    headline: "A guided chooser that helps visitors find the right kind of session quickly.",
    flow: ["Session finder", "Horizontal service panels", "Comparison cues", "Gallery previews", "Contact prompt"],
  },
  {
    route: "/services/[slug]",
    title: "Session Detail",
    role: "Conversion page",
    headline: "One reusable service story format for Events, Family, Maternity, Couples, and Portrait.",
    flow: ["Service promise", "Expectation timeline", "Bright gallery", "Testimonials", "FAQ + inquiry"],
  },
  {
    route: "/portfolio",
    title: "Portfolio",
    role: "Visual proof",
    headline: "A gallery-first page that feels curated, not like a filter control dropped above a masonry grid.",
    flow: ["Category rail", "Editorial image walls", "Micro captions", "Selected stories", "Inquiry CTA"],
  },
  {
    route: "/testimonials",
    title: "Testimonials",
    role: "Social proof",
    headline: "A testimonial reading room with fewer boxes and stronger quote hierarchy.",
    flow: ["Featured client quote", "Session-grouped proof", "Review carousel", "Reassurance notes", "Inquiry CTA"],
  },
  {
    route: "/investment",
    title: "Investment",
    role: "Package confidence",
    headline: "A calm pricing explainer that says custom without feeling vague.",
    flow: ["Custom investment promise", "Session inclusions", "Process notes", "What affects quote", "Inquiry CTA"],
  },
  {
    route: "/faq",
    title: "FAQ",
    role: "Objection handling",
    headline: "A searchable-feeling answer page with question groups that mirror the booking journey.",
    flow: ["Top concerns", "Booking", "Delivery", "Session-specific answers", "Contact fallback"],
  },
  {
    route: "/contact",
    title: "Inquire",
    role: "Lead capture",
    headline: "A split inquiry experience that feels like the beginning of a conversation.",
    flow: ["Warm invite", "Form", "What happens next", "Contact/social", "Jenn sign-off"],
  },
  {
    route: "/image-review",
    title: "Image Review",
    role: "Internal tool",
    headline: "Keep this utility functional and visually quieter than the marketing pages.",
    flow: ["Operational header", "Review queue", "Image state", "Bulk actions", "Status summary"],
  },
];

function MiniImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[6px] ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="320px" />
    </div>
  );
}

export default function DesignMockupPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#241c17]">
      <nav className="fixed left-1/2 top-4 z-50 flex w-[min(1120px,92vw)] -translate-x-1/2 items-center justify-between rounded-full border border-[#241c17]/10 bg-[#f7f1e8]/82 px-5 py-3 shadow-[0_20px_80px_rgba(36,28,23,0.12)] backdrop-blur-xl">
        <Link href="/" className="font-heading text-lg font-semibold">
          Iffer&apos;s Pictures
        </Link>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5b4d] md:flex">
          <a href="#flow">Flow</a>
          <a href="#pages">Pages</a>
          <a href="#system">System</a>
        </div>
        <a
          href="#pages"
          className="rounded-full bg-[#241c17] px-4 py-2 text-sm font-semibold text-[#fffaf2]"
        >
          View Mockups
        </a>
      </nav>

      <section className="relative min-h-[92vh] px-5 pb-16 pt-32 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-6 max-w-xl text-sm font-semibold uppercase tracking-[0.24em] text-[#8d6b4f]">
              Cohesive redesign concept
            </p>
            <h1 className="max-w-6xl font-heading text-[clamp(3.1rem,8vw,8.8rem)] font-semibold leading-[0.9] tracking-normal">
              The feeling, then the photograph.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f5147] md:text-xl">
              A warmer editorial system for Jenn&apos;s site: cinematic image
              chapters, calm copy blocks, bright galleries, and a booking path
              that feels personal from the first scroll.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pages"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#241c17] px-7 py-4 font-semibold text-[#fffaf2]"
              >
                Review page mockups <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#system"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#241c17]/20 px-7 py-4 font-semibold text-[#241c17]"
              >
                See the system
              </a>
            </div>
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute right-0 top-0 h-[74%] w-[76%] overflow-hidden rounded-[8px] shadow-[0_30px_110px_rgba(36,28,23,0.22)]">
              <Image
                src={heroImage}
                alt="Bride laughing by a floral shower backdrop"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 620px"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[64%] rounded-[8px] bg-[#fffaf2] p-5 shadow-[0_24px_70px_rgba(36,28,23,0.18)]">
              <div className="grid grid-cols-2 gap-2">
                {imageSet.map((item) => (
                  <MiniImage
                    key={item!.id}
                    src={item!.src}
                    alt={item!.alt}
                    className="aspect-[4/5]"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-[#6b5b4d]">
                Small, human moments become recurring page motifs instead of
                isolated gallery assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="flow" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <h2 className="max-w-xl font-heading text-5xl font-semibold leading-none md:text-7xl">
              One site, one emotional arc.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#5f5147]">
              Every page should move visitors from recognition to trust to
              action: see the feeling, understand Jenn&apos;s process, choose a
              session, then inquire.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-12">
            {[
              ["Arrive", "Cinematic proof that Jenn captures feeling, not just coverage.", "md:col-span-7"],
              ["Relate", "About and testimonials make Jenn feel patient, warm, and real.", "md:col-span-5"],
              ["Choose", "Sessions and investment pages explain what fits without overwhelming.", "md:col-span-5"],
              ["Trust", "Portfolio, FAQs, and process details answer the quiet doubts.", "md:col-span-7"],
              ["Inquire", "Contact becomes a friendly next step, not a cold form.", "md:col-span-12"],
            ].map(([title, text, span]) => (
              <div
                key={title}
                className={`${span} min-h-[190px] rounded-[8px] border border-[#241c17]/10 bg-[#fffaf2] p-7`}
              >
                <h3 className="font-heading text-3xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#6b5b4d]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pages" className="bg-[#241c17] px-5 py-24 text-[#fffaf2] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b48c]">
                Page mockups
              </p>
              <h2 className="max-w-4xl font-heading text-5xl font-semibold leading-none md:text-7xl">
                A shared layout language for every route.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#d9cfc4]/78">
              These are page-level wireframe mockups, not final production
              screens. They define hierarchy, flow, and reusable section logic.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-12">
            {pageMocks.map((page, index) => (
              <article
                key={page.route}
                className={`rounded-[8px] border border-[#fffaf2]/12 bg-[#fffaf2]/7 p-6 ${
                  index === 0 || index === 3 || index === 8
                    ? "md:col-span-6"
                    : "md:col-span-3"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#d7b48c]">
                    {page.route}
                  </span>
                  <span className="rounded-full border border-[#fffaf2]/15 px-3 py-1 text-xs text-[#d9cfc4]/70">
                    {page.role}
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-semibold">
                  {page.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#d9cfc4]/78">
                  {page.headline}
                </p>
                <div className="mt-6 space-y-2">
                  {page.flow.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-[#fffaf2]/88">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d7b48c]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-heading text-5xl font-semibold leading-none md:text-7xl">
                The visual system.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#5f5147]">
                The direction is “warm editorial documentary”: paper-like
                backgrounds, charcoal typography, muted blue-green brand
                accents, soft sand highlights, and image-led chapters.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                [Camera, "Image chapters", "Every page opens or pivots with a real image plane."],
                [Heart, "Jenn's voice", "Copy blocks stay first-person and calm instead of generic studio language."],
                [MessageCircle, "Proof woven in", "Testimonials become contextual, not isolated review cards."],
                [Sparkles, "Bright galleries", "Gallery treatment remains luminous and emotionally warm."],
              ].map(([Icon, title, text]) => {
                const TypedIcon = Icon as typeof Camera;
                return (
                  <div key={title as string} className="rounded-[8px] bg-[#fffaf2] p-7">
                    <TypedIcon className="h-6 w-6 text-[#8d6b4f]" />
                    <h3 className="mt-6 font-heading text-2xl font-semibold">
                      {title as string}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#6b5b4d]">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-5">
            {SESSIONS.map((session) => (
              <div
                key={session.slug}
                className="rounded-[8px] border border-[#241c17]/10 bg-transparent p-5"
              >
                <p className="font-heading text-2xl font-semibold">
                  {session.shortName}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#6b5b4d]">
                  {session.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
