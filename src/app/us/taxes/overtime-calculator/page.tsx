import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import OvertimeStudio from "./OvertimeStudio";
import OvertimeGuide from "./OvertimeGuide";

const PATH = "/us/taxes/overtime-calculator";

export const metadata: Metadata = {
  title: "Overtime Calculator: Time and a Half Pay 2026",
  description:
    "Free overtime calculator for 2026. Work out time-and-a-half and double-time pay for a week, and the tax you save with the new deduction for overtime.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Overtime Pay Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I calculate time and a half?",
    a: "Multiply your regular hourly rate by 1.5 to get the overtime rate, then multiply by your overtime hours. At $20 an hour, the overtime rate is $30, so 10 overtime hours add $300 to a week's pay.",
  },
  {
    q: "When does overtime start under federal law?",
    a: "After 40 hours worked in a workweek. The Fair Labor Standards Act does not require overtime for long days, weekends or holidays as such, only for hours over 40 in the week, and each week stands alone.",
  },
  {
    q: "Who is exempt from overtime?",
    a: "Mainly executive, administrative and professional employees who are paid a salary of at least $684 a week ($35,568 a year) and meet the duties tests. Highly compensated employees earning at least $107,432 a year face a lighter duties test. Some jobs have their own exemptions.",
  },
  {
    q: "What happened to the higher salary threshold from 2024?",
    a: "A federal court struck down the Department of Labor's 2024 rule in November 2024, before its second increase took effect. The Department now applies the 2019 level of $684 a week, and in 2026 it removed the 2024 rule from the regulations.",
  },
  {
    q: "Is overtime tax-free now?",
    a: "Not exactly. For 2025 to 2028, you can deduct the extra half of time-and-a-half pay, up to $12,500 a year ($25,000 on a joint return), when you file. The rest of your overtime pay is taxed as usual, and Social Security, Medicare and most state taxes still apply.",
  },
  {
    q: "Who can claim the overtime deduction?",
    a: "Non-exempt workers who receive overtime that the Fair Labor Standards Act requires. You need a Social Security number on the return, and married couples must file jointly. It is available whether or not you itemize.",
  },
  {
    q: "Does the overtime deduction phase out?",
    a: "Yes. The limit falls by $100 for each $1,000 (or part of $1,000) of modified AGI over $150,000, or $300,000 on a joint return. A single filer with $180,000 can deduct up to $9,500; at $275,000 the deduction is gone.",
  },
  {
    q: "Does double time count for the deduction?",
    a: "Only the part federal law requires: half the regular rate for hours over 40. Double time paid under state law or a union contract is welcome extra pay, but the premium above time and a half does not qualify.",
  },
  {
    q: "Where do I find my qualified overtime?",
    a: "From 2026, employers report qualified overtime pay on Form W-2 in box 12 with code TT. For 2025, the IRS let workers use reasonable methods, such as pay stubs, to work it out.",
  },
  {
    q: "Does California pay overtime by the day?",
    a: "Yes. California pays time and a half for hours over 8 in a workday and double time over 12, and has special rules for the seventh day worked in a row. A few other states have daily rules too.",
  },
  {
    q: "Can my employer give me time off instead of overtime pay?",
    a: "Not in the private sector. Private employers must pay overtime in cash. Public-sector employers can offer compensatory time off at time and a half in some cases.",
  },
  {
    q: "Do bonuses change my overtime rate?",
    a: "They can. The regular rate includes most nondiscretionary pay, such as shift differentials and production bonuses, so overtime is worked out on that higher rate. Discretionary gifts are left out.",
  },
];

export default async function OvertimePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/salary-to-hourly", "/us/taxes/federal-income-tax", "/us/taxes/tax-bracket-calculator", "/everyday/timesheet-decimal"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Overtime pay"
      title="Overtime Pay Calculator"
      lead="See a week's pay with time and a half and double time, what your overtime adds up to over a year, and the federal tax the new overtime deduction saves you."
      points={["Time and a half", "Double time", "No tax on overtime", "FLSA rules"]}
      guide={<OvertimeGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates before tax unless stated. The deduction applies to federal income tax for 2025 to 2028. Not legal or tax advice."
    >
      <OvertimeStudio query={query} />
    </FlagshipPage>
  );
}
