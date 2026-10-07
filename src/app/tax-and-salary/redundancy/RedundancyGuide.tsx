import {
  Callout,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Redundancy pay — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "who", title: "Who gets redundancy pay" },
  { id: "formula", title: "How statutory pay is worked out" },
  { id: "examples", title: "Examples at different ages" },
  { id: "cap", title: "The weekly pay cap" },
  { id: "notice", title: "Notice and notice pay" },
  { id: "tax", title: "Tax on redundancy pay" },
  { id: "enhanced", title: "Enhanced and settlement payments" },
  { id: "process", title: "A fair redundancy process" },
  { id: "after", title: "After you leave" },
  { id: "reckoner", title: "Ready reckoner: weeks of pay" },
  { id: "package-example", title: "A full leaving package" },
  { id: "benefits-pensions", title: "Benefits and pensions" },
  { id: "northern-ireland", title: "Northern Ireland" },
  { id: "alternative", title: "Alternative jobs and trial periods" },
  { id: "weeks-pay", title: "When your pay varies" },
  { id: "collective", title: "Large-scale redundancies" },
  { id: "before-signing", title: "Before you accept a package" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Redundancy: your rights", href: "https://www.gov.uk/redundant-your-rights" },
  { label: "GOV.UK — Calculate your statutory redundancy pay", href: "https://www.gov.uk/calculate-your-redundancy-pay" },
  { label: "GOV.UK — Termination payments and tax when you leave a job", href: "https://www.gov.uk/termination-payments-and-tax-when-you-leave-a-job" },
  { label: "GOV.UK — Redundancy Payments Service", href: "https://www.gov.uk/claim-redundancy" },
  { label: "nidirect — Redundancy pay in Northern Ireland", href: "https://www.nidirect.gov.uk/articles/redundancy-pay" },
  { label: "Acas — Redundancy", href: "https://www.acas.org.uk/redundancy" },
];

export default function RedundancyGuide() {
  return (
    <Guide
      kicker="The redundancy guide"
      title="Redundancy pay, explained clearly"
      intro={
        <>
          Being made redundant is stressful, and the numbers are often unclear. This guide explains who qualifies for
          statutory redundancy pay, exactly how it is worked out for 2026/27, how notice and holiday pay fit in, and
          which parts of your leaving package are tax-free.
        </>
      }
      meta={["2026/27 figures", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="who" n={1} kicker="Eligibility" title="Who gets redundancy pay">
        <p>You are entitled to statutory redundancy pay if you:</p>
        <ul>
          <li>are an employee (not a worker or self-employed <a href="/tax-and-salary/ir35-take-home">contractor</a>),</li>
          <li>have worked continuously for your employer for at least <strong>2 full years</strong>, and</li>
          <li>are dismissed because of redundancy: your job no longer exists, the workplace is closing, or fewer people are needed for the work.</li>
        </ul>
        <p>
          You can lose the right if you unreasonably turn down suitable alternative work offered by your employer, or if
          you leave before your notice ends without agreement. Some groups, such as members of the armed forces and
          certain crown employees, have separate schemes.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={2} kicker="The formula" title="How statutory pay is worked out">
        <p>Statutory redundancy pay depends on three things: your age, your length of service and your weekly pay.</p>
        <DataTable
          caption="Weeks’ pay for each full year of service"
          head={["Your age during that year", "Weeks’ pay"]}
          numeric={[1]}
          rows={[
            ["Under 22", "0.5"],
            ["22 to 40", "1"],
            ["41 and over", "1.5"],
          ]}
        />
        <p>
          Only full years count, up to a maximum of 20, counting back from the date you are made redundant. Weekly pay is
          your normal gross pay, capped at <strong>£751</strong> (£783 in Northern Ireland) from April 2026. The most
          anyone can get is 30 weeks at the cap: <strong>£22,530</strong>.
        </p>
        <WorkedExample
          title="Worked example: age 45, 8 years’ service, £650 a week"
          steps={[
            { label: "4 years aged 41 to 44", note: "4 × 1.5 weeks", value: "6 weeks" },
            { label: "4 years aged 37 to 40", note: "4 × 1 week", value: "4 weeks" },
            { label: "Total weeks", value: "10" },
          ]}
          total={{ label: "Statutory redundancy pay", value: "£6,500" }}
        />
      </GuideSection>

      <GuideSection id="examples" n={3} kicker="Examples" title="Examples at different ages">
        <DataTable
          caption="Statutory redundancy pay, 2026/27, England, Scotland and Wales"
          head={["Age", "Years’ service", "Weekly pay", "Weeks", "Redundancy pay"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["21", "3", "£400", "1.5", "£600.00"],
            ["30", "5", "£900 (capped to £751)", "5", "£3,755.00"],
            ["45", "8", "£650", "10", "£6,500.00"],
            ["50", "12", "£500", "16.5", "£8,250.00"],
            ["60", "20", "£1,000 (capped)", "29.5", "£22,154.50"],
            ["62", "20", "£751", "30", "£22,530.00"],
          ]}
        />
        <p>
          The calculator includes a year-by-year table so you can see exactly how each year of your service counts.
        </p>
      </GuideSection>

      <GuideSection id="cap" n={4} kicker="The cap" title="The weekly pay cap">
        <p>
          The cap usually rises each April in line with inflation. For redundancies on or after 6 April 2026 it is £751 a
          week in England, Scotland and Wales, and £783 in Northern Ireland. If you earn more, statutory pay uses the cap,
          not your actual pay.
        </p>
        <p>
          &ldquo;A week&rsquo;s pay&rdquo; is normally your gross contractual pay for your normal working hours. If your
          hours or pay vary, it is the average of the 12 weeks before your notice. Overtime only counts if your contract
          requires your employer to offer it and you to work it.
        </p>
      </GuideSection>

      <GuideSection id="notice" n={5} kicker="Notice" title="Notice and notice pay">
        <p>
          Redundancy pay is separate from notice. You are entitled to the longer of your contractual notice or the
          statutory minimum:
        </p>
        <ul>
          <li>1 week if you have worked for 1 month to 2 years,</li>
          <li>1 week for each full year if you have worked for 2 to 12 years,</li>
          <li>12 weeks if you have worked for 12 years or more.</li>
        </ul>
        <p>
          You can work your notice and be paid as normal, be put on garden leave, or receive <strong>pay in lieu of
          notice</strong> (PILON) as a lump sum. Notice pay is always taxed like salary, with Income Tax and National
          Insurance, even if it is paid as a lump sum after you leave.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={6} kicker="Tax" title="Tax on redundancy pay">
        <p>
          The first <strong>£30,000</strong> of redundancy pay and other genuine termination payments is tax-free.
          Anything above that is taxed at your normal Income Tax rates, but no employee National Insurance is due on it.
        </p>
        <DataTable
          caption="How each part of a leaving package is taxed"
          head={["Payment", "Income Tax", "Employee NI"]}
          rows={[
            ["Statutory and enhanced redundancy pay, first £30,000", "No", "No"],
            ["Redundancy pay above £30,000", "Yes", "No"],
            ["Notice pay, including pay in lieu", "Yes", "Yes"],
            ["Holiday pay owed", "Yes", "Yes"],
            ["Final salary, bonus and commission", "Yes", "Yes"],
          ]}
        />
        <Callout title="Your P45 and tax code">
          Payments made after your <a href="/tax-and-salary/p45-p60-explainer">P45</a>{" "}has been issued are taxed using code 0T on a non-cumulative basis, so no tax-free
          allowance is given against them. If that means too much tax is taken, you can claim it back from HMRC, or it is
          refunded through your next job.
        </Callout>
        <p>
          You can usually pay part of a redundancy payment into your pension through your employer, which can save tax on
          any amount above £30,000. Ask before the payment is made.
        </p>
      </GuideSection>

      <GuideSection id="enhanced" n={7} kicker="Above the minimum" title="Enhanced and settlement payments">
        <p>
          Many employers pay more than the statutory minimum, for example by ignoring the weekly cap, using a multiple of
          weeks, or adding a fixed sum. Check your contract, staff handbook or any collective agreement.
        </p>
        <p>
          If you are offered a <strong>settlement agreement</strong>, you give up the right to make claims against your
          employer in return for a payment. You must get independent legal advice before signing, and employers usually
          contribute to the cost.
        </p>
      </GuideSection>

      <GuideSection id="process" n={8} kicker="Process" title="A fair redundancy process">
        <Timeline
          items={[
            { when: "First", what: "Consultation", detail: "Your employer should explain why roles are at risk and listen to your views. If 20 or more people are affected, collective consultation rules apply." },
            { when: "Next", what: "Fair selection", detail: "Selection must use fair, objective criteria. Choosing someone for a reason such as age, pregnancy or union membership is unlawful." },
            { when: "Then", what: "Alternatives", detail: "Your employer should consider suitable alternative roles. You have a 4-week trial period in a new role without losing redundancy pay." },
            { when: "Finally", what: "Notice and payment", detail: "You receive written notice, your redundancy pay and your final pay." },
          ]}
        />
        <p>
          Employees on maternity, adoption or <a href="/benefits/shared-parental-leave">shared parental leave</a>, and pregnant employees, have priority for suitable
          alternative vacancies during the protected period.
        </p>
      </GuideSection>

      <GuideSection id="after" n={9} kicker="After" title="After you leave">
        <ul>
          <li>Keep your P45: your next employer or Jobcentre will need it.</li>
          <li>Check whether you can claim New Style <a href="/benefits/new-style-jsa">Jobseeker&rsquo;s Allowance</a>{" "}or Universal Credit. Redundancy pay can affect Universal Credit if your savings go above £6,000.</li>
          <li>If your employer does not pay, claim through an employment tribunal within 6 months.</li>
          <li>If your employer is insolvent, apply to the Redundancy Payments Service.</li>
        </ul>
      </GuideSection>

      <GuideSection id="reckoner" n={10} kicker="Reference" title="Ready reckoner: weeks of pay">
        <p>
          Multiply the number of weeks by your weekly pay, up to the cap, to get your statutory redundancy pay. A dash means
          the service is not possible at that age.
        </p>
        <DataTable
          caption="Weeks of statutory redundancy pay by age and years of service"
          head={["Age when made redundant", "5 years", "10 years", "20 years"]}
          numeric={[1, 2, 3]}
          rows={[
            ["30", "5", "9", "–"],
            ["40", "5", "10", "19"],
            ["50", "7.5", "14.5", "24.5"],
            ["60", "7.5", "15", "29.5"],
          ]}
        />
      </GuideSection>

      <GuideSection id="package-example" n={11} kicker="Example" title="A full leaving package">
        <WorkedExample
          title="Age 50, 12 years’ service, £800 a week, £5,000 enhanced payment, notice paid in lieu"
          steps={[
            { label: "Statutory redundancy", note: "16.5 weeks × £751 cap", value: "£12,391.50" },
            { label: "Enhanced payment", value: "£5,000.00" },
            { label: "Notice pay in lieu", note: "12 weeks × £800", value: "£9,600.00" },
            { label: "Holiday owed", note: "5 days × £160", value: "£800.00" },
            { label: "Estimated tax and NI on notice and holiday pay", value: "−£3,154.20" },
          ]}
          total={{ label: "Total package before tax / after tax, about", value: "£27,791.50 / £24,637.30" }}
        />
        <p>
          The £17,391.50 of redundancy pay is all tax-free, because it is under £30,000. The notice and holiday pay are
          taxed like salary; here they push the year&rsquo;s income past £50,270, so part is taxed at 40%.
        </p>
      </GuideSection>

      <GuideSection id="benefits-pensions" n={12} kicker="Next steps" title="Benefits and pensions">
        <p>
          Redundancy pay counts as savings, not income, for most means-tested benefits. Universal Credit ignores the first
          £6,000 of savings, reduces your award between £6,000 and £16,000, and stops above £16,000. New Style
          Jobseeker&rsquo;s Allowance is based on your National Insurance record, not your savings, so redundancy pay does
          not affect it.
        </p>
        <p>
          If you are 55 or over (57 from 2028), you may be able to take pension benefits, but think carefully before
          doing so: taking taxable income from a pension can reduce how much you can later pay into pensions with tax
          relief. Paying part of a large redundancy payment into a pension through your employer can save tax on anything
          above £30,000.
        </p>
      </GuideSection>

      <GuideSection id="northern-ireland" n={13} kicker="Northern Ireland" title="Northern Ireland">
        <p>
          The rules are the same in Northern Ireland, but the weekly pay cap is higher: £783 from April 2026, so the
          maximum statutory payment is £23,490. Claims go to an industrial tribunal, and advice is available from the
          Labour Relations Agency.
        </p>
      </GuideSection>

      <GuideSection id="alternative" n={14} kicker="Alternatives" title="Alternative jobs and trial periods">
        <p>
          Your employer should offer any suitable alternative job they have. If you accept a new role with different terms,
          you have a <strong>4-week trial period</strong> to see whether it works. If it does not, and you leave during
          the trial for a good reason, you keep your right to redundancy pay.
        </p>
        <p>
          Whether a job is suitable depends on things like pay, hours, location, status and your skills. If you
          unreasonably refuse a suitable offer, you can lose your statutory redundancy pay, so put any concerns in
          writing.
        </p>
      </GuideSection>

      <GuideSection id="weeks-pay" n={15} kicker="Weekly pay" title="When your pay varies">
        <p>
          If you work regular hours for a fixed salary, a week&rsquo;s pay is simply your normal weekly gross pay. If your
          hours vary, it is your average weekly pay over the 12 weeks before the day you were given notice, ignoring weeks
          when you were not paid. If you work shifts at different rates, the average <a href="/tax-and-salary/hourly-to-salary">hourly rate</a>{" "}over those 12 weeks is
          used.
        </p>
        <p>
          A week&rsquo;s pay is based on your normal contractual pay, so a pay cut or short-time working just before
          redundancy can reduce it.
        </p>
      </GuideSection>

      <GuideSection id="collective" n={16} kicker="Collective" title="Large-scale redundancies">
        <p>
          If an employer plans to make 20 or more people redundant at one site within 90 days, collective consultation
          rules apply. Consultation must start at least 30 days before the first dismissal (45 days for 100 or more), with
          a recognised union or elected employee representatives, and the employer must notify the government.
        </p>
        <p>
          If an employer fails to consult properly, the tribunal can award a protective award of up to 90 days&rsquo; pay
          for each affected employee, on top of redundancy pay.
        </p>
      </GuideSection>

      <GuideSection id="before-signing" n={17} kicker="Checklist" title="Before you accept a package">
        <ul>
          <li>Ask for a written breakdown of redundancy pay, notice pay, holiday pay and any other payments.</li>
          <li>Check your weekly pay figure and years of service against your own records and payslips.</li>
          <li>Find out whether the enhanced scheme uses your actual pay or the statutory cap.</li>
          <li>Ask how pension, company car and private medical cover will end, and whether you can keep them.</li>
          <li>Check when each payment will be made and which tax year it falls in.</li>
          <li>If you are offered a settlement agreement, take independent legal advice before signing.</li>
        </ul>
        <p>
          Timing can matter for tax. A payment made just after 5 April falls into the next tax year, which can help if
          your income will be lower then. Ask whether the date can be agreed, especially for notice pay or bonuses that
          are taxed at your <a href="/tax-and-salary/tax-bracket-checker">marginal rate</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "2 years", label: "Service needed for statutory redundancy pay" },
            { value: "£751", label: "Weekly pay cap (£783 in Northern Ireland)" },
            { value: "20 years", label: "Most years of service that count" },
            { value: "£22,530", label: "Maximum statutory redundancy pay" },
            { value: "£30,000", label: "Tax-free limit for termination payments" },
            { value: "12 weeks", label: "Longest statutory notice" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
