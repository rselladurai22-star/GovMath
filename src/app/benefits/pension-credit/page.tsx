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
  { q: "Is Pension Credit taxable?", a: "No." },
  { q: "Can I get it with savings over £16,000?", a: "Yes. Unlike Universal Credit, there is no upper savings limit. Savings above £10,000 are treated as a small weekly income." },
  { q: "Does Pension Credit affect my State Pension?", a: "No. It is paid on top of your State Pension." },
  { q: "Can I get it if I still work?", a: "Yes, if your income is low enough. Part of your earnings is ignored." },
  { q: "What if I get Pension Credit wrong and am overpaid?", a: "Overpayments caused by not reporting a change usually have to be repaid. Report changes in income, savings or who lives with you promptly to avoid this." },
  { q: "Will an inheritance stop my Pension Credit?", a: "Not necessarily. There is no upper limit on savings, but money over £10,000 adds £1 a week of income for every £500. A large sum may reduce or end Guarantee Credit, so report it straight away." },
  { q: "Do I need to claim again each year?", a: "No. Your award continues and is uprated each April. You may be asked to confirm your details from time to time." },
  { q: "Can someone claim for me?", a: "Yes. A family member or friend can help you claim by phone or online, and someone with power of attorney or an appointee can manage the claim if you cannot." },
  { q: "Is Pension Credit paid with my State Pension?", a: "It is paid separately, into the same or a different account, usually on the same cycle as your State Pension." },
];

export default async function PcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/attendance-allowance", "/benefits/carers-earnings", "/benefits/housing-benefit", "/benefits/council-tax-reduction", "/life/care-home-means-test", "/property/single-person-discount"].includes(c.href));
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
