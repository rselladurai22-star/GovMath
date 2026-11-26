import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { studentCouncilTax } from "@/lib/students/loans";
import { BAND_D_AVG } from "@/lib/property/council-tax-bands";
import { gbp } from "@/components/flagship/format";
import CouncilTaxStudio from "./CouncilTaxStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Do Students Pay Council Tax? Exemption Checker",
  description:
    "Free student council tax checker. Full-time students are exempt: see if your home is, when a discount applies if you live with non-students, and how to claim.",
  alternates: { canonical: "/uk/students/student-council-tax" },
  openGraph: ogFor("/uk/students/student-council-tax"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students" },
  { href: "/uk/students/student-council-tax", label: "Student Council Tax" },
];

// Worked out with the engine at the 2026/27 England average Band D charge.
const BILL = BAND_D_AVG.england;
const ONE = studentCouncilTax({ people: ["student", "student", "counts"], bill: BILL, months: 12 });
const TWO = studentCouncilTax({ people: ["student", "counts", "counts"], bill: BILL, months: 12 });
const HALF = studentCouncilTax({ people: ["student", "disregarded"], bill: BILL, months: 12 });
const GAP = studentCouncilTax({ people: ["counts"], bill: BILL, months: 2 });

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I have to pay council tax over the summer between years?",
    a: "Not if the house stays exempt. A home where every tenant is a full-time student stays exempt during the holidays as long as you still have the tenancy and are going back to it as term-time accommodation, even if you go home for the summer. The exemption stops if a non-student moves in.",
  },
  {
    q: "When does my exemption end after my last exams?",
    a: `The day you complete the course, abandon it or are asked to leave. That is usually the course end date your university gives, which can be later than your last exam but is not your graduation day. If you stay on in the house after that, you count as an adult. Two months at the England average Band D charge, as the only adult who counts, is ${gbp(GAP.pay)} with the 25% discount.`,
  },
  {
    q: "Do I pay council tax before my course starts?",
    a: "You are not a student until your course begins, so a tenancy that starts in, say, July can mean a short bill for the weeks before term. Under-20s who left school or college after 30 April are not counted until 1 November, which covers most school leavers in that gap.",
  },
  {
    q: "Does my student status affect my parents' bill?",
    a: "Only if you are counted there. If your parents' home is your main home and you are a full-time student, you are disregarded, so a parent who would otherwise live alone with you can claim the 25% single person discount.",
  },
  {
    q: "Can I get money back if I paid when I was exempt?",
    a: "Yes. Send your council the student certificates for the period and ask it to backdate the exemption to the date it should have started. Councils refund or credit the overpayment once they have the proof.",
  },
];

const SOURCES = [
  { label: "GOV.UK: council tax discounts for full-time students", href: "https://www.gov.uk/council-tax/discounts-for-full-time-students" },
  { label: "GOV.UK: council tax, who has to pay and who is disregarded", href: "https://www.gov.uk/council-tax/who-has-to-pay" },
  { label: "mygov.scot: council tax discounts, exemptions and reductions", href: "https://www.mygov.scot/council-tax/discounts-exemptions-and-reductions" },
  { label: "Council Tax (Exempt Dwellings) Order 1992, Class N", href: "https://www.legislation.gov.uk/uksi/1992/558/article/3" },
  { label: "Council Tax (Additional Provisions for Discount Disregards) Regulations 1992", href: "https://www.legislation.gov.uk/uksi/1992/552/regulation/3" },
];

function Notes() {
  return (
    <>
      <h2>Who counts as a full-time student</h2>
      <p>
        For council tax it is about the course, not your student card. The course has to last at least a year, with at least 24 weeks of study a year averaging 21 hours a week or more. If you are under 20 and studying up to A level, a course of at least three months and 12 hours a week is enough. Most university degrees qualify, and so do many
        full-time college courses. Part-time students, people on a short course and anyone who has finished their course count as ordinary adults.
      </p>
      <p>
        A few others are treated like students. A student&rsquo;s husband, wife, civil partner or dependant who is not a British citizen, and whose visa does not allow them to work or claim
        benefits, does not count and keeps the home exempt. So does a school or college leaver under 20 from 1 May to 31 October after they finish. Halls of residence are exempt whoever lives
        there.
      </p>

      <h2>Living with people who are not students</h2>
      <p>
        Council tax is charged on the home, assuming two adults. Students are left out of the count, so what matters is how many others there are. With one adult who counts, the bill gets
        the 25% single person discount: at the 2026/27 England average Band D charge of {gbp(BILL)}, that is {gbp(ONE.pay)} instead of the full bill. With two or more, the full{" "}
        {gbp(TWO.pay)} is due. If the only other person is also someone who is not counted, such as an apprentice on £195 a week or less, the discount is 50%: {gbp(HALF.pay)}.
      </p>
      <p>
        The bill usually goes to the people who count, but tenancy agreements often split bills between everyone, so agree in writing who pays what before you sign. If a housemate drops out
        or becomes part-time and stays, the home loses its exemption from that day: tell the council within 21 days.
      </p>

      <h2>Proving it, and when to claim</h2>
      <p>
        Councils do not know who is a student until you tell them. Ask your university or college for a council tax exemption certificate for each person in the house, then apply on your
        council&rsquo;s website with the tenancy start date. Do it as soon as you move in, and again at the start of each academic year, because councils often ask for fresh proof each year. If a bill arrives first, do not ignore it: send the certificates and ask for it to be cancelled.
      </p>
      <p>
        Find your band and its charge with the <Link href="/uk/property/council-tax-bands">council tax band calculator</Link>. A student who lives with one parent can also check the{" "}
        <Link href="/uk/property/single-person-discount">single person discount</Link>, and if you are moving in partway through a month, the{" "}
        <Link href="/uk/life/pro-rata-rent">pro rata rent calculator</Link>{" "}works out the first payment. For living costs, see the{" "}
        <Link href="/uk/students/maintenance-loan">Maintenance Loan calculator</Link>.
      </p>
    </>
  );
}

export default async function CouncilTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/maintenance-loan", "/uk/property/council-tax-bands", "/uk/property/single-person-discount", "/uk/life/pro-rata-rent", "/uk/students/plan-2-student-loan"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Student Council Tax Calculator"
      lead="Do students pay council tax? Build your household and see whether your home is exempt, gets 25% or 50% off, or pays the full bill."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CouncilTaxStudio query={query} />
    </CalcPage>
  );
}
