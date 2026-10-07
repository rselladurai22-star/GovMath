import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CompoundStudio from "./CompoundStudio";
import { ogFor } from "@/gm/og";
import CompoundGuide from "./CompoundGuide";

export const metadata: Metadata = {
  title: "Compound Interest & Investment Calculator UK",
  description:
    "Free compound interest and investment calculator for the UK. See how much interest your savings earn and how investments grow with monthly deposits.",
  alternates: { canonical: "/investing/compound-interest" },
  openGraph: ogFor("/investing/compound-interest"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/compound-interest", label: "Compound Interest" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does compound interest work?", a: "Interest is added to your balance, so the next period's interest is earned on a larger amount. Over time, interest on interest becomes a large part of the total." },
  { q: "How much will £10,000 grow in 10 years?", a: "At 5% a year added annually, £16,289. Added monthly, £16,470." },
  { q: "What is the rule of 72?", a: "Divide 72 by the annual rate to estimate how many years money takes to double: about 12 years at 6%." },
  { q: "What is AER?", a: "The annual equivalent rate, which includes the effect of compounding so accounts can be compared fairly." },
  { q: "Is compound interest guaranteed?", a: "On a fixed savings rate, yes. On investments, returns vary and can be negative in some years." },
  { q: "Does it matter when in the month I save?", a: "Only slightly. The calculator assumes payments at the end of each month." },
  { q: "What is the difference between interest and returns?", a: "Interest is paid on cash. Investment returns come from dividends and changes in value, which compound in the same way." },
  { q: "How much do I need to save to reach £100,000?", a: "It depends on the rate and time. At 5% added monthly, £10,000 plus £200 a month passes £100,000 during the 19th year (£101,675 after 19 years). Use the calculator to try your own figures." },
  { q: "Is the interest on my savings taxed?", a: "Interest above your Personal Savings Allowance is taxed at your income tax rate unless it is in an ISA or pension. Banks pay interest without taking tax off, and HMRC collects any tax through your tax code or Self Assessment." },
  { q: "Can the rate be negative?", a: "Yes. Investments can fall in value, and you can enter a negative rate to see the effect of a poor run of returns." },
  { q: "Why does the result differ from my bank's figure?", a: "Banks may add interest on a different day, use a variable rate, or calculate on daily balances. The calculator gives a close estimate, not an exact statement." },
];

export default async function CompoundPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/inflation-impact", "/investing/isa-vs-gia", "/investing/fire-calculator", "/investing/premium-bonds", "/life/percentage-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings and investments"
      title="Compound Interest Calculator"
      lead="See how your savings grow with compound interest, in pounds and in today's money."
      points={["Monthly additions", "Inflation-adjusted", "AER and doubling time", "Free and private"]}
      guide={<CompoundGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Not financial advice."
    >
      <CompoundStudio query={query} />
    </FlagshipPage>
  );
}
