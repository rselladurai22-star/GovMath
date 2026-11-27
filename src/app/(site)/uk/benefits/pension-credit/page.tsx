import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import PcStudio from "./PcStudio";
import { ogFor } from "@/gm/og";
import { PC_2026, PC_DEFAULT_INPUT, STATE_PENSION_2026, pcTariffIncome, pensionCredit2026 } from "@/lib/benefits/later-life";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Pension Credit Calculator UK 2026/27",
  description:
    "Free Pension Credit calculator for 2026/27. Check Guarantee Credit and Savings Credit from your income and savings, and the extra help it unlocks.",
  alternates: { canonical: "/uk/benefits/pension-credit" },
  openGraph: ogFor("/uk/benefits/pension-credit"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/pension-credit", label: "Pension Credit" },
];

// Every figure below comes from the engine, so it moves with the rates.
const m = (n: number) => gbp(n, true);
const G = PC_2026.guarantee;
const SAVINGS_EX = 25_000;
const TARIFF_EX = pcTariffIncome(SAVINGS_EX);
// Someone on the full new State Pension: above the standard guarantee, but a disability addition brings them back in.
const FULL_SP = STATE_PENSION_2026.newFull;
const WITH_SD = pensionCredit2026({ ...PC_DEFAULT_INPUT, statePension: FULL_SP, severeDisability: 1 });
// Savings Credit: a pre-2016 pensioner with £230 a week, and where it runs out.
const SC_EX = pensionCredit2026({ ...PC_DEFAULT_INPUT, statePension: 230, savingsCreditEligible: true });
const SC_END = G.single + PC_2026.savingsMax.single / 0.4;

const FAQS: { q: string; a: string }[] = [
  { q: "Can I get Pension Credit if I own my home?", a: "Yes. The home you live in is not counted as savings, and Pension Credit can include help with some housing costs, such as ground rent and service charges." },
  { q: "Do disability benefits count as income?", a: "No. Attendance Allowance, PIP, Disability Living Allowance, Child Benefit, Housing Benefit, Council Tax Reduction and the Winter Fuel Payment are all ignored. Carer's Allowance does count." },
  { q: "What if I put off claiming my State Pension?", a: "The State Pension you could be getting still counts as income, and so does a personal or workplace pension you have not yet taken. You cannot build up extra State Pension by deferring while you get Pension Credit." },
  { q: "Can I go abroad and keep Pension Credit?", a: "For up to 4 weeks, such as a holiday, if you tell the Pension Service before you go. It can carry on for up to 26 weeks if you go abroad for medical treatment." },
];

const SOURCES = [
  { label: "GOV.UK: Pension Credit, what you'll get", href: "https://www.gov.uk/pension-credit/what-youll-get" },
  { label: "GOV.UK: Pension Credit eligibility (income, savings and partners)", href: "https://www.gov.uk/pension-credit/eligibility" },
  { label: "GOV.UK: How to claim Pension Credit (backdating)", href: "https://www.gov.uk/pension-credit/how-to-claim" },
  { label: "State Pension Credit Regulations 2002, Schedule I paragraph 1 (severe disability)", href: "https://www.legislation.gov.uk/uksi/2002/1792/schedule/I/paragraph/1" },
  { label: "GOV.UK: Free TV licence at 75", href: "https://www.gov.uk/free-discount-tv-licence" },
  { label: "GOV.UK: Winter Fuel Payment", href: "https://www.gov.uk/winter-fuel-payment" },
  { label: "GOV.UK: Warm Home Discount", href: "https://www.gov.uk/the-warm-home-discount-scheme" },
  { label: "DWP: Proposed benefit and pension rates 2027 to 2028 (with the 2026/27 rates)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028/proposed-benefit-and-pension-rates-2027-to-2028" },
];

function Notes() {
  return (
    <>
      <h2>Who misses out, and why it matters</h2>
      <p>
        Pension Credit tops weekly income up to {m(G.single)} for a single person and {m(G.couple)} for a couple. The full new State Pension is {m(FULL_SP)}, just above the single
        rate, so many people assume they cannot get it. But the guarantee rises with a disability: on the full new State Pension with Attendance Allowance, living alone with nobody paid Carer&rsquo;s Allowance for you, it comes to{" "}
        {m(WITH_SD.minimumGuarantee)} and Pension Credit pays {m(WITH_SD.weekly)} a week. Caring and children raise it too.
      </p>
      <p>
        Even a few pence a week counts, because of what it opens: <Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction</Link>,{" "}
        <Link href="/uk/benefits/housing-benefit">Housing Benefit</Link>{" "}if you rent, a free TV licence at 75 and Cold Weather Payments.
      </p>

      <h2>How savings count</h2>
      <p>
        The first {gbp(PC_2026.capitalDisregard)} is ignored and there is no upper limit. Above that, every {gbp(500)} or part of it counts as {gbp(1)} a week of income, so{" "}
        {gbp(SAVINGS_EX)} counts as {gbp(TARIFF_EX)} a week. Your home does not count. If you are not sure whether you are over the line, claim anyway: the figures are checked
        when you apply.
      </p>

      <h2>Savings Credit, for people who retired before April 2016</h2>
      <p>
        If you or your partner reached State Pension age before 6 April 2016, Savings Credit rewards income above {m(PC_2026.savingsThreshold.single)} a week (
        {m(PC_2026.savingsThreshold.couple)} for a couple), up to {m(PC_2026.savingsMax.single)} single or {m(PC_2026.savingsMax.couple)} for a couple. It is paid even above the
        guarantee and tapers away: a single person on {m(230)} gets {m(SC_EX.weekly)} in all, and it runs out at about {m(SC_END)}.
      </p>

      <h2>Couples where one of you is younger</h2>
      <p>
        You can only claim as a couple when you have both reached State Pension age, or one of you already gets Housing Benefit for people over State Pension age. Otherwise you
        claim <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}together until the younger partner catches up.
      </p>

      <h2>Claim now: three months is the limit</h2>
      <p>
        A claim can be backdated by up to three months, if you qualified then, so a late claim loses money for good. Have your income, savings and bank details for the date you
        want to backdate to. If you look after someone, claim <Link href="/uk/benefits/carers-earnings">Carer&rsquo;s Allowance</Link>{" "}too: even when your State Pension
        means it is not paid, it adds {m(PC_2026.carer)} a week to your guarantee.
      </p>
    </>
  );
}

export default async function PcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/carers-earnings", "/uk/benefits/housing-benefit", "/uk/benefits/council-tax-reduction", "/uk/property/single-person-discount", "/uk/benefits/benefits-checker"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Pension Credit Calculator"
      lead="Whether you could get Pension Credit, how much a week, and the help it unlocks, which is often worth more."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <PcStudio query={query} />
    </CalcPage>
  );
}
