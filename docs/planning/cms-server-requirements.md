# CMS Server Requirements — Gaps & Additions

Additions needed to the PVS API server (`api.pixelversestudios.io`) to support the client CMS dashboard, based on the existing CMS Integration Guide.

---

## 1. New Endpoint: Presigned Upload URL

The dashboard needs to upload images directly to R2 without proxying through the server. Add a presigned URL endpoint.

### `POST /api/cms/clients/:clientId/upload/presign`

**Auth:** Editor or Admin for this client

**Request Body:**
```json
{
  "filename": "baby-shower-15.jpg",
  "content_type": "image/jpeg",
  "folder": "events/baby-shower"
}
```

**Server Logic:**
1. Verify auth + role (editor or admin for this client)
2. Generate a sanitized R2 key: `{clientId}/{folder}/{timestamp}-{sanitized-filename}`
3. Generate a presigned PUT URL using R2's S3-compatible API (15-minute expiry)
4. Return the presigned URL and the public URL the file will be accessible at

**Response 200:**
```json
{
  "presigned_url": "https://<account>.r2.cloudflarestorage.com/...",
  "public_url": "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev/events/baby-shower/1712345678-baby-shower-15.jpg",
  "r2_key": "events/baby-shower/1712345678-baby-shower-15.jpg"
}
```

**Upload Flow:**
```
1. Dashboard calls POST /api/cms/clients/:clientId/upload/presign
2. Server returns { presigned_url, public_url, r2_key }
3. Dashboard uploads file directly to R2 via PUT to presigned_url
4. Dashboard uses public_url as the value in the CMS content field
```

**Environment Variables Needed on Server:**
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ACCOUNT_ID`
- `R2_BUCKET_NAME` (per client, or a shared bucket with client-scoped prefixes)
- `R2_PUBLIC_BASE_URL` (e.g., `https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev`)

**Optional Enhancement:** An endpoint to delete R2 objects when images are removed from CMS:

### `DELETE /api/cms/clients/:clientId/upload`

**Auth:** Editor or Admin

**Request Body:**
```json
{
  "r2_key": "events/baby-shower/1712345678-baby-shower-15.jpg"
}
```

---

## 2. New Template Field Type: `image_gallery`

Add a first-class `image_gallery` field type to the template system. This is reusable for any PVS client with image-heavy content (photographers, restaurants, portfolios, etc.).

### Field Definition (in template.fields)

```json
{
  "key": "gallery_images",
  "label": "Portfolio Gallery",
  "type": "image_gallery",
  "required": false,
  "description": "Drag to reorder. Organize by sub-category.",
  "config": {
    "max_images": 200,
    "allowed_types": ["image/jpeg", "image/png", "image/webp"],
    "sub_categories": true
  }
}
```

### Content Value Shape (stored in page.content)

```json
{
  "gallery_images": {
    "groups": [
      {
        "name": "Baby Shower",
        "slug": "baby-shower",
        "sort_order": 0,
        "images": [
          {
            "src": "https://pub-....r2.dev/events/baby-shower/baby-shower-01.jpg",
            "alt": "Mother-to-be opening gifts at baby shower",
            "aspect_ratio": "portrait",
            "r2_key": "events/baby-shower/baby-shower-01.jpg",
            "sort_order": 0
          },
          {
            "src": "...",
            "alt": "...",
            "aspect_ratio": "landscape",
            "r2_key": "...",
            "sort_order": 1
          }
        ]
      },
      {
        "name": "Bridal Shower",
        "slug": "bridal-shower",
        "sort_order": 1,
        "images": [...]
      }
    ]
  }
}
```

### Validation Rules for `image_gallery`

| Rule | Error |
|---|---|
| Total images across all groups exceeds `config.max_images` | 400 "Exceeds maximum of {max_images} images" |
| Image `src` is not a valid URL | 400 field-level error |
| Image missing `src` | 400 field-level error |
| `aspect_ratio` not one of portrait/landscape/square/video | 400 field-level error |
| Group missing `name` or `slug` | 400 field-level error |

### Dashboard Rendering

The dashboard renders this field type as:
- Collapsible sub-category sections
- Each section has a drag-drop image grid
- Upload button per section (auto-assigns folder based on group slug)
- Drag to reorder within a group
- Move images between groups
- Inline alt-text editing
- Aspect ratio auto-detected on upload

---

## 3. Updated Field Type Table

Add `image_gallery` to the existing field type table in the documentation:

| Type | Content Value | Dashboard Input |
|------|--------------|-----------------|
| `text` | string | Single-line text input |
| `richtext` | string (HTML) | Rich text editor |
| `image` | string (URL) | Image upload/URL input |
| `number` | number | Number input |
| `boolean` | boolean | Toggle/checkbox |
| `select` | string | Dropdown |
| `array` | any[] | Repeatable list |
| `json` | any | Raw JSON editor |
| **`image_gallery`** | **{ groups: ImageGroup[] }** | **Grouped image grid with drag-drop, upload, reorder, alt-text editing** |

---

## 4. R2 Configuration — Multi-Tenant Considerations

Two approaches for R2 storage across clients:

**Option A: Shared bucket, client-scoped prefixes** (recommended)
- Single R2 bucket for all PVS clients
- Object keys prefixed with client ID: `{clientId}/events/baby-shower/photo.jpg`
- One set of R2 credentials on the server
- Simpler to manage

**Option B: Per-client R2 buckets**
- Each client has their own R2 bucket
- Bucket info stored in client record
- More isolation but more operational overhead

**Recommendation:** Option A. Store `r2_bucket_name` and `r2_public_base_url` in the client record so they can be overridden per client if needed, but default to the shared bucket.

### Client Record Addition

```json
{
  "id": "64f98d33-...",
  "company_name": "Iffer's Pictures",
  "r2_config": {
    "bucket": "iffers-pictures",
    "public_base_url": "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev",
    "key_prefix": ""
  }
}
```

If `r2_config` is null, use the shared PVS defaults.

---

## 5. Dashboard Hostname Routing

The CMS dashboard will support custom domains per client (Option C from planning). The server doesn't need changes for this — it's purely a frontend concern. But the server should expose client metadata so the dashboard can resolve hostname-to-client mapping.

### Option A: Static config in dashboard env

```
VITE_HOSTNAME_MAP='{"dashboard.ifferspictures.com":"64f98d33-..."}'
```

### Option B: New endpoint (preferred, scales better)

### `GET /api/cms/resolve-hostname?hostname=dashboard.ifferspictures.com`

**Auth:** None (public, used before login)

**Response 200:**
```json
{
  "client_id": "64f98d33-184b-496e-a664-a1bba8d04e2c",
  "client_name": "Iffer's Pictures",
  "branding": {
    "logo_url": "https://...",
    "primary_color": "#1a9b8e"
  }
}
```

**Response 404:** Hostname not recognized

This requires a `cms_hostname` column on the clients table (or a separate `client_domains` table).

---

## 6. Template Definitions for Iffer's Pictures

These are the templates Phil (PVS admin) would create for client `64f98d33-...`:

### Template: "Homepage" (slug: `homepage`)

| Field Key | Label | Type | Required | Notes |
|---|---|---|---|---|
| `hero_image` | Hero Background Image | image | yes | Full-screen hero |
| `hero_headline_1` | Headline Line 1 | text | yes | e.g., "Heartfelt Moments," |
| `hero_headline_2` | Headline Line 2 | text | yes | e.g., "Beautifully Captured" |
| `hero_subtext` | Hero Supporting Text | text | yes | |
| `intro_quote` | Intro Quote | text | yes | "I don't just take photos..." |
| `headshot` | Photographer Headshot | image | yes | Portrait photo |
| `mosaic_image_1` | Mosaic Image 1 | image | yes | Featured work grid |
| `mosaic_image_2` | Mosaic Image 2 | image | yes | |
| `mosaic_image_3` | Mosaic Image 3 | image | yes | |
| `mosaic_image_4` | Mosaic Image 4 | image | yes | |
| `mosaic_image_5` | Mosaic Image 5 | image | yes | |
| `mosaic_image_6` | Mosaic Image 6 | image | yes | |

### Template: "About Page" (slug: `about`)

| Field Key | Label | Type | Required |
|---|---|---|---|
| `headshot` | Photographer Portrait | image | yes |
| `bio_text` | Bio Content | richtext | yes |
| `tagline` | Tagline | text | no |

### Template: "Events Gallery" (slug: `events-gallery`)

| Field Key | Label | Type | Required | Notes |
|---|---|---|---|---|
| `primary_image` | Session Card & Hero Image | image | yes | Appears on sessions page card and service page hero |
| `gallery_images` | Portfolio Gallery | image_gallery | no | All event photos organized by sub-category |

### Template: "Family Gallery" (slug: `family-gallery`)

Same structure as Events Gallery.

### Template: "Maternity Gallery" (slug: `maternity-gallery`)

Same structure as Events Gallery.

### Template: "Couples & Engagement Gallery" (slug: `couples-gallery`)

Same structure as Events Gallery.

### Template: "Portrait Gallery" (slug: `portrait-gallery`)

Same structure as Events Gallery.

---

## Summary of Server Changes Needed

| Change | Priority | Complexity |
|---|---|---|
| `POST /api/cms/clients/:clientId/upload/presign` | High | Medium — needs R2 S3 SDK integration |
| `DELETE /api/cms/clients/:clientId/upload` | Medium | Low — S3 DeleteObject |
| `image_gallery` field type + validation | High | Medium — new content shape + validation rules |
| `GET /api/cms/resolve-hostname` endpoint | Medium | Low — simple DB lookup |
| `cms_hostname` column or `client_domains` table | Medium | Low — schema addition |
| `r2_config` on client record | Medium | Low — JSONB column |
