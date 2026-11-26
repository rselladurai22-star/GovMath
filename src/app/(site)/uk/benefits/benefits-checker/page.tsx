import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import CheckerStudio from "./CheckerStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Benefits Calculator UK: What Can I Claim?",
  description:
    "Free UK benefits calculator for 2026/27. Answer a few questions to see which benefits you are likely to get, from Universal Credit to PIP and Pension Credit.",
  alternates: { canonical: "/uk/benefits/benefits-checker" },
  openGraph: ogFor("/uk/benefits/benefits-checker"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/benefits-checker", label: "Benefits Eligibility Checker" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I get benefits if I own my home?",
    a: "Yes. The home you live in is not counted as savings for Universal Credit or Pension Credit, and non-means-tested benefits such as PIP, Carer's Allowance and Child Benefit ignore it altogether.",
  },
  {
    q: "Does it work for Scotland, Wales and Northern Ireland?",
    a: "It uses the rules for England. Universal Credit, Pension Credit and Child Benefit are the same in Scotland and Wales, but Scotland has its own disability, carer and family payments, such as Adult Disability Payment and the Scottish Child Payment, and Northern Ireland runs its own system.",
  },
  {
    q: "Why does it say “worth checking” rather than giving an amount?",
    a: "Disability and carer's benefits depend on an assessment of your needs, and New Style JSA and ESA on your National Insurance record, so the checker cannot know the answer. Each one links to its own calculator, which asks the questions that decide it.",
  },
  {
    q: "Will claiming one benefit reduce another?",
    a: "Sometimes. New Style JSA, New Style ESA and Carer's Allowance count as income for Universal Credit and Pension Credit. PIP, Attendance Allowance and Child Benefit do not, and getting them can add extra amounts.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Benefits calculators", href: "https://www.gov.uk/benefits-calculators" },
  { label: "GOV.UK: Universal Credit", href: "https://www.gov.uk/universal-credit" },
  { label: "GOV.UK: Pension Credit eligibility", href: "https://www.gov.uk/pension-credit/eligibility" },
  { label: "GOV.UK: Child Benefit", href: "https://www.gov.uk/child-benefit" },
  { label: "GOV.UK: PIP eligibility", href: "https://www.gov.uk/pip/eligibility" },
  { label: "GOV.UK: Attendance Allowance", href: "https://www.gov.uk/attendance-allowance" },
  { label: "GOV.UK: Carer's Allowance eligibility", href: "https://www.gov.uk/carers-allowance/eligibility" },
  { label: "GOV.UK: New Style ESA eligibility", href: "https://www.gov.uk/employment-support-allowance/eligibility" },
  { label: "GOV.UK: New Style JSA eligibility", href: "https://www.gov.uk/jobseekers-allowance/eligibility" },
  { label: "GOV.UK: Housing Benefit", href: "https://www.gov.uk/housing-benefit" },
  { label: "GOV.UK: Council Tax Reduction", href: "https://www.gov.uk/apply-council-tax-reduction" },
  { label: "GOV.UK: Healthy Start", href: "https://www.gov.uk/healthy-start" },
  { label: "GOV.UK: Sure Start Maternity Grant", href: "https://www.gov.uk/sure-start-maternity-grant" },
  { label: "GOV.UK: Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK: Warm Home Discount", href: "https://www.gov.uk/the-warm-home-discount-scheme" },
  { label: "GOV.UK: Winter Fuel Payment eligibility", href: "https://www.gov.uk/winter-fuel-payment/eligibility" },
  { label: "Home Office: Public funds (what counts, and contributory benefits that do not)", href: "https://www.gov.uk/government/publications/public-funds--2/public-funds" },
  { label: "Turn2us benefits calculator", href: "https://benefits-calculator.turn2us.org.uk/" },
];

function Notes() {
  return (
    <>
      <h2>How the check works</h2>
      <p>
        Your answers go through the same rules as the calculators on this site: the <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}and{" "}
        <Link href="/uk/benefits/pension-credit">Pension Credit</Link>{" "}engines give a rough monthly figure, Child Benefit and the one-off payments come from their published
        rates, and anything that depends on an assessment, such as <Link href="/uk/benefits/pip-points">PIP</Link>, is listed as worth checking. Nothing you type leaves your
        browser. For a full assessment in one sitting, including council tax and your local rent limits, use the free calculators from Turn2us or entitledto, which GOV.UK
        lists.
      </p>
    </>
  );
}

export default async function BenefitsCheckerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/pension-credit", "/uk/benefits/child-benefit", "/uk/benefits/council-tax-reduction", "/uk/benefits/pip-points", "/uk/benefits/carers-earnings"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Benefits Eligibility Checker"
      lead="Nine quick questions about your household, then a short list of the help you are likely to get and what is worth checking, strongest first."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CheckerStudio query={query} />
    </CalcPage>
  );
}
