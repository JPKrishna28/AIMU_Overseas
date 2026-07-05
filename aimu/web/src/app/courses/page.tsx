import { client } from "@/sanity/client";
import { COURSES_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { CourseFinder } from "@/components/CourseFinder";

export const metadata = { title: "Find the Right Course — AIMU Global" };

export default async function CoursesPage() {
  const courses = await client.fetch(COURSES_QUERY);

  return (
    <>
      <PageHeader
        title="Find the Right Course"
        subtitle="Search by country, university, field of study, budget, intake, and career demand."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {courses.length === 0 ? (
          <p className="text-center text-navy/60">No courses yet. Add some in the Sanity Studio.</p>
        ) : (
          <CourseFinder courses={courses} />
        )}
      </section>
    </>
  );
}
