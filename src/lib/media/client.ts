import { parseMediaApiResponse } from "./errors";
import {
  IFFERS_MEDIA_WEBSITE_SLUG,
  type AdminMediaPlacementsResponse,
  type AdminMediaItem,
  type AssignMediaPlacementRequest,
  type AssignMediaPlacementResponse,
  type ClearMediaPlacementResponse,
  type CreateDraftMediaItemRequest,
  type DestinationCheckRequest,
  type DestinationCheckResponse,
  type LogoutResponse,
  type MagicLinkResponse,
  type MediaAdminSession,
  type MediaCatalog,
  type MediaPlacementSlotKey,
  type MoveMediaItemRequest,
  type MoveMediaItemResponse,
  type PatchMediaItemRequest,
  type PresignUploadRequest,
  type PresignUploadResponse,
  type PublicMediaPlacementsResponse,
  type PublicMediaItem,
  type R2ObjectListResponse,
  type RevalidateMediaRequest,
  type RevalidateMediaResponse,
} from "./types";

const MEDIA_ROOT = `/api/media/${IFFERS_MEDIA_WEBSITE_SLUG}`;
const MEDIA_AUTH_ROOT = "/api/media-admin/auth";

interface JsonRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function requestJson<T>(
  path: string,
  { body, headers, ...init }: JsonRequestOptions = {}
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseMediaApiResponse<T>(response);
}

async function requestAdminJson<T>(
  path: string,
  options: JsonRequestOptions = {}
): Promise<T> {
  return requestJson<T>(path, {
    ...options,
    credentials: "include",
  });
}

export function getPublicMediaCatalog(): Promise<MediaCatalog<PublicMediaItem>> {
  return requestJson<MediaCatalog<PublicMediaItem>>(`${MEDIA_ROOT}/catalog`, {
    method: "GET",
  });
}

export function getPublicMediaPlacements(): Promise<PublicMediaPlacementsResponse> {
  return requestJson<PublicMediaPlacementsResponse>(`${MEDIA_ROOT}/placements`, {
    method: "GET",
  });
}

export function requestMediaAdminMagicLink(
  email: string
): Promise<MagicLinkResponse> {
  return requestAdminJson<MagicLinkResponse>(`${MEDIA_AUTH_ROOT}/magic-link`, {
    method: "POST",
    body: { email },
  });
}

export function completeMediaAdminSignIn(
  token: string
): Promise<MediaAdminSession> {
  return requestAdminJson<MediaAdminSession>(`${MEDIA_AUTH_ROOT}/callback`, {
    method: "POST",
    body: { token },
  });
}

export function getMediaAdminSession(): Promise<MediaAdminSession> {
  return requestAdminJson<MediaAdminSession>(`${MEDIA_AUTH_ROOT}/session`, {
    method: "GET",
  });
}

export function logoutMediaAdmin(): Promise<LogoutResponse> {
  return requestAdminJson<LogoutResponse>(`${MEDIA_AUTH_ROOT}/logout`, {
    method: "POST",
  });
}

export function getAdminMediaCatalog(): Promise<MediaCatalog<AdminMediaItem>> {
  return requestAdminJson<MediaCatalog<AdminMediaItem>>(
    `${MEDIA_ROOT}/admin/catalog`,
    {
      method: "GET",
    }
  );
}

export function getAdminMediaPlacements(): Promise<AdminMediaPlacementsResponse> {
  return requestAdminJson<AdminMediaPlacementsResponse>(
    `${MEDIA_ROOT}/admin/placements`,
    {
      method: "GET",
    }
  );
}

export function assignMediaPlacement(
  slotKey: MediaPlacementSlotKey,
  payload: AssignMediaPlacementRequest
): Promise<AssignMediaPlacementResponse> {
  return requestAdminJson<AssignMediaPlacementResponse>(
    `${MEDIA_ROOT}/admin/placements/${encodeURIComponent(slotKey)}`,
    {
      method: "PUT",
      body: payload,
    }
  );
}

export function clearMediaPlacement(
  slotKey: MediaPlacementSlotKey
): Promise<ClearMediaPlacementResponse> {
  return requestAdminJson<ClearMediaPlacementResponse>(
    `${MEDIA_ROOT}/admin/placements/${encodeURIComponent(slotKey)}`,
    {
      method: "DELETE",
    }
  );
}

export function presignMediaUpload(
  payload: PresignUploadRequest
): Promise<PresignUploadResponse> {
  return requestAdminJson<PresignUploadResponse>(
    `${MEDIA_ROOT}/admin/uploads/presign`,
    {
      method: "POST",
      body: payload,
    }
  );
}

export async function uploadToPresignedMediaUrl({
  file,
  presignedUrl,
  contentType = file.type,
}: {
  file: File;
  presignedUrl: string;
  contentType?: string;
}): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  await parseMediaApiResponse<void>(response);
}

export function createDraftMediaItem(
  payload: CreateDraftMediaItemRequest
): Promise<AdminMediaItem> {
  return requestAdminJson<AdminMediaItem>(`${MEDIA_ROOT}/admin/items`, {
    method: "POST",
    body: payload,
  });
}

export function patchMediaItem(
  id: number,
  payload: PatchMediaItemRequest
): Promise<AdminMediaItem> {
  return requestAdminJson<AdminMediaItem>(`${MEDIA_ROOT}/admin/items/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function listMediaObjects(
  prefix?: string
): Promise<R2ObjectListResponse> {
  const search = prefix ? `?prefix=${encodeURIComponent(prefix)}` : "";

  return requestAdminJson<R2ObjectListResponse>(
    `${MEDIA_ROOT}/admin/objects${search}`,
    {
      method: "GET",
    }
  );
}

export function checkMediaDestination(
  payload: DestinationCheckRequest
): Promise<DestinationCheckResponse> {
  return requestAdminJson<DestinationCheckResponse>(
    `${MEDIA_ROOT}/admin/objects/check-destination`,
    {
      method: "POST",
      body: payload,
    }
  );
}

export function moveDraftMediaItem(
  id: number,
  payload: MoveMediaItemRequest
): Promise<MoveMediaItemResponse> {
  return requestAdminJson<MoveMediaItemResponse>(
    `${MEDIA_ROOT}/admin/items/${id}/move`,
    {
      method: "POST",
      body: payload,
    }
  );
}

export function revalidateMediaCatalog(
  payload: RevalidateMediaRequest = {}
): Promise<RevalidateMediaResponse> {
  return requestAdminJson<RevalidateMediaResponse>(
    `${MEDIA_ROOT}/admin/revalidate`,
    {
      method: "POST",
      body: payload,
    }
  );
}
