import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import InvestStudio from "./InvestStudio";
import InvestGuide from "./InvestGuide";

const PATH = "/us/savings/investment-calculator";

export const metadata: Metadata = {
  title: "Investment Calculator: Growth After Fees",
  description:
    "Free investment calculator for 2026. See how a lump sum and monthly investing grow after fund fees and tax, at several returns, in today's dollars.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Investment Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much will I have if I invest $500 a month?",
    a: "Starting with $10,000 and adding $500 a month for 30 years at 7% a year with 0.5% fees, you would have about $595,755, of which $190,000 is your own money. At 4% you would have about $341,591; at 10%, about $1,078,042.",
  },
  {
    q: "What return should I expect from investing?",
    a: "Nobody knows in advance. Broad US stock indexes have averaged roughly 10% a year over very long periods before inflation, with some years down by a third or more. Bonds have earned less. Many planners use 5% to 7% for a mixed portfolio to stay cautious.",
  },
  {
    q: "How much do fund fees really cost?",
    a: "More than they seem, because a fee is charged on the whole balance every year and the money lost can't grow. On $10,000 plus $500 a month for 30 years at 7%, a 1% fee costs about $122,892 compared with no fee, while a 0.05% fee costs about $6,865.",
  },
  {
    q: "What is an expense ratio?",
    a: "The yearly cost of running a mutual fund or ETF, taken from the fund's assets as a percentage. A 0.40% expense ratio costs $40 a year for every $10,000 invested. You never see a bill: it simply lowers the fund's return.",
  },
  {
    q: "What is a good expense ratio?",
    a: "For a broad stock or bond index fund, under 0.10% is common today. In 2025 the average equity mutual fund charged about 0.40% and the average index equity ETF about 0.14%, according to the Investment Company Institute. Actively managed funds often charge more.",
  },
  {
    q: "Is it better to invest a lump sum or monthly?",
    a: "Historically, investing a lump sum at once has usually come out ahead, because markets rise more often than they fall. Investing monthly (dollar-cost averaging) lowers the risk of putting everything in just before a fall. Most people invest monthly anyway, from each paycheck.",
  },
  {
    q: "How are investments taxed in a brokerage account?",
    a: "Dividends and interest are taxed in the year you receive them, even if reinvested. When you sell, the gain over what you paid is taxed: at 0%, 15% or 20% for investments held more than a year, or as ordinary income if held a year or less. High earners may also owe the 3.8% net investment income tax.",
  },
  {
    q: "Should I invest in a 401(k), IRA or taxable account first?",
    a: "Usually tax-advantaged accounts first: a 401(k) up to the employer match, then an IRA or Roth IRA, then more 401(k). A taxable account is for money beyond those limits or that you may need before retirement age without penalties.",
  },
  {
    q: "Why show the result in today's dollars?",
    a: "Because prices rise. At 2.5% inflation, $595,755 in 30 years buys about what $284,022 buys today. That figure is the fairer one for judging whether a plan meets a goal.",
  },
  {
    q: "Does raising my monthly amount make a big difference?",
    a: "Yes. Raising $500 a month by 3% a year, in line with typical raises, lifts the 30-year example from about $595,755 to about $800,377, for $295,452 of contributions instead of $190,000.",
  },
  {
    q: "Can I lose money investing?",
    a: "Yes. Stock and bond prices fall as well as rise, and a fund can be worth less than you paid, especially over short periods. Money you need within a few years is usually safer in a savings account, CD or Treasury bills.",
  },
  {
    q: "How is this different from the compound interest calculator?",
    a: "The compound interest calculator shows growth at a single rate, for savings or investments. This one is built for investing: it takes fund fees off the return, compares several returns side by side, and shows the drag of tax in a taxable brokerage account.",
  },
];

export default async function InvestPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/compound-interest-calculator", "/us/savings/401k-calculator", "/us/savings/roth-ira-calculator", "/us/taxes/capital-gains-tax", "/us/savings/inflation-calculator", "/us/savings/retirement-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Investing"
      title="Investment Calculator"
      lead="See how a lump sum and monthly investing grow after fund fees and tax, at several possible returns, and what the result is worth in today's dollars."
      points={["Fees and their real cost", "Several returns side by side", "Taxable or tax-advantaged", "Free and private"]}
      guide={<InvestGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Investments can lose value and returns are not guaranteed. Not financial advice."
    >
      <InvestStudio query={query} />
    </FlagshipPage>
  );
}
