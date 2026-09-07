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
      className="fixed z-40 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-navy transition-[left,top] ease-in-out hover:scale-125 sm:h-14 sm:w-14"
      style={{
        left: flight.pos.x,
        top: flight.pos.y,
        transitionDuration: `${GLIDE_MS}ms`,
      }}
    >
      <svg
        viewBox="0 0 64 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-full w-full drop-shadow-[0_6px_10px_rgba(10,25,47,0.4)]"
        style={{ transform: flight.facingLeft ? "scaleX(-1)" : undefined }}
      >
        <path d="M2 13.2c0-.7.6-1.2 1.3-1.1l14.2 1.9 8-8.6c.3-.3.7-.5 1.1-.5h2.6c.5 0 .8.5.6.9l-4.3 8.6 13.6.4 4.6-4.1c.2-.2.5-.3.8-.3h2c.4 0 .7.4.5.8l-2.6 5.1 2.6 5.1c.2.4-.1.8-.5.8h-2c-.3 0-.6-.1-.8-.3l-4.6-4.1-13.6.4 4.3 8.6c.2.4-.1.9-.6.9h-2.6c-.4 0-.8-.2-1.1-.5l-8-8.6-14.2 1.9C2.6 20.4 2 19.9 2 19.2v-6z" />
      </svg>
    </button>
  );
}
