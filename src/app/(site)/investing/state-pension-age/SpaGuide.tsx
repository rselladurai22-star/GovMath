import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** State Pension age — the guide. Figures from src/lib/investing/retirement.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What State Pension age is" },
  { id: "timeline", title: "How it has changed" },
  { id: "to-67", title: "The rise from 66 to 67" },
  { id: "to-68", title: "The rise from 67 to 68" },
  { id: "review", title: "Could it change again?" },
  { id: "amount", title: "How much you get" },
  { id: "record", title: "Your National Insurance record" },
  { id: "gaps", title: "Filling gaps with voluntary contributions" },
  { id: "claiming", title: "Claiming and payment" },
  { id: "deferring", title: "Putting off your claim" },
  { id: "working", title: "Working past State Pension age" },
  { id: "other-ages", title: "Other ages that matter" },
  { id: "planning", title: "Planning around your date" },
  { id: "help", title: "Help if your income is low" },
  { id: "couples", title: "Couples and partners" },
  { id: "using", title: "Using the calculator" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Check your State Pension age", href: "https://www.gov.uk/state-pension-age" },
  { label: "GOV.UK — State Pension age timetables", href: "https://www.gov.uk/government/publications/state-pension-age-timetables" },
  { label: "GOV.UK — The new State Pension", href: "https://www.gov.uk/new-state-pension" },
  { label: "GOV.UK — Voluntary National Insurance", href: "https://www.gov.uk/voluntary-national-insurance-contributions" },
  { label: "GOV.UK — Delay (defer) your State Pension", href: "https://www.gov.uk/deferring-state-pension" },
];

export default function SpaGuide() {
  return (
    <Guide
      kicker="The State Pension age guide"
      title="When you can get your State Pension"
      intro={
        <>
          State Pension age is the earliest age you can get your State Pension. It is rising from 66 to 67 between 2026 and 2028, and is due to
          rise to 68 between 2044 and 2046. This guide explains the timetable, how much you could get, and how to make the most of your
          National Insurance record.
        </>
      }
      meta={["Current law", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Born before 6 April 1960: your State Pension age is 66 or lower, and you have already reached it.</li>
          <li>Born 6 April 1960 to 5 March 1961: between 66 and 1 month and 66 and 11 months.</li>
          <li>Born 6 March 1961 to 5 April 1977: 67.</li>
          <li>Born 6 April 1977 to 5 April 1978: a fixed date between 6 May 2044 and 6 March 2046.</li>
          <li>Born on or after 6 April 1978: 68, under current law.</li>
        </ul>
        <KeyStats
          items={[
            { value: "66 → 67", label: "Rising between 2026 and 2028" },
            { value: "68", label: "From 2046 under current law" },
            { value: "£241.30", label: "Full new State Pension a week" },
            { value: "35 years", label: "NI record for the full amount" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What State Pension age is">
        <p>
          State Pension age is set by law and depends only on your date of birth. It is the same for men and women. It is not a retirement
          age: you can keep working as long as you like, and you can stop earlier if you can afford to. It is simply the earliest date the
          State Pension can be paid.
        </p>
        <p>
          It also matters for other things. Some benefits for working-age people stop and pension-age benefits such as Pension Credit become
          available. In England, you also become entitled to a free bus pass.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={3} kicker="History" title="How it has changed">
        <Timeline
          items={[
            { when: "Until 2010", what: "60 for women, 65 for men", detail: "Set in 1940 for women and 1925 for men." },
            { when: "2010 to 2018", what: "Women's age rises to 65", detail: "Equalised with men under the Pensions Acts 1995 and 2011." },
            { when: "2018 to 2020", what: "Both rise to 66", detail: "Brought forward by the Pensions Act 2011." },
            { when: "2026 to 2028", what: "Rising to 67", detail: "Under the Pensions Act 2014." },
            { when: "2044 to 2046", what: "Rising to 68", detail: "Under the Pensions Act 2007, unless the law changes." },
          ]}
        />
        <p>
          The changes reflect longer life expectancy and the cost of the State Pension. The rise for women in the 2010s was controversial,
          because many women say they were not told in good time.
        </p>
      </GuideSection>

      <GuideSection id="to-67" n={4} kicker="Now" title="The rise from 66 to 67">
        <p>
          The rise to 67 started in 2026. For people born between 6 April 1960 and 5 March 1961, State Pension age goes up by a month for each
          month of birth. Each &ldquo;month&rdquo; runs from the 6th to the 5th of the next month.
        </p>
        <DataTable
          caption="Examples from the calculator"
          head={["Date of birth", "State Pension age", "Date reached"]}
          rows={[
            ["6 April 1960", "66 and 1 month", "6 May 2026"],
            ["20 August 1960", "66 and 5 months", "20 January 2027"],
            ["10 December 1960", "66 and 9 months", "10 September 2027"],
            ["5 March 1961", "66 and 11 months", "5 February 2028"],
            ["6 March 1961", "67", "6 March 2028"],
          ]}
        />
      </GuideSection>

      <GuideSection id="to-68" n={5} kicker="Later" title="The rise from 67 to 68">
        <p>
          Under the Pensions Act 2007, State Pension age rises to 68 between 2044 and 2046. People born between 6 April 1977 and 5 April 1978
          reach it on a fixed date, which moves forward two months for each month of birth.
        </p>
        <DataTable
          head={["Date of birth", "Date reached", "Age then"]}
          rows={[
            ["6 April 1977", "6 May 2044", "67 and 1 month"],
            ["10 July 1977", "6 November 2044", "67 and 3 months"],
            ["25 December 1977", "6 September 2045", "67 and 8 months"],
            ["5 April 1978", "6 March 2046", "67 and 11 months"],
            ["6 April 1978 or later", "68th birthday", "68"],
          ]}
        />
      </GuideSection>

      <GuideSection id="review" n={6} kicker="Changes" title="Could it change again?">
        <p>
          The government must review State Pension age regularly. A third review is under way. It could recommend bringing the rise to 68
          forward, as an earlier independent report suggested in 2017, or leaving the timetable alone. Any change needs a new law, and the
          government has said it will give at least 10 years&rsquo; notice of changes.
        </p>
        <Callout tone="warn" title="Younger people should plan for uncertainty">
          If you were born after 1970, it is sensible to plan for the possibility that your State Pension age could be higher than it is today.
          The calculator uses current law.
        </Callout>
      </GuideSection>

      <GuideSection id="amount" n={7} kicker="Amount" title="How much you get">
        <p>
          If you reached State Pension age on or after 6 April 2016, you get the new State Pension. The full rate is £241.30 a week in
          2026/27, or £12,547.60 a year. People who reached State Pension age before then get the basic State Pension, £184.90 a week in full,
          plus any additional pension.
        </p>
        <Figure label="New State Pension by qualifying years" caption="Weekly amount in 2026/27, with no contracted-out deduction.">
          <Bars
            items={[
              { label: "10 years", value: 68.94 },
              { label: "20 years", value: 137.89 },
              { label: "30 years", value: 206.83 },
              { label: "35 years", value: 241.3 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
        <p>
          The State Pension rises each April under the triple lock, by the highest of average earnings growth, CPI inflation or 2.5%. It is
          taxable income, but it is paid without tax taken off.
        </p>
      </GuideSection>

      <GuideSection id="record" n={8} kicker="Record" title="Your National Insurance record">
        <p>
          You need 35 qualifying years for the full new State Pension and at least 10 for any. A qualifying year is one where you paid enough
          National Insurance, or received credits.
        </p>
        <CompareCards
          columns={[
            {
              name: "You pay",
              rows: [
                { label: "Employees", value: "Earning at least £129 a week, £6,708 a year (the lower earnings limit)" },
                { label: "Self-employed", value: "Profits of at least £7,105 a year" },
              ],
            },
            {
              name: "You are credited",
              rows: [
                { label: "Parents", value: "Claiming Child Benefit for a child under 12" },
                { label: "Carers and others", value: "Carer's Allowance, Universal Credit, sickness or unemployment benefits" },
              ],
            },
          ]}
        />
        <p>
          If you were &ldquo;contracted out&rdquo; of the additional State Pension before 2016, your starting amount may be lower, and you may
          need more than 35 years to reach the full rate. Your official forecast on GOV.UK takes this into account.
        </p>
      </GuideSection>

      <GuideSection id="gaps" n={9} kicker="Top up" title="Filling gaps with voluntary contributions">
        <WorkedExample
          title="Buying one missing year in 2026/27"
          steps={[
            { label: "Class 3 voluntary contributions: £18.40 × 52 weeks", value: "£956.80" },
            { label: "Extra State Pension: £241.30 ÷ 35", value: "£6.89 a week" },
            { label: "Extra a year", value: "£358.50" },
          ]}
          total={{ label: "Time to get your money back", value: "About 2.7 years" }}
        />
        <p>
          You can usually fill gaps from the past six tax years. Before paying, check your forecast: a year only helps if you are below the full
          amount and will not reach 35 years anyway before State Pension age. The Future Pension Centre can tell you whether it is worth it.
        </p>
      </GuideSection>

      <GuideSection id="claiming" n={10} kicker="Claiming" title="Claiming and payment">
        <ul>
          <li>The State Pension is not paid automatically. You should get a letter about two months before your State Pension age.</li>
          <li>You can claim online, by phone or by post, up to four months before.</li>
          <li>It is usually paid every four weeks, in arrears, into a bank account.</li>
          <li>Your payment day depends on the last two digits of your National Insurance number.</li>
        </ul>
      </GuideSection>

      <GuideSection id="deferring" n={11} kicker="Deferring" title="Putting off your claim">
        <p>
          If you do not claim, your State Pension is deferred. Under the new State Pension, it rises by the equivalent of 1% for every 9 weeks
          you defer, which is just under 5.8% for a full year. You must defer for at least 9 weeks.
        </p>
        <DataTable
          caption="Full new State Pension, 2026/27"
          head={["Deferred for", "Extra a week", "New weekly amount"]}
          numeric={[1, 2]}
          rows={[
            ["1 year", "£13.94", "£255.24"],
            ["2 years", "£27.88", "£269.18"],
            ["5 years", "£69.71", "£311.01"],
          ]}
        />
        <p>
          The catch is that you give up the payments you would have had. It takes about 17.3 years of the higher pension to make up for what
          you missed, ignoring tax and future rises. Deferring can suit people who are still working and paying higher-rate tax, or who expect
          to live a long time.
        </p>
      </GuideSection>

      <GuideSection id="working" n={12} kicker="Work" title="Working past State Pension age">
        <p>
          You can work and get your State Pension at the same time. Once you reach State Pension age, you stop paying employee National
          Insurance on your wages, which gives a noticeable boost to take-home pay. Income tax still applies, and your State Pension counts as
          income, so it may push some of your earnings into a higher band.
        </p>
      </GuideSection>

      <GuideSection id="other-ages" n={13} kicker="Other ages" title="Other ages that matter">
        <DataTable
          head={["Age", "What happens"]}
          rows={[
            ["55 (57 from 6 April 2028)", "You can usually start taking private and workplace pensions"],
            ["60", "Free NHS prescriptions in England; free bus travel in Scotland and Wales"],
            ["State Pension age", "State Pension, Pension Credit, free bus pass in England"],
            ["Pension age", "Winter Fuel Payment, recovered through tax if your income is above £35,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="planning" n={14} kicker="Planning" title="Planning around your date">
        <p>
          If you want to stop work before State Pension age, you need other income to bridge the gap. The{" "}
          <a href="/investing/fire-calculator">FIRE calculator</a> shows how much you would need, and the{" "}
          <a href="/investing/workplace-pension">workplace pension calculator</a> shows how your pension could grow. If your income at State
          Pension age will be low, check whether you can get <a href="/benefits/pension-credit">Pension Credit</a>.
        </p>
      </GuideSection>

      <GuideSection id="help" n={15} kicker="Support" title="Help if your income is low">
        <p>
          Pension Credit tops up weekly income to £238.00 for a single person and £363.25 for a couple in 2026/27, with extra amounts for
          disability, caring and some housing costs. It is means-tested, and you can claim once you (or, for a couple, both of you) reach State
          Pension age.
        </p>
        <p>
          Pension Credit matters more than its size suggests. It unlocks help with rent and council tax, a free TV licence for people aged 75 or
          over, and Cold Weather Payments. Many people who are entitled never claim it. The{" "}
          <a href="/benefits/pension-credit">Pension Credit calculator</a> gives an estimate.
        </p>
        <Callout title="A full State Pension is just above the guarantee">
          The full new State Pension of £241.30 a week is just above the single Pension Credit guarantee of £238.00. People with a smaller
          State Pension, few savings and little other income are the most likely to qualify.
        </Callout>
      </GuideSection>

      <GuideSection id="couples" n={16} kicker="Couples" title="Couples and partners">
        <p>
          Under the new State Pension, each person builds up their own entitlement from their own National Insurance record. You cannot claim
          on a partner&rsquo;s record, as some people could under the old system. Each partner reaches State Pension age based on their own
          date of birth, so one may get their pension years before the other.
        </p>
        <p>
          That gap can matter for planning. While one partner is under State Pension age, the couple usually claims Universal Credit rather than
          Pension Credit if they need means-tested help. If you are married or in a civil partnership and your partner dies, you may be able to
          inherit some of their State Pension, depending on when you each reached State Pension age and your National Insurance records.
        </p>
      </GuideSection>

      <GuideSection id="using" n={17} kicker="How to" title="Using the calculator">
        <ol>
          <li>Enter your date of birth. The calculator shows your State Pension age, the exact date and how long until then.</li>
          <li>Under &ldquo;More options&rdquo;, enter how many qualifying years you expect to have by State Pension age. It shows your weekly amount in today&rsquo;s money.</li>
          <li>Enter a number of weeks to defer to see how much extra you would get and how long it takes to break even.</li>
          <li>Share the link to keep your result, or to check a partner&rsquo;s date.</li>
        </ol>
        <p>
          The amounts assume no contracted-out deduction. For your exact figure, use your official forecast on GOV.UK, which reads your real
          National Insurance record.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Assuming it starts automatically.</strong> You need to claim. If you do nothing, it is deferred.</li>
          <li><strong>Confusing State Pension age with pension access age.</strong> Private pensions can be taken earlier, from 55 or 57.</li>
          <li><strong>Paying for years that will not help.</strong> Check your forecast before buying voluntary contributions.</li>
          <li><strong>Forgetting about tax.</strong> The State Pension uses up most of your Personal Allowance, so other pension income is likely to be taxed.</li>
          <li><strong>Relying on today&rsquo;s timetable.</strong> If you are decades away, State Pension age could change before you reach it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={19} kicker="FAQs" title="Common questions">
        <h3>Is State Pension age different for men and women?</h3>
        <p>No. It has been the same for both since November 2018.</p>
        <h3>Can I get my State Pension early?</h3>
        <p>No. The State Pension cannot be paid before State Pension age, even in ill health. Benefits may help if you cannot work.</p>
        <h3>Does living abroad affect my State Pension?</h3>
        <p>You can claim from abroad. In some countries outside the European Economic Area, it is frozen at the rate when you first claim.</p>
        <h3>Will I get a letter?</h3>
        <p>The Department for Work and Pensions usually writes about two months before you reach State Pension age, explaining how to claim. If nothing arrives three weeks before, contact the Pension Service.</p>
        <h3>Is the State Pension taxed?</h3>
        <p>Yes, it is taxable income, but no tax is taken off it. Any tax due is usually collected through the tax code on another pension or your wages, or through Self Assessment.</p>
        <h3>Do I need to stop work to claim?</h3>
        <p>No. You can work full time and still get your State Pension in full. There is no earnings limit.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "66 → 67", label: "2026 to 2028" },
            { value: "67 → 68", label: "2044 to 2046" },
            { value: "£241.30", label: "Full new State Pension a week" },
            { value: "£184.90", label: "Full basic State Pension a week" },
            { value: "35 / 10", label: "Years for full / any new State Pension" },
            { value: "£18.40", label: "Class 3 voluntary NI a week" },
            { value: "5.8%", label: "Rise for each year deferred" },
            { value: "57", label: "Private pension age from April 2028" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
