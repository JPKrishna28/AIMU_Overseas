"use client";

import { useEffect, useState } from "react";

// TODO: swap in the real Google Form URL.
const GOOGLE_FORM_URL = "https://forms.gle/REPLACE_ME";

const MOVE_EVERY_MS = 6000;
const GLIDE_MS = 5000;
const MARGIN = 60; // keep clear of screen edges

type Point = { x: number; y: number };
type FlightState = { pos: Point; facingLeft: boolean };

function randomPoint(): Point {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    x: MARGIN + Math.random() * Math.max(1, w - MARGIN * 2),
    y: MARGIN + Math.random() * Math.max(1, h - MARGIN * 2 - 80), // stay clear of the bottom mobile tab bar
  };
}

function nextFlight(current: FlightState | null): FlightState {
  const pos = randomPoint();
  // Stays level (horizontal); only mirrors left/right to face the direction it's heading.
  const facingLeft = current ? pos.x < current.pos.x : false;
  return { pos, facingLeft };
}

/**
 * A small plane that roams the viewport like a bug, drifting to a new random
 * spot every few seconds. Click/tap it to open the enquiry form. Purely
 * decorative otherwise, so it's disabled under prefers-reduced-motion.
 */
export function FlightPath() {
  const [flight, setFlight] = useState<FlightState | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Deferred so the first setState doesn't happen synchronously inside the effect body.
    const kickoff = window.setTimeout(() => setFlight((current) => nextFlight(current)), 0);

    const id = window.setInterval(() => {
      setFlight((current) => nextFlight(current));
    }, MOVE_EVERY_MS);

    function onResize() {
      setFlight((current) => current ?? nextFlight(null));
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(kickoff);
      window.clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!flight) return null;

  return (
    <button
      type="button"
      onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
      aria-label="Open the enquiry form"
      title="Fill our quick form"
      className="fixed z-40 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[left,top] ease-in-out hover:scale-125 sm:h-14 sm:w-14"
      style={{
        left: flight.pos.x,
        top: flight.pos.y,
        transitionDuration: `${GLIDE_MS}ms`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flying-plane.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="h-[18px] w-[18px] drop-shadow-[0_6px_10px_rgba(10,25,47,0.4)] sm:h-full sm:w-full"
        style={{ transform: flight.facingLeft ? "rotate(-45deg) scaleX(-1)" : "rotate(-45deg)" }}
      />
    </button>
  );
}
