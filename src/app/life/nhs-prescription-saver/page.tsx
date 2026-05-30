import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import NhsPrescriptionCalculator from "./NhsPrescriptionCalculator";

export const metadata: Metadata = {
  title: "NHS Prescription Saver: PPC Calculator (England)",
  description: "See whether a 3-month or 12-month Prescription Prepayment Certificate would save you money on NHS prescriptions in England.",
};

export default function NhsPrescriptionSaverPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025/26 prices"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/nhs-prescription-saver", label: "NHS Prescription Saver" },
      ]}
      title="NHS Prescription Saver"
      intro="In England, prescriptions cost £9.90 per item. If you need 4+ items in 3 months or 13+ in a year, a Prescription Prepayment Certificate (PPC) saves real money."
      calculator={<NhsPrescriptionCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We compare three options: pay as you go (£9.90/item), 3-month PPC (£33.70, break-even at 4 items per 3 months), and 12-month PPC (£120.90 or £10.08/mo direct debit, break-even at ~13 items/year).
            </p>
          }
          officialRules={
            <ul>
              <li>Free prescriptions: under 16, 16–18 in full-time education, 60+, pregnancy, maternity exemption certificate, certain medical conditions.</li>
              <li>HC2 certificate for low-income households (free) or HC3 (partial help).</li>
              <li>Buy a PPC from any pharmacy or nhsbsa.nhs.uk.</li>
              <li>The PPC covers unlimited NHS prescriptions during its term.</li>
            </ul>
          }
          pitfalls={[
            { title: "Direct debit isn’t a saving", body: "The DD just spreads the cost over 10 monthly payments of £10.08. Same total — just easier on cashflow." },
            { title: "Forgetting to renew", body: "Set a calendar reminder a fortnight before your PPC expires. There’s no grace period — items dispensed after lapse cost £9.90 each." },
            { title: "Holidays & travel", body: "PPC covers England only. NHS prescriptions are free in Wales, Scotland and NI — but only if dispensed there." },
          ]}
          faqs={[
            { question: "Can my employer pay for a PPC?", answer: "Some salary-sacrifice health schemes cover them. Personally-bought PPCs aren’t tax-deductible." },
            { question: "Do over-60s pay?", answer: "No — once you turn 60, NHS prescriptions are free in England automatically. No application needed." },
            { question: "What about hospital prescriptions?", answer: "Hospital outpatient prescriptions are free for NHS patients — the PPC isn’t needed." },
          ]}
          disclaimer="England prices only. Apply for PPCs at nhsbsa.nhs.uk or any pharmacy. Always check exemption eligibility before paying."
        />
      }
    />
  );
}
