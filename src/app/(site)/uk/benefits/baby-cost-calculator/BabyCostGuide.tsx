import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Cost of a baby guide. Every figure comes from src/lib/benefits/baby-costs.ts and the engines it uses. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "examples", title: "About the example prices" },
  { id: "big-items", title: "Big items: what you really need" },
  { id: "levels", title: "Budget, mid-range or premium" },
  { id: "feeding", title: "Feeding: breast, formula or both" },
  { id: "nappies", title: "Nappies: disposable or reusable" },
  { id: "clothes-food", title: "Clothes, food and everyday costs" },
  { id: "leave", title: "Pay during maternity leave" },
  { id: "partner", title: "Partner's pay and shared leave" },
  { id: "child-benefit", title: "Child Benefit" },
  { id: "grants", title: "Maternity grants" },
  { id: "healthy-start", title: "Healthy Start" },
  { id: "childcare", title: "Childcare: the biggest cost" },
  { id: "funded", title: "Funded hours in England" },
  { id: "tfc", title: "Tax-Free Childcare or Universal Credit" },
  { id: "to-five", title: "The cost to age 5" },
  { id: "low-income", title: "A low-income example" },
  { id: "saving", title: "Ways to cut the cost" },
  { id: "timeline", title: "When to claim what" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Child Benefit", href: "https://www.gov.uk/child-benefit" },
  { label: "GOV.UK: Maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
  { label: "GOV.UK: Paternity pay and leave", href: "https://www.gov.uk/paternity-pay-leave" },
  { label: "GOV.UK: Sure Start Maternity Grant", href: "https://www.gov.uk/sure-start-maternity-grant" },
  { label: "GOV.UK: Healthy Start", href: "https://www.gov.uk/healthy-start" },
  { label: "GOV.UK: Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
  { label: "GOV.UK: Free childcare if you're working", href: "https://www.gov.uk/free-childcare-if-working" },
  { label: "NHS: Types of formula", href: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/" },
  { label: "NHS: Weaning and feeding", href: "https://www.nhs.uk/baby/weaning-and-feeding/" },
];

export default function BabyCostGuide() {
  return (
    <Guide
      kicker="The cost of a baby guide"
      title="What a baby costs, and the help you can get"
      intro={
        <>
          A new baby brings one-off costs, running costs, often childcare, and usually a drop in pay while a parent is on leave. Against that, Child
          Benefit, maternity pay and other help come in. This guide walks through each part with an example family in England, using 2026/27 rates for
          benefits and statutory pay, and example prices for the things you buy.
        </>
      }
      meta={["2026/27 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          Our example family in England buys mid-range big items, uses formula and disposable nappies, and puts the baby in childcare for 30 hours a week
          from age 1. With the calculator&rsquo;s example prices:
        </p>
        <ul>
          <li>Year one spending is about <strong>£3,050</strong>; Child Benefit brings back <strong>£1,407</strong>, a net cost of <strong>£1,643</strong>.</li>
          <li>The mother&rsquo;s pay falls by <strong>£13,747</strong>{" "}before tax over 39 weeks of Statutory Maternity Pay, and the partner&rsquo;s by <strong>£811</strong>.</li>
          <li>Including that, the first year costs the household about <strong>£16,202</strong>.</li>
          <li>To age 5, the net cost of spending is about <strong>£9,167</strong>, after funded hours and Tax-Free Childcare.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£3,050", label: "Spending in year one (example)" },
            { value: "£1,407", label: "Child Benefit a year, first child" },
            { value: "£14,559", label: "Pay drop during leave, before tax" },
            { value: "£9,167", label: "Net spending to age 5 (example)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="examples" n={2} kicker="Read this first" title="About the example prices">
        <p>
          Prices for prams, formula or nappies vary hugely between brands and shops, and over time. So the spending figures in the calculator are examples
          to start from, not averages from a survey: change them to the prices you see. The help figures are different: Child Benefit, Statutory Maternity
          Pay, Statutory Paternity Pay, the maternity grants, Healthy Start, funded hours and Tax-Free Childcare all use the official 2026/27 rates.
        </p>
        <p>All figures are at today&rsquo;s prices, without inflation, and leave out housing, a bigger car or other changes a baby may bring.</p>
      </GuideSection>

      <GuideSection id="big-items" n={3} kicker="One-off costs" title="Big items: what you really need">
        <p>The calculator lists nine one-off items. With mid-range example prices they add up to £1,190:</p>
        <DataTable
          head={["Item", "Budget", "Mid-range", "Premium"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Pram, pushchair or travel system", "£150", "£450", "£1,000"],
            ["Car seat", "£60", "£150", "£300"],
            ["Cot or cot bed and mattress", "£80", "£200", "£450"],
            ["Moses basket or bedside crib", "£30", "£80", "£200"],
            ["Baby monitor", "£20", "£60", "£150"],
            ["Changing mat, bath and towels", "£20", "£50", "£100"],
            ["Sling or baby carrier", "£20", "£60", "£130"],
            ["Highchair", "£20", "£60", "£200"],
            ["Bottles, steriliser and breast pump", "£30", "£80", "£250"],
            ["Total", "£430", "£1,190", "£2,780"],
          ]}
        />
        <p>
          Not everything is essential from day one. A car seat is needed if you will drive the baby home from hospital. A highchair is not needed until
          weaning, at around 6 months. Many families skip the monitor or the Moses basket.
        </p>
      </GuideSection>

      <GuideSection id="levels" n={4} kicker="Choices" title="Budget, mid-range or premium">
        <p>
          The &quot;Big items&quot; choice fills in all nine prices at once. The gap between budget and premium is £2,350 in our example, more than a
          year&rsquo;s Child Benefit. Year one net cost changes like this:
        </p>
        <Bars
          items={[
            { label: "Budget items, breastfeeding, reusable nappies", value: 283 },
            { label: "Mid-range items, formula, disposables", value: 1643 },
            { label: "Premium items, formula, disposables", value: 3233 },
          ]}
        />
        <p>The budget line includes £300 for a reusable nappy kit; it is cheaper still with disposables bought on offer or hand-me-down equipment.</p>
      </GuideSection>

      <GuideSection id="feeding" n={5} kicker="Feeding" title="Feeding: breast, formula or both">
        <p>
          Breastfeeding has no formula cost, though you may buy a pump, breast pads or nursing bras. If you use formula, the NHS says first infant formula
          is the only formula a baby needs in the first year; follow-on formula is not necessary. From age 1, pasteurised whole cows&rsquo; milk can be
          the main drink, so the formula cost stops.
        </p>
        <CompareCards
          columns={[
            { name: "Formula", rows: [{ label: "Example cost a month", value: "£50" }, { label: "Months", value: "12" }, { label: "Year one", value: "£600" }] },
            { name: "Mixed feeding", rows: [{ label: "Share of formula", value: "Half" }, { label: "Months", value: "12" }, { label: "Year one", value: "£300" }] },
            { name: "Breastfeeding", rows: [{ label: "Formula", value: "None" }, { label: "Months", value: "—" }, { label: "Year one", value: "£0" }] },
          ]}
        />
        <p>
          On a low income, <a href="/uk/life/healthy-start">Healthy Start</a>{" "}can be used for infant formula as well as milk, fruit and vegetables.
        </p>
      </GuideSection>

      <GuideSection id="nappies" n={6} kicker="Nappies" title="Nappies: disposable or reusable">
        <p>
          With an example £35 a month for disposable nappies and wipes, and nappies until age two and a half, the cost is £420 in each of the first two
          years and £210 in the third: £1,050 in all. Reusable nappies cost more at the start (an example £300 kit) and then about £10 a month for washing:
          £120 a year, or £600 to two and a half including the kit. Some councils offer vouchers or discounts for reusable nappies.
        </p>
      </GuideSection>

      <GuideSection id="clothes-food" n={7} kicker="Running costs" title="Clothes, food and everyday costs">
        <p>The example also includes:</p>
        <ul>
          <li><strong>Clothes:</strong> £300 in year one, as babies outgrow sizes quickly, then £250 a year.</li>
          <li><strong>Food:</strong> the NHS recommends starting solid food at around 6 months. The example adds £30 a month from 6 to 12 months (£180), then £60 a month for food and milk from age 1 (£720 a year).</li>
          <li><strong>Other:</strong> toiletries, toys, books and activities at £30 a month (£360 a year).</li>
        </ul>
      </GuideSection>

      <GuideSection id="leave" n={8} kicker="Income" title="Pay during maternity leave">
        <p>
          For many families, the drop in pay is bigger than everything they buy. Statutory Maternity Pay (SMP) is 90% of average weekly earnings for 6
          weeks, then £194.32 a week (or 90% if lower) for 33 weeks. The last 13 weeks of a full year&rsquo;s leave are unpaid unless your employer pays
          more.
        </p>
        <WorkedExample
          title="Mother earning £600 a week, 39 weeks of leave on SMP"
          steps={[
            { label: "First 6 weeks at 90% (£540 a week)", value: "£3,240" },
            { label: "Next 33 weeks at £194.32", value: "£6,412.56" },
            { label: "Total SMP", value: "£9,652.56" },
            { label: "Usual pay for 39 weeks", value: "£23,400" },
          ]}
          total={{ label: "Drop in pay, before tax", value: "£13,747" }}
        />
        <p>
          Taking the full 52 weeks raises the drop to £21,547. If the employer pays full pay for the first 26 weeks, the drop over 39 weeks falls to
          £5,274. Tax and National Insurance also fall when pay falls, so the drop in take-home pay is smaller. The{" "}
          <a href="/uk/benefits/maternity-pay">maternity pay calculator</a>{" "}shows week-by-week pay and Maternity Allowance if you do not qualify for SMP.
        </p>
      </GuideSection>

      <GuideSection id="partner" n={9} kicker="Partners" title="Partner's pay and shared leave">
        <p>
          Statutory Paternity Pay is £194.32 a week (or 90% of earnings if lower) for up to two weeks. A partner earning £600 a week gets £388.64 instead of
          £1,200: a drop of £811. Some employers pay full pay instead. Parents can also share up to 50 weeks of leave and 37 weeks of pay; the{" "}
          <a href="/uk/benefits/shared-parental-leave">Shared Parental Leave calculator</a>{" "}compares the options.
        </p>
      </GuideSection>

      <GuideSection id="child-benefit" n={10} kicker="Help" title="Child Benefit">
        <p>
          Child Benefit is £27.05 a week for the eldest child and £17.90 for each other child in 2026/27: £1,407 or £931 a year. If the higher earner&rsquo;s
          adjusted net income is over £60,000, the High Income Child Benefit Charge takes back 1% for every £200 above that, and all of it at £80,000. At
          £70,000, half is taken back, leaving £703 a year for a first child.
        </p>
        <Callout title="Claim even if you will pay the charge">
          Claiming protects National Insurance credits for a parent who stays at home, which count towards the State Pension. You can choose not to be paid.
          The <a href="/uk/benefits/child-benefit">Child Benefit calculator</a>{" "}has the details.
        </Callout>
      </GuideSection>

      <GuideSection id="grants" n={11} kicker="Help" title="Maternity grants">
        <p>
          On Universal Credit or another qualifying benefit, the <a href="/uk/benefits/sure-start-maternity-grant">Sure Start Maternity Grant</a>{" "}pays £500
          once in England, Wales and Northern Ireland, usually only if you have no other children under 16. In Scotland, the Best Start Grant pays
          £796.65 for a first child and £398.35 for later children. Neither has to be paid back.
        </p>
      </GuideSection>

      <GuideSection id="healthy-start" n={12} kicker="Help" title="Healthy Start">
        <p>
          Healthy Start pays £4.65 a week in pregnancy (from 10 weeks), £9.30 a week for a baby under 1 and £4.65 a week from 1 to 4, on a prepaid card for
          milk, formula, fruit and vegetables. Families on Universal Credit qualify if their take-home pay is £408 a month or less. For a new baby that is
          about £484 in year one and £242 a year at ages 1 to 4. Scotland has its own Best Start Foods scheme.
        </p>
      </GuideSection>

      <GuideSection id="childcare" n={13} kicker="Childcare" title="Childcare: the biggest cost">
        <p>
          Once a parent goes back to work, childcare usually dwarfs everything else. In the example, 30 hours a week for 48 weeks at an example £7.50 an
          hour costs £10,800 a year before any help. Prices vary a lot by area and provider, so ask local nurseries and childminders and enter their
          hourly rate.
        </p>
        <p>
          The <a href="/uk/benefits/childcare-costs">childcare costs calculator</a>{" "}handles more than one child and shows the help side by side.
        </p>
      </GuideSection>

      <GuideSection id="funded" n={14} kicker="England" title="Funded hours in England">
        <p>
          In England, working parents can get 30 funded hours a week, for 38 weeks a year, from when their child is 9 months old until they start school. In
          the example, that covers £8,550 of the £10,800, leaving £2,250 a year to pay. Check eligibility with the{" "}
          <a href="/uk/benefits/free-childcare-hours">free childcare hours checker</a>. Wales, Scotland and Northern Ireland have different schemes, which this
          calculator does not include.
        </p>
        <Callout tone="warn" title="Extra charges">
          Funded hours cover the education and care, but providers can charge for meals, nappies or activities. Add those to the hourly rate or the other
          costs line.
        </Callout>
      </GuideSection>

      <GuideSection id="tfc" n={15} kicker="Help" title="Tax-Free Childcare or Universal Credit">
        <p>
          Tax-Free Childcare adds £2 for every £8 you pay, up to £2,000 a year per child. On the £2,250 left after funded hours, it adds £450 a year. Without
          funded hours, as in the other nations here, it reaches the £2,000 cap. On Universal Credit, you can instead get back up to 85% of childcare costs,
          up to a monthly limit; you cannot use both.
        </p>
        <p>
          Tax-Free Childcare is not available if either parent earns over £100,000, and in that case working-parent funded hours stop too. Use the{" "}
          <a href="/uk/benefits/tax-free-childcare">Tax-Free Childcare calculator</a>{" "}for the details.
        </p>
      </GuideSection>

      <GuideSection id="to-five" n={16} kicker="Five years" title="The cost to age 5">
        <DataTable
          caption="Example family in England, mid-range items, formula, disposables, childcare from age 1"
          head={["Year", "Spending", "Help", "Net cost"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Year 1 (age 0 to 1)", "£3,050", "£1,407", "£1,643"],
            ["Year 2 (age 1 to 2)", "£4,000", "£1,857", "£2,143"],
            ["Year 3 (age 2 to 3)", "£3,790", "£1,857", "£1,933"],
            ["Year 4 (age 3 to 4)", "£3,580", "£1,857", "£1,723"],
            ["Year 5 (age 4 to 5)", "£3,580", "£1,857", "£1,723"],
            ["Total", "£18,000", "£8,833", "£9,167"],
          ]}
        />
        <p>
          Without Tax-Free Childcare the five-year net cost rises to £10,967. In Scotland, with no funded hours modelled, the same plan comes to £37,167,
          which shows how much funded hours matter; Scotland&rsquo;s own funded childcare would bring that down.
        </p>
      </GuideSection>

      <GuideSection id="low-income" n={17} kicker="Example" title="A low-income example">
        <p>
          A family on Universal Credit with budget items, formula, no paid childcare and no earnings before the birth gets the £500 grant, £484 of Healthy
          Start and £1,407 of Child Benefit in year one: £2,390 of help against £2,290 of spending. Universal Credit itself also rises with a child element,
          which this calculator does not include; the <a href="/uk/benefits/universal-credit">Universal Credit estimator</a>{" "}shows it.
        </p>
      </GuideSection>

      <GuideSection id="saving" n={18} kicker="Tips" title="Ways to cut the cost">
        <ul>
          <li>Borrow or buy second-hand clothes and big items, but buy a new cot mattress and only use a car seat with a known history.</li>
          <li>Wait for gifts before buying everything; many items are not needed until 6 months.</li>
          <li>Plan leave and pay early: read your employer&rsquo;s maternity and paternity policy and check whether pay is enhanced.</li>
          <li>Apply for Tax-Free Childcare and funded hours in good time, as codes need to be reconfirmed every three months.</li>
          <li>Check whether you can get Universal Credit, especially while on leave, with the <a href="/uk/benefits/benefits-checker">benefits checker</a>.</li>
        </ul>
      </GuideSection>

      <GuideSection id="timeline" n={19} kicker="Calendar" title="When to claim what">
        <Timeline
          items={[
            { when: "10 weeks pregnant", what: "Healthy Start", detail: "If you qualify." },
            { when: "15 weeks before the due date", what: "Tell your employer", detail: "About the pregnancy, due date and leave dates." },
            { when: "11 weeks before the due date", what: "Sure Start Maternity Grant opens", detail: "Claim up to 6 months after the birth." },
            { when: "After the birth", what: "Child Benefit", detail: "Claim within 3 months: backdating is limited to 3 months." },
            { when: "Baby is 23 weeks old", what: "Apply for funded hours", detail: "England: you can apply from 23 weeks; hours start from 9 months." },
            { when: "Before childcare starts", what: "Tax-Free Childcare", detail: "Check your provider is signed up, then reconfirm every 3 months." },
          ]}
        />
        <p>
          The <a href="/everyday/pregnancy-due-date">pregnancy due date calculator</a>{" "}turns these into dates for your pregnancy.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="2026/27 rates used by the calculator"
          head={["What", "Amount"]}
          rows={[
            ["Child Benefit", "£27.05 a week (eldest), £17.90 (others)"],
            ["High Income Child Benefit Charge", "From £60,000; all taken back at £80,000"],
            ["Statutory Maternity Pay", "90% for 6 weeks, then £194.32 (or 90%) for 33 weeks"],
            ["Statutory Paternity Pay", "£194.32 (or 90%) for up to 2 weeks"],
            ["Sure Start Maternity Grant", "£500"],
            ["Best Start Grant (Scotland)", "£796.65 first child, £398.35 later"],
            ["Healthy Start", "£4.65 pregnancy and age 1 to 4, £9.30 under 1"],
            ["Tax-Free Childcare", "20% top-up, up to £2,000 a year per child"],
            ["Funded hours (England, working parents)", "30 hours a week, 38 weeks, from 9 months"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
