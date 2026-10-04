import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Student council tax — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who counts as a full-time student" },
  { id: "households", title: "How it works in different households" },
  { id: "examples", title: "Worked examples" },
  { id: "disregarded", title: "Other people who are disregarded" },
  { id: "claiming", title: "How to claim" },
  { id: "summer", title: "Summer holidays and finishing your course" },
  { id: "halls", title: "Halls and student houses" },
  { id: "couples", title: "Couples and families" },
  { id: "part-time", title: "Part-time and distance learners" },
  { id: "nations", title: "Wales, Scotland and Northern Ireland" },
  { id: "landlords", title: "Who pays: tenants or landlord?" },
  { id: "budgeting", title: "Budgeting as a student household" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Council tax: discounts for full-time students", href: "https://www.gov.uk/council-tax/discounts-for-full-time-students" },
  { label: "GOV.UK — Council tax: who has to pay", href: "https://www.gov.uk/council-tax/who-has-to-pay" },
  { label: "GOV.UK — Council tax: people on apprentice schemes", href: "https://www.gov.uk/council-tax/people-on-apprentice-schemes" },
  { label: "nidirect — Rates for students", href: "https://www.nidirect.gov.uk/" },
];

export default function CouncilTaxGuide() {
  return (
    <Guide
      kicker="The student council tax guide"
      title="Do students pay council tax?"
      intro={
        <>
          Full-time students do not pay council tax in England, Wales and Scotland, and a home where everyone is a full-time student is exempt.
          If students live with people who are not students, the bill may be reduced rather than cancelled. This guide explains who counts as a
          student, how different households are treated, and how to claim.
        </>
      }
      meta={["2026/27 rules", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>All full-time students: no council tax.</li>
          <li>Students plus one other adult: the other adult gets a 25% discount.</li>
          <li>Students plus two or more other adults: the full bill is due, though the students are not normally liable for it.</li>
          <li>You need a certificate from your university or college to claim.</li>
        </ul>
        <KeyStats
          items={[
            { value: "100%", label: "Exempt if all are students" },
            { value: "25%", label: "Discount with one non-student" },
            { value: "21 hours", label: "Study a week to count" },
            { value: "24 weeks", label: "Course length a year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Definition" title="Who counts as a full-time student">
        <ul>
          <li>On a course lasting at least one academic or calendar year.</li>
          <li>Studying for at least 24 weeks a year.</li>
          <li>Normally required to study, train or work for at least 21 hours a week.</li>
        </ul>
        <p>
          Most undergraduate and postgraduate full-time students qualify. Under-20s on courses at school or college of more than 12 hours a
          week also count.
        </p>
      </GuideSection>

      <GuideSection id="households" n={3} kicker="Households" title="How it works in different households">
        <DataTable
          head={["Who lives there", "Council tax"]}
          rows={[
            ["Only full-time students", "Exempt: nothing to pay"],
            ["Students and one other adult", "25% single person discount"],
            ["Students and two or more other adults", "Full bill, paid by the non-students"],
            ["Student halls of residence", "Exempt"],
          ]}
        />
        <p>
          Council tax assumes two adults live in a home. Students are &ldquo;disregarded&rdquo;, which means they are not counted. If only one
          adult is counted, the bill is reduced by 25%; if no one is counted, the home is exempt.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Real numbers" title="Worked examples">
        <WorkedExample
          title="Three students sharing, bill £2,200 a year"
          steps={[{ label: "Everyone is a full-time student", value: "Exempt" }]}
          total={{ label: "To pay", value: "£0" }}
        />
        <WorkedExample
          title="Two students and one worker, bill £2,200"
          steps={[
            { label: "Only the worker is counted", value: "One adult" },
            { label: "Single person discount: 25% of £2,200", value: "−£550" },
          ]}
          total={{ label: "To pay", value: "£1,650" }}
        />
        <p>With one student and two workers, the full £2,200 is due, or £1,100 each if the two workers split it.</p>
      </GuideSection>

      <GuideSection id="disregarded" n={5} kicker="Disregards" title="Other people who are disregarded">
        <ul>
          <li>Student nurses on certain courses.</li>
          <li>Apprentices under 25 on an approved scheme, earning under a set amount.</li>
          <li>Young people aged 18 or 19 still at school or college.</li>
          <li>Some care leavers under 25, depending on the council.</li>
          <li>Foreign language assistants registered with the British Council.</li>
        </ul>
        <p>Enter disregarded people as students in the calculator.</p>
      </GuideSection>

      <GuideSection id="claiming" n={6} kicker="Claiming" title="How to claim">
        <Timeline
          items={[
            { when: "Step 1", what: "Get a certificate", detail: "Your university or college issues a council tax exemption certificate, often online." },
            { when: "Step 2", what: "Send it to the council", detail: "Usually through the council's website, for each student." },
            { when: "Step 3", what: "Check the bill", detail: "The council updates the account and refunds any overpayment." },
          ]}
        />
        <Callout tone="warn" title="Do not ignore bills">If you get a bill addressed to &ldquo;the occupiers&rdquo;, send your certificates. Ignoring it can lead to court action.</Callout>
      </GuideSection>

      <GuideSection id="summer" n={7} kicker="Timing" title="Summer holidays and finishing your course">
        <p>
          You stay a student over the summer between years of your course. The exemption ends the day after your course finishes. If you stay
          in the property after graduating, you become liable from then, so tell the council. In the example of three students, a home with a
          £2,200 bill that stays exempt for 3 extra months saves £550.
        </p>
      </GuideSection>

      <GuideSection id="halls" n={8} kicker="Housing" title="Halls and student houses">
        <p>
          Halls of residence owned or managed by a university are exempt. Purpose-built student blocks run by private companies are usually
          exempt too if everyone living there is a student. In a shared house, the exemption applies to the whole property if every adult is a
          full-time student.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={9} kicker="Families" title="Couples and families">
        <CompareCards
          columns={[
            { name: "Student with a working partner", rows: [{ label: "Bill", value: "25% discount for the partner" }] },
            { name: "Student whose partner cannot work", rows: [{ label: "Bill", value: "Exempt if the partner is a non-UK national prevented from working or claiming benefits by their visa" }] },
          ]}
        />
        <p>Students living with their parents do not affect the parents&rsquo; bill: a single parent living with a student child still gets 25% off.</p>
      </GuideSection>

      <GuideSection id="part-time" n={10} kicker="Part-time" title="Part-time and distance learners">
        <p>
          Part-time students and most distance learners do not count as full-time students, so they are counted for council tax. If you are on
          a low income, you may get council tax support from your council.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={11} kicker="UK nations" title="Wales, Scotland and Northern Ireland">
        <p>
          Wales and Scotland follow broadly the same rules as England. Northern Ireland has domestic rates instead of council tax, with no
          general exemption for student households; rates are often included in student rents.
        </p>
      </GuideSection>

      <GuideSection id="landlords" n={12} kicker="Renting" title="Who pays: tenants or landlord?">
        <p>
          In most shared houses, the tenants are liable. In houses in multiple occupation let room by room, the landlord is often liable
          instead, and may include council tax in the rent. Check your tenancy agreement, and ask the landlord whether the property has been
          registered as exempt.
        </p>
      </GuideSection>

      <GuideSection id="budgeting" n={13} kicker="Money" title="Budgeting as a student household">
        <p>
          Even when council tax is not due, other household bills are. Agree early how you will split energy, water, broadband and a TV licence
          if anyone watches live TV or BBC iPlayer. Some student lets include bills in the rent; others do not. Put the details in writing so
          everyone knows what they owe.
        </p>
        <p>
          If a non-student joins the household, the council tax bill can appear mid-year. Decide in advance who pays it, since only the
          non-students are liable.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={14} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Not sending certificates.</strong> The exemption is not automatic.</li>
          <li><strong>Forgetting to report the end of your course.</strong> Liability starts the day after, and back-bills can be large.</li>
          <li><strong>Assuming part-time study counts.</strong> Only full-time students are disregarded.</li>
          <li><strong>Ignoring letters to &ldquo;the occupier&rdquo;.</strong> Reply with your certificates to avoid a court summons.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={15} kicker="FAQs" title="Common questions">
        <h3>Do I need to apply every year?</h3>
        <p>Usually yes: send a new certificate for each academic year, or when your household changes.</p>
        <h3>Does a postgraduate student count?</h3>
        <p>Yes, if the course meets the full-time rules. Writing-up periods for PhD students may be treated differently by some councils.</p>
        <h3>What about my parents&rsquo; home?</h3>
        <p>A student living away does not change their parents&rsquo; bill, which is based on who lives there.</p>
        <h3>What if one housemate drops out?</h3>
        <p>If they stay in the house but are no longer a student, they become liable, and the household may lose the exemption. Tell the council straight away.</p>
        <h3>Can I get a refund for past bills?</h3>
        <p>Yes, if you paid when you were exempt. Send your certificates and ask the council to backdate the exemption.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£0", label: "All-student home" },
            { value: "25%", label: "Discount with one non-student" },
            { value: "21 hours", label: "A week to be full time" },
            { value: "24 weeks", label: "A year" },
            { value: "£1,650", label: "Example: £2,200 bill, one worker" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
