import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CompoundStudio from "./CompoundStudio";
import CompoundGuide from "./CompoundGuide";

export const metadata: Metadata = {
  title: "Compound Interest Calculator UK",
  description:
    "See how savings or investments grow with compound interest, with monthly additions, rising contributions, compounding frequency, AER and inflation-adjusted results.",
  alternates: { canonical: "/investing/compound-interest" },
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
