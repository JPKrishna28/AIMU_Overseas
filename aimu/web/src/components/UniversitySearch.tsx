"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { UNIVERSITIES_QUERY_RESULT } from "../../sanity.types";

type University = UNIVERSITIES_QUERY_RESULT[number];

const DEMAND_ORDER = ["Low", "Medium", "High", "Very High"];

function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

export function UniversitySearch({ universities }: { universities: UNIVERSITIES_QUERY_RESULT }) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [intake, setIntake] = useState("");
  const [minGrowth, setMinGrowth] = useState("");

  const countries = useMemo(() => uniqueSorted(universities.map((u) => u.destination?.country)), [universities]);
  const cities = useMemo(() => uniqueSorted(universities.map((u) => u.city)), [universities]);
  const courses = useMemo(
    () => uniqueSorted(universities.flatMap((u) => u.courses?.map((c) => c?.title) ?? [])),
    [universities]
  );
  const intakes = useMemo(
    () => uniqueSorted(universities.flatMap((u) => u.destination?.intakeMonths ?? [])),
    [universities]
  );

  const filtered = universities.filter((university) => {
    if (country && university.destination?.country !== country) return false;
    if (city && university.city !== city) return false;
    if (course && !university.courses?.some((c) => c?.title === course)) return false;
    if (maxBudget && university.tuitionFromUSD && university.tuitionFromUSD > Number(maxBudget)) return false;
    if (intake && !university.destination?.intakeMonths?.includes(intake)) return false;
    if (minGrowth) {
      const minIndex = DEMAND_ORDER.indexOf(minGrowth);
      const hasMatch = university.courses?.some((c) => c?.demand && DEMAND_ORDER.indexOf(c.demand) >= minIndex);
      if (!hasMatch) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => (a.ranking ?? "").localeCompare(b.ranking ?? ""));

  const selectClass = "rounded-lg border border-light-gray px-3 py-2 text-sm text-navy focus:border-gold focus:outline-none";

  return (
    <div>
      <div className="mb-10 grid gap-3 rounded-2xl bg-light-gray p-6 sm:grid-cols-2 lg:grid-cols-4">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={course} onChange={(e) => setCourse(e.target.value)} className={selectClass}>
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={intake} onChange={(e) => setIntake(e.target.value)} className={selectClass}>
          <option value="">Any Intake</option>
          {intakes.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <input
          type="number"
          inputMode="numeric"
          placeholder="Max Budget (USD/year)"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className={selectClass}
        />

        <select value={minGrowth} onChange={(e) => setMinGrowth(e.target.value)} className={selectClass}>
          <option value="">Any Growth Opportunity</option>
          {DEMAND_ORDER.map((d) => (
            <option key={d} value={d}>{d}+ demand</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setCountry("");
            setCity("");
            setCourse("");
            setMaxBudget("");
            setIntake("");
            setMinGrowth("");
          }}
          className="rounded-lg border border-navy/20 px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-white"
        >
          Clear Filters
        </button>
      </div>

      <p className="mb-6 text-sm text-navy/60">{sorted.length} universities found</p>

      {sorted.length === 0 ? (
        <p className="text-center text-navy/60">No universities match these filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((university) =>
            university.slug?.current ? (
              <Link
                key={university._id}
                href={`/universities/${university.slug.current}`}
                className="hover-lift flex flex-col gap-3 rounded-2xl border border-light-gray p-6 hover:border-gold"
              >
                {university.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(university.logo).width(120).height(60).fit("max").url()}
                    alt={university.name ?? ""}
                    className="h-10 w-auto object-contain"
                  />
                )}
                <h2 className="font-heading font-semibold text-navy">{university.name}</h2>
                <p className="text-sm text-navy/60">
                  {[university.city, university.destination?.country].filter(Boolean).join(", ")}
                </p>
                {university.ranking && <p className="text-xs text-gold">{university.ranking}</p>}
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
