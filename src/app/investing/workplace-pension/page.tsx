import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import WorkplaceStudio from "./WorkplaceStudio";
import { ogFor } from "@/gm/og";
import WorkplaceGuide from "./WorkplaceGuide";

export const metadata: Metadata = {
  title: "Workplace Pension Calculator UK 2026/27",
  description:
    "Free auto-enrolment pension calculator for 2026/27. See employee and employer contributions, tax relief and what your pot could be worth at retirement.",
  alternates: { canonical: "/investing/workplace-pension" },
  openGraph: ogFor("/investing/workplace-pension"),
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
  { q: "Do I have to be in a workplace pension?", a: "No, you can opt out, but you lose your employer's contributions and the tax relief." },
  { q: "Can I pay in more than the minimum?", a: "Yes, up to the annual allowance of £60,000 a year, including employer contributions, limited to your earnings for tax relief." },
  { q: "What if I am self-employed?", a: "You are not auto-enrolled. You can set up a personal pension or SIPP and get the same tax relief." },
  { q: "Can my employer pay less than 3%?", a: "No, not on qualifying earnings. If your employer uses a different basis, such as basic pay, it must still meet one of the legal tests that give at least the same overall result." },
  { q: "What happens to my pension if I die?", a: "It can usually be passed to the people you nominate. Fill in an expression of wish form with your provider and keep it up to date. From April 2027, unused pensions count towards your estate for inheritance tax." },
  { q: "Is my pension safe if my employer goes bust?", a: "Your pot is held by the pension provider, separately from your employer, so it is not lost if your employer fails. Contributions owed but not paid may be recoverable." },
  { q: "Do the thresholds change each year?", a: "The government reviews them each year. For 2026/27 they are unchanged: £10,000 to be enrolled, and qualifying earnings from £6,240 to £50,270." },
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
