import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FIRECalculator from "./FIRECalculator";

export const metadata: Metadata = {
  title: "FIRE Calculator (4% Rule, UK)",
  description: "When could you retire early? The classic Trinity Study safe-withdrawal-rate calculator.",
};

export default function FIREPage() {
  return (
    <CalculatorShell
      category="Investing"
      updatedLabel="Trinity Study"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/fire-calculator", label: "FIRE" }]}
      title="FIRE Calculator"
      intro="Financial Independence, Retire Early — the FIRE movement targets a pot 25× annual spend, then withdraws 4% per year. This shows when you&rsquo;d get there at your current savings rate."
      calculator={<FIRECalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Target pot = annual spend ÷ SWR. We then solve the future-value equation analytically: how many years until current invested + monthly savings × growth = target. Returns are in real (after-inflation) terms.</p>}
          officialRules={
            <ul>
              <li>Trinity Study (1998, US): 4% withdrawal had a 95%+ 30-year success rate.</li>
              <li>UK studies (Pfau, Cooley) suggest 3.0–3.5% is safer due to lower equity returns.</li>
              <li>SIPP + ISA combo gives the most tax-efficient path in the UK.</li>
            </ul>
          }
          pitfalls={[
            { title: "4% is US-data; UK is lower", body: "UK equity returns have historically been ~1pp lower than US. Use 3.5% for a margin of safety." },
            { title: "Sequence-of-returns risk", body: "A bear market in years 1–5 of retirement is devastating. Hold 2 years of cash as a buffer." },
            { title: "State Pension lifts SWR", body: "Once SP kicks in (age 67/68), your pot only has to cover the gap. Often the harder bridge is age 50–67." },
          ]}
          faqs={[
            { question: "Why 25×?", answer: "1/0.04 = 25. The 25× rule is just the 4% SWR restated as a multiplier." },
            { question: "Is FIRE realistic on UK salaries?", answer: "Aggressive savers (50%+ of income) can hit it in 15–20 years. Standard 15% pensioners get there at the State Pension age." },
          ]}
          disclaimer="Educational. Investment returns aren&rsquo;t guaranteed — speak to a financial planner."
        />
      }
    />
  );
}
