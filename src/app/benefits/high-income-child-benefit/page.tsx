import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import HICBCCalculator from "./HICBCCalculator";

export const metadata: Metadata = {
  title: "High Income Child Benefit Charge Calculator (UK 2025/26)",
  description: "How much Child Benefit you lose to HICBC — clawback starts at £60,000 and reaches 100% at £80,000.",
};

export default function HICBCPage() {
  return (
    <CalculatorShell
      category="Family & Benefits"
      updatedLabel="2025/26 thresholds"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Family & Benefits" }, { href: "/benefits/high-income-child-benefit", label: "HICBC" }]}
      title="High Income Child Benefit Charge"
      intro="If you or your partner earn over £60,000, HMRC starts clawing back Child Benefit. By £80,000 it’s all gone. The charge is on the higher earner — even if the other parent claims."
      calculator={<HICBCCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>1% of total annual Child Benefit lost for every £200 of income above £60,000. Smoothly tapered: 50% at £70k, 100% at £80k. Paid via Self Assessment.</p>}
          officialRules={
            <ul>
              <li>Threshold raised to £60,000 from April 2024 (was £50,000).</li>
              <li>Full charge at £80,000 (was £60,000).</li>
              <li>Adjusted net income = gross income − pension contributions − Gift Aid.</li>
              <li>Reported via Self Assessment; SA registration required if earning above the threshold and receiving Child Benefit.</li>
            </ul>
          }
          pitfalls={[
            { title: "Pension contributions reduce the income that counts", body: "Salary-sacrifice or relief-at-source pension contributions reduce adjusted net income — and can bring you back below £60k." },
            { title: "Bonus pushed you over? It's by tax year", body: "Even one big month in March can land you above the threshold for the year. Pension top-up before 5 April can rescue you." },
            { title: "Opt out of payment but keep the claim", body: "Tick the box to stop receiving payments while keeping the claim active — earns NI credits without triggering HICBC paperwork." },
          ]}
          faqs={[
            { question: "What if both partners earn over £60k?", answer: "The higher earner pays the charge. If both equal, either can — agree between yourselves." },
            { question: "Does my partner's income matter to HICBC?", answer: "Only when comparing ‘who’s the higher earner’. Otherwise no — it’s strictly individual." },
            { question: "Is it really worth claiming if I'll lose it all?", answer: "Yes — for NI credits towards State Pension. Just opt out of payment to avoid the SA hassle." },
          ]}
          disclaimer="Based on 2024+ thresholds. Adjusted net income is your responsibility — check with HMRC if unsure."
        />
      }
    />
  );
}
