import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/client";
import { POST_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {post.category && <p className="text-xs font-semibold uppercase text-gold">{post.category}</p>}
      <h1 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl">{post.title}</h1>
      {post.author?.name && (
        <p className="mt-4 text-sm text-navy/60">
          By {post.author.name}
          {post.publishedAt &&
            ` · ${new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}`}
        </p>
      )}
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(post.coverImage).width(900).url()}
          alt={post.title ?? ""}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      )}
      {Array.isArray(post.body) && (
        <div className="prose mt-8 max-w-none text-navy/80">
          <PortableText value={post.body} />
        </div>
      )}
    </article>
  );
}
