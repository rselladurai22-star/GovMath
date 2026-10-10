import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AffordStudio from "./AffordStudio";
import AffordGuide from "./AffordGuide";

export const metadata: Metadata = {
  title: "How Much House Can I Afford? Calculator",
  description:
    "Free home affordability calculator for 2026. See the home price your income supports under the 28/36 rule, 43% or FHA limits, and what more cash down changes.",
  alternates: { canonical: "/us/housing/mortgage-affordability" },
  openGraph: ogFor("/us/housing/mortgage-affordability"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/mortgage-affordability", label: "Home Affordability Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much house can I afford on $100,000 a year?",
    a: "Under the 28/36 rule, with $500 of other monthly debts, $40,000 down and a 7.25% 30-year loan, about $306,000. The monthly payment would be about $2,333 including tax, insurance and PMI.",
  },
  {
    q: "What is the 28/36 rule?",
    a: "A guideline that housing costs should be no more than 28% of gross monthly income, and all debts including housing no more than 36%.",
  },
  {
    q: "What debt-to-income ratio do lenders allow?",
    a: "It depends on the loan. Fannie Mae allows up to 36% for manually underwritten loans, up to 45% with strong credit and reserves, and up to 50% through its automated system. FHA's standard limits are 31% and 43%.",
  },
  {
    q: "Is the income before or after tax?",
    a: "Before tax. Lenders use gross income for the ratios, so check the resulting payment against your take-home pay too.",
  },
  {
    q: "Does a bigger down payment help?",
    a: "Yes. In the example, raising the down payment from $40,000 to $60,000 raises the price by about $18,000, and reaching 20% down removes PMI, which adds more.",
  },
  {
    q: "Why does paying off debt raise what I can afford?",
    a: "When the all-debts limit binds, each dollar of monthly debt you clear can go on the housing payment instead.",
  },
  {
    q: "How do interest rates affect affordability?",
    a: "Higher rates mean more of the payment goes on interest. On $100,000 a year, the price you can afford falls from about $337,000 at 6% to about $290,000 at 8%.",
  },
  {
    q: "What counts as debt?",
    a: "Monthly payments on car, student and personal loans, credit card minimums, and child support or alimony you pay. Rent, utilities and groceries are not counted.",
  },
  {
    q: "Does the calculator include property tax and insurance?",
    a: "Yes. The payment includes principal and interest, property tax, homeowners insurance, PMI and HOA dues, as lenders count them.",
  },
  {
    q: "What is a front-end ratio?",
    a: "Your total housing payment divided by gross monthly income. The back-end ratio adds your other debt payments.",
  },
  {
    q: "Should I borrow the maximum I am approved for?",
    a: "Not necessarily. Approval is based on gross pay and does not count savings goals, childcare or repairs. Many buyers choose a lower price for breathing room.",
  },
  {
    q: "How much house can I afford with a $60,000 salary?",
    a: "Under the 28/36 rule, with $500 of other monthly debts, $40,000 down and a 7.25% 30-year loan, about $186,000. Here the all-debts limit binds, leaving $1,300 a month for housing.",
  },
  {
    q: "Does the calculator work for FHA loans?",
    a: "Yes. Choose FHA's 31/43 limits under More options and enter the annual mortgage insurance premium as the PMI rate (0.55% a year on most 30-year FHA loans with less than 5% down). FHA also charges an upfront premium, usually added to the loan.",
  },
];

export default async function AffordPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-calculator", "/us/housing/rent-affordability", "/us/loans/debt-to-income-ratio", "/us/taxes/paycheck-calculator", "/us/loans/debt-payoff-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Based on lenders' debt-to-income limits"
      title="Home Affordability Calculator"
      lead="Find the home price your income supports, which lending rule sets the limit, and how a bigger down payment or fewer debts would change it."
      points={["28/36, 43% and FHA rules", "Full monthly payment", "Down payment scenarios", "Free and private"]}
      guide={<AffordGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan approval or financial advice."
    >
      <AffordStudio query={query} />
    </FlagshipPage>
  );
}
