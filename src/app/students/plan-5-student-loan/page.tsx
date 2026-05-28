import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GenericLoanCalculator from "@/components/calculator/GenericLoanCalculator";

export const metadata: Metadata = {
  title: "Plan 5 Student Loan Calculator (UK 2025/26)",
  description: "Plan 5 covers English undergrads starting from August 2023 — 9% above £25,000, with a 40-year write-off.",
};

export default function Plan5Page() {
  return (
    <CalculatorShell
      category="Students & Graduates"
      updatedLabel="2025/26 threshold"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students & Graduates" },
        { href: "/students/plan-5-student-loan", label: "Plan 5 Student Loan" },
      ]}
      title="Plan 5 Student Loan Calculator"
      intro="Plan 5 is for English undergrads who started in or after August 2023 — lower threshold (£25,000) but a much longer 40-year write-off window."
      calculator={<GenericLoanCalculator plan="plan-5" />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Repayment = 9% × (annual salary − £25,000). Lower threshold than Plan 2 means more borrowers will pay sooner — and for longer.</p>}
          officialRules={
            <ul>
              <li>Threshold £25,000 (frozen until at least April 2027).</li>
              <li>Interest capped at RPI (no income-tier sliding scale).</li>
              <li><strong>40-year write-off</strong> instead of 30 — much more debt will be repaid in full.</li>
              <li>Same 9% rate as other undergrad plans.</li>
            </ul>
          }
          pitfalls={[
            { title: "Most Plan 5 borrowers will repay in full", body: "The combination of a low threshold, 9% rate and 40-year window means high earners may overpay significantly. IFS estimates 65%+ will repay fully." },
            { title: "Overpayments may now be worthwhile", body: "Unlike Plan 2, Plan 5&rsquo;s longer window changes the math — high earners can save serious interest by paying down early." },
          ]}
          faqs={[
            { question: "Why is the threshold so much lower than Plan 2?", answer: "Policy change in 2022 to recover more loan value. Plan 5 borrowers pay more, sooner." },
            { question: "Can I still defer to age 67?", answer: "No — Plan 5 has no age-based write-off, only the 40-year clock." },
          ]}
          disclaimer="Estimate based on 2025/26 thresholds."
        />
      }
    />
  );
}
