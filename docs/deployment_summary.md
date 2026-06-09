# Deployment Summary

## Latest deploy summary

- Fixed production media admin saves timing out after the media editor crop controls release.
- Media metadata edits now use the stable save payload while backend crop-position write support is confirmed.

## Notes for internal team

- Hotfix: stopped sending new `aspect_ratio` and `crop_position` fields in admin media create/update requests because production PATCH saves were returning 504 after authentication.
- Frontend still reads normalized `aspect_ratio` and `crop_position` values when present.

## Changed URLs

- https://ifferspictures.com/admin/media
