import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BonusStudio from "./BonusStudio";
import BonusGuide from "./BonusGuide";

const PATH = "/us/taxes/bonus-tax-calculator";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator 2026: Take-Home Pay",
  description: "Free bonus tax calculator for 2026. See your bonus take-home after the 22% flat rate, Social Security, Medicare and state tax, and what comes back at tax time.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Bonus Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much tax is taken from a bonus in 2026?", a: "Usually 22% federal income tax, 6.2% Social Security (up to the $184,500 wage base) and 1.45% Medicare, plus state tax. On a $10,000 bonus in a state with no income tax, you keep $7,035." },
  { q: "Why is my bonus taxed so much?", a: "It isn't taxed more than salary; it is withheld differently. The flat 22% ignores your deductions and brackets, and some states use high flat rates for bonuses. The real tax is settled on your return." },
  { q: "Will I get bonus tax back?", a: "If your income puts the bonus in the 10% or 12% bracket, yes: part of the 22% comes back in your refund. In the 24% bracket or higher, you will owe more, not less." },
  { q: "What is the aggregate method?", a: "Payroll adds the bonus to a regular paycheck and withholds on the total as if you were paid that much every payday. It often withholds more than 22%, and the extra comes back when you file." },
  { q: "What is the bonus tax rate over $1 million?", a: "Supplemental wages over $1 million in a calendar year from one employer must be withheld at 37%, the top rate. The first $1 million can be withheld at 22%." },
  { q: "How much is California tax on a bonus?", a: "California withholds a flat 10.23% on bonuses and stock options, plus 1.3% State Disability Insurance. Your real California tax on the bonus depends on your bracket." },
  { q: "How much is New York tax on a bonus?", a: "New York's 2026 supplemental withholding rate is 11.70%. New York City adds 4.25% for city residents. Any excess over your real tax comes back on your state return." },
  { q: "Can I put my bonus in my 401(k)?", a: "Often yes, if your plan takes deferrals from bonuses. A traditional 401(k) deferral avoids federal income tax now, but Social Security and Medicare still apply. The 2026 limit is $24,500." },
  { q: "Is a bonus taxed at my marginal rate?", a: "Yes. On your return the bonus is added to your other income, so it is taxed at the rate of the bracket (or brackets) it falls into." },
  { q: "What does grossing up a bonus mean?", a: "Paying a larger bonus so that the amount left after withholding equals a set figure. To leave $5,000 for a single $80,000 worker in Texas, the bonus has to be about $7,107." },
  { q: "Does a bonus count toward the Social Security wage base?", a: "Yes. Once your 2026 pay passes $184,500, no more Social Security tax is taken for the year, from a bonus or from salary." },
  { q: "Should I change my W-4 after a big bonus?", a: "If the bonus puts you in the 24% bracket or above, the flat 22% under-withholds, so adding a Step 4(c) amount for the rest of the year (or making an estimated payment) avoids a bill in April." },
];

export default async function BonusPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/w4-withholding-calculator", "/us/taxes/tax-bracket-calculator", "/us/taxes/state-income-tax-calculator", "/us/savings/401k-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Supplemental wages"
      title="Bonus Tax Calculator"
      lead="See what a 2026 bonus leaves after the 22% federal flat rate, Social Security, Medicare and state tax, compare it with the aggregate method, and find out whether some comes back at tax time."
      points={["22% and 37% flat rates", "Aggregate method compared", "State bonus rates", "Real tax versus withholding"]}
      guide={<BonusGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 based on IRS and state withholding rules. Your employer's payroll may differ by a few dollars. Not tax advice."
    >
      <BonusStudio query={query} />
    </FlagshipPage>
  );
}
