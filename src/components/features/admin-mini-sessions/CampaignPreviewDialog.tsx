"use client";

import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { MiniSessionsPage } from "@/components/features/mini-sessions";
import type { AdminMediaItem } from "@/lib/media/types";
import type { CampaignEditorState } from "./types";
import { draftToPreviewCampaign } from "./utils";

interface CampaignPreviewDialogProps {
  editor: CampaignEditorState;
  onClose: () => void;
  publishedMedia: AdminMediaItem[];
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function CampaignPreviewDialog({
  editor,
  onClose,
  publishedMedia,
  returnFocusRef,
}: CampaignPreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const campaign = draftToPreviewCampaign(editor, publishedMedia);

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
      aria-labelledby="mini-sessions-preview-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1500px] overflow-hidden rounded-sm border border-[var(--border)] bg-white p-0 shadow-2xl backdrop:bg-slate-950/65 md:h-[calc(100dvh-3rem)] md:w-[calc(100%-3rem)]"
    >
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--border)] bg-white px-4 py-3 md:px-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
              Authenticated draft preview
            </p>
            <h2
              id="mini-sessions-preview-title"
              className="mt-1 font-heading text-2xl font-semibold"
            >
              {editor.draft.internalName || "Untitled Mini Session"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)]"
            aria-label="Close campaign preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <MiniSessionsPage campaign={campaign} previewMode utmParams={{}} />
        </div>
      </div>
    </dialog>
  );
}
