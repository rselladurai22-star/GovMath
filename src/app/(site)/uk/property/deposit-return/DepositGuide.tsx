import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Tenancy deposits — the guide. Figures from src/lib/property/renting.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "caps", title: "How much a deposit can be" },
  { id: "protection", title: "Deposit protection" },
  { id: "deductions", title: "What a landlord can deduct" },
  { id: "wear-and-tear", title: "Fair wear and tear" },
  { id: "lifespans", title: "How long things are expected to last" },
  { id: "example", title: "A worked example" },
  { id: "evidence", title: "Evidence that wins disputes" },
  { id: "disputes", title: "Using the free dispute service" },
  { id: "unprotected", title: "If your deposit was not protected" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "holding", title: "Holding deposits and other payments" },
  { id: "checklist", title: "A moving-out checklist" },
  { id: "replacement", title: "Deposit replacement schemes" },
  { id: "joint", title: "Joint tenants and sharers" },
  { id: "pets", title: "Pets, smoking and gardens" },
  { id: "landlord-side", title: "For landlords" },
  { id: "small-charges", title: "Keys, bills and small charges" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
  { label: "GOV.UK — Private renting: deposits", href: "https://www.gov.uk/private-renting/deposits" },
  { label: "GOV.UK — Tenancy deposit protection: disputes and problems", href: "https://www.gov.uk/tenancy-deposit-protection/disputes-and-problems" },
  { label: "Legislation — Renting Homes (Fees etc.) (Wales) Act 2019, Schedule 1", href: "https://www.legislation.gov.uk/anaw/2019/2/schedule/1" },
  { label: "mygov.scot — Tenancy deposits", href: "https://www.mygov.scot/tenancy-deposits-tenants" },
  { label: "nidirect — Tenancy Deposit Scheme: information for tenants", href: "https://nidirect.gov.uk/articles/tenancy-deposit-scheme-information-tenants" },
];

export default function DepositGuide() {
  return (
    <Guide
      kicker="The tenancy deposit guide"
      title="Getting your deposit back in 2026"
      intro={
        <>
          A deposit is your money, held to cover unpaid rent or damage. Landlords can only keep what they can justify, and deposit schemes
          judge deductions with fair wear and tear in mind. This guide covers deposit limits, protection rules, what can be deducted, how item
          age reduces a claim and how to dispute it.
        </>
      }
      meta={["2026 rules", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>In England the deposit can be no more than 5 weeks&rsquo; rent (6 weeks if the rent is £50,000 a year or more).</li>
          <li>It must be protected in a government-approved scheme within 30 days in England and Wales.</li>
          <li>Landlords can deduct for unpaid rent, cleaning and damage, but not for normal wear and tear.</li>
          <li>Claims for replacing worn items should be cut to reflect how old they were.</li>
          <li>Each scheme has a free dispute service, and the landlord has to prove each deduction.</li>
          <li>An unprotected deposit can mean compensation of up to 3 times the deposit.</li>
        </ul>
        <KeyStats
          items={[
            { value: "5 weeks", label: "Deposit cap in England" },
            { value: "30 days", label: "To protect it (England and Wales)" },
            { value: "10 days", label: "To repay once agreed" },
            { value: "3×", label: "Most a court can award if unprotected" },
          ]}
        />
      </GuideSection>

      <GuideSection id="caps" n={2} kicker="Limits" title="How much a deposit can be">
        <DataTable
          caption="Deposit limits for private tenancies"
          head={["Nation", "Most a landlord can take", "On £1,100 a month"]}
          numeric={[2]}
          rows={[
            ["England, rent under £50,000 a year", "5 weeks' rent", "£1,269.23"],
            ["England, rent £50,000 a year or more", "6 weeks' rent", "—"],
            ["Scotland", "2 months' rent", "£2,200.00"],
            ["Northern Ireland", "1 month's rent", "£1,100.00"],
            ["Wales", "A limit can be set by regulations", "—"],
          ]}
        />
        <p>
          A week&rsquo;s rent is the monthly rent × 12 ÷ 52. Watch the line at £50,000: a home at £4,100 a month (£49,200 a year) has a cap of
          £4,730.77, while one at £4,200 a month (£50,400 a year) can take up to £5,815.38. If you paid more than the cap in England, you can ask
          for the excess back, report the landlord to the council, or apply to the First-tier Tribunal.
        </p>
      </GuideSection>

      <GuideSection id="protection" n={3} kicker="Your safeguard" title="Deposit protection">
        <p>
          In England and Wales your landlord must put your deposit in one of three government-approved schemes, the Deposit Protection Service,
          mydeposits or the Tenancy Deposit Scheme, within 30 days of getting it. They must also give you &ldquo;prescribed information&rdquo;
          about the scheme and how to get your deposit back.
        </p>
        <p>
          This applies to assured periodic tenancies, which replaced assured shorthold tenancies on 1 May 2026, and covers deposits paid by
          someone else on your behalf, such as a parent or a council deposit scheme.
        </p>
        <Callout title="Check it is protected">
          Each scheme has a search tool on its website. Enter your surname, postcode and the deposit amount to check.
        </Callout>
      </GuideSection>

      <GuideSection id="deductions" n={4} kicker="Deductions" title="What a landlord can deduct">
        <CompareCards
          columns={[
            {
              name: "Usually allowed",
              rows: [
                { label: "Unpaid rent", value: "In full" },
                { label: "Unpaid bills the landlord pays", value: "If in the tenancy" },
                { label: "Cleaning", value: "Back to check-in standard" },
                { label: "Damage", value: "Beyond fair wear and tear" },
                { label: "Missing items", value: "On the inventory" },
              ],
            },
            {
              name: "Usually not allowed",
              rows: [
                { label: "Normal wear", value: "Faded paint, worn carpet" },
                { label: "Upgrades", value: "Better than before" },
                { label: "Routine redecoration", value: "Every few years anyway" },
                { label: "Professional cleaning", value: "Unless the home needs it" },
                { label: "Fees", value: "Banned by the Tenant Fees Act" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="wear-and-tear" n={5} kicker="The key idea" title="Fair wear and tear">
        <p>
          Fair wear and tear is the normal decline of a home through everyday use: light scuffs on walls, flattened carpet in walkways, faded
          curtains. A landlord cannot charge for it. Damage, such as a burn, a large stain, a broken door or holes in the wall, is different.
        </p>
        <p>
          Even for real damage, a landlord should not end up with something better than they had. This is called betterment. If a carpet that
          would last about 8 years was 5 years old and is ruined, the landlord lost the 3 years of life it had left, not a brand new carpet.
        </p>
        <WorkedExample
          title="Apportioning a carpet"
          steps={[
            { label: "Cost of a new carpet", value: "£900" },
            { label: "Expected life", value: "8 years" },
            { label: "Age when you moved out", value: "5 years" },
            { label: "Life left: 3 ÷ 8", value: "37.5%" },
          ]}
          total={{ label: "Fair charge", value: "£337.50" }}
        />
      </GuideSection>

      <GuideSection id="lifespans" n={6} kicker="Reference" title="How long things are expected to last">
        <DataTable
          caption="Typical useful lives used in the calculator"
          head={["Item", "Typical life"]}
          numeric={[1]}
          rows={[
            ["Painting and decorating", "5 years"],
            ["Mattress", "7 years"],
            ["Carpet", "8 years"],
            ["Sofa or armchair", "8 years"],
            ["Kitchen appliance", "8 years"],
            ["Other furniture", "10 years"],
            ["Hard flooring", "15 years"],
          ]}
        />
        <p>
          These are typical figures, not legal rules. Quality, use and the number of occupants all matter, and adjudicators judge each case on
          its evidence. Cleaning and unpaid rent are not reduced for age.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Worked example" title="A worked example">
        <p>
          A tenant in England paid a £1,269 deposit on a £1,100 a month flat, just under the £1,269.23 cap. At the end the landlord wants to keep
          all of it and more:
        </p>
        <DataTable
          caption="Claimed and fair deductions"
          head={["Item", "Claimed", "Age / life", "Fair"]}
          numeric={[1, 3]}
          rows={[
            ["Carpet", "£900", "5 of 8 years", "£337.50"],
            ["Redecorating a room", "£600", "3 of 5 years", "£240.00"],
            ["Cleaning", "£180", "—", "£180.00"],
            ["Total", "£1,680", "", "£757.50"],
          ]}
        />
        <p>
          With fair deductions of £757.50, the tenant should get back about £511.50 rather than nothing. The calculator does this for up to four
          deductions.
        </p>
      </GuideSection>

      <GuideSection id="evidence" n={8} kicker="Proof" title="Evidence that wins disputes">
        <ul>
          <li>The check-in inventory, signed and dated, with photos.</li>
          <li>Your own dated photos and videos when you moved in and out.</li>
          <li>Emails or texts reporting repairs during the tenancy.</li>
          <li>Receipts for cleaning or repairs you paid for.</li>
          <li>Anything showing the age of items, such as the year a carpet was fitted.</li>
        </ul>
        <p>
          The burden of proof is on the landlord. Without a check-in inventory, it is hard for them to show the home was in better condition when
          you moved in.
        </p>
      </GuideSection>

      <GuideSection id="disputes" n={9} kicker="Free help" title="Using the free dispute service">
        <Timeline
          items={[
            { when: "End of tenancy", what: "Ask for your deposit back in writing", detail: "Give your new address and bank details." },
            { when: "Within 10 days of agreeing", what: "Landlord repays the agreed amount", detail: "In England and Wales." },
            { when: "If you disagree", what: "Raise a dispute with the scheme", detail: "Both sides must agree to use it. The disputed amount stays protected." },
            { when: "A few weeks", what: "Adjudicator decides", detail: "On written evidence. The decision is final." },
          ]}
        />
        <p>Schemes usually set a time limit for raising a dispute, often 3 months after the tenancy ends, so do not wait.</p>
      </GuideSection>

      <GuideSection id="unprotected" n={10} kicker="Penalties" title="If your deposit was not protected">
        <p>
          If your landlord did not protect the deposit within 30 days, or did not give you the prescribed information, you can claim in the
          county court. In England and Wales the court must order the landlord to pay you between 1 and 3 times the deposit, as well as repaying
          it. Under the Renters&rsquo; Rights Act, a landlord in England also cannot use most grounds for possession until they put this right.
        </p>
        <p>In Scotland a tribunal can award up to 3 times the deposit. In Northern Ireland the council can fine the landlord.</p>
      </GuideSection>

      <GuideSection id="nations" n={11} kicker="Elsewhere" title="Scotland, Wales and Northern Ireland">
        <ul>
          <li>
            <strong>Scotland:</strong>{" "}deposits are limited to 2 months&rsquo; rent and must be protected within 30 working days with SafeDeposits
            Scotland, mydeposits Scotland or Letting Protection Service Scotland.
          </li>
          <li>
            <strong>Wales:</strong> deposits must be protected within 30 days in one of the same three schemes as England. The Renting Homes (Fees
            etc.) (Wales) Act 2019 lets Welsh Ministers cap security deposits by regulations.
          </li>
          <li>
            <strong>Northern Ireland:</strong>{" "}since April 2023 deposits are limited to 1 month&rsquo;s rent and must be protected within 28 days
            in an approved scheme.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="holding" n={12} kicker="Other payments" title="Holding deposits and other payments">
        <p>
          In England a holding deposit to reserve a home is capped at 1 week&rsquo;s rent and must normally be repaid within 7 days, or put
          towards the first rent or deposit. Since the Renters&rsquo; Rights Act, a landlord cannot ask for rent in advance before the tenancy is
          signed, and can then ask for no more than 1 month&rsquo;s rent. Fees for viewings, references or check-out are banned.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={13} kicker="Practical" title="A moving-out checklist">
        <ul>
          <li>Read your check-in inventory and put right anything you damaged.</li>
          <li>Clean to the standard you found the home in, including the oven and fridge.</li>
          <li>Take dated photos and a video of every room after cleaning.</li>
          <li>Return all keys and get a receipt.</li>
          <li>Take meter readings and photograph them.</li>
          <li>Give your landlord your new address and ask for the deposit in writing.</li>
        </ul>
        <Callout title="Moving mid-month?">
          Work out the last rent payment with the <a href="/uk/life/pro-rata-rent">pro-rata rent calculator</a>.
        </Callout>
      </GuideSection>

      <GuideSection id="replacement" n={14} kicker="Alternatives" title="Deposit replacement schemes">
        <p>
          Some landlords offer a &ldquo;zero deposit&rdquo; or deposit replacement product instead of a deposit. You pay a fee, often about one
          week&rsquo;s rent, which you never get back. It is not insurance for you: at the end of the tenancy you are still liable for damage and
          unpaid rent, and the provider can chase you for it.
        </p>
        <p>
          It can help if you cannot raise a deposit, but over a few tenancies the fees add up, and disputes are handled by the provider rather than
          a government-approved scheme. Check you are also offered a normal deposit: a replacement product should be your choice, not a condition of the tenancy.
        </p>
      </GuideSection>

      <GuideSection id="joint" n={15} kicker="Sharing" title="Joint tenants and sharers">
        <p>
          On a joint tenancy, the deposit is usually protected as one sum and returned when everyone leaves. All the tenants are jointly
          responsible for damage and unpaid rent, so one person&rsquo;s damage can come out of everyone&rsquo;s share.
        </p>
        <ul>
          <li>agree in writing who paid what, and how any deductions will be shared;</li>
          <li>do a joint check-out with photos of each bedroom and the shared areas;</li>
          <li>if one person leaves early, settle their share privately with whoever replaces them.</li>
        </ul>
      </GuideSection>

      <GuideSection id="pets" n={16} kicker="Common disputes" title="Pets, smoking and gardens">
        <p>
          The Renters&rsquo; Rights Act gives tenants in England a right to ask to keep a pet, which the landlord cannot unreasonably refuse. A
          landlord can still claim for damage a pet causes beyond fair wear and tear, such as scratched doors, chewed carpets or flea treatment
          if the home was left infested.
        </p>
        <p>
          Smoking indoors can justify a claim for redecorating or deep cleaning where it was banned by the tenancy, but the charge should still be
          reduced for the age of the decoration. Gardens should be left as tidy as at the start of the tenancy, allowing for the season.
        </p>
      </GuideSection>

      <GuideSection id="landlord-side" n={17} kicker="Landlords" title="For landlords">
        <p>
          Protect the deposit within 30 days, give the prescribed information, and keep a detailed, photographed inventory signed at check-in.
          At the end, list each deduction with evidence and the age of any item you are replacing. Claims that ignore wear and tear or ask for
          new-for-old replacement are often reduced at adjudication, and an unprotected deposit can cost up to three times its value.
        </p>
      </GuideSection>

      <GuideSection id="small-charges" n={18} kicker="The details" title="Keys, bills and small charges">
        <p>
          Smaller deductions cause many disputes. A landlord can charge the reasonable cost of replacing lost keys or fobs, or changing a lock if
          a key is not returned, but not an inflated fee. Unpaid utility bills can only be deducted where the landlord pays them under the
          tenancy, and the amount should match the actual bill for your period.
        </p>
        <p>
          Charges for missing items need to match the inventory, and should be reduced for age just like larger items: a 6-year-old kettle is
          not worth the price of a new one. Rubbish left behind can justify a reasonable removal charge, and gardens left overgrown a
          reasonable cost of tidying them.
        </p>
        <p>
          If you think a charge is too high, ask for the invoice or quote behind it. Adjudicators expect landlords to show what was actually
          spent, or a fair quote for the work.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Deposit rules at a glance"
          head={["Rule", "England", "Wales", "Scotland", "Northern Ireland"]}
          rows={[
            ["Cap", "5 or 6 weeks' rent", "Can be set by regulations", "2 months' rent", "1 month's rent"],
            ["Protect within", "30 days", "30 days", "30 working days", "28 days"],
            ["If not protected", "1 to 3 × deposit", "1 to 3 × deposit", "Up to 3 × deposit", "Council fine"],
            ["Holding deposit", "1 week's rent", "1 week's rent", "—", "—"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
