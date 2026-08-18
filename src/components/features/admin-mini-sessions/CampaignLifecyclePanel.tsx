"use client";

import { Archive, ChevronDown, Copy, Eye, EyeOff, Loader2, Radio, Save, XCircle } from "lucide-react";
import type { MiniSessionCampaignStatus } from "@/lib/mini-sessions/types";
import type { CampaignLifecycleAction } from "./types";
import type { PublishReadinessItem } from "./utils";

interface CampaignLifecyclePanelProps {
  campaignExists: boolean;
  isBusy: boolean;
  isDirty: boolean;
  isSaving: boolean;
  onAction: (action: CampaignLifecycleAction) => void;
  onPreview: () => void;
  onSave: () => void;
  readiness: PublishReadinessItem[];
  status: MiniSessionCampaignStatus;
  previewButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export function CampaignLifecyclePanel({
  campaignExists,
  isBusy,
  isDirty,
  isSaving,
  onAction,
  onPreview,
  onSave,
  readiness,
  status,
  previewButtonRef,
}: CampaignLifecyclePanelProps) {
  const missingItems = readiness.filter((item) => !item.ready);
  const canPublish = missingItems.length === 0;
  const publishable = ["draft", "sold_out", "closed"].includes(status);
  const lifecycleDisabled = !campaignExists || isDirty || isBusy || isSaving;
  const saveLabel = isSaving ? "Saving…" : isDirty ? "Save changes" : "Saved";

  function scrollToSection(targetId: string) {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="sticky bottom-3 z-20 mt-6 rounded-sm border border-[var(--border)] bg-white/95 shadow-[0_18px_50px_-24px_rgba(38,63,82,0.38)] backdrop-blur-md" aria-label="Campaign actions">
      <div className="flex flex-col gap-3 p-3 md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--background-warm)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--foreground)]">
              {campaignExists ? status.replace("_", " ") : "new draft"}
            </span>
            <span aria-live="polite" className={`text-sm font-bold ${isDirty ? "text-amber-800" : "text-[var(--text-secondary)]"}`}>
              {isSaving
                ? "Saving your changes…"
                : isDirty
                  ? "You have unsaved changes"
                  : "All changes saved"}
            </span>
          </div>

          {publishable && missingItems.length > 0 && (
            <details className="group relative w-full md:w-auto">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-sm border border-amber-200 bg-amber-50 px-3 text-sm font-bold text-amber-950 transition hover:border-amber-300 active:translate-y-px [&::-webkit-details-marker]:hidden">
                <span>
                  {missingItems.length} {missingItems.length === 1 ? "item" : "items"} to finish
                </span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden />
              </summary>
              <div className="mt-2 rounded-sm border border-amber-200 bg-amber-50 p-2 md:absolute md:bottom-[calc(100%+0.5rem)] md:right-0 md:w-[28rem] md:shadow-[0_18px_45px_-22px_rgba(38,63,82,0.42)]">
                <p className="px-2 pb-2 pt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-950">
                  Before publishing
                </p>
                <ul className="space-y-1">
                  {missingItems.map((item) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.currentTarget.closest("details")?.removeAttribute("open");
                          scrollToSection(item.targetId);
                        }}
                        className="w-full rounded-sm px-2 py-2 text-left text-sm transition hover:bg-white active:translate-y-px"
                      >
                        <span className="block font-bold text-[var(--foreground)]">{item.label}</span>
                        <span className="mt-0.5 block leading-relaxed text-[var(--text-secondary)]">{item.blocker}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {campaignExists && (
              <ActionButton label="Make a copy" icon={<Copy className="h-4 w-4" aria-hidden />} disabled={lifecycleDisabled} onClick={() => onAction("duplicate")} />
            )}
            {campaignExists && (status === "draft" || status === "closed") && (
              <ActionButton label="Archive" icon={<Archive className="h-4 w-4" aria-hidden />} disabled={lifecycleDisabled} onClick={() => onAction("archive")} danger />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <ActionButton label="Preview" icon={<Eye className="h-4 w-4" aria-hidden />} onClick={onPreview} buttonRef={previewButtonRef} />
            <ActionButton label={saveLabel} icon={isSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />} disabled={status === "archived" || isSaving || !isDirty} onClick={onSave} primary={isDirty} />
            {publishable && <ActionButton label={status === "draft" ? "Publish" : "Put back on website"} icon={<Radio className="h-4 w-4" aria-hidden />} disabled={lifecycleDisabled || !canPublish} onClick={() => onAction("publish")} primary={!isDirty && canPublish} wide />}
            {status === "live" && <ActionButton label="Mark sold out" icon={<EyeOff className="h-4 w-4" aria-hidden />} disabled={lifecycleDisabled} onClick={() => onAction("mark-sold-out")} />}
            {(status === "live" || status === "sold_out") && <ActionButton label="Remove from website" icon={<XCircle className="h-4 w-4" aria-hidden />} disabled={lifecycleDisabled} onClick={() => onAction("close")} danger wide />}
          </div>
        </div>

        {publishable && !campaignExists && <p className="text-xs font-semibold text-[var(--text-muted)]">Save this draft before publishing.</p>}
        {publishable && campaignExists && isDirty && <p className="text-xs font-semibold text-[var(--text-muted)]">Save your changes before publishing.</p>}
        {publishable && campaignExists && !isDirty && missingItems.length === 0 && <p className="text-xs font-semibold text-emerald-800">Everything required is ready to publish.</p>}
      </div>
    </section>
  );
}

function ActionButton({ buttonRef, danger = false, disabled = false, icon, label, onClick, primary = false, wide = false }: { buttonRef?: React.RefObject<HTMLButtonElement | null>; danger?: boolean; disabled?: boolean; icon: React.ReactNode; label: string; onClick: () => void; primary?: boolean; wide?: boolean }) {
  const tone = primary ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white hover:bg-[var(--brand)]" : danger ? "border-red-200 bg-white text-red-800 hover:bg-red-50" : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--brand)]";
  return <button ref={buttonRef} type="button" onClick={onClick} disabled={disabled} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-4 text-sm font-bold transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 ${wide ? "col-span-2" : ""} ${tone}`}>{icon}{label}</button>;
}
