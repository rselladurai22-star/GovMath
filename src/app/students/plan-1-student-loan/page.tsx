import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GenericLoanCalculator from "@/components/calculator/GenericLoanCalculator";

export const metadata: Metadata = {
  title: "Plan 1 Student Loan Repayment Calculator (UK 2025/26)",
  description: "Plan 1 is for English/Welsh undergrads who started before September 2012, and Northern Ireland borrowers — 9% above £26,065.",
};

export default function Plan1Page() {
  return (
    <CalculatorShell
      category="Students & Graduates"
      updatedLabel="2025/26 threshold"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students & Graduates" },
        { href: "/students/plan-1-student-loan", label: "Plan 1 Student Loan" },
      ]}
      title="Plan 1 Student Loan Calculator"
      intro="Plan 1 covers pre-September-2012 English & Welsh undergrads and all Northern Ireland borrowers — 9% of income above £26,065 (2025/26)."
      calculator={<GenericLoanCalculator plan="plan-1" />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Repayment = 9% × (annual salary − £26,065). Collected via PAYE if employed, via Self Assessment if self-employed. Below the threshold, no repayments are due.
            </p>
          }
          officialRules={
            <ul>
              <li>Threshold £26,065 (frozen until 2027).</li>
              <li>Interest = Bank of England base rate + 1% (or RPI, whichever lower).</li>
              <li>England/Wales: written off 25 years after first April due, or at age 65 if older loans.</li>
              <li>Northern Ireland: written off 25 years after first April due.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don't confuse with Plan 2 or 5", body: "Different thresholds, different interest. Check your SLC dashboard." },
            { title: "Overpaying rarely pays off", body: "Plan 1 interest is low; balance often dwindles via PAYE alone." },
            { title: "Overseas earnings still count", body: "Notify SLC if leaving UK — penalties for non-disclosure." },
          ]}
          faqs={[
            { question: "Can I have Plan 1 and a Postgrad Loan?", answer: "Yes. They’re collected as separate deductions." },
            { question: "When does it get written off?", answer: "25 years after the first April you became liable to repay." },
          ]}
          disclaimer="Estimate based on 2025/26 thresholds. Actual PAYE deductions calculated monthly."
        />
      }
    />
  );
}
