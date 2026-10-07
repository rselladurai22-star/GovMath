import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CmsStudio from "./CmsStudio";
import { ogFor } from "@/gm/og";
import CmsGuide from "./CmsGuide";

export const metadata: Metadata = {
  title: "Child Maintenance Calculator UK (CMS) 2026/27",
  description:
    "Free CMS child maintenance calculator. Work out weekly payments with the 2012 formula, shared care, other children and Collect and Pay fees.",
  alternates: { canonical: "/benefits/child-maintenance" },
  openGraph: ogFor("/benefits/child-maintenance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/child-maintenance", label: "Child Maintenance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much child maintenance should I pay for one child?", a: "On gross income between £200 and £800 a week, the CMS rate is 12% for one child. On a £30,000 salary that is about £69 a week." },
  { q: "Is child maintenance worked out on gross or net pay?", a: "Gross pay, before tax and National Insurance. Pension contributions are taken off first." },
  { q: "How much is child maintenance for two children?", a: "16% of gross weekly income on the basic rate, or 19% for three or more." },
  { q: "Does the receiving parent's income count?", a: "No. Only the paying parent's income is used." },
  { q: "How does shared care reduce child maintenance?", a: "By one-seventh for 52 to 103 nights a year, two-sevenths for 104 to 155, three-sevenths for 156 to 174, and half plus £7 a week per child for 175 or more." },
  { q: "What if the paying parent has other children?", a: "Their income is reduced by 11%, 14% or 16% for one, two or three or more other children before the rate is applied." },
  { q: "What is the minimum child maintenance?", a: "The flat rate of £7 a week, which applies on income of £7 to £100 a week or if the paying parent is on certain benefits." },
  { q: "Are there fees for using the Child Maintenance Service?", a: "Not for Direct Pay. With Collect and Pay the paying parent pays 20% extra and the receiving parent loses 4%." },
  { q: "Does child maintenance affect Universal Credit?", a: "No. Child maintenance received is ignored for Universal Credit and is not taxable." },
  { q: "What if the paying parent earns over £156,000?", a: "Income over £3,000 a week is ignored. The receiving parent can ask a court for extra maintenance." },
  { q: "How is child maintenance worked out for self-employed parents?", a: "From taxable profit on the Self Assessment return, after allowable business expenses." },
  { q: "Does child maintenance stop when a child turns 16?", a: "It continues to 20 if the child stays in approved full-time, non-advanced education or training, such as A levels." },
  { q: "Can I change from Collect and Pay to Direct Pay?", a: "Yes, if the paying parent has a good payment record and both parents agree, or the CMS decides it is safe." },
];

export default async function ChildMaintenancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/child-benefit", "/benefits/universal-credit", "/benefits/childcare-costs", "/benefits/benefits-checker", "/benefits/tax-free-childcare", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="CMS 2012 scheme"
      title="Child Maintenance Calculator"
      lead="Work out child maintenance the way the Child Maintenance Service does, including other children, shared care nights and collection fees."
      points={["CMS formula", "Shared care", "Collect and Pay fees", "Free and private"]}
      guide={<CmsGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate using the CMS formula. The CMS uses HMRC's figures and can make variations, so your calculation may differ."
    >
      <CmsStudio query={query} />
    </FlagshipPage>
  );
}
