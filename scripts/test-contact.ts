import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema, toContactSubmissionData } from "../src/lib/contact";

const inquiry = {
  firstName: "Test",
  lastName: "Visitor",
  email: "visitor@example.com",
  service: "events",
  eventDate: "2026-11-15",
  eventTime: "14:00",
  eventLocation: "Bergen County",
};

test("standard sessions allow an optional message and referral", () => {
  assert.equal(contactSchema.safeParse(inquiry).success, true);
});

test("custom sessions reject missing and whitespace-only descriptions", () => {
  for (const message of [undefined, "", "   "]) {
    const result = contactSchema.safeParse({ ...inquiry, service: "custom", message });
    assert.equal(result.success, false);
    if (!result.success) assert.equal(result.error.issues[0].path[0], "message");
  }
  assert.equal(contactSchema.safeParse({
    ...inquiry, service: "custom", message: "A graduation celebration",
  }).success, true);
});

test("Other referrals require an explanation and normalize whitespace", () => {
  const result = contactSchema.safeParse({ ...inquiry, referralSource: "Other", referralSourceOther: "  " });
  assert.equal(result.success, false);
  if (!result.success) assert.equal(result.error.issues[0].path[0], "referralSourceOther");
  const valid = contactSchema.parse({ ...inquiry, referralSource: "Other", referralSourceOther: "  Venue newsletter  " });
  assert.equal(toContactSubmissionData(valid).referralSourceOther, "Venue newsletter");
});

test("switching away from Other excludes stale referral details from submission", () => {
  const data = contactSchema.parse({ ...inquiry, referralSource: "Google", referralSourceOther: "Old source" });
  assert.equal(toContactSubmissionData(data).referralSourceOther, undefined);
  assert.equal(contactSchema.safeParse({ ...inquiry, service: "events", message: "" }).success, true);
});

test("dates remain date-only strings and invalid calendar dates are rejected", () => {
  assert.equal(contactSchema.parse(inquiry).eventDate, "2026-11-15");
  for (const eventDate of ["", "11/15/2026", "2026-02-30"]) {
    assert.equal(contactSchema.safeParse({ ...inquiry, eventDate }).success, false);
  }
});

test("API enforces conditional fields and forwards valid details without sending a real inquiry", async () => {
  process.env.PVS_CONTACT_API_URL = "https://contact.invalid";
  process.env.PVS_WEBSITE_SLUG = "test-site";
  const { POST } = await import("../src/app/api/contact/route");
  const originalFetch = globalThis.fetch;
  const sent: Record<string, unknown>[] = [];
  globalThis.fetch = async (_input, init) => {
    sent.push(JSON.parse(String(init?.body)));
    return new Response("{}", { status: 201 });
  };
  const submit = (body: object) => POST(new Request("http://localhost/api/contact", {
    method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" },
  }));
  try {
    assert.equal((await submit({ ...inquiry, service: "custom" })).status, 400);
    assert.equal((await submit({ ...inquiry, referralSource: "Other" })).status, 400);
    assert.equal(sent.length, 0);
    assert.equal((await submit({ ...inquiry, service: "custom", message: "Graduation celebration", referralSource: "Other", referralSourceOther: "Venue newsletter" })).status, 201);
    assert.deepEqual(sent[0].data, {
      firstName: inquiry.firstName, lastName: inquiry.lastName,
      eventDate: inquiry.eventDate, eventTime: inquiry.eventTime, eventLocation: inquiry.eventLocation,
      phone: "", socialHandle: "", service: "custom", message: "Graduation celebration",
      referralSource: "Other", referralSourceOther: "Venue newsletter",
    });
    assert.equal(sent[0].email, inquiry.email);
    assert.equal((await submit({ ...inquiry, referralSource: "Google", referralSourceOther: "Stale detail" })).status, 201);
    assert.equal("referralSourceOther" in (sent[1].data as object), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});


test("conditional errors appear even when unrelated required fields are missing", () => {
  const result = contactSchema.safeParse({ service: "custom", referralSource: "Other" });
  assert.equal(result.success, false);
  if (!result.success) {
    const paths = result.error.issues.map((issue) => issue.path[0]);
    assert.ok(paths.includes("message"));
    assert.ok(paths.includes("referralSourceOther"));
    assert.equal(result.error.issues.find((issue) => issue.path[0] === "eventTime")?.message, "Event time is required");
  }
});
