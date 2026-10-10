import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import ConversionStudio from "./ConversionStudio";
import ConversionGuide from "./ConversionGuide";

const PATH = "/us/savings/roth-conversion-calculator";

export const metadata: Metadata = {
  title: "Roth Conversion Calculator 2026: Tax and Payoff",
  description:
    "Free Roth conversion calculator for 2026. See the tax on converting a traditional IRA, the room left in your bracket and when converting pays off later.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Roth Conversion Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much tax will I pay on a Roth conversion?",
    a: "The amount you convert is added to your taxable income for the year and taxed at your ordinary rates, federal and usually state. A married couple with $60,000 of other income converting $50,000 in 2026 pays about $6,000 of federal tax, all at 12%. The calculator works it out from the 2026 brackets.",
  },
  {
    q: "Is there an income limit for Roth conversions?",
    a: "No. Anyone can convert any amount from a traditional IRA, SEP or SIMPLE IRA (after two years) or an old 401(k) to a Roth IRA, whatever their income. The income limits apply only to direct Roth IRA contributions.",
  },
  {
    q: "When does a Roth conversion make sense?",
    a: "When the tax rate you pay now is lower than the rate you expect to pay on the money later. Common windows are early retirement before Social Security and RMDs start, a year with low income, or a market dip when the account value is down.",
  },
  {
    q: "What is the break-even tax rate?",
    a: "The rate you would need to pay on traditional IRA withdrawals later for converting and not converting to come out the same. If you pay the tax from the IRA itself, it equals your average rate on the conversion. If you pay it from other savings, it is a little lower, because those savings would otherwise have faced tax on their growth.",
  },
  {
    q: "Should I pay the conversion tax from the IRA or from other savings?",
    a: "From other savings if you can. Then the whole amount lands in the Roth and grows tax-free. Paying from the IRA means less goes into the Roth, and if you are under 59½ the amount withheld for tax usually also costs a 10% penalty.",
  },
  {
    q: "What is the five-year rule for conversions?",
    a: "Each conversion starts its own five-year clock, counted from January 1 of the year you convert. If you take out converted money before the five years are up and before 59½, the 10% penalty applies. Separately, earnings are tax-free only once you are 59½ and five years have passed since your first Roth contribution or conversion.",
  },
  {
    q: "Can I undo a Roth conversion?",
    a: "No. Recharacterizing a conversion back to a traditional IRA was abolished from 2018. Plan the amount carefully, and consider converting late in the year when you know your income.",
  },
  {
    q: "Will a Roth conversion raise my Medicare premiums?",
    a: "It can. Medicare's IRMAA surcharges use your modified AGI from two years earlier. In 2026 they start above $109,000 for single filers and $218,000 for married couples filing jointly, raising the standard $202.90 Part B premium. A conversion at 63 or later can affect premiums at 65 or later.",
  },
  {
    q: "Does a Roth conversion affect Social Security taxes?",
    a: "Yes, in the conversion year, because it raises your provisional income and can make up to 85% of your benefits taxable. Converting before you claim Social Security avoids this, and lower RMDs later can reduce the tax on benefits for the rest of your life.",
  },
  {
    q: "Can I convert my RMD?",
    a: "No. Once you reach RMD age, you must take that year's required distribution first; only amounts above it can be converted.",
  },
  {
    q: "What is the pro-rata rule?",
    a: "If you have both pre-tax and after-tax money in your traditional, SEP and SIMPLE IRAs, every conversion is treated as a proportional mix of the two, based on all your IRA balances on December 31. You can't convert only the after-tax part.",
  },
  {
    q: "How much should I convert each year?",
    a: "Many people convert just enough to fill their current tax bracket, for example up to the top of the 12% or 22% bracket, and repeat each year. The calculator shows how much room is left in your bracket before the next rate starts.",
  },
];

export default async function ConversionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/roth-ira-calculator", "/us/savings/ira-calculator", "/us/savings/rmd-calculator", "/us/savings/social-security-calculator", "/us/taxes/tax-bracket-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 brackets"
      title="Roth Conversion Calculator"
      lead="See how much tax converting part of a traditional IRA to a Roth would cost in 2026, how much room is left in your bracket, and whether it pays off later."
      points={["Tax now, federal and state", "Room in your bracket", "Break-even tax rate", "Convert vs keep"]}
      guide={<ConversionGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on 2026 federal tax brackets and steady returns. Not tax or financial advice."
    >
      <ConversionStudio query={query} />
    </FlagshipPage>
  );
}
