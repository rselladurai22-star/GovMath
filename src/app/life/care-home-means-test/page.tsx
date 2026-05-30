import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CareHomeMeansTestCalculator from "./CareHomeMeansTestCalculator";

export const metadata: Metadata = {
  title: "Care Home Means Test Calculator (England 2025/26)",
  description: "Estimate your weekly contribution to care home fees under the England means test, plus what the council will pay.",
};

export default function CareHomeMeansTestPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025/26 thresholds"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/care-home-means-test", label: "Care Home Means Test" },
      ]}
      title="Care Home Means Test Calculator"
      intro="If social services arrange your care home placement, they apply a financial means test. Above £23,250 capital you self-fund; below £14,250 only income counts; in between you get partial help with tariff income added."
      calculator={<CareHomeMeansTestCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We apply the England thresholds. If capital is above the upper limit, you self-fund. Otherwise we add tariff income (£1/wk per £250 of capital above £14,250) to your weekly income, subtract the £30.65 Personal Expenses Allowance, and that’s your share — the council pays the rest.
            </p>
          }
          officialRules={
            <ul>
              <li>Upper capital limit £23,250; lower £14,250 (England, 2025/26).</li>
              <li>Personal Expenses Allowance £30.65/wk kept for pocket money.</li>
              <li>Tariff income £1/wk per £250 above the lower limit.</li>
              <li>If you own a home and there’s no spouse remaining, its value usually counts after 12 weeks.</li>
            </ul>
          }
          pitfalls={[
            { title: "Deprivation of assets", body: "Giving money away to fall below the threshold backfires — the council can include ”notional capital” if they think it was deliberate." },
            { title: "Top-up fees", body: "If you pick a more expensive home than the council’s usual rate, a third party (family) must pay the top-up — care recipient can’t use their own savings for this." },
            { title: "12-week disregard", body: "Your home is ignored for the first 12 weeks of a permanent placement, giving time to consider deferred payments." },
          ]}
          faqs={[
            { question: "What about my pension?", answer: "State Pension counts as income (minus £30.65 PEA). Private pension income also counts. Attendance Allowance is disregarded." },
            { question: "What if my spouse still lives at home?", answer: "Your home is fully disregarded as long as a spouse, partner or dependent relative still lives in it." },
            { question: "Can I take out a deferred payment agreement?", answer: "Yes — the council pays your fees against the equity in your home, repaid when the property is sold. Interest at a low statutory rate." },
          ]}
          disclaimer="England rules only. Wales and Scotland have higher thresholds and different rules. Always get a free Age UK assessment before committing."
        />
      }
    />
  );
}
