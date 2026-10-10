import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import P45P60Studio from "./P45P60Studio";
import { ogFor } from "@/gm/og";
import P45P60Guide from "./P45P60Guide";

export const metadata: Metadata = {
  title: "P45 and P60 Checker: Did I Pay the Right Tax?",
  description:
    "Free P45 and P60 checker. Compare the tax on your form with what was due for your pay and tax code, see each box explained, and fix an overpayment.",
  alternates: { canonical: "/uk/tax-and-salary/p45-p60-explainer" },
  openGraph: ogFor("/uk/tax-and-salary/p45-p60-explainer"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/p45-p60-explainer", label: "P45 and P60" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the difference between a P45 and a P60?", a: "A P45 is given when you leave a job and shows your pay and tax from 6 April to your leaving date. A P60 is given by 31 May to everyone still working for an employer on 5 April and shows the whole tax year." },
  { q: "What do I do with my P45?", a: "Give parts 2 and 3 to your new employer so they can continue your tax correctly, and keep part 1A. If you are not starting a new job, keep it to claim a refund or benefits." },
  { q: "How do I check the tax on my P60?", a: "Subtract the tax-free amount from your tax code (£12,579 for 1257L) from your pay, then apply the tax bands to the rest. If the tax shown is hundreds of pounds different, check your tax code history in the HMRC app." },
  { q: "Can I get a replacement P60?", a: "HMRC cannot issue one, but your employer can give you a copy, and your pay and tax for past years are in the HMRC app and personal tax account." },
  { q: "When should I get my P60?", a: "By 31 May after the end of the tax year on 5 April." },
  { q: "Do I get a P60 if I left my job before 5 April?", a: "No. You get a P45 when you leave instead. The P60 only comes from employers you work for on 5 April." },
  { q: "Should my P45 include pay from my previous job?", a: "If your employer used your previous P45, the “total pay to date” includes it, and the form separately shows pay in that job." },
  { q: "My P60 tax looks too high. What should I do?", a: "Check your tax code and any other income for the year, then look in the HMRC app. If you overpaid, HMRC usually refunds it automatically through a P800, or you can claim." },
  { q: "Does my P60 show student loan repayments?", a: "Yes, P60s include student loan deductions made through payroll during the year." },
  { q: "Do pension providers issue P60s?", a: "Yes. If you receive a pension taxed through PAYE, the provider gives you a P60 each year, just like an employer." },
  { q: "What if the figures on my P45 look wrong?", a: "Ask your former employer to check them against your payslips. If the pay or tax to date is wrong, they can issue a corrected P45 or send updated figures to HMRC, and your next employer can then use the right numbers." },
  { q: "Is my P60 the same as my payslip?", a: "No. A payslip covers one payment; the P60 adds up every payment in the tax year from that employer." },
];

export default async function P45P60Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/tax-and-salary/tax-code-decoder", "/uk/tax-and-salary/emergency-tax", "/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/redundancy", "/uk/tax-and-salary/tax-bracket-checker", "/uk/tax-and-salary/scottish-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Check your tax"
      title="P45 and P60 Checker"
      lead="Check whether the tax on your P60 or P45 is right, and see what every box means."
      points={["P60 and P45 checks", "Any tax code", "Box-by-box explainer", "Free and private"]}
      guide={<P45P60Guide />}
      faqs={FAQS}
      related={related}
      note="A quick check for PAYE income using 2026/27 bands (UK-wide bands were the same in 2025/26). SumAtlas is not affiliated with HMRC."
    >
      <P45P60Studio query={query} />
    </FlagshipPage>
  );
}
