import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, type Source, type TocItem } from "@/components/guide/Guide";

/** Debt payoff — the guide. Figures from payoffPlan and amortize in src/lib/us/loans.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How a debt payoff plan works" },
  { id: "avalanche", title: "The avalanche method" },
  { id: "snowball", title: "The snowball method" },
  { id: "example", title: "A worked example" },
  { id: "order", title: "When each debt is cleared" },
  { id: "rollover", title: "Why rolling over minimums matters" },
  { id: "extra", title: "How much extra to pay" },
  { id: "which", title: "Which method should you choose?" },
  { id: "hybrid", title: "Mixing the two" },
  { id: "list", title: "Listing your debts" },
  { id: "rates", title: "Typical interest rates" },
  { id: "consolidate", title: "Consolidation and balance transfers" },
  { id: "special", title: "Debts to treat differently" },
  { id: "emergency", title: "Emergency savings first" },
  { id: "find-money", title: "Finding extra money" },
  { id: "credit", title: "Your credit score along the way" },
  { id: "help", title: "If the numbers do not work" },
  { id: "after", title: "When you are debt-free" },
  { id: "first-month", title: "Your first month, step by step" },
  { id: "gap", title: "When the methods differ most" },
  { id: "consolidate-example", title: "What consolidation would do" },
  { id: "motivation", title: "Staying motivated" },
  { id: "taxes", title: "Forgiven debt and taxes" },
  { id: "bankruptcy", title: "Bankruptcy as a last resort" },
  { id: "dti", title: "Debt payoff and borrowing later" },
  { id: "medical", title: "Medical bills and debts in collection" },
  { id: "couples", title: "Paying off debt as a couple" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB — Credit cards: answers to common questions", href: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" },
  { label: "Federal Reserve — Consumer Credit G.19", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "FTC — How to get out of debt", href: "https://consumer.ftc.gov/articles/how-get-out-debt" },
  { label: "CFPB — Debt collection", href: "https://www.consumerfinance.gov/consumer-tools/debt-collection/" },
  { label: "Federal Student Aid — Repayment plans", href: "https://studentaid.gov/manage-loans/repayment/plans" },
];

export default function DebtPayoffGuide() {
  return (
    <Guide
      kicker="The debt payoff guide"
      title="Snowball or avalanche: how to clear your debts"
      intro={
        <>
          When you owe money on several cards and loans, the order you pay them off changes how long it takes and how much interest you pay. This
          guide explains the two best-known plans, the debt avalanche and the debt snowball, with a worked example, and covers how much extra to
          pay, when to consolidate and which debts to treat differently.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Pay the minimum on every debt, and put every extra dollar on one target debt.</li>
          <li>The <strong>avalanche</strong> targets the highest APR first and always costs the least interest.</li>
          <li>The <strong>snowball</strong> targets the smallest balance first, so whole debts disappear sooner.</li>
          <li>In our example, four debts of {usd(20_200)} with {usd(200)} extra a month are cleared in 29 months either way; the avalanche saves {usd(346)}.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(3_422), label: "Interest with the avalanche" },
            { value: usd(3_768), label: "Interest with the snowball" },
            { value: "29 months", label: "To debt-free with $200 extra" },
            { value: "56 months", label: "Paying each minimum with no plan" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How a debt payoff plan works">
        <p>Every payoff plan uses the same three rules:</p>
        <ol>
          <li>Set a fixed monthly budget: all your minimum payments plus whatever extra you can afford.</li>
          <li>Pay the minimum on every debt each month, so nothing goes late.</li>
          <li>Put everything left on one target debt. When it is paid off, its minimum joins the extra and goes to the next target.</li>
        </ol>
        <p>
          The amount you put toward debt grows each time a debt is cleared, like a snowball rolling downhill. The only difference between the
          methods is which debt you target first.
        </p>
      </GuideSection>

      <GuideSection id="avalanche" n={3} kicker="Methods" title="The avalanche method">
        <p>
          The avalanche lists debts from the highest interest rate to the lowest. Because each extra dollar goes where it stops the most interest,
          it is mathematically the cheapest way to pay off debt, and it is never slower than the snowball in total. Its drawback is that the first
          target may be a large balance, so it can take a while before any debt disappears.
        </p>
      </GuideSection>

      <GuideSection id="snowball" n={4} kicker="Methods" title="The snowball method">
        <p>
          The snowball lists debts from the smallest balance to the largest, whatever the rate. Clearing small debts early cuts the number of bills
          you juggle and gives quick wins, which many people find keeps them going. It usually costs somewhat more interest than the avalanche,
          and the gap grows when a large debt also has a high rate.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example">
        <DataTable
          caption="Four debts, $630 of minimums plus $200 extra a month"
          head={["Debt", "Balance", "APR", "Minimum"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Visa card", "$6,000", "24%", "$180"],
            ["Store card", "$1,200", "29%", "$40"],
            ["Car loan", "$9,000", "7.5%", "$280"],
            ["Personal loan", "$4,000", "12%", "$130"],
          ]}
        />
        <CompareCards
          columns={[
            { name: "Avalanche", rows: [{ label: "Order", value: "Store card, Visa, personal loan, car loan" }, { label: "Debt-free in", value: "29 months" }, { label: "Interest", value: usd(3_422) }] },
            { name: "Snowball", rows: [{ label: "Order", value: "Store card, personal loan, Visa, car loan" }, { label: "Debt-free in", value: "29 months" }, { label: "Interest", value: usd(3_768) }] },
          ]}
        />
        <p>
          Both methods start with the store card, which is both the smallest and the most expensive. After that the avalanche attacks the 24%
          Visa card while the snowball clears the smaller 12% personal loan first. The avalanche saves {usd(346)}.
        </p>
      </GuideSection>

      <GuideSection id="order" n={6} kicker="Real numbers" title="When each debt is cleared">
        <DataTable
          caption="Month each debt is paid off"
          head={["Debt", "Avalanche", "Snowball"]}
          numeric={[1, 2]}
          rows={[
            ["Store card", "Month 6", "Month 6"],
            ["Visa card", "Month 22", "Month 26"],
            ["Personal loan", "Month 25", "Month 16"],
            ["Car loan", "Month 29", "Month 29"],
          ]}
        />
        <p>
          The snowball clears a second debt nine months earlier (month 16 against 25), which is the psychological win it is known for. The
          avalanche pays off the expensive Visa card four months sooner, which is where its interest saving comes from.
        </p>
      </GuideSection>

      <GuideSection id="rollover" n={7} kicker="Why it works" title="Why rolling over minimums matters">
        <Figure label="Interest on the example debts" caption="Same debts; the first two pay $630 a month in minimums with no extra.">
          <Bars
            format={usd}
            items={[
              { label: "Each minimum, no roll-over", value: 6_832 },
              { label: "Minimums rolled over", value: 6_323 },
              { label: "Avalanche, $200 extra", value: 3_422 },
              { label: "Avalanche, $500 extra", value: 2_180 },
            ]}
          />
        </Figure>
        <p>
          Simply paying each minimum until each debt is gone takes 56 months and costs {usd(6_832)}. Keeping the same {usd(630)} budget and
          rolling each cleared minimum on to the next debt cuts that to 43 months and {usd(6_323)}, before you add a single extra dollar.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={8} kicker="Budget" title="How much extra to pay">
        <DataTable
          caption="The example debts with different extra amounts"
          head={["Extra a month", "Avalanche", "Snowball"]}
          numeric={[1, 2]}
          rows={[
            ["$0", `43 months, ${usd(6_323)}`, `43 months, ${usd(6_323)}`],
            ["$200", `29 months, ${usd(3_422)}`, `29 months, ${usd(3_768)}`],
            ["$500", `20 months, ${usd(2_180)}`, `21 months, ${usd(2_458)}`],
          ]}
        />
        <p>
          The extra amount matters far more than the method. Going from $0 to $200 extra saves about {usd(2_900)} of interest; choosing the
          avalanche over the snowball saves a few hundred more.
        </p>
      </GuideSection>

      <GuideSection id="which" n={9} kicker="Decision" title="Which method should you choose?">
        <ul>
          <li>Choose the <strong>avalanche</strong> if you are motivated by numbers and your highest-rate debt is not huge.</li>
          <li>Choose the <strong>snowball</strong> if you have many small debts, have tried and stopped before, or need early wins to stay on track.</li>
          <li>If your smallest debt also has the highest rate, the two methods start the same way.</li>
        </ul>
        <p>The best plan is the one you will stick with: a snowball you finish beats an avalanche you abandon.</p>
      </GuideSection>

      <GuideSection id="hybrid" n={10} kicker="Decision" title="Mixing the two">
        <p>
          Many people clear one or two tiny balances first for momentum, then switch to the highest rate. Run both methods in the calculator and
          look at the difference: if it is small, choose whichever order feels better.
        </p>
      </GuideSection>

      <GuideSection id="list" n={11} kicker="Getting started" title="Listing your debts">
        <p>
          Gather your latest statements and write down each balance, APR and minimum payment. Include credit cards, store cards, personal loans,
          car loans, medical bills on payment plans and private student loans. Pull your free credit reports at AnnualCreditReport.com to check you
          have not missed any accounts. Leave out your mortgage: it usually has a low rate and is best paid on schedule.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={12} kicker="Context" title="Typical interest rates">
        <p>
          The Federal Reserve&rsquo;s G.19 survey shows why cards are usually first in line: in August 2026 banks charged about 22% on cards that
          paid interest, about 11.9% on 24-month personal loans and about 7.2% on 72-month new car loans. The{" "}
          <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a> looks at a single card in more detail.
        </p>
      </GuideSection>

      <GuideSection id="consolidate" n={13} kicker="Options" title="Consolidation and balance transfers">
        <p>
          A debt consolidation loan or a 0% balance transfer card can lower the rate on your most expensive debts. That helps only if the new rate,
          after fees, is lower and you stop adding new debt. Compare the total cost with the{" "}
          <a href="/us/loans/loan-calculator">loan calculator</a>, then enter the new loan here as one debt in place of the ones it replaces.
        </p>
      </GuideSection>

      <GuideSection id="special" n={14} kicker="Options" title="Debts to treat differently">
        <ul>
          <li><strong>Federal student loans</strong> have income-driven plans and forgiveness options; see the <a href="/us/loans/student-loan-calculator">student loan calculator</a> before paying them early.</li>
          <li><strong>Low-rate car loans</strong> and mortgages usually come last.</li>
          <li><strong>Tax debts</strong> to the IRS carry penalties and interest; set up a payment plan with the IRS.</li>
          <li><strong>Debts in collection</strong>: check the debt is yours and within the statute of limitations before paying.</li>
        </ul>
      </GuideSection>

      <GuideSection id="emergency" n={15} kicker="Safety" title="Emergency savings first">
        <p>
          Without some cash set aside, the next car repair goes back on a card. Many advisers suggest a starter emergency fund of about $1,000
          or one month of expenses before attacking debt hard, and capturing any 401(k) employer match, which is an instant return.
        </p>
      </GuideSection>

      <GuideSection id="find-money" n={16} kicker="Budget" title="Finding extra money">
        <p>
          Look at subscriptions, insurance quotes, phone plans and eating out. Send windfalls such as tax refunds and bonuses straight to the target
          debt. If you usually get a big refund, adjusting your W-4 puts that money in each paycheck instead; the{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a> shows the effect.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={17} kicker="Credit" title="Your credit score along the way">
        <p>
          Paying on time is the biggest part of your credit score, so never skip a minimum. As card balances fall, your credit utilization falls and
          your score usually rises. Avoid closing paid-off cards with no annual fee, which can raise utilization.
        </p>
      </GuideSection>

      <GuideSection id="help" n={18} kicker="Help" title="If the numbers do not work">
        <p>
          If your minimums alone are more than you can pay, talk to your lenders about hardship programs, or to a nonprofit credit counseling agency
          about a debt management plan. Be careful with debt settlement companies: they can hurt your credit, and the FTC warns against any that
          charge fees before settling a debt.
        </p>
        <Callout tone="warn" title="Watch for minimums below the interest">
          If a debt&rsquo;s minimum payment is less than its monthly interest, the balance grows on its own. The calculator flags this.
        </Callout>
      </GuideSection>

      <GuideSection id="after" n={19} kicker="Next" title="When you are debt-free">
        <Timeline
          items={[
            { when: "Month 1", what: "Keep the budget", detail: "Send the same monthly amount to savings instead." },
            { when: "Months 2 to 6", what: "Build an emergency fund", detail: "Aim for three to six months of expenses." },
            { when: "After that", what: "Save and invest", detail: "Raise retirement savings and plan for big purchases in cash." },
          ]}
        />
      </GuideSection>

      <GuideSection id="first-month" n={20} kicker="Real numbers" title="Your first month, step by step">
        <p>
          In the example, the first month&rsquo;s interest is $120.00 on the Visa card, $29.00 on the store card, $56.25 on the car loan and
          $40.00 on the personal loan: $245.25 in all. Your {usd(830)} budget pays the {usd(630)} of minimums, and the extra {usd(200)} goes to
          the target debt, the store card under both methods. Of the {usd(830)}, about $585 goes to principal.
        </p>
        <p>
          Each month the interest falls as the balances fall, so more of the same {usd(830)} goes to principal. That is why progress feels slow at
          first and much faster towards the end.
        </p>
      </GuideSection>

      <GuideSection id="gap" n={21} kicker="Real numbers" title="When the methods differ most">
        <p>
          The gap between the two methods grows when your largest debt also has the highest rate. Take three debts: {usd(15_000)} on a card at
          26% (minimum {usd(450)}), {usd(800)} at 10% (minimum {usd(30)}) and {usd(2_500)} at 14% (minimum {usd(75)}), with {usd(300)} extra a
          month.
        </p>
        <CompareCards
          columns={[
            { name: "Avalanche", rows: [{ label: "Debt-free in", value: "28 months" }, { label: "Interest", value: usd(5_571) }] },
            { name: "Snowball", rows: [{ label: "Debt-free in", value: "29 months" }, { label: "Interest", value: usd(6_268) }] },
          ]}
        />
        <p>
          Here the snowball spends months on small, cheap debts while the 26% card keeps charging, and the avalanche saves {usd(697)}.
        </p>
      </GuideSection>

      <GuideSection id="consolidate-example" n={22} kicker="Options" title="What consolidation would do">
        <p>
          In the main example, replacing the Visa card and store card ({usd(7_200)} in all) with a 12% consolidation loan with a {usd(220)}
          minimum, and keeping the same {usd(830)} monthly budget, clears everything in 28 months with {usd(2_366)} of interest, against{" "}
          {usd(3_422)} with the avalanche. That ignores any origination fee, which can be several percent of the loan, so include it before you
          decide. It also only works if the paid-off cards are not used again.
        </p>
      </GuideSection>

      <GuideSection id="motivation" n={23} kicker="Habits" title="Staying motivated">
        <ul>
          <li>Write down your debt-free date from the calculator and put it where you will see it.</li>
          <li>Track the total balance each month; a falling line is encouraging even when no single debt is gone.</li>
          <li>Celebrate each debt you clear, cheaply.</li>
          <li>Automate the minimums so a busy month never causes a late fee.</li>
          <li>Rerun the plan when something changes, such as a raise, a new rate or an unexpected bill.</li>
        </ul>
      </GuideSection>

      <GuideSection id="taxes" n={24} kicker="Tax" title="Forgiven debt and taxes">
        <p>
          If a lender cancels or settles part of a debt for less than you owe, the amount forgiven is generally taxable income, and you may get a
          Form 1099-C. There are exceptions, for example if you were insolvent (your debts were more than your assets) just before the debt was
          cancelled. Keep this in mind before agreeing to a settlement.
        </p>
      </GuideSection>

      <GuideSection id="bankruptcy" n={25} kicker="Help" title="Bankruptcy as a last resort">
        <p>
          If your debts are far more than you can ever repay, bankruptcy may be an option. Chapter 7 can wipe out many unsecured debts but may
          require selling some assets; Chapter 13 sets up a three- to five-year repayment plan. Both stay on your credit report for years, and
          most student loans and recent taxes are hard to discharge. Talk to a nonprofit credit counselor or a bankruptcy attorney first; you
          must take a credit counseling course before filing.
        </p>
      </GuideSection>

      <GuideSection id="dti" n={26} kicker="Credit" title="Debt payoff and borrowing later">
        <p>
          Lenders look at your debt-to-income ratio, your monthly debt payments as a share of your gross income, when you apply for a mortgage or
          car loan. Each debt you clear lowers it. The <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a> shows where you
          stand now and after each debt is gone.
        </p>
      </GuideSection>

      <GuideSection id="medical" n={27} kicker="Options" title="Medical bills and debts in collection">
        <p>
          Medical bills often carry no interest if you set up a payment plan directly with the hospital or provider, so they can usually sit at the
          end of your list. Ask about financial assistance too: nonprofit hospitals must have a written policy for patients who cannot pay. For
          debts in collection, ask the collector to validate the debt in writing, check that it is yours and the amount is right, and get any
          payment deal in writing before you pay.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={28} kicker="Planning" title="Paying off debt as a couple">
        <p>
          List both partners&rsquo; debts together and agree on one budget and one method. Joint debts are owed in full by each of you, while debts
          in one name are usually that person&rsquo;s alone, though they still affect the household budget. Agreeing on the plan, and on how
          much each of you puts in, avoids arguments later. Running the calculator together with your combined debts gives you a shared debt-free
          date to aim for.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={29} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Example debts", "$20,200 across four debts"],
            ["Avalanche with $200 extra", "29 months, $3,422 interest"],
            ["Snowball with $200 extra", "29 months, $3,768 interest"],
            ["Average card APR, accounts charged interest (Aug 2026)", "about 22%"],
            ["Average 24-month personal loan rate at banks (Aug 2026)", "about 11.9%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
