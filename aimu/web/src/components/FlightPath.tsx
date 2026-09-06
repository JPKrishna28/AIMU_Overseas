/**
 * Decorative flying-plane divider. Pure CSS animation — a small airplane icon
 * tracks left-to-right along a dashed flight path. Purely ornamental, so it is
 * hidden from assistive tech and disabled under prefers-reduced-motion.
 */
export function FlightPath({ className = "" }: { className?: string }) {
  return (
    <div className={`flightpath ${className}`} aria-hidden="true">
      <svg className="flightpath__plane" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 19.5 21 12 2.5 4.5 2.5 10 15 12 2.5 14 z" />
      </svg>
    </div>
  );
}
