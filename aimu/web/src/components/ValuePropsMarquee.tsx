import { Reveal } from "@/components/Reveal";

type Prop = { icon: string; label: string };

const PROPS: Prop[] = [
  { icon: "school", label: "50+ Partnered Universities" },
  { icon: "public", label: "5+ Countries" },
  { icon: "menu_book", label: "500+ Courses" },
  { icon: "support_agent", label: "24/7 Support" },
  { icon: "person_pin", label: "Personalized Guidance" },
  { icon: "visibility", label: "Transparent Process" },
  { icon: "handshake", label: "End-to-End Support" },
  { icon: "workspace_premium", label: "Expert Visa Assistance" },
  { icon: "savings", label: "Scholarship & Finance Guidance" },
];

function Item({ item }: { item: Prop }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-8">
      <span className="material-symbols-outlined text-2xl text-gold">{item.icon}</span>
      <span className="whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-[0.15em] text-white sm:text-base">
        {item.label}
      </span>
      <span aria-hidden className="ml-8 h-1.5 w-1.5 rounded-full bg-gold/60" />
    </div>
  );
}

export function ValuePropsMarquee() {
  return (
    <Reveal>
      <section
        aria-label="Why students choose AIMU Global"
        className="overflow-hidden border-y border-white/10 bg-ink py-6"
      >
        {/* Track holds two copies of the list so the -50% slide loops seamlessly. */}
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {PROPS.map((item) => (
                <Item key={`${copy}-${item.label}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
