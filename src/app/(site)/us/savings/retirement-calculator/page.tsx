import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RetirementStudio from "./RetirementStudio";
import RetirementGuide from "./RetirementGuide";

const PATH = "/us/savings/retirement-calculator";

export const metadata: Metadata = {
  title: "Retirement Calculator: Am I on Track?",
  description:
    "Free retirement calculator for 2026. See if your savings and Social Security will cover your spending, how long the money lasts and how much more to save.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Retirement Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much do I need to retire?",
    a: "Enough savings to cover the gap between what you want to spend and what Social Security and any pension pay, for as long as you live. A quick check is the 4% rule: multiply the yearly gap by 25. A $36,000 gap points to about $900,000 in today's dollars.",
  },
  {
    q: "What is the 4% rule?",
    a: "A rule of thumb from research in the 1990s: if you withdraw 4% of your savings in the first year of retirement and then raise that amount with inflation, a mixed stock and bond portfolio has historically lasted at least 30 years. It is a guide, not a guarantee.",
  },
  {
    q: "How much will Social Security pay me?",
    a: "It depends on your 35 highest-earning years and the age you claim. The average retired worker received about $2,071 a month in January 2026, after a 2.8% cost-of-living increase. Your my Social Security account at ssa.gov shows your own estimate at different claiming ages.",
  },
  {
    q: "What is my full retirement age?",
    a: "67 for anyone born in 1960 or later. You can claim from 62, but your benefit is permanently reduced, by up to 30% at 62. Waiting past full retirement age raises it by 8% a year up to age 70.",
  },
  {
    q: "What return should I assume?",
    a: "The calculator uses 7% a year before retirement and 5% after, which reflect a mostly stock portfolio becoming more cautious. Both are before inflation. Try lower figures to stress-test your plan; real returns vary a lot from year to year.",
  },
  {
    q: "How much of my income will I need in retirement?",
    a: "Many planners suggest 70% to 80% of your pre-retirement income, because you no longer save for retirement or pay Social Security tax, and some costs fall. Yours could be higher if you plan to travel or have health costs, or lower if your home is paid off.",
  },
  {
    q: "Why is the amount needed so much bigger than my spending times the years?",
    a: "Because of inflation. At 2.5% a year, $60,000 of spending today costs about $132,000 a year in 32 years. The calculator works in future dollars for the nest egg and shows today's-dollar figures alongside so you can compare.",
  },
  {
    q: "What if I'm behind?",
    a: "You have four levers: save more each month, retire a little later, spend less in retirement, or delay Social Security to get a bigger check. Catch-up contributions to a 401(k) and IRA from age 50 help too. The calculator shows the extra monthly saving that would close the gap.",
  },
  {
    q: "Does the calculator include taxes?",
    a: "No. Enter your spending as the amount you need before tax, or add an allowance for tax on traditional 401(k) and IRA withdrawals. Roth withdrawals are tax-free, and up to 85% of Social Security can be taxable depending on your income.",
  },
  {
    q: "What life expectancy should I use?",
    a: "Plan for longer than average. A 65-year-old today has a good chance of living into their late 80s, and a real chance of reaching 95. Running out of money at 85 is a much worse outcome than leaving some behind.",
  },
  {
    q: "Should I count my home equity?",
    a: "Usually not as spending money, unless you plan to downsize or use a reverse mortgage. A paid-off home lowers what you need to spend each year, which you can reflect in the spending figure.",
  },
  {
    q: "How often should I check my plan?",
    a: "Once a year, and after big changes such as a new job, a raise, a market fall or a change in family. Small adjustments made early are far easier than big ones made late.",
  },
];

export default async function RetirementPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/401k-calculator", "/us/savings/roth-ira-calculator", "/us/savings/compound-interest-calculator", "/us/savings/savings-goal-calculator", "/us/taxes/paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Plan ahead"
      title="Retirement Calculator"
      lead="See whether your savings and Social Security will pay for the retirement you want, how long the money lasts, and how much more to save if you're short."
      points={["On track or shortfall", "Social Security included", "The 4% rule check", "Free and private"]}
      guide={<RetirementGuide />}
      faqs={FAQS}
      related={related}
      note="A projection based on steady returns and inflation. Not financial advice."
    >
      <RetirementStudio query={query} />
    </FlagshipPage>
  );
}
