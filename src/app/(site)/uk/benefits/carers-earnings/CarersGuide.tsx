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

/** Carer's Allowance earnings — the guide. Figures from src/lib/benefits/carers.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who can get Carer's Allowance" },
  { id: "limit", title: "The £204 earnings limit" },
  { id: "counted", title: "How earnings are counted" },
  { id: "hours", title: "How many hours you can work" },
  { id: "cliff", title: "The cliff edge" },
  { id: "pension", title: "Using pension contributions" },
  { id: "care-costs", title: "Claiming care costs" },
  { id: "varying", title: "If your pay varies" },
  { id: "self-employed", title: "Self-employed carers" },
  { id: "overlap", title: "State Pension and underlying entitlement" },
  { id: "uc", title: "Carer's Allowance and Universal Credit" },
  { id: "overpayments", title: "Avoiding overpayments" },
  { id: "carers-credit", title: "Carer's Credit if you cannot get Carer's Allowance" },
  { id: "breaks", title: "Breaks from caring" },
  { id: "other-help", title: "Other help for carers" },
  { id: "pay-rise", title: "Before you accept a pay rise" },
  { id: "two-jobs", title: "Two jobs, or work and self-employment" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Carer's Allowance", href: "https://www.gov.uk/carers-allowance" },
  { label: "GOV.UK — Carer's Allowance: eligibility", href: "https://www.gov.uk/carers-allowance/eligibility" },
  { label: "GOV.UK — Carer's Allowance: effect on other benefits", href: "https://www.gov.uk/carers-allowance/effect-on-other-benefits" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Report a change to Carer's Allowance", href: "https://www.gov.uk/carers-allowance-report-change" },
];

export default function CarersGuide() {
  return (
    <Guide
      kicker="The Carer's Allowance earnings guide"
      title="Carer's Allowance and the earnings limit in 2026/27"
      intro={
        <>
          Carer&rsquo;s Allowance pays £86.45 a week to people who care for someone for at least 35 hours a week. You can work as well, but only
          if your earnings stay at or below £204 a week after deductions. Go over by a penny and you lose the whole week&rsquo;s payment. This
          guide shows exactly how earnings are counted and how to stay within the limit.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Carer&rsquo;s Allowance is <strong>£86.45 a week</strong>, or £4,495.40 a year.
          </li>
          <li>
            You can earn up to <strong>£204 a week</strong> after tax, <a href="/uk/tax-and-salary/national-insurance">National Insurance</a>, half your pension contributions and some care costs.
          </li>
          <li>At the £12.71 <a href="/uk/tax-and-salary/minimum-wage">National Living Wage</a>, that is about 16 hours a week.</li>
          <li>There is no taper: earning over the limit loses the whole payment for that week.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£86.45", label: "Carer's Allowance a week" },
            { value: "£204", label: "Weekly earnings limit" },
            { value: "35 hours", label: "Caring a week" },
            { value: "16.05", label: "Hours a week at £12.71" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who can get Carer's Allowance">
        <ul>
          <li>You are 16 or over and care for someone for at least 35 hours a week.</li>
          <li>
            They get a qualifying benefit: <a href="/uk/benefits/attendance-allowance">Attendance Allowance</a>, the daily living part of PIP, the middle or highest care rate of Disability
            Living Allowance, Armed Forces Independence Payment, or Constant Attendance Allowance at certain rates.
          </li>
          <li>You are not in full-time education, meaning 21 hours or more of supervised study a week.</li>
          <li>Your earnings are £204 a week or less after deductions.</li>
        </ul>
        <p>
          You do not have to be related to or live with the person you care for. The 35 hours can include time spent shopping, cooking or
          doing paperwork for them, as well as personal care. In Scotland, Carer Support Payment has replaced Carer&rsquo;s Allowance, with the
          same earnings limit.
        </p>
      </GuideSection>

      <GuideSection id="limit" n={3} kicker="The rule" title="The £204 earnings limit">
        <p>
          The limit rose from £196 to £204 a week in April 2026. It is set at roughly 16 hours at the National Living Wage, so that carers can
          keep a part-time job. The test is applied week by week, to the earnings you are paid in that week, or averaged if your pay varies.
        </p>
        <DataTable
          caption="Most hours a week within the limit, 2026/27"
          head={["Hourly pay", "Most gross pay", "Most hours"]}
          numeric={[1, 2]}
          rows={[
            ["£12.71", "£204.00", "16.05"],
            ["£15.00", "£204.00", "13.60"],
            ["£20.00", "£204.00", "10.20"],
          ]}
        />
        <p>
          At these levels pay is below the tax and National Insurance thresholds, so the gross and counted earnings are the same. Above about
          £242 a week, tax and National Insurance start to be taken off first.
        </p>
      </GuideSection>

      <GuideSection id="counted" n={4} kicker="Deductions" title="How earnings are counted">
        <p>Starting with your gross pay, the Carer&rsquo;s Allowance Unit takes off:</p>
        <ul>
          <li>Income Tax;</li>
          <li>Class 1 National Insurance;</li>
          <li>half of what you pay into a pension;</li>
          <li>
            what you pay someone, other than a close relative, to look after the person you care for or a child under 16 while you work, up
            to half of your earnings after the deductions above.
          </li>
        </ul>
        <p>
          Expenses your employer repays, such as mileage, are not earnings. <a href="/uk/tax-and-salary/statutory-sick-pay">Statutory Sick Pay</a>{" "}and Statutory Maternity Pay do count. Income
          from savings, pensions or renting a room does not count towards the earnings limit at all.
        </p>
      </GuideSection>

      <GuideSection id="hours" n={5} kicker="Planning" title="How many hours you can work">
        <p>
          Divide £204 by your <a href="/uk/tax-and-salary/hourly-to-salary">hourly rate</a>{" "}to get a rough maximum. At the National Living Wage of £12.71, 16 hours a week gives £203.36,
          just under the limit. A 17th hour takes you to £216.07 and over it.
        </p>
        <Figure label="Weekly income at the National Living Wage" caption="Take-home pay plus Carer's Allowance.">
          <Bars
            items={[
              { label: "16 hours", value: 289.81 },
              { label: "17 hours", value: 216.07 },
              { label: "18 hours", value: 228.78 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="cliff" n={6} kicker="The trap" title="The cliff edge">
        <WorkedExample
          title="One extra hour at £12.71"
          steps={[
            { label: "16 hours: pay", value: "£203.36" },
            { label: "16 hours: Carer's Allowance", value: "£86.45" },
            { label: "16 hours: total", value: "£289.81" },
            { label: "17 hours: pay, over the limit", value: "£216.07" },
            { label: "17 hours: Carer's Allowance", value: "£0.00" },
          ]}
          total={{ label: "Worse off by working an extra hour", value: "£73.74" }}
        />
        <p>
          You would need to work about 24 hours a week at this rate before you were better off than at 16 hours. Universal Credit and other
          benefits work on a taper, but Carer&rsquo;s Allowance does not.
        </p>
        <Callout tone="warn" title="Large overpayments">
          The Department for Work and Pensions has recovered large sums from carers whose earnings went slightly over the limit for months. An
          independent review in 2025 led to changes in how these cases are handled, but you must still repay overpayments, so check every pay
          rise and change of hours.
        </Callout>
      </GuideSection>

      <GuideSection id="pension" n={7} kicker="A useful tool" title="Using pension contributions">
        <p>
          Because half of your pension contributions come off your earnings, paying more into a workplace pension can bring you back under the
          limit while building savings.
        </p>
        <WorkedExample
          title="17 hours at £12.71, paying 12% into a pension"
          steps={[
            { label: "Gross pay", value: "£216.07" },
            { label: "Pension contribution, 12%", value: "£25.93" },
            { label: "Half of that taken off", value: "−£12.96" },
            { label: "Earnings that count", value: "£203.11" },
          ]}
          total={{ label: "Pay plus Carer's Allowance", value: "£276.59" }}
        />
        <p>
          That is £60.52 a week more than working 17 hours without the pension, and the £25.93 goes into the pension pot, usually with a
          contribution from your employer too. Ask your employer whether you can choose a higher rate.
        </p>
      </GuideSection>

      <GuideSection id="care-costs" n={8} kicker="Care while you work" title="Claiming care costs">
        <p>
          If you pay a care worker, sitting service or childminder while you are at work, the cost can be taken off your earnings, up to half of
          what you earn after tax, National Insurance and pension.
        </p>
        <WorkedExample
          title="Earning £300 a week and paying a care worker £120"
          steps={[
            { label: "Gross pay", value: "£300.00" },
            { label: "Income Tax and National Insurance", value: "−£16.32" },
            { label: "After tax and NI", value: "£283.68" },
            { label: "Care costs allowed", note: "Up to half of £283.68", value: "−£120.00" },
            { label: "Earnings that count", value: "£163.68" },
          ]}
          total={{ label: "Carer's Allowance", value: "£86.45" }}
        />
        <p>
          The carer must not be a close relative, such as a parent, child, brother, sister or partner. Keep invoices or receipts and send them
          with your claim.
        </p>
      </GuideSection>

      <GuideSection id="varying" n={9} kicker="Irregular pay" title="If your pay varies">
        <p>
          If you work irregular hours, are on a zero-hours contract or are paid monthly, the Carer&rsquo;s Allowance Unit can average your
          earnings over a period, over a period that reflects your normal pattern of work. A single high week can then be balanced by lower
          weeks.
        </p>
        <CompareCards
          columns={[
            {
              name: "Weekly pay",
              rows: [
                { label: "Test", value: "Each week on its own" },
                { label: "Risk", value: "Overtime in one week loses that week" },
              ],
            },
            {
              name: "Monthly or varying pay",
              rows: [
                { label: "Test", value: "Converted or averaged to a weekly figure" },
                { label: "Tip", value: "Monthly pay is multiplied by 12 and divided by 52" },
              ],
            },
          ]}
        />
        <p>A one-off bonus or holiday pay can push one week over. Tell the unit about it so they can work out which week it belongs to.</p>
      </GuideSection>

      <GuideSection id="self-employed" n={10} kicker="Working for yourself" title="Self-employed carers">
        <p>
          If you are self-employed, your earnings are your profit after allowable expenses, minus Income Tax, Class 4 National Insurance and half
          of any pension contributions, averaged over a week. Keep good records and send accounts or a profit and loss statement when asked.
        </p>
      </GuideSection>

      <GuideSection id="overlap" n={11} kicker="Pensioners" title="State Pension and underlying entitlement">
        <p>
          Carer&rsquo;s Allowance is an overlapping benefit with the State Pension and some others. If your State Pension is £86.45 a week or
          more, you are not paid Carer&rsquo;s Allowance. If it is less, you get the difference.
        </p>
        <p>
          It is still worth claiming. Underlying entitlement adds a carer addition of £48.15 a week to Pension Credit and a carer premium to
          Housing Benefit and Council Tax Reduction.
        </p>
        <Timeline
          items={[
            { when: "Under State Pension age", what: "Carer's Allowance paid", detail: "Plus Class 1 National Insurance credits." },
            { when: "At State Pension age", what: "State Pension overlaps", detail: "Underlying entitlement only, if your pension is £86.45 or more." },
            { when: "If on Pension Credit", what: "Carer addition", detail: "An extra £48.15 a week." },
          ]}
        />
      </GuideSection>

      <GuideSection id="uc" n={12} kicker="Means-tested help" title="Carer's Allowance and Universal Credit">
        <p>
          Carer&rsquo;s Allowance counts as unearned income for Universal Credit and is taken off pound for pound. But caring for 35 hours a week
          adds a carer element of £209.34 a month, whether or not you get Carer&rsquo;s Allowance. Getting Carer&rsquo;s Allowance also exempts
          the household from the benefit cap, and caring for 35 hours means you are not asked to look for work.
        </p>
        <p>
          Because the £204 limit is checked separately from Universal Credit, some carers on Universal Credit are better off staying under it,
          even though their Universal Credit falls by the same amount.
        </p>
      </GuideSection>

      <GuideSection id="overpayments" n={13} kicker="Staying safe" title="Avoiding overpayments">
        <ol>
          <li>Check your payslip each time your pay or hours change.</li>
          <li>Report any change straight away online or by phone.</li>
          <li>Keep copies of what you report and when.</li>
          <li>If you are close to the limit, consider a pension contribution or fewer hours.</li>
          <li>If you are told you have been overpaid, ask how it was worked out and get advice before agreeing to repay.</li>
        </ol>
      </GuideSection>

      <GuideSection id="carers-credit" n={14} kicker="Protecting your pension" title="Carer's Credit if you cannot get Carer's Allowance">
        <p>
          If you earn too much for Carer&rsquo;s Allowance, or care for at least 20 hours a week rather than 35, you may still get Carer&rsquo;s
          Credit. It is a National Insurance credit that protects your State Pension, and there is no earnings limit.
        </p>
        <p>
          The person you care for must get a qualifying disability benefit, or a health or social care professional must confirm that they need
          the care. You need 35 qualifying years for the full new State Pension, so years spent caring can be protected.
        </p>
      </GuideSection>

      <GuideSection id="breaks" n={15} kicker="Time off" title="Breaks from caring">
        <p>
          You can keep Carer&rsquo;s Allowance during short breaks from caring, such as a holiday or when the person you care for goes into
          respite care. You can have up to 4 weeks off in any 26-week period, or up to 12 weeks if either of you is in hospital. Tell the
          Carer&rsquo;s Allowance Unit about each break.
        </p>
      </GuideSection>

      <GuideSection id="other-help" n={16} kicker="Beyond the allowance" title="Other help for carers">
        <ul>
          <li>
            <strong>A carer&rsquo;s assessment</strong> from your council, which can lead to respite care, equipment or a personal budget.
          </li>
          <li>
            <strong>Council Tax discounts</strong>, as some carers living with the person they care for are disregarded for Council Tax.
          </li>
          <li>
            <strong>Flexible working</strong>{" "}and up to one week of unpaid carer&rsquo;s leave a year from your employer, from your first day
            in the job.
          </li>
          <li>
            <strong>Grants and support</strong>{" "}from carers&rsquo; charities and local carers&rsquo; centres.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="pay-rise" n={17} kicker="Planning" title="Before you accept a pay rise">
        <p>
          The National Living Wage and the earnings limit both rise most Aprils, but not always by the same amount. A <a href="/uk/tax-and-salary/pay-rise">pay rise</a>{" "}in April, or a
          new job at a higher rate, can push the same hours over the limit.
        </p>
        <p>
          Before accepting more pay or hours, work out your new counted earnings. If you would go over, you could reduce your hours slightly,
          increase your pension contribution, or claim care costs, so that you keep both the pay rise and the allowance.
        </p>
      </GuideSection>

      <GuideSection id="two-jobs" n={18} kicker="More than one job" title="Two jobs, or work and self-employment">
        <p>
          If you have more than one job, your earnings from all of them are added together before the limit is applied. Each employer works out
          tax and National Insurance separately, so check each payslip and add up the figures. If you are employed and self-employed, your weekly
          profit is added to your earnings from the job.
        </p>
        <p>
          Two small jobs can take you over the limit even if neither does on its own. Keep a simple record of what each one pays each week, so
          you can spot a problem before it becomes an overpayment.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£86.45", label: "Carer's Allowance a week" },
            { value: "£204", label: "Earnings limit a week" },
            { value: "50%", label: "Of pension contributions deducted" },
            { value: "35 hours", label: "Caring a week" },
            { value: "21 hours", label: "Study that counts as full-time" },
            { value: "£48.15", label: "Pension Credit carer addition" },
            { value: "£209.34", label: "Universal Credit carer element a month" },
            { value: "£4,495.40", label: "Carer's Allowance a year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
