import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

function truncate(value: string, max: number) {
  return value.slice(0, max);
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({ error: "Student chat is not configured." }, { status: 503 });
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

  const { name, question } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  await writeClient.create({
    _type: "studentQuestion",
    name: truncate(name.trim(), 100),
    question: truncate(question.trim(), 2000),
    createdAt: new Date().toISOString(),
    answers: [],
  });

  return NextResponse.json({ ok: true });
}
