"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type StudentQuestion = {
  _id: string;
  name: string | null;
  question: string | null;
  createdAt: string | null;
  answers:
    | {
        _key: string;
        name: string | null;
        text: string | null;
        isAdmin: boolean | null;
        createdAt: string | null;
      }[]
    | null;
};

function timeAgo(iso: string | null) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function AskForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/student-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, question }),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setQuestion("");
    setStatus("idle");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <h2 className="font-heading text-xl font-semibold text-navy">Ask a Question</h2>
      <div className="mt-4 flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          maxLength={100}
          className="rounded-lg border border-navy/15 px-4 py-3 text-sm text-navy outline-none focus:border-gold"
        />
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How long did your CAS take to arrive? What was your visa interview like?"
          required
          maxLength={2000}
          rows={3}
          className="rounded-lg border border-navy/15 px-4 py-3 text-sm text-navy outline-none focus:border-gold"
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-50"
          >
            {status === "sending" ? "Posting…" : "Post Question"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-600">Could not post — please try again.</p>
          )}
        </div>
      </div>
    </form>
  );
}

function ReplyForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/student-chat/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, name, text }),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setText("");
    setStatus("idle");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
        maxLength={100}
        className="rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy outline-none focus:border-gold sm:w-40"
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write an answer…"
        required
        maxLength={2000}
        className="flex-1 rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy transition-all hover:brightness-105 disabled:opacity-50"
      >
        {status === "sending" ? "…" : "Reply"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Failed — try again.</p>}
    </form>
  );
}

export function StudentChatBoard({ initialQuestions }: { initialQuestions: StudentQuestion[] }) {
  return (
    <div className="flex flex-col gap-8">
      <AskForm />

      {initialQuestions.length === 0 ? (
        <p className="text-center text-navy/60">
          No questions yet — be the first to ask about CAS, visas, or student life abroad.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {initialQuestions.map((q) => (
            <div key={q._id} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-navy/50">
                <span className="font-semibold text-navy">{q.name}</span>
                <span>·</span>
                <span>{timeAgo(q.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-navy/90">{q.question}</p>

              {q.answers && q.answers.length > 0 && (
                <div className="mt-4 flex flex-col gap-3 border-l-2 border-gold/40 pl-4">
                  {q.answers.map((answer) => (
                    <div key={answer._key}>
                      <div className="flex items-center gap-2 text-xs text-navy/50">
                        <span className="font-semibold text-navy">{answer.name}</span>
                        {answer.isAdmin && (
                          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy">
                            AIMU Team
                          </span>
                        )}
                        <span>{timeAgo(answer.createdAt)}</span>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-navy/80">{answer.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <ReplyForm questionId={q._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
