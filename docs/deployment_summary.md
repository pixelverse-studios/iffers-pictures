# Deployment Summary

## Latest deploy summary

- Added Site Images support to the media manager for non-portfolio website images.
- Updated media upload, editing, filtering, and placement assignment so portfolio images and site images can be managed separately.
- Site image drafts can now be published, archived, restored, and assigned to page placements from the admin dashboard.
- Upload filenames are normalized automatically so images with spaces or uppercase filenames can be added safely.
- Added placement support for the About page Beyond the Camera image and individual Services overview cards.
- Added an Image focus control so cropped media images can show more of the top, center, or bottom of the photo.
- Updated session, portfolio, service, homepage, and investment image crops to use saved crop-position preferences when available.
- Refined the Image focus field so its guidance appears in a compact tooltip instead of taking up extra form space.
- Added a Gallery position tooltip to explain how gallery ordering works.
- Widened the selected-media editing workspace so the preview, placement context, and editing controls are easier to use together on desktop.
- Rebalanced the single-image editor so preview-related context, public visibility, and R2 details sit with the image while editing controls stay grouped together.
- Redesigned the single-image editor into a summary-first layout with image context up top and editable details grouped below.
- Updated media selection so selecting one image opens the edit view directly, while selecting multiple images still opens the batch archive list.
- Removed the empty selected-media panel when no image is selected so the media library can use the full workspace.
- Added a smooth width-aware fade transition when the selected-media inspector opens and closes.
- Moved media uploads into the right-side workspace so the upload flow opens from the header instead of staying visible in the library grid.
- Public visibility links in the media editor now open in a new tab.
- The media editor preview now updates immediately when Image focus is changed, before saving.
- The media editor preview now updates immediately when Aspect ratio is changed, before saving.
- Updated the media editor preview so image focus and aspect ratio changes are shown in one full-width crop preview without blank space.
- Added left and right image focus options for photos that need horizontal crop adjustment.
- Centered constrained portrait and square preview frames in the media editor so they do not sit awkwardly against the left edge.
- Frontend now reads and writes backend `aspect_ratio` metadata while safely normalizing invalid or missing aspect-ratio values.

## Notes for internal team

- Frontend now sends `library: "portfolio" | "site"` and `siteCategory` metadata according to the media backend contract.
- Portfolio image flows still use service and sub-category metadata; site image flows clear those fields, send `siteCategory: "Misc"`, and upload to `site/misc`.
- Placement picker keeps all published media available, including published Site Images.
- Upload flow now uses a sanitized lowercase filename for both presign and catalog creation.
- Added `about.beyond_camera` and `services.card.*` placement slot keys; services card slots are separate from existing service detail hero slots.
- Public gallery mapping now ignores any accidental Site Images records returned by catalog payloads.
- Frontend now reads `cropPosition` or `crop_position`, normalizes unsupported values to `center center`, and sends `crop_position` on media create/update requests.
- Crop position is currently limited to `left center`, `center top`, `center center`, `center bottom`, and `right center`.

## Changed URLs

- https://ifferspictures.com/admin/media
- https://ifferspictures.com/services
- https://ifferspictures.com/portfolio
- https://ifferspictures.com/investment
