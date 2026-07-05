import Link from "next/link";
import { client } from "@/sanity/client";
import { DESTINATIONS_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { urlFor } from "@/sanity/image";

export const metadata = { title: "Study Destinations — AIMU Global" };

export default async function DestinationsPage() {
  const destinations = await client.fetch(DESTINATIONS_QUERY);

  return (
    <>
      <PageHeader
        title="Study Destinations"
        subtitle="Explore top countries for international education, matched to your goals."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {destinations.length === 0 ? (
          <p className="text-center text-navy/60">No destinations yet. Add some in the Sanity Studio.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) =>
              destination.slug?.current ? (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination.slug.current}`}
                  className="hover-lift group overflow-hidden rounded-2xl border border-light-gray"
                >
                  {destination.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(destination.heroImage).width(600).height(360).url()}
                      alt={destination.country ?? ""}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-2xl">{destination.flagEmoji}</p>
                    <h2 className="mt-2 font-heading text-lg font-semibold text-navy">
                      {destination.country}
                    </h2>
                    {destination.summary && (
                      <p className="mt-2 line-clamp-2 text-sm text-navy/70">{destination.summary}</p>
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
