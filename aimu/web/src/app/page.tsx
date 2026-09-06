import { client } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/PageBuilder";
import { StatsBar } from "@/components/StatsBar";
import { BentoGrid } from "@/components/BentoGrid";
import { JourneyAnimation } from "@/components/JourneyAnimation";
import { ChairmanMessage } from "@/components/ChairmanMessage";
import { PopularCourses } from "@/components/PopularCourses";
import { ValuePropsMarquee } from "@/components/ValuePropsMarquee";
import { FlightPath } from "@/components/FlightPath";

export default async function Home() {
  const page = await client.fetch(PAGE_QUERY, { slug: "home" });

  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-heading text-2xl font-bold text-navy">No homepage content yet</h1>
        <p className="mt-2 text-navy/60">
          Create a Page document with slug &ldquo;home&rdquo; in the Sanity Studio to populate this page.
        </p>
      </div>
    );
  }

  const blocks = page.pageBuilder ?? [];
  const heroBlock = blocks.find((block) => block._type === "hero");
  const destinationsBlock = blocks.find((block) => block._type === "destinationsBlock");
  const restBlocks = blocks.filter(
    (block) =>
      block._type !== "hero" &&
      block._type !== "destinationsBlock" &&
      block._type !== "trustIndicatorsBlock" &&
      block._type !== "trustBlock" &&
      block._type !== "coursesBlock",
  );

  return (
    <>
      <PageBuilder blocks={heroBlock ? [heroBlock] : []} />
      <StatsBar />
      <ValuePropsMarquee />
      <FlightPath />
      {/* University search filter hidden — was <HomeFinder /> here. */}
      {/* Why AIMU sits above the admission process. */}
      <BentoGrid />
      <FlightPath />
      {/* Admission process — scroll-driven left-to-right journey, moved up under the hero. */}
      <JourneyAnimation />
      {/* Google reviews hidden — was <GoogleReviewsMarquee /> here. */}
      <ChairmanMessage />
      <FlightPath />
      <PageBuilder blocks={destinationsBlock ? [destinationsBlock] : []} />
      {/* University logo marquee hidden — was <UniversitiesMarquee /> here. */}
      <FlightPath />
      <PopularCourses />
      <PageBuilder blocks={restBlocks} />
    </>
  );
}
