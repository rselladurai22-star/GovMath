import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SocialSecurityStudio from "./SocialSecurityStudio";
import SocialSecurityGuide from "./SocialSecurityGuide";

const PATH = "/us/savings/social-security-calculator";

export const metadata: Metadata = {
  title: "Social Security Calculator 2026: When to Claim",
  description:
    "Free Social Security calculator for 2026. Estimate your benefit at every age from 62 to 70, your full retirement age, break-even age and tax on benefits.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Social Security Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is my Social Security benefit calculated?",
    a: "Social Security takes your highest 35 years of earnings, indexes them to wage growth and averages them into a monthly figure (AIME). For 2026 it pays 90% of the first $1,286 of AIME, 32% of the amount up to $7,749 and 15% above that. The result, your primary insurance amount, is what you get at full retirement age.",
  },
  {
    q: "What is my full retirement age?",
    a: "67 if you were born in 1960 or later. It is 66 for people born from 1943 to 1954 and rises by two months a year for those born from 1955 to 1959. If you were born on January 1, use the year before.",
  },
  {
    q: "How much less do I get if I claim at 62?",
    a: "With a full retirement age of 67, claiming at 62 pays 70% of your full benefit, for life. The cut is 5/9 of 1% for each of the first 36 months early and 5/12 of 1% for each month beyond that.",
  },
  {
    q: "How much more do I get by waiting until 70?",
    a: "Delayed retirement credits add 2/3 of 1% for each month after full retirement age, or 8% a year. With a full retirement age of 67, claiming at 70 pays 124% of your full benefit. There is no gain from waiting past 70.",
  },
  {
    q: "What is the Social Security break-even age?",
    a: "The age at which the bigger checks from claiming later have made up for the checks you skipped. In today's dollars, waiting from 62 to 67 breaks even at about 78 and 8 months, and waiting from 67 to 70 at about 82 and 6 months. If you expect to live past that, waiting pays more in total.",
  },
  {
    q: "How much did Social Security go up in 2026?",
    a: "Benefits rose 2.8% from January 2026, the cost-of-living adjustment. SSA estimates the average retired worker's benefit at about $2,071 a month after the increase. The maximum benefit at full retirement age in 2026 is $4,152 a month.",
  },
  {
    q: "Can I work and collect Social Security?",
    a: "Yes. Before full retirement age, the earnings test holds back $1 of benefits for every $2 you earn above $24,480 in 2026. In the year you reach full retirement age the limit is $65,160 and $1 is held back for every $3, counting only months before your birthday. From full retirement age there is no limit, and your benefit is recalculated to credit the months held back.",
  },
  {
    q: "Is Social Security taxable?",
    a: "Up to 85% of it can be. Add half your benefits to your other income: if the total is above $25,000 ($32,000 for married couples filing jointly), up to 50% of benefits is taxable; above $34,000 ($44,000 joint), up to 85%. These thresholds are not indexed to inflation.",
  },
  {
    q: "Does the new senior deduction stop tax on Social Security?",
    a: "Not exactly. From 2025 to 2028, people 65 and older can deduct an extra $6,000 each, phased out above $75,000 of modified AGI ($150,000 joint). It lowers taxable income, so many retirees pay little or no tax on benefits, but the rules for how much of your benefit is taxable did not change.",
  },
  {
    q: "How many years do I need to work to get Social Security?",
    a: "You need 40 credits, which is usually 10 years of work. You can earn up to four credits a year. The benefit itself is based on 35 years, so with fewer years of earnings the missing years count as zero and pull your average down.",
  },
  {
    q: "Should I claim Social Security early?",
    a: "Claiming early can make sense if your health is poor, you need the income, or you are the lower earner in a couple. Waiting usually pays more for people who expect to live into their mid-80s or longer, and it protects a surviving spouse, who keeps the larger of the two checks.",
  },
  {
    q: "How accurate is this calculator?",
    a: "It uses the real 2026 formula, but your actual benefit depends on your full earnings history and the wage index in the year you turn 62. The salary option assumes your earnings matched today's salary in every year. Your Social Security statement at ssa.gov/myaccount gives the official estimate; enter its full retirement age figure for the best result.",
  },
];

export default async function SocialSecurityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/retirement-calculator", "/us/savings/401k-calculator", "/us/savings/rmd-calculator", "/us/savings/roth-conversion-calculator", "/us/taxes/federal-income-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 formula"
      title="Social Security Calculator"
      lead="Estimate your Social Security retirement benefit at every age from 62 to 70, see your break-even age for waiting, and how much of it will be taxed."
      points={["2026 bend points", "Every age 62 to 70", "Break-even age", "Tax on benefits"]}
      guide={<SocialSecurityGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on the 2026 Social Security formula. Your Social Security statement is the official figure. Not financial advice."
    >
      <SocialSecurityStudio query={query} />
    </FlagshipPage>
  );
}
