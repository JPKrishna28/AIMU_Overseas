import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  { icon: "explore", label: "Personalised course and country shortlists" },
  { icon: "calculate", label: "Cost calculator and intake calendar" },
  { icon: "approval_delegation", label: "Step-by-step visa guidance" },
  { icon: "support_agent", label: "Direct access to your counsellor" },
];

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: brand-side context */}
        <Reveal className="hidden lg:block">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Student Access
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-navy">
              Your journey,<br />organised in one place
            </h2>
            <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit.label} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-gold">
                    {benefit.icon}
                  </span>
                  <span className="text-sm text-navy/70">{benefit.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Right: the form */}
        <Reveal delay={100}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-navy/60">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
