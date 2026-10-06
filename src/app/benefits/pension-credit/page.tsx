import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PcStudio from "./PcStudio";
import PcGuide from "./PcGuide";

export const metadata: Metadata = {
  title: "Pension Credit Calculator (2026/27 Rates)",
  description:
    "Estimate your Pension Credit for 2026/27: the £238 single and £363.25 couple guarantee, severe disability, carer and child additions, savings over £10,000 and Savings Credit.",
  alternates: { canonical: "/benefits/pension-credit" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/pension-credit", label: "Pension Credit" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Pension Credit in 2026/27?", a: "It tops weekly income up to £238.00 for a single person and £363.25 for a couple, with more for disability, caring or children." },
  { q: "Is there a savings limit for Pension Credit?", a: "No. The first £10,000 is ignored, and each £500 above that counts as £1 a week of income." },
  { q: "Can I get Pension Credit if I own my home?", a: "Yes. The home you live in does not count." },
  { q: "How far back can Pension Credit be backdated?", a: "Up to three months, if you met the conditions during that time." },
];

export default async function PcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/attendance-allowance", "/benefits/carers-earnings", "/benefits/local-housing-allowance", "/investing/state-pension-age", "/life/care-home-means-test", "/property/single-person-discount"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Pension Credit Calculator"
      lead="Check whether you could get Pension Credit, how much, and the extra help it unlocks."
      points={["Guarantee and Savings Credit", "Every addition", "Savings over £10,000", "Free and private"]}
      guide={<PcGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <PcStudio query={query} />
    </FlagshipPage>
  );
}
