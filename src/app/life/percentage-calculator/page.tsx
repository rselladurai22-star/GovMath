import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PercentCalculator from "./PercentCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator",
  description:
    "Work out percentages five ways: X% of Y, X is what % of Y, % change, add a %, subtract a %. Plain answers, no setup.",
};

export default function PercentPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="Five common modes"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/percentage-calculator", label: "Percentage Calculator" },
      ]}
      title="Percentage Calculator"
      intro="Five percentage questions, one calculator. Pick what you’re trying to do, type the two numbers, and read the answer in a sentence."
      calculator={<PercentCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>The five everyday percentage operations:</p>
              <ul>
                <li>
                  <strong>X% of Y</strong> = (X ÷ 100) × Y. Example: 20% of 250 = 50.
                </li>
                <li>
                  <strong>X is what % of Y</strong> = (X ÷ Y) × 100. Example: 25 of 200 = 12.5%.
                </li>
                <li>
                  <strong>% change from A to B</strong> = ((B − A) ÷ |A|) × 100.
                  A positive result is an increase; negative is a decrease.
                </li>
                <li>
                  <strong>Add X% to Y</strong> = Y × (1 + X/100). Example: 200 + 15% = 230.
                </li>
                <li>
                  <strong>Subtract X% from Y</strong> = Y × (1 − X/100). Example: 200 − 15% = 170.
                </li>
              </ul>
            </>
          }
          officialRules={
            <>
              <p>
                There’s no “official” UK percentage rule, but
                a few conventions trip people up:
              </p>
              <ul>
                <li>
                  <strong>Percentage points vs percent.</strong> If a tax rate
                  rises from 20% to 25%, that’s a 5 percentage-point
                  increase but a 25% increase in the rate itself. Both
                  framings are correct; choose deliberately.
                </li>
                <li>
                  <strong>Compound vs simple.</strong> Adding 10% and then
                  10% is +21%, not +20%. Use the{" "}
                  <a className="text-primary underline" href="/investing/compound-interest">
                    compound interest calculator
                  </a>{" "}
                  for repeated growth.
                </li>
                <li>
                  <strong>VAT.</strong> Adding 20% VAT to £100 gives £120.
                  Removing 20% VAT from £120 gives £100, not £96. Use the{" "}
                  <a className="text-primary underline" href="/business/vat-calculator">
                    VAT calculator
                  </a>{" "}
                  if that’s what you’re actually trying to do.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "A 10% drop followed by a 10% rise doesn't break even",
              body: "£100 down 10% = £90. £90 up 10% = £99 — not £100. You need a 11.1% gain to recover a 10% loss. This is why percentage drops in markets are worse than the headline suggests.",
            },
            {
              title: "Reversed direction matters",
              body: "If something costs £80 now and £100 last year, that’s a 20% decrease year-on-year. £100 to £80 is a 20% decrease; £80 to £100 is a 25% increase. The denominator is always the starting point.",
            },
            {
              title: "Adding 20% then taking 20% off ≠ original",
              body: "£100 + 20% = £120. £120 − 20% = £96. The percentages are taken from different bases, so they don’t cancel.",
            },
            {
              title: "Discount stacking isn't additive",
              body: "“30% off, then an extra 10% at the till” isn’t 40% off. £100 → £70 → £63 is a 37% total discount, not 40%.",
            },
          ]}
          faqs={[
            {
              question: "How do I work out a tip?",
              answer:
                "Use the ‘Add X% to Y’ mode. For a £60 bill with a 12.5% service charge: 60 + 12.5% = £67.50. In the UK, service is often already added to restaurant bills — check before tipping again.",
            },
            {
              question: "How do I work out a discount?",
              answer:
                "Use ‘Subtract X% from Y.’ A £120 jacket at 30% off is 120 − 30% = £84. If you want to know the saving as a number, that’s the difference: £36.",
            },
            {
              question: "What about percentages of percentages?",
              answer:
                "Use ‘X% of Y’ and put a percentage as Y. For example, 50% of 20% = 10%. Useful for partial pay rises (e.g. “I got half of a 4% rise” = 2%).",
            },
          ]}
        />
      }
    />
  );
}
