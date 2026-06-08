# Media Revalidation Webhook

The Iffer's Pictures Next.js app exposes a media revalidation webhook at:

```text
https://ifferspictures.com/api/media/revalidate
```

Configure the Pixelverse media server with:

```text
MEDIA_REVALIDATION_WEBHOOK_URL=https://ifferspictures.com/api/media/revalidate
MEDIA_REVALIDATION_SECRET=<shared secret, optional>
```

Configure the same optional secret in this Next.js app:

```text
MEDIA_REVALIDATION_SECRET=<same shared secret>
```

When `MEDIA_REVALIDATION_SECRET` is set in the Next.js app, webhook requests
must include:

```text
Authorization: Bearer <shared secret>
```

The route accepts the payload documented in the server media API contract:

```text
/Users/phil/PVS-local/Projects/pvs/pixelverse-studios-server/docs/media-api.md
```

Behavior:

- Requests for `website_slug: "iffers-pictures"` revalidate every valid path in
  `affected_paths`.
- Requests for other website slugs return `200` and are ignored.
- Invalid bearer tokens return `401` when a secret is configured.
- Invalid payloads return `400`.
- Paths must be site-local paths such as `/`, `/portfolio`, or `/services/events`.
