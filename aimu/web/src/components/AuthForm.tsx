"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-light-gray px-3 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/60";

export function AuthForm({
  mode,
  countries,
  courses,
}: {
  mode: "login" | "register";
  countries: string[];
  courses: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState("");

  const isRegister = mode === "register";
  const nextPath = searchParams.get("next") || "/student-portal";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = isRegister
      ? {
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interestedCourse: formData.get("interestedCourse"),
          preferredCountry: formData.get("preferredCountry"),
          password: formData.get("password"),
        }
      : {
          email: formData.get("email"),
          password: formData.get("password"),
        };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      // Refresh so server components pick up the new session cookie.
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {isRegister && (
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {isRegister && (
        <>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Mobile number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 90000 00000"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="interestedCourse" className={labelClass}>
              Course of interest
            </label>
            <select
              id="interestedCourse"
              name="interestedCourse"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="preferredCountry" className={labelClass}>
              Country of interest
            </label>
            <select
              id="preferredCountry"
              name="preferredCountry"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={isRegister ? 8 : undefined}
          autoComplete={isRegister ? "new-password" : "current-password"}
          placeholder={isRegister ? "At least 8 characters" : "Your password"}
          className={inputClass}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "submitting"
          ? isRegister
            ? "Creating account…"
            : "Signing in…"
          : isRegister
            ? "Create Account"
            : "Sign In"}
      </button>

      <p className="text-center text-sm text-navy/60">
        {isRegister ? "Already have an account? " : "New to AIMU Global? "}
        <Link
          href={
            isRegister
              ? `/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`
              : `/register${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`
          }
          className="font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
