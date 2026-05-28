import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FlatRateVATCalculator from "./FlatRateVATCalculator";

export const metadata: Metadata = {
  title: "Flat Rate VAT Calculator (UK)",
  description: "Compare standard vs Flat Rate VAT scheme for your trade.",
};

export default function FlatRateVATPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="FRS rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/flat-rate-vat", label: "Flat Rate VAT" }]}
      title="Flat Rate VAT Calculator"
      intro="The Flat Rate Scheme lets you pay HMRC a fixed % of your VAT-inclusive turnover instead of tracking input VAT. Great for service businesses with low expenses, terrible if you spend a lot on VAT-able goods."
      calculator={<FlatRateVATCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Standard scheme: VAT collected (1/6 of gross sales) − input VAT on expenses. FRS: industry-specific % × VAT-inclusive turnover. Difference = annual saving (or loss) from joining FRS.</p>}
          officialRules={
            <ul>
              <li>Eligible if VAT-able turnover under £150k.</li>
              <li>Must leave when turnover exceeds £230k.</li>
              <li>1% first-year discount for newly-VAT-registered businesses.</li>
              <li>&lsquo;Limited cost trader&rsquo; rate of 16.5% applies if goods cost &lt;2% of turnover (or under £1,000/yr).</li>
            </ul>
          }
          pitfalls={[
            { title: "Limited cost trader trap", body: "Most consultants and IT contractors fall in this category. The 16.5% rate usually wipes out the FRS benefit." },
            { title: "Can&rsquo;t reclaim capital goods", body: "Except items over £2,000 — laptops, machinery, etc." },
            { title: "Charge 20% to customers", body: "Even on FRS, you still invoice 20% VAT. You just keep the difference." },
          ]}
          faqs={[
            { question: "What rate applies to me?", answer: "Look up gov.uk &lsquo;VAT Flat Rate Scheme&rsquo;. IT consultants 14.5%, journalists 12.5%, hairdressers 13%, etc." },
            { question: "Can I switch later?", answer: "Yes — give 30 days notice. You can&rsquo;t rejoin within 12 months of leaving." },
          ]}
          disclaimer="Indicative comparison. Check the latest FRS rates and your specific business category."
        />
      }
    />
  );
}
