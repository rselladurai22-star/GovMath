import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CapStudio from "./CapStudio";
import { ogFor } from "@/gm/og";
import CapGuide from "./CapGuide";

export const metadata: Metadata = {
  title: "Benefit Cap Calculator 2026/27: Universal Credit",
  description:
    "Free benefit cap calculator for 2026/27. See if your Universal Credit or Housing Benefit will be capped, by how much, and the exemptions that lift the cap.",
  alternates: { canonical: "/uk/benefits/benefit-cap" },
  openGraph: ogFor("/uk/benefits/benefit-cap"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/benefit-cap", label: "Benefit Cap" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the benefit cap in 2026/27?", a: "£22,020 a year for couples and families and £14,753 for single people outside London. In Greater London it is £25,323 and £16,967." },
  { q: "How do I avoid the benefit cap?", a: "Earn at least £881 a month after tax as a household, or have someone in the household getting PIP, DLA, Attendance Allowance, Carer's Allowance, the LCWRA health element or the carer element." },
  { q: "Does Child Benefit count towards the cap?", a: "Yes. Child Benefit counts in full. The Universal Credit childcare element does not." },
  { q: "Is there a grace period?", a: "Yes. If you earned enough before losing your job, the cap does not apply for nine months." },
  { q: "Does the benefit cap apply to pensioners?", a: "No. It does not apply once you reach State Pension age. In a couple where one partner is still under State Pension age, the cap may still apply." },
  { q: "Is the childcare element capped?", a: "No. The childcare costs element of Universal Credit is paid in full on top of the cap." },
  { q: "Has the cap gone up for 2026/27?", a: "No. It is still £22,020 for families and £14,753 for single people outside London." },
  { q: "What if I live on the edge of London?", a: "The higher cap applies only if you live in one of the 32 London boroughs or the City of London." },
];

export default async function BenefitCapPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/universal-credit-taper", "/uk/benefits/local-housing-allowance", "/uk/benefits/child-benefit", "/uk/benefits/pip-points"].includes(c.href));
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
