import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RemortgageStudio from "./RemortgageStudio";
import { ogFor } from "@/gm/og";
import RemortgageGuide from "./RemortgageGuide";

export const metadata: Metadata = {
  title: "Remortgage Calculator UK: How Much Could I Save?",
  description:
    "Free remortgage calculator. Compare your current or standard variable rate with a new deal after fees and early repayment charges, and see the break-even.",
  alternates: { canonical: "/property/remortgage" },
  openGraph: ogFor("/property/remortgage"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/remortgage", label: "Remortgage Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much could I save by remortgaging?", a: "Moving £200,000 with 20 years left from 7.5% to 4.5% cuts payments by about £346 a month, or about £10,900 over 2 years after a £999 fee." },
  { q: "When should I start looking to remortgage?", a: "Up to 6 months before your deal ends. Many lenders let you secure a rate that far ahead." },
  { q: "Is it worth paying an arrangement fee?", a: "On larger mortgages a lower rate with a fee is often cheaper. On smaller ones a fee-free deal can win. Compare over the deal's length." },
  { q: "Should I add the fee to my mortgage?", a: "It avoids paying upfront, but you pay interest on it for the whole term. Pay it upfront if you can." },
  { q: "What is an early repayment charge?", a: "A charge, often 1% to 5% of the balance, for leaving a fixed or tracker deal before it ends." },
  { q: "What is a product transfer?", a: "A new deal with your current lender. It is quicker, with no legal work and often no affordability check." },
  { q: "Does remortgaging affect my credit score?", a: "A new lender runs a credit check, which leaves a mark on your file. A product transfer usually does not." },
  { q: "How long does remortgaging take?", a: "Usually 4 to 8 weeks with a new lender; a product transfer can be done in days." },
  { q: "Can I remortgage to borrow more?", a: "Yes, subject to affordability and your home's value. Spreading debt over a long term can cost more interest overall." },
  { q: "What happens if I do nothing when my deal ends?", a: "You move onto your lender's standard variable rate, which is usually much higher than new deals." },
  { q: "Can I change my mortgage term when I remortgage?", a: "Yes. A shorter term raises payments but saves interest; a longer one lowers payments but costs more overall." },
  { q: "Should I fix for two or five years?", a: "A two-year fix gives flexibility if rates fall; a five-year fix gives longer certainty and fewer fees." },
  { q: "Will remortgaging lower my credit score?", a: "A new lender's hard search shows on your file and may lower your score slightly for a short time; it recovers quickly if you keep up payments." },
  { q: "Can I remortgage if I am self-employed?", a: "Yes. Lenders usually ask for two years of accounts or tax calculations to prove your income." },
];

export default async function RemortgagePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/mortgage-repayment", "/property/mortgage-overpayment", "/property/mortgage-affordability", "/property/rent-vs-buy", "/property/moving-house-budget", "/investing/savings-interest"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026"
      title="Remortgage Calculator"
      lead="Compare staying on your current rate with a new deal, after fees and any early repayment charge, and see when switching pays off."
      points={["Monthly saving", "Fees and ERCs", "Break-even point", "Free and private"]}
      guide={<RemortgageGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration. Lenders decide rates, fees and what you can borrow."
    >
      <RemortgageStudio query={query} />
    </FlagshipPage>
  );
}
