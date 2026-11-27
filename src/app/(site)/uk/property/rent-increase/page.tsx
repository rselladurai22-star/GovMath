import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { formatDate } from "@/lib/life/calendar";
import { rentIncrease } from "@/lib/property/renting";
import { gbp, percent } from "@/components/flagship/format";
import RentIncreaseStudio from "./RentIncreaseStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Rent Increase Calculator: Is My Rent Rise Legal?",
  description:
    "Free rent increase checker for England, Scotland, Wales and Northern Ireland. Check the notice, the once-a-year rule and how to challenge a rise.",
  alternates: { canonical: "/uk/property/rent-increase" },
  openGraph: ogFor("/uk/property/rent-increase"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Renting & council tax" },
  { href: "/uk/property/rent-increase", label: "Rent Increase Checker" },
];

// The worked example in the text, from the engine: £1,100 to £1,200 a month, notice received on 1 October 2026.
const EX = { current: 1_100, proposed: 1_200, served: "2026-10-01", starts: "2026-12-01", lastChange: "2025-12-01", income: 0, market: 0 };
const ENG = rentIncrease({ ...EX, nation: "england" });
const SCO = rentIncrease({ ...EX, nation: "scotland" });
const d = (iso: string) => formatDate(iso, "medium");

const FAQS: { q: string; a: string }[] = [
  {
    q: "What if I have already paid the new rent?",
    a: "Paying the higher rent for a while can be treated as agreeing to it, even if the notice was faulty. If you only just started, write to your landlord straight away saying you paid in error and do not accept the rise, and ask for the difference back. Get advice from Shelter or Citizens Advice if they refuse.",
  },
  {
    q: "Can my landlord evict me for challenging a rent rise?",
    a: "In England they can no longer use a no-fault section 21 notice, so they need a legal ground, such as selling the home or rent arrears, and a court order. Keep paying your current rent in full while a challenge goes on, because arrears are a ground for possession. In Scotland, eviction also needs a ground decided by the tribunal.",
  },
  {
    q: "Is there a limit on how much my rent can go up?",
    a: "Not in England, Wales or Northern Ireland: the protections are the notice rules, the once-a-year rule and, in England and for Welsh tenancies that began before December 2022, a market-rent challenge. Scotland's temporary cap on rises ended in March 2025, and caps will only return in areas a council designates as rent control areas under the Housing (Scotland) Act 2025.",
  },
  {
    q: "Do these rules apply to council or housing association homes?",
    a: "No. Social landlords raise rents each April under the government's rent policy, and lodgers who live with their landlord have no statutory rent rules at all: the increase is whatever your agreement says, and you can leave if you do not accept it.",
  },
  {
    q: "My landlord says the rent review clause in my contract allows the rise. Is that right?",
    a: "Not in England any more. Since 1 May 2026 a rent review clause has no effect, and a rise agreed under one before then that would have started after 1 May does not apply. Every rise must use Form 4A. In Wales and Northern Ireland a review clause can still work during a fixed term.",
  },
];

const SOURCES = [
  { label: "GOV.UK: assured periodic tenancies, rent increases", href: "https://www.gov.uk/assured-periodic-tenancies-tenants/rent-increases" },
  { label: "Housing Act 1988, section 13 (as amended by the Renters’ Rights Act 2025)", href: "https://www.legislation.gov.uk/ukpga/1988/50/section/13" },
  { label: "GOV.UK: private renting, rent disputes", href: "https://www.gov.uk/private-renting/rent-disputes" },
  { label: "mygov.scot: rent increases in a private residential tenancy", href: "https://www.mygov.scot/tenant-rent-increase/private-residential-tenancy" },
  { label: "nidirect: private rent and tenancies", href: "https://www.nidirect.gov.uk/articles/private-rent-and-tenancies" },
  { label: "GOV.WALES: Renting homes, tenants", href: "https://www.gov.wales/renting-homes-tenants" },
  { label: "Citizens Advice Wales: challenging a rent increase (converted and newer contracts)", href: "https://www.citizensadvice.org.uk/wales/housing/paying-rent/challenging-a-rent-increase-w/" },
  { label: "Scottish Government: tenant rights and protections (rent adjudication from 1 April 2027)", href: "https://www.gov.scot/policies/private-renting/tenant-rights-and-protections/" },
];

function Notes() {
  return (
    <>
      <h2>The three things that make a notice valid</h2>
      <p>
        <strong>The form.</strong>{" "}In England it must be Form 4A, the section 13 notice. In Wales it is form RHW12, and in Scotland the prescribed rent-increase notice. In Northern Ireland
        any written notice will do, by email or text too, as long as it gives the new rent and the date it starts.
      </p>
      <p>
        <strong>The notice period.</strong>{" "}At least 2 months in England and Wales and 3 months in Scotland and Northern Ireland, counted from when you received it. A notice you got on{" "}
        {d(EX.served)} can raise the rent from {d(ENG.earliestByNotice)} in England, but not before {d(SCO.earliestByNotice)} in Scotland.
      </p>
      <p>
        <strong>Once a year.</strong>{" "}No rise in the first year of the tenancy, and none within a year of the last one. England counts 52 weeks, which is a day short of a calendar year:
        after a rise on {d(EX.lastChange)}, the next can start from {d(ENG.earliestByYear)}. The other nations count 12 months. In England the new rent must also start on a rent day, the
        first day of a rent period.
      </p>
      <p>
        If any of these fail, the rise has no legal effect. Keep paying your current rent and tell your landlord in writing why. They can serve a fresh, correct notice, and the clock starts
        again from that one.
      </p>

      <h2>Is the new rent fair? Gather the evidence first</h2>
      <p>
        A valid notice still sets a rent you can challenge. Going from {gbp(EX.current)} to {gbp(EX.proposed)} is a {percent(ENG.share, 1)} rise, {gbp(ENG.yearly)} a year. Whether that is fair
        depends on what similar homes let for now: save three to five current adverts for homes of the same size, type and condition within a mile or so. If yours needs repairs the others
        do not, note that too. Average rents from the ONS are a useful check, but listings are what a tribunal or rent officer weighs.
      </p>

      <h2>How to challenge, nation by nation</h2>
      <ul>
        <li>
          <strong>England:</strong>{" "}apply to the First-tier Tribunal (Property Chamber) before the new rent starts. It is free. The tribunal decides the open-market rent but cannot set more
          than your landlord asked, and any rise only applies from its decision, so you will not owe back-rent for the months it takes.
        </li>
        <li>
          <strong>Scotland:</strong>{" "}return part 3 of the notice to your landlord and apply to Rent Service Scotland within 21 days of getting it. A rent officer sets a market rent within
          about 40 days, and for now it can come out <em>higher</em>{" "}than your landlord asked, so check the adverts before you refer it. From 1 April 2027 the Housing (Scotland)
          Act 2025 gives you 30 days to apply, and the rent set can no longer be more than your landlord proposed.
        </li>
        <li>
          <strong>Wales:</strong>{" "}it depends on when you started renting. If your tenancy began before 1 December 2022 (it is now a converted contract), you can apply to the
          Residential Property Tribunal before the date in the notice if you think the rent is above the market rate; the tribunal must receive the form on a weekday before that date.
          If your contract began on or after 1 December 2022 there is no tribunal route for the amount: you can only challenge a notice that is invalid, such as one on the wrong form
          or with less than 2 months&rsquo; notice, and that goes to the county court.
        </li>
        <li>
          <strong>Northern Ireland:</strong>{" "}there is no tribunal for private rents. A rise that breaks the 3-month or 12-month rule has no effect; otherwise your options are to negotiate, or
          get advice from Housing Rights.
        </li>
      </ul>

      <h2>If you cannot afford the new rent</h2>
      <p>
        Tell your landlord early: many would rather agree a smaller rise than find a new tenant. If you claim Universal Credit or Housing Benefit, report the new rent from the day it starts,
        but help with rent is capped at the <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance</Link>{" "}for your area, so a rise above it is yours to pay. The{" "}
        <Link href="/uk/benefits/housing-benefit">Housing Benefit calculator</Link>{" "}shows what you could get, and if you decide to move, the{" "}
        <Link href="/uk/property/deposit-return">deposit return calculator</Link>{" "}checks what your landlord can keep.
      </p>
    </>
  );
}

export default async function RentIncreasePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/deposit-return", "/uk/life/pro-rata-rent", "/uk/benefits/local-housing-allowance", "/uk/benefits/housing-benefit", "/uk/property/council-tax-bands"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Rent Increase Checker"
      lead="Whether your landlord's rent increase notice is valid on its form, notice period and once-a-year rule, what it costs, and the deadline to challenge it."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <RentIncreaseStudio query={query} />
    </CalcPage>
  );
}
