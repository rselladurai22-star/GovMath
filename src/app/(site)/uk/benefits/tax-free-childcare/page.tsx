import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import TfcStudio from "./TfcStudio";
import { ogFor } from "@/gm/og";
import { TFC, minimumQuarterEarnings, minimumWeeklyEarnings, taxFreeChildcarePlan, ucChildcareCeiling } from "@/lib/benefits/family";
import { UC_2026, UC_CHILDCARE } from "@/lib/benefits/uc-engine";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Tax-Free Childcare Calculator 2026/27",
  description:
    "Free Tax-Free Childcare calculator for 2026/27. See the £2 top-up for every £8, up to £2,000 a child a year, and whether Universal Credit help is better.",
  alternates: { canonical: "/uk/benefits/tax-free-childcare" },
  openGraph: ogFor("/uk/benefits/tax-free-childcare"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/tax-free-childcare", label: "Tax-Free Childcare" },
];

// Every figure in the text below comes from the engines, so it moves with the rules.
const m = (n: number) => gbp(n, true);
const SPEND_MAX = TFC.capPerChild / TFC.share;
const SPEND_MAX_DISABLED = TFC.capDisabled / TFC.share;
// One child at £6,000 a year, and two at £9,000 each.
const ONE = { tfc: taxFreeChildcarePlan([{ cost: 6_000, disabled: false }]), uc: ucChildcareCeiling([{ cost: 6_000, disabled: false }]) };
const TWO = {
  tfc: taxFreeChildcarePlan([
    { cost: 9_000, disabled: false },
    { cost: 9_000, disabled: false },
  ]),
  uc: ucChildcareCeiling([
    { cost: 9_000, disabled: false },
    { cost: 9_000, disabled: false },
  ]),
};
// The yearly spend at which UC's 85% reaches its monthly maximum for one child.
const UC_CEILING_ONE = (UC_CHILDCARE.maxOne * 12) / UC_CHILDCARE.share;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does Tax-Free Childcare work in Scotland, Wales and Northern Ireland?",
    a: "Yes. It is a UK-wide scheme run by HMRC, unlike the funded hours, which differ between the four nations. The provider has to be registered with the right body where it is, such as the Care Inspectorate in Scotland or Care Inspectorate Wales, and signed up to Tax-Free Childcare.",
  },
  {
    q: "Can grandparents or other family pay into the account?",
    a: "Yes. Anyone can pay into a child's childcare account, and their payments are topped up in the same way, within the same limit. That makes it a tidy way for family to help with nursery bills. Grandparents can only be paid from the account if they are registered childminders.",
  },
  {
    q: "What happens if I forget to reconfirm?",
    a: "Every 3 months you sign in to confirm your work and income are still the same. If you do not, the Tax-Free Childcare stops: payments in are not topped up until you reconfirm, and any funded hours code from the same account lapses too. Set a reminder for the date the account shows.",
  },
  {
    q: "I am in a childcare voucher scheme. Should I switch?",
    a: "Vouchers are fixed per parent, while Tax-Free Childcare is per child, so families with two or more children in childcare, or two parents who would both need vouchers, often gain from switching. If you switch you must tell your employer within 90 days of applying, and you cannot rejoin a voucher scheme later, so compare carefully first.",
  },
  {
    q: "Do I need one account per child?",
    a: "Each child has their own account and their own limit, and you add each child through the same sign-in. Money paid into one child's account cannot be used for another child.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Tax-Free Childcare (the top-up, limits and what it pays for)", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK: Tax-Free Childcare, check if you're eligible", href: "https://www.gov.uk/tax-free-childcare/check-if-youre-eligible" },
  { label: "GOV.UK: If you get Universal Credit or childcare vouchers", href: "https://www.gov.uk/tax-free-childcare/universal-credit-childcare-vouchers" },
  { label: "GOV.UK: Universal Credit and childcare costs", href: "https://www.gov.uk/help-with-childcare-costs/universal-credit" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 childcare maximums)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: Childcare calculator", href: "https://www.gov.uk/childcare-calculator" },
];

function Notes() {
  return (
    <>
      <h2>How the money moves</h2>
      <p>
        You open an online childcare account for each child and pay in by bank transfer, standing order or Direct Debit. Your payment usually shows within one working day, and the
        government&rsquo;s share is added at the same time: £2 for every £8, so a £250 bill needs £200 from you. You then pay the nursery, childminder or club from the account. The
        top-up stops at {gbp(TFC.capPerChild)} a year for each child, which you reach by spending {gbp(SPEND_MAX)}; for a disabled child the limit is {gbp(TFC.capDisabled)}, reached at{" "}
        {gbp(SPEND_MAX_DISABLED)}.
      </p>
      <p>
        The limit is counted in 3-month periods, not over the year: up to {gbp(TFC.capPerChild / 4)} of top-up every 3 months, or {gbp(TFC.capDisabled / 4)} for a disabled child. If
        your costs bunch up, say a summer of holiday clubs, one quarter can hit its limit while another uses little. Paying in a steady amount each month spreads the top-up evenly.
      </p>

      <h2>Who can get it</h2>
      <p>
        The work test is the same as for the{" "}
        <Link href="/uk/benefits/free-childcare-hours">30 hours of funded childcare</Link>, and one application covers both. You, and your partner if you live together, must each
        expect to earn at least 16 hours a week at your minimum wage over the next 3 months: {m(minimumQuarterEarnings("national-living-wage"))} ({m(minimumWeeklyEarnings("national-living-wage"))} a week) at 21 and over, {m(minimumQuarterEarnings("18-20"))} at 18 to 20, and{" "}
        {m(minimumQuarterEarnings("apprentice"))} for under-18s and apprentices. Neither of you can expect adjusted net income over £100,000. You can apply while on maternity, paternity,
        shared parental or adoption leave, and a partner who gets Carer&rsquo;s Allowance or contribution-based ESA can count while the other works.
      </p>
      <p>
        Your child is covered until the September after their 11th birthday, or the September after their 16th if they are disabled. You cannot use it for a foster child, alongside
        Universal Credit or childcare vouchers, or if either of you gets a childcare bursary or grant.
      </p>

      <h2>Tax-Free Childcare or Universal Credit</h2>
      <p>
        You can have one or the other. <Link href="/uk/benefits/universal-credit">Universal Credit</Link> pays back up to {Math.round(UC_CHILDCARE.share * 100)}% of what you pay, up to{" "}
        {m(UC_CHILDCARE.maxOne)} a month for one child or {m(UC_CHILDCARE.maxTwoPlus)} for two or more. On paper that is far more: with one child at {gbp(6_000)} a year, Tax-Free
        Childcare adds {gbp(ONE.tfc.topUp)} while Universal Credit could cover up to {gbp(ONE.uc.annual)}. With two children at {gbp(9_000)} each, it is {gbp(TWO.tfc.topUp)} against up to{" "}
        {gbp(TWO.uc.annual)}, because Universal Credit&rsquo;s cap for two or more children bites.
      </p>
      <p>
        The catch is that the childcare amount is part of your Universal Credit award, and the taper takes {Math.round(UC_2026.taper * 100)}p of every pound you earn above any work allowance from the whole award. A
        household earning enough for the award to taper to nothing gets none of the 85%, while Tax-Free Childcare keeps paying whatever you earn up to the limit. Run the{" "}
        <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link>{" "}with your pay before you choose, and wait for a decision on Tax-Free Childcare before you cancel a
        Universal Credit claim. One more limit to know: for one child, the 85% stops growing once your childcare reaches about {gbp(UC_CEILING_ONE)} a year.
      </p>

      <h2>What it can pay for</h2>
      <p>
        Registered childminders, nurseries and nannies; breakfast, after-school and holiday clubs; and extras such as meals, nappies and trips when the provider supplies them. The
        provider must be registered and signed up to the scheme before you can pay them, so check that first. Many providers will add themselves if asked. For a disabled child, the
        larger top-up can also help pay a provider for specialist equipment. It cannot pay for school fees, uniforms, or care from friends and family who are not registered.
      </p>
    </>
  );
}

export default async function TfcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/free-childcare-hours", "/uk/benefits/universal-credit", "/uk/benefits/universal-credit-taper", "/uk/benefits/child-benefit", "/uk/benefits/high-income-child-benefit"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Tax-Free Childcare Calculator"
      lead="How much the government adds to your childcare bill each year, and whether Universal Credit's help would be worth more."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <TfcStudio query={query} />
    </CalcPage>
  );
}
