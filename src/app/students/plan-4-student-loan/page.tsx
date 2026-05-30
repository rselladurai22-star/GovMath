import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GenericLoanCalculator from "@/components/calculator/GenericLoanCalculator";

export const metadata: Metadata = {
  title: "Plan 4 Student Loan Calculator (Scotland 2025/26)",
  description: "Scottish student loan repayments — 9% above £32,745 from April 2025.",
};

export default function Plan4Page() {
  return (
    <CalculatorShell
      category="Students & Graduates"
      updatedLabel="2025/26 threshold"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students & Graduates" },
        { href: "/students/plan-4-student-loan", label: "Plan 4 Student Loan" },
      ]}
      title="Plan 4 Student Loan Calculator"
      intro="Plan 4 covers Scottish-domiciled students with SAAS loans — 9% of income above £32,745 (2025/26), one of the highest thresholds in the UK."
      calculator={<GenericLoanCalculator plan="plan-4" />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Repayment = 9% × (annual salary − £32,745). Collected via PAYE / Self Assessment, managed by SAAS through the Student Loans Company.</p>}
          officialRules={
            <ul>
              <li>Threshold £32,745 from April 2025 — the highest of any UK plan.</li>
              <li>Interest = RPI (no income-based variation).</li>
              <li>Written off 30 years after first April due, or at age 65.</li>
              <li>Repayment is by income, not balance — most borrowers never repay in full.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don't accidentally pay Plan 1", body: "Some employers default to Plan 1 if SLC hasn’t notified them. Check your payslip." },
            { title: "Moving south doesn't change plan", body: "Once on Plan 4, always Plan 4 — even if you live and work in England." },
          ]}
          faqs={[
            { question: "What if I have a PG loan too?", answer: "PG repayments stack on top — 6% above £21,000 separately." },
            { question: "Is the threshold uprated each year?", answer: "Reviewed annually by Scottish Government; usually in line with earnings." },
          ]}
          disclaimer="Estimate based on April 2025 threshold."
        />
      }
    />
  );
}
