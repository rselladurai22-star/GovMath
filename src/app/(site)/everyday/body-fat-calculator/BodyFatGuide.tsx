import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Body fat — the guide. Figures from src/lib/life/body.ts and health.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What body fat percentage means" },
  { id: "navy", title: "The US Navy tape method" },
  { id: "example-man", title: "Worked example: a man" },
  { id: "example-woman", title: "Worked example: a woman" },
  { id: "measuring", title: "How to measure properly" },
  { id: "sensitivity", title: "Why small errors matter" },
  { id: "bmi-method", title: "The BMI-based estimate" },
  { id: "age", title: "Body fat and age" },
  { id: "categories", title: "Body fat categories" },
  { id: "essential", title: "Essential fat and going too low" },
  { id: "lean", title: "Fat mass and lean mass" },
  { id: "target", title: "Weight at a target body fat" },
  { id: "bmi-compare", title: "Body fat, BMI and waist size" },
  { id: "where", title: "Where you carry fat" },
  { id: "other-methods", title: "Other ways to measure body fat" },
  { id: "changing", title: "Lowering body fat" },
  { id: "tracking", title: "Tracking changes" },
  { id: "limits", title: "Who these methods do not suit" },
  { id: "help", title: "When to talk to a doctor" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Hodgdon and Beckett (1984), Naval Health Research Center report 84-11 (DTIC)", href: "https://apps.dtic.mil/sti/pdfs/ADA143890.pdf" },
  { label: "Deurenberg, Weststrate and Seidell (1991), British Journal of Nutrition (PubMed)", href: "https://pubmed.ncbi.nlm.nih.gov/2043597/" },
  { label: "American Council on Exercise — Body composition: which numbers matter?", href: "https://www.acefitness.org/resources/everyone/blog/5307/body-composition-which-numbers-matter/" },
  { label: "NHS — Obesity: diagnosis", href: "https://www.nhs.uk/conditions/obesity/diagnosis/" },
  { label: "NICE — Overweight and obesity management (NG246)", href: "https://www.nice.org.uk/guidance/ng246" },
  { label: "CDC — Adult BMI categories", href: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" },
];

const pct = (n: number) => `${n.toFixed(1)}%`;

export default function BodyFatGuide() {
  return (
    <Guide
      kicker="The body fat guide"
      title="Body fat percentage, explained"
      intro={
        <>
          Body fat percentage is the share of your weight that is fat. It says more about your body than weight alone, but it is hard to measure
          exactly. This guide explains the two estimates the calculator uses, how to measure yourself, what the categories mean and how body fat
          fits with BMI and waist size. It is general information, not medical advice.
        </>
      }
      meta={["US Navy and Deurenberg methods", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The US Navy method estimates body fat from your height and your neck and waist measurements, plus your hips if you are a woman.</li>
          <li>The BMI-based estimate uses only height, weight, age and sex, so it cannot tell muscle from fat.</li>
          <li>
            The American Council on Exercise puts the average range at <strong>18% to 24% for men</strong>{" "}and{" "}
            <strong>25% to 31% for women</strong>.
          </li>
          <li>Home methods are estimates, usually within a few points of a laboratory scan.</li>
        </ul>
        <KeyStats
          items={[
            { value: "18–24%", label: "Average range, men" },
            { value: "25–31%", label: "Average range, women" },
            { value: "25%+", label: "Obese range, men" },
            { value: "32%+", label: "Obese range, women" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="The basics" title="What body fat percentage means">
        <p>
          Your body is made of fat mass and everything else, called lean mass: muscle, bone, organs, skin and water. Body fat percentage is fat mass
          divided by total weight. Two people with the same height and weight can have very different body fat, which is why it adds something
          that weight and BMI cannot show on their own.
        </p>
        <p>
          Some fat is essential: it stores energy, cushions organs, insulates the body and helps make hormones. Too much, especially around the
          middle, raises the risk of type 2 diabetes, heart disease and some cancers.
        </p>
      </GuideSection>

      <GuideSection id="navy" n={3} kicker="Tape method" title="The US Navy tape method">
        <p>
          In 1984, researchers at the US Naval Health Research Center, James Hodgdon and Marcie Beckett, compared tape measurements with underwater
          weighing and produced equations that only need a tape measure. Versions of these equations have been used to check body fat in the US
          armed forces for decades.
        </p>
        <DataTable
          caption="The equations (all measurements in inches)"
          head={["", "Formula"]}
          rows={[
            ["Men", "86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76"],
            ["Women", "163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387"],
          ]}
        />
        <p>The calculator converts centimetres to inches using the exact definition, 1 inch = 2.54 cm, so you can measure in either unit.</p>
      </GuideSection>

      <GuideSection id="example-man" n={4} kicker="Step by step" title="Worked example: a man">
        <WorkedExample
          title="A man aged 40: height 178 cm, weight 80 kg, neck 38 cm, waist 90 cm"
          steps={[
            { label: "In inches", note: "178 ÷ 2.54, 38 ÷ 2.54, 90 ÷ 2.54", value: "70.1, 15.0, 35.4" },
            { label: "US Navy body fat", value: pct(20.3) },
            { label: "Category", value: "Average (18% to 24%)" },
            { label: "Fat mass", note: "80 kg × 20.3%", value: "16.2 kg" },
            { label: "Lean mass", note: "80 − 16.2", value: "63.8 kg" },
          ]}
          total={{ label: "BMI-based estimate for comparison", value: pct(23.3) }}
        />
      </GuideSection>

      <GuideSection id="example-woman" n={5} kicker="Step by step" title="Worked example: a woman">
        <WorkedExample
          title="A woman aged 35: height 165 cm, weight 68 kg, neck 33 cm, waist 76 cm, hips 100 cm"
          steps={[
            { label: "Waist + hips − neck", note: "76 + 100 − 33", value: "143 cm" },
            { label: "US Navy body fat", value: pct(30.2) },
            { label: "Category", value: "Average (25% to 31%)" },
            { label: "Fat mass", value: "20.6 kg" },
            { label: "Lean mass", value: "47.4 kg" },
          ]}
          total={{ label: "BMI-based estimate for comparison", value: pct(32.6) }}
        />
        <p>
          Her BMI is 25.0 and her waist-to-height ratio is 0.46, below the 0.5 that NICE recommends staying under.
        </p>
      </GuideSection>

      <GuideSection id="measuring" n={6} kicker="Get it right" title="How to measure properly">
        <ul>
          <li>Use a soft tape measure on bare skin, snug but not pressing in.</li>
          <li>
            <strong>Neck:</strong>{" "}just below the Adam&rsquo;s apple (larynx), with the tape sloping slightly downwards at the front.
          </li>
          <li>
            <strong>Waist, men:</strong>{" "}level with the belly button, at the end of a normal breath out.
          </li>
          <li>
            <strong>Waist, women:</strong>{" "}at the narrowest point between the ribs and hips, usually just above the belly button.
          </li>
          <li>
            <strong>Hips, women:</strong>{" "}around the widest part of the bottom, with feet together.
          </li>
          <li>Stand up straight, relax and do not hold your stomach in. Measure each site twice and use the average.</li>
        </ul>
      </GuideSection>

      <GuideSection id="sensitivity" n={7} kicker="Precision" title="Why small errors matter">
        <p>
          The result depends on the difference between your waist and your neck, so a centimetre or two changes it noticeably. For the man in the
          worked example:
        </p>
        <Bars
          items={[
            { label: "Waist 85 cm", value: 16.5 },
            { label: "Waist 90 cm", value: 20.3 },
            { label: "Waist 95 cm", value: 23.7 },
            { label: "Waist 100 cm", value: 26.8 },
          ]}
          format={(n) => `${n.toFixed(1)}%`}
        />
        <p>
          Each extra centimetre of waist adds about 0.7 points. A neck 1 cm larger lowers his result from 20.3% to 19.5%. For the woman, 4 cm more
          on either waist or hips moves her from 30.2% to 32.2%.
        </p>
      </GuideSection>

      <GuideSection id="bmi-method" n={8} kicker="No tape needed" title="The BMI-based estimate">
        <p>
          In 1991, Paul Deurenberg and colleagues published an equation linking body fat to BMI, age and sex, based on measurements of over 1,200
          people:
        </p>
        <p>
          <strong>Body fat % = 1.2 × BMI + 0.23 × age − 10.8 × sex − 5.4</strong>, where sex is 1 for men and 0 for women.
        </p>
        <p>
          It is handy when you have no tape measure, but it treats all weight above a healthy BMI as fat. Muscular people get results that are too
          high, and people who have lost muscle with age can get results that are too low. You can check your BMI with our{" "}
          <a href="/everyday/bmi-calculator">BMI calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="age" n={9} kicker="Over time" title="Body fat and age">
        <p>
          Body fat tends to rise with age, even at the same weight, as muscle is slowly lost. The Deurenberg equation reflects this: at the same BMI
          of 25, its estimate rises with age.
        </p>
        <DataTable
          caption="BMI-based estimate at a BMI of 25"
          head={["Age", "Men", "Women"]}
          rows={[
            ["25", pct(19.5), pct(30.4)],
            ["45", pct(24.1), pct(35.0)],
            ["65", pct(28.8), pct(39.6)],
          ]}
          numeric={[1, 2]}
        />
      </GuideSection>

      <GuideSection id="categories" n={10} kicker="What the number means" title="Body fat categories">
        <p>
          There is no official NHS range for body fat percentage. The calculator uses the widely quoted categories from the American Council on
          Exercise:
        </p>
        <DataTable
          caption="American Council on Exercise body fat categories"
          head={["Category", "Women", "Men"]}
          rows={[
            ["Essential fat", "10% to 13%", "2% to 5%"],
            ["Athletes", "14% to 20%", "6% to 13%"],
            ["Fitness", "21% to 24%", "14% to 17%"],
            ["Average", "25% to 31%", "18% to 24%"],
            ["Obese", "32% or more", "25% or more"],
          ]}
        />
        <p>These are guides for adults, not diagnoses. Older adults tend to sit higher in each range.</p>
      </GuideSection>

      <GuideSection id="essential" n={11} kicker="Too low" title="Essential fat and going too low">
        <p>
          Essential fat is the minimum the body needs to work normally: about 10% to 13% for women and 2% to 5% for men. Women need more for
          hormones and reproduction. Going very low, as some athletes and bodybuilders do for short periods, can stop periods, weaken bones and
          lower immunity. If you have a result under these levels, check your measurements and talk to your GP if you are concerned.
        </p>
      </GuideSection>

      <GuideSection id="lean" n={12} kicker="Two parts" title="Fat mass and lean mass">
        <p>
          The calculator splits your weight into fat mass (weight × body fat %) and lean mass (the rest). Lean mass drives how much energy you burn
          at rest, so it matters for weight loss. The Katch-McArdle formula in our <a href="/everyday/calorie-calculator">calorie calculator</a>{" "}
          uses it to estimate your daily calorie needs.
        </p>
        <Callout title="Lose fat, keep muscle">
          When you lose weight, some of the loss is usually lean mass. Strength exercise at least twice a week and enough protein help keep more of
          it.
        </Callout>
      </GuideSection>

      <GuideSection id="target" n={13} kicker="Planning" title="Weight at a target body fat">
        <p>
          If you know your lean mass, you can work out what you would weigh at a different body fat percentage, assuming your lean mass stays the
          same: lean mass ÷ (1 − target %).
        </p>
        <WorkedExample
          title="The man in the first example, 63.8 kg lean mass"
          steps={[
            { label: "At 18% body fat", note: "63.8 ÷ 0.82", value: "77.8 kg" },
            { label: "At 15% body fat", note: "63.8 ÷ 0.85", value: "75.0 kg" },
          ]}
          total={{ label: "Fat to lose for 15%", value: "About 5 kg" }}
        />
        <p>Set a target under More options to see this for your own figures.</p>
      </GuideSection>

      <GuideSection id="bmi-compare" n={14} kicker="Three measures" title="Body fat, BMI and waist size">
        <CompareCards
          columns={[
            {
              name: "BMI",
              rows: [
                { label: "Needs", value: "Height and weight" },
                { label: "Good for", value: "Quick screening" },
                { label: "Misses", value: "Muscle versus fat" },
              ],
            },
            {
              name: "Waist-to-height",
              rows: [
                { label: "Needs", value: "Waist and height" },
                { label: "Good for", value: "Fat around the middle" },
                { label: "Misses", value: "Total body fat" },
              ],
            },
            {
              name: "Body fat %",
              rows: [
                { label: "Needs", value: "Tape or scan" },
                { label: "Good for", value: "Body composition" },
                { label: "Misses", value: "Where the fat sits" },
              ],
            },
          ]}
        />
        <p>
          The NHS uses BMI and waist size to judge weight. NICE recommends keeping your waist to less than half your height. Together with body fat,
          they give a fuller picture than any one alone.
        </p>
      </GuideSection>

      <GuideSection id="where" n={15} kicker="Shape" title="Where you carry fat">
        <p>
          Fat stored deep in the abdomen around the organs (visceral fat) is more harmful than fat under the skin on the hips and thighs. That is
          why waist size matters so much, and why a person with a modest body fat percentage but a large waist can still have raised health risks.
          The calculator shows your waist-to-height ratio alongside your body fat.
        </p>
      </GuideSection>

      <GuideSection id="other-methods" n={16} kicker="Alternatives" title="Other ways to measure body fat">
        <DataTable
          caption="Common methods"
          head={["Method", "How it works", "Notes"]}
          rows={[
            ["DEXA scan", "Low-dose X-ray", "Very accurate; clinics and research"],
            ["Underwater weighing", "Body density", "Accurate but rarely available"],
            ["Air displacement (Bod Pod)", "Body volume", "Accurate; specialist centres"],
            ["Skinfold callipers", "Fat under the skin", "Depends on the tester's skill"],
            ["Smart scales", "Electrical impedance", "Varies with hydration"],
            ["Tape measure", "Circumferences", "Free and repeatable"],
          ]}
        />
      </GuideSection>

      <GuideSection id="changing" n={17} kicker="Making changes" title="Lowering body fat">
        <p>
          Body fat falls when you take in less energy than you use over time. Our <a href="/everyday/calorie-calculator">calorie calculator</a>{" "}
          estimates how much to eat. The NHS recommends at least 150 minutes of moderate activity a week and strength exercises on two days. Aim to
          lose 0.5 to 1 kg a week; slower loss keeps more muscle.
        </p>
      </GuideSection>

      <GuideSection id="tracking" n={18} kicker="Over weeks" title="Tracking changes">
        <p>
          Measure every four to six weeks, at the same time of day, with the same tape. A change of a point or less can be measuring error, so look
          at the trend over several months. The calculator takes centimetres or inches, so use whichever your tape shows.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={19} kicker="Limits" title="Who these methods do not suit">
        <ul>
          <li>Children and teenagers under 18, whose bodies are still growing.</li>
          <li>Pregnant women.</li>
          <li>Very muscular people, especially with the BMI-based estimate.</li>
          <li>People with a very large waist, where tape methods are less accurate.</li>
          <li>People with fluid retention or after an amputation.</li>
        </ul>
      </GuideSection>

      <GuideSection id="help" n={20} kicker="Support" title="When to talk to a doctor">
        <p>
          Talk to your GP if you are worried about your weight or body fat, if you have lost weight without trying, or if your result is below the
          essential fat range. In England, adults aged 40 to 74 are invited for a free NHS Health Check every 5 years, which includes BMI and
          waist checks. In the US, a yearly preventive visit is covered by most health plans.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "2–5%", label: "Essential fat, men" },
            { value: "10–13%", label: "Essential fat, women" },
            { value: "18–24%", label: "Average, men" },
            { value: "25–31%", label: "Average, women" },
            { value: "25%+", label: "Obese, men" },
            { value: "32%+", label: "Obese, women" },
            { value: "0.5", label: "Waist-to-height ratio to stay under" },
            { value: "2.54 cm", label: "One inch, exactly" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
