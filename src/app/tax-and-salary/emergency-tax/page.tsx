import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EmergencyTaxCalculator from "./EmergencyTaxCalculator";

export const metadata: Metadata = {
  title: "Emergency Tax Refund Estimator (UK)",
  description: "How much tax HMRC owes you when stuck on BR or 0T emergency codes.",
};

export default function EmergencyTaxPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/emergency-tax", label: "Emergency Tax" }]}
      title="Emergency Tax Refund Estimator"
      intro="Starting a new job without a P45? Pulling a pension lump sum? HMRC often defaults to an emergency tax code (BR, 0T or 1257L W1/M1), over-taxing you until they catch up."
      calculator={<EmergencyTaxCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>We compare tax under your emergency code against tax under the normal 1257L code. The monthly difference is what HMRC is over-collecting.</p>}
          officialRules={
            <ul>
              <li>BR: 20% flat tax, no personal allowance.</li>
              <li>0T: full bands, no personal allowance.</li>
              <li>W1/M1 (Week 1/Month 1): non-cumulative — each pay period treated alone.</li>
              <li>HMRC normally rebalances via PAYE within 1–3 months once they have the right code.</li>
            </ul>
          }
          pitfalls={[
            { title: "Pension lump sums always emergency-coded", body: "First pension drawdown uses 1257L M1 — almost always over-taxes large lump sums by thousands." },
            { title: "Use forms P55 / P53Z / P50Z", body: "For pension overpayments, claim back immediately — don’t wait for end-of-year reconciliation." },
            { title: "Update your tax code", body: "Once HMRC gets P45 details, code updates automatically. Otherwise call 0300 200 3300." },
          ]}
          faqs={[
            { question: "How long until automatic refund?", answer: "Usually next paycheque once the cumulative code is applied — or after 5 April for the prior year." },
            { question: "Can I claim mid-year?", answer: "Yes — by phone or via your Personal Tax Account online." },
          ]}
          disclaimer="Educational. Real figures depend on full PAYE history."
        />
      }
    />
  );
}
