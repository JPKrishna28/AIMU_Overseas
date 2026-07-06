export function HomeFinder({ countries = [], courses = [] }: { countries?: string[]; courses?: string[] }) {
  const selectClass =
    "w-full rounded-xl border border-navy/15 bg-light-gray/60 p-4 text-sm text-navy focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold";

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <form
        action="/universities"
        className="flex flex-col items-end gap-8 rounded-3xl border border-navy/10 bg-white p-10 shadow-xl shadow-navy/5 md:flex-row"
      >
        <div className="w-full flex-1 space-y-3">
          <label className="ml-1 text-sm font-semibold uppercase tracking-wider text-navy/60">Destination</label>
          <select name="country" className={selectClass} defaultValue="">
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex-1 space-y-3">
          <label className="ml-1 text-sm font-semibold uppercase tracking-wider text-navy/60">Degree Level</label>
          <select name="degree" className={selectClass} defaultValue="">
            <option value="">Select Degree</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>PhD</option>
          </select>
        </div>
        <div className="w-full flex-1 space-y-3">
          <label className="ml-1 text-sm font-semibold uppercase tracking-wider text-navy/60">Subject Area</label>
          <select name="course" className={selectClass} defaultValue="">
            <option value="">Select Subject</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-navy px-10 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy/90 md:w-auto"
        >
          Search Universities <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </section>
  );
}
