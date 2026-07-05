import { client } from "@/sanity/client";
import { TESTIMONIALS_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { SuccessStoryCard } from "@/components/SuccessStoryCard";

export const metadata = { title: "Success Stories — AIMU Global" };

export default async function SuccessStoriesPage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY);

  return (
    <>
      <PageHeader title="Success Stories" subtitle="Real students, real universities, real outcomes." />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {testimonials.length === 0 ? (
          <p className="text-center text-navy/60">No success stories yet. Add some in the Sanity Studio.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {testimonials.map((testimonial) => (
              <SuccessStoryCard key={testimonial._id} story={testimonial} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
