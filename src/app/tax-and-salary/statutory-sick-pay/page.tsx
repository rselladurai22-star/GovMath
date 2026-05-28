import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SSPCalculator from "./SSPCalculator";

export const metadata: Metadata = {
  title: "Statutory Sick Pay (SSP) Calculator (UK 2025/26)",
  description: "Minimum SSP your employer must pay if you&rsquo;re off sick four days or more.",
};

export default function SSPPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Apr 2025 rate"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/statutory-sick-pay", label: "SSP" }]}
      title="Statutory Sick Pay Calculator"
      intro="If you earn at least £125/week and you&rsquo;ve been off sick four days or more in a row, your employer must pay you SSP. This is the minimum — many employers pay contractual sick pay on top."
      calculator={<SSPCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>SSP is a flat £118.75/week (Apr 2025) paid for up to 28 weeks. The first 3 days are unpaid &lsquo;waiting days&rsquo; — you must be sick for 4+ days in a row before SSP kicks in.</p>}
          officialRules={
            <ul>
              <li>Earn at least the Lower Earnings Limit (£125/week 2025/26).</li>
              <li>Off sick four or more days in a row (including non-working days).</li>
              <li>SSP1 form if your employer can&rsquo;t pay — claim ESA instead.</li>
              <li>SSP is treated as earnings — Income Tax and NI apply.</li>
            </ul>
          }
          pitfalls={[
            { title: "Linked periods of sickness", body: "Two sick periods within 8 weeks of each other count as one — no fresh waiting days." },
            { title: "Self-certify for 7 days", body: "After that you need a fit note from your GP for SSP to continue." },
          ]}
          faqs={[
            { question: "Does SSP affect Universal Credit?", answer: "Yes — SSP counts as earned income and reduces UC via the taper." },
            { question: "What if I&rsquo;m self-employed?", answer: "SSP doesn&rsquo;t apply. You may be able to claim Employment & Support Allowance (ESA)." },
          ]}
          disclaimer="Statutory minimum. Check your contract for any enhanced sick-pay scheme."
        />
      }
    />
  );
}
