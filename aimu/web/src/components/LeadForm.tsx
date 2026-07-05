"use client";

import { useState } from "react";

export function LeadForm({
  countries,
  courses,
  source,
  onSuccess,
}: {
  countries: string[];
  courses: string[];
  source: string;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredCountry: formData.get("preferredCountry"),
      interestedCourse: formData.get("interestedCourse"),
      source,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-xl bg-emerald/10 p-4 text-center text-sm font-medium text-emerald">
        Thanks! Our counsellor will reach out shortly.
      </p>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-light-gray px-3 py-2 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input name="fullName" required placeholder="Full Name" className={inputClass} />
      <input name="email" type="email" required placeholder="Email Address" className={inputClass} />
      <input name="phone" type="tel" required placeholder="Phone Number" className={inputClass} />

      <select name="preferredCountry" defaultValue="" className={inputClass}>
        <option value="" disabled>
          Preferred Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select name="interestedCourse" defaultValue="" className={inputClass}>
        <option value="" disabled>
          Interested Course / Field
        </option>
        {courses.map((course) => (
          <option key={course} value={course}>{course}</option>
        ))}
      </select>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Get Free Counseling"}
      </button>
    </form>
  );
}
