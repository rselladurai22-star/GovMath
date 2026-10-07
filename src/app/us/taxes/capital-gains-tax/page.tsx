import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CapitalGainsStudio from "./CapitalGainsStudio";
import CapitalGainsGuide from "./CapitalGainsGuide";

const PATH = "/us/taxes/capital-gains-tax";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator 2026",
  description:
    "Free capital gains tax calculator for 2026. See federal and state tax on stocks, crypto or a home sale, short vs long term, with the 0%, 15% and 20% rates and NIIT.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Capital Gains Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the capital gains tax rates for 2026?", a: "Long-term gains (assets held more than a year) are taxed at 0%, 15% or 20%. For single filers, 0% applies up to $49,450 of total taxable income and 20% above $545,500. Short-term gains are taxed at ordinary rates of 10% to 37%." },
  { q: "How much tax will I pay on a $20,000 gain?", a: "A single person with $60,000 of wages pays $2,167.50 of federal tax on a $20,000 long-term gain in 2026, or $3,750 if it is short-term." },
  { q: "How long do I have to hold an investment for long-term rates?", a: "More than one year. The holding period starts the day after you buy, so sell no earlier than the day after the one-year anniversary." },
  { q: "Do I pay capital gains tax when I sell my house?", a: "Usually not. If you owned and lived in it for 2 of the last 5 years, up to $250,000 of gain is tax-free, or $500,000 for married couples filing jointly." },
  { q: "Can I pay 0% on capital gains?", a: "Yes, on the part of a long-term gain that fits under $49,450 of taxable income for single filers or $98,900 for married couples filing jointly in 2026." },
  { q: "What is the net investment income tax?", a: "A 3.8% tax on investment income, including gains, for people with modified AGI over $200,000 single, $250,000 married filing jointly or $125,000 married filing separately." },
  { q: "How much of a capital loss can I deduct?", a: "Losses offset gains in full. A net loss reduces other income by up to $3,000 a year ($1,500 married filing separately), and the rest carries forward." },
  { q: "How is crypto taxed?", a: "As property. Selling, swapping or spending crypto is a sale, taxed at short or long-term rates depending on how long you held it." },
  { q: "Do states tax capital gains?", a: "Most states tax them as ordinary income. States without income tax do not, except Washington, which taxes large long-term gains on stocks and similar assets." },
  { q: "Do capital gains push my wages into a higher bracket?", a: "No. Long-term gains are stacked on top of your other income, so they never change the tax on your wages, though they can raise the rate on the gain itself and affect phase-outs." },
  { q: "When do I pay capital gains tax?", a: "With your 2026 return by April 15, 2027, but a large gain may call for an estimated payment in the quarter of the sale to avoid a penalty." },
  { q: "What is cost basis?", a: "What you paid for the asset plus buying costs, adjusted for things like reinvested dividends and home improvements. Inherited assets take their value at the date of death." },
];

export default async function CapitalGainsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/federal-income-tax", "/us/taxes/tax-bracket-calculator", "/us/savings/compound-interest-calculator", "/us/savings/roth-ira-calculator", "/us/housing/mortgage-affordability", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 capital gains rates"
      title="Capital Gains Tax Calculator"
      lead="Work out the federal and state tax on selling stocks, funds, crypto or property in 2026, with short and long-term rates, the 3.8% investment tax, losses and the home sale exclusion."
      points={["0%, 15% and 20% rates", "Short vs long term", "Home sale exclusion", "Every state"]}
      guide={<CapitalGainsGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate for tax year 2026. State figures use your state's flat rate or the rate you enter. Not tax advice."
    >
      <CapitalGainsStudio query={query} />
    </FlagshipPage>
  );
}
