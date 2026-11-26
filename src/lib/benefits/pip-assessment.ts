/**
 * PIP assessment: the activities and descriptors from Schedule 1 to the Social
 * Security (Personal Independence Payment) Regulations 2013, in plain English.
 *
 * In each activity you score the highest descriptor that applies to you on more
 * than half of days. Points are added up separately for daily living and
 * mobility: 8 to 11 points gives the standard rate, 12 or more the enhanced rate.
 */

/**
 * `code` is this site's stable key (kept in share links); `letter` is the
 * descriptor's letter in the regulations, where it differs.
 */
export type Descriptor = { code: string; text: string; points: number; letter?: string };
export type Activity = { id: string; title: string; component: "daily" | "mobility"; descriptors: Descriptor[] };

const d = (code: string, points: number, text: string, letter?: string): Descriptor => ({ code, text, points, ...(letter ? { letter } : {}) });

/** The descriptor's letter as printed in Schedule 1. */
export const letterOf = (x: Descriptor) => x.letter ?? x.code;

/**
 * Codes that older share links used and now point elsewhere. Managing
 * therapy once split descriptor 3b in two (aid for medication, and help with
 * medication); the regulations have one 3b worth 1 point.
 */
const ALIASES: Record<string, Record<string, string>> = { therapy: { c: "b" } };
export const resolveCode = (activity: string, code: string | undefined) => (code && ALIASES[activity]?.[code]) ?? code;

export const PIP_ACTIVITIES: Activity[] = [
  {
    id: "food",
    title: "Preparing food",
    component: "daily",
    descriptors: [
      d("a", 0, "Can prepare and cook a simple meal unaided"),
      d("b", 2, "Needs an aid or appliance to prepare or cook a simple meal"),
      d("c", 2, "Cannot cook a simple meal on a conventional cooker but can with a microwave"),
      d("d", 2, "Needs prompting to prepare or cook a simple meal"),
      d("e", 4, "Needs supervision or help to prepare or cook a simple meal"),
      d("f", 8, "Cannot prepare and cook food at all"),
    ],
  },
  {
    id: "eating",
    title: "Taking nutrition",
    component: "daily",
    descriptors: [
      d("a", 0, "Can eat and drink unaided"),
      d("b", 2, "Needs an aid or appliance, or supervision or help to cut up food"),
      d("c", 2, "Needs a therapeutic source to take nutrition, such as a feeding tube"),
      d("d", 4, "Needs prompting to eat and drink"),
      d("e", 6, "Needs help to manage a therapeutic source to take nutrition"),
      d("f", 10, "Cannot get food and drink to the mouth and needs another person to do it"),
    ],
  },
  {
    id: "therapy",
    title: "Managing therapy or monitoring a health condition",
    component: "daily",
    descriptors: [
      d("a", 0, "Does not need medication, therapy or monitoring, or can manage them unaided"),
      d("b", 1, "Needs an aid or appliance, or supervision, prompting or help, to manage medication or monitor a health condition"),
      d("d", 2, "Needs supervision, prompting or help to manage therapy that takes up to 3.5 hours a week", "c"),
      d("e", 4, "Needs it for therapy that takes more than 3.5 and up to 7 hours a week", "d"),
      d("f", 6, "Needs it for therapy that takes more than 7 and up to 14 hours a week", "e"),
      d("g", 8, "Needs it for therapy that takes more than 14 hours a week", "f"),
    ],
  },
  {
    id: "washing",
    title: "Washing and bathing",
    component: "daily",
    descriptors: [
      d("a", 0, "Can wash and bathe unaided"),
      d("b", 2, "Needs an aid or appliance to wash or bathe"),
      d("c", 2, "Needs supervision or prompting to wash or bathe"),
      d("d", 2, "Needs help to wash hair or the body below the waist"),
      d("e", 3, "Needs help to get in or out of a bath or shower"),
      d("f", 4, "Needs help to wash the body between the shoulders and waist"),
      d("g", 8, "Cannot wash and bathe at all and needs another person to wash the whole body"),
    ],
  },
  {
    id: "toilet",
    title: "Managing toilet needs or incontinence",
    component: "daily",
    descriptors: [
      d("a", 0, "Can manage toilet needs or incontinence unaided"),
      d("b", 2, "Needs an aid or appliance for toilet needs or incontinence"),
      d("c", 2, "Needs supervision or prompting to manage toilet needs"),
      d("d", 4, "Needs help to manage toilet needs"),
      d("e", 6, "Needs help to manage incontinence of either bladder or bowel"),
      d("f", 8, "Needs help to manage incontinence of both bladder and bowel"),
    ],
  },
  {
    id: "dressing",
    title: "Dressing and undressing",
    component: "daily",
    descriptors: [
      d("a", 0, "Can dress and undress unaided"),
      d("b", 2, "Needs an aid or appliance to dress or undress"),
      d("c", 2, "Needs prompting or help to choose suitable clothes or to stay dressed"),
      d("d", 2, "Needs help to dress or undress the lower body"),
      d("e", 4, "Needs help to dress or undress the upper body"),
      d("f", 8, "Cannot dress or undress at all"),
    ],
  },
  {
    id: "speaking",
    title: "Communicating verbally",
    component: "daily",
    descriptors: [
      d("a", 0, "Can express and understand verbal information unaided"),
      d("b", 2, "Needs an aid or appliance to speak or hear"),
      d("c", 4, "Needs communication support to express or understand complex verbal information"),
      d("d", 8, "Needs communication support to express or understand basic verbal information"),
      d("e", 12, "Cannot express or understand verbal information at all, even with support"),
    ],
  },
  {
    id: "reading",
    title: "Reading and understanding signs, symbols and words",
    component: "daily",
    descriptors: [
      d("a", 0, "Can read and understand basic and complex written information unaided or with glasses"),
      d("b", 2, "Needs an aid or appliance other than glasses to read basic or complex information"),
      d("c", 2, "Needs prompting to read or understand complex written information"),
      d("d", 4, "Needs prompting to read or understand basic written information"),
      d("e", 8, "Cannot read or understand signs, symbols or words at all"),
    ],
  },
  {
    id: "people",
    title: "Engaging with other people face to face",
    component: "daily",
    descriptors: [
      d("a", 0, "Can engage with other people unaided"),
      d("b", 2, "Needs prompting to engage with other people"),
      d("c", 4, "Needs social support to engage with other people"),
      d("d", 8, "Cannot engage with other people because of overwhelming distress or a risk of harm"),
    ],
  },
  {
    id: "money",
    title: "Making budgeting decisions",
    component: "daily",
    descriptors: [
      d("a", 0, "Can manage complex budgeting decisions unaided"),
      d("b", 2, "Needs prompting or help to make complex budgeting decisions"),
      d("c", 4, "Needs prompting or help to make simple budgeting decisions"),
      d("d", 6, "Cannot make any budgeting decisions at all"),
    ],
  },
  {
    id: "journeys",
    title: "Planning and following journeys",
    component: "mobility",
    descriptors: [
      d("a", 0, "Can plan and follow the route of a journey unaided"),
      d("b", 4, "Needs prompting to undertake any journey, to avoid overwhelming distress"),
      d("c", 8, "Cannot plan the route of a journey"),
      d("d", 10, "Cannot follow an unfamiliar route without another person, an assistance dog or an orientation aid"),
      d("e", 10, "Cannot undertake any journey because it would cause overwhelming distress"),
      d("f", 12, "Cannot follow a familiar route without another person, an assistance dog or an orientation aid"),
    ],
  },
  {
    id: "moving",
    title: "Moving around",
    component: "mobility",
    descriptors: [
      d("a", 0, "Can stand and then move more than 200 metres"),
      d("b", 4, "Can stand and then move more than 50 metres but no more than 200 metres"),
      d("c", 8, "Can stand and then move unaided more than 20 metres but no more than 50 metres"),
      d("d", 10, "Can stand and then move using an aid more than 20 metres but no more than 50 metres"),
      d("e", 12, "Can stand and then move more than 1 metre but no more than 20 metres"),
      d("f", 12, "Cannot stand or move more than 1 metre"),
    ],
  },
];

import { forYear, type RatesYear } from "./rates-year";

export const PIP_2026 = {
  daily: { standard: 76.7, enhanced: 114.6 },
  mobility: { standard: 30.3, enhanced: 80.0 },
} as const;

/** Proposed weekly rates from 6 April 2027: DWP "Proposed benefit and pension rates 2027 to 2028". */
export const PIP_2027 = {
  daily: { standard: 79.4, enhanced: 118.6 },
  mobility: { standard: 31.35, enhanced: 82.8 },
} as const;

export type PipRates = { daily: { standard: number; enhanced: number }; mobility: { standard: number; enhanced: number } };
export const pipRates = (year?: RatesYear): PipRates => forYear<PipRates>(year, PIP_2026, PIP_2027);

export type PipBand = "none" | "standard" | "enhanced";

export const pipBand = (points: number): PipBand => (points >= 12 ? "enhanced" : points >= 8 ? "standard" : "none");

export type PipScore = {
  daily: number;
  mobility: number;
  dailyBand: PipBand;
  mobilityBand: PipBand;
  dailyWeekly: number;
  mobilityWeekly: number;
  weekly: number;
  fourWeekly: number;
  annual: number;
  /** Points needed to reach the next band, per component (0 when already enhanced). */
  dailyToNext: number;
  mobilityToNext: number;
};

/** Score from the chosen descriptor code per activity id (missing means "a"). */
export function pipScore(choices: Record<string, string | undefined>, year?: RatesYear): PipScore {
  const R = pipRates(year);
  let daily = 0;
  let mobility = 0;
  for (const a of PIP_ACTIVITIES) {
    const code = resolveCode(a.id, choices[a.id]);
    const pick = a.descriptors.find((x) => x.code === code) ?? a.descriptors[0];
    if (a.component === "daily") daily += pick.points;
    else mobility += pick.points;
  }
  const dailyBand = pipBand(daily);
  const mobilityBand = pipBand(mobility);
  const dailyWeekly = dailyBand === "none" ? 0 : R.daily[dailyBand];
  const mobilityWeekly = mobilityBand === "none" ? 0 : R.mobility[mobilityBand];
  const weekly = dailyWeekly + mobilityWeekly;
  const toNext = (p: number) => (p >= 12 ? 0 : p >= 8 ? 12 - p : 8 - p);
  return {
    daily,
    mobility,
    dailyBand,
    mobilityBand,
    dailyWeekly,
    mobilityWeekly,
    weekly,
    fourWeekly: weekly * 4,
    annual: weekly * 52,
    dailyToNext: toNext(daily),
    mobilityToNext: toNext(mobility),
  };
}
