import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SelfEmploymentStudio from "./SelfEmploymentStudio";
import SelfEmploymentGuide from "./SelfEmploymentGuide";

const PATH = "/us/taxes/self-employment-tax";

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator 2026 (1099)",
  description:
    "Free self-employment tax calculator for 2026. Work out SE tax on 1099 and freelance profit, income tax on top, and your quarterly estimated tax payments.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Self-Employment Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the self-employment tax rate for 2026?", a: "15.3%: 12.4% for Social Security on up to $184,500 of earnings and 2.9% for Medicare on all of it. It applies to 92.35% of your net profit, and an extra 0.9% Medicare tax applies above $200,000 ($250,000 joint)." },
  { q: "How much self-employment tax will I pay on $60,000?", a: "$8,477.73 on $60,000 of net profit in 2026. A single filer with no other income also pays about $3,559 of income tax after the standard and QBI deductions, $12,037 in all." },
  { q: "Do I pay self-employment tax if I also have a W-2 job?", a: "Yes, on your self-employment profit. Your wages count toward the $184,500 Social Security cap first, so high earners may pay only the Medicare part on their side income." },
  { q: "When are quarterly estimated taxes due for 2026?", a: "April 15, June 15 and September 15, 2026, and January 15, 2027." },
  { q: "Do I have to make estimated payments?", a: "Only if you expect to owe $1,000 or more after withholding. You avoid penalties by paying 90% of this year's tax or 100% of last year's (110% if your AGI was over $150,000)." },
  { q: "Is there a minimum income for self-employment tax?", a: "Yes. You pay it only if net earnings (92.35% of profit) are $400 or more, which is about $433 of profit. Income tax can still apply below that." },
  { q: "Can I deduct self-employment tax?", a: "Half of it, as an adjustment to income on your Form 1040. That lowers your income tax but not the self-employment tax itself." },
  { q: "What is the QBI deduction?", a: "The qualified business income deduction lets most sole proprietors deduct up to 20% of business profit from taxable income. From 2026 there is a $400 minimum for anyone with at least $1,000 of qualified business income from a business they actively run." },
  { q: "How much should I set aside for taxes as a freelancer?", a: "Commonly 25% to 30% of what clients pay you, more in a state with income tax. The calculator shows the share for your income." },
  { q: "Does a SEP IRA reduce self-employment tax?", a: "No. Retirement contributions lower income tax only. Business expenses are what lower self-employment tax." },
  { q: "Do gig workers pay self-employment tax?", a: "Yes. Delivery, ride-share and other platform workers are usually independent contractors and pay self-employment tax on their profit after expenses such as mileage." },
  { q: "Will an S corporation save me self-employment tax?", a: "Possibly, at higher steady profits. You pay payroll tax on a reasonable salary but not on distributions. The extra costs of running payroll and filing a separate return can outweigh the saving at lower incomes." },
];

export default async function SelfEmploymentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/federal-income-tax", "/us/taxes/tax-bracket-calculator", "/us/taxes/paycheck-calculator", "/us/taxes/salary-to-hourly", "/us/savings/retirement-calculator", "/us/savings/savings-goal-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="1099 and freelance tax"
      title="Self-Employment Tax Calculator"
      lead="Work out the Social Security and Medicare you owe on freelance, 1099 and gig profit in 2026, the income tax on top, and the quarterly estimated payments that keep you clear of penalties."
      points={["2026 Schedule SE", "QBI deduction", "Quarterly payments and due dates", "Side gig with a W-2 job"]}
      guide={<SelfEmploymentGuide />}
      faqs={FAQS}
      related={related}
      note="Federal estimate for tax year 2026. State income tax is not included. Not tax advice."
    >
      <SelfEmploymentStudio query={query} />
    </FlagshipPage>
  );
}
