export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-navy py-16 text-center text-white sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}
