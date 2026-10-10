import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import FederalStudio from "./FederalStudio";
import FederalGuide from "./FederalGuide";

const PATH = "/us/taxes/federal-income-tax";

export const metadata: Metadata = {
  title: "Federal Income Tax Calculator 2026: Refund",
  description:
    "Free federal income tax calculator for 2026. Estimate your tax, refund or balance due with the new brackets, child tax credit and tips and overtime deductions.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Federal Income Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much federal tax will I pay on $75,000?", a: "A single filer with $75,000 of wages and the standard deduction pays $7,670 of federal income tax in 2026, about 10.2% of pay. Social Security and Medicare are extra." },
  { q: "What is the standard deduction for 2026?", a: "$16,100 for single filers and married filing separately, $32,200 for married filing jointly and $24,150 for head of household. Each person 65 or over or blind adds $2,050 (single or head of household) or $1,650 (married)." },
  { q: "When is the 2026 tax return due?", a: "April 15, 2027. An extension moves the filing deadline to October 15, 2027, but any tax owed is still due in April." },
  { q: "How do I know if I will get a refund?", a: "Add up the federal tax withheld from your pay (box 2 of your W-2s) and any estimated payments. If that, plus refundable credits, is more than your total tax, you get the difference back." },
  { q: "How much is the child tax credit in 2026?", a: "$2,200 for each child under 17, of which up to $1,700 is refundable. It falls by $50 for each $1,000 of income above $200,000, or $400,000 for married couples filing jointly." },
  { q: "Is overtime tax-free now?", a: "Partly. From 2025 to 2028 you can deduct the overtime premium (the extra half in time and a half), up to $12,500 or $25,000 for joint filers. Social Security and Medicare still apply." },
  { q: "Are tips taxed in 2026?", a: "Tips are still income, but workers in tipped jobs can deduct up to $25,000 of qualified tips from 2025 to 2028. The deduction shrinks above $150,000 of income ($300,000 joint)." },
  { q: "What is the senior deduction?", a: "A $6,000 deduction for each person 65 or over, from 2025 to 2028, on top of the standard deduction. It falls by 6% of income above $75,000 ($150,000 joint)." },
  { q: "Should I itemize or take the standard deduction?", a: "Itemize only if mortgage interest, state and local taxes (capped at $40,400 in 2026), charity and large medical bills add up to more than your standard deduction. The calculator uses whichever is larger." },
  { q: "What is the difference between marginal and effective tax rate?", a: "Your marginal rate is the rate on your last dollar of income, your bracket. Your effective rate is total tax divided by total income, which is always lower." },
  { q: "Does this include state income tax?", a: "No. This is federal tax only. Most states also tax income; the paycheck calculator includes state tax." },
  { q: "What if I owe more than $1,000?", a: "You may face an underpayment penalty unless your withholding and estimated payments covered 90% of this year's tax or 100% of last year's (110% if your AGI was over $150,000)." },
];

export default async function FederalPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/tax-bracket-calculator", "/us/taxes/self-employment-tax", "/us/taxes/capital-gains-tax", "/us/taxes/overtime-calculator", "/us/savings/401k-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 return estimate"
      title="Federal Income Tax Calculator"
      lead="Estimate your 2026 federal income tax, refund or balance due, with wages, investments, self-employment, the child tax credit and the new senior, tips and overtime deductions."
      points={["2026 brackets and deductions", "Refund or balance due", "Tips, overtime and senior deductions", "Line-by-line return"]}
      guide={<FederalGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for tax year 2026 based on IRS figures. State taxes and some credits are not included. Not tax advice."
    >
      <FederalStudio query={query} />
    </FlagshipPage>
  );
}
