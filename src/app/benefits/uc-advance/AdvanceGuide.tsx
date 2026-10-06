import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Universal Credit advances — the guide. Figures from src/lib/benefits/uc-advance.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "why", title: "Why advances exist" },
  { id: "how-much", title: "How much you can borrow" },
  { id: "repaying", title: "How repayment works" },
  { id: "cap", title: "The 15% deductions cap" },
  { id: "example", title: "Worked example" },
  { id: "choosing", title: "Choosing the repayment period" },
  { id: "kinds", title: "The different kinds of advance" },
  { id: "budgeting", title: "Budgeting advances" },
  { id: "apply", title: "How to apply" },
  { id: "hardship", title: "If repayments are too much" },
  { id: "alternatives", title: "Before you borrow" },
  { id: "couples", title: "Advances for couples" },
  { id: "moving", title: "Moving from older benefits" },
  { id: "first-months", title: "Budgeting for the first months" },
  { id: "records", title: "Checking your deductions" },
  { id: "example-couple", title: "A couple example" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Universal Credit: get an advance on your first payment", href: "https://www.gov.uk/guidance/universal-credit-advances" },
  { label: "GOV.UK — Universal Credit: budgeting advances", href: "https://www.gov.uk/guidance/universal-credit-advances#budgeting-advances" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Universal Credit: how your payment is worked out", href: "https://www.gov.uk/universal-credit/what-youll-get" },
];

export default function AdvanceGuide() {
  return (
    <Guide
      kicker="The Universal Credit advance guide"
      title="Universal Credit advances: borrowing and paying back"
      intro={
        <>
          Your first Universal Credit payment arrives about five weeks after you claim. If you cannot manage until then, you can ask for an
          advance: an interest-free loan of up to one month&rsquo;s estimated payment. This guide explains how much you can borrow, how it is taken
          back from later payments, the 15% cap on deductions and how to choose a repayment period you can live with.
        </>
      }
      meta={["2026/27 rates", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A new claim advance is up to <strong>100% of your estimated monthly Universal Credit</strong>.</li>
          <li>It is interest-free and repaid from your Universal Credit over up to <strong>24 months</strong>.</li>
          <li>Most deductions together, including advance repayments, are capped at <strong>15% of your standard allowance</strong>: £63.74 a month for a single person aged 25 or over.</li>
          <li>Budgeting advances of up to £348, £464 or £812 help with one-off costs once you have been claiming for 6 months.</li>
        </ul>
        <KeyStats
          items={[
            { value: "100%", label: "Of one month's estimated UC" },
            { value: "24 months", label: "Longest repayment" },
            { value: "15%", label: "Deductions cap on the standard allowance" },
            { value: "0%", label: "Interest" },
          ]}
        />
      </GuideSection>

      <GuideSection id="why" n={2} kicker="Background" title="Why advances exist">
        <p>
          Universal Credit is paid monthly in arrears. Your first assessment period runs for a month from the day you claim, and payment arrives
          seven days after it ends. For someone who has just lost a job, or whose last wage has been spent, that gap can mean rent arrears or
          missed bills. The advance bridges it, but because it is a loan it reduces every payment that follows until it is cleared.
        </p>
      </GuideSection>

      <GuideSection id="how-much" n={3} kicker="Amount" title="How much you can borrow">
        <p>
          You can ask for any amount up to your estimated first payment. The DWP estimates it from what you put in your claim: your household,
          your rent and your income. If you do not know your likely award, the <a href="/benefits/universal-credit">Universal Credit
          calculator</a> gives an estimate.
        </p>
        <p>
          You do not have to take the full amount. A smaller advance means smaller repayments and more of your Universal Credit to live on later.
        </p>
      </GuideSection>

      <GuideSection id="repaying" n={4} kicker="Repayment" title="How repayment works">
        <p>
          Repayments start with your first full payment and are taken before the money reaches you. You choose the repayment period when you
          apply, up to 24 months for a new claim advance. The repayment is the advance divided by the number of months.
        </p>
        <p>
          If your Universal Credit stops while you still owe some of the advance, for example because you start a well-paid job, the rest becomes a
          debt that the DWP recovers in other ways, usually by agreeing a payment plan. If you claim again later, repayments restart.
        </p>
      </GuideSection>

      <GuideSection id="cap" n={5} kicker="Limits" title="The 15% deductions cap">
        <p>
          Since April 2025 the most that can be taken from your Universal Credit for most debts together is 15% of your standard allowance, down
          from 25%. Advance repayments, benefit overpayments and third-party debts such as rent or council tax arrears all share it.
        </p>
        <DataTable
          caption="Deductions cap, 2026/27"
          head={["Household", "Standard allowance a month", "15% cap"]}
          numeric={[1, 2]}
          rows={[
            ["Single, under 25", "£338.58", "£50.79"],
            ["Single, 25 or over", "£424.90", "£63.74"],
            ["Couple, both under 25", "£528.34", "£79.25"],
            ["Couple, one or both 25 or over", "£666.97", "£100.05"],
          ]}
        />
        <p>
          A few deductions can go above the cap, such as payments for some fines and child maintenance. If a repayment would take you over it, the
          calculator shows the shortest period that would keep you within it.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Worked example" title="Worked example">
        <WorkedExample
          title="Single, aged 30, renting at £700 a month with no income"
          steps={[
            { label: "Estimated Universal Credit", value: "£1,124.90 a month" },
            { label: "Full advance", value: "£1,124.90" },
            { label: "Repaid over 12 months", value: "£93.74 a month: over the cap" },
            { label: "Repaid over 18 months", value: "£62.49 a month: within the £63.74 cap" },
            { label: "Repaid over 24 months", value: "£46.87 a month" },
          ]}
          total={{ label: "UC left each month over 24 months", value: "£1,078.03" }}
        />
        <p>
          If the same person borrowed £600 instead and repaid it over 24 months, the repayment would be £25 a month, leaving £1,099.90.
        </p>
      </GuideSection>

      <GuideSection id="choosing" n={7} kicker="Choosing" title="Choosing the repayment period">
        <CompareCards
          columns={[
            {
              name: "Shorter period",
              rows: [
                { label: "Monthly repayment", value: "Higher" },
                { label: "Debt cleared", value: "Sooner" },
                { label: "Risk", value: "Less to live on each month" },
              ],
            },
            {
              name: "Longer period",
              rows: [
                { label: "Monthly repayment", value: "Lower" },
                { label: "Debt cleared", value: "Later" },
                { label: "Risk", value: "Still owing if your claim ends" },
              ],
            },
          ]}
        />
        <p>
          There is no interest, so a longer period costs nothing extra. For most people the 24-month maximum is the safest choice, because it
          keeps the most money in each payment. If you expect to start work soon, a shorter period avoids owing money after your claim ends.
        </p>
      </GuideSection>

      <GuideSection id="kinds" n={8} kicker="Types" title="The different kinds of advance">
        <ul>
          <li><strong>New claim advance:</strong> while you wait for your first payment. Up to one month&rsquo;s estimated award, repaid over up to 24 months.</li>
          <li><strong>Benefit transfer advance:</strong> if you move to Universal Credit from another benefit and there is a gap in payments.</li>
          <li><strong>Change of circumstances advance:</strong> if your award goes up, for example after a baby is born, and you cannot wait for the higher payment.</li>
          <li><strong>Budgeting advance:</strong> for one-off costs after 6 months on Universal Credit.</li>
        </ul>
      </GuideSection>

      <GuideSection id="budgeting" n={9} kicker="One-off costs" title="Budgeting advances">
        <p>
          A budgeting advance helps with things like a new cooker, a deposit or rent in advance for a new home, or costs of starting a job. You
          must usually have been on Universal Credit (or certain earlier benefits) for 6 months, and your household&rsquo;s earnings in the past 6
          months must be under £2,600, or £3,600 for a couple.
        </p>
        <DataTable
          caption="Budgeting advance limits"
          head={["Household", "Most you can borrow"]}
          numeric={[1]}
          rows={[
            ["Single", "£348"],
            ["Couple", "£464"],
            ["With children", "£812"],
          ]}
        />
        <p>
          Budgeting advances are normally repaid within 12 months. You cannot get one while you still owe an earlier budgeting advance, and
          savings over £1,000 reduce the amount.
        </p>
      </GuideSection>

      <GuideSection id="apply" n={10} kicker="Process" title="How to apply">
        <Timeline
          items={[
            { when: "When you claim", what: "Ask in your journal or at your Jobcentre interview", detail: "You need to have verified your identity and given bank details." },
            { when: "Same day or soon after", what: "The DWP agrees the amount and repayment period", detail: "You may be asked how you will manage the repayments." },
            { when: "Usually within days", what: "The advance is paid", detail: "It can be the same day in urgent cases." },
            { when: "First payment", what: "Repayments start", detail: "Taken before the payment reaches your account." },
          ]}
        />
        <Callout tone="warn" title="Beware of scams">
          Nobody needs to apply for an advance for you, and the DWP never charges for one. Never share your Universal Credit login.
        </Callout>
      </GuideSection>

      <GuideSection id="hardship" n={11} kicker="Help" title="If repayments are too much">
        <p>
          If repaying would leave you unable to pay for essentials, contact the DWP through your journal. In exceptional circumstances repayments
          can be delayed for up to 3 months, or spread over a longer period. Free debt advice from StepChange, National Debtline or Citizens Advice
          can help you deal with the DWP and other creditors together.
        </p>
      </GuideSection>

      <GuideSection id="alternatives" n={12} kicker="Options" title="Before you borrow">
        <ul>
          <li>Check whether you can get <a href="/benefits/new-style-jsa">New Style JSA</a> or <a href="/benefits/new-style-esa">New Style ESA</a>, paid every two weeks and sooner than Universal Credit.</li>
          <li>Ask your council about local welfare assistance or a Discretionary Housing Payment for rent.</li>
          <li>Ask your landlord, energy supplier and lenders for breathing space while you wait.</li>
          <li>Check what else you could get with the <a href="/benefits/benefits-checker">benefits checker</a>.</li>
        </ul>
      </GuideSection>

      <GuideSection id="couples" n={13} kicker="Couples" title="Advances for couples">
        <p>
          Universal Credit is a household benefit, so a couple makes one joint claim and gets one advance. The amount is based on the
          joint estimated award, and repayments come out of the joint payment. If you split up while repaying, the DWP decides how the
          remaining balance is shared, usually by recovering it from whichever of you goes on claiming.
        </p>
        <p>
          If one partner was already paying back an advance from an earlier single claim, those repayments carry on into the new joint
          claim, and they count towards the same 15% cap. The calculator lets you add them under More options.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={14} kicker="Moving over" title="Moving from older benefits">
        <p>
          If you move to Universal Credit from Housing Benefit, income-based JSA, income-related ESA or Income Support, those benefits
          carry on for two more weeks after you claim. This two-week run-on is not a loan, so it is not taken back. It often means you
          need a smaller advance than someone claiming from scratch.
        </p>
        <p>
          People moved across by a migration notice can also get transitional protection, which keeps their Universal Credit at the
          level of their old benefits for a time. Ask about a benefit transfer advance if the run-on is not enough to reach your first
          payment.
        </p>
      </GuideSection>

      <GuideSection id="first-months" n={15} kicker="Practical" title="Budgeting for the first months">
        <p>
          The first few months on Universal Credit are often the hardest, because the advance repayment starts at the same time as
          the monthly rhythm of payments. A short plan helps:
        </p>
        <ul>
          <li>write down the date your payment will arrive each month, and the date each bill and rent payment goes out;</li>
          <li>move bills and direct debits to a few days after your payment date if you can;</li>
          <li>put money for rent aside first: if you rent, you can ask for the housing element to be paid straight to your landlord;</li>
          <li>use the calculator to see exactly what each payment will be after the advance repayment, and plan from that figure, not the full award;</li>
          <li>keep a small amount back for the last week of each month, when money is usually tightest.</li>
        </ul>
        <p>
          If you are paid monthly in work, your Universal Credit can change each month as your pay changes, so build in some slack.
        </p>
      </GuideSection>

      <GuideSection id="records" n={16} kicker="Your statement" title="Checking your deductions">
        <p>
          Your monthly Universal Credit statement shows every deduction, including the advance repayment and how much is left to pay. Check it
          each month: if the amount looks wrong, or a new deduction appears that you do not recognise, ask about it through your journal.
        </p>
      </GuideSection>

      <GuideSection id="example-couple" n={17} kicker="Example" title="A couple example">
        <p>
          A couple aged 30 with one child, renting at £850 a month with no income, would have a standard allowance of £666.97 a month, so the deductions
          cap is £100.05. An advance of £1,000 repaid over 24 months is £41.67 a month, well within the cap; over 12 months it would be £83.33, still
          within it.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Universal Credit advances, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["New claim advance", "Up to 100% of one month's estimated award"],
            ["Longest repayment, new claim advance", "24 months"],
            ["Deductions cap", "15% of the standard allowance"],
            ["Single person 25 or over: cap", "£63.74 a month"],
            ["Budgeting advance (single / couple / children)", "£348 / £464 / £812"],
            ["Budgeting advance earnings limit (6 months)", "£2,600 single, £3,600 couple"],
            ["Interest", "None"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
