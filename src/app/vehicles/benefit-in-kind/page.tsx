import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BIKCalculator from "./BIKCalculator";

export const metadata: Metadata = {
  title: "Company Car Benefit-in-Kind Tax Calculator (UK 2025/26)",
  description: "Annual BIK tax on a company car based on list price, CO₂ and your tax band.",
};

export default function BIKPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="2025/26 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/vehicles", label: "Vehicles" }, { href: "/vehicles/benefit-in-kind", label: "Company Car BIK" }]}
      title="Company Car BIK Tax Calculator"
      intro="A company car you can use privately is taxed as a benefit. The taxable amount is list price × BIK% (set by CO₂ emissions). EVs get just 3% in 2025/26."
      calculator={<BIKCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Cash equivalent = P11D list price × BIK%. We multiply that by your marginal tax rate. Diesel cars not meeting RDE2 add a 4% supplement (capped at 37%).</p>}
          officialRules={
            <ul>
              <li>EV BIK rate: 3% in 2025/26 (rising 1pp/year to 9% by 2029/30).</li>
              <li>Petrol BIK scales by CO₂ from 15% (≤50g) to 37%.</li>
              <li>Salary sacrifice schemes still attractive for EVs.</li>
              <li>Fuel benefit charge separate if employer pays for private fuel.</li>
            </ul>
          }
          pitfalls={[
            { title: "Diesel supplement", body: "Most diesels add 4pp — confirm RDE2 certification to avoid." },
            { title: "List price, not paid price", body: "BIK uses P11D (RRP + options + VAT), even if the company got a fleet discount." },
            { title: "Private fuel pays more tax than it&rsquo;s worth", body: "Employer-paid private fuel triggers a separate large BIK — almost never beneficial unless you do massive private mileage." },
          ]}
          faqs={[
            { question: "Hybrid rates?", answer: "PHEV BIK depends on CO₂ and electric range — anywhere from 5% to 15%." },
            { question: "What if I pay for personal contributions?", answer: "Reduces the cash equivalent £-for-£." },
          ]}
          disclaimer="Educational. BIK tables change each tax year — confirm via HMRC."
        />
      }
    />
  );
}
