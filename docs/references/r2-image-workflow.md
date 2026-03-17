# R2 Image Processing Workflow

Reference guide for processing and uploading portfolio images to Cloudflare R2 for Iffer's Pictures.

## R2 Bucket Details

| Field | Value |
|-------|-------|
| Bucket Name | `iffers-pictures` (public) |
| Public URL | `https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev` |
| Access | Public read, managed via Cloudflare dashboard |

## Folder Structure

R2 folders mirror the service page architecture:

```
events/
├── baby-shower/baby-shower-01.jpg
├── bridal-shower/bridal-shower-01.jpg
├── engagement/engagement-01.jpg
├── milestones/gender-reveal/gender-reveal-01.jpg
├── parties/birthdays/birthday-01.jpg
├── proposal/proposal-01.jpg
└── religious-ceremonies/baptism/baptism-01.jpg
family/family-01.jpg
maternity/maternity-01.jpg
```

## Naming Convention

**Pattern:** `{leaf-folder-name}-{##}.jpg`

- Prefix matches the leaf folder name (kebab-case)
- Sequential number is zero-padded to 2 digits (`-01`, `-02`, not `-1`, `-2`)
- Always `.jpg` format
- Each sub-category maintains its own sequential count

**Examples:**
- `events/baby-shower/baby-shower-01.jpg`
- `events/parties/birthdays/birthday-06.jpg`
- `family/family-27.jpg`

## Processing Steps

### 1. Receive images from client

Client typically sends via WeTransfer or direct file share. Images arrive as raw camera files (`_DSC*.jpg`, `DSC_*.jpg`) at full resolution (often 10-35MB each).

### 2. Organize into folder structure

Place images into `~/Downloads/iffers-pics/` matching the R2 folder structure. Create new sub-folders as needed.

### 3. Rename files

From the target folder, rename all files to match the naming convention. Continue numbering from the last existing file in that category.

```bash
cd ~/Downloads/iffers-pics/{path-to-folder}
i={START_NUMBER}
for f in $(ls -1 *.jpg | sort); do
  printf -v newname "{prefix}-%02d.jpg" "$i"
  mv "$f" "$newname"
  ((i++))
done
```

**Example** (new baby shower images, starting after existing 5):
```bash
cd ~/Downloads/iffers-pics/events/baby-shower
i=6
for f in $(ls -1 DSC_*.jpg | sort); do
  printf -v newname "baby-shower-%02d.jpg" "$i"
  mv "$f" "$newname"
  ((i++))
done
```

### 4. Resize and compress

Max 2000px on longest side, 80% JPEG quality. Target: under 1.5MB per file.

**Single folder:**
```bash
for f in ~/Downloads/iffers-pics/{path}/*.jpg; do
  sips -Z 2000 -s format jpeg -s formatOptions 80 "$f" --out "$f"
done
```

**All oversized files at once:**
```bash
find ~/Downloads/iffers-pics -name "*.jpg" -size +1500k | while read f; do
  sips -Z 2000 -s format jpeg -s formatOptions 80 "$f" --out "$f"
done
```

**Verify all files are under 1.5MB:**
```bash
find ~/Downloads/iffers-pics -name "*.jpg" -size +1500k | wc -l
# Should output: 0
```

### 5. Upload to R2

Upload via Cloudflare dashboard or Wrangler CLI, preserving the folder structure.

### 6. View images and write alt text

Use Claude Code's Read tool to view each image and write descriptive alt text. Alt text should:
- Describe what's visible in the image (people, setting, decorations, actions)
- Be specific but concise (one sentence)
- Not start with "Image of" or "Photo of"
- Include relevant event context (e.g., "at baby shower", "by Christmas tree")

### 7. Add to portfolioData.ts

File: `src/components/features/portfolio/portfolioData.ts`

Each image entry:
```typescript
{
  id: {next_sequential_id},
  src: `${R2_BASE}/{r2-path}/{filename}.jpg`,
  alt: "Descriptive alt text from step 6",
  service: "Events" | "Family" | "Maternity",
  subCategory: "Baby Shower" | "Bridal Shower" | "Engagement" | ... ,
  aspectRatio: "portrait" | "landscape" | "square",
}
```

- `id`: Continue from the last id in the array
- `service`: Tier 1 category
- `subCategory`: Tier 2 category (must match `SubCategory` type)
- `aspectRatio`: Determined by viewing the image — portrait (taller), landscape (wider), square

### 8. Clear Next.js image cache

After any image changes (including replacing existing files on R2):

```bash
rm -rf .next/cache/images
```

Then restart the dev server.

## Current Inventory

| R2 Path | Count | ID Range |
|---------|-------|----------|
| `events/baby-shower/` | 5 | 1-5 |
| `events/bridal-shower/` | 22 | 6-27 |
| `events/engagement/` | 15 | 28-42 |
| `events/milestones/gender-reveal/` | 12 | 43-54 |
| `events/parties/birthdays/` | 6 | 55-60 |
| `events/proposal/` | 6 | 61-66 |
| `events/religious-ceremonies/baptism/` | 6 | 67-72 |
| `family/` | 27 | 73-99 |
| `maternity/` | 17 | 100-116 |
| **Total** | **116** | **1-116** |

Next available id: **117**

## SERVICE_SLUG_MAP Reference

Maps service page slugs to portfolio categories for image display:

| Page Slug | Service | SubCategory |
|-----------|---------|-------------|
| `events` | Events | (all) |
| `baby-shower` | Events | Baby Shower |
| `bridal-shower` | Events | Bridal Shower |
| `engagement` | Events | Engagement |
| `gender-reveal` | Events | Gender Reveal |
| `parties` | Events | Birthday |
| `proposal` | Events | Proposal |
| `religious-ceremonies` | Events | Baptism |
| `milestones` | Events | (all) |
| `family` | Family | Family |
| `maternity` | Maternity | Maternity |

## Next.js Image Config

Remote image patterns are configured in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev" }
  ]
}
```
