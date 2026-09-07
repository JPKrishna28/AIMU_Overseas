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
              A Message from Our CEO
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-center gap-10 rounded-2xl bg-white p-8 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)] sm:p-12 md:flex-row md:items-start">
            <div className="flex shrink-0 flex-col items-center gap-4">
              <span className="flex h-36 w-36 items-center justify-center rounded-full bg-navy font-heading text-5xl font-bold text-gold-bright">
                M
              </span>
              <div className="text-center">
                <p className="font-heading text-lg font-bold text-navy">Meghana</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Chief Executive Officer
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
                  Every great journey begins with a dream—and every dream deserves the right
                  direction.
                </p>
                <p>
                  At AIMU Global, we believe your background should never limit your future.
                  Studying abroad is more than earning a degree; it is an opportunity to discover
                  your potential, build confidence and create a life you once only imagined.
                </p>
                <p>
                  The journey may feel challenging, but you do not have to face it alone. Our team
                  is here to guide you with honesty, care and personal support—from your first
                  consultation until you confidently begin your new chapter abroad.
                </p>
                <p>
                  Believe in your ambition. Take the first step. Your dream is possible, and AIMU
                  Global is here to help you turn it into reality.
                </p>
                <p>Your journey begins today. Let us shape your future together.</p>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
