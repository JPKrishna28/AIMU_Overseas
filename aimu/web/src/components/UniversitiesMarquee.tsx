import { countryContent } from "@/lib/countryContent";
import { Reveal } from "@/components/Reveal";

type UniversityEntry = {
  name: string;
  city: string;
  country: string;
  qsRanking: string;
  logo: string;
};

const UNIVERSITY_LOGOS: Record<string, string> = {
  "University of Manchester": "/images/universities/manchester.png",
  "Northeastern University": "/images/universities/northeastern.png",
  "Arizona State University": "/images/universities/asu.png",
  "Trinity College Dublin": "/images/universities/tcd.png",
  "University College Dublin": "/images/universities/ucd.png",
  "Technical University of Munich": "/images/universities/tum.png",
  "RWTH Aachen University": "/images/universities/rwth-aachen.png",
  "Sorbonne University": "/images/universities/sorbonne.png",
  "ESSEC Business School": "/images/universities/essec.png",
};

function collectUniversities(): UniversityEntry[] {
  const entries: UniversityEntry[] = [];
  const seen = new Set<string>();
  for (const content of new Set(Object.values(countryContent))) {
    for (const uni of content.topUniversities) {
      if (seen.has(uni.name) || !UNIVERSITY_LOGOS[uni.name]) continue;
      seen.add(uni.name);
      entries.push({
        name: uni.name,
        city: uni.city,
        country: content.country,
        qsRanking: uni.qsRanking,
        logo: UNIVERSITY_LOGOS[uni.name],
      });
    }
  }
  return entries;
}

function UniversityCard({ university }: { university: UniversityEntry }) {
  return (
    <div className="mx-8 flex h-24 w-32 shrink-0 items-center justify-center sm:mx-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={university.logo}
        alt={university.name}
        title={university.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}

export function UniversitiesMarquee() {
  const universities = collectUniversities();
  if (universities.length === 0) return null;

  return (
    <section className="overflow-hidden bg-white pb-20 sm:pb-28">
      <Reveal>
        <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Top Universities
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">
            Globally Ranked Universities Across Our Destinations
          </h2>
        </div>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
        <div
          className="marquee-track py-1"
          style={{ animationDuration: "50s", animationDirection: "reverse" }}
        >
          {[...universities, ...universities].map((university, i) => (
            <div key={i} aria-hidden={i >= universities.length}>
              <UniversityCard university={university} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
