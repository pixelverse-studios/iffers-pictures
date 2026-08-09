"use client";

import { useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import type { MiniSessionBookingOptionStatus } from "@/lib/mini-sessions/types";
import type {
  BookingOptionDraft,
  CampaignEditorState,
  CampaignLifecycleAction,
  StaleCampaignState,
} from "./types";
import { CampaignLifecyclePanel } from "./CampaignLifecyclePanel";
import { CampaignPreviewDialog } from "./CampaignPreviewDialog";
import { LifecycleConfirmDialog } from "./LifecycleConfirmDialog";
import type { PublishReadinessItem } from "./utils";
import {
  createEmptyBookingOption,
  MAX_BOOKING_OPTIONS,
  MAX_INCLUSIONS,
} from "./utils";

interface CampaignEditorProps {
  editor: CampaignEditorState;
  errors: Record<string, string>;
  isDirty: boolean;
  isLifecycleMutating: boolean;
  isSaving: boolean;
  lifecycleError: string;
  lifecycleMessage: string;
  lifecycleWarning: string;
  message: string;
  publishedMedia: AdminMediaItem[];
  requestError: string;
  stale: StaleCampaignState | null;
  readiness: PublishReadinessItem[];
  onChange: (editor: CampaignEditorState) => void;
  onLifecycleAction: (action: CampaignLifecycleAction) => Promise<boolean>;
  onLoadLatest: () => void;
  onSave: () => void;
}

export function CampaignEditor({
  editor,
  errors,
  isDirty,
  isLifecycleMutating,
  isSaving,
  lifecycleError,
  lifecycleMessage,
  lifecycleWarning,
  message,
  publishedMedia,
  requestError,
  stale,
  readiness,
  onChange,
  onLifecycleAction,
  onLoadLatest,
  onSave,
}: CampaignEditorProps) {
  const [inclusion, setInclusion] = useState("");
  const [mediaQuery, setMediaQuery] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pendingAction, setPendingAction] =
    useState<CampaignLifecycleAction | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const { draft } = editor;
  const isArchived = editor.sourceStatus === "archived";
  const matchingMedia = useMemo(() => {
    const query = mediaQuery.trim().toLowerCase();
    if (!query) return publishedMedia;
    return publishedMedia.filter((item) =>
      [item.filename, item.alt, item.key].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [mediaQuery, publishedMedia]);

  function updateDraft(patch: Partial<typeof draft>) {
    onChange({ ...editor, draft: { ...draft, ...patch } });
  }

  function addInclusion() {
    const value = inclusion.trim();
    if (!value || draft.inclusions.length >= MAX_INCLUSIONS) return;
    updateDraft({ inclusions: [...draft.inclusions, value] });
    setInclusion("");
  }

  function addBookingOption() {
    if (draft.bookingOptions.length >= MAX_BOOKING_OPTIONS) return;
    updateDraft({
      bookingOptions: [
        ...draft.bookingOptions,
        createEmptyBookingOption(draft.bookingOptions.length),
      ],
    });
  }

  function updateBookingOption(index: number, patch: Partial<BookingOptionDraft>) {
    updateDraft({
      bookingOptions: draft.bookingOptions.map((option, optionIndex) =>
        optionIndex === index ? { ...option, ...patch } : option
      ),
    });
  }

  function moveBookingOption(index: number, direction: -1 | 1) {
    const destination = index + direction;
    if (destination < 0 || destination >= draft.bookingOptions.length) return;
    const options = [...draft.bookingOptions];
    [options[index], options[destination]] = [options[destination], options[index]];
    updateDraft({
      bookingOptions: options.map((option, optionIndex) => ({
        ...option,
        sortOrder: optionIndex,
      })),
    });
  }

  function requestLifecycleAction(action: CampaignLifecycleAction) {
    setPendingAction(action);
  }

  return (
    <article className="min-w-0 bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-4 py-5 md:px-7 md:py-7">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">
                {editor.campaignId ? "Campaign editor" : "New draft"}
              </p>
              {isDirty && (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-amber-800">
                  Unsaved changes
                </span>
              )}
            </div>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--foreground)]">
              {draft.internalName || "Untitled Mini Session"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Save campaign content here. Publishing and live-site controls are handled in the campaign lifecycle view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              ref={previewButtonRef}
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold text-[var(--foreground)] hover:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)]"
            >
              <Eye className="h-4 w-4" aria-hidden /> Preview
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isArchived || isSaving || !isDirty}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white transition hover:bg-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)]"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Save className="h-4 w-4" aria-hidden />
              )}
              {isSaving ? "Saving…" : "Save draft"}
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3" aria-live="polite">
          {requestError && (
            <Notice tone="error" title="Draft was not saved">
              {requestError} Your edits are still here.
            </Notice>
          )}
          {message && (
            <Notice tone="success" title="Draft saved">
              {message}
            </Notice>
          )}
          {lifecycleMessage && (
            <Notice tone="success" title="Campaign updated">
              {lifecycleMessage}
            </Notice>
          )}
          {lifecycleWarning && (
            <Notice tone="warning" title="Campaign saved; live refresh delayed">
              {lifecycleWarning}
            </Notice>
          )}
          {lifecycleError && !pendingAction && (
            <Notice tone="error" title="Lifecycle action failed">
              {lifecycleError}
            </Notice>
          )}
          {stale && (
            <div className="rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <div>
                  <p className="font-bold">A newer version exists</p>
                  <p className="mt-1 leading-relaxed">{stale.message}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={onLoadLatest}
                      disabled={!stale.latest}
                      className="min-h-9 rounded-sm border border-amber-400 bg-white px-3 font-bold disabled:opacity-50"
                    >
                      Load latest version
                    </button>
                    <span className="self-center text-xs font-semibold">
                      Keep editing to preserve this unsaved version.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <CampaignLifecyclePanel
          campaignExists={Boolean(editor.campaignId)}
          isBusy={isLifecycleMutating}
          isDirty={isDirty}
          onAction={requestLifecycleAction}
          readiness={readiness}
          status={editor.sourceStatus}
        />

        {isArchived && (
          <div className="mt-5 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-bold">Archived campaigns are read-only.</p>
            <p className="mt-1">
              Duplicate this campaign to reuse its content in a new draft.
            </p>
          </div>
        )}

        <fieldset disabled={isArchived} className="mt-6 space-y-5">
          <EditorSection
            eyebrow="Internal setup"
            title="Campaign basics"
            description="Labels used to identify and organize this campaign."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Internal campaign name"
                value={draft.internalName}
                error={errors.internalName}
                required
                onChange={(value) => updateDraft({ internalName: value })}
                placeholder="Fall Minis 2026"
              />
              <Field
                label="Public label"
                value={draft.publicLabel}
                onChange={(value) => updateDraft({ publicLabel: value })}
                placeholder="Limited fall dates"
              />
              <Field
                label="Session length (minutes)"
                value={draft.durationMinutes}
                error={errors.durationMinutes}
                inputMode="numeric"
                onChange={(value) => updateDraft({ durationMinutes: value })}
              />
              <label className="flex min-h-12 items-center gap-3 rounded-sm border border-[var(--border)] bg-[var(--background-warm)] px-4 py-3 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={draft.homepageFeatured}
                  onChange={(event) =>
                    updateDraft({ homepageFeatured: event.target.checked })
                  }
                  className="h-4 w-4 accent-[var(--brand-strong)]"
                />
                Feature this campaign on the homepage
              </label>
            </div>
          </EditorSection>

          <EditorSection
            eyebrow="Public identity"
            title="Headline and story"
            description="The primary campaign copy shown to visitors."
          >
            <div className="space-y-4">
              <Field
                label="Headline"
                value={draft.headline}
                onChange={(value) => updateDraft({ headline: value })}
                placeholder="Fall Mini Sessions"
              />
              <TextField
                label="Short summary"
                value={draft.summary}
                maxLength={320}
                rows={3}
                onChange={(value) => updateDraft({ summary: value })}
              />
              <TextField
                label="Full description"
                value={draft.description}
                maxLength={5000}
                rows={7}
                onChange={(value) => updateDraft({ description: value })}
              />
            </div>
          </EditorSection>

          <EditorSection
            eyebrow="Offer details"
            title="Price, date, and location"
            description="Dollar fields are saved as exact integer cents."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Total price"
                value={draft.totalPrice}
                error={errors.totalPrice}
                prefix="$"
                inputMode="decimal"
                onChange={(value) => updateDraft({ totalPrice: value })}
              />
              <Field
                label="Booking deposit"
                value={draft.deposit}
                error={errors.deposit}
                prefix="$"
                inputMode="decimal"
                onChange={(value) => updateDraft({ deposit: value })}
              />
              <Field
                label="Date summary"
                value={draft.dateSummary}
                onChange={(value) => updateDraft({ dateSummary: value })}
                placeholder="October 17–18, 2026"
              />
              <Field
                label="Location summary"
                value={draft.locationSummary}
                onChange={(value) => updateDraft({ locationSummary: value })}
                placeholder="Cliffside Park, NJ"
              />
              <div className="md:col-span-2">
                <TextField
                  label="Remaining balance note"
                  value={draft.balanceDueText}
                  rows={3}
                  onChange={(value) => updateDraft({ balanceDueText: value })}
                  placeholder="The remaining balance is paid separately to the photographer."
                />
              </div>
            </div>
          </EditorSection>

          <EditorSection
            eyebrow="Campaign image"
            title="Published hero media"
            description="Only published media from this website can be selected."
          >
            <label className="relative block">
              <span className="sr-only">Search published media</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
              <input
                type="search"
                value={mediaQuery}
                onChange={(event) => setMediaQuery(event.target.value)}
                placeholder="Search filename or alt text"
                className="min-h-11 w-full rounded-sm border border-[var(--border)] bg-white pl-10 pr-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
              />
            </label>
            <div className="mt-4 grid max-h-80 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-4">
              {matchingMedia.map((item) => {
                const selected = draft.heroMediaId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateDraft({ heroMediaId: item.id })}
                    aria-pressed={selected}
                    className={`group relative overflow-hidden rounded-sm border-2 bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-strong)] ${
                      selected ? "border-[var(--brand-strong)]" : "border-transparent"
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-[var(--background-warm)]">
                      <Image src={item.src} alt={item.alt || item.filename} fill sizes="(max-width: 640px) 45vw, 180px" className="object-cover" />
                    </div>
                    <span className="block truncate px-2 py-2 text-xs font-bold">
                      {item.alt || item.filename}
                    </span>
                    {selected && (
                      <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--brand-strong)] text-white">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {matchingMedia.length === 0 && (
              <div className="mt-4 rounded-sm border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]">
                <ImageIcon className="mx-auto mb-2 h-6 w-6" aria-hidden />
                No published media matches this search.
              </div>
            )}
            {draft.heroMediaId !== null && (
              <button
                type="button"
                onClick={() => updateDraft({ heroMediaId: null })}
                className="mt-3 min-h-9 text-sm font-bold text-[var(--text-secondary)] underline underline-offset-4"
              >
                Clear hero selection
              </button>
            )}
          </EditorSection>

          <EditorSection
            eyebrow="What is included"
            title="Session inclusions"
            description={`Add up to ${MAX_INCLUSIONS} concise benefits.`}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={inclusion}
                onChange={(event) => setInclusion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addInclusion();
                  }
                }}
                placeholder="20-minute photography session"
                className="min-h-11 flex-1 rounded-sm border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
                aria-label="New inclusion"
              />
              <button
                type="button"
                onClick={addInclusion}
                disabled={!inclusion.trim() || draft.inclusions.length >= MAX_INCLUSIONS}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold disabled:opacity-50"
              >
                <Plus className="h-4 w-4" aria-hidden /> Add inclusion
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {draft.inclusions.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-center gap-3 rounded-sm bg-[var(--background-warm)] px-3 py-2 text-sm">
                  <span className="flex-1">{item}</span>
                  <button
                    type="button"
                    onClick={() => updateDraft({ inclusions: draft.inclusions.filter((_, itemIndex) => itemIndex !== index) })}
                    className="grid h-9 w-9 place-items-center rounded-sm text-red-700 hover:bg-red-50"
                    aria-label={`Remove inclusion ${item}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </EditorSection>

          <EditorSection
            eyebrow="Scheduling"
            title="Booking options"
            description={`Create, order, hide, or sell out up to ${MAX_BOOKING_OPTIONS} Cal.com booking options.`}
            action={
              <button
                type="button"
                onClick={addBookingOption}
                disabled={draft.bookingOptions.length >= MAX_BOOKING_OPTIONS}
                className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-3 text-sm font-bold disabled:opacity-50"
              >
                <Plus className="h-4 w-4" aria-hidden /> Add option
              </button>
            }
          >
            {errors.bookingOptions && <FieldError message={errors.bookingOptions} />}
            <div className="space-y-4">
              {draft.bookingOptions.map((option, index) => (
                <div key={option.clientKey} className="rounded-sm border border-[var(--border)] bg-[var(--background)] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold">Option {index + 1}</p>
                    <div className="flex gap-1">
                      <IconButton label="Move option up" disabled={index === 0} onClick={() => moveBookingOption(index, -1)}><ArrowUp className="h-4 w-4" /></IconButton>
                      <IconButton label="Move option down" disabled={index === draft.bookingOptions.length - 1} onClick={() => moveBookingOption(index, 1)}><ArrowDown className="h-4 w-4" /></IconButton>
                      <IconButton label="Delete option" tone="danger" onClick={() => updateDraft({ bookingOptions: draft.bookingOptions.filter((_, optionIndex) => optionIndex !== index).map((item, optionIndex) => ({ ...item, sortOrder: optionIndex })) })}><Trash2 className="h-4 w-4" /></IconButton>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Option label" required value={option.label} error={errors[`bookingOptions.${index}.label`]} onChange={(value) => updateBookingOption(index, { label: value })} placeholder="Saturday morning" />
                    <SelectField label="Status" value={option.status} onChange={(value) => updateBookingOption(index, { status: value as MiniSessionBookingOptionStatus })} options={[{ value: "open", label: "Open" }, { value: "sold_out", label: "Sold out" }, { value: "hidden", label: "Hidden" }]} />
                    <Field label="Date and time" value={option.dateTimeLabel} onChange={(value) => updateBookingOption(index, { dateTimeLabel: value })} placeholder="Saturday, October 17 · 9 AM–1 PM" />
                    <Field label="Location" value={option.locationLabel} onChange={(value) => updateBookingOption(index, { locationLabel: value })} placeholder="Cliffside Park, NJ" />
                    <div className="md:col-span-2"><Field label="Cal.com booking URL" required value={option.calBookingUrl} error={errors[`bookingOptions.${index}.calBookingUrl`]} onChange={(value) => updateBookingOption(index, { calBookingUrl: value })} placeholder="https://cal.com/iffers-pictures/fall-minis" /></div>
                    <div className="md:col-span-2"><TextField label="Option description" value={option.description} rows={2} onChange={(value) => updateBookingOption(index, { description: value })} /></div>
                  </div>
                </div>
              ))}
              {draft.bookingOptions.length === 0 && (
                <div className="rounded-sm border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]">
                  Add a Cal.com option when this draft is ready for scheduling.
                </div>
              )}
            </div>
          </EditorSection>

          <EditorSection eyebrow="Policies" title="Booking expectations" description="Keep client-facing terms clear before publication.">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Cancellation policy" value={draft.cancellationPolicy} rows={4} onChange={(value) => updateDraft({ cancellationPolicy: value })} />
              <TextField label="Weather policy" value={draft.weatherPolicy} rows={4} onChange={(value) => updateDraft({ weatherPolicy: value })} />
              <TextField label="Lateness policy" value={draft.latenessPolicy} rows={4} onChange={(value) => updateDraft({ latenessPolicy: value })} />
              <TextField label="Additional terms note" value={draft.termsNote} rows={4} onChange={(value) => updateDraft({ termsNote: value })} />
            </div>
          </EditorSection>

          <EditorSection eyebrow="Promotion" title="Homepage campaign callout" description="Optional short copy for promotional site surfaces.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Promo label" value={draft.promoLabel} onChange={(value) => updateDraft({ promoLabel: value })} />
              <Field label="Promo headline" value={draft.promoHeadline} onChange={(value) => updateDraft({ promoHeadline: value })} />
              <div className="md:col-span-2"><TextField label="Promo copy" value={draft.promoCopy} rows={3} onChange={(value) => updateDraft({ promoCopy: value })} /></div>
              <Field label="Promo button label" value={draft.promoCtaLabel} onChange={(value) => updateDraft({ promoCtaLabel: value })} />
              <Field label="Campaign booking button label" required value={draft.ctaLabel} error={errors.ctaLabel} onChange={(value) => updateDraft({ ctaLabel: value })} />
            </div>
          </EditorSection>

          <EditorSection eyebrow="Search visibility" title="SEO metadata" description="Optional search title and description for the public campaign page.">
            <div className="space-y-4">
              <Field label="Meta title" value={draft.metaTitle} onChange={(value) => updateDraft({ metaTitle: value })} />
              <TextField label="Meta description" value={draft.metaDescription} rows={3} maxLength={320} onChange={(value) => updateDraft({ metaDescription: value })} />
            </div>
          </EditorSection>
        </fieldset>

        <div className="sticky bottom-3 z-20 mt-6 flex flex-col gap-3 rounded-sm border border-[var(--border)] bg-white/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-[var(--text-secondary)]">
            {isArchived
              ? "Archived history is read-only."
              : isDirty
                ? "Unsaved edits are protected before navigation."
                : "All campaign edits are saved."}
          </p>
          <button type="button" onClick={onSave} disabled={isArchived || isSaving || !isDirty} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:opacity-55">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
            {isSaving ? "Saving…" : "Save draft"}
          </button>
        </div>
      </div>

      {isPreviewOpen && (
        <CampaignPreviewDialog
          editor={editor}
          onClose={() => setIsPreviewOpen(false)}
          publishedMedia={publishedMedia}
          returnFocusRef={previewButtonRef}
        />
      )}

      {pendingAction && (
        <LifecycleConfirmDialog
          action={pendingAction}
          campaignName={draft.internalName}
          error={lifecycleError}
          isBusy={isLifecycleMutating}
          onClose={() => setPendingAction(null)}
          onConfirm={() => onLifecycleAction(pendingAction)}
          returnFocusRef={previewButtonRef}
        />
      )}
    </article>
  );
}

function EditorSection({ eyebrow, title, description, action, children }: { eyebrow: string; title: string; description: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-[var(--border)] bg-white p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-strong)]">{eyebrow}</p>
          <h3 className="mt-1 font-heading text-2xl font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, error, required = false, prefix, inputMode, placeholder }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; prefix?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; placeholder?: string }) {
  const id = useId();
  return (
    <label className="block text-sm font-bold" htmlFor={id}>
      <span>{label}{required && <span className="text-red-700"> *</span>}</span>
      <span className="relative mt-2 block">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{prefix}</span>}
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} inputMode={inputMode} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`min-h-11 w-full rounded-sm border bg-white pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-soft)] ${prefix ? "pl-7" : "pl-3"} ${error ? "border-red-500" : "border-[var(--border)] focus:border-[var(--brand)]"}`} />
      </span>
      {error && <FieldError id={`${id}-error`} message={error} />}
    </label>
  );
}

function TextField({ label, value, onChange, rows, maxLength, placeholder }: { label: string; value: string; onChange: (value: string) => void; rows: number; maxLength?: number; placeholder?: string }) {
  const id = useId();
  return (
    <label className="block text-sm font-bold" htmlFor={id}>
      <span className="flex justify-between gap-3"><span>{label}</span>{maxLength && <span className="text-xs font-semibold text-[var(--text-muted)]">{value.length}/{maxLength}</span>}</span>
      <textarea id={id} value={value} rows={rows} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full resize-y rounded-sm border border-[var(--border)] bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full rounded-sm border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function IconButton({ label, disabled, tone = "default", onClick, children }: { label: string; disabled?: boolean; tone?: "default" | "danger"; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className={`grid h-9 w-9 place-items-center rounded-sm border border-[var(--border)] bg-white disabled:opacity-35 ${tone === "danger" ? "text-red-700 hover:bg-red-50" : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"}`}>{children}</button>;
}

function FieldError({ id, message }: { id?: string; message: string }) {
  return <span id={id} className="mt-1 block text-xs font-semibold text-red-700">{message}</span>;
}

function Notice({ tone, title, children }: { tone: "success" | "error" | "warning"; title: string; children: React.ReactNode }) {
  const toneClass = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-amber-300 bg-amber-50 text-amber-950",
  }[tone];
  return (
    <div className={`rounded-sm border p-4 text-sm ${toneClass}`}>
      <p className="font-bold">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
