/**
 * Body measures: weight and height conversions, calorie needs (BMR, TDEE,
 * targets and macros) and body fat estimates (US Navy tape method and the
 * Deurenberg BMI equation). Pure functions, tested in body.test.ts.
 */

/* ── Exact unit definitions ────────────────────────────────────── */

/** International pound (Weights and Measures Act 1985; 1959 agreement). */
export const KG_PER_LB = 0.45359237;
/** International inch. */
export const CM_PER_IN = 2.54;
export const LB_PER_ST = 14;
export const OZ_PER_LB = 16;
export const IN_PER_FT = 12;

const pos = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);
const roundTo = (n: number, dp: number) => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

/* ── Weight ────────────────────────────────────────────────────── */

export const kgFromLb = (lb: number) => pos(lb) * KG_PER_LB;
export const lbFromKg = (kg: number) => pos(kg) / KG_PER_LB;
export const kgFromStLb = (st: number, lb: number) => (pos(st) * LB_PER_ST + pos(lb)) * KG_PER_LB;
export const kgFromLbOz = (lb: number, oz: number) => (pos(lb) + pos(oz) / OZ_PER_LB) * KG_PER_LB;
/** Stone as a decimal, e.g. 11.5 st. */
export const stFromKg = (kg: number) => lbFromKg(kg) / LB_PER_ST;

/** Whole stones and the pounds left over, rounded to `dp` places (carrying 14 lb into a stone). */
export function stLbFromKg(kg: number, dp = 1): { st: number; lb: number } {
  const total = roundTo(lbFromKg(kg), dp);
  let st = Math.floor(total / LB_PER_ST + 1e-9);
  let lb = roundTo(total - st * LB_PER_ST, dp);
  if (lb >= LB_PER_ST) {
    st += 1;
    lb = roundTo(lb - LB_PER_ST, dp);
  }
  return { st, lb: Math.max(0, lb) };
}

/** Whole pounds and the ounces left over, rounded to `dp` places. */
export function lbOzFromKg(kg: number, dp = 0): { lb: number; oz: number } {
  const totalOz = roundTo(lbFromKg(kg) * OZ_PER_LB, dp);
  let lb = Math.floor(totalOz / OZ_PER_LB + 1e-9);
  let oz = roundTo(totalOz - lb * OZ_PER_LB, dp);
  if (oz >= OZ_PER_LB) {
    lb += 1;
    oz = roundTo(oz - OZ_PER_LB, dp);
  }
  return { lb, oz: Math.max(0, oz) };
}

const trim = (n: number, dp: number) => Number(n.toFixed(dp)).toString();

/** "11 st 4.5 lb" */
export function stLbText(kg: number, dp = 1): string {
  const { st, lb } = stLbFromKg(kg, dp);
  return `${st} st ${trim(lb, dp)} lb`;
}

/** "7 lb 8 oz" */
export function lbOzText(kg: number, dp = 0): string {
  const { lb, oz } = lbOzFromKg(kg, dp);
  return `${lb} lb ${trim(oz, dp)} oz`;
}

export type WeightRow = { st: number; label: string; kg: number; lb: number };

/** A stone table, e.g. 7 st to 25 st in half stones. */
export function weightTable(fromSt = 7, toSt = 25, stepSt = 0.5): WeightRow[] {
  const rows: WeightRow[] = [];
  const step = stepSt > 0 ? stepSt : 0.5;
  for (let s = fromSt; s <= toSt + 1e-9; s += step) {
    const whole = Math.floor(s + 1e-9);
    const lb = roundTo((s - whole) * LB_PER_ST, 1);
    const kg = kgFromStLb(whole, lb);
    rows.push({ st: s, label: `${whole} st ${trim(lb, 1)} lb`, kg, lb: lbFromKg(kg) });
  }
  return rows;
}

/* ── Height ────────────────────────────────────────────────────── */

export const cmFromFtIn = (ft: number, inches: number) => (pos(ft) * IN_PER_FT + pos(inches)) * CM_PER_IN;
export const cmFromIn = (inches: number) => pos(inches) * CM_PER_IN;
export const inFromCm = (cm: number) => pos(cm) / CM_PER_IN;

/** Whole feet and the inches left over, rounded to `dp` places (carrying 12 in into a foot). */
export function ftInFromCm(cm: number, dp = 1): { ft: number; inches: number } {
  const total = roundTo(inFromCm(cm), dp);
  let ft = Math.floor(total / IN_PER_FT + 1e-9);
  let inches = roundTo(total - ft * IN_PER_FT, dp);
  if (inches >= IN_PER_FT) {
    ft += 1;
    inches = roundTo(inches - IN_PER_FT, dp);
  }
  return { ft, inches: Math.max(0, inches) };
}

/** 5′ 7.5″ written as "5 ft 7.5 in". */
export function ftInText(cm: number, dp = 1): string {
  const { ft, inches } = ftInFromCm(cm, dp);
  return `${ft} ft ${trim(inches, dp)} in`;
}

export type HeightRow = { inches: number; label: string; cm: number; m: number };

/** A height table in whole inches, e.g. 4′10″ (58 in) to 6′8″ (80 in). */
export function heightTable(fromIn = 58, toIn = 80): HeightRow[] {
  const rows: HeightRow[] = [];
  for (let i = Math.round(fromIn); i <= Math.round(toIn); i++) {
    const cm = cmFromIn(i);
    rows.push({ inches: i, label: `${Math.floor(i / IN_PER_FT)}′${i % IN_PER_FT}″`, cm, m: cm / 100 });
  }
  return rows;
}

/* ── Calories ──────────────────────────────────────────────────── */

export type Sex = "female" | "male";
export type BmrFormula = "mifflin" | "harris" | "katch";

/**
 * Basal metabolic rate in kcal a day.
 * - Mifflin-St Jeor (1990): 10W + 6.25H − 5A + 5 (men) or − 161 (women).
 * - Harris-Benedict, revised by Roza and Shizgal (1984).
 * - Katch-McArdle: 370 + 21.6 × lean mass (kg); needs body fat.
 */
export function bmr(p: { formula: BmrFormula; sex: Sex; kg: number; cm: number; age: number; bodyFatPct?: number }): number {
  const kg = pos(p.kg);
  const cm = pos(p.cm);
  const age = pos(p.age);
  if (p.formula === "katch" && p.bodyFatPct !== undefined && p.bodyFatPct > 0) {
    const lean = kg * (1 - Math.min(70, p.bodyFatPct) / 100);
    return 370 + 21.6 * lean;
  }
  if (p.formula === "harris") {
    return p.sex === "male" ? 88.362 + 13.397 * kg + 4.799 * cm - 5.677 * age : 447.593 + 9.247 * kg + 3.098 * cm - 4.33 * age;
  }
  return 10 * kg + 6.25 * cm - 5 * age + (p.sex === "male" ? 5 : -161);
}

export type Activity = "sedentary" | "light" | "moderate" | "active" | "very";

/** Standard activity multipliers applied to BMR to estimate total daily energy expenditure. */
export const ACTIVITY: Record<Activity, { factor: number; label: string; note: string }> = {
  sedentary: { factor: 1.2, label: "Sedentary", note: "Desk job, little or no exercise" },
  light: { factor: 1.375, label: "Lightly active", note: "Light exercise 1 to 3 days a week" },
  moderate: { factor: 1.55, label: "Moderately active", note: "Moderate exercise 3 to 5 days a week" },
  active: { factor: 1.725, label: "Very active", note: "Hard exercise 6 to 7 days a week" },
  very: { factor: 1.9, label: "Extra active", note: "Physical job plus hard training" },
};

/** Rule of thumb: about 7,700 kcal of energy per kg of body weight lost or gained (3,500 kcal a pound). */
export const KCAL_PER_KG = 7700;

/** NHS: an average man needs about 2,500 kcal a day, an average woman about 2,000 (nhs.uk, Understanding calories). */
export const NHS_REFERENCE = { female: 2000, male: 2500 } as const;
/** NHS 12-week weight loss plan daily targets (nhs.uk Better Health, week 1 leaflet) and its "cut about 600 kcal a day" advice. */
export const NHS_PLAN = { female: 1400, male: 1900, deficit: 600 } as const;
/** NHS: aim to lose 0.5 to 1 kg (1 to 2 lb) a week. */
export const NHS_SAFE_LOSS_KG_WEEK = { min: 0.5, max: 1 } as const;
/** Harvard Health: do not go below 1,200 kcal (women) or 1,500 kcal (men) a day without a health professional. */
export const CALORIE_FLOOR = { female: 1200, male: 1500 } as const;
/** NHS: very low calorie diets are 800 kcal a day or less and only under medical supervision. */
export const VLCD_KCAL = 800;

export type CalorieGoal = "lose" | "maintain" | "gain";

export type CalorieResult = {
  bmr: number;
  tdee: number;
  /** kcal a day change from TDEE for the chosen rate (negative to lose). */
  dailyChange: number;
  /** The raw target before the floor. */
  rawTarget: number;
  /** The target shown, never below the floor when losing. */
  target: number;
  floor: number;
  floored: boolean;
  /** Weekly rate actually achieved at the target, kg (negative to lose). */
  weeklyKg: number;
  /** Rate faster than the NHS's 1 kg a week. */
  fast: boolean;
  /** Weeks to reach a goal weight, if one was given and is in the right direction. */
  weeksToGoal: number | null;
};

export function calories(p: {
  formula: BmrFormula;
  sex: Sex;
  kg: number;
  cm: number;
  age: number;
  bodyFatPct?: number;
  activity: Activity;
  goal: CalorieGoal;
  /** kg a week, positive. */
  rateKg: number;
  goalKg?: number;
}): CalorieResult {
  const b = Math.max(0, bmr(p));
  const tdee = b * ACTIVITY[p.activity].factor;
  const rate = p.goal === "maintain" ? 0 : pos(p.rateKg);
  const dailyChange = ((p.goal === "lose" ? -1 : 1) * rate * KCAL_PER_KG) / 7;
  const rawTarget = tdee + (p.goal === "maintain" ? 0 : dailyChange);
  const floor = CALORIE_FLOOR[p.sex];
  const floored = p.goal === "lose" && rawTarget < floor;
  const target = floored ? Math.min(tdee, floor) : rawTarget;
  const weeklyKg = ((target - tdee) * 7) / KCAL_PER_KG;
  let weeksToGoal: number | null = null;
  if (p.goalKg && p.goalKg > 0 && Math.abs(weeklyKg) > 1e-9) {
    const diff = p.goalKg - pos(p.kg);
    if (Math.sign(diff) === Math.sign(weeklyKg)) weeksToGoal = diff / weeklyKg;
  }
  return { bmr: b, tdee, dailyChange, rawTarget, target, floor, floored, weeklyKg, fast: rate > NHS_SAFE_LOSS_KG_WEEK.max, weeksToGoal };
}

/** Energy per gram: protein 4, carbohydrate 4, fat 9 kcal (UK and EU food labelling). */
export const KCAL_PER_G = { protein: 4, carbs: 4, fat: 9 } as const;

export type MacroSplit = "balanced" | "protein" | "lowcarb";

/** Shares of energy from protein, carbohydrate and fat. */
export const MACRO_SPLITS: Record<MacroSplit, { label: string; protein: number; carbs: number; fat: number }> = {
  balanced: { label: "Balanced", protein: 0.2, carbs: 0.5, fat: 0.3 },
  protein: { label: "Higher protein", protein: 0.3, carbs: 0.4, fat: 0.3 },
  lowcarb: { label: "Lower carb", protein: 0.3, carbs: 0.25, fat: 0.45 },
};

export function macros(kcal: number, split: MacroSplit): { protein: number; carbs: number; fat: number } {
  const s = MACRO_SPLITS[split];
  const k = pos(kcal);
  return { protein: (k * s.protein) / KCAL_PER_G.protein, carbs: (k * s.carbs) / KCAL_PER_G.carbs, fat: (k * s.fat) / KCAL_PER_G.fat };
}

/* ── Body fat ──────────────────────────────────────────────────── */

/**
 * US Navy circumference method (Hodgdon and Beckett, Naval Health Research
 * Center, 1984), in the inch form used by the US Department of Defense.
 * Men: 86.010 log10(waist − neck) − 70.041 log10(height) + 36.76.
 * Women: 163.205 log10(waist + hip − neck) − 97.684 log10(height) − 78.387.
 * Returns null when the measurements cannot give an answer.
 */
export function navyBodyFat(p: { sex: Sex; heightCm: number; neckCm: number; waistCm: number; hipCm?: number }): number | null {
  const h = inFromCm(p.heightCm);
  const neck = inFromCm(p.neckCm);
  const waist = inFromCm(p.waistCm);
  const hip = inFromCm(p.hipCm ?? 0);
  if (h <= 0) return null;
  let bf: number;
  if (p.sex === "male") {
    const d = waist - neck;
    if (d <= 0) return null;
    bf = 86.01 * Math.log10(d) - 70.041 * Math.log10(h) + 36.76;
  } else {
    const d = waist + hip - neck;
    if (hip <= 0 || d <= 0) return null;
    bf = 163.205 * Math.log10(d) - 97.684 * Math.log10(h) - 78.387;
  }
  if (!Number.isFinite(bf)) return null;
  return Math.min(75, Math.max(2, bf));
}

/** Deurenberg, Weststrate and Seidell (1991), adults: 1.2 × BMI + 0.23 × age − 10.8 × sex − 5.4 (sex 1 for men). */
export function deurenbergBodyFat(p: { sex: Sex; bmi: number; age: number }): number | null {
  if (!(p.bmi > 0)) return null;
  const bf = 1.2 * p.bmi + 0.23 * pos(p.age) - 10.8 * (p.sex === "male" ? 1 : 0) - 5.4;
  return Number.isFinite(bf) ? Math.min(75, Math.max(2, bf)) : null;
}

export type FatBand = "essential" | "athletes" | "fitness" | "average" | "obese";

/** American Council on Exercise body fat categories (lower bound of each band, %). */
export const FAT_BANDS: Record<Sex, { band: FatBand; label: string; from: number }[]> = {
  female: [
    { band: "essential", label: "Essential fat", from: 10 },
    { band: "athletes", label: "Athletes", from: 14 },
    { band: "fitness", label: "Fitness", from: 21 },
    { band: "average", label: "Average", from: 25 },
    { band: "obese", label: "Obese", from: 32 },
  ],
  male: [
    { band: "essential", label: "Essential fat", from: 2 },
    { band: "athletes", label: "Athletes", from: 6 },
    { band: "fitness", label: "Fitness", from: 14 },
    { band: "average", label: "Average", from: 18 },
    { band: "obese", label: "Obese", from: 25 },
  ],
};

/** The band for a body fat %; under the essential minimum counts as "essential" with `below` set. */
export function fatBand(sex: Sex, pct: number): { band: FatBand; label: string; below: boolean } {
  const bands = FAT_BANDS[sex];
  let hit = bands[0];
  for (const b of bands) if (pct >= b.from) hit = b;
  return { band: hit.band, label: hit.label, below: pct < bands[0].from };
}

export function fatAndLean(kg: number, pct: number): { fatKg: number; leanKg: number } {
  const w = pos(kg);
  const p = Math.min(100, pos(pct));
  const fatKg = (w * p) / 100;
  return { fatKg, leanKg: w - fatKg };
}
