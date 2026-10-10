import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import GoalStudio from "./GoalStudio";
import GoalGuide from "./GoalGuide";

const PATH = "/us/savings/savings-goal-calculator";

export const metadata: Metadata = {
  title: "Savings Goal Calculator: Monthly Amount",
  description:
    "Free savings goal calculator for 2026. Find how much to save each month to reach a goal by a date, or how long your monthly saving takes, with interest.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Savings Goal Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much do I need to save each month to reach my goal?",
    a: "Take what you still need, allow for the interest your savings will earn, and spread it over the months you have. To grow $2,000 into $15,000 in 12 months at 4% a year, you need to save about $1,057 a month. The calculator does the sum for any goal.",
  },
  {
    q: "How long will it take to reach my savings goal?",
    a: "Switch the calculator to \"I know my monthly amount\". Saving $500 a month from $2,000 toward $15,000 at 4% takes 25 months.",
  },
  {
    q: "How big should my emergency fund be?",
    a: "A common guide is three to six months of essential expenses: housing, food, utilities, transport, insurance and minimum debt payments. If your income is irregular or you are the only earner, aim for the higher end. Start with a smaller target, such as $1,000, if the full amount feels out of reach.",
  },
  {
    q: "Where should I keep money for a savings goal?",
    a: "For goals within about five years, a high-yield savings account, money market account or CD at an FDIC-insured bank or NCUA-insured credit union. Your money is protected up to $250,000 per depositor, per institution, per ownership category, and won't fall in value like stocks can.",
  },
  {
    q: "How much interest does a high-yield savings account pay?",
    a: "The best online accounts paid around 4% APY in September 2026, while the FDIC's national average for savings accounts was about 0.38%. Rates are variable and change with Federal Reserve decisions, so check current rates before you choose.",
  },
  {
    q: "How much should I save for a down payment?",
    a: "20% avoids private mortgage insurance on a conventional loan: $60,000 on a $300,000 home. Many buyers put down less; some loans allow 3% to 3.5%. Remember closing costs, often 2% to 5% of the price, on top.",
  },
  {
    q: "Is the interest on my savings taxed?",
    a: "Yes. Interest is taxed as ordinary income in the year it is credited, and your bank sends Form 1099-INT if you earn $10 or more. The calculator doesn't take tax off, so your real interest will be a little lower.",
  },
  {
    q: "Should I save or pay off debt first?",
    a: "Build a small emergency fund first, so a surprise bill doesn't go on a credit card. Then pay down high-interest debt such as credit cards, which usually costs far more than savings earn, while getting any 401(k) match.",
  },
  {
    q: "What if I can't afford the monthly amount?",
    a: "Push the deadline back, lower the goal, or start with what you can and raise it later. Setting up an automatic transfer on payday makes saving easier to stick with.",
  },
  {
    q: "Does the calculator assume deposits at the start or end of the month?",
    a: "The end of each month, with interest added monthly at the rate you enter. Depositing at the start of the month would get you there very slightly sooner.",
  },
  {
    q: "Should I use a CD for my goal?",
    a: "If you know exactly when you need the money, a CD can lock in a rate for that term. You usually pay a penalty, often a few months of interest, to take money out early, so keep your emergency fund in an account you can reach at any time.",
  },
];

export default async function GoalPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/compound-interest-calculator", "/us/savings/cd-calculator", "/us/housing/mortgage-affordability", "/us/savings/retirement-calculator", "/us/loans/debt-payoff-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Plan a goal"
      title="Savings Goal Calculator"
      lead="Find how much to save each month to reach a goal by a date, or how long your monthly saving will take, with interest added."
      points={["Two ways to plan", "Interest included", "Month-by-month chart", "Free and private"]}
      guide={<GoalGuide />}
      faqs={FAQS}
      related={related}
      note="Assumes a steady interest rate and monthly deposits. Not financial advice."
    >
      <GoalStudio query={query} />
    </FlagshipPage>
  );
}
