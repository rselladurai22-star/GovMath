import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import P45P60Studio from "./P45P60Studio";
import P45P60Guide from "./P45P60Guide";

export const metadata: Metadata = {
  title: "P45 and P60 Checker: Did I Pay the Right Tax?",
  description:
    "Check the tax on your P60 or P45 against what was due for your pay and tax code, see each box explained, and learn what to do about an overpayment.",
  alternates: { canonical: "/tax-and-salary/p45-p60-explainer" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/p45-p60-explainer", label: "P45 and P60" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the difference between a P45 and a P60?", a: "A P45 is given when you leave a job and shows your pay and tax from 6 April to your leaving date. A P60 is given by 31 May to everyone still working for an employer on 5 April and shows the whole tax year." },
  { q: "What do I do with my P45?", a: "Give parts 2 and 3 to your new employer so they can continue your tax correctly, and keep part 1A. If you are not starting a new job, keep it to claim a refund or benefits." },
  { q: "How do I check the tax on my P60?", a: "Subtract the tax-free amount from your tax code (£12,579 for 1257L) from your pay, then apply the tax bands to the rest. If the tax shown is hundreds of pounds different, check your tax code history in the HMRC app." },
  { q: "Can I get a replacement P60?", a: "HMRC cannot issue one, but your employer can give you a copy, and your pay and tax for past years are in the HMRC app and personal tax account." },
  { q: "When should I get my P60?", a: "By 31 May after the end of the tax year on 5 April." },
];

export default async function P45P60Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/tax-code-decoder", "/tax-and-salary/emergency-tax", "/tax-and-salary/salary-calculator", "/tax-and-salary/redundancy", "/tax-and-salary/tax-bracket-checker", "/tax-and-salary/scottish-tax"].includes(c.href),
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
      note="A quick check for PAYE income using 2026/27 bands (UK-wide bands were the same in 2025/26). GovMath is not affiliated with HMRC."
    >
      <P45P60Studio query={query} />
    </FlagshipPage>
  );
}
