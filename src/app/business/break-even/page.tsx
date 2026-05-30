import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BreakEvenCalculator from "./BreakEvenCalculator";

export const metadata: Metadata = {
  title: "Break-Even Calculator (Units & Revenue)",
  description: "How many units (and what revenue) you need to sell to cover fixed costs.",
};

export default function BreakEvenPage() {
  return (
    <CalculatorShell
      category="Business & Self-Employment"
      updatedLabel="Planning tool"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/break-even", label: "Break-Even" }]}
      title="Break-Even Calculator"
      intro="The minimum sales volume that covers your fixed costs. Below break-even you lose money; above, every extra unit is pure contribution to profit."
      calculator={<BreakEvenCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>Contribution per unit = price − variable cost. Break-even units = fixed costs ÷ contribution per unit. Break-even revenue = break-even units × price.</p>
          }
          officialRules={
            <ul>
              <li>Fixed costs don’t scale with sales (rent, salaries, software).</li>
              <li>Variable costs scale 1:1 with units (materials, packaging, payment fees).</li>
              <li>Some costs are semi-variable (e.g. utilities) — judgment call.</li>
            </ul>
          }
          pitfalls={[
            { title: "Your own salary is a fixed cost", body: "If you’re a sole trader paying yourself £30k, include it. Otherwise the calculator says you’ve broken even when you actually haven’t paid yourself a penny." },
            { title: "Variable cost &lt; price (or you’re doomed)", body: "If shipping + materials + payment fees exceed sale price, no volume helps. Fix the unit economics first." },
            { title: "Break-even ignores growth, taxes, capex", body: "It’s a survival number — not a target. Aim well above to actually build a business." },
          ]}
          faqs={[
            { question: "What about safety margin?", answer: "Industry rule of thumb: aim for actual sales 30–50% above break-even, to give you slack for downturns." },
            { question: "How do I know my fixed vs variable split?", answer: "Look at last year’s P&L. Any cost line that didn’t change much month-on-month, regardless of sales, is fixed." },
          ]}
          disclaimer="Simple linear model. Real costs often step (e.g. hiring an extra person), and prices vary by channel."
        />
      }
    />
  );
}
