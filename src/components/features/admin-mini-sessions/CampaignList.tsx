import { CalendarDays, FilePlus2, Loader2, RotateCcw } from "lucide-react";
import type { MiniSessionAdminCampaign } from "@/lib/mini-sessions/types";
import type { CampaignFilter } from "./types";
import {
  campaignMatchesFilter,
  formatCampaignTimestamp,
} from "./utils";

const FILTERS: Array<{ value: CampaignFilter; label: string }> = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Drafts" },
  { value: "closed", label: "Closed" },
  { value: "archived", label: "Archived" },
];

interface CampaignListProps {
  campaigns: MiniSessionAdminCampaign[];
  error: string;
  filter: CampaignFilter;
  isLoading: boolean;
  selectedId: string | null;
  onCreate: () => void;
  onFilterChange: (filter: CampaignFilter) => void;
  onReload: () => void;
  onSelect: (campaign: MiniSessionAdminCampaign) => void;
}

export function CampaignList({
  campaigns,
  error,
  filter,
  isLoading,
  selectedId,
  onCreate,
  onFilterChange,
  onReload,
  onSelect,
}: CampaignListProps) {
  const filtered = campaigns.filter((campaign) =>
    campaignMatchesFilter(campaign, filter)
  );

  return (
    <aside className="border-b border-[var(--border)] bg-white lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-white p-4">
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white transition hover:bg-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)]"
        >
          <FilePlus2 className="h-4 w-4" aria-hidden />
          New campaign
        </button>
        <div
          className="mt-3 grid grid-cols-2 gap-1 rounded-sm bg-[var(--background-warm)] p-1"
          aria-label="Filter campaigns"
        >
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              aria-pressed={filter === option.value}
              className={`min-h-9 rounded-sm px-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-[var(--brand-strong)] ${
                filter === option.value
                  ? "bg-white text-[var(--brand-strong)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 p-3" aria-live="polite">
        {isLoading && (
          <div className="flex min-h-40 items-center justify-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading campaigns
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-bold">Campaigns could not be loaded</p>
            <p className="mt-1">{error}</p>
            <button
              type="button"
              onClick={onReload}
              className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-sm border border-red-300 bg-white px-3 font-bold"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="grid min-h-44 place-items-center rounded-sm border border-dashed border-[var(--border)] px-5 text-center">
            <div>
              <CalendarDays className="mx-auto h-7 w-7 text-[var(--brand)]" aria-hidden />
              <p className="mt-3 text-sm font-bold">No {filter} campaigns</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Create a campaign or choose another filter.
              </p>
            </div>
          </div>
        )}

        {!isLoading &&
          !error &&
          filtered.map((campaign) => {
            const selected = selectedId === campaign.id;

            return (
              <button
                key={campaign.id}
                type="button"
                onClick={() => onSelect(campaign)}
                aria-pressed={selected}
                className={`w-full rounded-sm border p-4 text-left transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)] ${
                  selected
                    ? "border-[var(--brand-strong)] bg-[#e4edf4] shadow-[inset_3px_0_0_var(--brand-strong)]"
                    : "border-[var(--border)] bg-white hover:border-[var(--brand)]"
                }`}
              >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className={`block truncate text-sm font-bold ${selected ? "text-[#1f3041]" : "text-[var(--foreground)]"}`}>
                    {campaign.headline || "Untitled Mini Session"}
                  </span>
                </span>
                <StatusBadge status={campaign.status} />
              </span>
              {campaign.summary && (
                <span className={`mt-3 line-clamp-2 block text-xs leading-relaxed ${selected ? "text-[#43586c]" : "text-[var(--text-muted)]"}`}>
                  {campaign.summary}
                </span>
              )}
              <span className={`mt-3 flex flex-wrap justify-end gap-2 text-[11px] font-semibold ${selected ? "text-[#43586c]" : "text-[var(--text-muted)]"}`}>
                <span>{formatCampaignTimestamp(campaign.updatedAt)}</span>
              </span>
              </button>
            );
          })}
      </div>
    </aside>
  );
}

function StatusBadge({ status }: { status: MiniSessionAdminCampaign["status"] }) {
  const tone = {
    draft: "bg-slate-100 text-slate-700",
    live: "bg-emerald-100 text-emerald-800",
    sold_out: "bg-amber-100 text-amber-800",
    closed: "bg-stone-100 text-stone-700",
    archived: "bg-red-50 text-red-700",
  }[status];
  return (
    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${tone}`}>
      {status.replace("_", " ")}
    </span>
  );
}
