# Deployment Summary

## Latest deploy summary

- Replaced raw gateway error pages with a clear admin-friendly timeout message.

## Notes for internal team

- Media API error parsing now suppresses HTML error payloads from Cloudflare/gateway responses.
- Batch archive still sends one request with the full selected ID list; backend owns batching/performance behavior.

## Changed URLs

- https://ifferspictures.com/admin/media
