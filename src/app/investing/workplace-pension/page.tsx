import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import WorkplacePensionCalculator from "./WorkplacePensionCalculator";

export const metadata: Metadata = {
  title: "Workplace Pension Calculator (Auto-Enrolment, UK)",
  description: "Annual workplace pension contributions split between you and your employer.",
};

export default function WorkplacePensionPage() {
  return (
    <CalculatorShell
      category="Investing"
      updatedLabel="Auto-enrolment"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/workplace-pension", label: "Workplace Pension" }]}
      title="Workplace Pension Calculator"
      intro="Auto-enrolment means most UK employees have a workplace pension. The 8% minimum (3% employer + 5% employee, including tax relief) is the floor — many employers match higher."
      calculator={<WorkplacePensionCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Qualifying-earnings basis takes pay between £6,240 and £50,270. Total-salary basis applies to all earnings. Your % comes from gross pay (before tax) under most schemes — tax relief is added by HMRC or via salary sacrifice.</p>}
          officialRules={
            <ul>
              <li>Auto-enrolled at age 22+ earning £10,000+.</li>
              <li>Min total contribution 8% on qualifying earnings.</li>
              <li>Employer min 3%, employee min 5%.</li>
              <li>You can opt out — but you lose free employer money.</li>
            </ul>
          }
          pitfalls={[
            { title: "Opt-out costs you tens of thousands", body: "On a £35k salary, the employer 3% alone is ~£860/year. Compound over 40 years = a six-figure shortfall." },
            { title: "Net pay vs relief at source", body: "Net pay schemes deduct before tax (effective tax relief upfront). Relief at source claims 20% back into the pot — higher-rate taxpayers must claim the extra 20–25% via Self Assessment." },
            { title: "Salary sacrifice is gold", body: "Sacrifice saves you 8% employee NI and your employer 15% — often shared back as extra contribution." },
          ]}
          faqs={[
            { question: "Should I contribute more than 5%?", answer: "Almost always yes — especially if your employer matches. Match-up to the max first." },
            { question: "Where is it invested?", answer: "Default fund unless you choose. Check the costs — anything over 0.75% AMC is expensive." },
          ]}
          disclaimer="Educational. Pensions are long-term and complex — consider regulated advice for big decisions."
        />
      }
    />
  );
}
