import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Council Tax Reduction — the guide. Figures from src/lib/benefits/housing-support.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What Council Tax Reduction is" },
  { id: "schemes", title: "Which scheme applies to you" },
  { id: "how", title: "How the reduction is worked out" },
  { id: "applicable", title: "Your applicable amount" },
  { id: "income", title: "Income and savings" },
  { id: "non-dependants", title: "Other adults in your home" },
  { id: "england-working", title: "Working-age schemes in England" },
  { id: "examples", title: "Worked examples" },
  { id: "universal-credit", title: "Universal Credit and Council Tax Reduction" },
  { id: "other-discounts", title: "Other discounts and exemptions" },
  { id: "second-adult", title: "Second adult rebate" },
  { id: "claiming", title: "How to claim" },
  { id: "appeals", title: "If you disagree" },
  { id: "bands", title: "Council tax bands and your bill" },
  { id: "hardship", title: "Extra help in hardship" },
  { id: "arrears", title: "If you fall behind" },
  { id: "changes", title: "Changes you must report" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Apply for Council Tax Reduction", href: "https://www.gov.uk/apply-council-tax-reduction" },
  { label: "Legislation — Council Tax Reduction Schemes (Prescribed Requirements) (England) (Amendment) Regulations 2026", href: "https://www.legislation.gov.uk/uksi/2026/27/made" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.WALES — Council Tax Reduction", href: "https://www.gov.wales/council-tax-reduction" },
  { label: "mygov.scot — Council Tax", href: "https://www.mygov.scot/council-tax" },
  { label: "GOV.UK — Council Tax discounts", href: "https://www.gov.uk/council-tax/discounts-for-disabled-people" },
];

export default function CtrGuide() {
  return (
    <Guide
      kicker="The Council Tax Reduction guide"
      title="Council Tax Reduction in 2026/27"
      intro={
        <>
          Council Tax Reduction, also called Council Tax Support, cuts your bill if you are on a low income. Pensioners and everyone in Wales
          and Scotland follow national rules; working-age people in England follow their council&rsquo;s own scheme. This guide explains how
          the reduction is worked out and how to make sure you get everything you are entitled to.
        </>
      }
      meta={["2026/27 rules", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Council Tax Reduction can pay up to all of your council tax if you are on a low income or benefits.</li>
          <li>It is claimed from your council, separately from Universal Credit or Pension Credit.</li>
          <li>
            Pensioners on Pension Credit Guarantee Credit get their <strong>whole bill</strong> covered.
          </li>
          <li>
            Otherwise the reduction falls by <strong>20p for every £1</strong> of weekly income above your applicable amount.
          </li>
          <li>Working-age people in England often get less than 100%, because many councils cap support.</li>
          <li>It is separate from the single person discount, and you can get both.</li>
        </ul>
        <KeyStats
          items={[
            { value: "100%", label: "Most a pensioner can get" },
            { value: "20%", label: "Usual taper on extra income" },
            { value: "£16,000", label: "Usual savings limit" },
            { value: "3", label: "Nations with schemes: England, Wales, Scotland" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What Council Tax Reduction is">
        <p>
          Council Tax Reduction replaced Council Tax Benefit in April 2013. It is not paid to you as money: your council takes it off your bill,
          so you have less to pay in each instalment. If you are entitled to the full amount, you pay nothing.
        </p>
        <p>
          It is run by councils in England, Wales and Scotland. Northern Ireland has domestic rates instead of council tax, with help through
          Housing Benefit for rates or rate relief, so it is not covered here.
        </p>
      </GuideSection>

      <GuideSection id="schemes" n={3} kicker="Rules" title="Which scheme applies to you">
        <CompareCards
          columns={[
            {
              name: "National rules",
              rows: [
                { label: "Pensioners in England", value: "Set by the government" },
                { label: "Everyone in Wales", value: "Welsh national scheme" },
                { label: "Everyone in Scotland", value: "Scottish national scheme" },
                { label: "Most you can get", value: "100% of the bill" },
              ],
            },
            {
              name: "Local rules",
              rows: [
                { label: "Working age in England", value: "Set by each council" },
                { label: "Most you can get", value: "Often 70% to 100%" },
                { label: "Taper", value: "Usually 20%, sometimes income bands" },
                { label: "Savings limit", value: "Often £16,000, sometimes lower" },
              ],
            },
          ]}
        />
        <p>
          You count as a pensioner if you, or both of you if a couple, have reached State Pension age and you do not get Universal Credit. The
          calculator uses national rules where they apply, and lets you set your council&rsquo;s maximum and taper for working-age schemes in
          England.
        </p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="The method" title="How the reduction is worked out">
        <ol>
          <li>
            <strong>Weekly bill.</strong> Your yearly council tax, after discounts, is turned into a weekly amount: the year&rsquo;s bill × 7 ÷
            365. A £2,000 bill is £38.36 a week.
          </li>
          <li>
            <strong>Maximum reduction.</strong> The weekly bill (or the share your council allows), less a deduction for each other adult who lives
            with you.
          </li>
          <li>
            <strong>Applicable amount.</strong> The weekly needs figure for your household, the same as for Housing Benefit.
          </li>
          <li>
            <strong>Taper.</strong> If your weekly income is above the applicable amount, 20% of the difference comes off the maximum.
          </li>
        </ol>
        <p>
          If you get Pension Credit Guarantee Credit, income-based Jobseeker&rsquo;s Allowance, income-related Employment and Support
          Allowance or Income Support, you get the maximum reduction without an income check.
        </p>
      </GuideSection>

      <GuideSection id="applicable" n={5} kicker="Your needs" title="Your applicable amount">
        <DataTable
          caption="Applicable amounts used by the pensioner and national schemes, a week, 2026/27"
          head={["Part", "Amount"]}
          numeric={[1]}
          rows={[
            ["Single pensioner (reached State Pension age from April 2021)", "£238.00"],
            ["Pensioner couple", "£363.25"],
            ["Single, working age, 25 or over", "£95.55"],
            ["Couple, working age", "£150.15"],
            ["Each child", "£87.88"],
            ["Disability premium (working age): single / couple", "£44.85 / £64.00"],
            ["Severe disability premium", "£86.05"],
            ["Carer premium", "£48.15"],
          ]}
        />
        <p>
          Pensioners who reached State Pension age before April 2021 have a higher allowance: £256.00 single or £383.35 for a couple. Scotland
          and Wales use figures that closely follow these.
        </p>
      </GuideSection>

      <GuideSection id="income" n={6} kicker="Means test" title="Income and savings">
        <p>
          Income is counted much as it is for Housing Benefit. State Pension, private pensions, earnings after tax and Carer&rsquo;s Allowance
          count. Child Benefit, child maintenance, PIP, DLA and Attendance Allowance are ignored. A small part of earnings is disregarded: £5 for
          a single person, £10 for a couple, £20 with a disability or carer premium and £25 for a lone parent.
        </p>
        <p>
          Savings above £10,000 for pensioners (or £6,000 for working age) are treated as giving £1 a week for each £500 (or £250). Over £16,000
          you usually get nothing, unless you are on Pension Credit Guarantee Credit.
        </p>
      </GuideSection>

      <GuideSection id="non-dependants" n={7} kicker="Other adults" title="Other adults in your home">
        <p>
          If a grown-up son, daughter or relative lives with you, the council takes a fixed weekly amount off your reduction. For pensioners in
          England the 2026/27 figures are:
        </p>
        <DataTable
          caption="Non-dependant deductions from Council Tax Reduction, pensioners in England, a week"
          head={["Their situation", "Deduction"]}
          numeric={[1]}
          rows={[
            ["Not working, or gross income under £279", "£5.20"],
            ["£279 to £484.99", "£10.60"],
            ["£485 to £604.99", "£13.30"],
            ["£605 or more", "£15.95"],
            ["On Pension Credit, or under 25 on Universal Credit without earnings", "£0"],
          ]}
        />
        <p>
          No deductions are made if you or your partner get Attendance Allowance, PIP daily living or DLA care, or are registered blind. Councils&rsquo;
          working-age schemes and the Welsh and Scottish schemes set their own amounts, often similar or lower.
        </p>
      </GuideSection>

      <GuideSection id="england-working" n={8} kicker="Local schemes" title="Working-age schemes in England">
        <p>
          Since 2013 English councils have designed their own working-age schemes. The most common changes from the pensioner rules are:
        </p>
        <ul>
          <li>a minimum payment, so everyone pays something: for example the scheme covers at most 75% or 80% of the bill;</li>
          <li>income bands instead of a taper, especially for people on Universal Credit;</li>
          <li>a lower savings limit, such as £6,000 or £10,000;</li>
          <li>a cap based on a lower council tax band, so people in larger homes get help only up to the band B or C bill.</li>
        </ul>
        <p>
          Search for your council&rsquo;s &ldquo;council tax support scheme&rdquo; to find its rules, and set the maximum and taper under More
          options in the calculator.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={9} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="A single pensioner in England with a £1,500 bill (after the single person discount)"
          steps={[
            { label: "Weekly bill: £1,500 × 7 ÷ 365", value: "£28.77" },
            { label: "Income: pensions £301.30 + £4 tariff income", value: "£305.30" },
            { label: "Excess over £238.00", value: "£67.30" },
            { label: "20% of the excess", value: "−£13.46" },
            { label: "Weekly reduction", value: "£15.31" },
          ]}
          total={{ label: "Reduction a year", value: "£798.16" }}
        />
        <p>They have £701.84 left to pay for the year.</p>
        <WorkedExample
          title="A pensioner couple on Guarantee Credit, £2,000 bill, son earning £420 a week"
          steps={[
            { label: "Weekly bill", value: "£38.36" },
            { label: "Non-dependant deduction", value: "−£10.60" },
            { label: "Income", value: "Not checked" },
          ]}
          total={{ label: "Reduction a year", value: "£1,447.29" }}
        />
        <WorkedExample
          title="A working lone parent with one child and a £2,000 bill"
          steps={[
            { label: "Applicable amount: £95.55 + £87.88", value: "£183.43" },
            { label: "Earnings £200 less £25 disregard", value: "£175.00" },
            { label: "Income below the applicable amount", value: "No taper" },
            { label: "In Wales or Scotland: up to 100%", value: "£2,000 a year" },
          ]}
          total={{ label: "In England with an 80% scheme", value: "£1,600 a year" }}
        />
      </GuideSection>

      <GuideSection id="universal-credit" n={10} kicker="Universal Credit" title="Universal Credit and Council Tax Reduction">
        <p>
          Universal Credit has no council tax element, so you must claim Council Tax Reduction from your council as well. Many councils now use
          your Universal Credit award and earnings directly, with simple income bands: for example, 100% support if your income is very low, then
          stepping down to 75%, 50% or 25%.
        </p>
        <p>
          Because of this, the calculator&rsquo;s figure for working-age people on Universal Credit is a guide only. Your council&rsquo;s scheme
          decides.
        </p>
      </GuideSection>

      <GuideSection id="other-discounts" n={11} kicker="More help" title="Other discounts and exemptions">
        <ul>
          <li>
            <strong>Single person discount:</strong> 25% off if you are the only adult. See the{" "}
            <a href="/property/single-person-discount">single person discount calculator</a>.
          </li>
          <li>
            <strong>Disabled band reduction:</strong> your bill is charged one band lower if your home has been adapted for a disabled person.
          </li>
          <li>
            <strong>Severe mental impairment:</strong> people with dementia or a similar condition who get a qualifying benefit are ignored when
            counting adults, and may be exempt if they live alone.
          </li>
          <li>
            <strong>Students:</strong> homes where everyone is a full-time student are exempt. See the{" "}
            <a href="/students/student-council-tax">student council tax calculator</a>.
          </li>
          <li>
            <strong>Carers:</strong> some live-in carers are ignored when counting adults.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="second-adult" n={12} kicker="Pensioners" title="Second adult rebate">
        <p>
          In England, a pensioner whose own income is too high for Council Tax Reduction may still get up to 25% off if another adult on a low
          income lives with them, such as a grown-up child on benefits. This is called the second adult rebate or alternative maximum reduction.
          Councils award whichever is higher. It is not included in the calculator, so ask your council if it might apply.
        </p>
      </GuideSection>

      <GuideSection id="claiming" n={13} kicker="Getting it" title="How to claim">
        <Timeline
          items={[
            { when: "Step 1", what: "Apply to your council", detail: "Most councils have an online form, often combined with Housing Benefit." },
            { when: "Step 2", what: "Send evidence", detail: "Proof of income, savings, identity and who lives with you." },
            { when: "Step 3", what: "New bill", detail: "The council sends a revised bill with the reduction taken off." },
          ]}
        />
        <p>
          Claim as soon as your income drops. Pensioners can have a claim backdated by up to 3 months; working-age backdating depends on your
          council&rsquo;s scheme. Keep paying the bill you have while you wait, so you do not fall into arrears.
        </p>
        <Callout tone="warn" title="Arrears move fast">
          If you miss an instalment, the council can ask for the whole year&rsquo;s bill at once. Contact them early if you are struggling.
        </Callout>
      </GuideSection>

      <GuideSection id="appeals" n={14} kicker="Challenging a decision" title="If you disagree">
        <p>
          Write to your council first and ask it to look again. If you still disagree, you can appeal to the Valuation Tribunal in England, the
          Valuation Tribunal for Wales, or the Council Tax Reduction Review Panel in Scotland. Appeals are free.
        </p>
      </GuideSection>

      <GuideSection id="bands" n={15} kicker="Your bill" title="Council tax bands and your bill">
        <p>
          Your bill depends on the band your home is in and what your council charges for that band. England and Scotland use bands A to H,
          based on 1991 values; Wales uses bands A to I, based on 2003 values. Band D is the reference point: band A pays six-ninths of the band D
          charge and band H pays twice it.
        </p>
        <p>
          Because Council Tax Reduction is worked out on your actual bill, a higher band means more help if your income is low. Some English
          councils limit working-age support to the bill for a lower band, so check your scheme if you live in a larger home. You can estimate
          your bill with our <a href="/property/council-tax-bands">council tax bands calculator</a>.
        </p>
        <Callout title="Think your band is wrong?">
          You can ask the Valuation Office Agency (England and Wales) or your local assessor (Scotland) to check it. If your band goes down, the
          council refunds the overpayment, often back to when you moved in.
        </Callout>
      </GuideSection>

      <GuideSection id="hardship" n={16} kicker="More help" title="Extra help in hardship">
        <p>
          In England and Wales councils can reduce anyone&rsquo;s bill further at their discretion under section 13A of the Local Government
          Finance Act 1992. Many run a hardship fund for people whose Council Tax Reduction does not cover enough, for example after a
          bereavement, a sudden drop in income or a large bill they cannot pay.
        </p>
        <p>
          Ask your council for a discretionary or hardship reduction, explaining your circumstances and showing your income and spending. Some
          councils also give automatic support to care leavers up to age 25, and some protect households with disabled people or young children
          from their minimum payment.
        </p>
      </GuideSection>

      <GuideSection id="arrears" n={17} kicker="Debt" title="If you fall behind">
        <Timeline
          items={[
            { when: "Missed instalment", what: "Reminder notice", detail: "Pay within 7 days to keep paying by instalments." },
            { when: "Still unpaid", what: "Final notice", detail: "The whole year's bill can become due at once." },
            { when: "Court", what: "Liability order", detail: "Court costs are added, and the council can take money from wages or benefits, or use enforcement agents." },
          ]}
        />
        <p>
          Council tax arrears are a priority debt. If you are struggling, claim Council Tax Reduction straight away, ask the council to spread
          the bill over 12 months instead of 10, and get free advice from StepChange, Citizens Advice or National Debtline before it reaches court.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={18} kicker="Staying right" title="Changes you must report">
        <p>Tell your council straight away if:</p>
        <ul>
          <li>your income, savings or benefits change, including starting or stopping work;</li>
          <li>someone moves in or out, or the income of an adult living with you changes;</li>
          <li>you move home, even within the same council area;</li>
          <li>you go into hospital or a care home for a long stay.</li>
        </ul>
        <p>
          If you are overpaid because you did not report a change, the council adds the overpayment to your bill. If your income goes down, a
          prompt report can increase your reduction from the date of the change.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Council Tax Reduction 2026/27 at a glance"
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Most a pensioner can get", "100% of the bill"],
            ["Taper (national schemes)", "20%"],
            ["Savings limit (not on Guarantee Credit)", "£16,000"],
            ["Single pensioner applicable amount", "£238.00 a week"],
            ["Non-dependant deductions, pensioners in England", "£5.20 to £15.95 a week"],
            ["Second adult rebate", "Up to 25%"],
            ["Backdating for pensioners", "Up to 3 months"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
