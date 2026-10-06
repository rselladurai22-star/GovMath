import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CapStudio from "./CapStudio";
import CapGuide from "./CapGuide";

export const metadata: Metadata = {
  title: "Benefit Cap Calculator 2026/27: Will My Benefits Be Capped?",
  description:
    "Check whether the benefit cap reduces your Universal Credit or Housing Benefit in 2026/27. £22,020 for families and £14,753 for single people outside London, with every exemption and the £881 earnings test.",
  alternates: { canonical: "/benefits/benefit-cap" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/benefit-cap", label: "Benefit Cap" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the benefit cap in 2026/27?", a: "£22,020 a year for couples and families and £14,753 for single people outside London. In Greater London it is £25,323 and £16,967." },
  { q: "How do I avoid the benefit cap?", a: "Earn at least £881 a month after tax as a household, or have someone in the household getting PIP, DLA, Attendance Allowance, Carer's Allowance, the LCWRA health element or the carer element." },
  { q: "Does Child Benefit count towards the cap?", a: "Yes. Child Benefit counts in full. The Universal Credit childcare element does not." },
  { q: "Is there a grace period?", a: "Yes. If you earned enough before losing your job, the cap does not apply for nine months." },
];

export default async function BenefitCapPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/universal-credit-taper", "/benefits/local-housing-allowance", "/benefits/child-benefit", "/benefits/pip-points"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 limits"
      title="Benefit Cap Calculator"
      lead="Check whether the benefit cap cuts your Universal Credit or Housing Benefit, by how much, and what would lift it."
      points={["Universal Credit or Housing Benefit", "Every exemption", "£881 earnings test", "Free and private"]}
      guide={<CapGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 benefit cap. Not financial advice."
    >
      <CapStudio query={query} />
    </FlagshipPage>
  );
}
