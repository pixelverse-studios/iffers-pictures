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
import { reconcileCampaignsAfterLifecycle } from "../src/components/features/admin-mini-sessions/AdminMiniSessionsManager.tsx";

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
  assert.equal(draft.faqs.length, 10);
  assert.ok(draft.faqs.every((faq, index) => faq.sortOrder === index));
});

test("hidden fields are derived while the hero label stays campaign controlled", () => {
  const draft = createEmptyCampaignDraft();
  Object.assign(draft, { headline: "Autumn Keepsake Sessions 2026", summary: "A short seasonal session for families.", locationSummary: "Bergen County, NJ", totalPrice: "225.00", deposit: "100.00" });
  const result = validateCampaignDraft(draft);
  assert.deepEqual(result.errors, {});
  assert.equal(result.input?.internalName, "autumn-keepsake-sessions-2026");
  assert.equal(result.input?.publicLabel, "Mini Sessions");
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

test("publishing immediately closes the previous public campaign in the dashboard list", () => {
  const previous = { id: "previous", status: "live", updatedAt: "2026-08-12T10:00:00.000Z" };
  const saved = { id: "new", status: "live", updatedAt: "2026-08-13T10:00:00.000Z" };
  const campaigns = reconcileCampaignsAfterLifecycle(
    [previous, { id: "draft", status: "draft", updatedAt: "2026-08-11T10:00:00.000Z" }],
    saved,
    "publish"
  );

  assert.equal(campaigns.find((campaign) => campaign.id === "new")?.status, "live");
  assert.equal(campaigns.find((campaign) => campaign.id === "previous")?.status, "closed");
  assert.equal(campaigns.find((campaign) => campaign.id === "draft")?.status, "draft");
});
