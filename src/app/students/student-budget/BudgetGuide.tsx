import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Student budget — the guide. Figures from src/lib/students/nations.ts and loans.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "income", title: "Your income for the year" },
  { id: "rent", title: "Rent: the biggest cost" },
  { id: "weekly", title: "Weekly living costs" },
  { id: "examples", title: "Worked examples" },
  { id: "timing", title: "When the money arrives" },
  { id: "job", title: "Working while you study" },
  { id: "gap", title: "If your budget does not balance" },
  { id: "saving", title: "Ways to spend less" },
  { id: "banking", title: "Student bank accounts and overdrafts" },
  { id: "council-tax", title: "Council tax and other bills" },
  { id: "help", title: "Hardship funds and help" },
  { id: "tracking", title: "Keeping on track" },
  { id: "first-week", title: "The first weeks of term" },
  { id: "shared-houses", title: "Living in a shared house" },
  { id: "nations", title: "Students from Scotland, Wales and Northern Ireland" },
  { id: "food", title: "Spending less on food" },
  { id: "travel", title: "Travel and getting home" },
  { id: "apps", title: "Tools that help" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Student finance: how you're paid", href: "https://www.gov.uk/student-finance/how-youre-paid" },
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK — Council Tax: students", href: "https://www.gov.uk/council-tax/discounts-for-full-time-students" },
  { label: "GOV.UK — Extra help for students: hardship funds", href: "https://www.gov.uk/extra-money-pay-university" },
  { label: "MoneyHelper — Budgeting at university", href: "https://www.moneyhelper.org.uk/en/everyday-money/budgeting" },
];

export default function BudgetGuide() {
  return (
    <Guide
      kicker="The student budget guide"
      title="How to budget at university"
      intro={
        <>
          Most students arrive at university with more money in their account than they have ever had, and a loan that has to last until the next
          payment months later. A simple budget is the difference between a relaxed year and a stressful one. This guide shows how to add up your
          income, plan around rent, set a weekly spending figure and close a gap if the numbers do not add up.
        </>
      }
      meta={["2026/27 figures", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Start with your income for the year: maintenance loan, grants, family help and any job.</li>
          <li>Take off rent first. It is usually the biggest cost and is often paid for 44 to 51 weeks.</li>
          <li>Divide what is left by the weeks it must last, usually 39 weeks of term, to get a weekly budget.</li>
          <li>The full loan of £10,830 away from home outside London rarely covers rent and living costs on its own.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£10,830", label: "Most maintenance loan away from home" },
            { value: "3", label: "Loan payments a year" },
            { value: "39 weeks", label: "Typical academic year" },
            { value: "£12.71", label: "Minimum wage at 21+" },
          ]}
        />
      </GuideSection>

      <GuideSection id="income" n={2} kicker="Money in" title="Your income for the year">
        <p>Add up everything you will have for the academic year:</p>
        <ul>
          <li><strong>Maintenance loan:</strong> from Student Finance England, SAAS, Student Finance Wales or Student Finance NI. See the <a href="/students/maintenance-loan">maintenance loan calculator</a>.</li>
          <li><strong>Grants and bursaries:</strong> from your university, the Welsh Learning Grant or a SAAS bursary. These are not repaid.</li>
          <li><strong>Family help:</strong> if your household income is over £25,000 in England, your loan is reduced on the assumption your parents help.</li>
          <li><strong>Earnings:</strong> from a part-time or holiday job.</li>
        </ul>
      </GuideSection>

      <GuideSection id="rent" n={3} kicker="Housing" title="Rent: the biggest cost">
        <p>
          Rent usually takes more than half of a student&rsquo;s income. The weekly price is only half the story: what matters is how many weeks you
          pay for. Halls contracts often run for 40 to 44 weeks, while private houses often run for 50 or 52, including summer.
        </p>
        <DataTable
          caption="Yearly rent at different weekly prices and contract lengths"
          head={["Weekly rent", "40 weeks", "44 weeks", "51 weeks"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£140", "£5,600", "£6,160", "£7,140"],
            ["£170", "£6,800", "£7,480", "£8,670"],
            ["£200", "£8,000", "£8,800", "£10,200"],
            ["£250", "£10,000", "£11,000", "£12,750"],
          ]}
        />
        <p>Check whether bills are included. If not, add energy, water and broadband to your weekly costs.</p>
      </GuideSection>

      <GuideSection id="weekly" n={4} kicker="Day to day" title="Weekly living costs">
        <p>
          The calculator splits weekly spending into food, travel, phone and subscriptions, going out and other costs. A starting point many
          students use is £50 for food, £15 for travel, £10 for phone and streaming, £30 for going out and £10 for everything else: £115 a week. Your
          own figures will differ; look at a month of bank statements if you have them.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Full loan, no job, rent £170 for 44 weeks, £115 a week to live on"
          steps={[
            { label: "Maintenance loan", value: "£10,830" },
            { label: "Rent: £170 × 44 weeks", value: "− £7,480" },
            { label: "Living costs: £115 × 39 weeks", value: "− £4,485" },
            { label: "Course costs", value: "− £300" },
          ]}
          total={{ label: "Shortfall for the year (£36.79 a week)", value: "− £1,435" }}
        />
        <WorkedExample
          title="The same, with a job of 10 hours a week for 30 weeks at £12.71"
          steps={[
            { label: "Earnings: 10 × £12.71 × 30", value: "+ £3,813" },
            { label: "Shortfall without the job", value: "− £1,435" },
          ]}
          total={{ label: "Left over for the year (£60.97 a week)", value: "£2,378" }}
        />
      </GuideSection>

      <GuideSection id="timing" n={6} kicker="Cash flow" title="When the money arrives">
        <Timeline
          items={[
            { when: "Start of term 1 (September or October)", what: "First loan payment", detail: "About a third of the year's loan." },
            { when: "January", what: "Second payment", detail: "Has to cover the spring term." },
            { when: "April", what: "Third payment", detail: "Often has to last until the autumn." },
          ]}
        />
        <p>
          Rent is often due in the same three instalments, so check that each loan payment covers that term&rsquo;s rent before you spend the rest. In
          Scotland, SAAS pays monthly, which makes budgeting easier.
        </p>
      </GuideSection>

      <GuideSection id="job" n={7} kicker="Earning" title="Working while you study">
        <p>
          Many universities suggest no more than 15 hours of paid work a week during term. From April 2026 the <a href="/tax-and-salary/minimum-wage">minimum wage</a>{" "}is £12.71 an hour at 21
          or over and £10.85 at 18 to 20. Ten hours a week at £12.71 over 30 weeks adds £3,813 to your year. Most students earn less than the
          £12,570 Personal Allowance, so pay no Income Tax; check your tax code is not <a href="/tax-and-salary/emergency-tax">emergency tax</a>. Earnings do not reduce your student loan.
        </p>
      </GuideSection>

      <GuideSection id="gap" n={8} kicker="Shortfalls" title="If your budget does not balance">
        <ol>
          <li>Check you are getting everything: the full loan for your household income and any university bursary.</li>
          <li>Look at rent first: a cheaper room or a shorter contract can save more than any other change.</li>
          <li>Cut the flexible weekly costs: food, going out and subscriptions.</li>
          <li>Add earnings: a holiday job can cover a gap without affecting term-time study.</li>
          <li>Talk to your university&rsquo;s money advice team before the money runs out, not after.</li>
        </ol>
      </GuideSection>

      <GuideSection id="saving" n={9} kicker="Tips" title="Ways to spend less">
        <ul>
          <li>Cook in bulk with housemates and take lunch to campus.</li>
          <li>Get a 16-25 Railcard or a student bus pass if you travel often.</li>
          <li>Use student discounts and buy second-hand textbooks; check the library first.</li>
          <li>Cancel subscriptions you do not use and share streaming plans where allowed.</li>
          <li>Pay for a TV Licence only if you watch live TV or BBC iPlayer.</li>
        </ul>
      </GuideSection>

      <GuideSection id="banking" n={10} kicker="Banking" title="Student bank accounts and overdrafts">
        <CompareCards
          columns={[
            {
              name: "Interest-free overdraft",
              rows: [
                { label: "Cost", value: "Free while you study, up to the limit" },
                { label: "Risk", value: "Must be repaid after graduating" },
              ],
            },
            {
              name: "Credit cards and buy now, pay later",
              rows: [
                { label: "Cost", value: "Interest and fees if not cleared" },
                { label: "Risk", value: "Debt can grow quickly" },
              ],
            },
          ]}
        />
        <p>An interest-free overdraft is a useful safety net, but treat it as an emergency fund, not part of your weekly budget.</p>
      </GuideSection>

      <GuideSection id="council-tax" n={11} kicker="Bills" title="Council tax and other bills">
        <p>
          A home where everyone is a full-time student does not pay council tax; you may need to send your council a student certificate. If you
          live with someone who is not a student, the household may get a discount instead. See the{" "}
          <a href="/students/student-council-tax">student council tax calculator</a>. Split energy, water and broadband fairly with housemates and
          set up a shared account or app for bills.
        </p>
      </GuideSection>

      <GuideSection id="help" n={12} kicker="Support" title="Hardship funds and help">
        <p>
          Most universities have hardship funds and short-term loans for students who run short, and extra help for care leavers, estranged
          students and students with children. Students with children may get a Childcare Grant and Parents&rsquo; Learning Allowance, and disabled
          students can get Disabled Students&rsquo; Allowance. Talk to your students&rsquo; union or student money advice service.
        </p>
      </GuideSection>

      <GuideSection id="tracking" n={13} kicker="Habits" title="Keeping on track">
        <p>
          Once you have a weekly figure, move it each week from a savings account into your current account, or use your bank&rsquo;s spending pots.
          Check your balance at the same time every week, and re-run this calculator at the start of each term with what you actually spent.
        </p>
        <Callout title="Plan for the summer">
          If your contract runs over summer, put money aside each term so the last loan payment is not the only money you have between April and
          September.
        </Callout>
      </GuideSection>

      <GuideSection id="first-week" n={14} kicker="Starting out" title="The first weeks of term">
        <p>
          The first weeks are usually the most expensive of the year. Many students buy kitchen equipment, bedding, books and a railcard, pay for freshers&rsquo;
          events and society memberships, and eat out more while they settle in. Set aside a starting fund of £200 to £400 for these one-off costs, separate
          from your weekly budget, so they do not eat into the money that has to last the term.
        </p>
      </GuideSection>

      <GuideSection id="shared-houses" n={15} kicker="Second year" title="Living in a shared house">
        <p>
          From the second year most students move into shared houses. Rent is often lower per week than halls, but bills are usually extra and contracts
          often run for 52 weeks, so you may pay summer rent for a room you do not use. Before you sign:
        </p>
        <ul>
          <li>compare the yearly cost, not the weekly price;</li>
          <li>ask what bills average, and agree how they will be split;</li>
          <li>check the deposit is protected in a government scheme;</li>
          <li>find out whether you can sublet over the summer.</li>
        </ul>
      </GuideSection>

      <GuideSection id="nations" n={16} kicker="UK nations" title="Students from Scotland, Wales and Northern Ireland">
        <p>
          Scottish students get monthly SAAS payments and a bursary of up to £2,000; Welsh students get a Learning Grant of at least £1,020 that is not
          repaid. Use the <a href="/students/saas-funding">SAAS calculator</a> or the{" "}
          <a href="/students/welsh-student-finance">Welsh student finance calculator</a> to find your income, then enter it here.
        </p>
      </GuideSection>

      <GuideSection id="food" n={17} kicker="Food" title="Spending less on food">
        <p>
          After rent, food is usually the biggest weekly cost and the easiest to cut. Plan meals for the week before you shop, cook larger batches and
          freeze portions, and buy supermarket own-brand staples. Shopping later in the day for reduced items, using loyalty schemes and splitting bulk
          buys such as rice, pasta and oil with housemates all help. Eating out and takeaways can easily double a food budget, so count them under going
          out rather than food.
        </p>
      </GuideSection>

      <GuideSection id="travel" n={18} kicker="Travel" title="Travel and getting home">
        <p>
          If your university is in a city, a student bus pass or a monthly ticket is often cheaper than paying each day. Cycling is cheaper still. For
          trips home, a 16-25 Railcard takes a third off most rail fares and pays for itself in one or two journeys; coach travel is cheaper but slower.
          Budget for travel home at the end of each term and over the holidays, as fares at busy times can be high.
        </p>
      </GuideSection>

      <GuideSection id="apps" n={19} kicker="Tools" title="Tools that help">
        <p>
          Most banking apps let you set up savings pots, round up purchases and see spending by category. Use them to keep each term&rsquo;s rent
          separate from day-to-day money. Some students set up a standing order from a savings account into their current account each week, equal to
          their weekly budget, so they cannot accidentally spend next month&rsquo;s money. If you share a house, a bill-splitting app avoids awkward
          conversations about who owes what.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Student money, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Maintenance loan away from home (most, England)", "£10,830"],
            ["Maintenance loan in London (most, England)", "£14,135"],
            ["Maintenance loan at home (most, England)", "£9,118"],
            ["Minimum wage, 21 or over", "£12.71 an hour"],
            ["Minimum wage, 18 to 20", "£10.85 an hour"],
            ["Personal Allowance", "£12,570"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
