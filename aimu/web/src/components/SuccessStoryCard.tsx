import Link from "next/link";
import { DotGrid } from "@/components/DotGrid";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import type { PAGE_QUERY_RESULT } from "../../sanity.types";

type Blocks = NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>;
type TestimonialsBlockType = Extract<Blocks[number], { _type: "testimonialsBlock" }>;
export type SuccessStory = NonNullable<NonNullable<TestimonialsBlockType["testimonials"]>[number]>;

export function SuccessStoryCard({ story }: { story: SuccessStory }) {
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
