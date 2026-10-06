import {
  Callout,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Single person discount — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What the discount is" },
  { id: "who", title: "Who qualifies" },
  { id: "disregarded", title: "People who don't count" },
  { id: "amounts", title: "How much you save" },
  { id: "part-year", title: "Part of the year" },
  { id: "claim", title: "How to claim" },
  { id: "changes", title: "When things change" },
  { id: "other-help", title: "Other help with council tax" },
  { id: "examples", title: "Examples" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Council Tax: discounts for single occupants", href: "https://www.gov.uk/council-tax/discounts-for-people-who-live-alone" },
  { label: "GOV.UK — Council Tax: people on discounts", href: "https://www.gov.uk/council-tax/who-has-to-pay" },
  { label: "GOV.WALES — Council Tax discounts", href: "https://www.gov.wales/council-tax-discounts-disregards-exemptions-and-reductions" },
  { label: "mygov.scot — Council Tax discounts", href: "https://www.mygov.scot/council-tax/discounts-exemptions-and-reductions" },
];

export default function SPDGuide() {
  return (
    <Guide
      kicker="The single person discount guide"
      title="Council tax single person discount, explained"
      intro={
        <>
          If you are the only adult in your home, you can get 25% off your council tax. This guide explains who qualifies,
          which people are not counted, how much you save, how to claim and backdate it, and what to do if your household
          changes.
        </>
      }
      meta={["2026/27", "6 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What the discount is">
        <p>
          A full council tax bill assumes two or more adults live in a home. If only one adult counts, you get a{" "}
          <strong>25% discount</strong>. It applies in England, Scotland and Wales, and it is not means-tested: your income and
          savings do not matter.
        </p>
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who qualifies">
        <p>You can get the discount if you are aged 18 or over and either:</p>
        <ul>
          <li>you live alone; or</li>
          <li>everyone else who lives with you is disregarded for council tax, such as children or full-time students.</li>
        </ul>
        <p>
          It is your main home that matters. A partner who lives elsewhere, a lodger who has their own main home somewhere else,
          or family who stay for a short time do not normally count. A lodger who lives with you as their main home does count,
          and would end the discount.
        </p>
      </GuideSection>

      <GuideSection id="disregarded" n={3} kicker="Disregards" title="People who don't count">
        <p>These people are not counted when working out how many adults live in a home:</p>
        <ul>
          <li>children under 18, and 18 and 19-year-olds for whom Child Benefit is still paid;</li>
          <li>full-time students, student nurses, apprentices and young people on some training schemes;</li>
          <li>people who are severely mentally impaired;</li>
          <li>many live-in carers caring for someone who is not their partner or child under 18;</li>
          <li>people in hospital, care homes, or prison, and some others.</li>
        </ul>
        <p>
          So a parent living with two children gets the discount. So does someone living with a full-time university student. If
          no one in the home counts at all, the discount rises to 50%, and a home where everyone is a full-time student is exempt.
        </p>
      </GuideSection>

      <GuideSection id="amounts" n={4} kicker="Savings" title="How much you save">
        <WorkedExample
          title="A £2,280 Band C bill"
          steps={[
            { label: "Full bill", value: "£2,280" },
            { label: "25% discount", value: "−£570" },
          ]}
          total={{ label: "You pay", value: "£1,710" }}
        />
        <DataTable
          caption="25% discount on typical bills"
          head={["Full bill", "Discount a year", "Saving a month (over 12)", "You pay"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£1,500", "£375", "£31.25", "£1,125"],
            ["£2,000", "£500", "£41.67", "£1,500"],
            ["£2,392", "£598", "£49.83", "£1,794"],
            ["£3,000", "£750", "£62.50", "£2,250"],
            ["£4,000", "£1,000", "£83.33", "£3,000"],
          ]}
        />
        <p>
          £2,392 is the average Band D bill in England for 2026/27. Your saving depends on your own council&apos;s charge and your
          band.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={5} kicker="Timing" title="Part of the year">
        <p>
          The discount is worked out by the day. If you live alone for only part of the year, you get it for those days. For
          example, if your partner moves out and you live alone for the last 73 days of the year on a £2,190 bill:
        </p>
        <WorkedExample
          title="Living alone for 73 days"
          steps={[
            { label: "Full-year discount", note: "25% of £2,190", value: "£547.50" },
            { label: "Share of the year", note: "73 ÷ 365", value: "× 0.2" },
          ]}
          total={{ label: "Discount", value: "£109.50" }}
        />
      </GuideSection>

      <GuideSection id="claim" n={6} kicker="Claiming" title="How to claim">
        <Timeline
          items={[
            { when: "1", what: "Apply to your council", detail: "Most councils have an online form. You will need your council tax account number." },
            { when: "2", what: "Give the date", detail: "Say when you started living alone, or when the other adults left or became disregarded." },
            { when: "3", what: "Get a new bill", detail: "The council sends a revised bill with the discount and any refund or lower instalments." },
          ]}
        />
        <p>
          If you have been eligible for a while but never claimed, ask the council to backdate the discount. Most will backdate to
          the date you became eligible if you can show it, for example with a tenancy agreement or a letter.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={7} kicker="Changes" title="When things change">
        <p>
          You must tell your council if someone moves in or stops being disregarded, for example when a student finishes their
          course. In England you should do this within 21 days, and a penalty can apply if you don&apos;t.
        </p>
        <Callout tone="warn" title="Councils check">
          Councils regularly review single person discounts against electoral roll, credit reference and other records. If you
          claimed when not entitled, you will have to repay the discount and may face a penalty.
        </Callout>
      </GuideSection>

      <GuideSection id="other-help" n={8} kicker="More help" title="Other help with council tax">
        <ul>
          <li><strong>Council Tax Reduction</strong> for people on a low income, which can be claimed on top of the discount.</li>
          <li><strong>Disabled band reduction</strong> if your home has features needed by a disabled resident.</li>
          <li><strong>Exemptions</strong> for some empty homes, annexes and homes where everyone is disregarded.</li>
        </ul>
        <p>Our council tax bands calculator shows your full bill with discounts, reductions and premiums.</p>
      </GuideSection>

      <GuideSection id="examples" n={9} kicker="Real situations" title="Examples">
        <DataTable
          caption="Who qualifies for 25% off"
          head={["Household", "Adults counted", "Discount"]}
          rows={[
            ["You live alone", "1", "25%"],
            ["You and your two children aged 9 and 14", "1", "25%"],
            ["You and a 19-year-old at college with Child Benefit still paid", "1", "25%"],
            ["You and a partner who is a full-time university student", "1", "25%"],
            ["You and your adult son who works full time", "2", "None"],
            ["You and a lodger whose main home is yours", "2", "None"],
            ["Two full-time students only", "0", "Exempt"],
          ]}
        />
        <p>
          The test is always the same: count the adults who live in the home as their main residence, then leave out anyone who is
          disregarded. If exactly one adult is left, you get 25% off.
        </p>
        <Callout title="Annexes and granny flats">
          A self-contained annexe can be a separate home for council tax with its own bill. If a family member lives there, it
          may get a 50% discount or be exempt. Ask your council how yours is treated.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={10} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "25%", label: "Discount if only one adult counts" },
            { value: "50%", label: "Discount if no adults count" },
            { value: "£598", label: "Saving on the average England Band D bill" },
            { value: "21 days", label: "To tell the council about a change" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
