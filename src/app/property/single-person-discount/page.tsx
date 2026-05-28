import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SPDCalculator from "./SPDCalculator";

export const metadata: Metadata = {
  title: "Single Person Council Tax Discount Calculator (25%)",
  description: "Lone adult households get 25% off Council Tax. Calculate your saving.",
};

export default function SPDPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="25% statutory discount"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/single-person-discount", label: "Single Person Discount" }]}
      title="Single Person Discount Calculator"
      intro="If you&rsquo;re the only adult in your household, you get 25% off Council Tax. It&rsquo;s not automatic — you have to apply. Worth doing within minutes of moving in alone."
      calculator={<SPDCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Council Tax assumes 2 adults per home. The base bill includes a 25% &lsquo;second adult&rsquo; loading. Remove it = 75% of full bill.</p>}
          officialRules={
            <ul>
              <li>25% discount where only one resident adult (18+) lives in the dwelling.</li>
              <li>&lsquo;Disregarded&rsquo; people don&rsquo;t count: full-time students, severely mentally impaired, under-18s, live-in carers (for someone other than spouse), apprentices.</li>
              <li>100% empty-property discount only at council discretion — most charge 100% even on empty homes, with premiums after 1 year.</li>
              <li>2nd home: no discount in most councils.</li>
            </ul>
          }
          pitfalls={[
            { title: "Live-in partner = no discount", body: "Common-law partners count as the second adult. So does a returning student child after graduation." },
            { title: "Backdate, but don&rsquo;t over-claim", body: "Councils can backdate up to 6 years if eligible. But fraudulent claims (lying about who lives there) carry £70+ penalties and prosecution." },
            { title: "Council Tax Reduction is separate", body: "Low income? You may also qualify for CT Reduction (up to 100% off). Apply for both — they stack." },
          ]}
          faqs={[
            { question: "What if my flatmate is a student?", answer: "Full-time students are disregarded — so you become &lsquo;the only countable adult&rsquo; and qualify for 25% off." },
            { question: "Does it apply to my second home?", answer: "Usually no. Some councils give 10–50% on second homes; many now charge a 100% premium." },
          ]}
          disclaimer="Apply via your local council. Discount applies from the date your circumstances qualify."
        />
      }
    />
  );
}
