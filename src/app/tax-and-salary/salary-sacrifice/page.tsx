import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SacrificeStudio from "./SacrificeStudio";
import SacrificeGuide from "./SacrificeGuide";

export const metadata: Metadata = {
  title: "Salary Sacrifice Calculator UK 2026/27: Pension, Bike and Other Schemes",
  description:
    "See what salary sacrifice saves you in Income Tax, National Insurance and student loan, what your employer saves, and the minimum wage and £100,000 rules.",
  alternates: { canonical: "/tax-and-salary/salary-sacrifice" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/salary-sacrifice", label: "Salary Sacrifice Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does salary sacrifice save?", a: "For a pension or Cycle to Work, 28% for basic-rate taxpayers, 42% for higher-rate and up to 62% between £100,000 and £125,140." },
  { q: "Is salary sacrifice worth it for a pension?", a: "Usually yes. It saves National Insurance as well as Income Tax, and your employer may add its NI saving to your pension." },
  { q: "Do tech and gym schemes save tax?", a: "Only National Insurance. Under the optional remuneration rules you still pay Income Tax on the salary given up." },
  { q: "Can salary sacrifice take me below the minimum wage?", a: "No. Your cash pay must stay at or above the National Minimum Wage for the hours you work." },
  { q: "Does salary sacrifice affect my mortgage?", a: "It can. Some lenders use your reduced salary, which lowers how much you can borrow." },
  { q: "Does salary sacrifice affect maternity pay?", a: "Statutory maternity pay is based on actual earnings, so a large sacrifice can reduce it. Many employers pause or adjust arrangements." },
  { q: "Can I use salary sacrifice to avoid the £100,000 trap?", a: "Yes. Sacrificing salary into a pension brings your income down, restoring your Personal Allowance and childcare support." },
  { q: "What is the 2029 salary sacrifice cap?", a: "From April 2029, only the first £2,000 a year of pension salary sacrifice will be free of National Insurance." },
  { q: "Does salary sacrifice reduce student loan repayments?", a: "Yes. Repayments are based on your reduced salary, so you repay 9% less on the amount sacrificed above your threshold." },
  { q: "Can I stop salary sacrifice at any time?", a: "Usually only at set times or after a life event. Pension sacrifice is often more flexible; check your scheme." },
  { q: "Does salary sacrifice reduce the Child Benefit charge?", a: "Yes. It lowers your adjusted net income, which can reduce or remove the High Income Child Benefit Charge." },
  { q: "Can I sacrifice my bonus into my pension?", a: "Often yes, if agreed before the bonus is paid. It saves tax and NI on the bonus." },
];

export default async function SalarySacrificePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/pension-tax-relief", "/vehicles/ev-salary-sacrifice", "/tax-and-salary/salary-calculator", "/tax-and-salary/pay-rise", "/investing/workplace-pension", "/business/employer-ni-costs"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Salary Sacrifice Calculator"
      lead="See what giving up salary for a pension, bike or other benefit really costs you, and what you and your employer save."
      points={["Pension, bike or other", "Tax, NI and loan", "Employer NI saving", "Free and private"]}
      guide={<SacrificeGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026/27 with a standard tax code. Your employer's scheme rules decide what you can sacrifice."
    >
      <SacrificeStudio query={query} />
    </FlagshipPage>
  );
}
