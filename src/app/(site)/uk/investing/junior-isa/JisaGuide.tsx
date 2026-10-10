import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Junior ISA — the guide. Figures from src/lib/investing/savings.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a Junior ISA is" },
  { id: "who", title: "Who can open and pay in" },
  { id: "types", title: "Cash or stocks and shares?" },
  { id: "examples", title: "Worked examples" },
  { id: "time", title: "Why starting early matters" },
  { id: "fees", title: "Fees and how much they cost" },
  { id: "rule-100", title: "The £100 rule for parents" },
  { id: "alternatives", title: "Other ways to save for a child" },
  { id: "ctf", title: "Child Trust Funds" },
  { id: "at-16", title: "From 16: the child takes control" },
  { id: "at-18", title: "At 18: the money is theirs" },
  { id: "grandparents", title: "Gifts from grandparents" },
  { id: "choosing-provider", title: "Choosing a provider" },
  { id: "investing", title: "Choosing investments" },
  { id: "goals", title: "Setting a savings goal" },
  { id: "benefits", title: "Junior ISAs and benefits" },
  { id: "family-plan", title: "Making a family plan" },
  { id: "tracking", title: "Keeping track of a Junior ISA" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Junior Individual Savings Accounts (ISA)", href: "https://www.gov.uk/junior-individual-savings-accounts" },
  { label: "GOV.UK — Child Trust Fund", href: "https://www.gov.uk/child-trust-funds" },
  { label: "GOV.UK — Tax on children's savings", href: "https://www.gov.uk/tax-on-savings-interest" },
  { label: "MoneyHelper — Junior ISAs", href: "https://www.moneyhelper.org.uk/en/family-and-care/becoming-a-parent/junior-isas" },
];

export default function JisaGuide() {
  return (
    <Guide
      kicker="The Junior ISA guide"
      title="Saving for a child with a Junior ISA"
      intro={
        <>
          A Junior <a href="/uk/investing/isa-vs-gia">ISA</a>{" "}is a tax-free savings or investment account for a child, locked until they turn 18. Small regular amounts paid in from birth
          can grow into a meaningful sum for university, a first car or a house deposit. This guide explains how Junior ISAs work, how cash and
          investment versions compare, what fees do over 18 years, and what happens when your child takes control.
        </>
      }
      meta={["2026/27 rules", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Up to <strong>£9,000 a year</strong> can go into a child&rsquo;s Junior ISAs, from anyone.</li>
          <li>Interest, dividends and gains are <strong>tax-free</strong>.</li>
          <li>£100 a month from birth, growing at 5% a year, could reach about <strong>£34,500</strong> by 18, from £21,600 paid in.</li>
          <li>The money belongs to the child and cannot be taken out before 18.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£9,000", label: "Yearly allowance" },
            { value: "18", label: "Age the money is released" },
            { value: "16", label: "Age the child can manage it" },
            { value: "£0", label: "Tax on growth" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a Junior ISA is">
        <p>
          A Junior ISA is a long-term, tax-free account for a child under 18 who lives in the UK. A child can have one cash Junior ISA and one stocks
          and shares Junior ISA at the same time, and the £9,000 allowance is shared between them. You can transfer between providers without losing
          the tax-free status.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Opening" title="Who can open and pay in">
        <p>
          A parent or legal guardian opens the account. Once it is open, anyone can pay in: parents, grandparents, other relatives and friends. The
          child can open their own from age 16. Money paid in is a gift to the child, so it cannot be taken back.
        </p>
      </GuideSection>

      <GuideSection id="types" n={4} kicker="Choice" title="Cash or stocks and shares?">
        <CompareCards
          columns={[
            {
              name: "Cash Junior ISA",
              rows: [
                { label: "Return", value: "Interest, currently around 3% to 4%" },
                { label: "Risk", value: "No loss, but may not beat inflation" },
                { label: "Best for", value: "Shorter time frames or low risk" },
              ],
            },
            {
              name: "Stocks and shares Junior ISA",
              rows: [
                { label: "Return", value: "Varies; can fall as well as rise" },
                { label: "Risk", value: "Short-term losses are common" },
                { label: "Best for", value: "Long time frames, such as from birth" },
              ],
            },
          ]}
        />
        <p>
          Over 18 years, shares have historically beaten cash in most periods, but with no guarantee. Many parents invest for the early years and
          move some into cash as 18 gets closer.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£100 a month from birth, 5% a year"
          steps={[
            { label: "Paid in over 18 years", value: "£21,600" },
            { label: "Growth", value: "£12,926" },
          ]}
          total={{ label: "Value at 18", value: "£34,526" }}
        />
        <WorkedExample
          title="£50 a month from birth, 5% a year"
          steps={[
            { label: "Paid in", value: "£10,800" },
            { label: "Growth", value: "£6,463" },
          ]}
          total={{ label: "Value at 18", value: "£17,263" }}
        />
        <p>
          The same £100 a month at 2% would reach £25,929. Paying in the full £750 a month at 5% would reach about £258,943. A single £1,000 gift at
          birth, growing at 5%, would be worth about £2,407 at 18.
        </p>
      </GuideSection>

      <GuideSection id="time" n={6} kicker="Compounding" title="Why starting early matters">
        <p>
          With <a href="/uk/investing/compound-interest">compound growth</a>, money paid in early has longest to grow. In the £100-a-month example, the payments made in the first five years
          end up worth far more than those in the last five. If you can only afford to save for part of a child&rsquo;s childhood, the early years
          matter most. Use the calculator&rsquo;s chart to see how the gap between paid in and value widens with age.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={7} kicker="Charges" title="Fees and how much they cost">
        <p>
          Stocks and shares Junior ISAs charge platform and fund fees, usually 0.2% to 1% a year in total. Over 18 years they add up: on £100 a
          month, cutting yearly growth from 5% to 4.5% with 0.5% fees reduces the value at 18 from £34,526 to £32,885, about £1,640 less. Low-cost index funds keep charges
          down. Cash Junior ISAs have no fees, but rates vary, so check yours each year.
        </p>
      </GuideSection>

      <GuideSection id="rule-100" n={8} kicker="Tax" title="The £100 rule for parents">
        <p>
          Children have their own Personal Allowance and savings allowances, but there is an anti-avoidance rule: if money given by a parent earns
          more than £100 of income a year outside an ISA, all of that income is taxed as the parent&rsquo;s. Junior ISAs and Child Trust Funds are
          exempt, which is one reason they are the usual way for parents to save for a child. Gifts from grandparents and others are not caught.
        </p>
      </GuideSection>

      <GuideSection id="alternatives" n={9} kicker="Options" title="Other ways to save for a child">
        <ul>
          <li><strong>Children&rsquo;s savings accounts:</strong> easy access, but subject to the £100 rule for parents&rsquo; money.</li>
          <li><strong><a href="/uk/investing/premium-bonds">Premium Bonds</a>:</strong> can be bought for a child under 16 by a parent or grandparent; prizes are tax-free.</li>
          <li><strong>Junior SIPP:</strong> a pension for a child, with tax relief, but locked until at least 57.</li>
          <li><strong>Saving in your own ISA:</strong> keeps control with you, and uses your own £20,000 allowance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="ctf" n={10} kicker="Older accounts" title="Child Trust Funds">
        <p>
          Children born between 1 September 2002 and 2 January 2011 were given a Child Trust Fund with a government voucher. Many are still unclaimed.
          A Child Trust Fund can be transferred into a Junior ISA, which may offer better rates or lower fees. Young people aged 18 or over can find a
          lost Child Trust Fund through GOV.UK.
        </p>
      </GuideSection>

      <GuideSection id="at-16" n={11} kicker="Teenagers" title="From 16: the child takes control">
        <Timeline
          items={[
            { when: "At 16", what: "Child can manage the account", detail: "They can choose investments and open their own Junior ISA, but still cannot withdraw." },
            { when: "At 18", what: "Account becomes an adult ISA", detail: "The money is theirs to keep, invest or spend." },
            { when: "From 18", what: "Lifetime ISA possible", detail: "Saving for a first home with a 25% government bonus, from 18 to 39." },
          ]}
        />
      </GuideSection>

      <GuideSection id="at-18" n={12} kicker="Adulthood" title="At 18: the money is theirs">
        <p>
          On the 18th birthday the Junior ISA automatically becomes an adult ISA in the young person&rsquo;s name, still tax-free. Parents have no
          say in how it is used. Talking about the money early, and what it is for, helps. Some young people move it into a Lifetime ISA, up to
          £4,000 a year, to get the 25% bonus towards a first home.
        </p>
        <Callout title="Means-tested support">
          A large Junior ISA does not affect student loans, which depend on household income, but once it is an adult ISA it counts as savings for
          means-tested benefits such as <a href="/uk/benefits/universal-credit">Universal Credit</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="grandparents" n={13} kicker="Family" title="Gifts from grandparents">
        <p>
          Grandparents can pay straight into a Junior ISA. For inheritance tax, regular gifts out of surplus income are exempt, and anyone can give
          £3,000 a year plus small gifts of up to £250 per person. Larger gifts are fine too, but count towards the donor&rsquo;s estate if they die
          within 7 years. See the <a href="/uk/life/inheritance-tax">inheritance tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="choosing-provider" n={14} kicker="Practical" title="Choosing a provider">
        <p>
          Junior ISAs are offered by banks, building societies, investment platforms and fund managers. When you compare them, look at:
        </p>
        <ul>
          <li><strong>For cash:</strong> the interest rate, whether it is variable, and whether you can pay in by standing order.</li>
          <li><strong>For investments:</strong> the platform fee, the fund charges, the minimum monthly payment and the range of funds, especially low-cost index funds.</li>
          <li><strong>For both:</strong> whether relatives can pay in easily, for example by a shared payment link, and whether transfers in and out are free.</li>
        </ul>
        <p>
          Many providers let you start with as little as £10 or £25 a month. You can switch provider at any time by asking the new provider to arrange
          a transfer; do not close the old account yourself, or the money loses its tax-free status.
        </p>
      </GuideSection>

      <GuideSection id="investing" n={15} kicker="Investing" title="Choosing investments">
        <p>
          For an 18-year horizon, many parents choose a global index tracker fund, which spreads the money across thousands of companies at a low
          cost. Others use a ready-made multi-asset fund that holds a mix of shares and bonds. Either way, the main risks are short-term falls in value
          and high charges. Some parents gradually move the money into cash from about age 14 or 15, so a market fall close to 18 does not leave less
          than was paid in.
        </p>
        <p>
          Ethical and sustainable funds are widely available if you want the money invested in line with your values, though their charges and
          returns vary.
        </p>
      </GuideSection>

      <GuideSection id="goals" n={16} kicker="Planning" title="Setting a savings goal">
        <p>
          It can help to decide what the money is for. University living costs, a first car, a house deposit and travel all need different sums. Work
          backwards from the goal: the calculator shows what a monthly amount grows to, so try different payments until the value at 18 matches what you
          hope to give. Remember that the young person will decide how to spend it, so talking about the plan as they grow up matters as much as the
          number.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={17} kicker="Benefits" title="Junior ISAs and benefits">
        <p>
          Money in a Junior ISA belongs to the child, so it is not counted as the parents&rsquo; savings for Universal Credit or other means-tested
          benefits. It does not affect Child Benefit or <a href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</a>. Once the child is 18 and the account becomes an adult ISA, it counts as their
          own savings if they claim a means-tested benefit themselves.
        </p>
      </GuideSection>

      <GuideSection id="family-plan" n={18} kicker="Family" title="Making a family plan">
        <p>
          Grandparents and other relatives often want to give money for birthdays and Christmas. Sharing the Junior ISA details, or a payment link if
          your provider offers one, lets those gifts go straight into the account instead of into a bank account that earns little. Keep a simple note of
          who has paid in each tax year so the total stays within £9,000. If a relative wants to give more than the allowance, they can save in their own
          name and pass the money on later, or pay into a Junior SIPP, which has its own limit of £3,600 a year including tax relief.
        </p>
      </GuideSection>

      <GuideSection id="tracking" n={19} kicker="Practical" title="Keeping track of a Junior ISA">
        <p>
          Keep the account details, the provider&rsquo;s login and annual statements together, along with a note of who has paid in each year. Review the
          investments once a year: check the fees, the fund performance against similar funds, and whether the mix still suits your child&rsquo;s age. If you
          move house, update the provider, because lost accounts are common. Before the 18th birthday, help your child set up their own login so the
          account passes smoothly to them.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Junior ISAs, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Yearly allowance", "£9,000 (frozen until 2030)"],
            ["Age money is released", "18"],
            ["Age child can manage it", "16"],
            ["Tax on growth", "None"],
            ["Parental gift rule outside ISAs", "£100 of income a year"],
            ["Adult ISA allowance", "£20,000"],
            ["Lifetime ISA", "£4,000 a year, 25% bonus, age 18 to 39"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
