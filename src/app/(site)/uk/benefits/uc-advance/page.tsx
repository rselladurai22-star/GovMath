import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import AdvanceStudio from "./AdvanceStudio";
import { ogFor } from "@/gm/og";
import { ADVANCE_2026, STANDARD_LABEL, budgetingAdvance, ucAdvance, type StandardKey } from "@/lib/benefits/uc-advance";
import { UC_2026 } from "@/lib/benefits/uc-engine";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Universal Credit Advance: How Much Can I Get?",
  description:
    "Free Universal Credit advance calculator. See how much you can borrow, your monthly repayments over up to 24 months, and the 15% deductions cap.",
  alternates: { canonical: "/uk/benefits/uc-advance" },
  openGraph: ogFor("/uk/benefits/uc-advance"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/benefits/uc-advance", label: "UC Advance Repayment Calculator" },
];

// Every figure in the text below comes from the engines, so it moves with the rates.
const m = (n: number) => gbp(n, true);
const KEYS = Object.keys(STANDARD_LABEL) as StandardKey[];
const EX = ucAdvance({ estimate: 1_125, advance: 1_125, months: 24, standard: "single25", otherDeductions: 0 });
const EX_12 = ucAdvance({ estimate: 1_125, advance: 1_125, months: 12, standard: "single25", otherDeductions: 0 });
const B = ADVANCE_2026.budgeting;
const BUDGETING = [
  { who: "Single, no children", ...budgetingAdvance(false, false, 0) },
  { who: "Couple, no children", ...budgetingAdvance(true, false, 0) },
  { who: "Single or couple with children", ...budgetingAdvance(true, true, 0) },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How quickly is a Universal Credit advance decided?",
    a: "Usually the same day. Apply through your journal, through your work coach or by phoning the Universal Credit helpline on 0800 328 5644. You will be asked why you need it, to confirm your identity and for bank details.",
  },
  {
    q: "Do I have to take the full amount?",
    a: "No. You can ask for any amount up to your first estimated payment, and only what you need is worth taking: every pound comes back out of later payments.",
  },
  {
    q: "What happens to the advance if my Universal Credit stops?",
    a: "You still owe it. If you move to another benefit the deductions usually carry on from that. If you come off benefits altogether, DWP Debt Management writes to you and you can pay the balance in one go or agree monthly payments.",
  },
  {
    q: "I am already on Universal Credit. Can I still get an advance?",
    a: `Not a new claim advance. If a change such as a new baby or a rent rise will increase your award, you can ask for a change of circumstances advance, usually repaid over 6 months. For a one-off cost such as a cooker or a deposit, ask for a budgeting advance of up to ${gbp(B.children)}.`,
  },
];

const SOURCES = [
  { label: "GOV.UK: Get an advance on your first Universal Credit payment", href: "https://www.gov.uk/universal-credit-advance-hardship-payment/first-payment" },
  { label: "GOV.UK: Get an advance for unexpected costs (Budgeting Advance)", href: "https://www.gov.uk/universal-credit-advance-hardship-payment/unexpected-costs" },
  { label: "GOV.UK: Get an advance if your circumstances have changed", href: "https://www.gov.uk/universal-credit-advance-hardship-payment/circumstances-changed" },
  { label: "DWP: Find out about money taken off your Universal Credit payment (the 15% limit)", href: "https://www.gov.uk/guidance/find-out-about-money-taken-off-your-universal-credit-payment" },
  { label: "DWP: Benefit and pension rates 2026 to 2027 (standard allowances)", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
];

function Notes() {
  return (
    <>
      <h2>It is a loan, not an extra payment</h2>
      <p>
        An advance moves money forward; it does not add any. Borrow {m(EX.advance)} and repay it over 24 months and {m(EX.monthly)} comes off every payment for two years, the first one
        included. There is no interest and no fee, so you repay exactly what you took.
      </p>
      <p>
        That makes the right amount the smallest one that gets you to your first payment: rent due before it arrives, food, travel, the electricity meter. If you are not sure what your first
        payment will be, the <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>{" "}gives an estimate. If you have paid National Insurance in the last two or three
        years, <Link href="/uk/benefits/new-style-jsa">New Style JSA</Link>{" "}is paid every two weeks and can fill some of the gap without a loan.
      </p>

      <h2>The 15% cap</h2>
      <p>
        Since April 2025, repayments of advances, overpayments and most other debts together can take no more than 15% of your standard allowance. It was 25% before. The cap is worked out on
        the standard allowance alone, not on your whole award:
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Standard allowance</th>
              <th scope="col">A month</th>
              <th scope="col">15% cap</th>
            </tr>
          </thead>
          <tbody>
            {KEYS.map((k) => (
              <tr key={k}>
                <th scope="row">{STANDARD_LABEL[k]}</th>
                <td>{m(UC_2026.standard[k])}</td>
                <td>{m(ucAdvance({ estimate: 0, advance: 0, months: 24, standard: k, otherDeductions: 0 }).cap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        So a large advance cannot be cleared quickly. {m(EX_12.advance)} over 12 months would need {m(EX_12.monthly)} a month, above the {m(EX_12.cap)} cap for a single adult; it has to run
        for at least {EX_12.minMonthsForCap} months. Deductions that stop you being evicted or cut off, and child maintenance, can go on top of the 15%.
      </p>

      <h2>If the repayments are too much</h2>
      <p>
        Ask through your journal, or by phone, for repayments to be paused. A new claim advance can be delayed for up to {ADVANCE_2026.deferMonths} months and a budgeting advance for up to{" "}
        {B.deferMonths}. You can also ask for a financial hardship decision, which lowers what is taken for a time. Neither wipes the debt.
      </p>

      <h2>Budgeting advances are different</h2>
      <p>
        A budgeting advance is for a one-off cost once you are settled on Universal Credit: a cooker, a funeral, a deposit, work clothes. It cannot be used for rent, bills or food. The least
        you can borrow is {gbp(B.min)} and the most depends on your household:
      </p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Household</th>
              <th scope="col">Most you can borrow</th>
            </tr>
          </thead>
          <tbody>
            {BUDGETING.map((b) => (
              <tr key={b.who}>
                <th scope="row">{b.who}</th>
                <td>{gbp(b.max)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        You need to have been on Universal Credit, ESA or Pension Credit for six months, unless the money is to start or keep a job. You are refused if you earned more than{" "}
        {gbp(B.earningsSingle)} in the last six months ({gbp(B.earningsCouple)} for a couple), or still owe an earlier budgeting advance. It is usually repaid over {B.months} months, inside
        the same 15% cap. If the <Link href="/uk/benefits/benefit-cap">benefit cap</Link>{" "}already cuts your award, the repayment comes off what is left.
      </p>
    </>
  );
}

export default async function UcAdvancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/universal-credit-taper", "/uk/benefits/benefits-checker", "/uk/benefits/new-style-jsa", "/uk/benefits/benefit-cap", "/uk/benefits/local-housing-allowance"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="UC Advance Repayment Calculator"
      lead="How much a Universal Credit advance takes off each payment, for how long, and whether it fits inside the 15% cap on deductions."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <AdvanceStudio query={query} />
    </CalcPage>
  );
}
