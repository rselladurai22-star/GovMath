import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TaxCodeStudio from "./TaxCodeStudio";
import TaxCodeGuide from "./TaxCodeGuide";

export const metadata: Metadata = {
  title: "Tax Code Checker: What Does My Tax Code Mean? (2026/27)",
  description:
    "Decode any UK tax code, from 1257L to K codes, BR, 0T and emergency codes, see your tax-free pay, and compare the tax it takes with the standard code. 2026/27.",
  alternates: { canonical: "/tax-and-salary/tax-code-decoder" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/tax-code-decoder", label: "Tax Code Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What does 1257L mean?", a: "1257L is the standard tax code for 2026/27. The number times ten is your tax-free allowance, £12,570, and L means you get the standard Personal Allowance." },
  { q: "What does a K tax code mean?", a: "A K code means the deductions from your allowance, such as company benefits or tax owed, are bigger than the allowance. The amount is added to your taxable pay, but no more than half of any payment can be taken in tax." },
  { q: "What do BR, D0 and 0T mean?", a: "BR taxes all pay at 20%, D0 at 40% (21% in Scotland), and 0T gives no tax-free allowance but uses the normal bands. BR and D0 are usually used for a second job or pension." },
  { q: "What do W1, M1 and X mean at the end of a tax code?", a: "They mark an emergency, non-cumulative code. Each payment is taxed on its own, without catching up on any unused allowance from earlier in the year." },
  { q: "How do I change my tax code?", a: "Your employer cannot change it. Update your details with HMRC in the HMRC app or your personal tax account, and HMRC will send your employer a new code." },
];

export default async function TaxCodePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/emergency-tax", "/tax-and-salary/salary-calculator", "/tax-and-salary/p45-p60-explainer", "/tax-and-salary/tax-bracket-checker", "/vehicles/benefit-in-kind", "/tax-and-salary/scottish-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Tax Code Checker"
      lead="Decode your tax code part by part, see your tax-free pay, and check the tax it takes against the standard code."
      points={["Every code type", "Scottish and Welsh codes", "Tax compared with 1257L", "Free and private"]}
      guide={<TaxCodeGuide />}
      faqs={FAQS}
      related={related}
      note="For 2026/27 codes. GovMath is not affiliated with HMRC. Your coding notice from HMRC explains the adjustments behind your code."
    >
      <TaxCodeStudio query={query} />
    </FlagshipPage>
  );
}
