"use client";

import { useEffect, useState } from "react";

export function RotatingQuote({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  if (quotes.length === 0) return null;

  return (
    <p key={index} className="animate-fade max-w-2xl text-sm italic text-gold sm:text-base">
      &ldquo;{quotes[index]}&rdquo;
    </p>
  );
}
