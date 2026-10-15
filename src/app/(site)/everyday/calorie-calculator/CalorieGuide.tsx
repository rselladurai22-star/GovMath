import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Calorie needs — the guide. Figures from src/lib/life/body.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "bmr", title: "What BMR means" },
  { id: "tdee", title: "From BMR to daily calories" },
  { id: "example", title: "A worked example" },
  { id: "formulas", title: "The three formulas compared" },
  { id: "activity", title: "Choosing your activity level" },
  { id: "nhs", title: "The NHS 2,000 and 2,500 figures" },
  { id: "losing", title: "Calories to lose weight" },
  { id: "rates", title: "How fast is safe" },
  { id: "floor", title: "The lowest target we show" },
  { id: "gaining", title: "Calories to gain weight" },
  { id: "age", title: "Age, sex and size" },
  { id: "macros", title: "Protein, carbs and fat" },
  { id: "labels", title: "Reading food labels" },
  { id: "tracking", title: "Counting calories in practice" },
  { id: "plateau", title: "When progress stalls" },
  { id: "exercise", title: "Exercise and calories" },
  { id: "who-not", title: "Who should not use this" },
  { id: "units", title: "Using kg, pounds or stones" },
  { id: "help", title: "Getting help" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NHS — Understanding calories", href: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/understanding-calories/" },
  { label: "NHS Better Health — Calories and weight loss", href: "https://www.nhs.uk/better-health/lose-weight/calorie-counting/" },
  { label: "NHS — Very low calorie diets", href: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/very-low-calorie-diets/" },
  { label: "NHS — How to read food labels", href: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/how-to-read-food-labels/" },
  { label: "NHS — Physical activity guidelines for adults", href: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/" },
  { label: "Harvard Health — Calorie counting made easy", href: "https://www.health.harvard.edu/healthy-aging-and-longevity/calorie-counting-made-easy" },
  { label: "Mifflin and others (1990), American Journal of Clinical Nutrition (PubMed)", href: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
  { label: "Roza and Shizgal (1984), Harris-Benedict revised (PubMed)", href: "https://pubmed.ncbi.nlm.nih.gov/6741850/" },
];

const kcal = (n: number) => `${n.toLocaleString("en-GB")} kcal`;

export default function CalorieGuide() {
  return (
    <Guide
      kicker="The calorie guide"
      title="How many calories you need, explained"
      intro={
        <>
          Your body uses energy all day, even while you sleep. This guide explains how that energy is estimated, how the NHS reference figures of
          2,000 and 2,500 kcal fit in, how much to cut or add to change your weight at a steady rate, and the lower limits that keep a diet safe. It
          is general information, not medical advice.
        </>
      }
      meta={["Mifflin-St Jeor, Harris-Benedict, Katch-McArdle", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Your basal metabolic rate (BMR) is the energy you use at rest. Multiply it by an activity factor to get the calories you burn in a day.</li>
          <li>
            Eat that many calories to stay the same weight. Eat about <strong>550 kcal a day less</strong>{" "}to lose about 0.5 kg (1 lb) a week.
          </li>
          <li>
            The NHS says to aim to lose <strong>0.5 to 1 kg a week</strong>, and that diets of 800 kcal a day or less need medical supervision.
          </li>
          <li>Every figure is an estimate. Check your weight over three or four weeks and adjust.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2,000", label: "NHS average for women, kcal a day" },
            { value: "2,500", label: "NHS average for men, kcal a day" },
            { value: "7,700", label: "kcal in about 1 kg of body weight" },
            { value: "0.5–1 kg", label: "NHS weekly weight loss target" },
          ]}
        />
      </GuideSection>

      <GuideSection id="bmr" n={2} kicker="At rest" title="What BMR means">
        <p>
          Basal metabolic rate is the energy your body needs to keep running if you did nothing all day: your heart beating, your lungs breathing,
          your brain working and your body staying warm. For most adults it is the biggest part of the energy they use, more than half of the total.
        </p>
        <p>
          BMR depends mainly on how much lean tissue you have. Muscle and organs use far more energy than fat, which is why larger and more muscular
          people burn more, and why BMR tends to drop slowly with age as muscle is lost.
        </p>
      </GuideSection>

      <GuideSection id="tdee" n={3} kicker="All day" title="From BMR to daily calories">
        <p>
          Total daily energy expenditure (TDEE) is everything you burn in a day. It adds the energy you use moving about, exercising and digesting
          food to your BMR. Calculators estimate it by multiplying BMR by a standard activity factor:
        </p>
        <DataTable
          caption="Activity multipliers"
          head={["Activity level", "Typical week", "Multiplier"]}
          rows={[
            ["Sedentary", "Desk job, little or no exercise", "1.2"],
            ["Lightly active", "Light exercise 1 to 3 days", "1.375"],
            ["Moderately active", "Moderate exercise 3 to 5 days", "1.55"],
            ["Very active", "Hard exercise 6 to 7 days", "1.725"],
            ["Extra active", "Physical job plus hard training", "1.9"],
          ]}
          numeric={[2]}
        />
        <p>Your TDEE is the number of calories that keeps your weight steady, sometimes called your maintenance calories.</p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Step by step" title="A worked example">
        <WorkedExample
          title="A woman aged 35, 165 cm tall, weighing 70 kg, exercising 3 to 5 days a week"
          steps={[
            { label: "Mifflin-St Jeor BMR", note: "10 × 70 + 6.25 × 165 − 5 × 35 − 161", value: kcal(1395) },
            { label: "Moderately active", note: "BMR × 1.55", value: kcal(2163) },
            { label: "To lose 0.5 kg a week", note: "0.5 × 7,700 ÷ 7 = 550 less a day", value: kcal(1613) },
            { label: "Goal weight 65 kg", note: "5 kg at 0.5 kg a week", value: "10 weeks" },
          ]}
          total={{ label: "Daily target", value: kcal(1613) }}
        />
        <p>
          For a man aged 40, 180 cm tall and weighing 85 kg, the same steps give a BMR of {kcal(1780)}, about {kcal(2759)} a day to maintain at the
          same activity level, and {kcal(2209)} to lose 0.5 kg a week.
        </p>
      </GuideSection>

      <GuideSection id="formulas" n={5} kicker="Which equation" title="The three formulas compared">
        <p>
          <strong>Mifflin-St Jeor</strong>{" "}(1990) is the default. In studies it has come closest to measured resting energy for most adults.{" "}
          <strong>Harris-Benedict</strong>{" "}is older, first published in 1919 and revised in 1984, and usually gives a slightly higher figure.{" "}
          <strong>Katch-McArdle</strong>{" "}ignores age and sex and uses lean body mass instead, so it needs your body fat percentage. Our{" "}
          <a href="/everyday/body-fat-calculator">body fat calculator</a>{" "}can estimate that from a tape measure.
        </p>
        <Bars
          items={[
            { label: "Mifflin-St Jeor", value: 1395 },
            { label: "Harris-Benedict", value: 1455 },
            { label: "Katch-McArdle, 30% fat", value: 1428 },
            { label: "Katch-McArdle, 25% fat", value: 1504 },
          ]}
          format={(n) => `${n.toLocaleString("en-GB")} kcal`}
        />
        <p>
          The chart shows BMR for the woman in the worked example. The formulas differ by about 100 kcal, a reminder that each is an estimate.
        </p>
      </GuideSection>

      <GuideSection id="activity" n={6} kicker="Be honest" title="Choosing your activity level">
        <p>
          The activity level makes a bigger difference than the choice of formula. For the same woman, maintenance calories range from{" "}
          {kcal(1674)} sedentary to {kcal(2651)} extra active.
        </p>
        <Bars
          items={[
            { label: "Sedentary", value: 1674 },
            { label: "Lightly active", value: 1918 },
            { label: "Moderately active", value: 2163 },
            { label: "Very active", value: 2407 },
            { label: "Extra active", value: 2651 },
          ]}
          format={(n) => `${n.toLocaleString("en-GB")} kcal`}
        />
        <p>
          Count your job and your exercise together. A desk worker who goes to the gym twice a week is lightly active. People tend to overestimate
          how active they are, so if in doubt pick the lower level.
        </p>
      </GuideSection>

      <GuideSection id="nhs" n={7} kicker="Reference values" title="The NHS 2,000 and 2,500 figures">
        <p>
          The NHS says an average man needs about 2,500 kcal a day and an average woman about 2,000 kcal to keep a steady weight. These are reference
          values, used on food labels and in public advice, not targets for any one person. A small, inactive older woman may need much less than
          2,000 kcal, and a tall, active young man much more than 2,500 kcal.
        </p>
      </GuideSection>

      <GuideSection id="losing" n={8} kicker="Energy balance" title="Calories to lose weight">
        <p>
          You lose weight when you take in less energy than you use. A common rule of thumb is that about 7,700 kcal equals 1 kg of body weight
          (about 3,500 kcal a pound). Spread over a week, that gives these daily changes:
        </p>
        <DataTable
          caption="Daily change for each weekly rate (worked-example woman, maintenance 2,163 kcal)"
          head={["Rate a week", "Change a day", "Daily target", "Weeks to lose 5 kg"]}
          rows={[
            ["0.25 kg (½ lb)", "−275 kcal", kcal(1888), "20"],
            ["0.5 kg (1 lb)", "−550 kcal", kcal(1613), "10"],
            ["0.75 kg (1½ lb)", "−825 kcal", kcal(1338), "6.7"],
            ["1 kg (2 lb)", "−1,100 kcal", `${kcal(1200)} (limit)`, "5.7"],
          ]}
          numeric={[1, 2, 3]}
        />
        <p>
          The NHS&rsquo;s own advice is to cut about 600 kcal a day, and its 12-week weight loss plan uses daily targets of 1,400 kcal for women and
          1,900 kcal for men.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={9} kicker="Steady wins" title="How fast is safe">
        <p>
          The NHS suggests aiming to lose 0.5 to 1 kg (1 to 2 lb) a week. Faster loss is more likely to include muscle, can leave you tired and short
          of nutrients, and is harder to keep off. The calculator warns you if you choose a rate faster than 1 kg a week.
        </p>
        <Callout title="The real rule of thumb is an approximation">
          Early losses are often faster because of water, and later losses slower because a smaller body uses less energy. Use the weekly figure as
          a guide, not a promise.
        </Callout>
      </GuideSection>

      <GuideSection id="floor" n={10} kicker="Safety" title="The lowest target we show">
        <p>
          Harvard Health advises that calorie intake should not fall below about 1,200 kcal a day for women or 1,500 kcal for men except under a
          health professional&rsquo;s supervision. Below those levels it is hard to get the protein, vitamins and minerals you need. The calculator
          never shows a lower target and tells you when it has stopped at the limit.
        </p>
        <WorkedExample
          title="A woman aged 60, 155 cm, 55 kg, sedentary, aiming to lose 0.5 kg a week"
          steps={[
            { label: "BMR", value: kcal(1058) },
            { label: "Maintenance", note: "× 1.2", value: kcal(1269) },
            { label: "Maintenance − 550", value: kcal(719) },
            { label: "Raised to the lower limit", value: kcal(1200) },
          ]}
          total={{ label: "Expected loss at 1,200 kcal", value: "About 0.06 kg a week" }}
        />
        <p>
          The NHS describes very low calorie diets, of 800 kcal a day or less, as suitable only for some people and only under medical supervision.
          For someone like this, more activity is a better lever than eating less.
        </p>
      </GuideSection>

      <GuideSection id="gaining" n={11} kicker="Building up" title="Calories to gain weight">
        <p>
          To gain weight, eat a little more than your maintenance figure. Gaining about 0.25 kg a week needs roughly 275 kcal a day extra, so the
          worked-example woman would eat about {kcal(2438)}. A slow gain with strength training means more of the extra weight is muscle. If your
          BMI is under 18.5, check it with our <a href="/everyday/bmi-calculator">BMI calculator</a>{" "}and talk to your GP, as being underweight can
          have a medical cause.
        </p>
      </GuideSection>

      <GuideSection id="age" n={12} kicker="What changes it" title="Age, sex and size">
        <p>
          In the Mifflin-St Jeor formula, each extra year of age takes 5 kcal off your BMR, so a decade lowers it by 50 kcal. Men get 166 kcal more
          than women of the same size (the +5 and −161 in the formula), reflecting more muscle on average.
        </p>
        <DataTable
          caption="BMR of a woman 165 cm, 70 kg, by age (Mifflin-St Jeor)"
          head={["Age", "BMR"]}
          rows={[
            ["25", kcal(1445)],
            ["45", kcal(1345)],
            ["65", kcal(1245)],
          ]}
          numeric={[1]}
        />
        <p>Weight and height matter most. Every kilogram adds 10 kcal and every centimetre 6.25 kcal to BMR.</p>
      </GuideSection>

      <GuideSection id="macros" n={13} kicker="Macronutrients" title="Protein, carbs and fat">
        <p>
          Food energy comes from three macronutrients. Protein and carbohydrate give 4 kcal a gram and fat 9 kcal a gram. The calculator splits
          your target into grams using one of three common patterns:
        </p>
        <DataTable
          caption="Grams a day at 2,000 kcal"
          head={["Split", "Protein", "Carbohydrate", "Fat"]}
          rows={[
            ["Balanced (20/50/30)", "100 g", "250 g", "67 g"],
            ["Higher protein (30/40/30)", "150 g", "200 g", "67 g"],
            ["Lower carb (30/25/45)", "150 g", "125 g", "100 g"],
          ]}
          numeric={[1, 2, 3]}
        />
        <p>
          The NHS Eatwell Guide suggests basing meals on starchy foods, eating plenty of fruit and vegetables, and choosing unsaturated fats in small
          amounts. Total calories matter most for weight, but more protein can help you feel full and keep muscle while losing weight.
        </p>
      </GuideSection>

      <GuideSection id="labels" n={14} kicker="In the shop" title="Reading food labels">
        <p>
          UK food labels show energy in kilojoules (kJ) and kilocalories (kcal). One kcal is 4.184 kJ, so 2,000 kcal is about 8,400 kJ. The
          &quot;reference intake&quot; percentages on the front of packs are based on 2,000 kcal a day: an average adult&rsquo;s daily needs, not a
          personal target. If your target is lower, each item is a bigger share of your day than the label suggests.
        </p>
      </GuideSection>

      <GuideSection id="tracking" n={15} kicker="Day to day" title="Counting calories in practice">
        <ul>
          <li>Weigh food for a week or two to learn what a portion looks like.</li>
          <li>Count drinks, cooking oil, sauces and snacks; they are the easiest to miss.</li>
          <li>Use the NHS Weight Loss Plan app or a food diary for a few weeks.</li>
          <li>Weigh yourself once a week, at the same time of day.</li>
        </ul>
        <p>
          If your scales and your app use different units, enter your weight in either: this calculator and the{" "}
          <a href="/everyday/bmi-calculator">BMI calculator</a>{" "}both accept kilograms, pounds or stones and pounds.
        </p>
      </GuideSection>

      <GuideSection id="plateau" n={16} kicker="Stuck?" title="When progress stalls">
        <p>
          Weight loss rarely runs in a straight line. If your weight has not changed for three or four weeks, recalculate with your new weight, check
          your activity level, and look again at portion sizes. Then lower your target by 100 to 200 kcal, staying above the lower limit. A smaller
          body needs fewer calories: for the worked-example woman, losing 5 kg lowers maintenance by about 78 kcal a day at the same activity.
        </p>
      </GuideSection>

      <GuideSection id="exercise" n={17} kicker="Moving more" title="Exercise and calories">
        <p>
          The NHS recommends adults do at least 150 minutes of moderate activity a week, or 75 minutes of vigorous activity, and strengthening
          exercises on at least two days. Activity helps keep weight off and protects muscle while you lose weight. Fitness trackers often
          overestimate calories burned, so avoid eating back every calorie they report.
        </p>
      </GuideSection>

      <GuideSection id="who-not" n={18} kicker="Not for everyone" title="Who should not use this">
        <CompareCards
          columns={[
            {
              name: "Talk to a professional first",
              rows: [
                { label: "Pregnant or breastfeeding", value: "Ask your midwife or GP" },
                { label: "Under 18", value: "Growth charts apply" },
                { label: "Eating disorder history", value: "Speak to your GP" },
                { label: "Diabetes or other conditions", value: "Ask your care team" },
              ],
            },
            {
              name: "Fine to use as a guide",
              rows: [
                { label: "Healthy adults", value: "Maintain, lose or gain" },
                { label: "Older adults", value: "Keep protein up" },
                { label: "Regular exercisers", value: "Pick an honest activity level" },
                { label: "Muscular people", value: "Try Katch-McArdle" },
              ],
            },
          ]}
        />
        <p>
          Families on a low income who are pregnant or have young children may be able to get help buying healthy food: check the{" "}
          <a href="/uk/life/healthy-start">Healthy Start calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="units" n={19} kicker="Any units" title="Using kg, pounds or stones">
        <p>
          Enter your height in centimetres or feet and inches, and your weight in kilograms, pounds or stones and pounds. The formulas work in
          metric, so the calculator converts using exact definitions: 1 lb is 0.45359237 kg and 1 inch is 2.54 cm, so 5 ft 7 in is 170.2 cm and 11 st 5 lb is 72.1 kg.
        </p>
      </GuideSection>

      <GuideSection id="help" n={20} kicker="Support" title="Getting help">
        <p>
          In the UK, the free NHS Weight Loss Plan app offers a 12-week plan, and your GP can refer you to a local weight management service. In the
          US, ask your doctor about programs your health insurance covers. A registered dietitian can give personal advice on what and how much to
          eat.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "2,000", label: "NHS average woman, kcal a day" },
            { value: "2,500", label: "NHS average man, kcal a day" },
            { value: "600", label: "NHS daily cut to lose weight, kcal" },
            { value: "7,700", label: "kcal per kg, rule of thumb" },
            { value: "1,200", label: "Lowest target for women, kcal" },
            { value: "1,500", label: "Lowest target for men, kcal" },
            { value: "800", label: "Very low calorie diet, kcal or less" },
            { value: "150 min", label: "Weekly activity target" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
