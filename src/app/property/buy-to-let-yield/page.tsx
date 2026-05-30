import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BTLYieldCalculator from "./BTLYieldCalculator";

export const metadata: Metadata = {
  title: "Buy-to-Let Yield Calculator (Gross & Net)",
  description: "Annual rental yield as a percentage of property price — gross and net of running costs.",
};

export default function BTLYieldPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="Calculator"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/buy-to-let-yield", label: "BTL Yield" }]}
      title="Buy-to-Let Yield Calculator"
      intro="Yield is the single most-quoted number in BTL — and the most misunderstood. Gross yield ignores everything but rent. Net yield is what you actually keep."
      calculator={<BTLYieldCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Gross yield = annual rent ÷ property price × 100. Net yield deducts annual costs (insurance, management, maintenance, void allowance) before dividing.</p>}
          officialRules={
            <ul>
              <li>No legal definition — yields are presented before mortgage interest by convention.</li>
              <li>Allow 5–10% of rent for voids, 10% for letting agency, and ~£500/yr for landlord insurance.</li>
              <li>Section 24 (since 2020) means mortgage interest is no longer deductible against income — taxed as personal income with a 20% credit instead.</li>
            </ul>
          }
          pitfalls={[
            { title: "Gross is vanity, net is sanity", body: "A 6% gross yield with 30% costs is only 4.2% net. Always run both." },
            { title: "Ignore capital growth at your peril", body: "London BTL has been low-yield / high-growth. The North has been the reverse. Total return = yield + growth." },
            { title: "Mortgage rates eat into net", body: "A 5.5% mortgage on a 6% gross yield leaves almost nothing after tax. Stress-test at 7%." },
          ]}
          faqs={[
            { question: "What yield is good?", answer: "Rule of thumb: 6%+ gross outside London, 4%+ in London. Anything under inflation + mortgage rate is loss-making in real terms." },
            { question: "Should I form a Ltd company?", answer: "If you’re a higher-rate taxpayer with multiple BTLs, yes — Corporation Tax + mortgage interest deductibility usually beats personal ownership." },
          ]}
          disclaimer="Illustrative. Property is illiquid and tax-sensitive — speak to an accountant."
        />
      }
    />
  );
}
