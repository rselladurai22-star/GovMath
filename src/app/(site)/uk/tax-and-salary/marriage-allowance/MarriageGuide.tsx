import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Marriage Allowance — the guide. Figures from src/lib/tax/pay-and-perks.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What Marriage Allowance is" },
  { id: "who", title: "Who can claim" },
  { id: "examples", title: "Worked examples" },
  { id: "lower-earner", title: "When the lower earner has some income" },
  { id: "small-tax", title: "When the higher earner pays little tax" },
  { id: "backdating", title: "Backdating up to four years" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "pensioners", title: "Pensioners and savings income" },
  { id: "how", title: "How to claim" },
  { id: "tax-code", title: "How it shows in your tax code" },
  { id: "changes", title: "When to cancel or update" },
  { id: "death", title: "If your partner dies" },
  { id: "mca", title: "Married Couple's Allowance" },
  { id: "scams", title: "Avoiding claim firms" },
  { id: "who-applies", title: "Which partner applies" },
  { id: "self-assessment", title: "If either of you fills in a tax return" },
  { id: "benefits", title: "Marriage Allowance and benefits" },
  { id: "common-cases", title: "Common situations where couples qualify" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "tax-year", title: "Which tax year your claim covers" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" },
  { label: "GOV.UK — Marriage Allowance: eligibility", href: "https://www.gov.uk/marriage-allowance/eligibility" },
  { label: "GOV.UK — Married Couple's Allowance", href: "https://www.gov.uk/married-couples-allowance" },
  { label: "HMRC — PAYE Manual: Marriage Allowance", href: "https://www.gov.uk/hmrc-internal-manuals/paye-manual/paye13112" },
];

export default function MarriageGuide() {
  return (
    <Guide
      kicker="The Marriage Allowance guide"
      title="Marriage Allowance: £252 a year, and up to £1,260 backdated"
      intro={
        <>
          If you are married or in a civil partnership and one of you earns less than the Personal Allowance, you can transfer part of the unused
          allowance to the other. It is one of the simplest tax reliefs to claim, yet many eligible couples never do. This guide explains who
          qualifies, how much it is worth in 2026/27, how far back you can claim and the situations where it is worth less than you might think.
        </>
      }
      meta={["2026/27 tax year", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The lower earner transfers <strong>£1,260</strong> of their Personal Allowance to their spouse or civil partner.</li>
          <li>That cuts the higher earner&rsquo;s tax by up to <strong>£252</strong> a year.</li>
          <li>You can backdate to 2022/23, so a new claim can be worth up to <strong>£1,260</strong>.</li>
          <li>The lower earner must have income under £12,570, and the higher earner must be a basic-rate taxpayer.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£1,260", label: "Allowance transferred" },
            { value: "£252", label: "Tax saved a year" },
            { value: "£1,260", label: "With four years backdated" },
            { value: "£12,570", label: "Lower earner's income limit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What Marriage Allowance is">
        <p>
          Everyone has a Personal Allowance of £12,570, the income they can have before paying Income Tax. If one partner does not use it all, they can
          transfer 10% of the allowance, £1,260, to the other. The receiving partner then gets a tax reduction of 20% of £1,260, which is £252. The
          lower earner&rsquo;s own allowance falls to £11,310, which costs them nothing if their income is below that.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Eligibility" title="Who can claim">
        <ul>
          <li>You are married or in a civil partnership; living together is not enough.</li>
          <li>The lower earner&rsquo;s income is £12,570 or less (usually they pay no Income Tax).</li>
          <li>The higher earner pays tax at the basic rate: income between £12,571 and £50,270, or up to £43,662 in Scotland.</li>
          <li>Both of you were born on or after 6 April 1935.</li>
        </ul>
        <p>You can claim if you live abroad, as long as you get a UK Personal Allowance.</p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Lower earner £8,000, higher earner £30,000"
          steps={[
            { label: "Higher earner's tax cut", value: "£252" },
            { label: "Lower earner's extra tax (income under £11,310)", value: "£0" },
            { label: "Four earlier years backdated", value: "£1,008" },
          ]}
          total={{ label: "Total from a new claim", value: "£1,260" }}
        />
        <WorkedExample
          title="Lower earner £12,000, higher earner £30,000"
          steps={[
            { label: "Higher earner's tax cut", value: "£252" },
            { label: "Lower earner's allowance falls to £11,310: tax on £690 at 20%", value: "− £138" },
          ]}
          total={{ label: "Household gain a year", value: "£114" }}
        />
      </GuideSection>

      <GuideSection id="lower-earner" n={5} kicker="Partial gains" title="When the lower earner has some income">
        <p>
          The transfer reduces the lower earner&rsquo;s allowance to £11,310. If their income is above that, they start paying tax on the difference.
          At £12,000 they pay £138 more, and at £12,570 they pay £252 more, cancelling the gain completely. So Marriage Allowance is worth most when the
          lower earner&rsquo;s income is under £11,310, such as someone on maternity leave, studying, caring, or retired with a small pension.
        </p>
      </GuideSection>

      <GuideSection id="small-tax" n={6} kicker="Limits" title="When the higher earner pays little tax">
        <p>
          The saving is a reduction in tax, so it cannot be more than the tax the higher earner pays. If they earn £13,000, they pay only £86 of Income
          Tax, so that is all Marriage Allowance can save. The calculator caps the saving at the higher earner&rsquo;s tax.
        </p>
      </GuideSection>

      <GuideSection id="backdating" n={7} kicker="Earlier years" title="Backdating up to four years">
        <p>
          You can claim for any earlier tax year since 5 April 2022 in which you were eligible. Each of 2022/23, 2023/24, 2024/25 and 2025/26 is worth
          up to £252, because the allowance and the transfer have been the same since 2021. HMRC pays backdated amounts as a cheque or bank transfer to
          the higher earner. The 2022/23 year can only be claimed until 5 April 2027.
        </p>
        <Callout title="Eligible years only">
          The calculator assumes your incomes were the same in each earlier year. If one of you earned more in a past year, that year may not qualify.
        </Callout>
      </GuideSection>

      <GuideSection id="scotland" n={8} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish taxpayers can claim too. The higher earner must not pay more than the intermediate rate of 21%, so their income must be £43,662 or
          less. The tax reduction is still £252. A lower earner in Scotland whose income is above £11,310 pays the extra tax at the 19% starter rate.
        </p>
      </GuideSection>

      <GuideSection id="pensioners" n={9} kicker="Pensioners" title="Pensioners and savings income">
        <p>
          Many retired couples qualify: for example, one partner on the full new State Pension (£12,547.60 in 2026/27) and the other with a smaller
          pension. Be careful when the lower earner&rsquo;s income is close to the limit, as the State Pension alone almost uses the whole allowance. Savings
          interest covered by the starting rate or <a href="/uk/investing/personal-savings-allowance">Personal Savings Allowance</a>{" "}still counts as income for the £12,570 test.
        </p>
      </GuideSection>

      <GuideSection id="how" n={10} kicker="Process" title="How to claim">
        <Timeline
          items={[
            { when: "Online, about 10 minutes", what: "The lower earner applies on GOV.UK", detail: "You need both National Insurance numbers and ID such as a P60 or passport." },
            { when: "Within weeks", what: "Tax codes change", detail: "The higher earner's code gains 126 points; the lower earner's falls." },
            { when: "Later", what: "Backdated payments", detail: "HMRC sends a cheque or pays into the higher earner's bank account." },
          ]}
        />
      </GuideSection>

      <GuideSection id="tax-code" n={11} kicker="Payslips" title="How it shows in your tax code">
        <p>
          The higher earner&rsquo;s <a href="/uk/tax-and-salary/tax-code-decoder">tax code</a>{" "}ends in M, such as 1383M, and the lower earner&rsquo;s ends in N, such as 1131N. If either of you
          completes Self Assessment, the allowance is applied in your tax calculation instead.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={12} kicker="Changes" title="When to cancel or update">
        <CompareCards
          columns={[
            {
              name: "Cancel if",
              rows: [
                { label: "Income", value: "The lower earner's income rises above £12,570" },
                { label: "Band", value: "The higher earner becomes a higher-rate taxpayer" },
                { label: "Relationship", value: "You divorce or end the civil partnership" },
              ],
            },
            {
              name: "What happens",
              rows: [
                { label: "Usually", value: "It stops from the next tax year" },
                { label: "On divorce", value: "Backdate cancellation to the start of the year" },
                { label: "Who acts", value: "Either partner can tell HMRC" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="death" n={13} kicker="Bereavement" title="If your partner dies">
        <p>
          If your partner dies, the Marriage Allowance usually continues to the end of that tax year and then stops. Tell HMRC, which will update both
          tax codes, and check whether a backdated claim can still be made for earlier years when you were both eligible.
        </p>
      </GuideSection>

      <GuideSection id="mca" n={14} kicker="Older couples" title="Married Couple's Allowance">
        <p>
          If either of you was born before 6 April 1935, you cannot get Marriage Allowance but may get Married Couple&rsquo;s Allowance instead, which is
          worth more: a tax reduction of over £1,000 a year for most couples who qualify. It is claimed through your tax return or by contacting HMRC.
        </p>
      </GuideSection>

      <GuideSection id="scams" n={15} kicker="Safety" title="Avoiding claim firms">
        <p>
          Some firms offer to claim Marriage Allowance for you and keep a large share of any refund. Claiming directly on GOV.UK is free and simple. Be
          wary of texts or emails offering a tax refund: HMRC does not contact people about refunds that way.
        </p>
      </GuideSection>

      <GuideSection id="who-applies" n={16} kicker="Applying" title="Which partner applies">
        <p>
          The partner with the lower income makes the application, because they are giving away part of their allowance. The higher earner does not
          need to do anything, but both of you need your National Insurance numbers to hand. If the lower earner cannot use the online service, for
          example because they do not have the ID needed to create a Government Gateway account, they can apply by phone to HMRC. If one of you has a
          power of attorney for the other, the attorney can apply on their behalf. Once accepted, HMRC writes to both of you to confirm, and adjusts
          both tax codes from the next payday where possible.
        </p>
      </GuideSection>

      <GuideSection id="self-assessment" n={17} kicker="Self Assessment" title="If either of you fills in a tax return">
        <p>
          If the higher earner completes a Self Assessment return, the tax reduction is applied in their return rather than through PAYE, so any refund
          appears when the return is processed. If the lower earner files a return, for example because they have a small self-employment income, the
          return shows their reduced allowance of £11,310. Make sure the incomes on your returns are below the limits for every year you claim: if the
          lower earner turns out to have had income over £12,570 in a year, HMRC will take the Marriage Allowance back for that year.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={18} kicker="Benefits" title="Marriage Allowance and benefits">
        <p>
          Universal Credit and most other means-tested benefits look at <a href="/uk/tax-and-salary/salary-calculator">take-home pay</a>{" "}after tax, so the higher earner&rsquo;s lower tax bill slightly increases
          the household&rsquo;s earnings for Universal Credit. For most couples the effect is small: Universal Credit falls by 55p for each pound of extra
          take-home, so £252 of tax saved might reduce Universal Credit by about £139 a year. You are still better off claiming, but the gain is less than
          £252. Marriage Allowance does not affect Child Benefit, the State Pension or <a href="/uk/benefits/pension-credit">Pension Credit</a>{" "}directly.
        </p>
      </GuideSection>

      <GuideSection id="common-cases" n={19} kicker="Examples" title="Common situations where couples qualify">
        <ul>
          <li><strong>One partner at home with young children</strong>, with little or no income of their own.</li>
          <li><strong>One partner studying</strong> full time, with no more than a small part-time income.</li>
          <li><strong>One partner on maternity or <a href="/uk/benefits/shared-parental-leave">shared parental leave</a></strong> for most of the tax year, if their total income for the year stays under £12,570.</li>
          <li><strong>Retired couples</strong> where one partner has a small pension and the other a larger one, within the basic-rate band.</li>
          <li><strong>One partner caring</strong> for a relative and receiving <a href="/uk/benefits/carers-earnings">Carer&rsquo;s Allowance</a>, which is taxable but well under the allowance.</li>
        </ul>
        <p>
          In each case, check the lower earner&rsquo;s total taxable income, including any interest above their savings allowances and taxable benefits.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Thinking you need a joint income below a limit: only each partner&rsquo;s own income matters.</li>
          <li>Forgetting backdated years, which can be worth more than the current year.</li>
          <li>Leaving the claim in place after the lower earner&rsquo;s income rises above £12,570, which leads to tax being owed.</li>
          <li>Assuming couples who live together but are not married can claim: they cannot.</li>
        </ul>
      </GuideSection>

      <GuideSection id="tax-year" n={21} kicker="Timing" title="Which tax year your claim covers">
        <p>
          A claim made now covers the current tax year, 2026/27, and continues automatically into later years. Backdated years are separate: you choose which
          earlier years to include when you apply, and each is checked against your incomes for that year. If you apply near the end of a tax year, the higher
          earner may see the whole year&rsquo;s saving as a refund rather than through their tax code.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Marriage Allowance, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Allowance transferred", "£1,260"],
            ["Tax reduction", "£252 a year"],
            ["Lower earner's income limit", "£12,570"],
            ["Higher earner's income limit", "£50,270 (£43,662 in Scotland)"],
            ["Earliest year you can backdate to", "2022/23"],
            ["Most from a new claim", "£1,260"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
