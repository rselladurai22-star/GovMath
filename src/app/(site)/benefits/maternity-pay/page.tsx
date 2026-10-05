import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MaternityStudio from "./MaternityStudio";
import MaternityGuide from "./MaternityGuide";

export const metadata: Metadata = {
  title: "Maternity Pay Calculator (SMP 2026/27)",
  description:
    "Work out Statutory Maternity Pay week by week: 90% of earnings for 6 weeks then £194.32, with enhanced employer schemes, Maternity Allowance and key dates from your due date.",
  alternates: { canonical: "/benefits/maternity-pay" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/maternity-pay", label: "Maternity Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Statutory Maternity Pay in 2026/27?", a: "90% of your average weekly earnings for the first 6 weeks, then £194.32 a week or 90% of earnings if lower for the next 33 weeks." },
  { q: "Who qualifies for SMP?", a: "Employees with 26 weeks' continuous service by the 15th week before the due week, earning at least £129 a week on average." },
  { q: "What if I do not qualify for SMP?", a: "You may get Maternity Allowance: up to £194.32 a week for 39 weeks if you worked 26 of the 66 weeks before your due date." },
  { q: "Is maternity pay taxed?", a: "SMP and employer maternity pay are taxed through payroll. Maternity Allowance is not taxed." },
  { q: "When can maternity leave start?", a: "From 11 weeks before the week your baby is due, or earlier if the baby arrives early." },
];

export default async function MaternityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/shared-parental-leave", "/benefits/paternity-pay", "/benefits/child-benefit", "/benefits/free-childcare-hours", "/benefits/universal-credit", "/tax-and-salary/holiday-entitlement"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Maternity Pay Calculator"
      lead="See your maternity pay week by week, what your employer adds, and the key dates from your due date."
      points={["SMP week by week", "Enhanced schemes", "Maternity Allowance", "Free and private"]}
      guide={<MaternityGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <MaternityStudio query={query} />
    </FlagshipPage>
  );
}
