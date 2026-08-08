import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { createUser, findUser, hashPassword, normalizeEmail, toPublicUser } from "@/lib/authStore";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;
const MIN_PASSWORD = 8;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const fullName = str(raw.fullName);
  const email = str(raw.email);
  const phone = str(raw.phone);
  const interestedCourse = str(raw.interestedCourse);
  const preferredCountry = str(raw.preferredCountry);
  const password = typeof raw.password === "string" ? raw.password : "";

  if (fullName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!interestedCourse) {
    return NextResponse.json({ error: "Please select a course of interest." }, { status: 400 });
  }
  if (!preferredCountry) {
    return NextResponse.json({ error: "Please select a country of interest." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD} characters.` },
      { status: 400 },
    );
  }

  if (findUser(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists. Please sign in." },
      { status: 409 },
    );
  }

  const user = createUser({
    fullName: fullName.slice(0, 200),
    email: email.slice(0, 200),
    phone: phone.slice(0, 50),
    interestedCourse: interestedCourse.slice(0, 200),
    preferredCountry: preferredCountry.slice(0, 200),
    password: hashPassword(password),
  });

  const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  response.cookies.set(SESSION_COOKIE, normalizeEmail(user.email), sessionCookieOptions());
  return response;
}
