import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import WorkplaceStudio from "./WorkplaceStudio";
import WorkplaceGuide from "./WorkplaceGuide";

export const metadata: Metadata = {
  title: "Workplace Pension Calculator UK (Auto-Enrolment 2026/27)",
  description:
    "Work out your workplace pension contributions, your employer's share and tax relief under auto-enrolment, and see how big your pot could grow by retirement.",
  alternates: { canonical: "/investing/workplace-pension" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/workplace-pension", label: "Workplace Pension" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the minimum workplace pension contribution?", a: "8% of qualifying earnings in total, with at least 3% from your employer. Qualifying earnings are pay between £6,240 and £50,270 in 2026/27." },
  { q: "How much will I pay on £35,000?", a: "On the minimum, you pay £119.83 a month and your employer £71.90. After tax relief, your share costs you about £95.87." },
  { q: "Who is auto-enrolled?", a: "Workers aged 22 to State Pension age earning over £10,000 a year from one job." },
  { q: "Should I opt out?", a: "Usually not. Opting out means losing your employer's contributions and tax relief." },
];

export default async function WorkplacePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/pension-tax-relief", "/investing/state-pension-age", "/investing/fire-calculator", "/tax-and-salary/salary-calculator", "/tax-and-salary/salary-sacrifice"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Pensions"
      title="Workplace Pension Calculator"
      lead="See what you and your employer pay in, what it costs you after tax relief, and what your pot could be worth."
      points={["2026/27 thresholds", "Employer match", "Pot projection", "Free and private"]}
      guide={<WorkplaceGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Investment returns are not guaranteed. Not financial advice."
    >
      <WorkplaceStudio query={query} />
    </FlagshipPage>
  );
}
