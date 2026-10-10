import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Roth conversion — the guide. Figures from src/lib/us/retirement-income.ts (rothConversion, roomInBracket), which uses federalReturn and stateTax. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a Roth conversion is" },
  { id: "tax", title: "How a conversion is taxed" },
  { id: "bracket", title: "Filling your bracket" },
  { id: "big", title: "What a big conversion costs" },
  { id: "payoff", title: "When converting pays off" },
  { id: "break-even", title: "The break-even tax rate" },
  { id: "pay-from", title: "Paying the tax: outside money or the IRA" },
  { id: "state", title: "State income tax" },
  { id: "window", title: "The best years to convert" },
  { id: "seniors", title: "Converting after 65" },
  { id: "irmaa", title: "Medicare surcharges (IRMAA)" },
  { id: "social-security", title: "Social Security and the tax torpedo" },
  { id: "five-year", title: "The five-year rules" },
  { id: "pro-rata", title: "The pro-rata rule" },
  { id: "heirs", title: "Conversions and your heirs" },
  { id: "how-to", title: "How to convert" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Roth IRAs (conversions)", href: "https://www.irs.gov/retirement-plans/roth-iras" },
  { label: "IRS — Publication 590-A, Contributions to IRAs (conversions)", href: "https://www.irs.gov/publications/p590a" },
  { label: "IRS — Publication 590-B, Distributions from IRAs (ordering rules, five-year periods)", href: "https://www.irs.gov/publications/p590b" },
  { label: "IRS — Rev. Proc. 2025-32, 2026 tax brackets and standard deduction", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "IRS — Instructions for Form 8606", href: "https://www.irs.gov/instructions/i8606" },
  { label: "Medicare.gov — Medicare costs (2026 premiums and income-related amounts)", href: "https://www.medicare.gov/basics/costs/medicare-costs" },
];

export default function ConversionGuide() {
  return (
    <Guide
      kicker="The Roth conversion guide"
      title="Roth conversions: the tax now and the payoff later"
      intro={
        <>
          A Roth conversion moves money from a traditional IRA or 401(k) into a Roth IRA. You pay income tax on it now, and in return it grows and comes out
          tax-free. This guide explains how the tax is worked out, how to fill a bracket, the break-even tax rate, and the side effects on Medicare and
          Social Security.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The amount you convert is taxed as ordinary income in the year you convert.</li>
          <li>Converting pays off when your tax rate later would be higher than the rate you pay now.</li>
          <li>
            A married couple with {usd(60_000)} of other income can convert about {usd(73_000)} in 2026 and stay in the 12% bracket.
          </li>
          <li>Pay the tax from other savings if you can, and watch the Medicare surcharge thresholds from age 63.</li>
        </ul>
        <KeyStats
          items={[
            { value: "No limit", label: "Income limit for conversions" },
            { value: "5 years", label: "Clock for each conversion" },
            { value: "$218,000", label: "2026 IRMAA start, joint" },
            { value: "$109,000", label: "2026 IRMAA start, single" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a Roth conversion is">
        <p>
          Traditional IRAs and 401(k)s hold pre-tax money: you got a deduction going in, and you pay income tax coming out. A{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA</a>{" "}is the reverse. A conversion switches money from the first to the second by paying the
          deferred tax now. Since 2010 there is no income limit, and you can convert any amount, all at once or a slice each year.
        </p>
        <p>
          After the conversion, the money grows tax-free, comes out tax-free in retirement once the rules are met, and has no required minimum distributions
          during your life.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={3} kicker="The bill" title="How a conversion is taxed">
        <p>
          The converted amount is added to your other income for the year. It isn&rsquo;t taxed at a flat rate: it fills your brackets from where your other
          income leaves off. The calculator runs the 2026 federal return with and without the conversion and reports the difference.
        </p>
        <WorkedExample
          title="Married filing jointly, under 65, $60,000 of other income, converting $50,000"
          steps={[
            { label: "Income before the conversion", value: "$60,000" },
            { label: "Income with it", value: "$110,000" },
            { label: "Standard deduction", value: "$32,200" },
            { label: "Taxable income before: $60,000 − $32,200", value: "$27,800" },
            { label: "Taxable income with it (all within the 12% bracket)", value: "$77,800" },
          ]}
          total={{ label: "Extra federal tax", value: usd(6_000) }}
        />
        <p>
          That is 12% of the conversion. The 10% penalty for early withdrawals doesn&rsquo;t apply to the conversion itself, whatever your age, as long as the
          money goes straight into the Roth.
        </p>
      </GuideSection>

      <GuideSection id="bracket" n={4} kicker="The strategy" title="Filling your bracket">
        <p>
          The most common approach is to convert just enough to reach the top of your current bracket. In 2026 the 12% bracket for married couples ends at
          {" "}{usd(100_800)} of taxable income, or {usd(133_000)} of income after the {usd(32_200)} standard deduction.
        </p>
        <DataTable
          caption="Room left in your current bracket, 2026"
          head={["Situation", "Bracket", "Room to convert"]}
          numeric={[2]}
          rows={[
            ["Married, under 65, $60,000 other income", "12%", usd(73_000)],
            ["Married, both 65+, $60,000 other income", "10%", usd(12_300)],
            ["Single, under 65, $40,000 other income", "12%", usd(26_500)],
            ["Single, under 65, no other income", "10%", usd(28_500)],
          ]}
        />
        <p>
          Converting {usd(73_000)} in the first example costs {usd(8_760)}, exactly 12%. Repeating that every year until RMDs start can move a large
          traditional balance into a Roth at a low rate. Our <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows all seven
          brackets.
        </p>
      </GuideSection>

      <GuideSection id="big" n={5} kicker="All at once?" title="What a big conversion costs">
        <p>Converting a lot in one year pushes part of it into higher brackets:</p>
        <Figure label="Federal tax on converting, married filing jointly with $60,000 of other income" caption="2026 brackets; figures from the calculator's engine.">
          <Bars
            format={usd}
            items={[
              { label: "$50,000", value: 6_000 },
              { label: "$73,000", value: 8_760 },
              { label: "$200,000", value: 37_028 },
            ]}
          />
        </Figure>
        <p>
          On {usd(200_000)} the tax is {usd(37_028)}, an average of 18.5%, with the top slice taxed at 24%. Spreading the same amount over three years at
          the top of the 12% bracket would cost noticeably less, and a {usd(260_000)} AGI also triggers Medicare surcharges two years later.
        </p>
      </GuideSection>

      <GuideSection id="payoff" n={6} kicker="The comparison" title="When converting pays off">
        <p>
          The calculator compares two paths for the same money. <strong>Convert:</strong>{" "}the whole amount grows in the Roth and comes out tax-free.{" "}
          <strong>Don&rsquo;t convert:</strong>{" "}it grows in the traditional IRA and is taxed at your future rate, while the money you would have used for the tax
          stays invested in a taxable account.
        </p>
        <DataTable
          caption="$50,000 converted at 12%, grown 15 years at 6%, tax paid from savings"
          head={["Future tax rate", "Roth", "Don't convert", "Converting is"]}
          numeric={[1, 2, 3]}
          rows={[
            ["12%", usd(119_828), usd(118_735), `${usd(1_093)} ahead`],
            ["22%", usd(119_828), usd(106_752), `${usd(13_076)} ahead`],
            ["24%", usd(119_828), usd(104_356), `${usd(15_472)} ahead`],
          ]}
        />
        <p>
          Even at the same 12% rate later, converting edges ahead, because paying the tax from outside savings effectively moves more money into the tax-free
          account. The bigger the jump in your future rate, the bigger the gain.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={7} kicker="One number" title="The break-even tax rate">
        <p>
          The break-even rate is the future tax rate at which both paths leave you the same. If you pay the tax from the converted amount, it is simply your
          average rate on the conversion: 12% in the example. Paying from outside savings lowers it, here to about 11.1%, because those savings would have
          faced tax on their growth.
        </p>
        <Callout title="The real question">
          Will you pay more or less than the break-even rate on this money later? Think about RMDs, Social Security, a surviving spouse filing single, and
          whether tax rates might rise.
        </Callout>
      </GuideSection>

      <GuideSection id="pay-from" n={8} kicker="Cash flow" title="Paying the tax: outside money or the IRA">
        <CompareCards
          columns={[
            {
              name: "Pay from savings",
              rows: [
                { label: "Into the Roth", value: "The whole $50,000" },
                { label: "After 15 years at 6%", value: usd(119_828) },
                { label: "Penalty risk under 59½", value: "None" },
              ],
            },
            {
              name: "Pay from the IRA",
              rows: [
                { label: "Into the Roth", value: "$44,000 after $6,000 tax" },
                { label: "After 15 years at 6%", value: usd(105_449) },
                { label: "Penalty risk under 59½", value: "10% on the amount withheld" },
              ],
            },
          ]}
        />
        <p>
          Paying from the IRA, a conversion at 12% only breaks even if your future rate is above 12%; at exactly 12% the two paths tie at {usd(105_449)}.
        </p>
      </GuideSection>

      <GuideSection id="state" n={9} kicker="Location" title="State income tax">
        <p>
          Most states tax a conversion like any other income. In California, the same {usd(50_000)} conversion adds about {usd(2_235)} of state tax, taking the
          total to {usd(8_235)}, or 16.5%. The calculator treats the conversion like wages; some states exempt part of retirement income for older residents,
          so check your own state. A planned move matters too: converting after moving from a high-tax state to a no-tax state, such as Florida or Texas, can
          save the state tax entirely.
        </p>
      </GuideSection>

      <GuideSection id="window" n={10} kicker="Timing" title="The best years to convert">
        <Timeline
          items={[
            { when: "Low-income years", what: "Between jobs, a sabbatical, or a business loss", detail: "Your brackets are mostly empty." },
            { when: "Retirement to 70", what: "Before Social Security and RMDs", detail: "Often the lowest-tax years of adult life." },
            { when: "Market dips", what: "Convert when values are down", detail: "The same number of shares costs less tax; the recovery happens in the Roth." },
            { when: "Before RMD age", what: "73, or 75 if born in 1960 or later", detail: "Once RMDs start, they must come out first and fill your low brackets." },
          ]}
        />
        <p>
          Our <a href="/us/savings/rmd-calculator">RMD calculator</a>{" "}shows the withdrawals you&rsquo;ll be forced to take later, which is often what makes
          converting now worthwhile.
        </p>
      </GuideSection>

      <GuideSection id="seniors" n={11} kicker="65 and over" title="Converting after 65">
        <p>
          From 65 your standard deduction is larger and, from 2025 to 2028, you also get the senior deduction of $6,000 each. A married couple both 65+ with
          {" "}{usd(60_000)} of other income pays only {usd(5_754)} to convert {usd(50_000)}, an average of 11.5%, because part of the conversion fills the 10%
          bracket. The senior deduction phases out above {usd(150_000)} of modified AGI for couples, so very large conversions can lose it.
        </p>
      </GuideSection>

      <GuideSection id="irmaa" n={12} kicker="Medicare" title="Medicare surcharges (IRMAA)">
        <p>
          Medicare Part B and Part D premiums rise in steps for higher incomes, using your modified AGI from two years earlier. In 2026 the standard Part B
          premium is $202.90 a month, and surcharges start above $109,000 of modified AGI for single filers and $218,000 for married couples filing jointly.
        </p>
        <p>
          Because of the two-year look-back, conversions from age 63 onward can raise premiums. Each tier is a cliff: one dollar over adds the whole surcharge,
          so it is worth sizing a conversion to stay just under a line.
        </p>
      </GuideSection>

      <GuideSection id="social-security" n={13} kicker="Benefits" title="Social Security and the tax torpedo">
        <p>
          Once you claim Social Security, extra income can make up to 85% of your benefits taxable, so each converted dollar can drag more benefits into tax.
          The effective rate on a conversion can then be well above your bracket. Converting before you claim avoids this. Our{" "}
          <a href="/us/savings/social-security-calculator">Social Security calculator</a>{" "}shows how much of your benefit is taxed at your income.
        </p>
      </GuideSection>

      <GuideSection id="five-year" n={14} kicker="Access" title="The five-year rules">
        <ul>
          <li>
            <strong>Each conversion</strong>{" "}starts its own five-year clock on January 1 of the year you convert. Take out converted money within five years
            and before 59½, and the 10% penalty applies (no income tax, since it was taxed already).
          </li>
          <li>
            <strong>Earnings</strong>{" "}are tax-free only once you are 59½ and five years have passed since your first Roth contribution or conversion.
          </li>
          <li>
            Withdrawals come out in order: contributions first, then conversions oldest first, then earnings.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="pro-rata" n={15} kicker="Watch out" title="The pro-rata rule">
        <p>
          If any of your traditional, SEP or SIMPLE IRAs hold after-tax money, each conversion is a mix of pre-tax and after-tax dollars in proportion to
          your total IRA balances on December 31. You can&rsquo;t pick only the after-tax part. Money in a 401(k) doesn&rsquo;t count, which is why people
          sometimes roll pre-tax IRA money into a workplace plan first. Report every conversion on Form 8606.
        </p>
      </GuideSection>

      <GuideSection id="heirs" n={16} kicker="Estate planning" title="Conversions and your heirs">
        <p>
          Most heirs other than a spouse must empty an inherited IRA within 10 years. A large traditional IRA can land on top of their peak earning years and
          be taxed at high rates. An inherited Roth has the same 10-year rule, but withdrawals are tax-free. If your heirs are likely to pay more tax than you,
          converting can be a gift to them.
        </p>
      </GuideSection>

      <GuideSection id="how-to" n={17} kicker="Practical" title="How to convert">
        <ol>
          <li>Open a Roth IRA at the same provider as your traditional IRA, if you don&rsquo;t have one.</li>
          <li>Ask for a conversion of a dollar amount or specific shares; it is usually an online form.</li>
          <li>Choose no tax withholding if you will pay from other savings, then cover the tax with estimated payments or extra paycheck withholding.</li>
          <li>Keep the Form 1099-R you receive and file Form 8606 with your return.</li>
        </ol>
        <p>
          A large conversion can mean an underpayment penalty if you don&rsquo;t pay enough tax during the year. Making an estimated payment in the quarter you
          convert avoids it.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Converting so much that part of it jumps into a higher bracket for no reason.</li>
          <li>Forgetting the Medicare look-back from age 63.</li>
          <li>Paying the tax from the IRA when under 59½.</li>
          <li>Ignoring other IRA balances under the pro-rata rule.</li>
          <li>Converting an RMD, which isn&rsquo;t allowed.</li>
          <li>Expecting to undo it; recharacterizations ended in 2018.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["Income limit for conversions", "None"],
            ["Standard deduction, married filing jointly", "$32,200"],
            ["Top of the 12% bracket, joint (taxable income)", "$100,800"],
            ["Top of the 12% bracket, single (taxable income)", "$50,400"],
            ["IRMAA starts (modified AGI, two years earlier)", "$109,000 single / $218,000 joint"],
            ["Standard Part B premium", "$202.90 a month"],
            ["Penalty on converted money within 5 years, under 59½", "10%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
