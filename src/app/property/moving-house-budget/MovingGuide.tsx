import {
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Moving house costs — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "overview", title: "The costs at a glance" },
  { id: "tax", title: "Stamp Duty, LBTT and LTT" },
  { id: "legal", title: "Legal fees and searches" },
  { id: "survey", title: "Surveys" },
  { id: "mortgage", title: "Mortgage fees" },
  { id: "selling", title: "Costs of selling" },
  { id: "removals", title: "Removals and setting up" },
  { id: "example-buyer", title: "Example: first-time buyer" },
  { id: "example-mover", title: "Example: buying and selling" },
  { id: "timeline", title: "When you pay each cost" },
  { id: "chain", title: "Chains, bridging and timing" },
  { id: "save", title: "Ways to cut the cost" },
  { id: "after", title: "Costs after you move in" },
  { id: "leasehold", title: "Extra costs for leasehold and new-build homes" },
  { id: "scotland", title: "Moving in Scotland" },
  { id: "checklist", title: "A moving checklist" },
  { id: "nations", title: "The same move in each nation" },
  { id: "contingency", title: "Why add a contingency?" },
  { id: "hidden", title: "Costs people forget" },
  { id: "renters", title: "Moving costs for renters" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Costs of buying a home", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/the-costs-of-buying-a-home" },
  { label: "GOV.UK — Stamp Duty Land Tax", href: "https://www.gov.uk/stamp-duty-land-tax" },
  { label: "GOV.UK — Buying or selling your home", href: "https://www.gov.uk/government/publications/buying-or-selling-your-home" },
  { label: "RICS — Home surveys", href: "https://www.rics.org/" },
  { label: "HM Land Registry — Registration fees", href: "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees" },
];

export default function MovingGuide() {
  return (
    <Guide
      kicker="The moving costs guide"
      title="What moving house really costs"
      intro={
        <>
          Beyond the deposit, buying a home comes with a long list of one-off costs: property tax, legal fees, surveys, mortgage
          fees, estate agents and removals. This guide explains each one, gives typical figures, shows two worked examples and
          sets out when each bill is due.
        </>
      }
      meta={["Updated for 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="overview" n={1} kicker="Overview" title="The costs at a glance">
        <DataTable
          caption="Typical one-off costs"
          head={["Cost", "Who pays", "Typical amount"]}
          rows={[
            ["Stamp Duty, LBTT or LTT", "Buyer", "£0 to tens of thousands"],
            ["Legal fees and searches", "Buyer and seller", "£1,200 to £2,000 each"],
            ["Survey", "Buyer", "£400 to £1,000+"],
            ["Mortgage fees", "Buyer", "£0 to £1,500"],
            ["Estate agent", "Seller", "1% to 1.5% plus VAT"],
            ["Energy Performance Certificate", "Seller", "£60 to £120"],
            ["Removals", "Both", "£400 to £2,000+"],
          ]}
        />
        <p>
          The calculator adds them up, works out your property tax from the price, and adds a contingency for the unexpected. If
          you are selling too, it shows how much your sale releases towards your next home.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={2} kicker="Tax" title="Stamp Duty, LBTT and LTT">
        <p>
          Property tax is usually the largest cost after the deposit. It depends on where you buy, the price and whether you are a
          first-time buyer, a home mover or buying an additional home.
        </p>
        <DataTable
          caption="Property tax on a £350,000 home, 2026/27"
          head={["Where", "First-time buyer", "Moving home", "Second home"]}
          numeric={[1, 2, 3]}
          rows={[
            ["England & NI (Stamp Duty)", "£2,500", "£7,500", "£25,000"],
            ["Scotland (LBTT)", "£7,750", "£8,350", "£36,350"],
            ["Wales (LTT)", "£7,500", "£7,500", "£24,950"],
          ]}
        />
        <p>Our Stamp Duty, LBTT and LTT calculators explain each tax in detail.</p>
      </GuideSection>

      <GuideSection id="legal" n={3} kicker="Legal" title="Legal fees and searches">
        <p>
          A conveyancer or solicitor handles the legal side: checking the title, raising enquiries, running searches, preparing
          contracts, transferring money and registering the new owner. Fees are often quoted as a fixed fee plus
          &quot;disbursements&quot;, which are costs paid to others:
        </p>
        <ul>
          <li><strong>Searches:</strong> local authority, water and drainage, and environmental, often £250 to £450 together.</li>
          <li><strong>Land Registry fee:</strong> to register you as owner, which rises with the price.</li>
          <li><strong>Bank transfer fees</strong> and identity checks.</li>
        </ul>
        <p>
          Leasehold, new-build, shared ownership and unregistered properties usually cost more. Check whether a quote includes
          VAT and disbursements.
        </p>
      </GuideSection>

      <GuideSection id="survey" n={4} kicker="Surveys" title="Surveys">
        <p>
          A lender&apos;s valuation only checks the home is worth what they are lending. A survey tells you about its condition.
          RICS surveys come in three levels:
        </p>
        <CompareCards
          columns={[
            { name: "Level 1", rows: [{ label: "Best for", value: "Newer homes in good condition" }, { label: "Covers", value: "Traffic-light condition ratings" }, { label: "Typical cost", value: "About £400" }] },
            { name: "Level 2", rows: [{ label: "Best for", value: "Most conventional homes" }, { label: "Covers", value: "Ratings plus advice on defects" }, { label: "Typical cost", value: "About £600" }] },
            { name: "Level 3", rows: [{ label: "Best for", value: "Older, larger or altered homes" }, { label: "Covers", value: "Detailed structure and repairs" }, { label: "Typical cost", value: "£1,000 or more" }] },
          ]}
        />
        <p>
          A survey can save far more than it costs, by uncovering problems you can negotiate on or walk away from. In Scotland the
          seller provides a Home Report, which includes a survey and valuation.
        </p>
      </GuideSection>

      <GuideSection id="mortgage" n={5} kicker="Mortgages" title="Mortgage fees">
        <ul>
          <li><strong>Arrangement or product fee:</strong> often £0 to £1,500. You can usually add it to the loan, but then you pay interest on it.</li>
          <li><strong>Valuation fee:</strong> many lenders now include it; some charge a few hundred pounds.</li>
          <li><strong>Broker fee:</strong> some brokers charge, others are paid by the lender.</li>
          <li><strong>Early repayment charge:</strong> if you leave your current mortgage during a fixed deal, unless you can port it to the new home.</li>
        </ul>
        <Callout title="Fee or no fee?">
          A deal with a big fee and a lower rate is often cheaper on larger loans. On smaller loans, a no-fee deal can be better.
          Compare the total cost over the fixed period.
        </Callout>
      </GuideSection>

      <GuideSection id="selling" n={6} kicker="Selling" title="Costs of selling">
        <p>
          High-street estate agents usually charge 1% to 1.5% of the sale price plus VAT. Online agents charge a fixed fee,
          often paid whether or not you sell. You also need an Energy Performance Certificate and your own conveyancer.
        </p>
        <WorkedExample
          title="Selling a £280,000 home"
          steps={[
            { label: "Estate agent at 1.2% plus VAT", value: "£4,032" },
            { label: "Legal fees for the sale", value: "£1,200" },
          ]}
          total={{ label: "Selling costs", value: "£5,232" }}
        />
        <p>If you have a mortgage on the home you sell, it is paid off from the sale, along with any early repayment charge.</p>
      </GuideSection>

      <GuideSection id="removals" n={7} kicker="Moving day" title="Removals and setting up">
        <p>
          A man and van for a flat might cost a few hundred pounds; a full removal service with packing for a four-bedroom house can
          cost £2,000 or more, especially over a long distance. Prices rise on Fridays and at month ends, when many completions
          happen.
        </p>
        <p>
          Then there is setting up: furniture, appliances, curtains and blinds, decorating, changing the locks, and perhaps storage
          if your dates do not line up. The calculator has an optional line for these.
        </p>
      </GuideSection>

      <GuideSection id="example-buyer" n={8} kicker="Worked example" title="Example: first-time buyer">
        <p>A first-time buyer in England paying £350,000 with a £50,000 deposit:</p>
        <WorkedExample
          title="Buying only"
          steps={[
            { label: "Stamp Duty", value: "£2,500" },
            { label: "Legal fees", value: "£1,500" },
            { label: "Level 2 survey", value: "£600" },
            { label: "Mortgage fee", value: "£999" },
            { label: "Removals", value: "£1,000" },
            { label: "10% contingency", value: "£660" },
          ]}
          total={{ label: "Moving costs", value: "£7,259" }}
        />
        <p>With the deposit, they need £57,259 in cash. As a home mover, the Stamp Duty would be £7,500 and the total £12,759.</p>
      </GuideSection>

      <GuideSection id="example-mover" n={9} kicker="Worked example" title="Example: buying and selling">
        <p>
          A home mover sells for £280,000 with £150,000 left on the mortgage, and buys for £350,000 with a £50,000 deposit:
        </p>
        <DataTable
          caption="Buying and selling in England"
          head={["", "Amount"]}
          numeric={[1]}
          rows={[
            ["Sale price", "£280,000"],
            ["Mortgage repaid", "−£150,000"],
            ["Selling costs", "−£5,232"],
            ["Equity released", "£124,768"],
            ["Deposit on the new home", "−£50,000"],
            ["Buying and moving costs", "−£13,282"],
            ["Left over", "£61,486"],
          ]}
        />
        <p>
          Here the sale covers everything with plenty to spare, which could go towards a bigger deposit and a lower mortgage rate.
          The buying and moving costs include £7,500 Stamp Duty and a 10% contingency on all costs.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={10} kicker="Timing" title="When you pay each cost">
        <Timeline
          items={[
            { when: "Offer accepted", what: "Mortgage and survey fees", detail: "Valuation and survey fees are paid up front, before you know the sale will go through." },
            { when: "During conveyancing", what: "Searches", detail: "Your conveyancer may ask for money on account to pay for searches." },
            { when: "Exchange", what: "Deposit", detail: "Usually 5% to 10% of the price is paid at exchange, when the deal becomes binding." },
            { when: "Completion", what: "Balance, tax and fees", detail: "The rest of the price, property tax, legal fees and estate agent's fee are paid on completion day." },
            { when: "Moving day", what: "Removals", detail: "Often paid on the day or shortly before." },
          ]}
        />
      </GuideSection>

      <GuideSection id="chain" n={11} kicker="Timing" title="Chains, bridging and timing">
        <p>
          Most home movers sell and buy on the same day so the sale money pays for the purchase. If your sale and purchase do not
          line up, you might need to rent briefly, use storage, or take a short-term bridging loan, which can be expensive.
        </p>
        <p>
          If you buy before you sell, you may also pay the higher rates of Stamp Duty for owning two homes, then claim them back
          once you sell within the time limit.
        </p>
      </GuideSection>

      <GuideSection id="save" n={12} kicker="Saving money" title="Ways to cut the cost">
        <ul>
          <li>Get at least three quotes for conveyancing, surveys and removals.</li>
          <li>Negotiate the estate agent&apos;s fee, or consider an online agent.</li>
          <li>Compare mortgage deals by total cost, not just the rate.</li>
          <li>Move midweek and mid-month when removals are cheaper.</li>
          <li>Declutter before you move: removal quotes depend on volume.</li>
          <li>Separate furniture and fittings in the price at a fair value to reduce property tax.</li>
        </ul>
      </GuideSection>

      <GuideSection id="after" n={13} kicker="Ongoing" title="Costs after you move in">
        <p>
          Budget for the first few months too: council tax from the day you move, buildings insurance from exchange (or completion
          for a leasehold flat), contents insurance, utilities, and any repairs found in the survey. Our council tax calculator
          shows what your new band will cost.
        </p>
      </GuideSection>

      <GuideSection id="leasehold" n={14} kicker="Property types" title="Extra costs for leasehold and new-build homes">
        <p>
          <strong>Leasehold flats</strong> add costs on both sides. The seller usually pays for a management information pack from
          the freeholder or managing agent, and the buyer&apos;s conveyancer has more work checking the lease, the service charge
          accounts and any planned major works. If the lease is short, a lease extension can cost thousands and may be needed
          before a lender will agree a mortgage.
        </p>
        <p>
          <strong>New-build homes</strong> usually need a reservation fee, often a few hundred to a few thousand pounds, taken off
          the price at completion. Many buyers pay for a snagging survey to list defects for the developer to fix. Exchange
          deadlines from developers can be short, so have your mortgage and conveyancer ready.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={15} kicker="Scotland" title="Moving in Scotland">
        <p>
          Buying in Scotland works differently. The seller provides a Home Report, which includes a survey, a valuation and an
          energy report, so buyers rarely pay for their own survey. Many homes are marketed at &quot;offers over&quot; a price,
          and a solicitor often acts as the estate agent too.
        </p>
        <p>
          The contract is formed through an exchange of letters called missives, and the deal becomes binding earlier than in
          England. You pay LBTT rather than Stamp Duty, and registration dues to the Registers of Scotland. Choose Scotland under
          More options in the calculator to use LBTT.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={16} kicker="Planning" title="A moving checklist">
        <Timeline
          items={[
            { when: "8 to 12 weeks before", what: "Book the essentials", detail: "Instruct a conveyancer, book a survey and get removal quotes." },
            { when: "4 weeks before", what: "Arrange the switch-over", detail: "Give notice on your rental if you rent, and arrange broadband, energy and insurance." },
            { when: "2 weeks before", what: "Tell people", detail: "Council tax at both homes, your employer, bank, GP and the DVLA." },
            { when: "Moving day", what: "Read the meters", detail: "Take photos of meter readings at both homes and collect the keys." },
            { when: "After the move", what: "Redirect your post", detail: "Set up mail redirection and update the electoral register." },
          ]}
        />
      </GuideSection>

      <GuideSection id="nations" n={17} kicker="Across the UK" title="The same move in each nation">
        <p>
          A home mover buying for £350,000, with £1,500 legal fees, a £600 survey, a £999 mortgage fee, £1,000 removals and a 10%
          contingency:
        </p>
        <DataTable
          caption="Moving costs on a £350,000 home, excluding the deposit"
          head={["Where", "Property tax", "Total costs"]}
          numeric={[1, 2]}
          rows={[
            ["England & NI", "£7,500", "£12,759"],
            ["Scotland", "£8,350", "£13,694"],
            ["Wales", "£7,500", "£12,759"],
          ]}
        />
        <p>
          In Scotland the buyer would usually not need their own survey because of the Home Report, which would save some of that
          cost.
        </p>
      </GuideSection>

      <GuideSection id="contingency" n={18} kicker="Planning" title="Why add a contingency?">
        <p>
          Moves rarely go exactly to plan. Searches can throw up issues, a survey can lead to specialist reports, completion dates
          can slip and need storage or a second van, and leasehold sales bring unexpected fees. A contingency of 5% to 10% of your
          costs gives you room to cope without dipping into your deposit.
        </p>
        <p>
          The calculator adds 10% by default. If you have firm quotes for everything, you can lower it under More options.
        </p>
      </GuideSection>

      <GuideSection id="hidden" n={19} kicker="Easy to miss" title="Costs people forget">
        <ul>
          <li>Early repayment charges on your current mortgage if you cannot port it.</li>
          <li>Mortgage exit or redemption admin fees, often around £100 to £300.</li>
          <li>Overlap costs: two lots of council tax, energy or rent for a few weeks.</li>
          <li>Storage if your sale completes before your purchase.</li>
          <li>Changing the locks, cleaning and minor repairs at the new home.</li>
          <li>Time off work for viewings, surveys and moving day.</li>
        </ul>
      </GuideSection>

      <GuideSection id="renters" n={20} kicker="Renting" title="Moving costs for renters">
        <p>
          If you rent, moving is simpler but not free. In England, letting agents cannot charge tenants most fees. You will
          usually pay a holding deposit of up to one week&apos;s rent and a tenancy deposit of up to five weeks&apos; rent, plus
          your first month&apos;s rent in advance. Your old deposit is only returned after you move out, so you may need both at
          once for a short time. Add removals and any cleaning needed to get your old deposit back.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={21} kicker="FAQs" title="Common questions">
        <h3>How much should I budget on top of my deposit?</h3>
        <p>
          It depends mostly on property tax. Without it, many buyers spend £3,000 to £5,000 on fees and removals; sellers add the
          estate agent&apos;s fee.
        </p>
        <h3>Can I add moving costs to my mortgage?</h3>
        <p>You can usually add the arrangement fee. Other costs need to be paid in cash, though some buyers borrow more to keep cash back.</p>
        <h3>Do I pay the estate agent if I am only buying?</h3>
        <p>No. In England, Wales and Northern Ireland the seller pays the estate agent.</p>
        <h3>Do I get the survey money back if the purchase falls through?</h3>
        <p>No. Surveys and valuations are paid for even if you pull out. Some insurance products cover abortive costs.</p>
        <h3>Should I use the estate agent&apos;s recommended conveyancer?</h3>
        <p>You do not have to. Agents often receive a referral fee, so compare quotes and check the firm&apos;s reviews.</p>
        <h3>How long does moving take?</h3>
        <p>In England, often three to four months from offer to completion, longer in a chain or with leasehold property.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£7,500", label: "Stamp Duty on a £350,000 home for a home mover" },
            { value: "£1,200 to £2,000", label: "Typical conveyancing fees" },
            { value: "1% to 1.5% + VAT", label: "Typical estate agent fee" },
            { value: "£400 to £1,000+", label: "Survey, by level" },
            { value: "5% to 10%", label: "Deposit usually paid at exchange" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
