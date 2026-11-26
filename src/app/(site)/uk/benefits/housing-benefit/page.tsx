import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import HbStudio from "./HbStudio";
import { ogFor } from "@/gm/og";
import { HB_2026, housingBenefit, meansTest, type MeansInput } from "@/lib/benefits/housing-support";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Housing Benefit Calculator UK 2026/27",
  description:
    "Free Housing Benefit calculator for 2026/27. Estimate help with rent from your income, savings, household and non-dependants, with the full means test.",
  alternates: { canonical: "/uk/benefits/housing-benefit" },
  openGraph: ogFor("/uk/benefits/housing-benefit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/housing-benefit", label: "Housing Benefit" },
];

// Every figure in the text below comes from the engine, so it moves with the rates.
const w = (n: number) => gbp(n, true);
const P = HB_2026.personal;
const PR = HB_2026.premium;
const D = HB_2026.disregard;
const C = HB_2026.capital;
const ND = HB_2026.nonDependant;
const ALLOWANCES = [
  { who: "Single, reached State Pension age on or after 1 April 2021", a: P.pensionSingle },
  { who: "Single, reached State Pension age before 1 April 2021", a: P.pensionSingleOlder },
  { who: "Couple, both reached State Pension age on or after 1 April 2021", a: P.pensionCouple },
  { who: "Couple, otherwise", a: P.pensionCoupleOlder },
  { who: "Working age, single, 25 or over (or a lone parent)", a: P.single },
  { who: "Working age, single, under 25", a: P.singleUnder25 },
  { who: "Working age, couple", a: P.couple },
  { who: "Each child", a: HB_2026.child },
];
const PREMIUMS = [
  { who: "Disability premium (working age), single / couple", a: `${w(PR.disabilitySingle)} / ${w(PR.disabilityCouple)}` },
  { who: "Enhanced disability premium, single / couple", a: `${w(PR.enhancedSingle)} / ${w(PR.enhancedCouple)}` },
  { who: "Severe disability premium, for each person who qualifies", a: w(PR.severeSingle) },
  { who: "Carer premium", a: w(PR.carer) },
  { who: "Disabled child premium / enhanced, each child", a: `${w(PR.disabledChild)} / ${w(PR.enhancedDisabledChild)}` },
];
const bandRows = (() => {
  let from = 0;
  return ND.bands.map((b) => {
    const row = { range: b.below === Infinity ? `${w(from)} or more` : from === 0 ? `Under ${w(b.below)}` : `${w(from)} to ${w(b.below - 0.01)}`, amount: b.amount };
    from = b.below;
    return row;
  });
})();
// A single pensioner on the State Pension and a small workplace pension, £120 rent.
const PENSIONER: MeansInput = {
  age: "pension", couple: false, under25: false, olderPensioner: false, children: 0, disabledChildren: 0, enhancedDisabledChildren: 0, disability: "none",
  severe: false, carer: false, passported: false, earnings: 0, otherIncome: 290, childcare: 0, fullTime: false, savings: 0,
};
const EX = housingBenefit({ ...PENSIONER, landlord: "social", rent: 120, ineligible: 0, lhaArea: "Bristol", lhaCategory: "1", lhaOverride: 0, spareRooms: 0, nonDependants: [], noNonDepDeductions: false });
const EX_ND = housingBenefit({ ...PENSIONER, landlord: "social", rent: 120, ineligible: 0, lhaArea: "Bristol", lhaCategory: "1", lhaOverride: 0, spareRooms: 0, nonDependants: ["not-working"], noNonDepDeductions: false });
const EX_M = meansTest(PENSIONER);

const FAQS: { q: string; a: string }[] = [
  {
    q: "My rent is more than Housing Benefit will pay. What can I do?",
    a: "Ask your council for a Discretionary Housing Payment. It is a short-term top-up from a fixed local budget, for people already getting Housing Benefit or the housing element of Universal Credit who cannot meet the gap. Councils usually want to see your income and spending, and what you are doing to close the gap, such as looking for a cheaper home.",
  },
  {
    q: "Can Housing Benefit be paid straight to my landlord?",
    a: "Council tenants never see the money: it goes into the rent account. For private and housing association tenancies it is usually paid to you, but the council can pay the landlord if you ask, if you are 8 weeks or more in arrears, or if it thinks you are likely to struggle to pay.",
  },
  {
    q: "I own my home. Is there any help with housing costs?",
    a: "Not Housing Benefit. If you get Pension Credit you may be able to get Support for Mortgage Interest, a loan towards the interest on your mortgage that is repaid when the home is sold. You can still claim Council Tax Reduction as an owner.",
  },
  {
    q: "Will I be moved to Universal Credit?",
    a: "Working-age people on Housing Benefit are being moved to Universal Credit when DWP sends them a migration notice; if you are moved, transitional protection keeps your total at its old level until something changes. Pension-age claims stay on Housing Benefit, and so do claims for supported or temporary housing.",
  },
  {
    q: "What changes do I have to report?",
    a: "Anything that affects the claim, for you or anyone living with you: starting or stopping work, a change in pay, pensions or savings, someone moving in or out, a rent change, or going abroad. Tell the council straight away; an overpayment is usually taken back from future Housing Benefit.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Housing Benefit, eligibility", href: "https://www.gov.uk/housing-benefit/eligibility" },
  { label: "GOV.UK: Housing Benefit, what you'll get (eligible rent, spare bedrooms, LHA)", href: "https://www.gov.uk/housing-benefit/what-youll-get" },
  { label: "GOV.UK: Housing Benefit, how to claim (advance claims and backdating)", href: "https://www.gov.uk/housing-benefit/how-to-claim" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 Housing Benefit rates)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "DWP: Housing Benefit guidance for supported housing claims", href: "https://www.gov.uk/government/publications/housing-benefit-guidance-for-supported-housing-claims" },
  { label: "legislation.gov.uk: The Housing Benefit Regulations 2006", href: "https://www.legislation.gov.uk/uksi/2006/214/contents" },
  { label: "GOV.UK: Support for Mortgage Interest", href: "https://www.gov.uk/support-for-mortgage-interest" },
];

function Notes() {
  return (
    <>
      <h2>Who can still claim</h2>
      <p>
        Housing Benefit is closed to most new claims; working-age renters get help through{" "}
        <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}instead. You can still make a new claim if you have reached State Pension age (for a couple, both of you,
        unless you were claiming Pension Credit together before 15 May 2019), or if you live in temporary accommodation arranged by the council, a refuge, or sheltered or supported
        housing that provides care, support or supervision. Existing working-age claims carry on until DWP moves them across.
      </p>
      <p>
        You usually cannot get it if you have more than {gbp(C.upper)} in savings and no Guarantee Credit, rent from a close relative you live with, are a full-time student, or are
        buying your home. Claim through your council, or as part of a{" "}
        <Link href="/uk/benefits/pension-credit">Pension Credit</Link>{" "}claim, which passes the details on. You can claim up to 13 weeks ahead (17 weeks at 60 or over), for example
        when you are moving.
      </p>

      <h2>How the award is worked out</h2>
      <p>
        The council starts from your eligible rent: the rent and most service charges, but not heating, hot water, lighting, cooking or meals. For a private tenancy that is capped at
        the <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance</Link>{" "}for your area and household; in social housing, working-age tenants lose 14% for one spare
        bedroom and 25% for two or more. A fixed amount is then taken off for each other adult who lives with you. That gives your maximum Housing Benefit.
      </p>
      <p>
        If you get Pension Credit Guarantee Credit, income-based JSA, income-related ESA or Income Support, you get the maximum. Otherwise your weekly income is compared with your
        applicable amount, and for each £1 above it, 65p comes off. A single pensioner with {w(290)} a week of State Pension and private pension and {w(120)} rent is{" "}
        {w(EX_M.excess)} above the {w(EX_M.applicableAmount)} applicable amount, so {w(EX.taperCut)} comes off and the award is {w(EX.weekly)} a week. If a grown-up son who is not working
        moved in, a further {w(EX.weekly - EX_ND.weekly)} would go, leaving {w(EX_ND.weekly)}; if he earned {w(ND.bands[3].below)} a week or more, the deduction alone would be{" "}
        {w(ND.bands[4].amount)} or more. Awards under 50p a week are not paid.
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Other adult&rsquo;s gross income a week</th>
              <th scope="col">Deduction a week</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Not in work (or under 16 hours)</th>
              <td>{w(ND.notWorking)}</td>
            </tr>
            {bandRows.map((b) => (
              <tr key={b.range}>
                <th scope="row">In work: {b.range}</th>
                <td>{w(b.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Nothing is taken off if you or your partner are registered blind or get Attendance Allowance, the daily living part of PIP or the care part of DLA, or for adults who are on
        Pension Credit, students, or under 25 on Universal Credit with no earnings.
      </p>

      <h2>Your applicable amount</h2>
      <p>The applicable amount is the law&rsquo;s figure for what your household needs to live on each week: a personal allowance, plus amounts for children and premiums.</p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Personal allowances, 2026/27</th>
              <th scope="col">A week</th>
            </tr>
          </thead>
          <tbody>
            {ALLOWANCES.map((r) => (
              <tr key={r.who}>
                <th scope="row">{r.who}</th>
                <td>{w(r.a)}</td>
              </tr>
            ))}
            {PREMIUMS.map((r) => (
              <tr key={r.who}>
                <th scope="row">{r.who}</th>
                <td>{r.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What counts as income</h2>
      <p>
        Pensions, Carer&rsquo;s Allowance, New Style JSA and ESA and most other income count in full. Child Benefit, child maintenance, PIP, DLA and Attendance Allowance are ignored.
        From earnings, after tax, National Insurance and half of any pension contribution, the first {w(D.single)} a week is ignored for a single person, {w(D.couple)} for a couple,{" "}
        {w(D.higher)} if you get a disability or carer premium, and {w(D.loneParent)} for a lone parent, plus {w(D.additional)} if you work 30 hours or more (16 for parents and disabled
        people). Working parents can also have up to {w(D.childcareOne)} a week of registered childcare ignored for one child, or {w(D.childcareTwoPlus)} for two or more.
      </p>
      <p>
        Savings up to {gbp(C.lowerPension)} are ignored at pension age, and {gbp(C.lowerWorkingAge)} below it. Above that, £1 a week of income is assumed for every {gbp(C.stepPension)}{" "}
        (pension age) or {gbp(C.stepWorkingAge)} (working age), or part of it. Claim{" "}
        <Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction</Link>{" "}at the same time: it uses the same means test.
      </p>
    </>
  );
}

export default async function HousingBenefitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/council-tax-reduction", "/uk/benefits/local-housing-allowance", "/uk/benefits/pension-credit", "/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/property/rent-increase"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Housing Benefit Calculator"
      lead="How much Housing Benefit you could get towards your rent each week, for pensioners and people in supported or temporary housing."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <HbStudio query={query} />
    </CalcPage>
  );
}
