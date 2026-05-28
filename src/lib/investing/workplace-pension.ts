/**
 * Workplace pension (auto-enrolment) contributions.
 *
 * Minimum auto-enrolment (2025/26):
 *  - Total 8% of qualifying earnings
 *  - Employer min 3%, employee min 5% (incl tax relief)
 *  - Qualifying earnings band: £6,240 – £50,270
 *
 * Many employers contribute more. This calc lets you specify both rates and
 * choose qualifying-earnings or total-salary basis.
 */

export const QE_LOWER = 6_240;
export const QE_UPPER = 50_270;

export type WorkplacePensionInput = {
  annualSalary: number;
  employeePct: number;
  employerPct: number;
  basis: "qualifying-earnings" | "total-salary";
};

export type WorkplacePensionResult = {
  pensionableEarnings: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
};

export function workplacePension(input: WorkplacePensionInput): WorkplacePensionResult {
  const pensionableEarnings =
    input.basis === "qualifying-earnings"
      ? Math.max(0, Math.min(input.annualSalary, QE_UPPER) - QE_LOWER)
      : Math.max(0, input.annualSalary);
  const employeeContribution = pensionableEarnings * (input.employeePct / 100);
  const employerContribution = pensionableEarnings * (input.employerPct / 100);
  return {
    pensionableEarnings,
    employeeContribution,
    employerContribution,
    totalContribution: employeeContribution + employerContribution,
  };
}
