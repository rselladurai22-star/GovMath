import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** FIRE — the guide. Figures from src/lib/investing/growth.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What FIRE means" },
  { id: "number", title: "Your FI number" },
  { id: "swr", title: "The safe withdrawal rate" },
  { id: "example", title: "A worked example" },
  { id: "state-pension", title: "How the State Pension helps" },
  { id: "levers", title: "What makes the biggest difference" },
  { id: "spending", title: "Spending is the strongest lever" },
  { id: "returns", title: "What return to assume" },
  { id: "access", title: "When you can reach your money" },
  { id: "wrappers", title: "Pensions, ISAs and the bridge" },
  { id: "tax", title: "Tax in early retirement" },
  { id: "coast", title: "Coast FI and other flavours" },
  { id: "risks", title: "Risks to plan for" },
  { id: "steps", title: "Getting started" },
  { id: "savings-rate", title: "Your savings rate" },
  { id: "drawing", title: "Drawing an income" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — The new State Pension", href: "https://www.gov.uk/new-state-pension" },
  { label: "GOV.UK — Check your State Pension forecast", href: "https://www.gov.uk/check-state-pension" },
  { label: "GOV.UK — Increasing normal minimum pension age", href: "https://www.gov.uk/government/publications/increasing-normal-minimum-pension-age" },
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
  { label: "MoneyHelper — Pension Wise", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise" },
];

export default function FireGuide() {
  return (
    <Guide
      kicker="The FIRE guide"
      title="How to work out when you could retire early"
      intro={
        <>
          FIRE stands for Financial Independence, Retire Early. The idea is simple: build up enough invested money that its returns can pay
          for your life, so work becomes optional. This guide explains how to set your target, how the UK State Pension and pension rules fit
          in, and the risks to plan for.
        </>
      }
      meta={["UK rules", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The classic target is 25 times your yearly spending, which is the same as withdrawing 4% a year.</li>
          <li>Spending £30,000 a year, that is £750,000 without the State Pension.</li>
          <li>Counting the full new State Pension (£12,547.60 a year from 67), the target in our example falls to about £529,599.</li>
          <li>Saving £1,000 a month from £50,000 at 35, with a 4% real return, gets there at 58.</li>
        </ul>
        <KeyStats
          items={[
            { value: "25×", label: "Spending, at a 4% withdrawal rate" },
            { value: "£750,000", label: "To spend £30,000 a year" },
            { value: "£12,547.60", label: "Full new State Pension a year" },
            { value: "57", label: "Pension access age from April 2028" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What FIRE means">
        <p>
          Financial independence means you have enough money invested that you no longer need to work for income. Retiring early is optional:
          many people who reach financial independence keep working, but part-time, in a lower-paid job they enjoy, or on their own terms.
        </p>
        <p>
          The approach usually combines three things: a high savings rate, low-cost investing, and spending that is planned and controlled.
          The calculator brings these together to show the age at which your savings could support your spending.
        </p>
      </GuideSection>

      <GuideSection id="number" n={3} kicker="The target" title="Your FI number">
        <p>
          Your FI number is the size of pot that can pay for your spending each year without running out. With a 4% withdrawal rate, divide
          your yearly spending by 0.04, or multiply it by 25.
        </p>
        <DataTable
          caption="Pot needed to spend £30,000 a year, with no State Pension"
          head={["Withdrawal rate", "Multiple of spending", "Pot needed"]}
          numeric={[1, 2]}
          rows={[
            ["4%", "25×", "£750,000"],
            ["3.5%", "28.6×", "£857,143"],
            ["3%", "33.3×", "£1,000,000"],
          ]}
        />
        <p>
          Use your spending in today&rsquo;s money, after tax. The calculator works entirely in today&rsquo;s money, using a return above
          inflation, so the target is something you can picture now.
        </p>
      </GuideSection>

      <GuideSection id="swr" n={4} kicker="Withdrawals" title="The safe withdrawal rate">
        <p>
          The 4% rule comes from US research in the 1990s, often called the Trinity Study. It found that, historically, withdrawing 4% of a
          mixed share and bond portfolio in the first year, then raising the amount with inflation, usually lasted at least 30 years.
        </p>
        <CompareCards
          columns={[
            {
              name: "Why 4% may be too high",
              rows: [
                { label: "Length", value: "Early retirements can last 40 to 50 years, not 30" },
                { label: "Markets", value: "UK and global returns have often been lower than US returns" },
                { label: "Charges", value: "Fund and platform fees come out of the return" },
              ],
            },
            {
              name: "Why it may be cautious",
              rows: [
                { label: "Flexibility", value: "Cutting spending after bad years helps a lot" },
                { label: "State Pension", value: "Reduces what the pot must pay from your late 60s" },
                { label: "Other income", value: "Part-time work or a partner's income" },
              ],
            },
          ]}
        />
        <p>Many UK planners use 3% to 3.5% for a long early retirement. Try several rates in the calculator&rsquo;s &ldquo;More options&rdquo;.</p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 35, £50,000 invested, saving £1,000 a month, spending £30,000 a year"
          steps={[
            { label: "Spending not covered by the State Pension: £30,000 − £12,548", value: "£17,452" },
            { label: "Pot for that, at 4%: £17,452 × 25", value: "£436,300" },
            { label: "Plus a bridge to cover the State Pension for 9 years until 67", value: "£93,299" },
            { label: "Target at age 58", value: "£529,599" },
          ]}
          total={{ label: "Financially independent at", value: "Age 58 (23 years)" }}
        />
        <p>
          This assumes a 4% real return, a 4% withdrawal rate and the full new State Pension from 67. Without counting the State Pension, the
          target is £750,000 and it takes 28 years, to age 63.
        </p>
      </GuideSection>

      <GuideSection id="state-pension" n={6} kicker="State Pension" title="How the State Pension helps">
        <p>
          The full new State Pension is £241.30 a week (£12,547.60 a year) in 2026/27, and it rises each April under the triple lock. It is
          paid from State Pension age, currently 66, rising to 67 between 2026 and 2028 and to 68 later.
        </p>
        <p>
          Because it covers part of your spending for life, it cuts the pot you need. But if you stop work long before State Pension age, the
          pot must also cover the full spending until it starts. The calculator adds this &ldquo;bridge&rdquo;: the further you are from State
          Pension age, the bigger it is.
        </p>
        <Callout title="Check your forecast">
          You need 35 qualifying years of National Insurance for the full new State Pension and at least 10 for any. If you stop working early,
          you may need to pay voluntary contributions to fill gaps. Check your forecast on GOV.UK. The{" "}
          <a href="/investing/state-pension-age">State Pension age calculator</a> shows your date.
        </Callout>
      </GuideSection>

      <GuideSection id="levers" n={7} kicker="Levers" title="What makes the biggest difference">
        <Figure label="Age you reach FI by monthly saving" caption="Starting at 35 with £50,000, spending £30,000, 4% real return, State Pension from 67.">
          <Bars
            items={[
              { label: "£500/m", value: 64 },
              { label: "£1,000/m", value: 58 },
              { label: "£1,500/m", value: 53 },
              { label: "£2,000/m", value: 51 },
              { label: "£3,000/m", value: 47 },
            ]}
            format={(n) => `Age ${n}`}
          />
        </Figure>
        <p>
          Saving more brings the date forward, but each extra pound helps a little less, because the target also rises as you retire further
          from State Pension age. The return and withdrawal rate matter too:
        </p>
        <DataTable
          head={["Change from the example", "FI age"]}
          numeric={[1]}
          rows={[
            ["As in the example", "58"],
            ["3% real return", "60"],
            ["5% real return", "56"],
            ["3.5% withdrawal rate", "59"],
            ["3% withdrawal rate", "61"],
            ["4.5% withdrawal rate", "56"],
          ]}
        />
      </GuideSection>

      <GuideSection id="spending" n={8} kicker="Spending" title="Spending is the strongest lever">
        <p>
          Cutting spending works twice: you save more now, and you need a smaller pot later.
        </p>
        <DataTable
          caption="Same saving of £1,000 a month, from 35"
          head={["Spending a year", "Target", "FI age"]}
          numeric={[1, 2]}
          rows={[
            ["£20,000", "£332,513", "51"],
            ["£25,000", "£436,600", "54"],
            ["£30,000", "£529,599", "58"],
            ["£40,000", "£731,848", "63"],
          ]}
        />
        <p>
          Housing is the biggest cost for most people. Paying off a mortgage before you stop work can cut the spending you need to cover, and
          with it your target.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={9} kicker="Assumptions" title="What return to assume">
        <p>
          The calculator uses a <strong>real</strong> return, meaning after inflation and charges. Over long periods, a global share fund has
          historically returned roughly 4% to 5% a year above inflation, while a mix of shares and bonds has returned less. These figures are
          not guaranteed and vary a lot from decade to decade. A 4% real return is a common middle assumption; test 3% to see a cautious case.
        </p>
        <p>
          At 4% real, £50,000 grows to about £109,556 in today&rsquo;s money over 20 years with nothing added.
        </p>
      </GuideSection>

      <GuideSection id="access" n={10} kicker="Rules" title="When you can reach your money">
        <Timeline
          items={[
            { when: "Any age", what: "ISAs and general investment accounts", detail: "You can withdraw at any time." },
            { when: "60", what: "Lifetime ISA", detail: "Withdraw without the 25% charge from 60, or earlier for a first home." },
            { when: "55, or 57 from April 2028", what: "Private and workplace pensions", detail: "The normal minimum pension age rises to 57 on 6 April 2028." },
            { when: "66 to 68", what: "State Pension", detail: "Depends on your date of birth." },
          ]}
        />
      </GuideSection>

      <GuideSection id="wrappers" n={11} kicker="Structure" title="Pensions, ISAs and the bridge">
        <p>
          Pensions give tax relief on the way in, and employers often add to them, which makes them powerful. But you cannot touch them until
          the minimum pension age. ISAs give no relief on the way in, but are tax-free and accessible at any time.
        </p>
        <p>
          A common FIRE plan uses both: pensions for life after 57, and ISAs to bridge the years from stopping work to that age. If you plan to
          stop at 50, your ISAs and other savings need to cover seven years of spending, plus any gap until the State Pension. The{" "}
          <a href="/investing/pension-tax-relief">pension tax relief calculator</a> shows how much relief you get.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={12} kicker="Tax" title="Tax in early retirement">
        <ul>
          <li>Withdrawals from ISAs are tax-free.</li>
          <li>Usually 25% of a pension can be taken tax-free, up to £268,275 in total. The rest is taxed as income.</li>
          <li>The Personal Allowance (£12,570) means a modest pension income can be taxed lightly, especially before the State Pension starts.</li>
          <li>Gains and dividends outside an ISA or pension are taxed above the £3,000 and £500 allowances.</li>
        </ul>
        <p>
          The calculator does not model tax. Enter your spending after tax, and remember that pension withdrawals above your allowances will
          need a little extra to cover the tax.
        </p>
      </GuideSection>

      <GuideSection id="coast" n={13} kicker="Variations" title="Coast FI and other flavours">
        <p>
          <strong>Coast FI</strong> is the pot that, with no more saving, would grow to cover your retirement at State Pension age. In our
          example it is £124,371 at 35. Once you pass it, you only need to earn enough to cover today&rsquo;s spending.
        </p>
        <ul>
          <li><strong>Lean FIRE:</strong> a lower spending target, for a simple lifestyle.</li>
          <li><strong>Fat FIRE:</strong> a higher target, with more room for travel and treats.</li>
          <li><strong>Barista FIRE:</strong> part-time work covers some spending, so the pot can be smaller.</li>
        </ul>
      </GuideSection>

      <GuideSection id="risks" n={14} kicker="Risks" title="Risks to plan for">
        <ul>
          <li><strong>Sequence of returns:</strong> a market fall in the first few years of withdrawals does lasting damage. Some people hold one to two years of spending in cash.</li>
          <li><strong>Inflation:</strong> a burst of high inflation raises your spending faster than expected.</li>
          <li><strong>Rule changes:</strong> pension ages, tax allowances and the State Pension can all change.</li>
          <li><strong>Health and care costs:</strong> later life can bring costs that are hard to predict.</li>
          <li><strong>Lost work options:</strong> returning to work after a long break can be harder than expected.</li>
        </ul>
      </GuideSection>

      <GuideSection id="steps" n={15} kicker="How to" title="Getting started">
        <ol>
          <li>Track your spending for a few months to find your real yearly figure.</li>
          <li>Clear expensive debt and build an emergency fund.</li>
          <li>Take any employer pension match in full.</li>
          <li>Use your £20,000 ISA allowance for money you may need before 57.</li>
          <li>Invest in low-cost, diversified funds and keep charges low.</li>
          <li>Recheck your plan every year with this calculator.</li>
        </ol>
      </GuideSection>

      <GuideSection id="savings-rate" n={16} kicker="Habits" title="Your savings rate">
        <p>
          The share of your take-home pay that you save is the single best guide to how long FIRE will take. It matters more than your
          income, because a higher savings rate means both more going in and less spending to replace.
        </p>
        <DataTable
          caption="Years to financial independence from nothing, 4% real return and 4% withdrawals, no State Pension"
          head={["Savings rate", "Years to FI"]}
          numeric={[1]}
          rows={[
            ["10%", "59"],
            ["20%", "41"],
            ["30%", "31"],
            ["50%", "18"],
            ["70%", "9"],
          ]}
        />
        <p>
          The table holds for any income, because it compares spending with saving. Going from 20% to 30% saves about ten years; going from
          30% to 50% saves another thirteen. Even small rises, such as saving half of every pay rise, add up.
        </p>
      </GuideSection>

      <GuideSection id="drawing" n={17} kicker="Income" title="Drawing an income">
        <p>
          Once you reach your number, you need a plan for turning the pot into income. The simplest is to take your withdrawal rate from the
          pot in the first year, then raise that amount with inflation each year. More flexible plans adjust the amount to how markets have
          done.
        </p>
        <ul>
          <li><strong>Fixed real withdrawals:</strong> steady and easy to budget, but they ignore how markets are doing.</li>
          <li><strong>Guardrails:</strong> cut spending by, say, 10% after a bad year and raise it after a good one. This makes the pot last much longer.</li>
          <li><strong>Cash buffer:</strong> hold a year or two of spending in cash, so you are not forced to sell after a fall.</li>
          <li><strong>Annuity later:</strong> some people buy a guaranteed income for life with part of the pot in their 70s.</li>
        </ul>
        <p>
          Take free, impartial guidance from Pension Wise before you take money from a defined contribution pension, especially the first time.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Underestimating spending.</strong> Include irregular costs such as car replacement, home repairs and holidays.</li>
          <li><strong>Mixing today&rsquo;s money and future pounds.</strong> Use a real return if you enter spending in today&rsquo;s prices.</li>
          <li><strong>Forgetting the pension access age.</strong> Money locked in a pension cannot fund your fifties.</li>
          <li><strong>Assuming a full State Pension.</strong> Stopping work early may leave gaps in your National Insurance record.</li>
          <li><strong>Ignoring charges.</strong> A 1% yearly charge can take a fifth or more of a pot over 25 years.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4%", label: "Classic safe withdrawal rate" },
            { value: "25×", label: "Spending needed at 4%" },
            { value: "£241.30", label: "Full new State Pension a week" },
            { value: "35 years", label: "NI record for the full amount" },
            { value: "57", label: "Pension access age from April 2028" },
            { value: "£20,000", label: "ISA allowance a year" },
            { value: "£268,275", label: "Most tax-free cash from pensions" },
            { value: "£12,570", label: "Personal Allowance" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
