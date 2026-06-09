"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import {
  checkMediaDestination,
  assignMediaPlacement,
  clearMediaPlacement,
  createDraftMediaItem,
  getAdminMediaCatalog,
  getAdminMediaPlacements,
  getMediaAdminSession,
  logoutMediaAdmin,
  moveDraftMediaItem,
  patchMediaItemsBatch,
  patchMediaItem,
  presignMediaUpload,
  requestMediaAdminMagicLink,
  revalidateMediaCatalog,
  uploadToPresignedMediaUrl,
} from "@/lib/media/client";
import {
  DEFAULT_MEDIA_CROP_POSITION,
  MEDIA_SUB_CATEGORIES,
  type AdminMediaPlacementSlot,
  type AdminMediaItem,
  type MediaLibrary,
  type MediaAdminSession,
  type MediaPlacementSlotKey,
  type MediaService,
  type MediaSiteCategory,
  type MediaSubCategory,
} from "@/lib/media/types";
import { AdminMediaLibrary } from "./AdminMediaLibrary";
import { AdminMediaLogin } from "./AdminMediaLogin";
import {
  FRIENDLY_ERRORS,
  getFolderForCategory,
  getFolderForSiteCategory,
} from "./constants";
import type {
  AuthState,
  BatchArchiveFailure,
  BatchArchiveFeedback,
  EditorState,
  LibraryFilter,
  SortMode,
  StatusFilter,
  UploadQueueItem,
} from "./types";
import {
  canPublish,
  filterItems,
  getAffectedPages,
  getErrorCode,
  getFriendlyError,
  getImageAspectRatio,
  getSafeUploadFilename,
  getUploadValidationMessage,
  getInitialEditorState,
  getStatusCounts,
  isValidUploadType,
} from "./utils";

const MAX_BATCH_ARCHIVE_ITEMS = 50;
const DEFAULT_SITE_CATEGORY: MediaSiteCategory = "Misc";

export function AdminMediaManager() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [session, setSession] = useState<MediaAdminSession | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [items, setItems] = useState<AdminMediaItem[]>([]);
  const [placementSlots, setPlacementSlots] = useState<AdminMediaPlacementSlot[]>([]);
  const [isLoadingPlacements, setIsLoadingPlacements] = useState(false);
  const [placementError, setPlacementError] = useState("");
  const [activePlacementPickerSlotKey, setActivePlacementPickerSlotKey] =
    useState<MediaPlacementSlotKey | null>(null);
  const [mutatingPlacementSlotKey, setMutatingPlacementSlotKey] =
    useState<MediaPlacementSlotKey | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [catalogError, setCatalogError] = useState("");
  const [notice, setNotice] = useState("");
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState<"all" | MediaService>("all");
  const [subCategoryFilter, setSubCategoryFilter] =
    useState<"all" | MediaSubCategory>("all");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveKey, setMoveKey] = useState("");
  const [moveMessage, setMoveMessage] = useState("");
  const [moveDestinationAvailable, setMoveDestinationAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingMove, setIsCheckingMove] = useState(false);
  const [uploadLibrary, setUploadLibrary] = useState<MediaLibrary>("portfolio");
  const [uploadService, setUploadService] = useState<MediaService>("Events");
  const [uploadSubCategory, setUploadSubCategory] =
    useState<MediaSubCategory>("Baby Shower");
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [archiveSelectionIds, setArchiveSelectionIds] = useState<number[]>([]);
  const [isBatchArchiving, setIsBatchArchiving] = useState(false);
  const [batchArchiveFeedback, setBatchArchiveFeedback] =
    useState<BatchArchiveFeedback | null>(null);

  const selectedBatchItems = useMemo(
    () =>
      archiveSelectionIds
        .map((id) => items.find((item) => item.id === id))
        .filter(
          (item): item is AdminMediaItem =>
            Boolean(item) && item?.status === "published",
        ),
    [archiveSelectionIds, items],
  );

  const selectedItem = useMemo(
    () =>
      selectedBatchItems.length === 1
        ? selectedBatchItems[0]
        : items.find((item) => item.id === selectedId) ?? null,
    [items, selectedBatchItems, selectedId],
  );

  const counts = useMemo(() => getStatusCounts(items), [items]);
  const filteredItems = useMemo(
    () =>
      filterItems({
        items,
        library: libraryFilter,
        status: statusFilter,
        service: serviceFilter,
        subCategory: subCategoryFilter,
        query,
        sort: sortMode,
      }),
    [
      items,
      libraryFilter,
      query,
      serviceFilter,
      sortMode,
      statusFilter,
      subCategoryFilter,
    ],
  );

  const serviceSubCategories =
    serviceFilter === "all" ? [] : MEDIA_SUB_CATEGORIES[serviceFilter];
  const publishBlocked = editor?.status === "published" && !canPublish(editor);
  const canMove = selectedItem?.status === "draft";
  const uploadReadyCount = uploadQueue.filter((item) => item.status === "queued").length;
  const affectedPages = getAffectedPages(selectedItem);
  const selectedPlacementUsages = useMemo(
    () =>
      selectedItem
        ? placementSlots
            .filter((slot) => slot.assignment?.media.id === selectedItem.id)
            .map((slot) => ({
              slotKey: slot.slotKey,
              pageLabel: slot.pageLabel,
              sectionLabel: slot.sectionLabel,
              affectedPaths: slot.affectedPaths,
            }))
        : [],
    [placementSlots, selectedItem],
  );

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
    void loadPlacements();
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
    setMoveDestinationAvailable(null);
  }, [selectedItem]);

  useEffect(() => {
    if (selectedId === null || items.some((item) => item.id === selectedId)) return;
    setSelectedId(items[0]?.id ?? null);
  }, [items, selectedId]);

  useEffect(() => {
    setArchiveSelectionIds((current) =>
      current.filter((id) =>
        items.some((item) => item.id === id && item.status === "published"),
      ),
    );
  }, [items]);

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

  async function loadPlacements() {
    setIsLoadingPlacements(true);
    setPlacementError("");
    try {
      const response = await getAdminMediaPlacements();
      setPlacementSlots(response.slots);
    } catch (error) {
      setPlacementError(getFriendlyError(error));
    } finally {
      setIsLoadingPlacements(false);
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
      setPlacementSlots([]);
      setSelectedId(null);
      setAuthState("signed-out");
    }
  }

  function updateEditor<Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) {
    setEditor((current) => {
      if (!current) return current;

      if (key === "library") {
        const nextLibrary = value as MediaLibrary;
        if (nextLibrary === "site") {
          return {
            ...current,
            library: "site",
            siteCategory: DEFAULT_SITE_CATEGORY,
            service: "",
            subCategory: "",
          };
        }

        return {
          ...current,
          library: "portfolio",
          siteCategory: "",
          service: current.service || "Events",
          subCategory:
            current.subCategory ||
            MEDIA_SUB_CATEGORIES[current.service || "Events"][0],
        };
      }

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
      setNotice(
        nextEditor.library === "site"
          ? "Complete alt text, site category, and aspect ratio before publishing."
          : "Complete alt text, service, sub-category, and aspect ratio before publishing.",
      );
      return;
    }

    setIsSaving(true);
    setNotice("");

    try {
      const updated = await patchMediaItem(selectedItem.id, {
        alt: nextEditor.alt,
        library: nextEditor.library,
        siteCategory: nextEditor.library === "site" ? DEFAULT_SITE_CATEGORY : null,
        service: nextEditor.library === "portfolio" ? nextEditor.service || null : null,
        subCategory:
          nextEditor.library === "portfolio"
            ? nextEditor.subCategory || null
            : null,
        aspectRatio: nextEditor.aspectRatio || null,
        aspect_ratio: nextEditor.aspectRatio || null,
        status: nextEditor.status,
        sortOrder: Number(nextEditor.sortOrder) || 0,
        crop_position: nextEditor.cropPosition,
      });
      upsertItem(updated);
      if (updated.status === "archived") {
        removePlacementAssignmentsForMediaIds(new Set([updated.id]));
      }
      setNotice("Changes saved.");
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function restoreSelected() {
    if (!selectedItem) return;

    setIsSaving(true);
    setNotice("");

    try {
      const updated = await patchMediaItem(selectedItem.id, {
        status: selectedItem.archivedFromStatus ?? "draft",
      });
      upsertItem(updated);
      setNotice("Image restored.");
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsSaving(false);
    }
  }

  function upsertItem(item: AdminMediaItem) {
    setItems((current) =>
      current.map((existing) => (existing.id === item.id ? item : existing)),
    );
    setSelectedId(item.id);
  }

  function removePlacementAssignmentsForMediaIds(mediaIds: Set<number>) {
    if (mediaIds.size === 0) return;

    setPlacementSlots((current) =>
      current.map((slot) =>
        slot.assignment && mediaIds.has(slot.assignment.media.id)
          ? { ...slot, assignment: null }
          : slot,
      ),
    );
  }

  function clearArchiveSelection() {
    setArchiveSelectionIds([]);
    setBatchArchiveFeedback(null);
    setSelectedId(null);
  }

  function editSelectedArchiveItem(id: number) {
    setArchiveSelectionIds([]);
    setBatchArchiveFeedback(null);
    setSelectedId(id);
  }

  function toggleArchiveSelection(id: number) {
    const item = items.find((current) => current.id === id);
    if (!item) return;

    if (item.status !== "published") {
      setArchiveSelectionIds([]);
      setBatchArchiveFeedback(null);
      setSelectedId(item.id);
      return;
    }

    setBatchArchiveFeedback(null);
    if (archiveSelectionIds.includes(id)) {
      const nextIds = archiveSelectionIds.filter((selectedId) => selectedId !== id);
      setArchiveSelectionIds(nextIds);
      setSelectedId(nextIds.length === 1 ? nextIds[0] : null);
      return;
    }

    if (archiveSelectionIds.length >= MAX_BATCH_ARCHIVE_ITEMS) {
      setBatchArchiveFeedback({
        tone: "error",
        message: `Select ${MAX_BATCH_ARCHIVE_ITEMS} images or fewer before archiving.`,
        failures: [],
      });
      return;
    }

    setArchiveSelectionIds((current) => [...current, id]);
    setSelectedId(id);
  }

  function selectSingleItem(id: number | null) {
    setArchiveSelectionIds([]);
    setBatchArchiveFeedback(null);
    setSelectedId(id);
  }

  function getBatchArchiveFailureMessage(error: {
    code?: string;
    message?: string;
  }) {
    if (error.code && FRIENDLY_ERRORS[error.code]) {
      return FRIENDLY_ERRORS[error.code];
    }

    return error.message || "Archive failed.";
  }

  async function archiveSelectedItems() {
    const uniqueIds = Array.from(new Set(archiveSelectionIds));
    if (uniqueIds.length === 0) return;

    if (uniqueIds.length > MAX_BATCH_ARCHIVE_ITEMS) {
      setBatchArchiveFeedback({
        tone: "error",
        message: `Select ${MAX_BATCH_ARCHIVE_ITEMS} images or fewer before archiving.`,
        failures: [],
      });
      return;
    }

    const itemsById = new Map(items.map((item) => [item.id, item]));

    setIsBatchArchiving(true);
    setBatchArchiveFeedback(null);
    setNotice("");

    try {
      const response = await patchMediaItemsBatch({
        ids: uniqueIds,
        status: "archived",
      });
      const successfulItems = new Map<number, AdminMediaItem>();
      const failures: BatchArchiveFailure[] = [];

      for (const result of response.items) {
        if (result.ok) {
          successfulItems.set(result.id, result.item);
          continue;
        }

        failures.push({
          id: result.id,
          filename: itemsById.get(result.id)?.filename ?? `Image #${result.id}`,
          message: getBatchArchiveFailureMessage(result.error),
        });
      }

      if (successfulItems.size > 0) {
        setItems((current) =>
          current.map((item) => successfulItems.get(item.id) ?? item),
        );
        removePlacementAssignmentsForMediaIds(new Set(successfulItems.keys()));
      }

      const requested = response.summary.requested ?? uniqueIds.length;
      const succeeded = response.summary.succeeded ?? successfulItems.size;
      const failed = Math.max(response.summary.failed ?? 0, failures.length);

      if (failed > 0) {
        const successfulIds = new Set(successfulItems.keys());
        setArchiveSelectionIds(
          uniqueIds.filter(
            (id) =>
              !successfulIds.has(id) &&
              itemsById.get(id)?.status === "published",
          ),
        );
        setSelectedId(uniqueIds.find((id) => !successfulIds.has(id)) ?? null);
        setBatchArchiveFeedback({
          tone: "warning",
          message: `Archived ${succeeded} of ${requested} images.`,
          failures,
        });
        return;
      }

      setArchiveSelectionIds([]);
      setSelectedId(null);
      setNotice(
        `Archived ${succeeded} image${succeeded === 1 ? "" : "s"}. Files remain in R2.`,
      );
    } catch (error) {
      setBatchArchiveFeedback({
        tone: "error",
        message: getFriendlyError(error),
        failures: [],
      });
    } finally {
      setIsBatchArchiving(false);
    }
  }

  function upsertPlacementSlot(slot: AdminMediaPlacementSlot) {
    setPlacementSlots((current) =>
      current.map((existing) =>
        existing.slotKey === slot.slotKey ? slot : existing,
      ),
    );
  }

  async function assignPlacement(slotKey: MediaPlacementSlotKey, mediaId: number) {
    setMutatingPlacementSlotKey(slotKey);
    setNotice("");
    setPlacementError("");

    try {
      const updatedSlot = await assignMediaPlacement(slotKey, {
        media_id: mediaId,
      });
      upsertPlacementSlot(updatedSlot);
      setActivePlacementPickerSlotKey(null);
      setSelectedId(mediaId);
      setNotice(`${updatedSlot.pageLabel} ${updatedSlot.sectionLabel} placement updated.`);
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setMutatingPlacementSlotKey(null);
    }
  }

  async function clearPlacement(slotKey: MediaPlacementSlotKey) {
    const slot = placementSlots.find((candidate) => candidate.slotKey === slotKey);
    if (!slot?.assignment) return;

    setMutatingPlacementSlotKey(slotKey);
    setNotice("");
    setPlacementError("");

    try {
      await clearMediaPlacement(slotKey);
      setPlacementSlots((current) =>
        current.map((existing) =>
          existing.slotKey === slotKey
            ? { ...existing, assignment: null }
            : existing,
        ),
      );
      setNotice(`${slot.pageLabel} ${slot.sectionLabel} placement cleared.`);
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setMutatingPlacementSlotKey(null);
    }
  }

  function queueFiles(files: File[]) {
    const queued = files.map((file): UploadQueueItem => {
      const validationMessage = getUploadValidationMessage(file);

      return {
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        library: uploadLibrary,
        siteCategory: uploadLibrary === "site" ? DEFAULT_SITE_CATEGORY : "",
        service: uploadLibrary === "portfolio" ? uploadService : "",
        subCategory: uploadLibrary === "portfolio" ? uploadSubCategory : "",
        status: validationMessage ? "error" : "queued",
        progress: 0,
        message: validationMessage || "Ready",
      };
    });

    setUploadQueue((current) => [...current, ...queued]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeUpload(id: string) {
    setUploadQueue((current) => current.filter((item) => item.id !== id));
  }

  function updateUploadItemTarget(
    id: string,
    target:
      | {
          library: "portfolio";
          service: MediaService;
          subCategory: MediaSubCategory;
        }
      | {
          library: "site";
        },
  ) {
    setUploadItem(
      id,
      target.library === "site"
        ? {
            library: "site",
            siteCategory: DEFAULT_SITE_CATEGORY,
            service: "",
            subCategory: "",
          }
        : {
            library: "portfolio",
            siteCategory: "",
            service: target.service,
            subCategory: target.subCategory,
          },
    );
  }

  function setUploadItem(id: string, patch: Partial<UploadQueueItem>) {
    setUploadQueue((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  async function uploadDrafts() {
    const readyItems = uploadQueue.filter((item) => item.status === "queued");
    if (readyItems.length === 0) return;

    setIsUploading(true);
    const startingSortOrder =
      items.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;

    for (const [index, queueItem] of readyItems.entries()) {
      try {
        const validationMessage = getUploadValidationMessage(queueItem.file);
        if (validationMessage) {
          throw new Error(validationMessage || "JPEG, PNG, or WebP only");
        }
        if (!isValidUploadType(queueItem.file.type)) {
          throw new Error("JPEG, PNG, or WebP only");
        }

        let folder: string;
        let siteCategory: MediaSiteCategory | null = null;
        let service: MediaService | null = null;
        let subCategory: MediaSubCategory | null = null;

        if (queueItem.library === "site") {
          if (!queueItem.siteCategory) {
            throw new Error("Choose a site image category before uploading.");
          }
          siteCategory = queueItem.siteCategory;
          folder = getFolderForSiteCategory(siteCategory);
        } else {
          if (!queueItem.service || !queueItem.subCategory) {
            throw new Error("Choose a portfolio category before uploading.");
          }
          service = queueItem.service;
          subCategory = queueItem.subCategory;
          folder = getFolderForCategory(service, subCategory);
        }

        setUploadItem(queueItem.id, {
          status: "uploading",
          progress: 18,
          message: "Requesting upload URL",
        });

        const uploadFilename = getSafeUploadFilename(queueItem.file);
        const aspectRatio = await getImageAspectRatio(queueItem.file);
        const presign = await presignMediaUpload({
          filename: uploadFilename,
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
          filename: uploadFilename,
          src: presign.public_url,
          alt: "",
          library: queueItem.library,
          siteCategory,
          service,
          subCategory,
          aspectRatio,
          aspect_ratio: aspectRatio,
          sortOrder: startingSortOrder + index,
          crop_position: DEFAULT_MEDIA_CROP_POSITION,
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
    setMoveDestinationAvailable(null);
    try {
      const result = await checkMediaDestination({
        destination_key: moveKey.trim(),
        exclude_media_id: selectedItem.id,
      });
      setMoveDestinationAvailable(result.available);
      setMoveMessage(
        result.available
          ? "Destination is available."
          : "Destination already exists in the catalog or storage.",
      );
    } catch (error) {
      setMoveDestinationAvailable(false);
      setMoveMessage(getFriendlyError(error));
    } finally {
      setIsCheckingMove(false);
    }
  }

  async function moveSelected() {
    if (!selectedItem || selectedItem.status !== "draft") return;
    if (moveDestinationAvailable !== true) {
      setMoveMessage("Check destination availability before moving this draft.");
      return;
    }

    setIsMoving(true);
    setMoveMessage("");
    try {
      const result = await moveDraftMediaItem(selectedItem.id, {
        destination_key: moveKey.trim(),
      });
      upsertItem(result.item);
      setMoveMessage("Draft moved.");
      setMoveDestinationAvailable(null);
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
            : "Revalidation is not configured on the server.",
      );
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsRevalidating(false);
    }
  }

  function handleLibraryFilterChange(value: LibraryFilter) {
    setLibraryFilter(value);
    if (value === "site") {
      setServiceFilter("all");
      setSubCategoryFilter("all");
    }
  }

  function handleServiceFilterChange(value: "all" | MediaService) {
    setServiceFilter(value);
    if (value !== "all") setLibraryFilter("portfolio");
  }

  function handleSubCategoryFilterChange(value: "all" | MediaSubCategory) {
    setSubCategoryFilter(value);
    if (value !== "all") setLibraryFilter("portfolio");
  }

  function handleUploadTargetChange(
    target:
      | {
          library: "portfolio";
          service: MediaService;
          subCategory: MediaSubCategory;
        }
      | {
          library: "site";
        },
  ) {
    setUploadLibrary(target.library);
    if (target.library === "portfolio") {
      setUploadService(target.service);
      setUploadSubCategory(target.subCategory);
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
      <AdminMediaLogin
        email={loginEmail}
        error={loginError}
        isSending={isSendingLink}
        message={loginMessage}
        onEmailChange={setLoginEmail}
        onSubmit={sendMagicLink}
      />
    );
  }

  return (
    <AdminMediaLibrary
      affectedPages={affectedPages}
      archiveSelectionIds={archiveSelectionIds}
      batchArchiveFeedback={batchArchiveFeedback}
      canMove={Boolean(canMove)}
      catalogError={catalogError}
      counts={counts}
      editor={editor}
      fileInputRef={fileInputRef}
      items={items}
      filteredItems={filteredItems}
      selectedBatchItems={selectedBatchItems}
      isCheckingMove={isCheckingMove}
      isBatchArchiving={isBatchArchiving}
      isLoadingCatalog={isLoadingCatalog}
      isLoadingPlacements={isLoadingPlacements}
      isMoving={isMoving}
      isMutatingPlacement={mutatingPlacementSlotKey}
      isRevalidating={isRevalidating}
      isSaving={isSaving}
      isUploading={isUploading}
      moveDestinationAvailable={moveDestinationAvailable}
      moveKey={moveKey}
      moveMessage={moveMessage}
      notice={notice}
      placementError={placementError}
      placementSlots={placementSlots}
      activePlacementPickerSlotKey={activePlacementPickerSlotKey}
      publishBlocked={Boolean(publishBlocked)}
      query={query}
      selectedId={selectedId}
      selectedItem={selectedItem}
      selectedPlacementUsages={selectedPlacementUsages}
      libraryFilter={libraryFilter}
      serviceFilter={serviceFilter}
      serviceSubCategories={serviceSubCategories}
      session={session}
      sortMode={sortMode}
      statusFilter={statusFilter}
      subCategoryFilter={subCategoryFilter}
      uploadQueue={uploadQueue}
      uploadLibrary={uploadLibrary}
      uploadReadyCount={uploadReadyCount}
      uploadService={uploadService}
      uploadSubCategory={uploadSubCategory}
      onArchive={() => void saveEditor({ status: "archived" })}
      onArchiveSelected={() => void archiveSelectedItems()}
      onArchiveSelectionToggle={toggleArchiveSelection}
      onAssignPlacement={(slotKey, mediaId) => void assignPlacement(slotKey, mediaId)}
      onCheckDestination={checkDestination}
      onClearArchiveSelection={clearArchiveSelection}
      onClearPlacement={(slotKey) => void clearPlacement(slotKey)}
      onClearNotice={() => {
        setCatalogError("");
        setPlacementError("");
        setNotice("");
      }}
      onEditSelectedArchiveItem={editSelectedArchiveItem}
      onFilesSelected={queueFiles}
      onLogout={handleLogout}
      onMove={moveSelected}
      onMoveKeyChange={(value) => {
        setMoveKey(value);
        setMoveDestinationAvailable(null);
        setMoveMessage("");
      }}
      onRemoveUpload={removeUpload}
      onRestore={() => void restoreSelected()}
      onSave={() => void saveEditor()}
      onLibraryFilterChange={handleLibraryFilterChange}
      onSearchChange={setQuery}
      onSelectedIdChange={selectSingleItem}
      onServiceFilterChange={handleServiceFilterChange}
      onSortModeChange={setSortMode}
      onStatusFilterChange={setStatusFilter}
      onSubCategoryFilterChange={handleSubCategoryFilterChange}
      onPlacementPickerSlotChange={setActivePlacementPickerSlotKey}
      onTriggerRevalidate={triggerRevalidate}
      onUpdateEditor={updateEditor}
      onUploadDrafts={uploadDrafts}
      onUpdateUploadItemTarget={updateUploadItemTarget}
      onUploadTargetChange={handleUploadTargetChange}
    />
  );
}
