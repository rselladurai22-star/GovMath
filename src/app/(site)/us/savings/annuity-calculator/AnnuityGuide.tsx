import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Annuities (US) — the guide. Figures from src/lib/us/investing.ts (annuityIncome, annuityCost, annuityFactor, annuityFvFactor, annuityBalances, lifeExpectancy). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const cents = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an annuity is" },
  { id: "types", title: "Types of annuity" },
  { id: "how", title: "How the calculator works" },
  { id: "example", title: "A worked example" },
  { id: "paid-back", title: "How the premium is paid back" },
  { id: "lifetime", title: "Income for life" },
  { id: "age", title: "How age changes the income" },
  { id: "rates", title: "How interest rates change the income" },
  { id: "cost", title: "The cost of a target income" },
  { id: "inflation", title: "Inflation and rising payments" },
  { id: "timing", title: "Ordinary annuity vs annuity due" },
  { id: "pv-fv", title: "Present and future value" },
  { id: "options", title: "Payout options" },
  { id: "tax", title: "How annuity income is taxed" },
  { id: "safety", title: "What protects your money" },
  { id: "fees", title: "Fees and surrender charges" },
  { id: "vs-withdrawals", title: "Annuity or your own withdrawals?" },
  { id: "social-security", title: "Social Security is an annuity too" },
  { id: "checklist", title: "Before you buy" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Investor.gov (SEC) — Annuities", href: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/insurance-products/annuities" },
  { label: "Investor.gov (SEC) — Immediate annuity", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/immediate-annuity" },
  { label: "Investor.gov (SEC) — Annuity due", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/annuity-due" },
  { label: "CFPB — What is an annuity?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-annuity-en-1987/" },
  { label: "IRS — Publication 939, General rule for pensions and annuities", href: "https://www.irs.gov/publications/p939" },
  { label: "IRS — Topic no. 410, Pensions and annuities", href: "https://www.irs.gov/taxtopics/tc410" },
  { label: "IRS — Publication 590-B, Appendix B (Single Life Table)", href: "https://www.irs.gov/publications/p590b" },
  { label: "NOLHGA — Life and health insurance guaranty associations", href: "https://www.nolhga.com/" },
];

export default function AnnuityGuide() {
  return (
    <Guide
      kicker="The annuity guide"
      title="How annuities turn savings into income"
      intro={
        <>
          An annuity swaps a lump sum for a stream of payments, for a set number of years or for the rest of your life. This guide explains how
          the payments are worked out, what changes them, the maths of present and future value, and what to check before you buy.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>At 5%, {usd(200_000)} pays about {cents(1_319.91)} a month for 20 years, {usd(316_779)} in total.</li>
          <li>Spread over the average life expectancy at 65 (22.9 years), the same {usd(200_000)} pays about {cents(1_223.18)} a month.</li>
          <li>An income of {usd(1_000)} a month for 25 years costs about {usd(171_060)} at 5%.</li>
          <li>Real quotes depend on the insurer, your age, sex and health, and fees; use this as a yardstick.</li>
        </ul>
        <KeyStats
          items={[
            { value: cents(1_319.91), label: "$200,000, 5%, 20 years, a month" },
            { value: cents(1_223.18), label: "$200,000, 5%, life from 65 (est.)" },
            { value: usd(171_060), label: "Cost of $1,000 a month for 25 years" },
            { value: "22.9 years", label: "Life expectancy at 65 (IRS table)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an annuity is">
        <p>
          An annuity is a contract with an insurance company. You pay a premium, either as one lump sum or over time, and the insurer promises
          payments back. The insurer invests the premium, mostly in bonds, and pays you from both the premium and what it earns.
        </p>
        <p>
          &quot;Annuity&quot; is also a maths term for any series of equal, regular payments, such as loan repayments, rent or a pension. The
          formulas in this calculator apply to all of them.
        </p>
      </GuideSection>

      <GuideSection id="types" n={3} kicker="Products" title="Types of annuity">
        <CompareCards
          columns={[
            {
              name: "Immediate",
              rows: [
                { label: "Income starts", value: "Within a year" },
                { label: "Used for", value: "Turning savings into income now" },
              ],
            },
            {
              name: "Deferred",
              rows: [
                { label: "Income starts", value: "Years later" },
                { label: "Used for", value: "Growing money tax-deferred, then income" },
              ],
            },
          ]}
        />
        <p>
          Deferred annuities come as fixed (a set rate, like a CD from an insurer), variable (invested in funds, with market risk) and indexed
          (returns linked to a stock index with caps and floors). This calculator models a fixed immediate annuity, the simplest kind, or the
          payout phase of a deferred one.
        </p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="Method" title="How the calculator works">
        <p>
          The income is the payment that turns the lump sum into exactly zero by the last payment, with interest added on what is left each month.
          That payment is the lump sum divided by the annuity&rsquo;s present value factor:
        </p>
        <p>
          <strong>Payment = Lump sum × i ÷ (1 − (1 + i)<sup>−n</sup>)</strong>, where i is the rate per period (the yearly rate ÷ 12 for
          monthly payments) and n is the number of payments.
        </p>
        <p>
          Working out the cost of an income runs the formula the other way. When payments rise each year, the calculator values each payment
          separately and adds them up.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$200,000 at 5% a year, paid monthly for 20 years"
          steps={[
            { label: "Rate per month: 5% ÷ 12", value: "0.4167%" },
            { label: "Number of payments: 20 × 12", value: "240" },
            { label: "Monthly payment", value: cents(1_319.91) },
            { label: "Total received", value: usd(316_779) },
            { label: "Of which interest", value: usd(116_779) },
          ]}
          total={{ label: "Years to get the premium back", value: "12.7" }}
        />
      </GuideSection>

      <GuideSection id="paid-back" n={6} kicker="Over time" title="How the premium is paid back">
        <DataTable
          caption="$200,000 at 5%, $1,319.91 a month: value left at each point"
          head={["After year", "Value left"]}
          numeric={[1]}
          rows={[
            ["0", usd(200_000)],
            ["5", usd(166_910)],
            ["10", usd(124_443)],
            ["15", usd(69_943)],
            ["20", "$0"],
          ]}
        />
        <p>
          Early payments are mostly interest on a large balance; later ones mostly return your own money. Over the whole term, about 63.1% of
          the money you receive is your premium coming back and 36.9% is interest.
        </p>
      </GuideSection>

      <GuideSection id="lifetime" n={7} kicker="Longevity" title="Income for life">
        <p>
          A lifetime annuity pays until you die, however long that is. Insurers can afford this because they pool many buyers: those who die
          early leave money that pays those who live long. To estimate the income, the calculator spreads payments over your life expectancy from
          the IRS Single Life Table, which the IRS publishes for required distributions from inherited retirement accounts.
        </p>
        <Callout tone="warn" title="An estimate, not a quote">
          Insurers price with their own tables, by sex and sometimes health, plus a margin for costs and profit. Many quotes for a 65-year-old
          will differ from the figure here. Use the calculator to judge whether a quote is reasonable, not to predict it.
        </Callout>
      </GuideSection>

      <GuideSection id="age" n={8} kicker="Age" title="How age changes the income">
        <Figure label="Monthly income from $100,000 at 5%, for life (estimate)" caption="Payments spread over IRS Single Life Table life expectancy.">
          <Bars
            format={cents}
            items={[
              { label: "From 60 (27.1 years)", value: 562.22 },
              { label: "From 65 (22.9 years)", value: 611.59 },
              { label: "From 70 (18.8 years)", value: 683.89 },
              { label: "From 75 (14.8 years)", value: 796.77 },
              { label: "From 80 (11.2 years)", value: 975.4 },
            ]}
          />
        </Figure>
        <p>
          The older you are when payments start, the fewer payments the insurer expects to make, so each one is bigger. Waiting also means
          spending other savings in the meantime, so the best age depends on your whole plan.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={9} kicker="Rates" title="How interest rates change the income">
        <DataTable
          caption="$200,000 paid monthly for 20 years"
          head={["Interest rate", "Monthly income"]}
          numeric={[1]}
          rows={[
            ["3%", cents(1_109.2)],
            ["4%", cents(1_211.96)],
            ["5%", cents(1_319.91)],
            ["6%", cents(1_432.86)],
            ["7%", cents(1_550.6)],
          ]}
        />
        <p>
          Annuity payouts follow bond yields. Buying when rates are high locks in a higher income for good; buying when they are low locks in a
          lower one. Some people spread purchases over several years to average out the rate.
        </p>
      </GuideSection>

      <GuideSection id="cost" n={10} kicker="Planning" title="The cost of a target income">
        <p>
          Switch the calculator to &quot;Cost of a target income&quot; to see what a given income would cost. An income of {usd(1_000)} a month
          for 25 years costs about {usd(171_060)} at 5%, against {usd(300_000)} of payments received. This is a useful way to see what part of
          your spending a guaranteed income could cover. Our <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}shows the
          gap between your spending and Social Security.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={11} kicker="Real value" title="Inflation and rising payments">
        <p>
          A fixed annuity pays the same dollars every year, but prices rise. At 2.5% inflation, a payment is worth about 40% less in today&rsquo;s
          money after 20 years. Some insurers offer payments that rise by a set percentage each year. For the same {usd(200_000)} at 5% over 20
          years, payments rising 2% a year start at {cents(1_122.41)} a month instead of {cents(1_319.91)}, but total {usd(327_260)} instead of{" "}
          {usd(316_779)}. A rising income of {usd(1_000)} a month for 25 years costs {usd(208_340)} instead of {usd(171_060)}. The{" "}
          <a href="/us/savings/inflation-calculator">inflation calculator</a>{" "}shows how much prices have risen in the past.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={12} kicker="Maths" title="Ordinary annuity vs annuity due">
        <CompareCards
          columns={[
            {
              name: "Ordinary annuity",
              rows: [
                { label: "Paid", value: "At the end of each period" },
                { label: "Examples", value: "Loan payments, most annuity income, bond coupons" },
                { label: "$10,000 a year, 20 years, 5%: present value", value: usd(124_622) },
              ],
            },
            {
              name: "Annuity due",
              rows: [
                { label: "Paid", value: "At the start of each period" },
                { label: "Examples", value: "Rent, insurance premiums, lease payments" },
                { label: "$10,000 a year, 20 years, 5%: present value", value: usd(130_853) },
              ],
            },
          ]}
        />
        <p>
          Each payment of an annuity due arrives one period earlier, so it is worth more: its present value is the ordinary figure × (1 + i). For
          monthly payments the difference is small: {usd(200_000)} at 5% for 20 years pays {cents(1_319.91)} a month at the end of each month or{" "}
          {cents(1_314.43)} at the start.
        </p>
      </GuideSection>

      <GuideSection id="pv-fv" n={13} kicker="Maths" title="Present and future value">
        <p>
          The <strong>present value</strong>{" "}of an annuity is what its payments are worth today: the lump sum that, invested at the rate, would
          pay them exactly. The <strong>future value</strong>{" "}is what the payments grow to if each is invested at the rate until the end.
        </p>
        <DataTable
          caption="$500 a month for 30 years at 6%"
          head={["", "Ordinary (end of month)", "Due (start of month)"]}
          numeric={[1, 2]}
          rows={[["Future value", usd(502_258), usd(504_769)]]}
        />
        <p>
          The future value is how a regular saving plan builds up; the <a href="/us/savings/compound-interest-calculator">compound interest
          calculator</a>{" "}works it out with a starting balance too.
        </p>
      </GuideSection>

      <GuideSection id="options" n={14} kicker="Choices" title="Payout options">
        <ul>
          <li><strong>Straight life:</strong>{" "}the highest income, but payments stop at death, even if that is soon after buying.</li>
          <li><strong>Life with period certain:</strong>{" "}payments for life, and to your beneficiary for the rest of a guaranteed period (say 10 years) if you die sooner.</li>
          <li><strong>Cash or installment refund:</strong>{" "}if you die before receiving your premium back, the rest goes to your beneficiary.</li>
          <li><strong>Joint and survivor:</strong>{" "}pays while either spouse is alive, often at a reduced rate after the first death.</li>
          <li><strong>Period certain only:</strong>{" "}a set number of years, like the term option in the calculator.</li>
        </ul>
        <p>Every guarantee added lowers the payment, because the insurer expects to pay out more.</p>
      </GuideSection>

      <GuideSection id="tax" n={15} kicker="Tax" title="How annuity income is taxed">
        <p>
          If you bought the annuity with after-tax money (a non-qualified annuity), part of each payment is a tax-free return of your premium and
          part is taxable interest. The IRS exclusion ratio, explained in Publication 939, sets the tax-free share: roughly your premium divided
          by the total you expect to receive. Once you have received your whole premium back tax-free, later payments are fully taxable.
        </p>
        <p>
          If the annuity was bought inside a traditional IRA or 401(k), or with pre-tax money, every payment is taxed as ordinary income. Payments
          from a qualified annuity can count toward required minimum distributions; the{" "}
          <a href="/us/savings/rmd-calculator">RMD calculator</a>{" "}covers those rules.
        </p>
      </GuideSection>

      <GuideSection id="safety" n={16} kicker="Protection" title="What protects your money">
        <p>
          Annuities are backed by the insurance company, not the FDIC. Check the insurer&rsquo;s financial strength ratings from agencies such as
          AM Best or S&amp;P. If an insurer fails, your state&rsquo;s life and health insurance guaranty association steps in up to a limit,
          commonly at least $250,000 of an annuity&rsquo;s present value per person per insurer, though limits vary by state. Spreading a large
          purchase across insurers keeps each one within the limit.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={17} kicker="Costs" title="Fees and surrender charges">
        <p>
          A simple immediate annuity has no separate yearly fee: the insurer&rsquo;s costs are built into the payout. Deferred variable and indexed
          annuities can carry mortality and expense charges, fund fees and rider fees that together reach 2% to 3% a year, plus surrender charges
          of several percent if you withdraw in the first years. Ask for every charge in writing.
        </p>
      </GuideSection>

      <GuideSection id="vs-withdrawals" n={18} kicker="Alternatives" title="Annuity or your own withdrawals?">
        <p>
          Instead of buying an annuity, you can keep your savings invested and take withdrawals. You keep control and anything left goes to your
          heirs, but the money can run out if you live long or markets do badly. An annuity removes that risk for the part of your savings you put
          in it. Many retirees do both: an annuity to cover essential bills and investments for everything else. The{" "}
          <a href="/us/savings/retirement-withdrawal-calculator">retirement withdrawal calculator</a>{" "}shows how long savings last.
        </p>
      </GuideSection>

      <GuideSection id="social-security" n={19} kicker="Already yours" title="Social Security is an annuity too">
        <p>
          Social Security pays a lifetime income that rises with inflation, which would be expensive to buy from an insurer. Delaying your claim
          from 62 to 70 raises the monthly benefit for life, which is often the cheapest way to get more guaranteed, inflation-linked income.
          Consider that before buying a private annuity.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={20} kicker="Checklist" title="Before you buy">
        <ul>
          <li>Keep enough cash and investments for emergencies: an annuity premium is usually locked in.</li>
          <li>Get quotes from several insurers for the same options.</li>
          <li>Check the insurer&rsquo;s ratings and your state&rsquo;s guaranty limit.</li>
          <li>Decide whether you need a survivor or refund option.</li>
          <li>Ask how payments are taxed and whether there are any fees.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Life expectancy at 65 (IRS Single Life Table)", "22.9 years"],
            ["Life expectancy at 70", "18.8 years"],
            ["$200,000, 5%, 20 years: monthly income", cents(1_319.91)],
            ["$1,000 a month, 25 years, 5%: cost", usd(171_060)],
            ["Typical guaranty association limit (annuity present value)", "At least $250,000 in most states"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
