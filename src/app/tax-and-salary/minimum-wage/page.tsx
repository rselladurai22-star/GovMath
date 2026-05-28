import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MinWageCalculator from "./MinWageCalculator";

export const metadata: Metadata = {
  title: "UK Minimum Wage Checker 2025/26 (NLW & NMW)",
  description: "Check whether your pay meets the UK National Living Wage (£12.21) or National Minimum Wage for your age band — April 2025 rates.",
};

export default function MinWagePage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="April 2025 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/minimum-wage", label: "Minimum Wage" }]}
      title="UK Minimum Wage Checker"
      intro="From April 2025 the National Living Wage rose to £12.21 for everyone aged 21 and over. Younger workers and apprentices have their own minimums — and you have the right to be paid at least these rates."
      calculator={<MinWageCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>We compare your stated hourly pay to the legal minimum for your age band. Any shortfall is multiplied by hours/week and 52 to project annual underpayment.</p>}
          officialRules={
            <ul>
              <li>National Living Wage (21+): £12.21/hr.</li>
              <li>18–20: £10.00/hr.</li>
              <li>16–17 & apprentices (1st year, or under 19): £7.55/hr.</li>
              <li>Sleep-in shifts: count as working time per Mencap (2021) — sometimes.</li>
              <li>Employer must keep records for 6 years; HMRC enforces with fines up to 200% of arrears.</li>
            </ul>
          }
          pitfalls={[
            { title: "Tronc isn't pay for NMW", body: "Tips paid via tronc don&rsquo;t count towards minimum wage. Your base pay must independently hit the floor." },
            { title: "Deductions can take you under", body: "Uniform charges, till shortages, accommodation deductions above the offset (£10.66/day) can put your effective rate below minimum — that&rsquo;s illegal." },
            { title: "Salaried at the wage floor? Watch the hours", body: "If your salary works out below minimum when divided by actual hours, you&rsquo;re underpaid. Common in retail/hospitality manager roles." },
          ]}
          faqs={[
            { question: "Can I report underpayment?", answer: "Yes — confidentially via ACAS (0300 123 1100) or directly to HMRC. You can&rsquo;t be sacked for it." },
            { question: "What about volunteers and interns?", answer: "Genuine volunteers are exempt. But if you have set hours, contracted duties or get any reward beyond expenses, you&rsquo;re a worker and NMW applies." },
          ]}
          disclaimer="2025/26 rates. Rates change every April."
        />
      }
    />
  );
}
