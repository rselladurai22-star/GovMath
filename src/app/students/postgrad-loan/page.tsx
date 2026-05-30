import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import GenericLoanCalculator from "@/components/calculator/GenericLoanCalculator";

export const metadata: Metadata = {
  title: "Postgraduate Loan Calculator (UK 2025/26)",
  description: "Postgraduate Loan repayments — 6% above £21,000, separate from any undergraduate plan.",
};

export default function PostgradPage() {
  return (
    <CalculatorShell
      category="Students & Graduates"
      updatedLabel="2025/26 threshold"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students & Graduates" },
        { href: "/students/postgrad-loan", label: "Postgraduate Loan" },
      ]}
      title="Postgraduate Loan Calculator"
      intro="The PG Loan covers Master’s and Doctoral degrees in England & Wales — 6% of income above £21,000, calculated separately from any undergraduate loan."
      calculator={<GenericLoanCalculator plan="postgrad" />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Repayment = 6% × (annual salary − £21,000). PG repayments sit alongside Plan 1/2/5 — both can be deducted simultaneously.</p>}
          officialRules={
            <ul>
              <li>Threshold £21,000 (frozen until 2027).</li>
              <li>Rate <strong>6%</strong> — lower than undergrad’s 9%, but stacks with it.</li>
              <li>Interest: RPI + 3% throughout the loan.</li>
              <li>Written off 30 years after first April due.</li>
            </ul>
          }
          pitfalls={[
            { title: "PG + undergrad = 15% combined", body: "Earn £30k? You pay 6% on £9k PG + 9% on Plan-2 excess separately. Can sting at higher incomes." },
            { title: "Only Master's/Doctoral", body: "PGCE (teacher training) is funded via undergraduate loans, not PG loans. Different rules." },
          ]}
          faqs={[
            { question: "What if I drop out?", answer: "Pro-rata loan based on terms attended; same repayment terms apply." },
            { question: "Is the interest different in repayment?", answer: "No — PG loans use RPI+3% in study AND repayment (unlike undergrad which has income-tiered rates)." },
          ]}
          disclaimer="Estimate based on 2025/26 thresholds."
        />
      }
    />
  );
}
