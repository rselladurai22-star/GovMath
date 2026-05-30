/**
 * Student Council Tax Exemption — England, Wales, Scotland.
 *
 * Source: gov.uk/council-tax/discounts-for-full-time-students
 *
 * Rules:
 *   - Full-time student = at least 21 hours per week, 24-week course, undergraduate or
 *     postgraduate. (16–17 with parents and on a recognised course also counts.)
 *   - Household of all full-time students: 100% exempt.
 *   - Mixed household (1 non-student): 25% single-person discount applies.
 *   - Mixed household (2+ non-students): full council tax bill, but students are disregarded.
 *   - Non-student halls of residence: exempt as a Class N dwelling.
 */

export type CouncilTaxInput = {
  fullTimeStudents: number;
  nonStudents: number;
};

export type CouncilTaxResult = {
  discountPct: number;
  exempt: boolean;
  status: string;
};

export function studentCouncilTax(input: CouncilTaxInput): CouncilTaxResult {
  const students = Math.max(0, Math.floor(input.fullTimeStudents));
  const others = Math.max(0, Math.floor(input.nonStudents));

  if (students === 0 && others === 0) {
    return { discountPct: 0, exempt: false, status: "Empty property — check second-home rules with your council." };
  }
  if (others === 0) {
    return { discountPct: 100, exempt: true, status: "All full-time students — 100% exempt from council tax." };
  }
  if (others === 1) {
    return { discountPct: 25, exempt: false, status: "One non-student — they qualify for the 25% single-person discount." };
  }
  return { discountPct: 0, exempt: false, status: "Two or more non-students — full council tax applies. Students are disregarded but bill stays the same." };
}
