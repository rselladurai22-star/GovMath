import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import MaternityStudio from "./MaternityStudio";
import { fmtDate } from "./LeaveRibbon";
import { ogFor } from "@/gm/og";
import { STATUTORY_2026_27, STATUTORY_2027_28, UPRATING_2027, maternityDates, maternityPay } from "@/lib/benefits/family";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Maternity Pay & Leave Calculator UK 2026/27",
  description:
    "Free maternity pay and leave calculator for 2026/27. See your Statutory Maternity Pay week by week, your leave dates from the due date, and Maternity Allowance.",
  alternates: { canonical: "/uk/benefits/maternity-pay" },
  openGraph: ogFor("/uk/benefits/maternity-pay"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/maternity-pay", label: "Maternity Pay" },
];

// Every figure in the text below comes from the engine, so it moves with the rates.
const p = (n: number) => gbp(n, true);
const NOW = STATUTORY_2026_27;
const NEXT = STATUTORY_2027_28;
const base = { service: true, fullPayWeeks: 0, halfPayWeeks: 0, leaveWeeks: 52 };
const SALARY = 36_000;
const EX = maternityPay({ ...base, awe: SALARY / 52 });
const ENH = maternityPay({ ...base, awe: SALARY / 52, fullPayWeeks: 6, halfPayWeeks: 12 });
/** Below this, 90% of earnings is less than the flat rate for all 39 weeks. */
const BELOW_FLAT = NOW.flatRate / 0.9;
const LOW = maternityPay({ ...base, awe: 200 });
const DUE = "2027-03-01";
const D = maternityDates(DUE);

const FAQS: { q: string; a: string }[] = [
  {
    q: "What if my baby arrives early, or I am off sick just before?",
    a: "If your baby is born before your leave starts, leave and pay start the day after the birth. If you are off work with a pregnancy-related illness in the 4 weeks before the expected week of childbirth, leave and pay start automatically. Leave and SMP are still paid if a baby is stillborn after the start of the 24th week of pregnancy, or dies after being born.",
  },
  {
    q: "I have two jobs. Can I get SMP from both?",
    a: "Yes, if you qualify with each employer separately: 26 weeks with each into the qualifying week, and average earnings over the threshold in each job. If only one qualifies, you get SMP from that one; earnings from the other do not count towards it.",
  },
  {
    q: "Can my partner share the leave and pay?",
    a: "Yes, through shared parental leave. You end your maternity leave early and turn the rest, up to 50 weeks of leave and 37 weeks of pay, into shared parental leave that either of you can take, in up to three blocks each. The first 2 weeks after the birth must still be maternity leave.",
  },
  {
    q: "How does maternity pay affect Universal Credit?",
    a: "Statutory Maternity Pay counts as earnings, so it goes through the work allowance and the taper like your wages. Maternity Allowance counts as unearned income and comes off your Universal Credit pound for pound. Either way, your Universal Credit can go up while you are on leave because your income has fallen.",
  },
  {
    q: "Do I have to go back to work to keep SMP?",
    a: "No. If you qualified by the qualifying week, you get SMP for the full 39 weeks even if you then leave. Enhanced pay from your employer is different: many schemes ask you to repay the part above SMP if you do not return for a set time, so check your contract.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
  { label: "GOV.UK: Maternity Allowance", href: "https://www.gov.uk/maternity-allowance" },
  { label: "GOV.UK: Statutory Maternity Pay and Leave, employer guide (qualifying week, 26 weeks' service, notice)", href: "https://www.gov.uk/employers-maternity-pay-leave" },
  { label: "HMRC: Rates and thresholds for employers 2026 to 2027 (SMP from 5 April 2026)", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "Social Security Benefits Up-rating Order 2026 (SMP from 5 April, Maternity Allowance from 6 April)", href: "https://www.legislation.gov.uk/uksi/2026/148/contents/made" },
  { label: "Universal Credit Regulations 2013, regulation 55(4) (SMP counts as earnings)", href: "https://www.legislation.gov.uk/uksi/2013/376/regulation/55" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (SMP and Maternity Allowance)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: Shared Parental Leave and Pay", href: "https://www.gov.uk/shared-parental-leave-and-pay" },
  { label: "GOV.UK: Sure Start Maternity Grant", href: "https://www.gov.uk/sure-start-maternity-grant" },
];

function Notes() {
  return (
    <>
      <h2>SMP or Maternity Allowance</h2>
      <p>
        Statutory Maternity Pay comes from your employer. You qualify if you have worked for them continuously for 26 weeks into the qualifying week, the 15th week before the week
        your baby is due, and your average earnings are at least {p(NOW.lowerEarningsLimit)} a week. For a baby due on {fmtDate(DUE)}, the qualifying week runs from {fmtDate(D.qwStart)}{" "}
        to {fmtDate(D.qwEnd)}, so you need to have started by about {fmtDate(D.startedBy)}. Tell your employer by the end of that week, and give 28 days&rsquo; notice of when you
        want the pay to start, with your MATB1 certificate.
      </p>
      <p>
        If you miss either test, your employer gives you form SMP1 and you claim Maternity Allowance from Jobcentre Plus instead. That needs 26 weeks of work, for any employer or
        self-employed, in the 66 weeks before your due week, with earnings of at least {p(NOW.maThreshold)} a week in 13 of them. It pays 90% of your earnings up to {p(NOW.flatRate)}{" "}
        for 39 weeks, with no higher first six weeks. Self-employed people get between £27 and the full rate depending on their National Insurance record, and someone who works
        unpaid in a spouse&rsquo;s business can get £27 a week for 14 weeks.
      </p>

      <h2>How the 39 weeks are paid</h2>
      <p>
        The first six weeks pay 90% of your average weekly earnings with no upper limit. The next 33 pay {p(NOW.flatRate)}, or 90% if that is lower, and the last 13 weeks of a full
        year are unpaid. On a {gbp(SALARY)} salary that is {p(EX.firstSix)} a week, then {p(EX.remaining)}: {gbp(EX.total)} over the year against {gbp(EX.normalPay)} of normal pay.
        Below {p(BELOW_FLAT)} a week, 90% is under the flat rate all the way through: average earnings of {p(200)} pay {p(LOW.weeks[38].statutory)} a week for all 39 weeks.
      </p>
      <p>
        Average weekly earnings are worked out from the gross pay you were actually paid in the 8 weeks up to the last payday before the end of the qualifying week. Overtime,
        commission and bonuses paid in that window count; salary sacrifice for a pension or car lowers the figure. If you get a pay rise that is backdated into that period, or
        takes effect before your maternity pay ends, your employer has to work it out again. SMP and employer maternity pay go through payroll, so tax and National Insurance come
        off; Maternity Allowance is not taxed.
      </p>

      <h2>Enhanced pay from your employer</h2>
      <p>
        Many employers pay more than the statutory amount, usually as weeks of full pay and then half pay, including your SMP rather than on top of it. On {gbp(SALARY)}, six weeks
        of full pay and twelve of half pay bring the year to {gbp(ENH.total)}, of which {gbp(ENH.employerTopUp)} is from the employer. Enter your scheme under More options.
        Your contract may ask you to pay back the part above SMP if you do not return for a set period.
      </p>

      <h2>Leave that crosses April</h2>
      <p>
        Statutory pay rises each April. Under DWP&rsquo;s proposed rates the flat rate goes from {p(NOW.flatRate)} to {p(NEXT.flatRate)} a week and the earnings threshold from{" "}
        {p(NOW.lowerEarningsLimit)} to {p(NEXT.lowerEarningsLimit)}. SMP changes from the first Sunday in April (it was 5 April in 2026), so pay weeks that start
        on or after {fmtDate(UPRATING_2027.smp)} should get the new rate, with Maternity Allowance from {fmtDate(UPRATING_2027.ma)}; the 2027 up-rating order, made each spring,
        confirms the dates. Whether you qualify is fixed in the qualifying week, so a
        baby due in spring 2027 is tested against the {p(NOW.lowerEarningsLimit)} threshold even if all the pay comes after April. Choose the April 2027 rates in the calculator to
        see the split.
      </p>

      <h2>Your rights while you are off</h2>
      <p>
        You build up paid holiday through the whole of maternity leave, and many people add it to one end. You can work up to 10 keeping in touch days without losing pay for that week,
        paid at whatever you agree with your employer. Pay rises and the right to return to your job are protected. After the birth, check{" "}
        <Link href="/uk/benefits/child-benefit">Child Benefit</Link>, the{" "}
        <Link href="/uk/life/healthy-start">Healthy Start card</Link>{" "}if you are on a low income, and{" "}
        <Link href="/uk/benefits/free-childcare-hours">funded childcare</Link>, which can start the term after your baby is 9 months old.
      </p>
    </>
  );
}

export default async function MaternityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/child-benefit", "/uk/benefits/free-childcare-hours", "/uk/benefits/universal-credit", "/uk/benefits/tax-free-childcare", "/uk/life/healthy-start"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Maternity Pay Calculator"
      lead="What you will be paid on maternity leave, week by week, how far your monthly pay drops, and the dates that follow from your due date."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <MaternityStudio query={query} />
    </CalcPage>
  );
}
