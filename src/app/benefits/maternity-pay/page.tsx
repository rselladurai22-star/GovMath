import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MaternityStudio from "./MaternityStudio";
import { ogFor } from "@/gm/og";
import MaternityGuide from "./MaternityGuide";

export const metadata: Metadata = {
  title: "Maternity Pay Calculator UK 2026/27 (SMP)",
  description:
    "Free Statutory Maternity Pay calculator for 2026/27. See 39 weeks of SMP week by week, the 90% first six weeks, key dates and Maternity Allowance.",
  alternates: { canonical: "/benefits/maternity-pay" },
  openGraph: ogFor("/benefits/maternity-pay"),
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
  { q: "Can I get SMP from two employers?", a: "Yes, if you qualify with each of them separately." },
  { q: "What if my baby is born early?", a: "Leave starts the day after the birth, and SMP rules are adjusted so you are not penalised for a premature birth." },
  { q: "Do I get SMP if I am leaving my job?", a: "Yes. If you qualified by the qualifying week, you still get SMP even if you do not return." },
  { q: "Does SMP go up if I get a pay rise?", a: "Yes. A pay rise effective before the end of your SMP period means your employer must recalculate it." },
  { q: "Is there help for the self-employed?", a: "Maternity Allowance, if you meet the work and earnings tests, plus Universal Credit if your household income is low." },
  { q: "Can I get SMP if I am on a zero-hours contract?", a: "Yes, if you are an employee with 26 weeks' service and average earnings of at least £129 a week. If not, check Maternity Allowance." },
  { q: "What happens to my car or phone allowance?", a: "Non-cash benefits in your contract, such as a company car or gym membership, normally continue during maternity leave." },
  { q: "Can I take maternity leave if I adopt?", a: "Adopters get adoption leave and Statutory Adoption Pay instead, which follow almost the same rules and rates." },
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
