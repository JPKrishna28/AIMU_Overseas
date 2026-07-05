"use client";

import { useMemo, useState } from "react";
import type { COST_CALCULATOR_QUERY_RESULT } from "../../sanity.types";

type Destination = COST_CALCULATOR_QUERY_RESULT[number];

const ROWS: { key: keyof NonNullable<Destination["costBreakdownUSD"]>; label: string }[] = [
  { key: "accommodationOnCampus", label: "Accommodation (On-Campus)" },
  { key: "foodAndLiving", label: "Food & Living Expenses" },
  { key: "travel", label: "Travel Costs" },
  { key: "healthInsurance", label: "Health Insurance" },
  { key: "visaFees", label: "Visa Fees" },
  { key: "miscellaneous", label: "Miscellaneous Expenses" },
];

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function CostCalculator({ destinations }: { destinations: COST_CALCULATOR_QUERY_RESULT }) {
  const [destinationId, setDestinationId] = useState(destinations[0]?._id ?? "");
  const [accommodationType, setAccommodationType] = useState<"onCampus" | "offCampus">("onCampus");

  const destination = useMemo(
    () => destinations.find((d) => d._id === destinationId) ?? null,
    [destinations, destinationId]
  );

  const breakdown = destination?.costBreakdownUSD;

  const accommodationCost =
    accommodationType === "onCampus" ? breakdown?.accommodationOnCampus : breakdown?.accommodationOffCampus;

  const tuition =
    breakdown?.tuitionMin && breakdown?.tuitionMax
      ? (breakdown.tuitionMin + breakdown.tuitionMax) / 2
      : breakdown?.tuitionMin ?? breakdown?.tuitionMax ?? 0;

  const total =
    tuition +
    (accommodationCost ?? 0) +
    (breakdown?.foodAndLiving ?? 0) +
    (breakdown?.travel ?? 0) +
    (breakdown?.healthInsurance ?? 0) +
    (breakdown?.visaFees ?? 0) +
    (breakdown?.miscellaneous ?? 0);

  const selectClass = "rounded-lg border border-light-gray px-3 py-2 text-sm text-navy focus:border-gold focus:outline-none";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-navy">Country</span>
          <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)} className={selectClass}>
            {destinations.map((d) => (
              <option key={d._id} value={d._id}>
                {d.flagEmoji} {d.country}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-navy">Accommodation Type</span>
          <select
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value as "onCampus" | "offCampus")}
            className={selectClass}
          >
            <option value="onCampus">On-Campus</option>
            <option value="offCampus">Off-Campus</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-2 self-start rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-light-gray"
        >
          Print Report
        </button>
      </div>

      <div className="rounded-2xl bg-light-gray p-6">
        {!breakdown ? (
          <p className="text-navy/60">No cost data available for this destination yet.</p>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-navy/10 pb-3">
              <span className="text-sm font-semibold text-navy">Tuition Fees</span>
              <span className="font-medium text-navy">{formatUSD(tuition)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-navy/10 py-3">
              <span className="text-sm font-semibold text-navy">
                Accommodation ({accommodationType === "onCampus" ? "On-Campus" : "Off-Campus"})
              </span>
              <span className="font-medium text-navy">{formatUSD(accommodationCost ?? 0)}</span>
            </div>
            {ROWS.slice(1).map((row) => (
              <div key={row.key} className="flex items-center justify-between border-b border-navy/10 py-3">
                <span className="text-sm font-semibold text-navy">{row.label}</span>
                <span className="font-medium text-navy">{formatUSD((breakdown[row.key] as number) ?? 0)}</span>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-navy">Total Estimated Annual Cost</span>
              <span className="font-heading text-lg font-bold text-gold">{formatUSD(total)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
