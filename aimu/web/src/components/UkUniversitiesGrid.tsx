import ukUniversities from "@/data/uk-universities.json";

type UkUniversity = {
  id: string;
  name: string;
  russellGroup: boolean;
  primaryCourses: string[];
  academicEntryRequirements: string;
  englishProficiency: string;
  tuitionFees: string;
  primaryIntakes: string;
  depositCasFee: string;
  scholarships: string;
  courseDurations: string;
  placementIntegration: string;
  deadlines: string;
  website: string;
  country: string;
};

const universities = (ukUniversities as UkUniversity[])
  .filter((u) => u.russellGroup)
  .slice(0, 5);

function UkUniversityCard({ university }: { university: UkUniversity }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-light-gray p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading font-semibold text-navy">{university.name}</h3>
        {university.russellGroup && (
          <span className="shrink-0 rounded-full bg-gold/10 px-2 py-1 text-xs font-semibold text-gold">
            Russell Group
          </span>
        )}
      </div>

      {university.primaryCourses.length > 0 && (
        <p className="text-sm text-navy/70">{university.primaryCourses.join(", ")}</p>
      )}

      {university.tuitionFees && (
        <p className="text-sm text-navy/60">
          <span className="font-semibold text-navy">Tuition: </span>
          {university.tuitionFees}
        </p>
      )}

      {university.primaryIntakes && (
        <p className="text-sm text-navy/60">
          <span className="font-semibold text-navy">Intakes: </span>
          {university.primaryIntakes}
        </p>
      )}

      {university.website && (
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm font-semibold text-gold hover:underline"
        >
          Visit official website
        </a>
      )}
    </div>
  );
}

export function UkUniversitiesGrid() {
  if (universities.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-heading text-2xl font-bold text-navy">
        Top UK Partner Universities
      </h2>
      <p className="mt-2 text-sm text-navy/60">
        Entry requirements, fees, and intakes for our full network of UK partner institutions.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((university) => (
          <UkUniversityCard key={university.id} university={university} />
        ))}
      </div>
    </section>
  );
}
