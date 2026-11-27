import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import CheckerStudio from "./CheckerStudio";
import { ogFor } from "@/gm/og";
import { checkEligibility, OTHER_HELP_2026, type EligibilityInput } from "@/lib/benefits/eligibility";
import { UC_2026 } from "@/lib/benefits/uc-engine";
import { CHILD_BENEFIT_2026_27 } from "@/lib/benefits/child-benefit";
import { CA_2026 } from "@/lib/benefits/carers";
import { AA_2026, PC_2026, STATE_PENSION_2026 } from "@/lib/benefits/later-life";
import { PIP_2026 } from "@/lib/benefits/pip-assessment";
import { HEALTHY_START } from "@/lib/life/health";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Benefits Calculator UK: What Can I Claim?",
  description:
    "Free UK benefits calculator for 2026/27. Answer a few questions to see which benefits you are likely to get, from Universal Credit to PIP and Pension Credit.",
  alternates: { canonical: "/uk/benefits/benefits-checker" },
  openGraph: ogFor("/uk/benefits/benefits-checker"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/benefits-checker", label: "Benefits Eligibility Checker" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I get benefits if I own my home?",
    a: "Yes. The home you live in is not counted as savings for Universal Credit or Pension Credit, and non-means-tested benefits such as PIP, Carer's Allowance and Child Benefit ignore it altogether.",
  },
  {
    q: "Does it work for Scotland, Wales and Northern Ireland?",
    a: "It uses the rules for England. Universal Credit, Pension Credit and Child Benefit are the same in Scotland and Wales, but Scotland has its own disability, carer and family payments, such as Adult Disability Payment and the Scottish Child Payment, and Northern Ireland runs its own system.",
  },
  {
    q: "Why does it say “worth checking” rather than giving an amount?",
    a: "Disability and carer's benefits depend on an assessment of your needs, and New Style JSA and ESA on your National Insurance record, so the checker cannot know the answer. Each one links to its own calculator, which asks the questions that decide it.",
  },
  {
    q: "Will claiming one benefit reduce another?",
    a: "Sometimes. New Style JSA, New Style ESA and Carer's Allowance count as income for Universal Credit and Pension Credit. PIP, Attendance Allowance and Child Benefit do not, and getting them can add extra amounts.",
  },
];

const SOURCES = [
  { label: "GOV.UK: Benefits calculators", href: "https://www.gov.uk/benefits-calculators" },
  { label: "GOV.UK: Universal Credit", href: "https://www.gov.uk/universal-credit" },
  { label: "GOV.UK: Pension Credit eligibility", href: "https://www.gov.uk/pension-credit/eligibility" },
  { label: "GOV.UK: Child Benefit", href: "https://www.gov.uk/child-benefit" },
  { label: "GOV.UK: PIP eligibility", href: "https://www.gov.uk/pip/eligibility" },
  { label: "GOV.UK: Attendance Allowance", href: "https://www.gov.uk/attendance-allowance" },
  { label: "GOV.UK: Carer's Allowance eligibility", href: "https://www.gov.uk/carers-allowance/eligibility" },
  { label: "GOV.UK: New Style ESA eligibility", href: "https://www.gov.uk/employment-support-allowance/eligibility" },
  { label: "GOV.UK: New Style JSA eligibility", href: "https://www.gov.uk/jobseekers-allowance/eligibility" },
  { label: "GOV.UK: Housing Benefit", href: "https://www.gov.uk/housing-benefit" },
  { label: "GOV.UK: Council Tax Reduction", href: "https://www.gov.uk/apply-council-tax-reduction" },
  { label: "GOV.UK: Healthy Start", href: "https://www.gov.uk/healthy-start" },
  { label: "GOV.UK: Sure Start Maternity Grant", href: "https://www.gov.uk/sure-start-maternity-grant" },
  { label: "GOV.UK: Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK: Warm Home Discount", href: "https://www.gov.uk/the-warm-home-discount-scheme" },
  { label: "GOV.UK: Winter Fuel Payment eligibility", href: "https://www.gov.uk/winter-fuel-payment/eligibility" },
  { label: "Home Office: Public funds (what counts, and contributory benefits that do not)", href: "https://www.gov.uk/government/publications/public-funds--2/public-funds" },
  { label: "Turn2us benefits calculator", href: "https://benefits-calculator.turn2us.org.uk/" },
];

// Every figure below comes from the engines at build time, so it moves with the rates.
const m = (n: number) => gbp(n, true);
// A worked example: a lone parent of two (youngest aged 1), renting privately for £900 a month, taking home £1,200, with £2,000 saved.
const EX_IN: EligibilityInput = {
  pensionAge: false,
  over80: false,
  couple: false,
  over25: true,
  children: 2,
  youngest: 1,
  pregnant: false,
  tenure: "private",
  rent: 900,
  earnings: 1_200,
  otherIncome: 0,
  savings: 2_000,
  disability: "none",
  carer: false,
  workedRecently: true,
  childcare: 0,
  highestIncome: 18_000,
};
const EX = checkEligibility(EX_IN);
const EX_LIKELY = EX.items.filter((h) => h.status === "likely");
const EX_CHECK = EX.items.filter((h) => h.status === "check");
const CB_TWO = ((CHILD_BENEFIT_2026_27.firstChildWeekly + CHILD_BENEFIT_2026_27.additionalChildWeekly) * 52) / 12;
const WA = UC_2026.workAllowance;

function Notes() {
  return (
    <>
      <h2>How the check works</h2>
      <p>
        Your answers go through the same rules as the calculators on this site: the <Link href="/uk/benefits/universal-credit">Universal Credit</Link>{" "}and{" "}
        <Link href="/uk/benefits/pension-credit">Pension Credit</Link>{" "}engines give a rough monthly figure, Child Benefit and the one-off payments come from their published
        rates, and anything that depends on an assessment, such as <Link href="/uk/benefits/pip-points">PIP</Link>, is listed as worth checking. Nothing you type leaves your
        browser. For a full assessment in one sitting, including council tax and your local rent limits, use the free calculators from Turn2us or entitledto, which GOV.UK
        lists.
      </p>

      <h2>Three kinds of benefit, three different tests</h2>
      <p>
        <strong>Means-tested help</strong>{" "}looks at income and savings: Universal Credit, Pension Credit, Housing Benefit and Council Tax Reduction. Universal Credit ignores
        the first {gbp(UC_2026.capital.lower)} of savings and stops at {gbp(UC_2026.capital.upper)}; Pension Credit has no upper savings limit, but counts £1 a week for every £500 over {gbp(PC_2026.capitalDisregard)}.
      </p>
      <p>
        <strong>Contributory benefits</strong>{" "}look at your National Insurance record instead. New Style JSA and New Style ESA ignore savings and a partner&rsquo;s income, so they can
        be paid when Universal Credit is not, but they count as income if you get both.
      </p>
      <p>
        <strong>Needs-based benefits</strong>{" "}ignore income and savings altogether. PIP pays from {m(PIP_2026.mobility.standard)} to{" "}
        {m(PIP_2026.daily.enhanced + PIP_2026.mobility.enhanced)} a week under State Pension age; Attendance Allowance pays {m(AA_2026.lower)} or {m(AA_2026.higher)} above it.
        Carer&rsquo;s Allowance is {m(CA_2026.weekly)} a week if you care for {CA_2026.hoursCaring} hours or more and earn {gbp(CA_2026.earningsLimit)} a week or less. Child Benefit
        is {m(CHILD_BENEFIT_2026_27.firstChildWeekly)} a week for the eldest child and {m(CHILD_BENEFIT_2026_27.additionalChildWeekly)} for each other child, whatever you earn,
        though the highest earner pays some back above {gbp(CHILD_BENEFIT_2026_27.hicbcStart)}.
      </p>

      <h2>A worked example</h2>
      <p>
        A lone parent with two children, the youngest aged 1, renting privately for {gbp(900)} a month and taking home {gbp(1_200)} from work, with {gbp(2_000)} saved. Universal
        Credit keeps the first {gbp(WA.withHousing)} of their pay (the work allowance for someone with housing costs), then takes {Math.round(UC_2026.taper * 100)}p of each pound above it, which leaves an
        estimated award of {m(EX.ucAward)} a month. Child Benefit adds about {m(CB_TWO)} a month on top, because it is not counted as income.
      </p>
      <div className="sa-tablewrap">
        <table>
          <caption className="sr-only">What the checker lists as likely for the example household</caption>
          <thead>
            <tr>
              <th scope="col">Likely for this household</th>
              <th scope="col">Estimate</th>
            </tr>
          </thead>
          <tbody>
            {EX_LIKELY.map((h) => (
              <tr key={h.key}>
                <th scope="row">{h.name}</th>
                <td>{h.monthly !== null ? `${m(h.monthly)} a month` : h.oneOff ? `${gbp(h.oneOff)} once` : "Varies"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        It also lists {EX_CHECK.map((h) => h.name).join(", ")}{" "}as worth checking. The Universal Credit figure assumes the rent is within the{" "}
        <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance</Link>{" "}for the area; if it is above, the award is lower.
      </p>

      <h2>Help that comes with a means-tested benefit</h2>
      <p>
        A Universal Credit or Pension Credit award is often the key to other help, so claiming even a small amount can be worth more than it looks. On Universal Credit with
        family take-home pay of {gbp(HEALTHY_START.ucEarningsLimit)} a month or less, pregnant women and families with children under 4 can get{" "}
        <Link href="/uk/life/healthy-start">Healthy Start</Link>{" "}payments. A first baby on a qualifying benefit can bring a {gbp(OTHER_HELP_2026.sureStart)}{" "}Sure Start
        Maternity Grant outside Scotland, and the Warm Home Discount takes {gbp(OTHER_HELP_2026.warmHome)} off the electricity bill each winter. At State Pension age, the
        Winter Fuel Payment is {gbp(OTHER_HELP_2026.winterFuel.under80)}, or {gbp(OTHER_HELP_2026.winterFuel.over80)} over 80, and is taken back through tax only if your own
        income is over {gbp(OTHER_HELP_2026.winterFuel.incomeLimit)}.
      </p>

      <h2>At State Pension age</h2>
      <p>
        Universal Credit stops and Pension Credit takes over. It tops weekly income up to {m(PC_2026.guarantee.single)} for a single person and {m(PC_2026.guarantee.couple)}{" "}
        for a couple. The full new State Pension is {m(STATE_PENSION_2026.newFull)}, just above the single guarantee, so on that alone you would not qualify, but a severe
        disability addition of {m(PC_2026.severeDisability)} or a carer addition of {m(PC_2026.carer)} can bring you back in. A couple where only one partner has reached State
        Pension age claims Universal Credit instead.
      </p>

      <h2>What the check cannot see</h2>
      <p>
        Some help is set locally and depends on a council&rsquo;s budget: working-age <Link href="/uk/benefits/council-tax-reduction">Council Tax Reduction</Link>{" "}in England, the
        Crisis and Resilience Fund (which replaced Discretionary Housing Payments in England in April 2026) and Discretionary Housing Payments in Scotland and Wales. The checker
        also cannot judge a disability assessment, an immigration condition or a National Insurance record, which is why those appear as worth checking rather than as amounts.
      </p>
    </>
  );
}

export default async function BenefitsCheckerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/pension-credit", "/uk/benefits/child-benefit", "/uk/benefits/council-tax-reduction", "/uk/benefits/pip-points", "/uk/benefits/carers-earnings"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Benefits Eligibility Checker"
      lead="Nine quick questions about your household, then a short list of the help you are likely to get and what is worth checking, strongest first."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <CheckerStudio query={query} />
    </CalcPage>
  );
}
