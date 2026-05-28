import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import Plan2Calculator from "./Plan2Calculator";

export const metadata: Metadata = {
  title: "Plan 2 Student Loan Repayment Calculator (UK 2025/26)",
  description:
    "Work out your Plan 2 student loan repayment — 9% of income above £28,470 for English and Welsh undergrads who started 2012 to 2023.",
};

export default function Plan2Page() {
  return (
    <CalculatorShell
      category="Students & Graduates"
      updatedLabel="2025/26 threshold"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students & Graduates" },
        { href: "/students/plan-2-student-loan", label: "Plan 2 Student Loan" },
      ]}
      title="Plan 2 Student Loan Calculator"
      intro="Plan 2 is the loan plan for English and Welsh undergrads who started university between September 2012 and August 2023 — 9% of income above £28,470 (2025/26)."
      calculator={<Plan2Calculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Repayment = 9% × (annual salary − £28,470). Below the
                threshold you owe £0 for that year. The threshold is
                pro-rated through the year via PAYE — so a December
                bonus that lifts you over could trigger a one-month
                deduction even if your annual salary is under.
              </p>
              <p>
                Interest accrues at <strong>RPI + up to 3%</strong>{" "}
                depending on income, but interest doesn&rsquo;t affect
                what you <em>pay</em> — only the balance. Repayments are
                income-driven, not balance-driven.
              </p>
            </>
          }
          officialRules={
            <>
              <ul>
                <li>Threshold £28,470 from 6 April 2025 (frozen until at least April 2027).</li>
                <li>
                  Repayment rate 9% on the excess. Collected via PAYE
                  alongside Income Tax and NI, or via Self Assessment for
                  self-employed.
                </li>
                <li>
                  <strong>Written off 30 years</strong> after the April
                  you first became eligible to repay — most Plan 2
                  borrowers never repay in full.
                </li>
                <li>
                  Interest: RPI if you earn under £28,470; RPI + sliding
                  up to RPI + 3% at £51,245+. Currently capped to keep
                  rates fair vs commercial loans (the &ldquo;Prevailing Market Rate Cap&rdquo;).
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "Voluntary overpayments rarely make sense",
              body: "Because Plan 2 is income-driven and writes off after 30 years, paying it down early often means throwing money at a debt that would have been forgiven. Only worth it if you&rsquo;re on a strong high-income trajectory and will clear it fully.",
            },
            {
              title: "Bonuses trigger one-off deductions",
              body: "If a single month&rsquo;s pay × 12 lands above £28,470, PAYE will deduct 9% on the excess that month — even if you&rsquo;re under £28,470 annually. You can reclaim via HMRC after year-end if you genuinely earned under the threshold.",
            },
            {
              title: "You don't pay it after leaving the UK — but you must tell SLC",
              body: "Going abroad? You must notify the Student Loans Company and set up an overseas repayment plan based on the country&rsquo;s thresholds, or face penalties added to the balance.",
            },
            {
              title: "Don't confuse Plan 2 with Plan 5",
              body: "If you started uni in or after August 2023, you&rsquo;re on Plan 5 — threshold £25,000 and 40-year write-off. Big difference. Check your SLC account.",
            },
          ]}
          faqs={[
            {
              question: "Do I pay if I'm self-employed?",
              answer:
                "Yes — calculated on your Self Assessment net profit, paid alongside your Income Tax bill on 31 January.",
            },
            {
              question: "Can I have multiple plans?",
              answer:
                "Yes — most commonly Plan 2 (or 5) plus a Postgraduate Loan. They&rsquo;re calculated separately, each with their own threshold.",
            },
            {
              question: "Why doesn't my balance go down even though I pay?",
              answer:
                "Interest accrues monthly at potentially RPI + 3%. For most middle-earners, repayments barely cover interest, so balances grow. That&rsquo;s by design — the 30-year write-off is the real mechanism.",
            },
          ]}
          disclaimer="Estimate based on 2025/26 thresholds. Actual PAYE deductions are calculated monthly, not annually."
        />
      }
    />
  );
}
