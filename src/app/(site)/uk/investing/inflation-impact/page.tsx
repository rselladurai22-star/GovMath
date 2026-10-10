import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import InflationStudio from "./InflationStudio";
import { ogFor } from "@/gm/og";
import InflationGuide from "./InflationGuide";

export const metadata: Metadata = {
  title: "Inflation Calculator UK: Future Value of Money",
  description:
    "Free UK inflation calculator. See what your money will be worth in future, the real return on savings and what prices today cost in years to come.",
  alternates: { canonical: "/uk/investing/inflation-impact" },
  openGraph: ogFor("/uk/investing/inflation-impact"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/investing", label: "Pensions & Investing" },
  { href: "/uk/investing/inflation-impact", label: "Inflation Impact" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the UK inflation rate?", a: "CPI inflation was 3.1% in the year to August 2026. The Bank of England's target is 2%." },
  { q: "How much will £10,000 be worth in 10 years?", a: "Kept as cash with 3.1% inflation, it would buy what £7,369 buys today." },
  { q: "What is a real return?", a: "Your return after inflation: (1 + return) ÷ (1 + inflation) − 1. Earning 5% with 2% inflation is a real return of 2.94%." },
  { q: "How do I protect savings from inflation?", a: "Look for a savings rate above inflation, use your ISA allowance so interest is tax-free, and for long-term money consider investing." },
  { q: "What inflation rate should I use?", a: "For long-term plans, 2% to 3% is a common assumption. Test a higher figure too, as recent years show inflation can spike." },
  { q: "Does inflation affect debts?", a: "Yes, in your favour: a fixed debt, such as a fixed-rate mortgage balance, becomes smaller in real terms as prices and pay rise." },
  { q: "Is deflation good?", a: "Falling prices sound good, but sustained deflation can lead people to delay spending, which can harm the economy and jobs." },
  { q: "Why is my personal inflation different?", a: "The official figure is an average. If you spend more on energy, food or rent than the typical basket, your costs may rise faster." },
  { q: "When are the inflation figures published?", a: "The Office for National Statistics publishes CPI, CPIH and RPI each month, usually around the middle of the month, for the month before." },
  { q: "Why does the calculator default to 3.1%?", a: "It is the latest annual CPI rate, for the year to August 2026. For plans over many years, you may prefer the 2% target or a figure between the two." },
  { q: "Does inflation affect my pension?", a: "Yes. The State Pension rises each April under the triple lock. Workplace and personal pension pots need to grow faster than inflation to keep their value, and the income you draw later should be planned in today's money." },
  { q: "Is the result exact?", a: "No. It assumes the same inflation every year, while real inflation moves around. Use it to understand the scale of the effect rather than to predict an exact figure." },
];

export default async function InflationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/compound-interest", "/uk/investing/isa-vs-gia", "/uk/investing/fire-calculator", "/uk/investing/premium-bonds", "/uk/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings and prices"
      title="Inflation Impact Calculator"
      lead="See what your money will really be worth, or what things will cost, after inflation."
      points={["Latest UK CPI", "Real returns", "Tax on interest", "Free and private"]}
      guide={<InflationGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Future inflation is uncertain. Not financial advice."
    >
      <InflationStudio query={query} />
    </FlagshipPage>
  );
}
