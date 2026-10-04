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

/** Probate fees — the guide. Figures from src/lib/life/estate.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What probate is" },
  { id: "need", title: "Do you need probate?" },
  { id: "fees", title: "The court fees" },
  { id: "increase", title: "The July 2026 increase" },
  { id: "copies", title: "Official copies" },
  { id: "diy", title: "Applying yourself" },
  { id: "professional", title: "Using a solicitor or probate firm" },
  { id: "iht", title: "Inheritance Tax and probate" },
  { id: "timeline", title: "How long it takes" },
  { id: "executor", title: "Being an executor" },
  { id: "nations", title: "Scotland and Northern Ireland" },
  { id: "no-will", title: "If there is no will" },
  { id: "excepted", title: "Excepted estates and IHT forms" },
  { id: "values", title: "Valuing the estate" },
  { id: "property", title: "Selling a property during probate" },
  { id: "disputes", title: "Disputes and caveats" },
  { id: "costs-saving", title: "Ways to keep costs down" },
  { id: "checklist", title: "An executor's checklist" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Applying for probate", href: "https://www.gov.uk/applying-for-probate" },
  { label: "GOV.UK — Probate fees", href: "https://www.gov.uk/applying-for-probate/fees" },
  { label: "GOV.UK — Court and tribunal fees: updates from July 2026", href: "https://www.gov.uk/government/news/court-and-tribunal-fees-updates-from-july-2026" },
  { label: "GOV.UK — Value the estate for Inheritance Tax", href: "https://www.gov.uk/valuing-estate-of-someone-who-died" },
  { label: "GOV.UK — Wills, probate and inheritance", href: "https://www.gov.uk/wills-probate-inheritance" },
];

export default function ProbateGuide() {
  return (
    <Guide
      kicker="The probate fees guide"
      title="Probate fees and costs in 2026"
      intro={
        <>
          Probate gives an executor the legal right to deal with the estate of someone who has died. Applying costs £526 in England and Wales for
          estates over £5,000, after a 75% rise in July 2026. This guide explains when you need probate, every fee, the cost of professional
          help, and how long the process takes.
        </>
      }
      meta={["Fees from July 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            The probate application fee is <strong>£526</strong> for estates over £5,000. Smaller estates pay nothing.
          </li>
          <li>
            Extra official copies cost <strong>£2 each</strong> when you apply, or £16 each later.
          </li>
          <li>The fee is the same whether you apply yourself or use a solicitor.</li>
          <li>Professional help is optional and usually costs far more than the court fee.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£526", label: "Application fee" },
            { value: "£5,000", label: "No fee at or below" },
            { value: "£2", label: "Each copy with the application" },
            { value: "£16", label: "Each copy ordered later" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What probate is">
        <p>
          Probate is the court&rsquo;s confirmation that someone can deal with a dead person&rsquo;s property, money and possessions. If there is a
          will, executors apply for a <strong>grant of probate</strong>. If there is no will, the next of kin apply for{" "}
          <strong>letters of administration</strong>. Both are called &ldquo;probate&rdquo; and cost the same.
        </p>
        <p>
          The grant lets banks, pension schemes and the Land Registry release or transfer assets. Without it, they will usually freeze anything
          above their own limits.
        </p>
      </GuideSection>

      <GuideSection id="need" n={3} kicker="Checklist" title="Do you need probate?">
        <CompareCards
          columns={[
            {
              name: "Usually needed",
              rows: [
                { label: "Property", value: "A home or land in the person's sole name" },
                { label: "Shares", value: "Most share holdings and investments" },
                { label: "Large balances", value: "Bank accounts above the bank's own limit" },
              ],
            },
            {
              name: "Usually not needed",
              rows: [
                { label: "Joint assets", value: "Owned as joint tenants with someone living" },
                { label: "Small balances", value: "Often under £5,000 to £50,000, depending on the bank" },
                { label: "Nominated benefits", value: "Pensions and life cover paid to a named person" },
              ],
            },
          ]}
        />
        <p>
          Ask each bank, building society and pension provider what they need. Each sets its own limit for releasing money without a grant.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={4} kicker="The cost" title="The court fees">
        <DataTable
          caption="Probate fees in England and Wales from 13 July 2026"
          head={["Item", "Fee"]}
          numeric={[1]}
          rows={[
            ["Estate of £5,000 or less", "£0"],
            ["Estate over £5,000", "£526"],
            ["Extra copy ordered with the application", "£2"],
            ["Extra copy ordered later", "£16"],
          ]}
        />
        <WorkedExample
          title="A £250,000 estate, with four copies ordered when applying"
          steps={[
            { label: "Application fee", value: "£526" },
            { label: "Four copies at £2", value: "£8" },
          ]}
          total={{ label: "Total court fees", value: "£534" }}
        />
        <p>
          Ordering the same four copies after applying would cost £64 instead of £8, taking the total to £590. Help with fees may be available if
          the applicant has a low income and little savings.
        </p>
      </GuideSection>

      <GuideSection id="increase" n={5} kicker="What changed" title="The July 2026 increase">
        <p>
          From 13 July 2026, the fee rose from £300 to £526, an increase of about 75%. The Ministry of Justice said the new fee reflects the full
          cost of the service. At the same time, the price of copies ordered with the application changed from £1.50 to £2.
        </p>
        <Figure label="Probate application fee" caption="The fee for estates over £5,000.">
          <Bars
            items={[
              { label: "Before July 2026", value: 300 },
              { label: "From 13 July 2026", value: 526 },
            ]}
          />
        </Figure>
        <p>
          For a £100,000 estate, the fee is now about 0.53% of the estate. For a £250,000 estate, it is about 0.21%. It is a flat fee, so it
          weighs more heavily on smaller estates.
        </p>
      </GuideSection>

      <GuideSection id="copies" n={6} kicker="Paperwork" title="Official copies">
        <p>
          Each organisation holding money or assets will want to see the grant. They usually accept an official sealed copy rather than the
          original. Count the banks, building societies, pension providers, share registrars and insurers, and add one or two spare.
        </p>
        <Callout tone="good" title="Order them with the application">
          At £2 each with the application, there is little reason to order too few. Later copies cost £16 each.
        </Callout>
      </GuideSection>

      <GuideSection id="diy" n={7} kicker="Doing it yourself" title="Applying yourself">
        <p>
          Most people can apply online at GOV.UK. You need the original will, the death certificate, and the estate&rsquo;s value. If Inheritance
          Tax is due, or a full account is needed, you must send form IHT400 to HMRC first and wait 20 working days before applying.
        </p>
        <ul>
          <li>Value everything the person owned and owed on the date of death.</li>
          <li>Check whether Inheritance Tax is due and whether the estate is an &ldquo;excepted estate&rdquo; that needs no IHT400.</li>
          <li>Apply online, pay the fee and order copies.</li>
          <li>Send the original will and any documents the court asks for.</li>
        </ul>
        <p>
          Doing it yourself costs only the court fee and copies. It can be straightforward for a simple estate with a will, a home and a few bank
          accounts.
        </p>
      </GuideSection>

      <GuideSection id="professional" n={8} kicker="Paying for help" title="Using a solicitor or probate firm">
        <p>Professional fees vary a lot. The main options are:</p>
        <DataTable
          caption="Example professional fees on a £250,000 estate, including VAT"
          head={["Fee basis", "Cost"]}
          numeric={[1]}
          rows={[
            ["1% of the estate", "£3,000"],
            ["2% of the estate", "£6,000"],
            ["3% of the estate", "£9,000"],
            ["5% of the estate", "£15,000"],
          ]}
        />
        <p>
          A grant-only service, where a firm prepares the application but you collect and distribute the assets, often costs a fixed fee of a
          few hundred to a couple of thousand pounds. Hourly rates suit complex estates. Always ask for a written estimate, and compare at least
          two firms. Professional fees are paid from the estate, not by the executor personally.
        </p>
      </GuideSection>

      <GuideSection id="iht" n={9} kicker="Tax" title="Inheritance Tax and probate">
        <p>
          If Inheritance Tax is due, most of it must be paid before the grant is issued. Many banks will pay it straight to HMRC from the
          deceased&rsquo;s accounts under the Direct Payment Scheme. Tax on property can be paid in yearly instalments. The{" "}
          <a href="/life/inheritance-tax">Inheritance Tax calculator</a> shows whether tax is likely.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={10} kicker="Timing" title="How long it takes">
        <Timeline
          items={[
            { when: "Weeks 1 to 8", what: "Value the estate", detail: "Write to banks, pension schemes and others for date-of-death values." },
            { when: "If tax is due", what: "Send IHT400 and pay", detail: "Then wait 20 working days." },
            { when: "Apply", what: "Online application", detail: "Pay £526 and order copies." },
            { when: "Weeks to months", what: "Grant issued", detail: "Times vary; check GOV.UK for the latest." },
            { when: "After the grant", what: "Collect, pay debts, distribute", detail: "Wait 6 months before distributing if there could be claims." },
          ]}
        />
      </GuideSection>

      <GuideSection id="executor" n={11} kicker="Responsibilities" title="Being an executor">
        <p>
          An executor must collect the assets, pay debts and taxes, and distribute what is left according to the will. You can be personally
          liable for mistakes, such as paying beneficiaries before a debt. Placing a Deceased Estate Notice in The Gazette protects you against
          unknown creditors.
        </p>
        <p>
          Keep careful records of everything you receive and pay out. Beneficiaries are entitled to see estate accounts. You can claim
          reasonable out-of-pocket expenses from the estate.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={12} kicker="Elsewhere" title="Scotland and Northern Ireland">
        <p>
          In Scotland, the equivalent of probate is called confirmation and is handled by the sheriff court, with its own fees. Northern Ireland
          has its own Probate Office and fees. This calculator covers England and Wales.
        </p>
      </GuideSection>

      <GuideSection id="no-will" n={13} kicker="Intestacy" title="If there is no will">
        <p>
          If someone dies without a valid will, the intestacy rules decide who inherits and who can apply. A spouse or civil partner is first in
          line, followed by children, parents, brothers and sisters and more distant relatives. Unmarried partners have no automatic right to
          inherit or to apply.
        </p>
        <DataTable
          caption="Who inherits without a will, England and Wales"
          head={["Family", "Who gets what"]}
          rows={[
            ["Spouse, no children", "Everything to the spouse"],
            ["Spouse and children", "Spouse gets personal possessions, the first £322,000 and half the rest; children share the other half"],
            ["Children, no spouse", "Children share everything equally"],
            ["No spouse or children", "Parents, then brothers and sisters, then other relatives"],
          ]}
        />
        <p>The application is for letters of administration rather than a grant of probate, but the fee is the same £526.</p>
      </GuideSection>

      <GuideSection id="excepted" n={14} kicker="Tax forms" title="Excepted estates and IHT forms">
        <p>
          Most estates are &ldquo;excepted estates&rdquo;, which means no Inheritance Tax account is needed and you simply give the figures in the
          probate application. Broadly, this covers estates under the nil-rate band, estates passing to a spouse or charity worth under £3 million,
          and some estates using a late spouse&rsquo;s unused band.
        </p>
        <p>
          If the estate is not excepted, you must send form IHT400 to HMRC and wait 20 working days before applying for probate. You will need
          more detailed valuations and supporting schedules.
        </p>
      </GuideSection>

      <GuideSection id="values" n={15} kicker="The numbers" title="Valuing the estate">
        <ul>
          <li>Ask banks and pension schemes for balances on the date of death.</li>
          <li>Use an estate agent&rsquo;s or surveyor&rsquo;s valuation for property, and a professional valuation if Inheritance Tax may be due.</li>
          <li>Value shares at their price on the date of death. A stockbroker or the share registrar can provide a valuation.</li>
          <li>Value household contents at what they would sell for second-hand, not their replacement cost.</li>
          <li>Deduct debts, such as a mortgage, credit cards, utility bills and funeral costs.</li>
        </ul>
        <p>
          The value you give decides whether the £526 fee is due and whether Inheritance Tax applies. If you later find more assets, tell HMRC and
          the probate registry.
        </p>
      </GuideSection>

      <GuideSection id="property" n={16} kicker="Houses" title="Selling a property during probate">
        <p>
          You can put a property on the market before the grant is issued, but the sale cannot complete until you have it. Keep the property
          insured, tell the insurer it is empty, and check whether council tax relief applies to an unoccupied home.
        </p>
        <p>
          If the property sells for more than its probate value, the estate may owe Capital Gains Tax on the increase. If it sells for less within
          4 years, the estate may be able to claim back some Inheritance Tax.
        </p>
      </GuideSection>

      <GuideSection id="disputes" n={17} kicker="Problems" title="Disputes and caveats">
        <p>
          Anyone who wants to stop a grant being issued, for example because they think the will is invalid, can enter a caveat. It costs a court
          fee and lasts six months. Disputes over wills or inheritance usually need legal advice and can add significantly to the cost of
          administering an estate.
        </p>
      </GuideSection>

      <GuideSection id="costs-saving" n={18} kicker="Saving money" title="Ways to keep costs down">
        <ol>
          <li>Apply yourself if the estate is straightforward.</li>
          <li>Order enough copies with the application at £2 each.</li>
          <li>Use a fixed-fee or grant-only service rather than a percentage fee for simple estates.</li>
          <li>Gather documents and valuations before instructing a professional, so you pay for less of their time.</li>
          <li>Ask whether small balances can be released without a grant.</li>
        </ol>
      </GuideSection>

      <GuideSection id="checklist" n={19} kicker="Step by step" title="An executor's checklist">
        <ol>
          <li>Register the death and get several certified copies of the death certificate.</li>
          <li>Find the will and check it is the latest version.</li>
          <li>Use the Tell Us Once service to inform government departments.</li>
          <li>Secure the home and valuables, and tell the insurer.</li>
          <li>Contact banks, pension providers, insurers and share registrars for date-of-death values.</li>
          <li>Work out whether Inheritance Tax is due and which forms are needed.</li>
          <li>Apply for probate, pay the £526 fee and order copies.</li>
          <li>Collect the assets, pay debts, taxes and expenses, and keep estate accounts.</li>
          <li>Distribute the estate to the beneficiaries and get receipts.</li>
        </ol>
        <p>
          The whole process often takes 9 to 12 months for a straightforward estate, longer if a property must be sold or Inheritance Tax is due.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={20} kicker="FAQs" title="Common questions">
        <h3>Who pays the probate fee?</h3>
        <p>The estate. The executor can pay it and claim it back from the estate.</p>
        <h3>Is the fee different with a solicitor?</h3>
        <p>No. The court fee is £526 either way. A solicitor charges their own fees on top.</p>
        <h3>Is the fee based on the size of the estate?</h3>
        <p>Only to decide whether it is over £5,000. Above that, every estate pays £526.</p>
        <h3>Can I get help with the fee?</h3>
        <p>You may be able to apply for Help with Fees if you have a low income and limited savings.</p>
        <h3>Do I need probate for a small estate?</h3>
        <p>
          Often not. If there is no property in the person&rsquo;s sole name and the banks will release the balances, you may not need a grant at
          all, and there is no fee for estates of £5,000 or less.
        </p>
        <h3>Can more than one executor apply?</h3>
        <p>Yes. Up to four people can be named on the grant. One executor can apply and the others confirm online.</p>
        <h3>What if I do not want to be an executor?</h3>
        <p>You can step aside by signing a renunciation, or have power reserved so you can act later if needed.</p>
        <h3>Is the probate fee refundable if the estate turns out to be small?</h3>
        <p>Contact the probate service. Fees paid in error can sometimes be refunded.</p>
        <h3>How long do I have to apply for probate?</h3>
        <p>
          There is no strict deadline, but Inheritance Tax is due six months after the death and interest is charged after that. Delays also
          leave property empty and accounts frozen.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£526", label: "Application fee" },
            { value: "£300", label: "Fee before July 2026" },
            { value: "£5,000", label: "No fee at or below" },
            { value: "£2 / £16", label: "Copies now or later" },
            { value: "75%", label: "Rise in July 2026" },
            { value: "20 days", label: "Wait after sending IHT400" },
            { value: "6 months", label: "Inheritance Tax due after death" },
            { value: "13 July 2026", label: "New fees started" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
