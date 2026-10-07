import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SharedStudio from "./SharedStudio";
import { ogFor } from "@/gm/og";
import SharedGuide from "./SharedGuide";

export const metadata: Metadata = {
  title: "Shared Parental Leave Calculator 2026/27",
  description:
    "Free Shared Parental Leave calculator for 2026/27. Split up to 50 weeks of leave and 37 weeks of pay between parents and see what each of you gets.",
  alternates: { canonical: "/uk/benefits/shared-parental-leave" },
  openGraph: ogFor("/uk/benefits/shared-parental-leave"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/shared-parental-leave", label: "Shared Parental Leave" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much Shared Parental Leave can we take?", a: "Up to 50 weeks of leave and 37 weeks of pay, shared between both parents, after the mother's compulsory first two weeks." },
  { q: "How much is Shared Parental Pay?", a: "£194.32 a week, or 90% of average weekly earnings if that is less, in 2026/27." },
  { q: "Who qualifies for Shared Parental Leave?", a: "The parent taking leave needs 26 weeks with their employer by the 15th week before the due week; the other parent must have worked 26 of the 66 weeks before and earned £390 in 13 of them." },
  { q: "Can both parents be off at the same time?", a: "Yes, as long as the total weeks taken stay within the shared allowance." },
  { q: "Does sharing leave reduce the total pay?", a: "Usually not on statutory pay, unless the mother switches before 6 weeks and loses the 90% weeks, or paid weeks go unused." },
  { q: "Can we both be off at the same time?", a: "Yes. The mother can be on maternity leave while the partner takes shared leave, or both can take shared leave together." },
  { q: "Does shared leave affect my holiday?", a: "No. Holiday keeps building up during shared parental leave." },
  { q: "Can I go back to work and then take more leave?", a: "Yes, by booking up to three separate blocks before the child's first birthday." },
  { q: "What if the self-employed parent wants leave?", a: "Shared Parental Leave is only for employees, but a self-employed parent can help their employed partner qualify." },
  { q: "Is there a deadline?", a: "All shared leave must be taken within 52 weeks of the birth or placement." },
  { q: "Can grandparents take shared parental leave?", a: "Not yet. Shared Parental Leave is only for the child's parents or the mother's partner." },
  { q: "What happens if we change our minds?", a: "Each parent can vary or cancel a booked block with 8 weeks' notice, and each change counts towards the three notices." },
  { q: "Does taking shared leave affect the mother's Maternity Allowance?", a: "Yes. Ending Maternity Allowance early makes the remaining weeks available as shared pay for an eligible partner." },
  { q: "Can we use shared leave after the child's first birthday?", a: "No. All of it must be taken within 52 weeks of the birth or adoption placement." },
  { q: "Is shared parental pay taxed?", a: "Yes. Like maternity and paternity pay, it is paid through payroll with Income Tax and National Insurance deducted." },
  { q: "Does shared leave count as continuous employment?", a: "Yes. Your employment continues, holiday keeps building up, and you return to the same job if your total leave is 26 weeks or less." },
  { q: "Can the partner take shared leave while the mother is still pregnant?", a: "No. Shared leave can only start after the birth, and the mother must take at least two weeks of maternity leave first." },
  { q: "What if the baby is born early?", a: "The dates move with the birth. You can change booked leave if the baby arrives early, often with less notice than usual." },
];

export default async function SharedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/maternity-pay", "/uk/benefits/paternity-pay", "/uk/benefits/child-benefit", "/uk/benefits/free-childcare-hours", "/uk/benefits/tax-free-childcare", "/uk/tax-and-salary/holiday-entitlement"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Shared Parental Leave Calculator"
      lead="Plan how to share leave and pay after a birth or adoption, and see what each parent gets."
      points={["50 weeks to share", "Pay for each parent", "Compare plans", "Free and private"]}
      guide={<SharedGuide />}
      faqs={FAQS}
      related={related}
      note="Great Britain, 2026/27 rates. Not financial advice."
    >
      <SharedStudio query={query} />
    </FlagshipPage>
  );
}
