import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SSPCalculator from "./SSPCalculator";

export const metadata: Metadata = {
  title: "Statutory Sick Pay (SSP) Calculator (UK 2026/27)",
  description: "Minimum SSP your employer must pay from your first day off sick, under the April 2026 rules.",
};

export default function SSPPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Apr 2026 rules"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/statutory-sick-pay", label: "SSP" }]}
      title="Statutory Sick Pay Calculator"
      intro="From 6 April 2026 every employee can get SSP from their first day off sick, whatever they earn. It is 80% of your average weekly earnings or £123.25 a week, whichever is lower. This is the minimum — many employers pay contractual sick pay on top."
      calculator={<SSPCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Weekly SSP = the lower of 80% of your average weekly earnings or £123.25 (2026/27). It is paid for up to 28 weeks. Since 6 April 2026 there are no unpaid ‘waiting days’ and no minimum earnings level.</p>}
          officialRules={
            <ul>
              <li>You are an employee and have done some work under your contract.</li>
              <li>Paid from the first day you are off sick (no waiting days from April 2026).</li>
              <li>No minimum earnings: the Lower Earnings Limit test was removed in April 2026.</li>
              <li>SSP1 form if your employer can’t pay — claim ESA instead.</li>
              <li>SSP is treated as earnings — Income Tax and NI apply.</li>
            </ul>
          }
          pitfalls={[
            { title: "Linked periods of sickness", body: "Two sick periods within 8 weeks of each other count as one, so the 28-week limit runs across both." },
            { title: "Self-certify for 7 days", body: "After that you need a fit note from your GP for SSP to continue." },
          ]}
          faqs={[
            { question: "Does SSP affect Universal Credit?", answer: "Yes — SSP counts as earned income and reduces UC via the taper." },
            { question: "What if I’m self-employed?", answer: "SSP doesn’t apply. You may be able to claim Employment & Support Allowance (ESA)." },
          ]}
          disclaimer="Statutory minimum. Check your contract for any enhanced sick-pay scheme."
        />
      }
    />
  );
}
