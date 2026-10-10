import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HelocStudio from "./HelocStudio";
import HelocGuide from "./HelocGuide";

export const metadata: Metadata = {
  title: "HELOC Calculator: Limit and Payments",
  description:
    "Free HELOC calculator for 2026. See how much you can borrow at your lender's CLTV limit, the interest-only draw payment and the payment once repayment starts.",
  alternates: { canonical: "/us/housing/heloc-calculator" },
  openGraph: ogFor("/us/housing/heloc-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/heloc-calculator", label: "HELOC Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much can I borrow with a HELOC?",
    a: "Usually up to 80% to 85% of your home's value, minus what you owe. On a $500,000 home with a $300,000 mortgage, an 85% limit allows a line of $125,000.",
  },
  {
    q: "What is CLTV?",
    a: "Combined loan-to-value: all loans secured on the home, including the new line, as a share of its value. A $300,000 mortgage plus a $125,000 HELOC on a $500,000 home is an 85% CLTV.",
  },
  {
    q: "What is the HELOC rate today?",
    a: "Most HELOCs charge the prime rate plus a margin. Prime was about 7.00% in October 2026, after the Federal Reserve raised its target range on September 16, 2026. Bankrate's average HELOC rate was about 7.33% on October 7, 2026.",
  },
  {
    q: "What is the monthly payment on a $50,000 HELOC?",
    a: "At 7.5%, about $312.50 a month interest-only during a 10-year draw period, then $402.80 a month over a 20-year repayment period, if the rate stays the same.",
  },
  {
    q: "What happens when the draw period ends?",
    a: "You can no longer borrow, and the payment switches to principal and interest, so it rises. On $50,000 at 7.5% it goes from $312.50 to $402.80 a month. Some lines instead require the whole balance as a balloon payment.",
  },
  {
    q: "Can my HELOC rate go up?",
    a: "Yes. The rate follows prime and can change whenever prime does. Your agreement sets a lifetime cap. On $50,000, each point on prime adds about $42 a month in the draw period.",
  },
  {
    q: "Do I have to pay principal during the draw period?",
    a: "Usually not, but you can. Paying principal early lowers the interest and softens the payment jump when repayment starts.",
  },
  {
    q: "Is HELOC interest tax deductible?",
    a: "Only if you itemize and use the money to buy, build or substantially improve the home that secures it, within the $750,000 cap on total mortgage debt. That rule is now permanent.",
  },
  {
    q: "Are there closing costs on a HELOC?",
    a: "Often few or none, but look for an appraisal fee, an annual fee of $50 to $100, draw fees and an early closure fee if you close the line within about three years.",
  },
  {
    q: "Is a HELOC better than a home equity loan?",
    a: "A HELOC suits costs spread over time and quick repayment; a home equity loan suits one known cost and a fixed payment. In October 2026, average HELOC rates (about 7.33%) were below 10-year home equity loans (about 8.66%), but HELOC rates can rise.",
  },
  {
    q: "Can a lender freeze my HELOC?",
    a: "Yes. Federal rules let a lender freeze or cut the line if your home's value falls significantly or your finances change so it believes you cannot repay.",
  },
  {
    q: "Does a HELOC affect my credit score?",
    a: "Applying causes a hard inquiry. After that, paying on time helps, and a large balance can count against you. Lenders also count the payment in your debt-to-income ratio.",
  },
];

export default async function HelocPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/home-equity-loan-calculator",
      "/us/housing/refinance-calculator",
      "/us/housing/mortgage-calculator",
      "/us/loans/debt-to-income-ratio",
      "/us/loans/debt-payoff-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Borrowing limit, draw and repayment"
      title="HELOC Calculator"
      lead="Find out how much you could borrow on a home equity line of credit, and what you would pay in the interest-only draw period and once repayment starts."
      points={["Borrowing limit by CLTV", "Prime plus margin rate", "Draw and repayment payments", "Rate rise stress test"]}
      guide={<HelocGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <HelocStudio query={query} />
    </FlagshipPage>
  );
}
