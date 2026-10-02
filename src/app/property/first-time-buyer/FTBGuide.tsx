import {
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  StepChart,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** First-time buyer Stamp Duty — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "who", title: "Who counts as a first-time buyer" },
  { id: "rates", title: "First-time buyer rates" },
  { id: "example", title: "A worked example" },
  { id: "cliff", title: "The £500,000 cliff edge" },
  { id: "saving", title: "How much relief saves" },
  { id: "joint", title: "Buying with someone else" },
  { id: "costs", title: "The full cost of buying" },
  { id: "deposit", title: "Deposits and loan to value" },
  { id: "lisa", title: "Lifetime ISAs" },
  { id: "nations", title: "Scotland and Wales" },
  { id: "schemes", title: "Shared ownership and new builds" },
  { id: "non-resident", title: "Buyers from abroad" },
  { id: "paying", title: "Claiming relief and paying" },
  { id: "steps", title: "Buying your first home, step by step" },
  { id: "mortgages", title: "Mortgages for first-time buyers" },
  { id: "mistakes", title: "Common mistakes to avoid" },
  { id: "joint-example", title: "Example: when one buyer has owned before" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Stamp Duty Land Tax: residential property rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
  { label: "GOV.UK — SDLT relief for first-time buyers", href: "https://www.gov.uk/guidance/stamp-duty-land-tax-relief-for-first-time-buyers" },
  { label: "GOV.UK — Lifetime ISA", href: "https://www.gov.uk/lifetime-isa" },
  { label: "GOV.UK — Rates for non-UK residents", href: "https://www.gov.uk/guidance/rates-for-non-uk-residents-sdlt" },
];

export default function FTBGuide() {
  return (
    <Guide
      kicker="The first-time buyer guide"
      title="Stamp Duty for first-time buyers, explained"
      intro={
        <>
          First-time buyers in England and Northern Ireland pay no Stamp Duty on the first £300,000 of a home costing up to
          £500,000. This guide explains who qualifies, exactly what you pay, the cliff edge at £500,000, and what else you need
          to budget for when you buy your first home.
        </>
      }
      meta={["2026/27 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="who" n={1} kicker="Eligibility" title="Who counts as a first-time buyer">
        <p>For Stamp Duty you are a first-time buyer only if:</p>
        <ul>
          <li>you have never owned a home, or a share of one, anywhere in the world;</li>
          <li>you are buying the home to live in as your only or main residence; and</li>
          <li>everyone buying with you meets the same tests.</li>
        </ul>
        <p>
          &quot;Owned&quot; includes inherited homes, homes held in a trust for you in some cases, and homes owned abroad. It
          also includes a home you once owned with a former partner, even if you sold it years ago. Shared ownership counts too:
          if you have ever owned a share, you are no longer a first-time buyer.
        </p>
        <p>
          Owning a buy-to-let as your only property also rules you out, because you have owned a residential property. Having
          had a mortgage is not the test; owning is.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="First-time buyer rates">
        <DataTable
          caption="First-time buyer Stamp Duty, homes up to £500,000"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £300,000", "0%"],
            ["£300,001 to £500,000", "5%"],
          ]}
        />
        <p>
          These rates have applied since 1 April 2025 and are unchanged for 2026/27. They replaced a temporary scheme that ran
          the 0% band to £425,000 and allowed relief up to £625,000. If the price is above £500,000, first-time buyer relief
          does not apply at all, and you pay the same standard rates as a home mover.
        </p>
        <FtbRateChart />
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="A first-time buyer paying £350,000"
          steps={[
            { label: "First £300,000 at 0%", value: "£0" },
            { label: "Next £50,000 at 5%", value: "£2,500" },
          ]}
          total={{ label: "Stamp Duty to pay", value: "£2,500" }}
        />
        <p>
          A home mover buying the same house would pay £7,500, so relief saves £5,000. If the price were £300,000 or less, a
          first-time buyer would pay nothing.
        </p>
      </GuideSection>

      <GuideSection id="cliff" n={4} kicker="Watch out" title="The £500,000 cliff edge">
        <p>
          Relief is all or nothing. At £500,000 a first-time buyer pays £10,000. At £500,001 the relief disappears and the
          standard rates apply to the whole price, so the bill jumps to £15,000.
        </p>
        <DataTable
          caption="Stamp Duty either side of £500,000"
          head={["Price", "First-time buyer pays", "Rates used"]}
          numeric={[1]}
          rows={[
            ["£480,000", "£9,000", "First-time buyer"],
            ["£490,000", "£9,500", "First-time buyer"],
            ["£500,000", "£10,000", "First-time buyer"],
            ["£500,001", "£15,000", "Standard"],
            ["£510,000", "£15,500", "Standard"],
            ["£520,000", "£16,000", "Standard"],
          ]}
        />
        <Callout tone="warn" title="An extra £1 of price can cost £5,000">
          If you are close to £500,000, negotiating the price down to £500,000, or legitimately separating furniture and
          fittings at a fair value, can be worth thousands. The chart in the calculator shows the jump.
        </Callout>
      </GuideSection>

      <GuideSection id="saving" n={5} kicker="Savings" title="How much relief saves">
        <p>Relief is worth most between £300,000 and £500,000, where it saves a flat £5,000.</p>
        <DataTable
          caption="First-time buyer against home mover"
          head={["Price", "Home mover", "First-time buyer", "Saving"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£150,000", "£500", "£0", "£500"],
            ["£200,000", "£1,500", "£0", "£1,500"],
            ["£250,000", "£2,500", "£0", "£2,500"],
            ["£300,000", "£5,000", "£0", "£5,000"],
            ["£350,000", "£7,500", "£2,500", "£5,000"],
            ["£400,000", "£10,000", "£5,000", "£5,000"],
            ["£450,000", "£12,500", "£7,500", "£5,000"],
            ["£500,000", "£15,000", "£10,000", "£5,000"],
            ["£550,000", "£17,500", "£17,500", "£0"],
          ]}
        />
      </GuideSection>

      <GuideSection id="joint" n={6} kicker="Joint purchases" title="Buying with someone else">
        <p>
          Every buyer must be a first-time buyer. If you buy with a partner who has owned a home before, neither of you gets
          the relief. You pay the standard rates instead, as long as the home replaces any home your partner owns and they
          have sold it.
        </p>
        <p>
          If your partner still owns another home on the day you complete, the 5% higher rates for additional properties may
          apply instead. Married couples and civil partners are treated as one for that test.
        </p>
        <p>
          A parent can give you money for the deposit without affecting your relief, because they are not buying. If a parent
          is named on the title as a joint owner and already owns a home, relief is lost and higher rates may apply. A
          guarantor mortgage, where a parent guarantees but does not own, does not affect it.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={7} kicker="Budget" title="The full cost of buying">
        <p>Stamp Duty is only part of what you pay to buy. A realistic budget for a £350,000 first home with a 10% deposit:</p>
        <WorkedExample
          title="Cash needed on a £350,000 first home"
          steps={[
            { label: "Deposit at 10%", value: "£35,000" },
            { label: "Stamp Duty", value: "£2,500" },
            { label: "Legal fees and searches", note: "Typical range £1,200 to £2,000", value: "£1,500" },
            { label: "Survey", note: "Level 2 survey", value: "£500" },
            { label: "Mortgage arrangement fee", note: "Some deals have none", value: "£500" },
          ]}
          total={{ label: "Total cash needed", value: "£40,000" }}
        />
        <p>
          On top of this, budget for removals, basic furniture, and buildings insurance from exchange of contracts. Our moving
          house budget calculator covers these.
        </p>
      </GuideSection>

      <GuideSection id="deposit" n={8} kicker="Deposits" title="Deposits and loan to value">
        <p>
          Loan to value (LTV) is the mortgage as a share of the price. Lenders set rates in bands, usually at 95%, 90%, 85%,
          80%, 75% and 60% LTV. A bigger deposit puts you in a lower band and usually a cheaper rate.
        </p>
        <DataTable
          caption="Deposits on a £350,000 home"
          head={["Deposit", "Amount", "Mortgage", "LTV"]}
          numeric={[1, 2]}
          rows={[
            ["5%", "£17,500", "£332,500", "95%"],
            ["10%", "£35,000", "£315,000", "90%"],
            ["15%", "£52,500", "£297,500", "85%"],
            ["25%", "£87,500", "£262,500", "75%"],
          ]}
        />
        <p>
          Stamp Duty does not depend on your deposit or mortgage. It is worked out on the price alone, so a cash buyer and a
          buyer with a 95% mortgage pay exactly the same.
        </p>
      </GuideSection>

      <GuideSection id="lisa" n={9} kicker="Saving" title="Lifetime ISAs">
        <p>
          A Lifetime ISA lets you save up to £4,000 a year, with a 25% government bonus of up to £1,000 a year, towards a first
          home. You must open it between ages 18 and 39.
        </p>
        <CompareCards
          columns={[
            {
              name: "You can use it if",
              rows: [
                { label: "Price", value: "£450,000 or less" },
                { label: "Account age", value: "Open 12 months or more" },
                { label: "Buyer", value: "First-time buyer" },
                { label: "Paid", value: "To your conveyancer" },
              ],
            },
            {
              name: "Watch out for",
              rows: [
                { label: "Over £450,000", value: "25% withdrawal charge" },
                { label: "Charge", value: "Takes back more than the bonus" },
                { label: "Timing", value: "Allow time for the transfer" },
                { label: "Joint buyers", value: "Each can use their own" },
              ],
            },
          ]}
        />
        <p>
          The £450,000 Lifetime ISA limit is lower than the £500,000 Stamp Duty limit. If you are buying between the two, you
          get Stamp Duty relief but cannot use your Lifetime ISA without the charge.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={10} kicker="Across the UK" title="Scotland and Wales">
        <p>Stamp Duty applies in England and Northern Ireland. Scotland and Wales have their own taxes:</p>
        <ul>
          <li>
            <strong>Scotland (LBTT):</strong> first-time buyers pay nothing up to £175,000 and the normal rates above. Relief is
            worth up to £600 and has no price cap.
          </li>
          <li>
            <strong>Wales (LTT):</strong> no first-time buyer relief, but everyone buying an only home pays nothing up to
            £225,000.
          </li>
        </ul>
        <DataTable
          caption="A first-time buyer in each nation"
          head={["Price", "England & NI", "Scotland", "Wales"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£200,000", "£0", "£500", "£0"],
            ["£300,000", "£0", "£4,000", "£4,500"],
            ["£400,000", "£5,000", "£12,750", "£10,500"],
            ["£500,000", "£10,000", "£22,750", "£18,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="schemes" n={11} kicker="Schemes" title="Shared ownership and new builds">
        <p>
          <strong>Shared ownership.</strong> You can pay Stamp Duty on the share you buy, or elect to pay it on the full market
          value up front. First-time buyer relief can apply either way if the full market value is £500,000 or less. Our shared
          ownership calculator compares both.
        </p>
        <p>
          <strong>New builds.</strong> The rates are the same as for older homes. If a developer offers to pay your Stamp Duty,
          the tax is still worked out on the price, and the incentive may need declaring to your lender.
        </p>
      </GuideSection>

      <GuideSection id="non-resident" n={12} kicker="Overseas buyers" title="Buyers from abroad">
        <p>
          If you have not been in the UK for at least 183 days in the 12 months before buying, a 2% surcharge applies on top of
          the rates you would otherwise pay. You can still claim first-time buyer relief if you qualify, so a non-resident first
          time buyer at £350,000 pays £2,500 plus 2% of the whole price (£7,000): £9,500 in total.
        </p>
        <p>If you become UK resident within a year of buying, you may be able to claim the surcharge back.</p>
      </GuideSection>

      <GuideSection id="paying" n={13} kicker="Paying" title="Claiming relief and paying">
        <Timeline
          items={[
            { when: "Before exchange", what: "Confirm you qualify", detail: "Your conveyancer will ask about every property you or any co-buyer have owned." },
            { when: "Before completion", what: "Send the money", detail: "Stamp Duty is paid from your own funds, alongside your deposit." },
            { when: "Within 14 days", what: "Return filed and tax paid", detail: "Your conveyancer files the SDLT return, claims the relief and pays HMRC." },
          ]}
        />
        <p>
          A return is needed even if no tax is due. HMRC can check claims for up to four years, and if you were not eligible you
          will owe the difference plus interest and possibly a penalty.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={14} kicker="The process" title="Buying your first home, step by step">
        <Timeline
          items={[
            { when: "1", what: "Work out your budget", detail: "Use our affordability calculator to see what you could borrow, then add your deposit and the costs of buying." },
            { when: "2", what: "Get a decision in principle", detail: "A lender or broker confirms roughly what they would lend. Agents often ask for one before accepting offers." },
            { when: "3", what: "Make an offer", detail: "Once accepted, instruct a conveyancer and apply for your mortgage." },
            { when: "4", what: "Survey and searches", detail: "The lender values the home; you can commission a survey. Your conveyancer runs local searches and checks the title." },
            { when: "5", what: "Exchange contracts", detail: "You pay a deposit and the purchase becomes legally binding. Arrange buildings insurance from this date." },
            { when: "6", what: "Complete", detail: "The money is transferred, you get the keys, and your conveyancer files the Stamp Duty return." },
          ]}
        />
        <p>
          In England a purchase typically takes three to four months from offer to completion, though it can be quicker when
          there is no chain above you.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={15} kicker="Borrowing" title="Mortgages for first-time buyers">
        <p>
          Most lenders offer mortgages with a 5% deposit, and some have products designed for first-time buyers, such as
          longer terms or higher income multiples. A smaller deposit usually means a higher rate, so even a few thousand pounds
          more can make a real difference to the monthly payment.
        </p>
        <p>
          Some lenders let a family member help without becoming an owner, through a guarantor mortgage, a joint borrower sole
          proprietor mortgage or a family deposit scheme where savings are held as security. These can keep your first-time
          buyer relief intact, because the helper does not own a share of the home.
        </p>
        <p>
          A gifted deposit is also common. Lenders will ask for a letter confirming the money is a gift, not a loan, and your
          conveyancer will need to check where it came from.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={16} kicker="Watch out" title="Common mistakes to avoid">
        <ul>
          <li>
            <strong>Forgetting the cliff edge.</strong> Agreeing £505,000 instead of £500,000 adds £5,250 of Stamp Duty: £5,000
            from losing relief and £250 more on the extra price.
          </li>
          <li>
            <strong>Assuming a partner qualifies.</strong> Check their history, including homes owned abroad or with a former
            partner, before you budget for relief.
          </li>
          <li>
            <strong>Spending the whole deposit.</strong> Keep cash back for Stamp Duty, fees, the survey and moving costs.
          </li>
          <li>
            <strong>Missing the Lifetime ISA timing.</strong> Your conveyancer must request the money in good time, and the
            account must have been open for at least 12 months.
          </li>
          <li>
            <strong>Overstating fittings.</strong> Furniture and fittings at a fair value can be excluded from the price, but
            inflating their value to dodge the cliff edge is evasion and HMRC checks it.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="joint-example" n={17} kicker="Worked example" title="Example: when one buyer has owned before">
        <p>
          Amira has never owned a home. Her partner Tom owned a flat with a former partner several years ago and sold his share.
          They are buying a £400,000 house together.
        </p>
        <WorkedExample
          title="A joint purchase at £400,000"
          steps={[
            { label: "If both were first-time buyers", value: "£5,000" },
            { label: "Because Tom has owned before: standard rates", value: "£10,000" },
          ]}
          total={{ label: "Extra Stamp Duty", value: "£5,000" }}
        />
        <p>
          If Amira bought alone, she would qualify and pay £5,000, though she would need to borrow on her income alone. Because
          Tom no longer owns a home, the 5% surcharge for additional properties does not apply. If he still owned his share,
          it probably would, and the bill would rise to £30,000.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={18} kicker="FAQs" title="Common questions">
        <h3>I inherited a share of a house as a child. Am I a first-time buyer?</h3>
        <p>
          Probably not. Any interest in a residential property anywhere in the world counts as ownership, including an
          inherited share. Ask your conveyancer to check the details.
        </p>
        <h3>Does it matter if I owned a home abroad?</h3>
        <p>Yes. Homes outside the UK count, so previous overseas ownership rules you out.</p>
        <h3>Do I need to live in the home?</h3>
        <p>Yes. It must be your only or main residence. Buying a first property to let out does not qualify.</p>
        <h3>What if the price changes after I agree it?</h3>
        <p>Stamp Duty is worked out on the final price at completion, so a renegotiated price changes the tax.</p>
        <h3>Can I add Stamp Duty to my mortgage?</h3>
        <p>
          Not directly. You need the money at completion, though borrowing more and keeping more cash back has the same
          effect.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£300,000", label: "0% band for first-time buyers" },
            { value: "5%", label: "On the part from £300,001 to £500,000" },
            { value: "£500,000", label: "No relief at all above this price" },
            { value: "£5,000", label: "The most relief can save" },
            { value: "£450,000", label: "Lifetime ISA property limit" },
            { value: "14 days", label: "To file the return and pay HMRC" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

/** Marginal Stamp Duty rate on each extra pound for a first-time buyer. */
function FtbRateChart() {
  return (
    <StepChart
      ariaLabel="Rate on each extra pound of price for a first-time buyer: 0% to £300,000, 5% to £500,000, then standard rates on the whole price"
      steps={[
        { from: 0, to: 300_000, value: 0 },
        { from: 300_000, to: 500_000, value: 5 },
      ]}
      max={500_000}
      yMax={10}
      yTicks={[0, 5, 10]}
    />
  );
}
