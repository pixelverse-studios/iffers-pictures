import Image from "next/image";
import { PORTFOLIO_ITEMS } from "../portfolioData";

const ROWS = [
  {
    label: "Engagement",
    items: PORTFOLIO_ITEMS.filter((i) => i.eventType === "Engagement"),
  },
  {
    label: "Gender Reveal",
    items: PORTFOLIO_ITEMS.filter((i) => i.eventType === "Gender Reveal"),
  },
  {
    label: "Maternity",
    items: PORTFOLIO_ITEMS.filter((i) => i.eventType === "Maternity"),
  },
];

function FilmRow({ label, items }: { label: string; items: typeof PORTFOLIO_ITEMS }) {
  return (
    <div>
      {/* Row label */}
      <p className="text-xs tracking-[0.25em] uppercase font-medium text-[var(--text-muted)] mb-3 pl-6 md:pl-8">
        {label}
      </p>

      {/* Scroll container — bleeds to edges */}
      <div className="relative">
        {/* Edge fade — left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
        />
        {/* Edge fade — right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
        />

        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:-mx-8 md:px-8"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="snap-start shrink-0 w-[78vw] sm:w-[52vw] md:w-[42vw] lg:w-[420px] group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm shadow-sm">
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 768px) 52vw, (max-width: 1024px) 42vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                {/* Badge — fades on hover */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-[10px] font-medium text-white/85 uppercase tracking-[0.1em]">
                    {item.eventType}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/55 mb-1">
                      {item.eventType}
                    </p>
                    <p className="text-sm font-heading font-semibold text-white">
                      View Gallery
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Filmstrip — horizontally scrolling rows grouped by event type.
 * Contact-sheet / film-reel aesthetic. Snap scrolling, full-bleed rows.
 */
export function Filmstrip() {
  return (
    <div className="space-y-10">
      {ROWS.map((row) => (
        <FilmRow key={row.label} label={row.label} items={row.items} />
      ))}
    </div>
  );
}
