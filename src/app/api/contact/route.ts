import { NextResponse } from "next/server";

const PVS_API_URL = process.env.PVS_CONTACT_API_URL;
const WEBSITE_SLUG = process.env.PVS_WEBSITE_SLUG;

export async function POST(request: Request) {
  if (!PVS_API_URL || !WEBSITE_SLUG) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(
      `${PVS_API_URL}/api/v1/contact-forms/${WEBSITE_SLUG}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: [body.firstName, body.lastName].filter(Boolean).join(" "),
          email: body.email,
          phone: body.phone || "",
          data: {
            Service: body.service,
            "Event Date": body.eventDate || "",
            "Event Time": body.eventTime || "",
            "Event Location": body.eventLocation || "",
            "Social Handle / Facebook Name": body.socialHandle || "",
            "How did you hear about me?": body.referralSource || "",
            Message: body.message,
          },
        }),
      }
    );

    if (response.status === 201) {
      return NextResponse.json({}, { status: 201 });
    }

    if (response.status === 400) {
      const data = await response.json();
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
