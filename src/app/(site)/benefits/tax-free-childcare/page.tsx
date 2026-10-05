import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TfcStudio from "./TfcStudio";
import TfcGuide from "./TfcGuide";

export const metadata: Metadata = {
  title: "Tax-Free Childcare Calculator (2026/27)",
  description:
    "Work out your Tax-Free Childcare top-up: £2 for every £8 you pay, up to £2,000 a year per child or £4,000 if disabled, and compare it with Universal Credit childcare help.",
  alternates: { canonical: "/benefits/tax-free-childcare" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/tax-free-childcare", label: "Tax-Free Childcare" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does Tax-Free Childcare work?", a: "You pay into an online account and the government adds £2 for every £8, which is 20% of your childcare costs." },
  { q: "What is the most I can get?", a: "£2,000 a year per child, or £4,000 for a disabled child, paid as up to £500 or £1,000 a quarter." },
  { q: "Who can get Tax-Free Childcare?", a: "Working parents of children aged 11 or under (16 if disabled), each earning at least 16 hours a week at their minimum wage and under £100,000." },
  { q: "Can I use it with 30 hours free childcare?", a: "Yes. Tax-Free Childcare can pay for hours and charges not covered by the funded hours." },
  { q: "Can I get it on Universal Credit?", a: "No. You must choose one. Universal Credit can pay back up to 85% of childcare costs, which is often better for lower earners." },
];

export default async function TfcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/free-childcare-hours", "/benefits/universal-credit", "/benefits/child-benefit", "/benefits/high-income-child-benefit", "/benefits/maternity-pay", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="UK-wide 2026/27"
      title="Tax-Free Childcare Calculator"
      lead="See how much the government adds to your childcare costs, and whether Universal Credit would pay more."
      points={["20% top-up", "Up to three children", "Universal Credit comparison", "Free and private"]}
      guide={<TfcGuide />}
      faqs={FAQS}
      related={related}
      note="Tax-Free Childcare, 2026/27. Not financial advice."
    >
      <TfcStudio query={query} />
    </FlagshipPage>
  );
}
