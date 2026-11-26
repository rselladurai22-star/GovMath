import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import CtrStudio from "./CtrStudio";
import { ogFor } from "@/gm/og";
import { CTR_2026, CTR_SCHEME_RANGE, HB_2026, councilTaxReduction, type MeansInput } from "@/lib/benefits/housing-support";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Council Tax Reduction & Benefit Calculator",
  description:
    "Free Council Tax Reduction calculator (once called Council Tax Benefit) for 2026/27. Estimate your discount from income, savings and who lives with you.",
  alternates: { canonical: "/uk/benefits/council-tax-reduction" },
  openGraph: ogFor("/uk/benefits/council-tax-reduction"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/council-tax-reduction", label: "Council Tax Reduction" },
];

// Every figure in the text below comes from the engine, so it moves with the rates.
const w = (n: number) => gbp(n, true);
const ND = CTR_2026.nonDependant;
const SA = CTR_2026.secondAdult;
const bandRows = (() => {
  let from = 0;
  return ND.bands.map((b) => {
    const row = { range: b.below === Infinity ? `${w(from)} or more` : from === 0 ? `Under ${w(b.below)}` : `${w(from)} to ${w(b.below - 0.01)}`, amount: b.amount };
    from = b.below;
    return row;
  });
})();
const BASE: MeansInput = {
  age: "pension", couple: false, under25: false, olderPensioner: false, children: 0, disabledChildren: 0, enhancedDisabledChildren: 0, disability: "none",
  severe: false, carer: false, passported: false, earnings: 0, otherIncome: 0, childcare: 0, fullTime: false, savings: 0,
};
const BILL = 2_190;
const ctr = (i: Partial<MeansInput> & { maxShare?: number; taper?: number }) =>
  councilTaxReduction({ ...BASE, nation: "england", annualBill: BILL, maxShare: 1, taper: 0.2, nonDependants: [], noNonDepDeductions: false, ...i });
// A single pensioner with £300 a week of pensions.
const PEN = ctr({ otherIncome: 300 });
// A single working-age parent of one child, taking home £1,100 a month.
const WA = { age: "working" as const, children: 1, earnings: (1_100 * 12) / 52 };
const WA_HIGH = ctr({ ...WA, ...CTR_SCHEME_RANGE.generous });
const WA_LOW = ctr({ ...WA, ...CTR_SCHEME_RANGE.strict });
const WA_PASS_LOW = ctr({ age: "working", passported: true, ...CTR_SCHEME_RANGE.strict });
const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

const FAQS: { q: string; a: string }[] = [
  {
    q: "I own my home. Can I still get Council Tax Reduction?",
    a: "Yes. Unlike Housing Benefit, it is for owners as well as tenants, including people with a mortgage. The same means test applies, and the value of the home you live in is not counted as savings.",
  },
  {
    q: "I get Universal Credit. Do I need to claim separately?",
    a: "Yes. Council Tax Reduction is not part of Universal Credit: claim it from your council. Many councils then use the Universal Credit award to work out your reduction, and some update it automatically each time your award changes, so check how yours does it.",
  },
  {
    q: "We are a couple and only one of us is over State Pension age. Which scheme applies?",
    a: "In England the pensioner rules apply only if neither of you gets Universal Credit, Income Support, income-based JSA or income-related ESA. Most mixed-age couples claim Universal Credit, so the council's working-age scheme applies to them.",
  },
  {
    q: "Can I challenge the council's decision?",
    a: "Yes. Write to the council first, saying why you think the decision is wrong. If it does not change it within two months, or you disagree with the answer, you can appeal to the Valuation Tribunal in England; Scotland and Wales have their own review routes.",
  },
  {
    q: "Does Council Tax Reduction affect my other benefits?",
    a: "No. It is a reduction in your bill, not income, so it does not count for Universal Credit, Pension Credit or Housing Benefit, and it is not taxable.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Apply for Council Tax Reduction", href: "https://www.gov.uk/apply-council-tax-reduction" },
  { label: "legislation.gov.uk: Council Tax Reduction Schemes (Prescribed Requirements) (England) Regulations 2012", href: "https://www.legislation.gov.uk/uksi/2012/2885/contents" },
  { label: "legislation.gov.uk: Council Tax Reduction Schemes (Prescribed Requirements) (England) (Amendment) Regulations 2026 (the 2026/27 figures)", href: "https://www.legislation.gov.uk/uksi/2026/27/contents/made" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 Housing Benefit rates the schemes follow)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "Welsh Government: Council Tax discounts, exemptions and reductions", href: "https://www.gov.wales/council-tax-reduction" },
  { label: "mygov.scot: Council Tax discounts, exemptions and reductions", href: "https://www.mygov.scot/council-tax/discounts-exemptions-and-reductions" },
];

function Notes() {
  return (
    <>
      <h2>Two schemes: pension age and working age</h2>
      <p>
        Council Tax Benefit was replaced in 2013 by local Council Tax Reduction schemes, sometimes called Council Tax Support. For people over State Pension age the rules are set
        nationally, and every council in England has to follow them: up to the whole bill, reduced by {pct(CTR_2026.taper)} of any income above your applicable amount, the same weekly
        needs figure Housing Benefit uses. Wales and Scotland also run one national scheme for working-age people, with up to 100% of the bill.
      </p>
      <p>
        A single pensioner with {w(300)} a week from pensions is {w(PEN.excess)} over the {w(PEN.applicableAmount)} applicable amount, so {w(PEN.taperCut)} a week comes off the
        maximum: on a {gbp(BILL)} bill they would get {gbp(PEN.annual)} a year and pay {gbp(PEN.leftToPay)}. On Pension Credit Guarantee Credit, the reduction is the whole bill, with
        no income or savings check.
      </p>

      <h2>Why working-age help varies in England</h2>
      <p>
        Every English council designs its own working-age scheme. Many make everyone pay a minimum share of the bill, from a few per cent to a third or more; some use a steeper taper
        than 20p; others have moved to income bands, set a lower savings limit, or treat Universal Credit claimants differently. That is why the calculator shows a range, from a
        scheme like the pensioner one to a stricter one paying at most {pct(CTR_SCHEME_RANGE.strict.maxShare)} with a {Math.round(CTR_SCHEME_RANGE.strict.taper * 100)}p taper.
      </p>
      <p>
        The gap is real money. A lone parent with one child taking home {gbp(1_100)} a month, with a {gbp(BILL)} bill, could get {gbp(WA_HIGH.annual)} a year under a generous scheme
        and {gbp(WA_LOW.annual)} under the stricter one. Even someone on income-based JSA, who gets the most a scheme allows, would pay {gbp(BILL - WA_PASS_LOW.annual)} a year under
        a 70% scheme. Your council publishes its scheme each year: search for &ldquo;council tax support scheme&rdquo; with its name, and enter its maximum and taper in the
        calculator.
      </p>

      <h2>Other adults in the home</h2>
      <p>
        In the pensioner scheme, each other adult who lives with you, such as a grown-up son or daughter, is expected to contribute, so a fixed amount comes off your reduction each
        week. Nothing is taken off if you or your partner are registered blind or get Attendance Allowance, PIP daily living or DLA care, or for adults on Pension Credit, students and
        some others. Working-age schemes set their own amounts.
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Other adult, England pensioner scheme</th>
              <th scope="col">Deduction a week</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Not in work</th>
              <td>{w(ND.notWorking)}</td>
            </tr>
            {bandRows.map((b) => (
              <tr key={b.range}>
                <th scope="row">In work, gross {b.range}</th>
                <td>{w(b.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The second adult rebate</h2>
      <p>
        Pensioners in England whose own income is too high for a reduction can still get one because of who lives with them. If another adult who is not your partner and does not pay
        rent shares your home on a low income, the council can take {pct(SA.onBenefit)} off the bill if they get Pension Credit, Income Support, income-based JSA or income-related ESA,{" "}
        {pct(SA.lower.share)} if their gross income is under {w(SA.lower.below)} a week, or {pct(SA.upper.share)} if it is under {w(SA.upper.below)}. You get whichever is higher of
        this and your normal reduction, so ask the council to check both. This calculator does not work it out.
      </p>

      <h2>Claiming</h2>
      <p>
        Apply to your council, online in most areas. If you also rent and qualify for{" "}
        <Link href="/uk/benefits/housing-benefit">Housing Benefit</Link>, one form usually covers both. Take off the{" "}
        <Link href="/uk/property/single-person-discount">single person discount</Link>{" "}first if you live alone: the reduction is worked out on the bill after discounts. Check your
        band with the <Link href="/uk/property/council-tax-bands">council tax bands calculator</Link>, and if you are over State Pension age on a low income, check{" "}
        <Link href="/uk/benefits/pension-credit">Pension Credit</Link>, which brings the full reduction with it. The weekly figures in schemes follow Housing Benefit&rsquo;s: a single
        working-age adult&rsquo;s personal allowance is {w(HB_2026.personal.single)} a week.
      </p>
    </>
  );
}

export default async function CouncilTaxReductionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/single-person-discount", "/uk/property/council-tax-bands", "/uk/benefits/housing-benefit", "/uk/benefits/pension-credit", "/uk/benefits/universal-credit", "/uk/students/student-council-tax"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Council Tax Reduction Calculator"
      lead="How much could come off your council tax bill: the national rules for pensioners, and the range English councils' working-age schemes give."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CtrStudio query={query} />
    </CalcPage>
  );
}
