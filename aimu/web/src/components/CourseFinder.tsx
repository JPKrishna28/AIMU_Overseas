"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { COURSES_QUERY_RESULT } from "../../sanity.types";

type Course = COURSES_QUERY_RESULT[number];

const DEMAND_ORDER = ["Low", "Medium", "High", "Very High"];

function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

function topUniversitiesForEmployment(course: Course) {
  return [...(course.topUniversities ?? [])]
    .filter((u): u is NonNullable<typeof u> => Boolean(u))
    .sort((a, b) => Number(b.studentSatisfaction?.replace("%", "") ?? 0) - Number(a.studentSatisfaction?.replace("%", "") ?? 0))
    .slice(0, 3);
}

function CourseFinderCard({ course }: { course: Course }) {
  const topEmployers = topUniversitiesForEmployment(course);

  return (
    <div className="hover-lift flex h-full flex-col gap-3 rounded-2xl border border-light-gray bg-white p-6 shadow-sm">
      {course.category && <p className="text-xs font-semibold uppercase text-gold">{course.category}</p>}
      <h3 className="font-heading text-lg font-semibold text-navy">{course.title}</h3>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        {course.duration && (
          <div>
            <dt className="text-xs text-navy/50">Duration</dt>
            <dd className="font-medium text-navy">{course.duration}</dd>
          </div>
        )}
        {course.tuitionFrom && (
          <div>
            <dt className="text-xs text-navy/50">Tuition Fees</dt>
            <dd className="font-medium text-navy">{course.tuitionFrom}</dd>
          </div>
        )}
        {course.averageSalary && (
          <div>
            <dt className="text-xs text-navy/50">Avg Salary</dt>
            <dd className="font-medium text-navy">{course.averageSalary}</dd>
          </div>
        )}
        {course.demand && (
          <div>
            <dt className="text-xs text-navy/50">Demand</dt>
            <dd className="font-medium text-navy">{course.demand}</dd>
          </div>
        )}
      </dl>

      {course.careerOutcomes && course.careerOutcomes.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-navy/50">Career Options</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {course.careerOutcomes.map((outcome) => (
              <span key={outcome} className="rounded-full bg-light-gray px-2.5 py-1 text-xs text-navy">
                {outcome}
              </span>
            ))}
          </div>
        </div>
      )}

      {topEmployers.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-navy/50">Top Universities for Easy Employment</p>
          <ul className="mt-1 flex flex-col gap-1">
            {topEmployers.map((university) => (
              <li key={university._id} className="text-sm text-navy">
                {university.slug?.current ? (
                  <Link href={`/universities/${university.slug.current}`} className="underline decoration-gold underline-offset-2">
                    {university.name}
                  </Link>
                ) : (
                  university.name
                )}
                {university.studentSatisfaction && (
                  <span className="text-navy/50"> · {university.studentSatisfaction} satisfaction</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {course.slug?.current && (
        <Link
          href={`/courses/${course.slug.current}`}
          className="mt-auto rounded bg-navy py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy/90"
        >
          Explore Course
        </Link>
      )}
    </div>
  );
}

export function CourseFinder({ courses }: { courses: COURSES_QUERY_RESULT }) {
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [intake, setIntake] = useState("");
  const [minGrowth, setMinGrowth] = useState("");

  const countries = useMemo(
    () => uniqueSorted(courses.flatMap((c) => c.topUniversities?.map((u) => u?.destination?.country) ?? [])),
    [courses]
  );
  const universities = useMemo(
    () => uniqueSorted(courses.flatMap((c) => c.topUniversities?.map((u) => u?.name) ?? [])),
    [courses]
  );
  const categories = useMemo(() => uniqueSorted(courses.map((c) => c.category)), [courses]);
  const durations = useMemo(() => uniqueSorted(courses.map((c) => c.duration)), [courses]);
  const intakes = useMemo(
    () => uniqueSorted(courses.flatMap((c) => c.topUniversities?.flatMap((u) => u?.destination?.intakeMonths ?? []) ?? [])),
    [courses]
  );

  const filtered = courses.filter((course) => {
    if (country && !course.topUniversities?.some((u) => u?.destination?.country === country)) return false;
    if (university && !course.topUniversities?.some((u) => u?.name === university)) return false;
    if (category && course.category !== category) return false;
    if (duration && course.duration !== duration) return false;
    if (maxBudget && course.tuitionFromUSD && course.tuitionFromUSD > Number(maxBudget)) return false;
    if (intake && !course.topUniversities?.some((u) => u?.destination?.intakeMonths?.includes(intake))) return false;
    if (minGrowth) {
      const minIndex = DEMAND_ORDER.indexOf(minGrowth);
      if (!course.demand || DEMAND_ORDER.indexOf(course.demand) < minIndex) return false;
    }
    return true;
  });

  const selectClass = "rounded-lg border border-light-gray px-3 py-2 text-sm text-navy focus:border-gold focus:outline-none";

  return (
    <div>
      <div className="mb-10 grid gap-3 rounded-2xl bg-light-gray p-6 sm:grid-cols-2 lg:grid-cols-4">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
          <option value="">All Countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={university} onChange={(e) => setUniversity(e.target.value)} className={selectClass}>
          <option value="">All Universities</option>
          {universities.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
          <option value="">All Fields of Study</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={duration} onChange={(e) => setDuration(e.target.value)} className={selectClass}>
          <option value="">Any Duration</option>
          {durations.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select value={intake} onChange={(e) => setIntake(e.target.value)} className={selectClass}>
          <option value="">Any Intake</option>
          {intakes.map((i) => <option key={i} value={i}>{i}</option>)}
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
          <option value="">Any Career Demand</option>
          {DEMAND_ORDER.map((d) => <option key={d} value={d}>{d}+ demand</option>)}
        </select>

        <button
          type="button"
          onClick={() => {
            setCountry("");
            setUniversity("");
            setCategory("");
            setDuration("");
            setMaxBudget("");
            setIntake("");
            setMinGrowth("");
          }}
          className="rounded-lg border border-navy/20 px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-white"
        >
          Clear Filters
        </button>
      </div>

      <p className="mb-6 text-sm text-navy/60">{filtered.length} courses found</p>

      {filtered.length === 0 ? (
        <p className="text-center text-navy/60">No courses match these filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseFinderCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
