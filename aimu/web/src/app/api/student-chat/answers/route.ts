import { randomUUID } from "node:crypto";
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

  const { questionId, name, text } = body as Record<string, unknown>;

  if (typeof questionId !== "string" || questionId.trim().length === 0) {
    return NextResponse.json({ error: "Question id is required." }, { status: 400 });
  }
  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Answer is required." }, { status: 400 });
  }

  const question = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "studentQuestion" && _id == $id][0]{ _id }`,
    { id: questionId }
  );
  if (!question) {
    return NextResponse.json({ error: "Question not found." }, { status: 404 });
  }

  await writeClient
    .patch(question._id)
    .setIfMissing({ answers: [] })
    .append("answers", [
      {
        _key: randomUUID(),
        name: truncate(name.trim(), 100),
        text: truncate(text.trim(), 2000),
        isAdmin: false,
        createdAt: new Date().toISOString(),
      },
    ])
    .commit();

  return NextResponse.json({ ok: true });
}
