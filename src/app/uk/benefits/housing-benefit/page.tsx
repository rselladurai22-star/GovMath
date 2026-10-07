import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HbStudio from "./HbStudio";
import { ogFor } from "@/gm/og";
import HbGuide from "./HbGuide";

export const metadata: Metadata = {
  title: "Housing Benefit Calculator UK 2026/27",
  description:
    "Free Housing Benefit calculator for 2026/27. Estimate help with rent from your income, savings, household and non-dependants, with the full means test.",
  alternates: { canonical: "/uk/benefits/housing-benefit" },
  openGraph: ogFor("/uk/benefits/housing-benefit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/housing-benefit", label: "Housing Benefit" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who can claim Housing Benefit in 2026/27?", a: "People who have reached State Pension age, and people of any age in supported, sheltered or temporary housing. Most other working-age people claim help with rent through Universal Credit instead." },
  { q: "How is Housing Benefit worked out?", a: "Your eligible rent, less any deductions for other adults, is the most you can get. If your weekly income is above your applicable amount, 65p of every extra £1 is taken off. If you get Pension Credit Guarantee Credit, you get the maximum." },
  { q: "How much savings can I have for Housing Benefit?", a: "Up to £16,000, unless you get Pension Credit Guarantee Credit, in which case there is no limit. Pensioners have £1 a week of income assumed for every £500 over £10,000; working-age claimants £1 for every £250 over £6,000." },
  { q: "Does Housing Benefit cover all my rent?", a: "Not always. Private rents are limited to the Local Housing Allowance, social tenants of working age lose 14% or 25% for spare bedrooms, and charges for heating, meals or water are not covered." },
  { q: "Can Housing Benefit be backdated?", a: "Yes. Up to 3 months if you are over State Pension age, or up to 1 month for working-age claimants who can show good cause for claiming late." },
  { q: "Is Housing Benefit paid to me or my landlord?", a: "Usually to you for a private tenancy, unless you ask or are in arrears of 8 weeks or more. For council homes it is taken off your rent account." },
  { q: "Can I get Housing Benefit if I own my home?", a: "No. Homeowners on Pension Credit may get help with mortgage interest through a Support for Mortgage Interest loan instead." },
  { q: "Does Housing Benefit pay service charges?", a: "Most building service charges are covered. Charges for your own energy, water and meals are not." },
  { q: "What if I live with my partner who is under State Pension age?", a: "Mixed-age couples usually claim Universal Credit rather than Housing Benefit, unless one of you was already getting Pension Credit or Housing Benefit before May 2019." },
  { q: "Is Housing Benefit taxable?", a: "No. It is not taxable and it does not affect your State Pension." },
];

export default async function HousingBenefitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/council-tax-reduction", "/uk/benefits/local-housing-allowance", "/uk/benefits/pension-credit", "/uk/benefits/benefit-cap", "/uk/benefits/universal-credit", "/uk/property/rent-increase"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Housing Benefit Calculator"
      lead="Estimate your weekly Housing Benefit from your rent, household, income and savings, using the same means test your council uses."
      points={["2026/27 DWP rates", "Private and social rents", "Pensioners and supported housing", "Free and private"]}
      guide={<HbGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on the national rules. Your council makes the decision."
    >
      <HbStudio query={query} />
    </FlagshipPage>
  );
}
