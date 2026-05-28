import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MarginCalculator from "./MarginCalculator";

export const metadata: Metadata = {
  title: "Gross Profit Margin Calculator UK",
  description: "Profit, margin %, and markup % from cost and selling price — instant pricing maths.",
};

export default function MarginPage() {
  return (
    <CalculatorShell
      category="Business & Self-Employment"
      updatedLabel="Pricing tool"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/gross-profit-margin", label: "Gross Profit Margin" }]}
      title="Gross Profit Margin Calculator"
      intro="Margin and markup are different beasts. Margin is profit as a share of selling price; markup is profit as a share of cost. Confuse them and you&rsquo;ll underprice."
      calculator={<MarginCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>Profit = price − cost. Margin % = profit ÷ price. Markup % = profit ÷ cost. A 50% margin equals 100% markup — they grow apart fast.</p>
          }
          officialRules={
            <ul>
              <li>Both figures should be ex-VAT for a fair comparison.</li>
              <li>Cost = direct cost of goods sold (COGS). Excludes overheads, marketing, salaries.</li>
              <li>Gross profit funds overheads → operating profit → net profit.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don&rsquo;t confuse margin with markup", body: "&lsquo;A 30% markup&rsquo; means cost × 1.3. &lsquo;A 30% margin&rsquo; means cost ÷ 0.7. The latter is much higher pricing." },
            { title: "VAT trips up new traders", body: "If you&rsquo;re VAT-registered, charge VAT on top of your ex-VAT price. Don&rsquo;t calculate margin on the VAT-inclusive figure." },
            { title: "Gross margin isn&rsquo;t profit", body: "From gross you still have to pay rent, staff, ads, tax. Healthy retail gross margins are 40–60%; net might be 5–10%." },
          ]}
          faqs={[
            { question: "What's a good gross margin?", answer: "Depends on sector: software 70–90%, restaurants 60–70%, retail 30–50%, wholesale 15–25%." },
            { question: "Can margin exceed 100%?", answer: "No — margin is capped at 100% (when cost is zero). Markup has no cap." },
          ]}
          disclaimer="Pricing model only. Strategic pricing also considers competition, elasticity and positioning."
        />
      }
    />
  );
}
