import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Pension Credit — the guide. Figures from src/lib/benefits/later-life.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who can get Pension Credit" },
  { id: "guarantee", title: "Guarantee Credit" },
  { id: "additions", title: "Extra amounts" },
  { id: "income", title: "What counts as income" },
  { id: "savings", title: "Savings and capital" },
  { id: "savings-credit", title: "Savings Credit" },
  { id: "examples", title: "Worked examples" },
  { id: "passport", title: "What Pension Credit unlocks" },
  { id: "housing", title: "Rent, mortgages and service charges" },
  { id: "claiming", title: "How to claim and backdating" },
  { id: "changes", title: "Changes and reviews" },
  { id: "unclaimed", title: "Why so many people miss out" },
  { id: "couples", title: "Couples and partners" },
  { id: "abroad", title: "Going abroad" },
  { id: "care-homes", title: "Pension Credit in a care home" },
  { id: "council-tax", title: "Council Tax Reduction" },
  { id: "documents", title: "What you need to claim" },
  { id: "state-pension", title: "Old and new State Pension" },
  { id: "deferring", title: "Deferring your State Pension" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Pension Credit", href: "https://www.gov.uk/pension-credit" },
  { label: "GOV.UK — Pension Credit: what you'll get", href: "https://www.gov.uk/pension-credit/what-youll-get" },
  { label: "GOV.UK — Pension Credit: eligibility", href: "https://www.gov.uk/pension-credit/eligibility" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Pension Credit calculator", href: "https://www.gov.uk/pension-credit-calculator" },
];

export default function PcGuide() {
  return (
    <Guide
      kicker="The Pension Credit guide"
      title="Pension Credit in 2026/27"
      intro={
        <>
          Pension Credit tops up the weekly income of people over <a href="/investing/state-pension-age">State Pension age</a>{" "}who have a low income. It is worth claiming even for a small
          amount, because it unlocks help with rent, Council Tax, heating and more. Hundreds of thousands of eligible pensioners do not claim it.
          This guide explains how it is worked out, with 2026/27 rates and examples.
        </>
      }
      meta={["2026/27 rates", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Pension Credit tops your weekly income up to <strong>£238.00</strong> if you are single, or <strong>£363.25</strong> for a couple.
          </li>
          <li>The guarantee is higher if you are disabled, a carer or responsible for a child.</li>
          <li>The first £10,000 of savings is ignored, and there is no upper savings limit.</li>
          <li>Some people who reached State Pension age before April 2016 can also get Savings Credit.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£238.00", label: "Single guarantee a week" },
            { value: "£363.25", label: "Couple guarantee a week" },
            { value: "£10,000", label: "Savings ignored" },
            { value: "3 months", label: "Backdating" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who can get Pension Credit">
        <ul>
          <li>You have reached State Pension age and live in Great Britain.</li>
          <li>If you have a partner, you both must have reached State Pension age, unless you were already getting Pension Credit or <a href="/benefits/housing-benefit">Housing Benefit</a>{" "}for pensioners as a mixed-age couple before 15 May 2019.</li>
          <li>Your weekly income is below your guarantee, or you qualify for Savings Credit.</li>
        </ul>
        <p>
          A mixed-age couple, where one partner is under State Pension age, claims <a href="/benefits/universal-credit">Universal Credit</a>{" "}instead. Owning your home does not stop you
          getting Pension Credit.
        </p>
      </GuideSection>

      <GuideSection id="guarantee" n={3} kicker="The core" title="Guarantee Credit">
        <p>
          Guarantee Credit makes up the difference between your weekly income and your minimum guarantee. For a single person with a State
          Pension of £200 a week, that is £38 a week, or £1,976 a year.
        </p>
        <Figure label="Guarantee Credit a week for a single person" caption="The lower your income, the more Pension Credit pays.">
          <Bars
            items={[
              { label: "£180 income", value: 58 },
              { label: "£200 income", value: 38 },
              { label: "£220 income", value: 18 },
              { label: "£238 income", value: 0 },
            ]}
          />
        </Figure>
        <p>
          The full new State Pension of £241.30 is above the single guarantee, so most people on the full new State Pension get no Pension
          Credit unless one of the extra amounts below applies.
        </p>
      </GuideSection>

      <GuideSection id="additions" n={4} kicker="Higher guarantees" title="Extra amounts">
        <DataTable
          caption="Additions to the minimum guarantee, 2026/27"
          head={["Addition", "A week", "Who qualifies"]}
          numeric={[1]}
          rows={[
            ["Severe disability (single)", "£86.05", "Gets Attendance Allowance, PIP daily living or DLA middle or high care, lives alone, no one paid Carer's Allowance for them"],
            ["Severe disability (couple, both qualify)", "£172.10", "As above, for both partners"],
            ["Carer", "£48.15", "Entitled to Carer's Allowance, even if not paid"],
            ["Child: eldest born before 6 April 2017", "£81.07", "Each child you are responsible for"],
            ["Child: each other child", "£69.98", "Every child counts from April 2026"],
            ["Disabled child: lower", "£37.93", "Child getting DLA or PIP"],
            ["Disabled child: higher", "£118.46", "Highest DLA care, enhanced PIP daily living, or blind"],
          ]}
        />
        <p>
          The severe disability addition is the biggest. It can turn a pensioner on the full new State Pension, with no Pension Credit, into
          someone getting £82.75 a week. &ldquo;Living alone&rdquo; ignores some people, such as someone under 18 or a carer provided by a care
          organisation.
        </p>
      </GuideSection>

      <GuideSection id="income" n={5} kicker="Means test" title="What counts as income">
        <CompareCards
          columns={[
            {
              name: "Counted",
              rows: [
                { label: "Pensions", value: "State Pension, workplace and private pensions" },
                { label: "Earnings", value: "After tax, NI and half of pension contributions, less a disregard" },
                { label: "Benefits", value: "Carer's Allowance and most other taxable benefits" },
                { label: "Savings", value: "Assumed income above £10,000" },
              ],
            },
            {
              name: "Ignored",
              rows: [
                { label: "Disability", value: "Attendance Allowance, PIP and DLA" },
                { label: "Winter", value: "Winter Fuel Payment and Cold Weather Payments" },
                { label: "Family", value: "Child Benefit" },
                { label: "Housing", value: "Housing Benefit and Council Tax Reduction" },
              ],
            },
          ]}
        />
        <p>
          The earnings disregard is £5 a week for a single person and £10 for a couple, rising to £20 for carers and some disabled people. If
          you have a pension pot you have not started drawing, you may be treated as having the income it could buy.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={6} kicker="Capital" title="Savings and capital">
        <p>
          The first £10,000 of savings, investments and property other than your home is ignored. Above that, every £500 or part of £500 is
          treated as £1 a week of income. There is no upper limit, so even large savings do not stop you claiming if your income is low enough.
        </p>
        <DataTable
          caption="Assumed income from savings"
          head={["Savings", "Assumed income a week"]}
          numeric={[1]}
          rows={[
            ["£10,000 or less", "£0"],
            ["£10,500", "£1"],
            ["£12,000", "£4"],
            ["£15,000", "£10"],
            ["£20,000", "£20"],
            ["£30,000", "£40"],
          ]}
        />
        <p>
          A single person with a State Pension of £200 and savings of £14,000 has £8 a week of assumed income, so their Pension Credit is £30
          a week instead of £38.
        </p>
      </GuideSection>

      <GuideSection id="savings-credit" n={7} kicker="Older pensioners" title="Savings Credit">
        <p>
          Savings Credit rewards people who made some provision for retirement. You can only get it if you, or your partner, reached State
          Pension age before 6 April 2016. It pays 60% of your qualifying income above a threshold, up to a maximum, then takes away 40% of
          your income above the guarantee.
        </p>
        <DataTable
          caption="Savings Credit, 2026/27"
          head={["", "Single", "Couple"]}
          numeric={[1, 2]}
          rows={[
            ["Threshold a week", "£208.07", "£329.75"],
            ["Maximum a week", "£17.96", "£20.10"],
            ["Income where it stops", "£282.90", "£413.50"],
          ]}
        />
        <WorkedExample
          title="A single pensioner with income of £250 a week, reached State Pension age before 2016"
          steps={[
            { label: "60% of income above £208.07", note: "Capped at £17.96", value: "£17.96" },
            { label: "Less 40% of income above £238", note: "40% of £12", value: "−£4.80" },
          ]}
          total={{ label: "Savings Credit a week", value: "£13.16" }}
        />
      </GuideSection>

      <GuideSection id="examples" n={8} kicker="Real examples" title="Worked examples">
        <DataTable
          caption="Pension Credit for some households, 2026/27"
          head={["Household", "Guarantee", "Income", "Pension Credit a week"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Single, basic State Pension £184.90 plus £30 private pension", "£238.00", "£214.90", "£23.10"],
            ["Couple, State Pensions totalling £300", "£363.25", "£300.00", "£63.25"],
            ["Single, full new State Pension, severe disability addition", "£324.05", "£241.30", "£82.75"],
            ["Couple, £350 income, one a carer", "£411.40", "£350.00", "£61.40"],
            ["Single, £220 income, caring for a grandchild", "£307.98", "£220.00", "£87.98"],
          ]}
        />
        <p>Small weekly amounts add up: £23.10 a week is £1,201.20 a year, before counting the help it unlocks.</p>
      </GuideSection>

      <GuideSection id="passport" n={9} kicker="Passports" title="What Pension Credit unlocks">
        <ul>
          <li>Housing Benefit for all eligible rent, if you get Guarantee Credit.</li>
          <li><a href="/benefits/council-tax-reduction">Council Tax Reduction</a>, often covering the whole bill.</li>
          <li>A free TV licence if you are 75 or over.</li>
          <li>Cold Weather Payments of £25 for each very cold week.</li>
          <li>The Warm Home Discount on your electricity bill.</li>
          <li>Free NHS dental treatment, vouchers for glasses and help with travel to hospital, with Guarantee Credit.</li>
        </ul>
        <Callout tone="good" title="Worth more than the weekly amount">
          For many people the extras are worth more than the Pension Credit itself. A free TV licence alone is worth over £170 a year.
        </Callout>
      </GuideSection>

      <GuideSection id="housing" n={10} kicker="Housing" title="Rent, mortgages and service charges">
        <p>
          Rent is not paid through Pension Credit. You claim Housing Benefit from your council, and with Guarantee Credit you get the maximum,
          up to the <a href="/benefits/local-housing-allowance">Local Housing Allowance</a> if you rent privately. Homeowners can add some
          service charges and ground rent to their guarantee, and can apply for a Support for Mortgage Interest loan.
        </p>
      </GuideSection>

      <GuideSection id="claiming" n={11} kicker="Claiming" title="How to claim and backdating">
        <Timeline
          items={[
            { when: "Up to 4 months before", what: "Claim before State Pension age", detail: "So payments can start on time." },
            { when: "Claim day", what: "Apply online or by phone", detail: "Have bank details, income and savings to hand." },
            { when: "After claiming", what: "Backdating", detail: "Up to 3 months if you qualified then." },
            { when: "A few weeks later", what: "Decision", detail: "Paid every week, two weeks or four weeks." },
          ]}
        />
        <p>
          Always ask for backdating. If you qualified three months ago, that can be worth hundreds of pounds, along with the extra help
          linked to it.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={12} kicker="Staying right" title="Changes and reviews">
        <p>
          Tell the Pension Service about changes in your income, savings, who lives with you, or time abroad. Most awards are reviewed from
          time to time. Getting <a href="/benefits/attendance-allowance">Attendance Allowance</a>{" "}after you start Pension Credit can increase your award, so report that too.
        </p>
      </GuideSection>

      <GuideSection id="unclaimed" n={13} kicker="Take-up" title="Why so many people miss out">
        <p>
          Government estimates suggest around a third of households who could get Pension Credit do not claim it. Common reasons are thinking
          that owning a home or having some savings rules you out, or that the amount would be too small to bother with. Neither is true.
        </p>
        <p>
          If you are unsure, check with this calculator, the GOV.UK calculator, or a free service such as Age UK or Citizens Advice.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={14} kicker="Partners" title="Couples and partners">
        <p>
          A couple, married or living together, claims Pension Credit together and their incomes and savings are added up. Only one partner
          makes the claim. If one partner is under State Pension age, the couple usually claims Universal Credit instead until they both reach it.
        </p>
        <p>
          When a partner dies, Pension Credit is recalculated at the single rate. The single guarantee is lower, but so is the household income,
          so many widows and widowers qualify for the first time. Claim as soon as possible.
        </p>
      </GuideSection>

      <GuideSection id="abroad" n={15} kicker="Travel" title="Going abroad">
        <p>
          You can keep Pension Credit for up to 4 weeks if you go abroad temporarily, 8 weeks if the absence is because of the death of a close
          relative, or 26 weeks for medical treatment. Tell the Pension Service before you travel. If you stay away longer, payments stop.
        </p>
      </GuideSection>

      <GuideSection id="care-homes" n={16} kicker="Care" title="Pension Credit in a care home">
        <p>
          You can get Pension Credit in a care home. The council will usually count it, with your other income, when working out what you pay
          towards your care, though you keep a weekly personal expenses allowance. If you go into a care home and your partner stays at home,
          you are usually treated as single, which can increase what each of you gets.
        </p>
      </GuideSection>

      <GuideSection id="council-tax" n={17} kicker="Your bill" title="Council Tax Reduction">
        <p>
          Pensioners&rsquo; Council Tax Reduction follows national rules in England. If you get Guarantee Credit, you usually get a reduction of
          the whole bill, less any deductions for other adults living with you. With Savings Credit only, or no Pension Credit, it is worked out
          on your income and may still be worth a lot.
        </p>
      </GuideSection>

      <GuideSection id="documents" n={18} kicker="Checklist" title="What you need to claim">
        <ul>
          <li>Your <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}number, and your partner&rsquo;s.</li>
          <li>Details of your State Pension and any other pensions.</li>
          <li>Bank statements and details of savings and investments.</li>
          <li>Details of any earnings, rent, service charges or mortgage.</li>
          <li>Your bank account details for payments.</li>
        </ul>
        <p>You can claim without all of this to hand. Start the claim and provide anything missing later.</p>
      </GuideSection>

      <GuideSection id="state-pension" n={19} kicker="Your pension" title="Old and new State Pension">
        <p>
          People who reached State Pension age before 6 April 2016 get the basic State Pension, with a full rate of £184.90 a week, sometimes
          topped up by an additional State Pension. On the full basic State Pension alone, a single person is £53.10 a week below the guarantee.
          This is why many older pensioners, particularly women with gaps in their National Insurance record, qualify for Pension Credit.
        </p>
        <p>
          The full new State Pension is £241.30 a week, above the single guarantee. People who receive less than the full amount, because of
          gaps in their record or years contracted out, can still qualify.
        </p>
      </GuideSection>

      <GuideSection id="deferring" n={20} kicker="Timing" title="Deferring your State Pension">
        <p>
          If you put off claiming your State Pension, you may be treated as having it anyway when your Pension Credit is worked out. Deferring
          usually makes little sense if you would qualify for Pension Credit, because the increase you build up is counted as income later too.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£238.00", label: "Single guarantee a week" },
            { value: "£363.25", label: "Couple guarantee a week" },
            { value: "£86.05", label: "Severe disability addition" },
            { value: "£48.15", label: "Carer addition" },
            { value: "£10,000", label: "Savings ignored" },
            { value: "£1 per £500", label: "Assumed income above that" },
            { value: "£17.96", label: "Most Savings Credit, single" },
            { value: "3 months", label: "Backdating" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
