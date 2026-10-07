import {
  Bars,
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

/** Paternity pay — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who can take paternity leave" },
  { id: "april-2026", title: "What changed in April 2026" },
  { id: "pay", title: "How paternity pay is worked out" },
  { id: "examples", title: "What you lose at different salaries" },
  { id: "timing", title: "When to take it" },
  { id: "notice", title: "Notice and paperwork" },
  { id: "employer", title: "Employer paternity schemes" },
  { id: "more-time", title: "Ways to get more time off" },
  { id: "neonatal", title: "If your baby needs neonatal care" },
  { id: "self-employed", title: "If you are self-employed" },
  { id: "patterns", title: "Three ways to plan your two weeks" },
  { id: "holiday", title: "Paternity leave and holiday together" },
  { id: "adoption", title: "Adopters and surrogacy" },
  { id: "protection", title: "Your rights while on leave" },
  { id: "uc", title: "Paternity pay and other benefits" },
  { id: "budget", title: "Budgeting for your time off" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Paternity pay and leave", href: "https://www.gov.uk/paternity-pay-leave" },
  { label: "GOV.UK — Shared Parental Leave and Pay", href: "https://www.gov.uk/shared-parental-leave-and-pay" },
  { label: "GOV.UK — Neonatal care leave and pay", href: "https://www.gov.uk/neonatal-care-pay-leave" },
  { label: "GOV.UK — Unpaid parental leave", href: "https://www.gov.uk/parental-leave" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
];

export default function PaternityGuide() {
  return (
    <Guide
      kicker="The paternity pay guide"
      title="Paternity leave and pay in 2026/27"
      intro={
        <>
          Fathers, partners and second adopters can take up to two weeks of paternity leave, paid at up to £194.32 a week. From
          April 2026 the leave is a day-one right, though the pay still needs six months with your employer. This guide covers
          who qualifies, what you get, how to plan the time, and the other leave you can use alongside it.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Up to <strong>two weeks</strong> of paternity leave, taken together or as two separate weeks.</li>
          <li>Pay of <strong>£194.32 a week</strong>, or 90% of your average weekly earnings if that is less.</li>
          <li>Leave is a day-one right from 6 April 2026; pay needs <strong>26 weeks&rsquo; service</strong> by the 15th week before the due week.</li>
          <li>Must be taken within 52 weeks of the birth or <a href="/benefits/adoption-pay">adoption</a>.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2 weeks", label: "Paternity leave" },
            { value: "£194.32", label: "Weekly pay, or 90% if less" },
            { value: "£388.64", label: "Most for two weeks" },
            { value: "52 weeks", label: "Window to take it after the birth" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who can take paternity leave">
        <p>You can take paternity leave if you are an employee and you are:</p>
        <ul>
          <li>the baby&rsquo;s biological father;</li>
          <li>the mother&rsquo;s husband, wife, civil partner or partner;</li>
          <li>the partner of the main adopter, or the other intended parent in a surrogacy arrangement.</li>
        </ul>
        <p>
          You must also be taking the time off to support the mother or care for the baby, and expect to have responsibility
          for bringing up the child. The same rules apply to same-sex couples.
        </p>
      </GuideSection>

      <GuideSection id="april-2026" n={3} kicker="New rules" title="What changed in April 2026">
        <CompareCards
          columns={[
            {
              name: "Before 6 April 2026",
              rows: [
                { label: "Leave", value: "26 weeks' service needed" },
                { label: "Pay", value: "26 weeks' service needed" },
                { label: "After shared parental leave", value: "Not allowed" },
              ],
            },
            {
              name: "From 6 April 2026",
              rows: [
                { label: "Leave", value: "Day-one right" },
                { label: "Pay", value: "26 weeks' service still needed" },
                { label: "After shared parental leave", value: "Allowed" },
              ],
            },
          ]}
        />
        <p>
          The changes come from the Employment Rights Act 2025 and apply to leave starting on or after 6 April 2026. A new
          starter can now take two weeks off when their baby arrives without risking their job, but they may not be paid for
          it unless their employer chooses to pay.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={4} kicker="The maths" title="How paternity pay is worked out">
        <p>To get Statutory Paternity Pay (SPP), you also need:</p>
        <ul>
          <li>average weekly earnings of at least £129 in the eight weeks before the qualifying week;</li>
          <li>to still be employed by the same employer up to the birth.</li>
        </ul>
        <p>
          SPP is the lower of <strong>£194.32</strong> or <strong>90%</strong> of your average weekly earnings. Unlike
          maternity pay, there is no higher first period: every week is paid at the same rate.
        </p>
        <WorkedExample
          title="A £35,000 salary: average weekly earnings £673.08"
          steps={[
            { label: "90% of earnings", value: "£605.77" },
            { label: "Statutory rate", value: "£194.32" },
            { label: "SPP a week: the lower of the two", value: "£194.32" },
          ]}
          total={{ label: "Two weeks of SPP", value: "£388.64" }}
        />
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="The real cost" title="What you lose at different salaries">
        <DataTable
          caption="Two weeks of statutory paternity pay compared with normal pay, before tax"
          head={["Salary", "Normal pay for 2 weeks", "SPP for 2 weeks", "Pay lost"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£10,000", "£384.62", "£346.15", "£38.46"],
            ["£15,000", "£576.92", "£388.64", "£188.28"],
            ["£25,000", "£961.54", "£388.64", "£572.90"],
            ["£35,000", "£1,346.15", "£388.64", "£957.51"],
            ["£50,000", "£1,923.08", "£388.64", "£1,534.44"],
            ["£75,000", "£2,884.62", "£388.64", "£2,495.98"],
          ]}
        />
        <Figure label="Pay lost over two weeks on statutory pay" caption="The flat rate means higher earners lose much more.">
          <Bars
            items={[
              { label: "£15,000", value: 188.28 },
              { label: "£25,000", value: 572.9 },
              { label: "£35,000", value: 957.51 },
              { label: "£50,000", value: 1534.44 },
            ]}
          />
        </Figure>
        <p>
          Only those earning less than about £11,227 a year get 90% of their pay; everyone else gets the flat rate. After tax
          and <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}the gap is a little smaller, because SPP is taxed like normal pay.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={6} kicker="Planning" title="When to take it">
        <ul>
          <li>Leave can start on the day of the birth or any day after, but not before.</li>
          <li>Since April 2024 you can take the two weeks as one block or as two separate weeks.</li>
          <li>All of it must be taken within 52 weeks of the birth, or of the child joining the family through adoption.</li>
          <li>You can choose a start date, or say it starts a set number of days after the birth.</li>
        </ul>
        <p>
          Many partners take one week straight away and save the second for when the mother returns to work or a grandparent
          stops helping. Taking holiday as well can extend the time you are off on full pay.
        </p>
      </GuideSection>

      <GuideSection id="notice" n={7} kicker="Paperwork" title="Notice and paperwork">
        <Timeline
          items={[
            { when: "15 weeks before", what: "Give notice of your entitlement", detail: "Tell your employer the due date and that you want paternity leave, by the end of the 15th week before the due week." },
            { when: "28 days before", what: "Confirm each week", detail: "Give at least 28 days' notice of the dates for each week of leave. You can change dates with 28 days' notice." },
            { when: "For pay", what: "Form SC3", detail: "Most employers ask for form SC3, or their own version, to confirm you qualify for SPP." },
          ]}
        />
        <p>For adoption, notice runs from the date you are matched with a child.</p>
      </GuideSection>

      <GuideSection id="employer" n={8} kicker="Better than the law" title="Employer paternity schemes">
        <p>
          Many employers pay more than SPP, often full pay for the two weeks. Some offer extra weeks of paid leave. These schemes
          are set out in your contract or staff handbook.
        </p>
        <WorkedExample
          title="A £40,000 salary with full pay for two weeks"
          steps={[
            { label: "SPP: 2 × £194.32", value: "£388.64" },
            { label: "Employer top-up", value: "£1,149.82" },
          ]}
          total={{ label: "Total: normal pay", value: "£1,538.46" }}
        />
        <p>
          Enhanced pay may need longer service than the statutory scheme, or require you to return to work for a period
          afterwards.
        </p>
      </GuideSection>

      <GuideSection id="more-time" n={9} kicker="Options" title="Ways to get more time off">
        <ul>
          <li>
            <strong>Shared Parental Leave:</strong> the mother can end maternity leave early and share up to 50 weeks of leave
            and 37 weeks of pay with you. See the <a href="/benefits/shared-parental-leave">shared parental leave calculator</a>.
          </li>
          <li>
            <strong>Annual leave:</strong> holiday can be taken next to paternity leave, subject to your employer agreeing the dates.
          </li>
          <li>
            <strong>Unpaid parental leave:</strong> up to 18 weeks per child before their 18th birthday, usually up to four
            weeks a year. A day-one right from April 2026.
          </li>
          <li>
            <strong>Antenatal appointments:</strong> you can take unpaid time off to go to up to two antenatal appointments.
          </li>
          <li>
            <strong>Time off for dependants:</strong> reasonable unpaid time off to deal with emergencies, such as a sudden
            illness.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="neonatal" n={10} kicker="Special care" title="If your baby needs neonatal care">
        <p>
          Since April 2025, parents whose baby spends seven or more continuous days in neonatal care, starting within 28 days
          of the birth, can take up to 12 weeks of <strong>neonatal care leave</strong>{" "}on top of other leave. The leave is a
          day-one right; neonatal care pay, at the same rate as paternity pay, needs 26 weeks&rsquo; service.
        </p>
        <p>This means paternity leave is not used up while your baby is in hospital, and you can take it later.</p>
      </GuideSection>

      <GuideSection id="self-employed" n={11} kicker="Not employed" title="If you are self-employed">
        <p>
          Paternity leave and pay are only for employees. Self-employed partners do not get Statutory Paternity Pay, though a
          self-employed mother may get Maternity Allowance. If your household income falls while you take time off, Universal
          Credit may help.
        </p>
      </GuideSection>

      <GuideSection id="patterns" n={12} kicker="Planning" title="Three ways to plan your two weeks">
        <CompareCards
          columns={[
            {
              name: "Two weeks at the birth",
              rows: [
                { label: "When", value: "Straight after the birth" },
                { label: "Good for", value: "Recovery, especially after a caesarean" },
                { label: "Watch", value: "No time saved for later" },
              ],
            },
            {
              name: "One week now, one later",
              rows: [
                { label: "When", value: "Birth, then a later week within 52 weeks" },
                { label: "Good for", value: "When a relative's help ends, or your partner returns to work" },
                { label: "Watch", value: "28 days' notice for each week" },
              ],
            },
          ]}
        />
        <p>
          A third option is to save both weeks for when your partner goes back to work, taking holiday at the birth instead.
          That gives the baby more time with a parent at home, but means the time at the birth is on holiday rather than
          paternity leave.
        </p>
      </GuideSection>

      <GuideSection id="holiday" n={13} kicker="More time" title="Paternity leave and holiday together">
        <p>
          Adding holiday to paternity leave is the simplest way to get more time at home on full pay. A full-time employee with
          28 days of holiday who adds a week of annual leave to two weeks of paternity leave gets three weeks off, one of them on
          full pay.
        </p>
        <WorkedExample
          title="A £35,000 salary: two weeks of paternity leave plus one week of holiday"
          steps={[
            { label: "Two weeks of SPP", value: "£388.64" },
            { label: "One week of holiday at full pay", value: "£673.08" },
          ]}
          total={{ label: "Pay for three weeks off", value: "£1,061.72" }}
        />
        <p>Your employer must agree holiday dates, so book early.</p>
      </GuideSection>

      <GuideSection id="adoption" n={14} kicker="Other families" title="Adopters and surrogacy">
        <p>
          When a couple adopts, one partner takes adoption leave and the other can take paternity leave, whatever their sex.
          Notice runs from the date you are told you have been matched with a child. For adoption from overseas, leave runs from
          the date the child arrives in the UK.
        </p>
        <p>
          Intended parents in a surrogacy arrangement can also get paternity leave and pay, if they expect to apply for a
          parental order and meet the usual service and earnings tests.
        </p>
      </GuideSection>

      <GuideSection id="protection" n={15} kicker="Protection" title="Your rights while on leave">
        <ul>
          <li>You keep all your contractual rights except pay, such as holiday building up and a company car.</li>
          <li>You return to the same job after paternity leave.</li>
          <li>You must not be treated unfairly, dismissed or selected for redundancy because you took or asked for the leave.</li>
          <li>Your employer must keep paying pension contributions based on your normal pay while you get SPP, under most schemes.</li>
        </ul>
        <p>
          If you think you have been treated unfairly, raise it with your employer first, then contact Acas for free advice.
          There are strict time limits for employment tribunal claims, so act promptly.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={16} kicker="Benefits" title="Paternity pay and other benefits">
        <p>
          SPP counts as earnings for <a href="/benefits/universal-credit">Universal Credit</a>, so a lower payment that month can mean slightly more UC. A new baby adds a
          child element to the award. The family may also be able to claim:
        </p>
        <ul>
          <li>Child Benefit, at £27.05 a week for a first child;</li>
          <li>a <a href="/benefits/sure-start-maternity-grant">Sure Start Maternity Grant</a>{" "}of £500 for a first child, if you get certain benefits (England and Wales);</li>
          <li><a href="/life/healthy-start">Healthy Start</a>{" "}vouchers, for help with milk, fruit and vegetables on a low income.</li>
        </ul>
        <p>See the <a href="/benefits/child-benefit">Child Benefit calculator</a>.</p>
      </GuideSection>

      <GuideSection id="budget" n={17} kicker="Planning" title="Budgeting for your time off">
        <p>
          On statutory pay alone, a partner earning £35,000 gets £388.64 for two weeks instead of £1,346.15: £957.51 less before
          tax. After Income Tax and National Insurance the gap is smaller, roughly £690 for a basic-rate taxpayer, but still a
          noticeable dip in one month&rsquo;s pay.
        </p>
        <p>Ways to soften it:</p>
        <ul>
          <li>Check your employer&rsquo;s policy: many pay full pay for paternity leave.</li>
          <li>Use holiday for part of the time at home.</li>
          <li>Take the two weeks in different months, so the drop is split over two pay periods.</li>
          <li>Claim Child Benefit straight away, and check Universal Credit if your income is low.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "2 weeks", label: "Paternity leave" },
            { value: "£194.32", label: "Weekly SPP" },
            { value: "90%", label: "Of earnings if lower" },
            { value: "£129", label: "Weekly earnings needed for pay" },
            { value: "26 weeks", label: "Service needed for pay" },
            { value: "Day one", label: "Right to the leave from April 2026" },
            { value: "28 days", label: "Notice for each week" },
            { value: "12 weeks", label: "Extra neonatal care leave" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
