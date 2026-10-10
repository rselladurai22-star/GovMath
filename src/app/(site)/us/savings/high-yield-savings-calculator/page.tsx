import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HysaStudio from "./HysaStudio";
import HysaGuide from "./HysaGuide";

const PATH = "/us/savings/high-yield-savings-calculator";

export const metadata: Metadata = {
  title: "High-Yield Savings Calculator: HYSA vs Regular",
  description:
    "Free high-yield savings calculator for 2026. Compare interest at a high-yield APY with the national average, after tax and fees, with monthly deposits.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "High-Yield Savings Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much interest does a high-yield savings account pay?",
    a: "Top online high-yield accounts paid around 4% to 4.3% APY in early October 2026, against an FDIC national average of 0.37% on September 21, 2026. On $10,000 for a year, that is about $400 of interest instead of $37.",
  },
  {
    q: "How much will $10,000 earn in a high-yield savings account?",
    a: "About $400 in a year at 4% APY. Left for five years with no additions it grows to about $12,167. With $200 a month added, it grows to $25,402 in five years, against $22,296 at 0.37%.",
  },
  {
    q: "Is a high-yield savings account safe?",
    a: "Yes, if the bank is FDIC-insured or the credit union NCUA-insured. Deposits are protected up to $250,000 per depositor, per institution, per ownership category, the same as at any branch bank. The balance can't fall, though the rate can change.",
  },
  {
    q: "Why do online banks pay more?",
    a: "They have no branches to run, so they can pass more of what they earn on to savers. Many large branch banks pay 0.01% to 0.10% on standard savings, which keeps the national average low.",
  },
  {
    q: "Is interest from a high-yield savings account taxed?",
    a: "Yes. It is ordinary income, taxed in the year it is credited even if you leave it in the account. The bank sends Form 1099-INT if you earn $10 or more. Most states tax it too.",
  },
  {
    q: "Can the rate on a high-yield savings account go down?",
    a: "Yes. Savings rates are variable and usually follow the Federal Reserve. If 4% falls to 3% after a year, $10,000 plus $200 a month still grows to $24,634 in five years, $2,338 more than at 0.37%. A CD fixes the rate for its term.",
  },
  {
    q: "Are there withdrawal limits?",
    a: "The federal limit of six convenient withdrawals a month was removed in April 2020, but some banks still set their own limit or charge a fee for extra withdrawals. Transfers to checking usually take one to three business days.",
  },
  {
    q: "What happens above $250,000?",
    a: "Amounts over $250,000 per depositor, per bank, per ownership category aren't insured. Spread larger sums across banks, or use separate ownership categories such as joint accounts. A couple can hold up to $500,000 in joint accounts at one bank.",
  },
  {
    q: "High-yield savings or a CD?",
    a: "A high-yield account lets you take money out at any time but its rate can change. A CD fixes the rate for a term but charges a penalty for early withdrawal. Many people keep an emergency fund in savings and money they won't touch for a year or more in CDs.",
  },
  {
    q: "High-yield savings or a money market account?",
    a: "They are very similar. Money market accounts are insured deposit accounts that may add checks or a debit card, and their rates are often close to high-yield savings rates. Money market funds are different: they are investments, not FDIC insured.",
  },
  {
    q: "Is a high-yield savings account good for long-term savings?",
    a: "Not usually. At 4% with 22% tax and 2.5% inflation, the real return is about 0.60% a year. It is best for an emergency fund and goals within a few years; long-term money usually belongs in investments.",
  },
  {
    q: "Does the calculator include fees?",
    a: "You can add a monthly fee for the regular account under More options. A $5 monthly fee costs $300 over five years, more than the $296 of interest a 0.37% account earns in our example.",
  },
];

export default async function HysaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/cd-calculator", "/us/savings/emergency-fund-calculator", "/us/savings/savings-goal-calculator", "/us/savings/compound-interest-calculator", "/us/taxes/tax-bracket-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="High-Yield Savings Calculator"
      lead="Compare what your savings earn in a high-yield account with a regular one, with monthly deposits, after tax and fees."
      points={["High-yield vs regular", "After tax and fees", "Rate change test", "Free and private"]}
      guide={<HysaGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Savings rates are variable. Not financial advice."
    >
      <HysaStudio query={query} />
    </FlagshipPage>
  );
}
