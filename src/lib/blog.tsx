import Link from "next/link";
import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for search results (the page's <title>), when `title` is too long. */
  seoTitle?: string;
  description: string;
  /** ISO date for metadata + sorting. */
  date: string;
  /** Human label shown in the UI. */
  dateLabel: string;
  readingTime: string;
  category: string;
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "universal-credit-pay-rise-what-you-keep",
    title: "Working more on Universal Credit: how much of a pay rise you really keep in 2026/27",
    seoTitle: "Universal Credit Pay Rise: What You Keep 2026/27",
    description:
      "How the 55% taper, the work allowance, tax and National Insurance combine on Universal Credit in 2026/27, with worked examples of extra hours, pay rises and pensions.",
    date: "2026-10-15",
    dateLabel: "15 October 2026",
    readingTime: "10 min read",
    category: "Benefits",
    body: (
      <>
        <p>
          If you get Universal Credit and work, every extra pound you earn has to pass through up to four deductions:
          Income Tax, National Insurance, your pension contribution and the Universal Credit taper. Depending on where
          you are, you might keep every penny of a pay rise, 45p of each pound, or as little as 32p. Knowing which applies
          to you makes it much easier to judge whether extra hours, a new job or a promotion is worth it.
        </p>
        <p>
          This guide explains the rules for the 2026/27 tax year and works through real examples, all calculated with the
          same engine as our{" "}
          <Link href="/uk/benefits/universal-credit-taper">Universal Credit taper calculator</Link> and{" "}
          <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>. The examples assume pay at the
          National Living Wage of £12.71 an hour, a worker aged 25 or over, and tax rules for England, Wales and Northern
          Ireland.
        </p>

        <h2>The two rules: the work allowance and the 55% taper</h2>
        <p>
          Universal Credit is worked out each monthly assessment period. Your maximum award (the standard allowance plus
          any elements for children, housing, disability or caring) is reduced by your earnings, in two steps:
        </p>
        <ul>
          <li>
            <strong>The work allowance.</strong>{" "}Some households can earn a set amount before their award falls at all:
            £427 a month if Universal Credit helps with your housing costs, or £710 a month if it does not. You only get a
            work allowance if you are responsible for a child or you (or your partner) have limited capability for work.
          </li>
          <li>
            <strong>The taper.</strong>{" "}Above the work allowance (or from the first pound, if you do not have one), your
            award falls by 55p for every £1 you earn.
          </li>
        </ul>
        <p>
          The taper applies to your <em>take-home</em> pay: earnings after Income Tax, National Insurance and pension
          contributions. That detail matters, because it means the deductions stack rather than add up.
        </p>

        <h2>How the deductions stack</h2>
        <p>
          While your pay is below the Personal Allowance (£12,570 a year, about £1,048 a month), there is no Income Tax and
          little or no National Insurance, so only the taper bites: you keep 45p of each extra pound. Once you pay tax and
          National Insurance, each extra £1 of gross pay loses 20p in Income Tax and 8p in National Insurance first. That
          leaves 72p, and the taper takes 55% of that (39.6p). You keep 32.4p.
        </p>
        <table>
          <thead>
            <tr>
              <th>Where your earnings are</th>
              <th>Kept from an extra £100 a month</th>
              <th>Where the rest goes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Below your work allowance</td><td>£100</td><td>Nothing</td></tr>
            <tr><td>Above the work allowance, below the Personal Allowance</td><td>£45</td><td>£55 Universal Credit</td></tr>
            <tr><td>Above the work allowance and paying tax and NI</td><td>£32.40</td><td>£20 tax, £8 NI, £39.60 Universal Credit</td></tr>
            <tr><td>Universal Credit has stopped</td><td>£72</td><td>£20 tax, £8 NI</td></tr>
          </tbody>
        </table>
        <p>
          A 67.6% deduction on the next pound is higher than a higher-rate taxpayer pays. It is the main reason a pay rise
          on Universal Credit can feel smaller than expected. But it is never more than 100%: working more always leaves
          you better off, which was not always true under the older benefits Universal Credit replaced.
        </p>

        <h2>Example 1: a single person renting, no children</h2>
        <p>
          A single person aged 25 or over renting privately for £650 a month, with the full rent covered by the housing
          element, has a maximum award of £1,074.90 a month (the £424.90 standard allowance plus £650 for rent). With no
          children and no health condition, there is no work allowance, so the taper starts from the first pound.
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Gross pay a month</th>
              <th>Take-home</th>
              <th>Universal Credit</th>
              <th>Total income</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0</td><td>£0</td><td>£0</td><td>£1,074.90</td><td>£1,074.90</td></tr>
            <tr><td>16</td><td>£881.23</td><td>£881.23</td><td>£590.23</td><td>£1,471.45</td></tr>
            <tr><td>30</td><td>£1,652.30</td><td>£1,482.96</td><td>£259.27</td><td>£1,742.23</td></tr>
            <tr><td>37.5</td><td>£2,065.38</td><td>£1,780.37</td><td>£95.70</td><td>£1,876.07</td></tr>
          </tbody>
        </table>
        <p>
          Going from no work to 16 hours a week raises their income by £396.55 a month. Going from 30 hours to full time
          (7.5 more hours, £413.08 more gross pay) adds £133.84. Their Universal Credit stops once take-home pay reaches
          about £1,954 a month.
        </p>

        <h2>Example 2: a single parent renting, one child</h2>
        <p>
          A single parent with one child born after April 2017, renting privately for £900 a month, has a maximum award of
          £1,628.84. Because they are responsible for a child and get help with rent, their work allowance is £427 a
          month.
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Gross pay a month</th>
              <th>Take-home</th>
              <th>Universal Credit</th>
              <th>Total income</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0</td><td>£0</td><td>£0</td><td>£1,628.84</td><td>£1,628.84</td></tr>
            <tr><td>16</td><td>£881.23</td><td>£881.23</td><td>£1,379.02</td><td>£2,260.24</td></tr>
            <tr><td>30</td><td>£1,652.30</td><td>£1,482.96</td><td>£1,048.06</td><td>£2,531.02</td></tr>
            <tr><td>37.5</td><td>£2,065.38</td><td>£1,780.37</td><td>£884.49</td><td>£2,664.86</td></tr>
          </tbody>
        </table>
        <p>
          The first £427 of take-home pay each month is kept in full, so 16 hours a week adds £631.40 to their income:
          about 72p for each pound earned. Above that, the familiar 45p and then 32.4p apply. Their award does not stop
          until take-home pay reaches about £3,389 a month, so even a full-time job at the National Living Wage leaves
          them with £884 of Universal Credit.
        </p>
        <p>
          If the same parent owned their home outright (no housing element), their work allowance would be the higher
          £710 a month, so more of the first hours would be kept in full.
        </p>

        <h2>One more hour a week: what is it worth?</h2>
        <p>
          An extra hour every week at £12.71 adds about £55.08 a month of gross pay. What you keep depends on where you
          start:
        </p>
        <ul>
          <li>Still within your work allowance: all £55.08.</li>
          <li>Above the work allowance, not yet paying tax: £24.78.</li>
          <li>Paying tax and National Insurance, still on Universal Credit: £17.84.</li>
          <li>No longer on Universal Credit, paying tax and NI: £39.66.</li>
        </ul>
        <p>
          In other words, an extra hour at the National Living Wage can be worth as little as £4.12 to you (about 32% of
          the hourly rate). Costs of working that hour, such as travel or childcare, come out of that. Our{" "}
          <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link> shows the figure for your own household
          and pay.
        </p>

        <h2>A pay rise or a new job</h2>
        <p>
          The same arithmetic applies to a pay rise. A rise from £12.71 to £13.50 an hour on 30 hours a week adds about
          £102.70 a month of gross pay. For the single parent above, about £33 of that reaches their pocket. For the single
          renter it is the same. That does not mean a rise is not worth having: it builds your pay for the time when you
          no longer need Universal Credit, and it counts towards your pension and any future redundancy or maternity pay.
          But it does mean comparing two job offers by their hourly rates alone can mislead. Our{" "}
          <Link href="/uk/tax-and-salary/pay-rise">pay rise calculator</Link> shows the tax and NI side.
        </p>

        <h2>The pension surprise: saving costs you only about 32p per £1</h2>
        <p>
          The flip side of the stacked deductions is that paying into a pension is unusually cheap on Universal Credit.
          Pension contributions come off your earnings before the taper is applied, so a contribution lowers your
          take-home pay, but your award rises to make up part of it.
        </p>
        <p>
          For the single renter on 30 hours a week, a 5% contribution through salary sacrifice puts £82.62 a month into
          their pension. Their tax and NI fall by £23.13 and their Universal Credit rises by £32.72, so their total income
          falls by just £26.77. Each £1 in the pension costs them about 32p. Under the older net pay arrangement, where
          National Insurance is not saved, the cost is a little higher. Our{" "}
          <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link> explains the difference.
        </p>

        <h2>The benefit cap and the 16-hour rule</h2>
        <p>
          The benefit cap limits the total benefits a working-age household can receive: £22,020 a year for a couple or a
          family outside London (£1,835 a month) and £25,323 in London. It stops applying once your household earns at
          least £881 a month after tax, which is 16 hours a week at the National Living Wage.
        </p>
        <p>
          For a capped family this creates a very large gain at that point. Take a couple with three children renting
          privately for £1,400 a month outside London. Their maximum award is £2,978.79, but the cap cuts it to £1,562.65.
          If one of them takes a job of 16 hours a week at the National Living Wage (£881.23 a month), the cap is lifted:
          their Universal Credit rises to £2,728.97 and their total income goes from £1,562.65 to £3,610.19, a gain of
          £2,047.54 a month. Earning a few pounds less than the threshold gives up most of that, so check your pay against
          it carefully. Our <Link href="/uk/benefits/benefit-cap">benefit cap calculator</Link> shows how close you are.
        </p>

        <h2>Childcare: 85% back</h2>
        <p>
          If you work and pay for registered childcare, Universal Credit can pay back 85% of the cost, up to £1,071.09 a
          month for one child or £1,836.16 for two or more. The childcare element is part of your maximum award, so it
          also raises the point at which your Universal Credit stops; the taper on your earnings works the same way. Free funded hours and
          Tax-Free Childcare change the picture; our{" "}
          <Link href="/uk/benefits/childcare-costs">childcare costs calculator</Link> compares them.
        </p>

        <h2>Paydays and assessment periods</h2>
        <p>
          Universal Credit looks at the pay you actually receive in each monthly assessment period, not your contract.
          If you are paid weekly or every four weeks, some assessment periods will include an extra payday, and your award
          for that month will be lower. It evens out over the year, but it can make a single month look as if a pay rise
          cost you money. Overtime and bonuses count in the month they are paid.
        </p>

        <h2>If you are self-employed</h2>
        <p>
          Self-employed claimants report their profit each month instead of payslips. After a start-up period, many are
          treated as earning at least a set amount (the minimum income floor) based on the National Living Wage for the
          hours they are expected to work, even if they earn less. The taper then applies in the same way. Our{" "}
          <Link href="/uk/business/sole-trader-tax">sole trader tax calculator</Link> covers the tax side.
        </p>

        <h2>Key numbers for 2026/27</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026/27</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Taper rate</td><td>55% of take-home pay</td></tr>
            <tr><td>Work allowance with housing costs</td><td>£427 a month</td></tr>
            <tr><td>Work allowance without housing costs</td><td>£710 a month</td></tr>
            <tr><td>Standard allowance, single, 25 or over</td><td>£424.90 a month</td></tr>
            <tr><td>Standard allowance, couple, either 25 or over</td><td>£666.97 a month</td></tr>
            <tr><td>Child element</td><td>£303.94 a month (£351.88 for a first child born before 6 April 2017)</td></tr>
            <tr><td>National Living Wage</td><td>£12.71 an hour (21 and over)</td></tr>
            <tr><td>Benefit cap earnings exemption</td><td>£881 a month</td></tr>
            <tr><td>Kept from £1 above the work allowance, paying tax and NI</td><td>32.4p</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          On Universal Credit, work always pays, but by less than your payslip suggests. The first pounds within a work
          allowance are kept in full; after that you keep 45p in each pound, falling to 32.4p once you pay tax and
          National Insurance. Two points work in your favour: pension saving costs about a third of its face value, and
          earning £881 a month can lift the benefit cap entirely. To see your own figures, use the{" "}
          <Link href="/uk/benefits/universal-credit-taper">Universal Credit taper calculator</Link>. These are estimates
          for 2026/27 and general guidance; your Universal Credit statement shows the figures DWP actually used.
        </p>
      </>
    ),
  },
  {
    slug: "energy-bills-winter-2026",
    title: "Energy bills this winter: the October 2026 price cap and the VAT cut on electricity",
    seoTitle: "Energy Price Cap October 2026: What Bills Cost",
    description:
      "What the Ofgem price cap from 1 October 2026 means for low, typical and high users, what the 0% VAT on electricity saves, and what common appliances cost to run.",
    date: "2026-10-15",
    dateLabel: "15 October 2026",
    readingTime: "10 min read",
    category: "Property",
    body: (
      <>
        <p>
          The Ofgem price cap went up on 1 October 2026. A typical home paying by Direct Debit now pays at a rate of about
          £1,723 a year for gas and electricity, up about £60 from £1,663 over the summer. At the same time electricity
          stopped carrying VAT: from 1 October 2026 to 31 March 2027 the 5% VAT on household electricity is 0%, while gas
          keeps its 5%. The result is a winter in which electricity costs about the same as in the summer and gas costs
          more.
        </p>
        <p>
          This guide sets out the new rates, what they mean for a small, typical and large home, how much the VAT cut is
          worth, what the standing charges add before you use anything, and what everyday appliances cost to run this
          winter. Every figure comes from the same engine as our{" "}
          <Link href="/uk/property/energy-bill-calculator">energy bill calculator</Link> and{" "}
          <Link href="/uk/property/appliance-running-cost">appliance running cost calculator</Link>, at the Great Britain
          average rates for Direct Debit customers. Your own region and tariff will differ a little.
        </p>

        <h2>The new rates from 1 October 2026</h2>
        <p>
          The price cap does not limit your total bill. It limits the price per unit of energy (the unit rate, in pence
          per kilowatt hour) and the fixed daily standing charge that suppliers can charge on a standard variable tariff.
          Use more and you pay more. These are the average rates, with VAT included where it applies:
        </p>
        <table>
          <thead>
            <tr>
              <th>Rate (GB average, Direct Debit)</th>
              <th>July to September 2026</th>
              <th>October to December 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Electricity unit rate</td><td>26.11p per kWh</td><td>26.32p per kWh</td></tr>
            <tr><td>Electricity standing charge</td><td>57.19p a day</td><td>54.83p a day</td></tr>
            <tr><td>Gas unit rate</td><td>7.33p per kWh</td><td>7.97p per kWh</td></tr>
            <tr><td>Gas standing charge</td><td>29.04p a day</td><td>29.68p a day</td></tr>
            <tr><td>VAT on electricity</td><td>5%</td><td>0%</td></tr>
            <tr><td>VAT on gas</td><td>5%</td><td>5%</td></tr>
          </tbody>
        </table>
        <p>
          The electricity unit rate barely moved, from 26.11p to 26.32p, but that hides a real rise: without the VAT cut
          the new rate would be about 27.64p and the standing charge about 57.57p a day. The gas unit rate rose by almost
          9%, from 7.33p to 7.97p, with no VAT change to soften it.
        </p>

        <h2>What a year of energy costs at the new rates</h2>
        <p>
          Ofgem describes a typical home with three levels of use, updated in July 2026: a low user (1,600 kWh of
          electricity and 6,000 kWh of gas a year, often a flat or a single person), a medium user (2,500 kWh and 9,500
          kWh, the &ldquo;typical&rdquo; home) and a high user (3,800 kWh and 14,000 kWh, a larger or busier house). At
          the October rates, kept for a whole year, they would pay:
        </p>
        <table>
          <thead>
            <tr>
              <th>Home</th>
              <th>Electricity</th>
              <th>Gas</th>
              <th>Year</th>
              <th>Month</th>
              <th>Change from summer</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Low use</td><td>£621</td><td>£587</td><td>£1,208</td><td>£101</td><td>+£35</td></tr>
            <tr><td>Medium use</td><td>£858</td><td>£865</td><td>£1,724</td><td>£144</td><td>+£60</td></tr>
            <tr><td>High use</td><td>£1,200</td><td>£1,224</td><td>£2,424</td><td>£202</td><td>+£91</td></tr>
          </tbody>
        </table>
        <p>
          Two things are worth knowing about these figures. First, they are yearly rates, not a forecast: the cap changes
          every three months, and you use far more gas in January than in July, so your actual winter bills will be higher
          than a twelfth of the yearly figure and your summer bills lower. Second, most of the rise is gas. For the medium
          home, electricity costs £3 a year less than it would at the summer rates, while gas costs about £63 more.
        </p>

        <h2>How much the 0% VAT on electricity saves</h2>
        <p>
          VAT on household energy has been 5% for years. Removing it from electricity for six months saves a medium user
          about £43 a year at the October rates, which is about £21 over the six months it lasts. A low user saves about
          £31 a year (£16 over six months) and a high user about £60 a year (£30 over six months).
        </p>
        <p>
          The saving is bigger for homes that heat with electricity. An all-electric home using 4,200 kWh a year pays
          about £1,306 a year at the October rates; with 5% VAT it would be about £65 a year more. Homes on storage
          heaters, heat pumps or electric boilers, which use far more than that in winter, gain the most, because the cut
          covers exactly the months of heaviest use. You do not need to do anything to get it: suppliers apply the 0% rate
          automatically.
        </p>
        <p>
          The cut is due to end on 31 March 2027. Unless the government extends it, electricity bills will rise by 5% on
          1 April 2027 on top of any change in the cap itself.
        </p>

        <h2>Standing charges: what you pay before you switch anything on</h2>
        <p>
          The standing charge covers the cost of keeping you connected, and you pay it every day whatever you use. At the
          October rates it comes to about £200 a year for electricity and £108 a year for gas: £308 a year in total, or
          about £26 a month, before a single kettle is boiled.
        </p>
        <p>
          That is why low users feel the cap most heavily: for the low-use home above, the standing charges are a quarter
          of the whole bill. It is also why some people with very little gas use (for example, a flat with an electric
          hob and a combi boiler used only for hot water) look at whether keeping the gas supply is worth £108 a year.
          Removing a gas meter is permanent and has its own costs, so check that carefully before acting.
        </p>

        <h2>Paying by Direct Debit, on receipt or by prepayment</h2>
        <p>
          The rates above are for Direct Debit. Ofgem&rsquo;s typical yearly bill for October to December is £1,723 by
          Direct Debit, £1,861 if you pay on receipt of a bill (standard credit) and £1,678 on a prepayment meter. That
          makes paying on receipt about £138 a year dearer for the same energy, and prepayment about £45 a year cheaper.
          If you pay on receipt and can manage a monthly Direct Debit, switching is one of the easiest savings there is.
        </p>

        <h2>What appliances cost to run this winter</h2>
        <p>
          With no VAT on electricity, every figure below uses the cap&rsquo;s average rate of 26.32p per kWh. The cost of
          any appliance is its power in kilowatts, times the hours it is on, times the price per kWh. Standing charges are
          left out because you pay them anyway.
        </p>
        <table>
          <thead>
            <tr>
              <th>Appliance (typical use)</th>
              <th>Each use</th>
              <th>A year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Kettle, 3 kW, 3 minutes, 4 times a day</td><td>4p</td><td>£58</td></tr>
            <tr><td>Microwave, 1.2 kW, 5 minutes, twice a day</td><td>3p</td><td>£19</td></tr>
            <tr><td>Air fryer, 1.5 kW, 20 minutes, once a day</td><td>13p</td><td>£48</td></tr>
            <tr><td>Electric oven, 45 minutes, once a day</td><td>28p</td><td>£104</td></tr>
            <tr><td>Washing machine at 40°C, 4 loads a week</td><td>20p</td><td>£41</td></tr>
            <tr><td>Dishwasher, 5 runs a week</td><td>26p</td><td>£69</td></tr>
            <tr><td>Tumble dryer (vented or condenser), 3 loads a week</td><td>82p</td><td>£129</td></tr>
            <tr><td>Heat pump tumble dryer, 3 loads a week</td><td>42p</td><td>£66</td></tr>
            <tr><td>Fridge freezer, always on</td><td>19p a day</td><td>£69</td></tr>
            <tr><td>Electric shower, 9.5 kW, 8 minutes a day</td><td>33p</td><td>£122</td></tr>
            <tr><td>Dehumidifier, 300 W, 8 hours a day</td><td>63p</td><td>£231</td></tr>
            <tr><td>Electric blanket, 1 hour a night</td><td>3p</td><td>£10</td></tr>
          </tbody>
        </table>
        <p>
          The pattern is simple: anything that heats is expensive, and anything that heats for a long time is very
          expensive. An air fryer costs about 13p for a 20-minute cook against about 28p for a 45-minute oven session, so
          for small meals it really does save money. A heat pump tumble dryer halves the cost of each load. An electric
          blanket at about 3p a night is one of the cheapest ways to stay warm in bed.
        </p>

        <h2>Is an electric heater cheaper than the central heating?</h2>
        <p>
          Usually not, in a home with gas central heating. A 2 kW fan or convector heater costs about 53p an hour at the
          October rate. The same amount of heat from a gas boiler, allowing for a boiler that turns 90% of its gas into
          heat, costs about 18p. Electricity is about 3.3 times the price of gas per kWh, and a plug-in heater turns
          electricity into heat no more efficiently than a boiler does.
        </p>
        <p>
          The case for a heater is narrower: heating one room for a short time instead of the whole house. If you are home
          alone in one room for an evening, running a heater there can cost less than heating every radiator. An
          oil-filled radiator, which cycles on and off once warm, costs about 24p an hour in typical use. Our{" "}
          <Link href="/uk/property/appliance-running-cost">appliance running cost calculator</Link> shows the gas
          comparison for any heater you choose.
        </p>

        <h2>Off-peak tariffs and electric cars</h2>
        <p>
          Time-of-use tariffs (Economy 7 and the newer smart tariffs) charge less at night. On an overnight rate of 8p per
          kWh, a 7 kWh charge of an electric car costs about 56p, against about £1.84 at the cap&rsquo;s standard rate. A
          home that can move its car charging, hot water cylinder or storage heaters overnight can save hundreds of pounds a
          year. The trade-off is that the day rate on these tariffs is often higher than the cap rate, so they suit homes
          that really can shift their use. Our{" "}
          <Link href="/uk/vehicles/petrol-vs-ev-cost">petrol vs electric car calculator</Link> uses both rates.
        </p>

        <h2>Help with energy costs this winter</h2>
        <ul>
          <li>
            <strong>Warm Home Discount:</strong>{" "}£150 off your electricity bill, usually paid automatically if you get a
            qualifying means-tested benefit such as Universal Credit or Pension Credit.
          </li>
          <li>
            <strong>Winter Fuel Payment:</strong>{" "}£200, or £300 if you are 80 or over, for people over State Pension age;
            it is taken back through tax if your income is over £35,000.
          </li>
          <li>
            <strong>Cold Weather Payments:</strong>{" "}£25 for each 7-day spell of very cold weather, for people on certain
            benefits.
          </li>
          <li>
            <strong>Your supplier:</strong>{" "}if you are behind, suppliers must offer an affordable repayment plan, and
            many run hardship funds.
          </li>
        </ul>
        <p>
          Many people who qualify for these do not claim the benefit that unlocks them. Our{" "}
          <Link href="/uk/benefits/benefits-checker">benefits checker</Link> and{" "}
          <Link href="/uk/benefits/pension-credit">Pension Credit calculator</Link> show whether you might be entitled.
        </p>

        <h2>Ways to cut the bill that cost little or nothing</h2>
        <ul>
          <li>Turn the boiler&rsquo;s flow temperature down to about 55°C or lower on a combi boiler: it runs more efficiently and you rarely notice the difference.</li>
          <li>Boil only the water you need: the kettle uses energy for every cup of water in it, not just the one you pour.</li>
          <li>Dry clothes outside or on an unheated airer when you can; the tumble dryer is often the most expensive appliance after heating.</li>
          <li>Wash at 30°C and run full loads in the washing machine and dishwasher.</li>
          <li>Shorten showers: a minute less in an electric shower saves about 4p a day, around £15 a year.</li>
          <li>Close curtains at dusk, fit draught excluders and bleed radiators so they heat fully.</li>
          <li>Give a meter reading (or check your smart meter) so you pay for what you used, not an estimate.</li>
        </ul>

        <h2>Longer-term changes</h2>
        <p>
          Bigger savings come from changing how a home is heated and powered. Solar panels cut the electricity you buy
          during the day and can earn a payment for what you export; a heat pump replaces a gas boiler, with a £7,500
          Boiler Upgrade Scheme grant in England and Wales. Both have high upfront costs and payback periods that depend
          on your home. Our{" "}
          <Link href="/uk/property/solar-panel-calculator">solar panel calculator</Link> and{" "}
          <Link href="/uk/property/heat-pump-vs-boiler">heat pump vs boiler calculator</Link> work through the numbers
          for your home, region and energy use.
        </p>

        <h2>What happens next</h2>
        <p>
          Ofgem will announce the cap for 1 January to 31 March 2027 on 25 November 2026. Wholesale prices drive most of
          the change, so it can go either way. The 0% VAT on electricity runs to 31 March 2027. We update the calculators
          as soon as new rates are published.
        </p>

        <h2>Key numbers</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>October to December 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Typical yearly bill, Direct Debit</td><td>£1,723 (2,500 kWh electricity, 9,500 kWh gas)</td></tr>
            <tr><td>Electricity</td><td>26.32p per kWh, 54.83p a day, no VAT</td></tr>
            <tr><td>Gas</td><td>7.97p per kWh, 29.68p a day, 5% VAT</td></tr>
            <tr><td>Standing charges for a year</td><td>About £308</td></tr>
            <tr><td>VAT cut saving, typical home</td><td>About £21 over six months</td></tr>
            <tr><td>Electricity VAT back to 5%</td><td>1 April 2027, unless extended</td></tr>
            <tr><td>Next cap announcement</td><td>25 November 2026</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          This winter&rsquo;s rise is mostly in gas. Electricity costs about the same as in the summer only because its VAT
          was removed, and that ends in March. The quickest savings come from paying by Direct Debit, heating the rooms you
          use, and cutting the long-running heat appliances: tumble dryers, electric heaters and dehumidifiers. To see your
          own figures, try the <Link href="/uk/property/energy-bill-calculator">energy bill calculator</Link>. All figures
          are estimates at Great Britain average rates; your supplier&rsquo;s rates for your region are on your bill.
        </p>
      </>
    ),
  },
  {
    slug: "salary-sacrifice-worth-it",
    title: "Is salary sacrifice worth it? What it really saves in 2026/27",
    seoTitle: "Is Salary Sacrifice Worth It? 2026/27 Figures",
    description:
      "Salary sacrifice cuts Income Tax, NI and student loan repayments. Worked 2026/27 examples for pensions, Cycle to Work and other schemes, and the catches.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Salary sacrifice means agreeing with your employer to give up part of your salary in return for a benefit,
          usually a bigger pension contribution. Because the salary you give up is never paid to you, you pay no Income
          Tax, no National Insurance and no student loan repayment on it. The result is that a £1,000 pension
          contribution can cost you only £580 to £720 of take-home pay, and less still in some salary bands.
        </p>
        <p>
          This guide works through real 2026/27 examples, all from the same engine as our{" "}
          <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, and explains the catches:
          the minimum wage rule, the effect on mortgages and other benefits, and the National Insurance cap planned for
          2029.
        </p>

        <h2>How salary sacrifice saves money</h2>
        <p>
          Compare two ways of putting £1,500 a year into a workplace pension on a £30,000 salary in England. Paid out of
          your salary under the &ldquo;net pay&rdquo; or &ldquo;relief at source&rdquo; methods, you get Income Tax
          relief but still pay National Insurance on the full £30,000. By salary sacrifice, your salary becomes £28,500
          and the £1,500 goes straight into the pension, so both tax and National Insurance fall.
        </p>
        <table>
          <thead>
            <tr>
              <th>£30,000 salary, £1,500 sacrificed into a pension</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Take-home pay before</td><td>£25,119.60</td></tr>
            <tr><td>Take-home pay after</td><td>£24,039.60</td></tr>
            <tr><td>Fall in take-home pay</td><td>£1,080</td></tr>
            <tr><td>Income Tax saved</td><td>£300</td></tr>
            <tr><td>National Insurance saved</td><td>£120</td></tr>
            <tr><td>Paid into your pension</td><td>£1,500</td></tr>
          </tbody>
        </table>
        <p>
          So £1,500 goes into your pension for £1,080 out of your pocket: a saving of £420, or 28% of the amount
          sacrificed. That 28% is simply the basic rate of tax (20%) plus the main rate of employee National Insurance
          (8%).
        </p>

        <h2>What it saves at different salaries</h2>
        <p>
          The saving on each pound you sacrifice is your marginal rate of tax, National Insurance and student loan on
          the slice of salary you give up. Four 2026/27 examples, each sacrificing a pension contribution in England,
          Wales or Northern Ireland:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary and sacrifice</th>
              <th>Cost to you</th>
              <th>Saving</th>
              <th>Saving as a share</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£30,000, sacrifice £1,500</td><td>£1,080</td><td>£420</td><td>28%</td></tr>
            <tr><td>£45,000 with a Plan 2 loan, sacrifice £2,250</td><td>£1,417.50</td><td>£832.50</td><td>37%</td></tr>
            <tr><td>£60,000, sacrifice £3,000</td><td>£1,740</td><td>£1,260</td><td>42%</td></tr>
            <tr><td>£105,000, sacrifice £5,000</td><td>£1,900</td><td>£3,100</td><td>62%</td></tr>
          </tbody>
        </table>
        <p>
          The Plan 2 example saves an extra £202.50 because student loan repayments are 9% of earnings above the
          threshold, and sacrificed salary is not counted. The £105,000 example is the most striking: bringing income
          back down to £100,000 restores £2,500 of Personal Allowance, so £5,000 goes into the pension for just £1,900
          of take-home pay. Our guide to the <Link href="/blog/100k-tax-trap">£100,000 tax trap</Link> explains why.
        </p>
        <p>
          In Scotland the saving can be larger, because the Scottish intermediate and higher rates are 21% and 42%. On
          £45,000 with £2,250 sacrificed, a Scottish taxpayer saves £933.48 against £630 for the same salary elsewhere
          in the UK (without a student loan).
        </p>

        <h2>Your employer saves too</h2>
        <p>
          Employers pay 15% National Insurance on earnings above £5,000 a year. When you sacrifice £1,500, your employer
          saves £225 of its own National Insurance. Some employers add part or all of that saving to your pension. If
          yours adds all of it, the £30,000 example puts £1,725 into your pension for the same £1,080 of take-home pay.
          It is worth asking HR whether your employer shares its saving.
        </p>

        <h2>Cycle to Work and other schemes</h2>
        <p>
          Pensions are not the only exempt benefit. Under the Cycle to Work scheme, giving up £1,000 of a £30,000 salary
          for a bike costs £720 of take-home pay, a saving of £280, because tax and National Insurance both fall.
          Electric car schemes work in a similar way, but you pay company car tax on the car, so use the{" "}
          <Link href="/uk/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</Link> for those.
        </p>
        <p>
          Most other benefits fall under the &ldquo;optional remuneration&rdquo; rules. For them you still pay Income
          Tax on the salary you gave up, so only National Insurance falls. Sacrificing £1,200 of a £30,000 salary for
          such a benefit saves just £96 a year: the 8% National Insurance.
        </p>

        <h2>The catches</h2>
        <h3>You cannot go below the minimum wage</h3>
        <p>
          A sacrifice must not take your pay below the National Living Wage, £12.71 an hour for workers aged 21 and
          over from April 2026. On £26,000 for 37.5 hours a week, sacrificing £1,500 would leave £12.56 an hour, so your
          employer cannot agree it. A sacrifice of £1,000 leaves £12.82 an hour and is allowed.
        </p>
        <h3>A lower salary can affect other things</h3>
        <ul>
          <li>
            <strong>Mortgages:</strong>{" "}lenders may use your salary after sacrifice when working out how much you can
            borrow.
          </li>
          <li>
            <strong>Statutory pay:</strong>{" "}Statutory Maternity Pay, Statutory Sick Pay and similar payments depend on
            your earnings, so a big sacrifice can reduce them or make you ineligible.
          </li>
          <li>
            <strong>Life cover and pay rises:</strong>{" "}some employers base life insurance or percentage pay rises on
            the salary after sacrifice. Check your scheme&rsquo;s rules.
          </li>
          <li>
            <strong>Universal Credit and tax credits:</strong>{" "}lower earnings can mean more help, which is usually a
            good thing, but it does change the sums.
          </li>
        </ul>
        <h3>The National Insurance cap from April 2029</h3>
        <p>
          The government has announced that from April 2029 only the first £2,000 a year of pension contributions made
          by salary sacrifice will be free of National Insurance. Contributions above £2,000 will still save Income Tax,
          but both you and your employer will pay National Insurance on them. Until then, the full saving applies.
        </p>

        <h2>Is it worth it?</h2>
        <p>
          For most employees whose employer offers it, yes: salary sacrifice is the cheapest way to pay into a pension,
          because it saves National Insurance on top of Income Tax. It is most valuable for higher-rate taxpayers,
          anyone repaying a student loan, and anyone with income between £100,000 and £125,140. The main reasons to hold
          back are a mortgage application in the near future, a pay level close to the minimum wage, or plans to take
          family leave soon.
        </p>
        <p>
          To see the effect on your own pay, use the{" "}
          <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, or compare the different ways
          of getting tax relief with the <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "marriage-allowance-explained",
    title: "Marriage Allowance in 2026/27: who gains £252, and how to claim four years back",
    seoTitle: "Marriage Allowance 2026/27: Who Gets £252?",
    description:
      "A low earner can pass £1,260 of Personal Allowance to a basic rate spouse, worth up to £252 a year. Who qualifies, when it does not pay, and how to backdate.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "7 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Marriage Allowance is one of the easiest tax savings in the UK, and one of the most often missed. If one of
          you earns less than the Personal Allowance and the other pays tax at the basic rate, the lower earner can
          transfer <strong>£1,260</strong>{" "}of their allowance to their partner. That cuts the higher earner&rsquo;s tax
          by up to <strong>£252 a year</strong>, and you can claim for up to four earlier years too.
        </p>
        <p>
          This guide uses 2026/27 figures from the same engine as our{" "}
          <Link href="/uk/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, so you can check your own
          incomes there.
        </p>

        <h2>Who can claim</h2>
        <ul>
          <li>You are married or in a civil partnership. Living together is not enough.</li>
          <li>
            The lower earner&rsquo;s income is £12,570 or less (the Personal Allowance). Income includes pensions,
            savings interest above any tax-free amounts, rent and other taxable income.
          </li>
          <li>
            The higher earner pays tax at the basic rate: income up to £50,270 in England, Wales or Northern Ireland.
            In Scotland, they must pay no more than the intermediate rate, up to £43,662.
          </li>
          <li>
            Neither of you was born before 6 April 1935. Couples where one was are looked after by the Married
            Couple&rsquo;s Allowance instead.
          </li>
        </ul>

        <h2>How much it is worth</h2>
        <p>
          The higher earner&rsquo;s tax falls by 20% of £1,260, which is £252. The lower earner&rsquo;s own allowance
          falls to £11,310. If they earn £11,310 or less, that costs them nothing, so the couple gains the full £252.
          If they earn between £11,310 and £12,570, they pay some tax on the slice above £11,310, and the gain is
          smaller.
        </p>
        <table>
          <thead>
            <tr>
              <th>Lower earner&rsquo;s income</th>
              <th>Higher earner&rsquo;s income</th>
              <th>Couple gains each year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£8,000</td><td>£30,000</td><td>£252</td></tr>
            <tr><td>£11,500</td><td>£30,000</td><td>£214</td></tr>
            <tr><td>£12,000</td><td>£30,000</td><td>£114</td></tr>
            <tr><td>£12,570</td><td>£30,000</td><td>Nothing: it costs as much as it saves</td></tr>
            <tr><td>£8,000</td><td>£13,000</td><td>£86 (the higher earner only pays £86 tax)</td></tr>
            <tr><td>£8,000</td><td>£55,000</td><td>Not eligible: higher rate taxpayer</td></tr>
          </tbody>
        </table>
        <p>
          The £12,000 example is easy to get wrong: the higher earner saves £252, but the lower earner now pays £138
          of tax on the £690 above £11,310, leaving a gain of £114. Claim only if the household comes out ahead.
        </p>

        <h2>Claiming for earlier years</h2>
        <p>
          You can backdate a claim for up to four tax years if you were eligible in each of them. In 2026/27 that
          means 2022/23, 2023/24, 2024/25 and 2025/26. The allowance was £1,260 in each of those years, so a couple who
          gain the full amount every year can receive <strong>£1,260 in total</strong>: £252 this year and £1,008
          backdated. HMRC pays backdated amounts as a lump sum to the higher earner.
        </p>

        <h2>How to claim</h2>
        <p>
          The lower earner applies on GOV.UK, free of charge. It takes a few minutes and needs both National Insurance
          numbers. You do not need to use a claims company: they charge a share of the refund for something you can do
          yourself.
        </p>
        <p>
          Once it is in place, HMRC changes both <Link href="/uk/tax-and-salary/tax-code-decoder">tax codes</Link>. The
          higher earner&rsquo;s code ends in M (for example 1383M) and the lower earner&rsquo;s ends in N (for example
          1131N). The allowance renews each year automatically until you cancel it or your circumstances change.
        </p>

        <h2>When to cancel</h2>
        <ul>
          <li>
            The lower earner&rsquo;s income rises above £12,570, or the higher earner moves into the higher rate band
            (perhaps after a <Link href="/uk/tax-and-salary/pay-rise">pay rise</Link>).
          </li>
          <li>You divorce, end a civil partnership, or your partner dies (special rules apply on bereavement).</li>
        </ul>
        <p>
          If you claim when you are not entitled, HMRC will ask for the tax back, so review the claim each April.
        </p>

        <h2>Scotland</h2>
        <p>
          In Scotland the rules are the same, except that the higher earner must not pay tax above the intermediate
          rate (21%). A Scottish higher earner on £45,000 is above the £43,662 limit and cannot receive the allowance.
          The saving is still worked out at 20%, so a couple where the lower earner earns £8,000 and the higher earner
          £40,000 still gain £252.
        </p>

        <p>
          Check your own figures, including backdating, with the{" "}
          <Link href="/uk/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, and see what else you
          take home with the <Link href="/uk/tax-and-salary/salary-calculator">salary calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "uk-take-home-pay-explained",
    title: "How UK take-home pay works in 2026/27: a plain-English guide",
    seoTitle: "How UK Take-Home Pay Works in 2026/27",
    description:
      "Income Tax, National Insurance, the Personal Allowance and the hidden 60% trap: what comes out of your salary in 2026/27, with a worked example.",
    date: "2026-05-20",
    dateLabel: "20 May 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          You agree a salary, then your first payslip arrives and it&apos;s
          noticeably smaller than you expected. Where did the money go? In the
          UK, the gap between your <strong>gross</strong> salary (what you
          agreed) and your <strong>take-home</strong> pay (what hits your bank)
          comes down to two main deductions: <strong>Income Tax</strong> and{" "}
          <strong>National Insurance</strong>. This guide explains both for the{" "}
          <strong>2026/27 tax year</strong>, in plain English, with a worked
          example you can follow.
        </p>
        <p>
          Want the number first and the theory second? Run your figure through
          the{" "}
          <Link href="/uk/tax-and-salary/salary-calculator">
            Salary &amp; Take-Home Pay Calculator
          </Link>{" "}
          and come back here to understand it.
        </p>

        <h2>The two deductions that shrink your salary</h2>
        <p>
          For a standard employee paid through PAYE (Pay As You Earn), almost
          all of the difference between gross and net pay is these two:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> — paid to HMRC on most of your income
            above a tax-free allowance.
          </li>
          <li>
            <strong>National Insurance (NI)</strong> — a separate contribution
            that funds the State Pension and some benefits.
          </li>
        </ul>
        <p>
          Pensions and student loans can also reduce your pay, but we&apos;ll
          set those aside to keep the core picture clear.
        </p>

        <h2>Step 1: Your Personal Allowance (the tax-free bit)</h2>
        <p>
          Everyone gets a <strong>Personal Allowance</strong>{" "}— an amount you
          can earn before paying any Income Tax. For 2026/27 it&apos;s{" "}
          <strong>£12,570</strong>. Earn less than that and you pay no Income
          Tax at all.
        </p>
        <p>
          There&apos;s a catch for higher earners: once your income passes{" "}
          <strong>£100,000</strong>, your Personal Allowance shrinks by £1 for
          every £2 you earn above that line, disappearing entirely at £125,140.
          More on why that matters below.
        </p>

        <h2>Step 2: The Income Tax bands</h2>
        <p>
          Income Tax in England, Wales and Northern Ireland is{" "}
          <em>banded</em>. You don&apos;t pay one rate on everything — you pay
          each rate only on the slice of income that falls inside its band. For
          2026/27:
        </p>
        <table>
          <thead>
            <tr>
              <th>Band</th>
              <th>Taxable income</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personal Allowance</td>
              <td>Up to £12,570</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Basic rate</td>
              <td>£12,571 – £50,270</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>Higher rate</td>
              <td>£50,271 – £125,140</td>
              <td>40%</td>
            </tr>
            <tr>
              <td>Additional rate</td>
              <td>Over £125,140</td>
              <td>45%</td>
            </tr>
          </tbody>
        </table>
        <p>
          The key idea: a pay rise that pushes you into the higher-rate band
          does <strong>not</strong> mean all your income is suddenly taxed at
          40%. Only the pounds above £50,270 are. Scotland uses a different,
          six-band system — see the{" "}
          <Link href="/uk/tax-and-salary/scottish-tax">
            Scottish Income Tax calculator
          </Link>{" "}
          if that&apos;s you.
        </p>

        <h2>Step 3: National Insurance</h2>
        <p>
          On top of Income Tax, employees pay Class 1 National Insurance. For
          2026/27 the employee rates are:
        </p>
        <ul>
          <li>
            <strong>0%</strong> on earnings up to £12,570.
          </li>
          <li>
            <strong>8%</strong> on earnings between £12,570 and £50,270.
          </li>
          <li>
            <strong>2%</strong> on earnings above £50,270.
          </li>
        </ul>
        <p>
          NI is calculated on your earnings, separately from Income Tax. You can
          break it down with the{" "}
          <Link href="/uk/tax-and-salary/national-insurance">
            National Insurance calculator
          </Link>
          .
        </p>

        <h2>A worked example: £35,000 salary</h2>
        <p>Let&apos;s put it together for someone earning £35,000 a year.</p>
        <ul>
          <li>
            <strong>Income Tax:</strong> the first £12,570 is tax-free. That
            leaves £22,430 taxed at 20% = <strong>£4,486</strong>.
          </li>
          <li>
            <strong>National Insurance:</strong> 8% on the £22,430 between
            £12,570 and £35,000 = <strong>£1,794</strong>.
          </li>
          <li>
            <strong>Total deductions:</strong> £4,486 + £1,794 ={" "}
            <strong>£6,280</strong>.
          </li>
          <li>
            <strong>Take-home pay:</strong> £35,000 − £6,280 ={" "}
            <strong>£28,720 a year</strong>, or about £2,393 a month.
          </li>
        </ul>
        <p>
          That&apos;s an effective tax rate of roughly 18% — even though the
          person is a &quot;20% taxpayer&quot;. The difference is the tax-free
          allowance dragging the average down.
        </p>

        <h2>The hidden 60% tax trap</h2>
        <p>
          Here&apos;s the quirk that surprises people most. Between{" "}
          <strong>£100,000 and £125,140</strong>, every extra £1 you earn does
          two things: it&apos;s taxed at 40%, <em>and</em> it removes 50p of
          your Personal Allowance, which is itself then taxed. The combined
          effect is an effective marginal rate of <strong>60%</strong>. A pay
          rise into this band is often worth far less than it looks — and paying
          into a pension is a common way to step back below the line.
        </p>

        <h2>What this guide leaves out</h2>
        <p>
          To stay readable, the example above ignores a few things that can
          change your real payslip:
        </p>
        <ul>
          <li>
            <strong>Workplace pensions</strong>, especially salary sacrifice,
            which reduce both take-home and taxable pay.
          </li>
          <li>
            <strong>Student loan repayments</strong> (Plans 1, 2, 4, 5 and
            postgraduate), each with its own threshold.
          </li>
          <li>
            <strong>Non-standard tax codes</strong> like BR, 0T or K, which can
            change your tax dramatically.
          </li>
        </ul>
        <p>
          For the headline number, the{" "}
          <Link href="/uk/tax-and-salary/salary-calculator">
            take-home calculator
          </Link>{" "}
          is the fastest way to see where you stand — and if you&apos;re
          weighing up a raise, the{" "}
          <Link href="/uk/tax-and-salary/tax-bracket-checker">
            Tax Bracket Checker
          </Link>{" "}
          shows what each band actually costs.
        </p>

        <h2>The bottom line</h2>
        <p>
          UK take-home pay isn&apos;t random — it&apos;s a tax-free allowance,
          then banded Income Tax, then National Insurance layered on top. Once
          you see the slices, your payslip stops being a mystery. Bookmark the
          calculators you need, and remember: the figures here are estimates for
          general guidance, not personal advice. Always check your own tax code
          and circumstances.
        </p>
      </>
    ),
  },
  {
    slug: "100k-tax-trap",
    title: "The £100,000 tax trap: why a pay rise can cost you 62% and how to keep more",
    seoTitle: "The £100,000 Tax Trap: 62% Tax Explained",
    description:
      "Earn £100,000 to £125,140 and you lose your Personal Allowance and childcare help. What that costs in 2026/27, and how pension contributions win it back.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Most people expect a pay rise to make them better off, and almost always it does. But there is one stretch of
          income in the UK where the tax system takes far more than the headline rates suggest. Between{" "}
          <strong>£100,000 and £125,140</strong>, an employee in England, Wales or Northern Ireland keeps just{" "}
          <strong>38p of every extra pound</strong>. For parents of young children, crossing £100,000 by even £1 can also
          switch off thousands of pounds of childcare support.
        </p>
        <p>
          This guide explains where the trap comes from, what it costs in real pounds for 2026/27, and the legal, common
          ways to step back out of it. Every figure here comes from the same engine as our{" "}
          <Link href="/uk/tax-and-salary/salary-calculator">Salary &amp; Take-Home Pay Calculator</Link>, so you can check
          your own numbers there.
        </p>

        <h2>Where the trap comes from</h2>
        <p>
          Everyone starts with a tax-free <strong>Personal Allowance of £12,570</strong>. Once your{" "}
          <em>adjusted net income</em> goes above £100,000, that allowance is reduced by £1 for every £2 of income over
          the line. By £125,140 it has gone completely.
        </p>
        <p>
          So each extra £2 you earn in this band does two things. It is taxed at the 40% higher rate, and it removes £1 of
          allowance, which means another £1 of your income that used to be tax-free is now taxed at 40% too. Put
          together:
        </p>
        <ul>
          <li>
            Income Tax on the £2 itself: <strong>80p</strong> (40%).
          </li>
          <li>
            Income Tax on the £1 of lost allowance: <strong>40p</strong>.
          </li>
          <li>
            Total: <strong>£1.20 of tax on £2</strong>, an effective rate of <strong>60%</strong>.
          </li>
        </ul>
        <p>
          Add 2% employee National Insurance and the marginal rate on salary is <strong>62%</strong>. Above £125,140 the
          allowance is already gone, so the rate falls back to the 45% additional rate plus 2% NI: 47%. That is the odd
          shape of the UK system: the marginal rate between £100,000 and £125,140 is higher than the rate above it.
        </p>

        <h2>What it costs in real pounds</h2>
        <p>Here is a salary of £100,000, £110,000 and £125,140 in 2026/27, with no pension or student loan:</p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Personal Allowance</th>
              <th>Income Tax</th>
              <th>National Insurance</th>
              <th>Take-home</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£100,000</td>
              <td>£12,570</td>
              <td>£27,432</td>
              <td>£4,010.60</td>
              <td>£68,557.40</td>
            </tr>
            <tr>
              <td>£110,000</td>
              <td>£7,570</td>
              <td>£33,432</td>
              <td>£4,210.60</td>
              <td>£72,357.40</td>
            </tr>
            <tr>
              <td>£125,140</td>
              <td>£0</td>
              <td>£42,516</td>
              <td>£4,513.40</td>
              <td>£78,110.60</td>
            </tr>
          </tbody>
        </table>
        <p>
          A £10,000 rise from £100,000 to £110,000 adds just <strong>£3,800</strong> to take-home pay. Going all the way
          to £125,140, a rise of £25,140, adds <strong>£9,553.20</strong>. You can see the band-by-band picture for any
          salary in the <Link href="/uk/tax-and-salary/tax-bracket-checker">Tax Bracket Checker</Link>.
        </p>
        <p>
          In Scotland the trap is steeper still. The Personal Allowance taper is the same, but the income it pulls into
          tax meets the 45% advanced rate, so the marginal rate on salary is <strong>69.5%</strong> including NI. A
          Scottish taxpayer going from £100,000 to £110,000 keeps £3,050 of the £10,000. The{" "}
          <Link href="/uk/tax-and-salary/scottish-tax">Scottish Income Tax calculator</Link> shows the full picture.
        </p>

        <h2>The childcare cliff for parents</h2>
        <p>
          The tax taper is gradual. The childcare rules are not. Two valuable schemes use the same £100,000 adjusted net
          income test, and each one is all or nothing:
        </p>
        <ul>
          <li>
            <strong>Funded childcare hours for working parents</strong>{" "}in England: up to 30 hours a week, 38 weeks a
            year (1,140 hours) for children from 9 months until they start school. If either parent&rsquo;s adjusted net
            income is expected to be over £100,000, the family loses the working-parent hours. The universal 15 hours for
            3 and 4-year-olds stay. Check eligibility with the{" "}
            <Link href="/uk/benefits/free-childcare-hours">free childcare hours calculator</Link>.
          </li>
          <li>
            <strong>Tax-Free Childcare</strong>: the government adds £2 for every £8 you pay into a childcare account, up
            to <strong>£2,000 a year per child</strong> (£4,000 for a disabled child). Same £100,000 limit, for either
            parent. See the <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>.
          </li>
        </ul>
        <p>
          With two young children in nursery, going £1 over the line can cost more in lost support than the whole of a
          modest pay rise. Child Benefit is a separate matter: the High Income Child Benefit Charge claws it back
          between £60,000 and £80,000, so by £100,000 it has already gone in full (worth £2,337.40 a year for two
          children in 2026/27). The{" "}
          <Link href="/uk/benefits/high-income-child-benefit">High Income Child Benefit calculator</Link> covers that
          earlier band.
        </p>

        <h2>The fix: reduce your adjusted net income</h2>
        <p>
          Every rule above is tested on <strong>adjusted net income</strong>, not on your salary. Adjusted net income is
          your total taxable income less certain deductions, mainly pension contributions and Gift Aid donations. So the
          same tool fixes all three problems at once: put the excess into a pension.
        </p>
        <p>
          Take someone on £110,000 who pays an extra <strong>£10,000</strong> into their pension through salary
          sacrifice. Their pay for tax falls to £100,000, they get their full Personal Allowance back, and their
          take-home falls by only <strong>£3,800</strong>. In other words, £10,000 lands in the pension at a cost of
          £3,800: an effective 62% boost, before any employer top-up. If their adjusted net income is now £100,000 or
          less, the childcare support comes back too.
        </p>
        <p>The method of paying in changes the mechanics, but not much the outcome:</p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>How it works</th>
              <th>Cost of £10,000 into the pension at £110,000</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary sacrifice</td>
              <td>You give up salary; your employer pays it in. Saves tax and NI.</td>
              <td>£3,800</td>
            </tr>
            <tr>
              <td>Net pay arrangement</td>
              <td>Paid from your gross pay before tax. Saves tax, not NI.</td>
              <td>£4,000</td>
            </tr>
            <tr>
              <td>Relief at source</td>
              <td>
                You pay £8,000; the provider adds £2,000. You claim the other £4,000 back through Self Assessment.
              </td>
              <td>£4,000 (after the claim)</td>
            </tr>
          </tbody>
        </table>
        <p>
          With relief at source, the claim matters: if you don&rsquo;t file a tax return or ask HMRC, you miss the
          higher-rate relief <em>and</em> the Personal Allowance stays reduced. Many people in this band are owed money
          for this reason. The <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link> works out
          each method for your salary.
        </p>

        <h2>Bonuses, timing and other ways in</h2>
        <p>
          The trap often catches people through a one-off. A bonus, a big overtime month, savings interest or dividends
          all count towards adjusted net income for the tax year. A few points worth knowing:
        </p>
        <ul>
          <li>
            <strong>Bonus sacrifice.</strong> Many employers let you sacrifice part or all of a bonus into your pension.
            It must be agreed before the bonus is paid. Our <Link href="/uk/tax-and-salary/bonus-tax">bonus tax calculator</Link>{" "}
            shows what a bonus is worth with and without it.
          </li>
          <li>
            <strong>It is a tax-year test.</strong>{" "}Income from 6 April to 5 April counts. A contribution made in March
            reduces that year&rsquo;s figure; one made in May counts towards the next.
          </li>
          <li>
            <strong>Gift Aid.</strong> Donations to charity reduce adjusted net income by the grossed-up amount. A £800
            donation counts as £1,000.
          </li>
          <li>
            <strong>Savings and dividends count.</strong> Interest above your Personal Savings Allowance and dividends
            still add to adjusted net income, even if some are tax-free. Moving savings into an ISA keeps them out of
            the calculation.
          </li>
        </ul>

        <h2>Limits and things to watch</h2>
        <ul>
          <li>
            <strong>The annual allowance.</strong>{" "}You can normally get tax relief on pension savings of up to £60,000 a
            year (including your employer&rsquo;s contributions), or 100% of your earnings if less. Unused allowance
            from the three previous years can be carried forward.
          </li>
          <li>
            <strong>Pension money is locked away.</strong>{" "}You can&rsquo;t normally draw it until 55 (57 from April
            2028). If you need the cash for a house deposit or school fees, this strategy has a real cost.
          </li>
          <li>
            <strong>Salary sacrifice lowers your contractual pay.</strong> That can affect mortgage applications, life
            cover and statutory pay such as maternity pay. Check with your employer first.
          </li>
          <li>
            <strong>Changes from April 2029.</strong> The government plans to cap the NI saving on salary sacrifice
            pension contributions at £2,000 a year. Income Tax relief is unaffected, so the trap fix still works; the
            extra NI saving shrinks for large sacrifices.
          </li>
        </ul>

        <h2>A simple checklist</h2>
        <ul>
          <li>Estimate your adjusted net income for the whole tax year, including bonuses, interest and dividends.</li>
          <li>If it is between £100,000 and £125,140, work out how much you would need to pay into a pension to get back to £100,000.</li>
          <li>If you have young children in childcare, treat £100,000 as a hard line for <em>each</em> parent.</li>
          <li>If you use relief at source, make sure you claim the extra relief through Self Assessment.</li>
          <li>Run the numbers in the <Link href="/uk/investing/workplace-pension">workplace pension calculator</Link> before changing your contribution.</li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          The £100,000 trap is not a reason to turn down a pay rise: you are always better off in cash terms, just by
          much less than you would expect. But for anyone in this band, every pound paid into a pension is unusually
          cheap, and for parents of young children, staying at or under £100,000 can be worth thousands. These figures
          are estimates for 2026/27 and general guidance, not personal financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "plan-2-vs-plan-5-student-loans",
    title: "Plan 2 vs Plan 5 student loans: what you will actually repay",
    seoTitle: "Plan 2 vs Plan 5 Student Loans: What You Repay",
    description:
      "Plan 2 vs Plan 5 for 2026/27: thresholds, interest and write-off compared with lifetime projections, and when overpaying your student loan helps or wastes money.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Students",
    body: (
      <>
        <p>
          If you started an undergraduate course in England from August 2023, your loan is on <strong>Plan 5</strong>.
          If you started between September 2012 and July 2023 (in England or Wales), you are on <strong>Plan 2</strong>.
          The two look similar on paper, but they behave very differently over a working life. This guide compares them
          for 2026/27, using the same engine as our{" "}
          <Link href="/uk/students/plan-2-student-loan">Plan 2</Link> and{" "}
          <Link href="/uk/students/plan-5-student-loan">Plan 5</Link> calculators.
        </p>

        <h2>The rules side by side</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Plan 2</th>
              <th>Plan 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Repayment threshold 2026/27</td>
              <td>£29,385 a year</td>
              <td>£25,000 a year</td>
            </tr>
            <tr>
              <td>Repayment rate</td>
              <td>9% of income above the threshold</td>
              <td>9% of income above the threshold</td>
            </tr>
            <tr>
              <td>Threshold in future</td>
              <td>Frozen at £29,385 until April 2030</td>
              <td>Rises with RPI from April 2027</td>
            </tr>
            <tr>
              <td>Interest (September 2026 to August 2027)</td>
              <td>RPI to RPI + 3% depending on income, capped at 6%</td>
              <td>RPI only: 4.1%</td>
            </tr>
            <tr>
              <td>Written off</td>
              <td>30 years after you were first due to repay</td>
              <td>40 years after you were first due to repay</td>
            </tr>
          </tbody>
        </table>
        <p>
          On Plan 2, interest depends on what you earn: 4.1% (RPI) on income up to £29,385, rising on a sliding scale to
          RPI + 3% at £52,885, with the 6% cap applying this year. Someone on £40,000 is charged about 5.46%; anyone earning
          about £44,300 or more hits the 6% cap.
        </p>

        <h2>What comes out of your pay each month</h2>
        <p>
          Repayments depend only on your income, not on how much you borrowed. Plan 5&rsquo;s lower threshold means you
          repay more at every salary:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Plan 2 a month</th>
              <th>Plan 5 a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£25,000</td>
              <td>£0</td>
              <td>£0</td>
            </tr>
            <tr>
              <td>£30,000</td>
              <td>£4.61</td>
              <td>£37.50</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£42.11</td>
              <td>£75.00</td>
            </tr>
            <tr>
              <td>£40,000</td>
              <td>£79.61</td>
              <td>£112.50</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£154.61</td>
              <td>£187.50</td>
            </tr>
            <tr>
              <td>£60,000</td>
              <td>£229.61</td>
              <td>£262.50</td>
            </tr>
          </tbody>
        </table>
        <p>
          The gap is a steady £32.89 a month (£394.65 a year) once you earn above the Plan 2 threshold. That is 9% of the
          £4,385 difference between the two thresholds. Repayments are taken through PAYE alongside tax and NI; the{" "}
          <Link href="/uk/tax-and-salary/salary-calculator">take-home pay calculator</Link> includes them.
        </p>

        <h2>What you repay over a lifetime</h2>
        <p>
          The real difference is the length of the term. Here are projections for a £50,000 balance, starting to repay
          now, with pay rising 3% a year and RPI at 3% from 2027:
        </p>
        <table>
          <thead>
            <tr>
              <th>Starting salary</th>
              <th>Plan 2: total repaid</th>
              <th>Plan 2: written off</th>
              <th>Plan 5: total repaid</th>
              <th>Plan 5: written off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£28,000</td>
              <td>£4,467</td>
              <td>£191,013</td>
              <td>£20,358</td>
              <td>£130,640</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£34,266</td>
              <td>£168,232</td>
              <td>£67,861</td>
              <td>£50,831</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£98,493</td>
              <td>£59,176</td>
              <td>£73,611</td>
              <td>£0 (cleared in year 24)</td>
            </tr>
          </tbody>
        </table>
        <p>Three things stand out:</p>
        <ul>
          <li>
            <strong>Most people on Plan 2 never clear the loan.</strong> Even a graduate starting on £50,000 still has a
            balance written off after 30 years in this projection, having repaid nearly twice what they borrowed.
          </li>
          <li>
            <strong>Plan 5 takes more from middle earners.</strong> At £35,000, a Plan 5 borrower repays roughly double
            what a Plan 2 borrower would, because the threshold is lower and the payments run for 40 years instead of
            30.
          </li>
          <li>
            <strong>Plan 5 is cheaper for high earners.</strong> Lower interest (RPI only) means a Plan 5 borrower on
            £50,000 clears the loan in 24 years and repays about £25,000 less than on Plan 2.
          </li>
        </ul>
        <p>
          The written-off figures look alarming, but you never pay them. Once the term ends, whatever is left is
          cancelled. The balance you see in your online account is, for many people, not a debt you will ever repay.
        </p>

        <h2>Should you overpay?</h2>
        <p>
          This is where most people go wrong. Overpaying only saves money if you were going to clear the loan anyway. If
          you are heading for a write-off, every extra pound simply replaces a pound that would have been cancelled.
        </p>
        <p>Here is the effect of overpaying £100 a month on a £50,000 Plan 5 loan:</p>
        <ul>
          <li>
            <strong>Starting salary £35,000:</strong> total repaid rises from £67,861 to <strong>£80,818</strong>. The
            loan is cleared in year 31, but you have paid nearly £13,000 more. Overpaying costs money.
          </li>
          <li>
            <strong>Starting salary £50,000:</strong> total repaid falls from £73,611 to <strong>£65,395</strong>, and
            the loan is cleared in year 17 instead of year 24. Overpaying saves about £8,200.
          </li>
        </ul>
        <p>
          The calculators show both paths for your own balance and pay. As a rough rule, overpaying makes sense only if
          you expect your earnings to be high enough to clear the loan well before the write-off date. Otherwise, the
          money usually does more in a pension (with tax relief) or a{" "}
          <Link href="/uk/investing/isa-vs-gia">stocks and shares ISA</Link>, or towards a house deposit.
        </p>

        <h2>Common questions</h2>
        <h3>Does a student loan affect my mortgage?</h3>
        <p>
          It is not a debt on your credit file, but lenders count the monthly repayment as an outgoing when they work
          out how much to lend. A Plan 5 borrower on £40,000 has £112.50 a month taken into account. Our{" "}
          <Link href="/uk/property/mortgage-affordability">mortgage affordability calculator</Link> lets you include it.
        </p>
        <h3>What if I have a Plan 2 loan and a Postgraduate Loan?</h3>
        <p>
          You repay both at once: 9% above the Plan 2 threshold and 6% above £21,000 for the Postgraduate Loan. See the{" "}
          <Link href="/uk/students/student-loan-repayment">student loan repayment calculator</Link>.
        </p>
        <h3>What if I move abroad?</h3>
        <p>
          You must tell the Student Loans Company. Repayments are then set using the threshold for the country you live
          in, and you pay them directly instead of through PAYE.
        </p>
        <h3>I&rsquo;m starting university. What will I borrow?</h3>
        <p>
          Tuition fee loans plus maintenance loans of up to several thousand pounds a year. The{" "}
          <Link href="/uk/students/maintenance-loan">maintenance loan calculator</Link> shows your entitlement from
          household income.
        </p>

        <h2>The bottom line</h2>
        <p>
          A student loan works more like a 9% graduate tax for 30 or 40 years than a normal debt. Plan 5 takes more from
          middle earners and less from high earners than Plan 2. Before you overpay, check whether you would ever clear
          the loan; for most people, you won&rsquo;t, and the money is better used elsewhere. These are projections
          based on assumptions about pay and inflation, not a guarantee.
        </p>
      </>
    ),
  },
  {
    slug: "first-time-buyer-costs",
    title: "Buying your first home in 2026/27: the real cost, from deposit to monthly payments",
    seoTitle: "First-Time Buyer Costs 2026/27: The Real Total",
    description:
      "Stamp Duty relief, deposit, legal fees, surveys and mortgage payments for first-time buyers in England, Scotland and Wales, worked through for a £350,000 home.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Property",
    body: (
      <>
        <p>
          The deposit is the number everyone focuses on, but it is only part of the cash you need to buy your first
          home. Stamp Duty, legal fees, a survey, a mortgage fee and the move itself all come on top. This guide walks
          through each cost for 2026/27, with a full worked example, so you can plan for the real total. The figures
          use the same engines as our <Link href="/uk/property/first-time-buyer">first-time buyer calculator</Link> and{" "}
          <Link href="/uk/property/moving-house-budget">moving house budget calculator</Link>.
        </p>

        <h2>1. The deposit</h2>
        <p>
          Most lenders need at least 5% of the price, but the rate you are offered improves as the deposit grows. The
          usual steps are 5%, 10%, 15%, 25% and 40%. Moving from a 5% to a 10% deposit often makes a noticeable
          difference to the rate.
        </p>
        <p>
          If you are aged 18 to 39, a <strong>Lifetime ISA</strong> can help: you can save up to £4,000 a year and the
          government adds 25% (up to £1,000 a year). The home must cost £450,000 or less, and you must have held the
          account for at least 12 months. Withdraw for any other reason before 60 and you pay a 25% charge, which takes
          back more than the bonus.
        </p>

        <h2>2. Stamp Duty and its equivalents</h2>
        <p>
          In England and Northern Ireland, first-time buyers pay no Stamp Duty on the first £300,000 and 5% on the part
          from £300,001 to £500,000. Above £500,000 the relief is lost completely and you pay the normal rates on the
          whole price. Scotland and Wales have their own taxes with different rules:
        </p>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>England / NI: first-time buyer</th>
              <th>England / NI: other buyers</th>
              <th>Scotland LBTT: first-time buyer</th>
              <th>Wales LTT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£250,000</td>
              <td>£0</td>
              <td>£2,500</td>
              <td>£1,500</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>£300,000</td>
              <td>£0</td>
              <td>£5,000</td>
              <td>£4,000</td>
              <td>£4,500</td>
            </tr>
            <tr>
              <td>£350,000</td>
              <td>£2,500</td>
              <td>£7,500</td>
              <td>£7,750</td>
              <td>£7,500</td>
            </tr>
            <tr>
              <td>£450,000</td>
              <td>£7,500</td>
              <td>£12,500</td>
              <td>£17,750</td>
              <td>£14,250</td>
            </tr>
            <tr>
              <td>£500,000</td>
              <td>£10,000</td>
              <td>£15,000</td>
              <td>£22,750</td>
              <td>£18,000</td>
            </tr>
            <tr>
              <td>£510,000</td>
              <td>£15,500</td>
              <td>£15,500</td>
              <td>£23,750</td>
              <td>£18,750</td>
            </tr>
          </tbody>
        </table>
        <p>
          Note the cliff at £500,000: a first-time buyer in England pays £10,000 at £500,000 but £15,500 at £510,000.
          Wales has no first-time buyer relief, but its tax only starts above £225,000. To qualify in England, every
          buyer must be a first-time buyer, and the home must be your main residence. Check your figure with the{" "}
          <Link href="/uk/property/stamp-duty-england">Stamp Duty calculator</Link>, the{" "}
          <Link href="/uk/property/lbtt-scotland">LBTT calculator</Link> or the{" "}
          <Link href="/uk/property/ltt-wales">LTT calculator</Link>.
        </p>

        <h2>3. Legal fees, survey and mortgage fee</h2>
        <ul>
          <li>
            <strong>Conveyancing:</strong> typically £1,200 to £2,000 including VAT and searches for a straightforward
            purchase. Leasehold flats cost more, as there is more paperwork.
          </li>
          <li>
            <strong>Survey:</strong>{" "}the lender&rsquo;s valuation is not a survey. A RICS Level 2 (HomeBuyer) report
            costs around £600; a Level 3 building survey, for older or unusual homes, around £1,000.
          </li>
          <li>
            <strong>Mortgage arrangement fee:</strong> often £999, though fee-free deals exist at a slightly higher
            rate. You can usually add the fee to the loan, but you then pay interest on it.
          </li>
          <li>
            <strong>Removals and setting up:</strong> from a few hundred pounds for a van to £1,000 or more for a full
            removal firm, plus anything you need to furnish the place.
          </li>
        </ul>

        <h2>A worked example: £350,000 in England</h2>
        <p>
          A first-time buyer in England buys a £350,000 home with a 10% deposit of £35,000. They pay £1,500 in legal
          fees, £600 for a HomeBuyer survey, a £999 mortgage fee and £1,000 for removals, and keep a 10% buffer for
          surprises:
        </p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deposit (10%)</td>
              <td>£35,000</td>
            </tr>
            <tr>
              <td>Stamp Duty (first-time buyer relief)</td>
              <td>£2,500</td>
            </tr>
            <tr>
              <td>Legal fees</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>HomeBuyer survey</td>
              <td>£600</td>
            </tr>
            <tr>
              <td>Mortgage fee</td>
              <td>£999</td>
            </tr>
            <tr>
              <td>Removals</td>
              <td>£1,000</td>
            </tr>
            <tr>
              <td>10% contingency on the costs</td>
              <td>£659.90</td>
            </tr>
            <tr>
              <td>
                <strong>Total cash needed</strong>
              </td>
              <td>
                <strong>£42,258.90</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          On top of the deposit, the costs come to about £7,259. Without first-time buyer relief, the same purchase
          would need £47,758.90, because Stamp Duty would be £7,500 instead of £2,500.
        </p>

        <h2>4. The monthly payment</h2>
        <p>
          The mortgage in our example is £315,000. At an interest rate of 4.5%, the monthly repayment depends heavily on
          the term:
        </p>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Monthly payment</th>
              <th>Total paid over the term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25 years</td>
              <td>£1,750.87</td>
              <td>£525,262</td>
            </tr>
            <tr>
              <td>30 years</td>
              <td>£1,596.06</td>
              <td>£574,581</td>
            </tr>
            <tr>
              <td>35 years</td>
              <td>£1,490.76</td>
              <td>£626,119</td>
            </tr>
          </tbody>
        </table>
        <p>
          Stretching from 25 to 35 years saves about £260 a month but adds about £100,900 of interest if the rate stayed
          the same throughout. A rate of 5% instead of 4.5% on the 25-year mortgage would push the payment up to
          £1,841.46. Rates change, so try your own figures in the{" "}
          <Link href="/uk/property/mortgage-repayment">mortgage repayment calculator</Link>, and use the{" "}
          <Link href="/uk/property/mortgage-overpayment">overpayment calculator</Link> to see how regular overpayments
          shorten a long term.
        </p>

        <h2>5. How much can you borrow?</h2>
        <p>
          Most lenders cap borrowing at about 4 to 4.5 times household income, and some go to 5 or 5.5 times for
          higher earners or certain professions. They also stress-test whether you could afford the payments if rates
          rose, and take account of commitments such as car finance, childcare and student loan repayments. The{" "}
          <Link href="/uk/property/mortgage-affordability">mortgage affordability calculator</Link> gives a realistic range.
        </p>

        <h2>Other routes to a first home</h2>
        <ul>
          <li>
            <strong>Shared ownership:</strong> buy a share (often 25% to 75%) and pay rent on the rest. The deposit is
            smaller, but you pay rent, service charges and a mortgage. The{" "}
            <Link href="/uk/property/shared-ownership">shared ownership calculator</Link> adds it all up.
          </li>
          <li>
            <strong>Buying with someone else:</strong> joint incomes raise what you can borrow. For first-time buyer
            relief in England, every buyer must be a first-time buyer.
          </li>
          <li>
            <strong>Keep renting for now:</strong>{" "}buying isn&rsquo;t always cheaper. The{" "}
            <Link href="/uk/property/rent-vs-buy">rent vs buy calculator</Link> compares the two over time.
          </li>
        </ul>

        <h2>Ongoing costs to budget for</h2>
        <p>
          Once you own the home, budget for buildings insurance (often required by the lender), council tax, energy
          and water, maintenance (a common rule of thumb is 1% of the property&rsquo;s value a year), and, for
          leasehold flats, ground rent and service charges. The{" "}
          <Link href="/uk/property/council-tax-bands">council tax calculator</Link> estimates the bill by band, and if you
          live alone the{" "}
          <Link href="/uk/property/single-person-discount">single person discount</Link> takes 25% off it.
        </p>

        <h2>The bottom line</h2>
        <p>
          For a typical first home, plan for the deposit plus roughly £5,000 to £10,000 of costs, depending on the price
          and where you buy. First-time buyer relief makes a large difference in England up to £500,000, and the
          mortgage term changes the monthly payment far more than most people expect. These figures are estimates for
          2026/27 and general guidance, not mortgage or financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "no-tax-on-overtime-and-tips-2026",
    title: "No tax on overtime and tips in 2026: what the new deductions are really worth",
    seoTitle: "No Tax on Overtime and Tips: 2026 Real Savings",
    description:
      "The 2026 overtime and tips deductions explained with worked examples: who qualifies, the $12,500 and $25,000 caps, the income phase-out, and the taxes you still pay.",
    date: "2026-10-08",
    dateLabel: "8 October 2026",
    readingTime: "11 min read",
    category: "US Taxes",
    body: (
      <>
        <p>
          &ldquo;No tax on overtime&rdquo; and &ldquo;no tax on tips&rdquo; were two of the most talked-about promises
          of the last few years, and the One Big Beautiful Bill Act, signed on July 4, 2025, turned both into law. But
          the law does not quite do what the slogans say. Overtime and tips are not tax-free. Instead, there are two
          new federal deductions, each with a cap, an income phase-out and a list of rules about what counts. For many
          hourly workers and tipped staff they are worth hundreds or a few thousand dollars a year. For others they are
          worth nothing at all.
        </p>
        <p>
          This guide explains how both deductions work for the 2026 tax year, the return you file in early 2027, with
          worked examples for a warehouse worker, a married pair of nurses, a restaurant server, a bartender and higher
          earners caught by the phase-out. Every dollar figure comes from the same 2026 federal tax engine as our{" "}
          <Link href="/us/taxes/federal-income-tax">federal income tax calculator</Link>, using the 2026 brackets and
          standard deduction. The examples assume the standard deduction and no other income unless they say otherwise.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Overtime:</strong>{" "}you can deduct the extra &ldquo;half&rdquo; of time-and-a-half pay that
            federal law requires, up to $12,500 a year, or $25,000 on a joint return.
          </li>
          <li>
            <strong>Tips:</strong>{" "}you can deduct qualified tips, up to $25,000 a year per return, if you work in a job
            where tipping was customary before 2025.
          </li>
          <li>
            <strong>Both</strong>{" "}shrink by $100 for every $1,000 of modified adjusted gross income above $150,000
            ($300,000 for married couples filing jointly).
          </li>
          <li>
            <strong>Both</strong>{" "}apply whether or not you itemize, but neither cuts Social Security, Medicare or (in
            most states) state income tax.
          </li>
          <li>
            <strong>Both</strong>{" "}run for the 2025 to 2028 tax years only, and neither is available if you are married
            and file separately.
          </li>
        </ul>

        <h2>Why &ldquo;no tax&rdquo; is not quite right</h2>
        <p>
          A deduction lowers your taxable income. It does not remove tax dollar for dollar. If you are in the 12% bracket, every $1,000 of deduction saves $120 of federal income tax. In the 22%
          bracket the same $1,000 saves $220. So the value of the overtime and tips deductions depends on your bracket,
          and if your income is already low enough that you owe no federal income tax, the deductions save nothing,
          because there is no tax left to cut.
        </p>
        <p>
          The second reason the slogans overstate it is payroll tax. Every dollar of overtime and tips is still subject
          to Social Security tax (6.2%) and Medicare tax (1.45%), a combined 7.65% for most employees. Those taxes come
          out of every paycheck whatever the new deductions say. For many lower-paid workers, payroll tax is actually a
          bigger bill than federal income tax, so the headline promise touches only part of what they pay.
        </p>
        <p>
          The third reason is state tax. The new deductions sit in the federal calculation after adjusted gross income
          (AGI). Most states start their own income tax from federal AGI or from wages, so unless your state passes its
          own matching rule, your overtime and tips are still taxed by the state. Nine states have no tax on wages at
          all, so there it makes no difference.
        </p>

        <h2>How the overtime deduction works</h2>
        <h3>Only the premium counts</h3>
        <p>
          The deduction covers &ldquo;qualified overtime compensation&rdquo;: the part of your overtime pay that is
          above your regular rate and is required by the Fair Labor Standards Act (FLSA). Under the FLSA, most hourly
          employees must get at least one and a half times their regular rate for hours over 40 in a workweek. If you
          earn $22 an hour, an overtime hour pays $33. Only the extra $11, the &ldquo;half&rdquo; in time-and-a-half, is
          qualified overtime. The first $22 is ordinary pay, taxed as usual.
        </p>
        <p>
          That one detail cuts the value of the deduction to about a third of what many people expect. Someone who earns
          $9,900 of overtime pay in a year at time-and-a-half can deduct $3,300, not $9,900.
        </p>
        <h3>Federal overtime only</h3>
        <p>
          Because the definition is tied to the FLSA, overtime that is paid only because of state law or a contract
          generally does not qualify. Examples include daily overtime after eight hours in a day (required in some
          states, but not by the FLSA), double time, and overtime paid to salaried staff who are exempt from the FLSA
          overtime rules. If you are paid double time for hours over 40, only the premium that the FLSA requires (half
          your regular rate) counts, not the full extra amount. Our{" "}
          <Link href="/us/taxes/overtime-calculator">overtime calculator</Link> splits your overtime pay into the regular
          part and the premium, so you can see the deductible amount.
        </p>
        <h3>The cap and the phase-out</h3>
        <p>
          The deduction is capped at $12,500 a year for single filers and heads of household, and $25,000 for married
          couples filing jointly. To reach the single cap you would need $25,000 of overtime premium, which means
          $75,000 of overtime pay at time-and-a-half. Very few people get near it, so for most workers the cap is not
          the limit that matters. The phase-out may be.
        </p>

        <h2>How the tips deduction works</h2>
        <p>
          The tips deduction lets you deduct up to $25,000 of &ldquo;qualified tips&rdquo; a year. The cap is per
          return, not per person, so a married couple who both earn tips still share one $25,000 cap. To be qualified,
          tips must meet several conditions:
        </p>
        <ul>
          <li>
            <strong>A tipped occupation:</strong>{" "}the job must be one that customarily and regularly received tips on
            or before December 31, 2024. The Treasury published a list of qualifying occupations, which covers jobs such
            as servers, bartenders, hairstylists, delivery drivers, valets, hotel staff and many others.
          </li>
          <li>
            <strong>Voluntary:</strong>{" "}the customer must choose whether to tip and how much. Automatic service
            charges added to a bill, such as an 18% charge for large groups, are not tips, even if the employer passes
            them on to staff.
          </li>
          <li>
            <strong>Cash or card:</strong>{" "}tips paid in cash, by card or through a tip-sharing arrangement all count,
            as long as they are reported.
          </li>
          <li>
            <strong>Reported:</strong>{" "}tips must appear on your Form W-2 or, for self-employed workers, on the forms
            and records used for your return. Tips that were never reported to your employer cannot be deducted.
          </li>
        </ul>
        <p>
          Self-employed people in tipped occupations can claim the deduction too, but the deduction cannot exceed their
          net profit from that work, and some professional service businesses are excluded.
        </p>

        <h2>Who cannot claim either deduction</h2>
        <ul>
          <li>Married people who file separate returns.</li>
          <li>Anyone without a Social Security number valid for work (the number must be on the return).</li>
          <li>Salaried staff who are exempt from FLSA overtime, for the overtime deduction.</li>
          <li>Workers in jobs not on the tipped occupation list, for the tips deduction.</li>
          <li>High earners whose income has fully phased the deduction out (see below).</li>
        </ul>

        <h2>Example 1: a warehouse worker on $22 an hour</h2>
        <p>
          Maria is single and earns $22 an hour. She works 40 hours every week of the year, which is $45,760, plus six
          hours of overtime a week for 50 weeks at $33 an hour, another $9,900. Her total wages are $55,660.
        </p>
        <table>
          <thead>
            <tr>
              <th>Maria, single, 2026</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Regular pay</td><td>$45,760</td></tr>
            <tr><td>Overtime pay</td><td>$9,900</td></tr>
            <tr><td>Qualified overtime premium (the &ldquo;half&rdquo;)</td><td>$3,300</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$4,499.20</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$4,103.20</td></tr>
            <tr><td>Saving</td><td>$396</td></tr>
            <tr><td>Social Security and Medicare still due on the overtime pay</td><td>$757.35</td></tr>
          </tbody>
        </table>
        <p>
          Maria saves $396 a year, which is 12% of her $3,300 premium because her top dollar of taxable income sits in
          the 12% bracket. Notice that the payroll tax on her overtime pay, $757.35, is almost twice the income tax she
          saves. The deduction helps, but her overtime is a long way from tax-free.
        </p>

        <h2>Example 2: a married couple who are both nurses</h2>
        <p>
          A married couple filing jointly earn $140,000 between them, including overtime with a qualified premium of
          $9,000. They have two children, so they also get the child tax credit of $2,200 a child.
        </p>
        <table>
          <thead>
            <tr>
              <th>Married filing jointly, two children</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages</td><td>$140,000</td></tr>
            <tr><td>Overtime deduction</td><td>$9,000</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$8,740</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$6,960</td></tr>
            <tr><td>Saving</td><td>$1,780</td></tr>
          </tbody>
        </table>
        <p>
          The saving is $1,780 rather than a flat 22% of $9,000 ($1,980). Without the deduction, $7,000 of their taxable
          income sits in the 22% bracket, which starts at $100,800 for joint filers in 2026. The deduction removes that
          $7,000 at 22% and another $2,000 at 12%. When a deduction straddles a bracket line, the saving is a blend of
          the two rates. The <Link href="/us/taxes/tax-bracket-calculator">tax bracket calculator</Link> shows exactly
          where your income sits.
        </p>

        <h2>Example 3: a restaurant server</h2>
        <p>
          Jordan is single and works as a server. Jordan&rsquo;s wages from the restaurant come to $28,000 and reported
          tips add $18,000, so W-2 income is $46,000.
        </p>
        <table>
          <thead>
            <tr>
              <th>Jordan, single</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages including tips</td><td>$46,000</td></tr>
            <tr><td>Tips deduction</td><td>$18,000</td></tr>
            <tr><td>Taxable income after the standard deduction and tips</td><td>$11,900</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$3,340</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$1,190</td></tr>
            <tr><td>Saving</td><td>$2,150</td></tr>
          </tbody>
        </table>
        <p>
          The tips deduction is far more valuable than the overtime deduction for the same income, because the whole tip
          counts, not just a premium. Jordan&rsquo;s federal income tax falls by almost two thirds. Payroll tax of 7.65%
          on all $46,000 still applies, $3,519 in total, which is now nearly three times Jordan&rsquo;s income tax.
        </p>

        <h2>Example 4: a bartender who hits the cap</h2>
        <p>
          A single bartender earns $30,000 in wages and $40,000 in tips, $70,000 in all. Only $25,000 of the tips can be
          deducted.
        </p>
        <table>
          <thead>
            <tr>
              <th>Bartender, single</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages including tips</td><td>$70,000</td></tr>
            <tr><td>Tips deduction (capped)</td><td>$25,000</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$6,570</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$3,220</td></tr>
            <tr><td>Saving</td><td>$3,350</td></tr>
          </tbody>
        </table>
        <p>
          The deduction takes this bartender from the 22% bracket down into the 12% bracket, so the first part of the
          deduction saves 22 cents on the dollar and the rest saves 12 cents. The remaining $15,000 of tips is taxed as
          normal.
        </p>

        <h2>Example 5: tips and overtime together</h2>
        <p>
          You can claim both deductions in the same year if you qualify for both, for example a hotel worker who earns
          tips and also works overtime. A single worker with $70,000 of wages, including $10,000 of qualified tips and an
          overtime premium of $4,000, pays $6,570 of federal income tax without the deductions and $4,540 with them, a
          saving of $2,030. Each deduction has its own cap, so claiming one does not use up the other.
        </p>

        <h2>Example 6: when the deduction saves nothing, or adds to a refund</h2>
        <p>
          A single part-time server with $24,000 of wages, including $8,000 of tips, would owe $790 of federal income tax
          without the deduction. With it, taxable income falls to zero, so the saving is the full $790. A bigger tips
          figure would not save any more: once taxable income reaches zero, there is nothing left to deduct from.
        </p>
        <p>
          The interaction with credits can be surprising. A head of household server with one child, wages of $38,000
          including $14,000 of tips, already owes no federal income tax after the child tax credit. Without the tips
          deduction the return shows a refund of $815 from the refundable part of the credit. With it, the refund rises to
          $1,700, the full refundable amount, because the deduction leaves less income tax for the credit to cancel and
          more of the credit is paid out in cash. That is $885 better off.
        </p>
        <p>
          At the other end, a worker whose income is entirely covered by the standard deduction, $16,100 for a single
          filer in 2026, owes no income tax and gains nothing from either deduction.
        </p>

        <h2>The phase-out for higher earners</h2>
        <p>
          Both deductions shrink by $100 for each $1,000, or part of $1,000, of modified adjusted gross income above
          $150,000 for single filers and heads of household, or $300,000 for joint filers. For most people, modified AGI
          is simply AGI. Because the cut is the same $100 per $1,000 for both deductions, the bigger tips cap lasts
          longer.
        </p>
        <table>
          <thead>
            <tr>
              <th>Modified AGI</th>
              <th>Maximum overtime deduction</th>
              <th>Maximum tips deduction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single, $150,000 or less</td><td>$12,500</td><td>$25,000</td></tr>
            <tr><td>Single, $160,000</td><td>$11,500</td><td>$24,000</td></tr>
            <tr><td>Single, $175,000</td><td>$10,000</td><td>$22,500</td></tr>
            <tr><td>Single, $200,000</td><td>$7,500</td><td>$20,000</td></tr>
            <tr><td>Single, $275,000</td><td>$0</td><td>$12,500</td></tr>
            <tr><td>Joint, $300,000 or less</td><td>$25,000</td><td>$25,000</td></tr>
            <tr><td>Joint, $350,000</td><td>$20,000</td><td>$20,000</td></tr>
            <tr><td>Joint, $425,000</td><td>$12,500</td><td>$12,500</td></tr>
            <tr><td>Joint, $550,000</td><td>$0</td><td>$0</td></tr>
          </tbody>
        </table>
        <p>
          Even $1 over the line costs $100 of deduction: a single filer with modified AGI of $150,001 can deduct up to
          $12,400 of overtime, not $12,500. In practice the phase-out only bites when your overtime premium is larger
          than the reduced cap.
        </p>
        <p>
          Two examples. A single filer earning $170,000 with $12,500 of overtime premium can deduct only $10,500,
          saving $2,520 at the 24% rate. A married couple earning $320,000 with a $20,000 premium face a reduced cap of
          $23,000, which is still above their premium, so they deduct the full $20,000 and save $4,800.
        </p>

        <h2>Lower-income examples at a glance</h2>
        <p>
          The deduction&rsquo;s value grows with your bracket, but only up to the phase-out. A married couple filing
          jointly on $75,000, with one spouse earning a $6,000 overtime premium, save $720, because all of it sits in
          the 12% bracket. Compare that with the bartender above, who saved $3,350 on $70,000 because the tips deduction
          was larger and reached into the 22% bracket.
        </p>
        <table>
          <thead>
            <tr>
              <th>Example (2026)</th>
              <th>Deduction</th>
              <th>Federal income tax saved</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single, $55,660 with $3,300 overtime premium</td><td>$3,300</td><td>$396</td></tr>
            <tr><td>Joint, $75,000 with $6,000 overtime premium</td><td>$6,000</td><td>$720</td></tr>
            <tr><td>Joint, $140,000 with $9,000 premium, two children</td><td>$9,000</td><td>$1,780</td></tr>
            <tr><td>Single, $24,000 with $8,000 tips</td><td>$8,000</td><td>$790</td></tr>
            <tr><td>Single, $46,000 with $18,000 tips</td><td>$18,000</td><td>$2,150</td></tr>
            <tr><td>Single, $70,000 with $40,000 tips</td><td>$25,000 (capped)</td><td>$3,350</td></tr>
            <tr><td>Single, $170,000 with $12,500 premium</td><td>$10,500 (phased)</td><td>$2,520</td></tr>
            <tr><td>Married filing separately, any amount</td><td>$0</td><td>$0</td></tr>
          </tbody>
        </table>

        <h2>What it does not change</h2>
        <h3>Social Security and Medicare</h3>
        <p>
          Payroll taxes are worked out on wages, and the new deductions only reduce income tax. You still pay 6.2%
          Social Security tax up to the 2026 wage base of $184,500 and 1.45% Medicare tax on all of it, plus the
          additional 0.9% Medicare tax above $200,000 for a single filer. One upside of this: because tips and overtime
          still count as wages for Social Security, they still build your future Social Security benefit.
        </p>
        <h3>Your AGI</h3>
        <p>
          The deductions come after AGI. That matters because many other tax rules use AGI, including the phase-outs for
          Roth IRA contributions, the child tax credit and the student loan interest deduction, and income-based student
          loan repayment plans and health insurance subsidies. Claiming the overtime or tips deduction does not lower
          your AGI, so it will not, on its own, help you qualify for those.
        </p>
        <h3>State income tax</h3>
        <p>
          As explained above, most states tax overtime and tips as normal unless they have passed their own law. Check
          your state&rsquo;s rules for 2026 before counting on any state saving. Our{" "}
          <Link href="/us/taxes/paycheck-calculator">paycheck calculator</Link> includes state income tax for all 50 states
          and DC, so you can see what is left after every tax.
        </p>

        <h2>Will my paycheck change?</h2>
        <p>
          Not automatically. Employers withhold federal income tax from each paycheck using your Form W-4, and the
          standard withholding tables do not know how much of your pay is overtime premium or qualified tips. Without a
          change, the saving arrives as a bigger refund (or a smaller bill) when you file.
        </p>
        <p>
          If you would rather have the money through the year, you can give your employer a new Form W-4 and enter an
          estimate of your yearly deductions in Step 4(b), the line for deductions other than the standard deduction.
          Be cautious: if your overtime or tips fall short of the estimate, too little tax will be withheld and you may
          owe at filing time. A conservative estimate, perhaps two thirds of what you expect, is a sensible middle
          ground. The <Link href="/us/taxes/paycheck-calculator">paycheck calculator</Link> shows your take-home pay per
          paycheck so you can check the result.
        </p>

        <h2>How to claim on your return</h2>
        <p>
          You claim both deductions when you file Form 1040, using Schedule 1-A, which also covers the new senior
          deduction and the car loan interest deduction. The figures come from your records and your Form W-2:
        </p>
        <ul>
          <li>
            <strong>Overtime:</strong>{" "}your employer should report qualified overtime compensation on your W-2. If it
            reports total overtime pay instead, work out the premium yourself: at time-and-a-half it is one third of your
            overtime pay.
          </li>
          <li>
            <strong>Tips:</strong>{" "}your W-2 shows the tips you reported to your employer. Tips you did not report to your employer at the time can be added with
            Form 4137, but then you owe payroll tax on them too.
          </li>
          <li>
            <strong>Keep records:</strong>{" "}pay stubs showing overtime hours and rates, and a daily tip log, make it
            easy to back up the figures if the IRS asks.
          </li>
        </ul>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Deducting all overtime pay:</strong>{" "}only the premium is deductible. At time-and-a-half that is a
            third of the overtime pay.
          </li>
          <li>
            <strong>Counting service charges as tips:</strong>{" "}a mandatory charge on the bill is not a voluntary tip,
            even if you receive it.
          </li>
          <li>
            <strong>Filing separately:</strong>{" "}married couples who file separate returns lose both deductions. If one
            of you has large overtime or tips, compare a joint return.
          </li>
          <li>
            <strong>Assuming state tax falls too:</strong>{" "}in most states it does not.
          </li>
          <li>
            <strong>Forgetting the end date:</strong>{" "}the deductions are scheduled to end after the 2028 tax year. Do
            not make long-term plans, such as a mortgage, that depend on them lasting unless Congress extends them.
          </li>
        </ul>

        <h2>How it compares with other ways to cut your tax</h2>
        <p>
          The overtime and tips deductions are generous for the people they reach, but they sit alongside older tools
          that work for almost everyone with a job. A pre-tax 401(k) contribution lowers both your taxable income and
          your AGI, and many employers add a match. Putting $3,300 into a traditional 401(k) would save Maria in Example 1
          the same $396 of federal income tax as her overtime deduction, and she could do both. The{" "}
          <Link href="/us/savings/401k-calculator">401(k) calculator</Link> shows the long-term value. If you also do
          some self-employed work, such as delivery driving on your own account, the{" "}
          <Link href="/us/taxes/self-employment-tax">self-employment tax calculator</Link> shows the 15.3% payroll tax that
          applies to that profit, which the new deductions do not touch.
        </p>

        <h2>Key numbers for 2026</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026 figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Overtime deduction cap</td><td>$12,500 ($25,000 joint)</td></tr>
            <tr><td>Tips deduction cap</td><td>$25,000 per return</td></tr>
            <tr><td>Phase-out starts (modified AGI)</td><td>$150,000 ($300,000 joint)</td></tr>
            <tr><td>Phase-out rate</td><td>$100 per $1,000 above the start</td></tr>
            <tr><td>Standard deduction</td><td>$16,100 single, $32,200 joint, $24,150 head of household</td></tr>
            <tr><td>Social Security wage base</td><td>$184,500</td></tr>
            <tr><td>Employee payroll tax</td><td>7.65% (6.2% + 1.45%)</td></tr>
            <tr><td>Years covered</td><td>2025 to 2028</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          For a tipped worker in the 12% or 22% bracket, the tips deduction is one of the most valuable tax changes in
          years, often worth $2,000 to $3,500. The overtime deduction is smaller than its name suggests, because only the
          premium counts: a few hundred dollars for a typical hourly worker, more for couples with heavy overtime in the
          22% bracket. Neither touches payroll tax or, in most states, state tax, and neither helps if you already owe
          no federal income tax. To see your own figures, try the{" "}
          <Link href="/us/taxes/overtime-calculator">overtime calculator</Link> and the{" "}
          <Link href="/us/taxes/federal-income-tax">federal income tax calculator</Link>. These figures are estimates for
          the 2026 tax year and general information, not tax advice.
        </p>
      </>
    ),
  },
  {
    slug: "self-employed-expenses-what-you-can-claim",
    title: "Self-employed expenses in 2026/27: what you can claim and what it saves",
    seoTitle: "Self-Employed Expenses 2026/27: What You Can Claim",
    description:
      "What sole traders can claim as allowable expenses in 2026/27, the flat rates for mileage and working from home, the £1,000 trading allowance, and worked tax savings.",
    date: "2026-10-08",
    dateLabel: "8 October 2026",
    readingTime: "11 min read",
    category: "Business",
    body: (
      <>
        <p>
          If you work for yourself, every allowable expense you claim comes off your profit before Income Tax and
          Class 4 National Insurance are worked out. A £1,000 cost you forget to claim can mean £260 to £620 more tax,
          depending on your profit. Yet many sole traders under-claim, either because they are unsure what counts or
          because they never write the small costs down.
        </p>
        <p>
          This guide sets out what HMRC lets you claim as a sole trader in the 2026/27 tax year (6 April 2026 to 5 April
          2027), the flat rates that save you working out the exact cost of using your car or your home, when the
          £1,000 trading allowance beats your real expenses, and what all of it is worth in tax. Every figure comes from
          the same engine as our{" "}
          <Link href="/uk/business/allowable-expenses">self-employed expenses calculator</Link> and{" "}
          <Link href="/uk/business/sole-trader-tax">sole trader tax calculator</Link>. Limited companies follow different
          rules and are not covered here.
        </p>

        <h2>The one rule behind every expense</h2>
        <p>
          HMRC&rsquo;s test is that a cost must be incurred &ldquo;wholly and exclusively&rdquo; for the purposes of
          your business. In plain words: you spent the money because of the business, not for yourself. Where a cost is
          partly business and partly personal, such as a phone you also use for family calls, you can claim the business
          share if you can separate it sensibly, for example by the proportion of calls or data used for work.
        </p>
        <p>
          Three things follow from that rule. You cannot claim personal costs, even if they help you work (lunch on an
          ordinary working day, for instance). You cannot claim your own wages or the money you take out of the business
          (drawings), because profit is what you are taxed on. And you cannot claim your own Income Tax or National
          Insurance as an expense.
        </p>

        <h2>What you can claim: the main categories</h2>
        <p>
          The Self Assessment self-employment pages group expenses into categories. If your turnover is below the VAT
          threshold of £90,000, you can use the short pages and enter a single total for expenses, but it still helps to
          keep your records in these groups:
        </p>
        <ul>
          <li>
            <strong>Office, property and equipment:</strong>{" "}stationery, printing, postage, software and subscriptions, phone and broadband (business share), rent and business rates for business premises, small equipment.
          </li>
          <li>
            <strong>Car, van and travel:</strong>{" "}fuel, insurance, repairs and road tax for a business vehicle (or the mileage rates instead), train and bus fares, parking, hotel and meals on overnight business trips.
          </li>
          <li>
            <strong>Clothing:</strong>{" "}uniforms, protective clothing and costumes for performers; not everyday clothes, even if bought for work.
          </li>
          <li>
            <strong>Staff:</strong>{" "}wages, employer National Insurance, employer pension contributions, subcontractor costs, agency fees.
          </li>
          <li>
            <strong>Stock and materials:</strong>{" "}goods for resale, raw materials, direct costs of producing what you sell.
          </li>
          <li>
            <strong>Financial costs:</strong>{" "}business insurance, bank charges, card fees, interest on business loans (up to £500 under the cash basis).
          </li>
          <li>
            <strong>Professional fees:</strong>{" "}accountant, bookkeeper, solicitor and surveyor fees for the business.
          </li>
          <li>
            <strong>Marketing and subscriptions:</strong>{" "}advertising, a website, directory listings, trade or professional body subscriptions.
          </li>
          <li>
            <strong>Training:</strong>{" "}courses that maintain or update skills you use in your current trade.
          </li>
        </ul>

        <h2>What you cannot claim</h2>
        <ul>
          <li>
            <strong>Commuting:</strong>{" "}travel between home and a permanent workplace, such as a shop you rent. Travel
            to clients, temporary sites and suppliers is allowed.
          </li>
          <li>
            <strong>Entertaining:</strong>{" "}taking clients or potential clients for meals or drinks. Staff events can be
            allowable.
          </li>
          <li>
            <strong>Everyday clothing:</strong>{" "}a suit for meetings is not allowable, even if you only wear it for work.
          </li>
          <li>
            <strong>Fines and penalties:</strong>{" "}parking and speeding fines, and HMRC penalties.
          </li>
          <li>
            <strong>Training for a new trade:</strong>{" "}a course to start a different kind of business is not allowable
            against your current one.
          </li>
          <li>
            <strong>The personal share:</strong>{" "}of anything used partly for private life.
          </li>
        </ul>

        <h2>What claiming is worth: your marginal rate</h2>
        <p>
          An expense saves tax at your marginal rate: the Income Tax and Class 4 National Insurance on the last slice of
          profit it removes. In 2026/27 Class 4 is 6% on profit between £12,570 and £50,270 and 2% above that. The table
          shows the tax and National Insurance on the next £100 of profit for a sole trader with no other income.
        </p>
        <table>
          <thead>
            <tr>
              <th>Profit</th>
              <th>England, Wales, NI</th>
              <th>Scotland</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£10,000</td><td>0%</td><td>0%</td></tr>
            <tr><td>£20,000</td><td>26%</td><td>26%</td></tr>
            <tr><td>£30,000</td><td>26%</td><td>27%</td></tr>
            <tr><td>£45,000</td><td>26%</td><td>48%</td></tr>
            <tr><td>£60,000</td><td>42%</td><td>44%</td></tr>
            <tr><td>£90,000</td><td>42%</td><td>47%</td></tr>
            <tr><td>£110,000</td><td>62%</td><td>69.5%</td></tr>
            <tr><td>£130,000</td><td>47%</td><td>50%</td></tr>
          </tbody>
        </table>
        <p>
          So a £1,000 expense you remember to claim saves £260 at a profit of £30,000 and £420 at £60,000. Between
          £100,000 and £125,140 the Personal Allowance is withdrawn, which pushes the marginal rate to 62% in England,
          Wales and Northern Ireland. If your profit is below the £12,570 Personal Allowance and you have no other
          income, expenses save no tax at all that year, though they still matter if your profit later turns into a
          loss you can carry forward.
        </p>

        <h2>Worked example: a freelance designer on £40,000</h2>
        <p>
          Sam is a self-employed graphic designer in England with turnover of £40,000 and no other income. Over the year
          Sam spends £1,500 on software, a laptop accessory, stationery and the business share of a phone; £600 on a
          website and advertising; £900 on insurance, an accountant and bank fees; and £400 on a course updating design
          skills. Sam drives 2,000 business miles to clients and works from home 51 to 100 hours a month all year.
        </p>
        <table>
          <thead>
            <tr>
              <th>Sam&rsquo;s expenses, 2026/27</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Itemised costs</td><td>£3,400</td></tr>
            <tr><td>Mileage, 2,000 miles at 45p</td><td>£900</td></tr>
            <tr><td>Working from home flat rate, £18 a month for 12 months</td><td>£216</td></tr>
            <tr><td>Total expenses</td><td>£4,516</td></tr>
            <tr><td>Taxable profit</td><td>£35,484</td></tr>
            <tr><td>Income Tax and Class 4 NI with no expenses</td><td>£7,131.80</td></tr>
            <tr><td>Income Tax and Class 4 NI with the expenses</td><td>£5,957.64</td></tr>
            <tr><td>Saved by claiming</td><td>£1,174.16</td></tr>
          </tbody>
        </table>
        <p>
          The same £4,516 of expenses saves £1,896.72 if Sam&rsquo;s turnover is £70,000, because the profit sits in
          the higher-rate band, and £1,219.32 for a designer in Scotland on £40,000. If Sam had claimed only the £1,000
          trading allowance instead, the bill would be £6,871.80, £914.16 more than claiming real expenses.
        </p>

        <h2>Simplified expenses: the flat rates</h2>
        <p>
          Simplified expenses let you use flat rates for a few costs that are awkward to split between business and
          personal use. They are optional; you can always work out the actual cost instead if it is higher and you have
          the records.
        </p>
        <h3>Vehicles: 45p and 25p a mile</h3>
        <p>
          For a car or van, you can claim 45p a mile for the first 10,000 business miles in the year and 25p a mile after
          that. Motorcycles are 24p a mile. The rate covers fuel, insurance, servicing, road tax and depreciation, so you
          cannot also claim those. Parking, tolls and congestion charges on business journeys can be claimed on top.
        </p>
        <p>
          A courier or a tradesperson who drives 12,000 business miles can claim £5,000 (10,000 at 45p plus 2,000 at
          25p). On turnover of £50,000, that cuts Income Tax and National Insurance by £1,300. Once you choose the
          mileage rate for a vehicle, you must keep using it for as long as you use that vehicle in the business. Our{" "}
          <Link href="/uk/business/business-mileage">business mileage calculator</Link> works out the claim.
        </p>
        <h3>Working from home</h3>
        <p>
          Instead of working out a share of your heating, lighting and electricity, you can claim a flat monthly amount
          based on the hours you work at home on business:
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours of business use at home each month</th>
              <th>Flat rate a month</th>
              <th>Over a full year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>25 to 50</td><td>£10</td><td>£120</td></tr>
            <tr><td>51 to 100</td><td>£18</td><td>£216</td></tr>
            <tr><td>101 or more</td><td>£26</td><td>£312</td></tr>
          </tbody>
        </table>
        <p>
          The flat rate does not cover phone and broadband, which you claim separately for the business share. The
          amounts are modest: £312 a year saves £81.12 of tax and National Insurance at a profit of about £30,000. If you
          use a room mainly for work and your bills are high, working out the actual business share (by rooms and hours)
          can give a bigger figure, but you will need to show how you calculated it.
        </p>
        <h3>Living at your business premises</h3>
        <p>
          If you run a guest house, bed and breakfast or care home and live there too, you can deduct a flat amount from
          your total premises costs for private use: £350 a month for one person, £500 for two and £650 for three or
          more.
        </p>

        <h2>The £1,000 trading allowance</h2>
        <p>
          The trading allowance lets you deduct a flat £1,000 from your self-employed income instead of your actual
          expenses. If your total trading income (before expenses) is £1,000 or less, you do not need to tell HMRC about
          it at all. Above that, you choose each year between the allowance and your real expenses; you cannot claim
          both.
        </p>
        <p>
          The choice is simple: use the allowance when your real expenses are below £1,000. Take someone with a £30,000
          salary and a side business with turnover of £3,000. With no deduction, the side income would cost £600 in
          Income Tax. The table shows the result with different levels of real expenses:
        </p>
        <table>
          <thead>
            <tr>
              <th>Real expenses</th>
              <th>Tax claiming real expenses</th>
              <th>Tax with the trading allowance</th>
              <th>Better choice</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£300</td><td>£540</td><td>£400</td><td>Trading allowance</td></tr>
            <tr><td>£600</td><td>£480</td><td>£400</td><td>Trading allowance</td></tr>
            <tr><td>£1,500</td><td>£300</td><td>£400</td><td>Real expenses</td></tr>
          </tbody>
        </table>
        <p>
          There is no Class 4 National Insurance here because the side profit is well below £12,570. The allowance also
          saves record-keeping, which is useful for small side incomes such as occasional craft sales or tutoring. One
          catch: if you make a loss, claiming real expenses lets you use it against other income or carry it forward,
          whereas the allowance cannot create a loss.
        </p>

        <h2>Equipment, computers and vans</h2>
        <p>
          Since April 2024 the cash basis has been the default for sole traders. Under the cash basis, most equipment
          you buy for the business, such as a laptop, tools or a printer, is simply an expense in the year you pay for
          it. Under traditional accounting you claim capital allowances instead, and the Annual Investment Allowance of
          £1 million means most small businesses can still deduct the full cost in the year of purchase.
        </p>
        <p>
          Cars are the exception. Under either basis, a car (not a van) is not an expense when you buy it: you either use
          the mileage rate or claim capital allowances on the car plus the business share of running costs. If you use
          equipment partly for personal reasons, claim only the business share, and if you later sell it, the sale price
          may need to be added to your income.
        </p>

        <h2>Big incomes: expenses and the 62% band</h2>
        <p>
          If your profit is between £100,000 and £125,140, each £1 of expenses gives back 50p of Personal Allowance as
          well as cutting tax on the £1 itself. A sole trader with turnover of £110,000 who claims £10,000 of genuine
          expenses brings profit down to £100,000 and saves £6,200 of Income Tax and National Insurance. Personal
          pension contributions have a similar effect on the Personal Allowance, even though they are not a business
          expense; the{" "}
          <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link> shows how they work for the
          self-employed.
        </p>

        <h2>Student loans: a hidden extra saving</h2>
        <p>
          If you are repaying a student loan, your repayments are worked out on your profit through Self Assessment, so
          expenses cut those too. A sole trader with a Plan 2 loan and turnover of £40,000 pays £8,087.15 in Income Tax,
          National Insurance and student loan repayments with no expenses. With £5,000 of expenses the total falls to
          £6,337.15, a saving of £1,750, of which £450 is the lower student loan repayment.
        </p>

        <h2>Records: what to keep and for how long</h2>
        <p>
          You do not send receipts to HMRC, but you must keep records that support the figures on your tax return, for
          at least five years after the 31 January filing deadline for that year. Useful habits:
        </p>
        <ul>
          <li>Keep receipts or invoices for every purchase, digital copies are fine.</li>
          <li>Use a separate bank account for the business, so business spending is easy to spot.</li>
          <li>Keep a mileage log with the date, destination, purpose and miles of each business journey.</li>
          <li>Note how you worked out any business share, for example of your phone or home costs.</li>
          <li>Record small cash purchases as you go; they add up over a year.</li>
        </ul>

        <h2>Making Tax Digital changes the routine</h2>
        <p>
          From 6 April 2026, sole traders and landlords whose qualifying income (turnover from self-employment and
          property together) was over £50,000 must keep digital records and send quarterly updates to HMRC through
          compatible software. The threshold falls to £30,000 from April 2027 and £20,000 from April 2028. Quarterly
          updates do not change what you can claim, but they do mean recording expenses through the year rather than in a
          rush in January, which tends to catch more of them. If you are getting close to the VAT threshold as well, the{" "}
          <Link href="/uk/business/vat-threshold">VAT threshold calculator</Link> tracks your rolling 12-month turnover.
        </p>

        <h2>Paying the tax: payments on account</h2>
        <p>
          Lower profit also means lower payments on account. If your Self Assessment bill is £1,000 or more and less
          than 80% of your tax was collected at source, HMRC asks for two advance payments towards next year&rsquo;s bill,
          each half of this year&rsquo;s. Claiming all your expenses reduces this year&rsquo;s bill and so both advance
          payments. The <Link href="/uk/business/payment-on-account">payments on account calculator</Link> shows the
          dates and amounts.
        </p>

        <h2>Ten commonly missed expenses</h2>
        <ol>
          <li>The business share of your mobile phone and broadband.</li>
          <li>Accountancy and bookkeeping software subscriptions.</li>
          <li>Professional body and trade association fees.</li>
          <li>Business insurance, including professional indemnity and public liability.</li>
          <li>Bank charges and card processing fees, including online payment platforms.</li>
          <li>Parking, tolls and congestion charges on business trips, on top of the mileage rate.</li>
          <li>Train and bus fares to clients and suppliers.</li>
          <li>Hotel stays and meals when travelling overnight for work.</li>
          <li>The working from home flat rate, even if you also have an office.</li>
          <li>Small tools and equipment under the cash basis.</li>
        </ol>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Claiming mileage and fuel together:</strong>{" "}the mileage rate already covers fuel and running
            costs.
          </li>
          <li>
            <strong>Claiming the trading allowance and expenses together:</strong>{" "}it is one or the other.
          </li>
          <li>
            <strong>Claiming the whole cost of something used privately:</strong>{" "}claim only the business share.
          </li>
          <li>
            <strong>Treating drawings as expenses:</strong>{" "}money you take out for yourself is not a cost of the
            business.
          </li>
          <li>
            <strong>Forgetting VAT:</strong>{" "}if you are VAT-registered under the standard scheme, claim expenses net
            of the VAT you reclaim. On the{" "}
            <Link href="/uk/business/flat-rate-vat">Flat Rate Scheme</Link> you usually cannot reclaim VAT on purchases,
            so the full cost is the expense.
          </li>
        </ul>

        <h2>Key numbers for 2026/27</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026/27 figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Trading allowance</td><td>£1,000</td></tr>
            <tr><td>Personal Allowance</td><td>£12,570 (withdrawn between £100,000 and £125,140)</td></tr>
            <tr><td>Class 4 National Insurance</td><td>6% from £12,570 to £50,270, 2% above</td></tr>
            <tr><td>Small Profits Threshold (free State Pension credit)</td><td>£7,105</td></tr>
            <tr><td>Mileage, cars and vans</td><td>45p for 10,000 miles, then 25p</td></tr>
            <tr><td>Mileage, motorcycles</td><td>24p</td></tr>
            <tr><td>Working from home</td><td>£10, £18 or £26 a month</td></tr>
            <tr><td>VAT registration threshold</td><td>£90,000</td></tr>
            <tr><td>Making Tax Digital threshold</td><td>£50,000 (£30,000 from April 2027)</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          Claiming every allowable expense is the simplest legal way for a sole trader to cut a tax bill. For most
          people the saving is 26p to 42p for each £1 claimed, rising to 62p for profits between £100,000 and £125,140.
          Use the flat rates for mileage and working from home when they are easier, choose the £1,000 trading allowance
          only when your real costs are lower, and keep records as you go. To check your own figures, try the{" "}
          <Link href="/uk/business/allowable-expenses">self-employed expenses calculator</Link> and the{" "}
          <Link href="/uk/business/sole-trader-tax">sole trader tax calculator</Link>. These figures are estimates for
          2026/27 and general guidance, not tax advice; an accountant can help with anything unusual.
        </p>
      </>
    ),
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
