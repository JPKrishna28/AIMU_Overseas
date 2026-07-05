import Link from "next/link";
import { client } from "@/sanity/client";
import { VISA_GUIDANCE_INDEX_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Complete Visa Guidance — AIMU Global" };

export default async function VisaGuidancePage() {
  const destinations = await client.fetch(VISA_GUIDANCE_INDEX_QUERY);

  return (
    <>
      <PageHeader
        title="Complete Visa Guidance"
        subtitle="Step-by-step process, document checklists, timelines, and country-specific tips."
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        {destinations.length === 0 ? (
          <p className="text-center text-navy/60">No visa guidance yet. Add it to destinations in the Sanity Studio.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {destinations.map((destination) =>
              destination.slug?.current ? (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination.slug.current}`}
                  className="hover-lift flex items-center gap-3 rounded-2xl border border-light-gray p-5 hover:border-gold"
                >
                  <span className="text-2xl">{destination.flagEmoji}</span>
                  <div>
                    <p className="font-heading font-semibold text-navy">{destination.country}</p>
                    {destination.visaGuidance?.timeline && (
                      <p className="text-sm text-navy/60">{destination.visaGuidance.timeline}</p>
                    )}
                  </div>
                </Link>
              ) : null
            )}
          </div>
        )}
      </section>
    </>
  );
}
