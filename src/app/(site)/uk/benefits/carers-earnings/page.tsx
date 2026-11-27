import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import CarersStudio from "./CarersStudio";
import { ogFor } from "@/gm/og";
import { CA_2026, CA_2027, carerEarnings } from "@/lib/benefits/carers";
import { NMW_2026 } from "@/lib/benefits/minimum-wage";
import { UC_2026 } from "@/lib/benefits/uc-engine";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Carer's Allowance: How Much Can I Earn?",
  description:
    "Free Carer's Allowance earnings limit calculator for 2026/27. Check how much you can earn a week after allowable deductions and keep your Carer's Allowance.",
  alternates: { canonical: "/uk/benefits/carers-earnings" },
  openGraph: ogFor("/uk/benefits/carers-earnings"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/carers-earnings", label: "Carer's Allowance Earnings" },
];

// Every figure below comes from the engines, so it moves with the rates.
const m = (n: number) => gbp(n, true);
const NLW = NMW_2026["national-living-wage"].hourly;
const base = { pensionWeekly: 0, careCostsWeekly: 0, scotland: false, overlapping: 0 };
/** The most hours at the National Living Wage that stay within the limit, to a tenth of an hour. */
const maxHoursAt = (hourly: number, pensionPct: number) => {
  let h = 0;
  while (carerEarnings({ ...base, grossWeekly: hourly * (h + 0.1), pensionWeekly: (hourly * (h + 0.1) * pensionPct) / 100 }).withinLimit) h = Math.round((h + 0.1) * 10) / 10;
  return h;
};
const H_NLW = maxHoursAt(NLW, 0);
const H_NLW_5 = maxHoursAt(NLW, 5);
const CARE_EX = carerEarnings({ ...base, grossWeekly: 260, careCostsWeekly: 150 });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does my partner's income affect Carer's Allowance?",
    a: "No. Only your own earnings count, and savings make no difference. It can affect the benefits of the person you care for, though: an extra amount for severe disability in their means-tested benefits, such as Pension Credit, usually stops once someone is paid Carer's Allowance for looking after them.",
  },
  {
    q: "Is the earnings limit going up in April 2027?",
    a: `Under DWP's proposed rates, the limit rises from ${gbp(CA_2026.earningsLimit)} to ${gbp(CA_2027.earningsLimit)} a week and the allowance from ${m(CA_2026.weekly)} to ${m(CA_2027.weekly)}. Choose the April 2027 rates in the calculator to check your own figures.`,
  },
  {
    q: "Does my own pension count as earnings?",
    a: "No. Money from an occupational or private pension is not earnings for Carer's Allowance. The State Pension is different: it overlaps, so you are paid whichever is higher, not both.",
  },
  {
    q: "I was overpaid in the past. What is happening?",
    a: "DWP is reassessing Carer's Allowance overpayments from 10 April 2015 to 2 September 2025. If you are affected you may get a refund or have the debt reduced or cancelled. You do not need to contact the Carer's Allowance Unit: DWP will get in touch.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Carer's Allowance eligibility (the earnings limit and what comes off)", href: "https://www.gov.uk/carers-allowance/eligibility" },
  { label: "GOV.UK: Carer's Allowance, how it works", href: "https://www.gov.uk/carers-allowance" },
  { label: "GOV.UK: Carer's Allowance, report changes", href: "https://www.gov.uk/carers-allowance-report-change" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 rates and earnings limit)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
];

function Notes() {
  return (
    <>
      <h2>Who can get it</h2>
      <p>
        Carer&rsquo;s Allowance is {m(CA_2026.weekly)} a week in 2026/27, proposed to rise to {m(CA_2027.weekly)} from April 2027, with the earnings limit going from{" "}
        {gbp(CA_2026.earningsLimit)} to {gbp(CA_2027.earningsLimit)} a week. You can get it if you are 16 or over, care for someone for at least {CA_2026.hoursCaring} hours a week,
        are not in full-time education or studying 21 hours a week or more, and have lived in Great Britain for at least 2 of the last 3 years. The caring can include help with
        washing and cooking, taking someone to appointments, and dealing with bills and shopping.
      </p>
      <p>
        The person you care for must already get a qualifying benefit: PIP daily living, the middle or highest care rate of Disability Living Allowance, Attendance Allowance,
        Armed Forces Independence Payment, or a Scottish equivalent such as Adult Disability Payment. Only one carer can be paid for each person. In Scotland, Carer Support
        Payment has replaced Carer&rsquo;s Allowance.
      </p>

      <h2>A cliff edge, not a taper</h2>
      <p>
        Most benefits fall gradually as you earn more. Carer&rsquo;s Allowance does not: earnings of {gbp(CA_2026.earningsLimit)} a week or less keep the full {m(CA_2026.weekly)},
        and a penny more loses all of it for that week. At the National Living Wage of {m(NLW)} an hour, with no pension or care costs, that means {H_NLW} hours a week at most.
        Paying 5% into a workplace pension lifts it to {H_NLW_5} hours, because half the contribution comes off your earnings.
      </p>

      <h2>What comes off your pay</h2>
      <p>
        Income Tax, National Insurance and half of what you pay into a pension all come off. So do expenses you need for the job, such as specialist clothing or travel between
        workplaces that your employer does not pay for.
      </p>
      <p>
        If you pay someone to look after the person you care for, or your children, while you work, you can deduct that too, up to half of your earnings after the other
        deductions. The carer cannot be your partner, parent, child or sibling. On {gbp(260)} a week with {gbp(150)} of care costs, only {m(CARE_EX.careAllowed)} of the care comes off and{" "}
        {m(CARE_EX.counted)} counts.
      </p>

      <h2>Bonuses, overtime and pay that varies</h2>
      <p>
        The test is applied to the earnings of each week, so a one-off bonus or a week of overtime can take you over for that week even if you are normally well under. If your pay
        goes up and down, tell the Carer&rsquo;s Allowance Unit your pattern of work so it can be looked at over a fair period rather than a single week. Report a new job, a pay
        rise or more hours straight away: overpayments have to be paid back.
      </p>
      <p>Self-employed carers are judged on profit after allowable business costs, tax and National Insurance, worked out the same way.</p>

      <h2>Carer&rsquo;s Allowance and other benefits</h2>
      <p>
        On <Link href="/uk/benefits/universal-credit">Universal Credit</Link>, Carer&rsquo;s Allowance is taken off in full, but caring adds a carer element of{" "}
        {m(UC_2026.carer)} a month and lifts the <Link href="/uk/benefits/benefit-cap">benefit cap</Link>. Over State Pension age, even an entitlement that is not paid adds a carer
        amount to <Link href="/uk/benefits/pension-credit">Pension Credit</Link>. The person you care for needs a qualifying benefit first; the{" "}
        <Link href="/uk/benefits/pip-points">PIP points calculator</Link>{" "}shows whether their daily living score reaches it.
      </p>
      <p>
        Check the other side too. The person you care for usually loses a severe disability premium, or the severe disability addition in Pension Credit, once you are paid
        Carer&rsquo;s Allowance for looking after them, and may lose some Council Tax Reduction. Ask whoever pays their benefits before you claim, so the household as a whole
        comes out ahead.
      </p>

      <h2>State Pension, credits and tax</h2>
      <p>
        Carer&rsquo;s Allowance overlaps with the State Pension: if your State Pension is {m(CA_2026.weekly)} a week or more, nothing is paid, though the entitlement still adds a
        carer amount to Pension Credit. Each week you get it brings National Insurance credits towards your own State Pension. It is taxable if your total income is over the
        Personal Allowance, and a claim can be backdated by up to 3 months.
      </p>
    </>
  );
}

export default async function CarersEarningsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/pip-points", "/uk/benefits/universal-credit", "/uk/benefits/pension-credit", "/uk/benefits/benefit-cap", "/uk/benefits/benefits-checker"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Carer's Allowance Earnings Calculator"
      lead="Whether your pay this week is under the Carer’s Allowance earnings limit, by how much, and how many hours you can work at your rate."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CarersStudio query={query} />
    </CalcPage>
  );
}
