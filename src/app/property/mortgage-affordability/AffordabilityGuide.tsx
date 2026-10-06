import {
  Bars,
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

/** Mortgage affordability — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "how", title: "How lenders decide" },
  { id: "multiples", title: "Income multiples" },
  { id: "income", title: "What counts as income" },
  { id: "commitments", title: "Debts and childcare" },
  { id: "stress", title: "Stress tests" },
  { id: "payments", title: "Monthly payments" },
  { id: "example", title: "A worked example" },
  { id: "deposit", title: "Your deposit and LTV" },
  { id: "credit", title: "Your credit file" },
  { id: "joint", title: "Joint and family mortgages" },
  { id: "self-employed", title: "Self-employed and contractors" },
  { id: "should", title: "How much you should borrow" },
  { id: "steps", title: "From estimate to offer" },
  { id: "reckoner", title: "Ready reckoner: income to price" },
  { id: "binding", title: "Multiple or affordability: which limits you?" },
  { id: "borrow-more", title: "Ways to borrow more, or need less" },
  { id: "after", title: "Your budget after the mortgage" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — How much can I borrow?", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/how-much-can-you-afford-to-borrow-for-a-mortgage" },
  { label: "FCA — Consumer help, including mortgages", href: "https://www.fca.org.uk/consumers" },
  { label: "Bank of England — Financial Policy Committee mortgage measures", href: "https://www.bankofengland.co.uk/financial-stability" },
  { label: "GOV.UK — Stamp Duty Land Tax rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
];

export default function AffordabilityGuide() {
  return (
    <Guide
      kicker="The affordability guide"
      title="How much can you borrow for a mortgage?"
      intro={
        <>
          Most UK lenders will lend around four to four and a half times your income, but the real answer depends on your
          debts, your deposit and whether you could still pay if rates rose. This guide explains how lenders work it out, what
          you can do to borrow more, and how to decide how much you should borrow.
        </>
      }
      meta={["Updated for 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="how" n={1} kicker="The basics" title="How lenders decide">
        <p>A lender asks two questions before offering you a mortgage:</p>
        <ol>
          <li>
            <strong>How much will we lend against this income?</strong> This is the income multiple, usually 4 to 4.5 times
            your yearly income before tax.
          </li>
          <li>
            <strong>Can you afford the payments?</strong> Lenders must check you can afford the mortgage, now and if rates
            rise. They look at your take-home pay, your regular bills and your debts.
          </li>
        </ol>
        <p>
          The amount you are offered is the lower of the two. A high earner with large debts can be limited by affordability;
          someone with no debts and low living costs is usually limited by the multiple.
        </p>
      </GuideSection>

      <GuideSection id="multiples" n={2} kicker="Multiples" title="Income multiples">
        <p>
          The income multiple is the simplest guide to what you might borrow. Most lenders cap lending at 4.5 times income for
          most borrowers. Some offer 5 or 5.5 times to higher earners or certain professions.
        </p>
        <DataTable
          caption="Loan at common income multiples"
          head={["Household income", "4×", "4.5×", "5×", "5.5×"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£30,000", "£120,000", "£135,000", "£150,000", "£165,000"],
            ["£40,000", "£160,000", "£180,000", "£200,000", "£220,000"],
            ["£50,000", "£200,000", "£225,000", "£250,000", "£275,000"],
            ["£60,000", "£240,000", "£270,000", "£300,000", "£330,000"],
            ["£80,000", "£320,000", "£360,000", "£400,000", "£440,000"],
            ["£100,000", "£400,000", "£450,000", "£500,000", "£550,000"],
          ]}
        />
        <p>
          The Bank of England limits how much of their lending banks can do at 4.5 times income or more. That is why higher
          multiples are rationed and usually reserved for higher incomes, larger deposits or specialist schemes.
        </p>
      </GuideSection>

      <GuideSection id="income" n={3} kicker="Income" title="What counts as income">
        <ul>
          <li>
            <strong>Basic salary</strong> counts in full. Guaranteed allowances, such as London weighting, usually do too.
          </li>
          <li>
            <strong>Bonus, overtime and commission</strong> are often counted at 50%, sometimes more if they are regular and
            proven over two years. The calculator counts half.
          </li>
          <li>
            <strong>Self-employed income</strong> is usually your average profit over the last two years, or the latest year if
            lower.
          </li>
          <li>
            <strong>Other income</strong>, such as some benefits, maintenance, pensions and rental income, may count depending on
            the lender.
          </li>
        </ul>
        <WorkedExample
          title="A £45,000 salary with a £10,000 bonus"
          steps={[
            { label: "Basic salary", value: "£45,000" },
            { label: "Half of the bonus", value: "£5,000" },
            { label: "Assessed income", value: "£50,000" },
            { label: "At 4.5 times", value: "£225,000" },
          ]}
          total={{ label: "Extra borrowing from the bonus", value: "£22,500" }}
        />
      </GuideSection>

      <GuideSection id="commitments" n={4} kicker="Outgoings" title="Debts and childcare">
        <p>
          Regular commitments reduce what you can borrow, because they compete with the mortgage for your income. Lenders look
          at personal loans, car finance, credit card balances, student loan repayments, childcare and some other regular
          costs.
        </p>
        <p>
          A simple rule of thumb, used by the calculator, is to take a year of commitments off your income before applying the
          multiple. At 4.5 times, every £100 a month of commitments cuts the loan by about £5,400.
        </p>
        <Bars
          items={[
            { label: "No commitments", value: 202_500 },
            { label: "£150 a month", value: 194_400 },
            { label: "£300 a month", value: 186_300 },
            { label: "£600 a month", value: 170_100 },
          ]}
        />
        <p>
          Those figures are for a £45,000 income at 4.5 times. Paying off a car loan or clearing a credit card before you apply
          can raise your limit, as can waiting until a loan ends.
        </p>
      </GuideSection>

      <GuideSection id="stress" n={5} kicker="Stress tests" title="Stress tests">
        <p>
          Lenders check that you could still afford the mortgage if interest rates rose. Each lender sets its own test, often a
          few percentage points above the rate you are taking, especially on shorter fixes. The calculator lets you choose how
          many points to add, with 3 points as the default.
        </p>
        <WorkedExample
          title="A £202,500 mortgage over 25 years"
          steps={[
            { label: "Payment at 4.5%", value: "£1,126" },
            { label: "Payment at 7.5%", note: "After a 3-point rise", value: "£1,496" },
          ]}
          total={{ label: "Extra each month", value: "£371" }}
        />
        <p>
          A longer fix, such as five years or more, often has a gentler test because the rate cannot change for longer. That
          can let you borrow a little more.
        </p>
      </GuideSection>

      <GuideSection id="payments" n={6} kicker="Payments" title="Monthly payments">
        <p>What a repayment mortgage costs each month for every £100,000 you borrow over 25 years:</p>
        <DataTable
          caption="Monthly payment per £100,000 borrowed, 25-year repayment"
          head={["Rate", "Monthly payment"]}
          numeric={[1]}
          rows={[
            ["4%", "£528"],
            ["4.5%", "£556"],
            ["5%", "£585"],
            ["6%", "£644"],
            ["7.5%", "£739"],
          ]}
        />
        <DataTable
          caption="Monthly payment on £202,500 by rate and term"
          head={["Rate", "25 years", "30 years", "35 years"]}
          numeric={[1, 2, 3]}
          rows={[
            ["3.5%", "£1,014", "£909", "£837"],
            ["4.5%", "£1,126", "£1,026", "£958"],
            ["5.5%", "£1,244", "£1,150", "£1,087"],
            ["6%", "£1,305", "£1,214", "£1,155"],
          ]}
        />
        <p>
          A longer term lowers the payment and can help you pass affordability checks, but you pay more interest overall. You
          can often shorten the term later or overpay.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Worked example" title="A worked example">
        <p>A couple earning £45,000 and £35,000 with a £40,000 deposit, no debts, looking at 4.5% over 25 years:</p>
        <WorkedExample
          title="Joint purchase"
          steps={[
            { label: "Combined income", value: "£80,000" },
            { label: "Loan at 4.5 times", value: "£360,000" },
            { label: "Plus deposit", value: "£40,000" },
            { label: "Monthly payment at 4.5%", value: "£2,001" },
            { label: "Payment if rates rose to 7.5%", value: "£2,660" },
          ]}
          total={{ label: "Maximum price", value: "£400,000" }}
        />
        <p>
          Their combined take-home pay is about £5,387 a month, so the payment would take 37% of it, or 49% at the stressed
          rate. As first-time buyers in England they would pay £5,000 Stamp Duty at £400,000.
        </p>
      </GuideSection>

      <GuideSection id="deposit" n={8} kicker="Deposits" title="Your deposit and LTV">
        <p>
          Your deposit sets your loan to value (LTV). The lowest deposit most lenders accept is 5%, but rates improve at each
          band: 90%, 85%, 80%, 75% and 60% LTV are common steps.
        </p>
        <p>
          A larger deposit does not change the income multiple, but it raises the price you can pay and usually lowers the rate,
          which makes the affordability check easier to pass.
        </p>
        <Callout title="Keep cash back for costs">
          Do not put every penny into the deposit. You will need money for Stamp Duty, legal fees, the survey and moving costs.
        </Callout>
      </GuideSection>

      <GuideSection id="credit" n={9} kicker="Credit" title="Your credit file">
        <p>Lenders check your credit file. Before applying:</p>
        <ul>
          <li>check your file with the main credit reference agencies and correct any mistakes;</li>
          <li>register on the electoral roll at your current address;</li>
          <li>avoid applying for new credit in the months before your mortgage application;</li>
          <li>keep credit card balances low and pay everything on time.</li>
        </ul>
        <p>Missed payments, defaults and County Court Judgments make lending harder but not always impossible.</p>
      </GuideSection>

      <GuideSection id="joint" n={10} kicker="Joint applications" title="Joint and family mortgages">
        <p>
          Two incomes usually mean a bigger loan, and some lenders accept up to four applicants. Each person&apos;s debts are
          counted too. If one buyer has a poor credit record, it can affect the whole application.
        </p>
        <p>
          Some lenders offer &quot;joint borrower, sole proprietor&quot; mortgages, where a parent adds their income to the
          application without being an owner. That can avoid the second-home Stamp Duty surcharge a parent owner might
          trigger.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={11} kicker="Self-employed" title="Self-employed and contractors">
        <p>
          Self-employed borrowers usually need two years of accounts or tax calculations. Lenders use your profit, not your
          turnover, and for limited company directors they may use salary plus dividends or your share of company profit.
          Contractors on day rates can often be assessed on the day rate multiplied by a typical number of working weeks.
        </p>
      </GuideSection>

      <GuideSection id="should" n={12} kicker="Your budget" title="How much you should borrow">
        <p>
          The most a lender offers is not always the right amount to borrow. A comfortable mortgage leaves room for other bills,
          savings and rate rises. Many people aim to keep housing costs to around a third of take-home pay.
        </p>
        <Timeline
          items={[
            { when: "Check", what: "Your monthly budget", detail: "Add council tax, energy, insurance and commuting to the mortgage payment." },
            { when: "Test", what: "A higher rate", detail: "Could you still pay if your rate rose by 2 or 3 points when your fix ends?" },
            { when: "Keep", what: "An emergency fund", detail: "Three to six months of outgoings is a common target." },
          ]}
        />
      </GuideSection>

      <GuideSection id="steps" n={13} kicker="Process" title="From estimate to offer">
        <Timeline
          items={[
            { when: "1", what: "Estimate", detail: "Use this calculator to find a realistic range." },
            { when: "2", what: "Decision in principle", detail: "A lender or broker gives a conditional figure, usually with a soft credit check." },
            { when: "3", what: "Make offers", detail: "Agents may ask to see your decision in principle." },
            { when: "4", what: "Full application", detail: "Payslips, bank statements and ID are checked, along with a hard credit search." },
            { when: "5", what: "Valuation and offer", detail: "The lender values the home and issues a mortgage offer, usually valid for about six months." },
          ]}
        />
      </GuideSection>

      <GuideSection id="reckoner" n={14} kicker="Ready reckoner" title="Ready reckoner: income to price">
        <p>With a 10% deposit and a loan at 4.5 times income, here is the price range each income could reach:</p>
        <DataTable
          caption="4.5 times income, 10% deposit, 4.5% over 25 years"
          head={["Household income", "Mortgage", "Deposit", "Price", "Monthly payment"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£30,000", "£135,000", "£15,000", "£150,000", "£750"],
            ["£40,000", "£180,000", "£20,000", "£200,000", "£1,000"],
            ["£50,000", "£225,000", "£25,000", "£250,000", "£1,251"],
            ["£60,000", "£270,000", "£30,000", "£300,000", "£1,501"],
            ["£80,000", "£360,000", "£40,000", "£400,000", "£2,001"],
            ["£100,000", "£450,000", "£50,000", "£500,000", "£2,501"],
          ]}
        />
        <p>
          The calculator works the other way round too: enter a home you are looking at under More options to see the income
          multiple it would need.
        </p>
      </GuideSection>

      <GuideSection id="binding" n={15} kicker="Two tests" title="Multiple or affordability: which limits you?">
        <p>
          For most people with modest debts, the income multiple is the limit. Affordability becomes the limit when outgoings
          are high compared with income: large childcare bills, several dependants, a big car finance payment or high
          commuting costs.
        </p>
        <p>
          Lenders also look at the rate. When mortgage rates rise, the same loan costs more each month, so the affordability
          test can bite before the multiple does. That is why maximum loans tend to shrink when rates go up, even for people
          whose income has not changed.
        </p>
        <Callout title="Different lenders, different answers">
          Two lenders can offer very different amounts to the same person, because they weigh bonuses, childcare and
          self-employed income differently. A broker can match you with a lender whose rules suit your situation.
        </Callout>
      </GuideSection>

      <GuideSection id="borrow-more" n={16} kicker="Options" title="Ways to borrow more, or need less">
        <ul>
          <li><strong>Clear or reduce debts</strong> before applying, especially car finance and personal loans.</li>
          <li><strong>Lengthen the term.</strong> A 30 or 35-year term lowers the monthly payment and can help you pass affordability checks.</li>
          <li><strong>Choose a longer fix.</strong> Five-year fixes often face a gentler stress test.</li>
          <li><strong>Add an applicant.</strong> A joint application, or a joint borrower who is not an owner, adds income.</li>
          <li><strong>Prove variable income.</strong> Two years of steady bonus or overtime may let a lender count more of it.</li>
          <li><strong>Look at schemes.</strong> Shared ownership needs a much smaller mortgage for part of a home.</li>
          <li><strong>Grow the deposit.</strong> A lower loan-to-value means better rates and a smaller loan for the same home.</li>
        </ul>
        <p>
          Be cautious about borrowing the very maximum. A stretched budget leaves no room for rate rises when your fix ends, or
          for a change in circumstances such as a new baby or a drop in income.
        </p>
      </GuideSection>

      <GuideSection id="after" n={17} kicker="Budgeting" title="Your budget after the mortgage">
        <p>
          A lender&apos;s figure tells you what you could borrow, not what you will have left to live on. On a £45,000 salary,
          take-home pay is about £2,993 a month. A £202,500 mortgage at 4.5% over 25 years costs £1,126, leaving about £1,867
          for everything else.
        </p>
        <p>From that, you will need to cover:</p>
        <ul>
          <li>council tax, which depends on the home&apos;s band and your council;</li>
          <li>energy, water, broadband and phone;</li>
          <li>buildings and contents insurance, and any life or income protection cover;</li>
          <li>travel, food, and any childcare or debt repayments;</li>
          <li>maintenance and repairs, which renters usually do not pay for.</li>
        </ul>
        <p>
          Write down a realistic monthly budget before you agree a price. If the numbers only work at today&apos;s rate with
          nothing to spare, consider a smaller loan, a longer fix or waiting to build a bigger deposit.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4 to 4.5×", label: "Typical income multiple" },
            { value: "5%", label: "Minimum deposit with most lenders" },
            { value: "50%", label: "Share of bonus many lenders count" },
            { value: "£5,400", label: "Less borrowing per £100 a month of debt, at 4.5×" },
            { value: "£556", label: "Monthly cost per £100,000 at 4.5% over 25 years" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
