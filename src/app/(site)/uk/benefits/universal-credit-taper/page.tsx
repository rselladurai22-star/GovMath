import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { BENEFIT_CAP, UC_CHILDCARE, UC_DEFAULT_INPUT, ucRates, universalCredit2026 } from "@/lib/benefits/uc-engine";
import { monthlyFromHours, workChange, workLandmarks } from "@/lib/benefits/uc-work";
import { gbp } from "@/components/flagship/format";
import TaperStudio from "./TaperStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Universal Credit Taper Rate Calculator: 55p",
  description:
    "Universal Credit falls by 55p for every £1 you earn above the work allowance. See what you keep from extra hours or a pay rise in 2026/27.",
  alternates: { canonical: "/uk/benefits/universal-credit-taper" },
  openGraph: ogFor("/uk/benefits/universal-credit-taper"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/universal-credit-taper", label: "Universal Credit Taper" },
];

// Every figure in the text below comes from the engines, so it moves with the rates.
const NOW = ucRates("2026/27");
const NEXT = ucRates("2027/28");
const TAPER = Math.round(NOW.taper * 100);
const PARENT = { pensionPct: 0, region: "ruk" as const, partnerNet: 0, household: { ...UC_DEFAULT_INPUT, children: 1 } };
const pence = (share: number) => `${Math.round(share * 1000) / 10}p`;
const KEEP_BELOW_TAX = workChange({ ...PARENT, grossMonthly: 900 }, 100);
const KEEP_BASIC_RATE = workChange({ ...PARENT, grossMonthly: 1500 }, 100);
const AFTER_TAX = (100 - KEEP_BASIC_RATE.lostToTaxNi) / 100;
const TAX_STARTS = workLandmarks(PARENT, 4000).deductionsStart ?? 0;
const NLW = 12.71;
const TAX_STARTS_HOURS = Math.round(TAX_STARTS / monthlyFromHours(NLW, 1));
const PENSION_COST = 100 * KEEP_BASIC_RATE.keep;
const PARENT_AWARD = universalCredit2026({ ...UC_DEFAULT_INPUT, children: 1 });
const SINGLE_AWARD = universalCredit2026({ ...UC_DEFAULT_INPUT });

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the Universal Credit taper rate in 2026/27?",
    a: `${TAPER}%. For every £1 of take-home pay above your work allowance, your Universal Credit goes down by ${TAPER}p and you keep ${100 - TAPER}p. It stays at ${TAPER}% in April 2027.`,
  },
  {
    q: "How much can I earn before Universal Credit stops?",
    a: `There is no fixed limit: it depends on the size of your award. Universal Credit ends when ${TAPER}% of your take-home pay above the work allowance equals your whole award. A single parent aged 25 or over with one child and no rent in their claim has a maximum award of ${gbp(PARENT_AWARD.maximum, true)} a month, which runs out at take-home pay of about ${gbp(Math.round(PARENT_AWARD.breakEvenEarnings))} a month. A single person aged 25 or over with no children, no rent and no health element reaches nil at about ${gbp(Math.round(SINGLE_AWARD.breakEvenEarnings))}.`,
  },
  {
    q: "Is the 55p taken from gross pay or take-home pay?",
    a: "Take-home pay. Universal Credit counts your earnings after Income Tax, National Insurance and pension contributions, using the figures your employer reports to HMRC each payday.",
  },
  {
    q: "Does the taper change in April 2027?",
    a: `The rate does not. Under DWP's proposed 2027/28 rates the work allowances rise from ${gbp(NOW.workAllowance.noHousing)} to ${gbp(NEXT.workAllowance.noHousing)} a month with no housing costs, and from ${gbp(NOW.workAllowance.withHousing)} to ${gbp(NEXT.workAllowance.withHousing)} with them, from your first assessment period starting on or after 6 April 2027. They are final once Parliament approves them. Choose "From April 2027" above to use them.`,
  },
  {
    q: "Do I need to tell DWP when my hours or pay change?",
    a: "Not if you are an employee: your employer reports each payment to HMRC and DWP adjusts your award for that assessment period. Check the earnings shown on your statement, and report through your journal if they look wrong. If you are self-employed, you report your own income and expenses every month.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Universal Credit, how your wages affect your payments", href: "https://www.gov.uk/universal-credit/how-your-wages-affect-your-payments" },
  { label: "GOV.UK: Universal Credit, what you'll get", href: "https://www.gov.uk/universal-credit/what-youll-get" },
  { label: "DWP: benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "DWP: proposed benefit and pension rates 2027 to 2028", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2027-to-2028" },
  { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK: National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
];

function Notes() {
  return (
    <>
      <h2>How the taper works</h2>
      <p>
        Universal Credit goes down by {TAPER}p for each £1 of take-home pay above your work allowance, so you keep {100 - TAPER}p. Because it is a share and never the whole pound, earning more always
        leaves you with more.
      </p>

      <h2>Who gets a work allowance</h2>
      <p>
        Only two groups: people responsible for a child, and people with limited capability for work. A couple shares one allowance. Everyone else is tapered from the first pound of pay.
      </p>
      <ul>
        <li>
          <strong>{gbp(NOW.workAllowance.withHousing)} a month</strong>{" "}if your Universal Credit includes help with rent, or you are in temporary accommodation.
        </li>
        <li>
          <strong>{gbp(NOW.workAllowance.noHousing)} a month</strong>{" "}if it does not.
        </li>
      </ul>
      <p>
        Pay inside the allowance is yours in full. On the chart, that is the stretch before marker 1, where the line climbs fastest.
      </p>

      <h2>Why you keep less once tax starts</h2>
      <p>
        Below {gbp(TAX_STARTS, true)} a month of gross pay (about {TAX_STARTS_HOURS} hours a week at the {gbp(NLW, true)} National Living Wage) you pay no Income Tax or National Insurance, so you
        keep the full {pence(KEEP_BELOW_TAX.keep)} of a tapered pound. Above it, 20% tax and 8% National Insurance come off first. That leaves {pence(AFTER_TAX)}, the taper takes {TAPER}% of that,
        and you keep {pence(KEEP_BASIC_RATE.keep)}.
      </p>
      <p>
        The same sum makes pension saving cheap. Universal Credit ignores what you pay into a workplace pension, so £100 paid in by salary sacrifice at that level costs you about {gbp(PENSION_COST, true)} of monthly
        income. Try a percentage under More options.
      </p>

      <h2>What this page leaves out</h2>
      <ul>
        <li>
          <strong>Council Tax Reduction.</strong>{" "}Most councils cut it as your pay rises, with a taper of their own on top of this one. Check it with the{" "}
          <Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction calculator</Link>.
        </li>
        <li>
          <strong>Help tied to Universal Credit</strong>, such as free school meals. You can lose it when your award reaches nil at marker 3 or, in some parts of the UK, when your pay passes
          a set limit.
        </li>
        <li>
          <strong>Childcare.</strong>{" "}Universal Credit pays back {Math.round(UC_CHILDCARE.share * 100)}% of registered childcare, up to {gbp(UC_CHILDCARE.maxOne, true)} a month for one child or{" "}
          {gbp(UC_CHILDCARE.maxTwoPlus, true)} for two or more. Add your costs under More options, because more hours usually means a bigger bill.
        </li>
        <li>
          <strong>The benefit cap.</strong>{" "}If your award is capped, take-home pay of {gbp(BENEFIT_CAP.earningsExemption)} a month lifts the cap, and you gain far more than the chart shows. See the{" "}
          <Link href="/uk/benefits/benefit-cap">benefit cap calculator</Link>.
        </li>
        <li>
          <strong>Paydays.</strong>{" "}If you are paid weekly or four-weekly, some assessment periods catch an extra payday and that month&rsquo;s award dips.
        </li>
      </ul>
      <p>
        To check the award itself, element by element, use the <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>.
      </p>
    </>
  );
}

export default async function UcTaperPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/benefit-cap", "/uk/benefits/tax-free-childcare", "/uk/benefits/carers-earnings", "/uk/benefits/local-housing-allowance"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Universal Credit Taper Calculator"
      lead="See how much of extra pay you keep on Universal Credit, after tax, National Insurance and the 55% taper."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <TaperStudio query={query} />
    </CalcPage>
  );
}
