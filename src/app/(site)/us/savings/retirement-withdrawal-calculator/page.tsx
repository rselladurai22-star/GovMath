import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import WithdrawalStudio from "./WithdrawalStudio";
import WithdrawalGuide from "./WithdrawalGuide";

const PATH = "/us/savings/retirement-withdrawal-calculator";

export const metadata: Metadata = {
  title: "Retirement Withdrawal Calculator",
  description:
    "Free retirement withdrawal calculator for 2026. See how long your savings last at a fixed or percentage withdrawal, and the most you can take each year.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Retirement Withdrawal Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long will $1 million last in retirement?",
    a: "Taking $40,000 a year, raised 2.5% a year for inflation, from $1 million earning 5% a year, the money lasts about 38.9 years. Taking $50,000 a year, it lasts about 27.7 years, and $60,000 about 21.6 years.",
  },
  {
    q: "What is the 4% rule?",
    a: "A rule of thumb from William Bengen's 1994 research: withdraw 4% of your savings in the first year of retirement, then raise the dollar amount with inflation each year. In US market history since 1926, that lasted at least 30 years in every period he tested, with a portfolio of stocks and bonds.",
  },
  {
    q: "Is the 4% rule still safe?",
    a: "It held up in US history, but the future may differ, and it assumes a 30-year retirement and a balanced portfolio. Bengen himself now suggests about 4.7% with a broader mix of investments, while others suggest less for early retirees or when bond yields are low. Treat it as a starting point and review your plan each year.",
  },
  {
    q: "How much can I withdraw to make my money last 30 years?",
    a: "From $1 million earning 5% a year, with withdrawals raised 2.5% a year for inflation, the most you can take in the first year and still last exactly 30 years is about $47,303. A 20-year plan allows about $63,661, and a 40-year plan about $39,356.",
  },
  {
    q: "Should I withdraw a fixed amount or a percentage?",
    a: "A fixed amount, raised with inflation, gives steady income but can run out if returns are poor. A fixed percentage of each year's balance never runs out, but your income falls after bad years. Many retirees use a middle path: a steady base, adjusted a little after very good or very bad years.",
  },
  {
    q: "What is sequence-of-returns risk?",
    a: "The danger that poor returns come early in retirement, while you are withdrawing. In our example, a 20% fall in the first year shortens the life of $1 million at $40,000 a year from about 38.9 years to about 26.1 years, even though every later year earns the same.",
  },
  {
    q: "What return should I assume in retirement?",
    a: "Use a cautious figure after fees. A balanced mix of stocks and bonds might assume 4% to 6% a year before inflation. At 3% a year, $1 million at $40,000 a year rising with inflation lasts about 27 years; at 6%, about 56 years.",
  },
  {
    q: "Are retirement withdrawals taxed?",
    a: "Withdrawals from traditional 401(k)s and IRAs are taxed as ordinary income. Qualified Roth withdrawals are tax-free. In a taxable account you pay capital gains tax only on the gain in what you sell. Enter your average tax rate under More options to see the after-tax income.",
  },
  {
    q: "Do I have to take money out at a certain age?",
    a: "Yes, from traditional IRAs and most 401(k)s. Required minimum distributions start at age 73 for people born from 1951 to 1959, and at 75 for people born in 1960 or later. Roth IRAs have no required withdrawals during the owner's life.",
  },
  {
    q: "Does Social Security change how much I need to withdraw?",
    a: "Yes. Your savings only need to cover the gap between your spending and your guaranteed income. If you spend $70,000 a year and Social Security pays $30,000, you need to withdraw about $40,000. Delaying Social Security raises that income for life.",
  },
  {
    q: "What if my money is running out?",
    a: "Cut spending a little early rather than a lot later, delay or reconsider big purchases, work part time, delay claiming Social Security if you haven't yet, or use part of your savings to buy an annuity for guaranteed income.",
  },
];

export default async function WithdrawalPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/retirement-calculator", "/us/savings/annuity-calculator", "/us/savings/social-security-calculator", "/us/savings/rmd-calculator", "/us/savings/401k-calculator", "/us/savings/inflation-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Retirement income"
      title="Retirement Withdrawal Calculator"
      lead="See how long your savings last at the withdrawal you plan, year by year, and the most you can take each year for your money to last."
      points={["Fixed or percentage withdrawals", "Inflation raises", "Bad-first-year test", "Free and private"]}
      guide={<WithdrawalGuide />}
      faqs={FAQS}
      related={related}
      note="A projection with steady returns. Real returns vary and can be negative. Not financial advice."
    >
      <WithdrawalStudio query={query} />
    </FlagshipPage>
  );
}
