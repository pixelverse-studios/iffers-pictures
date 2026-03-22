# Deployment Summary

## Latest deploy summary

- Navigation dropdown now shows all 7 event photography types (baby showers, bridal showers, engagements, proposals, parties, religious ceremonies, milestones) nested under Events
- Mobile menu also shows expandable event types for easier browsing
- Footer now includes a dedicated "Event Types" column with links to all event photography pages
- Added structured data markup to the events hub page for better Google search visibility

## Notes for internal team

- DEV-525 completed
- Files: Header.tsx, Footer.tsx
- Header desktop dropdown nests EVENT_SUB_SERVICES under Events with expand/collapse
- Header mobile menu adds nested expandable Events section
- Footer grid expanded from 5 to 6 columns to accommodate Event Types column
- DEV-526 completed
- Created EventsHubSchema.tsx with OfferCatalog listing all 7 event sub-services
- Event sub-pages already had ServiceSchema + FAQSchema + BreadcrumbSchema (no changes needed)

## Changed URLs

- https://ifferspictures.com/services
- https://ifferspictures.com/services/events
- https://ifferspictures.com/services/events/baby-shower
- https://ifferspictures.com/services/events/bridal-shower
- https://ifferspictures.com/services/events/engagement
- https://ifferspictures.com/services/events/proposal
- https://ifferspictures.com/services/events/parties
- https://ifferspictures.com/services/events/religious-ceremonies
- https://ifferspictures.com/services/events/milestones
