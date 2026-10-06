import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import JsaStudio from "./JsaStudio";
import JsaGuide from "./JsaGuide";

export const metadata: Metadata = {
  title: "New Style JSA Calculator 2026/27: Do I Qualify and How Much?",
  description:
    "Check whether your National Insurance record qualifies you for New Style Jobseeker's Allowance and how much you get in 2026/27: £95.55 a week at 25 or over, for up to 26 weeks.",
  alternates: { canonical: "/benefits/new-style-jsa" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/new-style-jsa", label: "New Style JSA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is New Style JSA in 2026/27?", a: "£95.55 a week if you are 25 or over and £75.65 if you are under 25, from April 2026. It is paid every two weeks." },
  { q: "How long is New Style JSA paid for?", a: "Up to 182 days, which is 26 weeks. After that you need to rely on Universal Credit if you are still out of work." },
  { q: "Do savings affect New Style JSA?", a: "No. New Style JSA depends on your National Insurance record, not your savings or your partner's income." },
  { q: "What National Insurance do I need?", a: "Class 1 contributions on earnings of at least 26 times the Lower Earnings Limit in one of the two tax years that count, and paid or credited contributions of 50 times it in both years." },
  { q: "Can I get New Style JSA and Universal Credit together?", a: "Yes. Universal Credit counts New Style JSA as income and reduces pound for pound, but JSA is still paid if UC stops." },
  { q: "Does my pension affect New Style JSA?", a: "Yes. A private or workplace pension over £50 a week reduces it pound for pound." },
  { q: "Can I work while on New Style JSA?", a: "Yes, for under 16 hours a week. Earnings over £5 a week after tax reduce JSA pound for pound." },
  { q: "Does redundancy pay affect New Style JSA?", a: "No. Redundancy pay does not reduce it, though holiday pay and pay in lieu of notice can delay when it starts." },
  { q: "Is New Style JSA taxable?", a: "Yes, but no tax is taken off when it is paid. It is taken into account through your tax code or your P45." },
  { q: "Can self-employed people get New Style JSA?", a: "Only with enough Class 1 contributions from employment. Class 2 and Class 4 self-employed contributions do not count." },
  { q: "Can I claim New Style JSA if I left my job voluntarily?", a: "Yes, but you may get a sanction, so payments could be stopped for a period unless you had a good reason for leaving." },
  { q: "How often do I have to sign on for New Style JSA?", a: "Usually every two weeks, at appointments with your work coach, in person or by phone." },
  { q: "Does New Style JSA give me National Insurance credits?", a: "Yes. You get Class 1 credits for each week you get it, which protect your State Pension record." },
];

export default async function NewStyleJsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/new-style-esa", "/benefits/universal-credit", "/benefits/benefits-checker", "/benefits/uc-advance", "/tax-and-salary/redundancy", "/tax-and-salary/national-insurance"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="New Style JSA Calculator"
      lead="Check whether your National Insurance record qualifies you for New Style Jobseeker’s Allowance, and how much you would get each week."
      points={["2026/27 rates", "National Insurance check", "Works with Universal Credit", "Free and private"]}
      guide={<JsaGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate from yearly pay. The DWP decides from your actual National Insurance record."
    >
      <JsaStudio query={query} />
    </FlagshipPage>
  );
}
