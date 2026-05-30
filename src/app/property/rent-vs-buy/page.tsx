import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import RentVsBuyCalculator from "./RentVsBuyCalculator";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator (UK)",
  description: "Should you rent or buy in the UK? Compare the true financial outcome over a chosen period.",
};

export default function RentVsBuyPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="With opportunity cost"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/rent-vs-buy", label: "Rent vs Buy" }]}
      title="Rent vs Buy Calculator"
      intro="Buying isn’t automatically better. We compare the net cost of owning (interest + maintenance − equity built) against renting (rent − investment growth on your would-be deposit)."
      calculator={<RentVsBuyCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Buying side: amortise the mortgage, add maintenance at ~1%/year, subtract the equity built (paid principal + appreciation). Renting side: total rent paid, minus the investment growth on your would-be deposit at your chosen real return. Excludes SDLT & transaction costs.</p>}
          officialRules={
            <ul>
              <li>Owning costs include: SDLT, legal fees, surveys, maintenance (~1%/yr), insurance.</li>
              <li>UK long-run house growth ~2.5% real (Nationwide, since 1973).</li>
              <li>UK long-run equity return ~5% real (Barclays Equity Gilt Study).</li>
              <li>Time horizon matters — break-even is typically 5–7 years.</li>
            </ul>
          }
          pitfalls={[
            { title: "Excluded SDLT could change the answer", body: "On a £350k second-home purchase, SDLT alone is £20k+. Add to ownership cost." },
            { title: "Maintenance is bigger than you think", body: "Roof, boiler, kitchen, bathroom — 1%/yr is a long-run average but real spend is lumpy." },
            { title: "Optionality has value", body: "Renting lets you move for jobs cheaply. Don’t buy if your time horizon is &lt;3 years." },
          ]}
          faqs={[
            { question: "Are you including imputed rent for owners?", answer: "No — both scenarios assume the same housing services consumed. Just financial flows differ." },
            { question: "What about leverage?", answer: "Buying gives ~10× leverage on the deposit — magnifies both gains and losses. The growth-rate input captures this." },
          ]}
          disclaimer="Educational. Real outcomes depend on local market, life circumstances, and luck."
        />
      }
    />
  );
}
