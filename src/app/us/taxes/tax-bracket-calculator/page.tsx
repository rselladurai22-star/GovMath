import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BracketStudio from "./BracketStudio";
import BracketGuide from "./BracketGuide";

const PATH = "/us/taxes/tax-bracket-calculator";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator 2026: Marginal Rate",
  description:
    "Free tax bracket calculator for 2026. Find your federal bracket, marginal and effective tax rate, and see your income taxed band by band for every filing status.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Tax Bracket Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What tax bracket am I in for 2026?", a: "It depends on your taxable income and filing status. A single filer is in the 12% bracket up to $50,400 of taxable income and the 22% bracket up to $105,700. Married couples filing jointly reach 22% above $100,800." },
  { q: "What are the 2026 federal tax brackets?", a: "Seven rates: 10%, 12%, 22%, 24%, 32%, 35% and 37%. For single filers the bands end at $12,400, $50,400, $105,700, $201,775, $256,225 and $640,600 of taxable income." },
  { q: "Is my whole income taxed at my bracket rate?", a: "No. Each rate applies only to the income inside its band. Your first dollars are taxed at 10% and 12% however much you earn." },
  { q: "What is the difference between marginal and effective tax rate?", a: "Your marginal rate is the rate on your last dollar of taxable income. Your effective rate is your total tax divided by your income, and is always lower." },
  { q: "Can a raise put me in a higher bracket and lower my take-home pay?", a: "No. Only the extra income is taxed at the higher rate, so a raise always leaves you with more after federal income tax." },
  { q: "Do the brackets apply to my salary or my taxable income?", a: "To taxable income: your income after the standard or itemized deduction and adjustments. A single person earning $80,000 has $63,900 of taxable income in 2026." },
  { q: "What bracket is $100,000 in?", a: "A single filer with $100,000 of wages has $83,900 of taxable income, which is in the 22% bracket. A married couple filing jointly with $100,000 is in the 12% bracket." },
  { q: "When does the 37% bracket start in 2026?", a: "Above $640,600 of taxable income for single and head of household filers, $768,700 for married filing jointly and $384,350 for married filing separately." },
  { q: "Are capital gains taxed at my bracket?", a: "Short-term gains are. Long-term gains and qualified dividends have their own 0%, 15% and 20% rates, stacked on top of your other income." },
  { q: "Does my state use the same brackets?", a: "No. States set their own rates. Some have no income tax, some a flat rate and others their own brackets." },
  { q: "Why did my bracket change from last year?", a: "The IRS raises the bands each year for inflation. If your income rose faster than inflation, more of it can fall into a higher band." },
  { q: "How do I lower my tax bracket?", a: "Lower your taxable income: contribute to a traditional 401(k), IRA or HSA, claim every deduction you qualify for, and time bonuses or gains so they do not all land in one year." },
  { q: "Is head of household better than single?", a: "Yes, if you qualify. Head of household has a $24,150 standard deduction instead of $16,100 and a wider 12% band, reaching $67,450 of taxable income instead of $50,400." },
];

export default async function BracketPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/federal-income-tax", "/us/taxes/paycheck-calculator", "/us/taxes/capital-gains-tax", "/us/taxes/self-employment-tax", "/us/savings/roth-ira-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 federal brackets"
      title="Tax Bracket Calculator"
      lead="Find your 2026 federal tax bracket, your marginal and effective tax rates, and exactly how much of your income falls in each band, for every filing status."
      points={["2026 brackets", "Marginal and effective rates", "Band-by-band breakdown", "All filing statuses"]}
      guide={<BracketGuide />}
      faqs={FAQS}
      related={related}
      note="2026 federal income tax brackets from the IRS. Not tax advice."
    >
      <BracketStudio query={query} />
    </FlagshipPage>
  );
}
