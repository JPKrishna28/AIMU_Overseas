"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { PAGE_QUERY_RESULT } from "../../sanity.types";

type Blocks = NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>;
type DestinationsBlockType = Extract<Blocks[number], { _type: "destinationsBlock" }>;
type Destination = NonNullable<NonNullable<DestinationsBlockType["destinations"]>[number]>;

function PolaroidStack({ images, country }: { images: Destination["galleryImages"]; country: string | null | undefined }) {
  const photos = images && images.length > 0 ? images.slice(0, 3) : [null, null, null];
  const rotations = ["-rotate-6", "rotate-3", "-rotate-2"];
  const positions = ["left-0 top-4", "left-16 top-0", "left-10 top-16"];

  return (
    <div className="relative h-48 w-full">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`absolute h-28 w-24 rounded-md border-4 border-white bg-light-gray shadow-md transition-transform duration-500 group-hover:rotate-0 ${rotations[index]} ${positions[index]}`}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(photo).width(200).height(200).url()}
              alt={country ?? ""}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-navy/30">Photo</div>
          )}
        </div>
      ))}
      <span className="absolute bottom-0 right-2 text-2xl" aria-hidden>
        ✈
      </span>
    </div>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="hover-lift group flex w-[min(340px,82vw)] shrink-0 flex-col gap-4 rounded-2xl bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
      <PolaroidStack images={destination.galleryImages} country={destination.country} />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">Study In</p>
        <h3 className="font-heading text-3xl font-extrabold text-red-600">{destination.country}</h3>
      </div>

      {destination.whyStudyPoints && destination.whyStudyPoints.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-navy">Why Study in {destination.country?.toUpperCase()}</p>
          <ul className="mt-2 flex flex-col gap-2">
            {destination.whyStudyPoints.map((point, index) => (
              <li key={index} className="flex gap-2 text-sm text-navy/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {destination.slug?.current && (
        <Link
          href={`/destinations/${destination.slug.current}`}
          className="mt-auto text-sm font-semibold text-gold underline underline-offset-4"
        >
          Learn more
        </Link>
      )}
    </div>
  );
}

export function DestinationsCarousel({ destinations }: { destinations: Destination[] }) {
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
    <div className="relative">
      <div ref={trackRef} className="snap-carousel flex gap-6 overflow-x-auto px-1 pb-4 pt-1">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Previous destinations"
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-110 sm:flex"
        >
          ‹
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          aria-label="Next destinations"
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-110 sm:flex"
        >
          ›
        </button>
      )}
    </div>
  );
}
