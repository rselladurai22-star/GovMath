import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MaternityCalculator from "./MaternityCalculator";

export const metadata: Metadata = {
  title: "Statutory Maternity Pay (SMP) Calculator UK 2025/26",
  description: "Work out 39 weeks of UK Statutory Maternity Pay — 90% of AWE for 6 weeks, then £187.18/week or 90% (whichever lower) for 33 weeks.",
};

export default function MaternityPage() {
  return (
    <CalculatorShell
      category="Family & Benefits"
      updatedLabel="April 2025 rate"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Family & Benefits" }, { href: "/benefits/maternity-pay", label: "Maternity Pay" }]}
      title="Statutory Maternity Pay Calculator"
      intro="SMP runs 39 weeks: the first 6 at 90% of your average weekly pay, then 33 weeks at the lower of £187.18/week or 90%. Total leave can be 52 weeks, but the final 13 are unpaid."
      calculator={<MaternityCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              AWE = total earnings over the 8 weeks ending with the qualifying week (15th week before expected childbirth), divided by 8. Weeks 1–6: 90% × AWE, no cap. Weeks 7–39: lesser of £187.18 or 90% × AWE. Final 13 weeks of leave: unpaid (or contractual maternity pay if your employer offers more).
            </p>
          }
          officialRules={
            <ul>
              <li>SMP rate £187.18/week from April 2025.</li>
              <li>Eligibility: 26 weeks continuous service by qualifying week; AWE ≥ £125/wk Lower Earnings Limit.</li>
              <li>Employer pays SMP, then reclaims 92% (or 103% for small employers).</li>
              <li>Tax & NI deducted as normal income.</li>
            </ul>
          }
          pitfalls={[
            { title: "AWE includes bonuses but timing matters", body: "If a bonus lands inside the 8-week reference period, AWE jumps. Outside it, it doesn’t count. Some women time conception to maximise this." },
            { title: "Salary sacrifice can hurt AWE", body: "If you sacrifice salary for childcare vouchers or pension, AWE is calculated on the post-sacrifice figure — reducing SMP." },
            { title: "Employer top-up rarely matches contractual", body: "Many employers offer enhanced maternity pay (e.g. full pay for 13 weeks). Check your contract — could mean thousands extra." },
          ]}
          faqs={[
            { question: "What if I don't qualify for SMP?", answer: "You may qualify for Maternity Allowance (£187.18/wk for 39 weeks) via DWP — slightly different eligibility, often for self-employed." },
            { question: "Can I take leave and return early?", answer: "Yes — must give 8 weeks’ notice of return date. You can claim Shared Parental Leave with your partner from week 2 onwards." },
          ]}
          disclaimer="Statutory minimum only. Many employers offer enhanced maternity pay schemes."
        />
      }
    />
  );
}
