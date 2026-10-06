import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DrawdownStudio from "./DrawdownStudio";
import DrawdownGuide from "./DrawdownGuide";

export const metadata: Metadata = {
  title: "Pension Drawdown Calculator UK: How Long Will My Pension Last? (2026/27)",
  description:
    "See how long your pension pot lasts in drawdown: 25% tax-free cash upfront or phased, Income Tax with the State Pension, inflation and growth, for 2026/27.",
  alternates: { canonical: "/investing/pension-drawdown" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/pension-drawdown", label: "Pension Drawdown Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How long will my pension last in drawdown?", a: "It depends on the pot, withdrawals and growth. £250,000 at 66, with 25% taken tax-free and £15,000 a year withdrawn, lasts to about 79 at 4% growth." },
  { q: "How much tax-free cash can I take?", a: "Usually 25% of your pension, up to the Lump Sum Allowance of £268,275 across all your pensions." },
  { q: "Is pension drawdown taxed?", a: "Yes. Apart from the tax-free part, withdrawals are added to your income for the year and taxed at your normal rates." },
  { q: "What is a safe withdrawal rate?", a: "A common rule of thumb is 4% of the pot in the first year, rising with inflation, though 3% to 3.5% may be safer for early retirees." },
  { q: "What is UFPLS?", a: "An uncrystallised funds pension lump sum: a withdrawal where 25% is tax-free and 75% is taxed, instead of taking all the tax-free cash at once." },
  { q: "Does drawdown affect how much I can pay into a pension?", a: "Yes. Taking taxable income triggers the Money Purchase Annual Allowance: £10,000 a year instead of £60,000." },
  { q: "Why was my first drawdown payment taxed so much?", a: "Providers often use an emergency tax code. You can reclaim the excess from HMRC or wait for your tax code to correct it." },
  { q: "When can I start drawdown?", a: "From 55, rising to 57 from April 2028, unless you have a protected pension age." },
  { q: "What happens to my drawdown pot when I die?", a: "It passes to your beneficiaries. Tax-free if you die before 75; taxed at their rate after. From April 2027 it counts for inheritance tax too." },
  { q: "Should I choose drawdown or an annuity?", a: "Drawdown is flexible but not guaranteed; an annuity guarantees income for life. Many people use both." },
  { q: "Can I take all my pension as cash?", a: "Yes, from 55 (57 from 2028), but only 25% is tax-free and the rest is taxed as income in the year you take it, which can mean a large tax bill." },
  { q: "How often can I take money in drawdown?", a: "As often as your provider allows: regular monthly income, occasional lump sums, or nothing for a while." },
  { q: "Can I go back into drawdown after buying an annuity?", a: "Not with the money used for the annuity, which cannot usually be cashed in. Keep part of your pot in drawdown if you want flexibility." },
];

export default async function DrawdownPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/annuity", "/investing/state-pension-age", "/investing/workplace-pension", "/investing/fire-calculator", "/investing/pension-tax-relief", "/life/inheritance-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Pension Drawdown Calculator"
      lead="See how long your pension pot could last, what you take home after tax, and how tax-free cash and withdrawals change the picture."
      points={["Tax-free cash options", "Tax with State Pension", "Inflation and growth", "Free and private"]}
      guide={<DrawdownGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration with steady growth. Real returns vary. Pension Wise offers free guidance before you decide."
    >
      <DrawdownStudio query={query} />
    </FlagshipPage>
  );
}
