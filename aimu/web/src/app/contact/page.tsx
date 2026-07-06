import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY, LEAD_FORM_OPTIONS_QUERY, DESTINATIONS_QUERY } from "@/sanity/queries";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { urlFor } from "@/sanity/image";

export const metadata = { title: "Contact — AIMU Global" };

export default async function ContactPage() {
  const [siteSettings, leadFormOptions, destinations] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(LEAD_FORM_OPTIONS_QUERY),
    client.fetch(DESTINATIONS_QUERY),
  ]);

  const countries = (leadFormOptions.countries ?? []).filter((c): c is string => Boolean(c));
  const courses = (leadFormOptions.courses ?? []).filter((c): c is string => Boolean(c));
  const collageImages = destinations.map((d) => d.heroImage).filter(Boolean).slice(0, 2);
  const whatsappHref = siteSettings?.whatsappNumber
    ? `https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[440px] items-center overflow-hidden py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(13,28,50,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="space-y-6">
            <span
              className="animate-hero inline-block rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest text-navy"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              Get In Touch
            </span>
            <h1
              className="animate-hero font-heading text-4xl font-bold leading-tight text-navy sm:text-6xl"
              style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            >
              Your Global Future
              <br />
              <span className="italic text-gold">Starts With a Conversation.</span>
            </h1>
            <p
              className="animate-hero max-w-lg text-lg text-navy/60"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              Whether you&rsquo;re exploring universities in London or navigating visa processes for
              Sydney, our expert advisors are ready to guide you home.
            </p>
          </div>

          {/* Rotated collage */}
          {collageImages.length > 0 && (
            <div className="relative hidden h-[440px] lg:block">
              <div className="absolute inset-0 translate-x-12 translate-y-6 rotate-3 transform overflow-hidden rounded-xl shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(collageImages[0]!).width(900).height(700).url()}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 -rotate-2 overflow-hidden rounded-xl bg-white p-2 shadow-xl">
                {collageImages[1] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(collageImages[1]).width(900).height(700).url()}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-navy">
                    <span className="material-symbols-outlined text-6xl text-gold-bright">forum</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bento: form + sidebar */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-xl border border-navy/10 bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-semibold text-navy">
                  Book a Virtual Consultation
                </h2>
                <p className="mt-2 text-navy/60">
                  Schedule a 1-on-1 session with a senior admissions expert.
                </p>
              </div>
              <LeadForm countries={countries} courses={courses} source="contact-page" />
            </div>
          </Reveal>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="group relative overflow-hidden rounded-xl bg-navy p-8 text-white shadow-lg">
                <div className="relative z-10 space-y-4">
                  <span className="material-symbols-outlined text-4xl text-gold-bright">support_agent</span>
                  <h3 className="font-heading text-2xl font-semibold">Instant Expert Advice</h3>
                  <p className="text-white/80">
                    Can&rsquo;t wait for a scheduled session? Message our counsellors directly right
                    now.
                  </p>
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold text-navy transition-all hover:brightness-110"
                    >
                      Talk to an Expert
                    </a>
                  ) : (
                    siteSettings?.phone && (
                      <a
                        href={`tel:${siteSettings.phone.replace(/\s/g, "")}`}
                        className="inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold text-navy transition-all hover:brightness-110"
                      >
                        Talk to an Expert
                      </a>
                    )
                  )}
                </div>
                <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-gold opacity-10 blur-3xl transition-opacity group-hover:opacity-20" />
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="space-y-8 rounded-xl border border-gold/20 bg-light-gray/60 p-8">
                {siteSettings?.email && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-gold/20 bg-white p-3 shadow-sm">
                      <span className="material-symbols-outlined text-gold">mail</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">Email Us</h4>
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="mt-1 block break-all text-lg font-semibold text-navy hover:text-gold"
                      >
                        {siteSettings.email}
                      </a>
                      <p className="mt-1 text-xs text-navy/50">Response within 12 business hours</p>
                    </div>
                  </div>
                )}
                {siteSettings?.phone && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-gold/20 bg-white p-3 shadow-sm">
                      <span className="material-symbols-outlined text-gold">call</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Global Hotline
                      </h4>
                      <a
                        href={`tel:${siteSettings.phone.replace(/\s/g, "")}`}
                        className="mt-1 block text-lg font-semibold text-navy hover:text-gold"
                      >
                        {siteSettings.phone}
                      </a>
                      <p className="mt-1 text-xs text-navy/50">Mon–Sat, business hours</p>
                    </div>
                  </div>
                )}
                {siteSettings?.address && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-gold/20 bg-white p-3 shadow-sm">
                      <span className="material-symbols-outlined text-gold">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Visit Us
                      </h4>
                      <p className="mt-1 text-lg font-semibold text-navy">{siteSettings.address}</p>
                    </div>
                  </div>
                )}
                {!siteSettings?.email && !siteSettings?.phone && !siteSettings?.address && (
                  <p className="text-sm text-navy/60">
                    Add contact details in Site Settings within the Sanity Studio.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Global Footprint */}
      {destinations.length > 0 && (
        <section className="bg-light-gray/60 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12">
                <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
                  Our Global Footprint
                </h2>
                <p className="mt-2 text-lg text-navy/60">
                  We guide students into every major study destination worldwide.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {destinations.slice(0, 4).map((destination, index) => (
                <Reveal key={destination._id} delay={index * 90}>
                  <div className="hover-lift group overflow-hidden rounded-xl border border-transparent bg-white shadow-sm hover:border-gold/20">
                    <div className="relative h-48">
                      {destination.heroImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={urlFor(destination.heroImage).width(600).height(400).url()}
                          alt={destination.country ?? ""}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-navy" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-semibold">
                          {destination.flagEmoji} {destination.country}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-2 p-5">
                      {destination.intakeMonths && destination.intakeMonths.length > 0 && (
                        <div className="flex items-center gap-2 text-navy/60">
                          <span className="material-symbols-outlined text-sm">event</span>
                          <p className="text-sm">Intakes: {destination.intakeMonths.join(", ")}</p>
                        </div>
                      )}
                      {destination.slug?.current && (
                        <a
                          href={`/destinations/${destination.slug.current}`}
                          className="flex items-center gap-2 text-sm font-semibold text-gold"
                        >
                          Explore guide
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
