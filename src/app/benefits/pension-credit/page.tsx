import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PensionCreditCalculator from "./PensionCreditCalculator";

export const metadata: Metadata = {
  title: "Pension Credit Calculator (UK 2025/26)",
  description: "Estimate your weekly Guarantee Credit top-up for pensioners on a low income, including capital tariff rules.",
};

export default function PensionCreditPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/pension-credit", label: "Pension Credit" },
      ]}
      title="Pension Credit Calculator"
      intro="Pension Credit tops up weekly income for pensioners — £227.10 single, £346.60 couple. It&rsquo;s often missed: around 800,000 eligible pensioners don&rsquo;t claim. Even £1 of Pension Credit unlocks a free TV licence, Cold Weather Payments and council tax help."
      calculator={<PensionCreditCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We compare your weekly income (including any &quot;tariff income&quot; from capital over £10,000) to the Guarantee Credit threshold. The gap is your weekly award.
            </p>
          }
          officialRules={
            <ul>
              <li>Must be over State Pension Age and live in the UK.</li>
              <li>Single threshold £227.10/wk; couple threshold £346.60/wk.</li>
              <li>Capital under £10,000 is ignored; above that, £1 tariff income per £500.</li>
              <li>State Pension and most private pension income counts; Attendance Allowance and PIP don&rsquo;t.</li>
            </ul>
          }
          pitfalls={[
            { title: "Capital includes ISA money", body: "Cash and stocks &amp; shares ISAs count towards the £10,000 floor — many pensioners are surprised." },
            { title: "Backdating is limited", body: "Claims can only be backdated 3 months. Don&rsquo;t delay if you&rsquo;re close to the threshold." },
            { title: "Free TV licence over 75", body: "Now linked to Pension Credit, not age alone. Without Pension Credit, the over-75 licence is no longer free." },
          ]}
          faqs={[
            { question: "What other benefits does it unlock?", answer: "Council Tax Reduction, free TV licence over 75, Cold Weather Payments, Housing Benefit, NHS dental/optical, Warm Home Discount." },
            { question: "Does PIP count as income?", answer: "No — PIP, DLA and Attendance Allowance are disregarded for Pension Credit." },
            { question: "Can I work and still get it?", answer: "Yes — earnings count as income. First £5/wk single, £10/wk couple is ignored, then pound-for-pound reduction." },
          ]}
          disclaimer="Estimate only. Apply via gov.uk/pension-credit/how-to-claim or call 0800 99 1234 for a full assessment."
        />
      }
    />
  );
}
