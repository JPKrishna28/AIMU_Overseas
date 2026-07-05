import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import { COURSE_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await client.fetch(COURSE_QUERY, { slug });

  if (!course) return notFound();

  return (
    <>
      <PageHeader title={course.title ?? ""} subtitle={course.category ?? undefined} />

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {Array.isArray(course.overview) && (
            <div className="prose max-w-none text-navy/80">
              <PortableText value={course.overview} />
            </div>
          )}

          {course.careerOutcomes && course.careerOutcomes.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-navy">Career Outcomes</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {course.careerOutcomes.map((outcome) => (
                  <li key={outcome} className="rounded-full bg-light-gray px-4 py-1.5 text-sm text-navy">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(course.admissionRequirements) && course.admissionRequirements.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-navy">Admission Requirements</h2>
              <div className="prose mt-3 max-w-none text-navy/80">
                <PortableText value={course.admissionRequirements} />
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-8">
          <div className="rounded-2xl bg-light-gray p-6">
            <h3 className="font-heading font-semibold text-navy">Quick Facts</h3>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              {course.duration && (
                <div>
                  <dt className="text-navy/50">Duration</dt>
                  <dd className="font-medium text-navy">{course.duration}</dd>
                </div>
              )}
              {course.averageSalary && (
                <div>
                  <dt className="text-navy/50">Average Salary</dt>
                  <dd className="font-medium text-navy">{course.averageSalary}</dd>
                </div>
              )}
              {course.demand && (
                <div>
                  <dt className="text-navy/50">Demand</dt>
                  <dd className="font-medium text-navy">{course.demand}</dd>
                </div>
              )}
            </dl>
          </div>

          {course.topUniversities && course.topUniversities.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-navy">Top Universities</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {course.topUniversities.map((university) =>
                  university?.slug?.current ? (
                    <li key={university._id}>
                      <Link
                        href={`/universities/${university.slug.current}`}
                        className="text-sm text-navy underline decoration-gold underline-offset-4"
                      >
                        {university.name}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          <Link
            href="/contact"
            className="rounded-full bg-navy px-6 py-3 text-center text-sm font-semibold text-white hover:bg-navy/90"
          >
            Book a Free Consultation
          </Link>
        </aside>
      </section>
    </>
  );
}
