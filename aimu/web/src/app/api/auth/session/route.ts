import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { findUser, toPublicUser } from "@/lib/authStore";

export async function GET() {
  const email = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!email) return NextResponse.json({ user: null });

  const user = findUser(email);
  // Cookie can outlive the in-memory store (e.g. after a server restart).
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({ user: toPublicUser(user) });
}
