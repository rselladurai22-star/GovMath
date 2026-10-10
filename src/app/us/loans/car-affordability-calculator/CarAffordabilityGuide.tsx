import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Car affordability guide. Figures from src/lib/us/borrowing.ts (carBudget, rule20410, fuelPerMonth). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rule", title: "The 20/4/10 rule" },
  { id: "example", title: "A worked example" },
  { id: "income", title: "What the rule allows by income" },
  { id: "gross-net", title: "Gross or take-home pay" },
  { id: "backwards", title: "Working back from the payment" },
  { id: "term", title: "Why longer loans mislead" },
  { id: "rate", title: "The rate and your credit" },
  { id: "down", title: "Down payment and trade-in" },
  { id: "tax", title: "Sales tax and fees" },
  { id: "running", title: "Insurance and fuel" },
  { id: "ownership", title: "The full cost of owning a car" },
  { id: "new-used", title: "New or used" },
  { id: "debts", title: "Your other debts" },
  { id: "lease", title: "What about leasing?" },
  { id: "dealer", title: "At the dealership" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "AAA: New vehicle ownership costs hit $12,863 annually (September 2026)", href: "https://newsroom.aaa.com/2026/09/aaa-new-vehicle-ownership-costs-hit-12863-annually/" },
  { label: "AAA: Your Driving Costs 2025 fact sheet (insurance and fuel)", href: "https://newsroom.aaa.com/wp-content/uploads/2025/09/UPDATE-AAA-Fact-Sheet-Your-Driving-Cost-9.2025-1.pdf" },
  { label: "Federal Reserve: Consumer Credit (G.19), auto loan rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "CFPB: Auto loans and car buying", href: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
  { label: "Tax Foundation: State and local sales tax rates, midyear 2026", href: "https://taxfoundation.org/data/all/state/2026-sales-tax-rates/" },
];

export default function CarAffordabilityGuide() {
  return (
    <Guide
      kicker="The car budget guide"
      title="How much car you can really afford"
      intro={
        <>
          Dealers sell cars by the monthly payment, and almost any car can be made to fit a payment by stretching the loan. A better question is what share of your income the
          car should take, all costs included. This guide explains the 20/4/10 rule, how to turn a budget into a price, and the costs that are easy to forget.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The 20/4/10 rule: 20% down, a loan of 4 years at most, and the payment, insurance and fuel under 10% of gross monthly pay.</li>
          <li>On a {usd(72_000)} salary, with {usd(140)} a month for insurance and {usd(185)} for fuel, the rule allows a car of about {usd(12_154)}.</li>
          <li>Spending 10% of gross pay on all car costs with a 60-month loan and {usd(4_000)} down allows about {usd(15_817)}.</li>
          <li>A longer loan buys a pricier car for the same payment, but at a much higher cost.</li>
        </ul>
        <KeyStats
          items={[
            { value: "20/4/10", label: "Down / loan years / share of gross pay" },
            { value: usd(12_154), label: "20/4/10 price on a $72,000 salary" },
            { value: usd(12_863), label: "Yearly cost of owning a new car (AAA, 2026)" },
            { value: "about 7.5%", label: "Average 60-month new car rate at banks (Fed, Aug 2026)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rule" n={2} kicker="Rule of thumb" title="The 20/4/10 rule">
        <p>
          The 20/4/10 rule is a rule of thumb used by many financial planners. It is not a law or a lender&rsquo;s requirement, but each part guards against a common mistake:
        </p>
        <ul>
          <li>
            <strong>20% down</strong> means you owe less than the car is worth from day one, even though a new car loses value quickly.
          </li>
          <li>
            <strong>4 years</strong> keeps interest low and gets the loan paid off while the car is still in good shape.
          </li>
          <li>
            <strong>10% of gross pay</strong> for the payment and insurance (this calculator adds fuel too) leaves the rest of your budget for housing, saving and everything else.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="The 20/4/10 rule on a $72,000 salary, 7.5% loan, 7% sales tax and $800 of fees"
          steps={[
            { label: "Gross monthly pay", value: usd(6_000) },
            { label: "10% for the car", value: usd(600) },
            { label: "Less insurance and fuel", value: `−${usd(325)}` },
            { label: "Left for the payment", value: usd(275) },
            { label: "Loan that supports, 48 months at 7.5%", value: usd(11_374) },
            { label: "20% down needed", value: usd(2_431) },
          ]}
          total={{ label: "Car price under the rule", value: usd(12_154) }}
        />
        <p>
          The loan covers 80% of the price plus the sales tax and fees. That is a modest car, and it shows why the rule is strict: insurance and fuel take more than half of the
          10% before any payment.
        </p>
      </GuideSection>

      <GuideSection id="income" n={4} kicker="By income" title="What the rule allows by income">
        <DataTable
          caption="Car price with $140 insurance and $185 fuel a month, 7.5%, 7% tax, $800 fees"
          head={["Yearly gross pay", "20/4/10 rule (48 months, 20% down)", "10% of gross, 60 months, $4,000 down"]}
          numeric={[1, 2]}
          rows={[
            [usd(48_000), usd(2_646), usd(6_489)],
            [usd(60_000), usd(7_400), usd(11_153)],
            [usd(72_000), usd(12_154), usd(15_817)],
            [usd(96_000), usd(21_661), usd(25_145)],
            [usd(120_000), usd(31_169), usd(34_473)],
            [usd(150_000), usd(43_053), usd(46_133)],
          ]}
        />
        <p>
          Because insurance and fuel cost much the same whatever you earn, they take a big share of a small budget. Below about {usd(40_000)} a year, they use up the whole 10%
          on their own, and the rule points to a cheap used car bought mostly for cash.
        </p>
      </GuideSection>

      <GuideSection id="gross-net" n={5} kicker="Income" title="Gross or take-home pay">
        <p>
          The 20/4/10 rule uses gross pay, before tax. But you pay for the car out of take-home pay, after federal and state income tax, Social Security, Medicare, retirement
          savings and health insurance. Some planners prefer a budget of 15% to 20% of take-home pay for all car costs. On {usd(4_700)} a month of take-home pay, 15% for the
          payment alone is {usd(705)}, which supports a car of about {usd(35_872)} over 60 months: far more than the 20/4/10 rule, because it leaves insurance and fuel outside
          the budget. Our <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}shows your take-home pay.
        </p>
      </GuideSection>

      <GuideSection id="backwards" n={6} kicker="The maths" title="Working back from the payment">
        <p>
          The calculator turns a monthly payment into a price in two steps. First, the loan a payment supports is the payment divided by the payment on one dollar: at 7.5% over 60
          months, {usd(275)} a month supports about {usd(13_724)}. Then it works out the sticker price whose loan, after your down payment and with sales tax and fees added,
          comes to that amount. With {usd(4_000)} down, 7% tax and {usd(800)} of fees, that is about {usd(15_817)}.
        </p>
      </GuideSection>

      <GuideSection id="term" n={7} kicker="Term" title="Why longer loans mislead">
        <Bars
          format={usd}
          items={[
            { label: "36 months", value: 11_253 },
            { label: "48 months", value: 13_620 },
            { label: "60 months", value: 15_817 },
            { label: "72 months", value: 17_855 },
            { label: "84 months", value: 19_747 },
          ]}
        />
        <p>
          The same {usd(275)} payment at 7.5% buys about {usd(11_253)} of car over 36 months and {usd(19_747)} over 84 months. The longer loan costs {usd(5_171)} in interest
          instead of {usd(1_059)}, and you will likely owe more than the car is worth for most of the loan. If the car is totaled or you need to sell, that gap comes out of your
          pocket. Long loans are why the rule says 4 years.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={8} kicker="Rate" title="The rate and your credit">
        <p>
          The Federal Reserve&rsquo;s survey put the average bank rate on a 60-month new car loan at about 7.5% in August 2026. Used car loans and weaker credit cost more. With
          {" "}{usd(275)} a month over 60 months, the loan you can get falls from about {usd(14_572)} at 5% to {usd(11_819)} at 14%. Get pre-approved by a bank or credit union
          before you visit the dealer, so you know your rate and can judge the dealer&rsquo;s financing offer.
        </p>
      </GuideSection>

      <GuideSection id="down" n={9} kicker="Cash" title="Down payment and trade-in">
        <p>
          Every dollar down is a dollar you do not borrow or pay interest on. Trade-in equity, the value minus what you still owe, works the same way. With the 10% budget above,
          an {usd(8_000)} trade-in with {usd(3_000)} owed lifts the price you can afford from {usd(15_817)} to about {usd(21_013)}, partly because in most states sales tax is
          charged only on the price after the trade-in. If you owe {usd(11_000)} on that {usd(8_000)} car instead, the {usd(3_000)} shortfall is rolled into the new loan and the
          price falls to about {usd(13_536)}.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Tax" title="Sales tax and fees">
        <p>
          Sales tax on a car is often several thousand dollars: on a {usd(15_817)} car at 7%, about {usd(1_107)}. Most states charge it on the price minus your trade-in;
          California, Hawaii and Virginia charge it on the full price. Add title, registration and dealer documentation fees. The calculator assumes you finance the tax and fees,
          so they come out of the same payment budget. Paying them in cash saves interest. Our <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}shows the full
          loan once you have chosen a car.
        </p>
      </GuideSection>

      <GuideSection id="running" n={11} kicker="Running costs" title="Insurance and fuel">
        <p>
          AAA&rsquo;s 2025 driving cost study put full coverage insurance at about {usd(1_694)} a year for a typical driver, about {usd(141)} a month, but quotes vary widely
          by state, age, driving record and car. Get a quote before you buy: sporty or expensive models can cost far more to insure. Fuel depends on miles and fuel economy:
          15,000 miles a year at 28 mpg and $4.15 a gallon, the price AAA used in its 2026 study, is about {usd(185)} a month.
        </p>
        <CompareCards
          columns={[
            { name: "28 mpg", rows: [{ label: "Gallons a year", value: "536" }, { label: "Fuel a month", value: usd(185) }] },
            { name: "40 mpg", rows: [{ label: "Gallons a year", value: "375" }, { label: "Fuel a month", value: usd(130) }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="ownership" n={12} kicker="Full cost" title="The full cost of owning a car">
        <p>
          AAA&rsquo;s 2026 study put the average cost of owning and running a new car at {usd(12_863)} a year, about {usd(1_072)} a month, over five years and 75,000 miles. The
          largest part was depreciation, the loss in value, at about {usd(4_422)} a year. The rest is fuel, insurance, maintenance, repairs, tires, finance charges, registration
          and taxes. Set aside money each month for maintenance and repairs even on a new car; tires and brakes come sooner than most people expect.
        </p>
      </GuideSection>

      <GuideSection id="new-used" n={13} kicker="Choice" title="New or used">
        <p>
          A new car loses value fastest in its first few years. A car two to four years old has taken much of that loss, often still has warranty left, and costs less to insure.
          Loans on used cars carry higher rates, so compare the total cost, not just the price. A certified pre-owned car can be a middle ground, with an inspection and an
          extended warranty.
        </p>
      </GuideSection>

      <GuideSection id="debts" n={14} kicker="Lenders" title="Your other debts">
        <p>
          Lenders look at your debt-to-income ratio: all monthly debt payments, including rent or a mortgage, divided by gross monthly income. A car payment that fits your budget
          can still push that ratio above what a mortgage lender will accept later. If you plan to buy a home soon, keep the car modest. Our{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows where you stand.
        </p>
      </GuideSection>

      <GuideSection id="lease" n={15} kicker="Leasing" title="What about leasing?">
        <p>
          Leasing gives a lower payment for the same car, because you pay only for the value it loses while you drive it. It can make sense if you want a new car every few years
          and drive a predictable number of miles, but you never stop paying. Our <a href="/us/loans/car-lease-calculator">car lease calculator</a>{" "}compares a lease with
          buying.
        </p>
      </GuideSection>

      <GuideSection id="dealer" n={16} kicker="Buying" title="At the dealership">
        <Callout title="Negotiate the price, not the payment">
          If you tell a salesperson the payment you want, they can hit it by stretching the loan or trimming the trade-in value. Agree the out-the-door price first, then the
          trade-in, then the financing, one at a time.
        </Callout>
        <Callout tone="warn" title="Watch the add-ons">
          Extended warranties, paint protection, gap coverage and service plans are often added at the finance desk and rolled into the loan. Each one is optional; ask for the
          price of each and decide separately.
        </Callout>
      </GuideSection>

      <GuideSection id="using" n={17} kicker="How to use it" title="Using the calculator">
        <p>
          Enter your yearly income, choose whether to measure the budget against gross or take-home pay, and set the share you are comfortable with. Add your down payment, loan
          rate and term. Under More options, set insurance, mileage, fuel economy and gas price, add a trade-in and pick your state for sales tax. The results show the price you
          can afford, a check against the 20/4/10 rule, and how the term and budget share change the answer.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["20/4/10 rule", "20% down, 4 years at most, 10% of gross pay"],
            ["Yearly cost of owning a new car (AAA, 2026)", usd(12_863)],
            ["Depreciation, the largest part (AAA, 2026)", `${usd(4_422)} a year`],
            ["Full coverage insurance (AAA, 2025)", `about ${usd(1_694)} a year`],
            ["Regular gas price used by AAA (2026 study)", "$4.152 a gallon"],
            ["Average 60-month new car loan rate at banks (Fed G.19, August 2026)", "about 7.5%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
