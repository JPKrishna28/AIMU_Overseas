import { Reveal } from "@/components/Reveal";

const RESOURCE_SECTIONS = [
  {
    icon: "edit_document",
    category: "Document Templates",
    items: [
      "Statement of Purpose (SOP) Guide",
      "Letter of Recommendation (LOR) Guide",
      "CV/Resume Template",
      "Personal Statement Guide",
    ],
  },
  {
    icon: "checklist",
    category: "Checklists",
    items: [
      "Admission Checklist",
      "Visa Document Checklist",
      "Pre-Departure Checklist",
      "Packing Checklist",
      "Arrival Checklist",
    ],
  },
  {
    icon: "shield",
    category: "Student Safety",
    items: [
      "How to Avoid Education Scams",
      "Accommodation Safety",
      "Online Safety",
      "Emergency Contacts",
      "Student Rights",
    ],
  },
  {
    icon: "work",
    category: "Career Preparation",
    items: [
      "LinkedIn Profile Guide",
      "CV Writing Tips",
      "Internship Preparation",
      "Interview Preparation",
      "Part-Time Job Guide",
    ],
  },
  {
    icon: "home_pin",
    category: "Living Abroad",
    items: [
      "Opening a Bank Account",
      "Getting a SIM Card",
      "Registering with a Doctor",
      "Public Transport Guide",
      "Budgeting Tips",
      "Cultural Adaptation",
    ],
  },
  {
    icon: "auto_stories",
    category: "Blog & Knowledge Centre",
    items: ["Student Stories", "Latest Immigration Updates", "University News", "Study Tips"],
  },
];

const SURVIVAL_GUIDE = [
  "Mistakes I Wish I Had Avoided Before Studying Abroad",
  "How to Find Genuine Part-Time Jobs",
  "How to Avoid Common Student Scams",
  "What Nobody Tells You Before Moving Abroad",
  "Managing Your First Month Abroad",
  "How to Balance Studies and Part-Time Work",
  "Preparing for Internships from Day One",
  "Building Your Career While Studying",
  "Budgeting Without Sacrificing Your Student Life",
  "Mental Health and Staying Connected with Family",
];

export function ResourceLibrary() {
  return (
    <section className="bg-light-gray/60 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
              Resource Library
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-navy/60">
              Practical guides, templates, and checklists for every stage of your study-abroad
              journey.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_SECTIONS.map((section, index) => (
            <Reveal key={section.category} delay={(index % 3) * 90}>
              <div className="hover-lift h-full rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_10px_30px_-10px_rgba(13,28,50,0.1)]">
                <span className="material-symbols-outlined text-3xl text-gold">{section.icon}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{section.category}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-navy/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Real Student Survival Guide */}
        <Reveal>
          <div className="mt-6 rounded-2xl bg-navy p-8 text-white sm:p-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-gold-bright">tips_and_updates</span>
              <h3 className="font-heading text-xl font-semibold">Real Student Survival Guide</h3>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Honest lessons from students who have already made the journey.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {SURVIVAL_GUIDE.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
