import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FTBCalculator from "./FTBCalculator";

export const metadata: Metadata = {
  title: "First-Time Buyer SDLT Calculator (England & NI, 2025/26)",
  description: "Stamp Duty for first-time buyers in England & Northern Ireland — nil rate to £300k, 5% to £500k, no relief above.",
};

export default function FTBPage() {
  return (
    <CalculatorShell
      category="Mortgages & Property"
      updatedLabel="April 2025 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Mortgages & Property" }, { href: "/property/first-time-buyer", label: "First-Time Buyer" }]}
      title="First-Time Buyer SDLT Calculator"
      intro="Since April 2025, English & NI first-time buyers pay 0% SDLT to £300,000 then 5% to £500,000. Above £500k you lose the relief entirely and pay standard rates from £1."
      calculator={<FTBCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>FTB rates apply only if the price is £500,000 or less. Buy at £500,001 and the relief disappears completely — standard SDLT applies from the first pound. That cliff edge has caught many buyers near the threshold.</p>
          }
          officialRules={
            <ul>
              <li>FTB nil rate: £0 to £300,000.</li>
              <li>5% on £300,001 to £500,000.</li>
              <li>Above £500,000: <strong>full SDLT</strong>, no relief, from £1.</li>
              <li>You must never have owned a residential property anywhere in the world, jointly or solely.</li>
              <li>If buying with someone, ALL buyers must qualify as FTBs.</li>
            </ul>
          }
          pitfalls={[
            { title: "Joint purchase ruins it if your partner has owned property", body: "Bought a flat with an ex 5 years ago? Even if you sold, you’re no longer a FTB. Both must qualify or relief is denied entirely." },
            { title: "Overseas property counts", body: "Inherited a share of a holiday flat in Spain at 21? You’ve technically owned residential property and lose FTB status forever." },
            { title: "The £500k cliff is brutal", body: "At £500,000 you pay £10,000 SDLT (5% on £200k). At £500,001 you pay £12,500 (standard rates). That extra £1 of price costs £2,500." },
          ]}
          faqs={[
            { question: "Does new-build help?", answer: "No SDLT difference — new-build vs existing is irrelevant. But many developers offer to pay stamp duty as an incentive." },
            { question: "What about Shared Ownership?", answer: "You can choose to pay SDLT on the share you buy (Market Value election) or staged as you staircase. We have a separate Shared Ownership calculator." },
          ]}
          disclaimer="England & Northern Ireland only. Scotland uses LBTT (separate FTB nil band to £175k). Wales has no FTB relief."
        />
      }
    />
  );
}
