import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function truncate(value: string, max: number) {
  return value.slice(0, max);
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ error: "Lead capture is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, email, phone, preferredCountry, interestedCourse, source } = body as Record<string, unknown>;

  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.trim().length === 0) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }

  await writeClient.create({
    _type: "lead",
    fullName: truncate(fullName.trim(), 200),
    email: truncate(email.trim(), 200),
    phone: truncate(phone.trim(), 50),
    preferredCountry: typeof preferredCountry === "string" ? truncate(preferredCountry.trim(), 100) : undefined,
    interestedCourse: typeof interestedCourse === "string" ? truncate(interestedCourse.trim(), 100) : undefined,
    source: typeof source === "string" ? truncate(source.trim(), 100) : undefined,
    status: "New",
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
