import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CarersEarningsCalculator from "./CarersEarningsCalculator";

export const metadata: Metadata = {
  title: "Carer's Allowance Earnings Check (UK 2025/26)",
  description: "Are you under the £196/week earnings limit for Carer's Allowance?",
};

export default function CarersPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="£196/wk limit"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Benefits" }, { href: "/benefits/carers-earnings", label: "Carer&rsquo;s Earnings" }]}
      title="Carer&rsquo;s Allowance Earnings Check"
      intro="Carer&rsquo;s Allowance is paid at £83.30/week if you care for someone at least 35 hours/week — but you must earn under £196/week (net of tax, NI and half of pension contributions)."
      calculator={<CarersEarningsCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>This is a cliff edge — £1 over the £196 limit means £0 Carer&rsquo;s Allowance. Allowable deductions before checking: tax, NI, 50% of pension contributions, and reasonable care costs for the cared-for person while you work.</p>}
          officialRules={
            <ul>
              <li>Cared-for person must get qualifying disability benefit (PIP daily living, AA, DLA middle/highest).</li>
              <li>You must provide 35+ hours of care per week.</li>
              <li>You can&rsquo;t be in full-time education (21+ hours/wk).</li>
              <li>Overpayments are pursued aggressively by DWP.</li>
            </ul>
          }
          pitfalls={[
            { title: "Cliff edge, not taper", body: "Going £1 over the £196 limit loses you the entire £83.30/week. Plan pay raises carefully." },
            { title: "Bonus push-over", body: "A one-off bonus that takes you over the limit in one week can trigger overpayment recovery. Notify DWP immediately." },
            { title: "Affects State Pension claim", body: "Carer&rsquo;s gives Class 1 NI credit — protect that record." },
          ]}
          faqs={[
            { question: "Can a couple both claim?", answer: "Only one Carer&rsquo;s per cared-for person." },
            { question: "Does it affect Universal Credit?", answer: "Treated as income for UC — but you get a carer element which usually offsets." },
          ]}
          disclaimer="Educational. DWP rules change — always confirm via GOV.UK or a Citizens Advice."
        />
      }
    />
  );
}
