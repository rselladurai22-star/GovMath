import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Debt-to-income: the guide. Figures from debtToIncome in src/lib/us/loans.ts and dtiRoom in src/lib/us/pay-extra.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "front-back", title: "Front-end and back-end DTI" },
  { id: "income", title: "What counts as income" },
  { id: "debts", title: "Which debts count" },
  { id: "special-debts", title: "Student loans, cards and other special cases" },
  { id: "conventional", title: "Conventional loans: 36%, 45% and 50%" },
  { id: "fha", title: "FHA loans: 31% and 43%" },
  { id: "va-loans", title: "VA loans: 41% and residual income" },
  { id: "qm", title: "What happened to the 43% rule" },
  { id: "rule-of-thumb", title: "The 28/36 rule of thumb" },
  { id: "limits-table", title: "Limits side by side" },
  { id: "room", title: "How much housing payment fits" },
  { id: "lower", title: "How to lower your DTI" },
  { id: "co-borrower", title: "Applying with a co-borrower" },
  { id: "other-loans", title: "DTI for car and personal loans" },
  { id: "renting", title: "DTI when you rent" },
  { id: "credit", title: "DTI and your credit score" },
  { id: "variable", title: "Self-employed and variable income" },
  { id: "checklist", title: "Before you apply" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Fannie Mae Selling Guide B3-6-02: Debt-to-income ratios", href: "https://selling-guide.fanniemae.com/sel/b3-6-02/debt-income-ratios" },
  { label: "Fannie Mae Selling Guide B3-6-05: Monthly debt obligations", href: "https://selling-guide.fanniemae.com/sel/b3-6-05/monthly-debt-obligations" },
  { label: "HUD: Single Family Housing Policy Handbook 4000.1 (FHA)", href: "https://www.hud.gov/hud-partners/single-family-handbook-4000-1" },
  { label: "VA Lenders Handbook (M26-7), chapter 4: credit underwriting", href: "https://www.benefits.va.gov/WARMS/pam26_7.asp" },
  { label: "CFPB: What is a debt-to-income ratio?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  { label: "CFPB: General QM loan definition final rule", href: "https://www.consumerfinance.gov/rules-policy/final-rules/qualified-mortgage-definition-under-truth-lending-act-regulation-z-general-qm-loan-definition/" },
];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function DtiGuide() {
  return (
    <Guide
      kicker="The debt-to-income guide"
      title="Debt-to-income ratio: what lenders look at and how to improve it"
      intro={
        <>
          Your debt-to-income ratio (DTI) is the share of your gross monthly income that goes on debt payments. Mortgage lenders use it, alongside your
          credit score and down payment, to decide how much you can borrow. This guide explains how DTI is worked out, the limits for conventional, FHA and
          VA loans in 2026 and how to bring your ratio down.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>DTI = monthly debt payments ÷ gross monthly income.</li>
          <li>Front-end DTI counts housing only; back-end DTI counts all debts, housing included.</li>
          <li>Conventional loans go up to 50% through Fannie Mae&rsquo;s Desktop Underwriter; FHA&rsquo;s standard is 31/43; VA&rsquo;s guideline is 41%.</li>
          <li>Under 36% is comfortable for most budgets.</li>
        </ul>
        <KeyStats
          items={[
            { value: "37.6%", label: "$2,820 of debts on $7,500 a month" },
            { value: "28 / 36", label: "Classic rule of thumb" },
            { value: "50%", label: "Conventional maximum (DU)" },
            { value: "31 / 43", label: "FHA standard" },
          ]}
        />
      </GuideSection>

      <GuideSection id="front-back" n={2} kicker="Method" title="Front-end and back-end DTI">
        <p>
          Lenders look at two ratios. The front-end ratio (or housing ratio) is your total housing payment divided by gross monthly income. The back-end
          ratio adds every other monthly debt payment. Here is a household earning $90,000 a year, or $7,500 a month, applying for a home with a $2,100
          monthly payment:
        </p>
        <WorkedExample
          title="$7,500 gross a month"
          steps={[
            { label: "Housing payment (PITI and HOA)", value: "$2,100" },
            { label: "Front-end: $2,100 ÷ $7,500", value: "28.0%" },
            { label: "Car $350 + student loan $250 + cards $120", value: "$720" },
            { label: "All debts: $2,100 + $720", value: "$2,820" },
            { label: "Back-end: $2,820 ÷ $7,500", value: "37.6%" },
          ]}
          total={{ label: "Debt-to-income ratio", value: "28.0% / 37.6%" }}
        />
        <p>
          The housing payment means the new one, not your current rent: principal and interest, property tax, homeowners insurance, any mortgage insurance
          and HOA dues. The <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}adds these up for a given price and rate.
        </p>
      </GuideSection>

      <GuideSection id="income" n={3} kicker="Income" title="What counts as income">
        <p>
          DTI uses gross income, before tax, 401(k) contributions and health insurance. Lenders count income that is stable, documented and likely to
          continue, usually for at least three years:
        </p>
        <ul>
          <li>Salary and hourly wages, from pay stubs and W-2s.</li>
          <li>Overtime, bonuses and commission, usually averaged over the past two years and only if they are likely to continue.</li>
          <li>Self-employment income, averaged from two years of tax returns, after business expenses.</li>
          <li>Social Security, pensions, disability benefits, and alimony or child support you receive (if it will continue).</li>
          <li>Rental income, often at 75% of the rent to allow for vacancies and costs.</li>
        </ul>
        <p>Non-taxable income, such as some Social Security benefits, can often be &ldquo;grossed up&rdquo; (Fannie Mae allows up to 25%), because it carries no income tax.</p>
      </GuideSection>

      <GuideSection id="debts" n={4} kicker="Debts" title="Which debts count">
        <DataTable
          caption="What goes into the back-end ratio"
          head={["Counts", "Does not count"]}
          rows={[
            ["The new housing payment (PITI, mortgage insurance, HOA)", "Utilities, phone and internet"],
            ["Car loans and leases", "Car, health and life insurance"],
            ["Student loans, including deferred ones", "Groceries, gas and other living costs"],
            ["Credit card minimum payments", "Card balances you pay off in full each month (the minimum still counts)"],
            ["Personal loans and other mortgages", "Medical bills you pay as you go"],
            ["Child support and alimony you pay", "Subscriptions and memberships"],
          ]}
        />
        <p>
          Lenders take the payments from your credit report and your application. Co-signed loans count as yours unless you can show the other borrower
          has made the payments for the past 12 months.
        </p>
      </GuideSection>

      <GuideSection id="special-debts" n={5} kicker="Debts" title="Student loans, cards and other special cases">
        <ul>
          <li>
            <strong>Student loans at $0.</strong>{" "}FHA counts 0.5% of the outstanding balance when the credit report shows a $0 payment: $200 a month on a
            $40,000 balance. Fannie Mae can use a documented $0 income-driven payment; for loans in deferment or forbearance it uses 1% of the balance ($400
            on $40,000) or a fully amortizing payment.
          </li>
          <li>
            <strong>Credit cards with no payment shown.</strong>{" "}Fannie Mae uses 5% of the balance if the credit report shows no minimum payment: $150 a
            month on a $3,000 balance.
          </li>
          <li>
            <strong>Loans nearly paid off.</strong>{" "}Fannie Mae can leave out installment debts with ten or fewer payments left, unless the payment is large
            enough to strain your budget. Car leases count however many payments remain.
          </li>
        </ul>
        <p>
          The <a href="/us/loans/student-loan-calculator">student loan calculator</a>{" "}shows the payment on a standard plan if you are not sure what a lender
          will use.
        </p>
      </GuideSection>

      <GuideSection id="conventional" n={6} kicker="Loan limits" title="Conventional loans: 36%, 45% and 50%">
        <p>Most conventional mortgages are sold to Fannie Mae or Freddie Mac, so their rules set the limits. Fannie Mae&rsquo;s Selling Guide says:</p>
        <ul>
          <li>For manually underwritten loans, the maximum back-end DTI is 36%.</li>
          <li>It can go up to 45% if the borrower meets the credit score and reserve requirements in Fannie Mae&rsquo;s eligibility matrix.</li>
          <li>For loans approved through Desktop Underwriter (DU), its automated system, the maximum is 50%.</li>
        </ul>
        <p>
          Most conventional loans go through DU, so 50% is the practical ceiling. DU weighs the whole file, and a high DTI is more likely to be approved
          with a good credit score, a larger down payment and savings left after closing. Fannie Mae sets no separate front-end limit.
        </p>
      </GuideSection>

      <GuideSection id="fha" n={7} kicker="Loan limits" title="FHA loans: 31% and 43%">
        <p>
          FHA loans, insured by HUD, use FHA&rsquo;s TOTAL Mortgage Scorecard for most approvals, which can accept higher ratios. When a loan is
          underwritten by hand, HUD Handbook 4000.1 sets these limits for borrowers with credit scores of 580 or more:
        </p>
        <DataTable
          caption="FHA manual underwriting ratios (front-end / back-end)"
          head={["Ratios", "When allowed"]}
          rows={[
            ["31% / 43%", "No compensating factors needed"],
            ["37% / 47%", "One compensating factor"],
            ["40% / 40%", "No discretionary debt (no debts other than housing)"],
            ["40% / 50%", "Two compensating factors"],
          ]}
        />
        <p>
          Compensating factors include cash reserves, a new housing payment only a little higher than your current one, significant income not counted in
          the ratio, and residual income. Borrowers with scores from 500 to 579 are held to 31/43.
        </p>
      </GuideSection>

      <GuideSection id="va-loans" n={8} kicker="Loan limits" title="VA loans: 41% and residual income">
        <p>
          VA loans for veterans and service members use 41% as a guideline, not a cap. Above 41%, the lender has to explain why the loan is still sound,
          usually by showing residual income well above VA&rsquo;s minimum. Residual income is what is left each month after taxes, the housing payment,
          other debts and an allowance for maintenance and utilities. VA publishes minimums by family size and region, so a family with strong residual
          income can be approved well above 41%.
        </p>
      </GuideSection>

      <GuideSection id="qm" n={9} kicker="Rules" title="What happened to the 43% rule">
        <p>
          You may read that 43% is the most a mortgage can allow. That came from the qualified mortgage (QM) rule that took effect in 2014. The CFPB
          replaced the 43% limit in the general QM definition with a test based on the loan&rsquo;s price (its APR compared with average prime rates), and
          lenders had to follow the new definition from October 1, 2022. Lenders must still consider your DTI or residual income, and the 43% figure lives on
          as FHA&rsquo;s standard back-end limit, but it is no longer a legal ceiling for most loans.
        </p>
      </GuideSection>

      <GuideSection id="rule-of-thumb" n={10} kicker="Budgeting" title="The 28/36 rule of thumb">
        <p>
          The long-standing rule of thumb is to keep housing at or under 28% of gross income and all debts at or under 36%. It is stricter than most loan
          programs, which is the point: it leaves room in your budget for savings, childcare, repairs and the costs DTI ignores. Our{" "}
          <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}uses 28/36 to estimate a price range.
        </p>
        <Callout tone="warn" title="Approved is not the same as affordable">
          At a 50% back-end ratio, half your gross pay goes on debt before tax, retirement saving, food or utilities. A lender may approve it; your budget
          may not enjoy it.
        </Callout>
      </GuideSection>

      <GuideSection id="limits-table" n={11} kicker="Reference" title="Limits side by side">
        <DataTable
          caption="Common DTI limits in 2026"
          head={["Loan type", "Front-end", "Back-end", "Notes"]}
          rows={[
            ["Rule of thumb", "28%", "36%", "A budgeting guide, not a lender rule"],
            ["Conventional, manual", "None", "36%", "Fannie Mae"],
            ["Conventional, manual with strong file", "None", "45%", "Credit score and reserves per Fannie Mae's matrix"],
            ["Conventional through DU", "None", "50%", "Automated approval"],
            ["FHA, manual", "31%", "43%", "Up to 40% / 50% with two compensating factors"],
            ["VA", "None", "41%", "Guideline; residual income decides"],
          ]}
        />
      </GuideSection>

      <GuideSection id="room" n={12} kicker="Example" title="How much housing payment fits">
        <p>
          Turn the limits around and they tell you the largest housing payment you can carry. For the household earning $7,500 a month with $720 of other
          debts, the highest housing payment under each limit is:
        </p>
        <Bars
          format={usd}
          items={[
            { label: "28/36 rule", value: 1980 },
            { label: "FHA 31/43", value: 2325 },
            { label: "VA 41%", value: 2355 },
            { label: "Conventional 45%", value: 2655 },
            { label: "FHA 40/50", value: 3000 },
            { label: "Conventional DU 50%", value: 3030 },
          ]}
        />
        <p>
          Under the 28/36 rule, the $2,100 payment is $120 too high once the other debts are counted: the household would need $7,833 a month of income for
          it to fit. Under every loan program, it fits.
        </p>
      </GuideSection>

      <GuideSection id="lower" n={13} kicker="Improving it" title="How to lower your DTI">
        <p>
          Take someone earning $5,000 a month with a $1,600 housing payment and $900 of other debts, including a $400 car payment. Their ratios are 32% and
          50%, right at the conventional ceiling.
        </p>
        <CompareCards
          columns={[
            {
              name: "Pay off the car loan",
              rows: [
                { label: "Other debts", value: "$500" },
                { label: "Back-end DTI", value: "42%" },
              ],
            },
            {
              name: "Earn $500 more a month",
              rows: [
                { label: "Income", value: "$5,500" },
                { label: "Back-end DTI", value: "45.5%" },
              ],
            },
          ]}
        />
        <ul>
          <li>Pay off small loans or loans with few payments left: removing a whole payment moves DTI the most.</li>
          <li>Pay down credit cards to cut minimum payments. The <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}compares snowball and avalanche plans.</li>
          <li>Add a co-borrower whose income is counted (their debts count too).</li>
          <li>Lower the housing payment: a cheaper home, a bigger down payment or a lower rate.</li>
          <li>Hold off on new car loans or store cards until after closing.</li>
        </ul>
      </GuideSection>

      <GuideSection id="co-borrower" n={14} kicker="Joint applications" title="Applying with a co-borrower">
        <p>
          When two people apply together, lenders add both incomes and both sets of debts. Suppose the $90,000 earner from the example applies with a
          partner who earns $40,000 a year and has a $300 car payment. Gross income rises to $10,833 a month and other debts to $1,020, so the same $2,100
          housing payment gives ratios of 19.4% and 28.8%. Under the 28/36 rule, the highest housing payment that fits rises from $1,980 to $2,880.
        </p>
        <p>
          A co-borrower helps most when they bring income and few debts. Their credit history counts too, so a co-borrower with weak credit can raise
          your rate or make approval harder even while improving your ratios.
        </p>
      </GuideSection>

      <GuideSection id="other-loans" n={15} kicker="Other credit" title="DTI for car and personal loans">
        <p>
          Mortgage lenders publish their limits; most car and personal loan lenders do not. Many still check DTI, and a high ratio can mean a smaller loan
          or a higher rate. Because the new payment is added to your existing debts, it helps to run the numbers before you shop: add the expected
          payment to your other debts and divide by your gross monthly income. If a new car payment would push you over a mortgage limit you hope to meet
          within a year or two, it may be worth waiting.
        </p>
      </GuideSection>

      <GuideSection id="renting" n={16} kicker="Renting" title="DTI when you rent">
        <p>
          Landlords rarely work out a full DTI. Many look instead for gross income of about three times the rent, which is a rent-to-income ratio of about
          33%. If you are planning to buy, your current rent does not count in your DTI, because the new mortgage payment replaces it. The{" "}
          <a href="/us/housing/rent-affordability">rent affordability calculator</a>{" "}works out a comfortable rent for your income.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={17} kicker="Credit" title="DTI and your credit score">
        <p>
          Credit scores do not include your income, so DTI is not part of your score. The two are linked, though: paying down card balances lowers both your
          DTI and your credit utilization, which can raise your score. Lenders look at DTI, score and down payment together, so strength in one can make up
          for weakness in another.
        </p>
      </GuideSection>

      <GuideSection id="variable" n={18} kicker="Income" title="Self-employed and variable income">
        <p>
          If you are self-employed, lenders usually average two years of net profit from your tax returns, after business expenses, so heavy write-offs
          lower the income that counts. A falling trend can reduce it further. If you earn overtime, bonuses or commission, a two-year history helps. Before
          you apply, work out your DTI from the income on your returns, not from your best recent month.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={19} kicker="Next steps" title="Before you apply">
        <ul>
          <li>Pull your free credit reports and check every debt and payment is right.</li>
          <li>Work out your DTI with the new housing payment, not your rent.</li>
          <li>Get documents ready: two years of W-2s or tax returns, recent pay stubs and student loan statements showing your payment.</li>
          <li>Avoid opening new credit until after closing.</li>
          <li>Ask lenders which limit they apply: many set overlays stricter than Fannie Mae, FHA or VA.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "28% / 36%", label: "Rule of thumb" },
            { value: "36% / 45% / 50%", label: "Fannie Mae: manual / strong file / DU" },
            { value: "31% / 43%", label: "FHA standard" },
            { value: "40% / 50%", label: "FHA with two compensating factors" },
            { value: "41%", label: "VA guideline" },
            { value: "0.5%", label: "FHA payment on a $0 student loan" },
            { value: "5%", label: "Fannie Mae card payment if none shown" },
            { value: "Oct 1, 2022", label: "End of the 43% QM limit" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
