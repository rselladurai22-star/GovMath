import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PensionReliefCalculator from "./PensionReliefCalculator";

export const metadata: Metadata = {
  title: "Pension Tax Relief Calculator (UK)",
  description: "How much tax relief HMRC actually adds to your personal pension contributions.",
};

export default function PensionReliefPage() {
  return (
    <CalculatorShell
      category="Investing"
      updatedLabel="Marginal-rate relief"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/pension-tax-relief", label: "Pension Relief" }]}
      title="Pension Tax Relief Calculator"
      intro="UK pension contributions get tax relief at your marginal rate. Basic-rate relief lands automatically. Higher and additional-rate taxpayers have to claim the extra via Self Assessment — and many forget."
      calculator={<PensionReliefCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>For a gross contribution of £X, you actually pay £X × 80% (relief at source). HMRC tops up the other 20% into the pot. If you’re a 40% taxpayer, you claim a further 20% refund through Self Assessment — making a £100 pension contribution cost you only £60.</p>}
          officialRules={
            <ul>
              <li>Basic-rate relief (20%) added automatically by provider.</li>
              <li>40% / 45% taxpayers claim the extra 20% / 25% via Self Assessment.</li>
              <li>Annual Allowance: £60,000 (2025/26).</li>
              <li>Tapered allowance kicks in over £260k adjusted income.</li>
            </ul>
          }
          pitfalls={[
            { title: "Higher-rate relief is opt-in", body: "Around £1bn/year is unclaimed by higher-rate taxpayers who don’t complete Self Assessment." },
            { title: "Net pay scheme = no extra claim", body: "Some workplace schemes (net pay) deduct gross from salary — your relief is automatic at marginal rate, nothing to claim." },
            { title: "Carry forward 3 years", body: "Unused allowance from the previous 3 tax years can be used if you have the earnings to support it." },
          ]}
          faqs={[
            { question: "Salary sacrifice or personal?", answer: "Salary sacrifice saves you 8% NI on top of the income tax relief — better deal for most." },
            { question: "Can a non-taxpayer contribute?", answer: "Yes — up to £3,600 gross/year with 20% relief still added (£2,880 net)." },
          ]}
          disclaimer="Educational. Consider regulated advice before making large pension contributions."
        />
      }
    />
  );
}
