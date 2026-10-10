import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import IraStudio from "./IraStudio";
import IraGuide from "./IraGuide";

const PATH = "/us/savings/ira-calculator";

export const metadata: Metadata = {
  title: "Traditional IRA Calculator 2026: Deduction",
  description:
    "Free traditional IRA calculator for 2026. Check how much you can deduct, the tax you save now, growth to retirement and what you keep after tax.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Traditional IRA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much can I put in a traditional IRA in 2026?",
    a: "$7,500, or $8,600 if you are 50 or older by the end of the year, but no more than your earned income. The limit is shared with Roth IRAs: $3,000 in a Roth leaves room for $4,500 in a traditional IRA.",
  },
  {
    q: "Can I deduct my traditional IRA contribution?",
    a: "If neither you nor your spouse is covered by a retirement plan at work, yes, in full at any income. If you are covered, the deduction phases out between $81,000 and $91,000 of modified AGI for single filers and $129,000 to $149,000 for married couples filing jointly in 2026.",
  },
  {
    q: "What if only my spouse has a workplace plan?",
    a: "If you aren't covered but your spouse is, and you file jointly, your deduction phases out between $242,000 and $252,000 of modified AGI in 2026. Below that you can deduct the full amount.",
  },
  {
    q: "How is a partial deduction worked out?",
    a: "The deductible amount falls in proportion to how far your income is into the phase-out range, rounded up to the next $10, with at least $200 allowed while you're inside the range. A single filer under 50 with modified AGI of $86,000 and a workplace plan can deduct $3,750.",
  },
  {
    q: "How much tax does an IRA deduction save?",
    a: "Your contribution times your marginal tax rate, federal plus state. A single filer earning $85,000 saves about $1,650 of federal tax on a $7,500 deduction, because it all comes off income taxed at 22%. The calculator works it out from the 2026 brackets.",
  },
  {
    q: "Can I contribute if I can't deduct it?",
    a: "Yes. Anyone with earned income can make a nondeductible contribution. The growth is still tax-deferred, and the after-tax amount (your basis) comes out tax-free later. You must report it on Form 8606 each year.",
  },
  {
    q: "Traditional or Roth IRA: which is better?",
    a: "If your tax rate in retirement will be lower than now, a deductible traditional IRA usually leaves you with more. If it will be the same or higher, a Roth usually wins. With equal rates, they come out exactly the same.",
  },
  {
    q: "When can I take money out of a traditional IRA?",
    a: "Any time, but withdrawals before 59½ usually cost a 10% penalty on top of income tax. Exceptions include disability, up to $10,000 for a first home, qualified higher education costs, certain medical bills and a series of substantially equal payments.",
  },
  {
    q: "What is the deadline for 2026 contributions?",
    a: "April 15, 2027, the tax filing deadline. You can make a 2026 contribution from January 1, 2026 until then, and claim the deduction on your 2026 return even if you contribute in 2027.",
  },
  {
    q: "Do traditional IRAs have required minimum distributions?",
    a: "Yes. From 73 (or 75 if you were born in 1960 or later) you must withdraw a minimum amount each year, based on your balance and the IRS life expectancy table, and pay income tax on it.",
  },
  {
    q: "Can a non-working spouse have a traditional IRA?",
    a: "Yes. With a spousal IRA, a married couple filing jointly can each contribute up to the limit as long as their joint earned income covers both contributions.",
  },
  {
    q: "Is there an age limit for contributing?",
    a: "No. Since 2020 you can contribute at any age as long as you have earned income. There is no lower age limit either, so a teenager with a job can have an IRA.",
  },
];

export default async function IraPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/roth-ira-calculator", "/us/savings/roth-conversion-calculator", "/us/savings/401k-calculator", "/us/savings/rmd-calculator", "/us/taxes/tax-bracket-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 limits"
      title="Traditional IRA Calculator"
      lead="Check how much of a traditional IRA contribution you can deduct in 2026, the tax it saves you now, how it could grow, and what you keep after tax in retirement."
      points={["2026 deduction phase-outs", "Tax saved now", "Growth and tax later", "Compared with a Roth"]}
      guide={<IraGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on 2026 IRS limits and tax brackets and steady returns. Not tax or financial advice."
    >
      <IraStudio query={query} />
    </FlagshipPage>
  );
}
