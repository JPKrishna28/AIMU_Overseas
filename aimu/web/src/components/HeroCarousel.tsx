"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type HeroSlide = {
  image: string;
  eyebrow: string;
  heading: string;
  tagline: string;
  cta?: { label: string; href: string };
};

const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD = 50;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="AIMU Global highlights"
      className="relative h-[520px] w-full overflow-hidden bg-navy text-white sm:h-[80vh] sm:max-h-[720px] sm:min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image + i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* readability scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/20 sm:to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-12">
            <div className="max-w-2xl">
              <p
                className={`mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-500 sm:text-sm ${
                  i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {slide.eyebrow}
              </p>
              <h1
                className={`font-heading text-3xl font-bold leading-tight tracking-tight transition-all delay-75 duration-500 sm:text-5xl sm:leading-[1.15] lg:text-6xl ${
                  i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {slide.heading}
              </h1>
              <p
                className={`mt-4 font-heading text-base font-semibold text-gold-bright transition-all delay-150 duration-500 sm:text-xl ${
                  i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {slide.tagline}
              </p>
              {slide.cta && (
                <Link
                  href={slide.cta.href}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-all delay-200 duration-500 hover:brightness-110 ${
                    i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {count > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:left-6"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:right-6"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
