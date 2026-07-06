import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";
import { CONFIDENTIAL_ITEMS_QUERY } from "@/sanity/queries";

const MEMBER_COOKIE = "aimu_member";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function truncate(value: string, max: number) {
  return value.slice(0, max);
}

async function fetchConfidentialItems() {
  const block = await client.fetch(CONFIDENTIAL_ITEMS_QUERY);
  return block?.items ?? [];
}

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get(MEMBER_COOKIE)?.value) {
    return NextResponse.json({ error: "Account required." }, { status: 401 });
  }
  return NextResponse.json({ items: await fetchConfidentialItems() });
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ error: "Account creation is not configured." }, { status: 503 });
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

  const { fullName, email, phone } = body as Record<string, unknown>;

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
    source: "Member account (confidential section)",
    status: "New",
    submittedAt: new Date().toISOString(),
  });

  const response = NextResponse.json({ items: await fetchConfidentialItems() });
  response.cookies.set(MEMBER_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
