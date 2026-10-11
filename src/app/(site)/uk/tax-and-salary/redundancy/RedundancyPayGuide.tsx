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

/** Redundancy pay and tax: the 2026/27 guide. Figures from src/lib/tax/employment-rights.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who-qualifies", title: "Who qualifies" },
  { id: "formula", title: "The statutory formula" },
  { id: "counting-back", title: "Counting back year by year" },
  { id: "weekly-pay", title: "What counts as a week’s pay" },
  { id: "cap", title: "The weekly pay cap" },
  { id: "northern-ireland", title: "Northern Ireland" },
  { id: "examples", title: "Worked examples" },
  { id: "enhanced", title: "Enhanced redundancy pay" },
  { id: "notice", title: "Notice pay and PILON" },
  { id: "holiday", title: "Holiday pay when you leave" },
  { id: "tax-free", title: "The £30,000 tax-free amount" },
  { id: "tax-example", title: "A large payout, taxed" },
  { id: "p45", title: "Your P45 and tax code 0T" },
  { id: "pension", title: "Paying some into your pension" },
  { id: "benefits", title: "Redundancy and benefits" },
  { id: "consultation", title: "Consultation and fair selection" },
  { id: "alternative-work", title: "Suitable alternative work" },
  { id: "not-paid", title: "If you are not paid" },
  { id: "checklist", title: "A checklist before you sign" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Redundancy pay", href: "https://www.gov.uk/redundancy-your-rights/redundancy-pay" },
  { label: "GOV.UK: Calculate your statutory redundancy pay", href: "https://www.gov.uk/calculate-your-redundancy-pay" },
  { label: "GOV.UK: Redundancy, tax and National Insurance", href: "https://www.gov.uk/redundancy-your-rights/tax-and-national-insurance" },
  { label: "Department for the Economy (NI): limits on redundancy payments from 6 April 2026", href: "https://www.economy-ni.gov.uk/news/minister-announces-increase-limits-unfair-dismissal-and-redundancy-payments" },
  { label: "HMRC: Employment Income Manual, termination payments (EIM12800)", href: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim12800" },
  { label: "Acas: Redundancy", href: "https://www.acas.org.uk/redundancy" },
  { label: "GOV.UK: Your employer is insolvent", href: "https://www.gov.uk/your-rights-if-your-employer-is-insolvent" },
];

const money = (n: number) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function RedundancyPayGuide() {
  return (
    <Guide
      kicker="The redundancy pay guide"
      title="Redundancy pay and tax in 2026/27"
      intro={
        <>
          Losing your job is stressful, and the paperwork rarely helps. This guide explains how statutory redundancy pay is worked out, what the new £751 weekly cap
          means, how notice and holiday pay are added on top, and how much of the total is taxed. Every figure comes from the same rules the calculator uses.
        </>
      }
      meta={["Redundancies from 6 April 2026", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          If you are an employee with at least 2 full years of service, the law gives you a minimum redundancy payment. It is based on three things: your age, your
          full years of service (up to 20) and your weekly pay (up to £751 a week, or £783 in Northern Ireland).
        </p>
        <ul>
          <li>Half a week&rsquo;s pay for each full year you were under 22.</li>
          <li>One week&rsquo;s pay for each full year you were 22 to 40.</li>
          <li>One and a half weeks&rsquo; pay for each full year you were 41 or older.</li>
        </ul>
        <p>
          The most anyone can get from the statutory scheme is £22,530 (£23,490 in Northern Ireland). Your employer may pay more under an enhanced scheme. On top of
          redundancy pay you are owed notice pay and any untaken holiday. The first £30,000 of redundancy pay is tax-free; notice and holiday pay are taxed as normal
          pay.
        </p>
      </GuideSection>

      <GuideSection id="who-qualifies" n={2} kicker="Eligibility" title="Who qualifies">
        <p>To get statutory redundancy pay you must:</p>
        <ul>
          <li>be an <strong>employee</strong>, not a self-employed contractor or a worker without employee status;</li>
          <li>have at least <strong>2 full years</strong> of continuous service with your employer, or an associated employer, by the date your job ends;</li>
          <li>be dismissed because of <strong>redundancy</strong>: the job has gone, the workplace has closed or fewer people are needed for that kind of work.</li>
        </ul>
        <p>
          Some people lose the right to statutory pay. The main cases are refusing an offer of suitable alternative work without a good reason, leaving before your
          notice ends without your employer agreeing, and some Crown and armed forces roles. Apprentices whose apprenticeship ends are not normally redundant.
        </p>
        <Callout title="Continuous service carries over">
          A TUPE transfer to a new employer keeps your service intact, and so does moving between companies in the same group. Short breaks, such as sickness or
          maternity leave, normally count as service too.
        </Callout>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The formula" title="The statutory formula">
        <p>
          Statutory redundancy pay is a number of weeks multiplied by a week&rsquo;s pay. The number of weeks depends on how old you were during each full year of
          service:
        </p>
        <DataTable
          caption="Weeks of pay for each full year of service"
          head={["Your age during that year", "Weeks of pay"]}
          numeric={[1]}
          rows={[
            ["Under 22", "0.5"],
            ["22 to 40", "1"],
            ["41 and over", "1.5"],
          ]}
        />
        <p>
          Only <strong>full</strong> years count. Eleven years and ten months of service counts as eleven years. And no more than 20 years count, however long you
          have worked there, so the most weeks anyone can build up is 30.
        </p>
      </GuideSection>

      <GuideSection id="counting-back" n={4} kicker="The detail" title="Counting back year by year">
        <p>
          The years are counted <strong>backwards</strong> from the date your job ends. The most recent full year is the first one counted, then the year before,
          and so on, until you reach 20 years or the start of your job. The calculator shows this as a table, year by year.
        </p>
        <p>
          The age that matters is the age you were during that year of service. If you are 45 now, your most recent year was worked at 44, the year before at 43, and
          so on. That is why a birthday just before your leaving date can increase your payment: an extra year moves into a higher band.
        </p>
        <p>
          Because the most recent years are counted first and the older bands pay more, long-serving staff over 41 get the most. Someone aged 61 with 20 years
          worked all 20 counted years at 41 or older, so they get the full 30 weeks.
        </p>
        <Figure10 />
      </GuideSection>

      <GuideSection id="weekly-pay" n={5} kicker="Week’s pay" title="What counts as a week’s pay">
        <p>
          A week&rsquo;s pay is your gross pay for a normal working week, before tax and National Insurance, on the date your employer gives you notice. It includes
          regular contractual pay, such as shift allowances you always get. It does not include expenses.
        </p>
        <ul>
          <li><strong>Salaried staff:</strong> divide your yearly salary by 52.</li>
          <li>
            <strong>Variable hours or pay:</strong> use the average weekly pay over the last 12 weeks you worked, ending on the day before notice was given.
          </li>
          <li>
            <strong>On reduced pay:</strong> if you were on short-time working or reduced pay because of the redundancy situation, the law may use your normal pay
            instead. Get advice from Acas.
          </li>
        </ul>
        <p>
          If you took a pay cut through salary sacrifice, for example for a pension or a car, check with your employer which figure they use. Many use the
          pre-sacrifice salary for enhanced schemes.
        </p>
      </GuideSection>

      <GuideSection id="cap" n={6} kicker="The cap" title="The weekly pay cap">
        <p>
          For statutory redundancy pay, a week&rsquo;s pay is capped. For redundancies on or after 6 April 2026 the cap is <strong>£751</strong> in England,
          Scotland and Wales, up from £719 the year before. The cap goes up each April in line with prices.
        </p>
        <p>
          The cap matters to most full-time staff: £751 a week is about £39,052 a year. If you earn more, each week counts as £751. Someone on £60,000 gets the
          same statutory payment as someone on £40,000 with the same age and service.
        </p>
        <Callout tone="warn" title="Which year’s cap applies">
          The cap that applies is the one in force on the date your employment ends (the &quot;relevant date&quot;), not the date you were told about the
          redundancy. If your job ended before 6 April 2026, the £719 cap applies.
        </Callout>
      </GuideSection>

      <GuideSection id="northern-ireland" n={7} kicker="Northern Ireland" title="Northern Ireland">
        <p>
          Northern Ireland sets its own limits. From 6 April 2026 the weekly cap there is <strong>£783</strong>, up from £749. The age bands and the 20-year limit are
          the same, so the most you can get is £23,490.
        </p>
        <DataTable
          caption="Statutory redundancy pay at the cap: the same age and service in each part of the UK"
          head={["Example", "Weeks", "England, Scotland and Wales", "Northern Ireland"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Age 45, 10 years, £800 a week", "12", "£9,012", "£9,396"],
            ["Age 55, 15 years, £900 a week", "22", "£16,522", "£17,226"],
            ["Age 61, 20 years, at or above the cap", "30", "£22,530", "£23,490"],
          ]}
        />
      </GuideSection>

      <GuideSection id="examples" n={8} kicker="Examples" title="Worked examples">
        <WorkedExample
          title="Age 45, 10 years of service, £800 a week (England)"
          steps={[
            { label: "4 years at 41 to 44", note: "4 × 1.5 weeks", value: "6 weeks" },
            { label: "6 years at 35 to 40", note: "6 × 1 week", value: "6 weeks" },
            { label: "Week’s pay", note: "£800, capped at £751", value: "£751" },
          ]}
          total={{ label: "Statutory redundancy pay", value: "£9,012" }}
        />
        <WorkedExample
          title="Age 24, 6 years of service, £450 a week"
          steps={[
            { label: "2 years at 22 and 23", note: "2 × 1 week", value: "2 weeks" },
            { label: "4 years at 18 to 21", note: "4 × 0.5 weeks", value: "2 weeks" },
            { label: "Week’s pay", note: "Below the cap", value: "£450" },
          ]}
          total={{ label: "Statutory redundancy pay", value: "£1,800" }}
        />
        <p>
          Two more: someone aged 30 with 5 years on £500 a week gets 5 weeks, or £2,500. Someone aged 38 with 12 years on £640 a week gets 12 weeks, or £7,680. In
          both cases every counted year falls in the 22 to 40 band.
        </p>
      </GuideSection>

      <GuideSection id="enhanced" n={9} kicker="Above the minimum" title="Enhanced redundancy pay">
        <p>
          Statutory pay is only the legal minimum. Many employers pay more under a contractual or collective scheme. Common designs are:
        </p>
        <ul>
          <li><strong>A multiple of statutory pay</strong>, such as double or triple.</li>
          <li><strong>Uncapped weekly pay</strong>: the statutory weeks, but at your real weekly pay rather than £751.</li>
          <li><strong>A set number of weeks per year</strong>, such as one month&rsquo;s pay for each year of service.</li>
          <li>A mix of these, often with a maximum.</li>
        </ul>
        <p>
          Use the &quot;times statutory&quot; and &quot;no cap&quot; options in the calculator to model the first two. Check your contract, staff handbook or
          union agreement: if a scheme has been applied consistently for years, it may have become a contractual right even if it is not written down.
        </p>
        <CompareCards
          columns={[
            {
              name: "Statutory only",
              rows: [
                { label: "Age and service", value: "50, 20 years" },
                { label: "Weeks", value: "24.5" },
                { label: "Week’s pay", value: "£751 (capped)" },
                { label: "Redundancy pay", value: "£18,399.50" },
              ],
            },
            {
              name: "Double, uncapped",
              rows: [
                { label: "Age and service", value: "50, 20 years" },
                { label: "Weeks", value: "24.5 × 2" },
                { label: "Week’s pay", value: "£1,000 (actual)" },
                { label: "Redundancy pay", value: "£49,000" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="notice" n={10} kicker="Notice" title="Notice pay and PILON">
        <p>
          Redundancy is a dismissal, so you are owed notice as well as redundancy pay. It is the longer of your contractual notice and the statutory minimum: one
          week after a month&rsquo;s service, then one week for each full year from 2 years, up to 12 weeks. Our{" "}
          <a href="/uk/tax-and-salary/notice-period-final-pay">notice period and final pay calculator</a>{" "}works out the dates for you.
        </p>
        <p>Your employer can handle notice in three ways:</p>
        <ul>
          <li><strong>You work your notice</strong> and are paid as normal.</li>
          <li><strong>Garden leave:</strong> you stay employed and paid, but stay at home.</li>
          <li>
            <strong>Pay in lieu of notice (PILON):</strong> your job ends now and the notice is paid as a lump sum.
          </li>
        </ul>
        <p>
          In the second example above, the employee aged 45 with 10 years is owed 10 weeks of statutory notice. At £800 a week, PILON is £8,000. Notice pay uses
          your real weekly pay, not the redundancy cap.
        </p>
      </GuideSection>

      <GuideSection id="holiday" n={11} kicker="Holiday" title="Holiday pay when you leave">
        <p>
          Holiday you have built up in the current leave year but not taken must be paid when you leave. Statutory holiday is 5.6 weeks a year, which is 28 days
          for a five-day week, built up in proportion to the part of the year you worked. Use our{" "}
          <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement calculator</a>{" "}to work out what you have built up.
        </p>
        <p>
          A day&rsquo;s holiday pay is usually your weekly pay divided by the days you work each week. On £800 a week and five days, a day is worth £160, so 3 days
          owed is £480. Your employer can ask you to take holiday during your notice instead, if it gives you enough notice to do so.
        </p>
      </GuideSection>

      <GuideSection id="tax-free" n={12} kicker="Tax" title="The £30,000 tax-free amount">
        <p>
          Payments made because your job ended, such as statutory and enhanced redundancy pay, are free of Income Tax and National Insurance up to{" "}
          <strong>£30,000</strong> in total. Above £30,000:
        </p>
        <ul>
          <li>you pay Income Tax at your usual rates, treated as the top slice of your income for the year;</li>
          <li>you do <strong>not</strong> pay employee National Insurance;</li>
          <li>your employer pays Class 1A National Insurance at 15% on the excess.</li>
        </ul>
        <p>
          The £30,000 does <strong>not</strong> cover anything you would have been paid anyway. Final wages, notice pay (whether worked or paid in lieu), holiday pay,
          bonuses and commission are all taxed as normal pay, with National Insurance.
        </p>
        <Bars
          format={money}
          items={[
            { label: "Redundancy pay up to £30,000", value: 30_000, color: "var(--g-c3)" },
            { label: "Redundancy pay above £30,000", value: 19_000, color: "var(--g-c1)" },
            { label: "Notice pay (PILON)", value: 12_000, color: "var(--g-c4)" },
            { label: "Holiday pay", value: 1_000, color: "var(--g-c4)" },
          ]}
        />
        <p>The chart shows the payout in the next section, split by how each part is taxed.</p>
      </GuideSection>

      <GuideSection id="tax-example" n={13} kicker="Example" title="A large payout, taxed">
        <p>
          Take someone aged 50 with 20 years of service on £1,000 a week, with an enhanced scheme of double redundancy pay at full pay, 12 weeks&rsquo; notice paid in
          lieu and 5 days of holiday owed. They earned £30,000 earlier in the tax year.
        </p>
        <WorkedExample
          title="Age 50, 20 years, £1,000 a week, double uncapped scheme"
          steps={[
            { label: "Redundancy pay", note: "24.5 weeks × £1,000 × 2", value: "£49,000" },
            { label: "Pay in lieu of notice", note: "12 weeks × £1,000", value: "£12,000" },
            { label: "Holiday pay", note: "5 days × £200", value: "£1,000" },
            { label: "Income Tax", note: "On £19,000 + £12,000 + £1,000", value: "−£8,746" },
            { label: "National Insurance", note: "On notice and holiday pay only", value: "−£260" },
          ]}
          total={{ label: "Received after tax", value: "£52,994" }}
        />
        <p>
          Of the £62,000 gross, £30,000 was tax-free. The other £32,000 took their income for the year to £62,000, so part of it was taxed at 40%. The employer also
          paid about £2,850 in Class 1A NI on the £19,000 above £30,000.
        </p>
        <p>
          A smaller payout is usually much simpler. Our 45-year-old with 10 years gets £9,012 of redundancy pay tax-free, plus £8,000 of PILON and £480 of holiday
          pay. With £20,000 earned earlier in the year, the £8,480 of earnings costs £1,696 in Income Tax and £212.94 in NI, leaving £15,583.06 from £17,492.
        </p>
      </GuideSection>

      <GuideSection id="p45" n={14} kicker="Payroll" title="Your P45 and tax code 0T">
        <p>
          Your employer should pay everything through your final payroll and then issue your <a href="/uk/tax-and-salary/p45-p60-explainer">P45</a>. If a payment is
          made after the P45 has been issued, payroll must use tax code 0T on a non-cumulative basis. That gives you no tax-free allowance on the payment, so it
          often takes too much tax.
        </p>
        <p>
          You do not lose the money. If you start a new job, the new employer&rsquo;s payroll will usually correct it. If you do not, you can claim a refund from
          HMRC during the year or after it ends. Our <a href="/uk/tax-and-salary/emergency-tax">emergency tax calculator</a>{" "}shows how codes like 0T work.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={15} kicker="Pensions" title="Paying some into your pension">
        <p>
          If your payout goes over £30,000, paying some of it into a pension can save tax. There are two routes:
        </p>
        <ul>
          <li>
            <strong>Before it is paid:</strong> some employers let you sacrifice part of the termination payment into the company pension. No tax or NI is taken.
          </li>
          <li>
            <strong>After it is paid:</strong> you pay into a pension yourself and get tax relief. Higher-rate relief is claimed through Self Assessment. See our{" "}
            <a href="/uk/investing/pension-tax-relief">pension tax relief calculator</a>.
          </li>
        </ul>
        <p>
          Pension contributions that get tax relief are limited by the annual allowance (£60,000 for most people) and by your earnings for the year, so check both
          before paying in a large sum. A pension provider or adviser can confirm what counts.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={16} kicker="Benefits" title="Redundancy and benefits">
        <p>
          Once you have received it, redundancy pay is treated as savings, not income. That matters for means-tested benefits:
        </p>
        <ul>
          <li>
            <strong>Universal Credit:</strong> savings over £6,000 reduce your award, and above £16,000 you cannot claim. Final wages, notice and holiday pay count
            as earnings in the month they are paid.
          </li>
          <li>
            <strong>New Style Jobseeker&rsquo;s Allowance:</strong> it depends on your National Insurance record, not your savings, so redundancy pay does not stop
            it. Check with our <a href="/uk/benefits/new-style-jsa">New Style JSA calculator</a>.
          </li>
        </ul>
        <p>
          Claim straight away even if you are still being paid notice: some benefits cannot be backdated.
        </p>
      </GuideSection>

      <GuideSection id="consultation" n={17} kicker="Process" title="Consultation and fair selection">
        <p>
          Redundancy pay is only part of the picture. A redundancy must also be fair. Your employer should:
        </p>
        <ul>
          <li>consult you individually about why your role is at risk and any alternatives;</li>
          <li>use fair, objective selection criteria if only some roles go;</li>
          <li>consult collectively if 20 or more redundancies are planned at one site within 90 days.</li>
        </ul>
        <Timeline
          items={[
            { when: "At risk", what: "Consultation starts", detail: "You are told your role may go. Ask for the selection criteria and your scores." },
            { when: "Decision", what: "Notice is given", detail: "Your notice period starts the day after notice is given." },
            { when: "Last day", what: "Employment ends", detail: "Final pay, redundancy pay, notice and holiday pay are due, usually with the next payroll." },
            { when: "Within 3 months", what: "Tribunal time limit", detail: "Claims for unfair dismissal or unpaid redundancy pay have strict time limits. Contact Acas early." },
          ]}
        />
      </GuideSection>

      <GuideSection id="alternative-work" n={18} kicker="Offers" title="Suitable alternative work">
        <p>
          Your employer must look for other suitable roles and offer them to you. If you accept, you get a <strong>4-week trial period</strong> in the new role. If it
          does not work out, you can still take redundancy with your full rights.
        </p>
        <p>
          If you unreasonably refuse a suitable offer, you can lose statutory redundancy pay. Whether an offer is suitable depends on pay, hours, location, status
          and your personal situation. Write down your reasons if you turn one down.
        </p>
      </GuideSection>

      <GuideSection id="not-paid" n={19} kicker="Problems" title="If you are not paid">
        <p>
          Start by writing to your employer. If that does not work, contact Acas for early conciliation before making an employment tribunal claim. Claims for
          statutory redundancy pay can be made within six months of your leaving date, but most other claims must start within three months less one day.
        </p>
        <p>
          If your employer has gone bust, apply to the Redundancy Payments Service. It can pay statutory redundancy pay, statutory notice pay, up to 8 weeks of
          unpaid wages and up to 6 weeks of holiday pay, with weekly pay capped at the same limit.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={20} kicker="Checklist" title="A checklist before you sign">
        <ul>
          <li>Is your weekly pay right, and is the cap applied only to the statutory part?</li>
          <li>Are all your full years counted, including service with associated employers?</li>
          <li>Is notice the longer of your contract and the statutory minimum?</li>
          <li>Is untaken holiday included, including bank holidays if your contract gives them on top?</li>
          <li>Is the £30,000 tax-free amount applied, with notice and holiday pay taxed?</li>
          <li>If you are signing a settlement agreement, has a solicitor advised you? Employers often pay for this.</li>
        </ul>
        <Callout tone="good" title="Next steps">
          Keep a copy of your contract, your last payslips and your redundancy letter. If you are claiming benefits, the{" "}
          <a href="/uk/benefits/universal-credit">Universal Credit calculator</a>{" "}shows how your payout and savings affect an award.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£751", label: "Weekly pay cap from 6 April 2026 (England, Scotland, Wales)" },
            { value: "£783", label: "Weekly pay cap in Northern Ireland" },
            { value: "£22,530", label: "Most statutory redundancy pay (£23,490 in NI)" },
            { value: "2 years", label: "Service needed to qualify" },
            { value: "20 years", label: "Most service that counts" },
            { value: "0.5 / 1 / 1.5", label: "Weeks per year: under 22, 22 to 40, 41 and over" },
            { value: "£30,000", label: "Termination payments free of tax and NI" },
            { value: "12 weeks", label: "Longest statutory notice from an employer" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

/** Statutory pay with 10 years of service at the cap, by age today. */
function Figure10() {
  return (
    <>
      <p>
        Here is the effect of age alone. Each bar is someone with 10 full years of service at the £751 cap, made redundant at the age shown:
      </p>
      <Bars
        format={money}
        items={[
          { label: "Age 30", value: 6_759 },
          { label: "Age 35", value: 7_510 },
          { label: "Age 40", value: 7_510 },
          { label: "Age 45", value: 9_012 },
          { label: "Age 50", value: 10_889.5 },
          { label: "Age 55", value: 11_265 },
          { label: "Age 60", value: 11_265 },
        ]}
      />
      <p>
        At 30 two of the ten years were worked under 22, so the payment is lower. From 51 all ten counted years fall in the top band, so the payment stops rising.
      </p>
    </>
  );
}
