import { computeTakeHome, taxBands, type StudentPlan, type TaxRegion } from "../lib/tax/take-home-engine";
import { stampDuty as sdlt, type BuyerType } from "../lib/tax/sdlt-2025";

/**
 * Bridges from the supplied design scripts to the site's tested engines, so
 * the approved pages show the same 2026/27 figures as every other calculator.
 * Each function returns exactly the shape the design script expects.
 */

type SalaryInput = { salary: number; bonus: number; pension: number; plan: StudentPlan; region: TaxRegion };

const BAND_NAMES: Record<string, string> = {
  "Starter rate": "Starter",
  "Basic rate": "Basic",
  "Intermediate rate": "Intermediate",
  "Higher rate": "Higher",
  "Advanced rate": "Advanced",
  "Top rate": "Top",
  "Additional rate": "Additional",
};

/** Take-home pay in the shape of the design's salaryResult(). */
export function salaryResult(s: SalaryInput) {
  const t = computeTakeHome({ gross: s.salary, bonus: s.bonus, pensionPct: s.pension, plan: s.plan, region: s.region });
  const used = taxBands(t.adjustedGross, s.region).slice(1);
  // Every band for the region (with its rate), so empty bands still show at £0.
  const bands = taxBands(1e9, s.region)
    .slice(1)
    .map((b) => {
      const hit = used.find((u) => u.label === b.label);
      return { name: BAND_NAMES[b.label] ?? b.label, rate: b.rate, amount: hit?.income ?? 0, tax: hit?.tax ?? 0 };
    });
  return {
    gross: t.totalGross,
    pension: t.pensionContribution,
    adjusted: t.adjustedGross,
    allowance: t.incomeTax.personalAllowance,
    tax: t.incomeTaxTotal,
    ni: t.ni.total,
    loan: t.studentLoan,
    bands,
    net: t.takeHome,
  };
}

/** Stamp Duty Land Tax (England and NI) for the design's stampDuty(). */
export function stampDuty(price: number, buyer: BuyerType): number {
  return sdlt(price, buyer).total;
}
