import { Reveal } from "@/components/Reveal";

export function ChairmanMessage() {
  return (
    <section className="bg-light-gray py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Leadership
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">
              Chairman&rsquo;s Message
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-center gap-10 rounded-2xl bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)] sm:p-12 md:flex-row md:items-start">
            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="flex h-36 w-36 items-center justify-center rounded-full bg-navy font-heading text-5xl font-bold text-gold-bright">
                A
              </span>
              <div className="text-center">
                <p className="font-heading text-lg font-bold text-navy">AIMU Global</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Chairman &amp; CEO
                </p>
              </div>
            </div>

            <div className="relative">
              <span
                aria-hidden
                className="material-symbols-outlined absolute -left-2 -top-4 text-5xl text-gold/30"
              >
                format_quote
              </span>
              <blockquote className="space-y-4 pt-6 text-navy/75 leading-[1.7]">
                <p>
                  Every student who walks through our doors carries a dream — and behind that dream,
                  the hopes of an entire family. Our responsibility is to honour both. For over a
                  decade, AIMU Global has guided students to universities across the UK, USA,
                  Ireland, Germany, France, and beyond, with honesty and transparency at every step.
                </p>
                <p>
                  We measure our success not in applications filed, but in visas approved, careers
                  launched, and lives transformed. Wherever in the world your ambition takes you, our
                  team will be behind you — from your first counselling session to the day you land
                  on campus.
                </p>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
