import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TaxCodeStudio from "./TaxCodeStudio";
import { ogFor } from "@/gm/og";
import TaxCodeGuide from "./TaxCodeGuide";

export const metadata: Metadata = {
  title: "Tax Code Checker: What Does My Tax Code Mean?",
  description:
    "Free tax code checker for 2026/27. Enter any code, such as 1257L, 1170L, K475, BR or 0T, to see what it means, your tax-free pay and whether you overpay.",
  alternates: { canonical: "/uk/tax-and-salary/tax-code-decoder" },
  openGraph: ogFor("/uk/tax-and-salary/tax-code-decoder"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/tax-code-decoder", label: "Tax Code Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What does 1257L mean?", a: "1257L is the standard tax code for 2026/27. The number times ten is your tax-free allowance, £12,570, and L means you get the standard Personal Allowance." },
  { q: "What does a K tax code mean?", a: "A K code means the deductions from your allowance, such as company benefits or tax owed, are bigger than the allowance. The amount is added to your taxable pay, but no more than half of any payment can be taken in tax." },
  { q: "What do BR, D0 and 0T mean?", a: "BR taxes all pay at 20%, D0 at 40% (21% in Scotland), and 0T gives no tax-free allowance but uses the normal bands. BR and D0 are usually used for a second job or pension." },
  { q: "What do W1, M1 and X mean at the end of a tax code?", a: "They mark an emergency, non-cumulative code. Each payment is taxed on its own, without catching up on any unused allowance from earlier in the year." },
  { q: "How do I change my tax code?", a: "Your employer cannot change it. Update your details with HMRC in the HMRC app or your personal tax account, and HMRC will send your employer a new code." },
  { q: "Why has my tax code changed in the middle of the year?", a: "Usually because HMRC has new information: a new job, a change in benefits, a pension, or an estimate of your income. Your coding notice explains the change." },
  { q: "Is 1257L the same in Scotland?", a: "The allowance is the same, but Scottish taxpayers have S1257L, which tells payroll to use the Scottish bands." },
  { q: "What does a tax code ending in X mean?", a: "It is an emergency code: each payment is taxed on its own, without catching up on earlier months." },
  { q: "Can my tax code be wrong?", a: "Yes, especially after a job change or if HMRC has estimated your income or benefits. Check it every time you start a job or your circumstances change." },
  { q: "Why do I have a different code for each job?", a: "Each employer or pension provider gets its own code. Usually your main job has your allowance and the others have BR or D0, so their codes will differ." },
  { q: "What is a P2 coding notice?", a: "It is the letter, or online notice in your personal tax account, that tells you your new code and explains how it was worked out. Check each line, especially estimates of income or benefits." },
  { q: "My code has a number but no letter. Is that wrong?", a: "Most codes end in a letter, so a code with only a number is usually a typing error on the payslip or a code that has been cut off. Check the full code in the HMRC app, which always shows it correctly." },
  { q: "Does my tax code affect National Insurance?", a: "No. National Insurance does not use your tax code at all." },
  { q: "Can I see my past tax codes?", a: "Yes. The HMRC app and your personal tax account show your codes for the current and previous years." },
];

export default async function TaxCodePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/tax-and-salary/emergency-tax", "/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/p45-p60-explainer", "/uk/tax-and-salary/tax-bracket-checker", "/uk/vehicles/benefit-in-kind", "/uk/tax-and-salary/scottish-tax"].includes(c.href),
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
      note="For 2026/27 codes. SumAtlas is not affiliated with HMRC. Your coding notice from HMRC explains the adjustments behind your code."
    >
      <TaxCodeStudio query={query} />
    </FlagshipPage>
  );
}
