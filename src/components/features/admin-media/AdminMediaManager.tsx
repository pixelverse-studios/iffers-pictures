"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  ArrowUpDown,
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  ExternalLink,
  FileImage,
  Grid2X2,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Mail,
  RefreshCcw,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  X,
} from "lucide-react";
import {
  checkMediaDestination,
  createDraftMediaItem,
  getAdminMediaCatalog,
  getMediaAdminSession,
  logoutMediaAdmin,
  moveDraftMediaItem,
  patchMediaItem,
  presignMediaUpload,
  requestMediaAdminMagicLink,
  revalidateMediaCatalog,
  uploadToPresignedMediaUrl,
} from "@/lib/media/client";
import { MediaApiError } from "@/lib/media/errors";
import {
  MEDIA_ASPECT_RATIOS,
  MEDIA_SERVICES,
  MEDIA_STATUSES,
  MEDIA_SUB_CATEGORIES,
  MEDIA_UPLOAD_CONTENT_TYPES,
  type AdminMediaItem,
  type MediaAdminSession,
  type MediaAspectRatio,
  type MediaService,
  type MediaStatus,
  type MediaSubCategory,
  type MediaUploadContentType,
} from "@/lib/media/types";

type AuthState = "checking" | "signed-out" | "signed-in";
type StatusFilter = "all" | MediaStatus;
type SortMode = "newest" | "oldest" | "sortOrder" | "filename";
type UploadStatus = "queued" | "uploading" | "created" | "error";

interface EditorState {
  alt: string;
  service: MediaService | "";
  subCategory: MediaSubCategory | "";
  aspectRatio: MediaAspectRatio | "";
  status: MediaStatus;
  sortOrder: string;
}

interface UploadQueueItem {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  message: string;
  createdItem?: AdminMediaItem;
}

const STATUS_COPY: Record<MediaStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

const STATUS_CLASSES: Record<MediaStatus, string> = {
  draft: "bg-amber-50 text-amber-800 ring-amber-200",
  published: "bg-[var(--brand-soft)] text-[var(--brand-strong)] ring-[var(--brand-soft)]",
  archived: "bg-red-50 text-red-700 ring-red-100",
};

const FRIENDLY_ERRORS: Record<string, string> = {
  "media.destination_collision":
    "That destination already has a catalog item or R2 object.",
  "media.published_location_locked": "Published media cannot be moved or renamed.",
  "media.archived_locked": "Restore this item before editing its details.",
  "media.missing_alt_text": "Add alt text before publishing.",
  "media.missing_service": "Choose a service before publishing.",
  "media.missing_sub_category": "Choose a sub-category before publishing.",
  "media.missing_aspect_ratio": "Choose an aspect ratio before publishing.",
  "media.invalid_content_type": "Upload JPEG, PNG, or WebP files only.",
  "media.file_too_large": "This image is too large for upload.",
};

const CATEGORY_OPTIONS = MEDIA_SERVICES.flatMap((service) =>
  MEDIA_SUB_CATEGORIES[service].map((subCategory) => ({
    label: subCategory,
    service,
    subCategory,
    folder: getFolderForCategory(service, subCategory),
  }))
);

function getFolderForCategory(service: MediaService, subCategory: MediaSubCategory) {
  if (service === "Family") return "family";
  if (service === "Maternity") return "maternity";
  if (service === "Portrait") return "portraits";
  if (service === "Couples" && subCategory === "Engagement") return "events/engagement";
  if (service === "Couples" && subCategory === "Proposal") return "events/proposal";
  if (service === "Events" && subCategory === "Baby Shower") return "events/baby-shower";
  if (service === "Events" && subCategory === "Bridal Shower") return "events/bridal-shower";
  if (service === "Events" && subCategory === "Gender Reveal")
    return "events/milestones/gender-reveal";
  if (service === "Events" && subCategory === "Birthday")
    return "events/parties/birthdays";
  if (service === "Events" && subCategory === "Baptism")
    return "events/religious-ceremonies/baptism";

  return service.toLowerCase();
}

function getFriendlyError(error: unknown) {
  if (error instanceof MediaApiError) {
    return FRIENDLY_ERRORS[error.code] ?? error.message;
  }

  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

function getErrorCode(error: unknown) {
  return error instanceof MediaApiError ? error.code : null;
}

function getInitialEditorState(item: AdminMediaItem): EditorState {
  return {
    alt: item.alt ?? "",
    service: item.service ?? "",
    subCategory: item.subCategory ?? "",
    aspectRatio: item.aspectRatio ?? "",
    status: item.status,
    sortOrder: String(item.sortOrder ?? 0),
  };
}

function isValidUploadType(type: string): type is MediaUploadContentType {
  return MEDIA_UPLOAD_CONTENT_TYPES.includes(type as MediaUploadContentType);
}

function canPublish(state: EditorState) {
  return Boolean(
    state.alt.trim() &&
      state.service &&
      state.subCategory &&
      state.aspectRatio &&
      state.service &&
      MEDIA_SUB_CATEGORIES[state.service].includes(state.subCategory as never)
  );
}

function getAffectedPages(item: AdminMediaItem | null) {
  if (!item?.service) return ["/portfolio"];

  const pages = ["/portfolio"];
  if (item.service === "Events") pages.push("/services/events");
  if (item.service === "Family") pages.push("/services/family");
  if (item.service === "Maternity") pages.push("/services/maternity");
  if (item.service === "Couples") pages.push("/services/couples-engagement");
  if (item.service === "Portrait") pages.push("/services/portrait");
  return pages;
}

function sortItems(items: AdminMediaItem[], sort: SortMode) {
  return [...items].sort((a, b) => {
    if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
    if (sort === "sortOrder") return a.sortOrder - b.sortOrder || a.id - b.id;
    if (sort === "filename") return a.filename.localeCompare(b.filename);
    return b.createdAt.localeCompare(a.createdAt);
  });
}

function filterItems({
  items,
  status,
  service,
  subCategory,
  query,
  sort,
}: {
  items: AdminMediaItem[];
  status: StatusFilter;
  service: "all" | MediaService;
  subCategory: "all" | MediaSubCategory;
  query: string;
  sort: SortMode;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return sortItems(
    items.filter((item) => {
      if (status !== "all" && item.status !== status) return false;
      if (service !== "all" && item.service !== service) return false;
      if (subCategory !== "all" && item.subCategory !== subCategory) return false;
      if (!normalizedQuery) return true;

      return [item.filename, item.key, item.alt, item.service, item.subCategory]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    }),
    sort
  );
}

function getStatusCounts(items: AdminMediaItem[]) {
  return MEDIA_STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: items.filter((item) => item.status === status).length,
    }),
    {} as Record<MediaStatus, number>
  );
}

async function getImageAspectRatio(file: File): Promise<MediaAspectRatio | null> {
  const url = URL.createObjectURL(file);
  try {
    const image = document.createElement("img");
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not read image dimensions."));
    });
    image.src = url;
    const loadedImage = await loaded;
    const ratio = loadedImage.naturalWidth / loadedImage.naturalHeight;
    if (ratio > 1.2) return "landscape";
    if (ratio < 0.85) return "portrait";
    return "square";
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatBytes(size: number) {
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(size / 1024)} KB`;
}

function StatusPill({ status }: { status: MediaStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-bold ring-1 ${STATUS_CLASSES[status]}`}
    >
      {STATUS_COPY[status]}
    </span>
  );
}

export function AdminMediaManager() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [session, setSession] = useState<MediaAdminSession | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [items, setItems] = useState<AdminMediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [catalogError, setCatalogError] = useState("");
  const [notice, setNotice] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<"all" | MediaService>("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState<"all" | MediaSubCategory>("all");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveKey, setMoveKey] = useState("");
  const [moveMessage, setMoveMessage] = useState("");
  const [isCheckingMove, setIsCheckingMove] = useState(false);
  const [uploadService, setUploadService] = useState<MediaService>("Events");
  const [uploadSubCategory, setUploadSubCategory] =
    useState<MediaSubCategory>("Baby Shower");
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  const counts = useMemo(() => getStatusCounts(items), [items]);
  const filteredItems = useMemo(
    () =>
      filterItems({
        items,
        status: statusFilter,
        service: serviceFilter,
        subCategory: subCategoryFilter,
        query,
        sort: sortMode,
      }),
    [items, query, serviceFilter, sortMode, statusFilter, subCategoryFilter]
  );

  const serviceSubCategories =
    serviceFilter === "all" ? [] : MEDIA_SUB_CATEGORIES[serviceFilter];

  useEffect(() => {
    let canceled = false;
    getMediaAdminSession()
      .then((nextSession) => {
        if (canceled) return;
        setSession(nextSession);
        setAuthState("signed-in");
      })
      .catch(() => {
        if (canceled) return;
        setAuthState("signed-out");
      });

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (authState !== "signed-in") return;
    void loadCatalog();
  }, [authState]);

  useEffect(() => {
    if (!selectedItem) {
      setEditor(null);
      setMoveKey("");
      return;
    }

    setEditor(getInitialEditorState(selectedItem));
    setMoveKey(selectedItem.key);
    setMoveMessage("");
  }, [selectedItem]);

  useEffect(() => {
    if (selectedId === null || items.some((item) => item.id === selectedId)) return;
    setSelectedId(items[0]?.id ?? null);
  }, [items, selectedId]);

  async function loadCatalog() {
    setIsLoadingCatalog(true);
    setCatalogError("");
    try {
      const catalog = await getAdminMediaCatalog();
      setItems(catalog.items);
      setSelectedId((current) => {
        if (current && catalog.items.some((item) => item.id === current)) return current;
        return catalog.items[0]?.id ?? null;
      });
    } catch (error) {
      setCatalogError(getFriendlyError(error));
      if (getErrorCode(error) === "media.request_failed") {
        setAuthState("signed-out");
      }
    } finally {
      setIsLoadingCatalog(false);
    }
  }

  async function sendMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setLoginMessage("");
    setIsSendingLink(true);

    try {
      const response = await requestMediaAdminMagicLink(loginEmail.trim());
      setLoginMessage(response.message || "Check your email for the sign-in link.");
    } catch (error) {
      setLoginError(getFriendlyError(error));
    } finally {
      setIsSendingLink(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutMediaAdmin();
    } finally {
      setSession(null);
      setItems([]);
      setSelectedId(null);
      setAuthState("signed-out");
    }
  }

  function updateEditor<Key extends keyof EditorState>(key: Key, value: EditorState[Key]) {
    setEditor((current) => {
      if (!current) return current;

      if (key === "service") {
        const nextService = value as MediaService | "";
        const nextSubCategory =
          nextService && MEDIA_SUB_CATEGORIES[nextService][0]
            ? MEDIA_SUB_CATEGORIES[nextService][0]
            : "";
        return { ...current, service: nextService, subCategory: nextSubCategory };
      }

      return { ...current, [key]: value };
    });
  }

  async function saveEditor(overrides: Partial<EditorState> = {}) {
    if (!selectedItem || !editor) return;
    const nextEditor = { ...editor, ...overrides };

    if (selectedItem.status === "archived" && nextEditor.status === "archived") {
      setNotice("Restore this image before editing its metadata.");
      return;
    }

    if (nextEditor.status === "published" && !canPublish(nextEditor)) {
      setNotice("Complete alt text, service, sub-category, and aspect ratio before publishing.");
      return;
    }

    setIsSaving(true);
    setNotice("");

    try {
      const updated = await patchMediaItem(selectedItem.id, {
        alt: nextEditor.alt,
        service: nextEditor.service || null,
        subCategory: nextEditor.subCategory || null,
        aspectRatio: nextEditor.aspectRatio || null,
        status: nextEditor.status,
        sortOrder: Number(nextEditor.sortOrder) || 0,
      });
      upsertItem(updated);
      setNotice("Changes saved.");
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsSaving(false);
    }
  }

  function upsertItem(item: AdminMediaItem) {
    setItems((current) => current.map((existing) => (existing.id === item.id ? item : existing)));
    setSelectedId(item.id);
  }

  async function archiveSelected() {
    if (!selectedItem) return;
    await saveEditor({ status: "archived" });
  }

  async function restoreSelected() {
    if (!selectedItem) return;
    const status = selectedItem.archivedFromStatus ?? "draft";
    await saveEditor({ status });
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const queued = files.map((file): UploadQueueItem => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      status: isValidUploadType(file.type) ? "queued" : "error",
      progress: 0,
      message: isValidUploadType(file.type)
        ? "Ready"
        : "JPEG, PNG, or WebP only",
    }));
    setUploadQueue((current) => [...current, ...queued]);
    event.target.value = "";
  }

  function removeUpload(id: string) {
    setUploadQueue((current) => current.filter((item) => item.id !== id));
  }

  function setUploadItem(id: string, patch: Partial<UploadQueueItem>) {
    setUploadQueue((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  async function uploadDrafts() {
    const readyItems = uploadQueue.filter((item) => item.status === "queued");
    if (readyItems.length === 0) return;

    setIsUploading(true);
    const folder = getFolderForCategory(uploadService, uploadSubCategory);
    const startingSortOrder =
      items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;

    for (const [index, queueItem] of readyItems.entries()) {
      try {
        if (!isValidUploadType(queueItem.file.type)) {
          throw new Error("JPEG, PNG, or WebP only");
        }

        setUploadItem(queueItem.id, {
          status: "uploading",
          progress: 18,
          message: "Requesting upload URL",
        });

        const aspectRatio = await getImageAspectRatio(queueItem.file);
        const presign = await presignMediaUpload({
          filename: queueItem.file.name,
          content_type: queueItem.file.type,
          folder,
          size: queueItem.file.size,
        });

        setUploadItem(queueItem.id, {
          progress: 48,
          message: "Uploading to media storage",
        });
        await uploadToPresignedMediaUrl({
          file: queueItem.file,
          presignedUrl: presign.presigned_url,
          contentType: queueItem.file.type,
        });

        setUploadItem(queueItem.id, {
          progress: 82,
          message: "Creating draft",
        });
        const draft = await createDraftMediaItem({
          key: presign.r2_key,
          filename: queueItem.file.name,
          src: presign.public_url,
          alt: "",
          service: uploadService,
          subCategory: uploadSubCategory,
          aspectRatio,
          sortOrder: startingSortOrder + index,
        });

        setItems((current) => [draft, ...current]);
        setSelectedId(draft.id);
        setStatusFilter("draft");
        setUploadItem(queueItem.id, {
          status: "created",
          progress: 100,
          message: "Draft created",
          createdItem: draft,
        });
      } catch (error) {
        setUploadItem(queueItem.id, {
          status: "error",
          progress: 0,
          message: getFriendlyError(error),
        });
      }
    }

    setIsUploading(false);
  }

  async function checkDestination() {
    if (!selectedItem || selectedItem.status !== "draft") return;
    setIsCheckingMove(true);
    setMoveMessage("");
    try {
      const result = await checkMediaDestination({
        destination_key: moveKey.trim(),
        exclude_media_id: selectedItem.id,
      });
      setMoveMessage(
        result.available
          ? "Destination is available."
          : "Destination already exists in the catalog or storage."
      );
    } catch (error) {
      setMoveMessage(getFriendlyError(error));
    } finally {
      setIsCheckingMove(false);
    }
  }

  async function moveSelected() {
    if (!selectedItem || selectedItem.status !== "draft") return;
    setIsMoving(true);
    setMoveMessage("");
    try {
      const result = await moveDraftMediaItem(selectedItem.id, {
        destination_key: moveKey.trim(),
      });
      upsertItem(result.item);
      setMoveMessage("Draft moved.");
    } catch (error) {
      setMoveMessage(getFriendlyError(error));
    } finally {
      setIsMoving(false);
    }
  }

  async function triggerRevalidate() {
    setIsRevalidating(true);
    setNotice("");
    try {
      const result = await revalidateMediaCatalog({
        reason: "manual",
        media_id: selectedItem?.id,
        media_key: selectedItem?.key,
      });
      setNotice(
        result.triggered
          ? "Public pages queued for refresh."
          : result.configured
            ? "Revalidation was skipped by the server."
            : "Revalidation is not configured on the server."
      );
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsRevalidating(false);
    }
  }

  if (authState === "checking") {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--background)] px-6">
        <div className="flex items-center gap-3 text-sm font-semibold text-[var(--brand-strong)]">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Checking media admin session
        </div>
      </main>
    );
  }

  if (authState === "signed-out") {
    return (
      <main className="min-h-screen bg-[var(--background)] px-5 py-8 text-[var(--foreground)] md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <section className="hidden min-h-[720px] overflow-hidden bg-[var(--background-warm)] md:grid md:grid-cols-[150px_1fr]">
            <div className="grid grid-rows-5">
              {[
                "/hero.jpg",
                "/headshot.jpg",
                "/logo.png",
                "/selfie.jpg",
                "/logo-blue.png",
              ].map((src) => (
                <div key={src} className="relative bg-[var(--background-warm)]">
                  <Image src={src} alt="" fill sizes="150px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center px-12">
              <p className="font-heading text-3xl font-semibold text-[var(--foreground)]">
                Iffer&apos;s Pictures
              </p>
              <div className="mt-5 h-px w-16 bg-[var(--accent-strong)]" />
              <h1 className="mt-8 font-heading text-5xl font-semibold text-[var(--brand-strong)]">
                Media Admin
              </h1>
              <p className="mt-5 max-w-sm text-lg leading-8 text-[var(--text-secondary)]">
                Manage portfolio images, drafts, and published galleries.
              </p>
              <div className="mt-12 grid gap-7">
                {[
                  ["Upload drafts", "Add new images and keep them private until ready."],
                  ["Edit image details", "Add alt text, set categories, and update status."],
                  ["Archive safely", "Remove images from public view without deleting."],
                ].map(([title, copy]) => (
                  <div key={title} className="flex gap-4">
                    <ShieldCheck className="mt-1 h-6 w-6 text-[var(--brand-strong)]" />
                    <div>
                      <p className="font-bold text-[var(--foreground)]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-xl border border-[var(--border)] bg-white p-7 shadow-sm md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
              Iffer&apos;s Pictures
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-[var(--foreground)]">
              Get a secure sign-in link
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              Enter the approved email address and we&apos;ll send a one-time link
              to open the media manager.
            </p>

            <form className="mt-7 space-y-5" onSubmit={sendMagicLink}>
              <label className="block">
                <span className="text-sm font-bold text-[var(--foreground)]">
                  Email address
                </span>
                <span className="mt-2 flex min-h-12 items-center gap-3 border border-[var(--border)] px-3 focus-within:border-[var(--brand-strong)]">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-base outline-none"
                    placeholder="jenn@ifferspictures.com"
                    required
                  />
                  <Mail className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />
                </span>
              </label>

              {loginMessage && (
                <div className="flex gap-3 border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                  <Check className="h-4 w-4" aria-hidden />
                  {loginMessage}
                </div>
              )}
              {loginError && (
                <div className="flex gap-3 border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <CircleAlert className="h-4 w-4" aria-hidden />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSendingLink}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 text-sm font-bold text-white transition hover:bg-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSendingLink ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
                Send sign-in link
              </button>
              <Link
                href="/"
                className="inline-flex text-sm font-semibold text-[var(--brand-strong)] underline underline-offset-4"
              >
                Return to website
              </Link>
            </form>
            <p className="mt-8 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Lock className="h-4 w-4" aria-hidden />
              No password needed. Links expire after 15 minutes.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const publishBlocked = editor?.status === "published" && !canPublish(editor);
  const archivedLocked = selectedItem?.status === "archived";
  const canMove = selectedItem?.status === "draft";
  const uploadReadyCount = uploadQueue.filter((item) => item.status === "queued").length;
  const affectedPages = getAffectedPages(selectedItem);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid min-h-screen lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-[var(--border)] bg-white lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 py-5 lg:block">
            <Link href="/" className="font-heading text-2xl font-semibold">
              Iffer&apos;s Pictures
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] lg:hidden"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Logout
            </button>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-5 pb-4 lg:block lg:space-y-1 lg:overflow-visible">
            <button
              type="button"
              onClick={() => {
                setServiceFilter("all");
                setSubCategoryFilter("all");
              }}
              className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
                serviceFilter === "all"
                  ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
              }`}
            >
              <Grid2X2 className="h-4 w-4" aria-hidden />
              All Media
            </button>
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={`${option.service}-${option.subCategory}`}
                type="button"
                onClick={() => {
                  setServiceFilter(option.service);
                  setSubCategoryFilter(option.subCategory);
                }}
                className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
                  subCategoryFilter === option.subCategory
                    ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
                }`}
              >
                <FileImage className="h-4 w-4" aria-hidden />
                {option.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStatusFilter("archived")}
              className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm font-semibold lg:w-full ${
                statusFilter === "archived"
                  ? "bg-red-50 text-red-700"
                  : "text-[var(--text-secondary)] hover:bg-[var(--background-warm)]"
              }`}
            >
              <Archive className="h-4 w-4" aria-hidden />
              Archive
            </button>
          </nav>

          <div className="hidden border-t border-[var(--border)] p-5 lg:block">
            <p className="text-sm font-bold text-[var(--foreground)]">
              {session?.email ?? "Administrator"}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Session active until {session ? formatDate(session.expiresAt) : "later"}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Logout
            </button>
          </div>
        </aside>

        <section className="grid min-w-0 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/96 px-5 py-4 backdrop-blur md:px-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-heading text-3xl font-semibold">Media</h1>
                    <p className="hidden text-sm text-[var(--text-secondary)] md:block">
                      {counts.published} published · {counts.draft} draft ·{" "}
                      {counts.archived} archived
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Uploads start as drafts and stay hidden until published.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={MEDIA_UPLOAD_CONTENT_TYPES.join(",")}
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-4 text-sm font-bold text-white"
                  >
                    <Upload className="h-4 w-4" aria-hidden />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={triggerRevalidate}
                    disabled={isRevalidating}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--brand-strong)] disabled:opacity-60"
                  >
                    {isRevalidating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="h-4 w-4" />
                    )}
                    Revalidate
                  </button>
                  <Link
                    href="/portfolio"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 text-sm font-bold text-[var(--foreground)]"
                  >
                    Portfolio
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </header>

            <div className="space-y-5 px-5 py-5 md:px-7">
              {(notice || catalogError) && (
                <div
                  className={`flex items-start gap-3 border px-4 py-3 text-sm font-semibold ${
                    catalogError
                      ? "border-red-100 bg-red-50 text-red-700"
                      : "border-[var(--brand-soft)] bg-[var(--background-warm)] text-[var(--brand-strong)]"
                  }`}
                >
                  <CircleAlert className="mt-0.5 h-4 w-4" aria-hidden />
                  <span>{catalogError || notice}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCatalogError("");
                      setNotice("");
                    }}
                    className="ml-auto"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}

              <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
                  <label className="flex min-h-11 items-center gap-2 border border-[var(--border)] bg-white px-3">
                    <Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search media..."
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                  </label>
                  <label className="relative">
                    <select
                      value={serviceFilter}
                      onChange={(event) => {
                        setServiceFilter(event.target.value as "all" | MediaService);
                        setSubCategoryFilter("all");
                      }}
                      className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none"
                    >
                      <option value="all">All services</option>
                      {MEDIA_SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
                  </label>
                  <label className="relative">
                    <select
                      value={subCategoryFilter}
                      onChange={(event) =>
                        setSubCategoryFilter(event.target.value as "all" | MediaSubCategory)
                      }
                      disabled={serviceFilter === "all"}
                      className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none disabled:bg-[var(--background-warm)]"
                    >
                      <option value="all">All sub-categories</option>
                      {serviceSubCategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
                  </label>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {(["all", ...MEDIA_STATUSES] as StatusFilter[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`min-h-11 shrink-0 rounded-sm border px-4 text-sm font-bold ${
                        statusFilter === status
                          ? "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white"
                          : "border-[var(--border)] bg-white text-[var(--text-secondary)]"
                      }`}
                    >
                      {status === "all" ? "All" : STATUS_COPY[status]}
                    </button>
                  ))}
                  <label className="relative min-w-36">
                    <select
                      value={sortMode}
                      onChange={(event) => setSortMode(event.target.value as SortMode)}
                      className="h-11 w-full appearance-none border border-[var(--border)] bg-white px-3 pr-9 text-sm font-semibold outline-none"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="sortOrder">Sort order</option>
                      <option value="filename">Filename</option>
                    </select>
                    <SlidersHorizontal className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" />
                  </label>
                </div>
              </section>

              <section className="grid gap-4 border border-[var(--border)] bg-white p-4 lg:grid-cols-[1fr_280px]">
                <div
                  className="flex min-h-52 flex-col items-center justify-center border border-dashed border-[var(--border)] bg-[var(--background-warm)] p-6 text-center"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const files = Array.from(event.dataTransfer.files);
                    const queued = files.map((file): UploadQueueItem => ({
                      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                      file,
                      status: isValidUploadType(file.type) ? "queued" : "error",
                      progress: 0,
                      message: isValidUploadType(file.type)
                        ? "Ready"
                        : "JPEG, PNG, or WebP only",
                    }));
                    setUploadQueue((current) => [...current, ...queued]);
                  }}
                >
                  <ImagePlus className="h-10 w-10 text-[var(--brand-strong)]" />
                  <h2 className="mt-4 font-heading text-2xl font-semibold">
                    Upload to {uploadSubCategory}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    New images start as drafts until you publish them.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-6 text-sm font-bold text-white"
                  >
                    Choose files
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-bold">Target category</span>
                    <select
                      value={`${uploadService}|${uploadSubCategory}`}
                      onChange={(event) => {
                        const [service, subCategory] = event.target.value.split("|") as [
                          MediaService,
                          MediaSubCategory,
                        ];
                        setUploadService(service);
                        setUploadSubCategory(subCategory);
                      }}
                      className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm"
                    >
                      {CATEGORY_OPTIONS.map((option) => (
                        <option
                          key={`${option.service}-${option.subCategory}`}
                          value={`${option.service}|${option.subCategory}`}
                        >
                          {option.subCategory}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <p className="font-bold">Alt text required after upload</p>
                    <p className="mt-1 leading-6">
                      Uploads are drafts. Complete alt text before publishing.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={uploadDrafts}
                    disabled={isUploading || uploadReadyCount === 0}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Upload drafts ({uploadReadyCount})
                  </button>
                </div>
              </section>

              {uploadQueue.length > 0 && (
                <section className="border border-[var(--border)] bg-white">
                  <div className="border-b border-[var(--border)] px-4 py-3">
                    <h2 className="font-heading text-xl font-semibold">Upload queue</h2>
                  </div>
                  <div className="divide-y divide-[var(--border)]">
                    {uploadQueue.map((item) => (
                      <div
                        key={item.id}
                        className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_160px_120px_auto] md:items-center"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{item.file.name}</p>
                          <p className="mt-1 text-xs text-[var(--text-muted)]">
                            {formatBytes(item.file.size)} · {item.file.type || "unknown"}
                          </p>
                        </div>
                        <span className="w-fit rounded-sm bg-[var(--brand-soft)] px-2 py-1 text-xs font-bold text-[var(--brand-strong)]">
                          {uploadSubCategory}
                        </span>
                        <div>
                          <p className="text-xs font-bold capitalize">{item.status}</p>
                          <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            {item.message}
                          </p>
                          {item.status === "uploading" && (
                            <div className="mt-2 h-1.5 bg-[var(--background-warm)]">
                              <div
                                className="h-full bg-[var(--brand-strong)]"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUpload(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
                          aria-label={`Remove ${item.file.name}`}
                        >
                          <X className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                {isLoadingCatalog ? (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="h-64 animate-pulse bg-white" />
                    ))}
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="border border-[var(--border)] bg-white p-10 text-center">
                    <FileImage className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
                    <h2 className="mt-4 font-heading text-2xl font-semibold">
                      No media matches this view
                    </h2>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      Try a different filter or upload drafts.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`group overflow-hidden border bg-white text-left transition ${
                          selectedId === item.id
                            ? "border-[var(--brand-strong)] ring-2 ring-[var(--brand-soft)]"
                            : "border-[var(--border)] hover:border-[var(--brand-soft)]"
                        }`}
                      >
                        <div className="relative aspect-[4/3] bg-[var(--background-warm)]">
                          <Image
                            src={item.src}
                            alt={item.alt || item.filename}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.025]"
                          />
                        </div>
                        <div className="space-y-2 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="min-w-0 truncate text-sm font-bold">
                              {item.filename}
                            </p>
                            <ArrowUpDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <StatusPill status={item.status} />
                            <span className="text-xs text-[var(--text-muted)]">
                              {item.aspectRatio ?? "unset"}
                            </span>
                          </div>
                          <p className="truncate text-xs text-[var(--text-secondary)]">
                            {item.service ?? "No service"} ·{" "}
                            {item.subCategory ?? "No sub-category"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          <aside className="border-t border-[var(--border)] bg-white xl:border-l xl:border-t-0">
            <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
              {!selectedItem || !editor ? (
                <div className="grid min-h-96 place-items-center text-center">
                  <div>
                    <FileImage className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
                    <p className="mt-3 font-heading text-xl font-semibold">
                      Select media
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      Choose an image to edit details.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
                        Selected media
                      </p>
                      <h2 className="mt-1 truncate font-heading text-2xl font-semibold">
                        {selectedItem.filename}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)]"
                      aria-label="Close inspector"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-warm)]">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt || selectedItem.filename}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill status={selectedItem.status} />
                    <span className="text-xs text-[var(--text-muted)]">
                      Updated {formatDate(selectedItem.updatedAt)}
                    </span>
                  </div>

                  {archivedLocked && (
                    <div className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                      Archived media must be restored before normal metadata edits.
                    </div>
                  )}

                  <label className="block">
                    <span className="text-sm font-bold">Alt text</span>
                    <textarea
                      value={editor.alt}
                      onChange={(event) => updateEditor("alt", event.target.value)}
                      disabled={archivedLocked}
                      rows={3}
                      className="mt-2 w-full resize-none border border-[var(--border)] px-3 py-2 text-sm outline-none disabled:bg-[var(--background-warm)]"
                      placeholder="Describe what someone should understand from the image."
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-sm font-bold">Service</span>
                      <select
                        value={editor.service}
                        onChange={(event) =>
                          updateEditor("service", event.target.value as MediaService | "")
                        }
                        disabled={archivedLocked}
                        className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
                      >
                        <option value="">Unset</option>
                        {MEDIA_SERVICES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Sub-category</span>
                      <select
                        value={editor.subCategory}
                        onChange={(event) =>
                          updateEditor("subCategory", event.target.value as MediaSubCategory | "")
                        }
                        disabled={archivedLocked || !editor.service}
                        className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
                      >
                        <option value="">Unset</option>
                        {editor.service &&
                          MEDIA_SUB_CATEGORIES[editor.service].map((subCategory) => (
                            <option key={subCategory} value={subCategory}>
                              {subCategory}
                            </option>
                          ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-sm font-bold">Aspect ratio</span>
                      <select
                        value={editor.aspectRatio}
                        onChange={(event) =>
                          updateEditor("aspectRatio", event.target.value as MediaAspectRatio | "")
                        }
                        disabled={archivedLocked}
                        className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm disabled:bg-[var(--background-warm)]"
                      >
                        <option value="">Unset</option>
                        {MEDIA_ASPECT_RATIOS.map((ratio) => (
                          <option key={ratio} value={ratio}>
                            {ratio}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Sort order</span>
                      <input
                        type="number"
                        value={editor.sortOrder}
                        onChange={(event) => updateEditor("sortOrder", event.target.value)}
                        disabled={archivedLocked}
                        className="mt-2 h-11 w-full border border-[var(--border)] px-3 text-sm disabled:bg-[var(--background-warm)]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-bold">Status</span>
                    <select
                      value={editor.status}
                      onChange={(event) =>
                        updateEditor("status", event.target.value as MediaStatus)
                      }
                      className="mt-2 h-11 w-full border border-[var(--border)] bg-white px-3 text-sm"
                    >
                      {MEDIA_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_COPY[status]}
                        </option>
                      ))}
                    </select>
                    {publishBlocked && (
                      <span className="mt-2 block text-xs font-semibold text-red-700">
                        Add alt text, service, sub-category, and aspect ratio before publishing.
                      </span>
                    )}
                  </label>

                  <div className="grid gap-2">
                    <button
                      type="button"
                      onClick={() => saveEditor()}
                      disabled={isSaving || publishBlocked}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[var(--brand-strong)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                      Save changes
                    </button>
                    {selectedItem.status === "archived" ? (
                      <button
                        type="button"
                        onClick={restoreSelected}
                        disabled={isSaving}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-5 text-sm font-bold text-[var(--brand-strong)]"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Restore image
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={archiveSelected}
                        disabled={isSaving}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-red-200 px-5 text-sm font-bold text-red-700"
                      >
                        <Archive className="h-4 w-4" />
                        Archive image
                      </button>
                    )}
                  </div>

                  <details className="border border-[var(--border)]">
                    <summary className="cursor-pointer px-3 py-3 text-sm font-bold">
                      R2 details
                    </summary>
                    <div className="space-y-2 border-t border-[var(--border)] p-3 text-xs text-[var(--text-secondary)]">
                      <p className="break-all">
                        <strong>Key:</strong> {selectedItem.key}
                      </p>
                      <p>
                        <strong>ID:</strong> {selectedItem.id}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(selectedItem.key)}
                        className="inline-flex items-center gap-2 text-[var(--brand-strong)]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copy key
                      </button>
                    </div>
                  </details>

                  <section className="border border-[var(--border)] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold">Move / rename draft</p>
                      {!canMove && (
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Draft only
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={moveKey}
                      onChange={(event) => setMoveKey(event.target.value)}
                      disabled={!canMove}
                      className="mt-3 h-10 w-full border border-[var(--border)] px-3 text-xs disabled:bg-[var(--background-warm)]"
                    />
                    {moveMessage && (
                      <p className="mt-2 text-xs font-semibold text-[var(--text-secondary)]">
                        {moveMessage}
                      </p>
                    )}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={checkDestination}
                        disabled={!canMove || isCheckingMove || !moveKey.trim()}
                        className="inline-flex min-h-10 items-center justify-center rounded-sm border border-[var(--border)] text-xs font-bold disabled:opacity-50"
                      >
                        {isCheckingMove ? "Checking..." : "Check"}
                      </button>
                      <button
                        type="button"
                        onClick={moveSelected}
                        disabled={!canMove || isMoving || !moveKey.trim() || moveKey === selectedItem.key}
                        className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[var(--brand-strong)] text-xs font-bold text-white disabled:opacity-50"
                      >
                        {isMoving ? "Moving..." : "Move"}
                      </button>
                    </div>
                  </section>

                  <section className="border border-[var(--border)] p-3">
                    <p className="text-sm font-bold">Public visibility</p>
                    <div className="mt-3 space-y-2">
                      {affectedPages.map((page) => (
                        <Link
                          key={page}
                          href={page}
                          className="flex items-center justify-between rounded-sm bg-[var(--background-warm)] px-3 py-2 text-sm font-semibold text-[var(--brand-strong)]"
                        >
                          {page}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
