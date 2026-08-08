import { client } from "@/sanity/client";
import { COST_CALCULATOR_QUERY } from "@/sanity/queries";
import { PageHeader } from "@/components/PageHeader";
import { CostCalculator } from "@/components/CostCalculator";
import { AuthWall } from "@/components/AuthWall";

export const metadata = { title: "Study Abroad Cost Calculator — AIMU Global" };

export default async function CostCalculatorPage() {
  const destinations = await client.fetch(COST_CALCULATOR_QUERY);

  return (
    <>
      <PageHeader
        title="Study Abroad Cost Calculator"
        subtitle="Select a country to see your estimated total annual cost of studying abroad."
      />
      <AuthWall
        next="/cost-calculator"
        title="Sign in to use the cost calculator"
        subtitle="Create a free account to estimate tuition and living costs for any destination."
      >
        <section className="mx-auto max-w-4xl px-6 py-16">
          {destinations.length === 0 ? (
            <p className="text-center text-navy/60">
              No cost data yet. Add a cost breakdown to a destination in the Sanity Studio.
            </p>
          ) : (
            <CostCalculator destinations={destinations} />
          )}
        </section>
      </AuthWall>
    </>
  );
}
