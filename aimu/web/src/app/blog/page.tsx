import Link from "next/link";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { Reveal } from "@/components/Reveal";
import { ResourceArticles } from "@/components/ResourceArticles";
import { urlFor } from "@/sanity/image";
import { STITCH_IMAGES } from "@/lib/stitchImages";

export const metadata = { title: "Resources — AIMU Global" };

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);
  const [featured, second, third] = posts;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 md:flex-row md:py-20">
        <div className="w-full space-y-6 md:w-1/2">
          <span
            className="animate-hero inline-block rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-navy"
            style={{ "--hero-delay": "0ms" } as React.CSSProperties}
          >
            Knowledge Hub
          </span>
          <h1
            className="animate-hero font-heading text-4xl font-bold leading-tight text-ink sm:text-6xl"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
          >
            Expert Guides for Your <span className="italic text-gold">Global Future.</span>
          </h1>
          <p
            className="animate-hero max-w-xl text-lg text-navy/60"
            style={{ "--hero-delay": "240ms" } as React.CSSProperties}
          >
            Navigate the complexities of international education with our curated library of
            research-backed guides, cultural insights, and professional advice.
          </p>
          <div
            className="animate-hero flex gap-3 pt-4"
            style={{ "--hero-delay": "360ms" } as React.CSSProperties}
          >
            <a
              href="#articles"
              className="rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Latest Articles
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-navy/20 px-8 py-3 text-sm font-semibold text-navy transition-all hover:bg-light-gray"
            >
              Ask a Counsellor
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="relative z-10 aspect-video overflow-hidden rounded-3xl shadow-2xl md:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                featured?.coverImage
                  ? urlFor(featured.coverImage).width(1000).height(1000).url()
                  : STITCH_IMAGES.resourcesLibrary
              }
              alt={featured?.title ?? ""}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 -z-0 h-32 w-32 rounded-2xl bg-gold opacity-20" />
          <div className="absolute -right-6 -top-6 -z-0 h-48 w-48 rounded-full border-2 border-navy/15" />
        </div>
      </section>

      {/* Featured Insights bento */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
                  Featured Insights
                </h2>
                <p className="mt-2 text-navy/60">Our editors&rsquo; top picks.</p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
            {/* Large card */}
            {featured?.slug?.current && (
              <Reveal className="md:col-span-8 md:row-span-2">
                <Link
                  href={`/blog/${featured.slug.current}`}
                  className="group relative block h-full min-h-[320px] overflow-hidden rounded-3xl shadow-md md:min-h-[480px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      featured.coverImage
                        ? urlFor(featured.coverImage).width(1400).height(900).url()
                        : STITCH_IMAGES.resourcesCityscape
                    }
                    alt={featured.title ?? ""}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    {featured.category && (
                      <span className="mb-4 inline-block rounded-full bg-gold px-3 py-1 text-xs font-medium text-navy">
                        {featured.category}
                      </span>
                    )}
                    <h3 className="mb-3 max-w-lg font-heading text-2xl font-semibold text-white">
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="mb-4 line-clamp-2 max-w-md text-white/80">{featured.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold text-white">
                      Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Secondary card 1 — light */}
            {second?.slug?.current && (
              <Reveal delay={90} className="md:col-span-4">
                <Link
                  href={`/blog/${second.slug.current}`}
                  className="flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-light-gray/60 p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    {second.category && (
                      <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold">
                        {second.category}
                      </span>
                    )}
                    <h3 className="mb-3 font-heading text-xl font-semibold text-ink">{second.title}</h3>
                    {second.excerpt && <p className="line-clamp-3 text-sm text-navy/60">{second.excerpt}</p>}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </Link>
              </Reveal>
            )}

            {/* Secondary card 2 — navy */}
            {third?.slug?.current && (
              <Reveal delay={180} className="md:col-span-4">
                <Link
                  href={`/blog/${third.slug.current}`}
                  className="flex h-full flex-col justify-between rounded-3xl bg-navy p-8 text-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    {third.category && (
                      <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold-bright">
                        {third.category}
                      </span>
                    )}
                    <h3 className="mb-3 font-heading text-xl font-semibold">{third.title}</h3>
                    {third.excerpt && <p className="line-clamp-3 text-sm text-white/70">{third.excerpt}</p>}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright">
                    Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Categories + article grid (client) */}
      {posts.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-center text-navy/60">No articles yet. Add some in the Sanity Studio.</p>
        </section>
      ) : (
        <ResourceArticles posts={posts} />
      )}

      {/* CTA */}
      <section className="px-6 pb-20 sm:pb-28">
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-8 py-16 text-center text-white">
            <h2 className="mb-4 font-heading text-3xl font-semibold sm:text-4xl">
              Join the Global Inner Circle
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">
              Get destination guides, scholarship alerts, and admissions insights from our expert
              counsellors — tailored to your goals.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-widest text-navy transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
