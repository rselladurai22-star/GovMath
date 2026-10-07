import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CompoundStudio from "./CompoundStudio";
import CompoundGuide from "./CompoundGuide";

const PATH = "/us/savings/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator with Deposits",
  description:
    "Free compound interest calculator for 2026. See how savings and investments grow with monthly deposits, daily or monthly compounding, APY and inflation.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Compound Interest Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does compound interest work?",
    a: "Interest is added to your balance, and the next round of interest is paid on the larger total. Over time you earn interest on your interest, so growth speeds up the longer you leave the money alone.",
  },
  {
    q: "How much will $10,000 grow in 10 years?",
    a: "At 5% a year compounded annually, $10,000 grows to $16,289. Compounded monthly it reaches $16,470, and daily $16,487. At 7% compounded monthly it grows to $20,097.",
  },
  {
    q: "What is the formula for compound interest?",
    a: "For a single deposit, A = P × (1 + r/n)^(n×t), where P is the starting amount, r the yearly rate as a decimal, n how many times a year interest is added and t the number of years. Regular deposits are added month by month, which the calculator does for you.",
  },
  {
    q: "What is the difference between APR and APY?",
    a: "APR is the yearly rate before compounding. APY (annual percentage yield) includes the effect of compounding, so it shows what you actually earn in a year. A 5% rate compounded monthly has an APY of 5.116%. Banks must quote APY on savings accounts under the Truth in Savings Act.",
  },
  {
    q: "What is the rule of 72?",
    a: "Divide 72 by the yearly interest rate to estimate how many years it takes money to double. At 6% that is 12 years; the exact figure is 11.9 years. It works best for rates between about 4% and 12%.",
  },
  {
    q: "Is daily compounding much better than monthly?",
    a: "Only slightly. $10,000 at 5% for 10 years earns $17 more with daily compounding than monthly. The rate itself and how long you save matter far more than how often interest is added.",
  },
  {
    q: "What rate should I use?",
    a: "For a savings account or CD, use its APY. For a stock index fund over the long run, many people use 6% to 7% a year before inflation, but returns vary widely from year to year and are never guaranteed.",
  },
  {
    q: "How is interest on savings taxed?",
    a: "Interest from savings accounts, CDs and money market accounts is taxed as ordinary income in the year it is credited, even if you leave it in the account. Banks send Form 1099-INT if you earn $10 or more. Growth inside a 401(k) or IRA isn't taxed each year.",
  },
  {
    q: "Why show the balance in today's dollars?",
    a: "Because prices rise. At 2.5% inflation, $144,573 in 20 years buys about what $88,229 buys today. The today's-dollars figure shows the real value of your money.",
  },
  {
    q: "Does compound interest work against me on debt?",
    a: "Yes. Credit card interest compounds too. A $5,000 balance at 22% APR left unpaid, with interest compounding monthly, would grow to about $14,872 in five years.",
  },
  {
    q: "Can I enter a negative rate?",
    a: "Yes. Investments can lose value, and entering a negative rate shows the effect of a poor run of returns. A savings account at a bank insured by the FDIC won't lose value, though inflation can still reduce what it buys.",
  },
  {
    q: "Does it matter when in the month I deposit?",
    a: "A little. The calculator assumes deposits at the end of each month. Depositing at the start of the month earns one extra month of interest on each deposit, a small difference over most periods.",
  },
];

export default async function CompoundPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/savings-goal-calculator", "/us/savings/cd-calculator", "/us/savings/401k-calculator", "/us/savings/retirement-calculator", "/us/loans/credit-card-payoff", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings and investments"
      title="Compound Interest Calculator"
      lead="See how your savings or investments grow with compound interest and monthly deposits, in future dollars and in today's dollars."
      points={["Monthly deposits", "Daily to yearly compounding", "APY and doubling time", "Free and private"]}
      guide={<CompoundGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Investment returns are not guaranteed. Not financial advice."
    >
      <CompoundStudio query={query} />
    </FlagshipPage>
  );
}
