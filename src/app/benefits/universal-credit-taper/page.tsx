import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import UCTaperCalculator from "./UCTaperCalculator";

export const metadata: Metadata = {
  title: "Universal Credit Earnings Taper Calculator (UK 2025/26)",
  description: "How much Universal Credit you lose for every £ you earn — 55p taper above your work allowance.",
};

export default function UCTaperPage() {
  return (
    <CalculatorShell
      category="Family & Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Family & Benefits" }, { href: "/benefits/universal-credit-taper", label: "UC Earnings Taper" }]}
      title="UC Earnings Taper Calculator"
      intro="Universal Credit doesn’t cut off when you start working — it tapers down. For every £1 you earn (net) above your work allowance, your UC drops by 55p."
      calculator={<UCTaperCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>UC reduces by 55p per £1 of net earnings above the work allowance. Work allowance is £411/month if you receive housing element, £684/month if not. No work allowance applies if you don’t have children or a disability — every £1 reduces UC by 55p immediately.</p>
          }
          officialRules={
            <ul>
              <li>Taper rate: 55%.</li>
              <li>Work allowances: £411/mo (with housing), £684/mo (without housing). Applies if you have a child or are disabled (LCWRA).</li>
              <li>Calculated on net earnings (after tax + NI + pension).</li>
              <li>Self-employed: subject to Minimum Income Floor after 12 months trading.</li>
            </ul>
          }
          pitfalls={[
            { title: "Pension contributions reduce earnings for UC", body: "Sacrificing salary into pension reduces net earnings that count, raising your UC entitlement — a powerful combination at 55% taper." },
            { title: "No work allowance if no kids/disability", body: "Working single adults without children get hit on the first £1 of earnings. Painful effective marginal rates." },
            { title: "Self-employed Minimum Income Floor", body: "After 12 months of self-employment, DWP can assume you earn at least Minimum Wage × work-related hours — even if you didn’t. A killer for genuine startup phases." },
          ]}
          faqs={[
            { question: "What if I earn more than max UC ÷ 55%?", answer: "Your UC will be £0 that month, but the claim stays open. Earn less again and payments resume automatically." },
            { question: "Why does my UC change each month?", answer: "Real-time PAYE feeds your earnings monthly. Spike in one month? UC drops that month. Two paydays in one assessment period? Worse." },
          ]}
          disclaimer="Approximation. Real UC awards include capital, deductions, sanctions and a complex earnings averaging — use Turn2us or EntitledTo for a full benefit calculation."
        />
      }
    />
  );
}
