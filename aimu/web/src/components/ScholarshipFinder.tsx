"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { STITCH_IMAGES } from "@/lib/stitchImages";
import type { SCHOLARSHIPS_QUERY_RESULT } from "../../sanity.types";

type Scholarship = SCHOLARSHIPS_QUERY_RESULT[number];

function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

function formatDeadline(deadline: string | null | undefined) {
  if (!deadline) return "Rolling Admissions";
  return `Deadline: ${new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

const TYPE_BADGE_CLASSES: Record<string, string> = {
  merit: "border border-emerald/20 bg-emerald/10 text-emerald",
  government: "bg-navy text-white",
  full: "bg-navy text-gold-bright",
};

function badgeClass(type: string | null | undefined) {
  const key = (type ?? "").toLowerCase();
  for (const [fragment, className] of Object.entries(TYPE_BADGE_CLASSES)) {
    if (key.includes(fragment)) return className;
  }
  return "bg-gold/90 text-navy";
}

const SCHOLARSHIP_FALLBACKS = [
  STITCH_IMAGES.scholarshipUk,
  STITCH_IMAGES.scholarshipLab,
  STITCH_IMAGES.scholarshipIvy,
];

function ScholarshipCard({ scholarship, index }: { scholarship: Scholarship; index: number }) {
  const image = scholarship.destination?.heroImage;

  return (
    <div className="flex h-full flex-col overflow-hidden hover-lift rounded-xl border border-navy/10 bg-white shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            image
              ? urlFor(image).width(800).height(400).url()
              : SCHOLARSHIP_FALLBACKS[index % SCHOLARSHIP_FALLBACKS.length]
          }
          alt={scholarship.destination?.country ?? ""}
          className="h-full w-full object-cover"
        />
        {scholarship.type && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium uppercase backdrop-blur-sm ${badgeClass(scholarship.type)}`}
          >
            {scholarship.type}
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col p-8">
        <h3 className="mb-2 font-heading text-xl font-semibold text-navy">{scholarship.name}</h3>

        <div className="mb-8 mt-4 flex-grow space-y-3 border-t border-navy/10 pt-4">
          {scholarship.amount && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-gold">payments</span>
              <span className="text-sm font-medium text-navy/80">{scholarship.amount}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-gold">event</span>
            <span className="text-sm font-medium text-navy/80">{formatDeadline(scholarship.deadline)}</span>
          </div>
          {(scholarship.university?.name || scholarship.destination?.country) && (
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-gold">school</span>
              <span className="text-sm font-medium text-navy/80">
                {[scholarship.university?.name, scholarship.destination?.country].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
        </div>

        <Link
          href="/contact"
          className="mt-auto w-full border border-navy py-3 text-center text-sm font-semibold uppercase tracking-widest text-navy transition-all hover:bg-navy hover:text-white"
        >
          Check Eligibility
        </Link>
      </div>
    </div>
  );
}

export function ScholarshipFinder({ scholarships }: { scholarships: SCHOLARSHIPS_QUERY_RESULT }) {
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [university, setUniversity] = useState("");

  const countries = useMemo(() => uniqueSorted(scholarships.map((s) => s.destination?.country)), [scholarships]);
  const types = useMemo(() => uniqueSorted(scholarships.map((s) => s.type)), [scholarships]);
  const universities = useMemo(() => uniqueSorted(scholarships.map((s) => s.university?.name)), [scholarships]);

  const filtered = scholarships.filter((scholarship) => {
    if (country && scholarship.destination?.country !== country) return false;
    if (type && scholarship.type !== type) return false;
    if (university && scholarship.university?.name !== university) return false;
    return true;
  });

  const selectClass =
    "w-full appearance-none cursor-pointer rounded-lg border border-navy/15 bg-light-gray/40 p-4 text-sm text-navy focus:border-gold focus:outline-none";

  return (
    <>
      {/* Filter bar — overlaps hero */}
      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-6">
        <div className="grid grid-cols-1 items-end gap-6 rounded-xl bg-white p-8 shadow-xl md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy/60">Destination Country</label>
            <div className="relative">
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/40">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy/60">Scholarship Type</label>
            <div className="relative">
              <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/40">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy/60">University</label>
            <div className="relative">
              <select value={university} onChange={(e) => setUniversity(e.target.value)} className={selectClass}>
                <option value="">All Universities</option>
                {universities.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/40">
                expand_more
              </span>
            </div>
          </div>

          <a
            href="#opportunities"
            className="flex h-[54px] items-center justify-center gap-2 rounded-lg bg-gold text-sm font-semibold text-navy transition-colors hover:brightness-110"
          >
            <span className="material-symbols-outlined">search</span>
            Find Scholarships
          </a>
        </div>
      </section>

      {/* Results */}
      <section id="opportunities" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">Featured Opportunities</h2>
            <p className="mt-2 text-navy/60">
              {filtered.length} funding option{filtered.length === 1 ? "" : "s"}
              {country || type || university ? " matching your filters" : " currently listed"}.
            </p>
          </div>
          {(country || type || university) && (
            <button
              type="button"
              onClick={() => {
                setCountry("");
                setType("");
                setUniversity("");
              }}
              className="whitespace-nowrap border-b border-gold text-sm font-semibold text-gold transition-opacity hover:opacity-70"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-navy/60">No scholarships match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((scholarship, index) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
