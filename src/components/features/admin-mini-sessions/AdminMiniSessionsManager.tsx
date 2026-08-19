"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, FilePlus2 } from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import {
  createMiniSessionCampaign,
  archiveMiniSessionCampaign,
  closeMiniSessionCampaign,
  duplicateMiniSessionCampaign,
  getMiniSessionCampaign,
  listMiniSessionCampaigns,
  markMiniSessionCampaignSoldOut,
  publishMiniSessionCampaign,
  updateMiniSessionCampaign,
} from "@/lib/mini-sessions/client";
import { MiniSessionsApiError } from "@/lib/mini-sessions/errors";
import type { MiniSessionAdminCampaign } from "@/lib/mini-sessions/types";
import { CampaignEditor } from "./CampaignEditor";
import { CampaignList } from "./CampaignList";
import type {
  CampaignEditorState,
  CampaignFilter,
  CampaignLifecycleAction,
  StaleCampaignState,
} from "./types";
import {
  campaignToDraft,
  createEmptyCampaignDraft,
  getPublishReadiness,
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
  const [isLifecycleMutating, setIsLifecycleMutating] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [message, setMessage] = useState("");
  const [lifecycleError, setLifecycleError] = useState("");
  const [lifecycleMessage, setLifecycleMessage] = useState("");
  const [lifecycleWarning, setLifecycleWarning] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stale, setStale] = useState<StaleCampaignState | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const publishedMedia = useMemo(
    () => mediaItems.filter((item) => item.status === "published"),
    [mediaItems]
  );
  const readiness = useMemo(
    () => (editor ? getPublishReadiness(editor.draft, publishedMedia) : []),
    [editor, publishedMedia]
  );

  const refreshCampaigns = useCallback(async () => {
    const response = await listMiniSessionCampaigns(true);
    setCampaigns(response.campaigns);
  }, []);

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
      sourceStatus: "draft",
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

  const changeEditor = useCallback((
    update: (current: CampaignEditorState) => CampaignEditorState
  ) => {
    setEditor((current) => (current ? update(current) : current));
    setIsDirty(true);
    setMessage("");
    setLifecycleError("");
    setLifecycleMessage("");
    setLifecycleWarning("");
    setRequestError("");
    setStale(null);
  }, []);

  async function saveCampaign() {
    if (!editor || isSaving) return;
    const validation = validateCampaignDraft(editor.draft);
    setErrors(validation.errors);
    setMessage("");
    setRequestError("");
    setStale(null);
    setLifecycleError("");
    setLifecycleMessage("");
    setLifecycleWarning("");
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
      setFilter(filterForCampaign(saved));
      setIsDirty(false);
      setErrors({});
      setMessage(
        response.revalidation?.error
          ? "Campaign saved. The live-site refresh needs another attempt."
          : `Saved ${saved.headline}.`
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

  async function runLifecycleAction(
    action: CampaignLifecycleAction
  ): Promise<boolean> {
    if (
      !editor?.campaignId ||
      !editor.sourceUpdatedAt ||
      isDirty ||
      isLifecycleMutating
    ) {
      setLifecycleError(
        isDirty
          ? "Save the current edits before changing campaign status."
          : "Save this campaign before using lifecycle actions."
      );
      return false;
    }

    if (action === "publish" && readiness.some((item) => !item.ready)) {
      setLifecycleError("Finish the items listed in the publish section first.");
      return false;
    }

    setIsLifecycleMutating(true);
    setLifecycleError("");
    setLifecycleMessage("");
    setLifecycleWarning("");
    setMessage("");
    setRequestError("");
    setStale(null);

    try {
      const mutate = {
        duplicate: duplicateMiniSessionCampaign,
        publish: publishMiniSessionCampaign,
        "mark-sold-out": markMiniSessionCampaignSoldOut,
        close: closeMiniSessionCampaign,
        archive: archiveMiniSessionCampaign,
      }[action];
      const response = await mutate(
        editor.campaignId,
        editor.sourceUpdatedAt
      );
      const saved = response.campaign;
      setCampaigns((current) =>
        reconcileCampaignsAfterLifecycle(current, saved, action)
      );
      setEditor(editorFromCampaign(saved));
      setFilter(filterForCampaign(saved));
      setIsDirty(false);
      setErrors({});
      setLifecycleMessage(lifecycleSuccessMessage(action, saved.headline));
      if (response.revalidation?.error) {
        setLifecycleWarning(
          "Your change was saved. The public website may take a few minutes to catch up."
        );
      }
      if (action === "publish") {
        try {
          await refreshCampaigns();
        } catch {
          setLifecycleWarning((current) =>
            current
              ? `${current} Reload this dashboard to refresh the campaign list.`
              : "Published successfully, but the campaign list could not be refreshed. Reload this dashboard to see the latest statuses."
          );
        }
      }
      return true;
    } catch (error) {
      setLifecycleError(getCampaignErrorMessage(error));
      if (
        error instanceof MiniSessionsApiError &&
        error.kind === "stale_conflict"
      ) {
        try {
          const latest = (
            await getMiniSessionCampaign(editor.campaignId)
          ).campaign;
          setCampaigns((current) => upsertCampaign(current, latest));
          setStale({
            latest,
            message:
              "This campaign changed before the lifecycle action completed. Load the latest saved version, review it, and try again.",
          });
        } catch {
          // Keep the current editor intact when the recovery fetch also fails.
        }
      }
      return false;
    } finally {
      setIsLifecycleMutating(false);
    }
  }

  function resetFeedback() {
    setErrors({});
    setRequestError("");
    setMessage("");
    setLifecycleError("");
    setLifecycleMessage("");
    setLifecycleWarning("");
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
            Create, preview, and publish seasonal session offers.
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
              isLifecycleMutating={isLifecycleMutating}
              isSaving={isSaving}
              lifecycleError={lifecycleError}
              lifecycleMessage={lifecycleMessage}
              lifecycleWarning={lifecycleWarning}
              message={message}
              publishedMedia={publishedMedia}
              requestError={requestError}
              stale={stale}
              readiness={readiness}
              onChange={changeEditor}
              onLifecycleAction={runLifecycleAction}
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
                    Create a draft and add the details clients need before they book.
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

export function reconcileCampaignsAfterLifecycle(
  campaigns: MiniSessionAdminCampaign[],
  saved: MiniSessionAdminCampaign,
  action: CampaignLifecycleAction
): MiniSessionAdminCampaign[] {
  const reconciled =
    action === "publish"
      ? campaigns.map((campaign) =>
          campaign.id !== saved.id &&
          (campaign.status === "live" || campaign.status === "sold_out")
            ? { ...campaign, status: "closed" as const, updatedAt: saved.updatedAt }
            : campaign
        )
      : campaigns;

  return upsertCampaign(reconciled, saved);
}

function editorFromCampaign(
  campaign: MiniSessionAdminCampaign
): CampaignEditorState {
  return {
    campaignId: campaign.id,
    sourceStatus: campaign.status,
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

function filterForCampaign(campaign: MiniSessionAdminCampaign): CampaignFilter {
  if (campaign.status === "live" || campaign.status === "sold_out") {
    return "active";
  }
  return campaign.status;
}

function lifecycleSuccessMessage(
  action: CampaignLifecycleAction,
  campaignName: string
): string {
  const verb = {
    duplicate: "Created and opened a separate draft for",
    publish: "Published",
    "mark-sold-out": "Marked sold out",
    close: "Closed",
    archive: "Archived",
  }[action];
  return `${verb} ${campaignName}.`;
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
