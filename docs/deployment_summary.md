# Deployment Summary

## Latest deploy summary

- Added Site Images support to the media manager for non-portfolio website images.
- Updated media upload, editing, filtering, and placement assignment so portfolio images and site images can be managed separately.
- Site image drafts can now be published, archived, restored, and assigned to page placements from the admin dashboard.
- Upload filenames are normalized automatically so images with spaces or uppercase filenames can be added safely.
- Added placement support for the About page Beyond the Camera image and individual Services overview cards.

## Notes for internal team

- Frontend now sends `library: "portfolio" | "site"` and `siteCategory` metadata according to the media backend contract.
- Portfolio image flows still use service and sub-category metadata; site image flows clear those fields, send `siteCategory: "Misc"`, and upload to `site/misc`.
- Placement picker keeps all published media available, including published Site Images.
- Upload flow now uses a sanitized lowercase filename for both presign and catalog creation.
- Added `about.beyond_camera` and `services.card.*` placement slot keys; services card slots are separate from existing service detail hero slots.
- Public gallery mapping now ignores any accidental Site Images records returned by catalog payloads.

## Changed URLs

- https://ifferspictures.com/admin/media
