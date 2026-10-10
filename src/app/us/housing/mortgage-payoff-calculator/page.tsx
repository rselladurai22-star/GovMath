import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PayoffStudio from "./PayoffStudio";
import PayoffGuide from "./PayoffGuide";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator: Pay Off Early",
  description:
    "Free mortgage payoff calculator for 2026. See your new payoff date and interest saved with extra, biweekly or lump sum payments, or the extra for a target date.",
  alternates: { canonical: "/us/housing/mortgage-payoff-calculator" },
  openGraph: ogFor("/us/housing/mortgage-payoff-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/mortgage-payoff-calculator", label: "Mortgage Payoff Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much sooner will I pay off my mortgage with $200 extra a month?",
    a: "On $300,000 at 6.5% with 27 years left, $200 a month ends the loan 5 years 7 months early and saves $81,179 of interest. The calculator works it out for your own balance and rate.",
  },
  {
    q: "Do biweekly payments really save money?",
    a: "Yes, because 26 half payments make 13 full payments a year instead of 12. On the same loan that saves $69,864 and 4 years 9 months. You get the same effect by adding one-twelfth of your payment each month, without any program fee.",
  },
  {
    q: "How much extra do I need to pay to finish in 15 years?",
    a: "On $300,000 at 6.5% with 27 years left, $646.66 a month. Choose \"Pick a payoff date\" to find the exact figure for your loan.",
  },
  {
    q: "Is it better to pay off my mortgage or invest?",
    a: "Prepaying earns your mortgage rate with no risk. Investing wins only if it earns more than that after tax and you can live with the ups and downs. Below your mortgage rate, prepaying comes out ahead.",
  },
  {
    q: "Should I pay off a 3% mortgage early?",
    a: "Usually not before building savings: safe accounts and Treasury bills have paid more than 3%. On $250,000 at 3% with 25 years left, investing $300 a month at 4.5% instead of prepaying leaves $24,928 more by the original payoff date.",
  },
  {
    q: "Does paying extra lower my monthly payment?",
    a: "No. The required payment stays the same and the loan ends sooner. To lower the payment after a lump sum, ask your servicer about a recast.",
  },
  {
    q: "Is there a penalty for paying off a mortgage early?",
    a: "Most mortgages have none. Where federal rules allow one, it can only apply in the first three years of the loan. Your Closing Disclosure and note say whether your loan has one.",
  },
  {
    q: "Is a lump sum or a monthly extra better?",
    a: "Money paid sooner saves more. $10,000 now saves $43,305 on the example loan, while $100 a month, $28,500 in all, saves $46,838. A lump sum wins per dollar; a monthly plan is easier for most budgets.",
  },
  {
    q: "How do I make sure extra payments go to principal?",
    a: "Choose \"additional principal\" when paying online, or write it on the check. Then check your next statement: the balance should fall by the extra on top of the normal principal.",
  },
  {
    q: "Will paying extra get rid of PMI sooner?",
    a: "Yes. You can ask to cancel PMI once the balance reaches 80% of the home's original value, and extra payments get you there sooner. Ask your servicer in writing.",
  },
  {
    q: "What is a mortgage payoff amount?",
    a: "The exact sum needed to close the loan on a given day: the balance plus interest up to that day and any fees. Ask your servicer for a payoff statement before the last payment.",
  },
  {
    q: "Does paying off my mortgage affect my taxes?",
    a: "Only if you itemize, because you lose the mortgage interest deduction. Most households take the standard deduction ($32,200 for married couples filing jointly in 2026), so for them nothing changes.",
  },
];

export default async function PayoffPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/amortization-calculator",
      "/us/housing/mortgage-calculator",
      "/us/housing/refinance-calculator",
      "/us/savings/compound-interest-calculator",
      "/us/loans/debt-payoff-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Extra, biweekly or a target date"
      title="Mortgage Payoff Calculator"
      lead="See how much sooner you could own your home with extra, biweekly or lump sum payments, find the extra needed for a target date, and compare it with investing."
      points={["New payoff date", "Interest saved", "Extra needed for a target date", "Prepay vs invest"]}
      guide={<PayoffGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not financial advice."
    >
      <PayoffStudio query={query} />
    </FlagshipPage>
  );
}
