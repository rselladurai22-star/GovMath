import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PowerOfAttorneyCalculator from "./PowerOfAttorneyCalculator";

export const metadata: Metadata = {
  title: "Power of Attorney Fees Calculator (England & Wales)",
  description: "Work out the total cost of registering Lasting Powers of Attorney — including fee remission and exemption.",
};

export default function PowerOfAttorneyPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025/26 OPG fees"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/power-of-attorney", label: "Power of Attorney Fees" },
      ]}
      title="Power of Attorney Fees"
      intro="A Lasting Power of Attorney (LPA) lets someone make decisions for you if you lose mental capacity. The Office of the Public Guardian charges £82 per LPA — but many people qualify for a discount."
      calculator={<PowerOfAttorneyCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>£82 per LPA. Most couples register 4 LPAs (one Property &amp; Finance, one Health &amp; Welfare, each). Half-off if your gross income is under £12,000. Free if on certain means-tested benefits.</p>
          }
          officialRules={
            <ul>
              <li>Two LPA types: Property &amp; Financial Affairs, and Health &amp; Welfare. Each needs separate registration.</li>
              <li>Register at gov.uk/power-of-attorney — process takes 8–10 weeks.</li>
              <li>50% fee remission if gross income under £12,000.</li>
              <li>Full exemption if on UC, Income Support, JSA, ESA, Pension Credit guarantee or Housing Benefit.</li>
              <li>Solicitor drafting is optional — many people use the OPG&rsquo;s free online tool.</li>
            </ul>
          }
          pitfalls={[
            { title: "Property LPA without Health LPA", body: "If you lose capacity without a Health &amp; Welfare LPA, even your spouse can&rsquo;t override medical decisions. Most experts recommend both." },
            { title: "Solicitor fees on top", body: "Lawyers typically charge £150–£500 per LPA. The £82 is just the OPG registration." },
            { title: "Re-registration on changes", body: "Want to add or remove an attorney? You can&rsquo;t amend — you must revoke and re-register, paying again." },
          ]}
          faqs={[
            { question: "When does an LPA take effect?", answer: "Property LPA can be used as soon as registered (with your permission). Health LPA only kicks in if you lose capacity." },
            { question: "Can I do it myself?", answer: "Yes — gov.uk has a free step-by-step tool. The £82 is the only mandatory cost." },
            { question: "Scotland and NI?", answer: "Different rules: Continuing/Welfare Power of Attorney in Scotland (£86), Enduring Power of Attorney in NI." },
          ]}
          disclaimer="England &amp; Wales only. Apply at gov.uk/power-of-attorney; always check OPG&rsquo;s current fee before paying."
        />
      }
    />
  );
}
