import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_BALANCE_DUE_TEXT,
  CAL_AVAILABILITY_NOTE,
  DEFAULT_LOCATION_SUMMARY,
  MINI_SESSIONS_CAL_URL,
  createEmptyCampaignDraft,
  slugifyCampaignName,
  validateCampaignDraft,
} from "../src/components/features/admin-mini-sessions/utils.ts";

test("new drafts include the agreed booking and balance defaults", () => {
  const draft = createEmptyCampaignDraft();
  assert.equal(draft.balanceDueText, DEFAULT_BALANCE_DUE_TEXT);
  assert.equal(draft.bookingOptions[0]?.calBookingUrl, MINI_SESSIONS_CAL_URL);
  assert.equal(draft.durationMinutes, "20");
  assert.equal(draft.totalPrice, "225.00");
  assert.equal(draft.deposit, "100.00");
  assert.equal(draft.dateSummary, CAL_AVAILABILITY_NOTE);
  assert.equal(draft.locationSummary, DEFAULT_LOCATION_SUMMARY);
  assert.equal(draft.bookingOptions[0]?.dateTimeLabel, CAL_AVAILABILITY_NOTE);
});

test("hidden campaign fields are derived from client-facing content", () => {
  const draft = createEmptyCampaignDraft();
  Object.assign(draft, { headline: "Autumn Keepsake Sessions 2026", summary: "A short seasonal session for families.", locationSummary: "Bergen County, NJ", totalPrice: "225.00", deposit: "100.00" });
  const result = validateCampaignDraft(draft);
  assert.deepEqual(result.errors, {});
  assert.equal(result.input?.internalName, "autumn-keepsake-sessions-2026");
  assert.equal(result.input?.publicLabel, draft.headline);
  assert.equal(result.input?.metaTitle, draft.headline);
  assert.equal(result.input?.metaDescription, draft.summary);
  assert.equal(result.input?.durationMinutes, 20);
  assert.equal(result.input?.ctaLabel, "Choose your time");
  assert.equal(result.input?.dateSummary, CAL_AVAILABILITY_NOTE);
  assert.equal(result.input?.bookingOptions[0]?.dateTimeLabel, CAL_AVAILABILITY_NOTE);
  assert.equal(result.input?.bookingOptions.length, 1);
});

test("saving requires the visible headline and a Cal.com link", () => {
  const draft = createEmptyCampaignDraft();
  draft.bookingOptions[0].calBookingUrl = "https://example.com/not-cal";
  const result = validateCampaignDraft(draft);
  assert.equal(result.input, null);
  assert.equal(result.errors.headline, "Add a headline for this Mini Session.");
  assert.equal(result.errors.bookingUrl, "Use an HTTPS booking link from cal.com.");
});

test("campaign names use a stable URL-friendly value", () => {
  assert.equal(slugifyCampaignName("  Jen’s Fall Minis!  "), "jen-s-fall-minis");
});
