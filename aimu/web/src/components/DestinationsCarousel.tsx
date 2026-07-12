"use client";

import { useEffect, useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateArrows() {
      if (!track) return;
      setCanScrollLeft(track.scrollLeft > 8);
      setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
    }

    updateArrows();
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [destinations.length]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 360;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto max-w-7xl px-6">
      <div ref={trackRef} className="snap-carousel flex gap-6 overflow-x-auto px-1 pb-4 pt-1">
        {destinations.map((destination) => (
          <DestinationCard key={destination.key} destination={destination} />
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Previous destinations"
          onClick={() => scrollByCard(-1)}
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-110 sm:flex"
        >
          ‹
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          aria-label="Next destinations"
          onClick={() => scrollByCard(1)}
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-110 sm:flex"
        >
          ›
        </button>
      )}
    </div>
  );
}
