import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CheckerStudio from "./CheckerStudio";
import { ogFor } from "@/gm/og";
import CheckerGuide from "./CheckerGuide";

export const metadata: Metadata = {
  title: "Benefits Calculator UK 2026/27: What Can I Get?",
  description:
    "Free UK benefits checker for 2026/27. See which benefits you are likely to get, from Universal Credit and Pension Credit to PIP and Council Tax Reduction.",
  alternates: { canonical: "/benefits/benefits-checker" },
  openGraph: ogFor("/benefits/benefits-checker"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/benefits-checker", label: "Benefits Eligibility Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What benefits am I entitled to?", a: "It depends on your age, household, income, savings, health and caring. The checker runs your answers through each benefit's rules and lists what you are likely to get." },
  { q: "Can I get benefits if I work?", a: "Yes. Universal Credit can be paid to working households on a low income, and Child Benefit, PIP and Carer's Allowance are not affected by most work." },
  { q: "Can I get benefits if I own my home?", a: "Yes. Your home is not counted as savings, and Pension Credit can include help with mortgage interest as a loan." },
  { q: "How much savings can I have and still get benefits?", a: "Up to £16,000 for Universal Credit. Pension Credit has no upper limit but counts savings over £10,000. Non-means-tested benefits ignore savings." },
  { q: "What is the difference between means-tested and non-means-tested benefits?", a: "Means-tested benefits depend on household income and savings. Non-means-tested ones depend on your needs, children or National Insurance record." },
  { q: "Is the checker the same as a claim?", a: "No. It is a first look. You need to claim each benefit, and the DWP, HMRC or your council decides." },
  { q: "Does the checker work for Scotland?", a: "It uses the rules for England. Scotland has its own disability and family benefits, such as Adult Disability Payment and the Scottish Child Payment." },
  { q: "What is a passport benefit?", a: "A benefit, like Universal Credit or Pension Credit, that automatically qualifies you for other help such as free prescriptions or the Warm Home Discount." },
  { q: "Can pensioners get Universal Credit?", a: "Not usually. Pensioners claim Pension Credit and Housing Benefit instead. A couple where one partner is under State Pension age claims Universal Credit." },
  { q: "Will claiming one benefit stop another?", a: "Sometimes one counts as income for another: New Style JSA reduces Universal Credit, for example. PIP, Attendance Allowance and Child Benefit do not count as income for Universal Credit." },
  { q: "Can I get benefits if I am self-employed?", a: "Yes. Universal Credit can top up low self-employed income, though a minimum income floor may apply after the first year." },
  { q: "Do benefits count as income for tax?", a: "Some do, such as the State Pension, Carer's Allowance and New Style JSA. Universal Credit, PIP and Child Benefit are not taxable." },
];

export default async function BenefitsCheckerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/pension-credit", "/benefits/child-benefit", "/benefits/council-tax-reduction", "/benefits/pip-points", "/benefits/carers-earnings"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Benefits Eligibility Checker"
      lead="Answer a few questions about your household and see which benefits you are likely to get, what to check and roughly how much they are worth."
      points={["Every main benefit", "Working age and pensioners", "2026/27 rates", "Free and private"]}
      guide={<CheckerGuide />}
      faqs={FAQS}
      related={related}
      note="A first look based on 2026/27 rules for England, not a decision. Each benefit has its own claim."
    >
      <CheckerStudio query={query} />
    </FlagshipPage>
  );
}
