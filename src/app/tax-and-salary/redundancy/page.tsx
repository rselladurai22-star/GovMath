import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import RedundancyCalculator from "./RedundancyCalculator";

export const metadata: Metadata = {
  title: "Statutory Redundancy Pay Calculator (UK 2025/26)",
  description: "Work out your statutory redundancy entitlement based on age, length of service and weekly pay.",
};

export default function RedundancyPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Apr 2025 cap"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/redundancy", label: "Redundancy" }]}
      title="Statutory Redundancy Pay Calculator"
      intro="If you’ve worked somewhere two years or more and your role is being made redundant, you’re entitled to a statutory payment. This is the legal minimum — many employers pay more."
      calculator={<RedundancyCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Each completed year of service is weighted by your age that year: half a week under 22, one week 22–40, one-and-a-half weeks 41+. Weekly pay is capped at £719 (Apr 2025), and only 20 years of service count — so the absolute statutory ceiling is £21,570.</p>}
          officialRules={
            <ul>
              <li>You need at least 2 years’ continuous service.</li>
              <li>Weekly-pay cap rises each April — currently £719.</li>
              <li>First £30,000 of any redundancy payment is tax-free; balance is taxed as income.</li>
              <li>National Insurance isn’t due on statutory redundancy.</li>
            </ul>
          }
          pitfalls={[
            { title: "Contractual ≠ statutory", body: "Many employers offer enhanced packages. Statutory is the floor — check your contract or staff handbook." },
            { title: "Notice pay is separate", body: "You’re also entitled to statutory notice (1 week per year of service, capped at 12 weeks) — paid on top." },
            { title: "PILON is taxable", body: "Pay-in-lieu-of-notice is treated as normal earnings — full Income Tax and NI." },
          ]}
          faqs={[
            { question: "What if I’m offered alternative employment?", answer: "If suitable and you unreasonably refuse, you may lose redundancy rights. Use the 4-week trial period to test it." },
            { question: "Can I be made redundant on maternity leave?", answer: "Yes — but you have priority for any alternative roles, and dismissal must be genuinely about the role, not the leave." },
          ]}
          disclaimer="Statutory minimum. Check ACAS or take legal advice for complex cases."
        />
      }
    />
  );
}
