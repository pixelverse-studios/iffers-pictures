# Deployment Summary

## Latest deploy summary

- Fixed production media admin saves timing out after the media editor crop controls release.
- Media metadata edits now use the stable save payload while backend crop-position write support is confirmed.
- Cleaned up media admin wording so dashboard labels and messages use photographer-friendly language.
- Removed the advanced R2/file-details section from selected image editing.
- Renamed Alt text to Image description throughout media admin flows.

## Notes for internal team

- Hotfix: stopped sending new `aspect_ratio` and `crop_position` fields in admin media create/update requests because production PATCH saves were returning 504 after authentication.
- Frontend still reads normalized `aspect_ratio` and `crop_position` values when present.
- Kept photography terms such as aspect ratio, image focus, draft, published, and archived.
- Replaced implementation terms like revalidate, catalog, slot, key, and R2 in visible admin copy.

## Changed URLs

- https://ifferspictures.com/admin/media
