import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BudgetStudio from "./BudgetStudio";
import BudgetGuide from "./BudgetGuide";

const PATH = "/uk/tax-and-salary/budget-tax-changes";

export const metadata: Metadata = {
  title: "Budget Tax Changes Calculator 2026 to 2031",
  description:
    "Free Budget tax changes calculator. See what frozen thresholds, higher savings and rental tax rates and the salary sacrifice cap mean for you to 2030/31.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: PATH, label: "Budget Tax Changes Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "When is the next Budget?",
    a: "The Chancellor has set the Budget for Wednesday 28 October 2026, with the Office for Budget Responsibility's forecast on the same day. This calculator includes only measures announced before then, and we will update it on Budget day.",
  },
  {
    q: "How long are tax thresholds frozen?",
    a: "Until 5 April 2031. The Personal Allowance stays at £12,570, the higher-rate threshold at £50,270 and the additional-rate threshold at £125,140. The matching National Insurance thresholds are frozen for the same period.",
  },
  {
    q: "Will I pay more tax if my salary stays the same?",
    a: "Not on your salary. With the same pay, frozen thresholds change nothing. You may pay more if you have savings interest or rental profit from April 2027, or sacrifice more than £2,000 a year into a pension from April 2029.",
  },
  {
    q: "What is fiscal drag?",
    a: "When thresholds stay still while pay rises, more of your income is taxed and more of it at higher rates. For someone on £45,000 with 3% pay rises, the freeze costs about £495 in 2030/31 compared with thresholds rising in line with pay.",
  },
  {
    q: "How much more tax will I pay on savings?",
    a: "From 6 April 2027, savings interest above your allowances is taxed at 22%, 42% or 47%, 2 points more than now. A basic-rate taxpayer with £3,000 of interest pays £40 a year more; a higher-rate taxpayer pays £50 more.",
  },
  {
    q: "What are the new tax rates on rental income?",
    a: "From 6 April 2027, property income in England, Wales and Northern Ireland is taxed at 22%, 42% and 47%. Relief for mortgage interest rises from 20% to 22%. On £12,000 of rental profit with £6,000 of interest, tax rises by about £120 a year.",
  },
  {
    q: "Did dividend tax go up?",
    a: "Yes, from 6 April 2026. The ordinary rate rose from 8.75% to 10.75% and the upper rate from 33.75% to 35.75%. The additional rate stayed at 39.35% and the dividend allowance at £500.",
  },
  {
    q: "What is the salary sacrifice cap?",
    a: "From 6 April 2029, pension contributions made by salary sacrifice above £2,000 a year will pay employee and employer National Insurance. Income Tax relief is unchanged. Sacrifice of up to £2,000 a year stays free of NI.",
  },
  {
    q: "Is the cash ISA limit changing?",
    a: "Yes. From 6 April 2027, under-65s can pay up to £12,000 a year into cash ISAs, within the £20,000 overall ISA limit. People aged 65 or over keep a £20,000 cash ISA limit.",
  },
  {
    q: "Do the changes apply in Scotland?",
    a: "The savings and dividend changes apply across the UK. Scotland sets its own rates on wages and rental profit, and has not set them beyond 2026/27, so we hold them at 2026/27 levels. The new property rates apply in England, Wales and Northern Ireland.",
  },
  {
    q: "Are pensions now subject to inheritance tax?",
    a: "From 6 April 2027, most unused pension funds and death benefits will count towards an estate for inheritance tax. It does not change tax on your income, so it is explained in the guide rather than included in the figures.",
  },
  {
    q: "Why doesn't the calculator include rumoured Budget measures?",
    a: "Because they may not happen. Only measures the government has announced are included. After the Budget on 28 October 2026, we will add anything confirmed.",
  },
];

export default async function BudgetTaxChangesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/uk/tax-and-salary/salary-calculator",
      "/uk/tax-and-salary/salary-sacrifice",
      "/uk/tax-and-salary/pay-rise",
      "/uk/investing/personal-savings-allowance",
      "/uk/investing/dividend-tax",
      "/uk/property/buy-to-let-yield",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Announced changes to 2030/31"
      title="Budget Tax Changes Calculator"
      lead="See what the tax changes already announced mean for your pay, savings, dividends and rent, year by year to 2030/31."
      points={["Announced measures only", "Salary, savings and rent", "Salary sacrifice cap", "Free and private"]}
      guide={<BudgetGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates using measures announced by October 2026, not tax advice. Future Budgets can change these figures. SumAtlas is not affiliated with HMRC or HM Treasury."
    >
      <BudgetStudio query={query} />
    </FlagshipPage>
  );
}
