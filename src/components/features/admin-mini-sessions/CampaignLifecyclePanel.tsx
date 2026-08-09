"use client";

import { Archive, Check, Copy, EyeOff, Radio, XCircle } from "lucide-react";
import type { MiniSessionCampaignStatus } from "@/lib/mini-sessions/types";
import type { CampaignLifecycleAction } from "./types";
import type { PublishReadinessItem } from "./utils";

interface CampaignLifecyclePanelProps {
  campaignExists: boolean;
  isBusy: boolean;
  isDirty: boolean;
  onAction: (action: CampaignLifecycleAction) => void;
  readiness: PublishReadinessItem[];
  status: MiniSessionCampaignStatus;
}

export function CampaignLifecyclePanel({
  campaignExists,
  isBusy,
  isDirty,
  onAction,
  readiness,
  status,
}: CampaignLifecyclePanelProps) {
  const canPublish = readiness.every((item) => item.ready);
  const publishable = ["draft", "sold_out", "closed"].includes(status);
  const disabled = !campaignExists || isDirty || isBusy;

  return (
    <section className="mt-5 rounded-sm border border-[var(--border)] bg-white p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
            Campaign lifecycle
          </p>
          <h3 className="mt-1 font-heading text-2xl font-semibold">
            {status === "archived" ? "Archived history" : "Launch and availability"}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {isDirty
              ? "Save the current edits before changing lifecycle state or duplicating this campaign."
              : "Server-confirmed actions update the campaign first, then report live-site cache refresh separately."}
          </p>
        </div>
        <span className="w-fit rounded-full bg-[var(--background-warm)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--foreground)]">
          {status.replace("_", " ")}
        </span>
      </div>

      {publishable && (
        <div className="mt-5 rounded-sm bg-[var(--background-warm)] p-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--foreground)]">
            Publish readiness
          </p>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {readiness.map((item) => (
              <li
                key={item.key}
                className={`flex gap-3 rounded-sm border bg-white p-3 text-sm ${
                  item.ready ? "border-emerald-200" : "border-amber-300"
                }`}
              >
                {item.ready ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                )}
                <span>
                  <span className="block font-bold">{item.label}</span>
                  {!item.ready && (
                    <span className="mt-1 block leading-relaxed text-[var(--text-secondary)]">
                      {item.blocker}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton
          label="Duplicate as draft"
          icon={<Copy className="h-4 w-4" aria-hidden />}
          disabled={disabled}
          onClick={() => onAction("duplicate")}
        />
        {publishable && (
          <ActionButton
            label={status === "draft" ? "Publish campaign" : "Reopen campaign"}
            icon={<Radio className="h-4 w-4" aria-hidden />}
            disabled={disabled || !canPublish}
            primary
            onClick={() => onAction("publish")}
          />
        )}
        {status === "live" && (
          <ActionButton
            label="Mark sold out"
            icon={<EyeOff className="h-4 w-4" aria-hidden />}
            disabled={disabled}
            onClick={() => onAction("mark-sold-out")}
          />
        )}
        {(status === "live" || status === "sold_out") && (
          <ActionButton
            label="Close campaign"
            icon={<XCircle className="h-4 w-4" aria-hidden />}
            disabled={disabled}
            tone="danger"
            onClick={() => onAction("close")}
          />
        )}
        {(status === "draft" || status === "closed") && (
          <ActionButton
            label="Archive campaign"
            icon={<Archive className="h-4 w-4" aria-hidden />}
            disabled={disabled}
            tone="danger"
            onClick={() => onAction("archive")}
          />
        )}
      </div>
      {!campaignExists && (
        <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">
          Save this new draft before using lifecycle actions.
        </p>
      )}
    </section>
  );
}

function ActionButton({
  disabled,
  icon,
  label,
  onClick,
  primary = false,
  tone = "default",
}: {
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
  tone?: "default" | "danger";
}) {
  const toneClass = primary
    ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white hover:bg-[var(--brand)]"
    : tone === "danger"
      ? "border-red-300 bg-white text-red-800 hover:bg-red-50"
      : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--brand)]";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)] ${toneClass}`}
    >
      {icon}
      {label}
    </button>
  );
}
