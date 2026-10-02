import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TaxBracketStudio from "./TaxBracketStudio";
import TaxBracketGuide from "./TaxBracketGuide";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator: Which UK Tax Band Am I In? (2026/27)",
  description:
    "Find your UK Income Tax band for 2026/27, your marginal and effective rate, how far you are from the next band, and how pension contributions or Gift Aid move you down.",
  alternates: { canonical: "/tax-and-salary/tax-bracket-checker" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/tax-bracket-checker", label: "Tax Bracket" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What tax band am I in?", a: "In England, Wales and Northern Ireland for 2026/27: up to £12,570 is tax-free, £12,570 to £50,270 is basic rate (20%), £50,270 to £125,140 is higher rate (40%) and above £125,140 is additional rate (45%). Scotland has six bands, with 42% starting at £43,663." },
  { q: "If I move into a higher tax band, is all my income taxed more?", a: "No. Only the income above the threshold is taxed at the higher rate. Everything below it is taxed exactly as before, so a pay rise always leaves you better off after Income Tax." },
  { q: "What is the 60% tax trap?", a: "Between £100,000 and £125,140 your Personal Allowance is reduced by £1 for every £2 of income. Combined with 40% tax, that makes an effective rate of 60%, or 62% with National Insurance." },
  { q: "How can I get into a lower tax band?", a: "Pension contributions and Gift Aid reduce your adjusted net income. Salary sacrifice reduces it directly; personal pension contributions and Gift Aid extend your basic-rate band by the grossed-up amount." },
  { q: "Do savings and dividends count towards my tax band?", a: "Yes. They are added on top of your earnings. Your band then decides your Personal Savings Allowance (£1,000 basic, £500 higher, £0 additional) and your dividend tax rate. Money in ISAs does not count." },
];

export default async function TaxBracketPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/scottish-tax", "/tax-and-salary/bonus-tax", "/investing/pension-tax-relief", "/benefits/high-income-child-benefit", "/investing/dividend-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Tax Bracket Calculator"
      lead="See which Income Tax band you are in, what the next £1 is really taxed at, and how to move down a band."
      points={["England, Wales, NI and Scotland", "Marginal and effective rate", "Pension and Gift Aid", "Free and private"]}
      guide={<TaxBracketGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year, for earned income with a standard tax code. GovMath is not affiliated with HMRC."
    >
      <TaxBracketStudio query={query} />
    </FlagshipPage>
  );
}
