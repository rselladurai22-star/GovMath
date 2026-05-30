import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CouncilTaxBandsCalculator from "./CouncilTaxBandsCalculator";

export const metadata: Metadata = {
  title: "Council Tax Bands Calculator (UK 2025/26)",
  description: "Estimate your annual council tax from your band and nation — England, Wales or Scotland.",
};

export default function CouncilTaxBandsPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="2025/26 averages"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Property" },
        { href: "/property/council-tax-bands", label: "Council Tax Bands" },
      ]}
      title="Council Tax Bands Calculator"
      intro="Council tax is set by each local authority, but the band ratio is fixed nationally. We multiply your band’s share by the national Band D average — close enough for budgeting."
      calculator={<CouncilTaxBandsCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Each band has a fixed share of a Band D bill (A = 6/9, B = 7/9, … H = 18/9 in England & Wales; Scotland uses a different 2017 schedule). We multiply your nation’s national Band D average by your band’s ratio.
            </p>
          }
          officialRules={
            <ul>
              <li>Bands set on 1 April 1991 values (England, Scotland) or 1 April 2003 (Wales).</li>
              <li>England & Scotland: 8 bands (A–H). Wales: 9 bands (A–I).</li>
              <li>25% single-person discount; 50% if all residents are disregarded (e.g. all full-time students).</li>
              <li>Empty homes can attract a 100–300% premium after 1–10 years.</li>
            </ul>
          }
          pitfalls={[
            { title: "National average is just that — average", body: "Local rates vary by 30–40% even within the same band. Always check the actual bill from your council." },
            { title: "Wales has an extra band I", body: "Properties valued over £424,000 (2003 values) fall in Band I — pay 21/9 of Band D." },
            { title: "Challenging your band", body: "If neighbours in identical houses are in a lower band, you can ask the VOA to review yours. It can go up as well as down." },
          ]}
          faqs={[
            { question: "How do I find my band?", answer: "Search your postcode at gov.uk/council-tax-bands. The Valuation Office Agency keeps the register." },
            { question: "Why is my real bill different?", answer: "Your council sets the precept on top of the Band D base. London boroughs and inner-city councils tend to be cheaper than rural ones." },
            { question: "What if I pay over 10 vs 12 months?", answer: "Default is 10 instalments (April–January). You can ask to spread over 12 months — same total, lower monthly amount." },
          ]}
          disclaimer="Estimates based on national Band D averages (April 2025). Your actual bill is set by your local authority — check gov.uk/council-tax."
        />
      }
    />
  );
}
