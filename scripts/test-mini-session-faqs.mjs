import assert from "node:assert/strict";
import test from "node:test";
import {
  buildFaqPageSchema,
  getMiniSessionFaqs,
} from "../src/lib/mini-sessions/faqs.ts";

const autumnCampaign = {
  id: "autumn-keepsake-2026",
  publicLabel: "Autumn Keepsake Sessions",
  durationMinutes: 20,
  totalPriceCents: 22500,
  depositCents: 10000,
  balanceDueText: "The remaining $125 is due before your session.",
  locationSummary: "North Jersey/Bergen County",
  inclusions: [
    "10 edited digital images",
    "An online gallery delivered within 10-14 days",
  ],
  cancellationPolicy: "The $100 booking fee is nonrefundable.",
  weatherPolicy: "Severe weather moves your booking to the published rain date.",
  latenessPolicy: "Sessions cannot be extended for late arrivals.",
};

const autumnCampaignId = autumnCampaign.id;

test("returns all ten FAQs for a complete Autumn Keepsake campaign", () => {
  const faqs = getMiniSessionFaqs(autumnCampaign, autumnCampaignId);

  assert.equal(faqs.length, 10);
  assert.equal(
    faqs[0]?.question,
    "How many photos do we get in an Autumn Keepsake Session?"
  );
  assert.match(faqs[0]?.answer ?? "", /10 edited digital images/);
  assert.match(faqs[1]?.answer ?? "", /\$225/);
  assert.match(faqs[1]?.answer ?? "", /\$100/);
  assert.match(faqs[1]?.answer ?? "", /remaining \$125/);
  assert.match(faqs[2]?.answer ?? "", /North Jersey\/Bergen County/);
  assert.match(faqs[3]?.answer ?? "", /10-14 days/);
  assert.match(faqs[6]?.answer ?? "", /20 minutes long/);
});

test("fails closed for unrelated or incomplete campaigns", () => {
  assert.deepEqual(
    getMiniSessionFaqs(
      {
        ...autumnCampaign,
        id: "spring-mini-2027",
      },
      autumnCampaignId
    ),
    []
  );
  assert.deepEqual(getMiniSessionFaqs(autumnCampaign), []);
  assert.deepEqual(
    getMiniSessionFaqs(
      {
        ...autumnCampaign,
        inclusions: ["10 edited digital images"],
      },
      autumnCampaignId
    ),
    []
  );
  assert.deepEqual(
    getMiniSessionFaqs(
      {
        ...autumnCampaign,
        cancellationPolicy: "Refunds are available at any time.",
      },
      autumnCampaignId
    ),
    []
  );
});

test("uses campaign-controlled values in operational answers", () => {
  const faqs = getMiniSessionFaqs(
    {
      ...autumnCampaign,
      durationMinutes: 25,
      totalPriceCents: 25000,
      depositCents: 12500,
      balanceDueText:
        "The remaining $125 is collected one week before the session.",
      locationSummary: "Cliffside Park, NJ",
      inclusions: [
        "12 edited digital images",
        "Online gallery delivered within 7-10 days",
      ],
    },
    autumnCampaignId
  );

  assert.match(faqs[0]?.answer ?? "", /12 edited digital images/);
  assert.match(faqs[1]?.answer ?? "", /\$250/);
  assert.match(faqs[1]?.answer ?? "", /\$125/);
  assert.match(faqs[1]?.answer ?? "", /collected one week before/);
  assert.match(faqs[2]?.answer ?? "", /Cliffside Park, NJ/);
  assert.doesNotMatch(faqs[2]?.answer ?? "", /final location will be announced/i);
  assert.match(faqs[3]?.answer ?? "", /7-10 days/);
  assert.match(faqs[6]?.answer ?? "", /25 minutes long/);
});

test("builds FAQPage schema from the same visible FAQ source", () => {
  const faqs = getMiniSessionFaqs(autumnCampaign, autumnCampaignId);
  const schema = buildFaqPageSchema(faqs);

  assert.equal(schema?.mainEntity.length, faqs.length);
  assert.deepEqual(
    schema?.mainEntity.map((entry) => ({
      question: entry.name,
      answer: entry.acceptedAnswer.text,
    })),
    faqs
  );
  assert.equal(buildFaqPageSchema([]), null);
});
