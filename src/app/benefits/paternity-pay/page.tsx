import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PaternityStudio from "./PaternityStudio";
import PaternityGuide from "./PaternityGuide";

export const metadata: Metadata = {
  title: "Paternity Pay Calculator (SPP 2026/27)",
  description:
    "Work out Statutory Paternity Pay for 2026/27: £194.32 a week or 90% of earnings, for one or two weeks, with employer top-ups and the April 2026 day-one leave right.",
  alternates: { canonical: "/benefits/paternity-pay" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/paternity-pay", label: "Paternity Pay" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is paternity pay in 2026/27?", a: "£194.32 a week, or 90% of your average weekly earnings if that is less, for up to two weeks." },
  { q: "Who can get paternity pay?", a: "Employees with 26 weeks' service by the 15th week before the due week, earning at least £129 a week on average." },
  { q: "Is paternity leave a day-one right?", a: "Yes, for leave starting on or after 6 April 2026. The pay still needs 26 weeks' service." },
  { q: "Can I split my paternity leave?", a: "Yes. You can take the two weeks together or as two separate weeks, within 52 weeks of the birth." },
  { q: "Is paternity pay taxed?", a: "Yes. It is paid through payroll with Income Tax and National Insurance deducted." },
  { q: "Can I take paternity leave if I start a new job during the pregnancy?", a: "Yes, from April 2026 the leave is a day-one right. You may not get SPP without 26 weeks' service." },
  { q: "Do I get paternity leave for twins?", a: "No extra. The two weeks are per pregnancy or adoption, not per child." },
  { q: "Can I be dismissed for taking paternity leave?", a: "No. You are protected from detriment or dismissal for taking or asking for paternity leave." },
  { q: "Does holiday build up while I am on paternity leave?", a: "Yes. Your normal holiday continues to build up." },
  { q: "Can I take paternity leave if my baby is stillborn?", a: "Yes. Paternity leave and pay still apply if a baby is stillborn after 24 weeks of pregnancy or dies after birth." },
  { q: "Do agency workers get paternity pay?", a: "Agency workers who are employees of the agency for tax purposes may qualify for SPP, though they may not have the right to the leave itself. Check with the agency." },
  { q: "Can I take paternity leave part-time?", a: "No. Each week must be taken as a whole week, not as odd days. You can use holiday for odd days instead." },
  { q: "What if I have two jobs?", a: "You can get paternity leave and pay from each employer, as long as you qualify with each one separately." },
  { q: "Does paternity pay count towards my State Pension?", a: "Yes. Statutory Paternity Pay above the Lower Earnings Limit keeps your National Insurance record going for those weeks." },
  { q: "Can I change my paternity leave dates?", a: "Yes, with 28 days' notice of the new dates, or as soon as reasonably practicable if the baby arrives early or late." },
];

export default async function PaternityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/shared-parental-leave", "/benefits/maternity-pay", "/benefits/child-benefit", "/benefits/free-childcare-hours", "/tax-and-salary/holiday-entitlement", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Paternity Pay Calculator"
      lead="See what you will be paid on paternity leave, and how much less than normal pay that is."
      points={["£194.32 a week", "One or two weeks", "Employer top-ups", "Free and private"]}
      guide={<PaternityGuide />}
      faqs={FAQS}
      related={related}
      note="Great Britain, 2026/27 rates. Not financial advice."
    >
      <PaternityStudio query={query} />
    </FlagshipPage>
  );
}
