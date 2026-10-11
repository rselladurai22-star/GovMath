import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Holiday pay for irregular-hours and part-year workers: the guide. Figures from src/lib/tax/employment-rights.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who the rules cover" },
  { id: "irregular", title: "Irregular-hours workers" },
  { id: "part-year", title: "Part-year workers" },
  { id: "why-1207", title: "Where 12.07% comes from" },
  { id: "accrual", title: "Building up holiday hours" },
  { id: "rounding", title: "Rounding" },
  { id: "full-year", title: "A full year of work" },
  { id: "part-year-example", title: "A part-year example" },
  { id: "rolled-up", title: "Rolled-up holiday pay" },
  { id: "rolled-up-rules", title: "Rules for rolled-up pay" },
  { id: "which-is-better", title: "Accrual or rolled-up?" },
  { id: "holiday-pay-rate", title: "What an hour of holiday pays" },
  { id: "reference-period", title: "The 52-week reference period" },
  { id: "normal-pay", title: "Overtime and commission" },
  { id: "regular-workers", title: "Compared with regular workers" },
  { id: "sickness-family", title: "Sickness and family leave" },
  { id: "leaving", title: "Leaving a job" },
  { id: "northern-ireland", title: "Northern Ireland" },
  { id: "checks", title: "Checking your payslip" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Holiday pay and entitlement reforms from 1 January 2024", href: "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024" },
  { label: "GOV.UK: Holiday entitlement, calculate leave entitlement", href: "https://www.gov.uk/holiday-entitlement-rights/calculate-leave-entitlement" },
  { label: "GOV.UK: Holiday pay, the basics", href: "https://www.gov.uk/holiday-entitlement-rights/holiday-pay-the-basics" },
  { label: "Acas: Irregular hours and part-year workers", href: "https://www.acas.org.uk/irregular-hours-and-part-year-workers" },
  { label: "Acas: Calculating holiday pay", href: "https://www.acas.org.uk/calculating-holiday-pay" },
  { label: "legislation.gov.uk: Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023", href: "https://www.legislation.gov.uk/uksi/2023/1426/contents/made" },
  { label: "nidirect: Holiday entitlements", href: "https://www.nidirect.gov.uk/articles/holiday-entitlements" },
];

const hours = (n: number) => `${n.toLocaleString("en-GB", { maximumFractionDigits: 2 })} hours`;

export default function IrregularHolidayGuide() {
  return (
    <Guide
      kicker="The irregular hours holiday guide"
      title="Holiday pay for irregular-hours and part-year workers"
      intro={
        <>
          If your hours change from week to week, or you only work part of the year, holiday works differently from a standard job. Since April 2024 the rules in
          Great Britain are simpler: you build up 12.07% of the hours you work, and your employer can pay holiday as an extra 12.07% on each payslip. This guide
          explains both methods, the 52-week average used for holiday pay, and how to check your payslip.
        </>
      }
      meta={["Leave years from 1 April 2024", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Irregular-hours and part-year workers build up holiday at <strong>12.07%</strong> of the hours they work in each pay period.
          </li>
          <li>Work 30 hours in a week and you build up 3.62 hours of paid holiday.</li>
          <li>
            Instead, your employer can pay <strong>rolled-up holiday pay</strong>: an extra 12.07% of your pay on every payslip, shown as a separate line.
          </li>
          <li>When you take holiday, you should be paid your average pay over the last 52 weeks in which you were paid.</li>
          <li>The rules apply in England, Scotland and Wales to leave years starting on or after 1 April 2024.</li>
        </ul>
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Who" title="Who the rules cover">
        <p>
          The rules came in through the Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023. They cover two groups of workers,
          including agency workers and those on zero-hours contracts, but only where the hours are genuinely variable or the year has unpaid gaps.
        </p>
        <p>
          Everyone else, including part-time staff on a fixed pattern, keeps the standard entitlement of 5.6 weeks. If you work the same days each week, our{" "}
          <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement calculator</a>{" "}is the one to use.
        </p>
      </GuideSection>

      <GuideSection id="irregular" n={3} kicker="Definition" title="Irregular-hours workers">
        <p>
          You are an irregular-hours worker if the number of paid hours you work in each pay period is, under your contract, wholly or mostly variable. Typical
          examples:
        </p>
        <ul>
          <li>zero-hours or casual workers offered shifts as needed;</li>
          <li>bank staff in health and care;</li>
          <li>staff with a small number of fixed hours plus a large, varying amount of extra work.</li>
        </ul>
        <p>
          You are not an irregular-hours worker if you work a fixed rota, even one where the hours change week to week in a set pattern, or if you only
          occasionally work overtime.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={4} kicker="Definition" title="Part-year workers">
        <p>
          You are a part-year worker if your contract runs all year but you are only required to work for part of it, and there are periods of at least a week when
          you do not work and are not paid. Examples are term-time staff paid only in term, and seasonal workers who stay on the books between seasons.
        </p>
        <Callout title="Term-time staff paid all year">
          If your term-time salary is spread evenly over 12 months, you are paid in every week, so you are usually not a part-year worker. Check how your contract
          describes your pay.
        </Callout>
      </GuideSection>

      <GuideSection id="why-1207" n={5} kicker="The maths" title="Where 12.07% comes from">
        <p>
          Every worker is entitled to 5.6 weeks of holiday a year. Someone who works all year and takes all their holiday works 52 − 5.6 = 46.4 weeks. So for each
          week worked, they earn 5.6 ÷ 46.4 = 0.1207 of a week of holiday.
        </p>
        <p>
          That is why 12.07% of hours worked gives exactly 5.6 weeks over a full year. If your contract gives more than 5.6 weeks, your employer should use a higher
          percentage. For 6 weeks, it would be 6 ÷ 46 = 13.04%.
        </p>
      </GuideSection>

      <GuideSection id="accrual" n={6} kicker="Accrual" title="Building up holiday hours">
        <p>
          At the end of each pay period, take the hours you actually worked and multiply by 12.07%. That is the holiday you have built up for that period. It is paid
          holiday you can take later.
        </p>
        <DataTable
          caption="Holiday built up from a week’s hours, and rolled-up pay at £12.71 an hour"
          head={["Hours worked", "Holiday built up", "Rounded", "Rolled-up holiday pay"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["8", "0.97", "1", "£12.27"],
            ["10", "1.21", "1", "£15.34"],
            ["20", "2.41", "2", "£30.68"],
            ["25", "3.02", "3", "£38.35"],
            ["30", "3.62", "4", "£46.02"],
            ["40", "4.83", "5", "£61.36"],
          ]}
        />
        <p>
          Hours you did not work, such as when you are on holiday, do not build up more holiday. Overtime does: every hour actually worked counts. Your employer can
          also let you take holiday before you have built it up.
        </p>
      </GuideSection>

      <GuideSection id="rounding" n={7} kicker="Rounding" title="Rounding">
        <p>
          GOV.UK and Acas round the holiday for each pay period to the nearest hour. Part hours of under 30 minutes round down, and 30 minutes or more round up.
        </p>
        <WorkedExample
          title="GOV.UK’s example: 68 hours worked in June"
          steps={[
            { label: "Hours worked", value: "68" },
            { label: "Holiday built up", note: "68 × 12.07%", value: "8.21 hours" },
          ]}
          total={{ label: "Rounded to", value: "8 hours" }}
        />
        <p>
          On small weekly hours, rounding can make a real difference: 4 hours worked gives 0.48 hours, which rounds down to nothing. Your employer can choose to
          round up or use exact figures, and many payroll systems record holiday to two decimal places.
        </p>
      </GuideSection>

      <GuideSection id="full-year" n={8} kicker="Example" title="A full year of work">
        <WorkedExample
          title="30 hours a week for 46.4 weeks"
          steps={[
            { label: "Hours worked in the year", note: "30 × 46.4", value: hours(1392) },
            { label: "Holiday built up", note: "1,392 × 12.07%", value: hours(168.01) },
            { label: "5.6 weeks at 30 hours", note: "for comparison", value: hours(168) },
          ]}
          total={{ label: "Holiday a year", value: "About 168 hours" }}
        />
        <p>
          The two match. Someone who works all year on irregular hours ends up with the same 5.6 weeks as a regular worker; they just build it up as they go.
        </p>
      </GuideSection>

      <GuideSection id="part-year-example" n={9} kicker="Example" title="A part-year example">
        <p>
          Now take a seasonal worker who works 30 hours a week for 20 weeks and is not paid for the rest of the year.
        </p>
        <CompareCards
          columns={[
            {
              name: "Under the 2024 rules",
              rows: [
                { label: "Hours worked", value: "600" },
                { label: "Holiday", value: "12.07% of 600" },
                { label: "Holiday a year", value: "72.42 hours" },
              ],
            },
            {
              name: "Full 5.6 weeks",
              rows: [
                { label: "Weekly hours", value: "30" },
                { label: "Holiday", value: "5.6 × 30" },
                { label: "Holiday a year", value: "168 hours" },
              ],
            },
          ]}
        />
        <p>
          Before April 2024, the Supreme Court&rsquo;s Harpur Trust v Brazel decision meant part-year workers could get the full 5.6 weeks, however few weeks they
          worked. The new rules end that: holiday is now in proportion to the work you do.
        </p>
      </GuideSection>

      <GuideSection id="rolled-up" n={10} kicker="Rolled-up pay" title="Rolled-up holiday pay">
        <p>
          With rolled-up holiday pay (RHP), your employer adds 12.07% of your pay to each payslip instead of paying you when you take holiday. You still have the
          right to take time off; it is just unpaid when you take it, because you have already been paid for it.
        </p>
        <WorkedExample
          title="GOV.UK’s example: two hourly rates in a week"
          steps={[
            { label: "20 hours at £11", value: "£220.00" },
            { label: "20 hours at £12", value: "£240.00" },
            { label: "Total pay", value: "£460.00" },
          ]}
          total={{ label: "Rolled-up holiday pay at 12.07%", value: "£55.52" }}
        />
        <p>
          At the £12.71 National Living Wage, 30 hours gives £381.30 of pay and £46.02 of rolled-up holiday pay. Over 46.4 weeks that is about £2,135.46. Check
          your hourly rate is at least the legal minimum with our <a href="/uk/tax-and-salary/minimum-wage">minimum wage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="rolled-up-rules" n={11} kicker="Rules" title="Rules for rolled-up pay">
        <ul>
          <li>It is only allowed for irregular-hours and part-year workers, in leave years starting on or after 1 April 2024.</li>
          <li>It must be 12.07% of your total pay for the period, including overtime and commission, or more.</li>
          <li>It must be shown as a separate item on every payslip.</li>
          <li>It must be paid at the same time as the pay for the work it relates to.</li>
          <li>Your employer should tell you it is using RHP and may need your agreement to change your contract.</li>
          <li>Your basic pay must still be at least the National Minimum Wage, without counting the holiday pay.</li>
        </ul>
        <Callout tone="warn" title="Put some aside">
          Because your holiday is paid in advance, a week off means a week without pay. Many people move the holiday line into a separate savings account each
          payday.
        </Callout>
      </GuideSection>

      <GuideSection id="which-is-better" n={12} kicker="Comparison" title="Accrual or rolled-up?">
        <CompareCards
          columns={[
            {
              name: "Holiday hours build up",
              rows: [
                { label: "Paid", value: "When you take holiday" },
                { label: "Rate", value: "52-week average pay" },
                { label: "On leaving", value: "Untaken hours paid out" },
                { label: "Good for", value: "Steady income on holiday" },
              ],
            },
            {
              name: "Rolled-up holiday pay",
              rows: [
                { label: "Paid", value: "Every payslip, +12.07%" },
                { label: "Rate", value: "Current pay" },
                { label: "On leaving", value: "Nothing more to pay" },
                { label: "Good for", value: "Flexible, short-term work" },
              ],
            },
          ]}
        />
        <p>
          Over a full year the two come to about the same if your pay is steady. If your pay is rising, rolled-up pay tracks it straight away; if it is falling, the
          52-week average can work in your favour.
        </p>
      </GuideSection>

      <GuideSection id="holiday-pay-rate" n={13} kicker="Holiday pay" title="What an hour of holiday pays">
        <p>
          If your employer uses accrual, each hour of holiday you take should be paid at your average rate. The calculator works this out as your pay over the
          reference period divided by the hours you worked in it.
        </p>
        <WorkedExample
          title="£20,000 earned over 52 paid weeks, 1,500 hours worked"
          steps={[
            { label: "Average week’s pay", note: "£20,000 ÷ 52", value: "£384.62" },
            { label: "Average pay per hour worked", note: "£20,000 ÷ 1,500", value: "£13.33" },
            { label: "3.62 hours of holiday from a 30-hour week", note: "× £13.33", value: "£48.28" },
          ]}
          total={{ label: "A year’s holiday at this pattern", value: "About £2,240" }}
        />
      </GuideSection>

      <GuideSection id="reference-period" n={14} kicker="Reference period" title="The 52-week reference period">
        <p>Holiday pay for workers with variable pay uses an average over a reference period:</p>
        <ul>
          <li>Use the last 52 weeks in which you were <strong>paid</strong>, ending with the last complete week before the holiday.</li>
          <li>Skip weeks with no pay, and go further back to replace them.</li>
          <li>Never look back more than 104 weeks. If there are fewer than 52 paid weeks in that time, use the paid weeks there are.</li>
          <li>Weeks off sick or on maternity or other family leave are left out.</li>
        </ul>
        <p>
          So a worker with 45 paid weeks in the last 104, earning £9,000 for 700 hours, has an average week&rsquo;s pay of £200 and an average hourly rate of about
          £12.86. If you have worked for less than a week, there is no reference period and your employer should pay a fair amount.
        </p>
        <Bars
          format={(n) => "£" + n.toFixed(2)}
          items={[
            { label: "52 paid weeks: £20,000", value: 384.62 },
            { label: "45 paid weeks: £9,000", value: 200 },
          ]}
        />
      </GuideSection>

      <GuideSection id="normal-pay" n={15} kicker="Normal pay" title="Overtime and commission">
        <p>
          Of the 5.6 weeks, 4 weeks must be paid at your <strong>normal</strong> pay. That includes regular overtime, commission linked to the work you do, and
          other payments made regularly. The other 1.6 weeks can be paid at basic pay, which leaves out bonuses and commission but includes premium shift rates you
          normally work.
        </p>
        <p>
          Many employers simply pay all 5.6 weeks at normal pay. For rolled-up pay, 12.07% of your total pay already includes overtime and commission. See our{" "}
          <a href="/uk/tax-and-salary/overtime">overtime calculator</a>{" "}to check how overtime is taxed.
        </p>
      </GuideSection>

      <GuideSection id="regular-workers" n={16} kicker="Comparison" title="Compared with regular workers">
        <p>
          Regular workers get 5.6 times their working week, up to 28 days. Someone working 30 hours over 4 days gets 22.4 days, or 168 hours. An irregular-hours
          worker averaging the same 30 hours a week all year builds up the same 168 hours, at 12.07% of each period.
        </p>
        <p>
          The difference is timing. A regular worker has the whole year&rsquo;s entitlement from the start of the holiday year (built up monthly in the first year).
          An irregular-hours worker only has what they have already built up, unless the employer lets them take it early.
        </p>
      </GuideSection>

      <GuideSection id="sickness-family" n={17} kicker="Leave" title="Sickness and family leave">
        <p>
          Hours not worked do not build up holiday under the 12.07% method, so special rules protect people who are off sick or on family leave. Holiday for those
          periods is worked out from the average hours you worked in the previous 52 weeks.
        </p>
        <p>
          GOV.UK&rsquo;s example: a worker on 40 weeks of maternity leave who had worked 1,032 hours in the reference period builds up about 107 hours of holiday
          during the leave. If you could not take holiday because of sickness or family leave, you can carry up to 28 days into the next year; for sickness, it must
          be used within 18 months.
        </p>
      </GuideSection>

      <GuideSection id="leaving" n={18} kicker="Leaving" title="Leaving a job">
        <p>
          When you leave, holiday you have built up and not taken must be paid. If you were on rolled-up pay, it has already been paid. Our{" "}
          <a href="/uk/tax-and-salary/notice-period-final-pay">notice period and final pay calculator</a>{" "}shows how holiday fits into a final payslip.
        </p>
        <Timeline
          items={[
            { when: "Each pay period", what: "Holiday builds up", detail: "12.07% of hours worked is added, usually shown on your payslip or in an app." },
            { when: "Taking holiday", what: "Paid at your average", detail: "Average pay over the last 52 paid weeks, for each hour of holiday." },
            { when: "End of leave year", what: "Carry over", detail: "Usually up to 8 days with your employer’s agreement." },
            { when: "Leaving", what: "Untaken holiday paid", detail: "Paid in your final pay. Nothing extra if you had rolled-up pay." },
          ]}
        />
      </GuideSection>

      <GuideSection id="northern-ireland" n={19} kicker="Northern Ireland" title="Northern Ireland">
        <p>
          The 2024 changes were made for Great Britain only. In Northern Ireland, the Working Time Regulations (Northern Ireland) 2016 still apply: 5.6 weeks of
          holiday, capped at 28 days, which can include bank holidays. Irregular-hours workers there usually work out holiday as a proportion of a full-time year,
          and rolled-up holiday pay is not provided for. Check nidirect or the Labour Relations Agency for the current position.
        </p>
      </GuideSection>

      <GuideSection id="checks" n={20} kicker="Checks" title="Checking your payslip">
        <ul>
          <li>Does your payslip or app show the holiday hours built up each period, at 12.07% of hours worked or more?</li>
          <li>If you get rolled-up pay, is it a separate line, and is it 12.07% of all your pay, including overtime?</li>
          <li>Is your basic hourly rate at least the minimum wage, without counting the holiday line?</li>
          <li>When you take holiday, are you paid your average rate, not just basic pay, for at least 4 weeks a year?</li>
          <li>When you leave, is untaken holiday in your final pay?</li>
        </ul>
        <p>
          If something looks wrong, ask your employer or agency for the calculation. Acas offers free advice, and unpaid holiday pay can be claimed through an
          employment tribunal, usually within three months less one day.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "12.07%", label: "Holiday built up from hours worked, and rolled-up holiday pay" },
            { value: "5.6 weeks", label: "Statutory holiday a year" },
            { value: "46.4 weeks", label: "Weeks worked in a full year (52 − 5.6)" },
            { value: "1 April 2024", label: "Rules apply to leave years starting on or after this date" },
            { value: "52 weeks", label: "Paid weeks used for the holiday pay average" },
            { value: "104 weeks", label: "Furthest an employer looks back" },
            { value: "4 weeks", label: "Holiday that must be paid at normal pay, with overtime" },
            { value: "£12.71", label: "National Living Wage an hour from April 2026" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
