import Link from "next/link";
import type { PAGE_QUERY_RESULT } from "../../sanity.types";
import { urlFor } from "@/sanity/image";
import { DestinationsCarousel, type MarqueeDestination } from "@/components/DestinationsCarousel";
import { countryContent } from "@/lib/countryContent";
import { countryImage } from "@/lib/stitchImages";
import { SuccessStoryCard } from "@/components/SuccessStoryCard";
import { CourseCard } from "@/components/CourseCard";
import { RotatingQuote } from "@/components/RotatingQuote";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { GatedSection } from "@/components/GatedSection";
import { STITCH_IMAGES } from "@/lib/stitchImages";

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
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-navy py-24 text-white sm:min-h-[85vh] sm:py-32">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.image ? urlFor(block.image).width(1920).url() : STITCH_IMAGES.homeHero}
          alt=""
          className="h-full w-full scale-105 object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12">
        <div className="max-w-2xl">
          {quotes.length > 0 && (
            <div className="animate-hero mb-6" style={{ "--hero-delay": "0ms" } as React.CSSProperties}>
              <RotatingQuote quotes={quotes} />
            </div>
          )}
          <h1
            className="animate-hero font-heading text-4xl font-bold leading-tight tracking-tight sm:text-6xl sm:leading-[1.15]"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
          >
            {block.heading}
          </h1>
          {block.subheading && (
            <p
              className="animate-hero mt-6 max-w-xl text-base text-white/80 sm:text-lg sm:leading-8"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              {block.subheading}
            </p>
          )}
          {ctas.length > 0 && (
            <div
              className="animate-hero mt-8 flex flex-col gap-4 sm:flex-row"
              style={{ "--hero-delay": "360ms" } as React.CSSProperties}
            >
              {ctas.map((cta) => (
                <Link
                  key={cta.url}
                  href={cta.url}
                  className={
                    cta.primary
                      ? "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-all duration-300 hover:brightness-110"
                      : "inline-flex items-center justify-center gap-2 rounded-full border border-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const FEATURE_ICONS = ["school", "visibility", "person_pin", "public", "workspace_premium", "support_agent"];

function Features(block: Extract<Block, { _type: "features" }>) {
  return (
    <section className="bg-light-gray/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {block.heading && (
          <Reveal>
            <div className="mb-16 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Our Advantage</span>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">{block.heading}</h2>
            </div>
          </Reveal>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.items?.map((item: FeatureItem, index) => (
            <Reveal key={item._key} delay={index * 90}>
              <div className="hover-lift group h-full rounded-2xl border border-navy/10 bg-white p-10">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  <span className="material-symbols-outlined text-4xl">
                    {FEATURE_ICONS[index % FEATURE_ICONS.length]}
                  </span>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-navy">{item.title}</h3>
                {item.description && <p className="text-navy/60">{item.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
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
  const sanityDestinations = (block.destinations ?? []).filter((d): d is NonNullable<typeof d> => Boolean(d));

  const cards: MarqueeDestination[] = sanityDestinations.map((d) => ({
    key: d._id,
    country: d.country ?? "",
    slug: d.slug?.current ?? undefined,
    imageUrl: d.galleryImages?.[0]
      ? urlFor(d.galleryImages[0]).width(800).height(1000).url()
      : countryImage(d.country),
    headline: d.whyStudyPoints?.[0] ?? undefined,
    description: d.whyStudyPoints?.[1] ?? undefined,
  }));

  // Fill the marquee with the remaining static countries not already in the block
  for (const content of new Set(Object.values(countryContent))) {
    const alreadyShown = cards.some(
      (c) =>
        (c.slug && countryContent[c.slug] === content) ||
        c.country.toLowerCase() === content.country.toLowerCase(),
    );
    if (alreadyShown) continue;
    cards.push({
      key: content.slug,
      country: content.country,
      slug: content.slug,
      imageUrl: countryImage(content.country),
      headline: content.whyStudyPoints[0],
      description: content.whyStudyPoints[1],
    });
  }

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Explore the World</span>
            {block.heading && (
              <h2 className="mt-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">{block.heading}</h2>
            )}
          </div>
        </Reveal>
      </div>
      {cards.length > 0 && (
        <Reveal delay={120}>
          <DestinationsCarousel destinations={cards} />
        </Reveal>
      )}
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
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.15),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {block.heading && (
          <Reveal>
            <div className="mb-16">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Student Journeys</span>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">{block.heading}</h2>
            </div>
          </Reveal>
        )}
        <div className="flex flex-col gap-6">
          {stories.map((story, index) => (
            <Reveal key={story._id}>
              <SuccessStoryCard story={story} variant="dark" reversed={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock(block: Extract<Block, { _type: "ctaBlock" }>) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-center text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">{block.heading}</h2>
          {block.subheading && <p className="mt-6 text-lg text-white/70">{block.subheading}</p>}
          {block.ctaUrl && block.ctaLabel && (
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={block.ctaUrl}
                className="rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-wider text-navy shadow-xl shadow-gold/20 transition-all duration-300 hover:scale-105"
              >
                {block.ctaLabel}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-10 py-5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
          )}
          <div className="mt-12 flex items-center justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gold">verified</span>
              <span className="text-xs font-medium">Certified Counselors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gold">handshake</span>
              <span className="text-xs font-medium">University Partners</span>
            </div>
          </div>
        </Reveal>
      </div>
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
