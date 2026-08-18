"use client";

import { memo, useCallback, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ExternalLink,
  GripVertical,
  ImageIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type { AdminMediaItem } from "@/lib/media/types";
import type {
  CampaignDraft,
  CampaignEditorState,
  CampaignLifecycleAction,
  StaleCampaignState,
} from "./types";
import { CampaignLifecyclePanel } from "./CampaignLifecyclePanel";
import { CampaignPreviewDialog } from "./CampaignPreviewDialog";
import { LifecycleConfirmDialog } from "./LifecycleConfirmDialog";
import { RichTextEditor } from "./RichTextEditor";
import { SortableInclusions } from "./SortableInclusions";
import type { PublishReadinessItem } from "./utils";
import {
  createEmptyBookingOption,
  MAX_INCLUSIONS,
  MINI_SESSIONS_CAL_URL,
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
  onChange: (
    update: (current: CampaignEditorState) => CampaignEditorState
  ) => void;
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pendingAction, setPendingAction] =
    useState<CampaignLifecycleAction | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const { draft } = editor;
  const isArchived = editor.sourceStatus === "archived";

  const updateDraft = useCallback(
    (
      update:
        | Partial<CampaignDraft>
        | ((current: CampaignDraft) => CampaignDraft)
    ) => {
      onChange((currentEditor) => ({
        ...currentEditor,
        draft:
          typeof update === "function"
            ? update(currentEditor.draft)
            : { ...currentEditor.draft, ...update },
      }));
    },
    [onChange]
  );
  const selectHeroMedia = useCallback(
    (heroMediaId: number | null) => updateDraft({ heroMediaId }),
    [updateDraft]
  );

  function addInclusion() {
    const value = inclusion.trim();
    if (!value || draft.inclusions.length >= MAX_INCLUSIONS) return;
    updateDraft((current) => ({
      ...current,
      inclusions:
        current.inclusions.length >= MAX_INCLUSIONS
          ? current.inclusions
          : [...current.inclusions, value],
    }));
    setInclusion("");
  }

  function updateFaq(
    faqId: string,
    patch: Partial<(typeof draft.faqs)[number]>
  ) {
    updateDraft((current) => ({
      ...current,
      faqs: current.faqs.map((faq) =>
        faq.id === faqId ? { ...faq, ...patch } : faq
      ),
    }));
  }

  function moveFaq(faqId: string, to: number) {
    updateDraft((current) => {
      const from = current.faqs.findIndex((faq) => faq.id === faqId);
      if (from < 0 || to < 0 || to >= current.faqs.length || from === to) {
        return current;
      }
      const next = [...current.faqs];
      const [faq] = next.splice(from, 1);
      next.splice(to, 0, faq);
      return {
        ...current,
        faqs: next.map((item, sortOrder) => ({ ...item, sortOrder })),
      };
    });
  }

  function updateBookingUrl(value: string) {
    updateDraft((current) => {
      const option =
        current.bookingOptions[0] ?? createEmptyBookingOption(0);
      return {
        ...current,
        bookingOptions: [{ ...option, calBookingUrl: value }],
      };
    });
  }

  function requestLifecycleAction(action: CampaignLifecycleAction) {
    setPendingAction(action);
  }

  return (
    <article className="min-w-0 bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-4 py-5 md:px-7 md:py-7">
        <div className="border-b border-[var(--border)] pb-5">
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
              {draft.headline || "New Mini Session"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Add the details clients need, preview the page, and publish it when you&apos;re ready.
            </p>
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
            <Notice tone="warning" title="Saved, but the website may take a moment to update">
              {lifecycleWarning}
            </Notice>
          )}
          {lifecycleError && !pendingAction && (
            <Notice tone="error" title="We couldn't update the campaign">
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

        {isArchived && (
          <div className="mt-5 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-bold">Archived campaigns are read-only.</p>
            <p className="mt-1">
              Duplicate this campaign to reuse its content in a new draft.
            </p>
          </div>
        )}

        <fieldset disabled={isArchived} className="mt-6 space-y-5">
          <EditorSection id="mini-session-details" eyebrow="Session details" title="Tell clients about this Mini Session" description="This is the main information clients will see on the page.">
            <div className="space-y-4">
              <Field
                label="Small label above the headline"
                value={draft.publicLabel}
                onChange={(value) => updateDraft({ publicLabel: value })}
                placeholder="Mini Sessions"
              />
              <Field
                label="Headline"
                value={draft.headline}
                error={errors.headline}
                required
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
              <Field label="Experience heading" value={draft.experienceHeadline} onChange={(value) => updateDraft({ experienceHeadline: value })} />
              <RichTextEditor label="Experience" value={draft.description} onChange={(value) => updateDraft({ description: value })} helperText="Use formatting and lists when they make the story easier to read." />
            </div>
          </EditorSection>

          <EditorSection id="mini-session-offer" eyebrow="Price and place" title="Price and location" description="Set the pricing and general location here. Dates and times come from Cal.com.">
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
                label="Location summary"
                value={draft.locationSummary}
                onChange={(value) => updateDraft({ locationSummary: value })}
                placeholder="Bergen County, NJ"
              />
              <div className="flex min-h-11 items-start gap-3 rounded-sm bg-[var(--background-warm)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <CalendarDays
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-strong)]"
                  aria-hidden
                />
                <p className="leading-6">
                  Manage dates and times in Cal.com. Clients will see the live
                  availability in the booking calendar.
                </p>
              </div>
              <div className="md:col-span-2">
                <TextField
                  label="Remaining balance note"
                  value={draft.balanceDueText}
                  rows={3}
                  onChange={(value) => updateDraft({ balanceDueText: value })}
                />
              </div>
            </div>
          </EditorSection>

          <EditorSection id="mini-session-photo" eyebrow="Main photo" title="Choose the photo for this page" description="Select one of the photos that is already available on the website.">
            <HeroMediaPicker
              items={publishedMedia}
              selectedId={draft.heroMediaId}
              onSelect={selectHeroMedia}
            />
          </EditorSection>

          <EditorSection id="mini-session-inclusions" eyebrow="What clients receive" title="What&apos;s included" description="Add what clients receive with this session.">
            <Field
              label="Section heading"
              value={draft.inclusionsHeadline}
              error={errors.inclusionsHeadline}
              required
              maxLength={200}
              onChange={(value) => updateDraft({ inclusionsHeadline: value })}
              placeholder="Session Details"
            />
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={inclusion}
                onChange={(event) => setInclusion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addInclusion();
                  }
                }}
                placeholder="10 edited digital images"
                className="min-h-11 flex-1 rounded-sm border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
                aria-label="New inclusion"
              />
              <button
                type="button"
                onClick={addInclusion}
                disabled={!inclusion.trim() || draft.inclusions.length >= MAX_INCLUSIONS}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold disabled:opacity-50"
              >
                <Plus className="h-4 w-4" aria-hidden /> Add item
              </button>
            </div>
            <SortableInclusions
              items={draft.inclusions}
              onChange={(inclusions) => updateDraft({ inclusions })}
            />
          </EditorSection>

          <EditorSection id="mini-session-vibe" eyebrow="The vibe" title="Set the tone" description="This section appears beneath the Experience and What's Included columns.">
            <div className="space-y-4">
              <Field label="Vibe heading" value={draft.vibeHeadline} onChange={(value) => updateDraft({ vibeHeadline: value })} />
              <RichTextEditor label="Vibe content" value={draft.vibeContent} onChange={(value) => updateDraft({ vibeContent: value })} />
            </div>
          </EditorSection>

          <EditorSection id="mini-session-faqs" eyebrow="Questions" title="Mini Sessions FAQs" description="These questions appear only on the Mini Sessions page. Drag them into the order you want clients to see.">
            <div className="space-y-4">
              <div className="grid gap-4 rounded-sm border border-[var(--border)] bg-white p-4 md:grid-cols-2">
                <Field
                  label="Small label above FAQs"
                  value={draft.faqEyebrow}
                  error={errors.faqEyebrow}
                  required
                  maxLength={80}
                  onChange={(value) => updateDraft({ faqEyebrow: value })}
                  placeholder="Good to know"
                />
                <Field
                  label="FAQ section heading"
                  value={draft.faqHeadline}
                  error={errors.faqHeadline}
                  required
                  maxLength={200}
                  onChange={(value) => updateDraft({ faqHeadline: value })}
                  placeholder="Mini Session questions."
                />
                <div className="md:col-span-2">
                  <TextField
                    label="FAQ section introduction"
                    value={draft.faqIntro}
                    error={errors.faqIntro}
                    required
                    maxLength={600}
                    rows={3}
                    onChange={(value) => updateDraft({ faqIntro: value })}
                    placeholder="Everything clients need to know before their session."
                  />
                </div>
              </div>
              {errors.faqs && <p className="text-sm font-bold text-red-700">{errors.faqs}</p>}
              {draft.faqs.map((faq, index) => (
                <div key={faq.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); moveFaq(event.dataTransfer.getData("text/plain"), index); }} className="rounded-sm border border-[var(--border)] bg-[var(--background-warm)] p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <span draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", faq.id)} className="cursor-grab touch-none" aria-label={`Drag question ${index + 1} to reorder`} title="Drag to reorder">
                      <GripVertical className="h-5 w-5 text-[var(--text-muted)]" aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-strong)]">Question {index + 1}</span>
                    <div className="ml-auto flex gap-1">
                      <button type="button" onClick={() => moveFaq(faq.id, index - 1)} disabled={index === 0} className="h-8 px-2 text-xs font-bold disabled:opacity-30" aria-label={`Move question ${index + 1} up`}>↑</button>
                      <button type="button" onClick={() => moveFaq(faq.id, index + 1)} disabled={index === draft.faqs.length - 1} className="h-8 px-2 text-xs font-bold disabled:opacity-30" aria-label={`Move question ${index + 1} down`}>↓</button>
                      <button type="button" onClick={() => updateDraft((current) => ({ ...current, faqs: current.faqs.filter((item) => item.id !== faq.id).map((item, sortOrder) => ({ ...item, sortOrder })) }))} className="grid h-8 w-8 place-items-center text-red-700" aria-label={`Remove question ${index + 1}`}><Trash2 className="h-4 w-4" aria-hidden /></button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Field label="Question" value={faq.question} onChange={(value) => updateFaq(faq.id, { question: value })} />
                    <RichTextEditor label="Answer" value={faq.answerHtml} onChange={(value) => updateFaq(faq.id, { answerHtml: value })} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => updateDraft((current) => ({ ...current, faqs: [...current.faqs, { id: crypto.randomUUID(), question: "", answerHtml: "", sortOrder: current.faqs.length }] }))} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 text-sm font-bold"><Plus className="h-4 w-4" aria-hidden /> Add question</button>
            </div>
          </EditorSection>

          <EditorSection id="mini-session-booking" eyebrow="Booking" title="Cal.com booking link" description="Clients will use this link to choose and pay for an available time.">
            <div className="space-y-4">
              <Field label="Booking link" required value={draft.bookingOptions[0]?.calBookingUrl ?? MINI_SESSIONS_CAL_URL} error={errors.bookingUrl} onChange={updateBookingUrl} placeholder={MINI_SESSIONS_CAL_URL} />
              <div className="rounded-sm border border-[var(--border)] bg-[var(--background-warm)] p-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                <p>Session length, available times, buffer time, and payment are managed in Cal.com. Changes made here do not change the Cal.com schedule.</p>
                <a href={draft.bookingOptions[0]?.calBookingUrl || MINI_SESSIONS_CAL_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-bold text-[var(--brand-strong)] underline underline-offset-4">Open the booking page <ExternalLink className="h-4 w-4" aria-hidden /></a>
              </div>
            </div>
          </EditorSection>

          <EditorSection id="mini-session-policies" eyebrow="Policies" title="Set clear expectations" description="Clients will see these details before they book.">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Cancellation policy" value={draft.cancellationPolicy} rows={4} onChange={(value) => updateDraft({ cancellationPolicy: value })} />
              <TextField label="Weather policy" value={draft.weatherPolicy} rows={4} onChange={(value) => updateDraft({ weatherPolicy: value })} />
              <TextField label="Lateness policy" value={draft.latenessPolicy} rows={4} onChange={(value) => updateDraft({ latenessPolicy: value })} />
              <TextField label="Additional terms note" value={draft.termsNote} rows={4} onChange={(value) => updateDraft({ termsNote: value })} />
            </div>
          </EditorSection>

          <EditorSection eyebrow="Homepage" title="Feature this Mini Session" description="Choose whether this session should also be promoted on the homepage.">
            <label className="flex min-h-12 items-center gap-3 rounded-sm border border-[var(--border)] bg-[var(--background-warm)] px-4 py-3 text-sm font-bold">
              <input type="checkbox" checked={draft.homepageFeatured} onChange={(event) => updateDraft({ homepageFeatured: event.target.checked })} className="h-4 w-4 accent-[var(--brand-strong)]" />
              Show this Mini Session on the homepage
            </label>
            {draft.homepageFeatured && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Small label" value={draft.promoLabel} onChange={(value) => updateDraft({ promoLabel: value })} placeholder="Limited dates" />
                <Field label="Homepage headline" value={draft.promoHeadline} onChange={(value) => updateDraft({ promoHeadline: value })} placeholder={draft.headline || "Fall Mini Sessions"} />
                <div className="md:col-span-2"><TextField label="Short description" value={draft.promoCopy} rows={3} onChange={(value) => updateDraft({ promoCopy: value })} /></div>
                <Field label="Homepage hero button text" value={draft.homepageHeroCtaLabel} onChange={(value) => updateDraft({ homepageHeroCtaLabel: value })} placeholder="Mini Sessions now booking" />
                <Field label="Promotion section button text" value={draft.promoCtaLabel} onChange={(value) => updateDraft({ promoCtaLabel: value })} placeholder="View Mini Sessions" />
              </div>
            )}
          </EditorSection>
        </fieldset>

        <CampaignLifecyclePanel campaignExists={Boolean(editor.campaignId)} isBusy={isLifecycleMutating} isDirty={isDirty} isSaving={isSaving} onAction={requestLifecycleAction} onPreview={() => setIsPreviewOpen(true)} onSave={onSave} previewButtonRef={previewButtonRef} readiness={readiness} status={editor.sourceStatus} />
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
          campaignName={draft.headline || "this Mini Session"}
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

const HeroMediaPicker = memo(function HeroMediaPicker({
  items,
  selectedId,
  onSelect,
}: {
  items: AdminMediaItem[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}) {
  const [query, setQuery] = useState("");
  const matchingMedia = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) =>
      [item.filename, item.alt, item.key].some((value) =>
        value?.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [items, query]);

  return (
    <>
      <label className="relative block">
        <span className="sr-only">Search published media</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search filename or alt text"
          className="min-h-11 w-full rounded-sm border border-[var(--border)] bg-white pl-10 pr-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
        />
      </label>
      <div className="mt-4 grid max-h-80 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-4">
        {matchingMedia.map((item) => {
          const selected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
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
      {selectedId !== null && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="mt-3 min-h-9 text-sm font-bold text-[var(--text-secondary)] underline underline-offset-4"
        >
          Clear hero selection
        </button>
      )}
    </>
  );
});

function EditorSection({ id, eyebrow, title, description, action, children }: { id?: string; eyebrow: string; title: string; description: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-5 rounded-sm border border-[var(--border)] bg-white p-4 md:p-6">
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

function Field({ label, value, onChange, error, required = false, prefix, inputMode, placeholder, maxLength }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; prefix?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; placeholder?: string; maxLength?: number }) {
  const id = useId();
  return (
    <label className="block text-sm font-bold" htmlFor={id}>
      <span>{label}{required && <span className="text-red-700"> *</span>}</span>
      <span className="relative mt-2 block">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{prefix}</span>}
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} inputMode={inputMode} placeholder={placeholder} maxLength={maxLength} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`min-h-11 w-full rounded-sm border bg-white pr-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-soft)] ${prefix ? "pl-7" : "pl-3"} ${error ? "border-red-500" : "border-[var(--border)] focus:border-[var(--brand)]"}`} />
      </span>
      {error && <FieldError id={`${id}-error`} message={error} />}
    </label>
  );
}

function TextField({ label, value, onChange, rows, maxLength, placeholder, error, required = false }: { label: string; value: string; onChange: (value: string) => void; rows: number; maxLength?: number; placeholder?: string; error?: string; required?: boolean }) {
  const id = useId();
  return (
    <label className="block text-sm font-bold" htmlFor={id}>
      <span className="flex justify-between gap-3"><span>{label}{required && <span className="text-red-700"> *</span>}</span>{maxLength && <span className="text-xs font-semibold text-[var(--text-muted)]">{value.length}/{maxLength}</span>}</span>
      <textarea id={id} value={value} rows={rows} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`mt-2 w-full resize-y rounded-sm border bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[var(--brand-soft)] ${error ? "border-red-500" : "border-[var(--border)] focus:border-[var(--brand)]"}`} />
      {error && <FieldError id={`${id}-error`} message={error} />}
    </label>
  );
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
