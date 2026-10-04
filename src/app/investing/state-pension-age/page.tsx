import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SpaStudio from "./SpaStudio";
import SpaGuide from "./SpaGuide";

export const metadata: Metadata = {
  title: "State Pension Age Calculator UK",
  description:
    "Find your exact State Pension age and date from your date of birth, including the rises to 67 and 68, with your new State Pension amount and the effect of deferring.",
  alternates: { canonical: "/investing/state-pension-age" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/state-pension-age", label: "State Pension Age" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is my State Pension age?", a: "It depends on your date of birth: 66 if born before 6 April 1960, rising to 67 for people born from 6 March 1961, and 68 for people born on or after 6 April 1978 under current law." },
  { q: "When does the State Pension age rise to 67?", a: "Between 2026 and 2028, for people born between 6 April 1960 and 5 March 1961, who get a State Pension age between 66 and 1 month and 66 and 11 months." },
  { q: "How much is the State Pension?", a: "The full new State Pension is £241.30 a week in 2026/27, for people with 35 qualifying years." },
  { q: "Can I defer my State Pension?", a: "Yes. The new State Pension rises by 1% for every 9 weeks you defer, just under 5.8% a year." },
];

export default async function SpaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/workplace-pension", "/investing/fire-calculator", "/investing/pension-tax-relief", "/benefits/pension-credit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="State Pension"
      title="State Pension Age Calculator"
      lead="Find the exact date you reach State Pension age, and how much State Pension you could get."
      points={["Exact date", "Rises to 67 and 68", "Deferral", "Free and private"]}
      guide={<SpaGuide />}
      faqs={FAQS}
      related={related}
      note="Based on current law. State Pension age may change."
    >
      <SpaStudio query={query} />
    </FlagshipPage>
  );
}
