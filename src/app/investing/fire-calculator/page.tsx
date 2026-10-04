import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FireStudio from "./FireStudio";
import FireGuide from "./FireGuide";

export const metadata: Metadata = {
  title: "FIRE Calculator UK: When Can I Retire Early?",
  description:
    "Find your financial independence number and the age you could retire early, with the 4% rule, the UK State Pension, real returns and Coast FI.",
  alternates: { canonical: "/investing/fire-calculator" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/fire-calculator", label: "FIRE Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much do I need to retire early?", a: "A common rule is 25 times your yearly spending, which is a 4% withdrawal rate. Spending £30,000 a year, that is £750,000 before counting the State Pension." },
  { q: "Does the State Pension count?", a: "Yes. The full new State Pension is £12,547.60 a year in 2026/27. It reduces the pot you need, but you must bridge the years before it starts." },
  { q: "When can I access my pension?", a: "From 55, rising to 57 on 6 April 2028. ISAs can be used at any age." },
  { q: "What is Coast FI?", a: "The pot that would grow, with no more saving, to cover your retirement by State Pension age." },
];

export default async function FirePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/compound-interest", "/investing/inflation-impact", "/investing/pension-tax-relief", "/investing/state-pension-age", "/investing/workplace-pension"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Retirement planning"
      title="FIRE Calculator"
      lead="Find your financial independence number and the age you could stop needing to work."
      points={["4% rule", "UK State Pension", "Coast FI", "Free and private"]}
      guide={<FireGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Returns are not guaranteed. Not financial advice."
    >
      <FireStudio query={query} />
    </FlagshipPage>
  );
}
