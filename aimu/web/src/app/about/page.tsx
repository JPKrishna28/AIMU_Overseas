import { client } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/PageBuilder";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "About — AIMU Global" };

export default async function AboutPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "about" });

  if (!page) {
    return (
      <PageHeader
        title="About AIMU Global"
        subtitle="Create a Page document with slug “about” in the Sanity Studio to populate this page."
      />
    );
  }

  return <PageBuilder blocks={page.pageBuilder} />;
}
