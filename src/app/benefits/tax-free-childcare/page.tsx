import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ChildcareCalculator from "./ChildcareCalculator";

export const metadata: Metadata = {
  title: "Tax-Free Childcare Calculator (UK)",
  description: "Government adds 25% to childcare costs — up to £2,000 per child per year (£4,000 if disabled).",
};

export default function ChildcarePage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="25% top-up"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Benefits" }, { href: "/benefits/tax-free-childcare", label: "Tax-Free Childcare" }]}
      title="Tax-Free Childcare Calculator"
      intro="For every £8 you pay into a Tax-Free Childcare account, the government adds £2 — up to £2,000 per child per year (£4,000 for disabled children)."
      calculator={<ChildcareCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>The 25% top-up applies until you hit the annual cap. £10k of paid-in funds gets you the maximum £2k top-up; anything beyond is unmatched.</p>}
          officialRules={
            <ul>
              <li>Child must be under 12 (or 17 if disabled).</li>
              <li>Both parents must each earn at least £166/week and under £100k.</li>
              <li>Can’t combine with Universal Credit childcare or vouchers.</li>
              <li>Reconfirm eligibility every 3 months.</li>
            </ul>
          }
          pitfalls={[
            { title: "£100k cliff edge", body: "If either parent earns over £100k, the entire account closes — even for kids already in it." },
            { title: "Vouchers vs TFC", body: "Childcare vouchers are closed to new entrants but if you’re already in, often better for basic-rate taxpayers." },
            { title: "Forgot to reconfirm", body: "Miss the 3-monthly reconfirmation and the account suspends — no top-ups until renewed." },
          ]}
          faqs={[
            { question: "Does it work with the 30 free hours?", answer: "Yes, you can use both together for hours beyond the 30 free." },
            { question: "Per child or per family cap?", answer: "Per child. £2k cap applies to each child individually." },
          ]}
          disclaimer="Educational. Eligibility rules change — confirm on GOV.UK."
        />
      }
    />
  );
}
