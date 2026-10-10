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

/** Child Benefit — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "How much you get" },
  { id: "who", title: "Who can claim" },
  { id: "older", title: "Children aged 16 to 19" },
  { id: "pension", title: "Child Benefit and your State Pension" },
  { id: "high-income", title: "If you earn over £60,000" },
  { id: "claiming", title: "How to claim" },
  { id: "part-year", title: "Part-year claims" },
  { id: "changes", title: "Changes you must report" },
  { id: "separated", title: "Separated parents and shared care" },
  { id: "other-benefits", title: "Child Benefit and other benefits" },
  { id: "nations", title: "Extra help in Scotland" },
  { id: "worth", title: "What the National Insurance credits are worth" },
  { id: "young-people", title: "When a young person starts work or claims" },
  { id: "moving", title: "Moving to or from the UK" },
  { id: "checklist", title: "A checklist for new parents" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Child Benefit", href: "https://www.gov.uk/child-benefit" },
  { label: "GOV.UK — Child Benefit rates", href: "https://www.gov.uk/child-benefit/what-youll-get" },
  { label: "GOV.UK — Child Benefit for children aged 16 to 19", href: "https://www.gov.uk/child-benefit-16-19" },
  { label: "GOV.UK — High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "GOV.UK — Report a change of circumstances", href: "https://www.gov.uk/report-changes-child-benefit" },
];

export default function ChildBenefitGuide() {
  return (
    <Guide
      kicker="The Child Benefit guide"
      title="Child Benefit in 2026/27"
      intro={
        <>
          Child Benefit is paid to almost anyone bringing up a child in the UK. It is not means-tested, but if either parent
          earns over £60,000 some or all of it is taken back through tax. This guide covers the rates, who can claim, older
          children in education, how it protects your State Pension, and the changes you must report.
        </>
      }
      meta={["2026/27 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>£27.05 a week</strong> for the eldest or only child.
          </li>
          <li>
            <strong>£17.90 a week</strong> for each other child. There is no limit on the number of children.
          </li>
          <li>Paid every four weeks, usually straight into a bank account.</li>
          <li>If either parent&rsquo;s income is over £60,000, the High Income Child Benefit Charge takes some of it back.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£1,406.60", label: "A year for one child" },
            { value: "£2,337.40", label: "A year for two children" },
            { value: "£3,268.20", label: "A year for three children" },
            { value: "3 months", label: "Most a claim can be backdated" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="How much you get">
        <p>The rates rise each April. For the 2026/27 tax year they are:</p>
        <DataTable
          caption="Child Benefit from 6 April 2026"
          head={["Children", "A week", "Every 4 weeks", "A year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", "£27.05", "£108.20", "£1,406.60"],
            ["2", "£44.95", "£179.80", "£2,337.40"],
            ["3", "£62.85", "£251.40", "£3,268.20"],
            ["4", "£80.75", "£323.00", "£4,199.00"],
            ["5", "£98.65", "£394.60", "£5,129.80"],
          ]}
        />
        <Figure label="Child Benefit a year by number of children" caption="Each child after the first adds £930.80 a year.">
          <Bars
            items={[
              { label: "1 child", value: 1406.6 },
              { label: "2 children", value: 2337.4 },
              { label: "3 children", value: 3268.2 },
              { label: "4 children", value: 4199 },
            ]}
          />
        </Figure>
        <p>
          The higher rate goes to the eldest child you claim for. If that child stops qualifying, for example by leaving
          education, the next eldest moves up to the higher rate. Payments are normally made every four weeks on a Monday or
          Tuesday. Single parents and some families on benefits can ask to be paid weekly.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Eligibility" title="Who can claim">
        <p>You can usually claim if you are responsible for a child who is:</p>
        <ul>
          <li>under 16; or</li>
          <li>under 20 and in approved education or training.</li>
        </ul>
        <p>
          You count as responsible if the child lives with you, or if you pay at least the amount of Child Benefit towards
          their upkeep while they live elsewhere. You do not have to be the parent: grandparents, step-parents and other
          relatives can claim. Only one person can get Child Benefit for each child.
        </p>
        <p>
          You normally need to live in the UK. People subject to immigration control, such as those with no recourse to
          public funds, usually cannot claim, though there are exceptions.
        </p>
      </GuideSection>

      <GuideSection id="older" n={4} kicker="Older children" title="Children aged 16 to 19">
        <p>
          Child Benefit stops on 31 August after a child&rsquo;s 16th birthday unless you tell HMRC they are staying in
          approved education or training. It can then continue until they are 20.
        </p>
        <CompareCards
          columns={[
            {
              name: "Counts",
              rows: [
                { label: "Education", value: "A levels, Scottish Highers, T levels, NVQ level 3 and below" },
                { label: "Training", value: "Unpaid approved training, such as Foundation Learning" },
                { label: "Hours", value: "More than 12 hours a week of supervised study" },
              ],
            },
            {
              name: "Does not count",
              rows: [
                { label: "Higher education", value: "University degrees and HNDs" },
                { label: "Paid work", value: "Apprenticeships and jobs paying a wage" },
                { label: "Age", value: "Courses started at 19 or over" },
              ],
            },
          ]}
        />
        <p>
          HMRC writes in the child&rsquo;s last year at school asking whether they are staying on. Reply promptly or the
          payments stop. If a 16 or 17-year-old leaves education, you can usually keep getting Child Benefit for up to 20
          weeks while they register with a careers service or job centre.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={5} kicker="Protecting your pension" title="Child Benefit and your State Pension">
        <p>
          The person named on the Child Benefit claim gets <a href="/uk/tax-and-salary/national-insurance">National Insurance</a>{" "}credits for every week they claim for a child
          under 12. These credits count towards the State Pension, which needs 35 qualifying years for the full amount.
        </p>
        <Callout tone="good" title="Make sure the right parent is named">
          If one parent works and earns enough to get a qualifying year anyway, the claim should be in the name of the parent
          who is at home or earning less than £6,708 a year. Otherwise the credits are wasted.
        </Callout>
        <p>
          Grandparents and other family members under <a href="/uk/investing/state-pension-age">State Pension age</a>{" "}who look after a child under 12 while the parents work
          can apply to transfer these credits with Specified Adult Childcare credits.
        </p>
      </GuideSection>

      <GuideSection id="high-income" n={6} kicker="Tax charge" title="If you earn over £60,000">
        <p>
          If either parent has adjusted net income over <strong>£60,000</strong>, the one with the higher income pays the High
          Income Child Benefit Charge. It takes back 1% of the Child Benefit for every £200 of income above £60,000, so all of
          it is repaid at £80,000.
        </p>
        <DataTable
          caption="Charge for a family with two children, 2026/27"
          head={["Higher earner's income", "Charge", "You keep"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£60,000", "£0", "£2,337.40"],
            ["£65,000", "£584.35", "£1,753.05"],
            ["£70,000", "£1,168.70", "£1,168.70"],
            ["£75,000", "£1,753.05", "£584.35"],
            ["£80,000", "£2,337.40", "£0"],
          ]}
        />
        <p>
          Pension contributions and Gift Aid reduce adjusted net income, so they can reduce or remove the charge. The{" "}
          <a href="/uk/benefits/high-income-child-benefit">High Income Child Benefit Charge calculator</a> shows the effect for your
          income.
        </p>
        <Callout title="Still claim if you will repay it all">
          Above £80,000 you can claim and choose not to receive payments. The parent at home still gets National Insurance
          credits, and the child is automatically given a National Insurance number at 16.
        </Callout>
      </GuideSection>

      <GuideSection id="claiming" n={7} kicker="Getting started" title="How to claim">
        <Timeline
          items={[
            { when: "After the birth", what: "Register the birth", detail: "You need the birth registered before you can claim for a newborn, except in some cases where you claim straight away." },
            { when: "Soon after", what: "Claim online or through the HMRC app", detail: "Most new claims can be made online. You need your National Insurance number and bank details." },
            { when: "Within 12 weeks", what: "First payment", detail: "New claims are usually processed within a few weeks. The first payment can include arrears back to the claim date." },
          ]}
        />
        <p>
          A claim can only be backdated <strong>three months</strong>. If you claim when a baby is five months old, you lose
          two months of payments. For one child that is about £235.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={8} kicker="Part of a year" title="Part-year claims">
        <p>
          Child Benefit is paid weekly, so a claim that starts or stops during the tax year only covers the weeks you are
          entitled to it.
        </p>
        <WorkedExample
          title="A first baby born in November"
          steps={[
            { label: "Weeks of the tax year left after the birth", value: "20" },
            { label: "Rate for an only child", value: "£27.05 a week" },
          ]}
          total={{ label: "Child Benefit for 2026/27", value: "£541.00" }}
        />
        <p>
          Part-year claims matter for the High Income Child Benefit Charge too: the charge is a percentage of the Child Benefit
          actually received in the tax year, not a full year&rsquo;s worth.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={9} kicker="Keep it right" title="Changes you must report">
        <p>Tell the Child Benefit Office straight away if:</p>
        <ul>
          <li>a child aged 16 to 19 leaves approved education or training, or starts paid work of 24 hours a week or more;</li>
          <li>a child goes to live with someone else, goes into care or custody, or goes abroad for more than eight weeks;</li>
          <li>you get married, start living with a partner, separate or your partner dies;</li>
          <li>you or your partner&rsquo;s income goes over £60,000, if you are not already paying the charge;</li>
          <li>you change bank account, address or name.</li>
        </ul>
        <p>
          Overpayments have to be repaid, and failing to report a change can lead to a penalty. Changes can be reported online or
          through the HMRC app.
        </p>
      </GuideSection>

      <GuideSection id="separated" n={10} kicker="Families" title="Separated parents and shared care">
        <p>
          Only one person can claim for each child, even if the child splits their time between two homes. Parents need to agree
          who claims; if they cannot, HMRC decides, usually in favour of the parent the child lives with most.
        </p>
        <p>
          With two or more children, <a href="/uk/benefits/child-maintenance">separated parents</a>{" "}can each claim for different children. Each household then gets the
          higher eldest-child rate for its own eldest, which can mean slightly more in total than one parent claiming for all.
        </p>
      </GuideSection>

      <GuideSection id="other-benefits" n={11} kicker="Interactions" title="Child Benefit and other benefits">
        <ul>
          <li>
            <strong>Universal Credit:</strong> Child Benefit is not counted as income, so it does not reduce your Universal
            Credit.
          </li>
          <li>
            <strong>The <a href="/uk/benefits/benefit-cap">benefit cap</a>:</strong> Child Benefit does count towards the benefit cap, which limits the total some
            working-age households can get.
          </li>
          <li>
            <strong>Guardian&rsquo;s Allowance:</strong>{" "}if you are bringing up a child whose parents have died, you may also
            get Guardian&rsquo;s Allowance, but you must be getting Child Benefit for that child.
          </li>
          <li>
            <strong>Free childcare and <a href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</a>:</strong> separate schemes with their own rules; Child Benefit does
            not affect them.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="nations" n={12} kicker="Scotland" title="Extra help in Scotland">
        <p>
          Child Benefit is the same across the UK. Families in Scotland who get certain benefits, such as Universal Credit, may
          also get the Scottish Child Payment for each child under 16, paid by Social Security Scotland. It is a separate claim
          and does not affect Child Benefit.
        </p>
      </GuideSection>

      <GuideSection id="worth" n={13} kicker="Long-term value" title="What the National Insurance credits are worth">
        <p>
          The full new State Pension is £241.30 a week in 2026/27 and needs 35 qualifying years. Each year therefore adds about
          £6.89 a week, or roughly <strong>£358.50 a year for the rest of your retirement</strong>, at today&rsquo;s rates.
        </p>
        <p>
          A parent who stays at home for five years while their children are small, and is not named on the Child Benefit
          claim, could miss five qualifying years: about £1,790 a year of State Pension, every year, for life. Filling the gaps
          later with voluntary Class 3 contributions costs far more than making sure the right parent is on the claim now.
        </p>
        <Callout title="Already claiming in the wrong name?">
          You can change the claimant to the other parent. Credits can sometimes be transferred for past years too; contact the
          Child Benefit Office.
        </Callout>
      </GuideSection>

      <GuideSection id="young-people" n={14} kicker="Older children" title="When a young person starts work or claims">
        <p>Child Benefit for a 16 to 19-year-old in approved education usually stops if they:</p>
        <ul>
          <li>start working 24 hours a week or more, outside their course;</li>
          <li>claim Universal Credit, tax credits or certain other benefits in their own right;</li>
          <li>start an apprenticeship that pays a wage;</li>
          <li>leave the course, or move on to university or other higher education.</li>
        </ul>
        <p>
          If a child dies, Child Benefit continues for up to eight weeks afterwards, or until what would have been their 16th
          or 20th birthday if sooner. Tell the Child Benefit Office as soon as you can; they will explain what happens next.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={15} kicker="Abroad" title="Moving to or from the UK">
        <p>
          Child Benefit normally stops if you or your child leave the UK for more than eight weeks, or 12 weeks in some cases,
          such as for medical treatment or after a bereavement. Tell the Child Benefit Office before you go.
        </p>
        <p>
          If you move to the UK, you can usually claim once you are living here and meet the residence rules. Some people with
          settled or pre-settled status, refugees and those from countries with social security agreements can claim straight
          away; others need to have lived here for a period first.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={16} kicker="Quick list" title="A checklist for new parents">
        <ol>
          <li>Register the birth within 42 days in England and Wales, or 21 days in Scotland.</li>
          <li>Claim Child Benefit online or in the HMRC app, in the name of the parent who earns less.</li>
          <li>If either of you earns over £60,000, decide whether to take the payments or keep the claim and stop them.</li>
          <li>Check whether you can get Universal Credit, a <a href="/uk/benefits/sure-start-maternity-grant">Sure Start Maternity Grant</a>{" "}or Healthy Start.</li>
          <li>Diary the date your child turns 9 months, when working parent childcare hours can start.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£27.05", label: "Eldest or only child, a week" },
            { value: "£17.90", label: "Each other child, a week" },
            { value: "4 weeks", label: "How often it is paid" },
            { value: "3 months", label: "Backdating limit" },
            { value: "12", label: "Child's age until which NI credits are given" },
            { value: "£60,000", label: "Tax charge starts" },
            { value: "£80,000", label: "All repaid through the charge" },
            { value: "20", label: "Upper age in approved education" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
