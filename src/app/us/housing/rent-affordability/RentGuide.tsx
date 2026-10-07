import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Rent affordability guide. Figures from src/lib/us/mortgage.ts (rentAffordability) and src/lib/us/pay.ts (paycheck). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "thirty", title: "The 30% rule" },
  { id: "forty", title: "The 40× rule landlords use" },
  { id: "same", title: "Why the two rules agree" },
  { id: "budget", title: "The 50/30/20 budget" },
  { id: "debts", title: "Debts and the 36% line" },
  { id: "example", title: "A worked example" },
  { id: "income", title: "Rent by income" },
  { id: "reverse", title: "Income needed for a rent" },
  { id: "take-home", title: "Gross pay vs take-home pay" },
  { id: "states", title: "Where you live changes take-home pay" },
  { id: "hidden", title: "Costs beyond the rent" },
  { id: "upfront", title: "Money up front" },
  { id: "roommates", title: "Roommates and couples" },
  { id: "qualify", title: "If you do not meet the income rule" },
  { id: "burden", title: "When rent takes too much" },
  { id: "buy", title: "Renting and saving to buy" },
  { id: "using", title: "Using the calculator well" },
  { id: "screening", title: "What landlords check" },
  { id: "increases", title: "Rent increases and renewals" },
  { id: "compare", title: "Comparing two apartments" },
  { id: "emergency", title: "An emergency fund comes first" },
  { id: "help", title: "Help with rent" },
  { id: "irregular", title: "If your income varies" },
  { id: "first-job", title: "Students and first jobs" },
  { id: "utilities", title: "Estimating utilities" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "HUD User: Rental burdens, rethinking affordability measures", href: "https://www.huduser.gov/portal/pdredge/pdr-edge-featd-article-092214.html" },
  { label: "CFPB: What is a debt-to-income ratio?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  { label: "HUD: Housing Choice Vouchers", href: "https://www.hud.gov/helping-americans/housing-choice-vouchers" },
  { label: "AnnualCreditReport.com: free credit reports", href: "https://www.annualcreditreport.com/" },
  { label: "IRS: Federal income tax rates and brackets", href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" },
  { label: "SSA: Contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
];

export default function RentGuide() {
  return (
    <Guide
      kicker="The rent affordability guide"
      title="How much rent can you afford?"
      intro={
        <>
          There are three common ways to set a rent budget: 30% of gross income, the 40× rule many landlords use, and the 50/30/20 budget built on take-home pay. They often give
          different answers. This guide explains each one, why the lowest is usually the safest, and how to work out the income you need for a particular apartment.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The 30% rule: rent up to 30% of gross monthly income. On {usd(60_000)} a year, {usd(1_500)} a month.</li>
          <li>The 40× rule: landlords want a yearly income of 40 times the monthly rent. That also allows {usd(1_500)}.</li>
          <li>A 50/30/20 budget on take-home pay may allow less once other essentials are counted.</li>
          <li>For rent of {usd(2_000)}, both income rules need {usd(80_000)} a year.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(1_500), label: "30% rule on $60,000" },
            { value: usd(1_400), label: "Comfortable rent in the example" },
            { value: usd(80_000), label: "Income needed for $2,000 rent" },
            { value: "30%", label: "HUD's cost-burden line" },
          ]}
        />
      </GuideSection>

      <GuideSection id="thirty" n={2} kicker="Rule one" title="The 30% rule">
        <p>
          The idea that housing should cost no more than 30% of income comes from federal housing policy. HUD counts households paying more than 30% of income on housing as{" "}
          <strong>cost-burdened</strong>, and more than 50% as <strong>severely cost-burdened</strong>. It uses gross income, before tax.
        </p>
        <p>
          It is simple and widely used, but it ignores taxes, debts and the cost of living where you are. On a low income, 30% can still leave too little for everything else; on
          a high income, spending 30% may be easy.
        </p>
      </GuideSection>

      <GuideSection id="forty" n={3} kicker="Rule two" title="The 40× rule landlords use">
        <p>
          Many landlords and property managers, especially in big cities, ask that your yearly gross income be at least 40 times the monthly rent. For a {usd(1_800)} apartment,
          that is {usd(72_000)} a year. Some use 30× or 35×; others want 2.5 or 3 times the rent in monthly income, which is the same idea. Ask before you apply, because application
          fees are usually not refundable.
        </p>
      </GuideSection>

      <GuideSection id="same" n={4} kicker="The maths" title="Why the two rules agree">
        <p>
          30% of monthly income is 0.3 ÷ 12 = 2.5% of yearly income, and yearly income ÷ 40 is also 2.5%. So the 30% rule and the 40× rule always give the same rent. Landlords who
          use 3× monthly income allow a little more: about 33% of gross pay.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={5} kicker="Rule three" title="The 50/30/20 budget">
        <p>The 50/30/20 budget splits take-home pay three ways:</p>
        <CompareCards
          columns={[
            { name: "50% needs", rows: [{ label: "Includes", value: "Rent, groceries, utilities, insurance, transportation, minimum debt payments" }] },
            { name: "30% wants", rows: [{ label: "Includes", value: "Eating out, entertainment, travel, subscriptions" }] },
            { name: "20% savings", rows: [{ label: "Includes", value: "Emergency fund, retirement, extra debt payments" }] },
          ]}
        />
        <p>
          Rent comes out of the 50% for needs, after your other essentials. Because it starts from take-home pay, it reflects taxes, and because it subtracts your other needs, it
          reflects your real costs.
        </p>
      </GuideSection>

      <GuideSection id="debts" n={6} kicker="Debts" title="Debts and the 36% line">
        <p>
          Lenders treat 36% of gross income as a sensible ceiling for housing plus debt payments. The calculator uses the same line for renters: rent plus car, student loan and
          card payments up to 36% of gross pay. With {usd(300)} of debts on {usd(60_000)} a year, that leaves {usd(1_500)}; with {usd(600)}, only {usd(1_200)}, and that becomes
          the limit. Our <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows your ratios in full.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$60,000 a year, single, in Texas, $700 of other essentials, $300 of debts"
          steps={[
            { label: "Take-home pay", note: "After 2026 federal tax and FICA; Texas has no income tax", value: "$4,199 a month" },
            { label: "30% rule", value: usd(1_500) },
            { label: "40× rule", value: usd(1_500) },
            { label: "50/30/20", note: "50% of $4,199, less $700", value: usd(1_400) },
            { label: "36% all-debts line", note: "$1,800 less $300", value: usd(1_500) },
          ]}
          total={{ label: "Comfortable rent (the lowest)", value: usd(1_400) }}
        />
        <p>
          The 50/30/20 budget sets the limit here. A landlord would approve {usd(1_500)}, but paying it would mean cutting wants or savings below their shares. The full split of
          {" "}{usd(4_199)}: {usd(2_100)} for needs, {usd(1_260)} for wants and {usd(840)} for savings.
        </p>
      </GuideSection>

      <GuideSection id="income" n={8} kicker="Income" title="Rent by income">
        <DataTable
          caption="Single, in Texas, other essentials at 20% of take-home pay, no debts"
          head={["Income a year", "Take-home a month", "30% and 40× rules", "Comfortable rent"]}
          numeric={[1, 2, 3]}
          rows={[
            [usd(35_000), usd(2_525), usd(875), usd(758)],
            [usd(50_000), usd(3_530), usd(1_250), usd(1_059)],
            [usd(75_000), usd(5_133), usd(1_875), usd(1_540)],
            [usd(100_000), usd(6_598), usd(2_500), usd(1_979)],
            [usd(150_000), usd(9_483), usd(3_750), usd(2_845)],
          ]}
        />
        <p>As income rises, taxes take a bigger share, so the gap between the gross-income rules and a take-home budget widens.</p>
      </GuideSection>

      <GuideSection id="reverse" n={9} kicker="Reverse" title="Income needed for a rent">
        <p>Multiply the monthly rent by 40 to get the yearly income landlords usually look for:</p>
        <Bars
          format={usd}
          items={[
            { label: "$1,000 rent", value: 40_000 },
            { label: "$1,500 rent", value: 60_000 },
            { label: "$2,000 rent", value: 80_000 },
            { label: "$2,500 rent", value: 100_000 },
            { label: "$3,000 rent", value: 120_000 },
          ]}
        />
        <p>Enter any rent in the calculator&rsquo;s &ldquo;Check a rent&rdquo; box to see the income each rule needs and what share of your pay it would take.</p>
      </GuideSection>

      <GuideSection id="take-home" n={10} kicker="Pay" title="Gross pay vs take-home pay">
        <p>
          Gross pay is your salary before anything is taken out. Take-home pay is what reaches your bank account after federal income tax, Social Security (6.2%), Medicare (1.45%),
          state and local tax, and deductions such as 401(k) contributions and health insurance. The calculator estimates take-home pay from 2026 federal rules and your state, or
          you can enter the figure from your pay stub. Our <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}gives a full breakdown.
        </p>
      </GuideSection>

      <GuideSection id="states" n={11} kicker="States" title="Where you live changes take-home pay">
        <p>On {usd(60_000)} a year, single, with no pre-tax deductions, estimated monthly take-home pay in 2026 is:</p>
        <Bars
          format={usd}
          items={[
            { label: "Texas (no income tax)", value: 4_199 },
            { label: "Arizona (2.5% flat)", value: 4_074 },
            { label: "California (3% entered)", value: 4_049 },
            { label: "Colorado (4.4% flat)", value: 3_979 },
            { label: "Georgia (4.99% flat)", value: 3_950 },
          ]}
        />
        <p>The difference is a couple of hundred dollars a month, which matters most in a tight budget. Some cities, such as New York City, add a local income tax too.</p>
      </GuideSection>

      <GuideSection id="hidden" n={12} kicker="Costs" title="Costs beyond the rent">
        <ul>
          <li>Utilities: electricity, gas, water, trash and internet, unless included.</li>
          <li>Renters insurance, which many leases require.</li>
          <li>Parking, pet rent and amenity fees.</li>
          <li>Commuting: a cheaper apartment farther out can cost more once gas or transit is counted.</li>
        </ul>
        <p>Put these in &ldquo;other essentials&rdquo; so the 50/30/20 figure reflects them.</p>
      </GuideSection>

      <GuideSection id="upfront" n={13} kicker="Cash" title="Money up front">
        <p>
          Moving in usually takes first month&rsquo;s rent, a security deposit (often one month&rsquo;s rent, sometimes more; many states cap it), application fees and sometimes a
          broker fee. Budget for two to three months&rsquo; rent in cash, plus moving costs.
        </p>
      </GuideSection>

      <GuideSection id="roommates" n={14} kicker="Sharing" title="Roommates and couples">
        <p>
          When several people sign a lease, landlords usually add up the incomes, though some want each person to meet a share of the requirement. Enter the combined income to see
          the household budget, and agree how rent and utilities will be split before you sign. Everyone on the lease is usually responsible for the whole rent.
        </p>
      </GuideSection>

      <GuideSection id="qualify" n={15} kicker="Options" title="If you do not meet the income rule">
        <ul>
          <li>Ask for a guarantor or co-signer, often a parent, with a higher income.</li>
          <li>Offer a larger deposit or prepaid rent, where state law allows.</li>
          <li>Show savings, a job offer letter or other income such as benefits.</li>
          <li>Look at smaller landlords, who may be more flexible than large management companies.</li>
        </ul>
      </GuideSection>

      <GuideSection id="burden" n={16} kicker="Warning signs" title="When rent takes too much">
        <Callout tone="warn" title="Signs your rent is too high">
          You are using a credit card for groceries or bills, you have no emergency savings, or a small surprise cost means a late payment. Then look at a cheaper place, a roommate
          or ways to raise income before signing a renewal.
        </Callout>
        <p>Many renters do pay more than 30%, especially in expensive cities. Paying more is sometimes worth it for a shorter commute, but go in knowing the trade-off.</p>
      </GuideSection>

      <GuideSection id="buy" n={17} kicker="Next steps" title="Renting and saving to buy">
        <p>
          If you plan to buy, a rent below your comfortable figure leaves room to save a down payment. When you are ready, our{" "}
          <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}shows the price your income supports, and the{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows the monthly payment on a specific home.
        </p>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter your yearly income before tax, for everyone on the lease.</li>
          <li>Add your other essential costs and monthly debt payments.</li>
          <li>Under More options, pick your state and filing status, or enter take-home pay from your pay stub.</li>
          <li>Type a rent you are considering into &ldquo;Check a rent&rdquo;.</li>
        </ol>
      </GuideSection>

      <GuideSection id="screening" n={19} kicker="Applying" title="What landlords check">
        <p>
          Income is only one part of a rental application. Most landlords also run a credit check, look at your rental history and call past landlords, and many run a background
          check. They usually ask for recent pay stubs, an offer letter or bank statements, and for the self-employed, tax returns or 1099s.
        </p>
        <p>
          Before you apply, check your credit reports for free at the official site, AnnualCreditReport.com, and fix any errors. Have your documents ready in one file, because
          good apartments in busy markets often go to the first complete application.
        </p>
      </GuideSection>

      <GuideSection id="increases" n={20} kicker="Planning" title="Rent increases and renewals">
        <p>
          Your rent is fixed only for the length of the lease. At renewal, the landlord can usually raise it, subject to notice rules and, in a few states and cities, rent
          control or stabilization rules. A rent that only just fits today may not fit after a rise of several percent next year, while your pay may not rise as fast.
        </p>
        <p>
          Leaving some room below your comfortable figure gives you a buffer. When a renewal offer arrives, compare it with similar apartments nearby; moving has its own costs,
          but so does accepting a large increase without asking whether there is room to negotiate.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={21} kicker="Choosing" title="Comparing two apartments">
        <p>
          Compare the total monthly cost, not just the rent. An apartment that costs {usd(100)} more but includes utilities, parking or a much shorter commute can be the cheaper
          choice. Add up rent, expected utilities, renters insurance, parking, fees and commuting for each, then run the larger total through the calculator&rsquo;s &ldquo;Check a
          rent&rdquo; box.
        </p>
        <p>
          Think about time too. A long commute costs hours each week that you might otherwise spend working extra shifts, resting or with family, and that has real value even
          if it does not show up in a budget.
        </p>
      </GuideSection>

      <GuideSection id="emergency" n={22} kicker="Safety net" title="An emergency fund comes first">
        <p>
          Rent is due every month whether or not you have a surprise car repair or a gap between jobs. A cushion of even one month&rsquo;s rent in savings makes a late payment
          much less likely, and a late payment can bring fees and, in the worst case, an eviction filing that follows you to future applications.
        </p>
        <p>
          The 20% savings share of a 50/30/20 budget is meant for this. If your rent leaves no room to build a cushion, that is a sign it is too high for now.
        </p>
      </GuideSection>

      <GuideSection id="help" n={23} kicker="Assistance" title="Help with rent">
        <p>
          If rent takes more than you can manage, help may be available. HUD&rsquo;s Housing Choice Voucher program, run by local public housing agencies, helps eligible
          lower-income households pay rent in the private market, though waiting lists are often long. Many cities, counties and charities run emergency rental help for a
          short-term crisis. Calling 211 connects you with local programs.
        </p>
      </GuideSection>

      <GuideSection id="irregular" n={24} kicker="Income" title="If your income varies">
        <p>
          Freelancers, gig workers, people paid on commission and anyone with seasonal hours should budget on a cautious income figure, not a good month. A simple approach is to
          use your lowest-earning three months of the past year, multiplied by four, as the yearly income in the calculator. If you are self-employed, remember that no tax is
          withheld: set aside money for quarterly estimated taxes and self-employment tax before working out what is left for rent.
        </p>
        <p>
          Landlords will usually want two years of tax returns or several months of bank statements to show steady income, so expect to provide more paperwork than someone
          with a W-2 job.
        </p>
      </GuideSection>

      <GuideSection id="first-job" n={25} kicker="Starting out" title="Students and first jobs">
        <p>
          If you are moving for a first job, many landlords accept a signed offer letter as proof of income. Your first paycheck may arrive two to four weeks after you start, so
          plan for the deposit and the first month&rsquo;s rent from savings. Students without income usually need a guarantor. Starting with a roommate or a smaller place for a
          year lets you build a rental history and savings before taking on more.
        </p>
      </GuideSection>

      <GuideSection id="utilities" n={26} kicker="Costs" title="Estimating utilities">
        <p>
          Utilities vary with the size and age of the building, the climate and whether heating is gas or electric. Ask the landlord or current tenant what bills usually run in
          summer and winter, and check whether water, sewer and trash are included. Older buildings with poor insulation can mean high heating or cooling bills that wipe out a
          lower rent. If the landlord pays some utilities, the rent may look high but the total cost can be lower.
        </p>
        <p>
          Internet and phone plans are easy to forget. Add them to other essentials too, so the budget reflects the full cost of living in each place.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Rule", "Figure"]}
          rows={[
            ["HUD cost-burden line", "30% of income on housing"],
            ["Severe cost burden", "Over 50% of income"],
            ["Landlord income rule", "Often 40× the monthly rent a year"],
            ["50/30/20", "Needs 50%, wants 30%, savings 20% of take-home pay"],
            ["All-debts line used here", "36% of gross income"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
