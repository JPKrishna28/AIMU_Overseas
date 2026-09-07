"use client";

import { useEffect, useState } from "react";

// TODO: swap in the real Google Form URL.
const GOOGLE_FORM_URL = "https://forms.gle/REPLACE_ME";

const MOVE_EVERY_MS = 6000;
const GLIDE_MS = 5000;
const MARGIN = 60; // keep clear of screen edges

type Point = { x: number; y: number };
type FlightState = { pos: Point; angle: number };

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
  const angle = current ? (Math.atan2(pos.y - current.pos.y, pos.x - current.pos.x) * 180) / Math.PI : current;
  return { pos, angle: typeof angle === "number" ? angle : 0 };
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
      className="fixed z-40 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-gold transition-[left,top] ease-in-out hover:scale-125 hover:text-gold-bright"
      style={{
        left: flight.pos.x,
        top: flight.pos.y,
        transitionDuration: `${GLIDE_MS}ms`,
      }}
    >
      <span
        aria-hidden
        className="material-symbols-outlined text-[40px] drop-shadow-[0_6px_10px_rgba(10,25,47,0.35)]"
        style={{
          fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 40",
          transform: `rotate(${flight.angle + 45}deg)`,
        }}
      >
        flight
      </span>
    </button>
  );
}
