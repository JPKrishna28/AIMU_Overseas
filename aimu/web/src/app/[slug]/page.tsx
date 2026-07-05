import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";
import { PageBuilder } from "@/components/PageBuilder";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) return notFound();

  return <PageBuilder blocks={page.pageBuilder} />;
}
