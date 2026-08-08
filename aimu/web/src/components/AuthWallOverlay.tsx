"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-light-gray px-3 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none";

/**
 * Sign-in card that sits over the blurred content. Signing in happens inline —
 * on success we just refresh, and the wall unwraps to reveal the real page.
 */
export function AuthWallOverlay({
  title = "Sign in to continue",
  subtitle = "Create a free account to unlock this page and the rest of your student tools.",
  next,
}: {
  title?: string;
  subtitle?: string;
  next: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 top-1/4 flex items-start justify-center px-6 pb-16">
      <div className="w-full max-w-md rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_24px_60px_-20px_rgba(13,28,50,0.35)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-gold">lock</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Members only
          </span>
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-navy">{title}</h2>
        <p className="mt-2 text-sm text-navy/60">{subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            className={inputClass}
          />

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-navy/60">
          New to AIMU Global?{" "}
          <Link
            href={`/register?next=${encodeURIComponent(next)}`}
            className="font-semibold text-navy underline decoration-gold underline-offset-4"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </div>
  );
}
