import { client } from "@/sanity/client";
import { UNIVERSITIES_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { UniversitySearch } from "@/components/UniversitySearch";
import { UkUniversitiesGrid } from "@/components/UkUniversitiesGrid";

export const metadata = { title: "Universities — AIMU Global" };

export default async function UniversitiesPage() {
  const universities = await client.fetch(UNIVERSITIES_QUERY);

  return (
    <>
      <PageHeader
        title="University Explorer"
        subtitle="Search and compare partner universities across the world's top study destinations."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {universities.length === 0 ? (
          <p className="text-center text-navy/60">No universities yet. Add some in the Sanity Studio.</p>
        ) : (
          <UniversitySearch universities={universities} />
        )}
      </section>
      <UkUniversitiesGrid />
    </>
  );
}
