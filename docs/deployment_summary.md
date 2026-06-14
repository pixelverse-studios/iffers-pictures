# Deployment Summary

## Latest deploy summary

- Refined the media admin navigation so image groups and nested categories are easier to scan.
- Improved page image spot cards so previews and action buttons stay readable when selected media details are open.
- Added CMS support for changing the image in the Inquire page "What happens next" section.
- Increased the height of the three homepage portfolio preview images below the hero.
- Improved media upload feedback so failed photo uploads can be retried without losing successful drafts.
- Improved media admin sign-in feedback so link requests show clearer sending, success, and recovery states.
- Fixed production media admin saves timing out after the media editor crop controls release.
- Media metadata edits now use the stable save payload while backend crop-position write support is confirmed.
- Cleaned up media admin wording so dashboard labels and messages use photographer-friendly language.
- Removed the advanced R2/file-details section from selected image editing.
- Renamed Alt text to Image description throughout media admin flows.

## Notes for internal team

- Removed redundant item icons from the media sidebar and replaced them with structural hierarchy markers.
- Made the page image spot grid inspector-aware to avoid cramped two-column cards beside the selected media panel.
- DEV-1023: added the `inquire.what_happens_next` media placement slot, exposed local placement metadata in the admin dashboard, and wired `/contact` to consume public media placements with the existing static selfie image as fallback.
- DEV-1027: raised homepage image strip minimum heights while preserving the existing three-image layout and CMS placement mapping.
- DEV-1019: added upload-specific timeout copy, retry controls for failed valid uploads, and partial-success upload summaries.
- DEV-1017: guarded duplicate magic-link requests, clear stale sign-in messages when the email changes, and added timeout-specific callback recovery copy.
- Hotfix: stopped sending new `aspect_ratio` and `crop_position` fields in admin media create/update requests because production PATCH saves were returning 504 after authentication.
- Frontend still reads normalized `aspect_ratio` and `crop_position` values when present.
- Kept photography terms such as aspect ratio, image focus, draft, published, and archived.
- Replaced implementation terms like revalidate, catalog, slot, key, and R2 in visible admin copy.

## Changed URLs

- https://ifferspictures.com/admin/media
