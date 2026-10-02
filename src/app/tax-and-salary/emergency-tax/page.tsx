import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EmergencyStudio from "./EmergencyStudio";
import EmergencyGuide from "./EmergencyGuide";

export const metadata: Metadata = {
  title: "Emergency Tax Calculator: How Much Have I Overpaid? (2026/27)",
  description:
    "See how much tax an emergency code (1257L M1/W1/X, BR or 0T) takes compared with the right code, how much you have overpaid so far and how to get it back. 2026/27 rates.",
  alternates: { canonical: "/tax-and-salary/emergency-tax" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/emergency-tax", label: "Emergency Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is an emergency tax code?", a: "A temporary code used until HMRC sends your employer the right one. Codes ending W1, M1 or X are non-cumulative, so each payslip is taxed on its own and any unused tax-free allowance from earlier in the year is ignored." },
  { q: "How do I get off an emergency tax code?", a: "Give your employer your P45 or complete the starter checklist, and check your code in the HMRC app or your personal tax account. HMRC then sends the right code, usually within one or two payslips." },
  { q: "Will I get emergency tax back?", a: "Yes, if you overpaid. It is usually refunded through your payslip once your code is corrected, or after the tax year ends when HMRC sends a P800 calculation." },
  { q: "Is BR an emergency tax code?", a: "It can be, if your employer has no information about you. But BR is also the correct code for a second job, where your tax-free allowance is used by your main job." },
  { q: "Does emergency tax affect National Insurance?", a: "No. National Insurance does not depend on your tax code." },
];

export default async function EmergencyTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/tax-code-decoder", "/tax-and-salary/p45-p60-explainer", "/tax-and-salary/salary-calculator", "/tax-and-salary/redundancy", "/tax-and-salary/bonus-tax", "/tax-and-salary/pro-rata"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Emergency Tax Calculator"
      lead="See how much an emergency tax code is taking, what you should be paying, and how to get overpaid tax back."
      points={["1257L M1, BR and 0T", "Mid-year starters", "P45 figures included", "Free and private"]}
      guide={<EmergencyGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026/27 assuming the same pay each month. GovMath is not affiliated with HMRC. Your payslip and HMRC records are the final word."
    >
      <EmergencyStudio query={query} />
    </FlagshipPage>
  );
}
