import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import StatePensionAgeCalculator from "./StatePensionAgeCalculator";

export const metadata: Metadata = {
  title: "UK State Pension Age Calculator",
  description: "Find your State Pension Age based on your date of birth, including transitional months for those born 1960–1961 and 1977–1978.",
};

export default function StatePensionAgePage() {
  return (
    <CalculatorShell
      category="Investing & Pensions"
      updatedLabel="Pensions Act 2014"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/investing", label: "Investing & Pensions" },
        { href: "/investing/state-pension-age", label: "State Pension Age" },
      ]}
      title="State Pension Age Calculator"
      intro="Your State Pension Age (SPA) depends entirely on your date of birth. We apply the Pensions Act 2014 rules, including the sliding-scale transitions for 1960–61 and 1977–78 births."
      calculator={<StatePensionAgeCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We compare your date of birth to the legislated bands: SPA = 66 for births before 6 Apr 1960, 67 for births 6 Mar 1961 – 5 Apr 1977, and 68 for births from 6 Apr 1978. Births in the two transition windows get a sliding extra month per month of DOB.
            </p>
          }
          officialRules={
            <ul>
              <li>State Pension is currently <strong>£221.20/week</strong> (full new State Pension, 2024/25 onwards) — uprated annually by the triple lock.</li>
              <li>You need at least 10 qualifying years of National Insurance to get any State Pension; 35 years for the full amount.</li>
              <li>You can defer claiming — pension increases by ~5.8% for every full year deferred.</li>
              <li>SPA review every 5 years; next review reports 2026.</li>
            </ul>
          }
          pitfalls={[
            { title: "Not the same as your private pension", body: "Workplace and personal pensions can usually be accessed from age 55 (rising to 57 in 2028). SPA only governs the State Pension." },
            { title: "Future law changes", body: "The rise to 68 may be brought forward. Plan for it but don’t budget on it changing." },
            { title: "NI gaps cost more than you think", body: "Each missing year cuts ~£6/week from your eventual pension — £312/year, for the rest of your life. Voluntary Class 3 NI top-up is £907.40/year." },
          ]}
          faqs={[
            { question: "Can I check my NI record online?", answer: "Yes — sign in to your Personal Tax Account on gov.uk to see qualifying years and any gaps you could fill." },
            { question: "Does this account for Pension Credit?", answer: "No — Pension Credit is a separate top-up for low-income pensioners. Eligibility starts at State Pension Age." },
            { question: "What if I work past SPA?", answer: "You can claim and keep working, or defer to boost the rate. National Insurance stops once you hit SPA." },
          ]}
          disclaimer="Based on Pensions Act 2014 as enacted. Government reviews SPA every 5 years — always confirm at gov.uk/state-pension-age."
        />
      }
    />
  );
}
