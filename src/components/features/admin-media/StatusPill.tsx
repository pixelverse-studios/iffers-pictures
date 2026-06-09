import type { MediaStatus } from "@/lib/media/types";
import { STATUS_CLASSES, STATUS_COPY } from "./constants";

export function StatusPill({ status }: { status: MediaStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-bold ring-1 ${STATUS_CLASSES[status]}`}
    >
      {STATUS_COPY[status]}
    </span>
  );
}
