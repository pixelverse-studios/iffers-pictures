"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
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
import {
  MEDIA_SUB_CATEGORIES,
  type AdminMediaItem,
  type MediaAdminSession,
  type MediaService,
  type MediaSubCategory,
} from "@/lib/media/types";
import { AdminMediaLibrary } from "./AdminMediaLibrary";
import { AdminMediaLogin } from "./AdminMediaLogin";
import { getFolderForCategory } from "./constants";
import type { AuthState, EditorState, SortMode, StatusFilter, UploadQueueItem } from "./types";
import {
  canPublish,
  filterItems,
  getAffectedPages,
  getErrorCode,
  getFriendlyError,
  getImageAspectRatio,
  getInitialEditorState,
  getStatusCounts,
  isValidUploadType,
} from "./utils";

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
  const [subCategoryFilter, setSubCategoryFilter] =
    useState<"all" | MediaSubCategory>("all");
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
    [items, selectedId],
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
    [items, query, serviceFilter, sortMode, statusFilter, subCategoryFilter],
  );

  const serviceSubCategories =
    serviceFilter === "all" ? [] : MEDIA_SUB_CATEGORIES[serviceFilter];
  const publishBlocked = editor?.status === "published" && !canPublish(editor);
  const canMove = selectedItem?.status === "draft";
  const uploadReadyCount = uploadQueue.filter((item) => item.status === "queued").length;
  const affectedPages = getAffectedPages(selectedItem);

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

  function updateEditor<Key extends keyof EditorState>(
    key: Key,
    value: EditorState[Key],
  ) {
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
    setItems((current) =>
      current.map((existing) => (existing.id === item.id ? item : existing)),
    );
    setSelectedId(item.id);
  }

  function queueFiles(files: File[]) {
    const queued = files.map((file): UploadQueueItem => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      status: isValidUploadType(file.type) ? "queued" : "error",
      progress: 0,
      message: isValidUploadType(file.type) ? "Ready" : "JPEG, PNG, or WebP only",
    }));

    setUploadQueue((current) => [...current, ...queued]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeUpload(id: string) {
    setUploadQueue((current) => current.filter((item) => item.id !== id));
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
          : "Destination already exists in the catalog or storage.",
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
            : "Revalidation is not configured on the server.",
      );
    } catch (error) {
      setNotice(getFriendlyError(error));
    } finally {
      setIsRevalidating(false);
    }
  }

  if (authState === "checking") {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--background)] px-6 pt-hero">
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
      canMove={Boolean(canMove)}
      catalogError={catalogError}
      counts={counts}
      editor={editor}
      fileInputRef={fileInputRef}
      filteredItems={filteredItems}
      isCheckingMove={isCheckingMove}
      isLoadingCatalog={isLoadingCatalog}
      isMoving={isMoving}
      isRevalidating={isRevalidating}
      isSaving={isSaving}
      isUploading={isUploading}
      moveKey={moveKey}
      moveMessage={moveMessage}
      notice={notice}
      publishBlocked={Boolean(publishBlocked)}
      query={query}
      selectedId={selectedId}
      selectedItem={selectedItem}
      serviceFilter={serviceFilter}
      serviceSubCategories={serviceSubCategories}
      session={session}
      sortMode={sortMode}
      statusFilter={statusFilter}
      subCategoryFilter={subCategoryFilter}
      uploadQueue={uploadQueue}
      uploadReadyCount={uploadReadyCount}
      uploadService={uploadService}
      uploadSubCategory={uploadSubCategory}
      onArchive={() => void saveEditor({ status: "archived" })}
      onCheckDestination={checkDestination}
      onClearNotice={() => {
        setCatalogError("");
        setNotice("");
      }}
      onFilesSelected={queueFiles}
      onLogout={handleLogout}
      onMove={moveSelected}
      onMoveKeyChange={setMoveKey}
      onRemoveUpload={removeUpload}
      onRestore={() => {
        const status = selectedItem?.archivedFromStatus ?? "draft";
        void saveEditor({ status });
      }}
      onSave={() => void saveEditor()}
      onSearchChange={setQuery}
      onSelectedIdChange={setSelectedId}
      onServiceFilterChange={setServiceFilter}
      onSortModeChange={setSortMode}
      onStatusFilterChange={setStatusFilter}
      onSubCategoryFilterChange={setSubCategoryFilter}
      onTriggerRevalidate={triggerRevalidate}
      onUpdateEditor={updateEditor}
      onUploadDrafts={uploadDrafts}
      onUploadTargetChange={(service, subCategory) => {
        setUploadService(service);
        setUploadSubCategory(subCategory);
      }}
    />
  );
}
