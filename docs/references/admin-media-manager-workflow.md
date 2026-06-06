# Admin Media Manager Workflow

Durable operating and QA guide for the Iffer's Pictures media manager at
`/admin/media`.

The media manager replaces the legacy `/image-review` and manual
`portfolioData.ts` workflow for normal image changes. The older manual R2 guide
in `docs/references/r2-image-workflow.md` remains useful only as a fallback
reference for folder conventions, static catalog history, and emergency manual
maintenance.

Server contracts:

- `/Users/phil/PVS-local/Projects/pvs/pixelverse-studios-server/docs/media-api.md`
- `/Users/phil/PVS-local/Projects/pvs/pixelverse-studios-server/docs/media-admin-auth.md`

Design baselines:

- `designs/admin-media-library-browse-mockup.png`
- `designs/admin-media-upload-flow-mockup.png`
- `designs/admin-media-draft-review-publish-queue-mockup.png`
- `designs/admin-media-empty-loading-error-states-mockup.png`
- `designs/admin-media-image-editor-mockup.png`
- `designs/admin-media-archive-restore-mockup.png`
- `designs/admin-media-move-rename-mockup.png`
- `designs/admin-media-reorder-mode-mockup.png`
- `designs/admin-media-magic-link-login-mockup.png`

## Entry Points

| Purpose | URL |
| --- | --- |
| Admin media manager | `https://ifferspictures.com/admin/media` |
| Magic-link callback | `https://ifferspictures.com/admin/media/auth/callback?token=...` |
| Legacy image review | `https://ifferspictures.com/image-review` redirects to `/admin/media` |
| Public catalog proxy | `/api/media/iffers-pictures/catalog` |
| Admin auth proxy | `/api/media-admin/auth/*` |
| Admin media proxy | `/api/media/iffers-pictures/admin/*` |
| Frontend revalidation webhook | `/api/media/revalidate` |

## Jenn Workflow

### Sign In

1. Open `/admin/media`.
2. Enter the approved admin email address.
3. Click the emailed sign-in link before it expires.
4. The link opens `/admin/media/auth/callback`, exchanges the one-time token,
   and sets an HTTP-only admin session cookie.
5. After the callback succeeds, the browser redirects back to `/admin/media`.

Expected behavior:

- The request form always says a link was sent when possible so approved email
  status is not exposed.
- Expired or already-used links show an error and require requesting a new link.
- Sessions expire according to the server `MEDIA_ADMIN_SESSION_TTL_HOURS`
  setting.
- Logging out clears the local admin session and returns to the sign-in screen.

### Browse And Filter

The library shows draft, published, and archived catalog items from the protected
admin catalog. Jenn can use:

- Sidebar service/sub-category navigation.
- Search by filename, key, alt text, service, or sub-category.
- Status filters: `All`, `Draft`, `Published`, and `Archived`.
- Sort modes such as newest, oldest, filename, and sort order.

Published public pages never read the admin catalog directly. They read the
public catalog, which includes only `published` items.

### Upload Drafts

1. Pick the target category before choosing files.
2. Choose JPEG, PNG, or WebP files.
3. Confirm each queued image has the intended service and sub-category. Each
   queued image keeps its own category selection.
4. Click `Upload drafts`.
5. The browser requests a presigned R2 upload URL from the server, uploads the
   file directly to R2, then creates a draft catalog item.

Important rules:

- Uploads start as `draft`.
- Uploads must pass frontend and server file type/size validation.
- The current frontend limit is 10 MB per image, matching the server default
  unless `MEDIA_MAX_UPLOAD_BYTES` changes.
- The browser uploads directly to the presigned R2 URL with the same
  `Content-Type` used for presign. R2 CORS must allow browser `PUT` uploads
  from the deployed frontend origin.
- Drafts do not appear on public pages until published.

### Label And Publish

Select a draft and complete:

- `Alt text`
- `Service`
- `Sub-category`
- `Aspect ratio`
- Optional `Sort order`

Publishing is blocked until required metadata is present. The server enforces
the same requirements and returns structured media errors such as
`media.missing_alt_text`, `media.missing_service`,
`media.missing_sub_category`, and `media.missing_aspect_ratio`.

After saving with status `Published`, the item becomes eligible for the public
catalog and the server triggers public page revalidation when configured.

### Sort And Reorder

Use `Sort order` to control image ordering in public galleries and category
views. Lower values should appear earlier when public pages choose sort-order
priority. Changing sort order on a published item is a public-output mutation
and should trigger revalidation through the server workflow.

### Archive And Restore

Archive removes an image from the public catalog without deleting the R2 object.

Rules:

- Archive by selecting an item and clicking `Archive image`.
- Archived items remain visible in the admin catalog under the `Archived`
  filter.
- Archived items are locked for normal metadata edits.
- Restore archived media before editing it.
- Restore returns the item to `archivedFromStatus` when the server has that
  value; otherwise it returns to a safe non-archived status such as `draft`.

### Move Or Rename Drafts

Draft object location changes are allowed only while an item is still `draft`.
Published media cannot be moved or renamed from the generic metadata patch or
the dedicated move route.

1. Select a draft item.
2. Open `Move / rename draft`.
3. Enter the full destination key, such as
   `events/baby-shower/baby-shower-15.jpg`.
4. Click `Check`.
5. Move only after the destination check returns available.

The destination check looks for collisions in both the catalog and R2. If either
already contains the destination key, do not move the draft.

If a move response reports `source_deleted: false`, the catalog item moved but
the old R2 object cleanup failed. Treat that as an operator-visible warning and
investigate before retrying.

### Manual Revalidation

Use the `Revalidate` action when a public page does not reflect a recent media
change or when retrying after a webhook issue.

Automatic non-blocking revalidation runs after public-output mutations when the
server is configured:

- publishing a draft
- archiving published media
- restoring media to published
- editing published alt text, category, aspect ratio, or sort order
- moving or renaming a draft that later affects public output

Manual revalidation calls the protected server endpoint, which calls the Next.js
webhook at `/api/media/revalidate`.

## Category And Folder Mapping

The frontend maps friendly categories to R2 folders before requesting a
presigned upload URL.

| Service | Sub-category | Folder/key prefix |
| --- | --- | --- |
| `Events` | `Baby Shower` | `events/baby-shower` |
| `Events` | `Bridal Shower` | `events/bridal-shower` |
| `Events` | `Gender Reveal` | `events/milestones/gender-reveal` |
| `Events` | `Birthday` | `events/parties/birthdays` |
| `Events` | `Baptism` | `events/religious-ceremonies/baptism` |
| `Family` | `Family` | `family` |
| `Maternity` | `Maternity` | `maternity` |
| `Couples` | `Engagement` | `events/engagement` |
| `Couples` | `Proposal` | `events/proposal` |
| `Portrait` | `Portrait` | `portraits` |

The public page routing uses the service/sub-category metadata, not the folder
alone. Keep metadata accurate even when an R2 key is manually repaired.

## Public Catalog Behavior

Public pages request `GET /api/media/iffers-pictures/catalog` through the
Next.js same-origin proxy. The server returns published items only. Draft and
archived media are excluded.

The Next.js app falls back to the static catalog when `PVS_API_URL` is missing
or the public catalog request fails. This protects public pages during local
development or temporary API outages, but it also means local testing should
confirm whether the rendered images are from the live API or fallback data.

Review these public pages after image changes:

- `/`
- `/portfolio`
- `/services`
- `/services/events`
- `/services/family`
- `/services/maternity`
- `/services/couples-engagement`
- `/services/portrait`
- `/investment`
- `/faq`

## Environment Setup

### Next.js App

Configure locally in `.env.local` and in Vercel project environment variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `PVS_API_URL` | yes for managed media | Base URL for the Pixelverse server. The Next.js public/admin media proxy routes forward to this API. |
| `MEDIA_PUBLIC_BASE_URL` | recommended | Public media base URL allowed by Next.js image optimization. Use when one media host is expected. |
| `MEDIA_PUBLIC_BASE_URLS` | optional | Comma-separated public media base URLs when more than one host must be allowed. |
| `NEXT_PUBLIC_MEDIA_PUBLIC_BASE_URL` | optional | Backward-compatible public media base URL input; prefer server-only `MEDIA_PUBLIC_BASE_URL`. |
| `MEDIA_REVALIDATION_SECRET` | optional | Shared bearer secret required by `/api/media/revalidate` when configured. Must match the server value. |

Allowed image hosts are intentionally constrained in `next.config.ts`:

- `pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev`
- any HTTPS host ending in `.r2.dev`
- `media.ifferspictures.com`

After changing media image host environment variables in Vercel, redeploy the
Next.js app so the image optimizer uses the updated allowlist.

### Pixelverse Server

Configure in the Pixelverse server runtime environment.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MEDIA_ADMIN_EMAILS` | yes | Comma-separated approved admin email addresses. |
| `MEDIA_ADMIN_APP_BASE_URL` | yes | Frontend base URL used when building magic-link emails. Production should be `https://ifferspictures.com`. |
| `MEDIA_ADMIN_MAGIC_LINK_TTL_MINUTES` | optional | Magic-link expiry. Defaults to `15`. |
| `MEDIA_ADMIN_SESSION_TTL_HOURS` | optional | Session cookie lifetime. Defaults to `12`. |
| `MEDIA_ADMIN_REQUEST_MIN_RESPONSE_MS` | optional | Minimum request duration to reduce email probing. Defaults to `350`. |
| `GMAIL_USER` | yes | Sender account for magic-link email. |
| `GMAIL_APP_PASSWORD` | yes | Gmail app password for magic-link email. |
| `R2_ACCESS_KEY_ID` | yes | Server-only Cloudflare R2 access key. |
| `R2_SECRET_ACCESS_KEY` | yes | Server-only Cloudflare R2 secret key. |
| `R2_ACCOUNT_ID` | yes | Cloudflare account id for the S3-compatible endpoint. |
| `R2_BUCKET_NAME` | fallback | Fallback bucket when no per-client config exists. |
| `R2_PUBLIC_BASE_URL` | fallback | Fallback public object base URL. |
| `R2_PRESIGN_EXPIRES_SECONDS` | optional | Presigned upload URL expiry. Defaults to `900`. |
| `MEDIA_MAX_UPLOAD_BYTES` | optional | Max upload size. Defaults to 10 MB. |
| `MEDIA_REVALIDATION_WEBHOOK_URL` | recommended | Next.js webhook URL, usually `https://ifferspictures.com/api/media/revalidate`. |
| `MEDIA_REVALIDATION_SECRET` | optional | Bearer token sent to the Next.js webhook. Must match the Next.js value when set. |
| `MEDIA_REVALIDATION_TIMEOUT_MS` | optional | Webhook timeout. Defaults to `5000`. |
| `MEDIA_PUBLIC_CATALOG_MAX_AGE_SECONDS` | optional | Public catalog cache max-age. Defaults to `60`. |
| `MEDIA_PUBLIC_CATALOG_STALE_WHILE_REVALIDATE_SECONDS` | optional | Public catalog stale window. Defaults to `300`. |

Per-client R2 config is stored server-side in `media_r2_configs` and should
prefer:

- bucket: `iffers-pictures`
- public base URL: the current R2 public URL or custom media domain
- key prefix: empty unless the bucket becomes shared

### R2 Upload CORS

R2 must allow browser direct uploads from the deployed frontend origin because
the browser PUTs files to presigned R2 URLs. Confirm CORS allows:

- Origin: `https://ifferspictures.com` plus preview/local origins when needed.
- Methods: `PUT`, and any preflight `OPTIONS` handling Cloudflare requires.
- Headers: `Content-Type` and `Content-Length`.
- Content types: `image/jpeg`, `image/png`, and `image/webp`.

Do not expose permanent R2 credentials to the Next.js frontend. Presigned upload
creation stays on the Pixelverse server.

## QA Checklist

Use this checklist before considering the media manager release-ready.

### Auth

- [ ] Open `/admin/media` while signed out and see the magic-link login screen.
- [ ] Request a magic link with an approved admin email.
- [ ] Confirm the email link opens `/admin/media/auth/callback?token=...`.
- [ ] Confirm successful callback redirects to `/admin/media`.
- [ ] Confirm the admin catalog loads after sign-in.
- [ ] Request a link with an unapproved email and confirm the UI does not reveal whether the email is approved.
- [ ] Use an expired or already-used link and confirm the callback surfaces an error.
- [ ] Click logout and confirm the session clears.
- [ ] After session expiration, confirm `/admin/media` returns to the sign-in flow.

### Catalog And Filters

- [ ] Confirm published, draft, and archived counts are accurate after catalog load.
- [ ] Search by filename, key, alt text, service, and sub-category.
- [ ] Filter by each service parent item in the sidebar.
- [ ] Filter by nested sub-category under `Events` and `Couples`.
- [ ] Filter by `Draft`, `Published`, and `Archived`.
- [ ] Confirm mobile media navigation opens, closes, and selects filters without horizontal overflow.

### Upload And Draft Creation

- [ ] Select a target category before adding files.
- [ ] Queue multiple valid JPEG, PNG, or WebP files.
- [ ] Change the category on one queued image and confirm other queued images keep their own category.
- [ ] Try an unsupported file type and confirm it is rejected before upload.
- [ ] Try an over-limit file and confirm it is rejected before upload.
- [ ] Upload valid files and confirm each becomes a draft catalog item.
- [ ] Confirm each uploaded draft has the expected service, sub-category, aspect ratio, sort order, key, and public URL.

### Metadata And Publish

- [ ] Select a draft and edit alt text, service, sub-category, aspect ratio, and sort order.
- [ ] Try publishing without alt text and confirm the UI blocks it.
- [ ] Try publishing without service, sub-category, or aspect ratio and confirm the UI blocks it.
- [ ] Publish after required metadata is complete.
- [ ] Confirm the item moves to `Published` and remains selectable.
- [ ] Confirm published metadata edits save.

### Public Visibility

- [ ] Confirm a draft does not appear in the public catalog or public pages.
- [ ] Confirm a published item appears in the public catalog.
- [ ] Review `/`.
- [ ] Review `/portfolio`.
- [ ] Review `/services`.
- [ ] Review `/services/events`.
- [ ] Review `/services/family`.
- [ ] Review `/services/maternity`.
- [ ] Review `/services/couples-engagement`.
- [ ] Review `/services/portrait`.
- [ ] Review `/investment`.
- [ ] Review `/faq`.

### Archive And Restore

- [ ] Archive a published image.
- [ ] Confirm the archived image is removed from the public catalog.
- [ ] Confirm the archived image appears under the admin `Archived` filter.
- [ ] Confirm normal metadata fields are locked while archived.
- [ ] Restore the archived image.
- [ ] Confirm restore returns it to the prior status when `archivedFromStatus` is present.
- [ ] Confirm metadata edits work after restore.

### Draft Move And Rename

- [ ] Select a draft image.
- [ ] Enter a new destination key and run `Check`.
- [ ] Confirm an available destination enables `Move`.
- [ ] Move the draft and confirm key, filename, and src update.
- [ ] Confirm the old key no longer appears in the selected item details.
- [ ] Enter a destination key that already exists in the catalog or R2.
- [ ] Confirm collision blocks the move.
- [ ] Confirm published media shows draft-only move/rename behavior and cannot be moved.
- [ ] Confirm archived media must be restored before normal edits.

### Revalidation

- [ ] Publish a draft and confirm public pages refresh automatically when the server webhook is configured.
- [ ] Archive a published item and confirm public pages refresh automatically.
- [ ] Restore an item to published and confirm public pages refresh automatically.
- [ ] Change published sort order and confirm public pages refresh automatically.
- [ ] Click manual `Revalidate` and confirm success messaging when configured.
- [ ] Disable or omit server `MEDIA_REVALIDATION_WEBHOOK_URL` in a non-production test and confirm the UI reports that revalidation is not configured.
- [ ] Configure a bad `MEDIA_REVALIDATION_SECRET` in a non-production test and confirm webhook failures are visible without rolling back catalog mutations.

### Legacy Workflow

- [ ] Visit `/image-review` and confirm it redirects to `/admin/media`.
- [ ] Confirm no current operator documentation tells Jenn to use `/image-review`.
- [ ] Confirm public pages do not require editing `portfolioData.ts` for normal media changes.

## Release Notes

When this workflow ships, summarize to the client:

- Image updates now happen in the site admin media manager.
- New uploads remain hidden as drafts until Jenn adds required details and
  publishes them.
- Images can be archived and restored without deleting the original file.
- Public pages refresh through the managed media catalog after published image
  changes.
