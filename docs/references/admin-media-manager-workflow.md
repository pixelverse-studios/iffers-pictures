# Admin Media Manager Workflow

This checklist covers manual QA for the protected media manager at `/admin/media`.
It focuses on the catalog workflow and the explicit media placement workflow used
by public pages.

## Preconditions

- Use an authenticated media admin session.
- Confirm the Pixelverse media API environment is configured through `PVS_API_URL`.
- Confirm the public media domain is allowed by Next image configuration.
- Have at least one published media item with complete alt text.
- Have at least one draft item and one archived item available, or create them during QA.
- When validating placement cache behavior, use a backend that includes DEV-952 placement audit and revalidation behavior.

## Catalog Workflow Smoke Check

- Load `/admin/media` and confirm the catalog request succeeds.
- Confirm the sidebar service filters and sub-category filters update the visible grid.
- Confirm selecting an image opens details in the inspector.
- Confirm published, draft, and archived status badges are understandable.
- Confirm upload drafts stay hidden from public pages until published.
- Confirm draft rename/move still requires an available destination check.
- Confirm manual revalidation still reports success or a clear structured error.
- Confirm desktop sidebar and inspector stay usable while the grid scrolls.
- Confirm mobile uses the media menu drawer without horizontal overflow.

## Placement Management QA

The placement assignment UI is tracked by DEV-955. Run this section when that UI
is present in `/admin/media`. Until DEV-955 lands, this section is the acceptance
checklist for the placement UI work.

### Slot Loading

- Load the placement management view.
- Confirm the UI requests admin placement slots from `/api/media/iffers-pictures/admin/placements`.
- Confirm every slot from the registry appears once.
- Confirm slots are grouped or labeled by page and section.
- Confirm slot key, label, description, aspect guidance, and affected page are visible or discoverable.
- Confirm assigned slots show the current image thumbnail and metadata.
- Confirm unassigned slots show a clear empty state and an assign action.
- Confirm a failed slot-load request shows a structured, retryable error state.

### Assign And Replace

- Select a published image and assign it to an unassigned slot.
- Confirm the slot updates without a full page refresh.
- Confirm success feedback names the affected slot.
- Assign a different published image to the same slot.
- Confirm the replacement updates the thumbnail and metadata.
- Confirm the previous image no longer appears as assigned to that slot.
- Confirm replacing a slot preserves other slot assignments.
- Confirm the same image can be assigned to multiple slots without a UI error.

### Clear

- Clear an assigned slot.
- Confirm the slot returns to the unassigned state.
- Confirm success feedback names the cleared slot.
- Confirm clearing one slot does not clear other slots using the same image.
- Confirm clearing an already-empty slot is disabled or returns a clear no-op message.

### Selected Image Details

- Select an image assigned to one placement.
- Confirm the inspector shows a `Used in` placement section.
- Confirm the section lists the slot label and affected public path.
- Assign the same image to multiple placements.
- Confirm `Used in` lists all placements for that image.
- Clear one of those placements.
- Confirm the `Used in` list updates without stale entries.

### Draft And Archived Limits

- Attempt to assign a draft image to a placement.
- Confirm the UI prevents the action or explains that media must be published first.
- Attempt to assign an archived image to a placement.
- Confirm the UI prevents the action or explains that archived media cannot be assigned.
- Confirm structured API errors are mapped to friendly copy for:
  - `media.invalid_placement_slot`
  - `media.placement_media_archived`
  - `media.placement_media_not_published`
- Confirm raw error payloads are not shown to Jenn.

### Admin Interaction States

- Confirm assign, replace, and clear controls have visible hover and focus states.
- Confirm mutation controls are disabled while their request is pending.
- Confirm keyboard navigation can reach slot cards, picker controls, and clear actions.
- Confirm the image picker can be closed without changing the slot.
- Confirm mobile placement controls fit within the viewport.
- Confirm error and success notices can be dismissed or are replaced by the next action.

## Public Placement Rendering QA

Use published media assignments only. For each slot, confirm the public page uses
the assigned image, then clear the slot and confirm the page falls back safely.

| Slot key | Public path | Expected public surface |
| --- | --- | --- |
| `home.hero` | `/` | Homepage hero image |
| `home.strip.1` | `/` | First homepage image strip tile |
| `home.strip.2` | `/` | Second homepage image strip tile |
| `home.meet_jenn` | `/` | Meet Jenn image |
| `home.quote_image` | `/` | Quote/testimonial image |
| `about.hero` | `/about` | About hero portrait |
| `services.hero` | `/services` | Sessions hub conditional hero image |
| `services.events.hero` | `/services/events` | Events service hero |
| `services.family.hero` | `/services/family` | Family service hero |
| `services.maternity.hero` | `/services/maternity` | Maternity service hero |
| `services.couples-engagement.hero` | `/services/couples-engagement` | Couples and engagement service hero |
| `services.portrait.hero` | `/services/portrait` | Portrait service hero |
| `portfolio.hero` | `/portfolio` | Portfolio conditional hero image |
| `investment.hero` | `/investment` | Investment hero image |
| `investment.detail` | `/investment` | Investment detail image |
| `faq.hero` | `/faq` | FAQ conditional hero image |

### Public Rendering Checks

- Confirm every assigned published placement renders with the assigned image.
- Confirm every image has useful `alt` text from placement media metadata.
- Confirm `next/image` renders valid optimized image markup for placement media.
- Confirm missing slots do not create blank image frames.
- Confirm the static or catalog fallback remains visible after clearing each slot.
- Confirm public pages do not render draft or archived media through placements.
- Confirm service hero placements also update the `/services` card imagery and `/investment` session cards where those surfaces use service placement data.
- Confirm text-only fallback heroes on `/services`, `/portfolio`, and `/faq` remain text-only when their placement slot is unassigned.

## Public API Failure Fallback

Validate these with a local or staging environment where the placement endpoint can be made unavailable.

- Disable or unset `PVS_API_URL` and load the public pages.
- Confirm `getPublicMediaPlacementsWithFallback()` returns the empty static placement fallback.
- Confirm public pages still render catalog or static fallback images.
- Simulate a failed `GET /api/media/iffers-pictures/placements` request.
- Confirm the page still renders and does not expose an exception or blank hero.
- Confirm catalog fetch fallback behavior still works independently from placement fallback behavior.

## Revalidation And Cache Expectations

DEV-952 defines placement mutation audit and revalidation behavior. Use these expectations for QA:

- Assigning a previously empty slot should trigger a placement assignment audit entry.
- Replacing an existing slot should trigger a placement replacement audit entry with old and new placement state.
- Clearing a slot should trigger a placement cleared audit entry with previous placement state.
- Placement mutation audit failures should be logged server-side and should not roll back a successful mutation.
- Placement mutations should trigger frontend revalidation non-blockingly.
- The affected public path should match the slot registry where targeted revalidation is available.
- If the backend revalidates the broader media-heavy path list, confirm that behavior is documented in the server media API docs.
- Manual frontend checks after mutation should use a hard refresh or a new private window if cache timing is unclear.

## Exact Public Pages To Review

- `/`
- `/about`
- `/services`
- `/services/events`
- `/services/family`
- `/services/maternity`
- `/services/couples-engagement`
- `/services/portrait`
- `/portfolio`
- `/investment`
- `/faq`

## Automated Coverage Note

As of DEV-957, this frontend repo does not include a test harness or test script
for component/helper tests. Do not add one-off tooling just for this checklist.
When a harness is introduced, add focused tests for:

- placement lookup by slot key
- placement media conversion into gallery item shape
- missing placement fallback behavior
- service slug to placement slot mapping
- admin assign, replace, clear, pending, success, and error states
