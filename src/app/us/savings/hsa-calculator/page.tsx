import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HsaStudio from "./HsaStudio";
import HsaGuide from "./HsaGuide";

const PATH = "/us/savings/hsa-calculator";

export const metadata: Metadata = {
  title: "HSA Calculator 2026: Tax Savings and Growth",
  description:
    "Free HSA calculator for 2026. See the federal, payroll and state tax your health savings account saves, the $4,400 and $8,750 limits, and growth to 65.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "HSA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What are the HSA contribution limits for 2026?",
    a: "$4,400 for self-only high-deductible coverage and $8,750 for family coverage. If you are 55 or older you can add $1,000 more. The limit covers your contributions and your employer's together.",
  },
  {
    q: "What counts as a high-deductible health plan in 2026?",
    a: "A plan with a deductible of at least $1,700 for self-only coverage or $3,400 for family coverage, and out-of-pocket costs capped at $8,500 or $17,000. From 2026, bronze and catastrophic plans bought through a Health Insurance Marketplace also count.",
  },
  {
    q: "How much tax does an HSA save?",
    a: "Your contribution comes off your income for federal tax, so it saves your top tax rate. Through payroll it also skips the 7.65% Social Security and Medicare tax, and most states don't tax it either. A single filer earning $75,000 who puts in $4,400 through payroll saves about $1,305 of federal and payroll tax.",
  },
  {
    q: "Is HSA money taxed by my state?",
    a: "In most states, no. California and New Jersey don't follow the federal rules: contributions are taxed on the state return and the account's earnings are taxed each year. States with no income tax have nothing to save or charge.",
  },
  {
    q: "What happens to my HSA if I change jobs?",
    a: "The account is yours. It stays with you when you leave a job, change health plans or retire, and there is no use-it-or-lose-it rule. You can keep it with the same provider or move it to another HSA trustee.",
  },
  {
    q: "Can I invest my HSA?",
    a: "Most HSA providers let you invest the balance above a cash threshold, often $1,000 or $2,000, in mutual funds. Invested money can grow tax-free for decades but can also fall in value, so keep enough in cash for near-term medical bills.",
  },
  {
    q: "What happens if I use HSA money for non-medical costs?",
    a: "Before 65, the withdrawal is taxed as income and you pay a 20% additional tax. From 65, or if you become disabled, the 20% penalty no longer applies, but non-medical withdrawals are still taxed as income.",
  },
  {
    q: "Can I contribute to an HSA after 65?",
    a: "Only if you are not enrolled in any part of Medicare. Many people sign up for Medicare Part A at 65, which ends HSA contributions. If you delay Social Security and Medicare, you can keep contributing while you have qualifying HDHP coverage.",
  },
  {
    q: "Can I reimburse myself for old medical bills?",
    a: "Yes, for qualified expenses incurred after your HSA was set up, with no time limit. Keep the receipts. Some people pay medical costs out of pocket now and reimburse themselves years later, letting the money grow in the meantime.",
  },
  {
    q: "Do employer HSA contributions count as income?",
    a: "No. Employer contributions are not taxed as wages, are not subject to Social Security or Medicare tax and appear in box 12 of your W-2 with code W. They do count toward your yearly limit.",
  },
  {
    q: "What if I'm only covered for part of the year?",
    a: "Your limit is prorated: one-twelfth for each month you were covered on the first day. Under the last-month rule, if you are covered on December 1 you can contribute the full year's amount, but you must then stay HSA-eligible through the next year or pay tax and a 10% penalty on the extra.",
  },
  {
    q: "HSA or FSA: which is better?",
    a: "An HSA needs a high-deductible plan, but the money rolls over every year, can be invested and moves with you. A health care FSA works with any plan but is mostly use-it-or-lose-it each year. If you qualify for an HSA, it is usually the more flexible choice.",
  },
];

export default async function HsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/federal-income-tax", "/us/savings/401k-calculator", "/us/savings/roth-ira-calculator", "/us/savings/retirement-calculator", "/us/savings/investment-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Health savings"
      title="HSA Calculator"
      lead="See how much federal, payroll and state tax a health savings account saves you in 2026, and what the account could grow to by 65."
      points={["2026 limits and catch-up", "Federal, FICA and state tax saved", "Growth with medical costs", "Free and private"]}
      guide={<HsaGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning. Tax rules and investment returns vary. Not tax or financial advice."
    >
      <HsaStudio query={query} />
    </FlagshipPage>
  );
}
