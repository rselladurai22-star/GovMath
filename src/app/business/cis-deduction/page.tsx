import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CISCalculator from "./CISCalculator";

export const metadata: Metadata = {
  title: "CIS Deduction Calculator (Construction Industry Scheme)",
  description: "Work out the 20% or 30% CIS deduction on a subcontractor invoice.",
};

export default function CISPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="CIS"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/cis-deduction", label: "CIS" }]}
      title="CIS Deduction Calculator"
      intro="Under the Construction Industry Scheme, contractors deduct tax from subcontractor payments before paying out. 20% if you’re registered, 30% if you’re not."
      calculator={<CISCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>CIS is deducted on the labour element only — materials, plant hire, fuel and VAT are excluded. Registered subcontractors are taxed at 20%; unregistered at 30%. Gross-status subcontractors get nothing deducted.</p>}
          officialRules={
            <ul>
              <li>Applies to mainstream construction work in the UK.</li>
              <li>Contractor files a monthly CIS return (CIS300).</li>
              <li>Subcontractor reclaims deductions via Self Assessment / Corporation Tax return.</li>
              <li>Gross payment status requires turnover &gt;£30k and a clean tax record.</li>
            </ul>
          }
          pitfalls={[
            { title: "Materials must be itemised", body: "If not separated on the invoice, HMRC may treat the whole figure as labour." },
            { title: "VAT reverse charge", body: "Since 2021, B2B construction services use the VAT reverse charge — recipient accounts for VAT." },
            { title: "Penalties for late returns", body: "£100 per missed monthly CIS return, escalating fast." },
          ]}
          faqs={[
            { question: "Do I have to register?", answer: "If you’re a subcontractor in construction, yes — to avoid the 30% rate." },
            { question: "Can I claim materials VAT?", answer: "Yes if VAT-registered, via your normal VAT return." },
          ]}
          disclaimer="Educational. Always file CIS returns through HMRC’s online service or commercial software."
        />
      }
    />
  );
}
