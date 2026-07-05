import { client } from "@/sanity/client";
import { INTAKE_CALENDAR_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Intake Calendar & Application Deadlines — AIMU Global" };

export default async function IntakeCalendarPage() {
  const destinations = await client.fetch(INTAKE_CALENDAR_QUERY);

  return (
    <>
      <PageHeader
        title="Intake Calendar & Application Deadlines"
        subtitle="Application opening and closing windows for major study destinations."
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        {destinations.length === 0 ? (
          <p className="text-center text-navy/60">No intake data yet. Add it to destinations in the Sanity Studio.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {destinations.map((destination) => (
              <div key={destination._id} className="rounded-2xl border border-light-gray p-6">
                <h2 className="font-heading text-xl font-bold text-navy">
                  {destination.flagEmoji} {destination.country}
                </h2>

                {destination.intakeMonths && destination.intakeMonths.length > 0 && (
                  <p className="mt-2 text-sm text-navy/60">
                    <span className="font-semibold text-navy">Intakes: </span>
                    {destination.intakeMonths.join(", ")}
                  </p>
                )}

                {destination.applicationDeadlines && destination.applicationDeadlines.length > 0 && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[400px] text-sm">
                      <thead>
                        <tr className="border-b border-light-gray text-left text-navy/50">
                          <th className="py-2 pr-4 font-medium">Intake</th>
                          <th className="py-2 pr-4 font-medium">Opens</th>
                          <th className="py-2 font-medium">Closes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {destination.applicationDeadlines.map((window) => (
                          <tr key={window._key} className="border-b border-light-gray last:border-0">
                            <td className="py-2 pr-4 font-medium text-navy">{window.intake}</td>
                            <td className="py-2 pr-4 text-navy/70">{window.opens}</td>
                            <td className="py-2 text-navy/70">{window.closes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
