import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { BAND_D_AVG, councilBill, type CtBand } from "@/lib/property/council-tax-bands";
import { householdBill } from "@/lib/property/discounts";
import { gbp } from "@/components/flagship/format";
import SPDStudio from "./SPDStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Single Person Council Tax Discount Calculator",
  description:
    "Living alone takes 25% off your council tax. See how much the single person discount saves you a year and a month, including for part of a year.",
  alternates: { canonical: "/uk/property/single-person-discount" },
  openGraph: ogFor("/uk/property/single-person-discount"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Renting & council tax" },
  { href: "/uk/property/single-person-discount", label: "Single Person Discount" },
];

// Every figure below is worked out from the engines at the 2026/27 national average Band D charges.
const bandBill = (nation: "england" | "wales" | "scotland", band: CtBand) =>
  councilBill({ nation, band, bandD: 0, adultsCounted: 2, disabledReduction: false, premiumPct: 0, instalments: 10 }).fullBill;
const ENG_D = BAND_D_AVG.england;
const SAVE = (b: number) => householdBill({ annualBill: b, people: ["counts"] }).fullYearDiscount;
const ENG_A = bandBill("england", "A");
const ENG_B = bandBill("england", "B");
const ENG_E = bandBill("england", "E");
const WAL_D = BAND_D_AVG.wales;
const SCO_D = BAND_D_AVG.scotland;
// Someone who lived alone from 1 December to 31 March: 121 days.
const PART = householdBill({ annualBill: ENG_D, people: ["counts"], days: 121 });
const HALF = householdBill({ annualBill: ENG_D, people: ["carer", "apprentice"] });
// A late claim backdated a year.
const MONTHLY_SAVE = SAVE(ENG_D) / 12;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the single person discount the same as Council Tax Reduction?",
    a: "No. The single person discount is 25% off for anyone the council counts as living alone, whatever their income or savings. Council Tax Reduction is a separate, means-tested scheme for people on a low income. You can get both: the reduction is worked out on the bill after the 25% has come off.",
  },
  {
    q: "My partner works away most of the week. Do they still count?",
    a: "Usually yes. What matters is where their main home is, not how many nights they spend there. Someone who works on rigs, at sea or in another city during the week but comes home at weekends normally still has your home as their sole or main residence, so you do not get the discount. A partner who has moved out for good, or into a care home or prison, stops counting.",
  },
  {
    q: "Does a lodger stop the discount?",
    a: "Yes, if your home is their main home and they are 18 or over and not disregarded. Taking in a lodger usually ends the 25% from the day they move in, so the rent needs to be worth more to you than the discount. A lodger who is a full-time student is disregarded and does not affect it.",
  },
  {
    q: "Can I get the discount on a second home or an empty property?",
    a: `No. The discount depends on who lives in a home as their main residence, and nobody does in a second home. Many councils now charge a premium instead: up to 100% extra on second homes and homes empty for a year or more in England. At the England average Band D that premium is ${gbp(ENG_D)} a year on top of the bill.`,
  },
  {
    q: "Will the council check that I really live alone?",
    a: "Yes. Councils regularly compare their discount lists with credit reference, electoral roll and benefit data, and send review forms. If a review finds someone else lives there, the council removes the discount from the date that person moved in and can add a penalty of up to £70 for not telling it.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Council Tax, who has to pay and who is disregarded", href: "https://www.gov.uk/council-tax/who-has-to-pay" },
  { label: "GOV.UK: apply for a Council Tax discount", href: "https://www.gov.uk/apply-for-council-tax-discount" },
  { label: "GOV.UK: discounts for full-time students", href: "https://www.gov.uk/council-tax/discounts-for-full-time-students" },
  { label: "GOV.UK: discounts for disabled people and people who are severely mentally impaired", href: "https://www.gov.uk/council-tax/discounts-for-disabled-people" },
  { label: "Local Government Finance Act 1992, Schedule 1: persons disregarded", href: "https://www.legislation.gov.uk/ukpga/1992/14/schedule/1" },
];

function Notes() {
  return (
    <>
      <h2>What 25% is worth in your band</h2>
      <p>
        The discount is a quarter of whatever your band costs, so it is worth more in a bigger home. At the 2026/27 England average Band D charge of {gbp(ENG_D)}, it saves{" "}
        <strong>{gbp(SAVE(ENG_D))} a year</strong>, about {gbp(MONTHLY_SAVE, true)} a month. In Band A it is {gbp(SAVE(ENG_A))}, in Band B {gbp(SAVE(ENG_B))} and in Band E{" "}
        {gbp(SAVE(ENG_E))}. The average Band D saving is {gbp(SAVE(WAL_D))} in Wales and {gbp(SAVE(SCO_D))}{" "}in Scotland, where the 25% also comes off the water and waste water charges
        collected with council tax. Your own council&rsquo;s charge is on your bill, or use the{" "}
        <Link href="/uk/property/council-tax-bands">council tax band calculator</Link>{" "}to find it.
      </p>

      <h2>It is about who counts, not who lives there</h2>
      <p>
        A full bill assumes two or more adults. The council counts only people aged 18 or over whose main home it is, and then leaves out anyone in a disregarded group. So you can share
        your home and still get the 25%, as long as only one person counts. A parent living with two children at university, or with an adult son who is still at school at 18, keeps the
        discount.
      </p>
      <p>
        If nobody counts, the discount doubles to 50%. Two people who are both live-in carers or apprentices pay {gbp(HALF.payable)} instead of {gbp(ENG_D)} at the England average. A
        home where everyone is a full-time student pays nothing at all, and the same goes for someone who is severely mentally impaired and lives alone or only with students. Students who
        live away during term should use the <Link href="/uk/students/student-council-tax">student council tax calculator</Link>.
      </p>

      <h2>How to claim, and how far back</h2>
      <p>
        The discount is never added automatically. Apply on your council&rsquo;s website (the GOV.UK finder takes you to the right form) with the date you started living alone, or the date
        the other adult moved out or became disregarded. Students need a certificate from their college or university; carers and apprentices need a letter from the organisation or employer.
      </p>
      <p>
        Most councils backdate a claim to the date you became eligible if you can show it, for example with a tenancy end date or a forwarding address. A claim made a year late can be
        worth {gbp(SAVE(ENG_D))} at the England average, so it is worth asking even if you moved in a while ago.
      </p>

      <h2>Part of the year, and telling the council when it ends</h2>
      <p>
        Council tax is charged by the day, and so is the discount. If you lived alone from 1 December to 31 March, that is {PART.days} days and a discount of {gbp(PART.discount)} at the
        England average, not a full {gbp(SAVE(ENG_D))}. Enter the days in the calculator to see your own figure.
      </p>
      <p>
        When someone moves in who counts, the discount ends that day. You must tell the council within 21 days, or it can charge a penalty on top of the discount it claws back. If you
        are on a low income, check the <Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction calculator</Link>{" "}as well: it is worked out on the bill after the 25% has
        come off, and pension-age households can get up to 100% off through it. A new partner&rsquo;s income will also change what you get from{" "}
        <Link href="/uk/benefits/universal-credit">Universal Credit</Link>.
      </p>
    </>
  );
}

export default async function SPDPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/council-tax-bands", "/uk/benefits/council-tax-reduction", "/uk/students/student-council-tax", "/uk/benefits/universal-credit", "/uk/benefits/pension-credit"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Single Person Discount Calculator"
      lead="Whether you get 25% off your council tax, or 50%, given who lives with you, and what that saves you a year and a month."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <SPDStudio query={query} />
    </CalcPage>
  );
}
