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
