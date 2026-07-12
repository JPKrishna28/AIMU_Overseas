import { client } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY, LEAD_FORM_OPTIONS_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/PageBuilder";
import { StatsBar } from "@/components/StatsBar";
import { HomeFinder } from "@/components/HomeFinder";
import { BentoGrid } from "@/components/BentoGrid";
import { GoogleReviewsMarquee } from "@/components/GoogleReviewsMarquee";
import { JourneySteps } from "@/components/JourneySteps";
import { UniversitiesMarquee } from "@/components/UniversitiesMarquee";
import { ChairmanMessage } from "@/components/ChairmanMessage";

export default async function Home() {
  const [page, siteSettings, leadFormOptions] = await Promise.all([
    client.fetch(PAGE_QUERY, { slug: "home" }),
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(LEAD_FORM_OPTIONS_QUERY),
  ]);

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
    (block) => block._type !== "hero" && block._type !== "destinationsBlock",
  );

  const countries = (leadFormOptions.countries ?? []).filter((c): c is string => Boolean(c));
  const courses = (leadFormOptions.courses ?? []).filter((c): c is string => Boolean(c));

  return (
    <>
      <PageBuilder blocks={heroBlock ? [heroBlock] : []} />
      <StatsBar stats={siteSettings?.stats} />
      <HomeFinder countries={countries} courses={courses} />
      <GoogleReviewsMarquee />
      <ChairmanMessage />
      <PageBuilder blocks={destinationsBlock ? [destinationsBlock] : []} />
      <UniversitiesMarquee />
      <JourneySteps />
      <BentoGrid />
      <PageBuilder blocks={restBlocks} />
    </>
  );
}
