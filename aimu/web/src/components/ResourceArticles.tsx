"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { POSTS_QUERY_RESULT } from "../../sanity.types";

type Post = POSTS_QUERY_RESULT[number];

const CATEGORY_ICONS = ["school", "flight_takeoff", "draw", "account_balance", "work", "public"];

function formatDate(date: string | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function ResourceArticles({ posts }: { posts: POSTS_QUERY_RESULT }) {
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(posts.map((p) => p.category).filter((c): c is NonNullable<typeof c> => Boolean(c)))
      ).sort(),
    [posts]
  );

  const filtered = category ? posts.filter((p) => p.category === category) : posts;

  return (
    <>
      {/* Browse by Interest */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center font-heading text-2xl font-semibold text-ink">
            Browse by Interest
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setCategory("")}
              className={`flex items-center gap-3 rounded-2xl border px-8 py-4 text-sm font-medium transition-all ${
                category === ""
                  ? "border-navy bg-navy text-white"
                  : "border-navy/15 bg-white text-navy hover:border-gold"
              }`}
            >
              <span className={`material-symbols-outlined ${category === "" ? "text-gold-bright" : "text-gold"}`}>
                apps
              </span>
              All Topics
            </button>
            {categories.map((c, i) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c === category ? "" : c)}
                className={`group flex items-center gap-3 rounded-2xl border px-8 py-4 text-sm font-medium transition-all ${
                  category === c
                    ? "border-navy bg-navy text-white"
                    : "border-navy/15 bg-white text-navy hover:border-gold"
                }`}
              >
                <span
                  className={`material-symbols-outlined transition-transform group-hover:scale-110 ${
                    category === c ? "text-gold-bright" : "text-gold"
                  }`}
                >
                  {CATEGORY_ICONS[i % CATEGORY_ICONS.length]}
                </span>
                {c}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section id="articles" className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Latest Articles</h2>
          <p className="text-sm text-navy/50">
            {filtered.length} article{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-navy/60">No articles in this topic yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) =>
              post.slug?.current ? (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
                  <article>
                    <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-light-gray">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor(post.coverImage).width(800).height(600).url()}
                          alt={post.title ?? ""}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-navy">
                          <span className="material-symbols-outlined text-5xl text-white/20">article</span>
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy backdrop-blur-sm">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-gold">
                      {post.title}
                    </h3>
                    {post.excerpt && <p className="mt-2 line-clamp-2 text-sm text-navy/60">{post.excerpt}</p>}
                    <div className="mt-4 flex items-center gap-3">
                      {post.author?.photo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor(post.author.photo).width(64).height(64).url()}
                          alt={post.author.name ?? ""}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      )}
                      <span className="text-xs text-navy/50">
                        {[post.author?.name, formatDate(post.publishedAt)].filter(Boolean).join(" · ")}
                      </span>
                    </div>
                  </article>
                </Link>
              ) : null
            )}
          </div>
        )}
      </section>
    </>
  );
}
