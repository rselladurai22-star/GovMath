import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MaintenanceLoanCalculator from "./MaintenanceLoanCalculator";

export const metadata: Metadata = {
  title: "Maintenance Loan Calculator (Plan 5, 2025/26)",
  description: "Estimate your Plan 5 Maintenance Loan based on household income and where you&rsquo;ll live during term-time.",
};

export default function MaintenanceLoanPage() {
  return (
    <CalculatorShell
      category="Students"
      updatedLabel="2025/26 Plan 5"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students" },
        { href: "/students/maintenance-loan", label: "Maintenance Loan" },
      ]}
      title="Maintenance Loan Calculator"
      intro="Plan 5 applies to new English undergraduates from September 2023. The loan depends on household income and where you&rsquo;ll live during term-time."
      calculator={<MaintenanceLoanCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Each accommodation type has a maximum loan. Above a £25,000 household income, the loan tapers by £1 for every £8.42 of extra income, down to a minimum (means-tested floor) — never below it.
            </p>
          }
          officialRules={
            <ul>
              <li>2025/26 maximums: £8,877 (home), £10,544 (away), £13,762 (London), £12,070 (abroad).</li>
              <li>Household income = parents&rsquo; combined taxable income, or your own if estranged / over 25.</li>
              <li>Paid in 3 instalments at the start of each term.</li>
              <li>Plan 5 repayment: 9% of earnings over £25,000, written off after 40 years.</li>
            </ul>
          }
          pitfalls={[
            { title: "Income drops mid-year", body: "If household income falls by 15%+ during the year, ask SFE for a Current Year Income assessment — could unlock thousands more." },
            { title: "Sibling at uni boosts your loan", body: "Having a brother or sister also in higher education reduces the income that counts towards your assessment." },
            { title: "Loan doesn&rsquo;t cover everything", body: "Even the London maximum rarely covers rent + bills + food. Plan for a part-time job or top-up from family." },
          ]}
          faqs={[
            { question: "Is this Plan 2 or Plan 5?", answer: "Plan 5 — for new English students from 2023/24 onwards. Plan 2 (pre-2023 starters) has different repayment thresholds." },
            { question: "What counts as household income?", answer: "Your parents&rsquo; combined taxable income from the previous tax year, less pension contributions and any other dependent children allowance." },
            { question: "Does the loan affect benefits?", answer: "Maintenance Loan counts as income for Universal Credit purposes (with some disregards). Always tell your work coach." },
          ]}
          disclaimer="Estimate only — Student Finance England&rsquo;s final assessment depends on your full circumstances. Apply at gov.uk/student-finance."
        />
      }
    />
  );
}
