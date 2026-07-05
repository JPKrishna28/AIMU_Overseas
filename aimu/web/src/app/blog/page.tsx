import Link from "next/link";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { urlFor } from "@/sanity/image";

export const metadata = { title: "Resources — AIMU Global" };

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <>
      <PageHeader
        title="Knowledge Centre"
        subtitle="Country guides, visa updates, scholarships, and career trends."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-navy/60">No articles yet. Add some in the Sanity Studio.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) =>
              post.slug?.current ? (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="hover-lift overflow-hidden rounded-2xl border border-light-gray"
                >
                  {post.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(post.coverImage).width(600).height(360).url()}
                      alt={post.title ?? ""}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    {post.category && (
                      <p className="text-xs font-semibold uppercase text-gold">{post.category}</p>
                    )}
                    <h2 className="mt-2 font-heading font-semibold text-navy">{post.title}</h2>
                    {post.excerpt && <p className="mt-2 line-clamp-2 text-sm text-navy/70">{post.excerpt}</p>}
                  </div>
                </Link>
              ) : null
            )}
          </div>
        )}
      </section>
    </>
  );
}
