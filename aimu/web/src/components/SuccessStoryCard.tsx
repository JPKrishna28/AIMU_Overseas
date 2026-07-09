import Link from "next/link";
import { DotGrid } from "@/components/DotGrid";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { urlFor } from "@/sanity/image";
import type { PAGE_QUERY_RESULT } from "../../sanity.types";

type Blocks = NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>;
type TestimonialsBlockType = Extract<Blocks[number], { _type: "testimonialsBlock" }>;
export type SuccessStory = NonNullable<NonNullable<TestimonialsBlockType["testimonials"]>[number]>;

function DarkStoryCard({ story, reversed }: { story: SuccessStory; reversed: boolean }) {
  return (
    <div
      className={`hover-lift flex flex-col items-center gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.08] md:p-12 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex w-full flex-col items-center gap-6 md:w-1/3">
        <div className="relative">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-gold">
            {story.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(story.photo).width(400).height(400).url()}
                alt={story.studentName ?? ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/10 text-4xl text-white/40">
                <span className="material-symbols-outlined text-5xl">person</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-xl bg-white p-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-navy">school</span>
          </div>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white">{story.studentName}</h4>
          {story.university?.name && <p className="text-sm font-semibold text-gold">{story.university.name}</p>}
        </div>
      </div>

      <div className="flex-1 text-white">
        {story.headline && (
          <h3 className="mb-6 font-heading text-2xl font-semibold">&ldquo;{story.headline}&rdquo;</h3>
        )}
        <p className="mb-8 text-lg italic text-white/70">
          &ldquo;{story.quote}&rdquo;
          {story.counsellorName && (
            <>
              {" "}
              — with the help of <span className="font-semibold text-white">{story.counsellorName}</span>.
            </>
          )}
        </p>
        <Link
          href="/success-stories"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:translate-x-2"
        >
          Read Full Journey <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
}

export function SuccessStoryCard({
  story,
  variant = "light",
  reversed = false,
}: {
  story: SuccessStory;
  variant?: "light" | "dark";
  reversed?: boolean;
}) {
  if (variant === "dark") {
    return <DarkStoryCard story={story} reversed={reversed} />;
  }

  return (
    <div className="grid overflow-hidden rounded-3xl bg-light-gray lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-5 p-6 sm:gap-6 sm:p-10 lg:p-14">
        {story.university?.name && (
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy/60">
            <span className="h-1.5 w-1.5 rounded-full bg-navy/60" />
            {story.university.name}
          </p>
        )}

        <h2 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-4xl">
          {story.headline || `Study Journey of ${story.studentName}`}
        </h2>

        <p className="text-navy/70">
          {story.quote}
          {story.counsellorName && (
            <>
              {" "}
              with the help of <span className="font-semibold text-navy">{story.counsellorName}</span>.
            </>
          )}
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="rounded bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-navy/90"
          >
            Get in Touch
          </Link>
          <DotGrid />
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <VideoThumbnail photo={story.photo} videoUrl={story.videoUrl} alt={story.studentName ?? ""} />
      </div>
    </div>
  );
}
