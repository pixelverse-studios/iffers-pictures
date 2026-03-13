export function CategoryBadge({
  label,
  size = "md",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`absolute ${
        size === "sm" ? "top-2.5 left-2.5 px-2 py-0.5" : "top-3 left-3 px-2.5 py-1"
      } rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none`}
    >
      <span
        className={`font-medium text-white/80 uppercase ${
          size === "sm"
            ? "text-[9px] tracking-[0.1em]"
            : "text-[10px] tracking-[0.12em]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function HoverOverlay({
  label,
  size = "sm",
}: {
  label: string;
  size?: "lg" | "sm";
}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
      <div
        className={`translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out ${
          size === "lg" ? "p-5" : "p-3.5"
        }`}
      >
        <p
          className={`font-medium uppercase text-white/55 mb-1 ${
            size === "lg"
              ? "text-[11px] tracking-[0.15em]"
              : "text-[9px] tracking-[0.2em]"
          }`}
        >
          {label}
        </p>
        <p
          className={`font-heading font-semibold text-white leading-tight ${
            size === "lg" ? "text-base" : "text-[12px]"
          }`}
        >
          View Gallery
        </p>
      </div>
    </div>
  );
}

export const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};
