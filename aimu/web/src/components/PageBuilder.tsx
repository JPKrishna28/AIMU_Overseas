import Link from "next/link";
import type { PAGE_QUERY_RESULT } from "../../sanity.types";
import { urlFor } from "@/sanity/image";
import { DestinationsCarousel } from "@/components/DestinationsCarousel";
import { SuccessStoryCard } from "@/components/SuccessStoryCard";
import { CourseCard } from "@/components/CourseCard";
import { RotatingQuote } from "@/components/RotatingQuote";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { GatedSection } from "@/components/GatedSection";

type Blocks = NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>;
type Block = Blocks[number];
type FeatureItem = NonNullable<Extract<Block, { _type: "features" }>["items"]>[number];
type TrustItem = NonNullable<Extract<Block, { _type: "trustBlock" }>["items"]>[number];
type CoreValue = NonNullable<Extract<Block, { _type: "aboutBlock" }>["coreValues"]>[number];
type Milestone = NonNullable<Extract<Block, { _type: "timelineBlock" }>["milestones"]>[number];
type LeaderMessage = NonNullable<Extract<Block, { _type: "leadershipBlock" }>["messages"]>[number];
type CampusTour = NonNullable<Extract<Block, { _type: "campusToursBlock" }>["tours"]>[number];

function Hero(block: Extract<Block, { _type: "hero" }>) {
  const quotes = (block.rotatingQuotes ?? []).filter((q): q is string => Boolean(q));
  const ctas = [
    { label: block.ctaLabel, url: block.ctaUrl, primary: true },
    { label: block.secondaryCtaLabel, url: block.secondaryCtaUrl, primary: false },
    { label: block.tertiaryCtaLabel, url: block.tertiaryCtaUrl, primary: false },
  ].filter((cta): cta is { label: string; url: string; primary: boolean } => Boolean(cta.label && cta.url));

  return (
    <section className="relative overflow-hidden bg-navy py-20 text-center text-white sm:py-32">
      {block.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(block.image).width(1600).url()}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6">
        {quotes.length > 0 && (
          <div className="animate-hero" style={{ "--hero-delay": "0ms" } as React.CSSProperties}>
            <RotatingQuote quotes={quotes} />
          </div>
        )}
        <h1
          className="animate-hero text-3xl font-bold tracking-tight sm:text-6xl"
          style={{ "--hero-delay": "120ms" } as React.CSSProperties}
        >
          {block.heading}
        </h1>
        {block.subheading && (
          <p
            className="animate-hero max-w-xl text-base text-white/80 sm:text-lg"
            style={{ "--hero-delay": "240ms" } as React.CSSProperties}
          >
            {block.subheading}
          </p>
        )}
        {ctas.length > 0 && (
          <div
            className="animate-hero mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            style={{ "--hero-delay": "360ms" } as React.CSSProperties}
          >
            {ctas.map((cta) => (
              <Link
                key={cta.url}
                href={cta.url}
                className={
                  cta.primary
                    ? "rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/25 sm:px-7 sm:py-3.5"
                    : "rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 sm:px-7 sm:py-3.5"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Features(block: Extract<Block, { _type: "features" }>) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      {block.heading && (
        <Reveal>
          <h2 className="mb-10 text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        </Reveal>
      )}
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {block.items?.map((item: FeatureItem, index) => (
          <Reveal key={item._key} delay={index * 90}>
            <div className="hover-lift h-full rounded-2xl bg-light-gray p-8">
              <h3 className="font-heading font-semibold text-navy">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm text-navy/70">{item.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TrustBlock(block: Extract<Block, { _type: "trustBlock" }>) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      {block.heading && (
        <Reveal>
          <h2 className="mb-10 text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        </Reveal>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {block.items?.map((item: TrustItem, index) => (
          <Reveal key={item._key} delay={index * 90}>
            <div className="flex flex-col gap-2">
              <div className="h-1 w-10 rounded bg-gold" />
              <h3 className="font-heading font-semibold text-navy">{item.title}</h3>
              {item.description && <p className="text-sm text-navy/70">{item.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TrustIndicatorsBlock(block: Extract<Block, { _type: "trustIndicatorsBlock" }>) {
  const stats = (block.stats ?? []).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const logos = (block.partnerLogos ?? []).filter((l): l is NonNullable<typeof l> => Boolean(l));
  const awards = (block.awards ?? []).filter((a): a is string => Boolean(a));

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          {block.heading && <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>}
          {block.trustLine && <p className="mx-auto mt-3 max-w-2xl text-center text-navy/70">{block.trustLine}</p>}
        </Reveal>

        {stats.length > 0 && (
          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-x-6 gap-y-10 text-center">
            {stats.map((stat, index) => {
              const isLongValue = (stat.value ?? "").length > 12;
              return (
                <Reveal key={stat._key} delay={index * 110}>
                  <div className="flex w-40 flex-col items-center gap-1 sm:w-52">
                    <p
                      className={`flex min-h-[2.5rem] items-center justify-center font-heading font-bold text-navy ${
                        isLongValue ? "text-base leading-snug" : "text-3xl"
                      }`}
                    >
                      <CountUp value={stat.value ?? ""} />
                    </p>
                    <p className="text-sm text-navy/60">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {logos.length > 0 && (
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {logos.map((partner, index) =>
                partner.logo ? (
                  <img
                    key={index}
                    src={urlFor(partner.logo).width(140).height(70).fit("max").url()}
                    alt={partner.name ?? ""}
                    className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                ) : null
              )}
            </div>
          </Reveal>
        )}

        {awards.length > 0 && (
          <Reveal delay={250}>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {awards.map((award) => (
                <li key={award} className="hover-lift rounded-full bg-white px-4 py-1.5 text-sm text-navy shadow-sm">
                  🏆 {award}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function AboutBlock(block: Extract<Block, { _type: "aboutBlock" }>) {
  const coreValues = (block.coreValues ?? []).filter((v): v is CoreValue => Boolean(v));

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      {block.heading && (
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        </Reveal>
      )}

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {block.mission && (
          <Reveal>
            <div>
              <h3 className="font-heading text-lg font-semibold text-gold">Mission</h3>
              <p className="mt-2 text-navy/70">{block.mission}</p>
            </div>
          </Reveal>
        )}
        {block.vision && (
          <Reveal delay={120}>
            <div>
              <h3 className="font-heading text-lg font-semibold text-gold">Vision</h3>
              <p className="mt-2 text-navy/70">{block.vision}</p>
            </div>
          </Reveal>
        )}
      </div>

      {block.whyFounded && (
        <Reveal>
          <div className="mt-12">
            <h3 className="font-heading text-xl font-semibold text-navy">
              {block.whyFoundedHeading || "Why AIMU Global Was Founded"}
            </h3>
            <p className="mt-3 text-navy/70">{block.whyFounded}</p>
          </div>
        </Reveal>
      )}

      {coreValues.length > 0 && (
        <div className="mt-12">
          <Reveal>
            <h3 className="font-heading text-xl font-semibold text-navy">Core Values</h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {coreValues.map((value, index) => (
              <Reveal key={value._key} delay={index * 90}>
                <div className="hover-lift h-full rounded-2xl bg-light-gray p-6">
                  <p className="font-heading font-semibold text-navy">{value.title}</p>
                  {value.description && <p className="mt-2 text-sm text-navy/70">{value.description}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TimelineBlock(block: Extract<Block, { _type: "timelineBlock" }>) {
  const milestones = (block.milestones ?? []).filter((m): m is Milestone => Boolean(m));

  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {block.heading && (
          <Reveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">{block.heading}</h2>
          </Reveal>
        )}

        <div className="mt-12 flex flex-col gap-8 border-l-2 border-gold/40 pl-8">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone._key} delay={index * 130}>
              <div className="relative">
                <span className="absolute -left-[2.6rem] top-1 h-3 w-3 rounded-full bg-gold" />
                <p className="font-heading text-lg font-bold text-gold">{milestone.year}</p>
                <p className="mt-1 text-white/80">{milestone.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {block.futureVision && (
          <Reveal delay={150}>
            <div className="mt-14 rounded-2xl bg-white/5 p-8 text-center">
              <h3 className="font-heading text-xl font-semibold text-gold">
                {block.futureVisionHeading || "Future Vision"}
              </h3>
              <p className="mt-3 text-white/80">{block.futureVision}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function DestinationsBlock(block: Extract<Block, { _type: "destinationsBlock" }>) {
  const destinations = (block.destinations ?? []).filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          {block.heading && (
            <h2 className="mb-2 text-center text-2xl font-bold text-navy sm:text-3xl">🎓 {block.heading}</h2>
          )}
          <p className="mb-10 text-center text-navy/60">
            Discover globally ranked universities and career-ready opportunities across the world.
          </p>
        </Reveal>
        {destinations.length > 0 && (
          <Reveal delay={120}>
            <DestinationsCarousel destinations={destinations} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function CoursesBlock(block: Extract<Block, { _type: "coursesBlock" }>) {
  const courses = (block.courses ?? []).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        {block.heading && (
          <h2 className="mb-2 text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        )}
        <p className="mb-10 text-center text-navy/60">
          List out the primary or important courses that students look for.
        </p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course, index) => (
          <Reveal key={course._id} delay={index * 90} className="h-full">
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TestimonialsBlock(block: Extract<Block, { _type: "testimonialsBlock" }>) {
  const stories = (block.testimonials ?? []).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {block.heading && (
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
          </Reveal>
        )}
        <div className="flex flex-col gap-10">
          {stories.map((story) => (
            <Reveal key={story._id}>
              <SuccessStoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock(block: Extract<Block, { _type: "ctaBlock" }>) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-24">
      <Reveal>
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        {block.subheading && <p className="mt-4 text-navy/70">{block.subheading}</p>}
        {block.ctaUrl && block.ctaLabel && (
          <Link
            href={block.ctaUrl}
            className="mt-8 inline-block rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-navy/90 hover:shadow-xl hover:shadow-navy/20"
          >
            {block.ctaLabel}
          </Link>
        )}
      </Reveal>
    </section>
  );
}

function JourneyBlock(block: Extract<Block, { _type: "journeyBlock" }>) {
  const steps = (block.steps ?? []).filter((s): s is string => Boolean(s));

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      {block.heading && (
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        </Reveal>
      )}
      {block.subheading && (
        <Reveal delay={80}>
          <p className="mx-auto mt-3 max-w-2xl text-center text-navy/70">{block.subheading}</p>
        </Reveal>
      )}
      {steps.length > 0 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-y-6">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 70} className="flex items-center">
              <div className="flex items-center gap-3 rounded-full bg-light-gray px-5 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-navy">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="mx-2 text-gold">→</span>}
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function LeadershipBlock(block: Extract<Block, { _type: "leadershipBlock" }>) {
  const messages = (block.messages ?? []).filter((m): m is LeaderMessage => Boolean(m));

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {block.heading && (
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
          </Reveal>
        )}
        {block.subheading && (
          <Reveal delay={80}>
            <p className="mx-auto mt-3 max-w-2xl text-center text-navy/70">{block.subheading}</p>
          </Reveal>
        )}
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {messages.map((message, index) => (
            <Reveal key={message._key} delay={index * 120}>
              <div className="flex flex-col gap-4">
                <VideoThumbnail
                  photo={message.photo}
                  videoUrl={message.videoUrl}
                  alt={message.name ?? message.role ?? "Leadership message"}
                  aspectClass="aspect-video"
                />
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold">{message.role}</p>
                  {message.name && <p className="mt-1 font-heading text-lg font-bold text-navy">{message.name}</p>}
                  {message.messageTitle && <p className="mt-1 text-navy/70">&ldquo;{message.messageTitle}&rdquo;</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampusToursBlock(block: Extract<Block, { _type: "campusToursBlock" }>) {
  const tours = (block.tours ?? []).filter((t): t is CampusTour => Boolean(t));

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      {block.heading && (
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">{block.heading}</h2>
        </Reveal>
      )}
      {block.subheading && (
        <Reveal delay={80}>
          <p className="mx-auto mt-3 max-w-2xl text-center text-navy/70">{block.subheading}</p>
        </Reveal>
      )}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {tours.map((tour, index) => (
          <Reveal key={tour._key} delay={index * 100}>
            <div className="flex flex-col gap-3">
              <VideoThumbnail
                photo={tour.thumbnail}
                videoUrl={tour.videoUrl}
                alt={tour.title ?? "Campus tour"}
                aspectClass="aspect-video"
              />
              <h3 className="font-heading font-semibold text-navy">{tour.title}</h3>
              {tour.description && <p className="text-sm text-navy/70">{tour.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GatedFeaturesBlock(block: Extract<Block, { _type: "gatedFeaturesBlock" }>) {
  return <GatedSection heading={block.heading} teaser={block.teaser} unlockCtaLabel={block.unlockCtaLabel} />;
}

export function PageBuilder({ blocks }: { blocks: Blocks | null | undefined }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} {...block} />;
          case "features":
            return <Features key={block._key} {...block} />;
          case "trustBlock":
            return <TrustBlock key={block._key} {...block} />;
          case "trustIndicatorsBlock":
            return <TrustIndicatorsBlock key={block._key} {...block} />;
          case "aboutBlock":
            return <AboutBlock key={block._key} {...block} />;
          case "timelineBlock":
            return <TimelineBlock key={block._key} {...block} />;
          case "destinationsBlock":
            return <DestinationsBlock key={block._key} {...block} />;
          case "coursesBlock":
            return <CoursesBlock key={block._key} {...block} />;
          case "testimonialsBlock":
            return <TestimonialsBlock key={block._key} {...block} />;
          case "ctaBlock":
            return <CtaBlock key={block._key} {...block} />;
          case "journeyBlock":
            return <JourneyBlock key={block._key} {...block} />;
          case "leadershipBlock":
            return <LeadershipBlock key={block._key} {...block} />;
          case "campusToursBlock":
            return <CampusToursBlock key={block._key} {...block} />;
          case "gatedFeaturesBlock":
            return <GatedFeaturesBlock key={block._key} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
