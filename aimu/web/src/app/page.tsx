import { client } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/PageBuilder";
import { StatsBar } from "@/components/StatsBar";

export default async function Home() {
  const [page, siteSettings] = await Promise.all([
    client.fetch(PAGE_QUERY, { slug: "home" }),
    client.fetch(SITE_SETTINGS_QUERY),
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
  const restBlocks = blocks.filter((block) => block._type !== "hero");

  return (
    <>
      <PageBuilder blocks={heroBlock ? [heroBlock] : []} />
      <StatsBar stats={siteSettings?.stats} />
      <PageBuilder blocks={restBlocks} />
    </>
  );
}
