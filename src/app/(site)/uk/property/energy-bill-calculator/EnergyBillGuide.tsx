import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Energy bills at the Ofgem price cap: the full guide. Pure server component. Figures from src/lib/energy/costs.ts. */

const TOC: TocItem[] = [
  { id: "cap", title: "What the price cap is" },
  { id: "rates", title: "Rates from 1 October 2026" },
  { id: "typical-bill", title: "The typical bill: £1,723" },
  { id: "sum", title: "How your bill is worked out" },
  { id: "typical-use", title: "Typical use: low, medium and high" },
  { id: "vat", title: "No VAT on electricity until April 2027" },
  { id: "change", title: "What changed since July" },
  { id: "electric-only", title: "Homes with no gas" },
  { id: "standing", title: "Standing charges" },
  { id: "payment", title: "How you pay changes the price" },
  { id: "regions", title: "Why your region matters" },
  { id: "economy-7", title: "Economy 7 meters" },
  { id: "fixed", title: "Fixed tariffs and your own rates" },
  { id: "direct-debit", title: "How Direct Debits are set" },
  { id: "seasons", title: "Winter and summer" },
  { id: "your-bill", title: "Reading your bill" },
  { id: "each-unit", title: "What each unit saved is worth" },
  { id: "next", title: "The next price cap" },
  { id: "help", title: "Help if you are struggling" },
  { id: "breakdown", title: "What makes up the cap" },
  { id: "quarter", title: "The cost of one quarter" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Ofgem: energy price cap unit rates and standing charges", href: "https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges" },
  { label: "Ofgem: energy price cap will rise by 4% from October 2026", href: "https://www.ofgem.gov.uk/press-release/energy-price-cap-will-rise-4-october-2026" },
  { label: "Ofgem: summary of changes to the price cap, 1 October to 31 December 2026", href: "https://www.ofgem.gov.uk/sites/default/files/2026-08/Summary-of-changes-to-energy-price-cap-1-October-to-31-December-2026.pdf" },
  { label: "Ofgem: review of typical domestic consumption values", href: "https://www.ofgem.gov.uk/consultation/review-typical-domestic-consumption-values" },
  { label: "Ofgem: energy price cap explained", href: "https://www.ofgem.gov.uk/information-consumers/energy-advice-households/energy-price-cap" },
];

export default function EnergyBillGuide() {
  return (
    <Guide
      kicker="The energy bill guide"
      title="Your gas and electricity bill at the price cap"
      intro={
        <>
          Most homes in Great Britain pay for gas and electricity at, or close to, the Ofgem price cap. This guide explains the cap from 1 October to 31
          December 2026, how a bill is worked out, what changed since the summer, and the things that make your own bill higher or lower.
        </>
      }
      meta={["October 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="cap" n={1} kicker="The basics" title="What the price cap is">
        <p>
          The energy price cap is set by Ofgem, the energy regulator for Great Britain. It limits the <strong>unit rate</strong> (the price of each kWh) and
          the <strong>standing charge</strong> (a fixed daily charge) that suppliers can charge on standard variable and default tariffs.
        </p>
        <p>
          It does not cap your total bill. The more energy you use, the more you pay. Ofgem updates the cap every three months, using the latest wholesale
          costs, network costs and other inputs.
        </p>
        <p>The cap covers England, Scotland and Wales. Northern Ireland has a separate energy market and is not covered.</p>
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="This quarter" title="Rates from 1 October 2026">
        <p>From 1 October to 31 December 2026, the average price cap rates for a home paying by Direct Debit are:</p>
        <DataTable
          caption="Price cap averages, Great Britain, Direct Debit"
          head={["", "Unit rate", "Standing charge"]}
          numeric={[1, 2]}
          rows={[
            ["Electricity (no VAT)", "26.32p per kWh", "54.83p a day"],
            ["Gas (5% VAT included)", "7.97p per kWh", "29.68p a day"],
          ]}
        />
        <p>
          These are averages across Great Britain. The calculator uses them by default, and you can enter the rates from your own bill under More options.
        </p>
      </GuideSection>

      <GuideSection id="typical-bill" n={3} kicker="Headline" title="The typical bill: £1,723">
        <p>
          Ofgem&rsquo;s headline figure is <strong>£1,723 a year</strong> for a typical home using gas and electricity and paying by Direct Debit, up from
          £1,663 from July to September 2026. That is a rise of about 4%, or about £5 a month.
        </p>
        <KeyStats
          items={[
            { value: "£1,723", label: "Typical yearly bill, October to December 2026" },
            { value: "£143.63", label: "A month" },
            { value: "£1,663", label: "July to September 2026" },
            { value: "4%", label: "Rise" },
          ]}
        />
        <p>
          The headline is not what anyone actually pays: it is the cap rates applied to a typical home&rsquo;s use. Your own bill depends on how much you use.
        </p>
      </GuideSection>

      <GuideSection id="sum" n={4} kicker="The method" title="How your bill is worked out">
        <p>Each fuel is worked out the same way: units used times the unit rate, plus the standing charge for each day. For a typical home:</p>
        <WorkedExample
          title="Typical home, a year, October to December 2026 rates"
          steps={[
            { label: "Electricity used", note: "2,500 kWh × 26.32p", value: "£658.00" },
            { label: "Electricity standing charge", note: "54.83p × 365 days", value: "£200.13" },
            { label: "Gas used", note: "9,500 kWh × 7.97p", value: "£757.15" },
            { label: "Gas standing charge", note: "29.68p × 365 days", value: "£108.33" },
          ]}
          total={{ label: "A year", value: "£1,723.61" }}
        />
        <p>
          That matches Ofgem&rsquo;s £1,723 (Ofgem rounds its rates for publication). Split over 12 months it is about £143.63 a month: £71.51 for electricity
          and £72.12 for gas.
        </p>
      </GuideSection>

      <GuideSection id="typical-use" n={5} kicker="Usage" title="Typical use: low, medium and high">
        <p>
          Ofgem publishes &ldquo;typical domestic consumption values&rdquo; for homes with low, medium and high use. It lowered them from 1 July 2026, because
          homes now use less energy than when they were last set in 2023: medium use fell from 2,700 to 2,500 kWh of electricity and from 11,500 to 9,500 kWh of gas.
        </p>
        <DataTable
          caption="Typical yearly use from July 2026, and the bill at the October to December 2026 cap"
          head={["Use", "Electricity", "Gas", "Bill a year", "A month"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["Low", "1,600 kWh", "6,000 kWh", "£1,207.78", "£100.65"],
            ["Medium", "2,500 kWh", "9,500 kWh", "£1,723.61", "£143.63"],
            ["High", "3,800 kWh", "14,000 kWh", "£2,424.42", "£202.04"],
          ]}
        />
        <p>
          A low-use home is often a flat or small house with one or two people. A high-use home is larger, has more people, or is someone at home all day.
          Pick low, medium or high in the calculator, or type in the figures from your bill.
        </p>
      </GuideSection>

      <GuideSection id="vat" n={6} kicker="Tax" title="No VAT on electricity until April 2027">
        <p>
          Household energy normally carries VAT at 5%. The government removed VAT from household electricity from <strong>1 October 2026 to 31 March 2027</strong>.
          It applies to all electricity bills, including fixed tariffs, and suppliers apply it automatically. Gas keeps its 5% VAT.
        </p>
        <p>
          For a typical home using 2,500 kWh, the electricity bill is £858.13 a year. With 5% VAT added, it would be about £901.04: a saving of about
          <strong> £42.91</strong>. Ofgem says that without the VAT cut, the October rise would have been about £45 higher.
        </p>
      </GuideSection>

      <GuideSection id="change" n={7} kicker="Since the summer" title="What changed since July">
        <p>From July to September 2026, the cap rates were 26.11p per kWh for electricity (with VAT) and 7.33p for gas, with standing charges of 57.19p and 29.04p a day.</p>
        <CompareCards
          columns={[
            { name: "July to September 2026", rows: [{ label: "Electricity", value: "£861.49" }, { label: "Gas", value: "£802.35" }, { label: "A year", value: "£1,663.84" }] },
            { name: "October to December 2026", rows: [{ label: "Electricity", value: "£858.13" }, { label: "Gas", value: "£865.48" }, { label: "A year", value: "£1,723.61" }] },
          ]}
        />
        <p>
          For a typical home, gas rose by about £63.14 a year and electricity fell by about £3.36. Ofgem says wholesale costs drove the rise, with gas prices
          pushed up by conflict and instability in the Middle East and by hot weather across Europe. The removal of VAT kept electricity broadly level.
        </p>
      </GuideSection>

      <GuideSection id="electric-only" n={8} kicker="No gas" title="Homes with no gas">
        <p>
          Homes with no gas supply saw almost no change. At 2,500 kWh a year, electricity costs £858.13, about £3.36 less than in the summer. Ofgem says homes
          without gas see a change of under 1%.
        </p>
        <p>
          Homes heated by electricity use far more than 2,500 kWh, so choose &ldquo;Electricity only&rdquo; in the calculator and enter your own yearly use. At
          3,800 kWh, the bill is £1,200.29 a year. To see where the units go, try our <a href="/uk/property/appliance-running-cost">appliance running cost calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="standing" n={9} kicker="Fixed costs" title="Standing charges">
        <p>
          The standing charge pays for the networks that bring energy to your home and some other fixed costs. You pay it every day, even if you use nothing.
        </p>
        <Bars
          items={[
            { label: "Electricity standing charge, a year", value: 200.13 },
            { label: "Gas standing charge, a year", value: 108.33 },
          ]}
          format={(n) => "£" + n.toFixed(2)}
        />
        <p>
          Together that is £308.46 a year, about 17.9% of a typical bill, down from £314.74 in the summer. Low users feel standing charges most, because they make
          up a bigger share of a small bill.
        </p>
      </GuideSection>

      <GuideSection id="payment" n={10} kicker="Payment" title="How you pay changes the price">
        <p>The cap is different for each payment method. Ofgem&rsquo;s typical yearly bills for October to December 2026 are:</p>
        <DataTable
          caption="Typical yearly bill by payment method, October to December 2026"
          head={["Payment method", "July to September", "October to December"]}
          numeric={[1, 2]}
          rows={[
            ["Direct Debit", "£1,663", "£1,723"],
            ["Pay on receipt of bill (standard credit)", "£1,796", "£1,861"],
            ["Prepayment meter", "£1,620", "£1,678"],
          ]}
        />
        <p>
          Paying when the bill arrives costs more because suppliers wait longer for the money and face more unpaid bills. Prepayment is the cheapest: Ofgem says
          about £45 a year less than Direct Debit. The calculator estimates other payment methods by scaling with these typical bills.
        </p>
      </GuideSection>

      <GuideSection id="regions" n={11} kicker="Where you live" title="Why your region matters">
        <p>
          There are 14 electricity regions in Great Britain, and the cap is set for each one. Network costs differ, so unit rates and standing charges vary from
          region to region.
        </p>
        <p>
          The calculator uses the Great Britain average, so your real bill may be a little higher or lower. For an exact figure, enter the rates from your
          bill or from Ofgem&rsquo;s regional table under More options.
        </p>
      </GuideSection>

      <GuideSection id="economy-7" n={12} kicker="Meters" title="Economy 7 meters">
        <p>
          Economy 7 meters record a cheaper night rate and a dearer day rate. Ofgem caps the average of the two, assuming 42% of use is at night, and uses a typical
          3,400 kWh a year. On that basis the typical Economy 7 electricity bill paying by Direct Debit is <strong>£1,046</strong> a year from October 2026, up
          about 1% from £1,039.
        </p>
        <p>
          Your supplier can split the cap between day and night rates as it chooses. If you have Economy 7, enter your average unit rate in the calculator, or
          work out your day and night use separately.
        </p>
      </GuideSection>

      <GuideSection id="fixed" n={13} kicker="Tariffs" title="Fixed tariffs and your own rates">
        <p>
          The cap only limits standard variable and default tariffs. A fixed tariff has its own rates for a set time, which can be above or below the cap. If you
          fixed, your bill will not change when the cap does until your deal ends.
        </p>
        <p>
          To use your own rates, enter them under More options. For example, at 24p for electricity and 6.5p for gas, with the cap standing charges, a typical home
          would pay £1,525.96 a year. Check any exit fees before switching.
        </p>
      </GuideSection>

      <GuideSection id="direct-debit" n={14} kicker="Payments" title="How Direct Debits are set">
        <p>
          Your supplier sets your Direct Debit to spread a year&rsquo;s cost evenly over 12 months. It bases it on your expected use and the current rates, and may
          adjust it to clear a debt or reduce a credit on your account.
        </p>
        <p>
          If you only know what you paid each month, choose &ldquo;Monthly payment&rdquo; in the calculator and enter what you paid from July to September. It works
          back to your likely use, then prices that use at the new cap. For example, £140 a month before October suggests about 2,530 kWh of electricity and 9,614 kWh
          of gas a year, which costs about <strong>£145.05 a month</strong> at the October cap.
        </p>
      </GuideSection>

      <GuideSection id="seasons" n={15} kicker="Usage" title="Winter and summer">
        <p>
          Most homes use far more gas in winter, when the heating is on. A fixed monthly Direct Debit builds up a credit in summer that is used up in winter. It is
          normal for your account to be in credit in autumn and to fall over the winter.
        </p>
        <p>
          The price cap changes every three months, so a yearly figure at one quarter&rsquo;s rates is a guide, not a forecast. The October to December rates
          apply to the heaviest months of the year only in part.
        </p>
      </GuideSection>

      <GuideSection id="your-bill" n={16} kicker="Your bill" title="Reading your bill">
        <ul>
          <li><strong>Estimated annual consumption:</strong>{" "}your supplier&rsquo;s estimate of your yearly use in kWh, for each fuel. Use it in the calculator.</li>
          <li><strong>Unit rate and standing charge:</strong> your own prices, which may differ from the average.</li>
          <li><strong>Tariff name and end date:</strong> whether you are on a capped variable tariff or a fixed deal.</li>
          <li><strong>Meter readings:</strong>{" "}&ldquo;E&rdquo; means estimated. Send real readings, or use a smart meter, so your bill is accurate.</li>
        </ul>
        <p>Gas meters measure volume; your bill converts it into kWh. Use the kWh figure.</p>
      </GuideSection>

      <GuideSection id="each-unit" n={17} kicker="Saving" title="What each unit saved is worth">
        <p>
          At the October to December 2026 cap, every 1,000 kWh of electricity you avoid saves about <strong>£263.20</strong>, and every 1,000 kWh of gas about{" "}
          <strong>£79.70</strong>. Units of electricity are worth over three times as much to save as units of gas.
        </p>
        <p>
          Turning the heating down, draught-proofing and using less hot water cut gas use. Drying clothes without a tumble dryer, using smaller cooking appliances
          and cutting standby power cut electricity use.
        </p>
      </GuideSection>

      <GuideSection id="next" n={18} kicker="What next" title="The next price cap">
        <Timeline
          items={[
            { when: "1 October 2026", what: "Cap rises to £1,723 for a typical home", detail: "VAT on electricity removed." },
            { when: "25 November 2026", what: "Ofgem announces the January to March 2027 cap" },
            { when: "1 January 2027", what: "New cap rates start" },
            { when: "31 March 2027", what: "Zero VAT on electricity is due to end", detail: "Unless the government extends it." },
          ]}
        />
        <p>When the January cap is announced, the calculator&rsquo;s figures will be updated. Until then, it shows the rates in force now.</p>
      </GuideSection>

      <GuideSection id="help" n={19} kicker="Support" title="Help if you are struggling">
        <p>
          If you cannot pay, contact your supplier as soon as you can. Suppliers must work with you to agree an affordable way to pay, such as a payment plan, and
          consider your circumstances.
        </p>
        <p>
          Check you are getting all the help you are entitled to with our <a href="/uk/benefits/benefits-checker">benefits checker</a>. If you are on a low income,
          see what <a href="/uk/benefits/universal-credit">Universal Credit</a> you could get, and whether a{" "}
          <a href="/uk/benefits/council-tax-reduction">Council Tax Reduction</a> could lower another big household bill. People over State Pension age should check{" "}
          <a href="/uk/benefits/pension-credit">Pension Credit</a>, which can unlock other help.
        </p>
        <Callout title="Moving home?">
          Take a meter reading on the day you move in and out, and give it to the supplier. Add energy to your <a href="/uk/property/moving-house-budget">moving house budget</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="breakdown" n={20} kicker="Behind the price" title="What makes up the cap">
        <p>
          Ofgem builds the cap from several cost allowances. For a typical Direct Debit home from October to December 2026, wholesale energy is the biggest part,
          and its share grew from 44% to 47% since the summer.
        </p>
        <Bars
          items={[
            { label: "Wholesale energy, including contracts for difference", value: 47 },
            { label: "Networks", value: 24 },
            { label: "Operating, debt and industry costs", value: 17 },
            { label: "Government policy costs", value: 6 },
            { label: "Supplier earnings allowance", value: 2.7 },
            { label: "Headroom", value: 1 },
          ]}
          format={(n) => n + "%"}
        />
        <p>
          Wholesale costs move with gas and power markets, which is why the cap changes every quarter. Network costs pay for the wires and pipes, and are the main
          reason prices differ between regions. Figures may not add to 100% because of rounding and smaller items, such as VAT on gas.
        </p>
      </GuideSection>

      <GuideSection id="quarter" n={21} kicker="This quarter" title="The cost of one quarter">
        <p>
          The October to December 2026 rates last for 92 days. Over that time, a typical home using energy at an even rate through the year would pay about{" "}
          <strong>£434.44</strong>. In practice, most homes use more gas in these months than in the summer, so the real cost of the quarter is usually higher,
          and lower in spring and summer.
        </p>
        <p>
          This is why the calculator shows a yearly figure and a monthly average: it is the clearest way to compare one cap with another, and it matches how
          Direct Debits are usually set. To see what a single appliance adds, use our appliance running cost calculator.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "26.32p", label: "Electricity per kWh, no VAT" },
            { value: "54.83p", label: "Electricity standing charge a day" },
            { value: "7.97p", label: "Gas per kWh, 5% VAT included" },
            { value: "29.68p", label: "Gas standing charge a day" },
            { value: "£1,723", label: "Typical yearly bill, Direct Debit" },
            { value: "25 Nov 2026", label: "Next cap announced" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
