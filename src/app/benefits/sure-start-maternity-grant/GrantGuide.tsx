import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Sure Start Maternity Grant and Best Start Grant — the guide. Figures from src/lib/benefits/families.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What the grant is" },
  { id: "benefits", title: "Qualifying benefits" },
  { id: "first-child", title: "The first-child rule" },
  { id: "exceptions", title: "Exceptions to the first-child rule" },
  { id: "examples", title: "Worked examples" },
  { id: "when", title: "When to claim" },
  { id: "how", title: "How to claim" },
  { id: "scotland", title: "Scotland: the Best Start Grant" },
  { id: "spending", title: "What people spend it on" },
  { id: "other-help", title: "Other help for a new baby" },
  { id: "refused", title: "If you are refused" },
  { id: "partners", title: "Partners, couples and who claims" },
  { id: "evidence", title: "The evidence you need" },
  { id: "timing-uc", title: "Timing the grant with Universal Credit" },
  { id: "budget", title: "Budgeting for a new baby" },
  { id: "nations-differences", title: "Differences across the UK" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Sure Start Maternity Grant", href: "https://www.gov.uk/sure-start-maternity-grant" },
  { label: "GOV.UK — Sure Start Maternity Grant: eligibility", href: "https://www.gov.uk/sure-start-maternity-grant/eligibility" },
  { label: "mygov.scot — Pregnancy and Baby Payment", href: "https://www.mygov.scot/pregnancy-and-baby-payment" },
  { label: "nidirect — Sure Start Maternity Grant", href: "https://www.nidirect.gov.uk/articles/sure-start-maternity-grant" },
  { label: "GOV.UK — Healthy Start", href: "https://www.healthystart.nhs.uk/" },
];

export default function GrantGuide() {
  return (
    <Guide
      kicker="The maternity grant guide"
      title="Sure Start Maternity Grant and Best Start Grant"
      intro={
        <>
          The Sure Start Maternity Grant is a one-off £500 payment to help with the costs of a new baby, for families on a low income. Scotland
          has its own, more generous version, the Pregnancy and Baby Payment of the Best Start Grant. This guide explains who can get each, the
          first-child rule and its exceptions, when to claim and what other help is available.
        </>
      }
      meta={["2026/27 rules", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>England, Wales and Northern Ireland: <strong>£500</strong> once, for your first child, if you get a qualifying benefit such as Universal Credit.</li>
          <li>Scotland: <strong>£796.65</strong> for a first child or <strong>£398.35</strong> for later children, from the Best Start Grant.</li>
          <li>Claim from 11 weeks before the due date (24 weeks of pregnancy in Scotland) until the baby is 6 months old.</li>
          <li>It does not have to be paid back and does not affect other benefits.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£500", label: "Sure Start Maternity Grant" },
            { value: "£796.65", label: "Best Start Grant, first child (Scotland)" },
            { value: "11 weeks", label: "Before due date: earliest claim" },
            { value: "6 months", label: "After birth: latest claim" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What the grant is">
        <p>
          The grant comes from the Social Fund, run by the DWP. It is meant for things like a pram, cot, car seat, clothes and nappies. It is a
          grant, not a loan, so you never pay it back, and it is ignored as income for Universal Credit and other benefits. It is tax-free.
        </p>
        <p>
          You can claim if you are expecting a baby, have had a baby in the last 6 months, or have adopted, become the guardian of, or had a
          parental order for a child under 12 months.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={3} kicker="Eligibility" title="Qualifying benefits">
        <p>You or your partner must get one of these:</p>
        <ul>
          <li>Universal Credit;</li>
          <li><a href="/benefits/pension-credit">Pension Credit</a>;</li>
          <li>income-based Jobseeker&rsquo;s Allowance;</li>
          <li>income-related Employment and Support Allowance;</li>
          <li>Income Support.</li>
        </ul>
        <p>
          New Style JSA and ESA, Child Benefit and <a href="/benefits/pip-points">PIP</a>{" "}do not count on their own. If you are waiting for a decision on a qualifying benefit, claim
          the grant anyway within the time limit.
        </p>
        <Callout title="Under 16 or a dependent teenager">
          If you are under 16, or under 20 and your parents get a qualifying benefit for you, you may be able to claim on the strength of
          their benefit.
        </Callout>
      </GuideSection>

      <GuideSection id="first-child" n={4} kicker="The main rule" title="The first-child rule">
        <p>
          In England, Wales and Northern Ireland the grant is usually only paid if there are no other children under 16 in your family. Children
          count if they live with you, including stepchildren and children of your partner. The rule was introduced in 2011 to target the grant
          at the costs of a first baby.
        </p>
      </GuideSection>

      <GuideSection id="exceptions" n={5} kicker="Exceptions" title="Exceptions to the first-child rule">
        <ul>
          <li><strong>Multiple births:</strong> if you already have a child under 16 and are expecting twins or more, you can get £500 for each baby beyond the first.</li>
          <li><strong>No other children, multiple birth:</strong> £500 for each baby, so £1,000 for twins.</li>
          <li><strong>Kinship care and other families&rsquo; children:</strong> some children under 16 do not count, for example if you look after them under a kinship care arrangement. GOV.UK lists the exceptions.</li>
        </ul>
        <p>The rules on exceptions are detailed; if you think one applies, claim and explain your circumstances on the form.</p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="First baby, on Universal Credit, England"
          steps={[
            { label: "Qualifying benefit", value: "Yes" },
            { label: "Other children under 16", value: "None" },
          ]}
          total={{ label: "Sure Start Maternity Grant", value: "£500" }}
        />
        <WorkedExample
          title="Expecting twins with a 4-year-old at home, on Universal Credit"
          steps={[
            { label: "Other child under 16", value: "Yes, so the first baby does not qualify" },
            { label: "Second twin", value: "£500" },
          ]}
          total={{ label: "Sure Start Maternity Grant", value: "£500" }}
        />
        <WorkedExample
          title="Second baby in Scotland, on Universal Credit"
          steps={[{ label: "Pregnancy and Baby Payment, later child", value: "£398.35" }]}
          total={{ label: "Best Start Grant", value: "£398.35" }}
        />
      </GuideSection>

      <GuideSection id="when" n={7} kicker="Time limits" title="When to claim">
        <Timeline
          items={[
            { when: "11 weeks before the due date", what: "Earliest claim (England, Wales, NI)", detail: "Around 29 weeks of pregnancy." },
            { when: "24 weeks of pregnancy", what: "Earliest claim (Scotland)", detail: "16 weeks before the due date." },
            { when: "Baby is born", what: "Claim still open", detail: "You need the birth certificate or a midwife's form." },
            { when: "Baby is 6 months old", what: "Last day to claim", detail: "Late claims are refused, so do not wait." },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={8} kicker="Process" title="How to claim">
        <p>
          In England and Wales, fill in form SF100, download it from GOV.UK and send it to the DWP. A health professional such as your midwife or
          health visitor must sign part of it to confirm the due date or birth. In Northern Ireland, use form SF100 from nidirect. In Scotland,
          apply online through Social Security Scotland, which also checks if you can get Scottish Child Payment at the same time.
        </p>
        <p>Payment usually arrives within a few weeks of the DWP getting the completed form.</p>
      </GuideSection>

      <GuideSection id="scotland" n={9} kicker="Scotland" title="Scotland: the Best Start Grant">
        <CompareCards
          columns={[
            {
              name: "Sure Start (England, Wales, NI)",
              rows: [
                { label: "First child", value: "£500" },
                { label: "Later children", value: "Nothing (unless a multiple birth)" },
                { label: "Claim from", value: "11 weeks before due date" },
              ],
            },
            {
              name: "Best Start Grant (Scotland)",
              rows: [
                { label: "First child", value: "£796.65" },
                { label: "Later children", value: "£398.35" },
                { label: "Claim from", value: "24 weeks of pregnancy" },
              ],
            },
          ]}
        />
        <p>
          Scotland adds £398.35 for each extra baby in a multiple birth, and pays two more grants later: £331.95 for an Early Learning Payment
          around age 2 to 3½ and £331.95 for a School Age Payment when the child starts school. Parents under 18, or 18 and 19-year-olds who
          depend on their parents, do not need a qualifying benefit.
        </p>
      </GuideSection>

      <GuideSection id="spending" n={10} kicker="Practical" title="What people spend it on">
        <p>
          There are no rules on how you spend it. A typical newborn shopping list includes a cot or Moses basket with a new mattress, a pram or
          pushchair, a rear-facing car seat for the journey home from hospital, sleepsuits and vests, bedding, bottles if you are not breastfeeding,
          and nappies. Second-hand prams and clothes are good value; buy car seats and mattresses new for safety.
        </p>
      </GuideSection>

      <GuideSection id="other-help" n={11} kicker="Other help" title="Other help for a new baby">
        <ul>
          <li><a href="/life/healthy-start">Healthy Start</a>: £4.65 a week in pregnancy and £9.30 a week for a baby under 1, on Universal Credit with low earnings.</li>
          <li><a href="/benefits/child-benefit">Child Benefit</a>: £27.05 a week for the first child.</li>
          <li>Universal Credit&rsquo;s child element for every child, since the two-child limit ended in April 2026.</li>
          <li>Free prescriptions and NHS dental care during pregnancy and for a year after the birth.</li>
          <li><a href="/benefits/maternity-pay">Maternity pay or Maternity Allowance</a> if you have been working.</li>
        </ul>
      </GuideSection>

      <GuideSection id="refused" n={12} kicker="Disputes" title="If you are refused">
        <p>
          If the DWP refuses your claim, ask for a mandatory reconsideration within one month of the decision, explaining why you think you
          qualify. If it still says no, you can appeal to an independent tribunal. Common reasons for refusal are claiming too late, a missing health
          professional&rsquo;s signature, and the first-child rule, so check these first.
        </p>
      </GuideSection>

      <GuideSection id="partners" n={13} kicker="Who claims" title="Partners, couples and who claims">
        <p>
          Either the mother or her partner can claim, as long as one of you gets a qualifying benefit. If the mother is the one getting the
          benefit, she claims; if only her partner gets it, the partner can claim instead. Only one grant is paid for each baby, however many
          people could claim.
        </p>
        <p>
          You can also claim if you are not the parent but are responsible for a baby under 12 months, for example if you have a child
          arrangements order or are a guardian, and you get a qualifying benefit. In those cases the form asks for evidence of the
          arrangement rather than a health professional&rsquo;s signature.
        </p>
      </GuideSection>

      <GuideSection id="evidence" n={14} kicker="Evidence" title="The evidence you need">
        <p>
          Most claims are decided on the form itself. Before you send it, check that you have:
        </p>
        <ul>
          <li>part B of form SF100 signed by a midwife, doctor or health visitor, confirming the due date or the birth;</li>
          <li>your National Insurance number, and your partner&rsquo;s if you have one;</li>
          <li>details of the qualifying benefit and who gets it;</li>
          <li>for an <a href="/benefits/adoption-pay">adoption</a>{" "}or guardianship, a copy of the court order or the adoption agency&rsquo;s paperwork;</li>
          <li>your bank details, so the money can be paid straight into your account.</li>
        </ul>
        <p>
          If you claim before the birth, you do not need to send the birth certificate afterwards. Keep a copy of everything you send.
        </p>
      </GuideSection>

      <GuideSection id="timing-uc" n={15} kicker="Universal Credit" title="Timing the grant with Universal Credit">
        <p>
          Many families claim Universal Credit for the first time during pregnancy, for example when maternity pay is lower than normal pay. If
          you are waiting for your first Universal Credit decision, you can still send the Sure Start form within the time limit: the DWP will
          check your entitlement once the Universal Credit claim is decided. Do not wait until Universal Credit is paid, because the 6-month
          deadline after the birth is strict.
        </p>
        <p>
          When the baby arrives, report the birth to Universal Credit through your journal straight away. Your award gains a child element from
          the start of that assessment period, and you may also qualify for Healthy Start and help with <a href="/benefits/childcare-costs">childcare costs</a>.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={16} kicker="Planning" title="Budgeting for a new baby">
        <p>
          £500 helps, but the first year with a baby usually costs more. A rough plan for the months around the birth:
        </p>
        <ul>
          <li>buy the essentials first: somewhere safe to sleep, a car seat if you drive, clothes, nappies and feeding equipment;</li>
          <li>ask family and friends for second-hand prams, cots and clothes, and check local baby banks, which give free equipment to families referred by midwives and health visitors;</li>
          <li>work out your income during leave with the <a href="/benefits/maternity-pay">maternity pay calculator</a>, and check what Universal Credit adds;</li>
          <li>claim Child Benefit as soon as the baby is born, even if you earn over £60,000, to protect your State Pension record.</li>
        </ul>
      </GuideSection>

      <GuideSection id="nations-differences" n={17} kicker="Nations" title="Differences across the UK">
        <p>
          The Sure Start Maternity Grant is the same £500 in England, Wales and Northern Ireland, with the same first-child rule. In Northern Ireland it
          is administered by the Department for Communities rather than the DWP. Scotland replaced it in 2018 with the Best Start Grant, which pays more,
          pays for later children too, and adds payments when the child starts nursery and school.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Maternity grants, 2026/27"
          head={["Grant", "Amount"]}
          rows={[
            ["Sure Start Maternity Grant", "£500 per eligible baby"],
            ["Best Start Grant: first child", "£796.65"],
            ["Best Start Grant: later children", "£398.35"],
            ["Best Start Grant: extra baby in a multiple birth", "£398.35"],
            ["Early Learning and School Age Payments (Scotland)", "£331.95 each"],
            ["Claim window", "From 11 weeks before due date (24 weeks pregnant in Scotland) to 6 months after"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
