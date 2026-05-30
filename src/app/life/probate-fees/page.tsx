import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ProbateFeesCalculator from "./ProbateFeesCalculator";

export const metadata: Metadata = {
  title: "Probate Fees Calculator (UK 2025/26)",
  description: "Work out the probate application fee plus the cost of extra sealed copies of the grant.",
};

export default function ProbateFeesPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025/26 fees"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/probate-fees", label: "Probate Fees" },
      ]}
      title="Probate Fees Calculator"
      intro="Probate is the legal right to deal with someone’s estate after they die. Estates over £5,000 pay a flat £300 application fee — plus £1.50 for each extra sealed copy of the grant."
      calculator={<ProbateFeesCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Estates worth £5,000 or less pay nothing. Above £5,000 it’s a flat £300, regardless of estate size.
              Extra sealed copies of the grant cost £1.50 each — useful for sending to banks, registrars and pension providers in parallel.
            </p>
          }
          officialRules={
            <ul>
              <li>Same £300 fee whether you apply yourself (PA1P/PA1A) or through a solicitor.</li>
              <li>Solicitor’s own fees are separate and not regulated.</li>
              <li>Fee waivers are available if paying causes financial hardship (form EX160).</li>
              <li>Excepted estates with no IHT due can be applied for online.</li>
            </ul>
          }
          pitfalls={[
            { title: "Order enough copies up-front", body: "Banks and pension providers usually want their own sealed copy. Getting more later means another application." },
            { title: "Estate value ≠ IHT value", body: "The probate fee is based on the gross estate before debts. IHT uses a different (net) calculation." },
            { title: "Joint assets bypass probate", body: "Anything held as joint tenants passes automatically and doesn’t count towards the probate threshold." },
          ]}
          faqs={[
            { question: "Do I always need probate?", answer: "Not always — small estates or those held entirely in joint names may not need it. Banks set their own thresholds (usually £5,000–£50,000)." },
            { question: "How long does probate take?", answer: "Around 16 weeks from a complete online application in 2025. Paper or complex estates can take 6+ months." },
            { question: "Can I pay the fee from the estate?", answer: "Yes — most banks release funds directly to the Probate Registry to cover the fee before the grant is issued." },
          ]}
          disclaimer="Fees current as of April 2025. Check gov.uk/applying-for-probate for the latest figures before applying."
        />
      }
    />
  );
}
