import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import UcStudio from "./UcStudio";
import { ogFor } from "@/gm/og";
import { capitalTariff, ucRates, universalCredit2026, UC_DEFAULT_INPUT } from "@/lib/benefits/uc-engine";
import { lhaMonthly } from "@/lib/benefits/lha-engine";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Universal Credit Calculator: How Much Will I Get?",
  description:
    "Free Universal Credit calculator for 2026/27. Estimate how much UC you will get each month from your rent, children, earnings, savings and health.",
  alternates: { canonical: "/uk/benefits/universal-credit" },
  openGraph: ogFor("/uk/benefits/universal-credit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/universal-credit", label: "Universal Credit" },
];

// Every figure in the text below comes from the engines, so it moves with the rates.
const R = ucRates("2026/27");
const N = ucRates("2027/28");
const m = (n: number) => gbp(n, true);
const SAVINGS_EXAMPLE = capitalTariff(10_000).deduction;
const BRISTOL_ONE_BED = lhaMonthly("Bristol", "1");
// Take-home pay at which the award runs out, for two common households.
const STOPS_SINGLE = universalCredit2026(UC_DEFAULT_INPUT).breakEvenEarnings;
const PARENT = universalCredit2026({ ...UC_DEFAULT_INPUT, children: 1, tenure: "social", rent: 700 });

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much is Universal Credit for a single person in 2026/27?",
    a: `The standard allowance is ${m(R.standard.single25)} a month if you are 25 or over and ${m(R.standard.singleUnder25)} if you are under 25. Couples get ${m(R.standard.couple25)} between them if either is 25 or over, or ${m(R.standard.coupleUnder25)} if both are under 25. Amounts for children, rent, health and caring are added on top.`,
  },
  {
    q: "How much is Universal Credit going up in April 2027?",
    a: `DWP's proposed rates put the standard allowance at ${m(N.standard.single25)} a month for a single person aged 25 or over (${m(N.standard.singleUnder25)} under 25) and ${m(N.standard.couple25)} for a couple. The child element becomes ${m(N.child.each)} and the work allowances ${gbp(N.workAllowance.withHousing)} and ${gbp(N.workAllowance.noHousing)}. Your award changes from the first assessment period that starts on or after 6 April 2027. Choose "From April 2027" above to see yours.`,
  },
  {
    q: "Is the two-child limit still in place?",
    a: `No. It ended on 6 April 2026. Every child now gets the child element of ${m(R.child.each)} a month, or ${m(R.child.firstPre2017)} for an eldest child born before 6 April 2017. The benefit cap still applies, so some larger families do not see the whole increase.`,
  },
  {
    q: "Can I get Universal Credit if I work full time?",
    a: `Yes, there is no limit on hours. What matters is take-home pay. A single person aged 25 or over with no rent or children stops getting Universal Credit at about ${gbp(STOPS_SINGLE)} a month. A single parent with one child and ${gbp(700)} rent keeps some until about ${gbp(PARENT.breakEvenEarnings)}.`,
  },
  {
    q: "Does my partner's income count if only I need to claim?",
    a: "Yes. A couple living together must make one joint claim. Your partner's earnings, other income and savings are counted with yours, even if they would not qualify on their own.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Universal Credit, what you'll get", href: "https://www.gov.uk/universal-credit/what-youll-get" },
  { label: "GOV.UK: Universal Credit, eligibility", href: "https://www.gov.uk/universal-credit/eligibility" },
  { label: "GOV.UK: Universal Credit, how you're paid", href: "https://www.gov.uk/universal-credit/how-youre-paid" },
  { label: "GOV.UK: Housing costs and Universal Credit", href: "https://www.gov.uk/housing-and-universal-credit" },
  { label: "GOV.UK: Universal Credit, money, savings and investments", href: "https://www.gov.uk/guidance/universal-credit-money-savings-and-investments" },
  { label: "DWP: Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028" },
  { label: "DWP: Universal Credit Local Housing Allowance rates 2026 to 2027", href: "https://www.gov.uk/government/publications/universal-credit-local-housing-allowance-rates-2026-to-2027" },
  { label: "The Universal Credit Regulations 2013", href: "https://www.legislation.gov.uk/uksi/2013/376/contents" },
];

function Notes() {
  return (
    <>
      <h2>What counts as savings</h2>
      <p>
        Everything you could turn into money, for you and your partner together: cash, current and savings accounts, ISAs, shares, Premium Bonds, cryptocurrency, and a property you own but
        do not live in. Redundancy pay and an inheritance count from the day you receive them.
      </p>
      <p>
        The home you live in does not count. Nor do your belongings, a pension pot you have not started to draw, or the assets of a business you work in. Benefit arrears and some compensation
        payments are ignored for at least a year.
      </p>
      <p>
        The first £6,000 is ignored. Between £6,000 and £16,000 your payment falls by {m(R.capital.per250)} for each £250 or part of it, so £10,000 costs {m(SAVINGS_EXAMPLE)} a month. One
        pound over £16,000 and there is no award at all. Spending or giving money away to get under a limit does not work: DWP can treat you as still having it.
      </p>

      <h2>Help with rent</h2>
      <p>
        Rent is the largest part of most awards, and the part that most often falls short. Private renters get their rent or the Local Housing Allowance for their area and family size,
        whichever is lower: {m(BRISTOL_ONE_BED)} a month for a one-bedroom home in Bristol, for example. Those rates have been frozen since April 2024, so many rents are now above them. The{" "}
        <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance calculator</Link>{" "}works out your bedroom entitlement from your children&rsquo;s ages and shows the gap.
        Council and housing association tenants get the full rent, less 14% for one spare bedroom or 25% for two. Homeowners get nothing towards a mortgage.
      </p>

      <h2>The five-week wait</h2>
      <p>
        Your award is worked out over a month, called an assessment period, and paid seven days after it ends. Claim on the 10th and the first money arrives on the 17th of the following
        month. It then comes on that date every month, and each payment looks back at the pay your employer reported in that period.
      </p>
      <p>
        If you cannot last five weeks you can ask for an advance of up to your first payment. It is a loan: the{" "}
        <Link href="/uk/benefits/uc-advance">advance calculator</Link>{" "}shows what comes off each later payment. If you are moving from Housing Benefit, it carries on for two more weeks
        and you do not pay that back.
      </p>

      <h2>When this estimate will be off</h2>
      <ul>
        <li>
          <strong>Other adults at home.</strong>{" "}The {m(R.nonDependant)} contribution only applies to someone aged 21 or over, and not if you or they get certain disability benefits, or
          they get Pension Credit or Carer&rsquo;s Allowance. Remove them above if so.
        </li>
        <li>
          <strong>You were moved from tax credits or another old benefit.</strong>{" "}If your migration notice left you worse off, a transitional element tops you up. It is not shown here,
          and it shrinks as your other elements rise.
        </li>
        <li>
          <strong>Money you owe.</strong>{" "}Advance repayments, overpayments and some debts are taken from the payment, usually up to 15% of your standard allowance.
        </li>
        <li>
          <strong>Self-employment and uneven pay.</strong>{" "}After a year in business you can be treated as earning a set minimum. Five weekly paydays in one assessment period will cut that
          month&rsquo;s payment.
        </li>
      </ul>
      <p>
        If you are already working and want to know what extra hours are worth, the <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link>{" "}starts from gross pay and
        includes tax.
      </p>
    </>
  );
}

export default async function UniversalCreditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit-taper", "/uk/benefits/benefit-cap", "/uk/benefits/local-housing-allowance", "/uk/benefits/tax-free-childcare", "/uk/benefits/child-benefit", "/uk/benefits/carers-earnings"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Universal Credit Calculator"
      lead="How much Universal Credit your household would get a month, built up line by line from your rent, children, pay and savings."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <UcStudio query={query} />
    </CalcPage>
  );
}
