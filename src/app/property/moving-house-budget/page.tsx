import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MovingBudgetCalculator from "./MovingBudgetCalculator";

export const metadata: Metadata = {
  title: "Moving House Budget Calculator (UK 2025/26)",
  description: "Add up the true cost of moving: stamp duty, legal fees, survey, removals, mortgage costs and contingency.",
};

export default function MovingHouseBudgetPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Property" },
        { href: "/property/moving-house-budget", label: "Moving House Budget" },
      ]}
      title="Moving House Budget Calculator"
      intro="Most buyers under-budget by £3,000–£5,000. Stack every cost in one place — stamp duty, legal fees, survey, removals — and add a sensible contingency before you commit."
      calculator={<MovingBudgetCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We add the figures you enter for stamp duty (use our SDLT calculator first), legal fees, survey level, mortgage arrangement fee, removals, EPC and agent fees — then apply your chosen contingency percentage.
            </p>
          }
          officialRules={
            <ul>
              <li>RICS surveys: Level 1 (basic, £400) for new builds, Level 2 (£600) for most homes, Level 3 (£1,000+) for older or non-standard property.</li>
              <li>Conveyancing fees: £800–£1,500 + disbursements (~£300 of Land Registry/searches).</li>
              <li>Mortgage product fees: typically £999 — can be added to the loan but interest accrues for 25 years.</li>
              <li>Estate agent fees (selling): 1.0–1.8% + VAT for high-street; £600–£1,500 flat for online.</li>
            </ul>
          }
          pitfalls={[
            { title: "Forgetting disbursements", body: "Conveyancers quote ‘our fee’ — searches, Land Registry, ID checks and SDLT submission add another £300–£500." },
            { title: "EPC validity", body: "Old EPCs from 10 years ago expire — sellers need a valid one before marketing. £60–£120 new." },
            { title: "Removals on a Friday", body: "Friday is the most popular completion day and removal firms charge ~30% more. Mid-week saves real money." },
          ]}
          faqs={[
            { question: "What contingency should I use?", answer: "10% covers small surprises (extra searches, gifting paperwork). Older or non-standard property: budget 20%." },
            { question: "Do I need a survey on a new build?", answer: "Most lenders accept the developer’s snagging report, but an independent snagging survey (£300–£600) usually pays for itself." },
            { question: "Can I add fees to my mortgage?", answer: "Yes — most lenders let you add £999 product and valuation fees. Be aware: 25 years of interest on £999 adds about £1,400 at 5%." },
          ]}
          disclaimer="Costs vary hugely by region and property. Always get fixed quotes before exchanging contracts."
        />
      }
    />
  );
}
