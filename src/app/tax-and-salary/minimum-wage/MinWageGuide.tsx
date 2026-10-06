import {
  Bars,
  Callout,
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

/** Minimum wage — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "rates", title: "Rates from April 2026" },
  { id: "who", title: "Who is entitled" },
  { id: "which-rate", title: "Which rate applies to you" },
  { id: "what-counts", title: "What counts as pay" },
  { id: "working-time", title: "What counts as working time" },
  { id: "deductions", title: "Deductions and work costs" },
  { id: "accommodation", title: "Accommodation" },
  { id: "salaried", title: "Checking a salary" },
  { id: "arrears", title: "If you are underpaid" },
  { id: "history", title: "How the rates have risen" },
  { id: "pay-periods", title: "Minimum pay by week, month and year" },
  { id: "sectors", title: "Where underpayment is most common" },
  { id: "employers", title: "A checklist for employers" },
  { id: "pay-reference", title: "How HMRC checks your pay" },
  { id: "output-work", title: "Piece work and commission" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK — Calculating the minimum wage", href: "https://www.gov.uk/government/publications/calculating-the-minimum-wage" },
  { label: "GOV.UK — National Minimum Wage: accommodation", href: "https://www.gov.uk/national-minimum-wage-accommodation" },
  { label: "GOV.UK — Pay and work rights complaints", href: "https://www.gov.uk/pay-and-work-rights" },
  { label: "Acas — National Minimum Wage", href: "https://www.acas.org.uk/national-minimum-wage-entitlement" },
];

export default function MinWageGuide() {
  return (
    <Guide
      kicker="The minimum wage guide"
      title="The minimum wage, explained clearly"
      intro={
        <>
          The minimum wage is the lowest hourly rate an employer can legally pay, and it rose again in April 2026. But
          the rate on your contract is only half the story: unpaid time, deductions and accommodation charges can take
          your real pay below the legal floor. This guide explains the rules and how to check your own pay.
        </>
      }
      meta={["Rates from April 2026", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="rates" n={1} kicker="The rates" title="Rates from 1 April 2026">
        <DataTable
          caption="Minimum hourly rates"
          head={["Age or status", "From April 2025", "From April 2026", "Increase"]}
          numeric={[1, 2, 3]}
          rows={[
            ["21 and over (National Living Wage)", "£12.21", "£12.71", "4.1%"],
            ["18 to 20", "£10.00", "£10.85", "8.5%"],
            ["16 to 17", "£7.55", "£8.00", "6.0%"],
            ["Apprentice", "£7.55", "£8.00", "6.0%"],
          ]}
        />
        <Figure label="Minimum hourly rate by age, from April 2026">
          <Bars
            items={[
              { label: "21 and over", value: 12.71 },
              { label: "18 to 20", value: 10.85 },
              { label: "16 to 17", value: 8 },
              { label: "Apprentice", value: 8 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
        <p>
          The rates are recommended each year by the Low Pay Commission and normally change on 1 April. The rate for 18
          to 20 year olds rose fastest in 2026, as the government moves towards a single adult rate.
        </p>
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Entitlement" title="Who is entitled">
        <p>Almost every worker is entitled to the minimum wage, including:</p>
        <ul>
          <li>Part-time, casual and zero-hours workers.</li>
          <li>Agency workers and people working from home.</li>
          <li>Apprentices, at the apprentice rate for the first year or while under 19.</li>
          <li>Workers on probation, and those paid by the piece or by commission.</li>
        </ul>
        <p>
          It does not apply to the genuinely self-employed, company directors without a contract of employment,
          volunteers, people on some government training schemes, members of the employer&rsquo;s family who live in the
          family home and help run the business, or students on a required work placement of up to a year as part of
          their course.
        </p>
      </GuideSection>

      <GuideSection id="which-rate" n={3} kicker="Your rate" title="Which rate applies to you">
        <p>
          Your rate depends on your age on the first day of the pay period. If you turn 21 part-way through a month, the
          higher rate applies from the start of your next pay period.
        </p>
        <p>
          The <strong>apprentice rate</strong> applies if you are under 19, or 19 or over and in the first year of your
          apprenticeship. Once you are 19 or over and have finished your first year, you are entitled to the rate for
          your age. Many apprentices are underpaid because this switch is missed.
        </p>
      </GuideSection>

      <GuideSection id="what-counts" n={4} kicker="Pay" title="What counts as pay">
        <p>For minimum wage purposes, your pay in a pay period includes:</p>
        <ul>
          <li>Basic pay, bonuses, commission and incentive payments.</li>
          <li>Accommodation provided by your employer, up to a set daily amount.</li>
        </ul>
        <p>It does not include:</p>
        <ul>
          <li>Tips, gratuities and service charges, even when paid through payroll.</li>
          <li>The premium part of overtime or shift pay: only the basic rate counts.</li>
          <li>Expenses, allowances for things like travel, and benefits in kind other than accommodation.</li>
          <li>Pay you give up through salary sacrifice.</li>
        </ul>
        <p>
          That last point catches people out. A salary sacrifice scheme for a pension, car or bike cannot reduce your pay
          for minimum wage purposes below the legal floor.
        </p>
      </GuideSection>

      <GuideSection id="working-time" n={5} kicker="Hours" title="What counts as working time">
        <p>Your pay must cover every hour you are required to work, including:</p>
        <ul>
          <li>Time spent working, training required by your employer, and waiting at work for tasks.</li>
          <li>Travel between assignments during the working day, such as for care workers.</li>
          <li>Being on call at or near your workplace when you must be available.</li>
          <li>Required tasks before or after a shift: opening up, security checks, putting on protective clothing.</li>
        </ul>
        <p>
          Your normal commute does not count, and neither do rest breaks. If you sleep at work on a sleep-in shift, only
          the time you are awake and required to work counts.
        </p>
        <WorkedExample
          title="Worked example: £13 an hour with 2.5 unpaid hours a week"
          steps={[
            { label: "Paid hours", value: "37.5" },
            { label: "Pay for the week", note: "£13 × 37.5", value: "£487.50" },
            { label: "Hours actually required", note: "37.5 + 2.5", value: "40" },
            { label: "Real rate", note: "£487.50 ÷ 40", value: "£12.19" },
          ]}
          total={{ label: "Short of the minimum each week", value: "£20.90" }}
        />
      </GuideSection>

      <GuideSection id="deductions" n={6} kicker="Deductions" title="Deductions and work costs">
        <p>
          Some deductions reduce your pay for minimum wage purposes. If your employer takes money for something connected
          with the job, or you have to buy it yourself, it counts against your pay. Examples include uniforms, tools,
          safety equipment, training courses and DBS checks you are required to pay for.
        </p>
        <p>
          Deductions that do not reduce minimum wage pay include tax and National Insurance, pension contributions you
          choose to make, union subscriptions, repayment of a loan or advance of wages, and payments for things you
          choose to buy, such as meals in a staff canteen.
        </p>
        <Callout tone="warn" title="Example">
          A worker paid exactly £12.71 an hour for 40 hours who has to pay £10 a week for their uniform is effectively
          paid £498.40 for minimum wage purposes, £10 short of the £508.40 they are owed.
        </Callout>
      </GuideSection>

      <GuideSection id="accommodation" n={7} kicker="Accommodation" title="Accommodation">
        <p>
          Accommodation is the only benefit in kind that can count towards the minimum wage. From April 2026 an employer
          can count up to <strong>£11.10 a day</strong>, or <strong>£77.70 a week</strong>, the &ldquo;accommodation
          offset&rdquo;.
        </p>
        <ul>
          <li>If accommodation is free, the employer can add up to £11.10 a day to your pay for the check.</li>
          <li>If they charge less than the offset, the charge does not reduce your pay.</li>
          <li>If they charge more, the excess is treated as a deduction and can take you below the minimum.</li>
        </ul>
        <WorkedExample
          title="Worked example: charged £100 a week for a room"
          steps={[
            { label: "Weekly charge", value: "£100.00" },
            { label: "Offset allowed", note: "7 nights × £11.10", value: "£77.70" },
          ]}
          total={{ label: "Counts as a cut in pay", value: "£22.30 a week" }}
        />
      </GuideSection>

      <GuideSection id="salaried" n={8} kicker="Salaries" title="Checking a salary">
        <p>
          Salaried workers are also covered. Divide your yearly salary by the hours you work in a year. A £24,000 salary
          for 37.5 hours a week is £24,000 ÷ 1,950 = £12.31 an hour, which is below the £12.71 National Living Wage for
          anyone aged 21 or over.
        </p>
        <p>
          The minimum salary for a 37.5-hour week at the National Living Wage is £24,784.50. At 40 hours a week it is
          £26,436.80. If you regularly work unpaid extra hours, include them: a salary that was legal for your contracted
          hours can fall below the minimum once the real hours are counted.
        </p>
      </GuideSection>

      <GuideSection id="arrears" n={9} kicker="Your rights" title="If you are underpaid">
        <Timeline
          items={[
            { when: "Step 1", what: "Check your pay and hours", detail: "Keep payslips and a note of the hours you actually work, including any unpaid time." },
            { when: "Step 2", what: "Raise it with your employer", detail: "Ask in writing for the underpayment to be corrected. Many problems are put right at this stage." },
            { when: "Step 3", what: "Get free advice", detail: "Acas offers free, confidential advice on 0300 123 1100." },
            { when: "Step 4", what: "Complain to HMRC", detail: "HMRC enforces the minimum wage. It can investigate without telling your employer who complained." },
          ]}
        />
        <p>
          Employers found to have underpaid must pay arrears at <strong>today&rsquo;s</strong> rates, if they are higher
          than the rate at the time. They can also be fined up to 200% of the arrears, up to £20,000 per worker, and
          publicly named. It is illegal to treat you badly or dismiss you for asking about the minimum wage.
        </p>
      </GuideSection>

      <GuideSection id="history" n={10} kicker="History" title="How the rates have risen">
        <DataTable
          caption="National Living Wage since 2022"
          head={["From April", "Hourly rate", "Who it covered"]}
          numeric={[1]}
          rows={[
            ["2022", "£9.50", "23 and over"],
            ["2023", "£10.42", "23 and over"],
            ["2024", "£11.44", "21 and over"],
            ["2025", "£12.21", "21 and over"],
            ["2026", "£12.71", "21 and over"],
          ]}
        />
        <p>
          The National Living Wage has risen by more than a third since 2022, and in April 2024 it was extended to
          21 and 22 year olds. The Low Pay Commission&rsquo;s remit is to keep it at two-thirds of median earnings, and to
          bring the 18 to 20 rate closer to the adult rate over time.
        </p>
      </GuideSection>

      <GuideSection id="pay-periods" n={11} kicker="Reference" title="Minimum pay by week, month and year">
        <DataTable
          caption="Minimum pay before tax from April 2026, 52 paid weeks"
          head={["Rate and hours", "A week", "A month", "A year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£12.71 × 37.5 hours", "£476.63", "£2,065.38", "£24,784.50"],
            ["£12.71 × 40 hours", "£508.40", "£2,203.07", "£26,436.80"],
            ["£10.85 × 37.5 hours", "£406.88", "£1,763.13", "£21,157.50"],
            ["£8.00 × 37.5 hours", "£300.00", "£1,300.00", "£15,600.00"],
          ]}
        />
        <p>
          If you are salaried, compare your salary with the yearly figure for the hours you actually work, including any
          regular unpaid hours.
        </p>
      </GuideSection>

      <GuideSection id="sectors" n={12} kicker="Risk areas" title="Where underpayment is most common">
        <p>HMRC&rsquo;s enforcement cases show the same problems again and again:</p>
        <ul>
          <li><strong>Social care:</strong> unpaid travel time between home visits.</li>
          <li><strong>Hospitality and retail:</strong> unpaid time before opening or after closing, and deductions for uniforms.</li>
          <li><strong>Apprentices:</strong> staying on the apprentice rate after turning 19 and finishing the first year.</li>
          <li><strong>Agricultural and seasonal work:</strong> accommodation charges above the offset.</li>
          <li><strong>Salaried staff:</strong> regular unpaid overtime that takes the real hourly rate below the minimum.</li>
        </ul>
        <p>
          Most underpayments are not deliberate, but employers are responsible for getting it right whatever the reason.
        </p>
      </GuideSection>

      <GuideSection id="employers" n={13} kicker="For employers" title="A checklist for employers">
        <ul>
          <li>Update pay from the first pay period starting on or after 1 April each year.</li>
          <li>Move workers to a new rate when they have a birthday that changes their band.</li>
          <li>Record all working time, including training, travel between jobs and required tasks before and after shifts.</li>
          <li>Do not charge for uniforms, tools or training if it takes pay below the minimum.</li>
          <li>Keep pay records for at least 6 years.</li>
        </ul>
        <Callout title="Salary sacrifice">
          Check that salary sacrifice schemes, such as for pensions or cycle-to-work, do not reduce anyone&rsquo;s pay below
          the minimum for the hours they work.
        </Callout>
      </GuideSection>

      <GuideSection id="pay-reference" n={14} kicker="The check" title="How HMRC checks your pay">
        <p>
          The minimum wage is not checked hour by hour. HMRC looks at each <strong>pay reference period</strong>: the
          period your pay covers, usually a week or a month, and never longer than a month. Your total pay for that
          period, after any deductions that reduce minimum wage pay, is divided by the hours you worked in it.
        </p>
        <p>
          That means a high-paid week cannot make up for a low-paid one in a different period, and pay for work done in
          one period must normally be paid by the end of the next. Annualised-hours salaried workers have special rules
          that allow pay to be smoothed over the year, as long as the total for the hours worked meets the minimum.
        </p>
        <p>
          When HMRC finds arrears, it uses the rate at the time of the check if that is higher than the rate when you did
          the work. So money owed from 2024 is repaid at 2026 rates, which protects workers from waiting a long time for
          what they are owed.
        </p>
      </GuideSection>

      <GuideSection id="output-work" n={15} kicker="Other pay types" title="Piece work and commission">
        <p>
          If you are paid per item or per task, your employer must either pay at least the minimum wage for every hour you
          work, or use a &ldquo;fair piece rate&rdquo;. A fair rate is set so that an average worker, working at the
          average speed, earns 120% of the minimum wage. Your employer must give you a written notice explaining the rate.
        </p>
        <p>
          Commission and bonuses count towards minimum wage pay, but only in the pay reference period they are paid. If you
          are on a low basic rate topped up with commission, a month with low sales can still be a month when you are
          underpaid, and the employer must top you up.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "£12.71", label: "National Living Wage, 21 and over" },
            { value: "£10.85", label: "18 to 20" },
            { value: "£8.00", label: "16 to 17 and apprentices" },
            { value: "£11.10", label: "Accommodation offset a day (£77.70 a week)" },
            { value: "£24,784.50", label: "Minimum salary, 37.5 hours, 21 and over" },
            { value: "0300 123 1100", label: "Acas helpline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
