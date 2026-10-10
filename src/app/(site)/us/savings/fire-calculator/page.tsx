import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import FireStudio from "./FireStudio";
import FireGuide from "./FireGuide";

const PATH = "/us/savings/fire-calculator";

export const metadata: Metadata = {
  title: "FIRE Calculator: When Can You Retire Early?",
  description:
    "Free FIRE calculator for 2026. Find your FIRE number, years to financial independence and age, with Lean, Fat, Coast and Barista FIRE and a savings-rate table.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "FIRE Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is my FIRE number?",
    a: "Your yearly spending divided by your withdrawal rate. At the common 4% rate that is 25 times your spending, so $50,000 a year needs $1,250,000 invested. At a more cautious 3.5% it is about 28.6 times, or $1,428,571.",
  },
  {
    q: "How long does it take to reach FIRE?",
    a: "Mostly it depends on your savings rate. Starting from zero, with a 7% return and 2.5% inflation, saving 25% of take-home pay takes about 33.6 years, 50% about 17.1 years and 70% about 8.8 years. Savings you already have shorten every figure.",
  },
  {
    q: "Is the 4% rule safe for early retirement?",
    a: "It was based on 30-year retirements in US market history. Early retirements can last 40 to 50 years, so many early retirees use 3.25% to 3.5%, keep some part-time income or plan to spend less after bad years. It is a rule of thumb, not a guarantee.",
  },
  {
    q: "What is Lean FIRE and Fat FIRE?",
    a: "Lean FIRE means retiring on a frugal budget; Fat FIRE means retiring with a generous one. There are no official lines, so the calculator uses 70% and 150% of your planned spending. In our example, Lean FIRE needs $875,000 and Fat FIRE $1,875,000.",
  },
  {
    q: "What is Coast FIRE?",
    a: "The point where your investments, with no more contributions, would grow to your full FIRE number by a later age such as 65. A 30-year-old aiming for $1,250,000 at 65 with a 4.39% real return needs about $277,852 invested to coast.",
  },
  {
    q: "What is Barista FIRE?",
    a: "Leaving full-time work once your savings cover most of your spending, and earning the rest part-time. Each $1,000 a year of part-time income cuts the FIRE number by $25,000 at a 4% withdrawal rate.",
  },
  {
    q: "Should I use take-home pay or gross pay?",
    a: "Take-home pay, after taxes. Your savings rate is what you save out of the money you actually receive. If you contribute to a 401(k) from your paycheck, add those contributions back to your take-home pay, because they are savings.",
  },
  {
    q: "Should my FIRE number include my home?",
    a: "No. Your FIRE number is the invested money you will live on. A paid-off home lowers your spending, which lowers the number, but the house itself doesn't pay bills unless you sell or downsize.",
  },
  {
    q: "How can I get at retirement money before 59½?",
    a: "Roth IRA contributions can be withdrawn at any time. Other routes include a Roth conversion ladder, the rule of 55 for the 401(k) of a job you leave at 55 or later, and substantially equal periodic payments under section 72(t). A taxable brokerage account has no age rules.",
  },
  {
    q: "What about health insurance if I retire early?",
    a: "Medicare starts at 65. Before that, early retirees use a Marketplace plan, a spouse's plan or COBRA for up to 18 months. Marketplace premium tax credits depend on income, so a low-income early retiree may pay much less than the full premium. Include the cost in your retirement spending.",
  },
  {
    q: "Why does the calculator use today's dollars?",
    a: "So the FIRE number means something now. It grows your savings at the return after inflation. The answer also shows the number in the dollars of the year you reach it: $1,250,000 today is about $2.09 million in nearly 21 years at 2.5% inflation.",
  },
  {
    q: "Does the calculator include Social Security?",
    a: "No. Most FIRE plans treat Social Security as a later bonus because it can't start before 62. If you want to count it, lower your retirement spending to reflect the benefit, or use our retirement calculator, which includes it.",
  },
];

export default async function FirePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/retirement-calculator", "/us/savings/401k-calculator", "/us/savings/roth-ira-calculator", "/us/savings/compound-interest-calculator", "/us/savings/net-worth-calculator", "/us/savings/emergency-fund-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="FIRE Calculator"
      lead="Find your FIRE number and when you could be financially independent, from your pay, spending and savings, with Lean, Fat, Coast and Barista FIRE."
      points={["FIRE number and age", "Lean, Fat, Coast and Barista", "Savings-rate table", "Free and private"]}
      guide={<FireGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Investment returns are not guaranteed. Not financial advice."
    >
      <FireStudio query={query} />
    </FlagshipPage>
  );
}
