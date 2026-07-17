import Link from "next/link";
import { client } from "@/sanity/client";
import { TESTIMONIALS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { BlendImage } from "@/components/BlendImage";
import { urlFor } from "@/sanity/image";
import { countryImage } from "@/lib/stitchImages";
import type { TESTIMONIALS_QUERY_RESULT } from "../../../sanity.types";

export const metadata = { title: "Success Stories — AIMU Global" };

type Story = TESTIMONIALS_QUERY_RESULT[number];

const MILESTONE_ICONS = ["school", "flight_takeoff", "workspace_premium", "public"];

function JourneyStory({ story, index }: { story: Story; index: number }) {
  const reversed = index % 2 === 1;
  const campusImage = story.destination?.heroImage;

  return (
    <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
      {/* Milestone dot */}
      <div
        className={`absolute left-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow-lg md:flex ${
          index % 2 === 0 ? "bg-gold" : "bg-navy"
        }`}
      >
        <span className={`material-symbols-outlined text-sm ${index % 2 === 0 ? "text-navy" : "text-gold"}`}>
          {MILESTONE_ICONS[index % MILESTONE_ICONS.length]}
        </span>
      </div>

      {/* Story card */}
      <div className={`w-full md:w-[45%] ${reversed ? "order-2" : "order-2 md:order-1"}`}>
        <div className="hover-lift rounded-xl border border-navy/10 bg-white/90 p-8 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gold/30">
              {story.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(story.photo).width(160).height(160).url()}
                  alt={story.studentName ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-light-gray">
                  <span className="material-symbols-outlined text-navy/30">person</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-navy">{story.studentName}</h3>
              {story.course?.title && <p className="text-sm text-navy/60">{story.course.title}</p>}
            </div>
          </div>

          {(story.university?.name || story.destination?.country) && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-navy p-2.5">
              <span className="material-symbols-outlined text-gold">location_on</span>
              <span className="text-xs font-medium text-white">
                {[story.university?.name, story.destination?.country].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {story.headline && (
            <div className="mb-6 rounded-lg bg-gold/15 p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gold">The Outcome</p>
              <p className="text-sm text-navy/70">{story.headline}</p>
            </div>
          )}

          <blockquote className="border-l-4 border-gold pl-4 italic text-navy/70">
            &ldquo;{story.quote}&rdquo;
            {story.counsellorName && (
              <span className="mt-2 block not-italic text-sm text-navy/50">
                — guided by <span className="font-semibold text-navy">{story.counsellorName}</span>
              </span>
            )}
          </blockquote>
        </div>
      </div>

      {/* Campus / student image */}
      <div className={`w-full md:w-[45%] ${reversed ? "order-1" : "order-1 md:order-2"}`}>
        <div className="aspect-[4/3] transform overflow-hidden rounded-xl shadow-xl transition-transform hover:scale-[1.02]">
          <BlendImage
            src={
              campusImage
                ? urlFor(campusImage).width(1000).height(750).url()
                : countryImage(story.destination?.country, index)
            }
            alt={story.destination?.country ?? story.studentName ?? ""}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default async function SuccessStoriesPage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY);
  const videoStories = testimonials.filter((t) => t.videoUrl);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <span
            className="animate-hero inline-block rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-navy"
            style={{ "--hero-delay": "0ms" } as React.CSSProperties}
          >
            Alumni Impact
          </span>
          <h1
            className="animate-hero mt-6 font-heading text-4xl font-bold leading-tight text-navy sm:text-6xl"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
          >
            From Dream to Reality:
            <br />
            <span className="text-gold">Student Success Stories</span>
          </h1>
          <p
            className="animate-hero mx-auto mt-6 max-w-2xl text-lg text-navy/60"
            style={{ "--hero-delay": "240ms" } as React.CSSProperties}
          >
            Discover the transformative journeys of students who reached their global academic goals
            with the strategic guidance of AIMU Global.
          </p>
        </div>
      </section>

      {/* Journey Map */}
      <section className="relative bg-light-gray/60 px-6 py-20 sm:py-28">
        <div className="relative mx-auto max-w-7xl">
          {/* Vertical path line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 bg-gradient-to-b from-gold/60 via-navy/20 to-transparent md:block" />

          {testimonials.length === 0 ? (
            <p className="text-center text-navy/60">No success stories yet. Add some in the Sanity Studio.</p>
          ) : (
            <div className="space-y-20 sm:space-y-28">
              {testimonials.map((story, index) => (
                <Reveal key={story._id}>
                  <JourneyStory story={story} index={index} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials */}
      {videoStories.length > 0 && (
        <section className="bg-navy px-6 py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl">In Their Own Words</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                  Hear from our students worldwide about their experiences with the AIMU Global advantage.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {videoStories.map((story, index) => (
                <Reveal key={story._id} delay={index * 90}>
                  <div>
                    <VideoThumbnail
                      photo={story.photo}
                      videoUrl={story.videoUrl}
                      alt={story.studentName ?? ""}
                      aspectClass="aspect-video"
                    />
                    <p className="mt-3 text-sm font-medium text-white/80">
                      {[story.studentName, story.destination?.country].filter(Boolean).join(" — ")}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-20 sm:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink py-24 text-center text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
            </div>
            <div className="relative z-10 mx-auto max-w-xl px-6">
              <h2 className="font-heading text-3xl font-bold sm:text-5xl">Start Your Own Success Story</h2>
              <p className="mt-6 text-lg text-white/70">
                Your journey to global excellence begins with a single conversation. Let&rsquo;s map out
                your future together.
              </p>
              <Link
                href="/contact"
                className="mt-10 inline-block rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-navy shadow-lg transition-all hover:scale-105"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
