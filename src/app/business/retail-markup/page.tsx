import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MarkupCalculator from "./MarkupCalculator";

export const metadata: Metadata = {
  title: "Retail Markup Calculator — Required Selling Price",
  description: "What price do you need to charge to hit a target margin or markup? Instant retail pricing.",
};

export default function MarkupPage() {
  return (
    <CalculatorShell
      category="Business & Self-Employment"
      updatedLabel="Pricing tool"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/retail-markup", label: "Retail Markup" }]}
      title="Retail Markup Calculator"
      intro="Set the selling price from cost + target margin OR cost + target markup. Toggle between the two — they are NOT the same."
      calculator={<MarkupCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>For target margin m: price = cost ÷ (1 − m). For target markup k: price = cost × (1 + k). A 50% margin needs a 100% markup; the formulas diverge fast as percentages rise.</p>
          }
          officialRules={
            <ul>
              <li>Margins above 100% are impossible (price would be infinite).</li>
              <li>Markup can be any positive value.</li>
              <li>Both should be calculated ex-VAT.</li>
            </ul>
          }
          pitfalls={[
            { title: "Markup math is easier; margin math drives profit", body: "Retailers often think in markup (it’s a simple multiplier). Finance teams think in margin (P&L line)." },
            { title: "Multiple stages compound", body: "Manufacturer 30% margin → distributor 25% markup → retailer 50% margin. End consumer pays a lot more than cost." },
            { title: "Don’t forget VAT at point of sale", body: "Add 20% VAT to your ex-VAT price for consumer-facing display. Margin should never include VAT." },
          ]}
          faqs={[
            { question: "Why are these different?", answer: "Margin uses price as the denominator; markup uses cost. Same profit, different base." },
            { question: "Convert markup to margin?", answer: "Margin = markup ÷ (1 + markup). So 50% markup = 33% margin. 100% markup = 50% margin." },
          ]}
          disclaimer="Pricing utility. Market positioning, competitor analysis and price elasticity are equally important."
        />
      }
    />
  );
}
