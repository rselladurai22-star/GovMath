import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import ContractStudio from "./ContractStudio";
import ContractGuide from "./ContractGuide";

const PATH = "/us/taxes/1099-vs-w2-calculator";

export const metadata: Metadata = {
  title: "1099 vs W-2 Calculator: Contract Rate vs Salary",
  description:
    "Free 1099 vs W-2 calculator for 2026. Compare a contract rate with a salary after self-employment tax, QBI, benefits and unbilled time: find your break-even.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "1099 vs W-2 Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What hourly rate equals a $100,000 salary as a contractor?",
    a: "About $82.58 an hour for a single filer in Texas billing 32 hours a week for 46 weeks, with $5,000 of expenses, a $9,325 health plan and $4,000 of retirement savings. Billing 40 hours for 50 weeks brings it down to about $60.78.",
  },
  {
    q: "Is 1099 or W-2 better?",
    a: "It depends on the rate and how many hours you can bill. At the same hourly figure the W-2 job almost always wins, because the employer pays half the payroll tax, most of the health premium and your time off.",
  },
  {
    q: "How much more should a contractor charge than an employee?",
    a: "A common rule says 1.25 to 1.5 times the salary divided by 2,080 hours. With realistic unbilled time and your own health plan it is often more: 1.72 times in our $100,000 example.",
  },
  {
    q: "How much tax does a 1099 contractor pay?",
    a: "Self-employment tax of 15.3% on 92.35% of profit, plus income tax. Business expenses, half the self-employment tax, health premiums and the 20% QBI deduction lower the income tax.",
  },
  {
    q: "Do 1099 workers pay more tax than W-2 workers?",
    a: "They pay more payroll tax, because they pay both halves. They often pay less income tax on the same money, thanks to expenses and the QBI deduction, but not enough to close the gap.",
  },
  {
    q: "What benefits do I lose as a contractor?",
    a: "Usually employer health insurance, a 401(k) match, paid vacation, holidays and sick days, and coverage by unemployment insurance and workers' compensation.",
  },
  {
    q: "How much are employee benefits worth?",
    a: "The Bureau of Labor Statistics found benefits were about 30% of private-sector compensation in December 2025: $13.79 of $46.15 an hour worked.",
  },
  {
    q: "Can contractors deduct health insurance?",
    a: "Yes, as self-employed health insurance, if you are not eligible for an employer plan through your own or a spouse's job. It lowers income tax but not self-employment tax.",
  },
  {
    q: "What is the QBI deduction?",
    a: "A deduction of up to 20% of qualified business income for sole proprietors and other pass-through owners. For service businesses it phases out above $201,750 of taxable income ($403,500 joint) in 2026.",
  },
  {
    q: "How do contractors save for retirement?",
    a: "With a SEP IRA (up to 20% of net self-employment earnings) or a solo 401(k), which allows an employee contribution of up to $24,500 in 2026 plus an employer contribution.",
  },
  {
    q: "Can an employer just call me a contractor?",
    a: "No. The IRS and the Department of Labor look at how the work is controlled, not the contract's label. You can ask the IRS to decide with Form SS-8.",
  },
  {
    q: "What salary is a contract offer worth?",
    a: "The calculator works that out too. A $75-an-hour contract for 32 hours a week and 46 weeks, with the default costs, is worth about the same as an $89,566 salary.",
  },
];

export default async function ContractVsSalaryPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/self-employment-tax", "/us/taxes/salary-to-hourly", "/us/taxes/paycheck-calculator", "/us/taxes/federal-income-tax", "/us/savings/401k-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Contract rate vs salary"
      title="1099 vs W-2 Calculator"
      lead="Compare a 1099 contract rate with a W-2 salary after self-employment tax, the QBI deduction, health insurance, the 401(k) match, unpaid time off and unbilled hours, and find the rate that breaks even."
      points={["Break-even hourly rate", "Equivalent salary", "Benefits and unbilled time", "2026 federal and state tax"]}
      guide={<ContractGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for comparing offers, not tax or legal advice."
    >
      <ContractStudio query={query} />
    </FlagshipPage>
  );
}
