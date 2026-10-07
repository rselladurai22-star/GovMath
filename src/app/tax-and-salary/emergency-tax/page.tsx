import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EmergencyStudio from "./EmergencyStudio";
import { ogFor } from "@/gm/og";
import EmergencyGuide from "./EmergencyGuide";

export const metadata: Metadata = {
  title: "Emergency Tax Calculator UK 2026/27",
  description:
    "Free emergency tax calculator for 2026/27. See how much you overpaid on an emergency tax code, why it happened and how to get the refund.",
  alternates: { canonical: "/tax-and-salary/emergency-tax" },
  openGraph: ogFor("/tax-and-salary/emergency-tax"),
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
  { q: "How long does an emergency tax code last?", a: "Usually one to three payslips, until HMRC sends your employer the right code." },
  { q: "Will I always get the money back?", a: "If you overpaid, yes, either through payroll or after the tax year ends. Emergency codes can occasionally lead to underpaying, for example on a second job; HMRC then collects it through your code the following year." },
  { q: "Does an emergency code affect National Insurance?", a: "No. National Insurance is worked out on each payment anyway, and does not depend on your tax code." },
  { q: "Can I ask my employer to stop using it?", a: "Your employer must use the code HMRC gives them. The way to change it is to give them your P45 or contact HMRC." },
  { q: "I started in April. Why am I on an emergency code?", a: "Usually because your employer had no P45 or starter checklist. If you started in April with no other income, an M1 code gives almost the same result as a cumulative one, so you may not be overpaying at all." },
  { q: "Can a refund agent get my money back faster?", a: "No. They use the same HMRC process you can use yourself for free, and take a share of your refund as their fee." },
  { q: "Will my employer know I was overtaxed?", a: "Payroll applies whatever code HMRC sends. Once the correct cumulative code arrives, the payroll system works out the overpayment automatically and refunds it on your next payday." },
  { q: "Does an emergency code affect my student loan?", a: "No. Student loan repayments are worked out on each payment using the plan threshold, whatever your tax code. They depend on your pay, not your tax-free allowance." },
  { q: "Is an emergency code the same as being on the wrong code?", a: "Not quite. An emergency code is temporary by design; a wrong code is a mistake. Both are fixed the same way." },
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
