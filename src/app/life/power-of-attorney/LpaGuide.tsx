import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Lasting Power of Attorney — the guide. Figures from src/lib/life/estate.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an LPA is" },
  { id: "types", title: "The two types" },
  { id: "cost", title: "What it costs" },
  { id: "help", title: "Help with the fee" },
  { id: "without", title: "What happens without an LPA" },
  { id: "attorneys", title: "Choosing attorneys" },
  { id: "making", title: "Making and registering an LPA" },
  { id: "certificate", title: "The certificate provider" },
  { id: "using", title: "Using an LPA" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "ending", title: "Changing or ending an LPA" },
  { id: "nations", title: "Scotland and Northern Ireland" },
  { id: "when", title: "When to make an LPA" },
  { id: "instructions", title: "Preferences and instructions" },
  { id: "life-sustaining", title: "Life-sustaining treatment" },
  { id: "banks", title: "LPAs and banks" },
  { id: "abuse", title: "Protecting against abuse" },
  { id: "online", title: "The online service" },
  { id: "cost-compare", title: "LPAs, wills and other documents" },
  { id: "business", title: "LPAs for business owners" },
  { id: "capacity", title: "What mental capacity means" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Make, register or end a lasting power of attorney", href: "https://www.gov.uk/power-of-attorney" },
  { label: "GOV.UK — Register a lasting power of attorney", href: "https://www.gov.uk/power-of-attorney/register" },
  { label: "GOV.UK — Deputyship fees", href: "https://www.gov.uk/become-deputy/fees" },
  { label: "GOV.UK — Office of the Public Guardian", href: "https://www.gov.uk/government/organisations/office-of-the-public-guardian" },
  { label: "GOV.UK — Mental Capacity Act code of practice", href: "https://www.gov.uk/government/publications/mental-capacity-act-code-of-practice" },
];

export default function LpaGuide() {
  return (
    <Guide
      kicker="The power of attorney guide"
      title="Lasting Power of Attorney costs and how it works"
      intro={
        <>
          A Lasting Power of Attorney lets people you trust make decisions for you if you cannot make them yourself. Registering one costs £92 in
          England and Wales. Without one, your family may have to go to court, which costs more and takes longer. This guide covers the costs, the
          two types, how to choose attorneys and how to avoid the mistakes that delay registration.
        </>
      }
      meta={["2026 fees", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Registering an LPA costs <strong>£92</strong>. Both types cost £184. A couple with both types each pays £368 in total.
          </li>
          <li>The fee is halved if your income is under £12,000, and waived on some means-tested benefits.</li>
          <li>You can make an LPA yourself online. A solicitor is optional.</li>
          <li>Without an LPA, a court deputyship costs £532 to set up and £320 a year in supervision fees.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£92", label: "Per LPA" },
            { value: "£368", label: "Both types for a couple" },
            { value: "£46", label: "With the fee reduction" },
            { value: "£852", label: "First year of a deputyship" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an LPA is">
        <p>
          A Lasting Power of Attorney is a legal document in which you, the &ldquo;donor&rdquo;, appoint one or more &ldquo;attorneys&rdquo; to make
          decisions on your behalf. It must be registered with the Office of the Public Guardian (OPG) before it can be used.
        </p>
        <p>
          You must be 18 or over and have mental capacity when you make it. Many people make LPAs at the same time as a will, long before they
          need them.
        </p>
      </GuideSection>

      <GuideSection id="types" n={3} kicker="Two documents" title="The two types">
        <CompareCards
          columns={[
            {
              name: "Property and financial affairs",
              rows: [
                { label: "Covers", value: "Bank accounts, bills, benefits, pensions, selling a home" },
                { label: "When used", value: "As soon as it is registered, if you allow it" },
                { label: "Useful for", value: "Illness, hospital stays, travel, as well as loss of capacity" },
              ],
            },
            {
              name: "Health and welfare",
              rows: [
                { label: "Covers", value: "Daily care, medical treatment, where you live" },
                { label: "When used", value: "Only when you cannot decide yourself" },
                { label: "Life-sustaining treatment", value: "Only if you give attorneys this power" },
              ],
            },
          ]}
        />
        <p>
          Each type is a separate document with its own fee. Most people make both, because they cover different decisions and a spouse or next of
          kin has no automatic right to make either kind.
        </p>
      </GuideSection>

      <GuideSection id="cost" n={4} kicker="Fees" title="What it costs">
        <DataTable
          caption="Lasting Power of Attorney costs, England and Wales"
          head={["What", "Registration fees", "With a solicitor at £400 + VAT each"]}
          numeric={[1, 2]}
          rows={[
            ["One person, one type", "£92", "£572"],
            ["One person, both types", "£184", "£1,144"],
            ["A couple, both types", "£368", "£2,288"],
          ]}
        />
        <p>
          The registration fee is the same whether you apply yourself or through a solicitor. Solicitors&rsquo; fees vary widely: some charge a fixed
          fee per document, others an <a href="/tax-and-salary/hourly-to-salary">hourly rate</a>. Charities and some will-writing services offer lower-cost help.
        </p>
        <Callout tone="good" title="Doing it yourself">
          The online service guides you through each step and checks for common errors. If your wishes are simple and your family relationships
          are straightforward, you may not need professional help.
        </Callout>
      </GuideSection>

      <GuideSection id="help" n={5} kicker="Reduced fees" title="Help with the fee">
        <ul>
          <li>
            <strong>Reduction:</strong>{" "}if the donor&rsquo;s gross income is less than £12,000 a year, the fee is halved to £46.
          </li>
          <li>
            <strong>Exemption:</strong> if the donor gets certain means-tested benefits, there may be no fee. Check the current list on GOV.UK
            before applying.
          </li>
          <li>
            <strong>Hardship:</strong> the OPG can reduce or waive a fee in exceptional circumstances.
          </li>
        </ul>
        <p>Apply for help using form LPA120 when you register. The help depends on the donor&rsquo;s circumstances, not the attorneys&rsquo;.</p>
      </GuideSection>

      <GuideSection id="without" n={6} kicker="The alternative" title="What happens without an LPA">
        <p>
          If someone loses mental capacity without an LPA, their family usually has to apply to the Court of Protection to become a deputy. Banks
          may freeze accounts in the meantime, even joint ones in some cases.
        </p>
        <DataTable
          caption="Court of Protection deputyship fees"
          head={["Fee", "Amount"]}
          numeric={[1]}
          rows={[
            ["Application", "£432"],
            ["Assessment for a new deputy", "£100"],
            ["Hearing, if needed", "£100"],
            ["Supervision each year (general)", "£320"],
            ["Supervision each year (minimal, under £21,000)", "£35"],
          ]}
        />
        <Figure label="Cost for one person" caption="Court and supervision fees, excluding the security bond and legal costs.">
          <Bars
            items={[
              { label: "Both LPAs", value: 184 },
              { label: "Deputy, 1 year", value: 852 },
              { label: "Deputy, 5 years", value: 2132 },
              { label: "Deputy, 10 years", value: 3732 },
            ]}
          />
        </Figure>
        <p>
          A deputy usually also has to buy a security bond each year, file annual reports, and often pays a solicitor to make the application.
          The process can take many months. A deputy for health and welfare is rarely appointed, so those decisions are left to doctors and
          social workers.
        </p>
      </GuideSection>

      <GuideSection id="attorneys" n={7} kicker="Who to trust" title="Choosing attorneys">
        <p>Attorneys must be 18 or over and have mental capacity. Most people choose family members or close friends. Think about:</p>
        <ul>
          <li>whether they are good with money and paperwork;</li>
          <li>whether they live nearby and are likely to outlive you;</li>
          <li>whether they will consult your family and respect your wishes.</li>
        </ul>
        <CompareCards
          columns={[
            {
              name: "Jointly and severally",
              rows: [
                { label: "How it works", value: "Attorneys can act together or alone" },
                { label: "Benefit", value: "Flexible; still works if one dies" },
              ],
            },
            {
              name: "Jointly",
              rows: [
                { label: "How it works", value: "All attorneys must agree every decision" },
                { label: "Risk", value: "Fails if one attorney can no longer act" },
              ],
            },
          ]}
        />
        <p>You can also name replacement attorneys to step in if an original attorney cannot act.</p>
      </GuideSection>

      <GuideSection id="making" n={8} kicker="Step by step" title="Making and registering an LPA">
        <Timeline
          items={[
            { when: "Step 1", what: "Fill in the forms", detail: "Online or on paper, one for each type." },
            { when: "Step 2", what: "Sign in the right order", detail: "Donor, then certificate provider, then attorneys." },
            { when: "Step 3", what: "Register with the OPG", detail: "Pay £92 per LPA." },
            { when: "Step 4", what: "Notice period", detail: "Four weeks for anyone to object." },
            { when: "Step 5", what: "Registered", detail: "The LPA can then be used." },
          ]}
        />
        <p>Registration takes several weeks. Register straight away, so the LPA is ready when it is needed.</p>
      </GuideSection>

      <GuideSection id="certificate" n={9} kicker="Safeguard" title="The certificate provider">
        <p>
          A certificate provider confirms that you understand the LPA and are not being pressured. It must be someone who has known you well
          for at least two years, or a professional such as a doctor or solicitor. It cannot be an attorney or a family member.
        </p>
      </GuideSection>

      <GuideSection id="using" n={10} kicker="In practice" title="Using an LPA">
        <p>
          Once registered, attorneys show the LPA to banks, care homes and others. Attorneys must act in your best interests, keep your money
          separate from theirs and keep records. They can claim reasonable expenses but not pay themselves unless the LPA allows it.
        </p>
        <p>The OPG can investigate if anyone is concerned that an attorney is misusing their power.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={11} kicker="Avoid delays" title="Common mistakes">
        <ul>
          <li>Signing in the wrong order, or before the donor has signed.</li>
          <li>Missing witness signatures.</li>
          <li>Adding instructions the OPG cannot accept, such as conflicting conditions.</li>
          <li>Choosing &ldquo;jointly&rdquo; without understanding that all attorneys must then act together.</li>
        </ul>
        <WorkedExample
          title="If the OPG rejects an LPA"
          steps={[
            { label: "Original registration fee", value: "£92" },
            { label: "Correct and reapply within 3 months", value: "£46" },
          ]}
          total={{ label: "Total cost", value: "£138" }}
        />
      </GuideSection>

      <GuideSection id="ending" n={12} kicker="Later" title="Changing or ending an LPA">
        <p>
          While you have capacity, you can cancel an LPA at any time, or remove an attorney. An LPA ends automatically on your death. A property
          and financial affairs LPA also ends if you become bankrupt. To change attorneys, you usually need to make a new LPA.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={13} kicker="Elsewhere" title="Scotland and Northern Ireland">
        <p>
          Scotland uses continuing and welfare powers of attorney, registered with the Office of the Public Guardian (Scotland). Northern Ireland
          uses enduring powers of attorney. Fees and rules differ, so check with the relevant body.
        </p>
      </GuideSection>

      <GuideSection id="when" n={14} kicker="Timing" title="When to make an LPA">
        <p>
          The best time is while you are well. Accidents, strokes and sudden illness can happen at any age, and an LPA cannot be made once capacity
          is lost. Many people make LPAs when they write a will, buy a home, start a family or retire.
        </p>
        <p>
          If a diagnosis such as dementia is made, it is often still possible to make an LPA in the early stages, as long as the person understands
          what they are signing. A certificate provider must be satisfied of this, so act quickly.
        </p>
      </GuideSection>

      <GuideSection id="instructions" n={15} kicker="Your wishes" title="Preferences and instructions">
        <p>
          You can add <strong>preferences</strong>, which attorneys should take into account, and <strong>instructions</strong>, which they must
          follow. For example, a preference might be that you would like to stay at home as long as possible. An instruction might be that your
          home must not be sold while your partner lives there.
        </p>
        <p>
          Instructions that are unclear or impossible to follow are a common reason for the OPG to reject an LPA, so keep them simple and specific.
        </p>
      </GuideSection>

      <GuideSection id="life-sustaining" n={16} kicker="Health decisions" title="Life-sustaining treatment">
        <p>
          On a health and welfare LPA, you choose whether your attorneys can give or refuse consent to life-sustaining treatment on your behalf.
          If you do not give them this power, doctors will decide in your best interests, after consulting your family. Talk to your attorneys
          about your wishes so they can act confidently if the time comes.
        </p>
      </GuideSection>

      <GuideSection id="banks" n={17} kicker="Money" title="LPAs and banks">
        <p>
          Once registered, a property and financial affairs LPA can be registered with each bank, building society and investment provider.
          Attorneys can then manage accounts, pay bills and deal with pensions and benefits. You can let them use it while you still have capacity,
          for example if you are in hospital, or only once you lose capacity.
        </p>
        <p>
          Without an LPA, banks will usually not let a family member manage someone&rsquo;s account, even a spouse, beyond very limited
          arrangements.
        </p>
      </GuideSection>

      <GuideSection id="abuse" n={18} kicker="Safeguards" title="Protecting against abuse">
        <p>Several safeguards protect donors:</p>
        <ul>
          <li>the certificate provider confirms you understand the LPA and are not being pressured;</li>
          <li>you can name people to be told when the LPA is registered, so they can object;</li>
          <li>attorneys must keep records and act in your best interests;</li>
          <li>the OPG investigates concerns and can apply to the court to cancel an LPA.</li>
        </ul>
        <p>Choosing more than one attorney, or asking attorneys to share accounts with a family member, can add an extra check.</p>
      </GuideSection>

      <GuideSection id="online" n={19} kicker="Applying" title="The online service">
        <p>
          The GOV.UK service lets you make an LPA online, check it for errors and then print it for signing, or complete more of the process
          digitally. You can save progress and come back later. Pay the £92 fee when you apply to register, and track progress through the OPG.
        </p>
      </GuideSection>

      <GuideSection id="cost-compare" n={20} kicker="The full set" title="LPAs, wills and other documents">
        <p>Many people put several documents in place at once:</p>
        <DataTable
          caption="Planning documents and what they do"
          head={["Document", "What it does", "When it applies"]}
          rows={[
            ["Will", "Says who inherits and who deals with your estate", "After death"],
            ["Property and financial affairs LPA", "Lets attorneys manage money and property", "While you are alive"],
            ["Health and welfare LPA", "Lets attorneys make care and medical decisions", "When you cannot decide"],
            ["Advance decision", "Refuses specific medical treatment in advance", "When you cannot decide"],
          ]}
        />
        <p>
          An advance decision to refuse treatment is legally binding if made properly, but a later health and welfare LPA covering the same
          treatment can override it. Make sure your documents agree with each other.
        </p>
      </GuideSection>

      <GuideSection id="business" n={21} kicker="Self-employed" title="LPAs for business owners">
        <p>
          A personal property and financial affairs LPA may not let an attorney run your business. Sole traders and partners should consider a
          separate business LPA, naming attorneys who understand the business, so bills, staff and customers can still be dealt with if you are
          ill. Company directors should also check the company&rsquo;s articles and any shareholder agreement.
        </p>
      </GuideSection>

      <GuideSection id="capacity" n={22} kicker="The legal test" title="What mental capacity means">
        <p>
          Under the Mental Capacity Act 2005, a person lacks capacity to make a particular decision if, because of an impairment of the mind or
          brain, they cannot understand, retain or weigh the relevant information, or communicate their decision. Capacity is judged decision by
          decision and at the time it is needed. Someone may be able to decide what to eat but not whether to sell their home.
        </p>
        <p>
          Attorneys must assume the person has capacity unless it is shown otherwise, help them make their own decisions where possible, and
          choose the least restrictive option when they do decide for them.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£92", label: "Registration fee per LPA" },
            { value: "£46", label: "With the fee reduction" },
            { value: "£12,000", label: "Income limit for the reduction" },
            { value: "£46", label: "Reapplication within 3 months" },
            { value: "£432", label: "Deputyship application" },
            { value: "£320", label: "Deputy supervision a year" },
            { value: "2 years", label: "Certificate provider must know you" },
            { value: "18", label: "Minimum age" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
