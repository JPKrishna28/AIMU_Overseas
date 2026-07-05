import Link from "next/link";

type CourseDestination = { _id: string; country: string | null; slug: { current?: string } | null };
type CourseUniversity = { _id: string; destination: CourseDestination | null } | null;

export type CourseCardData = {
  _id: string;
  title: string | null;
  slug: { current?: string } | null;
  topUniversities?: CourseUniversity[] | null;
};

function uniqueDestinations(universities: CourseUniversity[] | null | undefined): CourseDestination[] {
  const seen = new Map<string, CourseDestination>();
  for (const university of universities ?? []) {
    const destination = university?.destination;
    if (destination && !seen.has(destination._id)) {
      seen.set(destination._id, destination);
    }
  }
  return Array.from(seen.values());
}

export function CourseCard({ course }: { course: CourseCardData }) {
  const destinations = uniqueDestinations(course.topUniversities);
  const visibleDestinations = destinations.slice(0, 2);
  const extraCount = destinations.length - visibleDestinations.length;
  const universityCount = (course.topUniversities ?? []).length;

  return (
    <div className="hover-lift flex h-full flex-col gap-4 rounded-2xl border border-light-gray bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 rounded-full bg-light-gray px-5 py-3">
        <span aria-hidden>📘</span>
        <span className="font-heading font-semibold text-navy">{course.title}</span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-navy/70">
        {destinations.length > 0 && (
          <p>
            <span className="font-semibold text-navy">Countries: </span>
            {visibleDestinations.map((destination, index) => (
              <span key={destination._id}>
                {destination.slug?.current ? (
                  <Link
                    href={`/destinations/${destination.slug.current}`}
                    className="text-gold underline underline-offset-2"
                  >
                    {destination.country}
                  </Link>
                ) : (
                  destination.country
                )}
                {index < visibleDestinations.length - 1 ? ", " : ""}
              </span>
            ))}
            {extraCount > 0 && <span> +{extraCount} More</span>}
          </p>
        )}
        {universityCount > 0 && (
          <p>
            <span className="font-semibold text-navy">Universities: </span>+{universityCount}
          </p>
        )}
      </div>

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
