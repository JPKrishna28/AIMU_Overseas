"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { STITCH_IMAGES } from "@/lib/stitchImages";
import type { COURSES_QUERY_RESULT } from "../../sanity.types";

type Course = COURSES_QUERY_RESULT[number];

type SortOrder = "relevant" | "priceAsc" | "priceDesc";

function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

function uniqueCountries(course: Course): string[] {
  return uniqueSorted(course.topUniversities?.map((u) => u?.destination?.country) ?? []);
}

function courseImage(course: Course) {
  for (const university of course.topUniversities ?? []) {
    if (university?.destination?.heroImage) return university.destination.heroImage;
  }
  return null;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-navy/50">{label}</p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label key={option} className="group flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-5 w-5 rounded border-navy/30 text-gold accent-[#c89b3c] focus:ring-gold"
            />
            <span className="text-sm text-navy/80 transition-colors group-hover:text-navy">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CourseCatalogCard({ course, index }: { course: Course; index: number }) {
  const countries = uniqueCountries(course);
  const image = courseImage(course);
  const fallbackImage = index % 2 === 0 ? STITCH_IMAGES.courseLab : STITCH_IMAGES.courseLibrary;
  const universityCount = (course.topUniversities ?? []).length;
  const highDemand = course.demand === "High" || course.demand === "Very High";

  return (
    <div className="group flex h-full flex-col overflow-hidden hover-lift rounded-xl border border-navy/10 bg-white shadow-[0_4px_20px_-2px_rgba(13,28,50,0.08)]">
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image ? urlFor(image).width(800).height(400).url() : fallbackImage}
          alt={course.title ?? ""}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {highDemand && (
            <span className="rounded-full bg-emerald/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              High Demand
            </span>
          )}
          {course.category && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-navy backdrop-blur-md">
              {course.category}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-heading text-xl font-semibold text-navy transition-colors group-hover:text-gold">
          {course.title}
        </h3>

        <div className="flex-1 space-y-2">
          {countries.length > 0 && (
            <div className="flex items-center gap-2 text-navy/60">
              <span className="material-symbols-outlined text-base text-gold">public</span>
              <span className="text-sm font-medium">{countries.join(" · ")}</span>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-navy/10 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-navy/50">Universities</p>
              <p className="font-heading text-lg font-semibold text-navy">
                {universityCount > 0 ? `${universityCount}+` : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-navy/50">Duration</p>
              <p className="font-heading text-lg font-semibold text-navy">{course.duration ?? "—"}</p>
            </div>
            {course.tuitionFrom && (
              <div>
                <p className="text-xs uppercase tracking-wider text-navy/50">Tuition From</p>
                <p className="font-heading text-lg font-semibold text-navy">{course.tuitionFrom}</p>
              </div>
            )}
            {course.averageSalary && (
              <div>
                <p className="text-xs uppercase tracking-wider text-navy/50">Avg Salary</p>
                <p className="font-heading text-lg font-semibold text-navy">{course.averageSalary}</p>
              </div>
            )}
          </div>
        </div>

        {course.slug?.current && (
          <Link
            href={`/courses/${course.slug.current}`}
            className="mt-6 w-full rounded-lg bg-navy py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-ink"
          >
            View Program Details
          </Link>
        )}
      </div>
    </div>
  );
}

export function CourseFinder({ courses }: { courses: COURSES_QUERY_RESULT }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevant");

  const categories = useMemo(() => uniqueSorted(courses.map((c) => c.category)), [courses]);
  const countries = useMemo(
    () => uniqueSorted(courses.flatMap((c) => c.topUniversities?.map((u) => u?.destination?.country) ?? [])),
    [courses]
  );
  const intakes = useMemo(
    () => uniqueSorted(courses.flatMap((c) => c.topUniversities?.flatMap((u) => u?.destination?.intakeMonths ?? []) ?? [])),
    [courses]
  );

  function toggle(setter: React.Dispatch<React.SetStateAction<string[]>>) {
    return (value: string) =>
      setter((current) =>
        current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      );
  }

  const filtered = courses.filter((course) => {
    if (selectedCategories.length > 0 && (!course.category || !selectedCategories.includes(course.category)))
      return false;
    if (
      selectedCountries.length > 0 &&
      !course.topUniversities?.some((u) => u?.destination?.country && selectedCountries.includes(u.destination.country))
    )
      return false;
    if (
      selectedIntakes.length > 0 &&
      !course.topUniversities?.some((u) => u?.destination?.intakeMonths?.some((m) => selectedIntakes.includes(m)))
    )
      return false;
    if (maxBudget && course.tuitionFromUSD && course.tuitionFromUSD > Number(maxBudget)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "priceAsc") return (a.tuitionFromUSD ?? Infinity) - (b.tuitionFromUSD ?? Infinity);
    if (sortOrder === "priceDesc") return (b.tuitionFromUSD ?? 0) - (a.tuitionFromUSD ?? 0);
    return 0;
  });

  const hasFilters =
    selectedCategories.length > 0 || selectedCountries.length > 0 || selectedIntakes.length > 0 || maxBudget !== "";

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar Filters */}
      <aside className="w-full flex-shrink-0 lg:w-72">
        <div className="space-y-8 rounded-xl border border-navy/10 bg-white p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-navy">Filters</h3>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedCountries([]);
                  setSelectedIntakes([]);
                  setMaxBudget("");
                }}
                className="text-sm font-medium text-gold hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          <CheckboxGroup
            label="Subject"
            options={categories}
            selected={selectedCategories}
            onToggle={toggle(setSelectedCategories)}
          />
          <CheckboxGroup
            label="Destination"
            options={countries}
            selected={selectedCountries}
            onToggle={toggle(setSelectedCountries)}
          />
          <CheckboxGroup
            label="Intake"
            options={intakes}
            selected={selectedIntakes}
            onToggle={toggle(setSelectedIntakes)}
          />

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/50">Max Budget</p>
            <input
              type="number"
              inputMode="numeric"
              placeholder="USD / year"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </aside>

      {/* Course Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-navy/60">
            <span className="font-bold text-navy">{sorted.length}</span> programs found matching your criteria
          </p>
          <div className="flex w-full items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 md:w-auto">
            <span className="material-symbols-outlined text-navy/40">sort</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="border-none bg-transparent text-sm text-navy focus:outline-none focus:ring-0"
            >
              <option value="relevant">Most Relevant</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <p className="py-16 text-center text-navy/60">No courses match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sorted.map((course, index) => (
              <CourseCatalogCard key={course._id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
