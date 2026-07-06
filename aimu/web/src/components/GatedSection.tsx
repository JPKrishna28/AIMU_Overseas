"use client";

import { useEffect, useState } from "react";

type GatedItem = { _key: string; title: string | null; description: string | null };

export function GatedSection({
  heading,
  teaser,
  unlockCtaLabel,
}: {
  heading: string | null | undefined;
  teaser: string | null | undefined;
  unlockCtaLabel: string | null | undefined;
}) {
  const [items, setItems] = useState<GatedItem[] | null>(null);
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/confidential")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.items) setItems(data.items);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecked(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/confidential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setItems(data.items ?? []);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-light-gray px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold";

  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          🔒 {heading || "Why Students Choose AIMU Global"}
        </h2>

        {items ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item._key} className="rounded-2xl bg-white/5 p-5">
                <p className="font-heading font-semibold text-gold">✔ {item.title}</p>
                {item.description && <p className="mt-1 text-sm text-white/70">{item.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl bg-white/5 p-8">
            {teaser && <p className="text-center text-white/80">{teaser}</p>}
            {checked && (
              <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:scale-105 disabled:opacity-60"
                >
                  {submitting ? "Creating account…" : unlockCtaLabel || "Create Account & Unlock"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
