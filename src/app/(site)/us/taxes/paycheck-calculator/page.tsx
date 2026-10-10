import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PaycheckStudio from "./PaycheckStudio";
import PaycheckGuide from "./PaycheckGuide";

const PATH = "/us/taxes/paycheck-calculator";

export const metadata: Metadata = {
  title: "Paycheck Calculator 2026: Take-Home Pay",
  description:
    "Free paycheck calculator for 2026. See take-home pay per paycheck after federal tax, Social Security, Medicare, state tax and 401(k), for salary or hourly pay.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Paycheck Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is $60,000 a year after taxes?", a: "For a single person in Texas paid every two weeks in 2026, about $1,938 a paycheck, or $50,390 a year. In a state with income tax it is lower: about $47,565 in Illinois or $47,970 in California." },
  { q: "What percentage of my paycheck goes to taxes?", a: "Usually 15% to 25% for most earners: 7.65% for Social Security and Medicare, plus federal income tax and any state tax. On $60,000 in Texas it is about 16%." },
  { q: "How is federal tax withheld from my paycheck?", a: "Your employer uses your Form W-4 and the IRS tables in Publication 15-T. They turn your pay into a yearly figure, take off the standard deduction, apply the 2026 brackets and divide the tax across your paychecks." },
  { q: "What is FICA on my pay stub?", a: "FICA is Social Security (6.2% of pay up to $184,500 in 2026) and Medicare (1.45% of all pay, plus 0.9% above $200,000 single or $250,000 married filing jointly)." },
  { q: "Does a 401(k) lower my taxes?", a: "A traditional 401(k) lowers federal and most state income tax, but not Social Security or Medicare. A Roth 401(k) does not lower your tax now, but qualified withdrawals are tax-free." },
  { q: "Why is my paycheck different from the calculator?", a: "Payroll tables round, some states have credits or payroll taxes we leave out (such as paid family leave contributions), and your stub may include benefits, garnishments or a different W-4 setting. The difference is usually a few dollars a paycheck." },
  { q: "Is biweekly the same as twice a month?", a: "No. Biweekly is every two weeks, 26 paychecks a year. Twice a month (semimonthly) is 24 paychecks, so each one is a little bigger." },
  { q: "Which states have no income tax?", a: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming do not tax wages." },
  { q: "Should I claim my children on my W-4?", a: "Yes, if you will claim them on your return. Step 3 lowers withholding by $2,200 for each child under 17 and $500 for other dependents, so you get the credit through your paychecks instead of waiting for a refund." },
  { q: "How are bonuses taxed?", a: "Employers often withhold a flat 22% federal tax on bonuses, plus Social Security, Medicare and state tax. Your real tax is settled on your return, so you may get some back or owe more." },
  { q: "Do health insurance premiums lower my taxes?", a: "Yes, when paid through your employer's cafeteria (Section 125) plan. They come out before income tax, Social Security and Medicare." },
  { q: "How do I get a bigger paycheck?", a: "Update your W-4 if you have children or deductions, check you are not having extra tax withheld, and use pre-tax benefits such as an HSA. If you usually get a large refund, you are having too much withheld." },
];

export default async function PaycheckPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/federal-income-tax", "/us/taxes/salary-to-hourly", "/us/taxes/overtime-calculator", "/us/taxes/tax-bracket-calculator", "/us/savings/401k-calculator", "/us/housing/rent-affordability"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 take-home pay"
      title="Paycheck Calculator"
      lead="See what lands in your bank account each payday after federal and state tax, Social Security, Medicare and your 401(k), for salary or hourly pay in all 50 states."
      points={["2026 federal brackets", "All 50 states and DC", "401(k), Roth and benefits", "Salary or hourly"]}
      guide={<PaycheckGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 based on IRS and state rates. Your employer's payroll may differ slightly. Not tax advice."
    >
      <PaycheckStudio query={query} />
    </FlagshipPage>
  );
}
