import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BenefitCapCalculator from "./BenefitCapCalculator";

export const metadata: Metadata = {
  title: "Benefit Cap Calculator (UK 2025/26)",
  description: "Check whether your total weekly benefits exceed the UK Benefit Cap for inside or outside Greater London.",
};

export default function BenefitCapPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26 caps"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/benefit-cap", label: "Benefit Cap" },
      ]}
      title="Benefit Cap Calculator"
      intro="The Benefit Cap limits the total weekly benefits a working-age household can receive — unless you qualify for an exemption. We show you the cap that applies and how much would be cut."
      calculator={<BenefitCapCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We compare your total weekly benefits to the annual cap (÷52). Any excess is the weekly reduction the DWP applies — usually by cutting your Universal Credit. The cap is higher in Greater London and higher again for families.
            </p>
          }
          officialRules={
            <ul>
              <li>Greater London: £18,837.36 (single, no kids) or £28,116.72 (family) per year.</li>
              <li>Outside London: £16,395.66 (single, no kids) or £24,496.32 (family) per year.</li>
              <li>Cap is applied weekly — earnings over £846/month (post-tax) trigger the ”in work” exemption.</li>
              <li>9-month grace period after losing a job, if previously worked 50 of last 52 weeks.</li>
            </ul>
          }
          pitfalls={[
            { title: "Carer’s Allowance exempts you", body: "Receiving Carer’s Allowance or the UC carer element removes the cap entirely — many people miss this." },
            { title: "PIP exemption is per household", body: "If anyone in the household (including children) gets PIP or DLA, the whole household is exempt." },
            { title: "Housing Benefit isn’t always cut", body: "On legacy benefits the cap reduces Housing Benefit. On UC it reduces the standard allowance — your rent payment stays the same." },
          ]}
          faqs={[
            { question: "Which benefits count towards the cap?", answer: "UC, Housing Benefit, Child Benefit, Child Tax Credit, JSA, ESA (assessment phase or work-related activity group), Income Support, Maternity Allowance, Bereavement Allowance." },
            { question: "What if my circumstances change?", answer: "Report changes to DWP within a month — moving in/out of London or starting work above the threshold immediately changes your cap position." },
            { question: "Does the cap apply to pensioners?", answer: "No — the Benefit Cap only applies to working-age households. Anyone over State Pension Age is exempt." },
          ]}
          disclaimer="Estimate only. Use turn2us.org.uk or contact your local Jobcentre for a full assessment."
        />
      }
    />
  );
}
