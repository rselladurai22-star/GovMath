import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ChildBenefitCalculator from "./ChildBenefitCalculator";

export const metadata: Metadata = {
  title: "Child Benefit Calculator UK 2025/26",
  description: "Weekly Child Benefit by number of children — £26.05 first child, £17.25 each additional, paid every 4 weeks.",
};

export default function ChildBenefitPage() {
  return (
    <CalculatorShell
      category="Family & Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Family & Benefits" }, { href: "/benefits/child-benefit", label: "Child Benefit" }]}
      title="Child Benefit Calculator"
      intro="Child Benefit is a weekly payment from HMRC for anyone responsible for a child. £26.05 for the first child, £17.25 for each additional. Worth claiming even if you have to pay it back (it earns you NI credits)."
      calculator={<ChildBenefitCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Weekly × 52 = annual. Actually paid every 4 weeks (13 payments/year). Claim per family, not per child — and only one parent receives it.</p>}
          officialRules={
            <ul>
              <li>£26.05/week for first/only/eldest qualifying child.</li>
              <li>£17.25/week for each additional child.</li>
              <li>Paid every 4 weeks into a bank account.</li>
              <li>Eligible until child is 16 (or 20 if in approved education).</li>
              <li>From £60,000 income, HICBC kicks in — see the High Income Child Benefit Charge calculator.</li>
            </ul>
          }
          pitfalls={[
            { title: "Always claim, even if HICBC will take it all", body: "Claiming earns you NI credits towards State Pension. Tick ‘I don’t want payment’ if you don’t want the cashflow back-and-forth." },
            { title: "Higher earner is the partner liable, not the claimant", body: "Even if your partner claims, if YOU earn over £60k, YOU pay the charge — through Self Assessment." },
            { title: "Lose it when child leaves school", body: "Must update HMRC by 31 August after child turns 16 to keep claim going through sixth form/college." },
          ]}
          faqs={[
            { question: "Does it count for Universal Credit?", answer: "No — Child Benefit is in addition to UC and doesn’t affect the calculation." },
            { question: "Can I claim if my child lives abroad?", answer: "Usually no, unless they’re temporarily abroad (e.g. uni placement) or special EU cases." },
          ]}
          disclaimer="Estimate based on April 2025 rates."
        />
      }
    />
  );
}
