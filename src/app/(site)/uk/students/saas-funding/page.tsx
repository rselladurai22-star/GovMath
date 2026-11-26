import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { SAAS_2026, saas2026 } from "@/lib/students/nations";
import { PLANS_2026, repayments2026 } from "@/lib/students/loans";
import { gbp } from "@/components/flagship/format";
import SaasStudio from "./SaasStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "SAAS Funding Calculator 2026/27: Loan & Bursary",
  description:
    "Free SAAS funding calculator for Scottish students in 2026/27. See your bursary and student loan by household income, for young and independent students.",
  alternates: { canonical: "/uk/students/saas-funding" },
  openGraph: ogFor("/uk/students/saas-funding"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students" },
  { href: "/uk/students/saas-funding", label: "SAAS Funding Calculator" },
];

// Every figure below comes from the SAAS 2026/27 bands in the engine.
const TOP = saas2026(0, false);
const MID = saas2026(22_000, false);
const LOW = saas2026(30_000, false);
const MIN = saas2026(40_000, false);
const IND = saas2026(0, true);
const IND_MID = saas2026(22_000, true);
// One pound over a band edge.
const EDGE_BELOW = saas2026(23_999, false);
const EDGE_ABOVE = saas2026(24_000, false);
const P4 = PLANS_2026.plan4;
const REPAY_40 = repayments2026({ salary: 40_000, plans: ["plan4"] });
const SPECIAL_SUPPORT = 2_400;
const FEE_LOAN_2027 = 10_050;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I have to apply to SAAS every year?",
    a: "Yes. Each application covers one academic year, so you apply again before every year of the course and tick the tuition fees box each time. SAAS reassesses your household income every year, so your band, and with it your bursary, can change.",
  },
  {
    q: "Will SAAS fund me if I repeat a year or change course?",
    a: "Usually, once. SAAS funds the shortest time you need to finish your course plus one extra year, which covers a repeat year, an approved change of course or an intercalated year. Use it up and a second repeat will not be funded, so talk to SAAS before you switch.",
  },
  {
    q: "Is there an age limit for the student loan?",
    a: "Your age does not affect tuition fees, bursaries or grants, but to get a student loan for living costs you must be under 61 on the relevant date (1 August for a course starting between August and December). Older students can still get the bursary if their income qualifies.",
  },
  {
    q: "Can I get SAAS funding to study in Ireland?",
    a: "For approved first degrees at Trinity College Dublin, University College Dublin, University College Cork and the universities in Galway and Maynooth, yes. SAAS pays the student contribution part of the fee, not every charge the university makes, and you can apply for the usual bursary and loan for living costs.",
  },
  {
    q: "Is the Tuition Fee Loan going up?",
    a: `Yes, for students studying in England, Wales or Northern Ireland. SAAS says the loan rises from ${gbp(SAAS_2026.rukFeeLoan)} to ${gbp(FEE_LOAN_2027)} a year from the 2027/28 academic year. Tuition at Scottish universities stays free for Scottish students.`,
  },
];

const SOURCES = [
  { label: "SAAS: undergraduate funding, what funding is available", href: "https://www.saas.gov.uk/full-time/undergraduates/student-loan-bursary-tuition-fees" },
  { label: "SAAS: who can apply for funding (young and independent students)", href: "https://www.saas.gov.uk/full-time/undergraduates/who-can-apply" },
  { label: "SAAS: payment options", href: "https://www.saas.gov.uk/full-time/undergraduates/payment-options" },
  { label: "SAAS: repaying your student loan", href: "https://www.saas.gov.uk/full-time/undergraduates/repaying-the-student-loan" },
  { label: "SAAS: funding information for parents and carers", href: "https://www.saas.gov.uk/files/446/saas-parent-carer-funding-information.pdf" },
  { label: "GOV.UK: repaying your student loan, how much you repay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
];

function Notes() {
  return (
    <>
      <h2>Bands, not a sliding scale</h2>
      <p>
        SAAS does not taper your support pound by pound as Student Finance England does. It puts your household into one of four income bands, and everyone in a band gets the same. A young
        student whose family earns {gbp(20_999)} or less gets {gbp(TOP.bursary)} bursary and {gbp(TOP.loan)} loan, {gbp(TOP.total)} in all. From {gbp(21_000)} the bursary drops to{" "}
        {gbp(MID.bursary)}, from {gbp(24_000)} to {gbp(LOW.bursary)}, and from {gbp(34_000)} there is no bursary and the loan falls to {gbp(MIN.loan)}.
      </p>
      <p>
        That makes the edges matter. A household on {gbp(23_999)} gets {gbp(EDGE_BELOW.total)}; one pound more and it is {gbp(EDGE_ABOVE.total)}. SAAS uses gross taxable income for the last
        complete tax year, so if your parents pay into a pension or their income has fallen, ask SAAS how it treats that before you apply. Each loan figure already includes a{" "}
        {gbp(SPECIAL_SUPPORT)} Special Support Loan.
      </p>

      <h2>Young or independent decides whose income counts</h2>
      <p>
        You are a young student if, on the first day of your course, you are under 25, have no child who depends on you, are not married or living with a partner, and have not supported
        yourself through work or benefits for three years. Otherwise you are independent, and only your own income and your partner&rsquo;s count. Independent students get a smaller bursary
        and a bigger loan: {gbp(IND.bursary)} and {gbp(IND.loan)} in the lowest band, and no bursary at all from {gbp(21_000)}, where the loan alone is {gbp(IND_MID.loan)}. Once you are
        independent you cannot go back to being a young student.
      </p>
      <p>
        If you are under 25 and permanently estranged from your parents, SAAS will not ask for their income. If a local authority has ever looked after you, apply for the Care Experienced
        Students&rsquo; Bursary, which is separate funding you do not repay.
      </p>

      <h2>Tuition is free in Scotland, not elsewhere</h2>
      <p>
        For a first degree at a Scottish university SAAS pays {gbp(SAAS_2026.scottishFee)} a year straight to the university, and you never repay it, but you must tick the tuition fees box
        on every year&rsquo;s application. Study in England, Wales or Northern Ireland and you are charged that university&rsquo;s fee, up to {gbp(SAAS_2026.rukFeeLoan)} in 2026/27, which
        you can borrow as a Tuition Fee Loan. Over a four-year degree that can add almost {gbp(SAAS_2026.rukFeeLoan * 4)} to your loan, so it is worth comparing before you accept an offer.
      </p>

      <h2>How the money is paid, and paid back</h2>
      <p>
        At a Scottish university you choose each year between payments over term time, about nine months starting with a double payment, or the same total spread over twelve months, which
        avoids an empty summer. A one-year course or a final year is always paid over term time. Apply from April and before 30 June so the money is in place when term starts.
      </p>
      <p>
        Scottish loans are on {P4.label}. You repay {Math.round(P4.rate * 100)}% of income above {gbp(P4.threshold)} a year from the April after you leave, so on a {gbp(40_000)} salary that
        is {gbp(REPAY_40.yearly)} a year, about {gbp(REPAY_40.monthly)} a month, and whatever is left after {P4.writeOffYears} years is written off. Students from England and Wales get
        different support: compare the <Link href="/uk/students/maintenance-loan">Maintenance Loan calculator</Link>{" "}and the{" "}
        <Link href="/uk/students/welsh-student-finance">Student Finance Wales calculator</Link>. A flat where everyone is a full-time student pays no council tax: the{" "}
        <Link href="/uk/students/student-council-tax">student council tax checker</Link>{" "}covers Scotland too.
      </p>
    </>
  );
}

export default async function SaasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/welsh-student-finance", "/uk/students/maintenance-loan", "/uk/students/student-council-tax", "/uk/students/plan-2-student-loan"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="SAAS Funding Calculator"
      lead="The bursary and student loan SAAS will give you for 2026/27, from your household income band, and what happens to your tuition fees."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <SaasStudio query={query} />
    </CalcPage>
  );
}
