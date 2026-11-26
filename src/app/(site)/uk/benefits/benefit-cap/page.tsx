import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import CapStudio from "./CapStudio";
import { ogFor } from "@/gm/og";
import { BENEFIT_CAP, UC_DEFAULT_INPUT, universalCredit2026 } from "@/lib/benefits/uc-engine";
import { NMW_2026 } from "@/lib/benefits/minimum-wage";
import { monthlyFromHours } from "@/lib/benefits/uc-work";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Benefit Cap Calculator: Universal Credit 2026/27",
  description:
    "Free benefit cap calculator for Universal Credit and Housing Benefit in 2026/27. See if you are capped, by how much, and which exemptions lift the cap.",
  alternates: { canonical: "/uk/benefits/benefit-cap" },
  openGraph: ogFor("/uk/benefits/benefit-cap"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/benefit-cap", label: "Benefit Cap" },
];

// Every figure in the text below comes from the engines, so it moves with the rates.
const m = (n: number) => gbp(n, true);
const LIMIT = BENEFIT_CAP.earningsExemption;
const LEVELS = [
  { who: "Couple, or single parent, outside London", year: BENEFIT_CAP.elsewhere.family },
  { who: "Single adult, no children, outside London", year: BENEFIT_CAP.elsewhere.single },
  { who: "Couple, or single parent, in Greater London", year: BENEFIT_CAP.london.family },
  { who: "Single adult, no children, in Greater London", year: BENEFIT_CAP.london.single },
];
const NLW = NMW_2026["national-living-wage"].hourly;
const YOUNG = NMW_2026["18-20"].hourly;
const hoursFor = (hourly: number) => Math.ceil(((LIMIT * 12) / 52 / hourly) * 2) / 2;
// A couple with three children and £1,100 rent, outside London: out of work, and at the earnings threshold.
const FAMILY = { ...UC_DEFAULT_INPUT, couple: true, children: 3, tenure: "social" as const, rent: 1_100 };
const CAPPED = universalCredit2026(FAMILY);
const WORKING = universalCredit2026({ ...FAMILY, earnings: LIMIT });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the benefit cap going up in April 2027?",
    a: `No. DWP's proposed rates for 2027/28 keep it at ${gbp(BENEFIT_CAP.elsewhere.family)} a year for families and ${gbp(BENEFIT_CAP.elsewhere.single)} for single adults, or ${gbp(BENEFIT_CAP.london.family)} and ${gbp(BENEFIT_CAP.london.single)} in Greater London. Universal Credit and Child Benefit both rise, so a household that is already capped gains nothing from the increase.`,
  },
  {
    q: "Did ending the two-child limit change the benefit cap?",
    a: "No. Since April 2026 every child gets a child element, but the cap was left where it was. A family that was already capped sees the extra child elements taken straight back, and some families who were under the limit are now over it.",
  },
  {
    q: "Does the benefit cap apply to pensioners?",
    a: "Not once you are over State Pension age. A couple where one partner is still under State Pension age claims Universal Credit, and the cap can apply to them.",
  },
  {
    q: "How do I know if the cap has been applied to me?",
    a: "Your Universal Credit statement, in your online account, shows a benefit cap line under the amounts taken off, with the sum removed that month. For Housing Benefit, the council's decision letter shows the reduction. DWP also writes to households it expects to cap.",
  },
  {
    q: "Where can I get help paying the rent if I am capped?",
    a: "From your council. In England ask about the Crisis and Resilience Fund; in Scotland and Wales, a Discretionary Housing Payment. These payments are not counted towards the cap. Tell DWP through your journal as well, so that a change that lifts the cap is picked up quickly.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Benefit cap", href: "https://www.gov.uk/benefit-cap" },
  { label: "GOV.UK: Benefit cap amounts", href: "https://www.gov.uk/benefit-cap/benefit-cap-amounts" },
  { label: "GOV.UK: Benefit cap, when you're not affected", href: "https://www.gov.uk/benefit-cap/when-youre-not-affected" },
  { label: "GOV.UK: When the benefit cap affects your Universal Credit payments (the grace period)", href: "https://www.gov.uk/benefit-cap/when-benefit-cap-affects-universal-credit-payments" },
  { label: "DWP: Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
];

function Notes() {
  return (
    <>
      <h2>The four cap levels</h2>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Household</th>
              <th scope="col">A week</th>
              <th scope="col">A month</th>
              <th scope="col">A year</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((l) => (
              <tr key={l.who}>
                <th scope="row">{l.who}</th>
                <td>{m(l.year / 52)}</td>
                <td>{m(l.year / 12)}</td>
                <td>{gbp(l.year)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Universal Credit uses the monthly figure and Housing Benefit the weekly one. A couple who do not live together are each treated as single. The levels have not moved since April
        2023 and stay frozen for 2027/28.
      </p>

      <h2>Which benefits count</h2>
      <p>
        Universal Credit, Child Benefit, Housing Benefit, Jobseeker&rsquo;s Allowance, Employment and Support Allowance, Maternity Allowance, Incapacity Benefit, Severe Disablement
        Allowance and the bereavement benefits. For most families that means Universal Credit plus Child Benefit, and it is the rent inside Universal Credit that tips them over.
      </p>
      <p>
        The childcare costs element of Universal Credit is not counted. Nor are Council Tax Reduction, the State Pension, statutory sick and maternity pay, or one-off payments such as the
        Sure Start Maternity Grant. Check your <Link href="/uk/benefits/child-benefit">Child Benefit</Link>{" "}and your{" "}
        <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance</Link>{" "}if you are not sure of the figures.
      </p>

      <h2>Working your way out: {hoursFor(NLW)} hours at the minimum wage</h2>
      <p>
        The earnings threshold is set at 16 hours a week on the National Living Wage. At {m(NLW)} an hour, {hoursFor(NLW)} hours a week is {m(monthlyFromHours(NLW, hoursFor(NLW)))} a month,
        too little to be taxed, so it just clears {gbp(LIMIT)}. An 18 to 20-year-old on {m(YOUNG)} needs{" "}
        {hoursFor(YOUNG)} hours. A couple&rsquo;s pay is added together, and it is pay
        received in the assessment period that counts, so a month with a short payslip can bring the cap back.
      </p>
      <p>
        The step is worth more than the wage. A couple with three children and {gbp(1_100)} rent outside London loses {m(CAPPED.capReduction)} a month to the cap and is paid{" "}
        {m(CAPPED.award)}. With {gbp(LIMIT)} of take-home pay the cap goes, Universal Credit is {m(WORKING.award)}, and the household is{" "}
        {m(WORKING.award + LIMIT - CAPPED.award)} a month better off. The <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link>{" "}shows what each hour beyond that is
        worth.
      </p>

      <h2>The nine-month grace period</h2>
      <p>
        If you had earned at least the threshold in each of the 12 months before your job ended or your pay fell, the cap waits nine months. Your partner&rsquo;s earnings count towards the
        test. You have to report those 12 months of earnings when you claim to get it. It runs from the day after your last day at work, and keeps running if
        you come off Universal Credit and claim again.
      </p>
    </>
  );
}

export default async function BenefitCapPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/universal-credit-taper", "/uk/benefits/local-housing-allowance", "/uk/benefits/child-benefit", "/uk/benefits/pip-points"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Benefit Cap Calculator"
      lead="Whether the benefit cap applies to your household, how much it takes off your Universal Credit or Housing Benefit, and what would lift it."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CapStudio query={query} />
    </CalcPage>
  );
}
