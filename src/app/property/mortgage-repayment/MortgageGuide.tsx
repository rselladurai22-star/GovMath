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

/** Mortgage repayments — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "how", title: "How a repayment mortgage works" },
  { id: "example", title: "A worked example" },
  { id: "split", title: "Interest and capital over time" },
  { id: "term", title: "How the term changes the cost" },
  { id: "rate", title: "How the rate changes the cost" },
  { id: "ltv", title: "Your deposit and loan to value" },
  { id: "fixed", title: "Fixed, tracker and variable rates" },
  { id: "interest-only", title: "Repayment or interest-only" },
  { id: "overpaying", title: "Overpaying" },
  { id: "upfront", title: "Costs beyond the monthly payment" },
  { id: "remortgage", title: "Remortgaging" },
  { id: "struggling", title: "If you struggle to pay" },
  { id: "terms", title: "Terms worth knowing" },
  { id: "borrow", title: "How much you can borrow" },
  { id: "compare-deals", title: "Comparing deals with fees" },
  { id: "life", title: "Mortgages and life changes" },
  { id: "protection", title: "Protecting your payments" },
  { id: "end", title: "When the term ends" },
  { id: "five-years", title: "Your first five years" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Mortgages", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home" },
  { label: "FCA — Mortgages: what to expect", href: "https://www.fca.org.uk/consumers/mortgages" },
  { label: "Bank of England — Bank Rate", href: "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate" },
  { label: "GOV.UK — Stamp Duty Land Tax", href: "https://www.gov.uk/stamp-duty-land-tax" },
];

export default function MortgageGuide() {
  return (
    <Guide
      kicker="The mortgage guide"
      title="Mortgage repayments, explained"
      intro={
        <>
          Your monthly payment is only the start. This guide explains how a repayment mortgage pays itself off, why early payments
          are mostly interest, how the term, rate and deposit change what you pay, and how fixed rates, interest-only and
          overpayments affect the total cost of your home.
        </>
      }
      meta={["Updated for 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="how" n={1} kicker="The basics" title="How a repayment mortgage works">
        <p>
          With a repayment mortgage, each monthly payment covers that month&apos;s interest and repays a little of the loan, called
          the capital. The payment is set so that, if the rate stays the same, the loan is cleared exactly at the end of the term.
        </p>
        <p>
          Interest is charged on what you still owe. Early on the balance is high, so most of each payment is interest. As the
          balance falls, the interest shrinks and more of each payment goes to capital. That is why the balance falls slowly at
          first and then faster towards the end.
        </p>
      </GuideSection>

      <GuideSection id="example" n={2} kicker="Worked example" title="A worked example">
        <p>A £350,000 home with a £70,000 deposit (20%), borrowing £280,000 at 4.75% over 25 years:</p>
        <WorkedExample
          title="£280,000 at 4.75% over 25 years"
          steps={[
            { label: "Monthly payment", value: "£1,596.33" },
            { label: "Paid over 25 years", value: "£478,899" },
            { label: "Of which the loan", value: "£280,000" },
          ]}
          total={{ label: "Total interest", value: "£198,899" }}
        />
        <p>
          Interest makes up 41.5% of everything you repay. Every £100,000 borrowed at this rate costs about £570 a month over 25
          years.
        </p>
      </GuideSection>

      <GuideSection id="split" n={3} kicker="Over time" title="Interest and capital over time">
        <DataTable
          caption="The same £280,000 mortgage, year by year"
          head={["Year", "Interest paid", "Capital repaid", "Balance at year end"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", "£13,171", "£5,985", "£274,015"],
            ["5", "£11,921", "£7,235", "£247,024"],
            ["10", "£9,986", "£9,170", "£205,228"],
            ["11", "£9,541", "£9,615", "£195,613"],
            ["15", "£7,533", "£11,623", "£152,252"],
            ["20", "£4,424", "£14,732", "£85,106"],
            ["25", "£484", "£18,672", "£0"],
          ]}
        />
        <p>
          In year one, about 69p of every £1 goes on interest. It is not until year 11 that more of each payment goes to capital
          than to interest. After 10 years you still owe £205,228, nearly three-quarters of the original loan.
        </p>
      </GuideSection>

      <GuideSection id="term" n={4} kicker="The term" title="How the term changes the cost">
        <p>A longer term lowers the monthly payment but adds a lot of interest:</p>
        <DataTable
          caption="£280,000 at 4.75%"
          head={["Term", "Monthly payment", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["20 years", "£1,809", "£154,262"],
            ["25 years", "£1,596", "£198,899"],
            ["30 years", "£1,461", "£245,821"],
            ["35 years", "£1,369", "£294,896"],
          ]}
        />
        <p>
          Stretching from 25 to 35 years saves £228 a month but costs £95,997 more in interest. A longer term can make sense to keep
          payments affordable, especially if you plan to overpay later or shorten the term when you remortgage.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={5} kicker="The rate" title="How the rate changes the cost">
        <p>Small changes in rate make a big difference on a large loan:</p>
        <Bars
          items={[
            { label: "3.75%", value: 1_440 },
            { label: "4.75%", value: 1_596 },
            { label: "5.75%", value: 1_762 },
            { label: "6.75%", value: 1_935 },
          ]}
          format={(n) => `£${n.toLocaleString("en-GB")} a month`}
        />
        <p>
          Each 1 point rise adds roughly £155 to £175 a month on £280,000 over 25 years, and around £50,000 in interest over the full
          term. That is why lenders test whether you could afford a higher rate before they lend.
        </p>
      </GuideSection>

      <GuideSection id="ltv" n={6} kicker="Your deposit" title="Your deposit and loan to value">
        <p>
          Loan to value (LTV) is the mortgage as a share of the price. Lenders set rates in bands, typically at 95%, 90%, 85%, 80%,
          75% and 60%. Moving into a lower band usually brings a lower rate.
        </p>
        <DataTable
          caption="A £350,000 home at 4.75% over 25 years"
          head={["Deposit", "Loan", "LTV", "Monthly payment"]}
          numeric={[1, 3]}
          rows={[
            ["£17,500", "£332,500", "95%", "£1,896"],
            ["£35,000", "£315,000", "90%", "£1,796"],
            ["£52,500", "£297,500", "85%", "£1,696"],
            ["£70,000", "£280,000", "80%", "£1,596"],
            ["£87,500", "£262,500", "75%", "£1,497"],
          ]}
        />
        <p>
          These figures use the same rate throughout. In practice, a 95% mortgage usually has a higher rate than a 75% one, so the
          difference in payments is larger still.
        </p>
      </GuideSection>

      <GuideSection id="fixed" n={7} kicker="Deal types" title="Fixed, tracker and variable rates">
        <CompareCards
          columns={[
            { name: "Fixed rate", rows: [{ label: "Rate", value: "Set for 2, 3, 5 or 10 years" }, { label: "Good for", value: "Certainty and budgeting" }, { label: "Watch for", value: "Early repayment charges" }] },
            { name: "Tracker", rows: [{ label: "Rate", value: "Bank Rate plus a margin" }, { label: "Good for", value: "Benefiting when rates fall" }, { label: "Watch for", value: "Payments rise with Bank Rate" }] },
            { name: "Standard variable", rows: [{ label: "Rate", value: "Set by the lender" }, { label: "Good for", value: "Flexibility, no tie-in" }, { label: "Watch for", value: "Usually the most expensive" }] },
          ]}
        />
        <p>
          When a fixed or tracker deal ends, you move to the lender&apos;s standard variable rate unless you switch. That rate is
          often much higher, so most people remortgage or take a new deal with their lender a few months before the end.
        </p>
      </GuideSection>

      <GuideSection id="interest-only" n={8} kicker="Mortgage types" title="Repayment or interest-only">
        <p>
          With interest-only, you pay only the interest each month and repay the whole loan at the end. On £280,000 at 4.75%, that
          is £1,108 a month instead of £1,596, but after 25 years you still owe £280,000 and will have paid £332,500 in interest.
        </p>
        <Callout tone="warn" title="You need a plan to repay">
          Lenders only offer interest-only on a home you live in if you have a credible plan to repay, such as investments, a
          pension lump sum or selling. Part-and-part mortgages combine the two.
        </Callout>
      </GuideSection>

      <GuideSection id="overpaying" n={9} kicker="Paying less" title="Overpaying">
        <p>
          Paying extra reduces the balance straight away, so you pay less interest from then on. On the £280,000 example, £200 a
          month extra saves £42,508 of interest and clears the mortgage 4 years 9 months early. Most fixed deals let you overpay up
          to 10% of the balance a year without a charge.
        </p>
        <p>Our mortgage overpayment calculator models monthly and lump-sum overpayments in detail.</p>
      </GuideSection>

      <GuideSection id="upfront" n={10} kicker="Budget" title="Costs beyond the monthly payment">
        <ul>
          <li><strong>Stamp Duty</strong> in England and Northern Ireland, LBTT in Scotland or LTT in Wales.</li>
          <li><strong>Mortgage fees</strong>, such as an arrangement fee, which can sometimes be added to the loan.</li>
          <li><strong>Legal fees, searches and a survey.</strong></li>
          <li><strong>Buildings insurance</strong>, which lenders require from exchange of contracts.</li>
          <li><strong>Ongoing costs</strong> such as maintenance, service charges and council tax.</li>
        </ul>
        <p>A £350,000 home bought by a home mover in England carries £7,500 of Stamp Duty; a first-time buyer pays £2,500.</p>
      </GuideSection>

      <GuideSection id="remortgage" n={11} kicker="Switching" title="Remortgaging">
        <Timeline
          items={[
            { when: "6 months before", what: "Start looking", detail: "Many lenders let you lock in a new deal up to six months before your current one ends." },
            { when: "3 months before", what: "Compare", detail: "Compare a product transfer with your lender against deals elsewhere, including fees." },
            { when: "At the end of the deal", what: "Switch", detail: "Move without an early repayment charge. Consider overpaying or shortening the term at this point." },
          ]}
        />
        <p>
          Your balance will have fallen and your home may be worth more, so your LTV is often lower when you remortgage, which can
          mean a better rate.
        </p>
      </GuideSection>

      <GuideSection id="struggling" n={12} kicker="Help" title="If you struggle to pay">
        <p>
          Contact your lender as soon as you think you might miss a payment. Lenders must treat you fairly and consider options such
          as a temporary switch to interest-only, extending the term or a payment plan for arrears. Free debt advice is available
          from MoneyHelper and debt charities. Missing payments without talking to your lender can lead to fees, damage to your
          credit file and, in the worst case, repossession.
        </p>
      </GuideSection>

      <GuideSection id="terms" n={13} kicker="Jargon" title="Terms worth knowing">
        <DataTable
          caption="Mortgage terms in plain English"
          head={["Term", "What it means"]}
          rows={[
            ["Capital", "The amount you borrowed and still owe"],
            ["LTV", "Loan to value: the mortgage as a share of the home's value"],
            ["ERC", "Early repayment charge for leaving or overpaying a deal early"],
            ["SVR", "Standard variable rate, the lender's default rate"],
            ["Product transfer", "Moving to a new deal with your current lender"],
            ["Porting", "Taking your mortgage deal with you to a new home"],
            ["Decision in principle", "A lender's early indication of how much it might lend"],
          ]}
        />
      </GuideSection>

      <GuideSection id="borrow" n={14} kicker="Borrowing" title="How much you can borrow">
        <p>
          Most lenders lend up to about 4 to 4.5 times your yearly income, less if you have debts or childcare costs, and check
          that you could still afford the payments if rates rose. Two incomes usually mean a bigger loan. Our mortgage
          affordability calculator estimates your limit, the payment, and how a rate rise would affect it.
        </p>
        <p>
          The amount you can borrow is not always the amount you should. A payment that only just fits your budget today leaves no
          room for higher rates when your fix ends.
        </p>
      </GuideSection>

      <GuideSection id="compare-deals" n={15} kicker="Choosing a deal" title="Comparing deals with fees">
        <p>
          A deal with a lower rate often comes with a higher fee. Compare the total cost over the fixed period, not just the rate.
          On £280,000 over 25 years with a 2-year fix:
        </p>
        <DataTable
          caption="Two 2-year fixed deals on £280,000"
          head={["", "4.49% with £999 fee", "4.89% with no fee"]}
          numeric={[1, 2]}
          rows={[
            ["Monthly payment", "£1,554.74", "£1,618.96"],
            ["Payments over 2 years plus fee", "£38,313", "£38,855"],
            ["Balance after 2 years", "£267,292", "£267,975"],
          ]}
        />
        <p>
          Here the lower rate wins despite the fee: it costs £542 less over the two years and leaves £683 less to repay. On a much
          smaller loan, the no-fee deal is often cheaper. Adding the fee to the loan means paying interest on it too.
        </p>
      </GuideSection>

      <GuideSection id="life" n={16} kicker="Life events" title="Mortgages and life changes">
        <ul>
          <li>
            <strong>Moving home.</strong> Many deals are portable, so you can take the rate to a new home and top up with extra
            borrowing, avoiding an early repayment charge.
          </li>
          <li>
            <strong>A fall in income.</strong> Talk to your lender early. Extending the term or a temporary arrangement can lower
            payments.
          </li>
          <li>
            <strong>Separation.</strong> One person can take over the mortgage only if the lender agrees they can afford it alone.
          </li>
          <li>
            <strong>Retirement.</strong> Lenders check affordability on your expected pension income if the term runs past
            retirement.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="protection" n={17} kicker="Insurance" title="Protecting your payments">
        <p>
          Life insurance can pay off the mortgage if you die, protecting anyone you live with. Critical illness cover pays out on
          diagnosis of a serious illness, and income protection replaces part of your income if you cannot work. None is
          compulsory, though lenders require buildings insurance. Check what your employer already provides before you buy cover.
        </p>
      </GuideSection>

      <GuideSection id="end" n={18} kicker="The finish line" title="When the term ends">
        <p>
          On a repayment mortgage, your last payment clears the loan. The lender sends a closing statement and removes its charge
          from your property&apos;s title, and you own your home outright. Keep the closing letter with your property documents.
        </p>
        <p>
          On interest-only, the whole loan is due at the end. Lenders contact you in the years before to check your repayment plan.
        </p>
      </GuideSection>

      <GuideSection id="five-years" n={19} kicker="A typical fix" title="Your first five years">
        <p>
          Many borrowers take a 5-year fix. On the £280,000 example at 4.75%, here is where the money goes over those five years:
        </p>
        <WorkedExample
          title="The first five years"
          steps={[
            { label: "Payments made", note: "£1,596.33 × 60", value: "£95,780" },
            { label: "Of which interest", value: "£62,804" },
            { label: "Of which capital", value: "£32,976" },
          ]}
          total={{ label: "Balance when the fix ends", value: "£247,024" }}
        />
        <p>
          About two-thirds of everything paid in the first five years is interest. When you remortgage, you will be borrowing
          £247,024 over the remaining 20 years, at whatever rates are available then. If rates are higher, you could keep the
          payment down by extending the term back to 25 years, at the cost of more interest.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={20} kicker="FAQs" title="Common questions">
        <h3>Why has my balance barely moved?</h3>
        <p>Early payments are mostly interest. On the example, only £5,985 of the first year&apos;s £19,156 of payments repays capital.</p>
        <h3>Is a longer term a bad idea?</h3>
        <p>
          It costs more in interest, but lower payments can make borrowing affordable. You can overpay or shorten the term later if
          your income rises.
        </p>
        <h3>How is mortgage interest worked out?</h3>
        <p>Most UK lenders charge interest daily or monthly on the outstanding balance. The calculator uses monthly interest, so small differences are normal.</p>
        <h3>Should I fix for 2 or 5 years?</h3>
        <p>A longer fix gives certainty for longer but can carry higher early repayment charges. It depends on whether you value certainty or flexibility more.</p>
        <h3>Can I pay off my mortgage early?</h3>
        <p>Yes. During a fixed deal an early repayment charge may apply; at the end of a deal you can usually repay any amount free.</p>
        <h3>What happens if interest rates fall during my fix?</h3>
        <p>
          Your payment stays the same until the fix ends. Leaving early to get a lower rate usually means an early repayment
          charge, which often outweighs the saving.
        </p>
        <h3>Do I need a deposit for a remortgage?</h3>
        <p>
          No. Your equity in the home acts as the deposit. The more equity you have, the lower your loan-to-value and usually the
          better the rate.
        </p>
        <h3>Can I borrow more when I remortgage?</h3>
        <p>
          Often, yes, for home improvements or other purposes, subject to affordability. Borrowing more extends the debt and the
          interest you pay, so consider it carefully.
        </p>
        <h3>Does a bigger deposit lower my rate?</h3>
        <p>
          Usually, once it moves you into a lower loan-to-value band. Going from 90% to 85% LTV, for example, often unlocks a
          noticeably cheaper deal, which lowers your payment on top of the smaller loan.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£570", label: "Monthly cost per £100,000 at 4.75% over 25 years" },
            { value: "Year 11", label: "When capital overtakes interest on that loan" },
            { value: "41.5%", label: "Share of total repayments that is interest" },
            { value: "10%", label: "Typical yearly overpayment allowance" },
            { value: "6 months", label: "How early you can often lock in a remortgage" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
