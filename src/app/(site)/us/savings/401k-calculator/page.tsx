import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import K401Studio from "./K401Studio";
import K401Guide from "./K401Guide";

const PATH = "/us/savings/401k-calculator";

export const metadata: Metadata = {
  title: "401(k) Calculator 2026: Match, Limits, Growth",
  description:
    "Free 401(k) calculator for 2026. See your balance at retirement with your employer match, the $24,500 limit, catch-up contributions, fees and inflation.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "401(k) Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much can I put in my 401(k) in 2026?",
    a: "Up to $24,500 of your own pay. If you are 50 or older by the end of 2026 you can add an $8,000 catch-up, for $32,500 in total. If you are 60, 61, 62 or 63 at the end of the year, the catch-up is $11,250 instead, for $35,750. Employer contributions do not count toward these figures.",
  },
  {
    q: "What does \"50% match up to 6%\" mean?",
    a: "Your employer adds 50 cents for every dollar you contribute, on contributions up to 6% of your pay. On a $75,000 salary you put in $4,500 (6%) and your employer adds $2,250. Contribute less than 6% and you get less of the match.",
  },
  {
    q: "How much should I contribute to my 401(k)?",
    a: "At the very least, enough to get the full employer match, because that money is an instant return you can't get elsewhere. Many planners suggest saving 15% of pay for retirement in total, counting the employer's share. Use the calculator to see what different rates give you.",
  },
  {
    q: "Should I pick Roth or traditional 401(k) contributions?",
    a: "Traditional contributions cut your tax now and are taxed when you withdraw. Roth contributions are taxed now and come out tax-free later if the rules are met. Roth tends to suit people who expect a higher tax rate in retirement, including many younger savers; traditional tends to suit people in a high bracket today. Splitting between the two is common.",
  },
  {
    q: "What is the new Roth catch-up rule for 2026?",
    a: "From 2026, if your FICA wages from your employer in 2025 were more than $150,000, any catch-up contributions you make at 50 or older must go in as Roth (after tax). Your regular $24,500 can still be traditional. If your plan has no Roth option, it can't offer you catch-ups at all.",
  },
  {
    q: "Does my employer match count toward the $24,500 limit?",
    a: "No. The $24,500 is for your own salary deferrals. There is a separate, higher limit on everything that goes into your account in a year, including the employer's share, which is $72,000 for 2026 before catch-ups.",
  },
  {
    q: "What happens to my 401(k) if I change jobs?",
    a: "Your own contributions are always yours. Employer money may be subject to a vesting schedule, so you could lose part of it if you leave early. You can usually leave the account where it is, roll it into your new employer's plan or roll it into an IRA. Avoid cashing out, which brings tax and often a 10% penalty.",
  },
  {
    q: "When can I take money out of my 401(k)?",
    a: "Normally from age 59½ without the 10% early withdrawal penalty. If you leave your job in or after the year you turn 55, you can take money from that employer's plan without the penalty. Required minimum distributions from traditional money start at 73 for most people today.",
  },
  {
    q: "What return should I assume?",
    a: "The calculator uses 7% a year before fees as a default, a common long-run assumption for a mostly stock portfolio. Returns are never guaranteed and vary a lot from year to year. Try 5% or 6% to see a more cautious picture.",
  },
  {
    q: "Why does the calculator show a figure in today's dollars?",
    a: "Prices rise over time, so $1.6 million in 37 years will buy far less than $1.6 million today. Dividing by inflation (2.5% a year by default) shows what the balance would be worth at today's prices, which is the better figure for planning.",
  },
  {
    q: "Do fees really matter?",
    a: "Yes. In our main example, cutting fees from 0.5% to 0.1% a year adds about $168,000 by age 67, and paying 1% instead of 0.5% costs about $185,000. Check the expense ratios of your plan's funds; index funds are usually the cheapest.",
  },
  {
    q: "Is this calculator's result what I will actually get?",
    a: "No. It is a projection based on steady returns, steady raises and a contribution rate that never changes. Real markets go up and down, and your pay and plans will change. Use it to compare choices, and check your plan's own statements and tools.",
  },
];

export default async function K401Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/roth-ira-calculator", "/us/savings/retirement-calculator", "/us/savings/compound-interest-calculator", "/us/taxes/paycheck-calculator", "/us/taxes/federal-income-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 limits"
      title="401(k) Calculator"
      lead="See what your 401(k) could be worth when you retire, with your employer match, the 2026 contribution limits, fees and inflation."
      points={["Employer match", "2026 catch-up limits", "Fees and inflation", "Free and private"]}
      guide={<K401Guide />}
      faqs={FAQS}
      related={related}
      note="A projection, not a promise: investment returns vary and are not guaranteed. Not financial advice."
    >
      <K401Studio query={query} />
    </FlagshipPage>
  );
}
