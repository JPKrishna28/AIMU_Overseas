import Link from "next/link";
import { client } from "@/sanity/client";
import { COURSES_QUERY } from "@/sanity/queries";
import { CourseFinder } from "@/components/CourseFinder";

export const metadata = { title: "Find Your Ideal Program — AIMU Global" };

export default async function CoursesPage() {
  const courses = await client.fetch(COURSES_QUERY);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-6 py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span
              className="animate-hero inline-block rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-navy"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Discover Your Future
            </span>
            <h1
              className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight text-white sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Find Your Ideal Program
            </h1>
            <p
              className="animate-hero mt-6 max-w-2xl text-lg text-white/70"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              Expertly curated academic pathways designed to bridge the gap between your aspirations
              and global excellence. Explore world-class programs across leading international
              destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {courses.length === 0 ? (
          <p className="text-center text-navy/60">No courses yet. Add some in the Sanity Studio.</p>
        ) : (
          <CourseFinder courses={courses} />
        )}
      </section>

      {/* CTA */}
      <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 overflow-hidden rounded-3xl bg-navy p-12 lg:flex-row lg:p-24">
          <div className="flex-1">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="max-w-xl text-lg text-white/70">
              Get personalized course recommendations and expert guidance from our certified
              admissions consultants.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-10 py-5 text-center text-sm font-semibold uppercase tracking-wider text-navy transition-all hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/cost-calculator"
              className="rounded-full border border-white/30 px-10 py-5 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              Estimate Costs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
