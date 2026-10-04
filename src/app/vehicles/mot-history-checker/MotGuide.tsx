import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, type Source, type TocItem } from "@/components/guide/Guide";

/** MOT — the guide. Dates from src/lib/vehicles/rules.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "when", title: "When your MOT is due" },
  { id: "early", title: "Testing early and keeping your date" },
  { id: "history", title: "Checking a vehicle's MOT history" },
  { id: "results", title: "What the results mean" },
  { id: "cost", title: "How much an MOT costs" },
  { id: "fails", title: "Common reasons for failing" },
  { id: "after-fail", title: "If your car fails" },
  { id: "exempt", title: "Vehicles that do not need an MOT" },
  { id: "penalties", title: "Penalties" },
  { id: "buying", title: "Using MOT history when buying" },
  { id: "preparing", title: "Preparing for the test" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Getting an MOT", href: "https://www.gov.uk/getting-an-mot" },
  { label: "GOV.UK — Check the MOT history of a vehicle", href: "https://www.gov.uk/check-mot-history" },
  { label: "GOV.UK — MOT reminders", href: "https://www.gov.uk/mot-reminder" },
  { label: "GOV.UK — Historic (classic) vehicles: MOT and vehicle tax", href: "https://www.gov.uk/historic-vehicles" },
];

export default function MotGuide() {
  return (
    <Guide
      kicker="The MOT guide"
      title="When your MOT is due and how to check its history"
      intro={
        <>
          Most cars need an MOT test every year once they are three years old. This guide explains how the due date is worked out, how to test
          early without losing days, what the results mean, and how to check any vehicle&rsquo;s MOT history for free.
        </>
      }
      meta={["2026 rules", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A car&rsquo;s first MOT is due on the third anniversary of its registration, or the fourth in Northern Ireland.</li>
          <li>After that it needs an MOT every year.</li>
          <li>You can test up to a month minus a day early and keep the same renewal date.</li>
          <li>The maximum fee for a car is £54.85.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3 years", label: "First MOT in Great Britain" },
            { value: "£54.85", label: "Maximum fee for a car" },
            { value: "£1,000", label: "Fine for no MOT" },
            { value: "40 years", label: "Usually exempt after" },
          ]}
        />
      </GuideSection>

      <GuideSection id="when" n={2} kicker="Dates" title="When your MOT is due">
        <DataTable
          head={["Registered", "First MOT due", "Then"]}
          rows={[
            ["15 May 2023 (Great Britain)", "15 May 2026", "Every year by the expiry date"],
            ["15 May 2023 (Northern Ireland)", "15 May 2027", "Every year by the expiry date"],
            ["29 February 2024", "28 February 2027", "Every year by the expiry date"],
          ]}
        />
        <p>The expiry date is on your last MOT certificate, and you can check it online with the registration number.</p>
      </GuideSection>

      <GuideSection id="early" n={3} kicker="Timing" title="Testing early and keeping your date">
        <p>
          You can have an MOT up to a month minus a day before the current one runs out and keep the same renewal date. If your MOT expires on
          15 May, the earliest you can test and keep 15 May next year is 16 April. Testing earlier than that is allowed, but the new
          certificate runs for a year from the test date, so you lose days.
        </p>
        <Callout title="Book ahead">Book early in the window, so there is time to fix any faults before the old certificate runs out.</Callout>
      </GuideSection>

      <GuideSection id="history" n={4} kicker="History" title="Checking a vehicle's MOT history">
        <p>
          The DVSA&rsquo;s free online service shows the MOT history of any vehicle tested in Great Britain since 2005, using only the
          registration number. It lists each test, the result, the mileage recorded, and any failures, advisories and minor defects. Enter a
          plate in the calculator for a direct link.
        </p>
      </GuideSection>

      <GuideSection id="results" n={5} kicker="Results" title="What the results mean">
        <CompareCards
          columns={[
            { name: "Pass", rows: [{ label: "Advisories", value: "Things to keep an eye on" }, { label: "Minor defects", value: "Fix soon; recorded on the certificate" }] },
            { name: "Fail", rows: [{ label: "Major defects", value: "Must be repaired and retested" }, { label: "Dangerous defects", value: "Do not drive until repaired" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="cost" n={6} kicker="Fees" title="How much an MOT costs">
        <DataTable
          caption="Maximum fees set by DVSA"
          head={["Vehicle", "Maximum fee"]}
          numeric={[1]}
          rows={[
            ["Car (up to 8 passenger seats)", "£54.85"],
            ["Motorcycle", "£29.65"],
          ]}
        />
        <p>Many garages charge less than the maximum, especially when combined with a service. A partial retest is often free if done within 10 working days.</p>
      </GuideSection>

      <GuideSection id="fails" n={7} kicker="Failures" title="Common reasons for failing">
        <ul>
          <li>Lights and indicators, including number plate lights.</li>
          <li>Tyres below the 1.6mm legal tread depth or with damage.</li>
          <li>Brakes and suspension.</li>
          <li>The driver&rsquo;s view: windscreen damage, wipers and washers.</li>
          <li>Warning lights on the dashboard, such as engine management or airbag lights.</li>
        </ul>
      </GuideSection>

      <GuideSection id="after-fail" n={8} kicker="Next steps" title="If your car fails">
        <Timeline
          items={[
            { when: "Dangerous defect", what: "Do not drive it away", detail: "Repair at the test centre or arrange recovery." },
            { when: "Major defect, old MOT still valid", what: "You can drive to have it repaired", detail: "Only if the car is roadworthy." },
            { when: "Within 10 working days", what: "Partial retest", detail: "Often free if the car stays at the centre, or a reduced fee." },
          ]}
        />
      </GuideSection>

      <GuideSection id="exempt" n={9} kicker="Exemptions" title="Vehicles that do not need an MOT">
        <p>
          Cars and motorbikes made more than 40 years ago, and not substantially changed, are usually exempt. Electric goods vehicles registered
          before March 2015 and some other vehicles are exempt too. Exempt vehicles must still be roadworthy, and owners can choose to have a
          voluntary MOT.
        </p>
      </GuideSection>

      <GuideSection id="penalties" n={10} kicker="Penalties" title="Penalties">
        <p>
          Driving without a valid MOT can lead to a fine of up to £1,000. Driving a car with a dangerous defect can lead to a fine of up to
          £2,500, a ban and 3 penalty points. Your insurance may also be invalid. You can drive a car without a valid MOT only to a pre-booked
          test or to a garage for repairs.
        </p>
      </GuideSection>

      <GuideSection id="buying" n={11} kicker="Buying" title="Using MOT history when buying">
        <ul>
          <li>Check the mileage rises steadily from test to test. A fall can mean the clock has been changed.</li>
          <li>Look for repeated advisories, such as corrosion, that may now be due.</li>
          <li>Check the car has had an MOT each year; gaps can mean it was off the road.</li>
        </ul>
      </GuideSection>

      <GuideSection id="preparing" n={12} kicker="Tips" title="Preparing for the test">
        <ol>
          <li>Walk round the car and check every light, including brake lights and the number plate light.</li>
          <li>Check tyre tread and pressures, and look for cuts or bulges.</li>
          <li>Top up the screen wash and check the wipers clear the screen.</li>
          <li>Remove clutter that blocks the view, and clean the number plates.</li>
          <li>Make sure no warning lights are on, and that the horn works.</li>
        </ol>
      </GuideSection>

      <GuideSection id="questions" n={13} kicker="FAQs" title="Common questions">
        <h3>Do electric cars need an MOT?</h3>
        <p>Yes, on the same timetable as petrol and diesel cars, though there is no emissions test.</p>
        <h3>Can I tax a car without an MOT?</h3>
        <p>No. You need a valid MOT, if the car needs one, before you can tax it.</p>
        <h3>Will I get a reminder?</h3>
        <p>You can sign up on GOV.UK for a free text or email reminder a month before your MOT is due.</p>
        <h3>What is checked in an MOT?</h3>
        <p>Lights, brakes, steering, suspension, tyres and wheels, seatbelts, the body and structure, the exhaust and emissions, the driver&rsquo;s view, the horn and the registration plates. The engine, clutch and gearbox are not checked.</p>
        <h3>Does an MOT mean the car is in good condition?</h3>
        <p>No. It only shows the car met the minimum standard on the day. A service and a proper inspection are still worth doing, especially when buying.</p>
        <h3>What if I lose my MOT certificate?</h3>
        <p>You do not need it. The result is recorded online, and you can print a copy from the GOV.UK MOT history service.</p>
        <h3>Can I drive to the MOT if it has expired?</h3>
        <p>Yes, but only to a test booked in advance, or to a garage for repairs needed to pass. You still need insurance and tax.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "3 / 4 years", label: "First MOT, GB / NI" },
            { value: "1 month − 1 day", label: "Early test window" },
            { value: "£54.85", label: "Car fee maximum" },
            { value: "£29.65", label: "Motorcycle fee maximum" },
            { value: "£1,000", label: "No MOT fine" },
            { value: "£2,500", label: "Dangerous defect fine" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
