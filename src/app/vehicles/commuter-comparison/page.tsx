import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CommuterComparisonCalculator from "./CommuterComparisonCalculator";

export const metadata: Metadata = {
  title: "Commuter Comparison: Train vs Car (UK)",
  description: "Compare the true annual cost of a rail season ticket against driving — fuel, parking and wear &amp; tear.",
};

export default function CommuterComparisonPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/vehicles/commuter-comparison", label: "Commuter Comparison" },
      ]}
      title="Commuter Comparison: Train vs Car"
      intro="A rail season ticket looks expensive on day one — but compare it to fuel, parking and the wear it saves on your car and the answer often surprises people."
      calculator={<CommuterComparisonCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Driving cost = annual miles ÷ mpg × 4.546 L per gallon × pump price, plus daily parking and 12p/mile for wear &amp; tear (the residual once HMRC AMAP fuel is stripped out).
              Rail cost is whatever you enter for your annual season ticket.
            </p>
          }
          officialRules={
            <ul>
              <li>UK fuel prices include 52.95p/L duty + 20% VAT — the pump price drives the calc.</li>
              <li>Annual season tickets cost ~40× the weekly fare on most national rail routes.</li>
              <li>Salary-sacrifice season ticket loans are interest-free up to £10,000.</li>
              <li>HMRC&rsquo;s 45p/mile (first 10k) covers fuel + running costs for business travel only — not commuting.</li>
            </ul>
          }
          pitfalls={[
            { title: "Forgetting depreciation", body: "High-mileage cars lose value faster. The 12p/mile default is a fuel-less running cost — add 5–10p more for serious depreciation if the car is new." },
            { title: "Ignoring delays", body: "Rail buys reliability and the ability to work in transit. If your time is worth £20/hr, an extra hour in traffic shifts the calc." },
            { title: "Hidden parking costs", body: "Work parking permits, congestion-zone charges and station car park fees often double the obvious cost of driving." },
          ]}
          faqs={[
            { question: "Can I salary-sacrifice my train ticket?", answer: "Most employers offer interest-free season ticket loans repaid over 12 months — saves the upfront sting and keeps the season ticket discount." },
            { question: "What mpg should I use?", answer: "Use your real-world figure, not the official combined. Most petrol cars manage 70–85% of the WLTP number; diesels are closer to 90%." },
            { question: "Does this include car insurance and tax?", answer: "No — those are fixed costs you pay whether you drive or not. Add them only if you&rsquo;d genuinely give up the car." },
          ]}
          disclaimer="Estimates only. Wear &amp; tear varies hugely by vehicle age. Always check your actual season ticket price at nationalrail.co.uk."
        />
      }
    />
  );
}
