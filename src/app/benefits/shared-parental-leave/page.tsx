import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SharedStudio from "./SharedStudio";
import SharedGuide from "./SharedGuide";

export const metadata: Metadata = {
  title: "Shared Parental Leave and Pay Calculator (2026/27)",
  description:
    "Plan Shared Parental Leave: see how up to 50 weeks of leave and 37 weeks of pay split between parents, what each gets, and how switching early affects the total.",
  alternates: { canonical: "/benefits/shared-parental-leave" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/shared-parental-leave", label: "Shared Parental Leave" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much Shared Parental Leave can we take?", a: "Up to 50 weeks of leave and 37 weeks of pay, shared between both parents, after the mother's compulsory first two weeks." },
  { q: "How much is Shared Parental Pay?", a: "£194.32 a week, or 90% of average weekly earnings if that is less, in 2026/27." },
  { q: "Who qualifies for Shared Parental Leave?", a: "The parent taking leave needs 26 weeks with their employer by the 15th week before the due week; the other parent must have worked 26 of the 66 weeks before and earned £390 in 13 of them." },
  { q: "Can both parents be off at the same time?", a: "Yes, as long as the total weeks taken stay within the shared allowance." },
  { q: "Does sharing leave reduce the total pay?", a: "Usually not on statutory pay, unless the mother switches before 6 weeks and loses the 90% weeks, or paid weeks go unused." },
];

export default async function SharedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/maternity-pay", "/benefits/paternity-pay", "/benefits/child-benefit", "/benefits/free-childcare-hours", "/benefits/tax-free-childcare", "/tax-and-salary/holiday-entitlement"].includes(c.href));
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
