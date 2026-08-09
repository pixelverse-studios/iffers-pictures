"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, FilePlus2 } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import {
  createMiniSessionCampaign,
  getMiniSessionCampaign,
  listMiniSessionCampaigns,
  updateMiniSessionCampaign,
} from "@/lib/mini-sessions/client";
import { MiniSessionsApiError } from "@/lib/mini-sessions/errors";
import type { MiniSessionAdminCampaign } from "@/lib/mini-sessions/types";
import { CampaignEditor } from "./CampaignEditor";
import { CampaignList } from "./CampaignList";
import type {
  CampaignEditorState,
  CampaignFilter,
  StaleCampaignState,
} from "./types";
import {
  campaignToDraft,
  createEmptyCampaignDraft,
  validateCampaignDraft,
} from "./utils";

interface AdminMiniSessionsManagerProps {
  mediaItems: AdminMediaItem[];
  onDirtyChange: (isDirty: boolean) => void;
}

export function AdminMiniSessionsManager({
  mediaItems,
  onDirtyChange,
}: AdminMiniSessionsManagerProps) {
  const [campaigns, setCampaigns] = useState<MiniSessionAdminCampaign[]>([]);
  const [filter, setFilter] = useState<CampaignFilter>("draft");
  const [editor, setEditor] = useState<CampaignEditorState | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stale, setStale] = useState<StaleCampaignState | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const publishedMedia = useMemo(
    () => mediaItems.filter((item) => item.status === "published"),
    [mediaItems]
  );

  const loadCampaigns = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const response = await listMiniSessionCampaigns(true);
      setCampaigns(response.campaigns);
      setEditor((current) => {
        if (current) return current;
        const firstDraft = response.campaigns.find(
          (campaign) => campaign.status === "draft"
        );
        return firstDraft ? editorFromCampaign(firstDraft) : null;
      });
    } catch (error) {
      setLoadError(getCampaignErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCampaigns();
  }, [loadCampaigns]);

  useEffect(() => {
    onDirtyChange(isDirty);
    if (!isDirty) return;

    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty, onDirtyChange]);

  useEffect(() => () => onDirtyChange(false), [onDirtyChange]);

  function confirmDiscard(): boolean {
    return !isDirty || window.confirm("Discard unsaved campaign changes?");
  }

  function createCampaign() {
    if (!confirmDiscard()) return;
    setEditor({
      campaignId: null,
      sourceUpdatedAt: null,
      draft: createEmptyCampaignDraft(),
    });
    resetFeedback();
    setIsDirty(false);
    requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth" }));
  }

  function selectCampaign(campaign: MiniSessionAdminCampaign) {
    if (campaign.id === editor?.campaignId || !confirmDiscard()) return;
    setEditor(editorFromCampaign(campaign));
    setIsDirty(false);
    resetFeedback();
    requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth" }));
  }

  function changeEditor(nextEditor: CampaignEditorState) {
    setEditor(nextEditor);
    setIsDirty(true);
    setMessage("");
    setRequestError("");
    setStale(null);
  }

  async function saveCampaign() {
    if (!editor || isSaving) return;
    const validation = validateCampaignDraft(editor.draft);
    setErrors(validation.errors);
    setMessage("");
    setRequestError("");
    setStale(null);
    if (!validation.input) {
      setRequestError("Review the highlighted fields before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const response = editor.campaignId
        ? await updateMiniSessionCampaign(
            editor.campaignId,
            editor.sourceUpdatedAt as string,
            validation.input
          )
        : await createMiniSessionCampaign(validation.input);
      const saved = response.campaign;
      setCampaigns((current) => upsertCampaign(current, saved));
      setEditor(editorFromCampaign(saved));
      setFilter(saved.status === "draft" ? "draft" : "active");
      setIsDirty(false);
      setErrors({});
      setMessage(
        response.revalidation?.error
          ? "Campaign saved. The live-site refresh needs another attempt."
          : `Saved ${saved.internalName}.`
      );
    } catch (error) {
      setRequestError(getCampaignErrorMessage(error));
      if (
        editor.campaignId &&
        error instanceof MiniSessionsApiError &&
        error.kind === "stale_conflict"
      ) {
        let latest: MiniSessionAdminCampaign | null = null;
        try {
          latest = (await getMiniSessionCampaign(editor.campaignId)).campaign;
          setCampaigns((current) => upsertCampaign(current, latest as MiniSessionAdminCampaign));
        } catch {
          // The unsaved editor remains authoritative until Jenn explicitly reloads.
        }
        setStale({
          latest,
          message:
            "Someone saved this campaign after you opened it. Compare your current edits before choosing whether to load the latest saved version.",
        });
      }
    } finally {
      setIsSaving(false);
    }
  }

  function loadLatest() {
    if (!stale?.latest || !confirmDiscard()) return;
    setEditor(editorFromCampaign(stale.latest));
    setIsDirty(false);
    resetFeedback();
  }

  function resetFeedback() {
    setErrors({});
    setRequestError("");
    setMessage("");
    setStale(null);
  }

  return (
    <section className="min-w-0 lg:min-h-0 lg:overflow-hidden">
      <header className="border-b border-[var(--border)] bg-white px-4 py-5 md:px-7">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
            Seasonal campaigns
          </p>
          <h1 className="mt-1 font-heading text-3xl font-semibold">Mini Sessions</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Build campaign content, offers, imagery, and Cal.com booking options.
          </p>
        </div>
      </header>

      <div className="grid min-h-0 lg:h-[calc(100dvh-106px)] lg:grid-cols-[320px_minmax(0,1fr)] lg:overflow-hidden">
        <CampaignList
          campaigns={campaigns}
          error={loadError}
          filter={filter}
          isLoading={isLoading}
          selectedId={editor?.campaignId ?? null}
          onCreate={createCampaign}
          onFilterChange={setFilter}
          onReload={() => void loadCampaigns()}
          onSelect={selectCampaign}
        />
        <div ref={editorRef} className="min-w-0 lg:min-h-0 lg:overflow-y-auto">
          {editor ? (
            <CampaignEditor
              editor={editor}
              errors={errors}
              isDirty={isDirty}
              isSaving={isSaving}
              message={message}
              publishedMedia={publishedMedia}
              requestError={requestError}
              stale={stale}
              onChange={changeEditor}
              onLoadLatest={loadLatest}
              onSave={() => void saveCampaign()}
            />
          ) : (
            !isLoading && (
              <div className="grid min-h-[28rem] place-items-center p-6 text-center">
                <div className="max-w-md">
                  <CalendarDays className="mx-auto h-10 w-10 text-[var(--brand)]" aria-hidden />
                  <h2 className="mt-4 font-heading text-3xl font-semibold">
                    Start a Mini Sessions campaign
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    Create a draft to add campaign copy, pricing, a published hero image, and booking options.
                  </p>
                  <button
                    type="button"
                    onClick={createCampaign}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white"
                  >
                    <FilePlus2 className="h-4 w-4" aria-hidden /> Create draft
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function editorFromCampaign(
  campaign: MiniSessionAdminCampaign
): CampaignEditorState {
  return {
    campaignId: campaign.id,
    sourceUpdatedAt: campaign.updatedAt,
    draft: campaignToDraft(campaign),
  };
}

function upsertCampaign(
  campaigns: MiniSessionAdminCampaign[],
  campaign: MiniSessionAdminCampaign
): MiniSessionAdminCampaign[] {
  const next = campaigns.filter((item) => item.id !== campaign.id);
  return [campaign, ...next].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );
}

function getCampaignErrorMessage(error: unknown): string {
  if (error instanceof MiniSessionsApiError) {
    if (error.kind === "authentication") {
      return "Your admin session expired. Sign in again before saving.";
    }
    if (error.kind === "stale_conflict") return error.message;
    if (error.kind === "validation") return error.message;
    if (error.kind === "not_configured") {
      return "The Mini Sessions service is not configured for this site.";
    }
    if (error.kind === "upstream_failure") {
      return "The Mini Sessions service is temporarily unavailable. Try again without leaving this editor.";
    }
    return error.message;
  }
  return error instanceof Error ? error.message : "The campaign request failed.";
}
