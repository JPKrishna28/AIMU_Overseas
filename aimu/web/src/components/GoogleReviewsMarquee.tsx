import { Reveal } from "@/components/Reveal";

type Review = {
  name: string;
  initial: string;
  avatarBg: string;
  timeAgo: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Priya Sharma",
    initial: "P",
    avatarBg: "bg-emerald",
    timeAgo: "2 weeks ago",
    text: "AIMU made my UK application effortless. From shortlisting universities to visa approval, the team guided me at every step. Got into my dream university with a scholarship!",
  },
  {
    name: "Rahul Verma",
    initial: "R",
    avatarBg: "bg-gold",
    timeAgo: "1 month ago",
    text: "Best consultancy in town. My German student visa was approved on the first attempt thanks to their mock interviews and document checklist.",
  },
  {
    name: "Ananya Reddy",
    initial: "A",
    avatarBg: "bg-navy",
    timeAgo: "3 weeks ago",
    text: "The cost calculator and scholarship finder saved me so much time. Honest advice, no hidden fees, and constant follow-ups. Highly recommend!",
  },
  {
    name: "Mohammed Irfan",
    initial: "M",
    avatarBg: "bg-emerald",
    timeAgo: "2 months ago",
    text: "I was confused between Canada and Ireland. Their counsellors compared costs, work rights, and PR routes for me. Now studying in Dublin and loving it.",
  },
  {
    name: "Sneha Patel",
    initial: "S",
    avatarBg: "bg-gold",
    timeAgo: "1 week ago",
    text: "Super responsive team. They helped me meet a tight intake deadline and even negotiated my tuition deposit extension. True professionals.",
  },
  {
    name: "Karthik Nair",
    initial: "K",
    avatarBg: "bg-navy",
    timeAgo: "1 month ago",
    text: "From IELTS prep to landing in Australia, AIMU handled everything. The pre-departure briefing was a lifesaver for a first-time flyer like me.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#fbbc04]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="mx-3 flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.1)] sm:w-[380px]">
      <div>
        <div className="flex items-center justify-between">
          <Stars />
          <GoogleLogo />
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-navy/70">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full ${review.avatarBg} font-heading text-sm font-semibold text-white`}
        >
          {review.initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-navy">{review.name}</p>
          <p className="text-xs text-navy/50">{review.timeAgo} · Google Review</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function GoogleReviewsMarquee() {
  return (
    <section className="overflow-hidden bg-light-gray py-20 sm:py-24">
      <Reveal>
        <div className="mx-auto mb-12 max-w-7xl space-y-2 px-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <GoogleLogo />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Google Reviews
            </span>
          </div>
          <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
            Loved by Students &amp; Parents
          </h2>
          <p className="mx-auto max-w-lg text-navy/60">
            Rated 4.9/5 by hundreds of students who trusted us with their study-abroad journey.
          </p>
        </div>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-light-gray to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-light-gray to-transparent sm:w-32" />
        <div className="marquee-track" style={{ animationDirection: "reverse" }}>
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} aria-hidden={i >= REVIEWS.length}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
