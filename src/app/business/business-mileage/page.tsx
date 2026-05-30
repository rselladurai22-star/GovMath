import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MileageCalculator from "./MileageCalculator";

export const metadata: Metadata = {
  title: "HMRC Business Mileage Calculator (45p Approved Rates)",
  description: "Tax-free mileage allowance for using your own car, motorcycle or bike for business — 45p first 10k, 25p after.",
};

export default function MileagePage() {
  return (
    <CalculatorShell
      category="Business & Self-Employment"
      updatedLabel="HMRC AMAP rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/business-mileage", label: "Business Mileage" }]}
      title="Business Mileage Calculator"
      intro="If you use your own vehicle for work, you can claim a tax-free allowance from your employer — or as an expense if self-employed. HMRC’s Approved Mileage Allowance Payments (AMAP) haven’t changed since 2011."
      calculator={<MileageCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Car/van: 45p for the first 10,000 business miles in the tax year, 25p after that. Motorcycle: 24p flat. Bicycle: 20p flat. Plus 5p per passenger mile when you carry a fellow employee on the same business trip (car only).</p>}
          officialRules={
            <ul>
              <li>45p / 25p split is the AMAP rate.</li>
              <li>Mileage = business journeys only. Commuting to your normal workplace does NOT count.</li>
              <li>If employer pays less than AMAP, claim the shortfall as Mileage Allowance Relief via Self Assessment or P87.</li>
              <li>If employer pays more, the excess is taxable.</li>
            </ul>
          }
          pitfalls={[
            { title: "Commuting doesn’t count", body: "Home → permanent workplace is private travel. Home → temporary workplace (under 24 months / less than 40% of your time) usually counts." },
            { title: "AMAP rates haven’t risen since 2011", body: "Fuel costs have doubled but the 45p rate hasn’t budged. Many drivers genuinely lose money — write to your MP." },
            { title: "Logs matter — HMRC can ask", body: "Keep dates, postcodes, business reason, miles. Apps like Tripcatcher / MileIQ make this painless." },
          ]}
          faqs={[
            { question: "Can I claim instead of taking a company car?", answer: "Yes — ‘cash for car’ schemes use AMAP. Often more tax-efficient for low-mileage drivers." },
            { question: "What about electric vehicles?", answer: "Same AMAP rates apply for your own EV. Company EVs get the separate Advisory Electricity Rate (currently 7p/mile)." },
          ]}
          disclaimer="HMRC AMAP rates as of 2025. Self-employed must use the same rates if using simplified expenses."
        />
      }
    />
  );
}
