import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AdoptionStudio from "./AdoptionStudio";
import { ogFor } from "@/gm/og";
import AdoptionGuide from "./AdoptionGuide";

export const metadata: Metadata = {
  title: "Adoption Pay Calculator UK 2026/27 (SAP)",
  description:
    "Free Statutory Adoption Pay calculator for 2026/27. See your 39 weeks of SAP week by week, the 90% first six weeks, the weekly rate and who qualifies.",
  alternates: { canonical: "/uk/benefits/adoption-pay" },
  openGraph: ogFor("/uk/benefits/adoption-pay"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/adoption-pay", label: "Adoption Pay Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Statutory Adoption Pay in 2026/27?", a: "90% of your average weekly earnings for the first 6 weeks, then £194.32 a week or 90% of earnings, whichever is lower, for 33 weeks." },
  { q: "How long is adoption pay paid for?", a: "Up to 39 weeks. Adoption leave can last up to 52 weeks, so the last 13 weeks are unpaid unless your employer pays more." },
  { q: "Who qualifies for Statutory Adoption Pay?", a: "Employees with 26 weeks' continuous service by the week they are matched with a child, earning at least £129 a week on average." },
  { q: "Is adoption leave a day-one right?", a: "Yes. Employees can take adoption leave from their first day. Pay needs 26 weeks' service." },
  { q: "Can both adopters get adoption pay?", a: "No. One takes adoption leave and pay; the other can take paternity leave or share leave through shared parental leave." },
  { q: "Is there Maternity Allowance for adopters?", a: "No. If you do not qualify for Statutory Adoption Pay, there is no state equivalent, but you may get Universal Credit." },
  { q: "Is adoption pay taxed?", a: "Yes. It is paid through payroll, so Income Tax and National Insurance are deducted." },
  { q: "When can adoption leave start?", a: "On the day the child is placed or up to 14 days before. For overseas adoptions, within 28 days of the child arriving in the UK." },
  { q: "Do surrogate parents get adoption pay?", a: "Yes, intended parents who apply for a parental order can get adoption leave and pay if they meet the conditions." },
  { q: "Does my employer have to pay more than the statutory rate?", a: "No, but many do. Check your contract or staff handbook for an enhanced adoption pay scheme." },
  { q: "Can I get adoption pay if I adopt a stepchild?", a: "No. Adopting a stepchild or a relative's child does not give adoption leave or pay." },
];

export default async function AdoptionPayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/maternity-pay", "/uk/benefits/paternity-pay", "/uk/benefits/shared-parental-leave", "/uk/benefits/child-benefit", "/uk/benefits/childcare-costs", "/uk/benefits/universal-credit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Adoption Pay Calculator"
      lead="Work out your Statutory Adoption Pay week by week, with any employer scheme, and check whether you qualify."
      points={["39 weeks of pay", "Employer schemes", "Key dates", "Free and private"]}
      guide={<AdoptionGuide />}
      faqs={FAQS}
      related={related}
      note="Before tax and National Insurance. Your employer works out your actual pay from your average weekly earnings."
    >
      <AdoptionStudio query={query} />
    </FlagshipPage>
  );
}
