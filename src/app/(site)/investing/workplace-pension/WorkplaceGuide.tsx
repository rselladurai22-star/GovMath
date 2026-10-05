import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Workplace pension — the guide. Figures from src/lib/investing/retirement.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "auto-enrolment", title: "Who is auto-enrolled" },
  { id: "minimums", title: "The minimum contributions" },
  { id: "qualifying", title: "Qualifying earnings or full salary" },
  { id: "example", title: "A worked example" },
  { id: "salaries", title: "What different salaries pay" },
  { id: "relief", title: "How tax relief works" },
  { id: "sacrifice", title: "Salary sacrifice" },
  { id: "growth", title: "How your pot grows" },
  { id: "start", title: "Why starting early matters" },
  { id: "more", title: "Paying in more" },
  { id: "opt-out", title: "The cost of opting out" },
  { id: "charges", title: "Charges and investment choices" },
  { id: "jobs", title: "Changing jobs and old pots" },
  { id: "retirement", title: "Taking your pension" },
  { id: "enough", title: "Is the minimum enough?" },
  { id: "payslip", title: "Checking your payslip" },
  { id: "several-jobs", title: "Part-time work and several jobs" },
  { id: "breaks", title: "Career breaks" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Workplace pensions", href: "https://www.gov.uk/workplace-pensions" },
  { label: "The Pensions Regulator — Automatic enrolment earnings thresholds", href: "https://www.thepensionsregulator.gov.uk/en/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/earnings-thresholds" },
  { label: "MoneyHelper — Automatic enrolment", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/auto-enrolment" },
  { label: "GOV.UK — Tax on your private pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension" },
];

export default function WorkplaceGuide() {
  return (
    <Guide
      kicker="The workplace pension guide"
      title="How your workplace pension works"
      intro={
        <>
          Most employees are automatically enrolled into a workplace pension. You pay in, your employer pays in, and the government adds tax
          relief. This guide explains the minimum contributions, how they are worked out, how your pot could grow, and why paying a little more
          can make a big difference.
        </>
      }
      meta={["2026/27 thresholds", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You are auto-enrolled if you are 22 or over, under State Pension age, and earn over £10,000 a year.</li>
          <li>The minimum is 8% of qualifying earnings: at least 3% from your employer, and the rest from you.</li>
          <li>On £35,000, that is £191.73 a month in total, costing you £95.87 after tax relief.</li>
          <li>From age 30 to 68, that could build a pot of about £239,406 in today&rsquo;s money.</li>
        </ul>
        <KeyStats
          items={[
            { value: "8%", label: "Minimum total contribution" },
            { value: "3%", label: "Minimum from your employer" },
            { value: "£10,000", label: "Earnings trigger for auto-enrolment" },
            { value: "£6,240 to £50,270", label: "Qualifying earnings band" },
          ]}
        />
      </GuideSection>

      <GuideSection id="auto-enrolment" n={2} kicker="Rules" title="Who is auto-enrolled">
        <p>
          Your employer must put you into a workplace pension if you are aged 22 or over, under State Pension age, work in the UK, and earn more
          than £10,000 a year from that job. These thresholds are unchanged for 2026/27.
        </p>
        <CompareCards
          columns={[
            {
              name: "Earn over £10,000",
              rows: [
                { label: "Enrolment", value: "Automatic" },
                { label: "Employer pays", value: "At least 3%" },
              ],
            },
            {
              name: "Earn £6,240 to £10,000",
              rows: [
                { label: "Enrolment", value: "You can ask to join" },
                { label: "Employer pays", value: "At least 3%" },
              ],
            },
            {
              name: "Earn under £6,240",
              rows: [
                { label: "Enrolment", value: "You can ask to join" },
                { label: "Employer pays", value: "Not required to pay" },
              ],
            },
          ]}
        />
        <p>
          The Pensions (Extension of Automatic Enrolment) Act 2023 lets the government lower the age to 18 and remove the lower earnings limit,
          so contributions start from the first pound. These changes have not yet been brought in.
        </p>
      </GuideSection>

      <GuideSection id="minimums" n={3} kicker="Minimums" title="The minimum contributions">
        <DataTable
          head={["Who", "Minimum", "Notes"]}
          rows={[
            ["Employer", "3%", "Many pay more, or match what you pay"],
            ["You", "5%", "Includes 1% of basic-rate tax relief in most schemes"],
            ["Total", "8%", "Of qualifying earnings"],
          ]}
        />
        <p>
          If your employer pays more than 3%, you can pay less than 5%, as long as the total is at least 8%. Many employers offer a matching
          scheme: for example, they pay 5% if you pay 5%.
        </p>
      </GuideSection>

      <GuideSection id="qualifying" n={4} kicker="Basis" title="Qualifying earnings or full salary">
        <p>
          The legal minimum is based on <strong>qualifying earnings</strong>: your pay between £6,240 and £50,270 a year, including overtime,
          bonuses and commission. Many employers instead use your <strong>full basic salary</strong>, which means more goes in.
        </p>
        <WorkedExample
          title="£35,000 salary, 5% from you and 3% from your employer"
          steps={[
            { label: "Qualifying earnings: £35,000 − £6,240", value: "£28,760" },
            { label: "8% of qualifying earnings", value: "£2,300.80 a year" },
            { label: "8% of full salary instead", value: "£2,800 a year" },
          ]}
          total={{ label: "Pot at 68 on full salary instead", value: "£283,129" }}
        />
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 30, £35,000 salary, minimum contributions until 68"
          steps={[
            { label: "You pay: 5% of £28,760", value: "£119.83 a month" },
            { label: "Your employer pays: 3%", value: "£71.90 a month" },
            { label: "Your cost after 20% tax relief", value: "£95.87 a month" },
            { label: "Pot at 68, in today's money", value: "£239,406" },
            { label: "Tax-free lump sum (25%)", value: "£59,851" },
          ]}
          total={{ label: "Income at 4% a year from the rest of the pot", value: "About £9,576 a year" }}
        />
        <p>
          This assumes investment growth of 4% a year above inflation after charges, and pay rising 1% a year above inflation. Over the 38
          years, about £109,673 is paid in; the rest is growth.
        </p>
      </GuideSection>

      <GuideSection id="salaries" n={6} kicker="By salary" title="What different salaries pay">
        <DataTable
          caption="Minimum contributions on qualifying earnings, 2026/27"
          head={["Salary", "Qualifying earnings", "You pay a year", "Employer pays a year", "Total"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£12,000", "£5,760", "£288.00", "£172.80", "£460.80"],
            ["£25,000", "£18,760", "£938.00", "£562.80", "£1,500.80"],
            ["£35,000", "£28,760", "£1,438.00", "£862.80", "£2,300.80"],
            ["£50,270 or more", "£44,030", "£2,201.50", "£1,320.90", "£3,522.40"],
          ]}
        />
        <p>
          Above £50,270, the legal minimum stops rising. Higher earners on the minimum may be saving a much smaller share of their pay than
          they realise.
        </p>
      </GuideSection>

      <GuideSection id="relief" n={7} kicker="Tax" title="How tax relief works">
        <CompareCards
          columns={[
            {
              name: "Relief at source",
              rows: [
                { label: "How", value: "You pay from take-home pay; the scheme claims 20% from HMRC" },
                { label: "Higher rate", value: "Claim the extra through Self Assessment or HMRC" },
                { label: "Non-taxpayers", value: "Still get 20% relief" },
              ],
            },
            {
              name: "Net pay",
              rows: [
                { label: "How", value: "Taken from pay before income tax" },
                { label: "Higher rate", value: "Full relief automatically" },
                { label: "Non-taxpayers", value: "No relief through payroll" },
              ],
            },
          ]}
        />
        <p>
          Either way, the effect for a basic-rate taxpayer is the same: £100 in your pension costs you £80. The{" "}
          <a href="/investing/pension-tax-relief">pension tax relief calculator</a> works out your relief at any income.
        </p>
      </GuideSection>

      <GuideSection id="sacrifice" n={8} kicker="NI" title="Salary sacrifice">
        <p>
          With salary sacrifice, you give up part of your salary and your employer pays it into your pension instead. You save income tax and
          employee National Insurance (8% for most people), and many employers pass on some of their own 15% National Insurance saving too.
        </p>
        <p>
          On the £1,438 a year in the example, the National Insurance saving is about £115.04 a year for you. From April 2029, the government
          plans to charge National Insurance on salary-sacrificed pension contributions above £2,000 a year. A lower salary can affect
          mortgage applications, statutory pay and some benefits, so check before you agree.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={9} kicker="Growth" title="How your pot grows">
        <Figure label="Pot at 68 by growth rate" caption="Age 30, £35,000, minimum contributions, in today's money.">
          <Bars
            items={[
              { label: "3% real", value: 194207 },
              { label: "4% real", value: 239406 },
              { label: "5% real", value: 297634 },
            ]}
          />
        </Figure>
        <p>
          Growth makes a big difference over decades, but it is not guaranteed. Most schemes put you in a default fund that invests mainly in
          shares while you are young and moves towards lower-risk investments as you near retirement.
        </p>
      </GuideSection>

      <GuideSection id="start" n={10} kicker="Time" title="Why starting early matters">
        <DataTable
          caption="Pot at 68 on £35,000 with minimum contributions, by starting age"
          head={["Start at", "Pot at 68"]}
          numeric={[1]}
          rows={[
            ["22", "£360,690"],
            ["30", "£239,406"],
            ["40", "£134,011"],
            ["50", "£65,810"],
          ]}
        />
        <p>Money paid in during your twenties has the longest to grow, so it often ends up worth more than money paid in later.</p>
      </GuideSection>

      <GuideSection id="more" n={11} kicker="Boost" title="Paying in more">
        <p>
          Raising your own contribution by a small amount can add a lot by retirement. In the example, going from 5% to 6% raises the pot from
          £239,406 to £269,332. Going to 8% raises it to £329,183.
        </p>
        <Callout title="Get the full employer match">
          If your employer matches extra contributions, paying enough to get the full match is like an instant return on your money. Ask your
          HR or payroll team what is on offer.
        </Callout>
      </GuideSection>

      <GuideSection id="opt-out" n={12} kicker="Opting out" title="The cost of opting out">
        <p>
          You can opt out within a month of being enrolled and get your contributions back. But you lose your employer&rsquo;s contributions
          and the tax relief, and your employer will re-enrol you about every three years. In the example, opting out gives up a pot of about
          £239,406, of which your own money is only part.
        </p>
      </GuideSection>

      <GuideSection id="charges" n={13} kicker="Costs" title="Charges and investment choices">
        <p>
          Default funds in auto-enrolment schemes have charges capped at 0.75% a year. A difference of 1% a year in growth, whether from charges
          or returns, makes a gap of £45,199 in the example. Check what your fund charges, and whether you have a choice of funds that suit your
          attitude to risk.
        </p>
      </GuideSection>

      <GuideSection id="jobs" n={14} kicker="Moving" title="Changing jobs and old pots">
        <ul>
          <li>Your pension stays yours when you change jobs. Contributions stop, but the pot stays invested.</li>
          <li>You can usually transfer old pots into one scheme. Check for exit fees and valuable guarantees first.</li>
          <li>The Pension Tracing Service helps you find lost pensions from old employers.</li>
        </ul>
      </GuideSection>

      <GuideSection id="retirement" n={15} kicker="Retirement" title="Taking your pension">
        <Timeline
          items={[
            { when: "55, or 57 from April 2028", what: "Earliest age to take your pension", detail: "Unless you are seriously ill." },
            { when: "At retirement", what: "Up to 25% tax-free", detail: "Up to a total of £268,275 for most people." },
            { when: "Then", what: "The rest is taxed as income", detail: "Through drawdown, an annuity, or lump sums." },
            { when: "From April 2027", what: "Inheritance tax", detail: "Unused pensions will count towards the estate for inheritance tax." },
          ]}
        />
      </GuideSection>

      <GuideSection id="enough" n={16} kicker="Targets" title="Is the minimum enough?">
        <p>
          For many people, minimum contributions alone will not give the retirement income they expect. In the example, the pot could provide
          about £9,576 a year at a 4% withdrawal rate. Added to the full new State Pension of £12,547.60, that is about £22,100 a year before
          tax, in today&rsquo;s money, compared with a salary of £35,000.
        </p>
        <p>
          A common rule of thumb is to aim for a total contribution, from you and your employer together, of around half your age when you
          start saving, as a percentage of your pay. Starting at 30, that suggests about 15%. It is only a rough guide, but it shows why many
          people pay in more than the minimum, especially if they started late or want to retire before State Pension age.
        </p>
        <p>
          The <a href="/investing/fire-calculator">FIRE calculator</a> works backwards from the income you want, and the{" "}
          <a href="/investing/state-pension-age">State Pension age calculator</a> shows when your State Pension starts.
        </p>
      </GuideSection>

      <GuideSection id="payslip" n={17} kicker="Checking" title="Checking your payslip">
        <p>
          Your payslip should show your pension contribution each pay period. If your scheme uses relief at source, the amount taken from your
          pay is 80% of your contribution, and the scheme adds the other 20% later. In the example, £95.87 comes out of your pay each month,
          the scheme claims £23.96 in tax relief, and your employer adds £71.90.
        </p>
        <p>
          Your pension provider sends a yearly statement showing what has gone in and your pot&rsquo;s value. Most providers also have an
          online account or app. If contributions are missing or late, raise it with your employer first; The Pensions Regulator can step in if
          an employer does not pay.
        </p>
      </GuideSection>

      <GuideSection id="several-jobs" n={18} kicker="Work patterns" title="Part-time work and several jobs">
        <p>
          Auto-enrolment is tested job by job. If you have two jobs paying £8,000 each, you will not be enrolled in either, even though you
          earn £16,000 in total. You can still ask to join each scheme, and your employers must pay in if you earn more than £6,240 from them.
        </p>
        <p>
          The qualifying earnings band is also applied to each job separately, so the first £6,240 from each employer does not count. This
          leaves people with several part-time jobs saving less than someone earning the same from one job.
        </p>
      </GuideSection>

      <GuideSection id="breaks" n={19} kicker="Life events" title="Career breaks">
        <p>
          During statutory maternity, paternity, adoption or shared parental pay, your employer must keep paying contributions based on your
          normal pay, while yours are based on what you actually receive. On a longer unpaid break, contributions usually stop, but your pot
          stays invested.
        </p>
        <p>
          Gaps add up over a career. If you can, consider paying a little extra before or after a break, or ask a partner whether they can
          contribute to a pension for you. Anyone can pay up to £2,880 a year into a pension for someone without earnings, and get basic-rate
          relief added to make £3,600.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Opting out to save money.</strong> You lose free money from your employer and the government.</li>
          <li><strong>Missing out on a higher match.</strong> Check whether your employer pays more if you do.</li>
          <li><strong>Not claiming higher-rate relief.</strong> In a relief-at-source scheme, higher-rate taxpayers must claim the extra.</li>
          <li><strong>Losing track of old pots.</strong> Keep a list of every scheme and update your address when you move.</li>
          <li><strong>Never checking your fund.</strong> The default fund may not suit you, and charges vary.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={21} kicker="FAQs" title="Common questions">
        <h3>Do I have to be in a workplace pension?</h3>
        <p>No, you can opt out, but you lose your employer&rsquo;s contributions and the tax relief.</p>
        <h3>Can I pay in more than the minimum?</h3>
        <p>Yes, up to the annual allowance of £60,000 a year, including employer contributions, limited to your earnings for tax relief.</p>
        <h3>What if I am self-employed?</h3>
        <p>You are not auto-enrolled. You can set up a personal pension or SIPP and get the same tax relief.</p>
        <h3>Can my employer pay less than 3%?</h3>
        <p>No, not on qualifying earnings. If your employer uses a different basis, such as basic pay, it must still meet one of the legal tests that give at least the same overall result.</p>
        <h3>What happens to my pension if I die?</h3>
        <p>It can usually be passed to the people you nominate. Fill in an expression of wish form with your provider and keep it up to date. From April 2027, unused pensions count towards your estate for inheritance tax.</p>
        <h3>Is my pension safe if my employer goes bust?</h3>
        <p>Your pot is held by the pension provider, separately from your employer, so it is not lost if your employer fails. Contributions owed but not paid may be recoverable.</p>
        <h3>Do the thresholds change each year?</h3>
        <p>The government reviews them each year. For 2026/27 they are unchanged: £10,000 to be enrolled, and qualifying earnings from £6,240 to £50,270.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£10,000", label: "Auto-enrolment trigger" },
            { value: "£6,240", label: "Lower qualifying earnings limit" },
            { value: "£50,270", label: "Upper qualifying earnings limit" },
            { value: "8% / 3%", label: "Minimum total / employer" },
            { value: "22", label: "Minimum age for auto-enrolment" },
            { value: "0.75%", label: "Charge cap on default funds" },
            { value: "£60,000", label: "Annual allowance" },
            { value: "57", label: "Pension access age from April 2028" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
