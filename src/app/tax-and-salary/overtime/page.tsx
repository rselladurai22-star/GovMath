import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import OvertimeCalculator from "./OvertimeCalculator";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator UK 2025/26",
  description: "Work out time-and-a-half, double-time and weekly gross from your overtime hours.",
};

export default function OvertimePage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Updated 2025"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/overtime", label: "Overtime" }]}
      title="Overtime Calculator"
      intro="Most UK workers don’t have a legal right to enhanced overtime pay — it depends on your contract. But where time-and-a-half or double-time applies, the maths is straightforward."
      calculator={<OvertimeCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Regular pay = base hourly × regular hours. OT pay = base hourly × multiplier × OT hours. We sum to a weekly gross and annualise by 52.</p>}
          officialRules={
            <ul>
              <li>No statutory premium for overtime in UK law — contractual only.</li>
              <li>Average pay over a 48-hour week (Working Time Regs) unless opted out.</li>
              <li>Overtime counts towards holiday pay (52-week reference period).</li>
              <li>Overtime is subject to PAYE income tax and NI like normal pay.</li>
            </ul>
          }
          pitfalls={[
            { title: "Regular overtime affects holiday pay", body: "If you regularly do paid OT, your statutory 4 weeks of holiday must be paid at a 52-week average — not just basic rate." },
            { title: "Tax bracket creep on big OT months", body: "A heavy OT month can push you into the 40% band — temporary, but feels painful. Sort out at tax-year-end via SA if owed." },
            { title: "Salaried staff often have no claim to OT", body: "Salary means salary — if your contract says ‘such hours as required to do the job’, you may have no entitlement to extra pay." },
          ]}
          faqs={[
            { question: "What's standard overtime in the UK?", answer: "There’s no standard — common arrangements are time-and-a-half (×1.5) on weekdays and double time (×2) on Sundays/bank holidays." },
            { question: "Do agencies pay overtime?", answer: "Often only at single rate after 8 hours. Check the Agency Worker Regulations once you’ve been on placement 12+ weeks." },
          ]}
          disclaimer="Calculator estimates gross pay only. Net depends on tax code and NI category."
        />
      }
    />
  );
}
