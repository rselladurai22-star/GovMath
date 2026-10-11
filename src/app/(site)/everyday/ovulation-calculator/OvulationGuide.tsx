import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Ovulation guide. Every date comes from src/lib/life/pregnancy.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "cycle", title: "How the menstrual cycle works" },
  { id: "ovulation", title: "When ovulation happens" },
  { id: "luteal", title: "The luteal phase" },
  { id: "window", title: "The fertile window" },
  { id: "example", title: "A worked example" },
  { id: "long-short", title: "Longer and shorter cycles" },
  { id: "irregular", title: "Irregular cycles" },
  { id: "signs", title: "Signs of ovulation" },
  { id: "tests", title: "Ovulation tests and tracking" },
  { id: "timing", title: "How often to have sex" },
  { id: "how-long", title: "How long it usually takes" },
  { id: "test-when", title: "When to take a pregnancy test" },
  { id: "due-date", title: "From ovulation to due date" },
  { id: "contraception", title: "Why this is not contraception" },
  { id: "after-pill", title: "After stopping contraception" },
  { id: "health", title: "Getting ready for pregnancy" },
  { id: "gp", title: "When to see a GP" },
  { id: "myths", title: "Common myths" },
  { id: "diary", title: "Keeping a cycle diary" },
  { id: "partners", title: "For partners: what helps" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NHS: Fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
  { label: "NHS: Infertility", href: "https://www.nhs.uk/conditions/infertility/" },
  { label: "NHS: Natural family planning", href: "https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/" },
  { label: "NHS: Due date calculator", href: "https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/" },
  { label: "NHS: Trying to get pregnant", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/trying-to-get-pregnant/" },
];

export default function OvulationGuide() {
  return (
    <Guide
      kicker="The ovulation guide"
      title="Ovulation, fertile days and your cycle"
      intro={
        <>
          You can only get pregnant on a few days in each menstrual cycle: the days around ovulation. This guide explains how ovulation is estimated from
          your cycle, what the fertile window is, how to handle irregular cycles and why a calendar is not contraception. It is based on NHS information
          and is not medical advice.
        </>
      }
      meta={["NHS-based", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Ovulation usually happens about <strong>14 days before your next period</strong>; the NHS gives a range of 10 to 16 days.</li>
          <li>For a 28-day cycle that is around <strong>day 15</strong>, counting the first day of your period as day 1.</li>
          <li>Your <strong>fertile window</strong> is the 5 days before ovulation plus ovulation day, because sperm can survive for up to 7 days.</li>
          <li>Cycles change from month to month, so the dates are estimates. They are not a safe way to avoid pregnancy.</li>
        </ul>
        <KeyStats
          items={[
            { value: "10 to 16", label: "Days before a period that ovulation happens" },
            { value: "21 to 35", label: "Days: a normal cycle length" },
            { value: "Up to 7", label: "Days sperm can survive" },
            { value: "6 days", label: "Fertile window used here" },
          ]}
        />
      </GuideSection>

      <GuideSection id="cycle" n={2} kicker="Basics" title="How the menstrual cycle works">
        <p>
          A cycle starts on the first day of a period (day 1) and ends the day before the next period. The NHS says the average is about 28 days, and
          anything from 21 to 35 days is normal. In each cycle, hormones ripen an egg in one of the ovaries. Ovulation is when that egg is released into
          the fallopian tube, where it can be fertilised.
        </p>
        <p>
          If the egg is not fertilised, the lining of the womb is shed about two weeks later: that is your period, and the next cycle begins.
        </p>
      </GuideSection>

      <GuideSection id="ovulation" n={3} kicker="Timing" title="When ovulation happens">
        <p>
          Ovulation is easier to count backwards from the next period than forwards from the last one. The part of the cycle after ovulation is fairly
          steady, while the part before it varies. So the calculator takes your cycle length and subtracts the luteal phase (14 days unless you change it).
        </p>
        <DataTable
          head={["Cycle length", "Ovulation (cycle day)", "Fertile window (cycle days)"]}
          rows={[
            ["24 days", "Day 11", "Days 6 to 11"],
            ["28 days", "Day 15", "Days 10 to 15"],
            ["32 days", "Day 19", "Days 14 to 19"],
            ["35 days", "Day 22", "Days 17 to 22"],
          ]}
        />
      </GuideSection>

      <GuideSection id="luteal" n={4} kicker="Advanced option" title="The luteal phase">
        <p>
          The luteal phase runs from ovulation to the next period. The calculator uses 14 days, but some people have 11 or 12 days and others 16. If ovulation
          tests or temperature charts show yours, enter it under More options. With a 28-day cycle and an 11-day luteal phase, ovulation moves three days
          later: for a period that started on 1 October 2026, from 15 October to 18 October.
        </p>
      </GuideSection>

      <GuideSection id="window" n={5} kicker="The key idea" title="The fertile window">
        <p>
          An egg lives for a short time after ovulation, but sperm can survive in the body for up to 7 days. So sex in the days before ovulation can lead to
          pregnancy. The calculator shows the 5 days before ovulation and ovulation day itself: the days when pregnancy is most likely. The chances are
          highest in the two or three days up to and including ovulation.
        </p>
        <Callout title="Why 6 days and not 7?">
          Sperm can survive up to 7 days, but most do not live that long. The 6-day window covers the days when conception is most likely. It is not a
          guarantee that other days are safe.
        </Callout>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Example" title="A worked example">
        <WorkedExample
          title="Period started 1 October 2026, 28-day cycle"
          steps={[
            { label: "Next period due", value: "29 October 2026" },
            { label: "Ovulation: 14 days earlier", value: "15 October 2026" },
            { label: "Fertile window starts: 5 days before", value: "10 October 2026" },
          ]}
          total={{ label: "Fertile window", value: "10 to 15 October 2026" }}
        />
        <p>The next two cycles follow on every 28 days:</p>
        <DataTable
          head={["Period starts", "Fertile window", "Next period"]}
          rows={[
            ["1 October 2026", "10 to 15 October", "29 October 2026"],
            ["29 October 2026", "7 to 12 November", "26 November 2026"],
            ["26 November 2026", "5 to 10 December", "24 December 2026"],
          ]}
        />
      </GuideSection>

      <GuideSection id="long-short" n={7} kicker="Cycle length" title="Longer and shorter cycles">
        <p>
          With a longer cycle, ovulation comes later. A 32-day cycle starting on 1 October 2026 gives ovulation around 19 October and a fertile window from 14
          October. With a short cycle, ovulation can come soon after the period ends, which is why the NHS notes that you can sometimes get pregnant just
          after a period.
        </p>
        <CompareCards
          columns={[
            { name: "28-day cycle", rows: [{ label: "Ovulation", value: "15 October" }, { label: "Fertile window", value: "10 to 15 October" }, { label: "Next period", value: "29 October" }] },
            { name: "32-day cycle", rows: [{ label: "Ovulation", value: "19 October" }, { label: "Fertile window", value: "14 to 19 October" }, { label: "Next period", value: "2 November" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="irregular" n={8} kicker="Irregular cycles" title="Irregular cycles">
        <p>
          If your cycle length changes by more than a few days, one average gives a false sense of precision. Turn on &quot;My cycles are irregular&quot;
          and enter your shortest and longest recent cycles. The calculator then shows a wider window: from the earliest fertile day in your shortest cycle
          to the latest ovulation in your longest.
        </p>
        <WorkedExample
          title="Cycles of 26 to 34 days, period started 1 October 2026"
          steps={[
            { label: "Average (30-day) window", value: "12 to 17 October" },
            { label: "Earliest start (26-day cycle)", value: "8 October" },
            { label: "Latest ovulation (34-day cycle)", value: "21 October" },
          ]}
          total={{ label: "Wider window", value: "8 to 21 October 2026" }}
        />
        <p>
          Irregular cycles are common in the teenage years, around the menopause, after pregnancy, while breastfeeding and with conditions such as polycystic
          ovary syndrome (PCOS). Ovulation tests help most here.
        </p>
      </GuideSection>

      <GuideSection id="signs" n={9} kicker="Your body" title="Signs of ovulation">
        <p>Some people notice signs around ovulation:</p>
        <ul>
          <li>cervical mucus becoming clearer, wetter and stretchy, like raw egg white;</li>
          <li>a small rise in body temperature after ovulation (measured first thing each morning);</li>
          <li>a mild ache on one side of the lower tummy;</li>
          <li>a higher sex drive.</li>
        </ul>
        <p>These signs vary and are easy to miss. Together with dates, they give a clearer picture.</p>
      </GuideSection>

      <GuideSection id="tests" n={10} kicker="Tools" title="Ovulation tests and tracking">
        <p>
          Ovulation predictor kits from pharmacies test your urine for the surge in luteinising hormone (LH) that comes a day or two before ovulation. Start
          testing a few days before your expected fertile window; the calculator&rsquo;s dates tell you when. Temperature charts confirm ovulation after it
          has happened, which helps you learn your own pattern over a few months, including your luteal phase.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={11} kicker="Trying for a baby" title="How often to have sex">
        <p>
          The NHS suggests regular unprotected sex every 2 or 3 days through the cycle. That way there are usually healthy sperm waiting when ovulation
          happens, without the stress of timing it to the day. The calculator is useful for knowing roughly when you are most fertile, not for scheduling.
        </p>
      </GuideSection>

      <GuideSection id="how-long" n={12} kicker="Expectations" title="How long it usually takes">
        <p>
          It is normal not to conceive straight away. The NHS says more than 8 out of 10 couples, where the woman is under 40, will conceive naturally within
          a year of regular unprotected sex. Age is the biggest factor: fertility falls gradually from the early thirties.
        </p>
      </GuideSection>

      <GuideSection id="test-when" n={13} kicker="Testing" title="When to take a pregnancy test">
        <p>
          Most home pregnancy tests work from the first day of a missed period. The calculator shows when your next period is due. Testing earlier can give a
          negative result even if you are pregnant; if your period still does not come, test again a few days later.
        </p>
      </GuideSection>

      <GuideSection id="due-date" n={14} kicker="Next step" title="From ovulation to due date">
        <p>
          If you conceive, your due date is about 266 days after ovulation, or 280 days after the first day of your last period for a 28-day cycle. A
          period on 1 October 2026 would give a due date of 8 July 2027. The <a href="/everyday/pregnancy-due-date">pregnancy due date calculator</a>{" "}shows the
          full timeline, from scans to full term, and the results table above links to it with your dates filled in.
        </p>
      </GuideSection>

      <GuideSection id="contraception" n={15} kicker="Important" title="Why this is not contraception">
        <Callout title="A calendar alone does not prevent pregnancy">
          Ovulation can come early or late in any cycle, and sperm can survive for up to 7 days. Natural family planning taught properly and following all
          its rules (temperature, cervical mucus and cycle length) is 91% to 99% effective with perfect use, but the NHS says it is only 76% effective with
          typical use. A calculator alone is less reliable than that.
        </Callout>
        <p>If you do not want to get pregnant, talk to a GP, pharmacist or sexual health clinic about contraception.</p>
      </GuideSection>

      <GuideSection id="after-pill" n={16} kicker="Changes" title="After stopping contraception">
        <p>
          After you stop hormonal contraception, it can take a few cycles for periods to settle. You can get pregnant straight away, even before your first
          period. Until your cycles are regular, ovulation is hard to predict from dates.
        </p>
      </GuideSection>

      <GuideSection id="health" n={17} kicker="Preparing" title="Getting ready for pregnancy">
        <ul>
          <li>The NHS recommends taking a daily folic acid supplement from before you conceive until 12 weeks of pregnancy.</li>
          <li>Stopping smoking and cutting out alcohol helps fertility and a healthy pregnancy.</li>
          <li>A healthy weight helps: check yours with the <a href="/everyday/bmi-calculator">BMI calculator</a>.</li>
          <li>
            Plan the money side too: the <a href="/uk/benefits/baby-cost-calculator">cost of a baby calculator</a>{" "}and the{" "}
            <a href="/uk/benefits/maternity-pay">maternity pay calculator</a>{" "}show what to expect in the UK.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="gp" n={18} kicker="Support" title="When to see a GP">
        <Timeline
          items={[
            { when: "After a year of trying", what: "See a GP", detail: "If you have not conceived with regular unprotected sex." },
            { when: "Sooner", what: "If you are 36 or over", detail: "Or if you already know of a possible fertility problem." },
            { when: "Any time", what: "If periods are very irregular, painful or stop", detail: "Or are under 21 or over 35 days apart." },
          ]}
        />
        <p>Outside the UK, speak to your doctor or gynaecologist.</p>
      </GuideSection>

      <GuideSection id="myths" n={19} kicker="Myth-busting" title="Common myths">
        <ul>
          <li><strong>&quot;Everyone ovulates on day 14.&quot;</strong> Only with a 28-day cycle and a 14-day luteal phase, and even then not every month.</li>
          <li><strong>&quot;You can&rsquo;t get pregnant during your period.&quot;</strong> Unlikely, but possible with a short cycle, because sperm can survive into your fertile window.</li>
          <li><strong>&quot;Apps know exactly when you ovulate.&quot;</strong> Apps that use dates only make the same estimate as this calculator.</li>
        </ul>
      </GuideSection>

      <GuideSection id="diary" n={20} kicker="Tracking" title="Keeping a cycle diary">
        <p>
          The calculator is only as good as the cycle length you give it. Write down the first day of each period for three to six months, in a diary,
          a calendar or an app. Count the days between the starts to get each cycle length, then use the average. Note the shortest and longest too: if
          they differ by more than a few days, use the irregular option.
        </p>
        <p>
          A diary also helps a GP if you ever need to discuss your periods or fertility. Note any bleeding between periods, very heavy periods or bad pain,
          as these are worth mentioning even if your cycles are regular.
        </p>
        <DataTable
          head={["Period started", "Cycle length"]}
          rows={[
            ["1 July", "29 days"],
            ["30 July", "27 days"],
            ["26 August", "30 days"],
            ["25 September", "Average: about 29 days"],
          ]}
        />
      </GuideSection>

      <GuideSection id="partners" n={21} kicker="Together" title="For partners: what helps">
        <p>
          Fertility is shared. The NHS advice on regular sex every 2 or 3 days applies to both partners, and so does the advice on lifestyle: not smoking,
          keeping alcohol within the guidelines and a healthy weight all help sperm as well as eggs. Trying for a baby can be stressful, especially when it
          takes longer than hoped. Talking openly, and not treating the fertile window as a deadline, helps many couples. If you have been trying for a
          year, both partners should see a GP, as tests are usually offered to both.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Cycle facts from the NHS"
          head={["What", "Figure"]}
          rows={[
            ["Normal cycle length", "21 to 35 days (average about 28)"],
            ["Ovulation", "About 10 to 16 days before the next period"],
            ["Sperm survival", "Up to 7 days"],
            ["Fertile window used here", "5 days before ovulation plus ovulation day"],
            ["Couples conceiving within a year", "More than 8 in 10 (woman under 40)"],
            ["Natural family planning", "91% to 99% perfect use, 76% typical use"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
