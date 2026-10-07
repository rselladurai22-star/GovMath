import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import EsaStudio from "./EsaStudio";
import { ogFor } from "@/gm/og";
import EsaGuide from "./EsaGuide";

export const metadata: Metadata = {
  title: "New Style ESA Calculator 2026/27",
  description:
    "Free New Style ESA calculator for 2026/27. Check if your National Insurance record qualifies and see the weekly rate: £95.55, or £145.90 in the support group.",
  alternates: { canonical: "/benefits/new-style-esa" },
  openGraph: ogFor("/benefits/new-style-esa"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/new-style-esa", label: "New Style ESA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is New Style ESA in 2026/27?", a: "£95.55 a week at 25 or over (£75.65 under 25) in the 13-week assessment phase, then £95.55 in the work-related activity group or £145.90 in the support group." },
  { q: "How long does New Style ESA last?", a: "365 days in the assessment phase and work-related activity group together. There is no time limit in the support group." },
  { q: "Do savings affect New Style ESA?", a: "No. It depends on your National Insurance record. Savings and a partner's income do not count." },
  { q: "Does a pension affect New Style ESA?", a: "Yes. Half of any private or workplace pension over £85 a week is taken off." },
  { q: "Can I work while on New Style ESA?", a: "Yes, as permitted work: under 16 hours a week and up to £203.50 a week, or up to £20 a week at any hours." },
  { q: "Can I get ESA and Universal Credit together?", a: "Yes. Universal Credit counts ESA as income, but can add a health element and help with rent." },
  { q: "What is the support group?", a: "The group for people whose illness or disability means they cannot do any work-related activity. It pays £50.35 a week more and has no time limit." },
  { q: "Can I claim New Style ESA while on Statutory Sick Pay?", a: "Not for the same days, but you can claim up to 3 months before your SSP ends so ESA follows on." },
  { q: "What National Insurance do I need?", a: "Class 1 contributions on earnings of 26 times the Lower Earnings Limit in one of the two tax years that count, and 50 times it paid or credited in both." },
  { q: "Is New Style ESA taxable?", a: "Yes, in every group, but no tax is taken off when it is paid. Whether you owe any depends on your other income and your Personal Allowance." },
  { q: "How long does the ESA assessment take?", a: "The assessment phase normally lasts 13 weeks, but it can take longer. You are paid the assessment rate until a decision is made." },
  { q: "Do I need a fit note for New Style ESA?", a: "Yes. After 7 days of sickness you need fit notes from a doctor or other health professional until your assessment." },
  { q: "Can I get New Style ESA if I am self-employed?", a: "Only if you have paid enough Class 1 National Insurance as an employee in the two tax years that count, or have credits." },
  { q: "What happens to New Style ESA at State Pension age?", a: "It stops. You may be able to get the State Pension and Pension Credit instead." },
  { q: "Can I get New Style ESA if I am on a zero-hours contract?", a: "Yes, if you meet the National Insurance conditions and illness stops you working; Statutory Sick Pay may come first." },
];

export default async function NewStyleEsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/new-style-jsa", "/benefits/universal-credit", "/benefits/pip-points", "/benefits/benefits-checker", "/tax-and-salary/statutory-sick-pay", "/benefits/benefit-cap"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="New Style ESA Calculator"
      lead="Check whether your National Insurance record qualifies you for New Style Employment and Support Allowance, and how much you get at each stage."
      points={["2026/27 rates", "Assessment and support group", "Works with Universal Credit", "Free and private"]}
      guide={<EsaGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate from yearly pay. The DWP decides from your actual National Insurance record and the Work Capability Assessment."
    >
      <EsaStudio query={query} />
    </FlagshipPage>
  );
}
