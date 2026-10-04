import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** SORN — the guide. Figures from src/lib/vehicles/tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a SORN is" },
  { id: "when", title: "When to make a SORN" },
  { id: "how", title: "How to make a SORN" },
  { id: "refund", title: "How the refund works" },
  { id: "rules", title: "Rules while a car is SORN" },
  { id: "insurance", title: "Insurance and MOT" },
  { id: "back", title: "Putting the car back on the road" },
  { id: "penalties", title: "Penalties" },
  { id: "compare", title: "SORN or keep it taxed?" },
  { id: "seasonal", title: "Seasonal and classic cars" },
  { id: "other-routes", title: "Selling, scrapping and exporting" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Make a SORN", href: "https://www.gov.uk/make-a-sorn" },
  { label: "GOV.UK — Cancel your vehicle tax and get a refund", href: "https://www.gov.uk/vehicle-tax-refund" },
  { label: "GOV.UK — When you need to make a SORN", href: "https://www.gov.uk/sorn-statutory-off-road-notification" },
];

export default function SornGuide() {
  return (
    <Guide
      kicker="The SORN guide"
      title="How to take a car off the road and get a tax refund"
      intro={
        <>
          A Statutory Off Road Notification, or SORN, tells the DVLA a vehicle is kept off public roads, so you do not need to tax it. Making a
          SORN cancels your tax and triggers a refund of any full months left. This guide explains when to make one, how the refund is worked
          out, and the rules while a car is off the road.
        </>
      }
      meta={["2026 rules", "7 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Making a SORN is free and takes a few minutes online.</li>
          <li>You get back tax for every full calendar month left after the month the DVLA receives the SORN.</li>
          <li>A car on the £200 standard rate with SORN on 15 October and tax due on 1 April gets £83.33 back.</li>
          <li>A SORN car must be kept off public roads, except to drive to a pre-booked MOT.</li>
        </ul>
        <KeyStats
          items={[
            { value: "Free", label: "To make a SORN" },
            { value: "Full months", label: "What is refunded" },
            { value: "£80", label: "Penalty for no tax or SORN" },
            { value: "£1,000", label: "Maximum court fine" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a SORN is">
        <p>
          Every vehicle registered in the UK must either be taxed or declared off the road with a SORN. A SORN lasts until the vehicle is
          taxed again, sold, scrapped or permanently exported. You do not need to renew it each year.
        </p>
      </GuideSection>

      <GuideSection id="when" n={3} kicker="Uses" title="When to make a SORN">
        <ul>
          <li>The car is off the road for repairs or restoration.</li>
          <li>You are storing a car over winter, for example a classic or convertible.</li>
          <li>You are abroad for a long time and the car is parked on private land.</li>
          <li>The car has failed its MOT and you are not ready to fix it.</li>
        </ul>
        <p>
          You do not need a SORN if you are selling, scrapping or exporting the car. Telling the DVLA about those cancels the tax and gives a
          refund automatically.
        </p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="How to" title="How to make a SORN">
        <Timeline
          items={[
            { when: "Online or by phone", what: "Use the 16-digit reference on your tax reminder or the 11-digit V5C reference", detail: "Available 24 hours a day." },
            { when: "By post", what: "Fill in the V890 form or the SORN section of the tax reminder", detail: "Takes longer to process." },
            { when: "Straight away", what: "Tax is cancelled and any Direct Debit stops", detail: "You get a confirmation letter." },
          ]}
        />
      </GuideSection>

      <GuideSection id="refund" n={5} kicker="Refund" title="How the refund works">
        <p>
          The DVLA refunds every full calendar month of tax left after the month it receives your SORN. Part months are not refunded, so it
          makes no difference which day of the month you make the SORN. Waiting until the next month loses a month&rsquo;s tax.
        </p>
        <WorkedExample
          title="£200 a year, SORN on 15 October 2026, tax due 1 April 2027"
          steps={[
            { label: "Monthly tax: £200 ÷ 12", value: "£16.67" },
            { label: "Full months left: November to March", value: "5" },
          ]}
          total={{ label: "Refund", value: "£83.33" }}
        />
        <DataTable
          caption="Same dates, different tax bills"
          head={["Yearly tax", "Refund"]}
          numeric={[0, 1]}
          rows={[
            ["£200", "£83.33"],
            ["£640 (with the expensive car supplement)", "£266.67"],
          ]}
        />
        <p>
          If you pay by Direct Debit, the payments simply stop. The refund is usually sent within six weeks to the address on the V5C.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={6} kicker="Rules" title="Rules while a car is SORN">
        <CompareCards
          columns={[
            { name: "Allowed", rows: [{ label: "Where", value: "Kept on a drive, in a garage or on private land" }, { label: "Driving", value: "Only to a pre-booked MOT test" }] },
            { name: "Not allowed", rows: [{ label: "Where", value: "Parked on a public road, even outside your home" }, { label: "Driving", value: "Any other journey" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="insurance" n={7} kicker="Cover" title="Insurance and MOT">
        <p>
          You do not need insurance for a SORN car under the continuous insurance rules. Many owners keep fire and theft cover while it is
          stored. Cancelling £40 a month of cover for six months saves £240, on top of £100 of tax at the £200 rate.
        </p>
        <p>You also do not need an MOT while a car is SORN, but you need a valid MOT before you can tax it again.</p>
      </GuideSection>

      <GuideSection id="back" n={8} kicker="Restarting" title="Putting the car back on the road">
        <p>
          To use the car again, tax it online or at a Post Office. Taxing it ends the SORN automatically. You will need a valid MOT, if the car
          needs one, and insurance from the moment it goes on the road. Tax always starts from the first of the month.
        </p>
      </GuideSection>

      <GuideSection id="penalties" n={9} kicker="Penalties" title="Penalties">
        <ul>
          <li>Untaxed and not SORN: an automatic £80 late licensing penalty, reduced to £40 if paid promptly.</li>
          <li>Using or keeping a SORN car on a public road: a fine of up to £1,000, and the car can be clamped or impounded.</li>
          <li>No insurance on a car that is not SORN: an £100 fixed penalty and possible prosecution.</li>
        </ul>
        <Callout tone="warn" title="Selling a SORN car">
          The SORN ends when the car changes hands. The new keeper must tax it or make their own SORN.
        </Callout>
      </GuideSection>

      <GuideSection id="compare" n={10} kicker="Choice" title="SORN or keep it taxed?">
        <p>
          If a car will be off the road for a month or more, a SORN usually saves money. On the £200 standard rate, each full month off the
          road saves £16.67 in tax. Cars paying the expensive car supplement save £53.33 a month. Six months off the road with £40 a month of
          insurance cancelled saves £340 in total at the standard rate.
        </p>
        <p>
          For a short break of a few weeks, the saving is small, and you lose the month the SORN is made. Keeping the car taxed and insured can
          be simpler if you might need it at short notice.
        </p>
      </GuideSection>

      <GuideSection id="seasonal" n={11} kicker="Storage" title="Seasonal and classic cars">
        <p>
          Owners of convertibles, motorbikes and classic cars often SORN them over winter. Historic vehicles over 40 years old pay no vehicle
          tax but still need to be taxed in the historic class or declared SORN. When you put a stored car back on the road, check the battery,
          tyres and brakes, and make sure the MOT is still valid.
        </p>
      </GuideSection>

      <GuideSection id="other-routes" n={12} kicker="Other options" title="Selling, scrapping and exporting">
        <DataTable
          head={["What you do", "How the tax ends", "Refund"]}
          rows={[
            ["Sell or transfer", "Tell the DVLA online or with the V5C", "Full months left"],
            ["Scrap", "The authorised treatment facility tells the DVLA", "Full months left"],
            ["Export", "Send the export section of the V5C to the DVLA", "Full months left"],
            ["Keep off the road", "Make a SORN", "Full months left"],
          ]}
        />
      </GuideSection>

      <GuideSection id="mistakes" n={13} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Leaving a SORN car on the street.</strong> Even parked outside your home, it must be taxed.</li>
          <li><strong>Letting tax lapse without a SORN.</strong> This triggers the automatic £80 penalty.</li>
          <li><strong>Driving to anywhere but a booked MOT.</strong> Insurance may also not cover a SORN car on the road.</li>
          <li><strong>Forgetting to tax it again.</strong> Tax before you drive, and check the MOT and insurance too.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={14} kicker="FAQs" title="Common questions">
        <h3>Does a SORN last forever?</h3>
        <p>Yes, until the car is taxed, sold, scrapped or exported. You do not renew it.</p>
        <h3>Can I SORN a car with no tax left?</h3>
        <p>Yes. You must make a SORN or tax the car as soon as the tax runs out, or you risk the £80 penalty.</p>
        <h3>Can I get a refund on a car I sold?</h3>
        <p>Yes. Tell the DVLA you sold it, and any full months left are refunded automatically.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£0", label: "Cost of a SORN" },
            { value: "Full months", label: "Refund basis" },
            { value: "6 weeks", label: "Typical refund time" },
            { value: "£80 / £40", label: "Late licensing penalty" },
            { value: "£1,000", label: "Maximum fine" },
            { value: "£16.67", label: "A month at £200 a year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
