import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PropertyCGTCalculator from "./PropertyCGTCalculator";

export const metadata: Metadata = {
  title: "Property Capital Gains Tax Calculator (UK 2025/26)",
  description: "CGT on selling a second home, BTL or inherited property — at the unified 18/24% post-Oct 2024 rates.",
};

export default function PropertyCGTPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="Oct 2024 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/property-capital-gains", label: "Property CGT" }]}
      title="Property Capital Gains Tax Calculator"
      intro="Selling a second home, BTL or property you’ve inherited? CGT applies on the gain above £3,000. Since 30 October 2024, residential and other assets share the same 18/24% rates."
      calculator={<PropertyCGTCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Gain = sale price − purchase price − allowable costs. Subtract the £3,000 Annual Exempt Amount. The remainder is taxed at 18% to the extent it fits in your basic-rate band, and 24% above. Your other taxable income fills the basic-rate band first.</p>}
          officialRules={
            <ul>
              <li>Annual Exempt Amount: £3,000 (down from £12,300 in 2022/23).</li>
              <li>Rates: 18% basic / 24% higher (residential and other unified Oct 2024).</li>
              <li>Allowable costs: stamp duty paid, legal fees, agent fees, capital improvements (not maintenance).</li>
              <li>Pay within 60 days of completion via HMRC’s online service.</li>
            </ul>
          }
          pitfalls={[
            { title: "60-day reporting trap", body: "Late returns trigger penalties even if no tax is due." },
            { title: "Improvements vs maintenance", body: "A new extension counts. Replacing the boiler doesn’t." },
            { title: "PPR relief only on main home", body: "If you ever lived in the property, Private Residence Relief reduces the gain pro-rata." },
          ]}
          faqs={[
            { question: "Can I offset previous losses?", answer: "Yes — capital losses from prior years can reduce taxable gains. Must have been reported within 4 years." },
            { question: "Do gifts trigger CGT?", answer: "Yes — gifts other than to a spouse are treated as a disposal at market value." },
          ]}
          disclaimer="Educational. Speak to an accountant for inheritance, divorce or PPR-period calculations."
        />
      }
    />
  );
}
