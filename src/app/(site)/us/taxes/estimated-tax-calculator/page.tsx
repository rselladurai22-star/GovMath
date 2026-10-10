import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EstimatedStudio from "./EstimatedStudio";
import EstimatedGuide from "./EstimatedGuide";

const PATH = "/us/taxes/estimated-tax-calculator";

export const metadata: Metadata = {
  title: "Estimated Tax Calculator 2026: Quarterly Payments",
  description: "Free estimated tax calculator for 2026. Work out your quarterly payments, the safe harbor that avoids the IRS penalty, and what is left to pay in April 2027.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Quarterly Estimated Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When are 2026 estimated tax payments due?", a: "April 15, June 15 and September 15, 2026, and January 15, 2027. Any balance is due with your return by April 15, 2027." },
  { q: "Who has to make estimated tax payments?", a: "Anyone who expects to owe $1,000 or more for 2026 after withholding and refundable credits: freelancers, 1099 contractors, landlords, investors and retirees with little tax withheld." },
  { q: "How much should I pay each quarter?", a: "A quarter of the smaller of 90% of your 2026 tax and 100% of your 2025 tax (110% if your 2025 AGI was over $150,000), less any withholding. Paying that on time means no penalty." },
  { q: "What is the safe harbor for estimated tax?", a: "Paying in at least 90% of this year's tax or 100% of last year's tax (110% for higher incomes) through withholding and on-time estimates. Meet it and there is no underpayment penalty, even if you owe more in April." },
  { q: "What if my 2025 AGI was over $150,000?", a: "The prior-year safe harbor rises to 110% of your 2025 tax. The line is $75,000 if you are married filing separately." },
  { q: "How much is the penalty for missing a payment?", a: "It works like interest on each late or short installment, at the IRS underpayment rate (6% to 7% a year in 2026), from the due date until you pay or until April 15, 2027." },
  { q: "Does withholding count toward estimated tax?", a: "Yes, and it is treated as paid evenly on the four due dates, however late in the year it was taken. Raising withholding late in the year can fix earlier quarters, which an estimated payment cannot." },
  { q: "Do I need to pay estimated tax in my first year of freelancing?", a: "If you had no tax liability for 2025 and were a US citizen or resident all year, there is no penalty for 2026. Otherwise the 90% or prior-year rules apply." },
  { q: "Do estimated payments include self-employment tax?", a: "Yes. Estimated payments cover income tax and self-employment tax together, and for many freelancers the 15.3% self-employment tax is the larger part." },
  { q: "Can I skip the January payment?", a: "Yes, if you file your 2026 return and pay all the tax due by February 1, 2027 (January 31 falls on a Sunday)." },
  { q: "What if my income is uneven during the year?", a: "The annualized income installment method on Form 2210 lets you pay less in quarters when you earned less. It can remove or reduce a penalty for seasonal or late-year income." },
  { q: "How do I pay estimated tax?", a: "Online with IRS Direct Pay, through your IRS online account, by EFTPS, by debit or credit card (with a fee), or by check with a Form 1040-ES voucher. Choose tax year 2026 and \"estimated tax\"." },
  { q: "Do I also owe state estimated tax?", a: "Most states with an income tax have their own estimated payments, usually on similar dates. This calculator covers federal tax only." },
];

export default async function EstimatedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/self-employment-tax", "/us/taxes/w4-withholding-calculator", "/us/taxes/federal-income-tax", "/us/taxes/tax-refund-calculator", "/us/taxes/state-income-tax-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Pay-as-you-go tax"
      title="Quarterly Estimated Tax Calculator"
      lead="Work out your 2026 quarterly estimated tax payments, the safe harbor that keeps you clear of the IRS penalty, and how much will still be due when you file in April 2027."
      points={["Four 2026 due dates", "90%, 100% and 110% safe harbors", "Withholding counted", "Penalty estimate"]}
      guide={<EstimatedGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for tax year 2026 based on IRS rules for Form 1040-ES and Form 2210. Federal tax only. Not tax advice."
    >
      <EstimatedStudio query={query} />
    </FlagshipPage>
  );
}
