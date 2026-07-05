import { client } from "@/sanity/client";
import { SCHOLARSHIPS_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Scholarships — AIMU Global" };

function formatDeadline(deadline: string | null | undefined) {
  if (!deadline) return null;
  return new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ScholarshipsPage() {
  const scholarships = await client.fetch(SCHOLARSHIPS_QUERY);

  return (
    <>
      <PageHeader
        title="Scholarship Hub"
        subtitle="Merit, need-based, government, and private scholarships in one place."
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        {scholarships.length === 0 ? (
          <p className="text-center text-navy/60">No scholarships yet. Add some in the Sanity Studio.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="flex flex-col gap-2 rounded-2xl border border-light-gray p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-heading font-semibold text-navy">{scholarship.name}</h2>
                  <p className="mt-1 text-sm text-navy/60">
                    {[scholarship.type, scholarship.destination?.country, scholarship.university?.name]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
                  {scholarship.amount && <span className="font-semibold text-gold">{scholarship.amount}</span>}
                  {scholarship.deadline && (
                    <span className="text-navy/50">Deadline: {formatDeadline(scholarship.deadline)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
