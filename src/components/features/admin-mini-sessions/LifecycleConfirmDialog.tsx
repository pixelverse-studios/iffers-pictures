"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Loader2 } from "lucide-react";
import type { CampaignLifecycleAction } from "./types";

const ACTION_COPY: Record<
  CampaignLifecycleAction,
  { title: string; consequence: string; confirmLabel: string }
> = {
  duplicate: {
    title: "Duplicate this campaign?",
    consequence:
      "A separate draft will be created and opened. The original campaign will not change.",
    confirmLabel: "Create duplicate",
  },
  publish: {
    title: "Publish this campaign?",
    consequence:
      "This campaign will become the active public Mini Sessions offer. Any currently active campaign will be closed.",
    confirmLabel: "Publish campaign",
  },
  "mark-sold-out": {
    title: "Mark this campaign sold out?",
    consequence:
      "The public page will remain available, but booking controls will be replaced by the inquiry path.",
    confirmLabel: "Mark sold out",
  },
  close: {
    title: "Close this campaign?",
    consequence:
      "The public Mini Sessions page and promotional surfaces will stop showing this campaign after cache refresh.",
    confirmLabel: "Close campaign",
  },
  archive: {
    title: "Archive this campaign?",
    consequence:
      "The campaign will move to read-only history and disappear from normal editing. It will not be deleted.",
    confirmLabel: "Archive campaign",
  },
};

interface LifecycleConfirmDialogProps {
  action: CampaignLifecycleAction;
  campaignName: string;
  error: string;
  isBusy: boolean;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function LifecycleConfirmDialog({
  action,
  campaignName,
  error,
  isBusy,
  onClose,
  onConfirm,
  returnFocusRef,
}: LifecycleConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [calVerified, setCalVerified] = useState(false);
  const copy = ACTION_COPY[action];

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusTarget = returnFocusRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      requestAnimationFrame(() => focusTarget?.focus());
    };
  }, [returnFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lifecycle-confirm-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!isBusy) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-sm border border-[var(--border)] bg-white p-0 shadow-2xl backdrop:bg-slate-950/65"
    >
      <div className="p-5 md:p-7">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
          Confirm lifecycle action
        </p>
        <h2 id="lifecycle-confirm-title" className="mt-2 font-heading text-3xl font-semibold">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm font-bold text-[var(--foreground)]">
          {campaignName || "Untitled Mini Session"}
        </p>
        <p className="mt-4 leading-7 text-[var(--text-secondary)]">
          {copy.consequence}
        </p>

        {action === "publish" && (
          <label className="mt-5 flex cursor-pointer gap-3 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <input
              type="checkbox"
              checked={calVerified}
              onChange={(event) => setCalVerified(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand-strong)]"
            />
            <span>
              I verified the Cal.com event name, date, duration, location,
              availability, and required deposit match this campaign.
            </span>
          </label>
        )}

        {error && (
          <div role="alert" className="mt-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-900">
            <p className="font-bold">The action did not complete</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="min-h-11 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={async () => {
              if (await onConfirm()) onClose();
            }}
            disabled={isBusy || (action === "publish" && !calVerified)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBusy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {isBusy ? "Working…" : copy.confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
