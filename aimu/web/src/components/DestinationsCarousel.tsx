import Link from "next/link";

export type MarqueeDestination = {
  key: string;
  country: string;
  slug?: string;
  imageUrl: string;
  headline?: string;
  description?: string;
};

function DestinationCard({ destination }: { destination: MarqueeDestination }) {
  return (
    <div className="hover-lift group relative h-[500px] w-[min(380px,85vw)] shrink-0 overflow-hidden rounded-3xl shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={destination.imageUrl}
        alt={destination.country}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

      <div className="absolute right-6 top-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
          <span className="material-symbols-outlined text-white">flight_takeoff</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-8 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-gold">verified</span>
          <span className="text-sm font-semibold uppercase tracking-wider">{destination.country}</span>
        </div>

        {destination.headline && (
          <>
            <h3 className="mb-4 font-heading text-2xl font-semibold">{destination.headline}</h3>
            {destination.description && (
              <p className="mb-6 line-clamp-2 text-white/80">{destination.description}</p>
            )}
          </>
        )}

        {destination.slug && (
          <Link
            href={`/destinations/${destination.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-all group-hover:gap-4"
          >
            Learn more <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function DestinationsCarousel({ destinations }: { destinations: MarqueeDestination[] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className="marquee-track py-1" style={{ animationDuration: "60s" }}>
        {[...destinations, ...destinations].map((destination, i) => (
          <div key={i} aria-hidden={i >= destinations.length} className="px-3">
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
    </div>
  );
}
